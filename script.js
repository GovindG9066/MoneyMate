let current_bal = 0.00;
let wallet = document.querySelector(".wallet");
let Available_bal = document.querySelector(".Available-bal");
let error_msg = document.querySelector(".error-msg");
let exit = document.querySelector(".exit");
let form_cont = document.querySelector(".form-container");
let spend = document.querySelector(".add-spend");

wallet.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        let inputValue = wallet.value.trim();
        try {
            let amount = Number(inputValue);
            if (amount === null) throw "Please enter a valid input";
            if (amount === 0) throw "Zero in not allowed";
            if (amount < 0) throw "negative number is not allowed";
            Available_bal.innerHTML = `₹${amount}.00`;
            wallet.value = "";
        } catch (error) {
            error_msg.innerHTML = error;
            wallet.value = "";
        }

    }
})
function add_expense() {
    spend.addEventListener("click", () => {
        form_cont.classList.remove("hidden");
        form_cont.classList.add("flex");
        exit_form();
    })
}
function exit_form() {
    exit.addEventListener("click", () => {
        form_cont.classList.remove("flex");
        form_cont.classList.add("hidden");
    })
}


add_expense();

function history_items() {
    let form_details = document.querySelector(".form-details");
    let history_Cont = document.getElementById("history-container");
    form_details.addEventListener("submit", (event) => {
        event.preventDefault();

        let title = document.querySelector("input[type='text']").value;
        let amount = document.querySelector("input[type='number']").value;
        let category = document.querySelector("select").value;
        let date = document.querySelector("input[type='date']").value;


        let current_time = new Date();
        let live_Time = current_time.toLocaleTimeString();


        let history_item = document.createElement("div");
        history_item.classList.add("border", "border-gray-300", "rounded-lg", "p-3", "shadow", "bg-white", "flex", "justify-between", "items-center");
        history_item.innerHTML = `
            <h2 class="font-bold text-lg text-[#264653]">${title}</h2>
            <p class="text-gray-600">${category}</p>
            <p class="text-gray-500">${date}</p>
            <p class="text-gray-400">${live_Time}</p>
            <h3 class="text-red-500 font-bold">₹${amount}</h3>
        `;
        history_Cont.appendChild(history_item);
        form_details.reset();
    })
}


history_items();