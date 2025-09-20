document.addEventListener("DOMContentLoaded", function () {
  // Kod zostanie uruchomiony po załadowaniu całego dokumentu
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const answer = question.nextElementSibling;
      if (answer.style.maxHeight) {
        // Jeśli odpowiedź jest rozwinięta, zwiń ją
        answer.style.maxHeight = null;
      } else {
        // Ukryj wszystkie odpowiedzi
        const allAnswers = document.querySelectorAll(".faq-answer");
        allAnswers.forEach((answr) => (answr.style.maxHeight = null));
        // Pokaż bieżącą odpowiedź
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
});
