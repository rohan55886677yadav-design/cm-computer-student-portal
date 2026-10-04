/* =========================================================
   CM COMPUTER CENTRE
   THEORY RESULT SYSTEM
   theory result.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const pageLoader = document.getElementById("pageLoader");

    const studentPhoto = document.getElementById("studentPhoto");
    const studentName = document.getElementById("studentName");
    const studentId = document.getElementById("studentId");
    const studentCourse = document.getElementById("studentCourse");

    const resultStatusBox = document.getElementById("resultStatusBox");
    const resultIcon = document.getElementById("resultIcon");
    const resultLabel = document.getElementById("resultLabel");
    const resultStatus = document.getElementById("resultStatus");
    const resultMessage = document.getElementById("resultMessage");

    const totalQuestions = document.getElementById("totalQuestions");
    const correctAnswers = document.getElementById("correctAnswers");
    const wrongAnswers = document.getElementById("wrongAnswers");
    const unanswered = document.getElementById("unanswered");

    const score = document.getElementById("score");
    const percentage = document.getElementById("percentage");
    const scoreProgress = document.getElementById("scoreProgress");

    const examDate = document.getElementById("examDate");

    const finalNotice = document.getElementById("finalNotice");
    const noticeTitle = document.getElementById("noticeTitle");
    const noticeText = document.getElementById("noticeText");

    const practicalYesBtn =
        document.getElementById("practicalYesBtn");

    const practicalNoBtn =
        document.getElementById("practicalNoBtn");

    const retryTheoryBtn =
        document.getElementById("retryTheoryBtn");

    const actionMessage =
        document.getElementById("actionMessage");

    const currentYear =
        document.getElementById("currentYear");


    /* =====================================================
       LOADER
    ===================================================== */

    setTimeout(() => {

        if (pageLoader) {

            pageLoader.style.opacity = "0";
            pageLoader.style.visibility = "hidden";

        }

    }, 800);


    /* =====================================================
       YEAR
    ===================================================== */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       HELPER
    ===================================================== */

    function safe(value, fallback = "---") {

        if (
            value === undefined ||
            value === null ||
            value === ""
        ) {
            return fallback;
        }

        return String(value);

    }


    /* =====================================================
       GET URL PARAMETERS
    ===================================================== */

    const params = new URLSearchParams(
        window.location.search
    );

    const urlStudentId =
        params.get("studentId");

    const urlCourse =
        params.get("course");


    /* =====================================================
       GET THEORY RESULT
    ===================================================== */

    let theoryResults = [];

    try {

        theoryResults =
            JSON.parse(
                localStorage.getItem("cmTheoryResults")
            ) || [];

    } catch (error) {

        console.error(
            "Theory result data error:",
            error
        );

        theoryResults = [];

    }


    /* =====================================================
       FIND RESULT
    ===================================================== */

    let result = null;


    /* First priority:
       URL Student ID
    */

    if (urlStudentId) {

        const matchingResults =
            theoryResults.filter(item =>
                String(item.studentId) ===
                String(urlStudentId)
            );

        if (matchingResults.length > 0) {

            result =
                matchingResults[
                    matchingResults.length - 1
                ];

        }

    }


    /* Second priority:
       Last Theory Result
    */

    if (!result) {

        try {

            const lastResult =
                JSON.parse(
                    sessionStorage.getItem(
                        "cmLastTheoryResult"
                    )
                );

            if (lastResult) {

                result = lastResult;

            }

        } catch (error) {

            console.warn(
                "Last theory result unavailable."
            );

        }

    }


    /* Third priority:
       Latest saved result
    */

    if (
        !result &&
        theoryResults.length > 0
    ) {

        result =
            theoryResults[
                theoryResults.length - 1
            ];

    }


    /* =====================================================
       NO RESULT FOUND
    ===================================================== */

    if (!result) {

        showNoResult();

        return;

    }


    /* =====================================================
       STUDENT DATA
    ===================================================== */

    const finalStudentId =
        safe(
            result.studentId ||
            urlStudentId
        );

    const finalCourse =
        safe(
            result.course ||
            urlCourse
        );


    const finalStudentName =
        safe(
            result.studentName ||
            result.name
        );


    /* =====================================================
       SHOW STUDENT
    ===================================================== */

    if (studentName) {

        studentName.textContent =
            finalStudentName;

    }


    if (studentId) {

        studentId.textContent =
            finalStudentId;

    }


    if (studentCourse) {

        studentCourse.textContent =
            finalCourse;

    }


    /* =====================================================
       STUDENT PHOTO
    ===================================================== */

    const photo =
        result.studentPhoto ||
        result.photo ||
        result.profilePhoto ||
        result.image ||
        "";

    if (studentPhoto) {

        if (photo) {

            studentPhoto.src = photo;

        } else {

            studentPhoto.src =
                "image/logo.png";

        }

        studentPhoto.onerror = () => {

            studentPhoto.src =
                "image/logo.png";

        };

    }


    /* =====================================================
       RESULT VALUES
    ===================================================== */

    const total =
        Number(result.total) || 20;

    const correct =
        Number(result.correct) ||
        Number(result.score) ||
        0;

    const wrong =
        Number(result.wrong) || 0;

    const unansweredCount =
        Number(result.unanswered) || 0;


    let percent =
        Number(result.percentage);


    if (!Number.isFinite(percent)) {

        percent =
            total > 0
                ? (correct / total) * 100
                : 0;

    }


    percent =
        Math.max(
            0,
            Math.min(100, percent)
        );


    /* =====================================================
       PASS / FAIL
    ===================================================== */

    const passed =
        result.status === "PASS" ||
        percent >= 40;


    /* =====================================================
       DISPLAY SCORE
    ===================================================== */

    if (totalQuestions) {

        totalQuestions.textContent =
            total;

    }


    if (correctAnswers) {

        correctAnswers.textContent =
            correct;

    }


    if (wrongAnswers) {

        wrongAnswers.textContent =
            wrong;

    }


    if (unanswered) {

        unanswered.textContent =
            unansweredCount;

    }


    if (score) {

        score.textContent =
            correct;

    }


    if (percentage) {

        percentage.textContent =
            `${percent.toFixed(1)}%`;

    }


    if (examDate) {

        examDate.textContent =
            safe(
                result.date,
                new Date().toLocaleDateString(
                    "en-IN"
                )
            );

    }


    /* =====================================================
       PROGRESS BAR
    ===================================================== */

    setTimeout(() => {

        if (scoreProgress) {

            scoreProgress.style.width =
                `${percent}%`;

        }

    }, 300);


    /* =====================================================
       PASS RESULT
    ===================================================== */

    if (passed) {

        showPassResult();

    }

    /* =====================================================
       FAIL RESULT
    ===================================================== */

    else {

        showFailResult();

    }


    /* =====================================================
       PASS RESULT FUNCTION
    ===================================================== */

    function showPassResult() {

        if (resultStatusBox) {

            resultStatusBox.classList.remove(
                "fail"
            );

            resultStatusBox.classList.add(
                "pass"
            );

        }


        if (resultIcon) {

            resultIcon.textContent =
                "✓";

        }


        if (resultLabel) {

            resultLabel.textContent =
                "THEORY RESULT";

        }


        if (resultStatus) {

            resultStatus.textContent =
                "PASS";

        }


        if (resultMessage) {

            resultMessage.textContent =
                "Congratulations! You have qualified the Theory Test.";

        }


        /* -----------------------------------------
           FINAL NOTICE
        ----------------------------------------- */

        if (noticeTitle) {

            noticeTitle.textContent =
                "🎉 Theory Test Qualified";

        }


        if (noticeText) {

            noticeText.textContent =
                "You have passed the Theory Test. You are now eligible for the Practical Test. Select YES to continue.";

        }


        /* -----------------------------------------
           BUTTONS
        ----------------------------------------- */

        if (practicalYesBtn) {

            practicalYesBtn.style.display =
                "flex";

        }


        if (practicalNoBtn) {

            practicalNoBtn.style.display =
                "flex";

        }


        if (retryTheoryBtn) {

            retryTheoryBtn.style.display =
                "none";

        }


        /* -----------------------------------------
           NOTICE STYLE
        ----------------------------------------- */

        if (finalNotice) {

            finalNotice.classList.add(
                "pass-notice"
            );

        }

    }


    /* =====================================================
       FAIL RESULT FUNCTION
    ===================================================== */

    function showFailResult() {

        if (resultStatusBox) {

            resultStatusBox.classList.remove(
                "pass"
            );

            resultStatusBox.classList.add(
                "fail"
            );

        }


        if (resultIcon) {

            resultIcon.textContent =
                "✕";

        }


        if (resultLabel) {

            resultLabel.textContent =
                "THEORY RESULT";

        }


        if (resultStatus) {

            resultStatus.textContent =
                "FAIL";

        }


        if (resultMessage) {

            resultMessage.textContent =
                "You did not achieve the minimum qualifying marks of 40%.";

        }


        /* -----------------------------------------
           FINAL NOTICE
        ----------------------------------------- */

        if (noticeTitle) {

            noticeTitle.textContent =
                "⚠️ Theory Test Not Qualified";

        }


        if (noticeText) {

            noticeText.textContent =
                "You are not eligible for the Practical Test yet. You can take the Theory Test again.";

        }


        /* -----------------------------------------
           BUTTONS
        ----------------------------------------- */

        if (practicalYesBtn) {

            practicalYesBtn.style.display =
                "none";

        }


        if (practicalNoBtn) {

            practicalNoBtn.style.display =
                "flex";

        }


        if (retryTheoryBtn) {

            retryTheoryBtn.style.display =
                "flex";

        }


        /* -----------------------------------------
           NOTICE STYLE
        ----------------------------------------- */

        if (finalNotice) {

            finalNotice.classList.add(
                "fail-notice"
            );

        }

    }


    /* =====================================================
       YES → PRACTICAL TEST
    ===================================================== */

    if (practicalYesBtn) {

        practicalYesBtn.addEventListener(
            "click",
            () => {

                if (!passed) {

                    showActionMessage(
                        "❌ You are not eligible for the Practical Test."
                    );

                    return;

                }


                /* Save current practical student */

                const practicalStudent = {

                    studentId:
                        finalStudentId,

                    studentName:
                        finalStudentName,

                    studentPhoto:
                        photo,

                    course:
                        finalCourse,

                    theoryScore:
                        correct,

                    theoryTotal:
                        total,

                    theoryPercentage:
                        percent,

                    theoryStatus:
                        "PASS",

                    practicalAllowed:
                        true,

                    startedAt:
                        new Date().toISOString()

                };


                localStorage.setItem(
                    "cmCurrentPracticalStudent",
                    JSON.stringify(
                        practicalStudent
                    )
                );


                showActionMessage(
                    "✓ Theory qualified. Opening Practical Test..."
                );


                /* ---------------------------------
                   PRACTICAL PAGE
                   --------------------------------- */

                setTimeout(() => {

                    window.location.href =
                        `practical test.html?studentId=${encodeURIComponent(
                            finalStudentId
                        )}&course=${encodeURIComponent(
                            finalCourse
                        )}`;

                }, 700);

            }
        );

    }


    /* =====================================================
       NO → BACK
    ===================================================== */

    if (practicalNoBtn) {

        practicalNoBtn.addEventListener(
            "click",
            () => {

                showActionMessage(
                    "Returning to Test Center..."
                );


                setTimeout(() => {

                    window.location.href =
                        `test-center.html?studentId=${encodeURIComponent(
                            finalStudentId
                        )}&course=${encodeURIComponent(
                            finalCourse
                        )}`;

                }, 700);

            }
        );

    }


    /* =====================================================
       RETRY THEORY
    ===================================================== */

    if (retryTheoryBtn) {

        retryTheoryBtn.addEventListener(
            "click",
            () => {

                showActionMessage(
                    "Opening Theory Test again..."
                );


                /* Save retry information */

                const retryStudent = {

                    studentId:
                        finalStudentId,

                    studentName:
                        finalStudentName,

                    studentPhoto:
                        photo,

                    course:
                        finalCourse,

                    retry:
                        true,

                    retryAt:
                        new Date().toISOString()

                };


                localStorage.setItem(
                    "cmCurrentTheoryStudent",
                    JSON.stringify(
                        retryStudent
                    )
                );


                setTimeout(() => {

                    window.location.href =
                        `theory test.html?studentId=${encodeURIComponent(
                            finalStudentId
                        )}&course=${encodeURIComponent(
                            finalCourse
                        )}`;

                }, 700);

            }
        );

    }


    /* =====================================================
       ACTION MESSAGE
    ===================================================== */

    function showActionMessage(message) {

        if (!actionMessage) return;

        actionMessage.textContent =
            message;

    }


    /* =====================================================
       NO RESULT FUNCTION
    ===================================================== */

    function showNoResult() {

        if (studentName) {

            studentName.textContent =
                "Result Not Found";

        }


        if (studentId) {

            studentId.textContent =
                "---";

        }


        if (studentCourse) {

            studentCourse.textContent =
                "---";

        }


        if (resultStatus) {

            resultStatus.textContent =
                "RESULT UNAVAILABLE";

        }


        if (resultMessage) {

            resultMessage.textContent =
                "No Theory Test result was found. Please complete the Theory Test first.";

        }


        if (noticeTitle) {

            noticeTitle.textContent =
                "Result Not Available";

        }


        if (noticeText) {

            noticeText.textContent =
                "Please return to the Test Center and complete the Theory Test.";

        }


        if (practicalYesBtn) {

            practicalYesBtn.style.display =
                "none";

        }


        if (practicalNoBtn) {

            practicalNoBtn.style.display =
                "flex";

        }


        if (retryTheoryBtn) {

            retryTheoryBtn.style.display =
                "none";

        }

    }


    /* =====================================================
       CONSOLE
    ===================================================== */

    console.log(
        "%c CM COMPUTER CENTRE ",
        "background:#00eaff;color:#020712;font-size:16px;font-weight:900;padding:7px 14px;border-radius:6px;"
    );

    console.log(
        "%c THEORY RESULT SYSTEM ONLINE ",
        "color:#00ff9d;font-weight:900;"
    );

});