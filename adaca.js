/* =========================================================
   CM COMPUTER CENTRE
   ADCA COURSE PAGE — PRO JAVASCRIPT
   Menu • Reveal • Glow • Tilt • Ripple • Particles
   Scroll Progress • Back To Top
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const header = document.querySelector(".course-header");
    const menuBtn = document.querySelector(".menu-btn");
    const nav = document.querySelector(".course-nav");



    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuBtn && nav) {

        menuBtn.setAttribute("aria-expanded", "false");

        menuBtn.addEventListener("click", () => {

            nav.classList.toggle("show");

            const opened = nav.classList.contains("show");

            menuBtn.setAttribute(
                "aria-expanded",
                String(opened)
            );

            menuBtn.classList.toggle(
                "menu-open",
                opened
            );

        });


        /* Close menu after clicking link */

        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("show");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuBtn.classList.remove(
                    "menu-open"
                );

            });

        });

    }



    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const currentPage =
        window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    document
        .querySelectorAll(".course-nav a")
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
                linkPage &&
                linkPage === currentPage
            ) {

                link.classList.add("active");

            }

        });



    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    function headerEffect() {

        if (!header) return;

        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener(
        "scroll",
        headerEffect,
        { passive: true }
    );

    headerEffect();



    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) return;

                const target =
                    document.querySelector(targetId);

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        });



    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".course-section, " +
            ".info-card, " +
            ".about-card, " +
            ".learning-card, " +
            ".syllabus-card, " +
            ".career-card, " +
            ".test-card, " +
            ".practical-box, " +
            ".video-placeholder, " +
            ".admission-cta"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

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


        revealElements.forEach(
            element => {

                element.classList.add(
                    "js-reveal"
                );

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "js-visible"
                );

            }
        );

    }



    /* =====================================================
       CARD MOUSE GLOW
    ===================================================== */

    const glowCards =
        document.querySelectorAll(
            ".info-card, " +
            ".learning-card, " +
            ".syllabus-card, " +
            ".career-card, " +
            ".test-card"
        );


    glowCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                if (window.innerWidth < 800)
                    return;

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
       3D CARD TILT
    ===================================================== */

    const tiltCards =
        document.querySelectorAll(
            ".info-card, " +
            ".learning-card, " +
            ".syllabus-card, " +
            ".career-card, " +
            ".test-card"
        );


    tiltCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                if (window.innerWidth < 900)
                    return;

                const rect =
                    card.getBoundingClientRect();

                const centerX =
                    rect.left +
                    rect.width / 2;

                const centerY =
                    rect.top +
                    rect.height / 2;

                const rotateX =
                    (event.clientY -
                        centerY) / 35;

                const rotateY =
                    (centerX -
                        event.clientX) / 35;

                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-9px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });



    /* =====================================================
       BUTTON RIPPLE
    ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".explore-btn, " +
            ".admission-btn, " +
            ".main-admission-btn, " +
            ".video-placeholder a"
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
                    "js-ripple";

                ripple.style.left =
                    `${event.clientX -
                    rect.left}px`;

                ripple.style.top =
                    `${event.clientY -
                    rect.top}px`;

                this.appendChild(ripple);


                setTimeout(() => {

                    ripple.remove();

                }, 700);

            }
        );

    });



    /* =====================================================
       SCROLL PROGRESS BAR
    ===================================================== */

    const progress =
        document.createElement("div");

    progress.className =
        "js-scroll-progress";

    document.body.appendChild(progress);


    function updateProgress() {

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement
                .scrollHeight -
            window.innerHeight;

        if (documentHeight <= 0) {

            progress.style.width = "0%";

            return;

        }

        const percentage =
            (scrollTop /
                documentHeight) *
            100;

        progress.style.width =
            `${percentage}%`;

    }


    window.addEventListener(
        "scroll",
        updateProgress,
        { passive: true }
    );

    updateProgress();



    /* =====================================================
       BACK TO TOP BUTTON
    ===================================================== */

    const topButton =
        document.createElement("button");

    topButton.className =
        "js-back-top";

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
                    "show"
                );

            } else {

                topButton.classList.remove(
                    "show"
                );

            }

        },
        { passive: true }
    );


    topButton.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );



    /* =====================================================
       FLOATING PARTICLES
    ===================================================== */

    createParticles();



    /* =====================================================
       CURSOR GLOW
    ===================================================== */

    createCursorGlow();



    /* =====================================================
       EXTRA CSS EFFECTS
    ===================================================== */

    injectEffects();



    /* =====================================================
       PAGE LOADED
    ===================================================== */

    document.body.classList.add(
        "adca-page-loaded"
    );

});



