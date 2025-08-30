//ustawienie litenera na każdy z buttonów

document.querySelectorAll(".tab button").forEach((button) => {
  button.addEventListener("click", () => openTab(ev, tabName));
});

// ustawienie domyślnej zakładki - opis

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("defaultOpen").click();
});

const openTab = (ev, tabName) {
    
}