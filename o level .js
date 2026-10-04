/* =========================================================
   CM COMPUTER CENTRE
   O LEVEL COURSE PAGE JAVASCRIPT
   PRO VERSION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. MOBILE MENU
       ===================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.querySelector(".course-nav");

    if (menuBtn && navMenu) {

        /* Initial state */
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open Menu");

        menuBtn.addEventListener("click", (event) => {

            event.preventDefault();
            event.stopPropagation();

            navMenu.classList.toggle("show");

            const isOpen = navMenu.classList.contains("show");

            menuBtn.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuBtn.setAttribute(
                "aria-label",
                isOpen ? "Close Menu" : "Open Menu"
            );

            /* Button icon */
            menuBtn.innerHTML = isOpen ? "✕" : "☰";
        });


        /* -----------------------------------------------
           MENU LINK CLICK
        ------------------------------------------------ */

        navMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("show");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuBtn.setAttribute(
                    "aria-label",
                    "Open Menu"
                );

                menuBtn.innerHTML = "☰";
            });

        });


        /* -----------------------------------------------
           OUTSIDE CLICK
        ------------------------------------------------ */

        document.addEventListener("click", (event) => {

            if (
                !navMenu.contains(event.target) &&
                !menuBtn.contains(event.target)
            ) {

                navMenu.classList.remove("show");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuBtn.setAttribute(
                    "aria-label",
                    "Open Menu"
                );

                menuBtn.innerHTML = "☰";
            }

        });


        /* -----------------------------------------------
           ESC KEY
        ------------------------------------------------ */

        document.addEventListener("keydown", (event) => {

            if (event.key === "Escape") {

                navMenu.classList.remove("show");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuBtn.setAttribute(
                    "aria-label",
                    "Open Menu"
                );

                menuBtn.innerHTML = "☰";
            }

        });

    }


    /* =====================================================
       2. ACTIVE NAV LINK
       ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    document
        .querySelectorAll(".course-nav a")
        .forEach(link => {

            const href = link.getAttribute("href");

            if (!href) return;


            /* Hash links जैसे #about को अलग रखें */

            if (href.startsWith("#")) {
                return;
            }


            const linkPage =
                href
                    .split("/")
                    .pop()
                    .split("#")[0]
                    .toLowerCase();


            if (
                linkPage &&
                linkPage === currentPage
            ) {

                link.classList.add("active");

            }

        });


    /* =====================================================
       3. SCROLL HEADER EFFECT
       ===================================================== */

    const header =
        document.querySelector(".course-header");


    if (header) {

        const checkHeader = () => {

            if (window.scrollY > 40) {

                header.classList.add("scrolled");

            } else {

                header.classList.remove("scrolled");

            }

        };


        window.addEventListener(
            "scroll",
            checkHeader,
            { passive: true }
        );


        checkHeader();

    }


    /* =====================================================
       4. SCROLL REVEAL
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".info-card, " +
            ".about-card, " +
            ".learning-card, " +
            ".subject-card, " +
            ".career-card, " +
            ".test-card, " +
            ".cta-section"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(element => {

            element.classList.add(
                "reveal"
            );

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add(
                "show"
            );

        });

    }


    /* =====================================================
       5. BUTTON RIPPLE EFFECT
       ===================================================== */

    document
        .querySelectorAll(
            ".btn, " +
            ".apply-btn, " +
            ".hero-btn, " +
            ".test-btn, " +
            ".primary-btn, " +
            ".secondary-btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                function (event) {

                    const rect =
                        this.getBoundingClientRect();


                    const ripple =
                        document.createElement(
                            "span"
                        );


                    ripple.className =
                        "js-ripple";


                    ripple.style.left =
                        `${event.clientX - rect.left}px`;


                    ripple.style.top =
                        `${event.clientY - rect.top}px`;


                    this.appendChild(ripple);


                    setTimeout(() => {

                        ripple.remove();

                    }, 650);

                }
            );

        });


    /* =====================================================
       6. CARD MOUSE GLOW
       ===================================================== */

    document
        .querySelectorAll(
            ".info-card, " +
            ".about-card, " +
            ".learning-card, " +
            ".subject-card, " +
            ".career-card, " +
            ".test-card"
        )
        .forEach(card => {


            card.addEventListener(
                "mousemove",
                event => {

                    if (
                        window.innerWidth < 800
                    ) {
                        return;
                    }


                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    card.style.setProperty(
                        "--mouse-x",
                        `${x}px`
                    );


                    card.style.setProperty(
                        "--mouse-y",
                        `${y}px`
                    );

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.removeProperty(
                        "--mouse-x"
                    );

                    card.style.removeProperty(
                        "--mouse-y"
                    );

                }
            );

        });


    /* =====================================================
       7. SMOOTH SCROLL
       ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* =====================================================
       8. PROTECTED ADMISSION BUTTON
       ===================================================== */

    document
        .querySelectorAll(
            "[data-protected]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    const studentId =
                        localStorage.getItem(
                            "cmStudentId"
                        );


                    if (!studentId) {

                        event.preventDefault();


                        sessionStorage.setItem(
                            "cmReturnAfterLogin",
                            button.href
                        );


                        window.location.href =
                            "login.html";


                        return;
                    }

                }
            );

        });


    /* =====================================================
       9. CURSOR GLOW
       ===================================================== */

    if (
        !window.matchMedia(
            "(pointer: coarse)"
        ).matches
    ) {

        const cursorGlow =
            document.createElement(
                "div"
            );


        cursorGlow.className =
            "js-cursor-glow";


        cursorGlow.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.appendChild(
            cursorGlow
        );


        let mouseX = 0;
        let mouseY = 0;

        let currentX = 0;
        let currentY = 0;


        document.addEventListener(
            "mousemove",
            event => {

                mouseX =
                    event.clientX;

                mouseY =
                    event.clientY;

            }
        );


        function animateCursor() {

            currentX +=
                (mouseX - currentX) *
                0.12;


            currentY +=
                (mouseY - currentY) *
                0.12;


            cursorGlow.style.transform =
                `translate3d(
                    ${currentX}px,
                    ${currentY}px,
                    0
                )`;


            requestAnimationFrame(
                animateCursor
            );

        }


        animateCursor();

    }


    /* =====================================================
       10. PAGE LOADED
       ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );

});


/* =========================================================
   11. COURSE ADMISSION
   ========================================================= */

