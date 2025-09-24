document.addEventListener("DOMContentLoaded", () => {
  const cookieBanner = document.getElementById("cookieBanner");
  const cookieBtn = document.getElementById("acceptCookies");
  const clearStorageBtn = document.getElementById("clearLocalStorage");
  // Sprawdź, czy w localStorage istnieje pozycja cookiesAccepted. Jeśli nie, ustaw styl display banera ciasteczek na block.
  if (!localStorage.getItem("cookiesAccepted")) {
    cookieBanner.style.display = "block";
  } else {
    cookieBanner.style.display = "none";
  }

  cookieBtn.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "true");
    cookieBanner.style.display = "none";
  });

  clearStorageBtn.addEventListener("click", () => {
    if (localStorage.getItem("cookiesAccepted")) {
      localStorage.removeItem("cookiesAccepted");
    }
  });
});
