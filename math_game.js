document.addEventListener("DOMContentLoaded", () => {
  const questionElement = document.getElementById("question");
  const answerElement = document.getElementById("answer");
  const submitButton = document.getElementById("submit");
  const feedbackElement = document.getElementById("feedback");
  const scoreElement = document.getElementById("score");
  let currentAnswer = 0;
  let score = 0;

  //funkcja generująca pytanie:
  const generateQuestion = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ["+", "-", "*"];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    const question = `${num1} ${operator} ${num2}`;
    //eval wykonuje kod zapisany w stringu
    currentAnswer = eval(question);
    questionElement.textContent = `${question} = ?`;
  };
  generateQuestion();

  //funkcja sprawdzająca odpowiedź

  const checkAnswer = () => {
    //Pobiera odpowiedź użytkownika z pola tekstowego.
    //zamienia string na liczbę całkowitą.
    const userAnswer = parseInt(answerElement.value);
    //Sprawdza, czy odpowiedź użytkownika jest poprawna.
    // Wyświetla informację zwrotną (zielony tekst dla poprawnej odpowiedzi, czerwony dla błędnej).
    // Aktualizuje wynik gracza, jeśli odpowiedź jest poprawna.

    if (userAnswer === currentAnswer) {
      feedbackElement.textContent = "Good";
      feedbackElement.style.color = "green";
      score++;
    } else {
      feedbackElement.textContent = "Wrong. Try again";
      feedbackElement.style.color = "red";
    }
    scoreElement.textContent = score;
    //   Czyści pole odpowiedzi i generuje nowe pytanie.
    answerElement.value = "";
    generateQuestion();
  };

  submitButton.addEventListener("click", checkAnswer);
});
