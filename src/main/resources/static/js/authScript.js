function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}


document.addEventListener("DOMContentLoaded", function () {
    // ========== LOGIN ==========
    const loginForm = document.getElementById("loginFrom");
    if (loginForm) {

        loginForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const loginData = {
                email: document.getElementById("login-email").value,
                password: document.getElementById("login-password").value
            };

            fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Login failed");
                }
                return response.json();
            })
            .then(data => {
                const token = data.jwt;
                const role = data.userRole; 
                localStorage.setItem("token", token);
                alert("Login successful!");
            
                if (role === "ADMIN") {
                    window.location.href = "../html/HomeAdmin.html";
                } else if (role === "EMPLOYEE") {
                    window.location.href = "../html/HomeEmployee.html";
                } else {
                    alert("Unknown role, redirecting to default home.");
                    window.location.href = "../html/home.html";
                }
            })            
            .catch(error => {
                console.error("Login Error:", error);
                alert("Login failed. Check your credentials.");
            });
        });
    }

    // ========== SIGNUP ==========
    const signupForm = document.getElementById("signupFrom");
    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const signupData = {
                name: document.getElementById("signup-username").value,
                email: document.getElementById("signup-email").value,
                password: document.getElementById("signup-password").value
            };

            fetch("http://localhost:8080/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(signupData)
            })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text); });
                }
                return response.json();
            })
            .then(data => {
                alert("Signup successful!");
                localStorage.setItem("token", data.jwt);
                window.location.href = "../html/HomeEmployee.html";
            })
            .catch(error => {
                console.error("Signup Error:", error);
                alert("Signup failed. Username or Email may already exist.");
            });
        });
    }
});
