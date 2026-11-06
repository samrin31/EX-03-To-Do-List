# Ex03 To-Do List using JavaScript
## Date:06.11.2026

## AIM
To create a To-do Application with all features using JavaScript.

## ALGORITHM
### STEP 1
Build the HTML structure (index.html).

### STEP 2
Style the App (style.css).

### STEP 3
Plan the features the To-Do App should have.

### STEP 4
Create a To-do application using Javascript.

### STEP 5
Add functionalities.

### STEP 6
Test the App.

### STEP 7
Open the HTML file in a browser to check layout and functionality.

### STEP 8
Fix styling issues and refine content placement.

### STEP 9
Deploy the website.

### STEP 10
Upload to GitHub Pages for free hosting.

## PROGRAM
## dashboard.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Manager</title>
    <link rel="stylesheet" href="theme.css">
</head>
<body>

    <div class="dashboard">

        <nav>
            <h2>TaskFlow</h2>
            <span>Personal Workspace</span>
        </nav>

        <section class="welcome">
            <h1>Manage Your Day</h1>
            <p>Stay focused and complete your goals.</p>
        </section>

        <section class="create-panel">
            <h3>Create New Task</h3>

            <input type="text" id="taskName"
                   placeholder="Enter task description">

            <div class="input-row">
                <input type="date" id="taskDate">

                <select id="taskCategory">
                    <option value="Study">Study</option>
                    <option value="Personal">Personal</option>
                    <option value="Work">Work</option>
                </select>

                <button id="createButton">Create Task</button>
            </div>
        </section>

        <section class="statistics">
            <article>
                <span>Total Tasks</span>
                <h2 id="total">0</h2>
            </article>

            <article>
                <span>Completed</span>
                <h2 id="completed">0</h2>
            </article>

            <article>
                <span>Not Completed</span>
                <h2 id="remaining">0</h2>
            </article>
        </section>

        <section class="task-section">

            <div class="section-heading">
                <h2>My Task List</h2>

                <select id="taskFilter">
                    <option value="all">Show All</option>
                    <option value="active">In Progress</option>
                    <option value="done">Completed</option>
                </select>
            </div>

            <div id="taskContainer"></div>

        </section>

        <footer>
            <button id="clearButton">
                Delete Completed Tasks
            </button>
        </footer>

    </div>

    <script src="manager.js"></script>
</body>
</html>
```
## theme.css
```
* {
    box-sizing: border-box;
}

body {
    margin: 0;
    background: #edf1f8;
    font-family: 'Trebuchet MS', sans-serif;
    color: #24334d;
}

.dashboard {
    max-width: 850px;
    margin: 35px auto;
    padding: 25px;
}

nav {
    background: #243b64;
    color: white;
    padding: 20px 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
}

nav h2 {
    margin: 0;
}

nav span {
    font-size: 13px;
}

.welcome {
    margin: 35px 0 25px;
}

.welcome h1 {
    font-size: 30px;
    margin-bottom: 8px;
}

.welcome p {
    color: #758199;
}

.create-panel {
    background: white;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0 3px 12px #dce2ed;
}

.create-panel h3 {
    margin-top: 0;
}

input, select {
    border: 1px solid #d5dce7;
    padding: 12px;
    border-radius: 6px;
    background: white;
    color: #24334d;
}

#taskName {
    width: 100%;
    margin-bottom: 15px;
}

.input-row {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.input-row input,
.input-row select {
    flex: 1;
    min-width: 120px;
}

button {
    border: none;
    background: #f08b36;
    color: white;
    padding: 12px 18px;
    border-radius: 6px;
    cursor: pointer;
}

button:hover {
    opacity: 0.85;
}

.statistics {
    display: flex;
    gap: 15px;
    margin: 25px 0;
}

.statistics article {
    flex: 1;
    background: white;
    padding: 20px;
    border-radius: 10px;
    border-bottom: 4px solid #f08b36;
}

.statistics span {
    color: #758199;
    font-size: 13px;
}

.statistics h2 {
    color: #243b64;
    margin-bottom: 0;
}

.task-section {
    background: white;
    padding: 25px;
    border-radius: 10px;
}

.section-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
}

.task-item {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 12px;
    align-items: center;
    padding: 16px;
    background: #f5f7fb;
    margin-bottom: 12px;
    border-radius: 8px;
    border-left: 4px solid #3d76c5;
}

.task-item.finished {
    border-left-color: #35a36d;
}

.task-description {
    overflow-wrap: anywhere;
}

.task-description small {
    display: block;
    color: #8490a4;
    margin-top: 5px;
}

.finished .task-description strong {
    text-decoration: line-through;
    color: #9299a5;
}

.task-buttons {
    display: flex;
    gap: 6px;
}

.task-buttons button {
    padding: 8px 10px;
    font-size: 12px;
}

.edit {
    background: #397bc7;
}

.delete {
    background: #db5555;
}

footer {
    margin-top: 20px;
    text-align: right;
}

#clearButton {
    background: #db5555;
}

.no-task {
    text-align: center;
    padding: 25px;
    color: #9299a5;
}

@media(max-width: 600px) {
    .statistics {
        flex-direction: column;
    }

    .section-heading {
        flex-direction: column;
        align-items: flex-start;
    }

    .task-item {
        grid-template-columns: auto 1fr;
    }

    .task-buttons {
        grid-column: 2;
    }
}
```
## Manager.js
```
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
```

## OUTPUT
![alt text](<Screenshot 2026-11-06 102843.png>)
![alt text](<Screenshot 2026-11-06 102858.png>)


## RESULT
The program for creating To-do list using JavaScript is executed successfully.
