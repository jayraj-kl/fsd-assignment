$(document).ready(function () {
    // Set placeholder using jQuery
    $('#username').attr('placeholder', 'Enter your username');

    // Change button text on click
    $('#submitBtn').click(function () {
        $(this).text('Submitting...');
    });
});

document.getElementById('registrationForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;
    const messageElement = document.getElementById('message');

    // Regular Expressions
    const emailPattern = /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/;
    const phonePattern = /^\d{10}$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$&]).{7,}$/;

    // Clear previous message
    messageElement.innerHTML = '';

    // Validations
    if (!username || !email || !phone || !password || !confirmPassword) {
        messageElement.innerHTML = 'All fields are required.';
        return;
    }

    if (!emailPattern.test(email)) {
        messageElement.innerHTML = 'Invalid email format.';
        return;
    }

    if (!phonePattern.test(phone)) {
        messageElement.innerHTML = 'Phone number must be 10 digits.';
        return;
    }

    if (!passwordPattern.test(password)) {
        messageElement.innerHTML = 'Password must be at least 7 characters long, with at least one uppercase letter, one digit, and one special character (@#$&).';
        return;
    }

    if (password !== confirmPassword) {
        messageElement.innerHTML = 'Passwords do not match.';
        return;
    }

    messageElement.innerHTML = 'Registration Successful!';
    messageElement.style.color = 'white';
});

// Change image on button click
document.getElementById('changeImageBtn').addEventListener('click', function () {
    document.getElementById('image').src = 'newImage.jpg';
});
