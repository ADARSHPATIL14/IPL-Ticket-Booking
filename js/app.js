
// Function to display toast notification
function showToast(message) {

    // Create a new div element
    let toast = document.createElement("div");

    // Add message to the toast
    toast.innerText = message;

    // Add CSS class
    toast.className = "toast";

    // Add toast to the webpage
    document.body.appendChild(toast);

    // Remove toast after 3 seconds
    setTimeout(function() {
        toast.remove();
    }, 3000);
}


// Wait until HTML is completely loaded
document.addEventListener("DOMContentLoaded", function() {

    // Get the booking form
    let bookingForm = document.getElementById("booking-form");

    // Check if user opened the booking form link
    if (bookingForm && window.location.hash === "#booking-form") {

        // Smoothly scroll to the form
        setTimeout(function() {
            bookingForm.scrollIntoView({
                behavior: "smooth"
            });

            // Display notification
            showToast("Welcome! You can book your IPL tickets now.");
        }, 100);
    }

    // Get the form
    let form = document.querySelector("form");

    // Display message when valid form is submitted
    if (form) {
        form.addEventListener("submit", function(event) {

            // Prevent actual form submission
            event.preventDefault();

            showToast("Your booking details are valid!");
        });
    }

});
