
  window.onload = function() {
    const token = localStorage.getItem("authToken");
    if (!token) {
      window.location.href = "../html/login.html";
    }
    alert("token"+token);
    console.log("Token is:", token);
  };

