// JavaScript for Contact page ONLY!!!

// function for nav size reduction on scroll
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (window.innerWidth <= 900) {
        document.getElementsByClassName("navigation")[0].style.fontSize = "3vw";
    } else {    
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            document.getElementsByClassName("navigation")[0].style.fontSize = "1.5vw";
        } else {
            document.getElementsByClassName("navigation")[0].style.fontSize = "3vw";
        }
    }
};

// function to highlight the page the user is currently viewing
document.addEventListener("DOMContentLoaded", function () {
    let pageTitle = document.title.toLowerCase(); 

    let navLinks = document.querySelectorAll(".navigation a");

    navLinks.forEach(link => {
        if (pageTitle.includes(link.textContent.toLowerCase())) {
            link.classList.add("active");
        }
    });
});

/* check email validation function making sure that both emails match - 
additional validiation within HTML to check an email actually has .com, .co.uk etc (see pattern attribute in html) */
let form = document.getElementById("contact-form");
let email = form.email;
let confirmEmail = form["confirm-email"];
email.onchange = checkEmail;
confirmEmail.onchange = checkEmail;

function checkEmail() {
    let error = '';
    if (email.value != confirmEmail.value) {
        error = "Email addresses don't match";
    }
    email.setCustomValidity(error);
    confirmEmail.setCustomValidity(error);
    email.reportValidity();
    confirmEmail.reportValidity();
}

// function and variables to change the required attribute for checkboxes so only one is required to be selected
let phone = document.getElementById("phone-contact");
let emailContact = document.getElementById("email-contact");

function checkBox(value) {
    if (value === "phone-contact") {
        emailContact.required = false;
    } else if (value === "email-contact") {
        phone.required = false;
    }
}

// date picker validation - checks today's date adds 1 to it so the user can select any date from tomorrow onwards
document.addEventListener("DOMContentLoaded", function () {
    const selectedDate = document.getElementById("project-start");

    if (selectedDate) {
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1); 
        let tomorrow = currentDate.toISOString().split("T")[0]; 

        selectedDate.setAttribute("min", tomorrow); 
    }
});

// function and variable to display or hide other duration textarea field when interacting with the duration dropdown
// hide by default
let hideOther = document.getElementById("other-duration").style.display = "none";

function showHide(value) {
    if (value === "other") {
        hideOther = document.getElementById("other-duration").style.display = "block";
    } else {
        hideOther = document.getElementById("other-duration").style.display = "none";
        document.getElementById("other-duration").required = false;
    }
};

function formatDate(isoDate) {
    let dateParts = isoDate.split("-"); 
    return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`; 
}

/* function to hide modal by default thanks to the css
checks the values inputted by the user and displays them back, also checks if the other duration textarea
field to see if it has a value and if it does displays the inputted value else hides the blank return
also displays the close buttons and sets the functionality so that a user can click on the close button, X icon or
outside the modal area to close the modal which then clears the form fields to allow another input */
document.addEventListener("DOMContentLoaded", function () {
    let form = document.getElementById("contact-form");
    let modal = document.getElementById("modal");
    let closeModal = document.getElementById("close-modal");
    let closeSpan = document.querySelector(".close");

    function closeAndReset() {
        modal.style.display = "none";
        form.reset();
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault(); 

        document.getElementById("modal-name").textContent = document.getElementById("name").value;
        document.getElementById("modal-project-description").textContent = document.getElementById("project-description").value;
        document.getElementById("modal-email").textContent = document.getElementById("email").value;
        document.getElementById("modal-contact-number").textContent = document.getElementById("contact-number").value;
        document.getElementById("modal-project-start").textContent = formatDate(document.getElementById("project-start").value);
        document.getElementById("modal-project-duration").textContent = document.getElementById("project-duration").value;
        
        let otherDuration = document.getElementById("other-duration").value.trim();
        let otherDurationContainer = document.getElementById("modal-other-duration").parentElement;

        if (otherDuration !== "") {
            document.getElementById("modal-other-duration").textContent = otherDuration;
            otherDurationContainer.style.display = "block"; 
        } else {
            otherDurationContainer.style.display = "none"; 
        }

        let selectedMethods = [];
        if (document.getElementById("phone-contact").checked) {
            selectedMethods.push("Phone");
        }
        if (document.getElementById("email-contact").checked) {
            selectedMethods.push("Email");
        }
        document.getElementById("modal-contact-methods").textContent = selectedMethods.join(", ");

        
        modal.style.display = "block";
    });

    closeModal.addEventListener("click", closeAndReset);

    closeSpan.addEventListener("click", closeAndReset);

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeAndReset();
        }
    });
});
