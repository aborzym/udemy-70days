document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("multi-step-form");
  //tablica kroków
  const steps = Array.from(document.querySelectorAll(".step"));
  const nextBtns = document.querySelectorAll(".next-btn");
  const prevBtns = document.querySelectorAll(".prev-btn");
  //zmienna aby śledzić bieżący krok
  let currentStep = 0;

  //Dodaj nasłuchiwanie zdarzenia click dla każdego przycisku "Dalej".

  // W funkcji obsługi zdarzenia sprawdź, czy bieżący krok jest poprawny (validateStep), a następnie ukryj bieżący krok i pokaż następny.

  nextBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (validateStep(currentStep)) {
        steps[currentStep].classList.remove("active");
        currentStep++;
        steps[currentStep].classList.add("active");
        updateSummary();
      }
    });
  });

  //analogicznie do wstecz (ale nie trzeba robić walidacji)
  prevBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      steps[currentStep].classList.remove("active");
      currentStep--;
      steps[currentStep].classList.add("active");
    });
  });
  form.addEventListener("submit", (e) => {
    if (!validateStep(currentStep)) {
      e.preventDefault();
    }
  });

  //Funkcja walidacji kroków, która sprawdza poprawność wszystkich pól wejściowych w bieżącym kroku.
  // Użyj checkValidity i reportValidity dla każdego pola, aby sprawdzić jego poprawność i wyświetlić komunikat błędu, jeśli pole jest niepoprawne.

  function validateStep(step) {
    const inputs = steps[step].querySelectorAll("input");
    let valid = true;
    inputs.forEach((input) => {
      if (!input.checkValidity()) {
        input.reportValidity();
        valid = false;
      }
    });
    return valid;
  }

  //   Stwórz funkcję updateSummary, która aktualizuje podsumowanie w kroku trzecim na podstawie wprowadzonych danych.

  // Pobierz wartości pól wejściowych i ustaw je w odpowiednich elementach <span> w podsumowaniu.

  function updateSummary() {
    document.getElementById("summaryFirstName").textContent =
      document.getElementById("firstName").value;
    document.getElementById("summaryLastName").textContent =
      document.getElementById("lastName").value;
    document.getElementById("summaryEmail").textContent =
      document.getElementById("email").value;
    document.getElementById("summaryPhone").textContent =
      document.getElementById("phone").value;
  }
});
