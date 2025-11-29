
// // Dark Mode Toggle
// let btn_container = document.querySelector(".btn-container");
// let btn_circle = document.querySelector(".btn-circle");

// btn_container.addEventListener("click", () => {
//     btn_circle.classList.toggle("btnevent");
//     document.body.classList.toggle("dark");
// });

// 2nd Working Code

// // Dark Mode Toggle
// let btn_container = document.querySelector(".btn-container");
// let btn_circle = document.querySelector(".btn-circle");

// btn_container.addEventListener("click", () => {
//     btn_circle.classList.toggle("btnevent");

//     // IMPORTANT: Dark mode must be applied to <html>
//     document.documentElement.classList.toggle("dark");
// });

// Dark Mode Toggle
let btn_container = document.querySelector(".btn-container");
let btn_circle = document.querySelector(".btn-circle");

// --- Apply previous theme on page load ---
if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
    if (btn_circle) btn_circle.classList.add("btnevent");
}

// --- Toggle theme on click ---
btn_container?.addEventListener("click", () => {
    btn_circle.classList.toggle("btnevent");

    // Toggle dark mode on HTML tag (Tailwind requirement)
    document.documentElement.classList.toggle("dark");

    // Save preference
    if (document.documentElement.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});




// Expense Modal Open / Close
let form_cont = document.querySelector(".form-container");
let spend = document.querySelector(".add-spend");
let exit = document.getElementById("exitBtn");

function add_expense() {
    spend.addEventListener("click", () => {
        form_cont.classList.remove("hidden");
        form_cont.classList.add("flex");
    });
}

function exit_form() {
    form_cont.classList.remove("flex");
    form_cont.classList.add("hidden");
}

if (exit) {
    exit.addEventListener("click", exit_form);
}

add_expense();

