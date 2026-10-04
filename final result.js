/* =========================================================
   CM COMPUTER CENTRE
   FINAL RESULT JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       BASIC SETUP
    ===================================================== */

    const loader = document.getElementById("pageLoader");
    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    setTimeout(() => {
        if (loader) {
            loader.classList.add("hide");
        }
    }, 800);


    /* =====================================================
       URL STUDENT ID
    ===================================================== */

    const params = new URLSearchParams(window.location.search);

    const urlStudentId = params.get("studentId");


    /* =====================================================
       SAFE JSON
    ===================================================== */

    function getData(key) {

        try {
            return JSON.parse(localStorage.getItem(key)) || [];
        } catch (error) {
            console.error("Storage error:", key, error);
            return [];
        }

    }


    /* =====================================================
       SAFE TEXT
    ===================================================== */

    function safe(value) {

        if (
            value === undefined ||
            value === null ||
            value === ""
        ) {
            return "---";
        }

        return String(value);

    }


    /* =====================================================
       FIND STUDENT
    ===================================================== */

    const admissions = getData("cmAdmissions");

    let student = null;

    if (urlStudentId) {

        student = admissions.find(item =>
            String(item.studentId) === String(urlStudentId)
        );

    }

    if (!student) {

        const currentStudentId =
            localStorage.getItem("cmStudentId");

        if (currentStudentId) {

            student = admissions.find(item =>
                String(item.studentId) === String(currentStudentId)
            );

        }

    }

    if (!student && admissions.length > 0) {

        student = admissions[admissions.length - 1];

    }


    /* =====================================================
       STUDENT INFORMATION
    ===================================================== */

    let studentId =
        urlStudentId ||
        (student && student.studentId) ||
        localStorage.getItem("cmStudentId") ||
        "";

    let studentName =
        (student && (
            student.fullName ||
            student.studentName
        )) ||
        localStorage.getItem("cmStudentName") ||
        "---";

    let studentCourse =
        (student && (
            student.course ||
            student.selectedCourse
        )) ||
        "---";


    /* =====================================================
       FULL NAME FROM SEPARATE FIELDS
    ===================================================== */

    if (
        student &&
        !student.fullName &&
        !student.studentName
    ) {

        const first =
            student.firstName || "";

        const middle =
            student.middleName || "";

        const last =
            student.lastName || "";

        const generatedName =
            `${first} ${middle} ${last}`
            .replace(/\s+/g, " ")
            .trim();

        if (generatedName) {
            studentName = generatedName;
        }

    }


    /* =====================================================
       STUDENT PHOTO
    ===================================================== */

    let photo =
        (student && (
            student.studentPhoto ||
            student.photo ||
            student.profilePhoto ||
            student.image ||
            student.imageUrl
        )) ||
        localStorage.getItem("cmStudentPhoto") ||
        "image/logo.png";


    /* =====================================================
       DISPLAY STUDENT
    ===================================================== */

    const studentPhoto =
        document.getElementById("studentPhoto");

    const studentNameEl =
        document.getElementById("studentName");

    const studentIdEl =
        document.getElementById("studentId");

    const studentCourseEl =
        document.getElementById("studentCourse");


    if (studentPhoto) {
        studentPhoto.src = photo;
    }

    if (studentNameEl) {
        studentNameEl.textContent = safe(studentName);
    }

    if (studentIdEl) {
        studentIdEl.textContent = safe(studentId);
    }

    if (studentCourseEl) {
        studentCourseEl.textContent = safe(studentCourse);
    }


    /* =====================================================
       THEORY RESULT
    ===================================================== */

    const theoryResults =
        getData("cmTheoryResults");

    let theoryResult = null;


    if (studentId) {

        theoryResult = theoryResults
            .filter(item =>
                String(item.studentId) === String(studentId)
            )
            .sort((a, b) =>
                new Date(b.date || 0) -
                new Date(a.date || 0)
            )[0] || null;

    }


    /* =====================================================
       THEORY SESSION FALLBACK
    ===================================================== */

    if (!theoryResult) {

        try {

            theoryResult =
                JSON.parse(
                    sessionStorage.getItem(
                        "cmLastTheoryResult"
                    )
                );

        } catch (error) {

            theoryResult = null;

        }

    }


    /* =====================================================
       PRACTICAL RESULT
    ===================================================== */

    const practicalResults =
        getData("cmPracticalResults");

    let practicalResult = null;


    if (studentId) {

        practicalResult = practicalResults
            .filter(item =>
                String(item.studentId) === String(studentId)
            )
            .sort((a, b) =>
                new Date(b.date || 0) -
                new Date(a.date || 0)
            )[0] || null;

    }


    /* =====================================================
       PRACTICAL SESSION FALLBACK
    ===================================================== */

    if (!practicalResult) {

        try {

            practicalResult =
                JSON.parse(
                    sessionStorage.getItem(
                        "cmLastPracticalResult"
                    )
                );

        } catch (error) {

            practicalResult = null;

        }

    }


    /* =====================================================
       THEORY VALUES
    ===================================================== */

    let theoryTotal = 20;

    let theoryCorrect = 0;

    let theoryWrong = 0;

    let theoryUnanswered = 0;

    let theoryScore = 0;

    let theoryPercentage = 0;

    let theoryPassed = false;


    if (theoryResult) {

        theoryTotal =
            Number(
                theoryResult.totalQuestions ||
                theoryResult.total ||
                20
            );

        theoryCorrect =
            Number(
                theoryResult.correct ||
                theoryResult.score ||
                0
            );

        theoryWrong =
            Number(
                theoryResult.wrong ||
                0
            );

        theoryUnanswered =
            Number(
                theoryResult.unanswered ||
                0
            );

        theoryScore = theoryCorrect;

        theoryPercentage =
            Number(
                theoryResult.percentage ||
                Math.round(
                    (theoryCorrect / theoryTotal) * 100
                )
            );

        theoryPassed =
            theoryResult.status === "PASS" ||
            theoryPercentage >= 40;

    }


    /* =====================================================
       PRACTICAL VALUES
    ===================================================== */

    let practicalTotal = 0;

    let practicalCompleted = 0;

    let practicalScore = 0;

    let practicalPercentage = 0;

    let practicalPassed = false;


    if (practicalResult) {

        practicalTotal =
            Number(
                practicalResult.totalTasks ||
                practicalResult.total ||
                0
            );

        practicalCompleted =
            Number(
                practicalResult.completed ||
                practicalResult.completedTasks ||
                0
            );

        practicalScore =
            Number(
                practicalResult.score ||
                0
            );

        practicalPercentage =
            Number(
                practicalResult.percentage ||
                0
            );

        practicalPassed =
            practicalResult.status === "PASS" ||
            practicalPercentage >= 40;

    }


    /* =====================================================
       OVERALL RESULT
       
       BOTH THEORY + PRACTICAL MUST PASS
    ===================================================== */

    const overallPercentage =
        Math.round(
            (theoryPercentage + practicalPercentage) / 2
        );

    const overallPassed =
        theoryPassed &&
        practicalPassed;


    /* =====================================================
       DISPLAY THEORY
    ===================================================== */

    const theoryScoreEl =
        document.getElementById("theoryScore");

    const theoryPercentageEl =
        document.getElementById("theoryPercentage");

    const theoryStatusEl =
        document.getElementById("theoryStatus");

    const theoryCorrectEl =
        document.getElementById("theoryCorrect");

    const theoryWrongEl =
        document.getElementById("theoryWrong");

    const theoryUnansweredEl =
        document.getElementById("theoryUnanswered");

    const theoryProgress =
        document.getElementById("theoryProgress");


    if (theoryScoreEl) {

        theoryScoreEl.textContent =
            `${theoryScore}/${theoryTotal}`;

    }

    if (theoryPercentageEl) {

        theoryPercentageEl.textContent =
            `${theoryPercentage}%`;

    }

    if (theoryCorrectEl) {

        theoryCorrectEl.textContent =
            theoryCorrect;

    }

    if (theoryWrongEl) {

        theoryWrongEl.textContent =
            theoryWrong;

    }

    if (theoryUnansweredEl) {

        theoryUnansweredEl.textContent =
            theoryUnanswered;

    }

    if (theoryProgress) {

        theoryProgress.style.width =
            `${Math.min(theoryPercentage, 100)}%`;

    }

    if (theoryStatusEl) {

        theoryStatusEl.textContent =
            theoryPassed ? "PASS" : "FAIL";

    }


    /* =====================================================
       DISPLAY PRACTICAL
    ===================================================== */

    const practicalScoreEl =
        document.getElementById("practicalScore");

    const practicalPercentageEl =
        document.getElementById("practicalPercentage");

    const practicalStatusEl =
        document.getElementById("practicalStatus");

    const practicalCompletedEl =
        document.getElementById("practicalCompleted");

    const practicalProgress =
        document.getElementById("practicalProgress");


    if (practicalScoreEl) {

        practicalScoreEl.textContent =
            `${practicalScore}/${practicalTotal}`;

    }

    if (practicalPercentageEl) {

        practicalPercentageEl.textContent =
            `${practicalPercentage}%`;

    }

    if (practicalCompletedEl) {

        practicalCompletedEl.textContent =
            practicalCompleted;

    }

    if (practicalProgress) {

        practicalProgress.style.width =
            `${Math.min(practicalPercentage, 100)}%`;

    }

    if (practicalStatusEl) {

        practicalStatusEl.textContent =
            practicalPassed ? "PASS" : "FAIL";

    }


    /* =====================================================
       OVERALL
    ===================================================== */

    const overallScoreEl =
        document.getElementById("overallScore");

    const overallProgress =
        document.getElementById("overallProgress");

    const overallStatusEl =
        document.getElementById("overallStatus");

    const finalPercentageEl =
        document.getElementById("finalPercentage");

    const finalResultMini =
        document.getElementById("finalResultMini");


    if (overallScoreEl) {

        overallScoreEl.textContent =
            `${overallPercentage}%`;

    }

    if (overallProgress) {

        overallProgress.style.width =
            `${Math.min(overallPercentage, 100)}%`;

    }

    if (overallStatusEl) {

        overallStatusEl.textContent =
            overallPassed ? "PASS" : "FAIL";

    }

    if (finalPercentageEl) {

        finalPercentageEl.textContent =
            `${overallPercentage}%`;

    }

    if (finalResultMini) {

        finalResultMini.textContent =
            overallPassed
                ? "PASS"
                : "FAIL";

    }


    /* =====================================================
       STATUS PANEL
    ===================================================== */

    const finalStatusPanel =
        document.getElementById("finalStatusPanel");

    const finalResultIcon =
        document.getElementById("finalResultIcon");

    const finalResultLabel =
        document.getElementById("finalResultLabel");

    const finalResultStatus =
        document.getElementById("finalResultStatus");

    const finalResultMessage =
        document.getElementById("finalResultMessage");


    if (finalStatusPanel) {

        finalStatusPanel.classList.remove(
            "pass",
            "fail"
        );

        finalStatusPanel.classList.add(
            overallPassed ? "pass" : "fail"
        );

    }


    if (overallPassed) {

        if (finalResultIcon) {
            finalResultIcon.textContent = "🏆";
        }

        if (finalResultLabel) {
            finalResultLabel.textContent =
                "FINAL EXAMINATION RESULT";
        }

        if (finalResultStatus) {
            finalResultStatus.textContent =
                "PASS";
        }

        if (finalResultMessage) {

            finalResultMessage.textContent =
                "Congratulations! You have successfully completed both Theory and Practical examinations.";

        }

    } else {

        if (finalResultIcon) {
            finalResultIcon.textContent = "⚠️";
        }

        if (finalResultLabel) {
            finalResultLabel.textContent =
                "FINAL EXAMINATION RESULT";
        }

        if (finalResultStatus) {
            finalResultStatus.textContent =
                "FAIL";
        }

        if (finalResultMessage) {

            if (!theoryPassed && !practicalPassed) {

                finalResultMessage.textContent =
                    "You have not qualified in Theory and Practical examinations.";

            } else if (!theoryPassed) {

                finalResultMessage.textContent =
                    "Theory Test is not qualified. Please complete the required examination again.";

            } else {

                finalResultMessage.textContent =
                    "Practical Test is not qualified. Please complete the required practical examination again.";

            }

        }

    }


    /* =====================================================
       FINAL NOTICE
    ===================================================== */

    const finalNotice =
        document.getElementById("finalNotice");

    const noticeIcon =
        document.getElementById("noticeIcon");

    const noticeTitle =
        document.getElementById("noticeTitle");

    const noticeText =
        document.getElementById("noticeText");


    if (finalNotice) {

        finalNotice.classList.add(
            overallPassed ? "pass" : "fail"
        );

    }


    if (overallPassed) {

        if (noticeIcon) {
            noticeIcon.textContent = "🎓";
        }

        if (noticeTitle) {
            noticeTitle.textContent =
                "Examination Successfully Completed";
        }

        if (noticeText) {

            noticeText.textContent =
                "Your Theory and Practical examination results have been successfully combined. You have qualified for the final result.";

        }

    } else {

        if (noticeIcon) {
            noticeIcon.textContent = "📋";
        }

        if (noticeTitle) {
            noticeTitle.textContent =
                "Examination Result Notice";
        }

        if (noticeText) {

            noticeText.textContent =
                "Your final result is FAIL because all required examination stages have not been successfully qualified.";

        }

    }


    /* =====================================================
       CERTIFICATE
    ===================================================== */

    const certificateStatus =
        document.getElementById(
            "certificateStatus"
        );

    const certificateMessage =
        document.getElementById(
            "certificateMessage"
        );


    if (certificateStatus) {

        certificateStatus.textContent =
            overallPassed
                ? "ELIGIBLE"
                : "NOT ELIGIBLE";

    }

    if (certificateMessage) {

        certificateMessage.textContent =
            overallPassed
                ? "You are eligible for the next certificate process."
                : "Certificate eligibility will be available after successfully completing the required examinations.";

    }


    /* =====================================================
       EXAM DATE
    ===================================================== */

    const examDate =
        document.getElementById("examDate");


    if (examDate) {

        const latestDate =
            practicalResult?.date ||
            theoryResult?.date ||
            new Date().toLocaleString("en-IN");

        examDate.textContent =
            latestDate;

    }


    /* =====================================================
       NO RESULT HANDLING
    ===================================================== */

    if (!theoryResult && !practicalResult) {

        if (finalResultStatus) {

            finalResultStatus.textContent =
                "RESULT UNAVAILABLE";

        }

        if (finalResultMessage) {

            finalResultMessage.textContent =
                "No examination result was found for this Student ID.";

        }

        if (finalStatusPanel) {

            finalStatusPanel.classList.remove(
                "pass",
                "fail"
            );

        }

    }


    /* =====================================================
       BACK HOME
    ===================================================== */

    const backHomeBtn =
        document.getElementById("backHomeBtn");


    if (backHomeBtn) {

        backHomeBtn.addEventListener(
            "click",
            () => {

                window.location.href =
                    "dashboard.html";

            }
        );

    }


    /* =====================================================
       DASHBOARD
    ===================================================== */

    const dashboardBtn =
        document.getElementById("dashboardBtn");


    if (dashboardBtn) {

        dashboardBtn.addEventListener(
            "click",
            () => {

                window.location.href =
                    "dashboard.html";

            }
        );

    }


    /* =====================================================
       CONSOLE
    ===================================================== */

    console.log(
        "%c CM COMPUTER CENTRE ",
        "background:#00eaff;color:#001018;font-weight:900;padding:6px 12px;border-radius:5px;"
    );

    console.log(
        "Final Result System Loaded"
    );

    console.log(
        "Student ID:",
        studentId
    );

    console.log(
        "Theory:",
        theoryPercentage,
        theoryPassed ? "PASS" : "FAIL"
    );

    console.log(
        "Practical:",
        practicalPercentage,
        practicalPassed ? "PASS" : "FAIL"
    );

    console.log(
        "Overall:",
        overallPercentage,
        overallPassed ? "PASS" : "FAIL"
    );

});