
                // Here you would typically send the data to your server
                console.log('Login attempt with:', { email });
                
                // Simulate API call (replace with actual API call)
                simulateLogin(email, password)
                    .then(user => {
                        // Store user session data
                        const userData = {
                            username: email,
                            name: email.split('@')[0],
                            loggedIn: true,
                            timestamp: new Date().toISOString()
                        };
                        
                        // Save to sessionStorage
                        sessionStorage.setItem('user', JSON.stringify(userData));
                        
                        // Redirect to home page
                        window.location.href = 'home.html';
                    })
                    .catch(error => {
                        showError('login', error.message || 'Invalid email or password');
                    });
// Check if user is logged in
const userData = JSON.parse(sessionStorage.getItem('user'));
if (userData && userData.loggedIn) {
    // User is logged in
    console.log('Welcome back, ' + userData.name);
} else {
    // User is not logged in, redirect to login
    window.location.href = 'login.html';
}