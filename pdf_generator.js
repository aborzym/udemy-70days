document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".content");
  const generateBtn = document.getElementById("generate-pdf");

  //w html jest załadowana biblioteka jsPDF i html2canvas

  const { jsPDF } = window.jspdf;

  // Utwórz funkcję generatePDF, która tworzy nowy dokument PDF, pobiera zawartość kontenera .content i zapisuje ją jako PDF.

  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const contentWidth = content.offsetWidth * 0.5; // skala = 0.5 jak w opcjach

    // Użycie metody html() do konwersji HTML na PDF
    doc.html(content, {
      callback: function (doc) {
        doc.save("document.pdf");
      },
      x: (pageWidth - contentWidth) / 2, //wyśrodkowanie
      y: 20,
      html2canvas: { scale: 0.5 }, // zmniejsza skalę jeśli zawartość jest duża
      autoPaging: "text", // 👉 ważne, aktywuje automatyczne dzielenie na strony
      width: contentWidth, // szerokość bloku
      windowWidth: content.offsetWidth, // potrzebne do poprawnego skalowania
    });
  };
  generateBtn.addEventListener("click", generatePDF);
});
