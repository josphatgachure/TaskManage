$(document).ready(function() {
    
     
    // Function to get tasks
    function getTasks() {
        fetch('http://127.0.0.1:5000/gettasks')
        .then(response => response.clone().json())
        .then(tasks => { 
            let dashboard = document.getElementById('dashboard');
            dashboard.innerHTML = ''; // Clear previous content

            tasks.forEach(task => {
                let taskDiv = document.createElement('div');
                taskDiv.innerHTML = `
                    <div class=" border gap-3 px-2  ">
                        <h3>${task.title}</h3>
                        <p>${task.description}</p>
                        <p>Due Date: ${task.due_date}</p>
                        <p>Status: ${task.status}</p>
                            <button onclick="${viewTaskDetails(task.task_id)}">View Details</button>
                    </div>
                `;
                dashboard.appendChild(taskDiv);
            });
        })
        .catch(error => console.error('Error fetching tasks amos:', error))
        ;

    }

    // Function to add a new task
    function addTask() {
            let title = document.getElementById('title').value;
            let description = document.getElementById('description').value;
            let dueDate = document.getElementById('dueDate').value;
            let status = document.getElementById('status').value;

            fetch('http://127.0.0.1:5000/addtask', {
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

                //clear on submit
                document.getElementById('title').value = '';
                document.getElementById('description').value = '';
                document.getElementById('dueDate').value = '';
                document.getElementById('status').value = 'Incomplete';
            });
    }

    // Function to view task details
    function viewTaskDetails(taskId) {
        fetch(`http://127.0.0.1:5000/gettasks/${taskId}`)
        .then(response => response.json())
        .then(task => {
           /* let taskDetails = document.getElementById('taskDetails');
            taskDetails.innerHTML = `
                <div>
                    <h2>${task.title}</h2>
                    <p>${task.description}</p>
                    <p>Due Date: ${task.due_date}</p>
                    <p>Status: ${task.status}</p>
                    <button onclick="updateTaskStatus(${task.task_id}, 'Complete')">Mark as Complete</button>
                    <button onclick="updateTaskStatus(${task.task_id}, 'In Progress')">Mark as In Progress</button>
                </div>
            `;*/
            document.getElementById('taskTitle').innerText = task.title;
            document.getElementById('taskDescription').innerText = task.description;
            document.getElementById('taskDueDate').innerText = task.due_date;
            document.getElementById('taskStatus').innerText = task.status;
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
