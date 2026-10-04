const videos = document.querySelectorAll(".hero-video");
const dots = document.querySelectorAll(".dot");

let currentVideo = 0;


function showVideo(index) {

    videos.forEach((video, i) => {

        video.classList.remove("active");

        video.pause();

        if (dots[i]) {
            dots[i].classList.remove("active");
        }

    });


    videos[index].classList.add("active");

    if (dots[index]) {
        dots[index].classList.add("active");
    }


    videos[index].currentTime = 0;

    videos[index].play();

}


function nextVideo() {

    currentVideo++;

    if (currentVideo >= videos.length) {
        currentVideo = 0;
    }

    showVideo(currentVideo);

}


function previousVideo() {

    currentVideo--;

    if (currentVideo < 0) {
        currentVideo = videos.length - 1;
    }

    showVideo(currentVideo);

}


/* Video खत्म होने पर अगला video */

videos.forEach((video, index) => {

    video.addEventListener("ended", () => {

        if (index === currentVideo) {
            nextVideo();
        }

    });

});


showVideo(0);