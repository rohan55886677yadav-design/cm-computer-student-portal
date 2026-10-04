/* =========================================================
   CM COMPUTER CENTRE
   CONTACT PAGE — PRO LEVEL JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ELEMENTS
    ========================= */

    const loader = document.getElementById("pageLoader");
    const menuBtn = document.getElementById("menuBtn");
    const nav = document.querySelector(".contact-nav");
    const header = document.querySelector(".contact-header");

    const form = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const mobileInput = document.getElementById("mobile");
    const emailInput = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");

    const formMessage = document.getElementById("formMessage");
    const topButton = document.getElementById("topButton");

    /* =========================
       PAGE LOADER
    ========================= */

    function hideLoader() {
        if (!loader) return;

        loader.classList.add("hide");

        setTimeout(() => {
            loader.style.display = "none";
        }, 600);
    }

    window.addEventListener("load", hideLoader);

    setTimeout(hideLoader, 3000);


    /* =========================
       MOBILE MENU
    ========================= */

    if (menuBtn && nav) {

        menuBtn.addEventListener("click", () => {

            nav.classList.toggle("active");
            menuBtn.classList.toggle("active");

        });

        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("active");
                menuBtn.classList.remove("active");

            });

        });
    }


    /* =========================
       ESCAPE KEY
    ========================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            if (nav) {
                nav.classList.remove("active");
            }

            if (menuBtn) {
                menuBtn.classList.remove("active");
            }

        }

    });


    /* =========================
       HEADER SCROLL EFFECT
    ========================= */

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


    /* =========================
       CURRENT YEAR
    ========================= */

    const yearElements = document.querySelectorAll(".current-year");

    yearElements.forEach(element => {
        element.textContent = new Date().getFullYear();
    });


    /* =========================
       MOBILE NUMBER
       ONLY 10 DIGITS
    ========================= */

    if (mobileInput) {

        mobileInput.addEventListener("input", () => {

            let value = mobileInput.value.replace(/\D/g, "");

            if (value.length > 10) {
                value = value.substring(0, 10);
            }

            mobileInput.value = value;

        });

    }


    /* =========================
       NAME CLEANING
    ========================= */

    if (nameInput) {

        nameInput.addEventListener("input", () => {

            nameInput.value = nameInput.value
                .replace(/[0-9]/g, "")
                .replace(/\s{2,}/g, " ");

        });

    }


    /* =========================
       SUBJECT DROPDOWN
    ========================= */

    if (subjectInput) {

        subjectInput.addEventListener("change", () => {

            subjectInput.classList.remove("error");

            if (subjectInput.value !== "") {

                subjectInput.style.borderColor = "#00eaff";

            } else {

                subjectInput.style.borderColor = "";

            }

        });

    }


    /* =========================
       FORM MESSAGE
    ========================= */

    function showFormMessage(text, type) {

        if (!formMessage) return;

        formMessage.textContent = text;

        formMessage.className = "form-message " + type;

        formMessage.style.display = "block";

        setTimeout(() => {

            formMessage.style.opacity = "0";

            setTimeout(() => {

                formMessage.style.display = "none";
                formMessage.style.opacity = "1";

            }, 400);

        }, 5000);

    }


    /* =========================
       INPUT ERROR
    ========================= */

    function showError(input, message) {

        if (!input) return;

        input.classList.add("error");

        input.style.borderColor = "#ff3b6b";

        input.focus();

        showFormMessage(message, "error");

    }


    /* =========================
       REMOVE ERROR
    ========================= */

    function clearError(input) {

        if (!input) return;

        input.classList.remove("error");

        input.style.borderColor = "";

    }


    /* =========================
       FORM SUBMIT
    ========================= */

    if (form) {

        form.addEventListener("submit", event => {

            event.preventDefault();


            /* CLEAR OLD ERRORS */

            [
                nameInput,
                mobileInput,
                emailInput,
                subjectInput,
                messageInput
            ].forEach(clearError);


            /* GET VALUES */

            const name = nameInput
                ? nameInput.value.trim()
                : "";

            const mobile = mobileInput
                ? mobileInput.value.trim()
                : "";

            const email = emailInput
                ? emailInput.value.trim()
                : "";

            const subject = subjectInput
                ? subjectInput.value.trim()
                : "";

            const message = messageInput
                ? messageInput.value.trim()
                : "";


            /* =========================
               VALIDATION
            ========================= */

            if (name.length < 2) {

                showError(
                    nameInput,
                    "Please enter your full name."
                );

                return;
            }


            if (!/^[6-9]\d{9}$/.test(mobile)) {

                showError(
                    mobileInput,
                    "Please enter a valid 10-digit mobile number."
                );

                return;
            }


            if (email !== "") {

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailPattern.test(email)) {

                    showError(
                        emailInput,
                        "Please enter a valid email address."
                    );

                    return;
                }

            }


            if (subject === "") {

                showError(
                    subjectInput,
                    "Please select a subject."
                );

                return;
            }


            if (message.length < 5) {

                showError(
                    messageInput,
                    "Please enter your message."
                );

                return;
            }


            /* =========================
               FORM DATA
            ========================= */

            const contactData = {

                name: name,

                mobile: mobile,

                email: email,

                subject: subject,

                message: message,

                date: new Date().toLocaleString("en-IN"),

                read: false

            };


            /* =========================
               SAVE DEMO MESSAGE
            ========================= */

            let messages = [];

            try {

                const savedMessages =
                    localStorage.getItem("cmContactMessages");

                if (savedMessages) {

                    messages = JSON.parse(savedMessages);

                }

            } catch (error) {

                console.error(
                    "Message data error:",
                    error
                );

                messages = [];

            }


            messages.push(contactData);


            localStorage.setItem(
                "cmContactMessages",
                JSON.stringify(messages)
            );


            /* =========================
               SUCCESS
            ========================= */

            showFormMessage(
                "✅ Your message has been sent successfully!",
                "success"
            );


            /* =========================
               BUTTON LOADING
            ========================= */

            const submitButton =
                form.querySelector("button[type='submit']");

            if (submitButton) {

                const oldText =
                    submitButton.innerHTML;

                submitButton.innerHTML =
                    "✓ Message Sent";

                submitButton.disabled = true;

                setTimeout(() => {

                    submitButton.innerHTML = oldText;

                    submitButton.disabled = false;

                }, 2500);

            }


            /* =========================
               RESET FORM
            ========================= */

            form.reset();

            if (subjectInput) {
                subjectInput.style.borderColor = "";
            }

        });

    }


    /* =========================
       TOP BUTTON
    ========================= */

    if (topButton) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 400) {

                topButton.classList.add("show");

            } else {

                topButton.classList.remove("show");

            }

        });


        topButton.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behaviour: "smooth"
            });

        });

    }


    /* =========================
       REVEAL ANIMATION
    ========================= */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("visible");

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


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /* =========================
       SMOOTH INTERNAL LINKS
    ========================= */

    document.querySelectorAll("a[href^='#']").forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behaviour: "smooth",
                block: "start"
            });

        });

    });


    /* =========================
       CURSOR GLOW
    ========================= */

    const cursorGlow =
        document.getElementById("cursorGlow");


    if (
        cursorGlow &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        window.addEventListener("mousemove", event => {

            cursorGlow.style.left =
                event.clientX + "px";

            cursorGlow.style.top =
                event.clientY + "px";

        });

    }


    /* =========================
       IMAGE ERROR HANDLING
    ========================= */

    document.querySelectorAll("img").forEach(image => {

        image.addEventListener("error", () => {

            console.warn(
                "Image could not be loaded:",
                image.src
            );

        });

    });


    /* =========================
       REDUCED MOTION
    ========================= */

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        document.documentElement.classList.add(
            "reduce-motion"
        );

    }


    /* =========================
       CONSOLE BRANDING
    ========================= */

    console.log(
        "%cCM COMPUTER CENTRE",
        "font-size:20px;font-weight:bold;color:#00eaff;"
    );

    console.log(
        "%cContact System Loaded Successfully",
        "font-size:13px;color:#7c3aed;"
    );

});