document.addEventListener("DOMContentLoaded", (event) => {
  // Kod zostanie uruchomiony po załadowaniu całego dokumentu

  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn");
  const loginModal = document.getElementById("loginModal");
  const registerModal = document.getElementById("registerModal");
  const closeButtons = document.querySelectorAll(".close");
  loginBtn.addEventListener("click", () => {
    loginModal.style.display = "block";
  });
  registerBtn.addEventListener("click", () => {
    registerModal.style.display = "block";
  });
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      loginModal.style.display = "none";
      registerModal.style.display = "none";
    });
  });
});
