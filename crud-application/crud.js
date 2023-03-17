const getLocalStorage = localStorage.getItem("email");

if (getLocalStorage !== null) {
  const collection = document.getElementsByClassName("name-data");
  collection[0].innerHTML = `Hello ${getLocalStorage}!`;
}

// data dummy
var data = [
  { name: "victor", gender: "male", email: "victor@example.com" },
  { name: "wilson", gender: "male", email: "wilson@example.com" },
  { name: "xierra", gender: "female", email: "xierra@example.com" },
];

// menampilkan data ke dalam tabel
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

// menambah data ke dalam objek data
function addData() {
  var name = document.querySelector("#inputName").value;
  var gender = document.querySelector("#inputGender").value;
  var email = document.querySelector("#inputEmail").value;
  data.push({ name: name, gender: gender, email: email });
  showData();
}

// mengedit data dalam objek data
function editData(index) {
  var name = prompt("new name:", data[index].name);
  var age = prompt("new gender:", data[index].gender);
  var email = prompt("new email:", data[index].email);
  data = data.map(function (item, i) {
    if (i === index) {
      return { name: name, gender: gender, email: email };
    }
    return item;
  });
  showData();
}

// menghapus data dari objek data
function deleteData(index) {
  data = data.filter(function (item, i) {
    return i !== index;
  });
  showData();
}

// menampilkan data pada saat halaman web dimuat
window.onload = function () {
  showData();
};
