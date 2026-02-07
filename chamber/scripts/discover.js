document.addEventListener("DOMContentLoaded", function () {
    // Get the current date
    const now = new Date();
    
    // Get the last visit date from localStorage
    const lastVisit = localStorage.getItem('lastVisit');

    // Elements for overlay and message
    const overlay = document.getElementById('visit-overlay');
    const messageContainer = document.getElementById('visit-message');
    const closeButton = document.getElementById('close-overlay');
    // If overlay elements are missing, bail out gracefully and still store visit
    if (!overlay || !messageContainer || !closeButton) {
        console.warn('Visit overlay elements not found; skipping overlay display.');
        localStorage.setItem('lastVisit', now.toISOString());
        return;
    }

    const visitText = document.getElementById('visit-text') || messageContainer;

    // Check if it's the user's first visit
    if (!lastVisit) {
        // Adding a line break between "Welcome!" and the rest of the message
        visitText.innerHTML = "<strong>Welcome!</strong><br>Let us know if you have any questions.";
    } else {
        // Parse the last visit date
        const lastVisitDate = new Date(lastVisit);
        
        // Calculate the difference in time between now and the last visit
        const diffTime = Math.abs(now - lastVisitDate);
        
        // Convert the time difference to days
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) {
            // If the user visited less than a day ago
            visitText.textContent = "Back so soon! Awesome!";
        } else if (diffDays === 1) {
            // If the user visited exactly 1 day ago
            visitText.textContent = "You last visited 1 day ago.";
        } else {
            // If the user visited more than 1 day ago
            visitText.textContent = `You last visited ${diffDays} days ago.`;
        }
    }

    // Store the current visit date in localStorage (use ISO string)
    localStorage.setItem('lastVisit', now.toISOString());

    // Show the overlay (use flex to center content) and manage ARIA + focus
    overlay.style.display = "flex";
    overlay.setAttribute('aria-hidden', 'false');

    const previouslyFocused = document.activeElement;
    closeButton.focus();

    function closeOverlay() {
        overlay.style.display = "none";
        overlay.setAttribute('aria-hidden', 'true');
        if (previouslyFocused && previouslyFocused.focus) previouslyFocused.focus();
    }

    // Add event listener to close the overlay when the close button is clicked
    closeButton.addEventListener('click', closeOverlay);

    // Close on Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' || e.key === 'Esc') {
            closeOverlay();
        }
    });

    // Close when clicking outside the dialog content
    overlay.addEventListener('click', function (event) {
        if (event.target === overlay) closeOverlay();
    });
});