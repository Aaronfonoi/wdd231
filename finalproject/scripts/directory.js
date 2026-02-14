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
            <h3>${member.group_name}</h3>
            <img src="images/${member.image}" alt="${member.group_name} logo" width="300" loading="lazy">
            <p><strong>Category:</strong> ${member.category}</p>
            <p><strong>Description:</strong> ${member.description}</p>
            <p><strong>Established:</strong> ${member.established}</p>
            <p><strong>Members:</strong> ${member.members}</p>
            
        `;

        container.appendChild(card);
    });
}

// Fetch data and initialize directory
fetch('data/groups.json') // Replace with the actual path to your JSON file
    .then(response => response.json())
    .then(members => {
        // Display initial grid view
        displayMembers(members, 'grid');

        // Add event listeners for view toggle buttons
        document.getElementById('grid').addEventListener('click', () => displayMembers(members, 'grid'));
        document.getElementById('list').addEventListener('click', () => displayMembers(members, 'list'));
    })
    .catch(error => console.error('Error fetching member data:', error));
