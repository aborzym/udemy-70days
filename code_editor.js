document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const codeAreas = document.querySelectorAll(".code-area");
  const runCodeButton = document.getElementById("run-code");
  const output = document.getElementById("output");
  // Funkcja obsługująca przełączanie zakładek
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // usuń klasę active ze wszystkich zakładek, a następnie dodaj ją do klikniętej zakładki.
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      // Pokaż odpowiedni obszar kodu na podstawie atrybutu data-tab klikniętej zakładki i ukryj pozostałe obszary.
      const activeTab = tab.getAttribute("data-tab");
      codeAreas.forEach((area) => {
        area.style.display = area.id === activeTab ? "block" : "none";
      });
    });
  });
  // Funkcja uruchamiania kodu
  runCodeButton.addEventListener("click", () => {
    //   pobierz wartości z obszarów kodu HTML, CSS i JavaScript.
    const htmlCode = document.getElementById("html").value;
    const cssCode = document.getElementById("css").value;
    const jsCode = document.getElementById("js").value;
    //   Połącz te wartości w jedną zmienną zawierającą kompletną zawartość strony z kodem HTML, CSS i JavaScript.
    const outputContent = `${htmlCode}${cssCode}${jsCode}`;
    output.srcdoc = outputContent;
  });
});
