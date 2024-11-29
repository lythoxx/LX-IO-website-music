// Used for the audio player
const darkness = document.getElementById('listen-btn-darkness')
const everending = document.getElementById('toast-btn-everending')
const current = document.getElementById('toast-btn-current')
const toastLiveExample = document.getElementById('audio-player')
const dirbtn = document.getElementById('dir-btn')
const repbtn = document.getElementById('rep-btn')
const container = document.getElementById('audio-container')
const audio = document.getElementById('audio')
const ffbtn = document.getElementById('ff-btn')
const rwbtn = document.getElementById('rew-btn')

// Player variables
var repeat = localStorage.getItem('repeat') || false
var seekVal = 10

// Used for the audio player
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

if (isMobile()) {
    dirbtn.style.display = 'none'
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
    })

    navigator.mediaSession.setActionHandler('play', function() {
        audio.play();
    });
    navigator.mediaSession.setActionHandler('pause', function() {
        audio.pause();
    });
    navigator.mediaSession.setActionHandler('seekbackward', function() {
        audio.currentTime = Math.max(audio.currentTime - 10, 0);
    });
    navigator.mediaSession.setActionHandler('seekforward', function() {
        audio.currentTime = Math.min(audio.currentTime + 10, audio.duration);
    });
}

if (darkness) {
    darkness.addEventListener('click', function () {
        var toast = new bootstrap.Toast(toastLiveExample)

        toast.show()
        document.getElementById('audio').src = '/static/assets/audio/Darkness.mp3'
        document.getElementById('audio').play()
        localStorage.setItem('audioSource', '/static/assets/audio/Darkness.mp3')
        navigator.mediaSession.metadata.album = "Darkness"
    })
}
if (everending) {
    everending.addEventListener('click', function () {
        var toast = new bootstrap.Toast(toastLiveExample)

        toast.show()
        document.getElementById('audio').src = '/static/assets/audio/Everending Constant.mp3'
        document.getElementById('audio').play()
        localStorage.setItem('audioSource', '/static/assets/audio/Everending Constant.mp3')
        navigator.mediaSession.metadata.album = "Ghost Notes"
    })
}
if (current) {
    current.addEventListener('click', function () {
        var toast = new bootstrap.Toast(toastLiveExample)

        toast.show()
        document.getElementById('audio').src = '/static/assets/audio/Through The Current.mp3'
        document.getElementById('audio').play()
        localStorage.setItem('audioSource', '/static/assets/audio/Through The Current.mp3')
        navigator.mediaSession.metadata.album = "Ghost Notes"
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
        localStorage.removeItem('repeat')
        // remove src
        document.getElementById('audio').src = ''
        // restore repeat button
        repeat = false
        repbtn.classList.remove('bi-repeat-1')
        repbtn.classList.add('bi-repeat')
    })
}

document.addEventListener('DOMContentLoaded', function() {
    // Load audio state from localStorage
    if (localStorage.getItem('audioCurrentTime')) {
        audio.currentTime = localStorage.getItem('audioCurrentTime')
    }
    if (localStorage.getItem('audioPaused') === 'false') {
        var toast = new bootstrap.Toast(toastLiveExample)
        toast.show()
        audio.src = localStorage.getItem('audioSource')
        audio.play()
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
    if (localStorage.getItem('repeat') === 'true') {
        repeat = true
        repbtn.classList.remove('bi-repeat')
        repbtn.classList.add('bi-repeat-1')
    } else {
        repeat = false
        repbtn.classList.remove('bi-repeat-1')
        repbtn.classList.add('bi-repeat')
    }

    // Save audio state to localStorage
    audio.addEventListener('timeupdate', function() {
        localStorage.setItem('audioCurrentTime', audio.currentTime)
    })

    audio.addEventListener('play', function() {
        localStorage.setItem('audioPaused', 'false')
        navigator.mediaSession.playbackState = "playing"
        navigator.mediaSession.metadata.title = audio.src.split('/').pop().split('.')[0]
    })

    audio.addEventListener('pause', function() {
        localStorage.setItem('audioPaused', 'true')
        navigator.mediaSession.playbackState = "paused"
    })

    audio.addEventListener('ended', function() {
        if (repeat) {
            audio.currentTime = 0
            audio.play()
        }
        navigator.mediaSession.playbackState = "none"
    })
})

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

if (repbtn) {
    repbtn.addEventListener('click', function() {
        if (repeat) {
            repeat = false
            repbtn.classList.remove('bi-repeat-1')
            repbtn.classList.add('bi-repeat')
            localStorage.setItem('repeat', repeat)
        } else {
            repeat = true
            repbtn.classList.remove('bi-repeat')
            repbtn.classList.add('bi-repeat-1')
            localStorage.setItem('repeat', repeat)
        }
    })
}

if (ffbtn) {
    ffbtn.addEventListener('click', function() {
        audio.currentTime = Math.min(audio.currentTime + seekVal, audio.duration)
    })

    ffbtn.addEventListener('mouseenter', function() {
        ffbtn.classList.remove('bi-fast-forward')
        ffbtn.classList.add('bi-fast-forward-fill')
    })
    ffbtn.addEventListener('mouseleave', function() {
        ffbtn.classList.remove('bi-fast-forward-fill')
        ffbtn.classList.add('bi-fast-forward')
    })
}

if (rwbtn) {
    rwbtn.addEventListener('click', function() {
        audio.currentTime = Math.max(audio.currentTime - seekVal, 0)
    })

    rwbtn.addEventListener('mouseenter', function() {
        rwbtn.classList.remove('bi-rewind')
        rwbtn.classList.add('bi-rewind-fill')
    })
    rwbtn.addEventListener('mouseleave', function() {
        rwbtn.classList.remove('bi-rewind-fill')
        rwbtn.classList.add('bi-rewind')
    })
}
