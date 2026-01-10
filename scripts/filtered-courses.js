// Menu Navagation | Hamburguer menu button

const hamButton = document.querySelector('#menubutton');
const navigation = document.querySelector('#animatemenu');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});


// COURSES ITEMS OBJECTS

document.addEventListener('DOMContentLoaded', function () {

    const courses = [
        {
            subject: 'CSE',
            number: 110,
            title: 'Introduction to Programming',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce students to programming...',
            technology: ['Python'],
            completed: true
        },
        {
            subject: 'WDD',
            number: 130,
            title: 'Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course introduces students to the World Wide Web...',
            technology: ['HTML', 'CSS'],
            completed: true
        },
        {
            subject: 'CSE',
            number: 111,
            title: 'Programming with Functions',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'CSE 111 students become more organized...',
            technology: ['Python'],
            completed: true
        },
        {
            subject: 'CSE',
            number: 210,
            title: 'Programming with Classes',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce the notion of classes...',
            technology: ['C#'],
            completed: true
        },
        {
            subject: 'WDD',
            number: 131,
            title: 'Dynamic Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience in Web Fundamentals...',
            technology: ['HTML', 'CSS', 'JavaScript'],
            completed: true
        },
        {
            subject: 'WDD',
            number: 231,
            title: 'Frontend Web Development I',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience...',
            technology: ['HTML', 'CSS', 'JavaScript'],
            completed: false
        }
    ];

    const coursesContainer = document.querySelector('.courses');
    const totalCreditsSpan = document.getElementById('total-credits');
    const filterButtons = document.querySelectorAll('.filter-btn');

    function createCourseElement(course) {
        const courseElement = document.createElement('div');
        courseElement.className = `course-item ${course.completed ? 'highlight' : ''}`;
        courseElement.dataset.category = course.subject;

        // Only include subject and number
        const courseContent = `
            <p>${course.subject} ${course.number}</p>
        `;
        courseElement.innerHTML = courseContent;
        return courseElement;
    }

    function displayCourses(filter = 'all') {
        let totalCredits = 0;
        coursesContainer.innerHTML = '';

        courses.forEach(course => {
            if (filter === 'all' || course.subject === filter) {
                const courseElement = createCourseElement(course);
                coursesContainer.appendChild(courseElement);
                totalCredits += course.credits;
            }
        });

        totalCreditsSpan.textContent = totalCredits;
    }

    // Initial display
    displayCourses();

    // Filter button event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            displayCourses(filter);
        });
    });
});