const validateForm = () => {
  const form = document.getElementById("contactForm");
  const name = form.elements["name"].value;
  const email = form.elements["email"].value;
  const message = form.elements["message"].value;
  const formMessage = document.getElementById("formMessage");
  if (!name || !email || !message) {
    formMessage.textContent = "Fill all the fields, please";
    return;
  }
  if (!email.includes("@")) {
    formMessage.textContent = "Email adress is not valid";
    return;
  }
  formMessage.classList.add("success");
  formMessage.textContent = "Form sent succesfully";
};

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  validateForm();
});
