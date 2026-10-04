/* =========================================================
   CM COMPUTER CENTRE
   SERVICES.JS — PRO LEVEL
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PAGE LOADER
    ===================================================== */

    const loader = document.getElementById("pageLoader");

    function hideLoader() {
        if (loader) {
            loader.classList.add("hide");
        }
    }

    window.addEventListener("load", () => {
        setTimeout(hideLoader, 600);
    });

    setTimeout(hideLoader, 2500);


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const nav = document.getElementById("servicesNav");

    if (menuBtn && nav) {

        menuBtn.addEventListener("click", (e) => {

            e.stopPropagation();

            nav.classList.toggle("open");
            menuBtn.classList.toggle("open");

        });


        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("open");
                menuBtn.classList.remove("open");

            });

        });


        document.addEventListener("click", (e) => {

            if (
                nav.classList.contains("open") &&
                !nav.contains(e.target) &&
                !menuBtn.contains(e.target)
            ) {

                nav.classList.remove("open");
                menuBtn.classList.remove("open");

            }

        });

    }


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    const header =
        document.querySelector(".services-header");

    function headerScroll() {

        if (!header) return;

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener("scroll", headerScroll);

    headerScroll();


    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

    const scrollProgress =
        document.getElementById("scrollProgress");

    function updateProgress() {

        if (!scrollProgress) return;

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        if (documentHeight <= 0) {

            scrollProgress.style.width = "0%";

            return;
        }

        const progress =
            (scrollTop / documentHeight) * 100;

        scrollProgress.style.width =
            Math.min(progress, 100) + "%";

    }

    window.addEventListener("scroll", updateProgress);

    updateProgress();


    /* =====================================================
       INDIA IST CLOCK
    ===================================================== */

    const indiaTime =
        document.getElementById("indiaTime");

    const indiaDate =
        document.getElementById("indiaDate");


    function updateIndiaClock() {

        const now = new Date();


        if (indiaTime) {

            const time =
                new Intl.DateTimeFormat("en-IN", {

                    timeZone: "Asia/Kolkata",

                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",

                    hour12: true

                }).format(now);

            indiaTime.textContent = time;

        }


        if (indiaDate) {

            const date =
                new Intl.DateTimeFormat("en-IN", {

                    timeZone: "Asia/Kolkata",

                    weekday: "long",

                    day: "2-digit",

                    month: "long",

                    year: "numeric"

                }).format(now);

            indiaDate.textContent = date;

        }

    }


    updateIndiaClock();

    setInterval(updateIndiaClock, 1000);


    /* =====================================================
       SCROLL TO TOP BUTTON
    ===================================================== */

    const topButton =
        document.getElementById("topButton");


    function toggleTopButton() {

        if (!topButton) return;


        if (window.scrollY > 500) {

            topButton.classList.add("show");

        } else {

            topButton.classList.remove("show");

        }

    }


    window.addEventListener(
        "scroll",
        toggleTopButton
    );


    toggleTopButton();


    if (topButton) {

        topButton.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }


    /* =====================================================
       REVEAL ANIMATION
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(

                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("show");

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

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("show");

        });

    }


    /* =====================================================
       IMAGE LAZY LOAD
    ===================================================== */

    document.querySelectorAll("img").forEach(img => {

        if (!img.hasAttribute("loading")) {

            img.setAttribute(
                "loading",
                "lazy"
            );

        }

    });


    /* =====================================================
       IMAGE ERROR HANDLING
    ===================================================== */

    document.querySelectorAll("img").forEach(img => {

        img.addEventListener("error", function () {

            this.style.opacity = "0.35";

            this.style.filter =
                "grayscale(1)";

        });

    });


    /* =====================================================
       BUTTON RIPPLE EFFECT
    ===================================================== */

    const rippleButtons =
        document.querySelectorAll(
            ".primary-btn, .secondary-btn, .test-item"
        );


    rippleButtons.forEach(button => {

        button.addEventListener(
            "click",
            function (event) {

                const ripple =
                    document.createElement("span");

                ripple.classList.add("ripple");


                const rect =
                    this.getBoundingClientRect();


                const size =
                    Math.max(
                        rect.width,
                        rect.height
                    );


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

                }, 650);

            }
        );

    });


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute("href");


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


                    if (!target) return;


                    event.preventDefault();


                    target.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });

                }
            );

        });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    document
        .querySelectorAll(".services-nav a")
        .forEach(link => {

            const href =
                link.getAttribute("href");


            if (!href) return;


            const linkPage =
                href
                    .split("/")
                    .pop()
                    .toLowerCase();


            if (
                linkPage === currentPage ||
                (
                    currentPage === "" &&
                    linkPage === "index.html"
                )
            ) {

                link.classList.add("active");

            }

        });


    /* =====================================================
       MONTHLY TEST / RESULT SYSTEM
       2018 → 2026
    ===================================================== */

    const testYear =
        document.getElementById("testYear");


    const testList =
        document.getElementById("testList");


    const selectedYearTitle =
        document.getElementById(
            "selectedYearTitle"
        );


    const months = [

        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"

    ];


    /* =====================================================
       OPEN MONTHLY RESULT
    ===================================================== */

    function openMonthlyResult(year, month) {

        const resultPage =
            "monthly result.html" +
            "?year=" +
            encodeURIComponent(year) +
            "&month=" +
            encodeURIComponent(month);


        console.log(
            "Opening Monthly result:",
            resultPage
        );


        window.location.href =
            resultPage;

    }


    /* =====================================================
       CREATE MONTHLY TEST LIST
    ===================================================== */

    function showMonthlyTests(year) {

        if (!testList) return;


        /* YEAR TITLE */

        if (selectedYearTitle) {

            selectedYearTitle.textContent =
                "Monthly Tests " + year;

        }


        /* CLEAR OLD LIST */

        testList.innerHTML = "";


        /* CREATE ALL 12 MONTHS */

        months.forEach(month => {


            /*
               IMPORTANT:

               <a> use kiya gaya hai instead of button
               taaki JavaScript event fail hone par bhi
               browser normal link navigation kare.
            */

            const link =
                document.createElement("a");


            link.href =
                "monthly result.html" +
                "?year=" +
                encodeURIComponent(year) +
                "&month=" +
                encodeURIComponent(month);


            link.className =
                "test-item";


            link.innerHTML = `

                <span>
                    ${month} ${year}
                </span>

                <span>
                    View →
                </span>

            `;


            /* RIPPLE */

            link.addEventListener(
                "click",
                function (event) {

                    const ripple =
                        document.createElement("span");

                    ripple.classList.add("ripple");


                    const rect =
                        this.getBoundingClientRect();


                    const size =
                        Math.max(
                            rect.width,
                            rect.height
                        );


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

                    }, 650);


                    console.log(
                        "Monthly Result View:",
                        year,
                        month
                    );

                }
            );


            testList.appendChild(link);

        });

    }


    /* =====================================================
       YEAR DROPDOWN
    ===================================================== */

    if (testYear) {


        /* FIRST LOAD */

        showMonthlyTests(
            testYear.value
        );


        /* YEAR CHANGE */

        testYear.addEventListener(
            "change",
            () => {

                showMonthlyTests(
                    testYear.value
                );

            }
        );

    }


    /* =====================================================
       GENERIC SLIDER
    ===================================================== */

    function createSlider(options) {

        const {
            trackId,
            prevId,
            nextId,
            desktopView,
            tabletView,
            mobileView,
            autoPlayTime = 4000
        } = options;


        const track =
            document.getElementById(
                trackId
            );


        const prev =
            document.getElementById(
                prevId
            );


        const next =
            document.getElementById(
                nextId
            );


        if (!track) return;


        const slides =
            Array.from(
                track.children
            );


        if (slides.length === 0) return;


        let currentIndex = 0;

        let perView =
            desktopView;

        let timer = null;


        /* =========================================
           RESPONSIVE VIEW
        ========================================= */

        function getPerView() {

            const width =
                window.innerWidth;


            if (width <= 480) {

                return mobileView;

            }


            if (width <= 1100) {

                return tabletView;

            }


            return desktopView;

        }


        /* =========================================
           UPDATE PER VIEW
        ========================================= */

        function updatePerView() {

            perView =
                getPerView();


            slides.forEach(slide => {

                slide.style.flex =
                    `0 0 ${100 / perView}%`;

            });

        }


        /* =========================================
           MAX INDEX
        ========================================= */

        function getMaxIndex() {

            return Math.max(
                0,
                slides.length - perView
            );

        }


        /* =========================================
           UPDATE SLIDER
        ========================================= */

        function updateSlider() {

            const maxIndex =
                getMaxIndex();


            if (
                currentIndex >
                maxIndex
            ) {

                currentIndex =
                    maxIndex;

            }


            if (currentIndex < 0) {

                currentIndex = 0;

            }


            const move =
                (100 / perView) *
                currentIndex;


            track.style.transform =
                `translateX(-${move}%)`;

        }


        /* =========================================
           NEXT
        ========================================= */

        function nextSlide() {

            const maxIndex =
                getMaxIndex();


            if (maxIndex <= 0) return;


            currentIndex++;


            if (
                currentIndex >
                maxIndex
            ) {

                currentIndex = 0;

            }


            updateSlider();

        }


        /* =========================================
           PREVIOUS
        ========================================= */

        function prevSlide() {

            const maxIndex =
                getMaxIndex();


            if (maxIndex <= 0) return;


            currentIndex--;


            if (currentIndex < 0) {

                currentIndex =
                    maxIndex;

            }


            updateSlider();

        }


        /* =========================================
           AUTOPLAY
        ========================================= */

        function startAutoPlay() {

            stopAutoPlay();


            if (
                slides.length <=
                perView
            ) {

                return;

            }


            timer =
                setInterval(
                    nextSlide,
                    autoPlayTime
                );

        }


        /* =========================================
           STOP AUTOPLAY
        ========================================= */

        function stopAutoPlay() {

            if (timer) {

                clearInterval(timer);

                timer = null;

            }

        }


        /* =========================================
           NEXT BUTTON
        ========================================= */

        if (next) {

            next.addEventListener(
                "click",
                () => {

                    nextSlide();

                    startAutoPlay();

                }
            );

        }


        /* =========================================
           PREVIOUS BUTTON
        ========================================= */

        if (prev) {

            prev.addEventListener(
                "click",
                () => {

                    prevSlide();

                    startAutoPlay();

                }
            );

        }


        /* =========================================
           MOUSE HOVER
        ========================================= */

        track.addEventListener(
            "mouseenter",
            stopAutoPlay
        );


        track.addEventListener(
            "mouseleave",
            startAutoPlay
        );


        /* =========================================
           MOBILE TOUCH
        ========================================= */

        let touchStartX = 0;

        let touchEndX = 0;


        track.addEventListener(
            "touchstart",
            event => {

                touchStartX =
                    event
                        .changedTouches[0]
                        .screenX;


                stopAutoPlay();

            },
            {
                passive: true
            }
        );


        track.addEventListener(
            "touchend",
            event => {

                touchEndX =
                    event
                        .changedTouches[0]
                        .screenX;


                const difference =
                    touchStartX -
                    touchEndX;


                if (
                    Math.abs(
                        difference
                    ) > 50
                ) {

                    if (
                        difference > 0
                    ) {

                        nextSlide();

                    } else {

                        prevSlide();

                    }

                }


                startAutoPlay();

            },
            {
                passive: true
            }
        );


        /* =========================================
           WINDOW RESIZE
        ========================================= */

        window.addEventListener(
            "resize",
            () => {

                updatePerView();

                currentIndex = 0;

                updateSlider();

                startAutoPlay();

            }
        );


        /* =========================================
           INITIALIZE
        ========================================= */

        updatePerView();

        updateSlider();

        startAutoPlay();

    }


    /* =====================================================
       JOB SLIDER
    ===================================================== */

    createSlider({

        trackId: "jobTrack",

        prevId: "jobPrev",

        nextId: "jobNext",

        desktopView: 3,

        tabletView: 2,

        mobileView: 1,

        autoPlayTime: 3500

    });


    /* =====================================================
       RECENTLY JOINED STUDENTS
    ===================================================== */

    createSlider({

        trackId: "studentTrack",

        prevId: "studentPrev",

        nextId: "studentNext",

        desktopView: 4,

        tabletView: 3,

        mobileView: 1,

        autoPlayTime: 3800

    });


    /* =====================================================
       HAPPY CLIENT SLIDER
    ===================================================== */

    createSlider({

        trackId: "clientTrack",

        prevId: "clientPrev",

        nextId: "clientNext",

        desktopView: 4,

        tabletView: 3,

        mobileView: 1,

        autoPlayTime: 4200

    });


    /* =====================================================
       CARD 3D TILT
    ===================================================== */

    const tiltCards =
        document.querySelectorAll(

            ".service-card, " +
            ".facility-card, " +
            ".course-card, " +
            ".team-card, " +
            ".job-slide, " +
            ".student-card, " +
            ".client-card"

        );


    if (
        window.matchMedia(
            "(pointer:fine)"
        ).matches
    ) {

        tiltCards.forEach(card => {


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
                        (
                            (y - centerY) /
                            centerY
                        ) * -3;


                    const rotateY =
                        (
                            (x - centerX) /
                            centerX
                        ) * 3;


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
       CURSOR GLOW
    ===================================================== */

    let cursorGlow =
        document.querySelector(
            ".cursor-glow"
        );


    if (
        !cursorGlow &&
        window.matchMedia(
            "(pointer:fine)"
        ).matches
    ) {

        cursorGlow =
            document.createElement(
                "div"
            );


        cursorGlow.className =
            "cursor-glow";


        document.body.appendChild(
            cursorGlow
        );


        Object.assign(
            cursorGlow.style,
            {

                position: "fixed",

                width: "220px",

                height: "220px",

                borderRadius: "50%",

                pointerEvents: "none",

                zIndex: "9999",

                transform:
                    "translate(-50%, -50%)",

                background:
                    "radial-gradient(circle, rgba(0,234,255,.10), transparent 65%)",

                filter: "blur(5px)"

            }
        );


        document.addEventListener(
            "mousemove",
            event => {

                cursorGlow.style.left =
                    event.clientX + "px";


                cursorGlow.style.top =
                    event.clientY + "px";

            }
        );

    }


    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (reducedMotion) {

        document
            .querySelectorAll(".reveal")
            .forEach(element => {

                element.classList.add(
                    "show"
                );

            });

    }


    /* =====================================================
       CONSOLE BRANDING
    ===================================================== */

    console.log(
        "%c CM COMPUTER CENTRE ",
        "background:#00eaff;" +
        "color:#00111c;" +
        "font-size:18px;" +
        "font-weight:bold;" +
        "padding:8px 14px;" +
        "border-radius:8px;"
    );


    console.log(
        "%c Services Page Loaded Successfully ✓ ",
        "color:#00eaff;" +
        "font-size:14px;" +
        "font-weight:bold;"
    );


    console.log(
        "%c Monthly Result System Ready ✓ ",
        "color:#00ff88;" +
        "font-size:14px;" +
        "font-weight:bold;"
    );

});