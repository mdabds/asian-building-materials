/*==========================================================
    ASIAN BUILDING MATERIALS
    Production JavaScript
    app.js
    Part 1 - Core UI & Navigation
==========================================================*/

"use strict";

/*==========================================================
    DOM READY
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    ABM.init();

});

/*==========================================================
    MAIN APP
==========================================================*/

const ABM = {

    init() {

        this.cache();

        this.preloader();

        this.stickyHeader();

        this.mobileMenu();

        this.smoothScroll();

        this.activeNavigation();

        this.scrollTop();

        this.currentYear();

    },

    /*======================================================
        CACHE ELEMENTS
    ======================================================*/

    cache() {

        this.header = document.getElementById("header");

        this.mobileMenuBtn = document.querySelector(".mobile-menu");

        this.mobileNav = document.querySelector(".mobile-navigation");

        this.mobileOverlay = document.querySelector(".mobile-overlay");

        this.closeMobile = document.querySelector(".close-mobile-menu");

        this.scrollBtn = document.getElementById("scrollTopBtn");

        this.navLinks = document.querySelectorAll("a[href^='#']");

    },

    /*======================================================
        PRELOADER
    ======================================================*/

    preloader() {

        const loader = document.querySelector(".preloader");

        if (!loader) return;

        window.addEventListener("load", () => {

            loader.classList.add("loaded");

            setTimeout(() => {

                loader.remove();

            }, 600);

        });

    },

    /*======================================================
        STICKY HEADER
    ======================================================*/

    stickyHeader() {

        if (!this.header) return;

        const updateHeader = () => {

            if (window.scrollY > 60) {

                this.header.classList.add("scrolled");

            } else {

                this.header.classList.remove("scrolled");

            }

        };

        updateHeader();

        window.addEventListener("scroll", updateHeader, {

            passive: true

        });

    },

    /*======================================================
        MOBILE MENU
    ======================================================*/

    mobileMenu() {

        if (!this.mobileMenuBtn || !this.mobileNav) return;

        const openMenu = () => {

            this.mobileNav.classList.add("active");

            this.mobileOverlay?.classList.add("active");

            document.body.style.overflow = "hidden";

        };

        const closeMenu = () => {

            this.mobileNav.classList.remove("active");

            this.mobileOverlay?.classList.remove("active");

            document.body.style.overflow = "";

        };

        this.mobileMenuBtn.addEventListener("click", openMenu);

        this.closeMobile?.addEventListener("click", closeMenu);

        this.mobileOverlay?.addEventListener("click", closeMenu);

        document.querySelectorAll(".mobile-navigation a").forEach(link => {

            link.addEventListener("click", closeMenu);

        });

    },

    /*======================================================
        SMOOTH SCROLL
    ======================================================*/

    smoothScroll() {

        this.navLinks.forEach(link => {

            link.addEventListener("click", e => {

                const targetId = link.getAttribute("href");

                if (!targetId.startsWith("#")) return;

                const target = document.querySelector(targetId);

                if (!target) return;

                e.preventDefault();

                window.scrollTo({

                    top: target.offsetTop - 80,

                    behavior: "smooth"

                });

            });

        });

    },

    /*======================================================
        ACTIVE NAVIGATION
    ======================================================*/

    activeNavigation() {

        const sections = document.querySelectorAll("section[id]");

        if (!sections.length) return;

        const updateActive = () => {

            let current = "";

            sections.forEach(section => {

                const top = section.offsetTop - 120;

                const height = section.offsetHeight;

                if (pageYOffset >= top &&
                    pageYOffset < top + height) {

                    current = section.id;

                }

            });

            document.querySelectorAll(".nav-links a").forEach(link => {

                link.classList.remove("active");

                if (link.getAttribute("href") === `#${current}`) {

                    link.classList.add("active");

                }

            });

        };

        updateActive();

        window.addEventListener("scroll", updateActive, {

            passive: true

        });

    },

    /*======================================================
        SCROLL TO TOP
    ======================================================*/

    scrollTop() {

        if (!this.scrollBtn) return;

        const toggle = () => {

            if (window.scrollY > 450) {

                this.scrollBtn.classList.add("show");

            } else {

                this.scrollBtn.classList.remove("show");

            }

        };

        toggle();

        window.addEventListener("scroll", toggle, {

            passive: true

        });

        this.scrollBtn.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    },

    /*======================================================
        FOOTER YEAR
    ======================================================*/

    currentYear() {

        const year = document.getElementById("currentYear");

        if (year) {

            year.textContent = new Date().getFullYear();

        }

    }

};

/*==========================================================
    Production JavaScript
    app.js
    Part 2 - Animations, FAQ, Counters & Utilities
==========================================================*/

