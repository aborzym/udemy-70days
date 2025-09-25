document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector(".gallery");
  gallery.addEventListener("wheel", (e) => {
    e.preventDefault();
    gallery.scrollBy({ left: e.deltaY < 0 ? -75 : 75 });
  });
});
