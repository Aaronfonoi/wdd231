// Function to shuffle an array (Fisher-Yates shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to fetch members and filter spotlight members
async function fetchSpotlightMembers() {
    try {
        const response = await fetch('data/members.json'); // Replace with your actual JSON file path
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const members = await response.json();

        // Filter members with Silver (2) or Gold (3) membership levels
        const spotlightMembers = members.filter(member => member.membership_level === 2 || member.membership_level === 3);

        // Shuffle the array to randomize the selection
        const shuffledMembers = shuffleArray(spotlightMembers);

        // Select 2 or 3 random members (depending on how many are available)
        const selectedMembers = shuffledMembers.slice(0, Math.min(shuffledMembers.length, 3));

        // Display spotlight members
        displaySpotlightMembers(selectedMembers);
    } catch (error) {
        console.error('Error fetching or processing members:', error);
    }
}

// Function to display spotlight members
function displaySpotlightMembers(members) {
    const spotlightContainer = document.getElementById('spotlight-container');
    spotlightContainer.innerHTML = '';  // Clear previous content

    members.forEach(member => {
        const spotlightCard = document.createElement('div');
        spotlightCard.classList.add('spotlight-card');

        spotlightCard.innerHTML = `
            <h3>${member.name}</h3>
            <img src="images/${member.image}" alt="${member.name} logo" width="100" loading="lazy">
            <p><strong>Phone:</strong> ${member.phone_number}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Website:</strong> <a href="${member.website_url}" target="_blank">${member.website_url}</a></p>
            <p><strong>Membership Level:</strong> ${getMembershipLevel(member.membership_level)}</p>
        `;

        spotlightContainer.appendChild(spotlightCard);
    });
}

// Function to get membership level (same as before)
function getMembershipLevel(level) {
    switch (level) {
        case 1: return 'Member';
        case 2: return 'Silver';
        case 3: return 'Gold';
        default: return 'Unknown';
    }
}

// Call the function when the page loads
window.onload = fetchSpotlightMembers;