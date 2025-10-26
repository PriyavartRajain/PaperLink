// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header background opacity on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (scrolled > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature, .step, .use-case, .faq-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// FAQ accordion functionality (if needed in the future)
document.querySelectorAll('.faq-item h4').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const answer = faqItem.querySelector('p');
        
        // Toggle active class for styling
        faqItem.classList.toggle('active');
        
        // Toggle answer visibility
        if (answer.style.display === 'none') {
            answer.style.display = 'block';
        } else {
            answer.style.display = 'none';
        }
    });
});

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-open');
}

// Add mobile menu button if screen is small
function checkMobileMenu() {
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelector('.nav-links');
    
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.mobile-menu-btn')) {
            const mobileBtn = document.createElement('button');
            mobileBtn.className = 'mobile-menu-btn';
            mobileBtn.innerHTML = '☰';
            mobileBtn.onclick = toggleMobileMenu;
            nav.appendChild(mobileBtn);
        }
    } else {
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        if (mobileBtn) {
            mobileBtn.remove();
        }
        navLinks.classList.remove('mobile-open');
    }
}

// Check on load and resize
window.addEventListener('load', checkMobileMenu);
window.addEventListener('resize', checkMobileMenu);

// Add some interactive hover effects
document.querySelectorAll('.feature').forEach(feature => {
    feature.addEventListener('mouseenter', () => {
        feature.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    feature.addEventListener('mouseleave', () => {
        feature.style.transform = 'translateY(0) scale(1)';
    });
});

// Demo animation for the hero section
function animateDemo() {
    const demoCode = document.querySelector('.demo-code');
    const codes = ['394728', '582941', '167834', '923456'];
    let currentIndex = 0;
    
    setInterval(() => {
        demoCode.style.opacity = '0';
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % codes.length;
            demoCode.textContent = codes[currentIndex];
            demoCode.style.opacity = '1';
        }, 300);
    }, 3000);
}

// Start demo animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(animateDemo, 2000);
});

// Add copy to clipboard functionality for demo codes
document.querySelector('.demo-code')?.addEventListener('click', () => {
    const code = document.querySelector('.demo-code').textContent;
    navigator.clipboard.writeText(code).then(() => {
        // Show a brief feedback
        const originalText = document.querySelector('.demo-title').textContent;
        document.querySelector('.demo-title').textContent = 'Code copied!';
        setTimeout(() => {
            document.querySelector('.demo-title').textContent = originalText;
        }, 1500);
    });
});

// Add loading animation for App Store badge
document.querySelector('.app-store-badge')?.addEventListener('click', (e) => {
    const badge = e.target;
    badge.style.opacity = '0.7';
    setTimeout(() => {
        badge.style.opacity = '1';
    }, 200);
});
