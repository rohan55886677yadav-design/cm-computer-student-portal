/* =========================================================
   CM COMPUTER CENTRE
   ABOUT PAGE — PRO NEON JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const header = document.querySelector(".about-header");
    const menuBtn = document.getElementById("menuBtn");
    const aboutNav = document.getElementById("aboutNav");



    /* =====================================================
       PAGE READY
    ===================================================== */

    document.body.classList.add("about-js-ready");



    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuBtn && aboutNav) {

        menuBtn.setAttribute("aria-expanded", "false");

        menuBtn.addEventListener("click", (event) => {

            event.stopPropagation();

            const active =
                aboutNav.classList.toggle("active");

            menuBtn.innerHTML =
                active ? "✕" : "☰";

            menuBtn.setAttribute(
                "aria-expanded",
                active ? "true" : "false"
            );

            menuBtn.setAttribute(
                "aria-label",
                active ? "Close Menu" : "Open Menu"
            );

        });


        /* Close after clicking link */

        aboutNav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                aboutNav.classList.remove("active");

                menuBtn.innerHTML = "☰";

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuBtn.setAttribute(
                    "aria-label",
                    "Open Menu"
                );

            });

        });


        /* Close outside */

        document.addEventListener("click", (event) => {

            if (
                !aboutNav.contains(event.target) &&
                !menuBtn.contains(event.target)
            ) {

                aboutNav.classList.remove("active");

                menuBtn.innerHTML = "☰";

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }



    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    function headerScroll() {

        if (!header) return;

        if (window.scrollY > 35) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener(
        "scroll",
        headerScroll,
        { passive: true }
    );

    headerScroll();



    /* =====================================================
       SCROLL PROGRESS BAR
    ===================================================== */

    const progressBar =
        document.createElement("div");

    progressBar.className =
        "about-scroll-progress";

    document.body.appendChild(progressBar);


    const progressCSS =
        document.createElement("style");

    progressCSS.textContent = `

        .about-scroll-progress{

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
                    #ff0080
                );

            box-shadow:
                0 0 8px #00eaff,
                0 0 18px rgba(0,119,255,.8);

            z-index:10000;

            pointer-events:none;

            transition:width .08s linear;

        }

    `;

    document.head.appendChild(progressCSS);



    function updateProgress() {

        const scrollTop =
            window.scrollY;

        const pageHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        if (pageHeight <= 0) return;

        const percentage =
            (scrollTop / pageHeight) * 100;

        progressBar.style.width =
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

            .section-heading,
            .about-text-card,
            .about-visual-card,
            .vision-card,
            .mentor-photo-card,
            .mentor-message-card,
            .feature-card,
            .journey-item,
            .about-cta

        `);


    revealElements.forEach((element, index) => {

        element.classList.add("pro-reveal");

        element.style.transitionDelay =
            `${(index % 4) * 80}ms`;

    });


    const revealCSS =
        document.createElement("style");

    revealCSS.textContent = `

        .pro-reveal{

            opacity:0;

            transform:
                translateY(45px)
                scale(.97);

            filter:
                blur(4px);

            transition:
                opacity .75s ease,
                transform .75s cubic-bezier(.2,.8,.2,1),
                filter .75s ease;

        }

        .pro-reveal.pro-show{

            opacity:1;

            transform:
                translateY(0)
                scale(1);

            filter:blur(0);

        }

        @media(prefers-reduced-motion:reduce){

            .pro-reveal{

                opacity:1 !important;

                transform:none !important;

                filter:none !important;

                transition:none !important;

            }

        }

    `;

    document.head.appendChild(revealCSS);


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries, obs) => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "pro-show"
                            );

                            obs.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold:.12,
                    rootMargin:
                        "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(element => {

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("pro-show");

        });

    }



    /* =====================================================
       BUTTON RIPPLE
    ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".primary-btn, .secondary-btn"
        );


    const rippleCSS =
        document.createElement("style");

    rippleCSS.textContent = `

        .primary-btn,
        .secondary-btn{

            position:relative;

            overflow:hidden;

            isolation:isolate;

        }

        .about-ripple{

            position:absolute;

            border-radius:50%;

            background:
                rgba(255,255,255,.42);

            transform:scale(0);

            pointer-events:none;

            z-index:5;

            animation:
                aboutRipple .65s
                cubic-bezier(.2,.8,.2,1);

        }

        @keyframes aboutRipple{

            to{

                transform:scale(4);

                opacity:0;

            }

        }

    `;

    document.head.appendChild(rippleCSS);


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
                    "about-ripple";

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
       SMOOTH INTERNAL LINKS
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            function(event) {

                const targetId =
                    this.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) return;

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) return;

                event.preventDefault();

                const headerHeight =
                    header
                    ? header.offsetHeight
                    : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight -
                    15;

                window.scrollTo({

                    top:targetPosition,

                    behavior:"smooth"

                });

            }
        );

    });



    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const topButton =
        document.createElement("button");

    topButton.className =
        "about-top-button";

    topButton.innerHTML =
        "↑";

    topButton.setAttribute(
        "aria-label",
        "Back to top"
    );

    document.body.appendChild(
        topButton
    );


    const topCSS =
        document.createElement("style");

    topCSS.textContent = `

        .about-top-button{

            position:fixed;

            right:22px;
            bottom:22px;

            width:50px;
            height:50px;

            display:flex;

            align-items:center;
            justify-content:center;

            border-radius:50%;

            border:
                1px solid
                rgba(0,234,255,.55);

            background:
                rgba(3,10,25,.92);

            color:#00eaff;

            font-size:23px;

            font-weight:bold;

            cursor:pointer;

            opacity:0;

            visibility:hidden;

            transform:
                translateY(20px)
                scale(.8);

            transition:
                .35s ease;

            z-index:9999;

            backdrop-filter:
                blur(12px);

            box-shadow:
                0 0 15px
                rgba(0,234,255,.25);

        }

        .about-top-button.visible{

            opacity:1;

            visibility:visible;

            transform:
                translateY(0)
                scale(1);

        }

        .about-top-button:hover{

            color:#00131c;

            background:#00eaff;

            border-color:#00eaff;

            box-shadow:
                0 0 12px #00eaff,
                0 0 30px rgba(0,234,255,.65),
                0 0 55px rgba(0,234,255,.3);

            transform:
                translateY(-5px)
                scale(1.08);

        }

        @media(max-width:600px){

            .about-top-button{

                width:44px;
                height:44px;

                right:15px;
                bottom:15px;

                font-size:20px;

            }

        }

    `;

    document.head.appendChild(
        topCSS
    );


    function topButtonUpdate() {

        if (window.scrollY > 450) {

            topButton.classList.add(
                "visible"
            );

        } else {

            topButton.classList.remove(
                "visible"
            );

        }

    }


    window.addEventListener(
        "scroll",
        topButtonUpdate,
        { passive:true }
    );

    topButtonUpdate();


    topButton.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        }
    );



    /* =====================================================
       DESKTOP NEON CURSOR
    ===================================================== */

    const desktop =
        window.matchMedia(
            "(min-width:801px)"
        ).matches;


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        desktop &&
        !reducedMotion
    ) {

        const cursorGlow =
            document.createElement("div");

        cursorGlow.className =
            "about-cursor-glow";

        document.body.appendChild(
            cursorGlow
        );


        const cursorCSS =
            document.createElement("style");

        cursorCSS.textContent = `

            .about-cursor-glow{

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
                        rgba(0,234,255,.10)
                        0%,
                        rgba(0,119,255,.06)
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

        let glowX = 0;
        let glowY = 0;


        document.addEventListener(
            "mousemove",
            event => {

                mouseX =
                    event.clientX;

                mouseY =
                    event.clientY;

                cursorGlow.style.opacity =
                    "1";

            }
        );


        function animateCursor() {

            glowX +=
                (mouseX - glowX) * .16;

            glowY +=
                (mouseY - glowY) * .16;

            cursorGlow.style.left =
                glowX + "px";

            cursorGlow.style.top =
                glowY + "px";

            requestAnimationFrame(
                animateCursor
            );

        }

        animateCursor();


        document.addEventListener(
            "mouseleave",
            () => {

                cursorGlow.style.opacity =
                    "0";

            }
        );

    }



    /* =====================================================
       3D CARD TILT
    ===================================================== */

    if (
        desktop &&
        !reducedMotion
    ) {

        const tiltCards =
            document.querySelectorAll(
                ".vision-card, " +
                ".feature-card, " +
                ".mentor-photo-card, " +
                ".about-text-card"
            );


        tiltCards.forEach(card => {

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
                        centerY) * -4;

                    const rotateY =
                        ((x - centerX) /
                        centerX) * 4;


                    card.style.transform =
                        `perspective(900px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-5px)`;

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
       IMAGE GLOW + HOVER
    ===================================================== */

    const mentorImages =
        document.querySelectorAll(
            ".photo-frame img, " +
            ".together-photo img"
        );


    mentorImages.forEach(img => {

        img.addEventListener(
            "load",
            () => {

                img.classList.add(
                    "image-ready"
                );

            }
        );

    });


    const imageCSS =
        document.createElement("style");

    imageCSS.textContent = `

        .photo-frame img,
        .together-photo img{

            transition:
                transform .65s
                cubic-bezier(.2,.8,.2,1),
                filter .65s ease;

        }

        .photo-frame:hover img,
        .together-photo:hover img{

            transform:
                scale(1.045);

            filter:
                brightness(1.08)
                saturate(1.12);

        }

    `;

    document.head.appendChild(
        imageCSS
    );



    /* =====================================================
       IMAGE ERROR HANDLING
    ===================================================== */

    mentorImages.forEach(img => {

        img.addEventListener(
            "error",
            () => {

                const parent =
                    img.parentElement;

                if (!parent) return;

                img.style.display =
                    "none";

                parent.classList.add(
                    "photo-error"
                );

                parent.innerHTML = `

                    <div style="
                        text-align:center;
                        color:#00eaff;
                        padding:25px;
                        font-weight:600;
                    ">

                        <div style="
                            font-size:34px;
                            margin-bottom:8px;
                        ">
                            📷
                        </div>

                        <div>
                            Photo Coming Soon
                        </div>

                    </div>

                `;

            }
        );

    });



    /* =====================================================
       STAGGER ANIMATION
    ===================================================== */

    document.querySelectorAll(
        ".feature-card"
    ).forEach((card, index) => {

        card.style.transitionDelay =
            `${index * 70}ms`;

    });


    document.querySelectorAll(
        ".vision-card"
    ).forEach((card, index) => {

        card.style.transitionDelay =
            `${index * 100}ms`;

    });



    /* =====================================================
       ACTIVE NAV LINK
    ===================================================== */

    const currentPage =
        window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();


    if (aboutNav) {

        aboutNav.querySelectorAll("a")
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
                    linkPage === currentPage ||
                    (
                        currentPage === "" &&
                        linkPage === "index.html"
                    )
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
                window.innerWidth > 800 &&
                aboutNav
            ) {

                aboutNav.classList.remove(
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
       PAGE LOAD EFFECT
    ===================================================== */

    window.addEventListener(
        "load",
        () => {

            document.body.classList.add(
                "page-loaded"
            );

            setTimeout(() => {

                document.body.classList.add(
                    "about-loaded"
                );

            }, 150);

            console.log(
                "🚀 CM COMPUTER CENTRE | ABOUT PAGE PRO MODE ACTIVATED"
            );

        }
    );



    /* =====================================================
       CONSOLE
    ===================================================== */

    console.log(
        "%c🚀 CM COMPUTER CENTRE",
        "color:#00eaff;font-size:20px;font-weight:bold;"
    );

    console.log(
        "%c✨ ABOUT PAGE — PRO NEON SYSTEM READY",
        "color:#7c3aed;font-size:14px;font-weight:bold;"
    );

});