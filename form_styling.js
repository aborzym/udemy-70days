document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    alert("Form sent succesfully!");
    form.reset();
  });
});
