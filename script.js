const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".navlinks");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("navactive");
  burger.classList.toggle("toggle"); // ta klasa aktywuje animację
});
