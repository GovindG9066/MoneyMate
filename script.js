let income = 0;  // Default income 0 hai
let totalSpent = 0;
let availableBalance = 0;

// Function to set income
function setIncome(amount) {
    income = amount;
    availableBalance = amount;  // Pehle available balance = income
    updateUI();
}

// Function to add expense
function addExpense(amount) {
    if (amount > availableBalance) {
        alert("Not enough balance!");
        return;
    }
    totalSpent += amount;
    availableBalance -= amount;
    updateUI();
}

// Function to update UI
function updateUI() {
    document.querySelector('.wallet').value = income;  // Wallet balance input update karega
    document.querySelector('.Available-bal').innerText = `₹${availableBalance.toFixed(2)}`;
    document.querySelector('.text-xl.font-bold.text-[#E76F51]').innerText = `₹${totalSpent.toFixed(2)}`;
}

// Event Listener for Setting Income
document.querySelector('.wallet').addEventListener('change', function () {
    let amount = parseFloat(this.value);
    if (!isNaN(amount) && amount >= 0) {
        setIncome(amount);
    } else {
        alert("Please enter a valid amount!");
    }
});

// Example Usage
setIncome(1000);   // User ne income ₹1000 set ki
addExpense(200);   // User ne ₹200 spend kiya
