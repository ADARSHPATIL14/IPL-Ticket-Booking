
// Function to display toast notification
function showToast(message) {

    let toast = document.createElement("div");

    toast.innerText = message;

    toast.className = "toast";

    document.body.appendChild(toast);

    setTimeout(function() {
        toast.remove();
    }, 3000);
}


// Wait until HTML is completely loaded
document.addEventListener("DOMContentLoaded", function() {


    // =====================================
    // 1. MOBILE HAMBURGER MENU
    // =====================================

    let menuToggle = document.getElementById("menu-toggle");

    let navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {

        // Open and close mobile menu
        menuToggle.addEventListener("click", function() {

            navLinks.classList.toggle("show");

            let isOpen = navLinks.classList.contains("show");

            menuToggle.setAttribute("aria-expanded", isOpen);

            menuToggle.innerText = isOpen ? "✕" : "☰";

        });


        // Close menu after clicking a navigation link
        let links = navLinks.querySelectorAll("a");

        links.forEach(function(link) {

            link.addEventListener("click", function() {

                navLinks.classList.remove("show");

                menuToggle.setAttribute("aria-expanded", "false");

                menuToggle.innerText = "☰";

            });

        });

    }



    // =====================================
    // 2. MATCH FILTER
    // =====================================

    let teamFilter = document.getElementById("team-filter");

    let matchCards = document.querySelectorAll(".match-card");

    let noMatches = document.getElementById("no-matches");


    if (teamFilter) {

        teamFilter.addEventListener("change", function() {

            let selectedTeam = teamFilter.value;

            let visibleCount = 0;


            matchCards.forEach(function(card) {

                let teams = card.dataset.teams.split(" ");

                if (
                    selectedTeam === "all" ||
                    teams.includes(selectedTeam)
                ) {

                    card.hidden = false;

                    visibleCount++;

                } else {

                    card.hidden = true;

                }

            });


            // Display message if no matches are found
            if (noMatches) {

                noMatches.hidden = visibleCount !== 0;

            }

            showToast("Match filter updated!");

        });

    }



    // =====================================
    // 3. GRID AND LIST VIEW TOGGLE
    // =====================================

    let matchesContainer = document.getElementById("matches-container");

    let gridButton = document.getElementById("grid-view");

    let listButton = document.getElementById("list-view");


    if (matchesContainer && gridButton && listButton) {


        // Grid View Button
        gridButton.addEventListener("click", function() {

            matchesContainer.classList.remove("list-view");

            gridButton.classList.add("active");

            listButton.classList.remove("active");

            showToast("Grid view selected!");

        });


        // List View Button
        listButton.addEventListener("click", function() {

            matchesContainer.classList.add("list-view");

            listButton.classList.add("active");

            gridButton.classList.remove("active");

            showToast("List view selected!");

        });

    }



    // =====================================
    // 4. EXISTING BOOKING FUNCTIONALITY
    // =====================================

    let bookingForm = document.getElementById("booking-form");


    // Check if user opened the booking form link
    if (bookingForm && window.location.hash === "#booking-form") {

        setTimeout(function() {

            bookingForm.scrollIntoView({
                behavior: "smooth"
            });

            showToast("Welcome! You can book your IPL tickets now.");

        }, 100);

    }



    // Get form controls using DOM selectors
    let matchSelect = document.getElementById("match-select");

    let standSelect = document.getElementById("stand-select");

    let ticketQuantity = document.getElementById("ticket-quantity");


    // Get Booking Summary elements
    let summaryMatch = document.getElementById("summary-match");

    let summaryStand = document.getElementById("summary-stand");

    let summaryQuantity = document.getElementById("summary-quantity");

    let summaryTotal = document.getElementById("summary-total");


    // Ticket prices
    let standPrices = {
        General: 1000,
        Premium: 4000,
        VIP: 15000
    };


    // Function to update Booking Summary
    function updateBookingSummary() {

        let selectedMatch = matchSelect.value;

        let selectedStand = standSelect.value;

        let quantity = Number(ticketQuantity.value);


        // Update selected match
        summaryMatch.innerText =
            selectedMatch || "Not selected";


        // Update selected stand
        summaryStand.innerText =
            selectedStand || "Not selected";


        // Update ticket quantity
        summaryQuantity.innerText =
            ticketQuantity.value
                ? ticketQuantity.value + " ticket(s)"
                : "Not selected";


        // Check valid quantity and selected stand
        if (
            selectedStand &&
            ticketQuantity.value !== "" &&
            Number.isInteger(quantity) &&
            quantity >= 1 &&
            quantity <= 10
        ) {

            // Calculate total price
            let totalPrice = standPrices[selectedStand] * quantity;

            // Display total price
            summaryTotal.innerText =
                "₹" + totalPrice.toLocaleString("en-IN");

        } else {

            summaryTotal.innerText = "₹0";

        }


        // Show toast when all selections are valid
        if (
            selectedMatch &&
            selectedStand &&
            Number.isInteger(quantity) &&
            quantity >= 1 &&
            quantity <= 10
        ) {

            showToast("Booking summary updated!");

        }

    }


    // Add change event listeners
    if (matchSelect && standSelect && ticketQuantity) {

        matchSelect.addEventListener("change", updateBookingSummary);

        standSelect.addEventListener("change", updateBookingSummary);

        ticketQuantity.addEventListener("change", updateBookingSummary);

    }


    // Update summary after form reset
    if (bookingForm) {

        bookingForm.addEventListener("reset", function() {

            setTimeout(function() {

                updateBookingSummary();

            }, 0);

        });


        // Display message when valid form is submitted
        bookingForm.addEventListener("submit", function(event) {

            event.preventDefault();

            showToast("Your booking details are valid!");

        });

    }

});
