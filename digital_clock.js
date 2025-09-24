document.addEventListener("DOMContentLoaded", () => {
  const hour = document.getElementById("hours");
  const minute = document.getElementById("minutes");
  const second = document.getElementById("seconds");
  const updateClock = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    hour.textContent = hours;
    minute.textContent = minutes;
    second.textContent = seconds;
  };
  updateClock();
  setInterval(updateClock, 1000);
});
