
// Dark Mode Toggle
let btn_container = document.querySelector(".btn-container");
let btn_circle = document.querySelector(".btn-circle");

btn_container.addEventListener("click", () => {
    btn_circle.classList.toggle("btnevent");
    document.body.classList.toggle("dark");
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

