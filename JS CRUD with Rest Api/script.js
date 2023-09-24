// *****************************************
//          Get All Contact List
// *****************************************

document.onload = getData();

function getData() {
  fetch("https://average-fish-sundress.cyclic.app/allContacts", {
    method: "GET",
    headers: { "Content-type": "application/json" },
  })
    .then((res) => res.json())
    .then((response) => {
      var html = "";
      response.forEach((contact) => {
        var id = contact._id;
        html += `<tr>`;
        html += `<td> ${contact.firstName} </td>`;
        html += `<td> ${contact.lastName} </td>`;
        html += `<td> ${contact.phoneNumber} </td>`;
        html += `<td>`;
        html += `<button class="btn btn-warning" onClick="editData('${id}')">Edit</button>`;
        html += `<button class="btn btn-danger mx-2" onClick="deleteData('${id}')">Delete</button>`;
        html += `</td>`;
        html += `</tr>`;
      });
      document.getElementById("tbody").innerHTML = html;
    });
}

// *****************************************
//         Add Data in Contact List
// *****************************************

function addData() {
  if (validate()) {
    fetch("https://average-fish-sundress.cyclic.app/addContact", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        phoneNumber: document.getElementById("phoneNumber").value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        getData();
        resetForm();
      });
  }
}

// *****************************************
//         Update Data in Contact List
// *****************************************
var dataID;

function editData(id) {
  fetch(`https://average-fish-sundress.cyclic.app/contact/${id}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      dataID = id;
      document.getElementById("firstName").value = data.firstName;
      document.getElementById("lastName").value = data.lastName;
      document.getElementById("phoneNumber").value = data.phoneNumber;

      document.getElementById("Add").style.display = "none";
      document.getElementById("Update").style.display = "inline";
    });
}

function updateData() {
  if (validate()) {
    fetch("https://average-fish-sundress.cyclic.app/updateContact", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        _id: dataID,
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        phoneNumber: document.getElementById("phoneNumber").value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        getData();
        resetForm();
        document.getElementById("Add").style.display = "inline";
        document.getElementById("Update").style.display = "none";
      });
  }
}

// *****************************************
//         Delete Data in Contact List
// *****************************************

function deleteData(id) {
  fetch(`https://average-fish-sundress.cyclic.app/removeContact/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      getData();
    });
}

// **********************************************
//        Check if Form is Valid or Not
// **********************************************

function validate() {
  isValid = true;
  if (
    document.getElementById("firstName").value == "" ||
    document.getElementById("lastName").value == "" ||
    document.getElementById("phoneNumber").value == ""
  ) {
    isValid = false;
    alert("Please Fill all required Fields");
  } else {
    isValid = true;
  }
  return isValid;
}

// **********************************************
//        Reset All Form Values to Null
// **********************************************

function resetForm() {
  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("phoneNumber").value = "";
}
