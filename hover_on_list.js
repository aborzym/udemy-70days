document.addEventListener("DOMContentLoaded", () => {
  const listItem = document.querySelectorAll(".hover-list li");
  listItem.forEach((item) => {
    item.addEventListener("click", () => {
      alert(`Clicked ${item.textContent}`);
    });
  });
});
