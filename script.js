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
