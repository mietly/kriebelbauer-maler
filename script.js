/* ============================================
   KRIBELBAUER MALER - SCRIPTS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Navigation Scroll Effect ----
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function handleNavScroll() {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link highlight
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    // ---- Mobile Menu Toggle ----
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ---- Hero Slideshow ----
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    if (slides.length > 1) {
        setInterval(nextSlide, 6000);
    }

    // ---- Scroll Animations (Intersection Observer) ----
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));

    // ---- Counter Animation ----
    const counters = document.querySelectorAll('[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count);
                const duration = 2000;
                const start = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - start;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(eased * target);
                    counter.textContent = current;
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                }

                requestAnimationFrame(updateCounter);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ---- Smooth Scroll for Anchor Links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ---- Impressum Modal ----
    const impressumLink = document.getElementById('impressum-link');
    const modal = document.getElementById('impressum-modal');
    const modalClose = document.getElementById('modal-close');

    if (impressumLink && modal) {
        impressumLink.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ---- Contact Form ----
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const firstname = document.getElementById('firstname').value;
            const lastname = document.getElementById('lastname').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            const mailtoLink = `mailto:kribelbauer@t-online.de?subject=Angebotsanfrage von ${firstname} ${lastname}&body=${encodeURIComponent(
                `Name: ${firstname} ${lastname}\nE-Mail: ${email}\nTelefon: ${phone}\n\nNachricht:\n${message}`
            )}`;
            window.location.href = mailtoLink;
        });
    }

    // ---- Parallax on scroll ----
    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const rect = parallaxBg.parentElement.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const offset = (rect.top / window.innerHeight) * 40;
                parallaxBg.style.transform = `translateY(${offset}px)`;
            }
        }, { passive: true });
    }

});
