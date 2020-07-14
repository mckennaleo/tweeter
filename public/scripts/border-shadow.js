$(document).ready(function() {
    $('.tweet-display article').hover(function() {
        $(this).css('box-shadow', '10px 10px #FFE17A')
    }, function() {
        $('.tweet-display article').css('box-shadow', '0px 0px')
    })
});