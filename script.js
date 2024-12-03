// Event listener for the "Add Task" button
document.getElementById('addTaskButton').onclick = function() {
    // Get the input values for task and category
    const taskInput = document.getElementById('taskInput');
    const categoryInput = document.getElementById('categoryInput');
    const taskText = taskInput.value;
    const categoryText = categoryInput.value;

    // Check if the task input is not empty
    if (taskText) {
        // Add the task to the list
        addTask(taskText, categoryText);
        // Clear the input fields after adding the task
        taskInput.value = ''; // Clear input field
        categoryInput.value = ''; // Clear category field
        // Save the updated task list to local storage
        saveTasks();
    }
};

// Function to add a new task to the list
function addTask(taskText, categoryText) {
    // Create a new list item element
    const li = document.createElement('li');
    // Set the text content of the list item
    li.textContent = taskText + (categoryText ? ` [${categoryText}]` : '');

    // Create a "Complete" button for the task
    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    // Toggle the completed status of the task when clicked
    completeButton.onclick = function() {
        li.classList.toggle('completed'); // Toggle completed class
        saveTasks(); // Save the updated task list
    };

    // Create an "Edit" button for the task
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    // Allow the user to edit the task text
    editButton.onclick = function() {
        editTask(li, taskText); // Call editTask function
    };

    // Create a "Delete" button for the task
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    // Remove the task from the list when clicked
    deleteButton.onclick = function() {
        li.remove(); // Remove the list item
        saveTasks(); // Save the updated task list
    };

    // Append buttons to the list item
    li.appendChild(completeButton);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    // Append the new list item to the task list
    document.getElementById('taskList').appendChild(li);
}

// Function to edit an existing task
function editTask(li, oldTaskText) {
    // Prompt the user to enter a new task text
    const newTaskText = prompt("Edit your task:", oldTaskText);
    // Update the task text if the user provided a new value
    if (newTaskText) {
        li.firstChild.textContent = newTaskText; // Update the task text
        saveTasks(); // Save the updated task list
    }
}

// Function to save tasks to local storage
function saveTasks() {
    const tasks = []; // Array to hold task objects
    const taskListItems = document.querySelectorAll('#taskList li'); // Get all list items
    // Iterate through each list item and store its data
    taskListItems.forEach(item => {
        tasks.push({
            text: item.firstChild.textContent, // Get task text
            completed: item.classList.contains('completed') // Check if task is completed
        });
    });
    // Save the tasks array to local storage as a JSON string
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage on page load
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Get tasks from local storage
    // Iterate through each task and create list items
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text; // Set task text
        // If the task is completed, add the completed class
        if (task.completed) {
            li.classList.add('completed');
        }

        // Create a "Complete" button for the task
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.onclick = function() {
            li.classList.toggle('completed'); // Toggle completed class
            saveTasks(); // Save the updated task list
        };

        // Create an "Edit" button for the task
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = function() {
            editTask(li, task.text); // Call editTask function
        };

        // Create a "Delete" button for the task
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            li.remove(); // Remove the list item
            saveTasks(); // Save the updated task list
        };

        // Append buttons to the list item
        li.appendChild(completeButton);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        // Append the new list item to the task list
        document.getElementById('taskList').appendChild(li);
    });
}

// Load tasks from local storage on page load
window.onload = loadTasks;

// Filter functionality for task visibility
document.getElementById('filterAll').onclick = function() {
    filterTasks('all'); // Show all tasks
};

document.getElementById('filterActive').onclick = function() {
    filterTasks('active'); // Show only active tasks
};

document.getElementById('filterCompleted').onclick = function() {
    filterTasks('completed'); // Show only completed tasks
};

// Function to filter tasks based on their status
function filterTasks(status) {
    const taskListItems = document.querySelectorAll('#taskList li'); // Get all list items
    // Iterate through each list item to determine visibility
    taskListItems.forEach(item => {
        const isCompleted = item.classList.contains('completed'); // Check if task is completed
        // Show or hide the task based on the selected filter
        if (status === 'all' || (status === 'active' && !isCompleted) || (status === 'completed' && isCompleted)) {
            item.style.display = 'flex'; // Show the task
        } else {
            item.style.display = 'none'; // Hide the task
        }
    });
}

// Dark mode toggle functionality
document.getElementById('toggleDarkMode').onclick = function() {
    document.body.classList.toggle('dark-mode'); // Toggle dark mode class on body
};