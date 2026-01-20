function getMembershipLevel(level) {
    const levels = {
        1: 'Bronze',
        2: 'Silver',
        3: 'Gold',
    };
    return levels[level] || 'Unknown';
}

// Function to display members
function displayMembers(members, view = 'grid') {
    const container = document.getElementById('directory-container');
    container.className = view; // Apply the grid or list class
    container.innerHTML = ''; // Clear previous content

    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('member-card');

        card.innerHTML = `
            <h3>${member.name}</h3>
            <img src="images/${member.image}" alt="${member.name} logo" width="100" loading="lazy">
            <p><strong>Phone:</strong> ${member.phone_number}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Website:</strong> <a href="${member.website_url}" target="_blank">${member.website_url}</a></p>
            <p><strong>Membership Level:</strong> ${getMembershipLevel(member.membership_level)}</p>
        `;

        container.appendChild(card);
    });
}

// Fetch data and initialize directory
fetch('data/members.json') // Replace with the actual path to your JSON file
    .then(response => response.json())
    .then(members => {
        // Display initial grid view
        displayMembers(members, 'grid');

        // Add event listeners for view toggle buttons
        document.getElementById('grid').addEventListener('click', () => displayMembers(members, 'grid'));
        document.getElementById('list').addEventListener('click', () => displayMembers(members, 'list'));
    })
    .catch(error => console.error('Error fetching member data:', error));
