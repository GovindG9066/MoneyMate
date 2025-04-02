const formTitle = document.getElementById("form-title");
const authForm = document.getElementById("auth-form");
const confirmPasswordContainer = document.getElementById("confirm-password-container");
const toggleText = document.getElementById("toggle-text");
const toggleForm = document.getElementById("toggle-form");
const submitButton = authForm.querySelector("button");

let isLogin = true;
let exitform=document.querySelector("#exitForm");

exitform.addEventListener("click", () => {
    if (document.referrer) {
        window.history.back(); // Go back to the previous page
    } else {
        window.location.href = "index.html"; // Redirect to home page
    }
});

toggleForm.addEventListener("click", (e) => {
    e.preventDefault();
    isLogin = !isLogin;
    
    if (isLogin) {
        formTitle.textContent = "Login";
        confirmPasswordContainer.classList.add("hidden");
        toggleText.textContent = "Don't have an account?";
        toggleForm.textContent = "Register here";
        submitButton.textContent = "Login";
    } else {
        formTitle.textContent = "Register";
        confirmPasswordContainer.classList.remove("hidden");
        toggleText.textContent = "Already have an account?";
        toggleForm.textContent = "Login here";
        submitButton.textContent = "Register";
    }
});