document.addEventListener("DOMContentLoaded", () => {
  const draggables = document.querySelectorAll(".draggable");
  const dropzones = document.querySelectorAll(".dropzone");

  // Dodanie obsługi zdarzeń dla elementów draggable, aby zmieniać ich wygląd podczas przeciągania.
  //Dodaj obsługę zdarzenia dragend, aby przywrócić pierwotny wygląd po zakończeniu przeciągania.

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", (e) => {
      e.target.classList.add("dragging");
    });
    draggable.addEventListener("dragend", (e) => {
      e.target.classList.remove("dragging");
    });
  });
  // Dodaj obsługę zdarzenia dragover dla elementów dropzone, aby umożliwić upuszczanie elementów draggable. Użyj e.preventDefault(), aby domyślne zachowanie przeglądarki nie zakłócało działania.

  // Dodaj obsługę zdarzenia dragleave, aby przywrócić pierwotny wygląd dropzone, gdy przeciągany element opuści dropzone.

  // Dodaj obsługę zdarzenia drop, aby przemieszczać elementy draggable do odpowiedniej dropzone.

  dropzones.forEach((dropzone) => {
    dropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.target.classList.add("over");
    });
    dropzone.addEventListener("dragleave", (e) => {
      e.target.classList.remove("over");
    });
    dropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      e.target.classList.remove("over");

      const draggable = document.querySelector(".dragging");
      e.target.appendChild(draggable);
    });
  });
});
