// Mobile menu toggle
let menu = document.querySelector('#menu');
let navLinks = document.querySelector('.nav-links');

if (menu && navLinks) {
    menu.onclick = () => {
        menu.classList.toggle('fa-times');
        navLinks.classList.toggle('active');
    }

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.onclick = () => {
            menu.classList.remove('fa-times');
            navLinks.classList.remove('active');
        }
    });
}

// Navbar background on scroll
window.onscroll = () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    }
    
    // Close mobile menu on scroll
    if (menu && navLinks) {
        menu.classList.remove('fa-times');
        navLinks.classList.remove('active');
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Reveal page sections as they enter the viewport
const revealElements = document.querySelectorAll(
    '.stats .stat-box, .section-title, .feature-box, .game-box, .step, .team-box, .cta'
);

if ('IntersectionObserver' in window && revealElements.length) {
    document.documentElement.classList.add('js-motion');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(element => {
        element.classList.add('reveal');
        revealObserver.observe(element);
    });
}
