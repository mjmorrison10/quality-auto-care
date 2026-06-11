/* ============================================
   QUALITY AUTO CARE — SCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    // --- Scroll Progress Bar ---
    const scrollProgress = document.getElementById('scrollProgress');
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (scrollProgress) scrollProgress.style.width = progress + '%';
    });

    // --- Navbar Scroll Effect ---
    const siteHeader = document.getElementById('siteHeader');
    window.addEventListener('scroll', function() {
        if (siteHeader) {
            if (window.scrollY > 50) {
                siteHeader.classList.add('scrolled');
            } else {
                siteHeader.classList.remove('scrolled');
            }
        }
    });

    // --- Mobile Menu Toggle ---
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mainNav = document.getElementById('mainNav');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            const isActive = hamburger.classList.toggle('active');

            if (mobileMenu) {
                mobileMenu.classList.toggle('active');
                mobileMenu.setAttribute('aria-hidden', !isActive);
            }

            if (mainNav) {
                mainNav.classList.toggle('open');
            }

            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close mobile menu on link click
        if (mobileMenu) {
            const mobileLinks = mobileMenu.querySelectorAll('a');
            mobileLinks.forEach(function(link) {
                link.addEventListener('click', function() {
                    hamburger.classList.remove('active');
                    mobileMenu.classList.remove('active');
                    mobileMenu.setAttribute('aria-hidden', 'true');
                    document.body.style.overflow = '';
                });
            });
        }

        // Close on nav link click
        if (mainNav) {
            const navLinks = mainNav.querySelectorAll('a');
            navLinks.forEach(function(link) {
                link.addEventListener('click', function() {
                    hamburger.classList.remove('active');
                    if (mobileMenu) {
                        mobileMenu.classList.remove('active');
                        mobileMenu.setAttribute('aria-hidden', 'true');
                    }
                    mainNav.classList.remove('open');
                    document.body.style.overflow = '';
                });
            });
        }
    }

    // --- Open/Closed Indicator ---
    const openIndicator = document.getElementById('openIndicator');

    function checkOpenStatus() {
        const now = new Date();
        const day = now.getDay(); // 0=Sun
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const time = hours + minutes / 60;

        let isOpen = false;

        if (day >= 1 && day <= 5) { // Mon-Fri
            if (time >= 8 && time < 17.5) { // 8:00 - 17:30
                isOpen = true;
            }
        } else if (day === 6) { // Saturday
            if (time >= 8 && time < 14) { // 8:00 - 14:00
                isOpen = true;
            }
        }

        if (openIndicator) {
            const dot = openIndicator.querySelector('.open-dot');
            const text = openIndicator.querySelector('.open-text');
            if (isOpen) {
                openIndicator.classList.remove('closed');
                if (dot) { dot.style.backgroundColor = '#22c55e'; dot.style.animation = 'pulse-dot 2s ease infinite'; }
                if (text) text.textContent = 'Open Now';
            } else {
                openIndicator.classList.add('closed');
                if (dot) { dot.style.backgroundColor = '#ef4444'; dot.style.animation = 'none'; }
                if (text) text.textContent = 'Closed';
            }
        }
    }

    checkOpenStatus();
    setInterval(checkOpenStatus, 60000);

    // --- Scroll Reveal Animations ---
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const animateObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                animateObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    animateElements.forEach(function(el) {
        animateObserver.observe(el);
    });

    // --- Mobile CTA Bar ---
    const mobileCtaBar = document.getElementById('mobileCtaBar');
    if (mobileCtaBar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 400) {
                mobileCtaBar.classList.add('visible');
            } else {
                mobileCtaBar.classList.remove('visible');
            }
        });
    }

    // --- Back to Top ---
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 600) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Form Validation ---
    const appointmentForm = document.getElementById('appointmentForm');
    const formSuccess = document.getElementById('formSuccess');

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Clear previous errors
            const errorFields = appointmentForm.querySelectorAll('.error');
            errorFields.forEach(function(f) { f.classList.remove('error'); });

            const errorMessages = appointmentForm.querySelectorAll('.field-error');
            errorMessages.forEach(function(f) { f.textContent = ''; });

            let isValid = true;

            // Validate full name
            const fullName = document.getElementById('fullName');
            if (fullName && fullName.value.trim().length < 2) {
                fullName.classList.add('error');
                const error = document.getElementById('fullName-error');
                if (error) error.textContent = 'Please enter your full name';
                isValid = false;
            }

            // Validate phone
            const phone = document.getElementById('phone');
            if (phone) {
                const phoneVal = phone.value.replace(/\D/g, '');
                if (phoneVal.length < 7) {
                    phone.classList.add('error');
                    const error = document.getElementById('phone-error');
                    if (error) error.textContent = 'Please enter a valid phone number';
                    isValid = false;
                }
            }

            // Validate email if provided
            const email = document.getElementById('email');
            if (email && email.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email.value.trim())) {
                    email.classList.add('error');
                    isValid = false;
                }
            }

            if (isValid) {
                appointmentForm.style.display = 'none';
                if (formSuccess) {
                    formSuccess.classList.add('show');
                }
            }
        });

        // Remove error on focus
        const inputs = appointmentForm.querySelectorAll('input, select, textarea');
        inputs.forEach(function(input) {
            input.addEventListener('focus', function() {
                this.classList.remove('error');
                // Clear error message
                const errorEl = document.getElementById(this.id + '-error');
                if (errorEl) errorEl.textContent = '';
            });
        });
    }

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerH = siteHeader ? siteHeader.offsetHeight : 0;
                const targetPos = target.getBoundingClientRect().top + window.scrollY - headerH - 20;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        });
    });

});
