document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       PAGE LOADER
    ===================================================== */

    const pageLoader = document.getElementById("pageLoader");

    window.addEventListener("load", function () {

        setTimeout(function () {

            if (pageLoader) {
                pageLoader.style.opacity = "0";
                pageLoader.style.visibility = "hidden";
                pageLoader.style.pointerEvents = "none";
            }

        }, 500);

    });


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const galleryNav = document.getElementById("galleryNav");

    if (menuBtn && galleryNav) {

        menuBtn.addEventListener("click", function () {

            galleryNav.classList.toggle("open");

        });


        const navLinks = galleryNav.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {
                galleryNav.classList.remove("open");
            });

        });

    }


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =====================================================
       SCROLL TO TOP
    ===================================================== */

    const topButton = document.getElementById("topButton");

    if (topButton) {

        topButton.style.opacity = "0";
        topButton.style.visibility = "hidden";

        window.addEventListener("scroll", function () {

            if (window.scrollY > 500) {

                topButton.style.opacity = "1";
                topButton.style.visibility = "visible";

            } else {

                topButton.style.opacity = "0";
                topButton.style.visibility = "hidden";

            }

        });


        topButton.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       REVEAL ANIMATION
    ===================================================== */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(function (element) {
            element.classList.add("show");
        });

    }


    /* =====================================================
       IMAGE ERROR HANDLING
    ===================================================== */

    const galleryImages = document.querySelectorAll(".gallery-card img");

    galleryImages.forEach(function (img) {

        img.addEventListener("error", function () {

            img.style.opacity = "0.25";

            img.parentElement.style.background =
                "linear-gradient(135deg,#07101e,#101b31)";

        });

    });


    /* =====================================================
       SLIDER FUNCTION
    ===================================================== */

    function createSlider(sliderId, prevId, nextId) {

        const slider = document.getElementById(sliderId);
        const prevBtn = document.getElementById(prevId);
        const nextBtn = document.getElementById(nextId);

        if (!slider) return;


        function getScrollAmount() {

            const card = slider.querySelector(".gallery-card");

            if (!card) {
                return slider.clientWidth * 0.85;
            }

            const cardStyle = window.getComputedStyle(card);
            const marginRight = parseFloat(cardStyle.marginRight) || 0;

            return card.offsetWidth + 22 + marginRight;

        }


        if (nextBtn) {

            nextBtn.addEventListener("click", function () {

                slider.scrollBy({
                    left: getScrollAmount(),
                    behavior: "smooth"
                });

            });

        }


        if (prevBtn) {

            prevBtn.addEventListener("click", function () {

                slider.scrollBy({
                    left: -getScrollAmount(),
                    behavior: "smooth"
                });

            });

        }

    }


    /* =====================================================
       THREE GALLERY SLIDERS
    ===================================================== */

    createSlider(
        "officeSlider",
        "officePrev",
        "officeNext"
    );


    createSlider(
        "teacherSlider",
        "teacherPrev",
        "teacherNext"
    );


    createSlider(
        "augustSlider",
        "augustPrev",
        "augustNext"
    );


    /* =====================================================
       LIGHTBOX
    ===================================================== */

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxTitle = document.getElementById("lightboxTitle");
    const lightboxText = document.getElementById("lightboxText");

    const lightboxClose = document.getElementById("lightboxClose");
    const lightboxPrev = document.getElementById("lightboxPrev");
    const lightboxNext = document.getElementById("lightboxNext");


    let currentImageIndex = 0;
    let galleryItems = [];


    /* =====================================================
       COLLECT ALL PHOTOS
    ===================================================== */

    const allCards = document.querySelectorAll(".gallery-card");

    allCards.forEach(function (card) {

        const image = card.querySelector("img");
        const title = card.querySelector("h3");
        const text = card.querySelector("p");

        if (!image) return;

        galleryItems.push({

            src: image.src,

            title: title
                ? title.textContent.trim()
                : "Gallery Photo",

            text: text
                ? text.textContent.trim()
                : "CM Computer Centre"

        });

    });


    /* =====================================================
       OPEN LIGHTBOX
    ===================================================== */

    function openLightbox(index) {

        if (!lightbox || !lightboxImage) return;

        if (!galleryItems.length) return;

        currentImageIndex = index;

        const item = galleryItems[currentImageIndex];

        lightboxImage.src = item.src;

        if (lightboxTitle) {
            lightboxTitle.textContent = item.title;
        }

        if (lightboxText) {
            lightboxText.textContent = item.text;
        }

        lightbox.classList.add("show");

        document.body.style.overflow = "hidden";

    }


    /* =====================================================
       CLOSE LIGHTBOX
    ===================================================== */

    function closeLightbox() {

        if (!lightbox) return;

        lightbox.classList.remove("show");

        document.body.style.overflow = "";

    }


    /* =====================================================
       SHOW PREVIOUS PHOTO
    ===================================================== */

    function showPreviousPhoto() {

        if (!galleryItems.length) return;

        currentImageIndex--;

        if (currentImageIndex < 0) {
            currentImageIndex = galleryItems.length - 1;
        }

        openLightbox(currentImageIndex);

    }


    /* =====================================================
       SHOW NEXT PHOTO
    ===================================================== */

    function showNextPhoto() {

        if (!galleryItems.length) return;

        currentImageIndex++;

        if (currentImageIndex >= galleryItems.length) {
            currentImageIndex = 0;
        }

        openLightbox(currentImageIndex);

    }


    /* =====================================================
       PHOTO CLICK
    ===================================================== */

    allCards.forEach(function (card, index) {

        const photoBox = card.querySelector(".photo-box");

        if (!photoBox) return;

        photoBox.style.cursor = "pointer";

        photoBox.addEventListener("click", function () {

            openLightbox(index);

        });

    });


    /* =====================================================
       LIGHTBOX BUTTONS
    ===================================================== */

    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (lightboxPrev) {

        lightboxPrev.addEventListener(
            "click",
            showPreviousPhoto
        );

    }


    if (lightboxNext) {

        lightboxNext.addEventListener(
            "click",
            showNextPhoto
        );

    }


    /* =====================================================
       CLICK OUTSIDE IMAGE
    ===================================================== */

    if (lightbox) {

        lightbox.addEventListener("click", function (event) {

            if (event.target === lightbox) {
                closeLightbox();
            }

        });

    }


    /* =====================================================
       KEYBOARD CONTROLS
    ===================================================== */

    document.addEventListener("keydown", function (event) {

        if (!lightbox || !lightbox.classList.contains("show")) {
            return;
        }


        if (event.key === "Escape") {

            closeLightbox();

        }


        if (event.key === "ArrowLeft") {

            showPreviousPhoto();

        }


        if (event.key === "ArrowRight") {

            showNextPhoto();

        }

    });


    /* =====================================================
       CURSOR GLOW
    ===================================================== */

    const cursorGlow = document.getElementById("cursorGlow");

    if (cursorGlow &&
        window.matchMedia("(pointer: fine)").matches) {

        window.addEventListener("mousemove", function (event) {

            cursorGlow.style.left = event.clientX + "px";
            cursorGlow.style.top = event.clientY + "px";

        });

    } else if (cursorGlow) {

        cursorGlow.style.display = "none";

    }


    /* =====================================================
       NAV ACTIVE STATE
    ===================================================== */

    const navLinks = document.querySelectorAll(".gallery-nav a");

    navLinks.forEach(function (link) {

        const linkPage =
            link.getAttribute("href");

        if (linkPage === "gallery.html") {

            link.classList.add("active");

        }

    });


    /* =====================================================
       ESCAPE MOBILE MENU
    ===================================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            if (galleryNav) {
                galleryNav.classList.remove("open");
            }

        }

    });


    /* =====================================================
       CONSOLE BRANDING
    ===================================================== */

    console.log(
        "%c CM COMPUTER CENTRE ",
        "background:#00eaff;color:#03101d;padding:8px 14px;border-radius:6px;font-weight:800;"
    );

    console.log(
        "%c Gallery System Loaded Successfully ✔ ",
        "color:#00eaff;font-weight:bold;"
    );

});