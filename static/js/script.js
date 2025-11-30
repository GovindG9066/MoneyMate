 const menuBtn = document.getElementById("menuBtn");
    const sideMenu = document.getElementById("sideMenu");
    const closeMenu = document.getElementById("closeMenu");

    menuBtn.addEventListener("click", () => {
        sideMenu.classList.remove("-translate-x-full");
    });

    closeMenu.addEventListener("click", () => {
        sideMenu.classList.add("-translate-x-full");
          });


























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

