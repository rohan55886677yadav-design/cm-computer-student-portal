/* =========================================================
   CM COMPUTER CENTER
   TEST CENTER JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const pageLoader =
        document.getElementById("pageLoader");

    const currentYear =
        document.getElementById("currentYear");

    const studentName =
        document.getElementById("studentName");

    const studentId =
        document.getElementById("studentId");

    const studentCourse =
        document.getElementById("studentCourse");

    const studentPhoto =
        document.getElementById("studentPhoto");

    const noticeTimer =
        document.getElementById("noticeTimer");

    const readingTimer =
        document.getElementById("readingTimer");

    const rulesAccepted =
        document.getElementById("rulesAccepted");

    const startTheoryBtn =
        document.getElementById("startTheoryBtn");

    const startStatus =
        document.getElementById("startStatus");


    /* =====================================================
       PAGE LOADER
    ===================================================== */

    window.setTimeout(() => {

        if (pageLoader) {
            pageLoader.classList.add("hide");
        }

    }, 800);


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    if (currentYear) {
        currentYear.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       GET URL DATA
    ===================================================== */

    const params =
        new URLSearchParams(window.location.search);

    const urlStudentId =
        params.get("studentId");

    const urlCourse =
        params.get("course");


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


    const admissions =
        getAdmissions();


    /* =====================================================
       FIND CURRENT STUDENT
    ===================================================== */

    let currentStudent = null;


    if (urlStudentId) {

        currentStudent =
            admissions.find(student =>
                String(student.studentId) ===
                String(urlStudentId)
            );

    }


    /*
       Agar URL mein studentId nahi hai,
       to latest admission ko use karega.
    */

    if (!currentStudent && admissions.length > 0) {

        currentStudent =
            admissions[admissions.length - 1];

    }


    /* =====================================================
       DISPLAY STUDENT DATA
    ===================================================== */

    if (currentStudent) {

        const firstName =
            currentStudent.firstName || "";

        const middleName =
            currentStudent.middleName || "";

        const lastName =
            currentStudent.lastName || "";

        const fullName =
            [firstName, middleName, lastName]
                .filter(Boolean)
                .join(" ")
                .trim();


        /* STUDENT NAME */

        if (studentName) {

            studentName.textContent =
                fullName ||
                currentStudent.studentName ||
                "Student";

        }


        /* STUDENT ID */

        if (studentId) {

            studentId.textContent =
                currentStudent.studentId ||
                urlStudentId ||
                "--";

        }


        /* COURSE */

        if (studentCourse) {

            studentCourse.textContent =
                currentStudent.course ||
                urlCourse ||
                "Course";

        }


        /* =================================================
           STUDENT PHOTO
        ================================================= */

        if (
            studentPhoto &&
            currentStudent.studentPhoto
        ) {

            studentPhoto.innerHTML = "";

            const img =
                document.createElement("img");

            img.src =
                currentStudent.studentPhoto;

            img.alt =
                "Student Photo";

            img.loading =
                "eager";

            img.onerror = () => {

                studentPhoto.innerHTML =
                    "<span>👤</span>";

            };

            studentPhoto.appendChild(img);

        }

    } else {

        /* =================================================
           NO STUDENT FOUND
        ================================================= */

        if (studentName) {

            studentName.textContent =
                "Student Not Found";

        }

        if (studentId) {

            studentId.textContent =
                urlStudentId || "--";

        }

        if (studentCourse) {

            studentCourse.textContent =
                urlCourse || "--";

        }

        if (startStatus) {

            startStatus.textContent =
                "⚠️ Student admission data not found.";

        }

    }


    /* =====================================================
       TIMER FUNCTION
    ===================================================== */

    function formatTime(seconds) {

        const minutes =
            Math.floor(seconds / 60);

        const remainingSeconds =
            seconds % 60;

        return (
            String(minutes).padStart(2, "0") +
            ":" +
            String(remainingSeconds).padStart(2, "0")
        );

    }


    /* =====================================================
       NOTICE TIMER
    ===================================================== */

    let noticeSeconds = 60;

    if (noticeTimer) {

        noticeTimer.textContent =
            formatTime(noticeSeconds);

    }


    const noticeInterval =
        setInterval(() => {

            noticeSeconds--;

            if (noticeTimer) {

                noticeTimer.textContent =
                    formatTime(
                        Math.max(noticeSeconds, 0)
                    );

            }

            if (noticeSeconds <= 0) {

                clearInterval(noticeInterval);

            }

        }, 1000);


    /* =====================================================
       READING TIMER
    ===================================================== */

    let readingSeconds = 60;

    if (readingTimer) {

        readingTimer.textContent =
            formatTime(readingSeconds);

    }


    const readingInterval =
        setInterval(() => {

            readingSeconds--;

            if (readingTimer) {

                readingTimer.textContent =
                    formatTime(
                        Math.max(readingSeconds, 0)
                    );

            }


            /* =============================================
               TIMER COMPLETE
            ============================================= */

            if (readingSeconds <= 0) {

                clearInterval(readingInterval);


                /* ENABLE CHECKBOX */

                if (rulesAccepted) {

                    rulesAccepted.disabled =
                        false;

                }


                /* STATUS */

                if (startStatus) {

                    startStatus.textContent =
                        "✅ Instructions पढ़ लिए हैं। अब नीचे checkbox select करें।";

                }


                /* READING CARD EFFECT */

                const readingCard =
                    document.querySelector(
                        ".reading-card"
                    );

                if (readingCard) {

                    readingCard.classList.add(
                        "completed"
                    );

                }

            }

        }, 1000);


    /* =====================================================
       CHECKBOX CHANGE
    ===================================================== */

    if (rulesAccepted) {

        rulesAccepted.addEventListener(
            "change",
            () => {

                if (rulesAccepted.checked) {

                    /* ENABLE START BUTTON */

                    if (startTheoryBtn) {

                        startTheoryBtn.disabled =
                            false;

                    }


                    /* STATUS */

                    if (startStatus) {

                        startStatus.textContent =
                            "✅ All instructions accepted. You can start the Theory Test.";

                    }

                } else {

                    /* DISABLE BUTTON */

                    if (startTheoryBtn) {

                        startTheoryBtn.disabled =
                            true;

                    }


                    if (startStatus) {

                        startStatus.textContent =
                            "☑️ Please accept the examination rules.";

                    }

                }

            }
        );

    }


    /* =====================================================
       START THEORY TEST
    ===================================================== */

    if (startTheoryBtn) {

        startTheoryBtn.addEventListener(
            "click",
            () => {

                if (
                    !rulesAccepted ||
                    !rulesAccepted.checked
                ) {

                    if (startStatus) {

                        startStatus.textContent =
                            "⚠️ पहले examination rules accept करें.";

                    }

                    return;

                }


                /* =========================================
                   CHECK STUDENT
                ========================================= */

                if (!currentStudent) {

                    if (startStatus) {

                        startStatus.textContent =
                            "❌ Student information नहीं मिली.";

                    }

                    return;

                }


                /* =========================================
                   GET STUDENT DATA
                ========================================= */

                const finalStudentId =
                    currentStudent.studentId ||
                    urlStudentId;

                const finalCourse =
                    currentStudent.course ||
                    urlCourse ||
                    "";


                /* =========================================
                   SAVE CURRENT TEST STUDENT
                ========================================= */

                const testStudent = {

                    studentId:
                        finalStudentId,

                    studentName:
                        studentName ?
                        studentName.textContent :
                        "Student",

                    course:
                        finalCourse,

                    studentPhoto:
                        currentStudent.studentPhoto ||
                        "",

                    startedAt:
                        new Date().toISOString()

                };


                localStorage.setItem(
                    "cmCurrentTestStudent",
                    JSON.stringify(testStudent)
                );


                /* =========================================
                   STATUS
                ========================================= */

                if (startStatus) {

                    startStatus.textContent =
                        "🚀 Starting Theory Test...";

                }


                /* =========================================
                   BUTTON LOCK
                ========================================= */

                startTheoryBtn.disabled =
                    true;


                /* =========================================
                   THEORY TEST PAGE
                   
                   IMPORTANT:
                   Agar tera theory test page ka
                   filename alag hai to yahan
                   filename change karna.
                ========================================= */

                const testPage =
                    "theory test.html";

                const targetUrl =
                    testPage +
                    "?studentId=" +
                    encodeURIComponent(
                        finalStudentId || ""
                    ) +
                    "&course=" +
                    encodeURIComponent(
                        finalCourse
                    );


                /* =========================================
                   REDIRECT
                ========================================= */

                setTimeout(() => {

                    window.location.href =
                        targetUrl;

                }, 700);

            }
        );

    }


    /* =====================================================
       KEYBOARD SUPPORT
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            /*
               Space / Enter se test start
               tab focus hone par
            */

            if (
                event.key === "Enter" &&
                document.activeElement ===
                startTheoryBtn &&
                startTheoryBtn &&
                !startTheoryBtn.disabled
            ) {

                startTheoryBtn.click();

            }

        }
    );


    /* =====================================================
       CONSOLE BRANDING
    ===================================================== */

    console.log(
        "%c CM COMPUTER CENTER ",
        "background:#00eaff;color:#020611;font-size:16px;font-weight:900;padding:6px 12px;border-radius:6px;"
    );

    console.log(
        "%c TEST CENTER SYSTEM ONLINE ",
        "color:#00ff9d;font-weight:900;"
    );

});