/* =========================================================
   PARTICLES
========================================================= */

function createParticles() {

    if (
        document.querySelector(
            ".js-particle-container"
        )
    ) return;


    const container =
        document.createElement("div");

    container.className =
        "js-particle-container";

    container.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.appendChild(
        container
    );


    const count =
        window.innerWidth < 600
            ? 14
            : 28;


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const particle =
            document.createElement("span");

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
   CURSOR GLOW
========================================================= */

function createCursorGlow() {

    if (
        window.matchMedia(
            "(pointer: coarse)"
        ).matches
    ) return;


    if (
        document.querySelector(
            ".js-cursor-glow"
        )
    ) return;


    const glow =
        document.createElement("div");

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


    function animate() {

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
            animate
        );

    }


    animate();

}



/* =========================================================
   EXTRA EFFECT CSS
========================================================= */

function injectEffects() {

    if (
        document.getElementById(
            "adca-js-effects"
        )
    ) return;


    const style =
        document.createElement("style");

    style.id =
        "adca-js-effects";


    style.textContent = `

        /* =========================
           SCROLL REVEAL
        ========================= */

        .js-reveal{
            opacity:0;
            transform:
                translateY(35px)
                scale(.97);

            transition:
                opacity .75s ease,
                transform .75s
                cubic-bezier(.2,.8,.2,1);
        }

        .js-reveal.js-visible{
            opacity:1;
            transform:
                translateY(0)
                scale(1);
        }


        /* =========================
           CARD MOUSE LIGHT
        ========================= */

        .info-card::after,
        .learning-card::before,
        .syllabus-card::after,
        .career-card::after,
        .test-card::after{

            background:
                radial-gradient(
                    180px circle at
                    var(--mouse-x,50%)
                    var(--mouse-y,50%),
                    rgba(255,255,255,.13),
                    transparent 68%
                );

            opacity:0;
            transition:
                opacity .25s ease;

            pointer-events:none;
        }


        .info-card:hover::after,
        .learning-card:hover::before,
        .syllabus-card:hover::after,
        .career-card:hover::after,
        .test-card:hover::after{

            opacity:1;

        }


        /* =========================
           RIPPLE
        ========================= */

        .explore-btn,
        .admission-btn,
        .main-admission-btn,
        .video-placeholder a{

            position:relative;
            overflow:hidden;

        }


        .js-ripple{

            position:absolute;

            width:12px;
            height:12px;

            border-radius:50%;

            background:
                rgba(255,255,255,.65);

            transform:
                translate(-50%,-50%)
                scale(0);

            animation:
                adcaRipple .7s ease-out;

            pointer-events:none;

        }


        @keyframes adcaRipple{

            0%{
                transform:
                    translate(-50%,-50%)
                    scale(0);

                opacity:.9;
            }

            100%{
                transform:
                    translate(-50%,-50%)
                    scale(28);

                opacity:0;
            }

        }


        /* =========================
           SCROLL PROGRESS
        ========================= */

        .js-scroll-progress{

            position:fixed;

            top:0;
            left:0;

            width:0%;
            height:3px;

            z-index:99999;

            background:
                linear-gradient(
                    90deg,
                    #00e5ff,
                    #2979ff,
                    #7c4dff,
                    #ff1744
                );

            box-shadow:
                0 0 10px #00e5ff,
                0 0 20px
                rgba(124,77,255,.7);

            transition:
                width .08s linear;

        }


        /* =========================
           BACK TOP
        ========================= */

        .js-back-top{

            position:fixed;

            right:25px;
            bottom:25px;

            width:48px;
            height:48px;

            display:flex;

            align-items:center;
            justify-content:center;

            border:
                1px solid
                rgba(0,229,255,.45);

            border-radius:50%;

            background:
                rgba(3,12,25,.88);

            color:#00e5ff;

            font-size:22px;
            font-weight:900;

            cursor:pointer;

            opacity:0;
            visibility:hidden;

            transform:
                translateY(15px)
                scale(.8);

            transition:.35s ease;

            z-index:9998;

            box-shadow:
                0 0 15px
                rgba(0,229,255,.20);

        }


        .js-back-top.show{

            opacity:1;
            visibility:visible;

            transform:
                translateY(0)
                scale(1);

        }


        .js-back-top:hover{

            color:#fff;

            background:
                linear-gradient(
                    135deg,
                    #00e5ff,
                    #7c4dff
                );

            border-color:#00e5ff;

            box-shadow:
                0 0 20px
                rgba(0,229,255,.65);

            transform:
                translateY(-5px)
                scale(1.05);

        }


        /* =========================
           PARTICLES
        ========================= */

        .js-particle-container{

            position:fixed;

            inset:0;

            z-index:-1;

            pointer-events:none;

            overflow:hidden;

        }


        .js-particle{

            position:absolute;

            display:block;

            border-radius:50%;

            background:#00e5ff;

            box-shadow:
                0 0 7px #00e5ff,
                0 0 15px
                rgba(0,229,255,.45);

            animation:
                adcaParticle
                linear infinite;

        }


        @keyframes adcaParticle{

            0%{

                transform:
                    translateY(40px)
                    scale(.5);

                opacity:0;

            }

            25%{
                opacity:.7;
            }

            50%{

                transform:
                    translateY(-60px)
                    scale(1);

            }

            80%{
                opacity:.45;
            }

            100%{

                transform:
                    translateY(-150px)
                    scale(.3);

                opacity:0;

            }

        }


        /* =========================
           CURSOR GLOW
        ========================= */

        .js-cursor-glow{

            position:fixed;

            top:-90px;
            left:-90px;

            width:180px;
            height:180px;

            border-radius:50%;

            background:
                radial-gradient(
                    circle,
                    rgba(0,229,255,.13),
                    transparent 68%
                );

            pointer-events:none;

            z-index:9997;

            mix-blend-mode:screen;

        }


        /* =========================
           HEADER SCROLL
        ========================= */

        .course-header.scrolled{

            box-shadow:
                0 12px 40px
                rgba(0,0,0,.55),

                0 0 25px
                rgba(0,229,255,.12);

        }


        /* =========================
           MENU ANIMATION
        ========================= */

        .menu-btn{

            transition:
                transform .3s ease,
                box-shadow .3s ease;

        }


        .menu-btn.menu-open{

            transform:
                rotate(90deg);

            box-shadow:
                0 0 18px
                rgba(0,229,255,.45);

        }


        /* =========================
           PAGE LOAD
        ========================= */

        .adca-page-loaded
        .course-hero .hero-content{

            animation:
                adcaHeroIn
                1s
                cubic-bezier(.2,.8,.2,1)
                both;

        }


        @keyframes adcaHeroIn{

            from{

                opacity:0;

                transform:
                    translateY(30px)
                    scale(.97);

            }

            to{

                opacity:1;

                transform:
                    translateY(0)
                    scale(1);

            }

        }


        /* =========================
           REDUCED MOTION
        ========================= */

        @media(
            prefers-reduced-motion:reduce
        ){

            .js-particle,
            .js-cursor-glow{

                display:none;

            }

            .js-reveal{

                opacity:1;

                transform:none;

                transition:none;

            }

        }


        /* =========================
           MOBILE
        ========================= */

        @media(max-width:760px){

            .js-back-top{

                right:16px;
                bottom:16px;

                width:44px;
                height:44px;

            }

        }

    `;


    document.head.appendChild(
        style
    );

}