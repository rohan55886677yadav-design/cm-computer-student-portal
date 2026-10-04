/* =========================================
   CM COMPUTER CENTRE
   CCC COURSE PAGE JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       MOBILE MENU
    ====================================== */

    const menuBtn = document.getElementById("menuBtn");
    const courseNav = document.getElementById("courseNav");

    if (menuBtn && courseNav) {

        menuBtn.addEventListener("click", () => {

            courseNav.classList.toggle("active");

            menuBtn.innerHTML =
                courseNav.classList.contains("active")
                    ? "✕"
                    : "☰";

        });


        /* Close menu after clicking link */

        courseNav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                courseNav.classList.remove("active");

                menuBtn.innerHTML = "☰";

            });

        });

    }



    /* =====================================
       ACTIVE NAV LINK
    ====================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    document.querySelectorAll(".course-nav a").forEach(link => {

        const linkPage =
            link.getAttribute("href")
                ?.split("/")
                .pop()
                .toLowerCase();

        if (linkPage === currentPage) {

            link.classList.add("active");

        }

    });



    /* =====================================
       HEADER SCROLL EFFECT
    ====================================== */

    const header =
        document.querySelector(".course-header");

    let lastScroll = 0;

    window.addEventListener("scroll", () => {

        const currentScroll =
            window.scrollY;

        if (!header) return;


        if (currentScroll > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }


        lastScroll = currentScroll;

    }, { passive: true });



    /* =====================================
       SCROLL REVEAL
    ====================================== */

    const revealElements =
        document.querySelectorAll(
            ".info-card, " +
            ".about-card, " +
            ".learning-card, " +
            ".syllabus-card, " +
            ".practical-box, " +
            ".career-card, " +
            ".test-card, " +
            ".video-placeholder, " +
            ".section-heading"
        );


    revealElements.forEach(element => {

        element.classList.add("reveal");

    });


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

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
                threshold:0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });



    /* =====================================
       COURSE CARD TILT EFFECT
       Desktop only
    ====================================== */

    const cards =
        document.querySelectorAll(
            ".info-card, " +
            ".learning-card, " +
            ".syllabus-card, " +
            ".career-card, " +
            ".test-card"
        );


    const isTouchDevice =
        window.matchMedia(
            "(hover: none)"
        ).matches;


    if (!isTouchDevice) {

        cards.forEach(card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX - rect.left;

                    const y =
                        event.clientY - rect.top;


                    const centerX =
                        rect.width / 2;

                    const centerY =
                        rect.height / 2;


                    const rotateX =
                        ((y - centerY) /
                        centerY) * -3;


                    const rotateY =
                        ((x - centerX) /
                        centerX) * 3;


                    card.style.transform =
                        `translateY(-7px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)`;

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

    }



    /* =====================================
       BUTTON RIPPLE
    ====================================== */

    const buttons =
        document.querySelectorAll(
            ".explore-btn, " +
            ".admission-btn, " +
            ".course-btn, " +
            ".main-admission-btn"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function(event) {

                const rect =
                    this.getBoundingClientRect();

                const ripple =
                    document.createElement("span");


                ripple.className =
                    "button-ripple";


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



    /* =====================================
       SMOOTH ANCHOR SCROLL
    ====================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

                if (!targetId ||
                    targetId === "#") return;


                const target =
                    document.querySelector(
                        targetId
                    );


                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior:"smooth",
                        block:"start"
                    });

                }

            }
        );

    });



    /* =====================================
       SCROLL PROGRESS BAR
    ====================================== */

    const progress =
        document.createElement("div");

    progress.className =
        "ccc-scroll-progress";

    document.body.appendChild(progress);


    window.addEventListener(
        "scroll",
        () => {

            const scrollTop =
                window.scrollY;

            const documentHeight =
                document.documentElement
                    .scrollHeight -
                window.innerHeight;


            const percentage =
                documentHeight > 0
                    ? (scrollTop /
                       documentHeight) * 100
                    : 0;


            progress.style.width =
                `${percentage}%`;

        },
        { passive:true }
    );



    /* =====================================
       BACK TO TOP BUTTON
    ====================================== */

    const topButton =
        document.createElement("button");

    topButton.className =
        "ccc-top-button";

    topButton.innerHTML = "↑";

    topButton.setAttribute(
        "aria-label",
        "Back to top"
    );

    document.body.appendChild(
        topButton
    );


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 500) {

                topButton.classList.add(
                    "visible"
                );

            } else {

                topButton.classList.remove(
                    "visible"
                );

            }

        },
        { passive:true }
    );


    topButton.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top:0,
                behavior:"smooth"
            });

        }
    );



    /* =====================================
       GLOW FOLLOW EFFECT
       Desktop only
    ====================================== */

    if (!isTouchDevice) {

        const cursorGlow =
            document.createElement("div");

        cursorGlow.className =
            "ccc-cursor-glow";

        document.body.appendChild(
            cursorGlow
        );


        let mouseX = 0;
        let mouseY = 0;

        let glowX = 0;
        let glowY = 0;


        window.addEventListener(
            "mousemove",
            event => {

                mouseX =
                    event.clientX;

                mouseY =
                    event.clientY;

            },
            { passive:true }
        );


        function animateGlow() {

            glowX +=
                (mouseX - glowX) * 0.08;

            glowY +=
                (mouseY - glowY) * 0.08;


            cursorGlow.style.transform =
                `translate3d(
                    ${glowX}px,
                    ${glowY}px,
                    0
                )`;


            requestAnimationFrame(
                animateGlow
            );

        }


        animateGlow();

    }



    /* =====================================
       IMAGE LAZY LOADING
    ====================================== */

    document.querySelectorAll(
        "img"
    ).forEach(img => {

        if (!img.hasAttribute("loading")) {

            img.setAttribute(
                "loading",
                "lazy"
            );

        }

    });



    /* =====================================
       HERO ENTRY EFFECT
    ====================================== */

    const heroContent =
        document.querySelector(
            ".hero-content"
        );


    if (heroContent) {

        setTimeout(() => {

            heroContent.classList.add(
                "hero-loaded"
            );

        }, 100);

    }



    /* =====================================
       CONSOLE MESSAGE
    ====================================== */

    console.log(
        "%c CM COMPUTER CENTRE ",
        "background:#00eaff;color:#00131c;font-size:18px;font-weight:bold;padding:8px 14px;border-radius:8px;"
    );

    console.log(
        "%c CCC Course Page Loaded Successfully 🚀 ",
        "color:#00eaff;font-size:14px;font-weight:bold;"
    );

});