document.addEventListener("DOMContentLoaded", function () {
    fetchTasks();

    function fetchTasks() {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("Token is missing!");
            return;
        }
        fetch("http://localhost:8080/api/admin/tasks", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`, 
                "Content-Type": "application/json"
            },
            credentials: "include"  
        })
            .then(response => response.json())
            .then(tasks => {
                const tbody = document.querySelector(".table tbody");
                tbody.innerHTML = ""; 
                tasks.forEach(task => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${task.title}</td>
                        <td>${task.description}</td>
                        <td>${task.dueDate}</td>
                        <td>${task.employeeName || 'N/A'}</td>
                        <td>${task.priority}</td>
                        <td>${task.taskStatus}</td>
                        <td>
                            <a href="#editTask" class="edit" data-toggle="modal" onclick='editTask(${JSON.stringify(task)})'><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                            <a href="#deleteTaskModal" class="delete" onclick='openDeleteModal(${task.id})'data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                            
                        </td>
                    `;
                    tbody.appendChild(row);
                });
            });
    }

    // pour suprimer
    let selectedTaskId = null;
    window.openDeleteModal = function(taskId) {
        selectedTaskId = taskId;
        $('#deleteTaskModal').modal('show');
    }
    window.confirmDelete = function() {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to log in.");
            return;
        }

        fetch(`http://localhost:8080/api/admin/task/${selectedTaskId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (response.ok) {
                alert("The task has been successfully deleted.");
                location.reload();
            } else {
                alert("Deletion failed!");
            }
        })
        .catch(error => {
            console.error("Deletion error:", error);
        });
    }

    
    
    // pour ajouter
    document.querySelector(".addTaskModal").addEventListener("submit", function (e) {
        e.preventDefault();
    
        const token = localStorage.getItem("token");
            if (!token) {
                alert("Vous devez être connecté.");
                return;
            }
        const task = {
            title: document.getElementById("taskTitle").value,
            description: document.getElementById("taskDescription").value,
            dueDate: document.getElementById("taskDueDate").value,
            priority: document.getElementById("taskPriority").value,
            employeeId: document.getElementById("assignedEmployee").value
        };
        console.log(task);
        fetch("http://localhost:8080/api/admin/task", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        }).then(response => {
            if (response.ok) {
                $('#addEmployeeModal').modal('hide');
                fetchTasks();
            }
        });
    });

    // pour filter
    function fetchTasks(priority = "") {
        const token = localStorage.getItem("token");
    
        let url = "http://localhost:8080/api/admin/tasks/filter";
        if (priority) {
            url += `?priority=${priority}`;
        }
    
        fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(tasks => {
            const tbody = document.querySelector(".table tbody");
            tbody.innerHTML = "";
            if (tasks.length === 0) {
                tbody.innerHTML = "<tr><td colspan='7'>Aucune tâche trouvée.</td></tr>";
                return;
            }
    
            tasks.forEach(task => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${task.title}</td>
                    <td>${task.description}</td>
                    <td>${task.dueDate}</td>
                    <td>${task.employeeName || 'N/A'}</td>
                    <td>${task.priority}</td>
                    <td>${task.taskStatus}</td>
                    <td>
                        <a href="#editTask" class="edit" data-toggle="modal" onclick='editTask(${JSON.stringify(task)})'><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                        <a href="#deleteTaskModal" class="delete" onclick='openDeleteModal(${task.id})'data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                    </td>
                `;
                tbody.appendChild(row);
            });
        });
    }
    
    
    document.getElementById("priorityFilter").addEventListener("change", function () {
        const selectedPriority = this.value;
        console.log(selectedPriority);
        fetchTasks(selectedPriority);
    });
    
    
});