const nameInput = document.getElementById("name");
const nameError = document.getElementById("nameError");
const emailInput = document.getElementById("email");
const emailError = document.getElementById("emailError");
const passwordInput = document.getElementById("password");
const passwordError = document.getElementById("passwordError");
const submitBtn = document.getElementById("submitbutton");

nameInput.addEventListener("input", function (e) {
  const nameRegex = /^[A-Z][a-z]*$/;
  if (!nameRegex.test(e.target.value)) {
    nameError.style.display = "block";
    nameInput.classList.add("error");
  } else {
    nameError.style.display = "none";
    nameInput.classList.remove("error");
  }
});

emailInput.addEventListener("input", function (e) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(e.target.value)) {
    emailError.style.display = "block";
    emailInput.classList.add("error");
  } else {
    emailError.style.display = "none";
    emailInput.classList.remove("error");
  }
});

passwordInput.addEventListener("input", function (e) {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(e.target.value)) {
    passwordError.style.display = "block";
    passwordInput.classList.add("error");
  } else {
    passwordError.style.display = "none";
    passwordInput.classList.remove("error");
  }
});

// const userCollection = [];
const userCollection = JSON.parse(localStorage.getItem("users")) || [];
submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const user = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };
  userCollection.push(user);
  localStorage.setItem("users", JSON.stringify(userCollection));
  window.location.href = "/homepage/index.html";
});
