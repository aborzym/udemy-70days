/* ==============================
   GALERIA
   ============================== */

const modal = document.getElementById("myModal");
const modalImg = document.getElementById("img01");
const captionText = document.getElementById("caption");

function openModal(src, alt) {
  modal.style.display = "block";
  modalImg.src = src;
  captionText.innerHTML = alt;
}

const closeModal = () => {
  modal.style.display = "none";
};

document.querySelectorAll(".gallery img").forEach((img) => {
  img.addEventListener("click", () => openModal(img.src, img.alt));
});

document.querySelector(".close").addEventListener("click", closeModal);

//zamykanie na kliknięcie w tło:

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

//zamykanie na ESC:

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
