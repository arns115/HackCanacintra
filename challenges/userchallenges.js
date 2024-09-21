import {default as Task} from './task.js'

const tasks = [
    new Task('¡Menos agua!', 'Tarda 7 minutos o menos en ducharte', 'Micro', 3),
    new Task('Transporte público', 'Usa el transporte público para moverte', 'Micro', 7),
    new Task('Guardar pet', 'Recycle plastic waste', 'Intermedio', 12),
    new Task('Iniciar tu huerto', 'Plant a tree', 'Alto-Impacto', 1),
];

const menu = document.getElementById('menu');
const menuOptions = document.getElementById('menu-options');

menu.addEventListener('click', () => {
    menuOptions.classList.toggle('visible');
    menuOptions.classList.toggle('hidden');
});


function renderTasks(taskArray) {
    const checkBoxList = document.getElementById('checkBoxList');
    const timeAmount = document.getElementById('timeAmount');

    checkBoxList.innerHTML = '';

    taskArray.forEach(task => {
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('task', task.getTierClass());
        const taskTitle = document.createElement('h3');
        taskTitle.textContent = task.taskName;

        const taskDesc = document.createElement('p');
        taskDesc.textContent = task.description;

        const taskCheckbox = document.createElement('input');
        taskCheckbox.type = 'checkbox';

        taskCheckbox.addEventListener('change', function() {
            if (this.checked) {
                this.disabled = true;

                let timeIncrease = 0;
                if (task.tier === 'Micro') {
                    timeIncrease = 10;
                } else if (task.tier === 'Intermedio') {
                    timeIncrease = 30;
                } else if (task.tier === 'Alto-Impacto') {
                    timeIncrease = 60;
                }

                const currentTime = parseInt(timeAmount.textContent);
                timeAmount.textContent = currentTime + timeIncrease;
            }
        });

        const consecutiveDays = document.createElement('div');
        consecutiveDays.classList.add('consecutive-days');
        consecutiveDays.innerHTML = `${task.consecutiveDays} <span class="leaf-icon">🍃</span>`;

        taskContainer.appendChild(taskCheckbox);
        taskContainer.appendChild(taskTitle);
        taskContainer.appendChild(taskDesc);
        taskContainer.appendChild(consecutiveDays); 

        checkBoxList.appendChild(taskContainer);
    });
}

renderTasks(tasks)
