window.addEventListener("scroll", function () {
  let offset = window.scrollY;

  const parallaxElements = document.querySelectorAll(".parallax");
  parallaxElements.forEach((el) => {
    el.style.backgroundPositionY = offset * 0.7 + "px";
  });
});
