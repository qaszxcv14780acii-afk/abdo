// ===== Navigation Scroll Effect =====
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Smooth Scrolling for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

// ===== Active Navigation Link =====
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== Back to Top Button =====
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Handle Missing Images & Image Optimization =====
const handleMissingImages = () => {
    const images = document.querySelectorAll('img[src*="images/"]');
    images.forEach(img => {
        // تحسين جودة الصورة عند التحميل
        img.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 100);
        });
        
        // معالجة الأخطاء
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/300x300/4a90e2/ffffff?text=Your+Photo';
            this.alt = 'صورة شخصية - يرجى إضافة صورتك في مجلد images';
            console.warn('لم يتم العثور على الصورة:', this.src);
        });
        
        // تحسين الأداء - lazy loading للصور
        if (img.loading === undefined) {
            img.setAttribute('loading', 'lazy');
        }
    });
};

// ===== Image Hover Effects Enhancement =====
const enhanceImageEffects = () => {
    const profileImages = document.querySelectorAll('.profile-img, .about-profile-img');
    
    profileImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.willChange = 'transform, filter';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.willChange = 'auto';
        });
    });
};

// ===== Initialize AOS (Animate On Scroll) =====
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// ===== Animate Progress Bars on Scroll =====
const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => observer.observe(bar));
};

animateProgressBars();

// ===== Contact Form Submission =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (name && email && subject && message) {
            // Show success message
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="bi bi-check-circle me-2"></i>تم الإرسال بنجاح!';
            submitButton.disabled = true;
            submitButton.classList.remove('btn-primary');
            submitButton.classList.add('btn-success');
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.classList.remove('btn-success');
                submitButton.classList.add('btn-primary');
            }, 3000);
            
            // In a real application, you would send the data to a server here
            console.log('Form submitted:', { name, email, subject, message });
        }
    });
}

// ===== Typing Effect for Hero Section (Optional) =====
const typingEffect = () => {
    const textElement = document.querySelector('.text-gradient');
    if (!textElement) return;
    
    const texts = ['مطور مواقع الويب', 'Web Developer', 'مصمم واجهات', 'Frontend Developer'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    const type = () => {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            textElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
        
        setTimeout(type, typeSpeed);
    };
    
    // Uncomment the line below to enable typing effect
    // type();
};

// ===== Project Card Hover Effect Enhancement =====
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach((card, index) => {
    // تحسين تأثير hover
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px)';
        this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        // إضافة تأثير للصورة
        const img = this.querySelector('.project-image img');
        if (img) {
            img.style.transform = 'scale(1.15)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        
        const img = this.querySelector('.project-image img');
        if (img) {
            img.style.transform = 'scale(1)';
        }
    });
    
    // تأثير عند الظهور
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// ===== Project Image Loading Optimization =====
const optimizeProjectImages = () => {
    const projectImages = document.querySelectorAll('.project-image img');
    
    projectImages.forEach(img => {
        // إضافة lazy loading
        if (img.loading === undefined) {
            img.setAttribute('loading', 'lazy');
        }
        
        // معالجة الأخطاء
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/800x600/4a90e2/ffffff?text=Project+Image';
            this.alt = 'صورة المشروع';
        });
        
        // تأثير fade-in عند التحميل
        img.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 100);
        });
    });
};

// ===== Skill Cards Animation =====
const skillCards = document.querySelectorAll('.skill-card');

const animateSkillCards = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    skillCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
};

// ===== Counter Animation for Experience Badge =====
const animateCounter = () => {
    const counterElement = document.querySelector('.experience-badge h3');
    if (!counterElement) return;
    
    const target = parseInt(counterElement.textContent);
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counterElement.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        counterElement.textContent = Math.floor(current) + '+';
                    }
                }, stepTime);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(counterElement);
};

// ===== Initialize animations on page load =====
window.addEventListener('load', function() {
    handleMissingImages();
    enhanceImageEffects();
    optimizeProjectImages();
    animateSkillCards();
    animateCounter();
    typingEffect();
});

// ===== Parallax Effect for Hero Section =====
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroSection.style.opacity = 1 - scrolled / 500;
    }
});

// ===== Add loading animation =====
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// ===== Smooth reveal animation for sections =====
const revealSections = () => {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => observer.observe(section));
};

revealSections();

// ===== Add ripple effect to buttons =====
const addRippleEffect = () => {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
};

addRippleEffect();

