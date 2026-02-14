// Select all open buttons and close buttons
const openButtons = document.querySelectorAll('.openButton');
const closeButtons = document.querySelectorAll('.closeButton');

// Attach event listeners to each open button
openButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        document.getElementById(modalId).showModal();
    });
});

// Attach event listeners to each close button
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.parentElement.close();
    });
});


window.onload = function() {
    const timestampField = document.getElementById('timestamp');
    const now = new Date().toISOString();  // Get current date and time in ISO format
    timestampField.value = now;  // Set the hidden field's value
};