document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const progressBar = document.getElementById("progress");
  const progressText = document.getElementById("progress-text");
  const content = document.getElementById("content");

  //zmienna , która będzie przechowywać aktualny postęp ładowania (początkowo ustawioną na 0).
  let progress = 0;

  //Funkcja aktualizacji postepu, która będzie zwiększać wartość progress, aktualizować szerokość paska postępu oraz tekst postępu.

  const updateProgress = () => {
    //Sprawdź, czy progress jest mniejszy niż 100. Jeśli tak, ustaw timer, aby ponownie wywołać updateProgress po krótkim czasie. W przeciwnym razie ukryj kontener ładowania i pokaż zawartość strony.
    progress += 1;
    progressBar.style.width = progress + "%";
    progressText.textContent = `Loading... ${progress}%`;

    if (progress < 100) {
      setTimeout(updateProgress, 30);
    } else {
      loader.style.display = "none";
      content.style.display = "block";
    }
  };
  updateProgress();
});
