// Pobranie wszystkich przycisków
const tabButtons = document.querySelectorAll(".tab button");

// Listener dla każdego przycisku
tabButtons.forEach((button) => {
  button.addEventListener("click", (ev) => {
    const tabName = ev.currentTarget.dataset.target; // pobranie docelowego kontenera
    openTab(ev, tabName);
  });
});
// Funkcja otwierania zakładki
const openTab = (ev, tabName) => {
  // ukryj wszystkie zakładki
  document
    .querySelectorAll(".tabcontent")
    .forEach((tc) => (tc.style.display = "none"));

  // usuń klasę active ze wszystkich przycisków
  document
    .querySelectorAll(".tab button")
    .forEach((btn) => btn.classList.remove("active"));

  // pokaż klikniętą zakładkę
  document.getElementById(tabName).style.display = "block";

  // dodaj active do klikniętego przycisku
  ev.currentTarget.classList.add("active");
};

// Kliknięcie domyślne
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("defaultOpen").click();
});
