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
                            <a href="#editEmployeeModal" class="edit" data-toggle="modal" onclick='editTask(${JSON.stringify(task)})'><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                            <a href="#deleteEmployeeModal" class="delete" onclick='openDeleteModal(${task.id})'data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                            
                        </td>
                    `;
                    tbody.appendChild(row);
                });
            });
    }

    let selectedTaskId = null;
    window.openDeleteModal = function(taskId) {
        selectedTaskId = taskId;
        $('#deleteEmployeeModal').modal('show');
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

    let currentEditingTaskId = null;

    // دالة لتحميل البيانات إلى الـ Modal عند النقر على زر "Edit"
    window.editTask = function (task) {
        console.log("Editing task:", task);  // إضافة لوج للتحقق من البيانات
        currentEditingTaskId = task.id;

        // تعبئة الحقول في الـ Modal بالبيانات الخاصة بالمهمة
        document.getElementById("editTitle").value = task.title;
        document.getElementById("editDescription").value = task.description;
        document.getElementById("editDueDate").value = task.dueDate.split("T")[0];  // التأكد من تحويل التاريخ إلى تنسيق معتمد
        document.getElementById("editPriority").value = task.priority.toLowerCase();
        document.getElementById("editEmployee").value = task.employeeId || "";
        document.getElementById("editStatus").value = task.taskStatus;

        // إظهار الـ Modal
        $('#editEmployeeModal').modal('show');
    };

    // حدث عندما يتم إرسال النموذج
    document.addEventListener("DOMContentLoaded", function () {
        // استخدام المعرف class "editTask" في اختيار النموذج
        const form = document.querySelector(".editTAsk");
    
        if (form) {
            form.addEventListener("submit", function (e) {
                e.preventDefault();  // لمنع الإرسال الافتراضي للنموذج
                console.log("Form submitted");
    
                // هنا يتم إرسال الطلبات أو التحديثات الخاصة بك.
                const token = localStorage.getItem("token");
                if (!token) {
                    alert("Vous devez être connecté.");
                    return;
                }
    
                const updatedTask = {
                    id: currentEditingTaskId, 
                    title: document.getElementById("editTitle").value,
                    description: document.getElementById("editDescription").value,
                    dueDate: document.getElementById("editDueDate").value,
                    priority: document.getElementById("editPriority").value.toUpperCase(),
                    employeeId: parseInt(document.getElementById("editEmployee").value),
                    taskStatus: document.getElementById("editStatus").value
                };
    
                console.log(updatedTask);  // تحقق من أن البيانات صحيحة
    
                fetch(`http://localhost:8080/api/admin/task/${currentEditingTaskId}`, {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updatedTask)
                })
                .then(response => {
                    if (response.ok) {
                        $('#editEmployeeModal').modal('hide');
                        fetchTasks();  // تحميل المهام بعد التعديل
                    } else {
                        console.error("Erreur lors de la mise à jour de la tâche");
                    }
                })
                .catch(error => {
                    console.error("Erreur réseau:", error);
                });
            });
        }
    });
    


    document.querySelector(".addTaskModal").addEventListener("submit", function (e) {
        e.preventDefault();
        const task = {
            title: document.getElementById("taskTitle").value,
            description: document.getElementById("taskDescription").value,
            dueDate: document.getElementById("taskDueDate").value,
            priority: document.getElementById("taskPriority").value,
            employeeId: document.getElementById("assignedEmployee").value
        };
        fetch("http://localhost:8080/api/admin/task", {
            method: "POST",
            headers: {
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
});