/* =========================
   MOBILE MENU
========================= */

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

menuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

});


/* =========================
   CLOSE MOBILE MENU
========================= */

const mobileLinks = document.querySelectorAll(".mobile-menu a");

mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

    });

});


/* =========================
   HEADER SCROLL EFFECT
========================= */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.background = "rgba(4, 13, 24, 0.95)";

    } else {

        header.style.background = "rgba(6,17,31,0.85)";

    }

});


/* =========================
   REVEAL ANIMATION
========================= */

const elements = document.querySelectorAll(
    ".skill-card, .timeline-item, .info-card, .about-text"
);

const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform = "translateY(0)";

            }

        });

    },

    {
        threshold: 0.15
    }

);


elements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform = "translateY(25px)";

    element.style.transition = "opacity .7s ease, transform .7s ease";

    observer.observe(element);

});
