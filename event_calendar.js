document.addEventListener("DOMContentLoaded", () => {
  // Kod zostanie uruchomiony po załadowaniu całego dokumentu
  const prevMonthBtn = document.getElementById("prevMonth");
  const nextMonthBtn = document.getElementById("nextMonth");
  const currentMonthDisplay = document.getElementById("currentMonth");
  const calendarBody = document.getElementById("calendarBody");
  const eventModal = document.getElementById("eventModal");
  const eventForm = document.getElementById("eventForm");
  const eventDateInput = document.getElementById("eventDate");
  const eventTitleInput = document.getElementById("eventTitle");
  const closeModalBtn = document.querySelector(".close");

  let currentMonth = new Date();
  let events = {};

  function renderCalendar() {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    //Metoda konwertuje obiekt Date na string w formacie lokalnym. 'en-US' oznacza angielski (USA), czyli np. "August 2025".
    currentMonthDisplay.textContent = currentMonth.toLocaleDateString("en-US", {
      //month: 'long' → pełna nazwa miesiąca, np. "August"
      month: "long",
      //year: 'numeric' → pełny rok, np. "2025"
      year: "numeric",
    });
    calendarBody.innerHTML = "";
    //month → liczba od 0 do 11 (0 = styczeń, 11 = grudzień).
    //1 → pierwszy dzień miesiąca.
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    //0 → dzień zerowy miesiąca, czyli ostatni dzień poprzedniego miesiąca
    //jeśli chcemy sprawdzić ilość dni w sierpniu (miesiąc = 7), to month + 1 = 8 (wrzesień), dzień 0 → ostatni dzień sierpnia.
    //getDate Zwraca numer dnia w miesiącu dla tej daty (1–31).
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let date = 1;
    for (let i = 0; i < 6; i++) {
      const row = document.createElement("tr");
    }
  }
});