Object.assign(ABM, {

    /*======================================================
        INITIALIZE PART 2
    ======================================================*/

    initEnhancements() {

        this.counterAnimation();

        this.faqAccordion();

        this.scrollReveal();

        this.lazyImages();

        this.heroParallax();

        this.quickContact();

        this.performance();

    },

    /*======================================================
        COUNTER ANIMATION
    ======================================================*/

    counterAnimation() {

        const counters = document.querySelectorAll("[data-counter]");

        if (!counters.length) return;

        const animateCounter = (counter) => {

            const target = Number(counter.dataset.counter);

            const duration = 2000;

            const increment = target / (duration / 16);

            let current = 0;

            const update = () => {

                current += increment;

                if (current >= target) {

                    counter.textContent = target.toLocaleString();

                    return;

                }

                counter.textContent = Math.floor(current).toLocaleString();

                requestAnimationFrame(update);

            };

            update();

        };

        const observer = new IntersectionObserver((entries, obs) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                animateCounter(entry.target);

                obs.unobserve(entry.target);

            });

        }, {

            threshold: .5

        });

        counters.forEach(counter => observer.observe(counter));

    },

    /*======================================================
        FAQ ACCORDION
    ======================================================*/

    faqAccordion() {

        const items = document.querySelectorAll(".faq-item");

        if (!items.length) return;

        items.forEach(item => {

            const button = item.querySelector(".faq-question");

            button?.addEventListener("click", () => {

                const active = item.classList.contains("active");

                items.forEach(i => i.classList.remove("active"));

                if (!active) {

                    item.classList.add("active");

                }

            });

        });

    },

    /*======================================================
        SCROLL REVEAL
    ======================================================*/

    scrollReveal() {

        const elements = document.querySelectorAll(
            ".card, .category-card, .product-card, .service-card, .brand-card, .testimonial-card, .feature-item"
        );

        if (!elements.length) return;

        const observer = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("revealed");

                observer.unobserve(entry.target);

            });

        }, {

            threshold: .15

        });

        elements.forEach(el => {

            el.style.opacity = "0";

            el.style.transform = "translateY(50px)";

            el.style.transition = ".7s ease";

            observer.observe(el);

        });

        const style = document.createElement("style");

        style.textContent = `
            .revealed{
                opacity:1 !important;
                transform:translateY(0)!important;
            }
        `;

        document.head.appendChild(style);

    },

    /*======================================================
        LAZY IMAGES
    ======================================================*/

    lazyImages() {

        const images = document.querySelectorAll("img[data-src]");

        if (!images.length) return;

        const observer = new IntersectionObserver((entries, obs) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const img = entry.target;

                img.src = img.dataset.src;

                img.removeAttribute("data-src");

                img.onload = () => img.classList.add("loaded");

                obs.unobserve(img);

            });

        });

        images.forEach(image => observer.observe(image));

    },

    /*======================================================
        HERO PARALLAX
    ======================================================*/

    heroParallax() {

        const heroImage = document.querySelector(".hero-background img");

        if (!heroImage) return;

        window.addEventListener("scroll", () => {

            const offset = window.pageYOffset;

            heroImage.style.transform =
                `translateY(${offset * .25}px) scale(1.1)`;

        }, {

            passive: true

        });

    },

    /*======================================================
        QUICK CONTACT POPUP
    ======================================================*/

    quickContact() {

        const modal = document.querySelector(".quick-contact");

        if (!modal) return;

        const openButtons = document.querySelectorAll("[data-contact-open]");

        const closeButtons = document.querySelectorAll("[data-contact-close]");

        const open = () => {

            modal.classList.add("active");

            document.body.style.overflow = "hidden";

        };

        const close = () => {

            modal.classList.remove("active");

            document.body.style.overflow = "";

        };

        openButtons.forEach(btn => btn.addEventListener("click", open));

        closeButtons.forEach(btn => btn.addEventListener("click", close));

        modal.addEventListener("click", e => {

            if (e.target === modal) {

                close();

            }

        });

        document.addEventListener("keydown", e => {

            if (e.key === "Escape") {

                close();

            }

        });

    },

    /*======================================================
        PERFORMANCE HELPERS
    ======================================================*/

    performance() {

        const debounce = (fn, delay = 150) => {

            let timer;

            return (...args) => {

                clearTimeout(timer);

                timer = setTimeout(() => fn(...args), delay);

            };

        };

        const throttle = (fn, wait = 100) => {

            let waiting = false;

            return (...args) => {

                if (waiting) return;

                waiting = true;

                requestAnimationFrame(() => {

                    fn(...args);

                    waiting = false;

                });

            };

        };

        window.addEventListener(

            "resize",

            debounce(() => {

                console.log("Layout recalculated");

            })

        );

        window.addEventListener(

            "scroll",

            throttle(() => {

                document.documentElement.style.setProperty(

                    "--scroll-y",

                    `${window.scrollY}px`

                );

            }),

            { passive: true }

        );

    }

});

/*==========================================================
    INITIALIZE ENHANCEMENTS
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    ABM.initEnhancements();

});