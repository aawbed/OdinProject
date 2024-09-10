document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    form.addEventListener('submit', function (e) {
        let valid = true;

        // Clear previous error messages
        clearErrors();

        // Validate email
        if (!validateEmail(emailInput.value)) {
            showError(emailInput, "Please enter a valid email.");
            valid = false;
        }

        // Validate password
        if (passwordInput.value.trim() === "") {
            showError(passwordInput, "Password cannot be empty.");
            valid = false;
        }

        // If not valid, prevent form submission
        if (!valid) {
            e.preventDefault();
        }
    });

    // Helper function to validate email format
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(String(email).toLowerCase());
    }

    // Function to show error message
    function showError(input, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerText = message;
        input.parentElement.appendChild(errorDiv);
        input.classList.add('error-input');
    }

    // Function to clear previous errors
    function clearErrors() {
        const errors = document.querySelectorAll('.error-message');
        errors.forEach(error => error.remove());
        const inputs = document.querySelectorAll('.error-input');
        inputs.forEach(input => input.classList.remove('error-input'));
    }
});
