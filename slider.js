const setupSlider = () => {
  const slides = document.querySelector(".slides");
  let currentIndex = 0;
  const totalSlides = document.querySelectorAll(".slides img").length;
  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
  }, 3000); // Przełączaj slajdy co 3 sekundy
};

document.addEventListener("DOMContentLoaded", () => {
  setupSlider();
});
