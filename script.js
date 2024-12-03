document.getElementById('addTaskButton').onclick = function() {
    const taskInput = document.getElementById('taskInput');
    const categoryInput = document.getElementById('categoryInput');
    const taskText = taskInput.value;
    const categoryText = categoryInput.value;

    if (taskText) {
        addTask(taskText, categoryText);
        taskInput.value = ''; // Clear input field
        categoryInput.value = ''; // Clear category field
        saveTasks();
    }
};

function addTask(taskText, categoryText) {
    const li = document.createElement('li');
    li.textContent = taskText + (categoryText ? ` [${categoryText}]` : '');

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.onclick = function() {
        li.classList.toggle('completed');
        saveTasks();
    };

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = function() {
        editTask(li, taskText);
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        li.remove();
        saveTasks();
    };

    li.appendChild(completeButton);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    document.getElementById('taskList').appendChild(li);
}

function editTask(li, oldTaskText) {
    const newTaskText = prompt("Edit your task:", oldTaskText);
    if (newTaskText) {
        li.firstChild.textContent = newTaskText; // Update the task text
        saveTasks();
    }
}

function saveTasks() {
    const tasks = [];
    const taskListItems = document.querySelectorAll('#taskList li');
    taskListItems.forEach(item => {
        tasks.push({
            text: item.firstChild.textContent,
            completed: item.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) {
            li.classList.add('completed');
        }

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.onclick = function() {
            li.classList.toggle('completed');
            saveTasks();
        };

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = function() {
            editTask(li, task.text);
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            li.remove();
            saveTasks();
        };

        li.appendChild(completeButton);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        document.getElementById('taskList').appendChild(li);
    });
}

// Load tasks from local storage on page load
window.onload = loadTasks;