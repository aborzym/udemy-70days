document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".zoom-image");
  images.forEach((image) => {
    image.addEventListener("mouseenter", () => {
      image.style.transform = "scale(1.5)";
    });
    image.addEventListener("mouseleave", () => {
      image.style.transform = "scale(1)";
    });
  });
});
