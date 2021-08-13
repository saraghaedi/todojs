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
    // create a label
    const newLabel = document.createElement('label');
  
    // create a checkbox
    const newCheckBox = document.createElement('input');
    newCheckBox.setAttribute("type", "checkbox");
    newCheckBox.checked = false;

    // add the "change" event listener to the checkbox
    newCheckBox.addEventListener('change', toggleDone);
    // and append the checkbox to the label
    newLabel.appendChild(newCheckBox);
  
    // create a text node with the given title
    const newTitle = document.createTextNode(" " + title);
    // and append the text node to the label
    newLabel.appendChild(newTitle);
  
    // create a list item
    newListItem = document.createElement('li');
    // and append the label to list item
    newListItem.appendChild(newLabel);
    // append the list item to the todo list
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
  
      // reset the value of the inputField to make it empty and
      // ready to create new todos
      inputField.value = null;
  
      updateCounters();
    });

