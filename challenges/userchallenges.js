import {default as Task} from './task.js'

const tasks = [
    new Task('¡Menos agua!', 'Tarda 7 minutos o menos en ducharte', 'Micro', 3),
    new Task('Transporte público', 'Usa el transporte público para moverte', 'Micro', 7),
    new Task('Task 3', 'Recycle plastic waste', 'Intermedio', 12),
    new Task('Task 4', 'Plant a tree', 'Alto Impacto', 1),
];

function renderTasks(taskArray) {
    const checkBoxList = document.getElementById('checkBoxList');

    // Clear any existing tasks
    checkBoxList.innerHTML = '';

    // Loop through the tasks and create a checkbox and description for each
    taskArray.forEach(task => {
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('task');

        const taskTitle = document.createElement('h3');
        taskTitle.textContent = task.taskName;

        const taskDesc = document.createElement('p');
        taskDesc.textContent = task.description;

        const taskTier = document.createElement('p');
        taskTier.textContent = `Rango: ${task.tier}`;

        const taskConsecutive = document.createElement('p');
        taskConsecutive.textContent = `Racha: ${task.consecutiveDays}`;

        const taskCheckbox = document.createElement('input');
        taskCheckbox.type = 'checkbox';

        // Append elements to the task container
        taskContainer.appendChild(taskCheckbox);
        taskContainer.appendChild(taskTitle);
        taskContainer.appendChild(taskDesc);
        taskContainer.appendChild(taskTier);
        taskContainer.appendChild(taskConsecutive);

        // Append the task container to the checkbox list
        checkBoxList.appendChild(taskContainer);
    });
}

function updateCoinCounter(amount) {
    const coinAmountElement = document.getElementById('timeAmount');
    coinAmountElement.textContent = amount;
}

function addTask(taskName) {
    const checkboxList = document.getElementById('checkBoxList');
    const newTask = document.createElement('label');
    newTask.innerHTML = `<input type="checkbox"> ${taskName}`;
    checkboxList.appendChild(newTask);
}

function toggleMenu() {
    const menu = document.getElementById('menu');
    if (menu.style.display === 'none') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
}

// Example: Modify elements dynamically
// Update the coin counter
//updateCoinCounter(200); // Updates to 200 coins

// Add a new task dynamically
//addTask('New Task 5');

renderTasks(tasks)
