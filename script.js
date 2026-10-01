const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("mobile-open");
  });
}


// بستن منو بعد از کلیک روی لینک
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("mobile-open");
  });
});


// تغییر ظاهر هدر هنگام اسکرول
window.addEventListener("scroll", () => {

  const header = document.querySelector(".header");

  if (window.scrollY > 50) {
    header.style.background = "rgba(3,9,20,.92)";
  } else {
    header.style.background = "rgba(3,9,20,.65)";
  }

});


// انیمیشن ورود عناصر
const observer = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add("show");

      }

    });

  },
  {
    threshold: 0.12
  }
);


document
  .querySelectorAll(
    ".team-card, .service-card, .about-item, .cta-box"
  )
  .forEach(el => {

    el.classList.add("hidden");

    observer.observe(el);

  });
