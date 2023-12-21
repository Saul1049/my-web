var database = [];
function updateAge() {
    var ageSlider = document.getElementById("age");
    var selectedAgeParagraph = document.getElementById("selectedAge");

    // Display the age next to "Age = "
    selectedAgeParagraph.textContent = "Age = " + ageSlider.value;
}

function updateDatabaseContent() {
    var databaseContentList = document.getElementById("databaseContent");
    // Clear previous content
    databaseContentList.innerHTML = "";

    // Add each record as a list item
    database.forEach(function(record, index) {
        var listItem = document.createElement("li");
        listItem.textContent =
            "Name = " + record.firstName + " " + record.lastName +
            ", Age = " + record.age +
            ", Programming Language = " + record.programmingLanguage +
            ", After Highschool Plans = " + record.afterHighschoolPlans.join(", ") +
            ", Grade = " + record.grade;

        databaseContentList.appendChild(listItem);
    });
}

function submitForm() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var age = document.getElementById("age").value;
    var programmingLanguage = document.querySelector('input[name="programmingLanguage"]:checked');
    var afterHighschoolPlans = getCheckedCheckboxes(document.getElementsByName("afterHighschoolPlans"));
    var grade = document.getElementById("grade").value;

    var record = {
        firstName: firstName,
        lastName: lastName,
        age: age,
        programmingLanguage: programmingLanguage ? programmingLanguage.value : "Not selected",
        afterHighschoolPlans: afterHighschoolPlans,
        grade: grade
    };

    // Save the record to the database
    database.push(record);

    // Display message
    alert("Data saved!");

    // Update database content display
    updateDatabaseContent();
}

function deleteRecord() {
    var searchFirstName = prompt("Enter the first name to delete:");

    // Find the index of the record with the specified first name
    var indexToDelete = -1;
    database.forEach(function (record, index) {
        if (record.firstName.toLowerCase() === searchFirstName.toLowerCase()) {
            indexToDelete = index;
        }
    });

    if (indexToDelete !== -1) {
        // Remove the record with the specified first name
        database.splice(indexToDelete, 1);

        // Display message
        alert("Record deleted!");
    } else {
        alert("No records found for the given first name.");
    }

    // Update database content display
    updateDatabaseContent();
}

function searchStudent() {
    var searchFirstName = prompt("Enter the first name to search:");

    // Search for records that match the first name
    var results = database.filter(function (record) {
        return record.firstName.toLowerCase() == searchFirstName.toLowerCase();
    });

    // Display search results
    if (results.length > 0) {
        alert("Search results:\n" + JSON.stringify(results));
    } else {
        alert("No records found for the given first name.");
    }
}

function getCheckedCheckboxes(checkboxes) {
    var checkedCheckboxes = [];
    for (var checkbox of checkboxes) {
        if (checkbox.checked) {
            checkedCheckboxes.push(checkbox.value);
        }
    }
    return checkedCheckboxes;
}
