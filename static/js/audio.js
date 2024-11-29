var darkness = document.getElementById('listen-btn-darkness')
var everending = document.getElementById('toast-btn-everending')
var current = document.getElementById('toast-btn-current')
var toastLiveExample = document.getElementById('audio-player')
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

var toatClose = document.getElementById('toast-btn')
if (toatClose) {
    toatClose.addEventListener('click', function () {
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
    var audio = document.getElementById('audio');

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