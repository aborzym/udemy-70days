// Kod zostanie uruchomiony po załadowaniu całego dokumentu
document.addEventListener("DOMContentLoaded", () => {
  const prevMonthBtn = document.getElementById("prevMonth");
  const nextMonthBtn = document.getElementById("nextMonth");
  const currentMonthDisplay = document.getElementById("currentMonth");
  const calendarBody = document.getElementById("calendarBody");
  const eventModal = document.getElementById("eventModal");
  const eventForm = document.getElementById("eventForm");
  const eventDateInput = document.getElementById("eventDate");
  const eventTitleInput = document.getElementById("eventTitle");
  const closeModalBtn = document.querySelector(".close");

  //obsluga localStorage
  const loadEvents = () => {
    return JSON.parse(localStorage.getItem("events")) || [];
  };
  const uploadEvents = (events) => {
    localStorage.setItem("events", JSON.stringify(events));
  };

  let currentMonth = new Date();
  let events = loadEvents() ? loadEvents() : {};
  //    Funkcja renderowania kalendarza:
  //Krok 4.1: Pobierz bieżący rok i miesiąc z obiektu currentMonth.
  //Krok 4.2: Ustaw tekst elementu currentMonthDisplay na nazwę miesiąca i rok.
  //Krok 4.3: Wyczyść zawartość calendarBody.
  //Krok 4.4: Pobierz pierwszy dzień miesiąca i liczbę dni w miesiącu.
  //Krok 4.5: Wygeneruj wiersze i komórki tabeli dla kalendarza.
  //Krok 4.6: Dodaj wydarzenia do odpowiednich dni, jeśli istnieją.
  renderCalendar();
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
      for (let j = 0; j < 7; j++) {
        const cell = document.createElement("td");

        if (i === 0 && j < firstDayOfMonth) {
          cell.innerHTML = "";
        } else if (date > daysInMonth) {
          break;
        } else {
          cell.innerHTML = date;
          const eventKey = `${year} - ${month + 1} - ${date}`;
          if (events[eventKey]) {
            const eventDiv = document.createElement("div");
            eventDiv.textContent = events[eventKey];
            eventDiv.className = "event";
            cell.appendChild(eventDiv);
          }
          cell.addEventListener("click", () => openEventModal(eventKey));
          date++;
        }
        row.appendChild(cell);
      }
      calendarBody.appendChild(row);
    }
    loadEvents(events);
  }

  //Funkcja otwierania okna modalnego wydarzeń (dostaje eventKey z poprzedniej funkcji):

  function openEventModal(date) {
    //Ustaw wartość eventDateInput na wybraną datę.
    eventDateInput.value = date;
    //Ustaw styl wyświetlania eventModal na block, aby otworzyć modalne okno.
    eventModal.style.display = "block";
  }

  //Funkcja zamykania okna modalnego wydarzeń
  function closeEventModal() {
    eventModal.style.display = "none";
  }
  //    Funkcja dodawania wydarzeń
  // Krok 7.1: Zapobiegaj domyślnemu zachowaniu formularza.
  // Krok 7.2: Pobierz datę i tytuł wydarzenia z odpowiednich pól.
  // Krok 7.3: Jeśli tytuł jest niepusty, dodaj wydarzenie do obiektu events.
  // Krok 7.4: Renderuj kalendarz, zamknij modalne okno i zresetuj formularz.
  function addEvent(e) {
    e.preventDefault();
    const date = eventDateInput.value;
    const title = eventTitleInput.value;
    if (title) {
      events[date] = title;
      uploadEvents(events);
      renderCalendar();
      closeEventModal();
      eventForm.reset();
    }
  }

  //obsługa przycisków zmiany miesiąca
  prevMonthBtn.addEventListener("click", () => {
    currentMonth.setMonth(currentMonth.getMonth() - 1);
    renderCalendar();
  });

  nextMonthBtn.addEventListener("click", () => {
    currentMonth.setMonth(currentMonth.getMonth() + 1);
    renderCalendar();
  });

  //zamykanie modalnego okna

  closeModalBtn.addEventListener("click", closeEventModal);

  //zamykanie modala na kliknięcie poza nim i klawisz esc

  window.addEventListener("click", (e) => {
    if (e.target == eventModal) {
      closeEventModal();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeEventModal();
  });

  //obsluga formularza dodawania wydarzeń

  eventForm.addEventListener("submit", addEvent);
});
