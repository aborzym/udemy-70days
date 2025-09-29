const ctx = document.getElementById("goldChart").getContext("2d");
const currencySelect = document.getElementById("currency");
const timeRange = document.getElementById("time-range");
let currentCurrency = "USD";
let currentTimeRange = 120;
let chart;

currencySelect.addEventListener("change", (e) => {
  currentCurrency = e.target.value;
  updateChart();
});

timeRange.addEventListener("change", (e) => {
  currentTimeRange = parseInt(e.target.value);
  updateChart();
});

function renderChart() {
  // if (!goldData || !goldData[currentCurrency]) {
  //   console.error("Data is not available for the selected currency.");
  //   return;
  // }
  // Sprawdź, czy wykres istnieje, i zniszcz go, aby uniknąć problemów z wielokrotnym rysowaniem:
  // Chart.js → chart.destroy() usuwa wykres i zwalnia pamięć
  if (chart) chart.destroy();
  // Pobierz etykiety (miesiące) i dane (ceny) dla aktualnej waluty i zakresu czasu:
  // chart.getLabels() zwraca wszystkie etykiety osi.

  const labels = getLabels();
  const dataset = getDataset();

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: `Gold Price (${currentCurrency})`,
          data: dataset,
          borderColor: "rgba(255, 165, 0, 1)",
          backgroundColor: "rgba(255, 165, 0, 0.2)",
          borderWidth: 2,
          tension: 0.3,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: "Month",
          },
        },
        y: {
          title: {
            display: true,
            text: `Price (${currentCurrency})`,
          },
        },
      },
    },
  });
}

function getLabels() {
  if (!goldData[currentCurrency]) return [];
  const allLabels = Object.keys(goldData[currentCurrency]);
  return allLabels.slice(-currentTimeRange);
}

function getDataset() {
  if (!goldData[currentCurrency]) return [];
  const allValues = Object.values(goldData[currentCurrency]);
  return allValues.slice(-currentTimeRange);
}

function updateChart() {
  const labels = getLabels();
  const dataset = getDataset();
  chart.data.labels = labels;
  chart.data.datasets[0].data = dataset; // konieczne, żeby zmienić dane wykresu
  chart.data.datasets[0].label = `Gold Price (${currentCurrency})`;
  chart.options.scales.y.title.text = `Price (${currentCurrency})`; // opcjonalnie
  chart.update();
}

renderChart();
