document.addEventListener("DOMContentLoaded", function () {
  /* ===== AOS INIT ===== */
  if (window.innerWidth > 768) {
    AOS.init({
      duration: 800,
      once: true,
      offset: 120,
    });
  }

  /* ===== Navbar Scroll Effect ===== */
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  /* ===== Back To Top ===== */
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 300 ? "flex" : "none";
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  /* ===== Auto close navbar on mobile ===== */
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 992) {
        new bootstrap.Collapse(navbarCollapse).hide();
      }
    });
  });

  /* ===== Contact Form (safe fake submit) ===== */
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("تم إرسال الرسالة بنجاح ✅");
    form.reset();
  });
});
