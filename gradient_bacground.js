document.addEventListener("DOMContentLoaded", () => {
  const colors = [
    ["#ff7e5f", "#feb47b"],
    ["#6a11cb", "#2575fc"],
    ["#ff4b1f", "#ff9068"],
    ["#00f260", "#0575e6"],
    ["#e1eec3", "#f05053"],
  ];
  let currentIndex = 0;
  function changeBackground() {
    currentIndex = (currentIndex + 1) % colors.length;
    document.body.style.background = `linear-gradient(0deg, ${colors[currentIndex][0]}, ${colors[currentIndex][1]})`;
  }
  setInterval(changeBackground, 5000);
});
