const video = document.getElementById("backgroundVideo");

const overlay = document.querySelector(".overlay");
overlay.addEventListener("click", togglePlayPause);

function togglePlayPause() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".navlinks");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("navactive");
  burger.classList.toggle("toggle"); // ta klasa aktywuje animację
});
