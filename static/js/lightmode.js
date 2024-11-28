// Function to set a cookie
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to get a cookie
function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cname) == 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}

document.addEventListener('DOMContentLoaded', function() {
    if (getCookie("cookieconsent") === "") {
        console.log("Cookie consent not set, displaying cookie consent banner");
        var modal = new bootstrap.Modal(document.getElementById("cookieModal"), {
            keyboard: false
        });
        modal.show();
    }
    // Check cookie and set initial mode
    if (getCookie("lightmode") === "enabled") {
        document.body.classList.add("lightmode");
        document.getElementById("darkmodetoggle").classList.add("bi-sun");
        document.getElementById("darkmodetoggle").classList.remove("bi-moon");
        document.getElementsByClassName("logoCustom")[0].src = "/static/assets/vector/default-monochrome-black.svg";
    } else {
        document.body.classList.remove("lightmode");
        document.getElementById("darkmodetoggle").classList.add("bi-moon");
        document.getElementById("darkmodetoggle").classList.remove("bi-sun");
        document.getElementsByClassName("logoCustom")[0].src = "/static/assets/vector/default-monochrome-white.svg";
    }
});

document.getElementById("darkmodetoggle").addEventListener("mouseenter", function() {
    if (!document.body.classList.contains("lightmode")) {
        document.getElementById("darkmodetoggle").classList.add("bi-moon-fill");
        document.getElementById("darkmodetoggle").classList.remove("bi-moon");
    } else {
        document.getElementById("darkmodetoggle").classList.add("bi-sun-fill");
        document.getElementById("darkmodetoggle").classList.remove("bi-sun");
    }
});
document.getElementById("darkmodetoggle").addEventListener("mouseleave", function() {
    if (!document.body.classList.contains("lightmode")) {
        document.getElementById("darkmodetoggle").classList.add("bi-moon");
        document.getElementById("darkmodetoggle").classList.remove("bi-moon-fill");
    } else {
        document.getElementById("darkmodetoggle").classList.add("bi-sun");
        document.getElementById("darkmodetoggle").classList.remove("bi-sun-fill");
    }
});
document.getElementById("darkmodetoggle").addEventListener("click", function() {
    if (document.body.classList.contains("lightmode")) {
        document.body.classList.remove("lightmode");
        document.getElementById("darkmodetoggle").classList.add("bi-moon-fill");
        document.getElementById("darkmodetoggle").classList.remove("bi-sun-fill");
        document.getElementsByClassName("logoCustom")[0].src = "/static/assets/vector/default-monochrome-white.svg";
        setCookie("lightmode", "disabled", 30);
    } else {
        document.body.classList.add("lightmode");
        document.getElementById("darkmodetoggle").classList.add("bi-sun-fill");
        document.getElementById("darkmodetoggle").classList.remove("bi-moon-fill");
        document.getElementsByClassName("logoCustom")[0].src = "/static/assets/vector/default-monochrome-black.svg";
        setCookie("lightmode", "enabled", 30);
    }
});
