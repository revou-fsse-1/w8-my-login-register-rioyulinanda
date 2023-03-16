const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const button = document.getElementById("btnfield");

button.addEventListener("click", function (e) {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    // User is authenticated, redirect to homepage
    window.location.href = "/crud-application/crudapplication.html";
  } else {
    // User is not authenticated, show error message
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.style.display = "block";
  }
});
