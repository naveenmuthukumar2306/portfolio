document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP Plugin
    gsap.registerPlugin(ScrollTrigger);

    initThemeToggle(); // Initialize theme immediately
    initLoader();
});

function initThemeToggle() {
    const themeToggleBtn = document.getElementById("theme-toggle");
    if (!themeToggleBtn) return;

    // Check for saved user preference in localStorage
    const currentTheme = localStorage.getItem("theme");

    // Check user preference or system preference
    if (currentTheme === "light") {
        document.body.classList.add("light-theme");
    } else if (currentTheme === "dark") {
        document.body.classList.remove("light-theme");
    } else {
        // Fallback to system preference if no localStorage
        const prefersLightScheme = window.matchMedia("(prefers-color-scheme: light)");
        if (prefersLightScheme.matches) {
            document.body.classList.add("light-theme");
        }
    }

    // Toggle theme on button click
    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");

        // Save preference in localStorage
        const theme = document.body.classList.contains("light-theme") ? "light" : "dark";
        localStorage.setItem("theme", theme);
    });
}

function initLoader() {
    const tl = gsap.timeline();

    tl.to(".loader-bar", {
        width: "100%",
        duration: 1.5,
        ease: "power2.inOut"
    })
        .to(".loader-text", {
            opacity: 0,
            y: -20,
            duration: 0.5
        })
        .to(".loader", {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut" // Smoother exit
        })
        .from(".hero-title .line", {
            y: 100,
            opacity: 0,
            duration: 1.2, // Slightly longer
            stagger: 0.15, // Tighter stagger
            ease: "power4.out"
        }, "-=0.2") // Start slightly before loader finishes leaving
        .from(".hero-subtitle", {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=0.8")
        .from(".hero-cta", {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=0.8")
        .from(".nav", {
            y: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=1")
        .add(() => {
            initMobileMenu();
            initScrollAnimations();
            initHeroParallax();
            initMagneticButtons();
            initProjectTilt();
            initScrollSpy();
            initAboutAnimations();
            initContactForm();
            initNavScroll();
        });
}

function initScrollSpy() {
    const sections = document.querySelectorAll("section, header");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });
}


function initHeroParallax() {
    const hero = document.querySelector(".hero");
    const bg = document.querySelector(".hero-bg");

    hero.addEventListener("mousemove", (e) => {
        const xPos = (e.clientX / window.innerWidth - 0.5) * 20;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 20;

        gsap.to(bg, {
            x: xPos,
            y: yPos,
            duration: 1,
            ease: "power2.out"
        });
    });
}

function initMagneticButtons() {
    const buttons = document.querySelectorAll(".btn");

    buttons.forEach(btn => {
        btn.addEventListener("mousemove", (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: "power2.out"
            });

            // Also move the span text slightly more for depth
            gsap.to(btn.querySelector("span"), {
                x: x * 0.1,
                y: y * 0.1,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        btn.addEventListener("mouseleave", () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.8,
                ease: "elastic.out(1, 0.3)"
            });
            gsap.to(btn.querySelector("span"), {
                x: 0,
                y: 0,
                duration: 0.8,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });
}

function initAboutAnimations() {
    const wrapper = document.querySelector(".about-image-wrapper");
    const image = document.querySelector(".about-image");

    if (!wrapper || !image) return;

    // Gentle Parallax (Background Position)
    // We'll move the background slightly as we scroll past
    gsap.fromTo(image,
        { backgroundPosition: "50% 0%" },
        {
            backgroundPosition: "50% 20%",
            ease: "none",
            scrollTrigger: {
                trigger: wrapper,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        }
    );

    // Hover Effect
    wrapper.addEventListener("mouseenter", () => {
        gsap.to(image, {
            scale: 1.05,
            filter: "grayscale(0%)",
            duration: 0.5,
            ease: "power2.out"
        });
    });

    wrapper.addEventListener("mouseleave", () => {
        gsap.to(image, {
            scale: 1,
            filter: "grayscale(20%)",
            duration: 0.5,
            ease: "power2.out"
        });
    });
}

function initScrollAnimations() {
    const sections = document.querySelectorAll(".section");
    let mm = gsap.matchMedia();

    mm.add({
        isDesktop: "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
        isMobile: "(max-width: 900px) and (prefers-reduced-motion: no-preference)",
        reduceMotion: "(prefers-reduced-motion: reduce)"
    }, (context) => {
        let { isDesktop, reduceMotion } = context.conditions;
        if (reduceMotion) return;

        sections.forEach(section => {
            const headerElems = section.querySelectorAll(".section-header");
            const contentElems = section.querySelectorAll(".about-content p, .about-image-wrapper, .contact-wrapper > *");
            const gridElems = section.querySelectorAll(".skill-category, .timeline-item");

            const headerVars = isDesktop 
                ? { y: 50, z: -50, rotateX: -20, opacity: 0, duration: 1, transformOrigin: "top center", ease: "power3.out" }
                : { y: 30, opacity: 0, duration: 0.8, ease: "power2.out" };

            if (headerElems.length > 0) {
                gsap.from(headerElems, {
                    scrollTrigger: { trigger: section, start: "top 85%", toggleActions: "play none none reverse" },
                    ...headerVars
                });
            }

            const contentVars = isDesktop
                ? { y: 40, z: -30, rotateX: -15, opacity: 0, duration: 1.2, stagger: 0.2, transformOrigin: "top center", ease: "power3.out" }
                : { y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" };

            if (contentElems.length > 0) {
                gsap.from(contentElems, {
                    scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none reverse" },
                    ...contentVars
                });
            }

            const gridVars = isDesktop
                ? { y: 60, z: -40, rotateX: -15, opacity: 0, scale: 0.9, duration: 1.2, stagger: 0.15, transformOrigin: "top center", ease: "back.out(1.2)" }
                : { y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" };

            if (gridElems.length > 0) {
                gsap.from(gridElems, {
                    scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none reverse" },
                    ...gridVars
                });
            }
        });

        if (isDesktop) {
            gsap.to(".hero-bg", {
                scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 },
                yPercent: 30, scale: 1.1, opacity: 0
            });

            gsap.to(".hero-container", {
                scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 },
                y: 100, z: -100, rotateX: 5, opacity: 0, scale: 0.95
            });
        }
    });

    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => { gsap.to(input, { borderBottomColor: "var(--accent-color)", duration: 0.3 }); });
        input.addEventListener('blur', () => { if(input.value === '') gsap.to(input, { borderBottomColor: "var(--border-color)", duration: 0.3 }); });
    });
}

function initProjectTilt() {
    const projectCards = document.querySelectorAll(".project-card");
    let mm = gsap.matchMedia();

    mm.add({
        isDesktop: "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
        isMobile: "(max-width: 900px) and (prefers-reduced-motion: no-preference)",
        reduceMotion: "(prefers-reduced-motion: reduce)"
    }, (context) => {
        let { isDesktop, reduceMotion } = context.conditions;
        if (reduceMotion) return;

        projectCards.forEach(card => {
            if (isDesktop) gsap.set(card, { perspective: 1000 });
            
            const imageWrap = card.querySelector(".project-image-wrap");
            const info = card.querySelector(".project-info");
            
            gsap.from(card, {
                scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" },
                y: 50, opacity: 0, duration: 1, ease: "power3.out"
            });

            if (isDesktop) {
                gsap.fromTo(imageWrap, 
                    { rotateX: 10, rotateY: -5, z: -50, scale: 0.95 },
                    { rotateX: -5, rotateY: 5, z: 0, scale: 1.02, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 1 } }
                );

                gsap.fromTo(info,
                    { y: 30, z: -20, rotateX: 3 },
                    { y: -30, z: 20, rotateX: -3, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 1.5 } }
                );
            }
        });
    });
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submit-btn');
    const statusDiv = document.getElementById('form-status');

    if (!form) return;

    const setError = (element, message) => {
        const inputGroup = element.parentElement;
        const errorDisplay = inputGroup.querySelector('.error-message');

        inputGroup.classList.add('error');
        errorDisplay.textContent = message;
    };

    const clearError = (element) => {
        const inputGroup = element.parentElement;
        const errorDisplay = inputGroup.querySelector('.error-message');

        inputGroup.classList.remove('error');
        errorDisplay.textContent = '';
    };

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const validateInputs = () => {
        const nameValue = nameInput.value.trim();
        const emailValue = emailInput.value.trim();
        const messageValue = messageInput.value.trim();
        let isValid = true;

        if (nameValue === '') {
            setError(nameInput, 'Name is required');
            isValid = false;
        } else {
            clearError(nameInput);
        }

        if (emailValue === '') {
            setError(emailInput, 'Email is required');
            isValid = false;
        } else if (!validateEmail(emailValue)) {
            setError(emailInput, 'Please provide a valid email address');
            isValid = false;
        } else {
            clearError(emailInput);
        }

        if (messageValue === '') {
            setError(messageInput, 'Message is required');
            isValid = false;
        } else if (messageValue.length < 10) {
            setError(messageInput, 'Message must be at least 10 characters.');
            isValid = false;
        } else {
            clearError(messageInput);
        }

        return isValid;
    };

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (validateInputs()) {
            const originalBtnText = submitBtn.querySelector('span').textContent;

            // Set loading state
            submitBtn.disabled = true;
            submitBtn.querySelector('span').textContent = 'Sending...';
            statusDiv.className = 'form-status';
            statusDiv.style.display = 'none';

            // Prepare template parameters
            // These names must match the variables in your EmailJS template
            const templateParams = {
                from_name: nameInput.value,
                reply_to: emailInput.value,
                message: messageInput.value,
                to_name: 'Naveen Muthukumar' // Or whatever variable you use for your name
            };

            // Send email using EmailJS
            // REPLACE 'YOUR_SERVICE_ID' AND 'YOUR_TEMPLATE_ID' WITH YOUR ACTUAL IDS
            emailjs.send('service_sp2u1h4', 'template_dzqfct9', templateParams)
                .then(function () {
                    // Success
                    statusDiv.textContent = 'Message sent successfully! I will get back to you soon.';
                    statusDiv.classList.add('success');
                    statusDiv.style.display = 'block';
                    form.reset();
                }, function (error) {
                    // Error
                    console.error('FAILED...', error);
                    statusDiv.textContent = 'Failed to send message. Please try again later or email me directly.';
                    statusDiv.classList.add('error');
                    statusDiv.style.display = 'block';
                })
                .finally(() => {
                    // Reset button
                    submitBtn.disabled = false;
                    submitBtn.querySelector('span').textContent = originalBtnText;
                });
        }
    });

    // Real-time validation (optional - removes errors as user types)
    const inputs = [nameInput, emailInput, messageInput];
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.parentElement.classList.contains('error')) {
                validateInputs();
            }
        });
    });
}

function initMobileMenu() {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const links = document.querySelectorAll(".nav-link");

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        menuToggle.classList.toggle("active");
        document.body.classList.toggle("no-scroll");
    });

    links.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");
            document.body.classList.remove("no-scroll");
        });
    });
}

function initNavScroll() {
    const nav = document.querySelector(".nav");
    if (!nav) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    });
}
