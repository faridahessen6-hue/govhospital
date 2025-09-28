// Add styles function
function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Base styles */
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            margin: 0;
            padding: 0;
            color: #333;
        }
        
        #app {
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        
        /* Header styles */
        .navbar {
            background-color: #003366 !important;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            padding: 0.8rem 0;
        }
        
        .navbar-brand {
            font-weight: 600;
            font-size: 1.4rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .nav-link {
            color: rgba(255,255,255,0.9) !important;
            padding: 0.5rem 1rem !important;
            border-radius: 4px;
            margin: 0 0.2rem;
            transition: all 0.2s ease;
            font-weight: 500;
        }
        
        .nav-link:hover, .nav-link:focus {
            color: white !important;
            background-color: rgba(255,255,255,0.15) !important;
        }
        
        .nav-link.active {
            font-weight: 600;
            background-color: rgba(255,255,255,0.2) !important;
        }
        
        /* Footer styles */
        footer {
            background-color: #003366;
            color: white;
            padding: 2.5rem 0 1.5rem;
            margin-top: auto;
        }
        
        footer h5 {
            color: white;
            font-weight: 600;
            margin-bottom: 1.2rem;
            position: relative;
            padding-bottom: 0.5rem;
        }
        
        footer h5::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 50px;
            height: 2px;
            background-color: #4dabf7;
        }
        
        footer a {
            color: rgba(255, 255, 255, 0.8);
            text-decoration: none;
            transition: all 0.2s ease;
        }
        
        footer a:hover {
            color: white;
            text-decoration: none;
            padding-right: 5px;
        }
        
        footer .bi {
            margin-left: 0.5rem;
        }
        
        .footer-links {
            list-style: none;
            padding: 0;
        }
        
        .footer-links li {
            margin-bottom: 0.7rem;
        }
        
        .footer-contact p {
            margin-bottom: 0.5rem;
            display: flex;
            align-items: flex-start;
            gap: 0.5rem;
        }
        
        .footer-contact .bi {
            margin-top: 0.2rem;
        }
        
        .footer-bottom {
            margin-top: 2rem;
            padding-top: 1.5rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            text-align: center;
            font-size: 0.9rem;
            color: rgba(255, 255, 255, 0.6);
        }
        
        /* Main content styles */
        main {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem 0;
            background-color: #f8f9fa;
        }
        
        #loadingTitle {
            text-align: center;
            transition: opacity 0.5s;
            width: 100%;
        }
        
        #titleText {
            font-size: 2.5rem;
            font-weight: 700;
            line-height: 1.4;
            margin: 1rem 0;
            min-height: 4rem;
            color: #003366;
        }
        
        .card {
            transition: all 0.3s ease;
            border: none;
            border-radius: 10px;
            overflow: hidden;
            height: 100%;
            box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
            border: 1px solid rgba(0, 0, 0, 0.05);
        }
        
        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
        }
        
        .card-body {
            padding: 1.8rem 1.5rem;
            text-align: center;
        }
        
        .card i {
            font-size: 2.5rem;
            color: #0d6efd;
            margin-bottom: 1rem;
        }
        
        .card h3 {
            color: #003366;
            font-size: 1.3rem;
            margin-bottom: 0.5rem;
        }
        
        .card p {
            color: #6c757d;
            margin-bottom: 0;
        }
    `;
    document.head.appendChild(style);
}

// Create header function
function createHeader() {
    const header = document.createElement('header');
    header.id = 'header';
    document.body.insertBefore(header, document.body.firstChild);
    
    const nav = document.createElement('nav');
    nav.className = 'navbar navbar-expand-lg navbar-dark';
    
    const container = document.createElement('div');
    container.className = 'container';

    // Brand
    const brandLink = document.createElement('a');
    brandLink.className = 'navbar-brand';
    brandLink.href = 'home.html';
    brandLink.innerHTML = '<i class="bi bi-hospital"></i> GovHospitals';
    
    // Toggle button for mobile
    const toggleButton = document.createElement('button');
    toggleButton.className = 'navbar-toggler';
    toggleButton.type = 'button';
    toggleButton.setAttribute('data-bs-toggle', 'collapse');
    toggleButton.setAttribute('data-bs-target', '#navbarNav');
    toggleButton.setAttribute('aria-controls', 'navbarNav');
    toggleButton.setAttribute('aria-expanded', 'false');
    toggleButton.setAttribute('aria-label', 'Toggle navigation');
    toggleButton.innerHTML = '<span class="navbar-toggler-icon"></span>';

    // Navbar content
    const navbarCollapse = document.createElement('div');
    navbarCollapse.className = 'collapse navbar-collapse';
    navbarCollapse.id = 'navbarNav';
    
    const navList = document.createElement('ul');
    navList.className = 'navbar-nav me-auto mb-2 mb-lg-0';
    
    // Navigation items
    const navItems = [
        { text: 'Home', href: 'home.html', icon: 'house' },
        { text: 'Hospitals', href: 'hospitals.html', icon: 'hospital' },
        { text: "ask", href: 'ask-a-question.html', icon: 'question' },
        { text: 'About', href: 'about.html', icon: 'info-circle' },
        { text: 'Contact', href: 'contact.html', icon: 'envelope' }
    ];
    
    navItems.forEach(item => {
        const li = document.createElement('li');
        li.className = 'nav-item';
        
        const a = document.createElement('a');
        a.className = 'nav-link';
        if (window.location.pathname.endsWith(item.href)) {
            a.classList.add('active');
            a.setAttribute('aria-current', 'page');
        }
        a.href = item.href;
        a.innerHTML = `<i class="bi bi-${item.icon} me-1"></i> ${item.text}`;
        
        li.appendChild(a);
        navList.appendChild(li);
    });
    
    // Add auth buttons
    const authButtons = document.createElement('div');
    authButtons.className = 'd-flex gap-2';
    
    const loginBtn = document.createElement('a');
    loginBtn.href = 'login.html';
    loginBtn.className = 'btn btn-outline-light';
    loginBtn.innerHTML = '<i class="bi bi-box-arrow-in-right me-1"></i> Login';
    
    const signupBtn = document.createElement('a');
    signupBtn.href = 'sign.html';
    signupBtn.className = 'btn btn-light';
    signupBtn.innerHTML = '<i class="bi bi-person-plus me-1"></i> Sign Up';
    
    authButtons.appendChild(loginBtn);
    authButtons.appendChild(signupBtn);
    
    // Assemble the navbar
    navbarCollapse.appendChild(navList);
    navbarCollapse.appendChild(authButtons);
    
    container.appendChild(brandLink);
    container.appendChild(toggleButton);
    container.appendChild(navbarCollapse);
    
    nav.appendChild(container);
    header.appendChild(nav);
}

// Create footer function
function createFooter() {
    const footer = document.createElement('footer');
    footer.id = 'footer';
    document.body.appendChild(footer);
    
    const container = document.createElement('div');
    container.className = 'container';
    
    const row = document.createElement('div');
    row.className = 'row g-4';
    
    // About section
    const aboutCol = document.createElement('div');
    aboutCol.className = 'col-md-6 col-lg-4';
    aboutCol.innerHTML = `
        <h5>About Us</h5>
        <p>Providing quality healthcare services with expert medical professionals. Our mission is to make healthcare accessible to everyone.</p>
        <div class="mt-3">
            <a href="#" class="me-2"><i class="bi bi-facebook"></i></a>
            <a href="#" class="me-2"><i class="bi bi-twitter"></i></a>
            <a href="#" class="me-2"><i class="bi bi-instagram"></i></a>
            <a href="#" class="me-2"><i class="bi bi-linkedin"></i></a>
        </div>
    `;
    
    // Quick Links
    const linksCol = document.createElement('div');
    linksCol.className = 'col-md-6 col-lg-2';
    linksCol.innerHTML = `
        <h5>Quick Links</h5>
        <ul class="footer-links">
            <li><a href="home.html"><i class="bi bi-chevron-left"></i> Home</a></li>
            <li><a href="hospitals.html"><i class="bi bi-chevron-left"></i> Hospitals</a></li>
            <li><a href="spec-el3am.html"><i class="bi bi-chevron-left"></i> Specialties</a></li>
            <li><a href="about.html"><i class="bi bi-chevron-left"></i> About Us</a></li>
            <li><a href="contact.html"><i class="bi bi-chevron-left"></i> Contact</a></li>
        </ul>
    `;
    
    // Transport
    const transportCol = document.createElement('div');
    transportCol.className = 'col-md-6 col-lg-3';
    transportCol.innerHTML = `
        <h5>Transport</h5>
        <ul class="footer-links">
            <li><a href="#"><i class="bi bi-bus-front"></i> Public Transport</a></li>
            <li><a href="#"><i class="bi bi-ambulance"></i> Ambulance Services</a></li>
        
        </ul>
    `;
    
    // Contact Info
    const contactCol = document.createElement('div');
    contactCol.className = 'col-md-6 col-lg-3';
    contactCol.innerHTML = `
        <h5>Contact Info</h5>
        <div class="footer-contact">
            <p><i class="bi bi-geo-alt"></i> 123 Medical Center, Cairo, Egypt</p>
            <p><i class="bi bi-telephone"></i> +20 123 456 7890</p>
            <p><i class="bi bi-envelope"></i> info@govhospitals.eg</p>
            <p><i class="bi bi-clock"></i> 24/7 Emergency Services</p>
        </div>
    `;
    
    // Assemble the footer
    row.appendChild(aboutCol);
    row.appendChild(linksCol);
    row.appendChild(transportCol);
    row.appendChild(contactCol);
    
    container.appendChild(row);
    
    // Footer bottom
    const footerBottom = document.createElement('div');
    footerBottom.className = 'footer-bottom';
    footerBottom.innerHTML = `
        <div class="container">
            <div class="row">
                <div class="col-12 text-center">
                    <p class="mb-0">&copy; ${new Date().getFullYear()} GovHospitals. All Rights Reserved.</p>
                </div>
            </div>
        </div>
    `;
    
    footer.appendChild(container);
    footer.appendChild(footerBottom);
}

// Type text with a typing effect
function typeText(element, text, speed, callback) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    
    type();
}

// Create specialty cards
function createSpecialtyCards() {
    const specialties = [
        { 
            name: 'Cardiology', 
            nameAr: 'أمراض القلب', 
            icon: 'heart-pulse',
            url: 'al3am-hospital.html?specialty=cardiology'
        },
        { 
            name: 'Neurology', 
            nameAr: 'طب الأعصاب', 
            icon: 'brain',
            url: 'al3am-hospital.html?specialty=neurology'
        },
        { 
            name: 'Orthopedics', 
            nameAr: 'جراحة العظام', 
            icon: 'bone',
            url: 'al3am-hospital.html?specialty=orthopedics'
        },
        { 
            name: 'Pediatrics', 
            nameAr: 'طب الأطفال', 
            icon: 'baby',
            url: 'al3am-hospital.html?specialty=pediatrics'
        },
        { 
            name: 'Dermatology', 
            nameAr: 'الأمراض الجلدية', 
            icon: 'bandaid',
            url: 'al3am-hospital.html?specialty=dermatology'
        },
        { 
            name: 'Ophthalmology', 
            nameAr: 'طب العيون', 
            icon: 'eye',
            url: 'al3am-hospital.html?specialty=ophthalmology'
        },
        { 
            name: 'ENT', 
            nameAr: 'أنف وأذن وحنجرة', 
            icon: 'ear',
            url: 'al3am-hospital.html?specialty=ent'
        },
        { 
            name: 'Dentistry', 
            nameAr: 'طب الأسنان', 
            icon: 'tooth',
            url: 'al3am-hospital.html?specialty=dentistry'
        },
        { 
            name: 'Gynecology', 
            nameAr: 'طب النساء', 
            icon: 'gender-female',
            url: 'al3am-hospital.html?specialty=gynecology'
        },
        { 
            name: 'Operations', 
            nameAr: 'عمليات', 
            icon: 'scissors',
            url: 'al3am-hospital.html?specialty=operations'
        },
        { 
            name: 'Pharmacy', 
            nameAr: 'صيدلية', 
            icon: 'capsule',
            url: 'al3am-hospital.html?specialty=pharmacy'
        },
        { 
            name: 'Focussed Care', 
            nameAr: 'رعاية مركزة', 
            icon: 'heart-pulse',
            url: 'al3am-hospital.html?specialty=focussed-care'
        },
        { 
            name: 'X-Ray', 
            nameAr: 'أشعة X', 
            icon: 'radioactive',
            url: 'al3am-hospital.html?specialty=xray'
        },
        { 
            name: 'Laboratory', 
            nameAr: 'معمل', 
            icon: 'microscope',
            url: 'al3am-hospital.html?specialty=laboratory'
        }
    ];

    const container = document.getElementById('specialtiesGrid');
    if (!container) return;

    container.innerHTML = specialties.map(specialty => `
        <div class="col-md-6 col-lg-4 col-xl-3 mb-4">
            <a href="${specialty.url}" class="text-decoration-none">
                <div class="card h-100 specialty-card">
                    <div class="card-body">
                        <i class="bi bi-${specialty.icon}"></i>
                        <h3 class="h5">${specialty.name}</h3>
                        <p class="text-muted mb-0">${specialty.nameAr}</p>
                    </div>
                </div>
            </a>
        </div>
    `).join('');
}

// Start the typing animation
function startTypingAnimation() {
    const titleText = document.getElementById('titleText');
    if (!titleText) return;
    
    // Type the title
    typeText(titleText, 'Loading Hospital Specialties/ تخصصات المستشفي...', 50, () => {
        // After typing is complete, hide loading and show content
        const loadingTitle = document.getElementById('loadingTitle');
        const specialtiesContainer = document.getElementById('specialtiesContainer');
        
        if (loadingTitle && specialtiesContainer) {
            loadingTitle.style.opacity = '0';
            setTimeout(() => {
                loadingTitle.style.display = 'none';
                specialtiesContainer.classList.remove('d-none');
            }, 500);
        }
    });
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add styles
    addStyles();

    // Ensure header/footer containers exist under #app (or body)
    const app = document.getElementById('app');
    const root = app || document.body;
    if (!document.getElementById('header')) {
        const header = document.createElement('header');
        header.id = 'header';
        root.insertBefore(header, root.firstChild || null);
    }
    if (!document.getElementById('footer')) {
        const footer = document.createElement('footer');
        footer.id = 'footer';
        root.appendChild(footer);
    }

    // Load shared wrappers to mount header/footer
    const loadWrappers = () => new Promise((resolve) => {
        const hs = document.createElement('script');
        hs.src = 'js/header.js';
        hs.onload = () => {
            const fs = document.createElement('script');
            fs.src = 'js/footer.js';
            fs.onload = resolve;
            document.body.appendChild(fs);
        };
        document.body.appendChild(hs);
    });

    loadWrappers().then(() => {
        // Create specialty cards
        createSpecialtyCards();
        console.log("Spec page initialized with shared header/footer");
        // Start the typing animation after a short delay
        setTimeout(startTypingAnimation, 500);
    });
});
