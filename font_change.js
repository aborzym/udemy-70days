document.addEventListener("DOMContentLoaded", () => {
  const fontSelector = document.getElementById("fontSelector");
  const content = document.querySelector(".content");

  fontSelector.addEventListener("change", () => {
    const selectedFont = fontSelector.value;
    content.style.fontFamily = selectedFont;
  });
});
