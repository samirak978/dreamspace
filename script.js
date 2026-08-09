function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();

  if (task === "") {
    return;
  }

  const li = document.createElement("li");
  li.textContent = task;

  li.onclick = function() {
  if (li.style.textDecoration !== "line-through") {
    li.style.textDecoration = "line-through";

    const counter = document.getElementById("completedCount");
    counter.textContent = Number(counter.textContent) + 1;
  }
};

  document.getElementById("taskList").appendChild(li);

  input.value = "";
}
let timeLeft = 25 * 60;
let timerInterval = null;

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  document.getElementById("timer").textContent =
    `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function startTimer() {
  if (timerInterval !== null) return;

  timerInterval = setInterval(function() {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimer();
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      alert("Focus session complete! 🎉");
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timeLeft = 25 * 60;
  updateTimer();
}

updateTimer();
function addPlan() {
  const input = document.getElementById("planInput");
  const plan = input.value.trim();

  if (plan === "") {
    return;
  }

  const li = document.createElement("li");
  li.textContent = plan;

  li.onclick = function() {
    li.style.textDecoration = "line-through";
  };

  document.getElementById("planList").appendChild(li);

  input.value = "";
}
let points = 0;

function addPoints() {
  points += 10;
  document.getElementById("points").textContent = points;
}
const quotes = [
  "You can do this! ✨",
  "Small steps still move you forward. 🌷",
  "Believe in yourself. 💗",
  "Progress, not perfection. 🌟",
  "You've got this! 💪",
  "Make today count. ☀️"
];

function newQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  document.getElementById("quote").textContent = quotes[randomIndex];
}
function pinkTheme() {
  document.body.style.background = "#fceef5";
  document.body.style.color = "#4a3040";
}

function blueTheme() {
  document.body.style.background = "#eaf4ff";
  document.body.style.color = "#304a5c";
}

function purpleTheme() {
  document.body.style.background = "#f3eaff";
  document.body.style.color = "#49305c";
}

function resetTheme() {
  document.body.style.background = "#ffffff";
  document.body.style.color = "#222222";
}
let audioContext;
let soundSource;

function startAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
}

function rainSound() {
  startAudio();
  stopSound();

  const bufferSize = audioContext.sampleRate * 2;
  const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.12;
  }

  soundSource = audioContext.createBufferSource();
  soundSource.buffer = buffer;
  soundSource.loop = true;

  const gain = audioContext.createGain();
  gain.gain.value = 0.25;

  soundSource.connect(gain);
  gain.connect(audioContext.destination);
  soundSource.start();
}

function cafeSound() {
  startAudio();
  stopSound();

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = "sine";
  oscillator.frequency.value = 180;
  gain.gain.value = 0.015;

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.start();

  soundSource = oscillator;
}

function stopSound() {
  if (soundSource) {
    try {
      soundSource.stop();
    } catch (error) {}
    soundSource = null;
  }
}