function startAdmission() {

    const studentId =
        localStorage.getItem(
            "cmStudentId"
        );


    if (!studentId) {

        sessionStorage.setItem(
            "cmReturnAfterLogin",
            "admission.html"
        );


        window.location.href =
            "login.html";


        return;
    }


    window.location.href =
        "admission.html";

}


/* =========================================================
   12. DYNAMIC EFFECT CSS
   ========================================================= */

(function injectEffects() {

    if (
        document.getElementById(
            "oLevelJsEffects"
        )
    ) {
        return;
    }


    const style =
        document.createElement(
            "style"
        );


    style.id =
        "oLevelJsEffects";


    style.textContent = `

        /* =========================================
           REVEAL
        ========================================= */

        .reveal {

            opacity: 0;

            transform:
                translateY(35px)
                scale(.98);

            transition:
                opacity .7s ease,
                transform .7s
                cubic-bezier(.2,.8,.2,1);

        }


        .reveal.show {

            opacity: 1;

            transform:
                translateY(0)
                scale(1);

        }


        /* =========================================
           MOUSE GLOW
        ========================================= */

        .info-card::after,
        .about-card::after,
        .learning-card::after,
        .subject-card::after,
        .career-card::after,
        .test-card::after {

            content: "";

            position: absolute;

            inset: 0;

            pointer-events: none;

            background:
                radial-gradient(
                    180px circle at
                    var(--mouse-x, 50%)
                    var(--mouse-y, 50%),
                    rgba(0,234,255,.16),
                    transparent 65%
                );

            opacity: 0;

            transition:
                opacity .25s ease;

        }


        .info-card:hover::after,
        .about-card:hover::after,
        .learning-card:hover::after,
        .subject-card:hover::after,
        .career-card:hover::after,
        .test-card:hover::after {

            opacity: 1;

        }


        /* =========================================
           RIPPLE
        ========================================= */

        .js-ripple {

            position: absolute;

            width: 12px;

            height: 12px;

            border-radius: 50%;

            background:
                rgba(255,255,255,.7);

            transform:
                translate(-50%,-50%)
                scale(0);

            animation:
                oLevelRipple
                .65s
                ease-out;

            pointer-events: none;

        }


        @keyframes oLevelRipple {

            0% {

                transform:
                    translate(-50%,-50%)
                    scale(0);

                opacity: .9;

            }


            100% {

                transform:
                    translate(-50%,-50%)
                    scale(25);

                opacity: 0;

            }

        }


        /* =========================================
           CURSOR GLOW
        ========================================= */

        .js-cursor-glow {

            position: fixed;

            top: -90px;

            left: -90px;

            width: 180px;

            height: 180px;

            border-radius: 50%;

            background:
                radial-gradient(
                    circle,
                    rgba(0,234,255,.12),
                    transparent 68%
                );

            pointer-events: none;

            z-index: 9999;

            mix-blend-mode: screen;

        }


        /* =========================================
           HEADER SCROLL
        ========================================= */

        .course-header.scrolled {

            box-shadow:
                0 12px 35px
                rgba(0,0,0,.5),

                0 0 25px
                rgba(0,234,255,.12);

        }


        /* =========================================
           PAGE LOAD
        ========================================= */

        .page-loaded .hero-section {

            animation:
                oLevelHero
                .9s
                ease both;

        }


        @keyframes oLevelHero {

            from {

                opacity: 0;

                transform:
                    translateY(20px);

            }


            to {

                opacity: 1;

                transform:
                    translateY(0);

            }

        }


        /* =========================================
           MOBILE MENU EXTRA SAFETY
        ========================================= */

        @media (max-width: 700px) {

            .course-header {

                position: sticky;

                top: 0;

                z-index: 10000;

            }


            .menu-btn {

                position: relative;

                z-index: 10002;

                cursor: pointer;

                -webkit-tap-highlight-color:
                    transparent;

                touch-action: manipulation;

            }


            .course-nav {

                z-index: 10001;

            }


            .course-nav.show {

                display: flex;

                visibility: visible;

                opacity: 1;

                pointer-events: auto;

            }

        }


        /* =========================================
           REDUCED MOTION
        ========================================= */

        @media
        (prefers-reduced-motion: reduce) {

            .reveal {

                opacity: 1;

                transform: none;

                transition: none;

            }


            .js-cursor-glow {

                display: none;

            }

        }

    `;


    document.head.appendChild(
        style
    );

})();