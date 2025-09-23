document.addEventListener("DOMContentLoaded", () => {
  const typingEffectElement = document.getElementById("typing-effect");
  const textToType = `function helloWorld() 
  {
    console.log("Hello, world!");
}
helloWorld();`;
  const typingSpeed = 100;

  let index = 0; //sledzi aktualna pozycję w tekście

  //   Utwórz funkcję typeText, która będzie iterować po tekście i dodawać kolejne litery do elementu typingEffectElement.
  // Jeśli indeks jest mniejszy niż długość tekstu, dodaj aktualny znak do typingEffectElement, zwiększ indeks o 1 i ustaw timeout na wywołanie funkcji typeText ponownie po określonym czasie.

  const typeText = () => {
    if (index < textToType.length) {
      typingEffectElement.textContent += textToType.charAt(index);
      index++;
      setTimeout(typeText, typingSpeed);
    }
  };
  typeText();
});
