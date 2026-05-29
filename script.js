const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");

const allBtn = document.getElementById("allBtn");
const activeBtn = document.getElementById("activeBtn");
const completedBtn = document.getElementById("completedBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

renderTasks();

todoForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = todoInput.value.trim();

    if (taskText === "") return;

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();
    renderTasks();

    todoInput.value = "";
});

allBtn.addEventListener("click", function () {
    currentFilter = "all";
    renderTasks();
});

activeBtn.addEventListener("click", function () {
    currentFilter = "active";
    renderTasks();
});

completedBtn.addEventListener("click", function () {
    currentFilter = "completed";
    renderTasks();
});

function renderTasks() {
    todoList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "active") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks.forEach((task) => {
        const originalIndex = tasks.indexOf(task);

        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        const span = document.createElement("span");
        span.textContent = task.text;

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("task-buttons");

        const completeButton = document.createElement("button");
        completeButton.textContent = "✓";

        completeButton.addEventListener("click", function () {
            tasks[originalIndex].completed =
                !tasks[originalIndex].completed;

            saveTasks();
            renderTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {
            tasks.splice(originalIndex, 1);

            saveTasks();
            renderTasks();
        });

        buttonContainer.appendChild(completeButton);
        buttonContainer.appendChild(deleteButton);

        li.appendChild(span);
        li.appendChild(buttonContainer);

        todoList.appendChild(li);
    });
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}