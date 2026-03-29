// ================= SIGNUP =================
const signupForm = document.querySelector("#signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = signupForm.querySelector("#username").value.trim();
        const email = signupForm.querySelector("#email").value.trim();
        const password = signupForm.querySelector("#password").value;
        const confirmPassword = signupForm.querySelector("#confirmPassword").value;
        const role = signupForm.querySelector('input[name="role"]:checked').value;

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

        const user = { username, email, password, role };
        localStorage.setItem("user", JSON.stringify(user));

        alert("Signup successful!");
        window.location.href = "login.html";
    });
}


// ================= LOGIN =================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const input = loginForm.querySelector("#username_email").value.trim();
        const password = loginForm.querySelector("#password").value;

        // Get saved user
        const savedUser = JSON.parse(localStorage.getItem("user"));

        // No user found
        if (!savedUser) {
            alert("No account found! Please sign up first.");
            return;
        }

        // Check username or email
        const isValidUser =
            input === savedUser.username ||
            input === savedUser.email;

        // Final check
        if (isValidUser && password === savedUser.password) {
            alert("Login successful!");

            // Save logged-in user
            localStorage.setItem("loggedInUser", savedUser.username);

        } 

        else {
            alert("Invalid email/username or password!");
        }
    });
}


// ================= SHOW/HIDE PASSWORD =================
document.querySelectorAll(".toggle-password").forEach(btn => {
    btn.addEventListener("click", function () {
        const input = this.parentElement.querySelector("input");
        const icon = this.querySelector("i");

        const isHidden = input.type === "password";

        input.type = isHidden ? "text" : "password";

        icon.classList.toggle("fa-eye");
        icon.classList.toggle("fa-eye-slash");
    });
});


// ================= USER ICON FOCUS =================
document.querySelectorAll(".username-email-box button").forEach(btn => {
    btn.addEventListener("click", function () {
        const input = this.parentElement.querySelector("input");
        input.focus();
    });
});