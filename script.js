let current_bal = 0.00;
let wallet = document.querySelector(".wallet");
let Available_bal = document.querySelector(".Available-bal");
let error_msg = document.querySelector(".error-msg");

wallet.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        let inputValue = wallet.value.trim();
        try {
            let amount=Number(inputValue);
            if(amount===null) throw "Please enter a valid input";
            if(amount===0)throw "Zero in not allowed";
            if(amount < 0)throw "negative number is not allowed";
            Available_bal.innerHTML = `₹${amount}.00`;
            wallet.value = "";
        } catch (error) {
            error_msg.innerHTML=error;
            wallet.value="";
        }

    }
})