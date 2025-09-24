document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("openBtn");
  const sideMenu = document.getElementById("menu");
  const closeBtn = document.getElementById("closeBtn");
  openBtn.addEventListener("click", () => {
    sideMenu.style.width = "250px";
  });
  closeBtn.addEventListener("click", () => {
    sideMenu.style.width = "0";
  });
});
