document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    // Load tasks from localStorage
    loadTasks();

    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    function addTask() {
        const task = taskInput.value.trim();
        if (!task) {
            alert('Task cannot be empty!');
            return;
        }

        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.innerHTML = `
            <span class="task-text">${task}</span>
            <div>
                <button class="btn btn-sm btn-warning edit-button">Edit</button>
                <button class="btn btn-sm btn-success done-button">Done</button>
                <button class="btn btn-sm btn-danger delete-button">Delete</button>
            </div>
        `;
        taskList.appendChild(listItem);
        saveTasks();
        taskInput.value = '';
    }

    taskList.addEventListener('click', (e) => {
        const listItem = e.target.closest('li');
        if (e.target.classList.contains('delete-button')) {
            listItem.remove();
        } else if (e.target.classList.contains('done-button')) {
            listItem.classList.toggle('list-group-item-success');
        } else if (e.target.classList.contains('edit-button')) {
            editTask(listItem);
        }
        saveTasks();
    });

    function editTask(listItem) {
        const taskText = listItem.querySelector('.task-text');
        const newTask = prompt('Edit your task:', taskText.innerText);
        if (newTask && newTask.trim()) {
            taskText.innerText = newTask.trim();
            saveTasks();
        }
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#taskList li').forEach((listItem) => {
            tasks.push({
                text: listItem.querySelector('.task-text').innerText,
                done: listItem.classList.contains('list-group-item-success')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const listItem = document.createElement('li');
            listItem.className = `list-group-item d-flex justify-content-between align-items-center ${task.done ? 'list-group-item-success' : ''}`;
            listItem.innerHTML = `
                <span class="task-text">${task.text}</span>
                <div>
                    <button class="btn btn-sm btn-warning edit-button">Edit</button>
                    <button class="btn btn-sm btn-success done-button">Done</button>
                    <button class="btn btn-sm btn-danger delete-button">Delete</button>
                </div>
            `;
            taskList.appendChild(listItem);
        });
    }
});
