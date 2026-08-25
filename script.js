/* ============================================================================
   PHOENIX HEALTH & WELLNESS CENTRE - JAVASCRIPT
   Bilingual, Interactive, Accessible
   ========================================================================== */

/* ============================================================================
   1. LANGUAGE SYSTEM
   ========================================================================== */

// Language translations (all content from HTML data attributes)
const translations = {
    en: {
        label: 'EN'
    },
    zh: {
        label: '中文'
    }
};

// Current language state
let currentLanguage = localStorage.getItem('phoenixLanguage') || 'en';

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    setLanguage(currentLanguage);
    initializeNavbar();
    initializeHamburgerMenu();
    updateLanguageToggleDisplay();
    initializeSecretEffects();
});

function initializeSecretEffects() {
    const secretButton = document.createElement('button');
    secretButton.type = 'button';
    secretButton.className = 'secret-effects-button';
    secretButton.setAttribute('aria-label', 'Toggle secret visual effects');
    secretButton.setAttribute('title', 'Secret visual effects');
    secretButton.textContent = '*';

    secretButton.addEventListener('click', function() {
        const isActive = document.body.classList.toggle('secret-mode');
        secretButton.classList.toggle('is-active', isActive);
        secretButton.setAttribute('aria-pressed', String(isActive));
    });

    document.body.appendChild(secretButton);
}

/**
 * Set language and update all content
 * @param {string} lang - Language code ('en' or 'zh')
 */
function setLanguage(lang) {
    if (lang !== 'en' && lang !== 'zh') return;

    const languageChanged = currentLanguage !== lang;
    currentLanguage = lang;
    localStorage.setItem('phoenixLanguage', lang);

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Update all elements with data-en and data-zh attributes
    document.querySelectorAll('[data-en][data-zh]:not(.lang-option)').forEach(element => {
        if (lang === 'en') {
            element.textContent = element.getAttribute('data-en');
        } else {
            element.textContent = element.getAttribute('data-zh');
        }
    });

    // Update page title
    const title = lang === 'en' 
        ? 'Phoenix Health & Wellness Centre | 香遇美学养生会所'
        : '香遇美学养生会所 | Phoenix Health & Wellness Centre';
    document.title = title;

    updateLanguageToggleDisplay();

    if (languageChanged) {
        document.body.classList.remove('language-changing');
        void document.body.offsetWidth;
        document.body.classList.add('language-changing');
        window.setTimeout(() => {
            document.body.classList.remove('language-changing');
        }, 1100);
    }
    
    // Emit event for other scripts
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
}

/**
 * Update language toggle button display
 */
function updateLanguageToggleDisplay() {
    const toggle = document.getElementById('languageToggle');
    if (!toggle) return;

    const langs = toggle.querySelectorAll('.lang-option');
    langs.forEach(option => {
        const isActive = option.dataset.lang === currentLanguage;
        option.classList.toggle('is-active', isActive);
        option.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
}

/**
 * Toggle language between EN and ZH
 */
function toggleLanguage() {
    const newLanguage = currentLanguage === 'en' ? 'zh' : 'en';
    setLanguage(newLanguage);
}

// Add language toggle click handler
document.addEventListener('DOMContentLoaded', function() {
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', toggleLanguage);
    }
});

/* ============================================================================
   2. NAVIGATION
   ========================================================================== */

/**
 * Initialize navbar scroll behavior
 */
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

/* ============================================================================
   3. HAMBURGER MENU
   ========================================================================== */

/**
 * Initialize hamburger menu functionality
 */
function initializeHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (!hamburger || !navMenu) return;

    const setMenuState = (isOpen) => {
        hamburger.classList.toggle('active', isOpen);
        navMenu.classList.toggle('active', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
        document.body.classList.toggle('menu-open', isOpen);
    };

    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function() {
        const isOpen = !hamburger.classList.contains('active');
        setMenuState(isOpen);
    });

    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            setMenuState(false);
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            setMenuState(false);
        }
    });

    // Close menu on window resize (desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            setMenuState(false);
        }
    });
}

/* ============================================================================
   4. SMOOTH SCROLLING ENHANCEMENT
   ========================================================================== */

/**
 * Add smooth scroll to all anchor links
 */
function smoothScrollToHash(hash) {
    if (!hash) return;

    const target = document.getElementById(hash) || document.querySelector(hash);
    if (!target) return;

    const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 88;
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                smoothScrollToHash(href.replace('#', ''));
            }
        });
    });

    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        window.setTimeout(() => smoothScrollToHash(hash), 120);
    }

    const sectionLinks = document.querySelectorAll('a[href*="#"]');
    sectionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || !href.includes('#')) return;

            const [page, hashPart] = href.split('#');
            if (!hashPart) return;

            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const isSamePage = !page || page === currentPage || page === '.';

            if (isSamePage) {
                e.preventDefault();
                smoothScrollToHash(hashPart);
            }
        });
    });
});

