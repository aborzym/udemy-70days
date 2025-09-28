document.addEventListener("DOMContentLoaded", () => {
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
  let player1Score = 0;
  let player2Score = 0;
  let player1Choice;
  let player2Choice;
  let currentPlayer = 1;
  let player1Name = "";
  let player2Name = "";
  let player1Message = "";
  let player2Message = "";

  startBtn.addEventListener("click", () => {
    namesInputs.forEach((input, index) => {
      if (index === 0) {
        player1Name = input.value;
        player1Message = `${player1Name} - make your choice`;
      }
      if (index === 1) {
        player2Name = input.value;
        player2Message = `${player2Name}  - make your choice`;
      }
    });
    actionMessage.textContent = player1Message;
    p1Name.textContent = `${player1Name} :`;
    p2Name.textContent = `${player2Name} :`;
    playersContainer.classList.add("hidden");
    gameContainer.classList.remove("hidden");
  });
  const rules = {
    rock: "scissors",
    scissors: "paper",
    paper: "rock",
  };

  choices.forEach((choice) => {
    choice.addEventListener("click", () => {
      if (currentPlayer === 1) {
        player1Choice = choice.getAttribute("data-choice");
        currentPlayer = 2;
        updateCurrentPlayerVisual();
      } else {
        player2Choice = choice.getAttribute("data-choice");
        currentPlayer = 1;
        updateCurrentPlayerVisual();

        const winner = determineWinner(player1Choice, player2Choice);
        displayResult(winner, player1Choice, player2Choice);
        updateScore(winner);
      }
    });
  });

  function determineWinner(player1, player2) {
    if (player1 === player2) return "draw";
    return rules[player1] === player2 ? "player1" : "player2";
  }

  // drawingBtn.classList.remove("green", "red", "blue");
  function displayResult(winner, player1Choice, player2Choice) {
    if (winner === "draw") {
      resultMessage.textContent = `It's a draw! You both chose ${player1Choice}.`;
    } else if (winner === "player1") {
      resultMessage.textContent = `${player1Name} wins! ${capitalizeFirstLetter(
        player1Choice
      )} beats ${player2Choice}.`;
    } else {
      resultMessage.textContent = `${player2Name}  wins! ${capitalizeFirstLetter(
        player2Choice
      )} beats ${player1Choice}.`;
    }
  }

  function updateScore(winner) {
    if (winner === "player1") {
      player1Score++;
    } else if (winner === "player2") {
      player2Score++;
    }
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

  resetBtn.addEventListener("click", () => {
    resultMessage.textContent = "";
    resetScore();
    updateScoreDisplay();
    currentPlayer = 1;
    updateCurrentPlayerVisual();
  });
  changeBtn.addEventListener("click", () => {
    resultMessage.textContent = "";
    resetScore();
    updateScoreDisplay();
    currentPlayer = 1;
    updateCurrentPlayerVisual();
    gameContainer.classList.add("hidden");
    playersContainer.classList.remove("hidden");
    namesInputs.forEach((input) => {
      input.value = "";
    });
  });

  function capitalizeFirstLetter(word) {
    return word[0].toUpperCase() + word.slice(1);
  }

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
