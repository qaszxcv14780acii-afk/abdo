/* =====================================================
   GLOBAL HELPERS
===================================================== */
const isMobile = window.innerWidth < 768;

/* =====================================================
   NAVBAR SCROLL + ACTIVE LINK (MERGED)
===================================================== */
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");
const backToTopButton = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  // Navbar scroll effect
  if (navbar) {
    navbar.classList.toggle("scrolled", scrollY > 50);
  }

  // Active nav link
  let current = "";
  sections.forEach((section) => {
    if (scrollY >= section.offsetTop - 200) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`,
    );
  });

  // Back to top
  if (backToTopButton) {
    backToTopButton.classList.toggle("show", scrollY > 300);
  }

  // Hero parallax (desktop only)
  if (!isMobile) {
    const hero = document.querySelector(".hero-section");
    if (hero) {
      hero.style.transform = `translateY(${scrollY * 0.3}px)`;
      hero.style.opacity = 1 - scrollY / 600;
    }
  }
});

/* =====================================================
   SMOOTH SCROLLING
===================================================== */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;

    window.scrollTo({
      top: target.offsetTop - 80,
      behavior: "smooth",
    });

    const navbarCollapse = document.querySelector(".navbar-collapse");
    if (navbarCollapse?.classList.contains("show")) {
      navbarCollapse.classList.remove("show");
    }
  });
});

/* =====================================================
   BACK TO TOP CLICK
===================================================== */
backToTopButton?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* =====================================================
   IMAGE HANDLING & OPTIMIZATION
===================================================== */
const handleImages = (selector, placeholder) => {
  document.querySelectorAll(selector).forEach((img) => {
    img.loading = "lazy";

    img.addEventListener("load", () => {
      img.style.opacity = "0";
      img.style.transition = "opacity .5s ease";
      requestAnimationFrame(() => (img.style.opacity = "1"));
    });

    img.addEventListener("error", () => {
      img.src = placeholder;
    });
  });
};

/* =====================================================
   AOS INIT
===================================================== */
if (window.AOS) {
  AOS.init({
    duration: 1000,
    once: true,
    disable: isMobile,
  });
}

/* =====================================================
   PROGRESS BARS
===================================================== */
const animateProgressBars = () => {
  const bars = document.querySelectorAll(".progress-bar");
  if (!bars.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.style.width;
          bar.style.width = "0%";
          setTimeout(() => (bar.style.width = width), 100);
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.5 },
  );

  bars.forEach((bar) => observer.observe(bar));
};

/* =====================================================
   PROJECT CARDS
===================================================== */
const animateCards = (selector) => {
  const cards = document.querySelectorAll(selector);
  if (!cards.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, i * 100);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all .6s ease";

    card.addEventListener("mouseenter", () => {
      if (!isMobile) card.style.transform = "translateY(-15px)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });

    observer.observe(card);
  });
};

/* =====================================================
   SKILL CARDS
===================================================== */
const animateSkillCards = () => animateCards(".skill-card");

/* =====================================================
   COUNTER
===================================================== */
const animateCounter = () => {
  const el = document.querySelector(".experience-badge h3");
  if (!el) return;

  const target = parseInt(el.textContent);
  let current = 0;
  const step = target / 50;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            el.textContent = target + "+";
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(current) + "+";
          }
        }, 40);
        observer.disconnect();
      }
    },
    { threshold: 0.5 },
  );

  observer.observe(el);
};

/* =====================================================
   RIPPLE EFFECT
===================================================== */
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const ripple = document.createElement("span");
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    ripple.className = "ripple";
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

/* =====================================================
   PAGE LOAD
===================================================== */
window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  handleImages(
    'img[src*="images/"]',
    "https://via.placeholder.com/300x300/4a90e2/ffffff?text=Your+Photo",
  );

  handleImages(
    ".project-image img",
    "https://via.placeholder.com/800x600/4a90e2/ffffff?text=Project",
  );

  animateProgressBars();
  animateCards(".project-card");
  animateSkillCards();
  animateCounter();
});

/* =====================================================
   BACK TO TOP
===================================================== */
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    document.getElementById("backToTop").style.display = "block";
  } else {
    document.getElementById("backToTop").style.display = "none";
  }
});