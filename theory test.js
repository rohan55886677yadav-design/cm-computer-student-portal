/* =========================================================
   CM COMPUTER CENTRE
   THEORY TEST JAVASCRIPT
   SEPARATE FROM MONTHLY TEST
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       DOM ELEMENTS
    ===================================================== */

    const pageLoader = document.getElementById("pageLoader");

    const currentYear = document.getElementById("currentYear");

    const studentName = document.getElementById("studentName");
    const studentId = document.getElementById("studentId");
    const studentCourse = document.getElementById("studentCourse");
    const studentPhoto = document.getElementById("studentPhoto");

    const totalQuestions = document.getElementById("totalQuestions");

    const examTimer = document.getElementById("examTimer");

    const progressText = document.getElementById("progressText");
    const progressFill = document.getElementById("progressFill");

    const questionsContainer =
        document.getElementById("questionsContainer");

    const submitTheoryBtn =
        document.getElementById("submitTheoryBtn");

    const testMessage =
        document.getElementById("testMessage");


    /* =====================================================
       PAGE LOADER
    ===================================================== */

    setTimeout(() => {

        if (pageLoader) {
            pageLoader.classList.add("hide");
        }

    }, 800);


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =====================================================
       URL DATA
       theory test.html?studentId=...&course=...
    ===================================================== */

    const urlParams = new URLSearchParams(window.location.search);

    const urlStudentId = urlParams.get("studentId");
    const urlCourse = urlParams.get("course");


    /* =====================================================
       GET ADMISSION DATA
    ===================================================== */

    function getAdmissions() {

        try {

            return JSON.parse(
                localStorage.getItem("cmAdmissions")
            ) || [];

        } catch (error) {

            console.error(
                "Admission data error:",
                error
            );

            return [];

        }

    }


    const admissions = getAdmissions();


    /* =====================================================
       FIND STUDENT
    ===================================================== */

    let currentStudent = null;


    if (urlStudentId) {

        currentStudent = admissions.find(
            student =>
                String(student.studentId) ===
                String(urlStudentId)
        );

    }


    /* =====================================================
       FALLBACK
    ===================================================== */

    if (!currentStudent) {

        const savedStudentId =
            localStorage.getItem("cmStudentId");

        if (savedStudentId) {

            currentStudent = admissions.find(
                student =>
                    String(student.studentId) ===
                    String(savedStudentId)
            );

        }

    }


    /* =====================================================
       LAST FALLBACK
    ===================================================== */

    if (!currentStudent && admissions.length > 0) {

        currentStudent =
            admissions[admissions.length - 1];

    }


    /* =====================================================
       FORMAT FULL NAME
    ===================================================== */

    function getFullName(student) {

        if (!student) {
            return "Student";
        }

        const parts = [

            student.firstName,
            student.middleName,
            student.lastName

        ].filter(Boolean);

        if (parts.length > 0) {
            return parts.join(" ");
        }

        return (
            student.studentName ||
            student.name ||
            "Student"
        );

    }


    /* =====================================================
       DISPLAY STUDENT
    ===================================================== */

    if (currentStudent) {

        const fullName =
            getFullName(currentStudent);

        const id =
            currentStudent.studentId ||
            currentStudent.id ||
            urlStudentId ||
            "N/A";

        const course =
            urlCourse ||
            currentStudent.course ||
            currentStudent.selectedCourse ||
            "N/A";

        studentName.textContent = fullName;

        studentId.textContent = id;

        studentCourse.textContent = course;


        /* ================================================
           STUDENT PHOTO
        ================================================= */

        const photo =
            currentStudent.studentPhoto ||
            currentStudent.photo ||
            currentStudent.profilePhoto ||
            currentStudent.image ||
            "";

        if (photo) {

            studentPhoto.innerHTML = `
                <img
                    src="${photo}"
                    alt="Student Photo"
                >
            `;

        } else {

            studentPhoto.innerHTML = `
                <div class="photo-placeholder">
                    👤
                </div>
            `;

        }

    } else {

        studentName.textContent =
            "Student Not Found";

        studentId.textContent =
            "N/A";

        studentCourse.textContent =
            "N/A";

        studentPhoto.innerHTML = `
            <div class="photo-placeholder">
                ⚠️
            </div>
        `;

        showMessage(
            "Student information was not found. Please complete admission first.",
            "error"
        );

        submitTheoryBtn.disabled = true;

    }


    /* =====================================================
       THEORY QUESTIONS
       COMPLETELY SEPARATE FROM MONTHLY TEST
    ===================================================== */

    const theoryQuestions = [

        {
            question:
                "What does HTML stand for?",

            options: [
                "Hyper Text Markup Language",
                "High Text Machine Language",
                "Hyperlink Text Management Language",
                "Home Tool Markup Language"
            ],

            answer: 0
        },


        {
            question:
                "Which tag is used to create the largest heading in HTML?",

            options: [
                "<h6>",
                "<heading>",
                "<h1>",
                "<head>"
            ],

            answer: 2
        },


        {
            question:
                "Which HTML tag is used to create a paragraph?",

            options: [
                "<para>",
                "<p>",
                "<paragraph>",
                "<text>"
            ],

            answer: 1
        },


        {
            question:
                "Which tag is used to create a hyperlink?",

            options: [
                "<link>",
                "<href>",
                "<a>",
                "<url>"
            ],

            answer: 2
        },


        {
            question:
                "What does CSS mainly control on a webpage?",

            options: [
                "Database",
                "Webpage design and styling",
                "Server hardware",
                "Internet connection"
            ],

            answer: 1
        },


        {
            question:
                "Which CSS property is used to change text color?",

            options: [
                "font-color",
                "text-color",
                "color",
                "foreground"
            ],

            answer: 2
        },


        {
            question:
                "Which CSS property is used to change the background color?",

            options: [
                "background-color",
                "bgcolor",
                "background-style",
                "color-background"
            ],

            answer: 0
        },


        {
            question:
                "Which symbol is used for a CSS class selector?",

            options: [
                "#",
                ".",
                "@",
                "$"
            ],

            answer: 1
        },


        {
            question:
                "Which symbol is used for a CSS ID selector?",

            options: [
                ".",
                "#",
                "*",
                "&"
            ],

            answer: 1
        },


        {
            question:
                "Which language is mainly used to add interactivity to webpages?",

            options: [
                "HTML",
                "CSS",
                "JavaScript",
                "SQL"
            ],

            answer: 2
        },


        {
            question:
                "Which keyword is commonly used to declare a constant in JavaScript?",

            options: [
                "constant",
                "const",
                "fixed",
                "static"
            ],

            answer: 1
        },


        {
            question:
                "Which symbol is commonly used for a single-line comment in JavaScript?",

            options: [
                "<!-- -->",
                "/* */",
                "//",
                "#"
            ],

            answer: 2
        },


        {
            question:
                "What does CPU stand for?",

            options: [
                "Central Processing Unit",
                "Computer Processing Utility",
                "Central Program Unit",
                "Computer Primary Unit"
            ],

            answer: 0
        },


        {
            question:
                "Which device is mainly used to enter text into a computer?",

            options: [
                "Monitor",
                "Printer",
                "Keyboard",
                "Speaker"
            ],

            answer: 2
        },


        {
            question:
                "Which device is used to display visual output from a computer?",

            options: [
                "Keyboard",
                "Monitor",
                "Mouse",
                "Scanner"
            ],

            answer: 1
        },


        {
            question:
                "Which of the following is an operating system?",

            options: [
                "Windows",
                "HTML",
                "CSS",
                "Google"
            ],

            answer: 0
        },


        {
            question:
                "What is the full form of RAM?",

            options: [
                "Random Access Memory",
                "Read Access Machine",
                "Rapid Application Memory",
                "Random Application Module"
            ],

            answer: 0
        },


        {
            question:
                "Which one is an example of a web browser?",

            options: [
                "Google Chrome",
                "Windows",
                "Excel",
                "Android"
            ],

            answer: 0
        },


        {
            question:
                "Which HTML attribute is used to specify an image source?",

            options: [
                "href",
                "src",
                "link",
                "source"
            ],

            answer: 1
        },


        {
            question:
                "Which HTML tag is commonly used to display an image?",

            options: [
                "<picture>",
                "<image>",
                "<img>",
                "<src>"
            ],

            answer: 2
        }

    ];


    /* =====================================================
       TOTAL QUESTIONS
    ===================================================== */

    const total =
        theoryQuestions.length;

    totalQuestions.textContent = total;


    /* =====================================================
       USER ANSWERS
    ===================================================== */

    const userAnswers =
        new Array(total).fill(null);


    /* =====================================================
       RENDER QUESTIONS
    ===================================================== */

    function renderQuestions() {

        questionsContainer.innerHTML = "";


        theoryQuestions.forEach(
            (question, index) => {

                const questionCard =
                    document.createElement("div");

                questionCard.className =
                    "question-card";


                let optionsHTML = "";


                question.options.forEach(
                    (option, optionIndex) => {

                        const letter =
                            String.fromCharCode(
                                65 + optionIndex
                            );


                        optionsHTML += `

                            <label
                                class="option"
                                data-question="${index}"
                                data-option="${optionIndex}"
                            >

                                <input
                                    type="radio"
                                    name="question-${index}"
                                    value="${optionIndex}"
                                >

                                <span class="option-letter">
                                    ${letter}
                                </span>

                                <span class="option-text">
                                    ${escapeHTML(option)}
                                </span>

                            </label>

                        `;

                    }
                );


                questionCard.innerHTML = `

                    <span class="question-number">
                        QUESTION ${index + 1}
                    </span>

                    <div class="question-text">
                        ${escapeHTML(question.question)}
                    </div>

                    <div class="options">
                        ${optionsHTML}
                    </div>

                `;


                questionsContainer.appendChild(
                    questionCard
                );

            }
        );


        attachOptionEvents();

        updateProgress();

    }


    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =====================================================
       OPTION EVENTS
    ===================================================== */

    function attachOptionEvents() {

        const options =
            document.querySelectorAll(".option");


        options.forEach(option => {

            option.addEventListener(
                "click",
                () => {

                    const questionIndex =
                        Number(
                            option.dataset.question
                        );

                    const optionIndex =
                        Number(
                            option.dataset.option
                        );


                    userAnswers[
                        questionIndex
                    ] = optionIndex;


                    /* Remove selected */

                    document
                        .querySelectorAll(
                            `.option[data-question="${questionIndex}"]`
                        )
                        .forEach(item => {

                            item.classList.remove(
                                "selected"
                            );

                        });


                    /* Add selected */

                    option.classList.add(
                        "selected"
                    );


                    const radio =
                        option.querySelector(
                            "input"
                        );

                    if (radio) {
                        radio.checked = true;
                    }


                    updateProgress();

                }
            );

        });

    }


    /* =====================================================
       PROGRESS
    ===================================================== */

    function updateProgress() {

        const answered =
            userAnswers.filter(
                answer => answer !== null
            ).length;


        progressText.textContent =
            `${answered} / ${total}`;


        const percentage =
            total === 0
                ? 0
                : (answered / total) * 100;


        progressFill.style.width =
            `${percentage}%`;

    }


    /* =====================================================
       TIMER
       50 MINUTES
    ===================================================== */

    let timeLeft =
        50 * 60;

    let timerInterval = null;


    function formatTime(seconds) {

        const minutes =
            Math.floor(seconds / 60);

        const secs =
            seconds % 60;


        return (
            String(minutes).padStart(2, "0") +
            ":" +
            String(secs).padStart(2, "0")
        );

    }


    function updateTimer() {

        examTimer.textContent =
            formatTime(timeLeft);


        if (timeLeft <= 300) {

            examTimer.classList.add(
                "timer-warning"
            );

        }


        if (timeLeft <= 60) {

            examTimer.classList.add(
                "timer-danger"
            );

        }

    }


    function startTimer() {

        updateTimer();


        timerInterval =
            setInterval(() => {

                timeLeft--;

                updateTimer();


                if (timeLeft <= 0) {

                    clearInterval(
                        timerInterval
                    );

                    submitTheoryTest(
                        true
                    );

                }

            }, 1000);

    }


    /* =====================================================
       SAVE THEORY TEST START
    ===================================================== */

    if (currentStudent) {

        const studentForTest = {

            studentId:
                currentStudent.studentId ||
                currentStudent.id ||
                urlStudentId,

            studentName:
                getFullName(currentStudent),

            studentPhoto:
                currentStudent.studentPhoto ||
                currentStudent.photo ||
                currentStudent.profilePhoto ||
                "",

            course:
                urlCourse ||
                currentStudent.course ||
                currentStudent.selectedCourse ||
                "",

            testType:
                "THEORY TEST",

            startedAt:
                new Date().toISOString()

        };


        localStorage.setItem(
            "cmCurrentTheoryStudent",
            JSON.stringify(
                studentForTest
            )
        );

    }


    /* =====================================================
       SHOW MESSAGE
    ===================================================== */

    function showMessage(
        message,
        type = "info"
    ) {

        if (!testMessage) {
            return;
        }


        testMessage.textContent =
            message;


        testMessage.className =
            "test-message show";


        if (type === "error") {

            testMessage.style.borderColor =
                "rgba(255,70,100,.45)";

            testMessage.style.background =
                "rgba(255,50,80,.08)";

        } else if (type === "success") {

            testMessage.style.borderColor =
                "rgba(0,255,157,.40)";

            testMessage.style.background =
                "rgba(0,255,157,.07)";

        } else {

            testMessage.style.borderColor =
                "rgba(0,234,255,.20)";

            testMessage.style.background =
                "rgba(0,234,255,.06)";

        }

    }


    /* =====================================================
       SUBMIT TEST
    ===================================================== */

    let testSubmitted = false;


    function submitTheoryTest(
        autoSubmit = false
    ) {

        if (testSubmitted) {
            return;
        }


        testSubmitted = true;


        if (timerInterval) {

            clearInterval(
                timerInterval
            );

        }


        const answered =
            userAnswers.filter(
                answer => answer !== null
            ).length;


        if (
            !autoSubmit &&
            answered < total
        ) {

            const confirmSubmit =
                confirm(
                    `You have answered ${answered} out of ${total} questions.\n\nDo you still want to submit the Theory Test?`
                );


            if (!confirmSubmit) {

                testSubmitted = false;

                startTimer();

                return;

            }

        }


        /* =================================================
           CALCULATE RESULT
        ================================================= */

        let score = 0;

        let wrong = 0;

        let unanswered = 0;


        theoryQuestions.forEach(
            (question, index) => {

                const selected =
                    userAnswers[index];


                if (selected === null) {

                    unanswered++;

                } else if (
                    selected === question.answer
                ) {

                    score++;

                } else {

                    wrong++;

                }

            }
        );


        const percentage =
            Math.round(
                (score / total) * 100
            );


        const passed =
            percentage >= 40;


        /* =================================================
           RESULT OBJECT
        ================================================= */

        const theoryResult = {

            studentId:
                currentStudent?.studentId ||
                currentStudent?.id ||
                urlStudentId ||
                "N/A",

            studentName:
                currentStudent
                    ? getFullName(currentStudent)
                    : "Student",

            studentPhoto:
                currentStudent?.studentPhoto ||
                currentStudent?.photo ||
                currentStudent?.profilePhoto ||
                "",

            course:
                urlCourse ||
                currentStudent?.course ||
                currentStudent?.selectedCourse ||
                "N/A",

            testType:
                "THEORY TEST",

            score:
                score,

            total:
                total,

            percentage:
                percentage,

            correct:
                score,

            wrong:
                wrong,

            unanswered:
                unanswered,

            status:
                passed
                    ? "PASS"
                    : "FAIL",

            date:
                new Date().toLocaleString(
                    "en-IN"
                )

        };


        /* =================================================
           SAVE SEPARATE THEORY RESULT

           IMPORTANT:
           Monthly result key is NOT touched.
        ================================================= */

        let existingResults = [];


        try {

            existingResults =
                JSON.parse(
                    localStorage.getItem(
                        "cmTheoryResults"
                    )
                ) || [];

        } catch (error) {

            existingResults = [];

        }


        /* Remove previous same test result */

        existingResults =
            existingResults.filter(
                result => {

                    return !(
                        String(result.studentId) ===
                            String(theoryResult.studentId)
                        &&
                        result.testType ===
                            "THEORY TEST"
                    );

                }
            );


        existingResults.push(
            theoryResult
        );


        try {

            localStorage.setItem(
                "cmTheoryResults",
                JSON.stringify(
                    existingResults
                )
            );

        } catch (error) {

            console.error(
                "Theory result save error:",
                error
            );

            showMessage(
                "Result save nahi ho paya. Browser storage check karein.",
                "error"
            );

            testSubmitted = false;

            return;

        }


        /* =================================================
           SAVE TEMP RESULT FOR RESULT PAGE
        ================================================= */

        sessionStorage.setItem(
            "cmLastTheoryResult",
            JSON.stringify(
                theoryResult
            )
        );


        /* =================================================
           REDIRECT TO THEORY RESULT
        ================================================= */

        showMessage(
            autoSubmit
                ? "Time over! Theory Test automatically submitted."
                : "Theory Test submitted successfully!",
            "success"
        );


        submitTheoryBtn.disabled =
            true;


        setTimeout(() => {

            window.location.href =
                `theory result.html?studentId=${encodeURIComponent(
                    theoryResult.studentId
                )}`;

        }, 1000);

    }


    /* =====================================================
       SUBMIT BUTTON
    ===================================================== */

    if (submitTheoryBtn) {

        submitTheoryBtn.addEventListener(
            "click",
            () => {

                submitTheoryTest(false);

            }
        );

    }


    /* =====================================================
       START
    ===================================================== */

    if (currentStudent) {

        renderQuestions();

        startTimer();

    }


    /* =====================================================
       PREVENT ACCIDENTAL PAGE CLOSE
    ===================================================== */

    window.addEventListener(
        "beforeunload",
        event => {

            if (
                !testSubmitted &&
                currentStudent
            ) {

                event.preventDefault();

                event.returnValue = "";

            }

        }
    );


    /* =====================================================
       CONSOLE
    ===================================================== */

    console.log(
        "%c CM COMPUTER CENTRE ",
        "background:#00eaff;color:#020712;font-size:16px;font-weight:900;padding:8px 14px;border-radius:8px;"
    );

    console.log(
        "%c THEORY TEST SYSTEM — SEPARATE FROM MONTHLY TEST ",
        "color:#8b5cf6;font-size:12px;font-weight:900;"
    );

});