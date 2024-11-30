// Used for the audio player
const audioTitle = document.getElementById('audio-title')
const audioDescription = document.getElementById('audio-description')
const darkness = document.getElementById('listen-btn-darkness')
const everending = document.getElementById('toast-btn-everending')
const current = document.getElementById('toast-btn-current')
const endlessNightMenu = document.getElementById('toast-btn-endless-main-menu')
const endlessNightTheme = document.getElementById('toast-btn-endless-main-theme')
const endlessNightTut = document.getElementById('toast-btn-endless-tut')
const toastLiveExample = document.getElementById('audio-player')
const dirbtn = document.getElementById('dir-btn')
const repbtn = document.getElementById('rep-btn')
const container = document.getElementById('audio-container')
const audio = document.getElementById('audio')
const ffbtn = document.getElementById('ff-btn')
const rwbtn = document.getElementById('rew-btn')
const backbtn = document.getElementById('back-btn')
const nextbtn = document.getElementById('next-btn')

// Player variables
var repeat = localStorage.getItem('repeat') || false
var seekVal = 10
var audioVolume = localStorage.getItem('audioVolume') || 1
var albums = {
    "Ghost Notes": ["Everending Constant", "Through The Current"],
    "Endless Night": ["Endless Night - Main Menu", "Endless Night - Main Theme", "Endless Night - Tutorial"],
    "Darkness": ["Darkness"]
}

// Used for the audio player
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

if (isMobile()) {
    dirbtn.style.display = 'none'
}

