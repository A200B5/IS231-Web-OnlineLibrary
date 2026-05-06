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