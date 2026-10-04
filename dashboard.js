/* =========================================================
   CM COMPUTER CENTRE
   PRO STUDENT DASHBOARD JAVASCRIPT
   Glow • Shine • Particles • Hover • Tilt • Ripple
   ========================================================= */


/* =========================================================
   1. PAGE LOAD
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       BASIC ELEMENTS
       ===================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.querySelector(".nav-menu");
    const logoutBtn = document.getElementById("logoutBtn");

    const studentName = document.getElementById("studentName");
    const studentId = document.getElementById("studentId");
    const studentPhoto = document.getElementById("studentPhoto");


    /* =====================================================
       2. STUDENT DATA
       ===================================================== */

    const savedName = localStorage.getItem("cmStudentName");
    const savedId = localStorage.getItem("cmStudentId");
    const savedPhoto = localStorage.getItem("cmStudentPhoto");

    if (savedName && studentName) {
        studentName.textContent = savedName;
    }

    if (savedId && studentId) {
        studentId.textContent = savedId;
    }

    if (savedPhoto && studentPhoto) {
        studentPhoto.src = savedPhoto;
    }


    /* =====================================================
       3. MOBILE MENU
       ===================================================== */

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", () => {

            navMenu.classList.toggle("show");

            const isOpen =
                navMenu.classList.contains("show");

            menuBtn.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });


        /* Close menu after clicking navigation */

        document
            .querySelectorAll(".nav-link")
            .forEach(link => {

                link.addEventListener("click", () => {

                    navMenu.classList.remove("show");

                    menuBtn.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                });

            });

    }


    /* =====================================================
       4. LOGOUT
       ===================================================== */

    if (logoutBtn) {

        logoutBtn.addEventListener("click", () => {

            logoutBtn.classList.add("logging-out");

            setTimeout(() => {

                localStorage.removeItem(
                    "cmStudentName"
                );

                localStorage.removeItem(
                    "cmStudentId"
                );

                localStorage.removeItem(
                    "cmStudentPhoto"
                );

                window.location.href =
                    "login.html";

            }, 350);

        });

    }


    /* =====================================================
       5. ACTIVE NAVIGATION
       ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    document
        .querySelectorAll(".nav-link")
        .forEach(link => {

            const linkPage =
                link.getAttribute("href");

            if (!linkPage) return;

            const cleanLinkPage =
                linkPage
                    .split("/")
                    .pop()
                    .toLowerCase();


            if (cleanLinkPage === currentPage) {

                link.classList.add("active");

            }

        });


    /* =====================================================
       6. REVEAL ANIMATION
       ===================================================== */

    const revealItems =
        document.querySelectorAll(
            ".course-card, " +
            ".quick-card, " +
            ".notice-box, " +
            ".admission-banner"
        );


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "js-visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealItems.forEach(item => {

            item.classList.add(
                "js-reveal"
            );

            revealObserver.observe(item);

        });

    } else {

        revealItems.forEach(item => {

            item.classList.add(
                "js-visible"
            );

        });

    }


    /* =====================================================
       7. COURSE CARD MOUSE GLOW
       ===================================================== */

    document
        .querySelectorAll(".course-card")
        .forEach(card => {

            card.addEventListener(
                "mousemove",
                event => {

                    if (window.innerWidth < 800) {
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
       8. QUICK CARD MOUSE GLOW
       ===================================================== */

    document
        .querySelectorAll(".quick-card")
        .forEach(card => {

            card.addEventListener(
                "mousemove",
                event => {

                    if (window.innerWidth < 800) {
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
       9. BUTTON RIPPLE EFFECT
       ===================================================== */

    document
        .querySelectorAll(
            ".course-card button, " +
            ".course-card a, " +
            ".quick-card a, " +
            ".main-admission-btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                function(event) {

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
       10. COURSE CARD 3D TILT
       ===================================================== */

    document
        .querySelectorAll(".course-card")
        .forEach(card => {

            card.addEventListener(
                "mousemove",
                event => {

                    if (window.innerWidth < 800) {
                        return;
                    }


                    const rect =
                        card.getBoundingClientRect();


                    const centerX =
                        rect.left +
                        rect.width / 2;


                    const centerY =
                        rect.top +
                        rect.height / 2;


                    const rotateX =
                        (event.clientY - centerY) /
                        35;


                    const rotateY =
                        (centerX - event.clientX) /
                        35;


                    card.style.transform =
                        `perspective(900px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-8px)`;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        });


    /* =====================================================
       11. SMOOTH SCROLL
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
                        link.getAttribute("href");


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
       12. HEADER SCROLL EFFECT
       ===================================================== */

    const header =
        document.querySelector(
            ".dashboard-header"
        );


    if (header) {

        const checkHeader =
            () => {

                if (window.scrollY > 30) {

                    header.classList.add(
                        "scrolled"
                    );

                } else {

                    header.classList.remove(
                        "scrolled"
                    );

                }

            };


        window.addEventListener(
            "scroll",
            checkHeader,
            {
                passive: true
            }
        );


        checkHeader();

    }


    /* =====================================================
       13. BACKGROUND PARTICLES
       ===================================================== */

    createParticles();


    /* =====================================================
       14. CURSOR GLOW
       ===================================================== */

    createCursorGlow();


    /* =====================================================
       15. PAGE LOADED
       ===================================================== */

    document.body.classList.add(
        "dashboard-loaded"
    );

});


/* =========================================================
   16. COURSE PAGE REDIRECT
   ========================================================= */

function viewCourse(courseName) {

    if (!courseName) {
        return;
    }


    const coursePages = {

        "ADCA":
            "adca.html",

        "O Level":
            "o-level.html",

        "CCC":
            "ccc.html",

        "Tally":
            "tally.html",

        "DCA":
            "dca.html",

        "PGDCA":
            "pgdca.html",

        "Web Designing":
            "web-designing.html",

        "MS Office":
            "ms-office.html"

    };


    if (coursePages[courseName]) {

        window.location.href =
            coursePages[courseName];

    } else {

        alert(
            `${courseName}\n\nCourse page coming soon.`
        );

    }

}


/* =========================================================
   17. BACKGROUND PARTICLE SYSTEM
   ========================================================= */

function createParticles() {

    if (
        document.querySelector(
            ".js-particle-container"
        )
    ) {
        return;
    }


    const container =
        document.createElement(
            "div"
        );


    container.className =
        "js-particle-container";


    container.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.appendChild(
        container
    );


    const particleCount =
        window.innerWidth < 600
            ? 18
            : 32;


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const particle =
            document.createElement(
                "span"
            );


        particle.className =
            "js-particle";


        particle.style.left =
            `${Math.random() * 100}%`;


        particle.style.top =
            `${Math.random() * 100}%`;


        particle.style.animationDelay =
            `${Math.random() * 6}s`;


        particle.style.animationDuration =
            `${5 + Math.random() * 8}s`;


        particle.style.opacity =
            `${0.2 + Math.random() * 0.6}`;


        const size =
            2 + Math.random() * 4;


        particle.style.width =
            `${size}px`;


        particle.style.height =
            `${size}px`;


        container.appendChild(
            particle
        );

    }

}


/* =========================================================
   18. CURSOR GLOW SYSTEM
   ========================================================= */

function createCursorGlow() {

    if (
        window.matchMedia(
            "(pointer: coarse)"
        ).matches
    ) {
        return;
    }


    if (
        document.querySelector(
            ".js-cursor-glow"
        )
    ) {
        return;
    }


    const glow =
        document.createElement(
            "div"
        );


    glow.className =
        "js-cursor-glow";


    glow.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.appendChild(
        glow
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


        glow.style.transform =
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


/* =========================================================
   19. EXTRA DYNAMIC CSS
   JS AUTOMATICALLY ADDS THESE EFFECTS
   ========================================================= */

(function injectDashboardEffects() {

    if (
        document.getElementById(
            "cm-js-effects"
        )
    ) {
        return;
    }


    const style =
        document.createElement(
            "style"
        );


    style.id =
        "cm-js-effects";


    style.textContent = `

        /* =========================================
           REVEAL
           ========================================= */

        .js-reveal {

            opacity: 0;

            transform:
                translateY(25px)
                scale(.98);

            transition:
                opacity .7s ease,
                transform .7s
                cubic-bezier(.2,.8,.2,1);

        }


        .js-reveal.js-visible {

            opacity: 1;

            transform:
                translateY(0)
                scale(1);

        }


        /* =========================================
           MOUSE LIGHT
           ========================================= */

        .course-card::after,
        .quick-card::after {

            background:
                radial-gradient(
                    180px circle at
                    var(--mouse-x, 50%)
                    var(--mouse-y, 50%),
                    rgba(255,255,255,.13),
                    transparent 65%
                );

            opacity: 0;

            transition:
                opacity .25s ease;

            pointer-events: none;

        }


        .course-card:hover::after,
        .quick-card:hover::after {

            opacity: 1;

        }


        /* =========================================
           RIPPLE
           ========================================= */

        .course-card button,
        .course-card a,
        .quick-card a,
        .main-admission-btn {

            position: relative;

            overflow: hidden;

        }


        .js-ripple {

            position: absolute;

            width: 10px;
            height: 10px;

            border-radius: 50%;

            background:
                rgba(255,255,255,.65);

            transform:
                translate(-50%,-50%)
                scale(0);

            animation:
                cmRipple .65s
                ease-out;

            pointer-events: none;

        }


        @keyframes cmRipple {

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
           PARTICLES
           ========================================= */

        .js-particle-container {

            position: fixed;

            inset: 0;

            z-index: -1;

            pointer-events: none;

            overflow: hidden;

        }


        .js-particle {

            position: absolute;

            display: block;

            border-radius: 50%;

            background:
                #00eaff;

            box-shadow:
                0 0 7px #00eaff,
                0 0 15px
                rgba(0,234,255,.5);

            animation:
                cmParticleFloat
                linear infinite;

        }


        @keyframes cmParticleFloat {

            0% {

                transform:
                    translateY(30px)
                    scale(.7);

                opacity: 0;

            }

            20% {

                opacity: .7;

            }

            50% {

                transform:
                    translateY(-60px)
                    scale(1);

            }

            80% {

                opacity: .5;

            }

            100% {

                transform:
                    translateY(-140px)
                    scale(.4);

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
                    rgba(0,234,255,.13),
                    transparent 68%
                );

            pointer-events: none;

            z-index: 9999;

            mix-blend-mode:
                screen;

        }


        /* =========================================
           HEADER SCROLL
           ========================================= */

        .dashboard-header.scrolled {

            box-shadow:
                0 10px 35px
                rgba(0,0,0,.55),

                0 0 25px
                rgba(0,234,255,.10);

        }


        /* =========================================
           LOGOUT
           ========================================= */

        .logout-btn.logging-out {

            transform:
                scale(.95);

            filter:
                brightness(1.4);

            box-shadow:
                0 0 25px
                rgba(255,49,88,.8);

        }


        /* =========================================
           PAGE LOADED
           ========================================= */

        .dashboard-loaded
        .welcome-section {

            animation:
                cmWelcome .9s
                ease both;

        }


        @keyframes cmWelcome {

            from {

                opacity: 0;

                transform:
                    translateY(18px)
                    scale(.985);

            }

            to {

                opacity: 1;

                transform:
                    translateY(0)
                    scale(1);

            }

        }


        /* =========================================
           REDUCED MOTION
           ========================================= */

        @media
        (prefers-reduced-motion: reduce) {

            .js-particle,
            .js-cursor-glow {

                display: none;

            }


            .js-reveal {

                opacity: 1;

                transform: none;

                transition: none;

            }

        }

    `;


    document.head.appendChild(
        style
    );

})();