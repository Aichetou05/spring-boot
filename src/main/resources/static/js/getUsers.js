document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("Token is missing!");
        return;
    }

    fetch("http://localhost:8080/api/admin/users", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(users => {
        const select1 = document.getElementById("assignedEmployee");
        const select2 = document.getElementById("editEmployee");

        // إعادة تهيئة المحتوى
        select1.innerHTML = '<option value="">Select Employee</option>';
        select2.innerHTML = '<option value="">Select Employee</option>';

        users.forEach(user => {
            const option1 = document.createElement("option");
            option1.value = user.id;
            option1.textContent = user.name;
            select1.appendChild(option1);

            const option2 = document.createElement("option");
            option2.value = user.id;
            option2.textContent = user.name;
            select2.appendChild(option2);
        });
    })
    .catch(error => {
        console.error("Error fetching users:", error);
    });
});
