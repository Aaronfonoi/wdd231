document.addEventListener("DOMContentLoaded", function () {
    // Get the current date
    const now = new Date();
    
    // Get the last visit date from localStorage
    const lastVisit = localStorage.getItem('lastVisit');

    // Elements for overlay and message
    const overlay = document.getElementById('visit-overlay');
    const messageContainer = document.getElementById('visit-message');
    const closeButton = document.getElementById('close-overlay');

    // Check if it's the user's first visit
    if (!lastVisit) {
        // Adding a line break between "Welcome!" and the rest of the message
        messageContainer.innerHTML = "Welcome!<br>Let us know if you have any questions.";
    } else {
        // Parse the last visit date
        const lastVisitDate = new Date(lastVisit);
        
        // Calculate the difference in time between now and the last visit
        const diffTime = Math.abs(now - lastVisitDate);
        
        // Convert the time difference to days
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) {
            // If the user visited less than a day ago
            messageContainer.textContent = "Back so soon! Awesome!";
        } else if (diffDays === 1) {
            // If the user visited exactly 1 day ago
            messageContainer.textContent = "You last visited 1 day ago.";
        } else {
            // If the user visited more than 1 day ago
            messageContainer.textContent = `You last visited ${diffDays} days ago.`;
        }
    }

    // Store the current visit date in localStorage
    localStorage.setItem('lastVisit', now);

    // Show the overlay
    overlay.style.display = "block";

    // Add event listener to close the overlay when the close button is clicked
    closeButton.addEventListener('click', function () {
        overlay.style.display = "none";
    });

    // Optional: Close the overlay if user clicks outside the content area
    window.addEventListener('click', function (event) {
        if (event.target === overlay) {
            overlay.style.display = "none";
        }
    });
});