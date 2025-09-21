document.addEventListener("DOMContentLoaded", () => {
  //

  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  let currentSlide = 0;

  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (i === index) {
        slide.classList.add("active");
      }
    });
  };

  //funkcja prevSlide, która zmniejsza indeks aktualnego slajdu o 1.
  //Jeśli aktualny slajd jest pierwszym slajdem, ustaw indeks na ostatni slajd.
  //Wywołaj funkcję showSlide z nowym indeksem.
  const prevSlide = () => {
    currentSlide = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
    showSlide(currentSlide);
  };

  const nextSlide = () => {
    currentSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
    showSlide(currentSlide);
  };

  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  setInterval(nextSlide, 3000);
});
