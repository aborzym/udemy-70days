document.addEventListener("DOMContentLoaded", () => {
  const progressBar = document.getElementById("progress-bar");
  window.addEventListener("scroll", () => {
    // Oblicz stopień przewinięcia strony.
    // Użyj document.documentElement.scrollHeight do uzyskania całkowitej wysokości dokumentu oraz window.innerHeight do uzyskania wysokości widocznej części okna.
    // Oblicz wysokość przewiniętą za pomocą window.scrollY.

    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollY = window.scrollY;
    const progress = (scrollY / totalHeight) * 100;

    //   ustaw szerokość paska postępu na obliczoną wartość procentową.
    progressBar.style.width = progress + "%";
  });
});
