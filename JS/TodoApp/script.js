let tasks = [];

const addTask = () => {
  const taskInput = document.querySelector('.todo-app__input-form input');
  const taskName = taskInput.value;

  if (taskName.trim() !== '') {
    const task = {
      id: Date.now(),
      name: taskName,
      completed: false
    };

    tasks.push(task);
    renderTasks();
    taskInput.value = '';
  }
}

const taskInput = document.querySelector('.todo-app__input-form input');
taskInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    addTask();
  }
});

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

function markCompleted(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
    return task;
  });
  updateCompletedTask(id);
}

function updateCompletedTask(id) {
  const taskElement = document.getElementById(id);
  if (taskElement) {
    const task = tasks.find(task => task.id === id);
    if (task.completed) {
      taskElement.classList.add('completed');
    } else {
      taskElement.classList.remove('completed');
    }
  }
}
const renderTasks = () => {
  const taskList = document.querySelector('.todo-app__list');
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const listItem = document.createElement('li');
    listItem.setAttribute('id', task.id);

    if (task.completed) {
      listItem.classList.add('task', 'completed');
    } else {
      listItem.classList.add('task');
    }

    const taskContainer = document.createElement('div');
    taskContainer.classList.add('container');
    taskContainer.addEventListener('click', () => markCompleted(task.id));

    const taskCircle = document.createElement('div');
    taskCircle.classList.add('circle');

    const checkIcon = document.createElement('i');
    checkIcon.classList.add('bx', 'bx-check', 'check-icon'); // Añadimos el ícono de palomita

    const taskName = document.createElement('span');
    taskName.textContent = task.name;

    const deleteButton = document.createElement('i');
    deleteButton.classList.add('bx', 'bx-x', 'close-icon');
    deleteButton.addEventListener('click', (event) => {
      event.stopPropagation(); // Para evitar que el click también marque la tarea como completada
      deleteTask(task.id);
    });

    taskCircle.appendChild(checkIcon); // Aseguramos que el ícono se añada al círculo
    taskContainer.appendChild(taskCircle);
    taskContainer.appendChild(taskName);

    listItem.appendChild(taskContainer);
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);
  });
}

renderTasks();