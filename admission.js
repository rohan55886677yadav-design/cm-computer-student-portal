/* =========================================================
   CM COMPUTER CENTER
   PRO ADMISSION SYSTEM
   FIXED + STORAGE SAFE admission.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const form = document.getElementById("admissionForm");
    const loader = document.getElementById("pageLoader");
    const messageBox = document.getElementById("formMessage");

    const firstName = document.getElementById("firstName");
    const middleName = document.getElementById("middleName");
    const lastName = document.getElementById("lastName");

    const fatherName = document.getElementById("fatherName");
    const motherName = document.getElementById("motherName");

    const dobDay = document.getElementById("dobDay");
    const dobMonth = document.getElementById("dobMonth");
    const dobYear = document.getElementById("dobYear");

    const gender = document.getElementById("gender");
    const category = document.getElementById("category");

    const studentPhoto = document.getElementById("studentPhoto");
    const photoPreview = document.getElementById("photoPreview");

    const mobile = document.getElementById("mobile");
    const email = document.getElementById("email");

    const fullAddress = document.getElementById("fullAddress");
    const cityVillage = document.getElementById("cityVillage");
    const district = document.getElementById("district");
    const pincode = document.getElementById("pincode");

    const qualification = document.getElementById("qualification");
    const passingYear = document.getElementById("passingYear");
    const board = document.getElementById("board");

    const selectedCourseInput =
        document.getElementById("selectedCourse");

    const selectedCourseText =
        document.getElementById("selectedCourseText");

    const courseCards =
        document.querySelectorAll(".course-card");

    const admissionDate =
        document.getElementById("admissionDate");

    const admissionMode =
        document.getElementById("admissionMode");

    const declaration =
        document.getElementById("declaration");

    const submitButton =
        document.getElementById("submitAdmission");

    const currentYear =
        document.getElementById("currentYear");


    /* =====================================================
       LOADER
       ===================================================== */

    if (loader) {

        setTimeout(function () {

            loader.classList.add("hide");

        }, 700);

    }


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       DOB DAY
       ===================================================== */

    if (dobDay && dobDay.options.length <= 1) {

        for (let day = 1; day <= 31; day++) {

            const option =
                document.createElement("option");

            option.value =
                String(day).padStart(2, "0");

            option.textContent =
                day;

            dobDay.appendChild(option);

        }

    }


    /* =====================================================
       DOB MONTH
       ===================================================== */

    if (dobMonth && dobMonth.options.length <= 1) {

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

        months.forEach(function (month, index) {

            const option =
                document.createElement("option");

            option.value =
                String(index + 1).padStart(2, "0");

            option.textContent =
                month;

            dobMonth.appendChild(option);

        });

    }


    /* =====================================================
       DOB YEAR
       ===================================================== */

    if (dobYear && dobYear.options.length <= 1) {

        const current =
            new Date().getFullYear();

        for (
            let year = current;
            year >= 1950;
            year--
        ) {

            const option =
                document.createElement("option");

            option.value =
                String(year);

            option.textContent =
                year;

            dobYear.appendChild(option);

        }

    }


    /* =====================================================
       DEFAULT ADMISSION DATE
       ===================================================== */

    if (admissionDate && !admissionDate.value) {

        const today =
            new Date();

        const yyyy =
            today.getFullYear();

        const mm =
            String(today.getMonth() + 1)
                .padStart(2, "0");

        const dd =
            String(today.getDate())
                .padStart(2, "0");

        admissionDate.value =
            `${yyyy}-${mm}-${dd}`;

    }


    /* =====================================================
       MESSAGE SYSTEM
       ===================================================== */

    function showMessage(text, type) {

        if (!messageBox) return;

        messageBox.textContent =
            text;

        messageBox.className =
            "form-message show " + type;

        messageBox.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }


    function clearMessage() {

        if (!messageBox) return;

        messageBox.textContent = "";

        messageBox.className =
            "form-message";

    }


    /* =====================================================
       TEXT CLEANUP
       ===================================================== */

    function cleanName(value) {

        return String(value || "")
            .replace(/\s+/g, " ")
            .trim();

    }


    [
        firstName,
        middleName,
        lastName,
        fatherName,
        motherName,
        cityVillage,
        district,
        board
    ].forEach(function (input) {

        if (!input) return;

        input.addEventListener("blur", function () {

            input.value =
                cleanName(input.value);

        });

    });


    /* =====================================================
       MOBILE
       ===================================================== */

    if (mobile) {

        mobile.addEventListener("input", function () {

            this.value =
                this.value
                    .replace(/\D/g, "")
                    .slice(0, 10);

        });

    }


    /* =====================================================
       PIN CODE
       ===================================================== */

    if (pincode) {

        pincode.addEventListener("input", function () {

            this.value =
                this.value
                    .replace(/\D/g, "")
                    .slice(0, 6);

        });

    }


    /* =====================================================
       PASSING YEAR
       ===================================================== */

    if (passingYear) {

        passingYear.addEventListener("input", function () {

            this.value =
                this.value
                    .replace(/\D/g, "")
                    .slice(0, 4);

        });

    }


    /* =====================================================
       PHOTO COMPRESSION
       ===================================================== */

    function compressPhoto(file) {

        return new Promise(function (resolve, reject) {

            if (!file) {

                reject(
                    new Error("Student photo is required.")
                );

                return;

            }


            const allowedTypes = [
                "image/jpeg",
                "image/jpg",
                "image/png"
            ];


            if (!allowedTypes.includes(file.type)) {

                reject(
                    new Error(
                        "Please upload JPG, JPEG or PNG image."
                    )
                );

                return;

            }


            if (file.size > 2 * 1024 * 1024) {

                reject(
                    new Error(
                        "Photo must be less than 2 MB."
                    )
                );

                return;

            }


            const reader =
                new FileReader();


            reader.onload = function (event) {

                const img =
                    new Image();


                img.onload = function () {

                    /* ---------------------------------
                       MAX DIMENSION
                       --------------------------------- */

                    const MAX_WIDTH = 500;
                    const MAX_HEIGHT = 500;


                    let width =
                        img.width;

                    let height =
                        img.height;


                    if (width > height) {

                        if (width > MAX_WIDTH) {

                            height =
                                height *
                                (MAX_WIDTH / width);

                            width =
                                MAX_WIDTH;

                        }

                    } else {

                        if (height > MAX_HEIGHT) {

                            width =
                                width *
                                (MAX_HEIGHT / height);

                            height =
                                MAX_HEIGHT;

                        }

                    }


                    /* ---------------------------------
                       CANVAS
                       --------------------------------- */

                    const canvas =
                        document.createElement("canvas");

                    canvas.width =
                        Math.round(width);

                    canvas.height =
                        Math.round(height);


                    const ctx =
                        canvas.getContext("2d");


                    ctx.drawImage(
                        img,
                        0,
                        0,
                        canvas.width,
                        canvas.height
                    );


                    /* ---------------------------------
                       COMPRESS JPEG
                       --------------------------------- */

                    let quality = 0.75;

                    let result =
                        canvas.toDataURL(
                            "image/jpeg",
                            quality
                        );


                    /*
                       Agar image abhi bhi badi hai,
                       aur compress karo.
                    */

                    while (
                        result.length > 180000 &&
                        quality > 0.35
                    ) {

                        quality -= 0.08;

                        result =
                            canvas.toDataURL(
                                "image/jpeg",
                                quality
                            );

                    }


                    resolve(result);

                };


                img.onerror = function () {

                    reject(
                        new Error(
                            "Invalid image file."
                        )
                    );

                };


                img.src =
                    event.target.result;

            };


            reader.onerror = function () {

                reject(
                    new Error(
                        "Photo could not be read."
                    )
                );

            };


            reader.readAsDataURL(file);

        });

    }


    /* =====================================================
       PHOTO PREVIEW
       ===================================================== */

    if (studentPhoto) {

        studentPhoto.addEventListener(
            "change",
            async function () {

                const file =
                    this.files[0];

                if (!file) return;


                try {

                    clearMessage();


                    const compressedPhoto =
                        await compressPhoto(file);


                    if (photoPreview) {

                        photoPreview.innerHTML = `
                            <img
                                src="${compressedPhoto}"
                                alt="Student Photo Preview"
                            >
                        `;

                    }


                } catch (error) {

                    showMessage(
                        error.message,
                        "error"
                    );

                    this.value = "";

                    if (photoPreview) {

                        photoPreview.innerHTML = "";

                    }

                }

            }
        );

    }


    /* =====================================================
       COURSE SELECTION
       ===================================================== */

    courseCards.forEach(function (card) {

        card.addEventListener(
            "click",
            function () {

                courseCards.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                this.classList.add("active");


                const course =
                    this.dataset.course;


                if (selectedCourseInput) {

                    selectedCourseInput.value =
                        course;

                }


                if (selectedCourseText) {

                    selectedCourseText.textContent =
                        course;

                }


                clearMessage();

            }
        );

    });


    /* =====================================================
       GET ADMISSIONS
       ===================================================== */

    function getAdmissions() {

        try {

            const data =
                localStorage.getItem(
                    "cmAdmissions"
                );

            if (!data) return [];

            const parsed =
                JSON.parse(data);

            return Array.isArray(parsed)
                ? parsed
                : [];

        } catch (error) {

            console.warn(
                "Could not read admissions:",
                error
            );

            return [];

        }

    }


    /* =====================================================
       STUDENT ID
       ===================================================== */

    function generateStudentId() {

        const admissions =
            getAdmissions();


        let studentId = "";


        let unique = false;


        while (!unique) {

            const year =
                new Date().getFullYear();


            const random =
                Math.floor(
                    1000 +
                    Math.random() * 9000
                );


            studentId =
                "CM" +
                year +
                random;


            unique =
                !admissions.some(
                    function (student) {

                        return String(
                            student.studentId
                        ) === String(studentId);

                    }
                );

        }


        return studentId;

    }


    /* =====================================================
       EMAIL
       ===================================================== */

    function validEmail(value) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(value);

    }


    /* =====================================================
       DOB
       ===================================================== */

    function getDOB() {

        if (
            !dobDay ||
            !dobMonth ||
            !dobYear
        ) {

            return "";

        }


        if (
            !dobDay.value ||
            !dobMonth.value ||
            !dobYear.value
        ) {

            return "";

        }


        return (
            dobYear.value +
            "-" +
            dobMonth.value +
            "-" +
            dobDay.value
        );

    }


    /* =====================================================
       VALIDATION
       ===================================================== */

    function validateForm() {

        clearMessage();


        if (!firstName.value.trim()) {

            showMessage(
                "Please enter First Name.",
                "error"
            );

            firstName.focus();

            return false;

        }


        if (!lastName.value.trim()) {

            showMessage(
                "Please enter Last Name / Surname.",
                "error"
            );

            lastName.focus();

            return false;

        }


        if (!fatherName.value.trim()) {

            showMessage(
                "Please enter Father's Name.",
                "error"
            );

            fatherName.focus();

            return false;

        }


        if (!motherName.value.trim()) {

            showMessage(
                "Please enter Mother's Name.",
                "error"
            );

            motherName.focus();

            return false;

        }


        if (!getDOB()) {

            showMessage(
                "Please select complete Date of Birth.",
                "error"
            );

            return false;

        }


        if (!gender.value) {

            showMessage(
                "Please select Gender.",
                "error"
            );

            gender.focus();

            return false;

        }


        if (!category.value) {

            showMessage(
                "Please select Category.",
                "error"
            );

            category.focus();

            return false;

        }


        if (
            !studentPhoto ||
            !studentPhoto.files ||
            !studentPhoto.files[0]
        ) {

            showMessage(
                "Please upload Student Photo.",
                "error"
            );

            return false;

        }


        if (
            !mobile ||
            !/^[6-9]\d{9}$/.test(
                mobile.value
            )
        ) {

            showMessage(
                "Please enter a valid 10-digit mobile number.",
                "error"
            );

            mobile.focus();

            return false;

        }


        if (
            !email ||
            !validEmail(
                email.value.trim()
            )
        ) {

            showMessage(
                "Please enter a valid Email Address.",
                "error"
            );

            email.focus();

            return false;

        }


        if (!fullAddress.value.trim()) {

            showMessage(
                "Please enter Full Address.",
                "error"
            );

            fullAddress.focus();

            return false;

        }


        if (!cityVillage.value.trim()) {

            showMessage(
                "Please enter City / Village.",
                "error"
            );

            cityVillage.focus();

            return false;

        }


        if (!district.value.trim()) {

            showMessage(
                "Please enter District.",
                "error"
            );

            district.focus();

            return false;

        }


        if (!/^\d{6}$/.test(
            pincode.value
        )) {

            showMessage(
                "Please enter a valid 6-digit PIN Code.",
                "error"
            );

            pincode.focus();

            return false;

        }


        if (!qualification.value) {

            showMessage(
                "Please select Highest Qualification.",
                "error"
            );

            qualification.focus();

            return false;

        }


        if (!/^\d{4}$/.test(
            passingYear.value
        )) {

            showMessage(
                "Please enter a valid 4-digit Passing Year.",
                "error"
            );

            passingYear.focus();

            return false;

        }


        if (!board.value.trim()) {

            showMessage(
                "Please enter Board / University.",
                "error"
            );

            board.focus();

            return false;

        }


        if (!selectedCourseInput.value) {

            showMessage(
                "Please select a Course.",
                "error"
            );

            return false;

        }


        if (!admissionMode.value) {

            showMessage(
                "Please select Admission Mode.",
                "error"
            );

            admissionMode.focus();

            return false;

        }


        if (!declaration.checked) {

            showMessage(
                "Please accept the Declaration.",
                "error"
            );

            declaration.focus();

            return false;

        }


        return true;

    }


    /* =====================================================
       CLEAN OLD DUPLICATE PHOTO DATA
       ===================================================== */

    function cleanOldAdmissions() {

        let admissions =
            getAdmissions();


        if (!Array.isArray(admissions)) {

            return [];

        }


        admissions =
            admissions.map(
                function (student) {

                    const cleaned =
                        Object.assign(
                            {},
                            student
                        );


                    /*
                       Old version me photo 3 baar
                       save hoti thi.

                       Sirf studentPhoto rakhenge.
                    */

                    if (
                        !cleaned.studentPhoto &&
                        cleaned.photo
                    ) {

                        cleaned.studentPhoto =
                            cleaned.photo;

                    }


                    delete cleaned.photo;

                    delete cleaned.profilePhoto;


                    return cleaned;

                }
            );


        return admissions;

    }


    /* =====================================================
       SAVE ADMISSION
       ===================================================== */

    async function saveAdmission() {

        /* -----------------------------------------------
           COMPRESS PHOTO
           ----------------------------------------------- */

        const photoFile =
            studentPhoto.files[0];


        const photoData =
            await compressPhoto(
                photoFile
            );


        /* -----------------------------------------------
           STUDENT ID
           ----------------------------------------------- */

        const studentId =
            generateStudentId();


        /* -----------------------------------------------
           FULL NAME
           ----------------------------------------------- */

        const fullName = [

            cleanName(firstName.value),

            cleanName(middleName.value),

            cleanName(lastName.value)

        ]
            .filter(Boolean)
            .join(" ");


        /* -----------------------------------------------
           ADMISSION RECORD
           ----------------------------------------------- */

        const admissionRecord = {

            studentId: studentId,

            firstName:
                cleanName(firstName.value),

            middleName:
                cleanName(middleName.value),

            lastName:
                cleanName(lastName.value),

            fullName:
                fullName,

            fatherName:
                cleanName(fatherName.value),

            motherName:
                cleanName(motherName.value),

            dob:
                getDOB(),

            gender:
                gender.value,

            category:
                category.value,

            /* ONLY ONE PHOTO COPY */

            studentPhoto:
                photoData,

            mobile:
                mobile.value.trim(),

            email:
                email.value.trim(),

            fullAddress:
                fullAddress.value.trim(),

            cityVillage:
                cleanName(cityVillage.value),

            district:
                cleanName(district.value),

            pincode:
                pincode.value.trim(),

            qualification:
                qualification.value,

            passingYear:
                passingYear.value.trim(),

            board:
                cleanName(board.value),

            course:
                selectedCourseInput.value,

            admissionDate:
                admissionDate.value,

            admissionMode:
                admissionMode.value,

            theoryStatus:
                "NOT STARTED",

            theoryScore:
                null,

            theoryPercentage:
                null,

            theoryResult:
                "PENDING",

            practicalStatus:
                "NOT STARTED",

            practicalScore:
                null,

            practicalPercentage:
                null,

            practicalResult:
                "PENDING",

            finalResult:
                "PENDING",

            admissionStatus:
                "ACTIVE",

            createdAt:
                new Date().toISOString(),

            date:
                new Date().toLocaleString("en-IN")

        };


        /* -----------------------------------------------
           OLD DATA CLEAN
           ----------------------------------------------- */

        let admissions =
            cleanOldAdmissions();


        /* -----------------------------------------------
           ADD NEW STUDENT
           ----------------------------------------------- */

        admissions.push(
            admissionRecord
        );


        /* -----------------------------------------------
           SAVE ADMISSIONS
           ----------------------------------------------- */

        try {

            localStorage.setItem(
                "cmAdmissions",
                JSON.stringify(admissions)
            );

        } catch (error) {

            console.error(
                "Admission storage error:",
                error
            );


            throw new Error(
                "Browser storage is full. Please clear old demo data and try again."
            );

        }


        /* -----------------------------------------------
           CURRENT STUDENT DATA
           ----------------------------------------------- */

        try {

            localStorage.setItem(
                "cmStudentId",
                studentId
            );


            localStorage.setItem(
                "cmStudentName",
                fullName
            );


            localStorage.setItem(
                "cmStudentPhoto",
                photoData
            );


            localStorage.setItem(
                "cmStudentCourse",
                selectedCourseInput.value
            );


            /*
               IMPORTANT:
               cmStudentAdmission me photo duplicate
               nahi rakhenge.
            */

            const studentWithoutPhoto =
                Object.assign(
                    {},
                    admissionRecord
                );

            delete studentWithoutPhoto.studentPhoto;


            localStorage.setItem(
                "cmStudentAdmission",
                JSON.stringify(
                    studentWithoutPhoto
                )
            );

        } catch (error) {

            console.error(
                "Student storage error:",
                error
            );

            throw new Error(
                "Student data could not be saved because browser storage is full."
            );

        }


        /* -----------------------------------------------
           SESSION
           ----------------------------------------------- */

        sessionStorage.setItem(
            "cmAdmissionCompleted",
            "true"
        );


        sessionStorage.setItem(
            "cmTestStudentId",
            studentId
        );


        sessionStorage.setItem(
            "cmTestCourse",
            selectedCourseInput.value
        );


        sessionStorage.setItem(
            "cmTheoryStarted",
            "false"
        );


        return admissionRecord;

    }


    /* =====================================================
       FORM SUBMIT
       ===================================================== */

    if (form) {

        form.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                /* VALIDATION */

                if (!validateForm()) {

                    return;

                }


                /* BUTTON */

                if (submitButton) {

                    submitButton.disabled =
                        true;

                    submitButton.innerHTML = `
                        <span class="btn-icon">⏳</span>
                        <span>
                            Processing Admission...
                            <small>Please wait...</small>
                        </span>
                        <span class="btn-arrow">•••</span>
                    `;

                }


                try {

                    /* SAVE */

                    const record =
                        await saveAdmission();


                    /* SUCCESS */

                    showMessage(
                        "✓ Admission successful! Student ID " +
                        record.studentId +
                        " generated. Opening Test Center...",
                        "success"
                    );


                    if (submitButton) {

                        submitButton.innerHTML = `
                            <span class="btn-icon">✓</span>
                            <span>
                                Admission Successful
                                <small>Opening Test Center...</small>
                            </span>
                            <span class="btn-arrow">→</span>
                        `;

                    }


                    /* -----------------------------------
                       OPEN TEST CENTER
                       ----------------------------------- */

                    setTimeout(
                        function () {

                            window.location.href =
                                "test center.html?studentId=" +
                                encodeURIComponent(
                                    record.studentId
                                ) +
                                "&course=" +
                                encodeURIComponent(
                                    record.course
                                );

                        },
                        1200
                    );


                } catch (error) {

                    console.error(
                        "Admission Error:",
                        error
                    );


                    showMessage(
                        error.message ||
                        "Something went wrong while saving admission.",
                        "error"
                    );


                    if (submitButton) {

                        submitButton.disabled =
                            false;

                        submitButton.innerHTML = `
                            <span class="btn-icon">🚀</span>
                            <span>
                                Submit Admission
                                <small>प्रवेश फॉर्म जमा करें</small>
                            </span>
                            <span class="btn-arrow">→</span>
                        `;

                    }

                }

            }
        );

    }


    /* =====================================================
       PREVENT ENTER SUBMIT
       ===================================================== */

    if (form) {

        form.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" &&
                    event.target.tagName !== "TEXTAREA"
                ) {

                    event.preventDefault();

                }

            }
        );

    }


    /* =====================================================
       CONSOLE
       ===================================================== */

    console.log(
        "%c CM COMPUTER CENTER ",
        "background:#00eaff;color:#001018;font-size:16px;font-weight:900;padding:7px 12px;border-radius:6px;"
    );

    console.log(
        "%c Admission System Loaded Successfully ",
        "color:#00eaff;font-size:12px;font-weight:bold;"
    );

});