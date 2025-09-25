document.addEventListener("DOMContentLoaded", () => {
  const choices = document.querySelectorAll(".choice");
  const resultMessage = document.querySelector(".result-message");
  const playerScoreElem = document.getElementById("player-score");
  const computerScoreElem = document.getElementById("computer-score");
  const resetBtn = document.querySelector(".reset-btn");
  const drawingBtn = document.getElementById("draw");

  let playerScore = 0;
  let computerScore = 0;
  choices.forEach((choice) => {
    choice.addEventListener("click", async () => {
      const playerChoice = choice.getAttribute("data-choice");
      const computerChoice = await getComputerChoice();
      const winner = determineWinner(playerChoice, computerChoice);
      displayResult(winner, playerChoice, computerChoice);
      updateScore(winner);
    });
  });
  function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const choice = choices[Math.floor(Math.random() * choices.length)];
    return drawComputer(choice).then(() => choice);
  }
  function determineWinner(player, computer) {
    if (player === computer) return "draw";
    else if (
      (player === "rock" && computer === "scissors") ||
      (player === "scissors" && computer === "paper") ||
      (player === "paper" && computer === "rock")
    ) {
      return "player";
    } else return "computer";
  }

  function displayResult(winner, playerChoice, computerChoice) {
    drawingBtn.classList.remove("green", "red", "blue");

    if (winner === "draw") {
      resultMessage.style.color = "blue";
      drawingBtn.classList.add("blue");
      resultMessage.textContent = `It's a draw! You both chose ${playerChoice}.`;
    } else if (winner === "player") {
      resultMessage.style.color = "green";
      drawingBtn.classList.add("green");
      resultMessage.textContent = `You win! ${capitalizeFirstLetter(
        playerChoice
      )} beats ${computerChoice}.`;
    } else {
      resultMessage.style.color = "red";
      drawingBtn.classList.add("red");
      resultMessage.textContent = `You lose! ${capitalizeFirstLetter(
        computerChoice
      )} beats ${playerChoice}.`;
    }
  }
  function updateScore(winner) {
    if (winner === "player") {
      playerScore++;
    } else if (winner === "computer") {
      computerScore++;
    }
    playerScoreElem.textContent = playerScore;
    computerScoreElem.textContent = computerScore;
  }

  function resetScore() {
    playerScore = 0;
    computerScore = 0;
  }
  resetBtn.addEventListener("click", () => {
    resultMessage.textContent = "";
    drawingBtn.style.display = "none";
    resetScore();
    updateScore();
  });

  function drawComputer(choice) {
    return new Promise((resolve) => {
      drawingBtn.textContent = "I choose...";
      drawingBtn.style.display = "inline-block";
      drawingBtn.classList.remove("drawed", "green", "red", "blue");
      drawingBtn.classList.add("drawing", "shake");
      setTimeout(() => {
        drawingBtn.classList.remove("drawing", "shake");
        drawingBtn.classList.add("drawed");
        drawingBtn.textContent = capitalizeFirstLetter(choice);
        resolve();
      }, 1200);
    });
  }

  function capitalizeFirstLetter(word) {
    return word[0].toUpperCase() + word.slice(1);
  }
});
