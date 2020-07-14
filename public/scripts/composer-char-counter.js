// Four steps in jQuery
// Step one is Target
// Step two is add event listener
// Step Three (optional): Retarget/Self target
// Effect

$(document).ready(function() {
    // --- our code goes here ---
    // $('.title').click(function() {
    //     $('.username h2').text('New Name');
    //     $('.subtitle').text('Don\'t write a new tweet')
    //     const h2 = $('.name').text()
    //     console.log(h2)        
    // });
    $('.form-field').keyup(function() {
        const textLength = 140 - $(this).val().length;
        $('.counter').val(textLength);
        textLength <= 0  ? $('.counter').css('color', 'red') : $('.counter').css('color', '#545149');
    })
    
});