const getLocalStorage = localStorage.getItem("email");

if (getLocalStorage !== null) {
  const collection = document.getElementsByClassName("name-data");
  collection[0].innerHTML = `Hello ${getLocalStorage}!`;
}

// retrieve data from local storage
var data = JSON.parse(localStorage.getItem("data")) || [];

// show data in the table
function showData() {
  var tableBody = document.querySelector("#dataTable tbody");
  tableBody.innerHTML = "";
  var rows = data.map(function (item, i) {
    var row = "<tr>";
    row += "<td>" + item.name + "</td>";
    row += "<td>" + item.gender + "</td>";
    row += "<td>" + item.email + "</td>";
    row +=
      "<td><button class='edit' type='button' onclick='editData(" +
      i +
      ")'>edit</button>";
    row +=
      "<button class='delete' type='button' onclick='deleteData(" +
      i +
      ")'>delete</button></td>";
    row += "</tr>";
    return row;
  });
  tableBody.innerHTML = rows.join("");
}

// add new data to the object and local storage
function addData() {
  var name = document.querySelector("#inputName").value;
  var gender = document.querySelector("#inputGender").value;
  var email = document.querySelector("#inputEmail").value;
  data.push({ name: name, gender: gender, email: email });
  localStorage.setItem("data", JSON.stringify(data));
  showData();
}

// edit existing data in the object and local storage
function editData(index) {
  var name = prompt("new name:", data[index].name);
  var gender = prompt("new gender:", data[index].gender);
  var email = prompt("new email:", data[index].email);
  data[index] = { name: name, gender: gender, email: email };
  localStorage.setItem("data", JSON.stringify(data));
  showData();
}

// delete data from the object and local storage
function deleteData(index) {
  data.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(data));
  showData();
}

// show data on page load
window.onload = function () {
  showData();
};
