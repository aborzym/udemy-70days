document.addEventListener("DOMContentLoaded", () => {
  const snowContainer = document.querySelector(".snow-container");
  function createSnowflake() {
    const snowflake = document.createElement("div");
    snowflake.textContent = "*";
    snowflake.classList.add("snowflake");
    // Ustaw rozmiar, pozycję, opóźnienie i czas trwania animacji dla każdego płatka śniegu.
    const size = Math.random() * 80 + "px";
    const position = Math.random() * 100 + "vw";
    const delay = Math.random() * 10 + "s";
    const duration = Math.random() * 5 + 5 + "s";
    snowflake.style.fontSize = size;
    snowflake.style.left = position;
    snowflake.style.animationDelay = delay;
    snowflake.style.animationDuration = duration;
    snowContainer.appendChild(snowflake);

    setTimeout(() => {
      snowflake.remove(); //usunięcie z DOM
    }, parseFloat(duration) * 1500);
  }

  setInterval(createSnowflake, 200);
});
