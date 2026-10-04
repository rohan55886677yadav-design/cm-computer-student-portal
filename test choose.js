/* =========================================================
   CM COMPUTER CENTRE
   TEST CHOOSE SYSTEM
   Course → Module → Theory / Practical
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const pageLoader = document.getElementById("pageLoader");
    const currentYear = document.getElementById("currentYear");

    const studentPhoto = document.getElementById("studentPhoto");
    const studentName = document.getElementById("studentName");
    const studentId = document.getElementById("studentId");
    const selectedCourseDisplay =
        document.getElementById("selectedCourseDisplay");

    const courseSection =
        document.getElementById("courseSection");

    const moduleSection =
        document.getElementById("moduleSection");

    const testSection =
        document.getElementById("testSection");

    const stepCourse =
        document.getElementById("stepCourse");

    const stepModule =
        document.getElementById("stepModule");

    const stepTest =
        document.getElementById("stepTest");

    const moduleHeading =
        document.getElementById("moduleHeading");

    const moduleDescription =
        document.getElementById("moduleDescription");

    const oLevelModules =
        document.getElementById("oLevelModules");

    const singleModule =
        document.getElementById("singleModule");

    const singleModuleTitle =
        document.getElementById("singleModuleTitle");

    const singleModuleDescription =
        document.getElementById("singleModuleDescription");

    const selectedExamCourse =
        document.getElementById("selectedExamCourse");

    const selectedExamModule =
        document.getElementById("selectedExamModule");

    const theoryTestBtn =
        document.getElementById("theoryTestBtn");

    const practicalTestBtn =
        document.getElementById("practicalTestBtn");

    const theoryDescription =
        document.getElementById("theoryDescription");

    const practicalDescription =
        document.getElementById("practicalDescription");

    const backCourseBtn =
        document.getElementById("backCourseBtn");

    const backModuleBtn =
        document.getElementById("backModuleBtn");


    /* =====================================================
       PAGE LOADER
       ===================================================== */

    setTimeout(function () {

        if (pageLoader) {
            pageLoader.classList.add("hide");
        }

    }, 700);


    /* =====================================================
       YEAR
       ===================================================== */

    if (currentYear) {
        currentYear.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       URL DATA
       ===================================================== */

    const urlParams =
        new URLSearchParams(window.location.search);

    const urlStudentId =
        urlParams.get("studentId");

    const urlCourse =
        urlParams.get("course");


    /* =====================================================
       READ ADMISSION DATA
       ===================================================== */

    let admissions = [];

    try {

        admissions =
            JSON.parse(
                localStorage.getItem("cmAdmissions")
            ) || [];

    } catch (error) {

        console.error(
            "Admission data error:",
            error
        );

        admissions = [];

    }


    /* =====================================================
       FIND CURRENT STUDENT
       ===================================================== */

    let currentStudent = null;


    /* URL STUDENT ID */
    if (urlStudentId) {

        currentStudent =
            admissions.find(function (student) {

                return String(
                    student.studentId ||
                    student.id ||
                    ""
                ) === String(urlStudentId);

            });

    }


    /* LOCAL STORAGE STUDENT ID */
    if (!currentStudent) {

        const savedStudentId =
            localStorage.getItem("cmStudentId");

        if (savedStudentId) {

            currentStudent =
                admissions.find(function (student) {

                    return String(
                        student.studentId ||
                        student.id ||
                        ""
                    ) === String(savedStudentId);

                });

        }

    }


    /* LATEST ADMISSION */
    if (!currentStudent &&
        admissions.length > 0) {

        currentStudent =
            admissions[admissions.length - 1];

    }


    /* =====================================================
       STUDENT HELPERS
       ===================================================== */

    function getStudentName(student) {

        if (!student) {

            return (
                localStorage.getItem("cmStudentName") ||
                "Student"
            );

        }


        const first =
            student.firstName || "";

        const middle =
            student.middleName || "";

        const last =
            student.lastName || "";


        const fullName =
            [first, middle, last]
                .filter(Boolean)
                .join(" ")
                .trim();


        if (fullName) {
            return fullName;
        }


        return (
            student.studentName ||
            student.name ||
            localStorage.getItem("cmStudentName") ||
            "Student"
        );

    }


    function getStudentId(student) {

        if (!student) {

            return (
                localStorage.getItem("cmStudentId") ||
                "---"
            );

        }


        return (
            student.studentId ||
            student.id ||
            localStorage.getItem("cmStudentId") ||
            "---"
        );

    }


    function getStudentPhoto(student) {

        if (!student) {
            return "image/logo.png";
        }


        return (
            student.studentPhoto ||
            student.photo ||
            student.profilePhoto ||
            student.image ||
            student.imageUrl ||
            "image/logo.png"
        );

    }


    function getAdmissionCourse(student) {

        if (!student) {
            return "";
        }


        return (
            student.course ||
            student.selectedCourse ||
            student.courseName ||
            ""
        );

    }


    /* =====================================================
       DISPLAY STUDENT
       ===================================================== */

    if (studentName) {

        studentName.textContent =
            getStudentName(currentStudent);

    }


    if (studentId) {

        studentId.textContent =
            getStudentId(currentStudent);

    }


    if (studentPhoto) {

        studentPhoto.src =
            getStudentPhoto(currentStudent);

        studentPhoto.onerror =
            function () {

                this.onerror = null;
                this.src = "image/logo.png";

            };

    }


    /* =====================================================
       COURSE DATABASE
       ===================================================== */

    const COURSE_CONFIG = {

        "O Level": {

            mode: "module",

            description:
                "O Level examination is divided into four separate modules.",

            modules: {

                "M1-R5": {

                    name: "M1-R5",
                    theory: true,
                    practical: true,

                    theoryText:
                        "M1-R5 Theory — separate module-wise theory examination.",

                    practicalText:
                        "M1-R5 Practical — MS Word and MS Excel practical tasks."

                },

                "M2-R5": {

                    name: "M2-R5",
                    theory: true,
                    practical: true,

                    theoryText:
                        "M2-R5 Theory — separate module-wise theory examination.",

                    practicalText:
                        "M2-R5 Practical — M2-specific practical tasks."

                },

                "M3-R5": {

                    name: "M3-R5",
                    theory: true,
                    practical: true,

                    theoryText:
                        "M3-R5 Theory — separate module-wise theory examination.",

                    practicalText:
                        "M3-R5 Practical — M3-specific practical tasks."

                },

                "M4-R5": {

                    name: "M4-R5",
                    theory: true,
                    practical: true,

                    theoryText:
                        "M4-R5 Theory — separate module-wise theory examination.",

                    practicalText:
                        "M4-R5 Practical — M4-specific practical tasks."

                }

            }

        },


        "ADCA": {

            mode: "theory",

            theoryText:
                "ADCA Theory Examination — course-specific theory questions."

        },


        "CCC": {

            mode: "theory",

            theoryText:
                "CCC Theory Examination — course-specific theory questions."

        },


        "Tally": {

            mode: "theory",

            theoryText:
                "Tally Theory Examination — course-specific theory questions."

        },


        "DCA": {

            mode: "theory",

            theoryText:
                "DCA Theory Examination — course-specific theory questions."

        },


        "PGDCA": {

            mode: "theory",

            theoryText:
                "PGDCA Theory Examination — course-specific theory questions."

        },


        "Web Designing": {

            mode: "both",

            theoryText:
                "Web Designing Theory — HTML, CSS, JavaScript and Web concepts.",

            practicalText:
                "Web Designing Practical — HTML/CSS coding with live output preview."

        },


        "MS Office": {

            mode: "theory",

            theoryText:
                "MS Office Theory Examination — Word, Excel, PowerPoint and computer concepts."

        }

    };


    /* =====================================================
       CURRENT SELECTION
       ===================================================== */

    let selectedCourse = null;
    let selectedModule = null;


    /* =====================================================
       NORMALIZE COURSE
       ===================================================== */

    function normalizeCourse(course) {

        if (!course) {
            return null;
        }


        const input =
            String(course)
                .trim()
                .toLowerCase();


        const courses =
            Object.keys(COURSE_CONFIG);


        for (let i = 0; i < courses.length; i++) {

            if (
                courses[i]
                    .toLowerCase() === input
            ) {

                return courses[i];

            }

        }


        return null;

    }


    /* =====================================================
       SHOW MESSAGE
       ===================================================== */

    function showMessage(message) {

        let messageBox =
            document.getElementById(
                "testChooseMessage"
            );


        if (!messageBox) {

            messageBox =
                document.createElement("div");

            messageBox.id =
                "testChooseMessage";

            messageBox.style.position =
                "fixed";

            messageBox.style.left =
                "50%";

            messageBox.style.bottom =
                "25px";

            messageBox.style.transform =
                "translateX(-50%)";

            messageBox.style.zIndex =
                "999999";

            messageBox.style.width =
                "min(90%, 500px)";

            messageBox.style.padding =
                "14px 18px";

            messageBox.style.borderRadius =
                "14px";

            messageBox.style.background =
                "rgba(5,18,34,.97)";

            messageBox.style.color =
                "#ffffff";

            messageBox.style.textAlign =
                "center";

            messageBox.style.fontWeight =
                "800";

            messageBox.style.fontSize =
                "13px";

            messageBox.style.border =
                "1px solid rgba(0,234,255,.5)";

            messageBox.style.boxShadow =
                "0 0 30px rgba(0,234,255,.25)";

            messageBox.style.transition =
                "all .3s ease";

            document.body.appendChild(
                messageBox
            );

        }


        messageBox.textContent =
            message;


        messageBox.style.opacity =
            "1";


        clearTimeout(
            messageBox._timeout
        );


        messageBox._timeout =
            setTimeout(function () {

                messageBox.style.opacity =
                    "0";

            }, 3000);

    }


    /* =====================================================
       HIDE ALL SECTIONS
       ===================================================== */

    function hideAllSections() {

        if (courseSection) {
            courseSection.classList.add("hidden");
        }

        if (moduleSection) {
            moduleSection.classList.add("hidden");
        }

        if (testSection) {
            testSection.classList.add("hidden");
        }

    }


    /* =====================================================
       SHOW COURSE SECTION
       ===================================================== */

    function showCourseSection() {

        hideAllSections();

        if (courseSection) {
            courseSection.classList.remove("hidden");
        }

        updateSteps(1);

    }


    /* =====================================================
       SHOW MODULE SECTION
       ===================================================== */

    function showModuleSection() {

        hideAllSections();

        if (moduleSection) {
            moduleSection.classList.remove("hidden");
        }

        updateSteps(2);

    }


    /* =====================================================
       SHOW TEST SECTION
       ===================================================== */

    function showTestSection() {

        hideAllSections();

        if (testSection) {
            testSection.classList.remove("hidden");
        }

        updateSteps(3);

    }


    /* =====================================================
       UPDATE STEPS
       ===================================================== */

    function updateSteps(stepNumber) {

        if (stepCourse) {
            stepCourse.classList.toggle(
                "active",
                stepNumber >= 1
            );
        }

        if (stepModule) {
            stepModule.classList.toggle(
                "active",
                stepNumber >= 2
            );
        }

        if (stepTest) {
            stepTest.classList.toggle(
                "active",
                stepNumber >= 3
            );
        }

    }


    /* =====================================================
       SAVE CURRENT TEST SELECTION
       ===================================================== */

    function saveSelection() {

        const data = {

            studentId:
                getStudentId(currentStudent),

            studentName:
                getStudentName(currentStudent),

            course:
                selectedCourse,

            module:
                selectedModule,

            examType:
                null,

            selectedAt:
                new Date().toISOString()

        };


        sessionStorage.setItem(
            "cmTestSelection",
            JSON.stringify(data)
        );

    }


    /* =====================================================
       UPDATE SAVED EXAM TYPE
       ===================================================== */

    function saveExamType(type) {

        const data = {

            studentId:
                getStudentId(currentStudent),

            studentName:
                getStudentName(currentStudent),

            course:
                selectedCourse,

            module:
                selectedModule,

            examType:
                type,

            selectedAt:
                new Date().toISOString()

        };


        sessionStorage.setItem(
            "cmTestSelection",
            JSON.stringify(data)
        );


        /*
          LocalStorage copy bhi rakhi ja rahi hai
          taaki next test page module read kar sake.
        */

        localStorage.setItem(
            "cmSelectedExam",
            JSON.stringify(data)
        );

    }


    /* =====================================================
       SCROLL
       ===================================================== */

    function scrollToElement(element) {

        if (!element) {
            return;
        }


        setTimeout(function () {

            element.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 100);

    }


    /* =====================================================
       SELECT COURSE
       ===================================================== */

    function selectCourse(courseName) {

        const course =
            normalizeCourse(courseName);


        if (!course) {

            showMessage(
                "This course is not available."
            );

            return;

        }


        selectedCourse =
            course;

        selectedModule =
            null;


        selectedCourseDisplay.textContent =
            selectedCourse;


        const config =
            COURSE_CONFIG[selectedCourse];


        saveSelection();


        /* =================================================
           O LEVEL
           ================================================= */

        if (config.mode === "module") {

            moduleHeading.textContent =
                "Select O Level Module";


            moduleDescription.textContent =
                config.description;


            if (oLevelModules) {
                oLevelModules.classList.remove("hidden");
            }


            if (singleModule) {
                singleModule.classList.add("hidden");
            }


            showModuleSection();

            scrollToElement(moduleSection);

            return;

        }


        /* =================================================
           THEORY ONLY
           ================================================= */

        if (config.mode === "theory") {

            moduleHeading.textContent =
                `${selectedCourse} Examination`;


            moduleDescription.textContent =
                "Select your examination type.";


            if (oLevelModules) {
                oLevelModules.classList.add("hidden");
            }


            if (singleModule) {

                singleModule.classList.remove(
                    "hidden"
                );

            }


            singleModuleTitle.textContent =
                "Theory Examination";


            singleModuleDescription.textContent =
                config.theoryText;


            selectedModule =
                selectedCourse;


            saveSelection();

            setupTestSection();

            showTestSection();

            scrollToElement(testSection);

            return;

        }


        /* =================================================
           WEB DESIGNING
           ================================================= */

        if (config.mode === "both") {

            moduleHeading.textContent =
                "Web Designing Examination";


            moduleDescription.textContent =
                "Choose Theory or Coding Practical Test.";


            if (oLevelModules) {
                oLevelModules.classList.add("hidden");
            }


            if (singleModule) {
                singleModule.classList.remove("hidden");
            }


            singleModuleTitle.textContent =
                "Web Designing Test";


            singleModuleDescription.textContent =
                "Theory + HTML/CSS Coding Practical";


            selectedModule =
                selectedCourse;


            saveSelection();

            setupTestSection();

            showTestSection();

            scrollToElement(testSection);

        }

    }


    /* =====================================================
       SELECT O LEVEL MODULE
       ===================================================== */

    function selectModule(moduleName) {

        if (
            selectedCourse !== "O Level"
        ) {

            showMessage(
                "Please select O Level first."
            );

            return;

        }


        const config =
            COURSE_CONFIG["O Level"];


        const module =
            config.modules[moduleName];


        if (!module) {

            showMessage(
                "Selected module is not available."
            );

            return;

        }


        selectedModule =
            module.name;


        selectedCourseDisplay.textContent =
            `${selectedCourse} • ${selectedModule}`;


        saveSelection();


        setupTestSection();


        showTestSection();


        scrollToElement(testSection);

    }


    /* =====================================================
       SETUP TEST SECTION
       ===================================================== */

    function setupTestSection() {

        if (!selectedCourse) {
            return;
        }


        const config =
            COURSE_CONFIG[selectedCourse];


        if (!config) {
            return;
        }


        selectedExamCourse.textContent =
            selectedCourse;


        selectedExamModule.textContent =
            selectedModule ||
            selectedCourse;


        /* =================================================
           O LEVEL MODULE
           ================================================= */

        if (
            selectedCourse === "O Level" &&
            selectedModule
        ) {

            const module =
                config.modules[selectedModule];


            if (module) {

                theoryDescription.textContent =
                    module.theoryText;


                practicalDescription.textContent =
                    module.practicalText;

            }

        }


        /* =================================================
           THEORY ONLY
           ================================================= */

        else if (config.mode === "theory") {

            theoryDescription.textContent =
                config.theoryText;

        }


        /* =================================================
           WEB DESIGNING
           ================================================= */

        else if (
            selectedCourse === "Web Designing"
        ) {

            theoryDescription.textContent =
                config.theoryText;

            practicalDescription.textContent =
                config.practicalText;

        }


        /* =================================================
           THEORY BUTTON
           ================================================= */

        theoryTestBtn.style.display =
            "flex";


        /* =================================================
           PRACTICAL BUTTON
           ================================================= */

        if (
            selectedCourse === "O Level" &&
            selectedModule
        ) {

            practicalTestBtn.style.display =
                "flex";

        }

        else if (
            selectedCourse === "Web Designing"
        ) {

            practicalTestBtn.style.display =
                "flex";

        }

        else {

            practicalTestBtn.style.display =
                "none";

        }


        saveSelection();

    }


    /* =====================================================
       COURSE CARD CLICK
       ===================================================== */

    document
        .querySelectorAll(".course-card")
        .forEach(function (card) {

            card.addEventListener(
                "click",
                function () {

                    const course =
                        card.dataset.course;

                    selectCourse(course);

                }
            );

        });


    /* =====================================================
       MODULE CARD CLICK
       ===================================================== */

    document
        .querySelectorAll(".module-card")
        .forEach(function (card) {

            card.addEventListener(
                "click",
                function () {

                    const module =
                        card.dataset.module;

                    selectModule(module);

                }
            );

        });


    /* =====================================================
       THEORY TEST
       ===================================================== */

    theoryTestBtn.addEventListener(
        "click",
        function () {

            if (!selectedCourse) {

                showMessage(
                    "Please select a course first."
                );

                return;

            }


            if (
                selectedCourse === "O Level" &&
                !selectedModule
            ) {

                showMessage(
                    "Please select an O Level module first."
                );

                return;

            }


            if (!getStudentId(currentStudent) ||
                getStudentId(currentStudent) === "---") {

                showMessage(
                    "Student ID not found."
                );

                return;

            }


            saveExamType("theory");


            const params =
                new URLSearchParams();


            params.set(
                "studentId",
                getStudentId(currentStudent)
            );


            params.set(
                "course",
                selectedCourse
            );


            params.set(
                "module",
                selectedModule || selectedCourse
            );


            params.set(
                "test",
                "theory"
            );


            /*
              IMPORTANT:
              Existing theory test page
            */

            window.location.href =
                "theory new.html?" +
                params.toString();

        }
    );


    /* =====================================================
       PRACTICAL TEST
       ===================================================== */

    practicalTestBtn.addEventListener(
        "click",
        function () {

            if (!selectedCourse) {

                showMessage(
                    "Please select a course first."
                );

                return;

            }


            if (
                selectedCourse === "O Level" &&
                !selectedModule
            ) {

                showMessage(
                    "Please select an O Level module first."
                );

                return;

            }


            const practicalAvailable =

                (
                    selectedCourse === "O Level" &&
                    selectedModule
                )

                ||

                (
                    selectedCourse === "Web Designing"
                );


            if (!practicalAvailable) {

                showMessage(
                    "Practical test is not available for this course."
                );

                return;

            }


            if (!getStudentId(currentStudent) ||
                getStudentId(currentStudent) === "---") {

                showMessage(
                    "Student ID not found."
                );

                return;

            }


            saveExamType("practical");


            const params =
                new URLSearchParams();


            params.set(
                "studentId",
                getStudentId(currentStudent)
            );


            params.set(
                "course",
                selectedCourse
            );


            params.set(
                "module",
                selectedModule || selectedCourse
            );


            params.set(
                "test",
                "practical"
            );


            /*
              IMPORTANT:
              Existing practical test page
            */

            window.location.href =
                "practical new.html?" +
                params.toString();

        }
    );


    /* =====================================================
       BACK TO COURSE
       ===================================================== */

    if (backCourseBtn) {

        backCourseBtn.addEventListener(
            "click",
            function () {

                selectedCourse = null;
                selectedModule = null;


                if (selectedCourseDisplay) {

                    selectedCourseDisplay.textContent =
                        "Select Course";

                }


                sessionStorage.removeItem(
                    "cmTestSelection"
                );


                localStorage.removeItem(
                    "cmSelectedExam"
                );


                showCourseSection();

                scrollToElement(courseSection);

            }
        );

    }


    /* =====================================================
       BACK TO MODULE
       ===================================================== */

    if (backModuleBtn) {

        backModuleBtn.addEventListener(
            "click",
            function () {

                if (
                    selectedCourse === "O Level"
                ) {

                    selectedModule = null;


                    if (selectedCourseDisplay) {

                        selectedCourseDisplay.textContent =
                            selectedCourse;

                    }


                    showModuleSection();

                    scrollToElement(
                        moduleSection
                    );

                }

                else {

                    selectedCourse = null;
                    selectedModule = null;


                    if (selectedCourseDisplay) {

                        selectedCourseDisplay.textContent =
                            "Select Course";

                    }


                    showCourseSection();

                    scrollToElement(
                        courseSection
                    );

                }

            }
        );

    }


    /* =====================================================
       COURSE CARD ACTIVE DESIGN
       ===================================================== */

    function updateCourseCardActive(course) {

        document
            .querySelectorAll(".course-card")
            .forEach(function (card) {

                const cardCourse =
                    normalizeCourse(
                        card.dataset.course
                    );


                card.classList.toggle(
                    "selected",
                    cardCourse === course
                );

            });

    }


    /* =====================================================
       MODULE CARD ACTIVE DESIGN
       ===================================================== */

    function updateModuleCardActive(module) {

        document
            .querySelectorAll(".module-card")
            .forEach(function (card) {

                card.classList.toggle(
                    "selected",
                    card.dataset.module === module
                );

            });

    }


    /* =====================================================
       PATCH COURSE SELECT
       ===================================================== */

    document
        .querySelectorAll(".course-card")
        .forEach(function (card) {

            card.addEventListener(
                "click",
                function () {

                    updateCourseCardActive(
                        selectedCourse
                    );

                }
            );

        });


    /* =====================================================
       PATCH MODULE SELECT
       ===================================================== */

    document
        .querySelectorAll(".module-card")
        .forEach(function (card) {

            card.addEventListener(
                "click",
                function () {

                    updateModuleCardActive(
                        selectedModule
                    );

                }
            );

        });


    /* =====================================================
       DEFAULT STATE
       ===================================================== */

    showCourseSection();


    /* =====================================================
       OPTIONAL: SHOW ADMISSION COURSE
       ===================================================== */

    const admissionCourse =
        normalizeCourse(
            getAdmissionCourse(currentStudent)
        );


    /*
      Admission ka course sirf default information ke
      liye use ho raha hai.
      Student manually course select kar sakta hai.
    */

    if (
        admissionCourse &&
        selectedCourseDisplay
    ) {

        selectedCourseDisplay.textContent =
            "Select Course";

    }


    /* =====================================================
       CONSOLE
       ===================================================== */

    console.log(
        "%c CM COMPUTER CENTRE ",
        "background:#00eaff;color:#00151b;font-weight:900;padding:7px 14px;border-radius:6px;"
    );

    console.log(
        "%c TEST CHOOSE SYSTEM READY ",
        "color:#00eaff;font-size:13px;font-weight:900;"
    );

    console.log(
        "%c O LEVEL MODULES: M1-R5 / M2-R5 / M3-R5 / M4-R5 ",
        "color:#7c3aed;font-weight:900;"
    );

});