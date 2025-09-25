document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".tooltip-btn");
  buttons.forEach((button) => {
    const tooltipText = button.getAttribute("data-tooltip");
    const tooltip = document.createElement("span");
    tooltip.className = "tooltip";
    tooltip.textContent = tooltipText;
    button.appendChild(tooltip);
    button.addEventListener("mouseenter", () => {
      tooltip.style.opacity = "1";
    });
    button.addEventListener("mouseleave", () => {
      tooltip.style.opacity = "0";
    });
  });
});
