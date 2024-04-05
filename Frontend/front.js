$(document).ready(function() {
    // Custom JavaScript functions here

    // Function to get tasks
    function getTasks() {
        fetch('/gettasks')
        .then(response => response.json())
        .then(tasks => {
            let dashboard = document.getElementById('dashboard');
            dashboard.innerHTML = ''; // Clear previous content

            tasks.forEach(task => {
                let taskDiv = document.createElement('div');
                taskDiv.innerHTML = `
                    <div>
                        <h3>${task.title}</h3>
                        <p>${task.description}</p>
                        <p>Due Date: ${task.due_date}</p>
                        <p>Status: ${task.status}</p>
                        <button onclick="viewTaskDetails(${task.task_id})">View Details</button>
                    </div>
                `;
                dashboard.appendChild(taskDiv);
            });
        });
    }

    // Function to add a new task
    function addTask() {
            let title = document.getElementById('title').value;
            let description = document.getElementById('description').value;
            let dueDate = document.getElementById('dueDate').value;
            let status = document.getElementById('status').value;

            fetch('/addtask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    due_date: dueDate,
                    status: status
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                getTasks(); // Refresh dashboard after adding new task
            });
    }

    // Function to view task details
    function viewTaskDetails(taskId) {
        fetch(`/gettasks/${taskId}`)
        .then(response => response.json())
        .then(task => {
            let taskDetails = document.getElementById('taskDetails');
            taskDetails.innerHTML = `
                <div>
                    <h2>${task.title}</h2>
                    <p>${task.description}</p>
                    <p>Due Date: ${task.due_date}</p>
                    <p>Status: ${task.status}</p>
                    <button onclick="updateTaskStatus(${task.task_id}, 'Complete')">Mark as Complete</button>
                    <button onclick="updateTaskStatus(${task.task_id}, 'In Progress')">Mark as In Progress</button>
                </div>
            `;
        });
    }

    // Function to update task status
    function updateTaskStatus(taskId, newStatus) {
        fetch(`/gettasks/${taskId}`)
            .then(response => response.json())
            .then(task => {
                let taskDetails = document.getElementById('taskDetails');
                taskDetails.innerHTML = `
                    <div>
                        <h2>${task.title}</h2>
                        <p>${task.description}</p>
                        <p>Due Date: ${task.due_date}</p>
                        <p>Status: ${task.status}</p>
                        <button onclick="updateTaskStatus(${task.task_id}, 'Complete')">Mark as Complete</button>
                        <button onclick="updateTaskStatus(${task.task_id}, 'In Progress')">Mark as In Progress</button>
                    </div>
                `;
            });
    }

    // Initial load - Fetch tasks when the page loads
    getTasks();

    // Submit button click event
    $('#submitButton').click(function() {
        addTask();
    });
});