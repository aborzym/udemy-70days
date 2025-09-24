document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll(".btn");

  //Inicjalizuj zmienne displayValue, firstOperand, secondOperand oraz operator, które będą przechowywać aktualny stan kalkulatora.
  let displayValue = "0";
  let firstOperand = null;
  let secondOperand = false;
  let operator = null;
  //Stwórz funkcję updateDisplay, która aktualizuje zawartość wyświetlacza na podstawie displayValue.
  function updateDisplay() {
    display.textContent = displayValue;
  }
  updateDisplay();
  //===========================
  //Funkcja obsługująca liczby
  //===========================
  // Stwórz funkcję handleNumber, która aktualizuje displayValue po wprowadzeniu liczby.
  function handleNumber(num) {
    if (secondOperand) {
      displayValue = num;
      secondOperand = false;
    } else {
      displayValue = displayValue === "0" ? num : displayValue + num;
    }
  }

  //===========================
  //Funkcja obsługująca operatory
  //===========================
  // Stwórz funkcję handleOperator, która obsługuje operatory matematyczne i wykonuje odpowiednie obliczenia.

  function handleOperator(nextOperator) {
    const value = parseFloat(displayValue);
    if (operator && secondOperand) {
      operator = nextOperator;
      return;
    }
    if (firstOperand === null) {
      firstOperand = value;
    } else if (operator) {
      const result = performCalculation[operator](firstOperand, value);
      displayValue = `${parseFloat(result.toFixed(7))}`;
      firstOperand = result;
    }
    secondOperand = true;
    operator = nextOperator;
  }

  //===========================
  //Funkcje obliczeń
  //===========================
  // Zdefiniuj obiekt performCalculation, który zawiera funkcje obliczające dla każdego operatora matematycznego.

  const performCalculation = {
    "/": (firstOperand, secondOperand) => firstOperand / secondOperand,
    "*": (firstOperand, secondOperand) => firstOperand * secondOperand,
    "+": (firstOperand, secondOperand) => firstOperand + secondOperand,
    "-": (firstOperand, secondOperand) => firstOperand - secondOperand,
    "=": (firstOperand, secondOperand) => secondOperand,
  };

  //===========================
  //Funkcje obliczeń
  //===========================
  // Stwórz funkcję resetCalculator, która resetuje kalkulator do początkowego stanu.

  function resetCalculator() {
    displayValue = "0";
    firstOperand = null;
    secondOperand = false;
    operator = null;
  }

  //===========================
  //Obsługa zdarzeń dla przycisków
  //===========================
  // Dodaj nasłuchiwanie zdarzeń click dla przycisków, aby wywoływać odpowiednie funkcje w zależności od wartości przycisku (data-value).

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.getAttribute("data-value");

      if (value === "C") {
        resetCalculator();
      } else if (value in performCalculation) {
        handleOperator(value);
      } else {
        handleNumber(value);
      }
      updateDisplay();
    });
  });
});
