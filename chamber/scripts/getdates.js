// Function to get the current year
function getCurrentYear() {
    return new Date().getFullYear();
}

// Function to get the last modified date of the document
function getLastModifiedDate() {
    return document.lastModified;
}

// Update footer information when DOM is ready
document.addEventListener("DOMContentLoaded", function() {
    // Update copyright year
    const yearSpan = document.querySelector("#year .highlight");
    if (yearSpan) {
        yearSpan.textContent = getCurrentYear();
    }

    // Update last modified date
    const lastModifiedElement = document.getElementById("lastModifiedDate");
    if (lastModifiedElement) {
        lastModifiedElement.textContent = "Last modified: " + getLastModifiedDate();
    }
});