const baseUrl = "http://localhost:3000/users";

const form = document.querySelector(".submitForm");
const table = document.querySelector("#crudtable");
const tbody = document.querySelector("#items");

let users = [];

function renderUsers() {
  tbody.innerHTML = "";
  for (let user of users) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${user.name}</td>
      <td>${user.gender}</td>
      <td>${user.email}</td>
    `;
    const tdEdit = document.createElement("td");
    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.addEventListener("click", () => {
      form.querySelector(".name").value = user.name;
      form.querySelector(".gender").value = user.gender;
      form.querySelector(".email").value = user.email;
      form.querySelector(".button1 button").style.display = "none";
      form.querySelector(".button2 button").style.display = "block";
      form.querySelector(".button2 button").dataset.id = user.id;
    });
    tdEdit.appendChild(editButton);

    const tdDelete = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", async () => {
      try {
        await fetch(`${baseUrl}/${user.id}`, {
          method: "DELETE",
        });
        users = users.filter((u) => u.id !== user.id);
        renderUsers();
      } catch (error) {
        console.error(error);
        alert("An error occurred");
      }
    });
    tdDelete.appendChild(deleteButton);

    tr.appendChild(tdEdit);
    tr.appendChild(tdDelete);

    tbody.appendChild(tr);
  }
}

async function handleSubmit(event) {
  event.preventDefault();
  const name = form.querySelector(".name").value.trim();
  const gender = form.querySelector(".gender").value.trim();
  const email = form.querySelector(".email").value.trim();
  if (!name || !gender || !email) {
    alert("Please enter all fields");
    return;
  }
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, gender, email }),
    });
    const newUser = await response.json();
    users.push(newUser);
    renderUsers();
    form.reset();
  } catch (error) {
    console.error(error);
    alert("An error occurred");
  }
}

async function handleUpdate(event) {
  event.preventDefault();
  const name = form.querySelector(".name").value.trim();
  const gender = form.querySelector(".gender").value.trim();
  const email = form.querySelector(".email").value.trim();
  if (!name || !gender || !email) {
    alert("Please enter all fields");
    return;
  }
  const id = event.target.dataset.id;
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, gender, email }),
    });
    const updatedUser = await response.json();
    const index = users.findIndex((u) => u.id === updatedUser.id);
    users[index] = updatedUser;
    renderUsers();
    form.reset();
    form.querySelector(".button1 button").style.display = "block";
    form.querySelector(".button2 button").style.display = "none";
    form.querySelector(".button2 button").dataset.id = "";
  } catch (error) {
    console.error(error);
    alert("An error occurred");
  }
}
