document.addEventListener("DOMContentLoaded", () => {
  const captchaForm = document.getElementById("captchaForm");
  const userInput = document.getElementById("userInput");
  const captchaCanvas = document.getElementById("captchaCanvas");
  const refreshCaptcha = document.getElementById("refreshCaptcha");
  const resultMessage = document.getElementById("resultMessage");

  let captchaText = "";
  //funkcja , która generuje losowy tekst captchy z zestawu znaków.
  const generateCaptcha = () => {
    const charsArray =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const length = 6;
    captchaText = "";
    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * charsArray.length);
      captchaText += charsArray[index];
    }
    drawCaptcha();
  };

  // funkcja, która rysuje tekst captchy na elemencie canvas.

  function drawCaptcha() {
    const ctx = captchaCanvas.getContext("2d"); //zwraca kontekst 2D, czyli obiekt, którym rysujemy na canvasie (prostokąty, tekst, linie itp.).
    // ctx to standardowa nazwa dla kontekstu 2D.
    ctx.clearRect(0, 0, captchaCanvas.width, captchaCanvas.height); //Czyści cały canvas przed rysowaniem nowego Captcha.
    //clearRect(x, y, width, height) usuwa wszystko w prostokącie od (0,0) do (width,height), czyli w tym przypadku całą powierzchnię canvasu.
    ctx.font = "30px Arial";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const centerX = captchaCanvas.width / 2;
    const centerY = captchaCanvas.height / 2;

    // 3️⃣ Rysujemy każdą literę osobno z losowym przesunięciem i rotacją
    const letters = captchaText.split("");
    const spacing = 30; // odległość między literami
    const startX = centerX - ((letters.length - 1) * spacing) / 2;

    letters.forEach((letter, i) => {
      const x = startX + i * spacing;
      const y = centerY + (Math.random() * 10 - 5); // losowe przesunięcie w pionie
      const angle = Math.random() * 0.4 - 0.2; // losowy kąt obrotu w radianach
      ctx.save(); // zapisujemy aktualny stan kontekstu
      ctx.translate(x, y); // przesuwamy układ współrzędnych do miejsca litery
      ctx.rotate(angle); // obracamy literę
      ctx.fillText(letter, 0, 0);
      ctx.restore(); // przywracamy stan kontekstu
    });
    // ctx.fillText(
    //   captchaText,
    //   captchaCanvas.width / 2,
    //   captchaCanvas.height / 2 + 10
    // );

    // 4️⃣ Dodajemy losowe linie zakłócające
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = "#" + Math.floor(Math.random() * 16777215).toString(16); // losowy kolor
      ctx.beginPath();
      ctx.moveTo(
        Math.random() * captchaCanvas.width,
        Math.random() * captchaCanvas.height
      );
      ctx.lineTo(
        Math.random() * captchaCanvas.width,
        Math.random() * captchaCanvas.height
      );
      ctx.stroke();
    }
  }

  refreshCaptcha.addEventListener("click", () => {
    generateCaptcha();
    userInput.value = "";
  });

  captchaForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (userInput.value === captchaText) {
      resultMessage.style.color = "green";
      resultMessage.textContent = "Captcha verified successfully!";
    } else {
      resultMessage.style.color = "red";
      resultMessage.textContent =
        "Captcha verification failed. Please try again.";
    }
    generateCaptcha();
    userInput.value = "";
  });
  generateCaptcha();
});
