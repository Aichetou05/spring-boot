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