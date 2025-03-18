let current_bal = 0.00;
let wallet = document.querySelector(".wallet");
let Available_bal = document.querySelector(".Available-bal");
let error_msg = document.querySelector(".error-msg");
let exit = document.querySelector(".exit");
let form_cont = document.querySelector(".form-container");
let spend = document.querySelector(".add-spend");
let total_spend = 0.00;
let btn_container = document.querySelector(".btn-container");
let btn_circle = document.querySelector(".btn-circle");


btn_container.addEventListener("click",()=>{
    btn_circle.classList.toggle("translate-x-5");
    console.log(btn_circle.classList);
    
    document.body.classList.toggle("dark");
});


wallet.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        let inputValue = wallet.value.trim();
        try {
            let amount = Number(inputValue);
            if (amount === null) throw "Please enter a valid input";
            if (amount === 0) throw "Zero in not allowed";
            if (amount < 0) throw "negative number is not allowed";
            current_bal += amount;
            Available_bal.innerHTML = `₹${current_bal.toFixed(2)}`;
            error_msg.innerHTML = "";
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

    })
}
function exit_form() {
    form_cont.classList.remove("flex");
    form_cont.classList.add("hidden");
}

if (exit) {
    exit.addEventListener("click", exit_form);
}

add_expense();

function history_items() {
    let form_details = document.querySelector(".form-details");
    let history_Cont = document.getElementById("history-container");
    form_details.addEventListener("submit", (event) => {
        event.preventDefault();

        let title = document.querySelector("input[type='text']").value;
        let amount = parseFloat(document.querySelector("input[type='number']").value);
        let category = document.querySelector("select").value;
        let date = document.querySelector("input[type='date']").value;
        let current_time = new Date();
        let live_Time = current_time.toLocaleTimeString();

        let money_spend = document.querySelector(".money-spend");

        try {
            if (current_bal === 0) throw "There is no balance in your account"
            if (isNaN(amount) || amount <= 0) throw "There is no available balance in your account";
            if (current_bal < amount) throw "Insufficient balance";
            current_bal -= amount;
            Available_bal.innerHTML = `₹${current_bal.toFixed(2)}`;
            total_spend += amount;
            money_spend.innerHTML = `₹${total_spend.toFixed(2)}`;


        } catch (error) {
            alert(error);
            exit_form();
            form_details.reset();
            return;
        }


        let history_item = document.createElement("div");
        history_item.classList.add("border", "border-gray-300", "rounded-lg", "p-3", "shadow", "bg-white", "flex", "justify-between", "items-center");
        history_item.innerHTML = `
            <h2 class="font-bold text-lg text-[#264653]">${title}</h2>
            <p class="text-gray-600">${category}</p>
            <p class="text-gray-500">${date}</p>
            <p class="text-gray-400">${live_Time}</p>
            <h3 class=" font-bold" style="color: rgb(231 111 81 );">-₹${amount}</h3>
        `;
        history_Cont.appendChild(history_item);
        form_details.reset();
        exit_form();
    })
}



history_items();