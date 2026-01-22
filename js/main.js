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
