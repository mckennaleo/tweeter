//how many characters?
$(document).ready(function () {
    $('.form-field').keyup(function () {
        const textLength = 140 - $(this).val().length;
        $('.counter').val(textLength);
        textLength <= 0 ? $('.counter').css('color', 'red') : $('.counter').css('color', '#545149');
    })

});