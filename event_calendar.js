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
  const eventDateEdit = document.getElementById("eventDateEdit");
  const eventTitleEdit = document.getElementById("eventTitleEdit");
  const eventEditModal = document.getElementById("eventEditModal");
  const eventEditForm = document.getElementById("eventEditForm");
  const closeEdit = document.getElementById("closeEdit");

  //obsluga localStorage
  const loadEvents = () => {
    return JSON.parse(localStorage.getItem("events")) || {};
  };
  const uploadEvents = (events) => {
    localStorage.setItem("events", JSON.stringify(events));
  };

  let currentMonth = new Date();
  let events = loadEvents() ? loadEvents() : {};
  //    Funkcja renderowania kalendarza:
  //Pobierz bieżący rok i miesiąc z obiektu currentMonth.
  //Ustaw tekst elementu currentMonthDisplay na nazwę miesiąca i rok.
  //Wyczyść zawartość calendarBody.
  //Pobierz pierwszy dzień miesiąca i liczbę dni w miesiącu.
  //Wygeneruj wiersze i komórki tabeli dla kalendarza.
  //Dodaj wydarzenia do odpowiednich dni, jeśli istnieją.
  renderCalendar();
  function renderCalendar() {
    // Pobranie bieżącego roku i miesiąca z obiektu currentMonth
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    //Metoda konwertuje obiekt Date na string w formacie lokalnym. 'en-US' oznacza angielski (USA), czyli np. "August 2025".
    // Ustawienie nagłówka z nazwą miesiąca i rokiem w formacie "August 2025"
    currentMonthDisplay.textContent = currentMonth.toLocaleDateString("en-US", {
      //month: 'long' → pełna nazwa miesiąca, np. "August"
      month: "long",
      //year: 'numeric' → pełny rok, np. "2025"
      year: "numeric",
    });
    // Wyczyść zawartość tabeli kalendarza przed ponownym renderowaniem
    calendarBody.innerHTML = "";
    // Obliczenie dnia tygodnia dla pierwszego dnia miesiąca (0 = niedziela, 6 = sobota)
    //month → liczba od 0 do 11 (0 = styczeń, 11 = grudzień).
    //1 → pierwszy dzień miesiąca.
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    // Obliczenie liczby dni w bieżącym miesiącu
    //0 → dzień zerowy miesiąca, czyli ostatni dzień poprzedniego miesiąca
    //jeśli chcemy sprawdzić ilość dni w sierpniu (miesiąc = 7), to month + 1 = 8 (wrzesień), dzień 0 → ostatni dzień sierpnia.
    //getDate Zwraca numer dnia w miesiącu dla tej daty (1–31).
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let date = 1; // numer dnia, który będzie wstawiany do komórek
    // Pętla tworząca maksymalnie 6 wierszy (tygodni) w kalendarzu
    for (let i = 0; i < 6; i++) {
      const row = document.createElement("tr"); // Tworzymy wiersz tabeli

      // Pętla tworząca 7 kolumn (dni tygodnia) w każdym wierszu
      for (let j = 0; j < 7; j++) {
        const cell = document.createElement("td"); // Tworzymy komórkę tabeli

        // Jeśli jesteśmy w pierwszym wierszu i kolumna jest przed pierwszym dniem miesiąca
        if (i === 0 && j < firstDayOfMonth) {
          cell.innerHTML = ""; // pozostaw pustą komórkę
        }
        // Jeśli numer dnia przekracza liczbę dni w miesiącu
        else if (date > daysInMonth) {
          cell.innerHTML = ""; // pozostałe komórki w wierszu zostają puste
        } else {
          // Wstaw numer dnia do komórki
          cell.innerHTML = date;

          // Tworzymy klucz dla events w formacie "2025 - 8 - 15"
          const eventKey = `${year} - ${month + 1} - ${date}`;

          // Jeśli dla danego dnia są wydarzenia w tablicy, dodaj je do komórki
          if (events[eventKey] && events[eventKey].length > 0) {
            events[eventKey].forEach((event) => {
              const eventDiv = document.createElement("div"); // Tworzymy div dla eventu
              eventDiv.textContent = event.title; // Wstawiamy tytuł eventu
              eventDiv.className = "event"; // Dodajemy klasę CSS dla stylizacji
              eventDiv.dataset.id = event.id;
              eventDiv.dataset.date = eventKey;
              eventDiv.addEventListener("click", (e) => {
                e.stopPropagation();
                //przypisanie danych do formularza edycji
                eventDateEdit.value = eventKey;
                eventTitleEdit.value = event.title;
                //przypisanie ID eventu do dataset formularza
                eventEditForm.dataset.id = event.id;
                eventEditModal.style.display = "block";
              });
              cell.appendChild(eventDiv); // Dodajemy event do komórki

              //teraz x do kasowania eventu
              const deleteBtn = document.createElement("span");
              deleteBtn.textContent = "x";
              deleteBtn.className = "delete-event";
              //Warto też zapisać id eventu w atrybucie np. data-id:
              deleteBtn.dataset.id = event.id;
              eventDiv.appendChild(deleteBtn);
              deleteBtn.addEventListener("click", (e) => {
                e.stopPropagation(); // ważne! żeby nie otwierać modala po kliknięciu w ×
                // id eventu do usunięcia
                const idToDelete = e.target.dataset.id;
                // filtrujemy tablicę eventów dla tego dnia
                events[eventKey] = events[eventKey].filter(
                  (ev) => ev.id != idToDelete
                );
                // aktualizujemy localStorage
                uploadEvents(events);

                // odświeżamy kalendarz
                renderCalendar();
              });
            });
          }

          // Dodajemy kliknięcie w komórkę, aby otworzyć modal dla danego dnia
          cell.addEventListener("click", () => openEventModal(eventKey));

          date++; // Przechodzimy do następnego dnia
        }

        row.appendChild(cell); // Dodajemy komórkę do wiersza
      }

      calendarBody.appendChild(row); // Dodajemy wiersz do tabeli
    }
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

  function closeEditEventModal() {
    eventEditModal.style.display = "none";
  }
  //    Funkcja dodawania wydarzeń
  // Zapobiegaj domyślnemu zachowaniu formularza.
  // Pobierz datę i tytuł wydarzenia z odpowiednich pól.
  // Sprawdz, czy events[date] istnieje – jeśli nie, tworzysz pustą tablicę.
  // Pushuj nowy obiekt { id, title } do tej tablicy.
  // Renderuj kalendarz, zamknij modalne okno i zresetuj formularz.
  function addEvent(e) {
    e.preventDefault();
    const date = eventDateInput.value;
    const title = eventTitleInput.value;
    if (!events[date]) {
      events[date] = [];
    }
    events[date].push({ id: Date.now(), title });
    uploadEvents(events);
    renderCalendar();
    closeEventModal();
    eventForm.reset();
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
  eventEditForm.addEventListener("submit", editEvent);

  //Funkcja edycji eventu
  function editEvent(e) {
    e.preventDefault();
    const idToEdit = Number(eventEditForm.dataset.id);
    const date = eventDateEdit.value;
    const title = eventTitleEdit.value;
    const eventToEdit = events[date].find((el) => el.id === idToEdit);
    eventToEdit.title = title;
    uploadEvents(events);
    renderCalendar();
    eventEditModal.style.display = "none";
  }

  window.addEventListener("click", (e) => {
    if (e.target == eventEditModal) {
      closeEditEventModal();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeEditEventModal();
  });

  closeEdit.addEventListener("click", (e) => {
    closeEditEventModal();
  });
});
