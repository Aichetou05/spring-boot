document.addEventListener("DOMContentLoaded", function () {
    fetchTasks();

    function fetchTasks() {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("Token is missing!");
            return;
        }
        fetch("http://localhost:8080/api/employee/tasks", {
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
                            <a href="chat.html" class="btn btn-chat"><i class="material-icons">chat</i> <span>Chat</span></a>
                            
                        </td>
                    `;
                    tbody.appendChild(row);
                    console.log(task.employeeName);
                });
            });
    }


    

    // pour filter
    // function fetchTasks(priority = "") {
    //     const token = localStorage.getItem("token");
    
    //     let url = "http://localhost:8080/api/employee/tasks/filter";
    //     if (priority) {
    //         url += `?priority=${priority}`;
    //     }
    
    //     fetch(url, {
    //         method: "GET",
    //         headers: {
    //             "Authorization": `Bearer ${token}`,
    //             "Content-Type": "application/json"
    //         }
    //     })
    //     .then(response => response.json())
    //     .then(tasks => {
    //         const tbody = document.querySelector(".table tbody");
    //         tbody.innerHTML = "";
    //         if (tasks.length === 0) {
    //             tbody.innerHTML = "<tr><td colspan='7'>Aucune tâche trouvée.</td></tr>";
    //             return;
    //         }
    
    //         tasks.forEach(task => {
    //             const row = document.createElement("tr");
    //             row.innerHTML = `
    //                 <td>${task.title}</td>
    //                 <td>${task.description}</td>
    //                 <td>${task.dueDate}</td>
    //                 <td>${task.employeeName || 'N/A'}</td>
    //                 <td>${task.priority}</td>
    //                 <td>${task.taskStatus}</td>
    //                 <td>
    //                     <a href="#editTask" class="edit" data-toggle="modal" onclick='editTask(${JSON.stringify(task)})'><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
    //                     <a href="#deleteTaskModal" class="delete" onclick='openDeleteModal(${task.id})'data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
    //                 </td>
    //             `;
    //             tbody.appendChild(row);
    //         });
    //     });
    // }
    
    
    // document.getElementById("priorityFilter").addEventListener("change", function () {
    //     const selectedPriority = this.value;
    //     console.log(selectedPriority);
    //     fetchTasks(selectedPriority);
    // });
    
    
});