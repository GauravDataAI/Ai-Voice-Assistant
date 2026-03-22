// Speech recognition setup
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";
recognition.continuous = false;
recognition.interimResults = false;

const btn = document.querySelector("#listen-btn");

// ======== Text to Speech ========
function speak(text) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;
  window.speechSynthesis.speak(utterance);
}

// ======== Intro Animation ========
function assistantIntroAnimation() {
  const introBox = document.createElement("div");
  introBox.id = "assistant-intro-box";
  introBox.innerHTML = `
    <div class="assistant-circle"></div>
    <h2>AI Voice Assistant</h2>
    <p>Hello Gaurav, ready to help you 🚀</p>
  `;

  Object.assign(introBox.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    width: "260px",
    padding: "20px",
    borderRadius: "20px",
    background: "rgba(0,0,0,0.85)",
    color: "#fff",
    textAlign: "center",
    zIndex: "9999",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    animation: "fadeSlideIn 0.8s ease"
  });

  document.body.appendChild(introBox);

  const circle = introBox.querySelector(".assistant-circle");
  Object.assign(circle.style, {
    width: "70px",
    height: "70px",
    margin: "0 auto 12px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #00c6ff, #0072ff)",
    boxShadow: "0 0 20px rgba(0, 198, 255, 0.8)",
    animation: "pulseGlow 1.5s infinite"
  });

  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes fadeSlideIn {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes pulseGlow {
      0% { transform: scale(1); box-shadow: 0 0 10px rgba(0,198,255,0.5); }
      50% { transform: scale(1.1); box-shadow: 0 0 25px rgba(0,198,255,1); }
      100% { transform: scale(1); box-shadow: 0 0 10px rgba(0,198,255,0.5); }
    }
  `;
  document.head.appendChild(style);

  setTimeout(() => {
    introBox.remove();
  }, 4000);
}

// Run intro animation on page load
window.addEventListener("load", assistantIntroAnimation);

// ======== Simulated Screenshot Flash ========
function simulateScreenshot() {
  const flash = document.createElement("div");
  Object.assign(flash.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "#fff",
    opacity: "0.95",
    zIndex: "10000",
    pointerEvents: "none"
  });

  document.body.appendChild(flash);

  setTimeout(() => {
    flash.style.transition = "opacity 0.5s ease";
    flash.style.opacity = "0";
  }, 100);

  setTimeout(() => {
    flash.remove();
  }, 700);
}

// ======== Indian Time Format ========
function getIndianTime() {
  const now = new Date();
  return now.toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true
  });
}

// ======== Indian Date Format ========
function getIndianDate() {
  const now = new Date();
  return now.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

// ======== Battery Status ========
async function tellBatteryStatus() {
  if ("getBattery" in navigator) {
    const battery = await navigator.getBattery();
    const level = Math.round(battery.level * 100);
    const charging = battery.charging ? "and it is charging" : "and it is not charging";
    speak(`Battery is currently at ${level} percent, ${charging}.`);
  } else {
    speak("Sorry, battery status is not supported on this device.");
  }
}

// ======== Command Handler ========
function handleCommand(command) {
  console.log("Command:", command);

  // Greetings
  if (command.includes("hello") || command.includes("hi")) {
    speak("Hello Gaurav, how can I help you?");
  }

  // Introduction
  else if (command.includes("who are you")) {
    speak("I am your AI voice assistant, ready to help you with smart browser tasks.");
  }

  // Open my portfolio
  else if (command.includes("open my portfolio")) {
    speak("Opening your portfolio");
    window.open("file:///C:/Users/gaura/OneDrive/Desktop/Portpolio/Project/about.html", "_blank");
  }

  // Open college website
  else if (command.includes("open college website")) {
    speak("Opening your college website");
    window.open("https://www.juet.ac.in", "_blank");
  }

  // Open resume
  else if (command.includes("open resume")) {
    speak("Opening your resume");
    window.open("file:///C:/Users/gaura/OneDrive/Desktop/resume.pdf", "_blank");
  }

  // Search Wikipedia
  else if (command.includes("search wikipedia for")) {
    let topic = command.replace("search wikipedia for", "").trim();
    speak(`Searching Wikipedia for ${topic}`);
    window.open(`https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(topic)}`, "_blank");
  }

  // Simulated screenshot
  else if (command.includes("take screenshot")) {
    speak("Taking screenshot");
    simulateScreenshot();
  }

  // Battery status
  else if (command.includes("battery status") || command.includes("show battery")) {
    tellBatteryStatus();
  }

  // Current time in Indian format
  else if (command.includes("what time is it") || command.includes("tell me the time")) {
    const time = getIndianTime();
    speak(`The current Indian time is ${time}`);
  }

  // Current date in Indian format
  else if (command.includes("tell me the date") || command.includes("what is today's date")) {
    const date = getIndianDate();
    speak(`Today's date is ${date}`);
  }

  // Open YouTube
  else if (command.includes("open youtube")) {
    speak("Opening YouTube");
    window.open("https://www.youtube.com", "_blank");
  }

  // Open Google
  else if (command.includes("open google")) {
    speak("Opening Google");
    window.open("https://www.google.com", "_blank");
  }

  // Open Facebook
  else if (command.includes("open facebook")) {
    speak("Opening Facebook");
    window.open("https://www.facebook.com", "_blank");
  }

  // Open Instagram
  else if (command.includes("open instagram")) {
    speak("Opening Instagram");
    window.open("https://www.instagram.com", "_blank");
  }

  // Open WhatsApp
  else if (command.includes("open whatsapp")) {
    speak("Opening WhatsApp");
    window.open("https://www.whatsapp.com", "_blank");
  }

  // Open Gmail
  else if (command.includes("open gmail")) {
    speak("Opening Gmail");
    window.open("https://mail.google.com", "_blank");
  }

  // Open ChatGPT
  else if (command.includes("open chat g p t") || command.includes("open chatgpt")) {
    speak("Opening ChatGPT");
    window.open("https://chat.openai.com", "_blank");
  }

  // Open LinkedIn
  else if (command.includes("open linkedin")) {
    speak("Opening LinkedIn");
    window.open("https://www.linkedin.com", "_blank");
  }

  // Open GitHub
  else if (command.includes("open github")) {
    speak("Opening GitHub");
    window.open("https://github.com", "_blank");
  }

  // Open Twitter / X
  else if (command.includes("open twitter") || command.includes("open x")) {
    speak("Opening X");
    window.open("https://x.com", "_blank");
  }

  // Search Google
  else if (command.includes("search google for")) {
    let searchText = command.replace("search google for", "").trim();
    speak(`Searching Google for ${searchText}`);
    window.open(`https://www.google.com/search?q=${encodeURIComponent(searchText)}`, "_blank");
  }

  // Search YouTube
  else if (command.includes("search youtube for")) {
    let searchText = command.replace("search youtube for", "").trim();
    speak(`Searching YouTube for ${searchText}`);
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(searchText)}`, "_blank");
  }

  // Play song/video
  else if (command.includes("play")) {
    let song = command.replace("play", "").trim();
    speak(`Playing ${song} on YouTube`);
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(song)}`, "_blank");
  }

  // Weather
  else if (command.includes("weather")) {
    let city = command.replace("weather", "").trim();
    if (city) {
      speak(`Checking weather for ${city}`);
      window.open(`https://www.google.com/search?q=weather+${encodeURIComponent(city)}`, "_blank");
    } else {
      speak("Please say a city name for weather");
    }
  }

  // Open maps
  else if (command.includes("open maps")) {
    speak("Opening Google Maps");
    window.open("https://www.google.com/maps", "_blank");
  }

  // Find location
  else if (command.includes("find location of")) {
    let place = command.replace("find location of", "").trim();
    speak(`Showing location of ${place}`);
    window.open(`https://www.google.com/maps/search/${encodeURIComponent(place)}`, "_blank");
  }

  // Open calculator
  else if (command.includes("open calculator")) {
    speak("Opening calculator");
    window.open("https://www.google.com/search?q=calculator", "_blank");
  }

  // Open notepad
  else if (command.includes("open notepad")) {
    speak("Opening online notepad");
    window.open("https://anotepad.com", "_blank");
  }

  // Reload page
  else if (command.includes("reload page") || command.includes("refresh page")) {
    speak("Reloading page");
    location.reload();
  }

  // Scroll down
  else if (command.includes("scroll down")) {
    speak("Scrolling down");
    window.scrollBy({
      top: 500,
      behavior: "smooth"
    });
  }

  // Scroll up
  else if (command.includes("scroll up")) {
    speak("Scrolling up");
    window.scrollBy({
      top: -500,
      behavior: "smooth"
    });
  }

  // Go to top
  else if (command.includes("go to top")) {
    speak("Going to top");
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  // Dark mode
  else if (command.includes("enable dark mode")) {
    document.body.style.backgroundColor = "#121212";
    document.body.style.color = "#ffffff";
    speak("Dark mode enabled");
  }

  // Light mode
  else if (command.includes("enable light mode")) {
    document.body.style.backgroundColor = "#ffffff";
    document.body.style.color = "#000000";
    speak("Light mode enabled");
  }

  // Joke
  else if (command.includes("tell me a joke")) {
    speak("Why do programmers prefer dark mode? Because light attracts bugs.");
  }

  // Thanks
  else if (command.includes("thank you") || command.includes("thanks")) {
    speak("You're welcome Gaurav");
  }

  // Stop
  else if (command.includes("stop")) {
    speak("Okay, stopping now");
    recognition.stop();
  }

  // Fallback
  else {
    speak("I did not recognize that command. Searching Google for " + command);
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(command)}`,
      "_blank"
    );
  }
}

// ======== Button Click ========
btn.addEventListener("click", function () {
  speak("Hello Gaurav, how can I help you?");

  setTimeout(() => {
    btn.innerHTML = "Listening... 👂";
    btn.classList.add("listening");
    recognition.start();
  }, 2500);
});

// ======== Recognition Result ========
recognition.onresult = (event) => {
  const command = event.results[0][0].transcript.toLowerCase();
  handleCommand(command);
};

// ======== Recognition End ========
recognition.onend = () => {
  btn.innerHTML = "Start Listening";
  btn.classList.remove("listening");
};

// ======== Error Handling ========
recognition.onerror = (event) => {
  console.error("Speech recognition error:", event.error);
  speak("Sorry, I could not understand. Please try again.");
  btn.innerHTML = "Start Listening";
  btn.classList.remove("listening");
};