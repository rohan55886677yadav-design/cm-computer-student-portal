/* =========================================================
   CM COMPUTER CENTRE
   MONTHLY TEST — JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const pageLoader =
        document.getElementById("pageLoader");

    const loginSection =
        document.getElementById("loginSection");

    const testSection =
        document.getElementById("testSection");

    const monthlyLoginForm =
        document.getElementById("monthlyLoginForm");

    const studentIdInput =
        document.getElementById("studentId");

    const studentPassword =
        document.getElementById("studentPassword");

    const loginMessage =
        document.getElementById("loginMessage");

    const studentPhoto =
        document.getElementById("studentPhoto");

    const studentName =
        document.getElementById("studentName");

    const displayStudentId =
        document.getElementById("displayStudentId");

    const logoutBtn =
        document.getElementById("logoutBtn");

    const testYear =
        document.getElementById("testYear");

    const testMonth =
        document.getElementById("testMonth");

    const startTestBtn =
        document.getElementById("startTestBtn");

    const selectedTest =
        document.getElementById("selectedTest");

    const selectedTestTitle =
        document.getElementById("selectedTestTitle");

    const selectedTestDescription =
        document.getElementById("selectedTestDescription");

    const questionArea =
        document.getElementById("questionArea");

    const testStudentName =
        document.getElementById("testStudentName");

    const testStudentId =
        document.getElementById("testStudentId");

    const testTimer =
        document.getElementById("testTimer");

    const questionNumber =
        document.getElementById("questionNumber");

    const questionText =
        document.getElementById("questionText");

    const optionsContainer =
        document.getElementById("optionsContainer");

    const previousBtn =
        document.getElementById("previousBtn");

    const nextBtn =
        document.getElementById("nextBtn");

    const submitTestBtn =
        document.getElementById("submitTestBtn");

    const progressText =
        document.getElementById("progressText");

    const progressFill =
        document.getElementById("progressFill");

    const resultSection =
        document.getElementById("resultSection");

    const resultPhoto =
        document.getElementById("resultPhoto");

    const resultName =
        document.getElementById("resultName");

    const resultStudentId =
        document.getElementById("resultStudentId");

    const resultTestName =
        document.getElementById("resultTestName");

    const resultMarks =
        document.getElementById("resultMarks");

    const resultPercentage =
        document.getElementById("resultPercentage");

    const resultStatus =
        document.getElementById("resultStatus");

    const resultMessage =
        document.getElementById("resultMessage");

    const resultIcon =
        document.getElementById("resultIcon");

    const retryBtn =
        document.getElementById("retryBtn");

    const topButton =
        document.getElementById("topButton");


    /* =====================================================
       VARIABLES
       ===================================================== */

    let currentQuestion = 0;

    let userAnswers = [];

    let timerInterval = null;

    let timeLeft = 50 * 60;

    let currentStudent = {
        name: "Student",
        id: "CMCC-XXXX",
        photo: "image/user.jpeg"
    };


    /* =====================================================
       20 MONTHLY TEST QUESTIONS
       ===================================================== */

    const questions = [

        {
            question: "HTML ka full form kya hai?",
            options: [
                "Hyper Text Markup Language",
                "High Text Machine Language",
                "Hyper Tool Multi Language",
                "Home Text Markup Language"
            ],
            answer: 0
        },

        {
            question: "CSS ka use kis liye hota hai?",
            options: [
                "Website ko style karne ke liye",
                "Database banane ke liye",
                "Server chalane ke liye",
                "Computer format karne ke liye"
            ],
            answer: 0
        },

        {
            question: "HTML mein sabse bada heading tag kaunsa hai?",
            options: [
                "<h6>",
                "<h1>",
                "<head>",
                "<heading>"
            ],
            answer: 1
        },

        {
            question: "CSS mein text ka colour change karne ke liye kya use hota hai?",
            options: [
                "font",
                "text-style",
                "color",
                "background"
            ],
            answer: 2
        },

        {
            question: "JavaScript ka main use kya hai?",
            options: [
                "Website mein interactivity add karna",
                "Only image banana",
                "Computer assemble karna",
                "Printer repair karna"
            ],
            answer: 0
        },

        {
            question: "Computer ka brain kise kaha jata hai?",
            options: [
                "Monitor",
                "Keyboard",
                "CPU",
                "Mouse"
            ],
            answer: 2
        },

        {
            question: "RAM ka full form kya hai?",
            options: [
                "Random Access Memory",
                "Read Access Memory",
                "Run Access Machine",
                "Random Active Machine"
            ],
            answer: 0
        },

        {
            question: "URL ka full form kya hai?",
            options: [
                "Uniform Resource Locator",
                "Universal Read Link",
                "Uniform Record Locator",
                "User Resource Link"
            ],
            answer: 0
        },

        {
            question: "HTML mein image ke liye kaunsa tag use hota hai?",
            options: [
                "<image>",
                "<pic>",
                "<img>",
                "<src>"
            ],
            answer: 2
        },

        {
            question: "CSS mein ID selector kis symbol se start hota hai?",
            options: [
                ".",
                "#",
                "@",
                "$"
            ],
            answer: 1
        },

        {
            question: "CSS mein class selector kis symbol se start hota hai?",
            options: [
                "#",
                ".",
                "@",
                "%"
            ],
            answer: 1
        },

        {
            question: "Keyboard mein Enter key ka use kya hai?",
            options: [
                "Command confirm/new line",
                "Computer shutdown",
                "Screen brightness",
                "Volume increase"
            ],
            answer: 0
        },

        {
            question: "MS Word ka use mainly kis liye hota hai?",
            options: [
                "Document create/edit karne ke liye",
                "Video game ke liye",
                "Internet connection ke liye",
                "Computer cleaning ke liye"
            ],
            answer: 0
        },

        {
            question: "Excel mein formula generally kis symbol se start hota hai?",
            options: [
                "#",
                "=",
                "@",
                "&"
            ],
            answer: 1
        },

        {
            question: "Internet par website open karne ke liye commonly kya use hota hai?",
            options: [
                "Web Browser",
                "Calculator",
                "Notepad",
                "Paint"
            ],
            answer: 0
        },

        {
            question: "Google Chrome kya hai?",
            options: [
                "Web Browser",
                "Operating System",
                "Antivirus",
                "Programming Language"
            ],
            answer: 0
        },

        {
            question: "Windows kya hai?",
            options: [
                "Operating System",
                "Browser",
                "Keyboard",
                "Database"
            ],
            answer: 0
        },

        {
            question: "HTML link banane ke liye kaunsa tag use hota hai?",
            options: [
                "<link>",
                "<a>",
                "<url>",
                "<href>"
            ],
            answer: 1
        },

        {
            question: "CSS mein background colour ke liye kya use hota hai?",
            options: [
                "background-color",
                "bg-color",
                "color-background",
                "back-color"
            ],
            answer: 0
        },

        {
            question: "Computer mein permanent storage ka example kaunsa hai?",
            options: [
                "RAM",
                "Cache",
                "Hard Disk / SSD",
                "Register"
            ],
            answer: 2
        }

    ];


    /* =====================================================
       PAGE LOADER
       ===================================================== */

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (pageLoader) {

                pageLoader.style.opacity = "0";

                pageLoader.style.pointerEvents = "none";

                setTimeout(() => {

                    pageLoader.style.display = "none";

                }, 500);
            }

        }, 900);

    });


    /* =====================================================
       LOAD SAVED STUDENT
       ===================================================== */

    const savedName =
        localStorage.getItem("cmStudentName");

    const savedId =
        localStorage.getItem("cmStudentId");

    const savedPhoto =
        localStorage.getItem("cmStudentPhoto");


    if (savedName && savedId) {

        currentStudent.name = savedName;

        currentStudent.id = savedId;

        if (savedPhoto) {

            currentStudent.photo = savedPhoto;

        }

        showStudentProfile();

    }


    /* =====================================================
       LOGIN
       ===================================================== */

    if (monthlyLoginForm) {

        monthlyLoginForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                const id =
                    studentIdInput.value.trim();

                const password =
                    studentPassword.value.trim();


                if (!id || !password) {

                    loginMessage.textContent =
                        "⚠️ Student ID aur Password dono enter karein.";

                    return;
                }


                currentStudent.id = id;

                currentStudent.name =
                    localStorage.getItem("cmStudentName")
                    || "Student";

                currentStudent.photo =
                    localStorage.getItem("cmStudentPhoto")
                    || "image/user.jpeg";


                localStorage.setItem(
                    "cmMonthlyLogin",
                    "true"
                );

                localStorage.setItem(
                    "cmStudentId",
                    id
                );


                loginMessage.textContent =
                    "✅ Login successful!";


                setTimeout(() => {

                    showStudentProfile();

                }, 500);

            }
        );

    }


    /* =====================================================
       SHOW STUDENT PROFILE
       ===================================================== */

    function showStudentProfile() {

        if (loginSection) {

            loginSection.style.display = "none";

        }

        if (testSection) {

            testSection.style.display = "block";

        }


        if (studentName) {

            studentName.textContent =
                currentStudent.name;

        }


        if (displayStudentId) {

            displayStudentId.textContent =
                currentStudent.id;

        }


        if (studentPhoto) {

            studentPhoto.src =
                currentStudent.photo;

        }


        if (testStudentName) {

            testStudentName.textContent =
                currentStudent.name;

        }


        if (testStudentId) {

            testStudentId.textContent =
                currentStudent.id;

        }


        if (resultPhoto) {

            resultPhoto.src =
                currentStudent.photo;

        }


        if (resultName) {

            resultName.textContent =
                currentStudent.name;

        }


        if (resultStudentId) {

            resultStudentId.textContent =
                currentStudent.id;

        }

    }


    /* =====================================================
       LOGOUT
       ===================================================== */

    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            () => {

                clearTimer();


                localStorage.removeItem(
                    "cmMonthlyLogin"
                );


                if (loginSection) {

                    loginSection.style.display =
                        "flex";

                }


                if (testSection) {

                    testSection.style.display =
                        "none";

                }


                if (questionArea) {

                    questionArea.style.display =
                        "none";

                }


                if (resultSection) {

                    resultSection.style.display =
                        "none";

                }


                if (loginMessage) {

                    loginMessage.textContent =
                        "";

                }


                if (studentPassword) {

                    studentPassword.value =
                        "";

                }


                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       YEAR / MONTH CHANGE
       ===================================================== */

    function updateSelectedTest() {

        if (!testYear || !testMonth) {
            return;
        }

        const year =
            testYear.value;

        const month =
            testMonth.value;


        if (selectedTestTitle) {

            selectedTestTitle.textContent =
                `${month} ${year} Monthly Test`;

        }


        if (selectedTestDescription) {

            selectedTestDescription.textContent =
                `You have selected the ${month} ${year} monthly examination. Click Start Monthly Test to begin.`;

        }

    }


    if (testYear) {

        testYear.addEventListener(
            "change",
            updateSelectedTest
        );

    }


    if (testMonth) {

        testMonth.addEventListener(
            "change",
            updateSelectedTest
        );

    }


    updateSelectedTest();


    /* =====================================================
       START TEST
       ===================================================== */

    if (startTestBtn) {

        startTestBtn.addEventListener(
            "click",
            () => {

                currentQuestion = 0;

                userAnswers =
                    new Array(
                        questions.length
                    ).fill(null);


                timeLeft = 50 * 60;


                if (selectedTest) {

                    selectedTest.style.display =
                        "flex";

                }


                if (questionArea) {

                    questionArea.style.display =
                        "block";

                }


                if (resultSection) {

                    resultSection.style.display =
                        "none";

                }


                startTestBtn.disabled = true;

                startTestBtn.style.opacity = ".6";


                renderQuestion();

                startTimer();


                if (questionArea) {

                    questionArea.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    }


    /* =====================================================
       RENDER QUESTION
       ===================================================== */

    function renderQuestion() {

        const question =
            questions[currentQuestion];


        if (!question) {
            return;
        }


        if (questionNumber) {

            questionNumber.textContent =
                currentQuestion + 1;

        }


        if (questionText) {

            questionText.textContent =
                question.question;

        }


        if (!optionsContainer) {
            return;
        }


        optionsContainer.innerHTML = "";


        question.options.forEach(
            (option, index) => {

                const optionButton =
                    document.createElement("button");


                optionButton.type =
                    "button";


                optionButton.className =
                    "option";


                optionButton.textContent =
                    `${String.fromCharCode(65 + index)}. ${option}`;


                if (
                    userAnswers[currentQuestion]
                    === index
                ) {

                    optionButton.classList.add(
                        "selected"
                    );

                }


                optionButton.addEventListener(
                    "click",
                    () => {

                        userAnswers[currentQuestion] =
                            index;

                        renderQuestion();

                    }
                );


                optionsContainer.appendChild(
                    optionButton
                );

            }
        );


        updateProgress();


        if (previousBtn) {

            previousBtn.disabled =
                currentQuestion === 0;

            previousBtn.style.opacity =
                currentQuestion === 0
                    ? ".5"
                    : "1";

        }


        if (
            currentQuestion ===
            questions.length - 1
        ) {

            if (nextBtn) {

                nextBtn.style.display =
                    "none";

            }


            if (submitTestBtn) {

                submitTestBtn.style.display =
                    "inline-flex";

            }

        } else {

            if (nextBtn) {

                nextBtn.style.display =
                    "inline-flex";

            }


            if (submitTestBtn) {

                submitTestBtn.style.display =
                    "none";

            }

        }

    }


    /* =====================================================
       NEXT
       ===================================================== */

    if (nextBtn) {

        nextBtn.addEventListener(
            "click",
            () => {

                if (
                    currentQuestion <
                    questions.length - 1
                ) {

                    currentQuestion++;

                    renderQuestion();


                    if (questionArea) {

                        questionArea.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }

            }
        );

    }


    /* =====================================================
       PREVIOUS
       ===================================================== */

    if (previousBtn) {

        previousBtn.addEventListener(
            "click",
            () => {

                if (currentQuestion > 0) {

                    currentQuestion--;

                    renderQuestion();


                    if (questionArea) {

                        questionArea.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }

            }
        );

    }


    /* =====================================================
       PROGRESS
       ===================================================== */

    function updateProgress() {

        const total =
            questions.length;

        const current =
            currentQuestion + 1;

        const percentage =
            (current / total) * 100;


        if (progressText) {

            progressText.textContent =
                `${current} / ${total}`;

        }


        if (progressFill) {

            progressFill.style.width =
                `${percentage}%`;

        }

    }


    /* =====================================================
       TIMER
       ===================================================== */

    function startTimer() {

        clearTimer();

        updateTimer();


        timerInterval =
            setInterval(() => {

                timeLeft--;

                updateTimer();


                if (timeLeft <= 0) {

                    clearTimer();

                    finishTest(true);

                }

            }, 1000);

    }


    function updateTimer() {

        const minutes =
            Math.floor(timeLeft / 60);

        const seconds =
            timeLeft % 60;


        if (testTimer) {

            testTimer.textContent =
                `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;


            if (timeLeft <= 5 * 60) {

                testTimer.style.color =
                    "#ff3b5c";

                testTimer.style.textShadow =
                    "0 0 12px #ff1744";

            }

        }

    }


    function clearTimer() {

        if (timerInterval) {

            clearInterval(timerInterval);

            timerInterval = null;

        }

    }


    /* =====================================================
       SUBMIT TEST
       ===================================================== */

    if (submitTestBtn) {

        submitTestBtn.addEventListener(
            "click",
            () => {

                const unanswered =
                    userAnswers.filter(
                        answer =>
                            answer === null
                    ).length;


                if (unanswered > 0) {

                    const confirmSubmit =
                        confirm(
                            `${unanswered} question unanswered hai. Kya aap test submit karna chahte hain?`
                        );


                    if (!confirmSubmit) {

                        return;

                    }

                }


                finishTest(false);

            }
        );

    }


    /* =====================================================
       FINISH TEST
       ===================================================== */

    function finishTest(autoSubmitted) {

        clearTimer();


        let score = 0;


        questions.forEach(
            (question, index) => {

                if (
                    userAnswers[index]
                    === question.answer
                ) {

                    score++;

                }

            }
        );


        const total =
            questions.length;


        const percentage =
            Math.round(
                (score / total) * 100
            );


        const passed =
            percentage >= 40;


        const year =
            testYear.value;


        const month =
            testMonth.value;


        /* =================================================
           SAVE RESULT TO LOCAL STORAGE
           ================================================= */

        const unanswered =
            userAnswers.filter(
                answer =>
                    answer === null
            ).length;


        const wrong =
            total - score - unanswered;


        const monthlyResult = {

            studentId:
                currentStudent.id,

            studentName:
                currentStudent.name,

            studentPhoto:
                currentStudent.photo,

            year:
                String(year),

            month:
                String(month),

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


        let savedResults = [];


        try {

            const oldResults =
                localStorage.getItem(
                    "cmMonthlyResults"
                );


            if (oldResults) {

                savedResults =
                    JSON.parse(oldResults);

            }


            if (!Array.isArray(savedResults)) {

                savedResults = [];

            }

        } catch (error) {

            console.error(
                "Old result read error:",
                error
            );

            savedResults = [];

        }


        /* ================================================
           REMOVE OLD RESULT
           FOR SAME STUDENT + YEAR + MONTH
           ================================================ */

        savedResults =
            savedResults.filter(
                item => {

                    return !(
                        String(item.studentId)
                        ===
                        String(currentStudent.id)

                        &&

                        String(item.year)
                        ===
                        String(year)

                        &&

                        String(item.month)
                            .toLowerCase()
                        ===
                        String(month)
                            .toLowerCase()
                    );

                }
            );


        /* ================================================
           ADD NEW RESULT
           ================================================ */

        savedResults.push(
            monthlyResult
        );


        /* ================================================
           SAVE EVERYTHING
           ================================================ */

        localStorage.setItem(
            "cmMonthlyResults",
            JSON.stringify(
                savedResults
            )
        );


        console.log(
            "✅ MONTHLY RESULT SAVED:",
            monthlyResult
        );


        /* =================================================
           SHOW RESULT ON SAME PAGE
           ================================================= */

        if (questionArea) {

            questionArea.style.display =
                "none";

        }


        if (selectedTest) {

            selectedTest.style.display =
                "none";

        }


        if (resultSection) {

            resultSection.style.display =
                "block";

        }


        if (resultTestName) {

            resultTestName.textContent =
                `${month} ${year}`;

        }


        if (resultMarks) {

            resultMarks.textContent =
                `${score} / ${total}`;

        }


        if (resultPercentage) {

            resultPercentage.textContent =
                `${percentage}%`;

        }


        if (resultStatus) {

            resultStatus.textContent =
                passed
                    ? "PASS"
                    : "FAIL";

        }


        if (resultPhoto) {

            resultPhoto.src =
                currentStudent.photo;

        }


        if (resultName) {

            resultName.textContent =
                currentStudent.name;

        }


        if (resultStudentId) {

            resultStudentId.textContent =
                currentStudent.id;

        }


        if (passed) {

            if (resultStatus) {

                resultStatus.style.color =
                    "#22c55e";

            }


            if (resultIcon) {

                resultIcon.textContent =
                    "🏆";

            }


            if (resultMessage) {

                resultMessage.textContent =
                    autoSubmitted

                        ? "⏰ Time over! Test automatically submit ho gaya. Congratulations, aap PASS hain!"

                        : "🎉 Congratulations! Aapne Monthly Test successfully clear kar liya.";

            }

        } else {

            if (resultStatus) {

                resultStatus.style.color =
                    "#ff4d6d";

            }


            if (resultIcon) {

                resultIcon.textContent =
                    "📚";

            }


            if (resultMessage) {

                resultMessage.textContent =
                    autoSubmitted

                        ? "⏰ Time over! Test automatically submit ho gaya. Is baar test clear nahi hua."

                        : "📖 Test Not Cleared. Thoda aur practice karke dobara try karein.";

            }

        }


        if (resultSection) {

            resultSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }


        if (startTestBtn) {

            startTestBtn.disabled =
                false;

            startTestBtn.style.opacity =
                "1";

        }

    }


    /* =====================================================
       RETRY
       ===================================================== */

    if (retryBtn) {

        retryBtn.addEventListener(
            "click",
            () => {

                currentQuestion = 0;


                userAnswers =
                    new Array(
                        questions.length
                    ).fill(null);


                timeLeft =
                    50 * 60;


                if (resultSection) {

                    resultSection.style.display =
                        "none";

                }


                if (selectedTest) {

                    selectedTest.style.display =
                        "flex";

                }


                if (questionArea) {

                    questionArea.style.display =
                        "block";

                }


                renderQuestion();

                startTimer();


                if (questionArea) {

                    questionArea.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    }


    /* =====================================================
       TOP BUTTON
       ===================================================== */

    if (topButton) {

        topButton.style.display =
            "none";


        window.addEventListener(
            "scroll",
            () => {

                if (window.scrollY > 350) {

                    topButton.style.display =
                        "block";

                } else {

                    topButton.style.display =
                        "none";

                }

            }
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

    }


    /* =====================================================
       SECURITY NOTE
       ===================================================== */

    console.log(
        "CM Computer Centre Monthly Test loaded successfully."
    );

});