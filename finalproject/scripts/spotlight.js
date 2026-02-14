// Function to shuffle an array (Fisher-Yates shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to fetch groups and display spotlight groups
async function fetchSpotlightMembers() {
    try {
        const response = await fetch('data/groups.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const groups = await response.json();

        // Shuffle the array to randomize the selection
        const shuffledGroups = shuffleArray(groups);

        // Select 2 or 3 random groups (depending on how many are available)
        const selectedGroups = shuffledGroups.slice(0, Math.min(shuffledGroups.length, 3));

        // Display spotlight groups
        displaySpotlightMembers(selectedGroups);
    } catch (error) {
        console.error('Error fetching or processing groups:', error);
    }
}

// Function to display spotlight groups
function displaySpotlightMembers(groups) {
    const spotlightContainer = document.getElementById('spotlight-container');
    spotlightContainer.innerHTML = '';  // Clear previous content

    groups.forEach(group => {
        const spotlightCard = document.createElement('div');
        spotlightCard.classList.add('spotlight-card');

        spotlightCard.innerHTML = `
            <h3>${group.group_name}</h3>
            <img src="images/${group.image}" alt="${group.group_name} logo" width="100" loading="lazy">
            <p><strong>Category:</strong> ${group.category}</p>
            <p><strong>Description:</strong> ${group.description}</p>
            <p><strong>Members:</strong> ${group.members}</p>
            <p><strong>Established:</strong> ${group.established}</p>
        `;

        spotlightContainer.appendChild(spotlightCard);
    });
}

// Call the function when the page loads
window.onload = fetchSpotlightMembers;