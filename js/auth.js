// ================= SIGNUP =================
const signupForm = document.querySelector("#signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.querySelector("#username").value;
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        const confirmPassword = document.querySelector("#confirmPassword").value;

        // Password strength
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!regex.test(password)) {
            alert("Password must be at least 8 characters with upper, lower, and number!");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const user = { username, email, password };
        localStorage.setItem("user", JSON.stringify(user));

        alert("Signup successful!");
        window.location.href = "login.html";
    });
}


// ================= LOGIN =================
const loginForm = document.querySelector("#loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;

        const savedUser = JSON.parse(localStorage.getItem("user"));

        if (!savedUser) {
            alert("No user found! Please sign up.");
            return;
        }

        if (username === savedUser.username && password === savedUser.password) {
            alert("Login successful!");
        } else {
            alert("Invalid username or password!");
        }
    });
}


// ================= SHOW/HIDE PASSWORD =================
document.querySelectorAll(".btn1, .btn2").forEach(btn => {
    btn.addEventListener("click", function () {
        const input = this.parentElement.querySelector("input");
        const icon = this.querySelector("i");

        if (input.type === "password") {
            input.type = "text";
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");

        } else {
            input.type = "password";
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");
        }
    });
});


// ================= USER ICON FOCUS =================
document.querySelectorAll(".username-box button").forEach(btn => {
    btn.addEventListener("click", function () {
        const input = this.parentElement.querySelector("input");
        input.focus();
    });
});