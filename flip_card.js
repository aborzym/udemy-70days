document.addEventListener("DOMContentLoaded", () => {
  const frontText = document.querySelector(".flip-card-front p");
  const backText = document.querySelector(".flip-card-back p");
  frontText.textContent = "New Front Side Text (changed by JS)";
  backText.textContent = "New Back Side Text (changed by JS)";
});
