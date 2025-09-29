document.addEventListener("DOMContentLoaded", () => {
  // ELEMENTY DOM
  const choices = document.querySelectorAll(".choice");
  const resultMessage = document.querySelector(".result-message");
  const player1ScoreElem = document.getElementById("player1-score");
  const player2ScoreElem = document.getElementById("player2-score");
  const resetBtn = document.querySelector(".reset-btn");
  const drawingBtn = document.getElementById("draw");
  const actionMessage = document.getElementById("action");
  const playersContainer = document.querySelector(".players-container");
  const gameContainer = document.querySelector(".game-container");
  const namesInputs = document.querySelectorAll("input");
  const p1Name = document.querySelector(".p1-name");
  const p2Name = document.querySelector(".p2-name");
  const startBtn = document.querySelector(".play-btn");
  const changeBtn = document.querySelector(".change-btn");

  // STANY GRACZY I GRA
  let player1Score = 0;
  let player2Score = 0;
  let player1Choice, player2Choice;
  let currentPlayer = 1;
  let player1Name = "";
  let player2Name = "";
  let player1Message = "";
  let player2Message = "";

  // UKRYCIE PRZYCISKU NA START
  drawingBtn.style.display = "none";

  // START GRY - ustawienie nazw graczy i przejście do planszy
  startBtn.addEventListener("click", () => {
    const name1 = namesInputs[0].value.trim();
    const name2 = namesInputs[1].value.trim();

    if (!name1 || !name2) {
      alert("Please enter names for both players!");
      return;
    }
    namesInputs.forEach((input, index) => {
      if (index === 0) {
        player1Name = input.value;
        player1Message = `${player1Name} - make your choice`;
      } else if (index === 1) {
        player2Name = input.value;
        player2Message = `${player2Name} - make your choice`;
      }
    });
    actionMessage.textContent = player1Message;
    p1Name.textContent = `${player1Name} :`;
    p2Name.textContent = `${player2Name} :`;
    playersContainer.classList.add("hidden");
    gameContainer.classList.remove("hidden");
  });

  // ZASADY GRY
  const rules = {
    rock: "scissors",
    scissors: "paper",
    paper: "rock",
  };

  // WYBÓR GRACZY
  choices.forEach((choice) => {
    choice.addEventListener("click", () => {
      if (currentPlayer === 1) {
        player1Choice = choice.dataset.choice;
        currentPlayer = 2;
        updateCurrentPlayerVisual();
      } else {
        player2Choice = choice.dataset.choice;
        currentPlayer = 1;
        updateCurrentPlayerVisual();

        const winner = determineWinner(player1Choice, player2Choice);
        const winnerName =
          winner === "draw"
            ? "Draw"
            : winner === "player1"
            ? player1Name
            : player2Name;

        // ANIMACJA PRZYCISKU I WYNIK
        draw(winnerName).then(() => {
          displayResult(winner, player1Choice, player2Choice);
          updateScore(winner);
        });
      }
    });
  });

  // OKREŚLENIE ZWYCIĘZCY
  function determineWinner(p1, p2) {
    if (p1 === p2) return "draw";
    return rules[p1] === p2 ? "player1" : "player2";
  }

  // WYŚWIETLENIE WYNIKU W TEKŚCIE
  function displayResult(winner, p1Choice, p2Choice) {
    if (winner === "draw") {
      resultMessage.textContent = `It's a draw! You both chose ${p1Choice}.`;
    } else if (winner === "player1") {
      resultMessage.textContent = `${capitalizeFirstLetter(
        p1Choice
      )} beats ${p2Choice}.`;
    } else {
      resultMessage.textContent = `${capitalizeFirstLetter(
        p2Choice
      )} beats ${p1Choice}.`;
    }
  }

  // AKTUALIZACJA PUNKTACJI
  function updateScore(winner) {
    if (winner === "player1") player1Score++;
    if (winner === "player2") player2Score++;
    player1ScoreElem.textContent = player1Score;
    player2ScoreElem.textContent = player2Score;
  }

  function updateScoreDisplay() {
    player1ScoreElem.textContent = player1Score;
    player2ScoreElem.textContent = player2Score;
  }

  function resetScore() {
    player1Score = 0;
    player2Score = 0;
  }

  // RESET GRY
  resetBtn.addEventListener("click", () => {
    resultMessage.textContent = "";
    resetScore();
    updateScoreDisplay();
    currentPlayer = 1;
    updateCurrentPlayerVisual();
    drawingBtn.textContent = "Drawing";
    drawingBtn.className = ""; // usuwa wszystkie klasy
    drawingBtn.style.display = "none";
  });

  // ZMIANA IMION GRACZY
  changeBtn.addEventListener("click", () => {
    resultMessage.textContent = "";
    resetScore();
    updateScoreDisplay();
    currentPlayer = 1;
    updateCurrentPlayerVisual();
    gameContainer.classList.add("hidden");
    playersContainer.classList.remove("hidden");
    namesInputs.forEach((input) => (input.value = ""));
  });

  function capitalizeFirstLetter(word) {
    return word[0].toUpperCase() + word.slice(1);
  }
  // ANIMACJA PRZYCISKU I KOLOR KLASY
  function draw(winner) {
    return new Promise((resolve) => {
      // ukrycie aktualnego actionMessage na czas animacji
      actionMessage.textContent = "";

      drawingBtn.style.display = "inline-block";
      drawingBtn.textContent = "And the winner is...";
      drawingBtn.className = "shake drawing-btn"; // reset wszystkich klas + dodanie shake

      setTimeout(() => {
        drawingBtn.className = "drawed"; // reset + drawed
        // ustawienie koloru w zależności od wyniku
        if (winner === "Draw") drawingBtn.classList.add("red");
        else if (winner === player1Name) drawingBtn.classList.add("blue");
        else drawingBtn.classList.add("green");

        drawingBtn.textContent =
          winner === "Draw" ? `${winner}!` : `${winner} wins!`;

        // po animacji przywracamy domyślny komunikat akcji (zawsze player1 zaczyna)
        actionMessage.textContent = player1Message;

        resolve();
      }, 1200);
    });
  }

  // AKTUALNY GRACZ WIDOCZNY NA EKRANIE
  function updateCurrentPlayerVisual() {
    if (currentPlayer === 1) {
      actionMessage.textContent = player1Message;
      actionMessage.classList.add("blue");
      actionMessage.classList.remove("green");
    } else {
      actionMessage.textContent = player2Message;
      actionMessage.classList.add("green");
      actionMessage.classList.remove("blue");
    }
  }
});

/**
 * Diagram przepływu gry „Kamień, Papier, Nożyce”
 *
 * START
 *   |
 *   v
 * [Wpisanie imion graczy] ---> [Kliknięcie "Start"]
 *   |                              |
 *   v                              v
 * [Plansza gry widoczna]        currentPlayer = 1
 *   |
 *   v
 * [Gracz 1 wybiera ruch] ---> currentPlayer = 2
 *   |
 *   v
 * [Gracz 2 wybiera ruch] ---> currentPlayer = 1
 *   |
 *   v
 * [Obliczenie zwycięzcy]
 *   |
 *   v
 * [Animacja przycisku "And the winner is..."]
 *   |
 *   v
 * [Wyświetlenie zwycięzcy w przycisku]
 *   |  (Kolor: blue - gracz 1, green - gracz 2, red - remis)
 *   v
 * [Wyświetlenie tekstowego wyniku starcia]
 *   |
 *   v
 * [Aktualizacja punktacji]
 *   |
 *   v
 * [Przywrócenie komunikatu actionMessage = player1Message]
 *   |
 *   v
 * [Kolejna runda lub Reset / Change]
 *   |
 *   v
 * END
 */
