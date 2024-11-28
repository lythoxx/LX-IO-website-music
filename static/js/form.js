// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity() || jQuery("#hint").html() !== "") {
                    event.preventDefault()
                    event.stopPropagation()
                }
                form.classList.add('was-validated')
            }, false)
    })
})()


var email = jQuery('#emailAddress');
var hint = jQuery("#hint");

email.on('blur',function() {
    hint.css('display', 'none').empty(); // hide hint initially
    jQuery(this).mailcheck({
        suggested: function(element, suggestion) {
            if(!hint.html()) {
                // misspell - display hint element
                var suggestion = "Did you mean <span class='suggestion'>" +
                    "<span class='address'>" + suggestion.address + "</span>"
                    + "@<a href='#' class='domain no-underline'>" + suggestion.domain +
                    "</a></span>? <a href='#' class='no-underline' id='dismiss'>No</a>";

                hint.html(suggestion).fadeIn(150);
            } else {
                // Subsequent errors
                jQuery(".address").html(suggestion.address);
                jQuery(".domain").html(suggestion.domain);
            }
        }
    });
});

hint.on('click', '.domain', function() {
    // Display with the suggestion and remove the hint
    email.val(jQuery(".suggestion").text());
    hint.fadeOut(200, function() {
        jQuery(this).empty();
    });
    return false;
});

hint.on('click', '#dismiss', function() {
    // Dismiss the suggestion
    hint.fadeOut(200, function() {
        jQuery(this).empty();
    });
    return false;
});