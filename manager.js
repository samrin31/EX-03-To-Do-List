const nameField = document.getElementById("taskName");
const dateField = document.getElementById("taskDate");
const categoryField = document.getElementById("taskCategory");

const container = document.getElementById("taskContainer");
const filterField = document.getElementById("taskFilter");

let records = JSON.parse(localStorage.getItem("taskFlowRecords")) || [];

// Save records in browser storage
function saveRecords() {
    localStorage.setItem(
        "taskFlowRecords",
        JSON.stringify(records)
    );
}

// Create task
document.getElementById("createButton").onclick = function() {

    let description = nameField.value.trim();

    if (!description) {
        alert("Please enter a task description.");
        return;
    }

    let record = {
        taskId: Date.now(),
        description: description,
        deadline: dateField.value,
        category: categoryField.value,
        isDone: false
    };

    records.push(record);

    nameField.value = "";
    dateField.value = "";

    saveRecords();
    renderRecords();
};

// Render task records
function renderRecords() {

    container.innerHTML = "";

    let selected = filterField.value;

    let visibleRecords = records.filter(record => {

        if (selected === "active") {
            return record.isDone === false;
        }

        if (selected === "done") {
            return record.isDone === true;
        }

        return true;
    });

    if (visibleRecords.length === 0) {
        container.innerHTML =
            '<p class="no-task">No tasks found. Add a new task!</p>';
    }

    visibleRecords.forEach(record => {

        let item = document.createElement("div");

        item.className = "task-item";

        if (record.isDone) {
            item.classList.add("finished");
        }

        let status = document.createElement("input");
        status.type = "checkbox";
        status.checked = record.isDone;

        status.addEventListener("change", () => {
            switchStatus(record.taskId);
        });

        let description = document.createElement("div");
        description.className = "task-description";

        let heading = document.createElement("strong");
        heading.textContent = record.description;

        let details = document.createElement("small");

        details.textContent =
            record.category + " | Deadline: " +
            (record.deadline || "Not specified");

        description.append(heading, details);

        let controls = document.createElement("div");
        controls.className = "task-buttons";

        let editButton = document.createElement("button");
        editButton.className = "edit";
        editButton.textContent = "Edit";

        editButton.onclick = () => {
            modifyRecord(record.taskId);
        };

        let deleteButton = document.createElement("button");
        deleteButton.className = "delete";
        deleteButton.textContent = "Delete";

        deleteButton.onclick = () => {
            removeRecord(record.taskId);
        };

        controls.append(editButton, deleteButton);

        item.append(status, description, controls);

        container.appendChild(item);
    });

    refreshStatistics();
}

// Change completion status
function switchStatus(id) {

    records = records.map(record => {

        if (record.taskId === id) {
            record.isDone = !record.isDone;
        }

        return record;
    });

    saveRecords();
    renderRecords();
}

// Edit task details
function modifyRecord(id) {

    let record = records.find(
        element => element.taskId === id
    );

    let updatedName = prompt(
        "Modify task description:",
        record.description
    );

    if (updatedName === null) return;

    if (updatedName.trim() === "") {
        alert("Task description cannot be empty.");
        return;
    }

    record.description = updatedName.trim();

    saveRecords();
    renderRecords();
}

// Delete selected task
function removeRecord(id) {

    let answer = confirm("Delete this task?");

    if (answer) {

        records = records.filter(
            element => element.taskId !== id
        );

        saveRecords();
        renderRecords();
    }
}

// Update statistics
function refreshStatistics() {

    let finishedCount = records.filter(
        element => element.isDone
    ).length;

    document.getElementById("total").textContent =
        records.length;

    document.getElementById("completed").textContent =
        finishedCount;

    document.getElementById("remaining").textContent =
        records.length - finishedCount;
}

// Remove completed records
document.getElementById("clearButton").onclick = function() {

    records = records.filter(
        element => !element.isDone
    );

    saveRecords();
    renderRecords();
};

// Filter records
filterField.addEventListener("change", renderRecords);

// Display saved tasks when page opens
renderRecords();