if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
        title: "",
        album: "",
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

    navigator.mediaSession.setActionHandler("play", () => {
        audio.play();
    });
    navigator.mediaSession.setActionHandler("pause", () => {
        audio.pause();
    });
    navigator.mediaSession.setActionHandler("seekbackward", () => {
        audio.currentTime = Math.max(audio.currentTime - 10, 0);
    });
    navigator.mediaSession.setActionHandler("seekforward", () => {
        audio.currentTime = Math.min(audio.currentTime + 10, audio.duration);
    });
    navigator.mediaSession.setActionHandler("previoustrack", () => {
        var album = navigator.mediaSession.metadata.album
        var song = navigator.mediaSession.metadata.title
        var index = albums[album].indexOf(song)
        if (audio.currentTime > 3) {
            audio.currentTime = 0
        } else if (index > 0) {
            document.getElementById('audio').src = '/static/assets/audio/' + albums[album][index - 1] + '.mp3'
            document.getElementById('audio').play()
            navigator.mediaSession.metadata.title = albums[album][index - 1]
        } else {
            document.getElementById('audio').src = '/static/assets/audio/' + albums[album][albums[album].length - 1] + '.mp3'
            document.getElementById('audio').play()
            navigator.mediaSession.metadata.title = albums[album][albums[album].length - 1]
        }
    });
    navigator.mediaSession.setActionHandler("nexttrack", () => {
        var album = navigator.mediaSession.metadata.album
        var song = navigator.mediaSession.metadata.title
        var index = albums[album].indexOf(song)
        if (index < albums[album].length - 1) {
            document.getElementById('audio').src = '/static/assets/audio/' + albums[album][index + 1] + '.mp3'
            document.getElementById('audio').play()
            navigator.mediaSession.metadata.title = albums[album][index + 1]
        } else {
            document.getElementById('audio').src = '/static/assets/audio/' + albums[album][0] + '.mp3'
            document.getElementById('audio').play()
            navigator.mediaSession.metadata.title = albums[album][0]
        }
    });
    navigator.mediaSession.setActionHandler('seekto', (details) => {
        audio.currentTime = details.seekTime;
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
        localStorage.setItem('audioAlbum', 'Darkness')
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
        localStorage.setItem('audioAlbum', 'Ghost Notes')
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
        localStorage.setItem('audioAlbum', 'Ghost Notes')
    })
}
if (endlessNightMenu) {
    endlessNightMenu.addEventListener('click', function () {
        var toast = new bootstrap.Toast(toastLiveExample)

        toast.show()
        document.getElementById('audio').src = '/static/assets/audio/Endless Night - Main Menu.mp3'
        document.getElementById('audio').play()
        localStorage.setItem('audioSource', '/static/assets/audio/Endless Night - Main Menu.mp3')
        navigator.mediaSession.metadata.album = "Endless Night"
        localStorage.setItem('audioAlbum', 'Endless Night')
    })
}
if (endlessNightTheme) {
    endlessNightTheme.addEventListener('click', function () {
        var toast = new bootstrap.Toast(toastLiveExample)

        toast.show()
        document.getElementById('audio').src = '/static/assets/audio/Endless Night - Main Theme.mp3'
        document.getElementById('audio').play()
        localStorage.setItem('audioSource', '/static/assets/audio/Endless Night - Main Theme.mp3')
        navigator.mediaSession.metadata.album = "Endless Night"
        localStorage.setItem('audioAlbum', 'Endless Night')
    })
}
if (endlessNightTut) {
    endlessNightTut.addEventListener('click', function () {
        var toast = new bootstrap.Toast(toastLiveExample)

        toast.show()
        document.getElementById('audio').src = '/static/assets/audio/Endless Night - Tutorial.mp3'
        document.getElementById('audio').play()
        localStorage.setItem('audioSource', '/static/assets/audio/Endless Night - Tutorial.mp3')
        navigator.mediaSession.metadata.album = "Endless Night"
        localStorage.setItem('audioAlbum', 'Endless Night')
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
        localStorage.removeItem('audioVolume')
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
        audio.volume = audioVolume
        navigator.mediaSession.metadata.album = localStorage.getItem('audioAlbum')
        navigator.mediaSession.metadata.title = audio.src.split('/').pop().split('.')[0].replace(/%20/g, ' ')
        audioDescription.textContent = `${navigator.mediaSession.metadata.album} • ${navigator.mediaSession.metadata.artist}`
        audioTitle.textContent = navigator.mediaSession.metadata.title
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

    audio.addEventListener('play', function() {
        localStorage.setItem('audioPaused', 'false')
        navigator.mediaSession.playbackState = "playing"
        navigator.mediaSession.metadata.title = audio.src.split('/').pop().split('.')[0].replace(/%20/g, ' ')
        audioTitle.textContent = navigator.mediaSession.metadata.title
        audioDescription.textContent = `${navigator.mediaSession.metadata.album} • ${navigator.mediaSession.metadata.artist}`
    })

    audio.addEventListener('pause', function() {
        localStorage.setItem('audioPaused', 'true')
        navigator.mediaSession.playbackState = "paused"
    })

    audio.addEventListener('ended', function() {
        var album = navigator.mediaSession.metadata.album
        console.log(album)
        console.log(albums[album])
        var albumLen = albums[album].length
        var title = navigator.mediaSession.metadata.title
        var index = albums[album].indexOf(title)
        if (repeat) {
            audio.currentTime = 0
            audio.play()
        } else if (index < albumLen - 1) {
            audio.src = '/static/assets/audio/' + albums[album][index + 1] + '.mp3'
            audio.play()
        } else {
            navigator.mediaSession.playbackState = "none"
        }
    })

    audio.addEventListener('volumechange', function() {
        // Save volume state to localStorage
        localStorage.setItem('audioVolume', audio.volume)
        audioVolume = audio.volume
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

if (backbtn) {
    backbtn.addEventListener('click', function() {
        var album = navigator.mediaSession.metadata.album
        var song = navigator.mediaSession.metadata.title
        var index = albums[album].indexOf(song)
        if (audio.currentTime > 3) {
            audio.currentTime = 0
        } else if (index > 0) {
            document.getElementById('audio').src = '/static/assets/audio/' + albums[album][index - 1] + '.mp3'
            document.getElementById('audio').play()
            navigator.mediaSession.metadata.title = albums[album][index - 1]
        } else {
            document.getElementById('audio').src = '/static/assets/audio/' + albums[album][albums[album].length - 1] + '.mp3'
            document.getElementById('audio').play()
            navigator.mediaSession.metadata.title = albums[album][albums[album].length - 1]
        }
    })

    backbtn.addEventListener('mouseenter', function() {
        backbtn.classList.remove('bi-skip-backward')
        backbtn.classList.add('bi-skip-backward-fill')
    })
    backbtn.addEventListener('mouseleave', function() {
        backbtn.classList.remove('bi-skip-backward-fill')
        backbtn.classList.add('bi-skip-backward')
    })
}

if (nextbtn) {
    nextbtn.addEventListener('click', function() {
        var album = navigator.mediaSession.metadata.album
        var song = navigator.mediaSession.metadata.title
        var index = albums[album].indexOf(song)
        if (audio.currentTime > 3) {
            audio.currentTime = 0
        } else if (index > 0) {
        document.getElementById('audio').src = '/static/assets/audio/' + albums[album][index - 1] + '.mp3'
            document.getElementById('audio').play()
            navigator.mediaSession.metadata.title = albums[album][index - 1]
        } else {
            document.getElementById('audio').src = '/static/assets/audio/' + albums[album][albums[album].length - 1] + '.mp3'
            document.getElementById('audio').play()
            navigator.mediaSession.metadata.title = albums[album][albums[album].length - 1]
        }
    })

    nextbtn.addEventListener('mouseenter', function() {
        nextbtn.classList.remove('bi-skip-forward')
        nextbtn.classList.add('bi-skip-forward-fill')
    })
    nextbtn.addEventListener('mouseleave', function() {
        nextbtn.classList.remove('bi-skip-forward-fill')
        nextbtn.classList.add('bi-skip-forward')
    })
}