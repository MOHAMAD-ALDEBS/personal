/* ============================================
   PREMIUM PORTFOLIO WEBSITE - INTERACTIONS
   ============================================ */

// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.textContent = '☀️';
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    const isLightMode = document.body.classList.toggle('light-mode');
    const newTheme = isLightMode ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = isLightMode ? '☀️' : '🌙';
});

// ============================================
// SMOOTH SCROLLING & ACTIVE NAV HIGHLIGHTING
// ============================================

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll on nav link click
navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================
// STAGGER ANIMATION ON SCROLL
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add stagger delay
            entry.target.style.animationDelay = `${index * 0.1}s`;
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// Observe project items and timeline items
document.querySelectorAll('.project-item, .timeline-item').forEach((el) => {
    observer.observe(el);
});

// ============================================
// HOVER INTERACTIONS
// ============================================

// Project cards hover effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card) => {
    card.addEventListener('mouseenter', function () {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

const revealElements = document.querySelectorAll(
    '.hero-text, .about-content, .projects-grid, .projects-list, .timeline, .collaboration, .contact-content'
);

const revealOnScroll = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                revealOnScroll.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1 }
);

revealElements.forEach((element) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    revealOnScroll.observe(element);
});

// ============================================
// PARALLAX EFFECT (SUBTLE)
// ============================================

const heroDecoration = document.querySelector('.hero-decoration');
if (heroDecoration) {
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 10 - 5;
        const y = (e.clientY / window.innerHeight) * 10 - 5;
        heroDecoration.style.transform = `translate(${x}px, ${y}px)`;
        heroDecoration.style.transition = 'transform 0.5s ease';
    });
}

// ============================================
// ENHANCED KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', (e) => {
    // Skip to main content
    if (e.key === 's' && e.ctrlKey) {
        e.preventDefault();
        document.getElementById('work').scrollIntoView({ behavior: 'smooth' });
    }
    // Home
    if (e.key === 'h' && e.ctrlKey) {
        e.preventDefault();
        document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
    }
});

// ============================================
// LOADING STATE & PAGE TRANSITIONS
// ============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.6s ease';
});

// ============================================
// SUBTLE FOCUS STATES FOR ACCESSIBILITY
// ============================================

document.addEventListener('focusin', (e) => {
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
        e.target.style.outline = '2px solid var(--card-mint)';
        e.target.style.outlineOffset = '2px';
    }
});

document.addEventListener('focusout', (e) => {
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
        e.target.style.outline = 'none';
    }
});

// ============================================
// CONTACT FORM HANDLING (IF NEEDED)
// ============================================

// You can add form handling here when integrating a backend

// ============================================
// PERFORMANCE: Lazy Loading Images
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach((img) => {
        imageObserver.observe(img);
    });
}

// ============================================
// NAVBAR HIDE/SHOW ON SCROLL
// ============================================

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Only hide navbar if scrolling down significantly
    if (scrollTop > 100) {
        if (scrollTop > lastScrollTop) {
            // Scrolling DOWN
            navbar.style.opacity = '0.5';
            navbar.style.pointerEvents = 'none';
        } else {
            // Scrolling UP
            navbar.style.opacity = '1';
            navbar.style.pointerEvents = 'auto';
        }
    } else {
        navbar.style.opacity = '1';
        navbar.style.pointerEvents = 'auto';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ============================================
// SCROLL PROGRESS INDICATOR (OPTIONAL)
// ============================================

window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolledHeight = window.scrollY;
    const scrollProgress = (scrolledHeight / totalHeight) * 100;
    // Can be used to update a progress bar if added to HTML
});

// ============================================
// ENHANCED LINK INTERACTIONS
// ============================================

const allLinks = document.querySelectorAll('a:not(.nav-link)');
allLinks.forEach((link) => {
    link.addEventListener('mouseenter', function () {
        if (!this.classList.contains('project-link')) {
            this.style.letterSpacing = '0.5px';
        }
    });

    link.addEventListener('mouseleave', function () {
        this.style.letterSpacing = '0.3px';
    });
});

// ============================================
// PAGE VISIBILITY - PAUSE ANIMATIONS WHEN TAB NOT FOCUSED
// ============================================

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.body.style.animationPlayState = 'paused';
    } else {
        document.body.style.animationPlayState = 'running';
    }
});

// ============================================
// MOBILE MENU GESTURE SUPPORT (FUTURE ENHANCEMENT)
// ============================================

// Touch swipe detection for future mobile menu
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchStartX - touchEndX > swipeThreshold) {
        // Swiped left
    } else if (touchEndX - touchStartX > swipeThreshold) {
        // Swiped right
    }
}

// ============================================
// INIT FUNCTION
// ============================================

function initPortfolio() {
    console.log('Portfolio initialized');
    // Add any additional initialization logic here
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
    initPortfolio();
}

// ============================================
// EXPORT FOR POTENTIAL MODULE USAGE
// ============================================

// window.Portfolio = {
//     toggleTheme: () => themeToggle.click(),
//     scrollToSection: (id) => {
//         const element = document.getElementById(id);
//         if (element) element.scrollIntoView({ behavior: 'smooth' });
//     },
// };
