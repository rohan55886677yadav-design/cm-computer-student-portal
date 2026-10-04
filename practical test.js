/* =========================================================
   CM COMPUTER CENTRE
   PRACTICAL TEST SYSTEM
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";

    /* =====================================================
       HELPERS
    ===================================================== */

    const $ = (id) => document.getElementById(id);

    function readJSON(key, fallback) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : fallback;
        } catch (error) {
            console.warn("Storage read error:", key, error);
            return fallback;
        }
    }

    function writeJSON(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.warn("Storage write error:", key, error);
            return false;
        }
    }

    function escapeHTML(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    /* =====================================================
       LOADER
    ===================================================== */

    const pageLoader = $("pageLoader");

    setTimeout(function () {
        if (pageLoader) {
            pageLoader.classList.add("hide");

            setTimeout(function () {
                pageLoader.style.display = "none";
            }, 500);
        }
    }, 700);


    /* =====================================================
       YEAR
    ===================================================== */

    if ($("currentYear")) {
        $("currentYear").textContent = new Date().getFullYear();
    }


    /* =====================================================
       URL PARAMETERS
    ===================================================== */

    const params = new URLSearchParams(window.location.search);

    const urlStudentId = params.get("studentId") || "";
    const urlCourse = params.get("course") || "";


    /* =====================================================
       COURSE NORMALISER
    ===================================================== */

    function normaliseCourse(course) {

        const value = String(course || "")
            .trim()
            .toLowerCase();

        if (value.includes("o level") || value.includes("olevel")) {
            return "O Level";
        }

        if (value.includes("web")) {
            return "Web Designing";
        }

        if (value.includes("pgdca")) {
            return "PGDCA";
        }

        if (value.includes("adca")) {
            return "ADCA";
        }

        if (value === "ccc" || value.includes("ccc")) {
            return "CCC";
        }

        if (value.includes("tally")) {
            return "Tally";
        }

        if (value === "dca" || value.includes("dca")) {
            return "DCA";
        }

        if (
            value.includes("ms office") ||
            value.includes("msoffice") ||
            value === "office"
        ) {
            return "MS Office";
        }

        return String(course || "").trim();
    }


    /* =====================================================
       ADMISSION DATA
    ===================================================== */

    const admissions = readJSON("cmAdmissions", []);

    let currentStudent = null;


    if (urlStudentId) {

        currentStudent = admissions.find(function (student) {

            return String(
                student.studentId ||
                student.id ||
                ""
            ) === String(urlStudentId);

        });

    }


    /* =====================================================
       FALLBACK STUDENT
    ===================================================== */

    if (!currentStudent) {

        const savedAdmission =
            readJSON("cmStudentAdmission", null);

        if (
            savedAdmission &&
            typeof savedAdmission === "object"
        ) {
            currentStudent = savedAdmission;
        }

    }


    if (!currentStudent && admissions.length > 0) {

        currentStudent =
            admissions[admissions.length - 1];

    }


    /* =====================================================
       STUDENT NAME
    ===================================================== */

    function getStudentName(student) {

        if (!student) {
            return "Student";
        }

        if (
            student.name &&
            String(student.name).trim()
        ) {
            return String(student.name).trim();
        }

        return [
            student.firstName,
            student.middleName,
            student.lastName
        ]
        .filter(function (item) {
            return item && String(item).trim();
        })
        .join(" ")
        .trim() || "Student";

    }


    const studentName =
        getStudentName(currentStudent);


    const studentId =
        currentStudent?.studentId ||
        currentStudent?.id ||
        urlStudentId ||
        "N/A";


    const selectedCourse =
        normaliseCourse(
            urlCourse ||
            currentStudent?.course ||
            currentStudent?.selectedCourse ||
            ""
        );


    const studentPhoto =
        currentStudent?.studentPhoto ||
        currentStudent?.photo ||
        currentStudent?.profilePhoto ||
        currentStudent?.profilePhotoUrl ||
        "";


    /* =====================================================
       DISPLAY STUDENT
    ===================================================== */

    if ($("studentName")) {
        $("studentName").textContent =
            studentName;
    }

    if ($("studentId")) {
        $("studentId").textContent =
            studentId;
    }

    if ($("studentCourse")) {
        $("studentCourse").textContent =
            selectedCourse || "Not Selected";
    }


    /* =====================================================
       STUDENT PHOTO
       HTML HAS DIV #studentPhoto
    ===================================================== */

    const photoBox = $("studentPhoto");

    if (photoBox) {

        if (studentPhoto) {

            photoBox.innerHTML = `
                <img
                    src="${escapeHTML(studentPhoto)}"
                    alt="Student Photo"
                    loading="lazy"
                >
            `;

        } else {

            photoBox.innerHTML = `
                <div class="photo-placeholder">
                    👤
                </div>
            `;

        }

    }


    /* =====================================================
       PRACTICAL QUESTIONS

       EVERY COURSE = EXACTLY 3 QUESTIONS

       ADCA       = WORD + EXCEL + POWERPOINT
       CCC        = WORD + EXCEL + POWERPOINT
       TALLY      = WORD + EXCEL + TALLY
       DCA        = WORD + EXCEL + POWERPOINT
       PGDCA      = WORD + EXCEL + POWERPOINT
       MS OFFICE  = WORD + EXCEL + POWERPOINT
       O LEVEL    = NOTEPAD / CODE EDITOR
       WEB DESIGN = CODE EDITOR + LIVE PREVIEW
    ===================================================== */

    const PRACTICAL_TASKS = {

        "ADCA": [

            {
                id: "ADCA-WORD",
                type: "word",
                software: "MS Word",
                icon: "📝",
                title: "MS Word Practical",
                description:
                    "Create and format a professional computer centre notice.",
                instructions: [
                    "Type: CM COMPUTER CENTRE",
                    "Make the heading bold.",
                    "Centre align the heading.",
                    "Type: Practical Examination Notice",
                    "Write two short lines about the practical examination.",
                    "Underline one important word.",
                    "Use a larger font size for the main heading."
                ],
                marks: 10
            },

            {
                id: "ADCA-EXCEL",
                type: "excel",
                software: "MS Excel",
                icon: "📊",
                title: "MS Excel Practical",
                description:
                    "Create a student marksheet and calculate totals.",
                instructions: [
                    "Create columns: Name, HTML, CSS, JavaScript and Total.",
                    "Enter at least 5 student records.",
                    "Enter marks in the subject columns.",
                    "Use a SUM formula for Total.",
                    "Make the heading row bold.",
                    "Centre align the table.",
                    "Apply borders."
                ],
                marks: 10
            },

            {
                id: "ADCA-POWERPOINT",
                type: "presentation",
                software: "MS PowerPoint",
                icon: "📽️",
                title: "MS PowerPoint Practical",
                description:
                    "Create a simple presentation slide about computer education.",
                instructions: [
                    "Type: CM COMPUTER CENTRE",
                    "Add the title: Computer Education",
                    "Write three points about computer education.",
                    "Make the main title bold.",
                    "Centre align the title.",
                    "Use a larger font for the title."
                ],
                marks: 10
            }

        ],


        "CCC": [

            {
                id: "CCC-WORD",
                type: "word",
                software: "MS Word",
                icon: "📝",
                title: "MS Word Practical",
                description:
                    "Create a CCC course admission notice.",
                instructions: [
                    "Type: CCC COMPUTER COURSE",
                    "Make the heading bold.",
                    "Centre align the heading.",
                    "Type: Admission Notice",
                    "Write two lines about CCC course.",
                    "Underline one important word.",
                    "Change the heading font size."
                ],
                marks: 10
            },

            {
                id: "CCC-EXCEL",
                type: "excel",
                software: "MS Excel",
                icon: "📊",
                title: "MS Excel Practical",
                description:
                    "Create a student attendance sheet.",
                instructions: [
                    "Create columns: Name, Day 1, Day 2, Day 3 and Total.",
                    "Enter at least 5 students.",
                    "Enter attendance values.",
                    "Use SUM for Total.",
                    "Make headers bold.",
                    "Centre align the table.",
                    "Apply borders."
                ],
                marks: 10
            },

            {
                id: "CCC-POWERPOINT",
                type: "presentation",
                software: "MS PowerPoint",
                icon: "📽️",
                title: "MS PowerPoint Practical",
                description:
                    "Create a presentation about digital skills.",
                instructions: [
                    "Type: CCC COMPUTER COURSE",
                    "Add the title: Digital Skills",
                    "Write three points about digital skills.",
                    "Make the title bold.",
                    "Centre align the title.",
                    "Use a larger font for the title."
                ],
                marks: 10
            }

        ],


        "Tally": [

            {
                id: "TALLY-WORD",
                type: "word",
                software: "MS Word",
                icon: "📝",
                title: "MS Word Practical",
                description:
                    "Create a business notice related to accounting training.",
                instructions: [
                    "Type: BUSINESS NOTICE",
                    "Make the heading bold.",
                    "Centre align the heading.",
                    "Type: Tally Practical Training",
                    "Write two lines about accounting training.",
                    "Underline one important word.",
                    "Use a suitable heading size."
                ],
                marks: 10
            },

            {
                id: "TALLY-EXCEL",
                type: "excel",
                software: "MS Excel",
                icon: "📊",
                title: "MS Excel Practical",
                description:
                    "Create a sales calculation sheet.",
                instructions: [
                    "Create columns: Product, Quantity, Rate and Amount.",
                    "Enter at least 5 products.",
                    "Enter quantity and rate.",
                    "Calculate Amount using a formula.",
                    "Make headers bold.",
                    "Centre align the table.",
                    "Apply borders."
                ],
                marks: 10
            },

            {
                id: "TALLY-PRACTICAL",
                type: "tally",
                software: "Tally",
                icon: "🧾",
                title: "Tally Practical",
                description:
                    "Prepare a simple Tally voucher-style entry.",
                instructions: [
                    "Type: SALES VOUCHER",
                    "Enter Party Name.",
                    "Enter Invoice Number.",
                    "Enter Product Name.",
                    "Enter Quantity.",
                    "Enter Rate.",
                    "Enter Total Amount.",
                    "Keep the voucher information organised."
                ],
                marks: 10
            }

        ],


        "DCA": [

            {
                id: "DCA-WORD",
                type: "word",
                software: "MS Word",
                icon: "📝",
                title: "MS Word Practical",
                description:
                    "Create a DCA practical examination notice.",
                instructions: [
                    "Type: DCA COMPUTER COURSE",
                    "Make the heading bold.",
                    "Centre align the heading.",
                    "Type: Practical Examination",
                    "Write two short lines.",
                    "Underline one important word."
                ],
                marks: 10
            },

            {
                id: "DCA-EXCEL",
                type: "excel",
                software: "MS Excel",
                icon: "📊",
                title: "MS Excel Practical",
                description:
                    "Create a student marksheet.",
                instructions: [
                    "Create columns: Name, Computer, English, Maths and Total.",
                    "Enter at least 5 students.",
                    "Enter marks.",
                    "Use SUM for Total.",
                    "Make headers bold.",
                    "Centre align the table.",
                    "Apply borders."
                ],
                marks: 10
            },

            {
                id: "DCA-POWERPOINT",
                type: "presentation",
                software: "MS PowerPoint",
                icon: "📽️",
                title: "MS PowerPoint Practical",
                description:
                    "Create a presentation about computer applications.",
                instructions: [
                    "Type: DCA COURSE",
                    "Add the title: Computer Applications",
                    "Write three points.",
                    "Make the title bold.",
                    "Centre align the title.",
                    "Use a larger font for the title."
                ],
                marks: 10
            }

        ],


        "PGDCA": [

            {
                id: "PGDCA-WORD",
                type: "word",
                software: "MS Word",
                icon: "📝",
                title: "MS Word Practical",
                description:
                    "Create a PGDCA examination notice.",
                instructions: [
                    "Type: PGDCA COURSE",
                    "Make the heading bold.",
                    "Centre align the heading.",
                    "Type: Practical Examination Notice",
                    "Write two lines.",
                    "Underline one important word."
                ],
                marks: 10
            },

            {
                id: "PGDCA-EXCEL",
                type: "excel",
                software: "MS Excel",
                icon: "📊",
                title: "MS Excel Practical",
                description:
                    "Create a PGDCA marksheet.",
                instructions: [
                    "Create columns: Name, Theory, Practical and Total.",
                    "Enter at least 5 students.",
                    "Enter marks.",
                    "Use SUM for Total.",
                    "Make headers bold.",
                    "Centre align the table.",
                    "Apply borders."
                ],
                marks: 10
            },

            {
                id: "PGDCA-POWERPOINT",
                type: "presentation",
                software: "MS PowerPoint",
                icon: "📽️",
                title: "MS PowerPoint Practical",
                description:
                    "Create an advanced computer applications presentation.",
                instructions: [
                    "Type: PGDCA",
                    "Add the title: Advanced Computer Applications",
                    "Write three points.",
                    "Make the title bold.",
                    "Centre align the title.",
                    "Use a larger font."
                ],
                marks: 10
            }

        ],


        "MS Office": [

            {
                id: "OFFICE-WORD",
                type: "word",
                software: "MS Word",
                icon: "📝",
                title: "MS Word Practical",
                description:
                    "Create a professional office notice.",
                instructions: [
                    "Type: OFFICE NOTICE",
                    "Make the heading bold.",
                    "Centre align the heading.",
                    "Type: Meeting Information",
                    "Write two short lines.",
                    "Underline one important word."
                ],
                marks: 10
            },

            {
                id: "OFFICE-EXCEL",
                type: "excel",
                software: "MS Excel",
                icon: "📊",
                title: "MS Excel Practical",
                description:
                    "Create an employee salary sheet.",
                instructions: [
                    "Create columns: Name, Basic Salary, Allowance and Total.",
                    "Enter at least 5 employees.",
                    "Calculate Total using a formula.",
                    "Make headers bold.",
                    "Apply borders.",
                    "Centre align the table."
                ],
                marks: 10
            },

            {
                id: "OFFICE-POWERPOINT",
                type: "presentation",
                software: "MS PowerPoint",
                icon: "📽️",
                title: "MS PowerPoint Practical",
                description:
                    "Create an office productivity presentation.",
                instructions: [
                    "Type: MS OFFICE",
                    "Add the title: Office Productivity",
                    "Write three points.",
                    "Make the title bold.",
                    "Centre align the title.",
                    "Use a larger font."
                ],
                marks: 10
            }

        ],


        "O Level": [

            {
                id: "OLEVEL-1",
                type: "code",
                software: "Notepad / Code Editor",
                icon: "💻",
                title: "Notepad Practical 1",
                description:
                    "Create a basic HTML document.",
                instructions: [
                    "Create a basic HTML document.",
                    "Use HTML, HEAD and BODY.",
                    "Add a title.",
                    "Add an H1 heading.",
                    "Add one paragraph."
                ],
                marks: 10
            },

            {
                id: "OLEVEL-2",
                type: "code",
                software: "Notepad / Code Editor",
                icon: "💻",
                title: "Notepad Practical 2",
                description:
                    "Create a student information webpage.",
                instructions: [
                    "Create an HTML page.",
                    "Add a heading: Student Information.",
                    "Add Name, Course and Centre.",
                    "Use paragraph or list elements.",
                    "Keep the HTML properly structured."
                ],
                marks: 10
            },

            {
                id: "OLEVEL-3",
                type: "code",
                software: "Notepad / Code Editor",
                icon: "💻",
                title: "Notepad Practical 3",
                description:
                    "Create a webpage with a list and hyperlink.",
                instructions: [
                    "Create an HTML document.",
                    "Add a heading.",
                    "Create an unordered list.",
                    "Add at least three list items.",
                    "Add one hyperlink."
                ],
                marks: 10
            }

        ],


        "Web Designing": [

            {
                id: "WEB-1",
                type: "code",
                software: "Code Editor + Live Preview",
                icon: "🌐",
                title: "Web Designing Practical 1",
                description:
                    "Create a basic webpage.",
                instructions: [
                    "Create HTML structure.",
                    "Add a heading.",
                    "Add a paragraph.",
                    "Add a button.",
                    "Check your result in Live Preview."
                ],
                marks: 10
            },

            {
                id: "WEB-2",
                type: "code",
                software: "Code Editor + Live Preview",
                icon: "🌐",
                title: "Web Designing Practical 2",
                description:
                    "Create a simple navigation bar.",
                instructions: [
                    "Create a navbar.",
                    "Add Home, About, Courses and Contact.",
                    "Add CSS styling.",
                    "Give the navbar a background.",
                    "Check the Live Preview."
                ],
                marks: 10
            },

            {
                id: "WEB-3",
                type: "code",
                software: "Code Editor + Live Preview",
                icon: "🌐",
                title: "Web Designing Practical 3",
                description:
                    "Create a course card.",
                instructions: [
                    "Create a course card using HTML.",
                    "Add course name.",
                    "Add a short description.",
                    "Add a button.",
                    "Use CSS for border, spacing and background.",
                    "Check Live Preview."
                ],
                marks: 10
            }

        ]

    };


    /* =====================================================
       GET COURSE TASKS
    ===================================================== */

    let tasks =
        PRACTICAL_TASKS[selectedCourse];


    /* =====================================================
       UNKNOWN COURSE
    ===================================================== */

    if (!tasks) {

        tasks = [
            {
                id: "DEFAULT-WORD",
                type: "word",
                software: "MS Word",
                icon: "📝",
                title: "MS Word Practical",
                description:
                    "Complete the basic document formatting task.",
                instructions: [
                    "Type a heading.",
                    "Make the heading bold.",
                    "Centre align it.",
                    "Write two lines."
                ],
                marks: 10
            },

            {
                id: "DEFAULT-EXCEL",
                type: "excel",
                software: "MS Excel",
                icon: "📊",
                title: "MS Excel Practical",
                description:
                    "Complete the spreadsheet task.",
                instructions: [
                    "Create a table.",
                    "Enter data.",
                    "Use a SUM formula.",
                    "Apply borders."
                ],
                marks: 10
            },

            {
                id: "DEFAULT-PPT",
                type: "presentation",
                software: "MS PowerPoint",
                icon: "📽️",
                title: "MS PowerPoint Practical",
                description:
                    "Complete the presentation task.",
                instructions: [
                    "Type a title.",
                    "Make it bold.",
                    "Centre align it.",
                    "Add three points."
                ],
                marks: 10
            }
        ];

    }


    /* =====================================================
       EXACTLY 3
    ===================================================== */

    tasks = tasks.slice(0, 3);


    /* =====================================================
       TEST VARIABLES
    ===================================================== */

    let currentTaskIndex = 0;

    let remainingSeconds = 50 * 60;

    let timerInterval = null;

    let submitted = false;

    let activeExcelCell = null;

    let selectedExcelCells = [];

    let excelRows = 50;

    let excelColumns = 12;


    /* =====================================================
       TASK DATA
    ===================================================== */

    const taskData = {};


    tasks.forEach(function (task) {

        taskData[task.id] = {

            type: task.type,

            content: "",

            html: "",

            css: "",

            excel: [],

            completed: false,

            changes: 0,

            score: 0

        };

    });


    /* =====================================================
       RESTORE SAVED PROGRESS
    ===================================================== */

    const allProgress =
        readJSON("cmPracticalProgress", {});


    const savedProgress =
        allProgress[String(studentId)];


    if (
        savedProgress &&
        normaliseCourse(savedProgress.course) ===
        selectedCourse
    ) {

        if (
            typeof savedProgress.remainingSeconds ===
            "number"
        ) {

            remainingSeconds =
                Math.max(
                    0,
                    Math.min(
                        50 * 60,
                        savedProgress.remainingSeconds
                    )
                );

        }


        if (
            typeof savedProgress.currentTaskIndex ===
            "number"
        ) {

            currentTaskIndex =
                Math.max(
                    0,
                    Math.min(
                        tasks.length - 1,
                        savedProgress.currentTaskIndex
                    )
                );

        }


        if (savedProgress.taskData) {

            tasks.forEach(function (task) {

                if (savedProgress.taskData[task.id]) {

                    Object.assign(
                        taskData[task.id],
                        savedProgress.taskData[task.id]
                    );

                }

            });

        }

    }


    /* =====================================================
       EXAM INFORMATION
    ===================================================== */

    if ($("totalTasks")) {
        $("totalTasks").textContent =
            tasks.length;
    }

    if ($("totalMarks")) {
        $("totalMarks").textContent =
            tasks.reduce(
                (total, task) =>
                    total + Number(task.marks || 0),
                0
            );
    }


    /* =====================================================
       WORD EDITOR
    ===================================================== */

    const editor =
        $("documentEditor");


    const fontFamily =
        $("fontFamily");


    const fontSize =
        $("fontSize");


    const textColor =
        $("textColor");


    const backgroundColor =
        $("backgroundColor");


    function runEditorCommand(command, value) {

        if (!editor) return;

        editor.focus();

        try {

            if (command === "left") {
                document.execCommand(
                    "justifyLeft",
                    false,
                    null
                );
            }

            else if (command === "center") {
                document.execCommand(
                    "justifyCenter",
                    false,
                    null
                );
            }

            else if (command === "right") {
                document.execCommand(
                    "justifyRight",
                    false,
                    null
                );
            }

            else {
                document.execCommand(
                    command,
                    false,
                    value || null
                );
            }

        } catch (error) {

            console.warn(
                "Editor command error:",
                command
            );

        }

        markChanged();

        saveCurrentTask();

    }


    document
        .querySelectorAll(".tool-btn")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const command =
                        button.dataset.command;

                    if (command) {

                        runEditorCommand(
                            command
                        );

                    }

                }
            );

        });


    if (fontFamily) {

        fontFamily.addEventListener(
            "change",
            function () {

                runEditorCommand(
                    "fontName",
                    fontFamily.value
                );

            }
        );

    }


    if (fontSize) {

        fontSize.addEventListener(
            "change",
            function () {

                runEditorCommand(
                    "fontSize",
                    fontSize.value
                );

            }
        );

    }


    if (textColor) {

        textColor.addEventListener(
            "input",
            function () {

                runEditorCommand(
                    "foreColor",
                    textColor.value
                );

            }
        );

    }


    if (backgroundColor) {

        backgroundColor.addEventListener(
            "input",
            function () {

                runEditorCommand(
                    "hiliteColor",
                    backgroundColor.value
                );

            }
        );

    }


    if (editor) {

        editor.addEventListener(
            "input",
            function () {

                markChanged();

                updateCompletion();

                saveCurrentTask();

            }
        );

    }


    /* =====================================================
       EXCEL
    ===================================================== */

    const spreadsheet =
        $("spreadsheet");


    const formulaBar =
        $("formulaBar");


    const addRowBtn =
        $("addRowBtn");


    const addColumnBtn =
        $("addColumnBtn");


    function columnLetter(number) {

        let result = "";

        let n = number + 1;


        while (n > 0) {

            const remainder =
                (n - 1) % 26;

            result =
                String.fromCharCode(
                    65 + remainder
                ) + result;

            n =
                Math.floor(
                    (n - 1) / 26
                );

        }


        return result;

    }


    function createExcelGrid() {

        if (!spreadsheet) return;


        spreadsheet.innerHTML = "";


        const header =
            document.createElement("tr");


        const empty =
            document.createElement("th");

        header.appendChild(empty);


        for (
            let column = 0;
            column < excelColumns;
            column++
        ) {

            const th =
                document.createElement("th");

            th.textContent =
                columnLetter(column);

            th.dataset.column =
                column;

            th.className =
                "excel-column-header";

            header.appendChild(th);

        }


        spreadsheet.appendChild(header);


        for (
            let row = 0;
            row < excelRows;
            row++
        ) {

            const tr =
                document.createElement("tr");


            const rowHeader =
                document.createElement("th");

            rowHeader.textContent =
                row + 1;

            rowHeader.className =
                "excel-row-header";

            rowHeader.dataset.row =
                row;

            tr.appendChild(rowHeader);


            for (
                let column = 0;
                column < excelColumns;
                column++
            ) {

                const td =
                    document.createElement("td");

                td.contentEditable =
                    "true";

                td.className =
                    "excel-cell";

                td.dataset.row =
                    row;

                td.dataset.col =
                    column;

                td.dataset.address =
                    columnLetter(column) +
                    (row + 1);

                tr.appendChild(td);

            }


            spreadsheet.appendChild(tr);

        }


        restoreExcelTask();

        bindExcelEvents();

    }


    function getExcelCells() {

        if (!spreadsheet) {
            return [];
        }

        return [
            ...spreadsheet.querySelectorAll(
                ".excel-cell"
            )
        ];

    }


    function getExcelCell(row, column) {

        if (!spreadsheet) return null;

        return spreadsheet.querySelector(
            `.excel-cell[data-row="${row}"][data-col="${column}"]`
        );

    }


    function clearExcelSelection() {

        getExcelCells().forEach(
            function (cell) {

                cell.classList.remove(
                    "selected"
                );

            }
        );

        selectedExcelCells = [];

    }


    function selectExcelCell(cell) {

        clearExcelSelection();

        if (!cell) return;

        cell.classList.add(
            "selected"
        );

        selectedExcelCells = [cell];

        activeExcelCell = cell;

        updateFormulaBar();

    }


    function selectExcelRange(start, end) {

        clearExcelSelection();

        if (!start || !end) return;


        const startRow =
            Number(start.dataset.row);

        const startCol =
            Number(start.dataset.col);

        const endRow =
            Number(end.dataset.row);

        const endCol =
            Number(end.dataset.col);


        const minRow =
            Math.min(startRow, endRow);

        const maxRow =
            Math.max(startRow, endRow);

        const minCol =
            Math.min(startCol, endCol);

        const maxCol =
            Math.max(startCol, endCol);


        for (
            let row = minRow;
            row <= maxRow;
            row++
        ) {

            for (
                let column = minCol;
                column <= maxCol;
                column++
            ) {

                const cell =
                    getExcelCell(
                        row,
                        column
                    );

                if (cell) {

                    cell.classList.add(
                        "selected"
                    );

                    selectedExcelCells.push(
                        cell
                    );

                }

            }

        }


        activeExcelCell = start;

        updateFormulaBar();

    }


    function updateFormulaBar() {

        if (!formulaBar) return;

        formulaBar.value =
            activeExcelCell
                ? activeExcelCell.innerText
                : "";

    }


    function bindExcelEvents() {

        getExcelCells().forEach(
            function (cell) {

                cell.addEventListener(
                    "mousedown",
                    function (event) {

                        if (
                            event.shiftKey &&
                            activeExcelCell
                        ) {

                            selectExcelRange(
                                activeExcelCell,
                                cell
                            );

                        } else {

                            selectExcelCell(
                                cell
                            );

                        }

                    }
                );


                cell.addEventListener(
                    "focus",
                    function () {

                        activeExcelCell =
                            cell;

                        updateFormulaBar();

                    }
                );


                cell.addEventListener(
                    "input",
                    function () {

                        markChanged();

                        updateCompletion();

                        saveCurrentTask();

                    }
                );


                cell.addEventListener(
                    "keydown",
                    function (event) {

                        excelKeyboard(
                            event,
                            cell
                        );

                    }
                );

            }
        );


        document
            .querySelectorAll(
                ".excel-column-header"
            )
            .forEach(
                function (header) {

                    header.addEventListener(
                        "click",
                        function () {

                            const column =
                                Number(
                                    header.dataset.column
                                );

                            clearExcelSelection();

                            for (
                                let row = 0;
                                row < excelRows;
                                row++
                            ) {

                                const cell =
                                    getExcelCell(
                                        row,
                                        column
                                    );

                                if (cell) {

                                    cell.classList.add(
                                        "selected"
                                    );

                                    selectedExcelCells.push(
                                        cell
                                    );

                                }

                            }

                        }
                    );

                }
            );


        document
            .querySelectorAll(
                ".excel-row-header"
            )
            .forEach(
                function (header) {

                    header.addEventListener(
                        "click",
                        function () {

                            const row =
                                Number(
                                    header.dataset.row
                                );

                            clearExcelSelection();

                            for (
                                let column = 0;
                                column < excelColumns;
                                column++
                            ) {

                                const cell =
                                    getExcelCell(
                                        row,
                                        column
                                    );

                                if (cell) {

                                    cell.classList.add(
                                        "selected"
                                    );

                                    selectedExcelCells.push(
                                        cell
                                    );

                                }

                            }

                        }
                    );

                }
            );

    }


    function excelKeyboard(event, cell) {

        const row =
            Number(cell.dataset.row);

        const column =
            Number(cell.dataset.col);


        /* CTRL + A */

        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "a"
        ) {

            event.preventDefault();

            clearExcelSelection();

            getExcelCells().forEach(
                function (item) {

                    item.classList.add(
                        "selected"
                    );

                    selectedExcelCells.push(
                        item
                    );

                }
            );

            activeExcelCell =
                cell;

            return;

        }


        /* CTRL + B */

        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "b"
        ) {

            event.preventDefault();

            selectedExcelCells.forEach(
                function (item) {

                    item.style.fontWeight =
                        item.style.fontWeight === "bold"
                            ? "normal"
                            : "bold";

                }
            );

            markChanged();

            saveCurrentTask();

            return;

        }


        /* CTRL + I */

        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "i"
        ) {

            event.preventDefault();

            selectedExcelCells.forEach(
                function (item) {

                    item.style.fontStyle =
                        item.style.fontStyle === "italic"
                            ? "normal"
                            : "italic";

                }
            );

            markChanged();

            saveCurrentTask();

            return;

        }


        /* CTRL + U */

        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "u"
        ) {

            event.preventDefault();

            selectedExcelCells.forEach(
                function (item) {

                    item.style.textDecoration =
                        item.style.textDecoration ===
                        "underline"
                            ? "none"
                            : "underline";

                }
            );

            markChanged();

            saveCurrentTask();

            return;

        }


        /* DELETE */

        if (
            event.key === "Delete" &&
            selectedExcelCells.length > 1
        ) {

            event.preventDefault();

            selectedExcelCells.forEach(
                function (item) {

                    item.innerText = "";

                }
            );

            markChanged();

            saveCurrentTask();

            return;

        }


        /* ENTER */

        if (event.key === "Enter") {

            event.preventDefault();

            const next =
                getExcelCell(
                    row + 1,
                    column
                );

            if (next) {

                next.focus();

                selectExcelCell(
                    next
                );

            }

            return;

        }


        /* TAB */

        if (event.key === "Tab") {

            event.preventDefault();

            const next =
                getExcelCell(
                    row,
                    column + 1
                );

            if (next) {

                next.focus();

                selectExcelCell(
                    next
                );

            }

            return;

        }


        /* DOWN */

        if (event.key === "ArrowDown") {

            event.preventDefault();

            const next =
                getExcelCell(
                    row + 1,
                    column
                );

            if (next) {

                next.focus();

                selectExcelCell(
                    next
                );

            }

            return;

        }


        /* UP */

        if (event.key === "ArrowUp") {

            event.preventDefault();

            const next =
                getExcelCell(
                    row - 1,
                    column
                );

            if (next) {

                next.focus();

                selectExcelCell(
                    next
                );

            }

            return;

        }


        /* RIGHT */

        if (
            event.key === "ArrowRight" &&
            !event.shiftKey
        ) {

            const next =
                getExcelCell(
                    row,
                    column + 1
                );

            if (next) {

                event.preventDefault();

                next.focus();

                selectExcelCell(
                    next
                );

            }

            return;

        }


        /* LEFT */

        if (
            event.key === "ArrowLeft" &&
            !event.shiftKey
        ) {

            const next =
                getExcelCell(
                    row,
                    column - 1
                );

            if (next) {

                event.preventDefault();

                next.focus();

                selectExcelCell(
                    next
                );

            }

        }

    }


    /* =====================================================
       FORMULA BAR
    ===================================================== */

    if (formulaBar) {

        formulaBar.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    if (activeExcelCell) {

                        activeExcelCell.innerText =
                            formulaBar.value;

                        markChanged();

                        saveCurrentTask();

                    }

                }

            }
        );

    }


    /* =====================================================
       EXCEL DATA
    ===================================================== */

    function getExcelData() {

        return getExcelCells().map(
            function (cell) {

                return {

                    row:
                        cell.dataset.row,

                    col:
                        cell.dataset.col,

                    address:
                        cell.dataset.address,

                    value:
                        cell.innerText,

                    html:
                        cell.innerHTML,

                    style:
                        cell.getAttribute(
                            "style"
                        ) || ""

                };

            }
        );

    }


    function restoreExcelTask() {

        const task =
            tasks[currentTaskIndex];

        if (!task) return;


        const data =
            taskData[task.id];


        if (!data || !data.excel) {
            return;
        }


        data.excel.forEach(
            function (savedCell) {

                const cell =
                    getExcelCell(
                        Number(savedCell.row),
                        Number(savedCell.col)
                    );

                if (!cell) return;


                cell.innerHTML =
                    savedCell.html ||
                    escapeHTML(
                        savedCell.value || ""
                    );


                if (savedCell.style) {

                    cell.setAttribute(
                        "style",
                        savedCell.style
                    );

                }

            }
        );

    }


    if (addRowBtn) {

        addRowBtn.addEventListener(
            "click",
            function () {

                excelRows++;

                createExcelGrid();

                markChanged();

                saveCurrentTask();

            }
        );

    }


    if (addColumnBtn) {

        addColumnBtn.addEventListener(
            "click",
            function () {

                excelColumns++;

                createExcelGrid();

                markChanged();

                saveCurrentTask();

            }
        );

    }


    /* =====================================================
       CODE EDITOR
    ===================================================== */

    const htmlCode =
        $("htmlCode");

    const cssCode =
        $("cssCode");

    const livePreview =
        $("livePreview");


    function updateLivePreview() {

        if (!livePreview) return;


        const html =
            htmlCode?.value || "";

        const css =
            cssCode?.value || "";


        livePreview.srcdoc = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport"
      content="width=device-width, initial-scale=1.0">

<style>
${css}
</style>

</head>

<body>

${html}

</body>
</html>
`;

    }


    if (htmlCode) {

        htmlCode.addEventListener(
            "input",
            function () {

                updateLivePreview();

                markChanged();

                updateCompletion();

                saveCurrentTask();

            }
        );

    }


    if (cssCode) {

        cssCode.addEventListener(
            "input",
            function () {

                updateLivePreview();

                markChanged();

                updateCompletion();

                saveCurrentTask();

            }
        );

    }


    /* =====================================================
       SHOW / HIDE WORKSPACES
    ===================================================== */

    function showWorkspace(element, show) {

        if (!element) return;

        element.hidden = !show;

        element.style.display =
            show ? "" : "none";

    }


    /* =====================================================
       LOAD CURRENT TASK
    ===================================================== */

    function loadTask() {

        const task =
            tasks[currentTaskIndex];

        if (!task) return;


        /* Task number */

        if ($("currentTaskNumber")) {

            $("currentTaskNumber").textContent =
                `${currentTaskIndex + 1} / ${tasks.length}`;

        }


        /* Title */

        if ($("taskTitle")) {

            $("taskTitle").textContent =
                task.title;

        }


        /* Description */

        if ($("taskDescription")) {

            $("taskDescription").textContent =
                task.description;

        }


        /* Marks */

        if ($("taskMarks")) {

            $("taskMarks").textContent =
                task.marks;

        }


        /* Software */

        if ($("taskSoftware")) {

            $("taskSoftware").textContent =
                task.software;

        }


        /* Software icon */

        if ($("softwareIcon")) {

            $("softwareIcon").textContent =
                task.icon;

        }


        /* Software name */

        if ($("softwareName")) {

            $("softwareName").textContent =
                task.software;

        }


        /* Workspace mode */

        if ($("workspaceMode")) {

            $("workspaceMode").textContent =
                task.software;

        }


        /* Instructions */

        const instructions =
            $("taskInstructions");


        if (instructions) {

            instructions.innerHTML = "";


            task.instructions.forEach(
                function (instruction) {

                    const li =
                        document.createElement("li");

                    li.textContent =
                        instruction;

                    instructions.appendChild(
                        li
                    );

                }
            );

        }


        /* Workspace */

        showWorkspace(
            $("wordWorkspace"),
            task.type === "word" ||
            task.type === "presentation" ||
            task.type === "tally"
        );


        showWorkspace(
            $("excelWorkspace"),
            task.type === "excel"
        );


        showWorkspace(
            $("codeWorkspace"),
            task.type === "code"
        );


        /* Restore editor */

        if (
            task.type === "word" ||
            task.type === "presentation" ||
            task.type === "tally"
        ) {

            if (editor) {

                editor.innerHTML =
                    taskData[task.id].content ||
                    `
                    <h2>Practical Work Area</h2>
                    <p>Start your practical task here...</p>
                    `;

            }

        }


        /* Excel */

        if (task.type === "excel") {

            createExcelGrid();

        }


        /* Code */

        if (task.type === "code") {

            const data =
                taskData[task.id];


            if (htmlCode) {

                htmlCode.value =
                    data.html || "";

            }


            if (cssCode) {

                cssCode.value =
                    data.css || "";

            }


            updateLivePreview();

        }


        /* Progress */

        if ($("taskProgressText")) {

            $("taskProgressText").textContent =
                `Task ${currentTaskIndex + 1} of ${tasks.length}`;

        }


        if ($("taskProgressFill")) {

            const percent =
                ((currentTaskIndex + 1) /
                tasks.length) * 100;

            $("taskProgressFill").style.width =
                `${percent}%`;

        }


        /* Previous */

        if ($("previousTaskBtn")) {

            $("previousTaskBtn").disabled =
                currentTaskIndex === 0;

        }


        /* Next */

        if ($("nextTaskBtn")) {

            $("nextTaskBtn").disabled =
                currentTaskIndex ===
                tasks.length - 1;

        }


        updateCompletion();

    }


    /* =====================================================
       COMPLETION
    ===================================================== */

    function currentTaskText() {

        const task =
            tasks[currentTaskIndex];

        if (!task) return "";


        if (
            task.type === "word" ||
            task.type === "presentation" ||
            task.type === "tally"
        ) {

            return editor?.innerText || "";

        }


        if (task.type === "excel") {

            return getExcelCells()
                .map(
                    cell =>
                        cell.innerText || ""
                )
                .join(" ");

        }


        if (task.type === "code") {

            return (
                (htmlCode?.value || "") +
                "\n" +
                (cssCode?.value || "")
            );

        }


        return "";

    }


    function updateCompletion() {

        const task =
            tasks[currentTaskIndex];

        if (!task) return;


        const text =
            currentTaskText().trim();


        const completed =
            text.length >= 10;


        taskData[task.id].completed =
            completed;


        if ($("taskCompleted")) {

            $("taskCompleted").checked =
                completed;

        }

    }


    /* =====================================================
       MARK CHANGE
    ===================================================== */

    function markChanged() {

        const task =
            tasks[currentTaskIndex];

        if (!task) return;


        taskData[task.id].changes++;


        if ($("saveStatus")) {

            $("saveStatus").textContent =
                "Saving...";

        }

    }


    /* =====================================================
       SAVE CURRENT TASK
    ===================================================== */

    function saveCurrentTask() {

        const task =
            tasks[currentTaskIndex];

        if (!task) return;


        const data =
            taskData[task.id];


        if (
            task.type === "word" ||
            task.type === "presentation" ||
            task.type === "tally"
        ) {

            data.content =
                editor?.innerHTML || "";

        }


        if (task.type === "excel") {

            data.excel =
                getExcelData();

        }


        if (task.type === "code") {

            data.html =
                htmlCode?.value || "";

            data.css =
                cssCode?.value || "";

        }


        const progress =
            readJSON(
                "cmPracticalProgress",
                {}
            );


        progress[String(studentId)] = {

            studentId:

                String(studentId),

            studentName,

            course:

                selectedCourse,

            currentTaskIndex,

            remainingSeconds,

            taskData,

            updatedAt:

                new Date().toISOString()

        };


        if (
            writeJSON(
                "cmPracticalProgress",
                progress
            )
        ) {

            if ($("saveStatus")) {

                $("saveStatus").textContent =
                    "Saved ✓";

            }

        }

    }


    /* =====================================================
       TIMER
    ===================================================== */

    function formatTime(seconds) {

        const minutes =
            Math.floor(seconds / 60);

        const secondsLeft =
            seconds % 60;


        return (
            String(minutes).padStart(2, "0") +
            ":" +
            String(secondsLeft).padStart(2, "0")
        );

    }


    function updateTimer() {

        if ($("examTimer")) {

            $("examTimer").textContent =
                formatTime(
                    remainingSeconds
                );

        }

    }


    function startTimer() {

        updateTimer();


        timerInterval =
            setInterval(
                function () {

                    if (submitted) {
                        return;
                    }


                    remainingSeconds--;


                    updateTimer();


                    if (
                        remainingSeconds <= 0
                    ) {

                        remainingSeconds = 0;

                        updateTimer();

                        clearInterval(
                            timerInterval
                        );

                        submitPractical(
                            true
                        );

                    }

                },
                1000
            );

    }


    /* =====================================================
       NAVIGATION
    ===================================================== */

    if ($("previousTaskBtn")) {

        $("previousTaskBtn")
            .addEventListener(
                "click",
                function () {

                    saveCurrentTask();


                    if (
                        currentTaskIndex > 0
                    ) {

                        currentTaskIndex--;

                        loadTask();

                        window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        });

                    }

                }
            );

    }


    if ($("nextTaskBtn")) {

        $("nextTaskBtn")
            .addEventListener(
                "click",
                function () {

                    saveCurrentTask();


                    if (
                        currentTaskIndex <
                        tasks.length - 1
                    ) {

                        currentTaskIndex++;

                        loadTask();

                        window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        });

                    }

                }
            );

    }


    /* =====================================================
       RESET TASK
    ===================================================== */

    if ($("resetTaskBtn")) {

        $("resetTaskBtn")
            .addEventListener(
                "click",
                function () {

                    const task =
                        tasks[currentTaskIndex];


                    if (!task) return;


                    const confirmed =
                        window.confirm(
                            "Kya aap is task ko reset karna chahte hain?"
                        );


                    if (!confirmed) {
                        return;
                    }


                    taskData[task.id] = {

                        type:
                            task.type,

                        content:
                            "",

                        html:
                            "",

                        css:
                            "",

                        excel:
                            [],

                        completed:
                            false,

                        changes:
                            0,

                        score:
                            0

                    };


                    loadTask();

                    saveCurrentTask();

                }
            );

    }


    /* =====================================================
       TASK CHECKBOX
       NOTE:
       Checkbox marks decide nahi karta.
       Actual work se marks milenge.
    ===================================================== */

    if ($("taskCompleted")) {

        $("taskCompleted")
            .addEventListener(
                "click",
                function () {

                    updateCompletion();

                }
            );

    }


    /* =====================================================
       SCORING
    ===================================================== */

    function scoreWord(task, data) {

        const html =
            String(data.content || "")
                .toLowerCase();


        const text =
            String(
                editor?.innerText || ""
            ).trim();


        if (!text) {
            return 0;
        }


        let score = 0;


        /* Basic typing */

        if (text.length >= 20) {
            score += 2;
        }

        else if (text.length >= 10) {
            score += 1;
        }


        /* Bold */

        if (
            html.includes("<b") ||
            html.includes("<strong") ||
            html.includes("font-weight: bold")
        ) {

            score += 2;

        }


        /* Centre */

        if (
            html.includes("text-align: center") ||
            html.includes("justify-content: center")
        ) {

            score += 2;

        }


        /* Underline */

        if (
            html.includes("<u") ||
            html.includes("text-decoration: underline")
        ) {

            score += 1;

        }


        /* Changes */

        if (data.changes > 0) {
            score += 1;
        }


        return Math.min(
            task.marks,
            score
        );

    }


    function scorePresentation(task, data) {

        return scoreWord(
            task,
            data
        );

    }


    function scoreExcel(task, data) {

        const cells =
            data.excel || [];


        const usedCells =
            cells.filter(
                function (cell) {

                    return String(
                        cell.value || ""
                    ).trim() !== "";

                }
            );


        if (!usedCells.length) {
            return 0;
        }


        let score = 0;


        /* Data entry */

        if (usedCells.length >= 5) {
            score += 2;
        }

        else {
            score += 1;
        }


        /* Formula */

        const formulas =
            usedCells.filter(
                function (cell) {

                    return String(
                        cell.value || ""
                    )
                    .trim()
                    .startsWith("=");

                }
            );


        if (formulas.length > 0) {
            score += 3;
        }


        /* Bold */

        const bold =
            usedCells.some(
                function (cell) {

                    return String(
                        cell.style || ""
                    )
                    .toLowerCase()
                    .includes("bold");

                }
            );


        if (bold) {
            score += 1;
        }


        /* Borders */

        const borders =
            usedCells.some(
                function (cell) {

                    return String(
                        cell.style || ""
                    )
                    .toLowerCase()
                    .includes("border");

                }
            );


        if (borders) {
            score += 1;
        }


        /* Alignment */

        const alignment =
            usedCells.some(
                function (cell) {

                    return String(
                        cell.style || ""
                    )
                    .toLowerCase()
                    .includes("text-align");

                }
            );


        if (alignment) {
            score += 1;
        }


        if (data.changes > 0) {
            score += 1;
        }


        return Math.min(
            task.marks,
            score
        );

    }


    function scoreCode(task, data) {

        const html =
            String(
                data.html || ""
            ).toLowerCase();


        const css =
            String(
                data.css || ""
            ).toLowerCase();


        if (!html && !css) {
            return 0;
        }


        let score = 0;


        if (
            html.includes("<html")
        ) {
            score += 2;
        }


        if (
            html.includes("<head")
        ) {
            score += 1;
        }


        if (
            html.includes("<body")
        ) {
            score += 1;
        }


        if (
            html.includes("<h1") ||
            html.includes("<h2") ||
            html.includes("<h3")
        ) {
            score += 1;
        }


        if (
            html.includes("<p")
        ) {
            score += 1;
        }


        if (
            html.includes("<button") ||
            html.includes("<a")
        ) {
            score += 1;
        }


        if (
            html.includes("<ul")
        ) {
            score += 1;
        }


        if (css.length >= 10) {
            score += 1;
        }


        if (data.changes > 0) {
            score += 1;
        }


        return Math.min(
            task.marks,
            score
        );

    }


    function scoreTally(task, data) {

        const text =
            String(
                data.content || ""
            )
            .replace(/<[^>]*>/g, " ")
            .toLowerCase()
            .trim();


        if (!text) {
            return 0;
        }


        let score = 0;


        if (text.length >= 20) {
            score += 2;
        }

        else {
            score += 1;
        }


        const tallyWords = [
            "sales",
            "voucher",
            "party",
            "invoice",
            "product",
            "quantity",
            "rate",
            "amount"
        ];


        tallyWords.forEach(
            function (word) {

                if (
                    text.includes(word)
                ) {

                    score += 1;

                }

            }
        );


        if (data.changes > 0) {
            score += 1;
        }


        return Math.min(
            task.marks,
            score
        );

    }


    function calculateScore(task) {

        const data =
            taskData[task.id];


        if (!data) {
            return 0;
        }


        let score = 0;


        if (task.type === "word") {

            score =
                scoreWord(
                    task,
                    data
                );

        }

        else if (
            task.type === "presentation"
        ) {

            score =
                scorePresentation(
                    task,
                    data
                );

        }

        else if (
            task.type === "excel"
        ) {

            score =
                scoreExcel(
                    task,
                    data
                );

        }

        else if (
            task.type === "code"
        ) {

            score =
                scoreCode(
                    task,
                    data
                );

        }

        else if (
            task.type === "tally"
        ) {

            score =
                scoreTally(
                    task,
                    data
                );

        }


        taskData[task.id].score =
            score;


        return score;

    }


    /* =====================================================
       SUBMIT
    ===================================================== */

    function submitPractical(autoSubmit) {

        if (submitted) {
            return;
        }


        submitted = true;


        clearInterval(
            timerInterval
        );


        saveCurrentTask();


        let totalMarks = 0;

        let obtainedMarks = 0;

        let completedTasks = 0;


        const taskResults = [];


        tasks.forEach(
            function (task) {

                const score =
                    calculateScore(
                        task
                    );


                const maxMarks =
                    Number(
                        task.marks || 0
                    );


                totalMarks +=
                    maxMarks;


                obtainedMarks +=
                    score;


                if (
                    taskData[task.id]
                        .completed
                ) {

                    completedTasks++;

                }


                taskResults.push({

                    taskId:
                        task.id,

                    title:
                        task.title,

                    software:
                        task.software,

                    type:
                        task.type,

                    score:
                        score,

                    maxMarks:
                        maxMarks,

                    completed:
                        !!taskData[task.id]
                            .completed

                });

            }
        );


        const percentage =
            totalMarks > 0
                ? Number(
                    (
                        obtainedMarks /
                        totalMarks
                    * 100
                    ).toFixed(2)
                )
                : 0;


        const status =
            percentage >= 40
                ? "PASS"
                : "FAIL";


        const result = {

            studentId:
                String(studentId),

            studentName:
                studentName,

            studentPhoto:
                studentPhoto,

            course:
                selectedCourse,

            testType:
                "PRACTICAL",

            totalTasks:
                tasks.length,

            completedTasks:
                completedTasks,

            totalMarks:
                totalMarks,

            obtainedMarks:
                obtainedMarks,

            percentage:
                percentage,

            status:
                status,

            autoSubmitted:
                !!autoSubmit,

            tasks:
                taskResults,

            date:
                new Date()
                    .toLocaleString("en-IN")

        };


        /* =================================================
           SAVE PRACTICAL RESULT
        ================================================= */

        const results =
            readJSON(
                "cmPracticalResults",
                []
            );


        const filtered =
            results.filter(
                function (item) {

                    return !(
                        String(
                            item.studentId
                        ) ===
                        String(studentId) &&

                        normaliseCourse(
                            item.course
                        ) ===
                        selectedCourse
                    );

                }
            );


        filtered.push(result);


        writeJSON(
            "cmPracticalResults",
            filtered
        );


        /* =================================================
           LAST PRACTICAL RESULT
        ================================================= */

        try {

            sessionStorage.setItem(
                "cmLastPracticalResult",
                JSON.stringify(result)
            );

        } catch (error) {

            console.warn(
                "Session result error:",
                error
            );

        }


        /* =================================================
           MESSAGE
        ================================================= */

        if ($("testMessage")) {

            $("testMessage").textContent =
                autoSubmit
                    ? "Time over. Your practical test has been submitted."
                    : "Practical test submitted successfully.";

            $("testMessage").classList.add(
                "show"
            );

        }


        /* =================================================
           REDIRECT
        ================================================= */

        setTimeout(
            function () {

                window.location.href =
                    "final-result.html?studentId=" +
                    encodeURIComponent(
                        studentId
                    );

            },
            1000
        );

    }


    /* =====================================================
       SUBMIT BUTTON
    ===================================================== */

    if ($("submitPracticalBtn")) {

        $("submitPracticalBtn")
            .addEventListener(
                "click",
                function () {

                    if (submitted) {
                        return;
                    }


                    saveCurrentTask();


                    const confirmed =
                        window.confirm(
                            "Kya aap practical test submit karna chahte hain?"
                        );


                    if (!confirmed) {
                        return;
                    }


                    submitPractical(
                        false
                    );

                }
            );

    }


    /* =====================================================
       AUTO SAVE
    ===================================================== */

    setInterval(
        function () {

            if (!submitted) {

                saveCurrentTask();

            }

        },
        5000
    );


    /* =====================================================
       BEFORE UNLOAD
    ===================================================== */

    window.addEventListener(
        "beforeunload",
        function () {

            if (!submitted) {

                saveCurrentTask();

            }

        }
    );


    /* =====================================================
       CURRENT PRACTICAL STUDENT
    ===================================================== */

    try {

        sessionStorage.setItem(
            "cmCurrentPracticalStudent",
            JSON.stringify({

                studentId:
                    String(studentId),

                studentName:
                    studentName,

                studentPhoto:
                    studentPhoto,

                course:
                    selectedCourse,

                startedAt:
                    new Date()
                        .toISOString()

            })
        );

    } catch (error) {

        console.warn(
            "Current student session error:",
            error
        );

    }


    /* =====================================================
       INITIAL LOAD
    ===================================================== */

    loadTask();

    updateTimer();

    startTimer();


    /* =====================================================
       CONSOLE
    ===================================================== */

    console.log(
        "%c CM COMPUTER CENTRE ",
        "background:#00eaff;color:#00111a;font-size:18px;font-weight:bold;padding:8px;"
    );

    console.log(
        "Practical Test Loaded"
    );

    console.log(
        "Student:",
        studentName
    );

    console.log(
        "Student ID:",
        studentId
    );

    console.log(
        "Course:",
        selectedCourse
    );

    console.log(
        "Total Tasks:",
        tasks.length
    );

});