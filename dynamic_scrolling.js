//która będzie odpowiadać za dodawanie nowych treści do strony. Na początek może symulować ładowanie danych przez dodanie elementów do DOM.
const loadContent = () => {
  const loader = document.getElementById("loader");
  loader.hidden = false; // pokaż loader
  setTimeout(() => {
    const content = document.getElementById("content");
    for (let i = 0; i < 20; i++) {
      const element = document.createElement("div");
      element.innerText = "Item #" + (content.children.length + 1);
      content.appendChild(element);
    }
    loader.hidden = true; // Ukryj loader po załadowaniu treści
  }, 400); //opoznienie, zeby loader sie pokazał
};

//Funkcja, która będzie monitorować pozycję scrolla użytkownika na stronie i wywoła loadContent w odpowiednim momencie.
//scrollTop – ile pikseli zostało przewinięte od góry strony. Jeśli jesteś na samej górze, scrollTop = 0.
//scrollHeight – całkowita wysokość całego dokumentu, wliczając niewidoczną część poza oknem przeglądarki.
//clientHeight – wysokość widocznego okna przeglądarki (viewportu).
//if (scrollTop + clientHeight >= scrollHeight)  - Użytkownik na dole strony
//Te trzy wartości najczęściej używa się razem np. do sprawdzania, czy użytkownik przewinął do dołu strony

const setupInfiniteScrolling = () => {
  window.addEventListener("scroll", function () {
    const { scrollTop, scrollHeight, clientHeight } =
      this.document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      //pokaż loader
      document.getElementById("loader").hidden = false;
      // Symuluj opóźnienie sieci
      this.setTimeout(loadContent, 1000);
    }
  });
};

//nasłuchiwanie na zdarzenie DOMContentLoaded, które zapewnia, że skrypt zacznie działać dopiero po całkowitym załadowaniu strony.

document.addEventListener("DOMContentLoaded", function () {
  loadContent();
  setupInfiniteScrolling();
});
