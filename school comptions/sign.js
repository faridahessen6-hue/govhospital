document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const togglePassword = document.getElementById('togglePassword');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const signupForm = document.getElementById('signupForm');

    // Toggle password visibility
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            confirmPassword.setAttribute('type', type);
            this.querySelector('i').classList.toggle('bi-eye');
            this.querySelector('i').classList.toggle('bi-eye-slash');
        });
    }

    // Form validation
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const email = document.getElementById('email').value.trim();
            const username = document.getElementById('username').value.trim();
            const passwordValue = password.value.trim();
            const confirmPasswordValue = confirmPassword.value.trim();
            const terms = document.getElementById('terms').checked;
            
            // Reset previous error states
            resetErrors();
            
            // Validate form
            let isValid = true;
            
            // Email validation
            if (!isValidEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Username validation
            if (username.length < 3) {
                showError('username', 'Username must be at least 3 characters long');
                isValid = false;
            }
            
            // Password validation
            if (passwordValue.length < 8) {
                showError('password', 'Password must be at least 8 characters long');
                isValid = false;
            } else if (!isStrongPassword(passwordValue)) {
                showError('password', 'Password must include letters, numbers, and special characters');
                isValid = false;
            }
            
            // Confirm password validation
            if (passwordValue !== confirmPasswordValue) {
                showError('confirmPassword', 'Passwords do not match');
                isValid = false;
            }
            
            // Terms and conditions validation
            if (!terms) {
                showError('terms', 'You must accept the terms and conditions');
                isValid = false;
            }
            
            // If form is valid, submit it
            if (isValid) {
                // Here you would typically send the data to your server
                console.log('Form submitted:', { email, username });
                
                // Show success message
                alert('Account created successfully! You can now log in.');
                
                // Redirect to login page
                window.location.href = 'login.html';
            }
        });
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Helper function to check password strength
    function isStrongPassword(password) {
        // At least 8 characters, one letter, one number and one special character
        const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return re.test(password);
    }
    
    // Helper function to show error messages
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const formGroup = field.closest('.mb-3') || field.closest('.form-check');
        
        // Remove any existing error message
        const existingError = formGroup.querySelector('.invalid-feedback');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error class to input
        field.classList.add('is-invalid');
        
        // Create and append error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = message;
        
        // Insert error message after the input or checkbox
        if (field.type === 'checkbox') {
            formGroup.querySelector('label').after(errorDiv);
        } else {
            field.after(errorDiv);
        }
    }
    
    // Helper function to reset error states
    function resetErrors() {
        // Remove all error messages
        document.querySelectorAll('.invalid-feedback').forEach(el => el.remove());
        
        // Remove error classes from all inputs
        document.querySelectorAll('.is-invalid').forEach(el => {
            el.classList.remove('is-invalid');
        });
    }
    
    // Real-time validation for password strength
    if (password) {
        password.addEventListener('input', function() {
            const passwordValue = this.value.trim();
            const strengthText = document.getElementById('password-strength');
            
            if (!strengthText) {
                const strengthDiv = document.createElement('div');
                strengthDiv.id = 'password-strength';
                strengthDiv.className = 'form-text mt-1';
                this.parentNode.parentNode.appendChild(strengthDiv);
            }
            
            if (passwordValue.length === 0) {
                strengthText.textContent = '';
            } else if (passwordValue.length < 8) {
                strengthText.textContent = 'Weak - Use at least 8 characters';
                strengthText.className = 'form-text mt-1 text-danger';
            } else if (!isStrongPassword(passwordValue)) {
                strengthText.textContent = 'Medium - Add numbers and special characters';
                strengthText.className = 'form-text mt-1 text-warning';
            } else {
                strengthText.textContent = 'Strong password!';
                strengthText.className = 'form-text mt-1 text-success';
            }
        });
    }
});
