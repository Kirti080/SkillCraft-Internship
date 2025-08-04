const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskList = document.getElementById("taskList");

let tasks = [];

taskForm.addEventListener("submit", e => {
  e.preventDefault();
  addTask(taskInput.value, taskDate.value);
  taskInput.value = "";
  taskDate.value = "";
});

function addTask(title, dateTime) {
  const task = {
    id: Date.now(),
    title,
    dateTime,
    completed: false
  };
  tasks.push(task);
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <strong>${task.title}</strong>
      <small>🕒 ${new Date(task.dateTime).toLocaleString()}</small>
      <div class="task-actions">
        <button onclick="toggleComplete(${task.id})">✅</button>
        <button onclick="editTask(${task.id})">✏️</button>
        <button onclick="deleteTask(${task.id})">🗑️</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

function toggleComplete(id) {
  const task = tasks.find(t => t.id === id);
  task.completed = !task.completed;
  renderTasks();
}

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  const newTitle = prompt("Edit task title:", task.title);
  const newDate = prompt("Edit date and time (YYYY-MM-DDTHH:mm):", task.dateTime);
  if (newTitle && newDate) {
    task.title = newTitle;
    task.dateTime = newDate;
    renderTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  renderTasks();
}
