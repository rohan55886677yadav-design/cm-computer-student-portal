/* =========================================================
   CM COMPUTER CENTRE
   MONTHLY RESULT PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const pageLoader = document.getElementById("pageLoader");
    const menuBtn = document.getElementById("menuBtn");
    const resultNav = document.querySelector(".result-nav");

    const resultCard = document.getElementById("resultCard");
    const resultNotFound = document.getElementById("resultNotFound");

    const resultTestTitle = document.getElementById("resultTestTitle");
    const resultMonthYear = document.getElementById("resultMonthYear");

    const statusBadge = document.getElementById("statusBadge");
    const statusIcon = document.getElementById("statusIcon");
    const statusText = document.getElementById("statusText");

    const studentPhoto = document.getElementById("studentPhoto");
    const studentName = document.getElementById("studentName");
    const studentId = document.getElementById("studentId");

    const testName = document.getElementById("testName");
    const testMonth = document.getElementById("testMonth");
    const testYear = document.getElementById("testYear");

    const score = document.getElementById("score");
    const totalQuestions = document.getElementById("totalQuestions");
    const percentage = document.getElementById("percentage");

    const circleProgress = document.getElementById("circleProgress");
    const circlePercentage = document.getElementById("circlePercentage");

    const correctAnswers = document.getElementById("correctAnswers");
    const wrongAnswers = document.getElementById("wrongAnswers");
    const unansweredAnswers = document.getElementById("unansweredAnswers");
    const totalAnswers = document.getElementById("totalAnswers");

    const resultMessageBox = document.getElementById("resultMessageBox");
    const messageIcon = document.getElementById("messageIcon");
    const resultMessageTitle = document.getElementById("resultMessageTitle");
    const resultMessage = document.getElementById("resultMessage");

    const detailTestName = document.getElementById("detailTestName");
    const detailMonth = document.getElementById("detailMonth");
    const detailYear = document.getElementById("detailYear");
    const detailTotalMarks = document.getElementById("detailTotalMarks");
    const detailStatus = document.getElementById("detailStatus");

    const resultDate = document.getElementById("resultDate");
    const bottomStudentId = document.getElementById("bottomStudentId");

    const notFoundMessage = document.getElementById("notFoundMessage");
    const topButton = document.getElementById("topButton");


    /* =====================================================
       LOADER
    ===================================================== */

    function hideLoader() {

        if (pageLoader) {

            pageLoader.classList.add("hide");

        }
    }


    /* =====================================================
       LOADER FAILSAFE
       Agar koi data issue ho to page forever loading
       mein nahi rahega.
    ===================================================== */

    const loaderFailsafe = setTimeout(function () {

        hideLoader();

    }, 3000);


    window.addEventListener("load", function () {

        setTimeout(function () {

            hideLoader();

            clearTimeout(loaderFailsafe);

        }, 500);

    });


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuBtn && resultNav) {

        menuBtn.addEventListener("click", function () {

            resultNav.classList.toggle("active");

            if (resultNav.classList.contains("active")) {

                menuBtn.innerHTML = "✕";

                menuBtn.setAttribute(
                    "aria-label",
                    "Close Menu"
                );

            } else {

                menuBtn.innerHTML = "☰";

                menuBtn.setAttribute(
                    "aria-label",
                    "Open Menu"
                );

            }

        });


        const navLinks =
            resultNav.querySelectorAll("a");


        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                resultNav.classList.remove("active");

                menuBtn.innerHTML = "☰";

            });

        });

    }


    /* =====================================================
       GET YEAR + MONTH FROM URL
       
       Example:
       monthly-result.html?year=2026&month=January
    ===================================================== */

    const urlParams =
        new URLSearchParams(window.location.search);


    const selectedYear =
        urlParams.get("year");


    const selectedMonth =
        urlParams.get("month");


    /* =====================================================
       CHECK URL
    ===================================================== */

    if (!selectedYear || !selectedMonth) {

        showNotFound(
            "Year ya month information URL mein available nahi hai."
        );

        hideLoader();

        return;

    }


    /* =====================================================
       CURRENT STUDENT
    ===================================================== */

    const currentStudentId =
        localStorage.getItem("cmStudentId");


    const currentStudentName =
        localStorage.getItem("cmStudentName");


    const currentStudentPhoto =
        localStorage.getItem("cmStudentPhoto");


    /* =====================================================
       READ SAVED MONTHLY RESULTS
    ===================================================== */

    let savedResults = [];


    try {

        const storedResults =
            localStorage.getItem("cmMonthlyResults");


        if (storedResults) {

            const parsedResults =
                JSON.parse(storedResults);


            if (Array.isArray(parsedResults)) {

                savedResults = parsedResults;

            }

        }

    } catch (error) {

        console.error(
            "Monthly Result Read Error:",
            error
        );

        savedResults = [];

    }


    /* =====================================================
       FIND RESULT
    ===================================================== */

    let studentResult = null;


    if (currentStudentId) {

        studentResult =
            savedResults.find(function (item) {

                if (!item) {
                    return false;
                }


                const itemStudentId =
                    String(item.studentId || "");


                const itemYear =
                    String(item.year || "");


                const itemMonth =
                    String(item.month || "")
                        .trim()
                        .toLowerCase();


                return (

                    itemStudentId ===
                    String(currentStudentId)

                    &&

                    itemYear ===
                    String(selectedYear)

                    &&

                    itemMonth ===
                    String(selectedMonth)
                        .trim()
                        .toLowerCase()

                );

            });

    }


    /* =====================================================
       RESULT NOT FOUND
    ===================================================== */

    if (!studentResult) {

        showNotFound(

            "Aapne " +
            selectedMonth +
            " " +
            selectedYear +
            " ka monthly test abhi submit nahi kiya hai."

        );

        hideLoader();

        return;

    }


    /* =====================================================
       SHOW RESULT
    ===================================================== */

    showResult(studentResult);

    hideLoader();


    /* =====================================================
       SHOW RESULT
    ===================================================== */

    function showResult(data) {

        /* ---------------------------------------------
           SHOW RESULT CARD
        --------------------------------------------- */

        if (resultCard) {

            resultCard.style.display = "block";

        }


        if (resultNotFound) {

            resultNotFound.style.display = "none";

        }


        /* ---------------------------------------------
           TEST INFORMATION
        --------------------------------------------- */

        const testTitle =
            data.testName ||
            "Monthly Test";


        const year =
            data.year ||
            selectedYear;


        const month =
            data.month ||
            selectedMonth;


        if (resultTestTitle) {

            resultTestTitle.textContent =
                testTitle + " Result";

        }


        if (resultMonthYear) {

            resultMonthYear.textContent =
                month + " " + year;

        }


        /* ---------------------------------------------
           STUDENT INFORMATION
        --------------------------------------------- */

        const finalStudentName =
            data.studentName ||
            currentStudentName ||
            "Student";


        const finalStudentId =
            data.studentId ||
            currentStudentId ||
            "CMCC-XXXX";


        const finalStudentPhoto =
            data.studentPhoto ||
            currentStudentPhoto ||
            "image/user.jpeg";


        if (studentName) {

            studentName.textContent =
                finalStudentName;

        }


        if (studentId) {

            studentId.textContent =
                finalStudentId;

        }


        if (bottomStudentId) {

            bottomStudentId.textContent =
                finalStudentId;

        }


        if (studentPhoto) {

            studentPhoto.src =
                finalStudentPhoto;


            studentPhoto.onerror =
                function () {

                    this.onerror = null;

                    this.src =
                        "image/user.jpeg";

                };

        }


        if (testName) {

            testName.textContent =
                testTitle;

        }


        if (testMonth) {

            testMonth.textContent =
                month;

        }


        if (testYear) {

            testYear.textContent =
                year;

        }


        /* ---------------------------------------------
           SCORE
        --------------------------------------------- */

        const finalScore =
            Number(data.score) || 0;


        const total =
            Number(
                data.totalQuestions ||
                data.total
            ) || 20;


        let finalPercentage =
            Number(data.percentage);


        if (!Number.isFinite(finalPercentage)) {

            finalPercentage =
                total > 0
                    ? (finalScore / total) * 100
                    : 0;

        }


        finalPercentage =
            Math.max(
                0,
                Math.min(
                    100,
                    finalPercentage
                )
            );


        /* ---------------------------------------------
           PERFORMANCE
        --------------------------------------------- */

        const correct =
            Number(data.correct) || 0;


        const wrong =
            Number(data.wrong) || 0;


        const unanswered =
            Number(data.unanswered) || 0;


        /* ---------------------------------------------
           SCORE DISPLAY
        --------------------------------------------- */

        if (score) {

            score.textContent =
                finalScore;

        }


        if (totalQuestions) {

            totalQuestions.textContent =
                total;

        }


        if (percentage) {

            percentage.textContent =
                Math.round(finalPercentage) +
                "%";

        }


        if (circlePercentage) {

            circlePercentage.textContent =
                Math.round(finalPercentage) +
                "%";

        }


        /* ---------------------------------------------
           PERFORMANCE DISPLAY
        --------------------------------------------- */

        if (correctAnswers) {

            correctAnswers.textContent =
                correct;

        }


        if (wrongAnswers) {

            wrongAnswers.textContent =
                wrong;

        }


        if (unansweredAnswers) {

            unansweredAnswers.textContent =
                unanswered;

        }


        if (totalAnswers) {

            totalAnswers.textContent =
                total;

        }


        /* ---------------------------------------------
           SCORE CIRCLE
        --------------------------------------------- */

        updateCircle(finalPercentage);


        /* ---------------------------------------------
           PASS / FAIL
        --------------------------------------------- */

        const savedStatus =
            String(data.status || "")
                .trim()
                .toUpperCase();


        let passed;


        if (savedStatus === "PASS") {

            passed = true;

        } else if (savedStatus === "FAIL") {

            passed = false;

        } else {

            passed =
                finalPercentage >= 40;

        }


        if (passed) {

            setPassStatus();

        } else {

            setFailStatus();

        }


        /* ---------------------------------------------
           TEST DETAILS
        --------------------------------------------- */

        if (detailTestName) {

            detailTestName.textContent =
                testTitle;

        }


        if (detailMonth) {

            detailMonth.textContent =
                month;

        }


        if (detailYear) {

            detailYear.textContent =
                year;

        }


        if (detailTotalMarks) {

            detailTotalMarks.textContent =
                total;

        }


        if (detailStatus) {

            detailStatus.textContent =
                passed
                    ? "PASS"
                    : "FAIL";

        }


        /* ---------------------------------------------
           RESULT DATE
        --------------------------------------------- */

        if (resultDate) {

            resultDate.textContent =
                formatResultDate(
                    data.resultDate ||
                    data.date
                );

        }


        /* ---------------------------------------------
           SCROLL
        --------------------------------------------- */

        setTimeout(function () {

            if (resultCard) {

                resultCard.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }, 300);

    }


    /* =====================================================
       PASS STATUS
    ===================================================== */

    function setPassStatus() {

        if (statusBadge) {

            statusBadge.style.color =
                "#22c55e";

            statusBadge.style.borderColor =
                "rgba(34,197,94,.35)";

            statusBadge.style.background =
                "rgba(34,197,94,.08)";

        }


        if (statusIcon) {

            statusIcon.textContent =
                "✓";

        }


        if (statusText) {

            statusText.textContent =
                "PASS";

        }


        if (resultMessageBox) {

            resultMessageBox.style.borderLeftColor =
                "#22c55e";

        }


        if (messageIcon) {

            messageIcon.textContent =
                "🏆";

        }


        if (resultMessageTitle) {

            resultMessageTitle.textContent =
                "Congratulations!";

        }


        if (resultMessage) {

            resultMessage.textContent =
                "Excellent! Aapne monthly test successfully pass kiya hai. Apni preparation ko isi tarah continue rakhiye.";

        }

    }


    /* =====================================================
       FAIL STATUS
    ===================================================== */

    function setFailStatus() {

        if (statusBadge) {

            statusBadge.style.color =
                "#ef4444";

            statusBadge.style.borderColor =
                "rgba(239,68,68,.35)";

            statusBadge.style.background =
                "rgba(239,68,68,.08)";

        }


        if (statusIcon) {

            statusIcon.textContent =
                "✕";

        }


        if (statusText) {

            statusText.textContent =
                "FAIL";

        }


        if (resultMessageBox) {

            resultMessageBox.style.borderLeftColor =
                "#ef4444";

        }


        if (messageIcon) {

            messageIcon.textContent =
                "📚";

        }


        if (resultMessageTitle) {

            resultMessageTitle.textContent =
                "Keep Practicing";

        }


        if (resultMessage) {

            resultMessage.textContent =
                "Is baar result passing marks se kam raha. Practice kijiye aur next monthly test mein aur better score ke liye try kijiye.";

        }

    }


    /* =====================================================
       SCORE CIRCLE
    ===================================================== */

    function updateCircle(percent) {

        if (!circleProgress) {

            return;

        }


        const radius = 50;


        const circumference =
            2 * Math.PI * radius;


        circleProgress.style.strokeDasharray =
            circumference;


        const offset =
            circumference -
            (
                percent / 100
            ) *
            circumference;


        circleProgress.style.strokeDashoffset =
            offset;

    }


    /* =====================================================
       RESULT NOT FOUND
    ===================================================== */

    function showNotFound(message) {

        if (resultCard) {

            resultCard.style.display =
                "none";

        }


        if (resultNotFound) {

            resultNotFound.style.display =
                "block";

        }


        if (notFoundMessage) {

            notFoundMessage.textContent =
                message;

        }

    }


    /* =====================================================
       FORMAT DATE
    ===================================================== */

    function formatResultDate(dateValue) {

        if (!dateValue) {

            return "—";

        }


        const date =
            new Date(dateValue);


        if (
            Number.isNaN(
                date.getTime()
            )
        ) {

            return String(dateValue);

        }


        return date.toLocaleString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    }


    /* =====================================================
       TOP BUTTON
    ===================================================== */

    if (topButton) {

        window.addEventListener(
            "scroll",
            function () {

                if (
                    window.scrollY > 350
                ) {

                    topButton.classList.add(
                        "show"
                    );

                } else {

                    topButton.classList.remove(
                        "show"
                    );

                }

            }
        );


        topButton.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       CONSOLE
    ===================================================== */

    console.log(
        "CM COMPUTER CENTRE | Monthly Result Loaded Successfully"
    );

});