document.addEventListener("DOMContentLoaded", function () {
    const formNewTask = document.querySelector(".addTaskModal");

    formNewTask.addEventListener("submit", function (e) {
        e.preventDefault(); 
        console.log("Form submitted");

        // جمع بيانات المهمة
        const taskData = {
            title: document.getElementById("taskTitle").value,
            description: document.getElementById("taskDescription").value,
            dueDate: document.getElementById("taskDueDate").value,
            priority: document.getElementById("taskPriority").value,
            employeeId: document.getElementById("assignedEmployee").value,
        };

        console.log("Employee ID:", taskData.employeeId);

        const token = localStorage.getItem("token");

        fetch("http://localhost:8080/api/admin/task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, 
            },
            body: JSON.stringify(taskData),
        })
        .then(response => {
            if (!response.ok) throw new Error("Échec de l'envoi");
            return response.json();
        })
        .then(data => {
            console.log("Tâche ajoutée:", data);

            $("#addTaskModal").modal("hide");

            const successMessage = document.createElement("div");
            successMessage.classList.add("alert", "alert-success");
            successMessage.innerText = "The task has been added successfully!";
            document.body.appendChild(successMessage); 

            // إزالة الرسالة بعد وقت معين
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        })
        .catch(error => {
            console.error("Erreur:", error);
            alert("Une erreur s'est produite lors de l'ajout de la tâche.");
        });
    });
});
