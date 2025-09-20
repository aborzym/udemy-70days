document.addEventListener("DOMContentLoaded", function () {
  // Kod, który ma zostać uruchomiony po załadowaniu całego dokumentu
  const searchInput = document.getElementById("search");
  const products = document.querySelectorAll(".product");
  searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase();
    products.forEach((product) => {
      const productName = product.getAttribute("data-name").toLowerCase();
      if (productName.includes(query)) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  });
});
