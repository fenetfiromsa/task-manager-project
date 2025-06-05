let tasks = []; // Start with an empty task list
let currentFilter = 'all'; // Default filter

// Multilingual heading animation
const taskTranslations = [
  'My Tasks',          // English
  'Mis Tareas',        // Spanish
  'Mes Tâches',        // French
  'Meine Aufgaben',    // German
  'I Miei Compiti',    // Italian
  'Minhas Tarefas',    // Portuguese
  'مهماتي',             // Arabic
  'Мои задачи',        // Russian
  '私のタスク',         // Japanese
  '내 작업',           // Korean
  '我的任务'            // Chinese
];

let currentIndex = 0;
setInterval(() => {
  const heading = document.getElementById('taskHeading');
  heading.classList.add('fade');
  setTimeout(() => {
    heading.textContent = taskTranslations[currentIndex];
    heading.classList.remove('fade');
    currentIndex = (currentIndex + 1) % taskTranslations.length;
  }, 500);
}, 2000);

// Render tasks
function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  let filteredTasks = [];
  if (currentFilter === 'all') {
    filteredTasks = tasks;
  } else if (currentFilter === 'active') {
    filteredTasks = tasks.filter(task => !task.completed);
  } else if (currentFilter === 'completed') {
    filteredTasks = tasks.filter(task => task.completed);
  }

  if (filteredTasks.length === 0) {
    const noTasksMessage = document.createElement('li');
    noTasksMessage.className = 'task-item';
    noTasksMessage.style.justifyContent = 'center';
    noTasksMessage.style.fontStyle = 'italic';
    noTasksMessage.style.color = '#777';
    noTasksMessage.textContent = 'No tasks to display for this filter.';
    taskList.appendChild(noTasksMessage);
    return;
  }

  filteredTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item';
    if (task.completed) {
      li.classList.add('completed');
    }

    li.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTaskStatus(${task.id})">
      <span>${task.title}</span>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

function setFilter(filterType) {
  currentFilter = filterType;

  document.querySelectorAll('.filter-buttons button').forEach(button => {
    button.classList.remove('active');
  });

  const buttonId = `filter${filterType.charAt(0).toUpperCase() + filterType.slice(1)}`;
  const activeButton = document.getElementById(buttonId);
  if (activeButton) {
    activeButton.classList.add('active');
  }

  renderTasks();
}

function addTask() {
  const newTaskInput = document.getElementById('newTaskInput');
  const taskTitle = newTaskInput.value.trim();

  if (taskTitle) {
    const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    tasks.push({ id: newId, title: taskTitle, completed: false });
    newTaskInput.value = '';
    setFilter(currentFilter);
  } else {
    alert('Task title cannot be empty!');
  }
}

function toggleTaskStatus(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  setFilter(currentFilter);
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  setFilter(currentFilter);
}

document.addEventListener('DOMContentLoaded', () => {
  renderTasks();
  document.getElementById('filterAll').classList.add('active');
});

