$(document).ready(function () {
    // Change button text
    $('#submitBtn').click(function () {
        $(this).text('Submitting...');
    });

    // Set background-image using jQuery
    // $('body').css('background-image', 'url("mit-bg.jpeg")');

    // Access form data
    $('#submitBtn').click(function () {
        let username = $('#username').val();
        console.log('Username: ' + username);
    });

    // Add attribute using jQuery
    $('#username').attr('placeholder', 'Enter your username');
});