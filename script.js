const urlParams = new URLSearchParams(window.location.search);
const embed = urlParams.get("embed");
const hash = urlParams.get("hash");

// Countdown Timer Function
function getTimeRemaining(endtime) {
  const total = Date.parse(endtime) - new Date().getTime();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { total, days, hours, minutes, seconds };
}

function startCountdown(containerId, deadline, title, theme) {
  const box = document.getElementById(containerId);
  box.className = `counter-box ${theme}`;

  const interval = setInterval(() => {
    const t = getTimeRemaining(deadline);
    if (t.total <= 0) {
      clearInterval(interval);
      box.innerHTML = `<h2>${title}</h2><p>Countdown finished!</p>`;
      return;
    }

    box.innerHTML = `
      <h2>${title}</h2>
      <h1>${t.days} : ${t.hours} : ${t.minutes} : ${t.seconds}</h1>
      <p>DAYS : HOURS : MINUTES : SECONDS</p>
    `;
  }, 1000);
}

// Embed Mode
if (embed && hash) {
  document.getElementById("form-area").style.display = "none";
  document.getElementById("counter-area").classList.remove("hidden");

  const saved = JSON.parse(localStorage.getItem("countdown_" + hash));
  if (saved) {
    startCountdown("countdown", saved.date + "T" + saved.time, saved.title, saved.theme);
  } else {
    document.getElementById("countdown").innerText = "Invalid or expired countdown!";
  }
}

// Generator Form Handler
document.getElementById("countdownForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const title = document.getElementById("title").value || "My Countdown";
  const theme = document.getElementById("bgColor").value;

  const hash = Math.random().toString(36).substr(2, 9);
  const data = { date, time, title, theme };
  localStorage.setItem("countdown_" + hash, JSON.stringify(data));

  const url = `${location.origin}${location.pathname}?embed=true&hash=${hash}`;
  alert("Embed Countdown URL:\n\n" + url);
  window.open(url, "_blank");
});
