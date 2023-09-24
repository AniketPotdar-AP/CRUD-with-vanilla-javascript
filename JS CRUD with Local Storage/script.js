// *****************************************
//          Get All Contact List
// *****************************************

document.onload = showData();

function showData() {
  var contactList;

  if (localStorage.getItem("contactList") == null) {
    contactList = [];
  } else {
    contactList = JSON.parse(localStorage.getItem("contactList"));
  }

  var html = "";

  contactList.forEach(function (element, index) {
    html += "<tr>";
    html += "<td>" + element.firstName + "</td>";
    html += "<td>" + element.lastName + "</td>";
    html += "<td>" + element.contactNum + "</td>";
    html +=
      '<td><button class="btn btn-warning" onClick="updateData(' +
      index +
      ')">Edit</button> <button class="btn btn-danger mx-2" onClick="deleteData(' +
      index +
      ')">Delete</button></td>';
    html += "</tr>";
  });

  document.querySelector("#contactList tbody").innerHTML = html;
}

// *****************************************
//         Add Data in Contact List
// *****************************************

function addData() {
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var contactNum = document.getElementById("contactNum").value;

  if (validate()) {
    var contactList;

    if (localStorage.getItem("contactList") == null) {
      contactList = [];
    } else {
      contactList = JSON.parse(localStorage.getItem("contactList"));
    }
  }

  contactList.push({
    firstName: firstName,
    lastName: lastName,
    contactNum: contactNum,
  });

  localStorage.setItem("contactList", JSON.stringify(contactList));

  showData();
  resetForm();
}

// *****************************************
//         Update Data in Contact List
// *****************************************

function updateData(index) {
  document.getElementById("Add").style.display = "none";
  document.getElementById("Update").style.display = "inline";

  var contactList;

  if (localStorage.getItem("contactList") == null) {
    contactList = [];
  } else {
    contactList = JSON.parse(localStorage.getItem("contactList"));
  }

  document.getElementById("firstName").value = contactList[index].firstName;
  document.getElementById("lastName").value = contactList[index].lastName;
  document.getElementById("contactNum").value = contactList[index].contactNum;

  document.querySelector("#Update").onclick = function () {
    if (validate()) {
      contactList[index].firstName = document.getElementById("firstName").value;
      contactList[index].lastName = document.getElementById("lastName").value;
      contactList[index].contactNum =
        document.getElementById("contactNum").value;

      localStorage.setItem("contactList", JSON.stringify(contactList));
      showData();
      resetForm();

      document.getElementById("Add").style.display = "inline";
      document.getElementById("Update").style.display = "none";
    }
  };
}

// *****************************************
//         Delete Data in Contact List
// *****************************************

function deleteData(index) {
  var contactList;

  if (localStorage.getItem("contactList") == null) {
    contactList = [];
  } else {
    contactList = JSON.parse(localStorage.getItem("contactList"));
  }

  contactList.splice(index, 1);
  localStorage.setItem("contactList", JSON.stringify(contactList));

  showData();
}

// **********************************************
//        Check if Form is Valid or Not
// **********************************************

function validate() {
  isValid = true;
  if (
    document.getElementById("firstName").value == "" ||
    document.getElementById("lastName").value == "" ||
    document.getElementById("contactNum").value == ""
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
  document.getElementById("contactNum").value = "";
}
