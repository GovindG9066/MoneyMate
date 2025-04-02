document.addEventListener("DOMContentLoaded", function () {
    const showChartBtn = document.getElementById("showChartBtn");
    const chartContainer = document.getElementById("chartContainer");
    let myExpenseChart = null; // Store the chart instance

    showChartBtn.addEventListener("click", function () {
        if (chartContainer.classList.contains("hidden")) {
            chartContainer.classList.remove("hidden"); // Show chart
            showChartBtn.textContent = "Hide Expense Chart"; // Change button text

            // Create the chart only if it doesn't exist
            if (!myExpenseChart) {
                const ctx = document.getElementById("expenseChart").getContext("2d");

                myExpenseChart = new Chart(ctx, {
                    type: "bar",
                    data: {
                        labels: ["Food", "Transport", "Entertainment", "Shopping", "Bills"],
                        datasets: [{
                            label: "Expenses (₹)",
                            data: [1200, 800, 600, 1400, 900], // Dummy data
                            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF9800"],
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                labels: { color: "black" }
                            }
                        }
                    }
                });
            }
        } else {
            chartContainer.classList.add("hidden"); // Hide chart
            showChartBtn.textContent = "Show Expense Chart"; // Change button text
        }
    });
});
