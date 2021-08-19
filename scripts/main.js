/*jshint esversion: 6 */

let myTasks = [];
const tasksFromLocalStorage = JSON.parse(localStorage.getItem("myTasks"));
const tasksEl = document.getElementById('tasks');

if (tasksFromLocalStorage) {
    myTasks = tasksFromLocalStorage;
    render(myTasks);
}

function render(tasks) {
    let listItems = "";
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].cls == "done") {
            listItems += `
            <li class="done task" style="background-color: ${tasks[i].color}">
            <label><input type="checkbox" checked/> ${tasks[i].text}</label>
            <label> ${tasks[i].date}</label>
            </li>
        `;
        } else {
            listItems += `
            <li class="todo task" style="background-color: ${tasks[i].color}">
            <label><input type="checkbox" /> ${tasks[i].text}</label>
            <label>${tasks[i].date}</label>
            </li>
        `;
        }
    }
    tasksEl.innerHTML = listItems;
}


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
    const checkboxValue = checkbox.parentElement.textContent;


    if (checkbox.checked) {
        checkbox.parentElement.parentElement.className = "done task";
        for (let i = 0; i < myTasks.length; i++) {
            if (myTasks[i].text == checkboxValue.trim()) {
                myTasks[i].cls = "done";
                localStorage.setItem("myTasks", JSON.stringify(myTasks));
                break;
            }
        }
    } else {
        checkbox.parentElement.parentElement.className = "todo task";
        for (let i = 0; i < myTasks.length; i++) {
            if (myTasks[i].text == checkboxValue.trim()) {
                myTasks[i].cls = "todo";
                localStorage.setItem("myTasks", JSON.stringify(myTasks));
                break;
            }
        }
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

    const dateLabel = document.createElement('label');
    setDate(dateLabel);

    newListItem = document.createElement('li');
    newListItem.appendChild(newLabel);
    newListItem.appendChild(dateLabel);

    setColor(newListItem);

    const ul = document.getElementById("tasks");
    newListItem.className = 'task todo';
    ul.appendChild(newListItem);
    
}

function setColor (element) {
    const colorElement = document.getElementById('color-picker');
    element.style.backgroundColor = colorElement.value;

}

function setDate (element) {
    const dateVal = document.getElementById('date-picker').value;
    const date = document.createTextNode(`${dateVal}`);
    element.appendChild(date);
    
}

document
    .querySelector("form")
    .addEventListener("submit", function addNewTodo(event) {
        event.preventDefault();

        const inputField = document.querySelector(".input-btn");
        const newTodoTitle = inputField.value;
        const color = document.getElementById('color-picker').value;
        const date = document.getElementById('date-picker').value;
        if (newTodoTitle != "") {
            //save new task to local storage
            let taskObj = {
                text : newTodoTitle,
                cls : 'todo',
                color : color,
                date : date
            };
            myTasks.push(taskObj);
            localStorage.setItem("myTasks", JSON.stringify(myTasks));

            createTodo(newTodoTitle);
            inputField.value = null;

            updateCounters();
        }

    });


function cleanUpDoneTodos() {
    const doneItems = document.querySelectorAll('.done');
    for (let i = 0; i < doneItems.length; i++) {
        let itemToRemove = doneItems[i].childNodes[1].textContent;
        for (let j = 0; j < myTasks.length; j++) {
            if (myTasks[j].text == itemToRemove.trim()) {
                myTasks.splice(j, 1);
            }
        }
        doneItems[i].remove();
    }

    localStorage.setItem("myTasks", JSON.stringify(myTasks));
    updateCounters();
}
const cleanButton = document.getElementById('clean-btn');
cleanButton.addEventListener('click', cleanUpDoneTodos);
