document.addEventListener("DOMContentLoaded", () => {
  const themeToggleBtn = document.getElementById("theme-toggle");

  //Sprawdzenie aktualnego motywu

  // Pobierz aktualny motyw z localStorage (jeśli jest ustawiony) lub ustaw domyślny motyw na jasny.

  // Dodaj klasę light lub dark do elementu body w zależności od aktualnego motywu.

  const currentTheme = localStorage.getItem("theme") || "light";
  document.body.classList.add(currentTheme);

  //zmiana motywu
  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    document.body.classList.toggle("dark");
    const newTheme = document.body.classList.contains("light")
      ? "light"
      : "dark";
    localStorage.setItem("theme", newTheme);
  });
});
