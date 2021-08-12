/*jshint esversion: 6 */

const total_count = document.getElementById('total-count');
const todo_count = document.getElementById('todo-count');
const completed_count = document.getElementById('completed-count');

function updateCounters() {

    let todos = document.querySelectorAll('.undone-lbl');
    let done = document.querySelectorAll('.done-lbl');

    todo_count.textContent = `Todo: ${todos.length}`;
    completed_count.textContent = `Done: ${done.length}`;
    total_count.textContent = `Total: ${todos.length + done.length}`;
  }
  
  updateCounters();