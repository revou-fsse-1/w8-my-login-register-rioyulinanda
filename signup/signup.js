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
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!name || !email || !password) {
    alert("Please fill in all fields");
    return;
  }

  if (!isValidEmail(email)) {
    alert("Please enter a valid email address");
    return;
  }

  if (!isValidPassword(password)) {
    alert(
      "Please enter a password with at least 8 characters and at least one uppercase letter, one lowercase letter, and one number"
    );
    return;
  }

  if (!isValidName(name)) {
    alert(
      "Please enter a name with at least 2 characters, starting with an uppercase letter and only using letters"
    );
    return;
  }

  const user = {
    name: name,
    email: email,
    password: password,
  };

  userCollection.push(user);
  localStorage.setItem("users", JSON.stringify(userCollection));
  window.location.href = "/index.html";
});

function isValidEmail(email) {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
  return passwordRegex.test(password);
}

function isValidName(name) {
  const nameRegex = /^[A-Z][a-zA-Z]{1,}$/;
  return nameRegex.test(name);
}
