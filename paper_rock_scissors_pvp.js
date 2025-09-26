document.addEventListener("DOMContentLoaded", () => {
  const choices = document.querySelectorAll(".choice");
  const resultMessage = document.querySelector(".result-message");
  const player1ScoreElem = document.getElementById("player1-score");
  const player2ScoreElem = document.getElementById("player2-score");
  const resetBtn = document.querySelector(".reset-btn");
  const drawingBtn = document.getElementById("draw");
  const actionMessage = document.getElementById("action");
  const player1Message = "Player 1 - make your choice";
  const player2Message = "Player 2 - make your choice";
  let player1Score = 0;
  let player2Score = 0;
  let player1Choice;
  let player2Choice;
  let currentPlayer = 1;

  const rules = {
    rock: "scissors",
    scissors: "paper",
    paper: "rock",
  };

  actionMessage.textContent = player1Message;
  choices.forEach((choice) => {
    choice.addEventListener("click", () => {
      if (currentPlayer === 1) {
        player1Choice = choice.getAttribute("data-choice");
        currentPlayer = 2;
        actionMessage.textContent = player2Message;
      } else {
        player2Choice = choice.getAttribute("data-choice");
        currentPlayer = 1;
        actionMessage.textContent = player1Message;
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
      resultMessage.textContent = `Player 1 wins! ${capitalizeFirstLetter(
        player1Choice
      )} beats ${player2Choice}.`;
    } else {
      resultMessage.textContent = `Player 2 wins ${capitalizeFirstLetter(
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
    actionMessage.textContent = player1Message;
  });

  function capitalizeFirstLetter(word) {
    return word[0].toUpperCase() + word.slice(1);
  }
});
