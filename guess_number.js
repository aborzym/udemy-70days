document.addEventListener("DOMContentLoaded", () => {
  const guessInput = document.getElementById("guessInput");
  const guessButton = document.getElementById("guessButton");
  const message = document.getElementById("message");
  const resetButton = document.getElementById("resetButton");

  let radomNumber = Math.floor(Math.random() * 100) + 1;
  let attempts = 0;

  //funkcja zgadywania liczby

  const guessNumber = () => {
    // Pobierz wartość z guessInput i zwiększ licznik prób.
    // Sprawdź, czy wprowadzona liczba jest równa, większa lub mniejsza od wylosowanej liczby.
    // Zaktualizuj wiadomość w elemencie message odpowiednio do wyniku zgadywania.
    // W przypadku odgadnięcia liczby, wyłącz przycisk guessButton i pokaż przycisk resetButton.

    const userGuess = Number(guessInput.value);
    attempts++;
    if (userGuess === radomNumber) {
      message.textContent = `Congratulations! You guessed the number in ${attempts} attempts.`;
      message.style.color = "green";
      guessButton.disabled = true;
      resetButton.style.display = "inline";
      guessInput.value = "";
    } else if (userGuess > radomNumber) {
      message.textContent = `${userGuess} is too high. Try again`;
      message.style.color = "red";
      guessInput.value = "";
    } else {
      message.textContent = `${userGuess} is too low. Try again`;
      message.style.color = "red";
      guessInput.value = "";
    }
  };

  guessButton.addEventListener("click", guessNumber);

  const resetGame = () => {
    radomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    message.textContent = "";
    guessInput.value = "";
    guessButton.disabled = false;
    resetButton.style.display = "none";
  };

  resetButton.addEventListener("click", resetGame);
});
