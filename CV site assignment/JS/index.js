// JavaScript for home page and Portfolio page only //

// function for nav and font size reduction on scroll
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
