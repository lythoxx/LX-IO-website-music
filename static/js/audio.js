var darkness = document.getElementById('listen-btn-darkness')
var everending = document.getElementById('toast-btn-everending')
var current = document.getElementById('toast-btn-current')
var toastLiveExample = document.getElementById('audio-player')
var dirbtn = document.getElementById('dir-btn')
var container = document.getElementById('audio-container')
var audio = document.getElementById('audio');

// Used for the audio player
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (isMobile()) {
    dirbtn.style.display = 'none'
}

if (darkness) {
    darkness.addEventListener('click', function () {
        var toast = new bootstrap.Toast(toastLiveExample)

        toast.show()
        document.getElementById('audio').src = '/static/assets/audio/Darkness.mp3'
        document.getElementById('audio').play()
        localStorage.setItem('audioSource', '/static/assets/audio/Darkness.mp3')
    })
}
if (everending) {
    everending.addEventListener('click', function () {
        var toast = new bootstrap.Toast(toastLiveExample)

        toast.show()
        document.getElementById('audio').src = '/static/assets/audio/Everending Constant.mp3'
        document.getElementById('audio').play()
        localStorage.setItem('audioSource', '/static/assets/audio/Everending Constant.mp3')
    })
}
if (current) {
    current.addEventListener('click', function () {
        var toast = new bootstrap.Toast(toastLiveExample)

        toast.show()
        document.getElementById('audio').src = '/static/assets/audio/Through The Current.mp3'
        document.getElementById('audio').play()
        localStorage.setItem('audioSource', '/static/assets/audio/Through The Current.mp3')
    })
}

var toastClose = document.getElementById('toast-btn')
if (toastClose) {
    toastClose.addEventListener('click', function () {
        document.getElementById('audio').pause()
        // set time to 0
        document.getElementById('audio').currentTime = 0
        // delete from local storage
        localStorage.removeItem('audioCurrentTime')
        localStorage.removeItem('audioPaused')
        localStorage.removeItem('audioSource')
        // remove src
        document.getElementById('audio').src = ''
    })
}

document.addEventListener('DOMContentLoaded', function() {
    // Load audio state from localStorage
    if (localStorage.getItem('audioCurrentTime')) {
        audio.currentTime = localStorage.getItem('audioCurrentTime');
    }
    if (localStorage.getItem('audioPaused') === 'false') {
        var toast = new bootstrap.Toast(toastLiveExample)
        toast.show()
        audio.src = localStorage.getItem('audioSource');
        audio.play();
    }
    if (localStorage.getItem('audioPosition') === 'start') {
        container.classList.remove('end-0')
        container.classList.add('start-0')
        dirbtn.classList.remove('bi-caret-left')
        dirbtn.classList.add('bi-caret-right')
    } else {
        container.classList.remove('start-0')
        container.classList.add('end-0')
        dirbtn.classList.remove('bi-caret-right')
        dirbtn.classList.add('bi-caret-left')
    }

    // Save audio state to localStorage
    audio.addEventListener('timeupdate', function() {
        localStorage.setItem('audioCurrentTime', audio.currentTime);
    });

    audio.addEventListener('play', function() {
        localStorage.setItem('audioPaused', 'false');
    });

    audio.addEventListener('pause', function() {
        localStorage.setItem('audioPaused', 'true');
    });
});

if (dirbtn) {
    dirbtn.addEventListener('mouseenter', function() {
        if (dirbtn.classList.contains('bi-caret-left')) {
            dirbtn.classList.remove('bi-caret-left')
            dirbtn.classList.add('bi-caret-left-fill')
        } else {
            dirbtn.classList.remove('bi-caret-right')
            dirbtn.classList.add('bi-caret-right-fill')
        }
    })
    dirbtn.addEventListener('mouseleave', function() {
        if (dirbtn.classList.contains('bi-caret-left-fill')) {
            dirbtn.classList.remove('bi-caret-left-fill')
            dirbtn.classList.add('bi-caret-left')
        } else {
            dirbtn.classList.remove('bi-caret-right-fill')
            dirbtn.classList.add('bi-caret-right')
        }
    })
    dirbtn.addEventListener('click', function() {
        if (dirbtn.classList.contains('bi-caret-left-fill')) {
            container.classList.remove('end-0')
            container.classList.add('start-0')
            dirbtn.classList.remove('bi-caret-left-fill')
            dirbtn.classList.add('bi-caret-right-fill')
            localStorage.setItem('audioPosition', 'start')
        } else {
            container.classList.remove('start-0')
            container.classList.add('end-0')
            dirbtn.classList.remove('bi-caret-right-fill')
            dirbtn.classList.add('bi-caret-left-fill')
            localStorage.setItem('audioPosition', 'end')
        }
    })
}

if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
        title: audio.src.split('/').pop().split('.')[0],
        artist: "LX-IO",
        artwork: [
            {
                src: "/static/assets/profile.png",
                sizes: "96x96",
                type: "image/png",
            },
            {
                src: "/static/assets/profile.png",
                sizes: "128x128",
                type: "image/png",
            },
            {
                src: "/static/assets/profile.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/static/assets/profile.png",
                sizes: "256x256",
                type: "image/png",
            },
            {
                src: "/static/assets/profile.png",
                sizes: "384x384",
                type: "image/png",
            },
            {
                src: "/static/assets/profile.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    });
}