// Show a confirmation when the hosted form returns to this page.
document.addEventListener('DOMContentLoaded', function() {
    const bookingStatus = document.getElementById('booking-status');
    if (bookingStatus && new URLSearchParams(window.location.search).get('sent') === '1') {
        bookingStatus.textContent = currentLanguage === 'zh'
            ? '请求已发送。我们会尽快通过电子邮件与您联系。'
            : 'Request sent. We will contact you by email shortly.';
    }
});

// Submit booking requests through FormSubmit without leaving the booking page.
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('booking-form');
    const bookingStatus = document.getElementById('booking-status');

    if (!bookingForm || !bookingStatus) return;

    bookingForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        bookingStatus.textContent = currentLanguage === 'zh' ? '正在提交请求……' : 'Sending your request...';

        try {
            const response = await fetch(bookingForm.action, {
                method: 'POST',
                headers: { Accept: 'application/json' },
                body: new FormData(bookingForm)
            });

            if (!response.ok) throw new Error('Booking request failed');

            bookingForm.reset();
            bookingStatus.textContent = currentLanguage === 'zh'
                ? '请求已发送。我们会尽快通过电子邮件与您联系。'
                : 'Request sent. We will contact you by email shortly.';
        } catch (error) {
            bookingStatus.textContent = currentLanguage === 'zh'
                ? '提交失败。请直接发送电子邮件至 info.piac.healing@gmail.com。'
                : 'The request could not be sent. Please email info.piac.healing@gmail.com directly.';
        }
    });
});

/* ============================================================================
   5. INTERSECTION OBSERVER FOR ANIMATIONS
   ========================================================================== */

/**
 * Animate elements when they come into view
 */
document.addEventListener('DOMContentLoaded', function() {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
        return;
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class for animations to trigger
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
        '.service-card, .program-block, .principle, .student-feature, .about-text, .contact-info'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

/* ============================================================================
   6. LAZY LOADING IMAGES
   ========================================================================== */

/**
 * Initialize lazy loading for images
 */
document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

/* ============================================================================
   7. FORM ACCESSIBILITY
   ========================================================================== */

/**
 * Ensure all buttons are keyboard accessible
 */
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button:not([disabled])');
    
    buttons.forEach(btn => {
        // Ensure buttons can be focused
        if (!btn.hasAttribute('tabindex') && !btn.id) {
            btn.setAttribute('tabindex', '0');
        }

        // Allow Enter and Space to activate buttons
        btn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});

/* ============================================================================
   8. UTILITY FUNCTIONS
   ========================================================================== */

/**
 * Get current language
 */
function getCurrentLanguage() {
    return currentLanguage;
}

/**
 * Detect if user prefers reduced motion
 */
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get viewport width
 */
function getViewportWidth() {
    return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
}

/**
 * Check if device is mobile
 */
function isMobileDevice() {
    return getViewportWidth() <= 768;
}

/* ============================================================================
   9. PERFORMANCE MONITORING
   ========================================================================== */

/**
 * Log performance metrics (optional - for debugging)
 */
function logPerformanceMetrics() {
    if (!window.performance || !window.performance.timing) return;

    window.addEventListener('load', function() {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        const connectTime = timing.responseEnd - timing.requestStart;
        
        console.log(`Total Load Time: ${loadTime}ms`);
        console.log(`Server Response Time: ${connectTime}ms`);
    });
}

// Uncomment to enable performance logging
// logPerformanceMetrics();

/* ============================================================================
   10. CONTACT FORM PLACEHOLDER
   ========================================================================== */

/**
 * Handle contact CTA clicks
 * (Replace with actual form submission logic as needed)
 */
document.addEventListener('DOMContentLoaded', function() {
    const contactLinks = document.querySelectorAll('a[href="#contact"]');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Custom analytics or form modal could be triggered here
            console.log('Contact section accessed');
        });
    });
});

/* ============================================================================
   11. ARIA LIVE REGIONS FOR DYNAMIC CONTENT
   ========================================================================== */

/**
 * Announce language changes to screen readers
 */
window.addEventListener('languageChanged', function(e) {
    const lang = e.detail.language;
    const announcement = lang === 'en' 
        ? 'Language changed to English'
        : '语言已更改为中文';
    
    announceToScreenReader(announcement);
});

/**
 * Announce content changes to screen readers
 */
function announceToScreenReader(message) {
    const liveRegion = document.getElementById('live-region') || createLiveRegion();
    liveRegion.textContent = message;
}

/**
 * Create ARIA live region if it doesn't exist
 */
function createLiveRegion() {
    const region = document.createElement('div');
    region.id = 'live-region';
    region.setAttribute('aria-live', 'polite');
    region.setAttribute('aria-atomic', 'true');
    region.style.position = 'absolute';
    region.style.left = '-10000px';
    region.style.width = '1px';
    region.style.height = '1px';
    region.style.overflow = 'hidden';
    document.body.appendChild(region);
    return region;
}

/* ============================================================================
   12. INITIALIZATION COMPLETE
   ========================================================================== */

console.log('Phoenix Health & Wellness Centre website initialized');
console.log(`Current language: ${currentLanguage}`);
