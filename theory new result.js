/* =========================================================
   CM COMPUTER CENTRE
   THEORY NEW RESULT JS
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
    const studentModule = document.getElementById("studentModule");

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
    const progressPercentage = document.getElementById("progressPercentage");

    const examDate = document.getElementById("examDate");

    const finalNotice = document.getElementById("finalNotice");
    const noticeTitle = document.getElementById("noticeTitle");
    const noticeText = document.getElementById("noticeText");

    const practicalYesBtn = document.getElementById("practicalYesBtn");
    const practicalNoBtn = document.getElementById("practicalNoBtn");
    const retryTheoryBtn = document.getElementById("retryTheoryBtn");

    const actionMessage = document.getElementById("actionMessage");

    const currentYear = document.getElementById("currentYear");


    /* =====================================================
       LOADER
    ===================================================== */

    setTimeout(() => {

        if (pageLoader) {
            pageLoader.style.opacity = "0";
            pageLoader.style.visibility = "hidden";
        }

    }, 900);


    /* =====================================================
       YEAR
    ===================================================== */

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =====================================================
       URL PARAMETERS
    ===================================================== */

    const params = new URLSearchParams(window.location.search);

    const urlStudentId =
        params.get("studentId") || "";

    const urlCourse =
        params.get("course") || "";

    const urlModule =
        params.get("module") || "";


    /* =====================================================
       STORAGE
    ===================================================== */

    function getStorage(key, fallback = []) {

        try {

            const data =
                JSON.parse(localStorage.getItem(key));

            return data ?? fallback;

        } catch (error) {

            console.error(
                "Storage error:",
                error
            );

            return fallback;

        }

    }


    /* =====================================================
       THEORY RESULTS
    ===================================================== */

    const theoryResults =
        getStorage("cmTheoryNewResults");


    /* =====================================================
       FIND RESULT
    ===================================================== */

    let result = null;


    /* 1. Student + course + module */

    if (urlStudentId) {

        result = theoryResults.find(item => {

            return String(item.studentId) ===
                       String(urlStudentId)

                && (
                    !urlCourse ||
                    String(item.course).toLowerCase() ===
                    String(urlCourse).toLowerCase()
                )

                && (
                    !urlModule ||
                    String(item.module || "").toLowerCase() ===
                    String(urlModule).toLowerCase()
                );

        });

    }


    /* 2. Last session result */

    if (!result) {

        try {

            const lastResult =
                JSON.parse(
                    sessionStorage.getItem(
                        "cmLastTheoryNewResult"
                    )
                );

            if (lastResult) {

                const sameStudent =
                    !urlStudentId ||
                    String(lastResult.studentId) ===
                    String(urlStudentId);

                const sameCourse =
                    !urlCourse ||
                    String(lastResult.course).toLowerCase() ===
                    String(urlCourse).toLowerCase();

                const sameModule =
                    !urlModule ||
                    String(lastResult.module || "").toLowerCase() ===
                    String(urlModule).toLowerCase();

                if (
                    sameStudent &&
                    sameCourse &&
                    sameModule
                ) {
                    result = lastResult;
                }

            }

        } catch (error) {

            console.log(
                "No session result found."
            );

        }

    }


    /* 3. Latest matching result */

    if (!result && theoryResults.length > 0) {

        const matchingResults =
            theoryResults.filter(item => {

                return (
                    !urlStudentId ||
                    String(item.studentId) ===
                    String(urlStudentId)
                );

            });

        if (matchingResults.length > 0) {

            result =
                matchingResults[
                    matchingResults.length - 1
                ];

        }

    }


    /* =====================================================
       NO RESULT
    ===================================================== */

    if (!result) {

        showUnavailable();

        return;

    }


    /* =====================================================
       DISPLAY RESULT
    ===================================================== */

    displayResult(result);


    /* =====================================================
       DISPLAY RESULT FUNCTION
    ===================================================== */

    function displayResult(result) {

        const studentFullName =
            result.studentName ||
            "Student";

        const course =
            result.course ||
            urlCourse ||
            "Course";

        const module =
            result.module ||
            urlModule ||
            "";

        const total =
            Number(result.total) || 100;

        const correct =
            Number(result.correct) || 0;

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
                Math.min(
                    100,
                    Math.round(percent)
                )
            );


        /* =================================================
           PASS / FAIL
        ================================================= */

        const passed =
            String(result.status || "").toUpperCase() ===
            "PASS"
            ||
            percent >= 40;


        /* =================================================
           STUDENT DETAILS
        ================================================= */

        if (studentName) {
            studentName.textContent =
                studentFullName;
        }

        if (studentId) {
            studentId.textContent =
                result.studentId ||
                urlStudentId ||
                "---";
        }

        if (studentCourse) {
            studentCourse.textContent =
                course;
        }

        if (studentModule) {

            if (module) {
                studentModule.textContent =
                    module;
            } else {
                studentModule.textContent =
                    "GENERAL";
            }

        }


        /* =================================================
           STUDENT PHOTO
        ================================================= */

        const photo =
            result.studentPhoto ||
            result.photo ||
            result.profilePhoto ||
            result.image ||
            "";

        if (studentPhoto && photo) {

            studentPhoto.src = photo;

        } else if (studentPhoto) {

            studentPhoto.src =
                "image/logo.png";

        }


        /* =================================================
           SCORE
        ================================================= */

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
                percent + "%";
        }

        if (progressPercentage) {
            progressPercentage.textContent =
                percent + "%";
        }


        /* =================================================
           PROGRESS BAR
        ================================================= */

        if (scoreProgress) {

            setTimeout(() => {

                scoreProgress.style.width =
                    percent + "%";

            }, 300);

        }


        /* =================================================
           DATE
        ================================================= */

        if (examDate) {

            examDate.textContent =
                result.date ||
                new Date().toLocaleString(
                    "en-IN"
                );

        }


        /* =================================================
           PASS / FAIL UI
        ================================================= */

        if (passed) {

            showPassState(
                result,
                course,
                module
            );

        } else {

            showFailState(
                result,
                course,
                module
            );

        }

    }


    /* =====================================================
       PASS STATE
    ===================================================== */

    function showPassState(
        result,
        course,
        module
    ) {

        if (resultStatusBox) {

            resultStatusBox.classList.remove(
                "fail"
            );

            resultStatusBox.classList.add(
                "pass"
            );

        }


        if (resultIcon) {
            resultIcon.textContent = "✓";
        }


        if (resultLabel) {
            resultLabel.textContent =
                "EXAMINATION STATUS";
        }


        if (resultStatus) {

            resultStatus.textContent =
                "PASS";

            resultStatus.style.color =
                "#00ffb3";

        }


        if (resultMessage) {

            resultMessage.textContent =
                "Congratulations! You have successfully qualified the Theory Examination.";

        }


        /* =================================================
           NOTICE
        ================================================= */

        if (finalNotice) {

            finalNotice.style.display =
                "flex";

        }

        if (noticeTitle) {

            noticeTitle.textContent =
                "Theory Test Qualified ✓";

        }

        if (noticeText) {

            noticeText.textContent =
                "You have passed the Theory Test with the required minimum score of 40%. You may now continue to the Practical Examination.";

        }


        /* =================================================
           BUTTONS
        ================================================= */

        if (practicalYesBtn) {

            practicalYesBtn.style.display =
                "flex";

            practicalYesBtn.disabled =
                false;

        }

        if (practicalNoBtn) {

            practicalNoBtn.style.display =
                "flex";

        }

        if (retryTheoryBtn) {

            retryTheoryBtn.style.display =
                "none";

        }


        /* =================================================
           PRACTICAL BUTTON
        ================================================= */

        if (practicalYesBtn) {

            practicalYesBtn.onclick = () => {

                showActionMessage(
                    "Preparing Practical Examination..."
                );


                const practicalStudent = {

                    studentId:
                        result.studentId,

                    studentName:
                        result.studentName,

                    studentPhoto:
                        result.studentPhoto || "",

                    course:
                        course,

                    module:
                        module,

                    theoryPassed:
                        true,

                    practicalAllowed:
                        true,

                    createdAt:
                        new Date().toISOString()

                };


                sessionStorage.setItem(
                    "cmCurrentPracticalStudent",
                    JSON.stringify(
                        practicalStudent
                    )
                );


                localStorage.setItem(
                    "cmPracticalAllowed_" +
                    result.studentId,
                    "true"
                );


                const practicalParams =
                    new URLSearchParams({

                        studentId:
                            result.studentId || "",

                        course:
                            course || "",

                        module:
                            module || ""

                    });


                setTimeout(() => {

                    window.location.href =
                        "practical test.html?" +
                        practicalParams.toString();

                }, 700);

            };

        }


        /* =================================================
           BACK BUTTON
        ================================================= */

        if (practicalNoBtn) {

            practicalNoBtn.onclick = () => {

                showActionMessage(
                    "Returning to Test Center..."
                );


                const backParams =
                    new URLSearchParams({

                        studentId:
                            result.studentId || "",

                        course:
                            course || "",

                        module:
                            module || ""

                    });


                setTimeout(() => {

                    window.location.href =
                        "test-choose.html?" +
                        backParams.toString();

                }, 500);

            };

        }

    }


    /* =====================================================
       FAIL STATE
    ===================================================== */

    function showFailState(
        result,
        course,
        module
    ) {

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
                "EXAMINATION STATUS";

        }


        if (resultStatus) {

            resultStatus.textContent =
                "FAIL";

            resultStatus.style.color =
                "#ff3b6b";

        }


        if (resultMessage) {

            resultMessage.textContent =
                "You did not achieve the minimum 40% required to qualify the Theory Examination.";

        }


        /* =================================================
           NOTICE
        ================================================= */

        if (finalNotice) {

            finalNotice.style.display =
                "flex";

        }

        if (noticeTitle) {

            noticeTitle.textContent =
                "Theory Test Not Qualified";

        }

        if (noticeText) {

            noticeText.textContent =
                "You have not reached the required 40% pass marks. Practical Examination is not available yet. You can retry the Theory Test.";

        }


        /* =================================================
           BUTTONS
        ================================================= */

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


        /* =================================================
           RETRY
        ================================================= */

        if (retryTheoryBtn) {

            retryTheoryBtn.onclick = () => {

                showActionMessage(
                    "Preparing Theory Test again..."
                );


                sessionStorage.setItem(
                    "cmCurrentTheoryNewStudent",
                    JSON.stringify({

                        studentId:
                            result.studentId,

                        studentName:
                            result.studentName,

                        studentPhoto:
                            result.studentPhoto || "",

                        course:
                            course,

                        module:
                            module,

                        testType:
                            "THEORY"

                    })
                );


                const retryParams =
                    new URLSearchParams({

                        studentId:
                            result.studentId || "",

                        course:
                            course || "",

                        module:
                            module || "",

                        test:
                            "theory"

                    });


                setTimeout(() => {

                    window.location.href =
                        "theory new.html?" +
                        retryParams.toString();

                }, 600);

            };

        }


        /* =================================================
           BACK
        ================================================= */

        if (practicalNoBtn) {

            practicalNoBtn.onclick = () => {

                showActionMessage(
                    "Returning to Test Center..."
                );


                const backParams =
                    new URLSearchParams({

                        studentId:
                            result.studentId || "",

                        course:
                            course || "",

                        module:
                            module || ""

                    });


                setTimeout(() => {

                    window.location.href =
                        "test-choose.html?" +
                        backParams.toString();

                }, 500);

            };

        }

    }


    /* =====================================================
       ACTION MESSAGE
    ===================================================== */

    function showActionMessage(message) {

        if (!actionMessage) {
            return;
        }

        actionMessage.textContent =
            message;

        actionMessage.style.opacity =
            "1";

    }


    /* =====================================================
       UNAVAILABLE RESULT
    ===================================================== */

    function showUnavailable() {

        if (studentName) {
            studentName.textContent =
                "Result Unavailable";
        }

        if (studentId) {
            studentId.textContent =
                urlStudentId || "---";
        }

        if (studentCourse) {
            studentCourse.textContent =
                urlCourse || "---";
        }

        if (studentModule) {
            studentModule.textContent =
                urlModule || "GENERAL";
        }

        if (studentPhoto) {
            studentPhoto.src =
                "image/logo.png";
        }

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
                "!";
        }

        if (resultStatus) {
            resultStatus.textContent =
                "RESULT NOT FOUND";
        }

        if (resultMessage) {

            resultMessage.textContent =
                "No matching Theory Examination result was found for this Student ID.";

        }

        if (noticeTitle) {

            noticeTitle.textContent =
                "Result Unavailable";

        }

        if (noticeText) {

            noticeText.textContent =
                "Please return to the Test Center and verify your examination details.";

        }

        if (practicalYesBtn) {
            practicalYesBtn.style.display =
                "none";
        }

        if (retryTheoryBtn) {
            retryTheoryBtn.style.display =
                "none";
        }

        if (practicalNoBtn) {

            practicalNoBtn.style.display =
                "flex";

            practicalNoBtn.onclick = () => {

                window.location.href =
                    "test-choose.html";

            };

        }

    }


    /* =====================================================
       CONSOLE
    ===================================================== */

    console.log(
        "%c CM COMPUTER CENTRE ",
        "background:#030014;color:#00f6ff;font-size:18px;font-weight:900;padding:8px"
    );

    console.log(
        "%c THEORY NEW RESULT SYSTEM ACTIVE ",
        "color:#00ffb3;font-weight:900"
    );

});