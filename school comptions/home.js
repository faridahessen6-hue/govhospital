// Main styles function
function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Base styles */
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            color: #333;
        }
        
        /* Jumbotron styles */
        .jumbotron {
            background-color: #f0f4f8;
            padding: 2rem 0 3rem;
            border-radius: 0.3rem;
            margin-bottom: 2rem;
            flex: 1;
            border: 1px solid #e0e6ed;
        }
        
        /* Video container */
        .video-container {
            position: relative;
            overflow: hidden;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin: 2rem 0;
        }
        
        .video-container video {
            width: 100%;
            display: block;
        }
        
        .video-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.3);
            color: white;
            font-size: 1.5rem;
            text-align: center;
            padding: 1rem;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .video-container:hover .video-overlay {
            opacity: 1;
        }
        
        /* Button styles */
        .btn-primary {
            background-color: #003366;
            border-color: #003366;
        }
        
        .btn-primary:hover {
            background-color: #002244;
            border-color: #002244;
        }
        
        /* Footer styles */
        footer {
            background-color: #003366;
            color: white;
            padding: 3rem 0 1rem;
            padding-bottom: 5rem;
            margin-top: auto;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
            .jumbotron {
                padding: 1rem 0 3rem;
            }
            
            .video-overlay {
                font-size: 1rem;
            }
        }
        
        /* Animation Classes */
        .fade-in {
            animation: fadeIn 1s ease-in-out;
        }
        
        .slide-up {
            animation: slideUp 0.8s ease-out;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from { 
                opacity: 0; 
                transform: translateY(30px);
            }
            to { 
                opacity: 1; 
                transform: translateY(0);
            }
        }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
        }
        
        ::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
            background: var(--accent-color);
            border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: var(--primary-color);
        }
    `;
    document.head.appendChild(style);
}

// Initialize animations
function initAnimations() {
    // Add animation classes to elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .stat-card, .how-it-works-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
}

// Initialize stats counter
function initStatsCounter() {
    const statElements = document.querySelectorAll('.stat-number');
    const stats = [
        { target: 1000000, duration: 2000, element: statElements[0] },
        { target: 50, duration: 1500, element: statElements[1] },
        { target: 24, duration: 1000, element: statElements[2] },
        { target: 99, duration: 1800, element: statElements[3] }
    ];
    
    const animateValue = (obj, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            obj.element.textContent = value === obj.target ? 
                (end >= 1000 ? (value / 1000).toFixed(1) + 'M' : value + (obj === stats[2] ? '/7' : '%')) : 
                value.toLocaleString();
                
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };
    
    // Start animation when stats section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stats.forEach(stat => {
                    animateValue(stat, 0, stat.target, stat.duration);
                });
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Initialize the application
function initApp() {
    // Add styles
    addStyles();
    
    // Initialize animations
    initAnimations();
    
    // Initialize stats counter
    initStatsCounter();
    
    // Add animation to hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.classList.add('fade-in');
    }
    
    // Add hover effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 7px 14px rgba(0,0,0,0.1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Set main content
    const jumbotron = document.querySelector('.jumbotron');
    if (jumbotron) {
        jumbotron.innerHTML = `
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6 mb-4 mb-lg-0">
                        <h1 class="display-4">Welcome to GovHospitals</h1>
                        <p class="lead">Your trusted healthcare provider for quality medical services.</p>
                        <hr class="my-4">
                        <p>Explore our healthcare services and find the best medical care near you.</p>
                        <div class="d-flex gap-2">
                            <button class="btn btn-primary btn-lg" onclick="window.location.href='hospitals.html'">
                                <i class="bi bi-hospital me-2"></i>Find Hospitals
                            </button>
                            <button class="btn btn-outline-secondary btn-lg" onclick="document.getElementById('about-video').play()">
                                <i class="bi bi-play-circle me-2"></i>Watch Video
                            </button>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="video-container">
                            <video id="about-video" autoplay muted loop playsinline>
                                <source src="videos/hospital-tour.mp4" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                            <div class="video-overlay">
                                <div>
                                    <i class="bi bi-play-circle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                                    <p>Click to play video</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Video autoplay functionality
        const video = document.getElementById('about-video');
        const overlay = document.querySelector('.video-overlay');
        
        if (video && overlay) {
            // Try to autoplay
            const playPromise = video.play();
            
            // Handle autoplay restrictions
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    // If autoplay is prevented, show play button
                    overlay.style.opacity = '1';
                    overlay.style.cursor = 'pointer';
                });
            }
            
            // Toggle play/pause on click
            overlay.addEventListener('click', () => {
                if (video.paused) {
                    video.play();
                    overlay.style.opacity = '0';
                } else {
                    video.pause();
                    overlay.style.opacity = '1';
                }
            });
        }
    }
}

// Initialize the app when the DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Export functions for other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        initApp,
        initAnimations,
        initStatsCounter
    };
}
