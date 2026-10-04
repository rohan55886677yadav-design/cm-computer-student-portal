/* =========================================================
   THEORY NEW JS
   CM COMPUTER CENTRE
   100 QUESTION THEORY EXAM SYSTEM
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       BASIC SETUP
    ========================= */

    const $ = (id) => document.getElementById(id);

    const pageLoader = $("pageLoader");
    const studentPhoto = $("studentPhoto");
    const studentName = $("studentName");
    const studentId = $("studentId");
    const studentCourse = $("studentCourse");

    const totalQuestionsEl = $("totalQuestions");
    const examTimer = $("examTimer");
    const progressText = $("progressText");
    const progressFill = $("progressFill");
    const questionsContainer = $("questionsContainer");
    const submitBtn = $("submitTheoryBtn");
    const testMessage = $("testMessage");
    const currentYear = $("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    setTimeout(() => {
        if (pageLoader) {
            pageLoader.classList.add("hide");
        }
    }, 800);


    /* =========================
       URL PARAMETERS
    ========================= */

    const params = new URLSearchParams(window.location.search);

    const urlStudentId = params.get("studentId") || "";
    const urlCourse = params.get("course") || "";
    const urlModule = params.get("module") || "";
    const urlTest = params.get("test") || "theory";


    /* =========================
       STUDENT DATA
    ========================= */

    let admissions = [];

    try {
        admissions =
            JSON.parse(localStorage.getItem("cmAdmissions")) || [];
    } catch (error) {
        admissions = [];
    }

    let currentStudent = null;

    if (urlStudentId) {
        currentStudent = admissions.find(
            student =>
                String(student.studentId) === String(urlStudentId)
        );
    }

    if (!currentStudent) {
        const savedId =
            localStorage.getItem("cmStudentId");

        if (savedId) {
            currentStudent = admissions.find(
                student =>
                    String(student.studentId) === String(savedId)
            );
        }
    }

    if (!currentStudent && admissions.length > 0) {
        currentStudent = admissions[admissions.length - 1];
    }


    /* =========================
       STUDENT DISPLAY
    ========================= */

    if (currentStudent) {

        const fullName = [
            currentStudent.firstName,
            currentStudent.middleName,
            currentStudent.lastName
        ]
        .filter(Boolean)
        .join(" ");

        const displayName =
            fullName ||
            currentStudent.studentName ||
            localStorage.getItem("cmStudentName") ||
            "Student";

        const displayId =
            currentStudent.studentId ||
            urlStudentId ||
            "---";

        const displayCourse =
            urlCourse ||
            currentStudent.course ||
            "Course";

        if (studentName)
            studentName.textContent = displayName;

        if (studentId)
            studentId.textContent = displayId;

        if (studentCourse)
            studentCourse.textContent = displayCourse;

        const photo =
            currentStudent.studentPhoto ||
            currentStudent.photo ||
            currentStudent.profilePhoto ||
            currentStudent.image ||
            "image/logo.png";

        if (studentPhoto)
            studentPhoto.src = photo;

    } else {

        if (studentName)
            studentName.textContent = "Student Not Found";

        if (studentId)
            studentId.textContent = "---";

        if (studentCourse)
            studentCourse.textContent =
                urlCourse || "Unknown Course";
    }


    /* =========================================================
       QUESTION BANK
       IMPORTANT:
       Har module/course ka question bank alag rakha gaya hai.
    ========================================================= */


    /* =========================
       M1-R5 QUESTIONS
    ========================= */

    const M1Questions = [

        {
            q: "What is a computer?",
            options: [
                "An electronic device",
                "A vegetable",
                "A network cable",
                "Only a calculator"
            ],
            answer: 0
        },

        {
            q: "What is the full form of CPU?",
            options: [
                "Central Processing Unit",
                "Computer Processing Unit",
                "Central Program Unit",
                "Control Processing User"
            ],
            answer: 0
        },

        {
            q: "Which device is used to type text?",
            options: [
                "Keyboard",
                "Monitor",
                "Speaker",
                "Printer"
            ],
            answer: 0
        },

        {
            q: "Which device displays output?",
            options: [
                "Keyboard",
                "Monitor",
                "Mouse",
                "Scanner"
            ],
            answer: 1
        },

        {
            q: "Which is an input device?",
            options: [
                "Printer",
                "Monitor",
                "Keyboard",
                "Speaker"
            ],
            answer: 2
        },

        {
            q: "Which is an output device?",
            options: [
                "Keyboard",
                "Mouse",
                "Scanner",
                "Printer"
            ],
            answer: 3
        },

        {
            q: "What is RAM?",
            options: [
                "Temporary memory",
                "Permanent memory",
                "Printer memory",
                "Internet memory"
            ],
            answer: 0
        },

        {
            q: "What is ROM?",
            options: [
                "Temporary memory",
                "Read Only Memory",
                "Random Output Memory",
                "Run Only Memory"
            ],
            answer: 1
        },

        {
            q: "Which is an operating system?",
            options: [
                "Windows",
                "Keyboard",
                "Google",
                "Mouse"
            ],
            answer: 0
        },

        {
            q: "Which software is used for documents?",
            options: [
                "MS Word",
                "Calculator",
                "Paint",
                "Notepad only"
            ],
            answer: 0
        },

        {
            q: "Which software is mainly used for spreadsheets?",
            options: [
                "MS Word",
                "MS Excel",
                "Paint",
                "PowerPoint"
            ],
            answer: 1
        },

        {
            q: "Which software is used for presentations?",
            options: [
                "MS Excel",
                "MS Word",
                "PowerPoint",
                "Notepad"
            ],
            answer: 2
        },

        {
            q: "What is a file?",
            options: [
                "A collection of stored information",
                "A keyboard",
                "A monitor",
                "A mouse"
            ],
            answer: 0
        },

        {
            q: "What is a folder?",
            options: [
                "Used to organise files",
                "Used to print",
                "Used as keyboard",
                "Used as RAM"
            ],
            answer: 0
        },

        {
            q: "Which shortcut is used for Copy?",
            options: [
                "Ctrl + X",
                "Ctrl + C",
                "Ctrl + V",
                "Ctrl + Z"
            ],
            answer: 1
        },

        {
            q: "Which shortcut is used for Paste?",
            options: [
                "Ctrl + P",
                "Ctrl + C",
                "Ctrl + V",
                "Ctrl + A"
            ],
            answer: 2
        },

        {
            q: "Which shortcut is used for Save?",
            options: [
                "Ctrl + S",
                "Ctrl + D",
                "Ctrl + E",
                "Ctrl + W"
            ],
            answer: 0
        },

        {
            q: "Which shortcut selects all content?",
            options: [
                "Ctrl + A",
                "Ctrl + B",
                "Ctrl + C",
                "Ctrl + F"
            ],
            answer: 0
        },

        {
            q: "Which shortcut is used for Undo?",
            options: [
                "Ctrl + Y",
                "Ctrl + U",
                "Ctrl + Z",
                "Ctrl + X"
            ],
            answer: 2
        },

        {
            q: "Which shortcut is used for printing?",
            options: [
                "Ctrl + P",
                "Ctrl + R",
                "Ctrl + T",
                "Ctrl + L"
            ],
            answer: 0
        }

    ];


    /* =========================
       M2-R5 QUESTIONS
    ========================= */

    const M2Questions = [

        {
            q: "What does HTML stand for?",
            options: [
                "Hyper Text Markup Language",
                "High Text Machine Language",
                "Hyper Tool Multi Language",
                "Home Text Markup Language"
            ],
            answer: 0
        },

        {
            q: "Which tag creates a paragraph?",
            options: [
                "<p>",
                "<h1>",
                "<br>",
                "<div>"
            ],
            answer: 0
        },

        {
            q: "Which tag creates the largest heading?",
            options: [
                "<h6>",
                "<h1>",
                "<head>",
                "<title>"
            ],
            answer: 1
        },

        {
            q: "Which tag creates a hyperlink?",
            options: [
                "<link>",
                "<a>",
                "<url>",
                "<href>"
            ],
            answer: 1
        },

        {
            q: "Which tag displays an image?",
            options: [
                "<image>",
                "<img>",
                "<picture>",
                "<src>"
            ],
            answer: 1
        },

        {
            q: "What does CSS stand for?",
            options: [
                "Cascading Style Sheets",
                "Computer Style System",
                "Creative Style Sheet",
                "Colorful Style System"
            ],
            answer: 0
        },

        {
            q: "CSS is mainly used for?",
            options: [
                "Design and styling",
                "Database",
                "Hardware",
                "Printing only"
            ],
            answer: 0
        },

        {
            q: "Which symbol represents a class selector in CSS?",
            options: [
                "#",
                ".",
                "@",
                "$"
            ],
            answer: 1
        },

        {
            q: "Which symbol represents an ID selector?",
            options: [
                ".",
                "#",
                "*",
                "&"
            ],
            answer: 1
        },

        {
            q: "Which property changes text colour?",
            options: [
                "font",
                "color",
                "text",
                "background"
            ],
            answer: 1
        },

        {
            q: "Which property changes background colour?",
            options: [
                "background-color",
                "color",
                "bg",
                "background-text"
            ],
            answer: 0
        },

        {
            q: "Which property controls outside spacing?",
            options: [
                "padding",
                "margin",
                "border",
                "space"
            ],
            answer: 1
        },

        {
            q: "Which property controls inside spacing?",
            options: [
                "padding",
                "margin",
                "border",
                "gap-only"
            ],
            answer: 0
        },

        {
            q: "What is JavaScript mainly used for?",
            options: [
                "Making web pages interactive",
                "Only printing",
                "Only writing documents",
                "Only storing files"
            ],
            answer: 0
        },

        {
            q: "Which keyword declares a variable in JavaScript?",
            options: [
                "let",
                "style",
                "html",
                "css"
            ],
            answer: 0
        },

        {
            q: "Which method prints information in the browser console?",
            options: [
                "console.log()",
                "print.console()",
                "log.console()",
                "browser.print()"
            ],
            answer: 0
        },

        {
            q: "Which file extension is commonly used for JavaScript?",
            options: [
                ".css",
                ".html",
                ".js",
                ".java"
            ],
            answer: 2
        },

        {
            q: "Which file extension is used for CSS?",
            options: [
                ".css",
                ".js",
                ".html",
                ".style"
            ],
            answer: 0
        },

        {
            q: "Which file extension is used for HTML?",
            options: [
                ".htm",
                ".html",
                ".web",
                "Both .htm and .html"
            ],
            answer: 3
        },

        {
            q: "Which tag creates an unordered list?",
            options: [
                "<ol>",
                "<ul>",
                "<li>",
                "<list>"
            ],
            answer: 1
        }

    ];


    /* =========================
       M3-R5 QUESTIONS
    ========================= */

    const M3Questions = [

        {
            q: "What is a database?",
            options: [
                "Organised collection of data",
                "A monitor",
                "A keyboard",
                "A printer"
            ],
            answer: 0
        },

        {
            q: "What does DBMS stand for?",
            options: [
                "Database Management System",
                "Data Basic Management Software",
                "Digital Backup Management System",
                "Database Machine Software"
            ],
            answer: 0
        },

        {
            q: "Which language is commonly used with databases?",
            options: [
                "SQL",
                "HTML",
                "CSS",
                "XML only"
            ],
            answer: 0
        },

        {
            q: "What does SQL stand for?",
            options: [
                "Structured Query Language",
                "Simple Query List",
                "System Query Language",
                "Standard Question Language"
            ],
            answer: 0
        },

        {
            q: "Which command is used to retrieve data?",
            options: [
                "SELECT",
                "DELETE",
                "DROP",
                "REMOVE"
            ],
            answer: 0
        },

        {
            q: "Which command adds data?",
            options: [
                "INSERT",
                "SELECT",
                "DROP",
                "READ"
            ],
            answer: 0
        },

        {
            q: "Which command modifies existing data?",
            options: [
                "UPDATE",
                "INSERT",
                "SELECT",
                "CREATE"
            ],
            answer: 0
        },

        {
            q: "Which command removes records?",
            options: [
                "DELETE",
                "REMOVE ALL",
                "CLEAR",
                "ERASE"
            ],
            answer: 0
        },

        {
            q: "What is a table?",
            options: [
                "Rows and columns containing data",
                "Only a picture",
                "A printer",
                "An operating system"
            ],
            answer: 0
        },

        {
            q: "What is a primary key?",
            options: [
                "Uniquely identifies a record",
                "A password only",
                "A file name",
                "A folder"
            ],
            answer: 0
        },

        {
            q: "What is a record?",
            options: [
                "A row of related data",
                "A column only",
                "A database server",
                "A formula"
            ],
            answer: 0
        },

        {
            q: "What is a field?",
            options: [
                "A column in a table",
                "A complete database",
                "A computer",
                "A server"
            ],
            answer: 0
        },

        {
            q: "What is data?",
            options: [
                "Raw facts and information",
                "Only programs",
                "Only hardware",
                "Only websites"
            ],
            answer: 0
        },

        {
            q: "What is a query?",
            options: [
                "A request for information",
                "A printer",
                "A keyboard shortcut",
                "A folder"
            ],
            answer: 0
        },

        {
            q: "Which key can uniquely identify records?",
            options: [
                "Primary key",
                "Space key",
                "Enter key",
                "Shift key"
            ],
            answer: 0
        },

        {
            q: "What is a database table made of?",
            options: [
                "Rows and columns",
                "Only rows",
                "Only columns",
                "Only images"
            ],
            answer: 0
        },

        {
            q: "Which SQL command creates a table?",
            options: [
                "CREATE TABLE",
                "MAKE TABLE",
                "NEW TABLE",
                "TABLE CREATE"
            ],
            answer: 0
        },

        {
            q: "Which SQL command removes a table?",
            options: [
                "DROP TABLE",
                "DELETE TABLE",
                "REMOVE TABLE",
                "CLEAR TABLE"
            ],
            answer: 0
        },

        {
            q: "What is data backup?",
            options: [
                "Copy of data for recovery",
                "Deleting data",
                "Formatting disk",
                "Changing password"
            ],
            answer: 0
        },

        {
            q: "Why is a database used?",
            options: [
                "To store and manage data",
                "To display videos only",
                "To play music only",
                "To type documents only"
            ],
            answer: 0
        }

    ];


    /* =========================
       M4-R5 QUESTIONS
    ========================= */

    const M4Questions = [

        {
            q: "What is the Internet?",
            options: [
                "A global network of computers",
                "A single computer",
                "A printer",
                "An operating system"
            ],
            answer: 0
        },

        {
            q: "What is a web browser?",
            options: [
                "Software used to access websites",
                "A printer",
                "A keyboard",
                "A hard disk"
            ],
            answer: 0
        },

        {
            q: "Which is a web browser?",
            options: [
                "Chrome",
                "Excel",
                "Word",
                "Paint"
            ],
            answer: 0
        },

        {
            q: "What is a search engine?",
            options: [
                "A service used to search information online",
                "A keyboard",
                "A monitor",
                "A printer"
            ],
            answer: 0
        },

        {
            q: "Which is a search engine?",
            options: [
                "Google",
                "Word",
                "Excel",
                "Windows"
            ],
            answer: 0
        },

        {
            q: "What is email?",
            options: [
                "Electronic mail",
                "Electronic machine",
                "Easy mail",
                "Emergency mail"
            ],
            answer: 0
        },

        {
            q: "What does URL stand for?",
            options: [
                "Uniform Resource Locator",
                "Universal Record Link",
                "User Resource Link",
                "Uniform Routing Language"
            ],
            answer: 0
        },

        {
            q: "What does HTTP stand for?",
            options: [
                "HyperText Transfer Protocol",
                "High Transfer Text Protocol",
                "Hyper Tool Transfer Program",
                "Home Text Transfer Protocol"
            ],
            answer: 0
        },

        {
            q: "What does HTTPS provide?",
            options: [
                "Secure communication",
                "More storage",
                "Printer control",
                "Faster keyboard"
            ],
            answer: 0
        },

        {
            q: "What is a password?",
            options: [
                "Secret authentication information",
                "A file",
                "A folder",
                "A monitor"
            ],
            answer: 0
        },

        {
            q: "What is antivirus software?",
            options: [
                "Software that helps detect malware",
                "A browser",
                "A keyboard",
                "A spreadsheet"
            ],
            answer: 0
        },

        {
            q: "What is malware?",
            options: [
                "Malicious software",
                "Mail software",
                "Management software",
                "Monitor software"
            ],
            answer: 0
        },

        {
            q: "What is phishing?",
            options: [
                "A fraudulent attempt to obtain sensitive information",
                "A printing method",
                "A programming language",
                "A storage device"
            ],
            answer: 0
        },

        {
            q: "What is cloud storage?",
            options: [
                "Online data storage",
                "RAM",
                "A keyboard",
                "A printer"
            ],
            answer: 0
        },

        {
            q: "What is Wi-Fi?",
            options: [
                "Wireless networking technology",
                "A printer",
                "A hard disk",
                "A CPU"
            ],
            answer: 0
        },

        {
            q: "What is a modem?",
            options: [
                "A device used for network communication",
                "A monitor",
                "A keyboard",
                "A printer"
            ],
            answer: 0
        },

        {
            q: "What is a computer network?",
            options: [
                "Connected computers/devices",
                "One keyboard",
                "One monitor",
                "One printer"
            ],
            answer: 0
        },

        {
            q: "What is cyber security?",
            options: [
                "Protection of systems and data",
                "Making presentations",
                "Printing documents",
                "Editing photos"
            ],
            answer: 0
        },

        {
            q: "Why should strong passwords be used?",
            options: [
                "To improve account security",
                "To increase screen size",
                "To print faster",
                "To increase RAM"
            ],
            answer: 0
        },

        {
            q: "Which is a safe online practice?",
            options: [
                "Do not share passwords",
                "Share OTP publicly",
                "Use the same password everywhere",
                "Click every unknown link"
            ],
            answer: 0
        }

    ];


    /* =========================
       GENERAL COURSE QUESTIONS
    ========================= */

    const GeneralQuestions = [

        {
            q: "Which application is used to create documents?",
            options: [
                "MS Word",
                "MS Excel",
                "Calculator",
                "Paint"
            ],
            answer: 0
        },

        {
            q: "Which application is used for calculations?",
            options: [
                "MS Excel",
                "MS Word",
                "Paint",
                "Notepad"
            ],
            answer: 0
        },

        {
            q: "Which application is used for presentations?",
            options: [
                "PowerPoint",
                "Excel",
                "Word",
                "Notepad"
            ],
            answer: 0
        },

        {
            q: "What is a keyboard?",
            options: [
                "Input device",
                "Output device",
                "Storage device",
                "Network"
            ],
            answer: 0
        },

        {
            q: "What is a mouse?",
            options: [
                "Pointing input device",
                "Output device",
                "Printer",
                "Storage"
            ],
            answer: 0
        },

        {
            q: "What is a printer?",
            options: [
                "Output device",
                "Input device",
                "CPU",
                "RAM"
            ],
            answer: 0
        },

        {
            q: "What is a hard disk used for?",
            options: [
                "Data storage",
                "Typing",
                "Displaying images",
                "Printing"
            ],
            answer: 0
        },

        {
            q: "Which unit is commonly used for computer storage?",
            options: [
                "GB",
                "Metre",
                "Litre",
                "Volt only"
            ],
            answer: 0
        },

        {
            q: "Which is larger?",
            options: [
                "1 GB",
                "1 KB",
                "1 Byte",
                "1 Bit"
            ],
            answer: 0
        },

        {
            q: "What is an application?",
            options: [
                "Software designed for a specific task",
                "Only hardware",
                "Only cable",
                "Only CPU"
            ],
            answer: 0
        },

        {
            q: "What is software?",
            options: [
                "Programs used by a computer",
                "Physical parts",
                "Keyboard only",
                "Monitor only"
            ],
            answer: 0
        },

        {
            q: "What is hardware?",
            options: [
                "Physical components",
                "Programs",
                "Websites",
                "Files only"
            ],
            answer: 0
        },

        {
            q: "Which component performs calculations?",
            options: [
                "CPU",
                "Monitor",
                "Keyboard",
                "Printer"
            ],
            answer: 0
        },

        {
            q: "Which memory is volatile?",
            options: [
                "RAM",
                "ROM",
                "DVD",
                "Hard disk"
            ],
            answer: 0
        },

        {
            q: "Which is a storage device?",
            options: [
                "SSD",
                "Keyboard",
                "Mouse",
                "Monitor"
            ],
            answer: 0
        },

        {
            q: "What is an icon?",
            options: [
                "Small graphical representation",
                "A CPU",
                "A cable",
                "A printer"
            ],
            answer: 0
        },

        {
            q: "What is the desktop?",
            options: [
                "Main screen/work area of an OS",
                "Keyboard",
                "CPU",
                "Printer"
            ],
            answer: 0
        },

        {
            q: "What is a shortcut?",
            options: [
                "Quick way to perform an action",
                "A printer",
                "A hard disk",
                "A monitor"
            ],
            answer: 0
        },

        {
            q: "What is a computer virus?",
            options: [
                "Malicious program",
                "Hardware",
                "Monitor",
                "Keyboard"
            ],
            answer: 0
        },

        {
            q: "Why are software updates important?",
            options: [
                "They can improve security and functionality",
                "They make keyboard larger",
                "They remove electricity",
                "They increase monitor size"
            ],
            answer: 0
        }

    ];


    /* =========================================================
       SELECT QUESTION BANK
    ========================================================= */

    let questionBank = GeneralQuestions;

    if (urlCourse.toLowerCase() === "o level") {

        if (urlModule === "M1-R5") {
            questionBank = M1Questions;
        }
        else if (urlModule === "M2-R5") {
            questionBank = M2Questions;
        }
        else if (urlModule === "M3-R5") {
            questionBank = M3Questions;
        }
        else if (urlModule === "M4-R5") {
            questionBank = M4Questions;
        }

    }


    /* =========================================================
       MAKE 100 QUESTIONS
       Abhi demo bank chhota hai, isliye questions repeat
       nahi balki bank ko cycle karke 100-question exam
       structure banaya gaya hai.
       
       Real final version mein yahan M1/M2/M3/M4 ke
       exact 100-100 unique questions rakhenge.
    ========================================================= */

    const questions = [];

    for (let i = 0; i < 100; i++) {

        const original =
            questionBank[i % questionBank.length];

        questions.push({
            id: i + 1,
            q: original.q,
            options: [...original.options],
            answer: original.answer
        });
    }


    /* =========================
       EXAM VARIABLES
    ========================= */

    const TOTAL_QUESTIONS = 100;

    const EXAM_TIME = 60 * 60;

    let timeLeft = EXAM_TIME;

    let currentQuestion = 0;

    const selectedAnswers =
        new Array(TOTAL_QUESTIONS).fill(null);


    /* =========================
       DISPLAY TOTAL
    ========================= */

    if (totalQuestionsEl) {
        totalQuestionsEl.textContent =
            TOTAL_QUESTIONS;
    }


    /* =========================
       RENDER QUESTIONS
    ========================= */

    function renderQuestions() {

        if (!questionsContainer) return;

        questionsContainer.innerHTML = "";

        questions.forEach((question, index) => {

            const card =
                document.createElement("div");

            card.className = "question-card";

            card.dataset.question =
                index + 1;

            const optionsHTML =
                question.options.map(
                    (option, optionIndex) => {

                        return `
                            <label class="answer-option">
                                <input
                                    type="radio"
                                    name="question-${index}"
                                    value="${optionIndex}"
                                    data-question="${index}"
                                >

                                <span class="option-letter">
                                    ${String.fromCharCode(65 + optionIndex)}
                                </span>

                                <span class="option-text">
                                    ${escapeHTML(option)}
                                </span>
                            </label>
                        `;

                    }
                ).join("");

            card.innerHTML = `

                <div class="question-header">

                    <span class="question-number">
                        QUESTION ${String(index + 1).padStart(2, "0")}
                    </span>

                    <span class="question-mark">
                        1 MARK
                    </span>

                </div>

                <h3 class="question-title">
                    ${index + 1}. ${escapeHTML(question.q)}
                </h3>

                <div class="options-grid">
                    ${optionsHTML}
                </div>

            `;

            questionsContainer.appendChild(card);

        });


        attachOptionEvents();

        restoreAnswers();

        updateProgress();
    }


    /* =========================
       ESCAPE HTML
    ========================= */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =========================
       OPTION EVENTS
    ========================= */

    function attachOptionEvents() {

        const inputs =
            questionsContainer.querySelectorAll(
                'input[type="radio"]'
            );

        inputs.forEach(input => {

            input.addEventListener(
                "change",
                () => {

                    const questionIndex =
                        Number(
                            input.dataset.question
                        );

                    selectedAnswers[
                        questionIndex
                    ] = Number(input.value);

                    updateSelectedStyle(
                        questionIndex
                    );

                    updateProgress();

                }
            );

        });

    }


    /* =========================
       SELECTED STYLE
    ========================= */

    function updateSelectedStyle(index) {

        const card =
            questionsContainer.querySelector(
                `.question-card[data-question="${index + 1}"]`
            );

        if (!card) return;

        const options =
            card.querySelectorAll(
                ".answer-option"
            );

        options.forEach(option => {

            option.classList.remove(
                "selected"
            );

        });

        const checked =
            card.querySelector(
                'input[type="radio"]:checked'
            );

        if (checked) {

            checked
                .closest(".answer-option")
                ?.classList.add("selected");

        }

    }


    /* =========================
       RESTORE ANSWERS
    ========================= */

    function restoreAnswers() {

        selectedAnswers.forEach(
            (answer, index) => {

                if (answer === null) return;

                const input =
                    questionsContainer.querySelector(
                        `input[data-question="${index}"][value="${answer}"]`
                    );

                if (input) {

                    input.checked = true;

                    updateSelectedStyle(
                        index
                    );

                }

            }
        );

    }


    /* =========================
       PROGRESS
    ========================= */

    function updateProgress() {

        const answered =
            selectedAnswers.filter(
                answer => answer !== null
            ).length;

        if (progressText) {

            progressText.textContent =
                `${answered} / ${TOTAL_QUESTIONS} Answered`;

        }

        if (progressFill) {

            const percentage =
                (answered / TOTAL_QUESTIONS) * 100;

            progressFill.style.width =
                `${percentage}%`;

        }

    }


    /* =========================
       TIMER
    ========================= */

    function formatTime(seconds) {

        const hours =
            Math.floor(seconds / 3600);

        const minutes =
            Math.floor(
                (seconds % 3600) / 60
            );

        const secs =
            seconds % 60;

        return (
            String(hours).padStart(2, "0") +
            ":" +
            String(minutes).padStart(2, "0") +
            ":" +
            String(secs).padStart(2, "0")
        );

    }


    function updateTimer() {

        if (!examTimer) return;

        examTimer.textContent =
            formatTime(timeLeft);

        if (timeLeft <= 300) {

            examTimer.classList.add(
                "timer-danger"
            );

        }

        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            submitExam(true);

        }

    }


    updateTimer();

    const timerInterval =
        setInterval(
            () => {

                timeLeft--;

                updateTimer();

            },
            1000
        );


    /* =========================================================
       SAVE CURRENT EXAM
    ========================================================= */

    const examStudent = {

        studentId:
            currentStudent?.studentId ||
            urlStudentId,

        studentName:
            studentName?.textContent ||
            "Student",

        course:
            urlCourse ||
            currentStudent?.course ||
            "",

        module:
            urlModule ||
            "",

        testType:
            urlTest,

        startedAt:
            new Date().toISOString()

    };


    sessionStorage.setItem(
        "cmCurrentTheoryNewStudent",
        JSON.stringify(examStudent)
    );


    /* =========================
       SUBMIT EXAM
    ========================= */

    if (submitBtn) {

        submitBtn.addEventListener(
            "click",
            () => submitExam(false)
        );

    }


    let submitted = false;


    function submitExam(autoSubmit) {

        if (submitted) return;

        submitted = true;

        clearInterval(timerInterval);

        let correct = 0;
        let wrong = 0;
        let unanswered = 0;

        questions.forEach(
            (question, index) => {

                const selected =
                    selectedAnswers[index];

                if (selected === null) {

                    unanswered++;

                }
                else if (
                    selected === question.answer
                ) {

                    correct++;

                }
                else {

                    wrong++;

                }

            }
        );


        const total =
            TOTAL_QUESTIONS;

        const percentage =
            Math.round(
                (correct / total) * 100
            );

        const passed =
            percentage >= 40;


        const result = {

            studentId:
                currentStudent?.studentId ||
                urlStudentId,

            studentName:
                currentStudent?.firstName
                    ? [
                        currentStudent.firstName,
                        currentStudent.middleName,
                        currentStudent.lastName
                    ]
                    .filter(Boolean)
                    .join(" ")
                    : (
                        currentStudent?.studentName ||
                        studentName?.textContent ||
                        "Student"
                    ),

            studentPhoto:
                currentStudent?.studentPhoto ||
                currentStudent?.photo ||
                "",

            course:
                urlCourse ||
                currentStudent?.course ||
                "",

            module:
                urlModule ||
                "",

            testType:
                "THEORY",

            total,

            correct,

            wrong,

            unanswered,

            score: correct,

            percentage,

            status:
                passed
                    ? "PASS"
                    : "FAIL",

            date:
                new Date().toLocaleString(
                    "en-IN"
                )

        };


        /* =========================
           SAVE RESULT
        ========================= */

        let results = [];

        try {

            results =
                JSON.parse(
                    localStorage.getItem(
                        "cmTheoryNewResults"
                    )
                ) || [];

        }
        catch (error) {

            results = [];

        }


        /*
          Same student + same course +
          same module = latest result update
        */

        results =
            results.filter(
                oldResult =>
                    !(
                        String(oldResult.studentId) ===
                        String(result.studentId) &&

                        String(oldResult.course) ===
                        String(result.course) &&

                        String(oldResult.module) ===
                        String(result.module)
                    )
            );


        results.push(result);


        try {

            localStorage.setItem(
                "cmTheoryNewResults",
                JSON.stringify(results)
            );

            sessionStorage.setItem(
                "cmLastTheoryNewResult",
                JSON.stringify(result)
            );

        }
        catch (error) {

            console.error(
                "Result save error:",
                error
            );

        }


        /* =========================
           MESSAGE
        ========================= */

        if (testMessage) {

            testMessage.innerHTML = `
                <div class="result-saving">
                    <strong>
                        ${autoSubmit
                            ? "⏰ Time Over"
                            : "✓ Test Submitted"}
                    </strong>

                    <span>
                        Result: ${result.status}
                        • Score: ${correct}/${total}
                        • ${percentage}%
                    </span>
                </div>
            `;

            testMessage.classList.add(
                "show"
            );

        }


        /* =========================
           REDIRECT
        ========================= */

        setTimeout(
            () => {

                const resultParams =
                    new URLSearchParams();

                resultParams.set(
                    "studentId",
                    result.studentId
                );

                resultParams.set(
                    "course",
                    result.course
                );

                resultParams.set(
                    "module",
                    result.module
                );


                window.location.href =
                    "theory new result.html?" +
                    resultParams.toString();

            },
            1200
        );

    }


    /* =========================
       BEFORE LEAVE
    ========================= */

    window.addEventListener(
        "beforeunload",
        event => {

            if (!submitted) {

                event.preventDefault();

                event.returnValue =
                    "Your theory test is still running.";

            }

        }
    );


    /* =========================
       CONSOLE
    ========================= */

    console.log(
        "%c CM COMPUTER CENTRE ",
        "background:#00eaff;color:#001018;font-weight:900;padding:8px;border-radius:6px;"
    );

    console.log(
        "100 Question Theory Examination System"
    );


    /* =========================
       START
    ========================= */

    renderQuestions();

});