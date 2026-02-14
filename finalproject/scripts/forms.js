// Grab the entire URL this page including the attached GET values
const currentUrl = window.location.href;


// Divid the url into two halves
const everything=currentUrl.split('?')


// Grab just the second half
let formData = everything[1].split('&')


function show(cup) {
    formData.forEach((element) => {
        if (element.startsWith(cup)) {
            result = decodeURIComponent(element.split('=')[1].replace("%40", "@"));
        } // end if
    });
    return(result);
} // end show



function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }


const showInfo = document.querySelector('#results')


const timestamp = show("timestamp");
const date = new Date(timestamp).toLocaleDateString();  // Extract the date
const time = new Date(timestamp).toLocaleTimeString();  // Extract the time

showInfo.innerHTML = `
<h3>Application for ${capitalize(show("first"))} ${capitalize(show("last"))}</h3>
<p><strong>Your Email:</strong> <a href="mailto:${show("email")}">${show("email")}</a></p>
<p><strong>Your Phone:</strong> ${show("phone")}</p>
<p><strong>Your Car of choice:</strong> ${show("description")}</p>
<p><strong>Your group:</strong> ${show("group")}</p>
<p><strong>Date and Time of Application:</strong> ${date} ${time}</p>
`;