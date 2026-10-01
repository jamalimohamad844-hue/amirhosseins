// ================= MOBILE MENU =================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn) {

  menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("mobile-open");

  });

}


// بستن منو بعد از انتخاب گزینه

document.querySelectorAll(".nav-links a").forEach(link => {

  link.addEventListener("click", () => {

    navLinks.classList.remove("mobile-open");

  });

});


// ================= HEADER =================

window.addEventListener("scroll", () => {

  const header = document.querySelector(".header");

  if (window.scrollY > 40) {

    header.style.boxShadow =
      "0 10px 40px rgba(17,16,14,.08)";

  } else {

    header.style.boxShadow = "none";

  }

});


// ================= SCROLL ANIMATION =================

const elements = document.querySelectorAll(
  ".team-card, .service-card, .portfolio-card, .video-card, .about-item, .contact-box"
);


elements.forEach(element => {

  element.classList.add("hidden");

});


const observer = new IntersectionObserver(

  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("show");

        observer.unobserve(entry.target);

      }

    });

  },

  {
    threshold: 0.12
  }

);


elements.forEach(element => {

  observer.observe(element);

});


// ================= CURRENT YEAR =================

const copyright = document.querySelector(".copyright");

if (copyright) {

  copyright.innerHTML =
    `© ${new Date().getFullYear()} ADMIN VIP — All Rights Reserved`;

}
