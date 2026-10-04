/* =========================================================
   CM COMPUTER CENTRE
   COURSES PAGE — PRO NEON JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const header =
        document.querySelector(".courses-header");

    const menuBtn =
        document.getElementById("menuBtn");

    const coursesNav =
        document.getElementById("coursesNav");

    const courseCards =
        document.querySelectorAll(".course-card");

    const whyCards =
        document.querySelectorAll(".why-card");

    const buttons =
        document.querySelectorAll(
            ".primary-btn, .secondary-btn, .course-btn, .course-admission"
        );



    /* =====================================================
       PAGE READY
    ===================================================== */

    document.body.classList.add(
        "courses-js-ready"
    );



    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuBtn && coursesNav) {

        menuBtn.addEventListener("click", event => {

            event.stopPropagation();

            const isOpen =
                coursesNav.classList.toggle("active");

            menuBtn.innerHTML =
                isOpen ? "✕" : "☰";

            menuBtn.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuBtn.setAttribute(
                "aria-label",
                isOpen
                    ? "Close Menu"
                    : "Open Menu"
            );

        });


        /* Close menu after navigation */

        coursesNav
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        coursesNav.classList.remove(
                            "active"
                        );

                        menuBtn.innerHTML =
                            "☰";

                        menuBtn.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }
                );

            });


        /* Close menu outside */

        document.addEventListener(
            "click",
            event => {

                if (
                    !coursesNav.contains(event.target) &&
                    !menuBtn.contains(event.target)
                ) {

                    coursesNav.classList.remove(
                        "active"
                    );

                    menuBtn.innerHTML =
                        "☰";

                    menuBtn.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }
        );

    }



    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 35) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive:true }
    );

    updateHeader();



    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

    const progress =
        document.createElement("div");

    progress.className =
        "courses-scroll-progress";

    document.body.appendChild(progress);


    const progressCSS =
        document.createElement("style");

    progressCSS.textContent = `

        .courses-scroll-progress{

            position:fixed;

            top:0;
            left:0;

            width:0%;

            height:3px;

            background:
                linear-gradient(
                    90deg,
                    #00eaff,
                    #0077ff,
                    #7c3aed,
                    #ff0080,
                    #ffd000
                );

            box-shadow:
                0 0 8px #00eaff,
                0 0 20px
                rgba(0,119,255,.75);

            z-index:10001;

            pointer-events:none;

        }

    `;

    document.head.appendChild(
        progressCSS
    );


    function updateProgress() {

        const scrollTop =
            window.scrollY;

        const totalHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        if (totalHeight <= 0) {

            progress.style.width =
                "0%";

            return;

        }

        const percentage =
            (scrollTop / totalHeight) * 100;

        progress.style.width =
            percentage + "%";

    }

    window.addEventListener(
        "scroll",
        updateProgress,
        { passive:true }
    );

    updateProgress();



    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(`

            .courses-hero-content,
            .courses-hero-card,
            .section-heading,
            .course-card,
            .why-card,
            .courses-cta

        `);


    revealElements.forEach(
        (element, index) => {

            element.classList.add(
                "course-reveal"
            );

            element.style.transitionDelay =
                `${(index % 4) * 80}ms`;

        }
    );


    const revealCSS =
        document.createElement("style");

    revealCSS.textContent = `

        .course-reveal{

            opacity:0;

            transform:
                translateY(40px)
                scale(.97);

            filter:
                blur(4px);

            transition:
                opacity .75s ease,
                transform .75s
                    cubic-bezier(.2,.8,.2,1),
                filter .75s ease;

        }

        .course-reveal.show{

            opacity:1;

            transform:
                translateY(0)
                scale(1);

            filter:
                blur(0);

        }

        @media(prefers-reduced-motion:reduce){

            .course-reveal{

                opacity:1 !important;

                transform:none !important;

                filter:none !important;

                transition:none !important;

            }

        }

    `;

    document.head.appendChild(
        revealCSS
    );


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        "IntersectionObserver" in window &&
        !reducedMotion
    ) {

        const observer =
            new IntersectionObserver(
                (entries, obs) => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );

                            obs.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold:.10,
                    rootMargin:
                        "0px 0px -45px 0px"
                }
            );


        revealElements.forEach(
            element =>
                observer.observe(element)
        );

    } else {

        revealElements.forEach(
            element =>
                element.classList.add("show")
        );

    }



    /* =====================================================
       BUTTON RIPPLE
    ===================================================== */

    const rippleCSS =
        document.createElement("style");

    rippleCSS.textContent = `

        .primary-btn,
        .secondary-btn,
        .course-btn,
        .course-admission{

            position:relative;

            overflow:hidden;

            isolation:isolate;

        }

        .course-ripple{

            position:absolute;

            border-radius:50%;

            background:
                rgba(255,255,255,.40);

            transform:scale(0);

            pointer-events:none;

            z-index:10;

            animation:
                courseRipple .65s
                cubic-bezier(.2,.8,.2,1);

        }

        @keyframes courseRipple{

            to{

                transform:scale(4);

                opacity:0;

            }

        }

    `;

    document.head.appendChild(
        rippleCSS
    );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function(event) {

                const rect =
                    this.getBoundingClientRect();

                const size =
                    Math.max(
                        rect.width,
                        rect.height
                    );

                const ripple =
                    document.createElement("span");

                ripple.className =
                    "course-ripple";

                ripple.style.width =
                    size + "px";

                ripple.style.height =
                    size + "px";

                ripple.style.left =
                    (
                        event.clientX -
                        rect.left -
                        size / 2
                    ) + "px";

                ripple.style.top =
                    (
                        event.clientY -
                        rect.top -
                        size / 2
                    ) + "px";

                this.appendChild(ripple);


                setTimeout(() => {

                    ripple.remove();

                }, 700);

            }
        );

    });



    /* =====================================================
       COURSE CARD 3D TILT
    ===================================================== */

    const desktop =
        window.matchMedia(
            "(min-width: 851px)"
        ).matches;


    if (
        desktop &&
        !reducedMotion
    ) {

        courseCards.forEach(card => {

            card.style.transformStyle =
                "preserve-3d";


            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;

                    const centerX =
                        rect.width / 2;

                    const centerY =
                        rect.height / 2;

                    const rotateX =
                        ((y - centerY) /
                        centerY) * -3.5;

                    const rotateY =
                        ((x - centerX) /
                        centerX) * 3.5;


                    card.style.transform =
                        `perspective(900px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-10px)`;

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



    /* =====================================================
       COURSE IMAGE SHINE
    ===================================================== */

    courseCards.forEach(card => {

        const image =
            card.querySelector(
                ".course-image"
            );

        if (!image) return;


        const shine =
            document.createElement("span");

        shine.className =
            "course-image-shine";

        image.appendChild(
            shine
        );

    });


    const shineCSS =
        document.createElement("style");

    shineCSS.textContent = `

        .course-image{

            position:relative;

        }

        .course-image-shine{

            position:absolute;

            top:0;

            left:-120%;

            width:70%;

            height:100%;

            pointer-events:none;

            transform:
                skewX(-20deg);

            background:
                linear-gradient(
                    90deg,
                    transparent,
                    rgba(255,255,255,.18),
                    transparent
                );

            transition:
                left .75s ease;

            z-index:3;

        }

        .course-card:hover
        .course-image-shine{

            left:150%;

        }

    `;

    document.head.appendChild(
        shineCSS
    );



    /* =====================================================
       CARD HOVER GLOW
    ===================================================== */

    courseCards.forEach(card => {

        card.addEventListener(
            "mouseenter",
            () => {

                card.classList.add(
                    "card-active"
                );

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.classList.remove(
                    "card-active"
                );

            }
        );

    });


    const cardGlowCSS =
        document.createElement("style");

    cardGlowCSS.textContent = `

        .course-card.card-active{

            box-shadow:
                0 25px 55px
                rgba(0,0,0,.55),
                0 0 25px
                rgba(0,234,255,.18);

        }

    `;

    document.head.appendChild(
        cardGlowCSS
    );



    /* =====================================================
       WHY CARD MOUSE GLOW
    ===================================================== */

    if (
        desktop &&
        !reducedMotion
    ) {

        whyCards.forEach(card => {

            card.addEventListener(
                "mousemove",
                event => {

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
                        x + "px"
                    );

                    card.style.setProperty(
                        "--mouse-y",
                        y + "px"
                    );

                }
            );

        });


        const whyGlowCSS =
            document.createElement("style");

        whyGlowCSS.textContent = `

            .why-card::before{

                content:"";

                position:absolute;

                width:180px;

                height:180px;

                left:
                    var(--mouse-x,50%);

                top:
                    var(--mouse-y,50%);

                transform:
                    translate(-50%,-50%);

                border-radius:50%;

                background:
                    radial-gradient(
                        circle,
                        rgba(0,234,255,.10),
                        transparent 70%
                    );

                opacity:0;

                pointer-events:none;

                transition:
                    opacity .25s ease;

            }

            .why-card{

                position:relative;

                overflow:hidden;

            }

            .why-card:hover::before{

                opacity:1;

            }

        `;

        document.head.appendChild(
            whyGlowCSS
        );

    }



    /* =====================================================
       DESKTOP CURSOR GLOW
    ===================================================== */

    if (
        desktop &&
        !reducedMotion
    ) {

        const cursor =
            document.createElement("div");

        cursor.className =
            "courses-cursor-glow";

        document.body.appendChild(
            cursor
        );


        const cursorCSS =
            document.createElement("style");

        cursorCSS.textContent = `

            .courses-cursor-glow{

                position:fixed;

                width:190px;

                height:190px;

                border-radius:50%;

                pointer-events:none;

                z-index:1;

                transform:
                    translate(-50%,-50%);

                background:
                    radial-gradient(
                        circle,
                        rgba(0,234,255,.09),
                        rgba(124,58,237,.04)
                        35%,
                        transparent 70%
                    );

                opacity:0;

                transition:
                    opacity .2s ease;

                will-change:
                    left,
                    top;

            }

        `;

        document.head.appendChild(
            cursorCSS
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

                cursor.style.opacity =
                    "1";

            }
        );


        function animateCursor() {

            currentX +=
                (mouseX - currentX) * .15;

            currentY +=
                (mouseY - currentY) * .15;

            cursor.style.left =
                currentX + "px";

            cursor.style.top =
                currentY + "px";

            requestAnimationFrame(
                animateCursor
            );

        }

        animateCursor();


        document.addEventListener(
            "mouseleave",
            () => {

                cursor.style.opacity =
                    "0";

            }
        );

    }



    /* =====================================================
       IMAGE ERROR FALLBACK
    ===================================================== */

    document.querySelectorAll(
        ".course-image img"
    ).forEach(img => {

        img.addEventListener(
            "error",
            () => {

                const parent =
                    img.parentElement;

                if (!parent) return;

                img.style.display =
                    "none";

                parent.classList.add(
                    "image-error"
                );


                const fallback =
                    document.createElement("div");

                fallback.className =
                    "course-image-fallback";

                fallback.innerHTML = `

                    <span>💻</span>

                    <strong>
                        Course Image
                    </strong>

                    <small>
                        Coming Soon
                    </small>

                `;

                parent.appendChild(
                    fallback
                );

            }
        );

    });


    const fallbackCSS =
        document.createElement("style");

    fallbackCSS.textContent = `

        .course-image-fallback{

            position:absolute;

            inset:0;

            display:flex;

            flex-direction:column;

            align-items:center;

            justify-content:center;

            gap:6px;

            background:
                linear-gradient(
                    135deg,
                    #06192c,
                    #111735
                );

            color:#00eaff;

            text-align:center;

        }

        .course-image-fallback span{

            font-size:36px;

        }

        .course-image-fallback strong{

            font-size:14px;

        }

        .course-image-fallback small{

            color:
                rgba(255,255,255,.5);

            font-size:11px;

        }

    `;

    document.head.appendChild(
        fallbackCSS
    );



    /* =====================================================
       LAZY LOADING
    ===================================================== */

    document.querySelectorAll(
        "img"
    ).forEach(img => {

        if (
            !img.hasAttribute("loading")
        ) {

            img.setAttribute(
                "loading",
                "lazy"
            );

        }

    });



    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const currentPage =
        window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();


    if (coursesNav) {

        coursesNav
            .querySelectorAll("a")
            .forEach(link => {

                const href =
                    link.getAttribute("href");

                if (!href) return;

                const linkPage =
                    href
                    .split("/")
                    .pop()
                    .split("#")[0]
                    .toLowerCase();


                if (
                    linkPage === currentPage
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            });

    }



    /* =====================================================
       RESIZE PROTECTION
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 850 &&
                coursesNav
            ) {

                coursesNav.classList.remove(
                    "active"
                );

                if (menuBtn) {

                    menuBtn.innerHTML =
                        "☰";

                    menuBtn.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        }
    );



    /* =====================================================
       PAGE LOAD
    ===================================================== */

    window.addEventListener(
        "load",
        () => {

            document.body.classList.add(
                "page-loaded"
            );

            setTimeout(() => {

                document.body.classList.add(
                    "courses-loaded"
                );

            }, 120);


            console.log(
                "🚀 CM COMPUTER CENTRE | COURSES PAGE PRO MODE READY"
            );

        }
    );



    /* =====================================================
       CONSOLE BRANDING
    ===================================================== */

    console.log(
        "%c🚀 CM COMPUTER CENTRE",
        "color:#00eaff;font-size:20px;font-weight:900;"
    );

    console.log(
        "%c✨ COURSES PAGE — NEON PRO SYSTEM ACTIVATED",
        "color:#7c3aed;font-size:14px;font-weight:800;"
    );

});