document.getElementById('addTaskButton').onclick = function() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value;

    if (taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;
        document.getElementById('taskList').appendChild(li);
        taskInput.value = ''; // Clear input field
    }
};