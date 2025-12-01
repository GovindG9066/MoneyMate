console.log("JS Loaded Successfully");



document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       SLIDE MENU (Mobile)
    ========================================== */
    const menuBtn = document.getElementById("menuBtn");
    const sideMenu = document.getElementById("sideMenu");
    const closeMenu = document.getElementById("closeMenu");

    menuBtn?.addEventListener("click", () => {
        sideMenu?.classList.remove("-translate-x-full");
    });

    closeMenu?.addEventListener("click", () => {
        sideMenu?.classList.add("-translate-x-full");
    });

    // Click on empty area closes menu
    sideMenu?.addEventListener("click", (e) => {
        if (e.target.id === "sideMenu") {
            sideMenu.classList.add("-translate-x-full");
        }
    });

    // popup msg
    // popup msg (WORKING VERSION)
    const form = document.getElementById("expenseForm");
    if (form) {
        const amountInput = form.querySelector("input[name='amount']");
        const available = Number(document.getElementById("availableBalance").value || 0);

        console.log("Available Balance:", available); // Debugging

        form.addEventListener("submit", (e) => {
            const amount = Number(amountInput.value);

            if (amount > available) {
                e.preventDefault();

                Swal.fire({
                    icon: "error",
                    title: "Insufficient Balance",
                    html: `Your available balance is <b>₹${available}</b><br>
                       You are trying to spend <b>₹${amount}</b>.`,
                    confirmButtonText: "OK",
                    confirmButtonColor: "#d33"
                });
            }
        });
    }





    // Second

    const btn_containers = document.querySelectorAll(".btn-container");
    const btn_icons = document.querySelectorAll(".btn-icon");

    // Load saved theme
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark";

    if (isDark) {
        document.documentElement.classList.add("dark");
        btn_icons.forEach(i => {
            i.classList.remove("fa-moon");
            i.classList.add("fa-sun", "text-yellow-300");
        });
    } else {
        btn_icons.forEach(i => {
            i.classList.remove("fa-sun", "text-yellow-300");
            i.classList.add("fa-moon");
        });
    }

    // SYNC all icons function
    function syncAllIcons(isDarkMode) {
        btn_icons.forEach(i => {
            if (isDarkMode) {
                i.classList.remove("fa-moon");
                i.classList.add("fa-sun", "text-yellow-300");
            } else {
                i.classList.remove("fa-sun", "text-yellow-300");
                i.classList.add("fa-moon");
            }
        });
    }

    // Handle clicks
    btn_containers.forEach(container => {
        container.addEventListener("click", () => {
            const nowDark = document.documentElement.classList.toggle("dark");

            localStorage.setItem("theme", nowDark ? "dark" : "light");

            // Sync all toggle icons
            syncAllIcons(nowDark);
        });
    });





    /* =========================================
       EXPENSE MODAL
    ========================================== */
    let form_cont = document.querySelector(".form-container");
    let spend = document.querySelector(".add-spend");
    let exit = document.getElementById("exitBtn");

    function openExpenseForm() {
        form_cont.classList.remove("hidden");
        form_cont.classList.add("flex");
    }

    function closeExpenseForm() {
        form_cont.classList.remove("flex");
        form_cont.classList.add("hidden");
    }

    window.openExpenseForm = openExpenseForm;
    window.closeExpenseForm = closeExpenseForm;

    spend?.addEventListener("click", openExpenseForm);
    exit?.addEventListener("click", closeExpenseForm);

});


