// Login Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Add styles
    addStyles();
    
    // Create login form container
    const mainContent = document.querySelector('main');
    mainContent.innerHTML = '';
    
    // Create login card
    const loginCard = document.createElement('div');
    loginCard.className = 'login-container';
    
    // Login form HTML
    loginCard.innerHTML = `
        <div class="row justify-content-center">
            <div class="col-12 col-xl-10">
                <div class="card shadow-lg border-0">
                    <div class="row g-0 flex-row-reverse">
                        <!-- Right side - Welcome Message -->
                        <div class="col-lg-5 d-none d-lg-flex align-items-center justify-content-center bg-primary text-white p-5">
                            <div class="text-center">
                                <i class="bi bi-shield-lock display-3 mb-3"></i>
                                <h3 class="mb-3">Welcome Back!</h3>
                                <p class="mb-0">Sign in to access your account and manage your services.</p>
                            </div>
                        </div>
                        
                        <!-- Left side - Login Form -->
                        <div class="col-lg-7 p-5 d-flex flex-column">
                            <div class="text-center mb-5">
                                <h2 class="display-5 fw-bold mb-3" style="color: #003366;">Login to Your Account</h2>
                                <p class="text-muted">Access your dashboard and manage your services</p>
                            </div>
                            <form id="loginForm">
                                <div class="mb-4">
                                    <label for="username" class="form-label">Username or Email</label>
                                    <div class="input-group">
                                        <span class="input-group-text"><i class="bi bi-person"></i></span>
                                        <input type="text" class="form-control" id="username" placeholder="Enter your username or email" required>
                                    </div>
                                </div>
                                <div class="mb-4">
                                    <label for="password" class="form-label">Password</label>
                                    <div class="input-group">
                                        <span class="input-group-text"><i class="bi bi-lock"></i></span>
                                        <input type="password" class="form-control" id="password" placeholder="Enter your password" required>
                                        <button class="btn btn-outline-secondary" type="button" id="togglePassword">
                                            <i class="bi bi-eye"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="d-grid gap-2">
                                    <button type="submit" class="btn btn-primary btn-lg">Login</button>
                                </div>
                                <div class="text-center mt-3">
                                    <a href="password.html" class="text-decoration-none">Forgot password?</a>
                                </div>
                            </form>
                            <div class="text-center mt-4">
                                <p class="mb-0">Don't have an account? <a href="sign.html" class="text-decoration-none fw-bold">Sign up</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    mainContent.appendChild(loginCard);
    
    // Add event listeners
    setupEventListeners();
});

function setupEventListeners() {
    // Toggle password visibility
    const togglePassword = document.getElementById('togglePassword');
    const password = document.getElementById('password');
    
    if (togglePassword && password) {
        togglePassword.addEventListener('click', function() {
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            this.querySelector('i').classList.toggle('bi-eye');
            this.querySelector('i').classList.toggle('bi-eye-slash');
        });
    }
    
    // Handle form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            
            // Basic validation
            if (!username || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            // In a real application, you would validate against your backend here
            // For demo purposes, we'll simulate a successful login
            try {
                // Store user info in sessionStorage
                const userData = {
                    username: username,
                    name: username.split('@')[0], // Extract name from email or use username
                    loggedIn: true,
                    timestamp: new Date().toISOString()
                };
                
                // Save to sessionStorage
                sessionStorage.setItem('user', JSON.stringify(userData));
                
                // Redirect to home page or dashboard
                window.location.href = 'home.html';
                
            } catch (error) {
                console.error('Login error:', error);
                alert('An error occurred during login. Please try again.');
            }
        });
    }
    
    // Handle sign up link
    const signupLink = document.getElementById('signupLink');
    if (signupLink) {
        signupLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Add your sign up logic here
            console.log('Sign up link clicked');
        });
    }
}

function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Base styles */
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }
        
        main {
            flex: 1;
            display: flex;
            align-items: center;
            padding: 4rem 0;  /* Increased vertical padding */
        }
        
        /* Login container */
        .login-container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 15px;
        }
        
        /* Card styles */
        .card {
            border-radius: 1rem;
            overflow: hidden;
            min-height: 600px;  /* Set minimum height */
            box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
        }
        
        /* Form container */
        .col-lg-7 {
            padding: 4rem !important;  /* Increased padding */
            display: flex !important;
            flex-direction: column;
            justify-content: center;
        }
        
        /* Welcome section */
        .col-lg-5 {
            padding: 4rem 2rem !important;
            display: flex !important;
            flex-direction: column;
            justify-content: center;
        }
        
        /* Form elements */
        .form-control {
            padding: 0.75rem 1rem;
            height: auto;
            border-radius: 0.5rem;
        }
        
        .form-control:focus {
            border-color: #003366;
            box-shadow: 0 0 0 0.25rem rgba(0, 51, 102, 0.15);
        }
        
        .btn {
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 500;
        }
        
        .btn-primary {
            background-color: #003366;
            border-color: #003366;
            transition: all 0.3s ease;
        }
        
        .btn-primary:hover {
            background-color: #002244;
            border-color: #002244;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .btn-outline-secondary {
            border-radius: 0 0.5rem 0.5rem 0;
        }
        
        /* Responsive adjustments */
        @media (max-width: 991.98px) {
            .login-container {
                padding: 1.5rem;
            }
            
            .card {
                margin: 1rem 0;
                min-height: auto;
            }
            
            .col-lg-7, .col-lg-5 {
                padding: 2rem !important;
            }
        }
        
        @media (max-width: 767.98px) {
            main {
                padding: 2rem 0;
            }
            
            .col-lg-7, .col-lg-5 {
                padding: 1.5rem !important;
            }
        }
    `;
    document.head.appendChild(style);
}
