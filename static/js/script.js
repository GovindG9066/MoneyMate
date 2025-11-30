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



    /* =========================================
       DARK MODE (One final clean version)
    ========================================== */
/* ------------------------- DARK MODE (SYNC ALL TOGGLES) ------------------------- */

const btn_containers = document.querySelectorAll(".btn-container");
const btn_circles = document.querySelectorAll(".btn-circle");

// Apply saved theme on load
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");

    // Move ALL toggle circles to active position
    btn_circles.forEach(c => c.classList.add("btnevent"));
} else {
    btn_circles.forEach(c => c.classList.remove("btnevent"));
}

// Function to SYNC all toggles
function syncAllToggles(isDark) {
    btn_circles.forEach(c => {
        if (isDark) c.classList.add("btnevent");
        else c.classList.remove("btnevent");
    });
}

// Add click listener to ALL toggle buttons
btn_containers.forEach(container => {
    container.addEventListener("click", () => {

        // Toggle theme
        const isDark = document.documentElement.classList.toggle("dark");

        // Save theme
        localStorage.setItem("theme", isDark ? "dark" : "light");

        // Sync UI on ALL toggles
        syncAllToggles(isDark);
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

    spend?.addEventListener("click", openExpenseForm);
    exit?.addEventListener("click", closeExpenseForm);

});
