// Small shared menu toggle used across pages
const hamButton = document.querySelector('#menubutton');
const navigation = document.querySelector('#animatemenu');

if (hamButton && navigation) {
    hamButton.addEventListener('click', () => {
        navigation.classList.toggle('open');
        hamButton.classList.toggle('open');
    });
}
