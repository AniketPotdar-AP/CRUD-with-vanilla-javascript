var selectedRow = null;

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null) {
            insertNewRecord(formData);
        } else {
            updateRecord(formData);
        }
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["firstName"] = document.getElementById("firstName").value;
    formData["lastName"] = document.getElementById("lastName").value;
    formData["contactNum"] = document.getElementById("contactNum").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document
        .getElementById("contactList")
        .getElementsByTagName("tbody")[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.firstName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.lastName;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.contactNum;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = `<button class="btn btn-success" onClick="onEdit(this)"><i class="fa fa-edit"></i></button>
                    <button class="btn btn-danger" onClick="onDelete(this)"><i class="fa fa-trash-o"></i></button>`;
}

function resetForm() {
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("contactNum").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("firstName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("lastName").value = selectedRow.cells[1].innerHTML;
    document.getElementById("contactNum").value = selectedRow.cells[2].innerHTML;
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.firstName;
    selectedRow.cells[1].innerHTML = formData.lastName;
    selectedRow.cells[2].innerHTML = formData.contactNum;
}

function onDelete(td) {
    if (confirm("Are you sure to delete this record ?")) {
        row = td.parentElement.parentElement;
        document.getElementById("contactList").deleteRow(row.rowIndex);
        resetForm();
    }
}

function validate() {
    isValid = true;
    if (
        document.getElementById("firstName").value == "" ||
        document.getElementById("lastName").value == "" ||
        document.getElementById("contactNum").value == ""
    ) {
        isValid = false;
        document.getElementById("ValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("ValidationError").classList.contains("hide"))
            document.getElementById("ValidationError").classList.add("hide");
    }
    return isValid;
}
