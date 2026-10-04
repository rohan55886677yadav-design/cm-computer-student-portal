/* =========================================================
   CM COMPUTER CENTRE
   PROFESSIONAL LOGIN JAVASCRIPT
   OTP + PHOTO + ACCOUNT-WISE PHOTO + PASSWORD
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const loginForm =
        document.getElementById("loginForm");

    const nameInput =
        document.getElementById("name");

    const emailInput =
        document.getElementById("email");

    const mobileInput =
        document.getElementById("mobile");

    const otpSection =
        document.getElementById("otpSection");

    const otpInput =
        document.getElementById("otp");

    const otpHint =
        document.getElementById("otpHint");

    const verifyOtpBtn =
        document.getElementById("verifyOtpBtn");

    const photoSection =
        document.getElementById("photoSection");

    const studentPhotoInput =
        document.getElementById("studentPhotoInput");

    const photoPreview =
        document.getElementById("photoPreview");

    const photoHint =
        document.getElementById("photoHint");

    const passwordSection =
        document.getElementById("passwordSection");

    const passwordInput =
        document.getElementById("password");

    const confirmPasswordInput =
        document.getElementById("confirmPassword");

    const passwordEye =
        document.getElementById("passwordEye");

    const confirmEye =
        document.getElementById("confirmEye");


    /* =====================================================
       VARIABLES
    ===================================================== */

    let generatedOTP = "";
    let otpVerified = false;
    let photoData = "";


    /* =====================================================
       ACCOUNT KEY
       Email + Mobile se unique account identify hoga
    ===================================================== */

    function getAccountKey() {

        const email =
            emailInput.value
                .trim()
                .toLowerCase();

        const mobile =
            mobileInput.value.trim();

        return (
            "cmAccount_" +
            email +
            "_" +
            mobile
        );
    }


    /* =====================================================
       MOBILE NUMBER
    ===================================================== */

    mobileInput.addEventListener(
        "input",
        function () {

            this.value =
                this.value.replace(
                    /[^0-9]/g,
                    ""
                );

            this.value =
                this.value.slice(0, 10);


            otpVerified = false;

            photoData = "";


            otpSection.classList.remove(
                "show"
            );

            photoSection.classList.remove(
                "show"
            );

            passwordSection.classList.remove(
                "show"
            );


            photoPreview.style.display =
                "none";

            photoPreview.src = "";

            studentPhotoInput.value = "";


            verifyOtpBtn.disabled =
                false;

            verifyOtpBtn.textContent =
                "VERIFY OTP ✓";


            if (this.value.length === 10) {

                otpSection.classList.add(
                    "show"
                );

                generateOTP();

            } else {

                generatedOTP = "";

                otpInput.value = "";

                otpHint.textContent = "";

            }

        }
    );


    /* =====================================================
       GENERATE OTP
    ===================================================== */

    function generateOTP() {

        generatedOTP =
            Math.floor(
                100000 +
                Math.random() * 900000
            ).toString();


        /*
           DEMO OTP

           Real website mein backend
           SMS / Email OTP system use hoga.
        */

        otpHint.textContent =
            "Demo OTP: " +
            generatedOTP;

        otpHint.style.color =
            "#00e676";


        otpInput.value = "";

        otpVerified = false;

        photoSection.classList.remove(
            "show"
        );

        passwordSection.classList.remove(
            "show"
        );


        verifyOtpBtn.disabled =
            false;

        verifyOtpBtn.textContent =
            "VERIFY OTP ✓";


        setTimeout(() => {

            otpInput.focus();

        }, 150);

    }


    /* =====================================================
       OTP INPUT
    ===================================================== */

    otpInput.addEventListener(
        "input",
        function () {

            this.value =
                this.value.replace(
                    /[^0-9]/g,
                    ""
                );

            this.value =
                this.value.slice(0, 6);


            if (
                this.value.length === 6
            ) {

                verifyOTP();

            }

        }
    );


    /* =====================================================
       VERIFY BUTTON
    ===================================================== */

    verifyOtpBtn.addEventListener(
        "click",
        verifyOTP
    );


    /* =====================================================
       VERIFY OTP
    ===================================================== */

    function verifyOTP() {

        if (
            otpInput.value.length !== 6
        ) {

            otpHint.textContent =
                "Please enter the 6-digit OTP.";

            otpHint.style.color =
                "#ff1744";

            otpInput.focus();

            return;

        }


        if (
            otpInput.value ===
            generatedOTP
        ) {

            otpVerified = true;


            otpHint.textContent =
                "✓ OTP Verified Successfully";

            otpHint.style.color =
                "#00e676";


            verifyOtpBtn.textContent =
                "✓ OTP VERIFIED";

            verifyOtpBtn.disabled =
                true;


            /* =========================
               SHOW PHOTO SECTION
            ========================= */

            photoSection.classList.add(
                "show"
            );


            setTimeout(() => {

                studentPhotoInput.focus();

            }, 300);

        }

        else {

            otpVerified = false;

            otpHint.textContent =
                "✕ Incorrect OTP. Try again.";

            otpHint.style.color =
                "#ff1744";


            otpInput.value = "";

            otpInput.focus();

        }

    }


    /* =====================================================
       PHOTO SELECT
    ===================================================== */

    studentPhotoInput.addEventListener(
        "change",
        function () {

            const file =
                this.files[0];


            if (!file) {

                return;

            }


            /* IMAGE CHECK */

            if (
                !file.type.startsWith(
                    "image/"
                )
            ) {

                alert(
                    "Please select a valid image."
                );

                this.value = "";

                return;

            }


            /* 2 MB LIMIT */

            if (
                file.size >
                2 * 1024 * 1024
            ) {

                alert(
                    "Photo size must be less than 2 MB."
                );

                this.value = "";

                return;

            }


            const reader =
                new FileReader();


            reader.onload =
                function (event) {

                    photoData =
                        event.target.result;


                    photoPreview.src =
                        photoData;


                    photoPreview.style.display =
                        "block";


                    photoHint.textContent =
                        "✓ Photo selected successfully";

                    photoHint.style.color =
                        "#00e676";


                    /* =========================
                       SHOW PASSWORD
                    ========================= */

                    passwordSection.classList.add(
                        "show"
                    );


                    setTimeout(() => {

                        passwordInput.focus();

                    }, 300);

                };


            reader.readAsDataURL(file);

        }
    );


    /* =====================================================
       PASSWORD SHOW / HIDE
    ===================================================== */

    passwordEye.addEventListener(
        "click",
        () => {

            if (
                passwordInput.type ===
                "password"
            ) {

                passwordInput.type =
                    "text";

                passwordEye.textContent =
                    "🙈";

            }

            else {

                passwordInput.type =
                    "password";

                passwordEye.textContent =
                    "👁";

            }

        }
    );


    /* =====================================================
       CONFIRM PASSWORD SHOW / HIDE
    ===================================================== */

    confirmEye.addEventListener(
        "click",
        () => {

            if (
                confirmPasswordInput.type ===
                "password"
            ) {

                confirmPasswordInput.type =
                    "text";

                confirmEye.textContent =
                    "🙈";

            }

            else {

                confirmPasswordInput.type =
                    "password";

                confirmEye.textContent =
                    "👁";

            }

        }
    );


    /* =====================================================
       NAME VALIDATION
    ===================================================== */

    nameInput.addEventListener(
        "input",
        function () {

            this.value =
                this.value.replace(
                    /[^a-zA-Z\s.'-]/g,
                    ""
                );

        }
    );


    /* =====================================================
       PASSWORD STRENGTH
    ===================================================== */

    passwordInput.addEventListener(
        "input",
        function () {

            const password =
                this.value;


            if (
                password.length === 0
            ) {

                this.style.borderColor =
                    "";

                return;

            }


            if (
                password.length < 6
            ) {

                this.style.borderColor =
                    "#ff1744";

            }

            else if (
                password.length < 8
            ) {

                this.style.borderColor =
                    "#ffd740";

            }

            else {

                this.style.borderColor =
                    "#00e676";

            }

        }
    );


    /* =====================================================
       CONFIRM PASSWORD
    ===================================================== */

    confirmPasswordInput.addEventListener(
        "input",
        function () {

            if (
                this.value.length === 0
            ) {

                this.style.borderColor =
                    "";

                return;

            }


            if (
                this.value ===
                passwordInput.value
            ) {

                this.style.borderColor =
                    "#00e676";

            }

            else {

                this.style.borderColor =
                    "#ff1744";

            }

        }
    );


    /* =====================================================
       LOGIN FORM
    ===================================================== */

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* =========================
               NAME
            ========================= */

            const name =
                nameInput.value.trim();


            if (
                name.length < 3
            ) {

                alert(
                    "Please enter your full name."
                );

                nameInput.focus();

                return;

            }


            /* =========================
               EMAIL
            ========================= */

            const email =
                emailInput.value
                    .trim()
                    .toLowerCase();


            if (
                !emailInput.checkValidity()
            ) {

                alert(
                    "Please enter a valid email address."
                );

                emailInput.focus();

                return;

            }


            /* =========================
               MOBILE
            ========================= */

            const mobile =
                mobileInput.value.trim();


            if (
                mobile.length !== 10
            ) {

                alert(
                    "Please enter a valid 10-digit mobile number."
                );

                mobileInput.focus();

                return;

            }


            /* =========================
               OTP
            ========================= */

            if (!otpVerified) {

                alert(
                    "Please verify OTP first."
                );

                otpInput.focus();

                return;

            }


            /* =========================
               PHOTO
            ========================= */

            if (!photoData) {

                alert(
                    "Please select your photo first."
                );

                studentPhotoInput.focus();

                return;

            }


            /* =========================
               PASSWORD
            ========================= */

            const password =
                passwordInput.value;


            const confirmPassword =
                confirmPasswordInput.value;


            if (
                password.length < 6
            ) {

                alert(
                    "Password must be at least 6 characters."
                );

                passwordInput.focus();

                return;

            }


            /* =========================
               CONFIRM PASSWORD
            ========================= */

            if (
                password !==
                confirmPassword
            ) {

                alert(
                    "Password and Confirm Password do not match."
                );

                confirmPasswordInput.focus();

                return;

            }


            /* =================================================
               ACCOUNT KEY
            ================================================= */

            const accountKey =
                getAccountKey();


            /* =================================================
               CHECK EXISTING ACCOUNT
            ================================================= */

            const existingAccount =
                localStorage.getItem(
                    accountKey
                );


            let studentID;


            if (existingAccount) {

                /*
                   Same Email + Mobile
                   = Same Account
                */

                const account =
                    JSON.parse(
                        existingAccount
                    );

                studentID =
                    account.studentID;

            }

            else {

                /*
                   New Account
                   = New Student ID
                */

                studentID =
                    "CM" +
                    new Date().getFullYear() +
                    Math.floor(
                        100000 +
                        Math.random() * 900000
                    );

            }


            /* =================================================
               SAVE ACCOUNT
               Password save nahi kar rahe.
            ================================================= */

            const accountData = {

                name:
                    name,

                email:
                    email,

                mobile:
                    mobile,

                studentID:
                    studentID,

                photo:
                    photoData

            };


            localStorage.setItem(
                accountKey,
                JSON.stringify(
                    accountData
                )
            );


            /* =================================================
               CURRENT LOGGED-IN USER
            ================================================= */

            localStorage.setItem(
                "cmStudentName",
                name
            );

            localStorage.setItem(
                "cmStudentId",
                studentID
            );

            localStorage.setItem(
                "cmStudentPhoto",
                photoData
            );


            /* =================================================
               SUCCESS MESSAGE
            ================================================= */

            alert(
                "Welcome " +
                name +
                "!\n\n" +
                "Login successful.\n\n" +
                "Student ID: " +
                studentID
            );


            /* =================================================
               DASHBOARD
            ================================================= */

            window.location.href =
                "dashboard.html";

        }
    );


    /* =====================================================
       ENTER KEY - OTP
    ===================================================== */

    otpInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter"
            ) {

                event.preventDefault();

                verifyOTP();

            }

        }
    );


    /* =====================================================
       ENTER KEY - MOBILE
    ===================================================== */

    mobileInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter" &&
                this.value.length === 10
            ) {

                event.preventDefault();

                otpInput.focus();

            }

        }
    );


    /* =====================================================
       ENTER KEY - CONFIRM PASSWORD
    ===================================================== */

    confirmPasswordInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter"
            ) {

                event.preventDefault();

                loginForm.requestSubmit();

            }

        }
    );

});