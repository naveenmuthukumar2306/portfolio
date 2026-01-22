document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP Plugin
    gsap.registerPlugin(ScrollTrigger);

    initLoader();
});

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
            ease: "power3.inOut"
        })
        .from(".hero-title .line", {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power4.out"
        }, "-=0.5")
        .from(".hero-subtitle", {
            y: 20,
            opacity: 0,
            duration: 0.8
        }, "-=0.5")
        .from(".hero-cta", {
            y: 20,
            opacity: 0,
            duration: 0.8
        }, "-=0.6")
        .add(() => {
            initScrollAnimations();
            initHeroParallax();
            initMagneticButtons();
            initMagneticButtons();
            initProjectTilt();
            initScrollSpy();
            initAboutAnimations();
            initContactForm();
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
    // Reveal Sections
    const sections = document.querySelectorAll(".section");

    sections.forEach(section => {
        const elems = section.querySelectorAll(".section-header, .about-content p, .about-image-wrapper, .skills-grid, .project-card, .timeline-item, .contact-wrapper");

        // Skip if no elements found
        if (elems.length === 0) return;

        gsap.from(elems, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out"
        });
    });


    // Parallax Effects (Subtle)
    gsap.to(".hero-bg", {
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        },
        yPercent: 50,
        opacity: 0
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
