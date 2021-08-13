/*jshint esversion: 6 */

function updateCounters() {

    const total_count = document.getElementById('total-count');
    const todo_count = document.getElementById('todo-count');
    const completed_count = document.getElementById('completed-count');
    const todos = document.querySelectorAll('.todo');
    const done = document.querySelectorAll('.done');
    const task = document.getElementsByClassName('task');

    todo_count.textContent = `Todo: ${todos.length}`;
    completed_count.textContent = `Done: ${done.length}`;
    total_count.textContent = `Total: ${task.length}`;
}

updateCounters();

function toggleDone(event) {

    const checkbox = event.currentTarget;

    if (checkbox.checked) {
        checkbox.parentElement.parentElement.className = "done task";
    } else {
        checkbox.parentElement.parentElement.className = "todo task";
    }
    updateCounters();
}

const checkboxs = document.querySelectorAll(".task input");
for (let i = 0; i < checkboxs.length; i++) {
    checkboxs[i].addEventListener("change", toggleDone);
}

function createTodo(title) {
    const newLabel = document.createElement('label');

    const newCheckBox = document.createElement('input');
    newCheckBox.setAttribute("type", "checkbox");
    newCheckBox.checked = false;

    newCheckBox.addEventListener('change', toggleDone);
    newLabel.appendChild(newCheckBox);

    const newTitle = document.createTextNode(" " + title);
    newLabel.appendChild(newTitle);

    newListItem = document.createElement('li');
    newListItem.appendChild(newLabel);
    const ul = document.getElementById("tasks");
    newListItem.className = 'task todo';
    ul.appendChild(newListItem);
}

document
    .querySelector("form")
    .addEventListener("submit", function addNewTodo(event) {
        event.preventDefault();

        const inputField = document.querySelector(".input-btn");
        const newTodoTitle = inputField.value;
        createTodo(newTodoTitle);
        inputField.value = null;

        updateCounters();
    });

function cleanUpDoneTodos() {
    const doneItems = document.querySelectorAll('.done');
    for (let i = 0; i < doneItems.length; i++) {
        doneItems[i].remove();
    }
    updateCounters();
}
const cleanButton = document.getElementById('clean-btn');
cleanButton.addEventListener('click', cleanUpDoneTodos);