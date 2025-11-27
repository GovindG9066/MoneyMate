// Initialize EmailJS
emailjs.init("T1j_ef6JPoC6Gp97O");

const form = document.getElementById("contactForm");
const btn = document.getElementById("email-btn");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  btn.innerText = "Sending...";

  const serviceID = "service_6rdruv8";
  const templateID = "template_jp7pcke";

  emailjs.sendForm(serviceID, templateID, form)
    .then(() => {
      btn.innerText = "Send Message";
      alert("Message sent successfully!");
      form.reset();
    })
    .catch((error) => {
      btn.innerText = "Send Message";
      console.error("EmailJS Error:", error);
      alert("Something went wrong, please try again.");
    });
});
