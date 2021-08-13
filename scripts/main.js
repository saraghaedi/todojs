/*jshint esversion: 6 */

function updateCounters() {
    
    const total_count = document.getElementById('total-count');
    const todo_count = document.getElementById('todo-count');
    const completed_count = document.getElementById('completed-count');
    const todos = document.querySelectorAll('.todo');
    const done = document.querySelectorAll('.done');
    
    todo_count.textContent = `Todo: ${todos.length}`;
    completed_count.textContent = `Done: ${done.length}`;
    total_count.textContent = `Total: ${todos.length + done.length}`;
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