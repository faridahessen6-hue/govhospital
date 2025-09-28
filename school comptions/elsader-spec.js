// Function to create header (similar to hospitals.js)
function createHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    const nav = document.createElement('nav');
    nav.className = 'navbar navbar-expand-lg navbar-dark';
    nav.style.backgroundColor = '#003366';
    
    const container = document.createElement('div');
    container.className = 'container-fluid';

    // Brand
    const brandLink = document.createElement('a');
    brandLink.className = 'navbar-brand';
    brandLink.href = 'home.html';
    brandLink.innerHTML = '<i class="bi bi-hospital me-2"></i>El3am Hospitals';
    
    // Toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'navbar-toggler';
    toggleButton.type = 'button';
    toggleButton.setAttribute('data-bs-toggle', 'collapse');
    toggleButton.setAttribute('data-bs-target', '#navbarNav');
    toggleButton.innerHTML = '<span class="navbar-toggler-icon"></span>';
    
    // Nav items
    const navItems = [
        { text: 'Home', href: 'home.html', icon: 'house' },
        { text: 'Hospitals', href: 'hospitals.html', icon: 'hospital' },
      
    ];
    
    const navCollapse = document.createElement('div');
    navCollapse.className = 'collapse navbar-collapse';
    navCollapse.id = 'navbarNav';
    
    const navList = document.createElement('div');
    navList.className = 'navbar-nav me-auto';
    
    navItems.forEach(item => {
        const navItem = document.createElement('a');
        navItem.className = `nav-link ${window.location.pathname.endsWith(item.href) ? 'active' : ''}`;
        navItem.href = item.href;
        navItem.innerHTML = `<i class="bi bi-${item.icon} me-1"></i> ${item.text}`;
        navList.appendChild(navItem);
    });
    
    // Login button
    const loginButton = document.createElement('a');
    loginButton.href = 'login.html';
    loginButton.className = 'btn btn-outline-light ms-lg-3';
    loginButton.innerHTML = '<i class="bi bi-box-arrow-in-right me-1"></i> Login';
    
    // Assemble navbar
    navCollapse.appendChild(navList);
    container.appendChild(brandLink);
    container.appendChild(toggleButton);
    container.appendChild(navCollapse);
    container.appendChild(loginButton);
    nav.appendChild(container);
    header.appendChild(nav);
}

// Function to handle Learn More button click
function handleLearnMoreClick(hospitalId, specialty) {
    // Store the specialty in sessionStorage to be used in the hospital page
    sessionStorage.setItem('selectedSpecialty', specialty);
    // Navigate to the hospital page with the hospital ID and specialty
    window.location.href = `hospital-template.html?hospital=${hospitalId}&specialty=${encodeURIComponent(specialty)}`;
}

// Function to create specialty cards with staggered animation
function createSpecialtyCards() {
    const specialties = [
        {
            id: 'elsader',
            title: 'Asthma',
            arTitle: 'الربو',
            icon: 'wind',
            color: '#3498db',
            description: 'Comprehensive diagnosis and treatment for asthma and respiratory conditions.',
            url: 'elsader-hospital.html?specialty=asthma'
        },
        {
            id: 'elsader',
            title: 'COPD',
            arTitle: 'مرض الانسداد الرئوي المزمن',
            icon: 'lungs',
            color: '#2ecc71',
            description: 'Management and treatment of chronic obstructive pulmonary disease.',
            url: 'elsader-hospital.html?specialty=copd'
        },
        {
            id: 'elsader',
            title: 'Pneumonia',
            arTitle: 'الالتهاب الرئوي',
            icon: 'virus',
            color: '#e74c3c',
            description: 'Diagnosis and treatment of pneumonia and lung infections.',
            url: 'elsader-hospital.html?specialty=pneumonia'
        },
        {
            id: 'elsader',
            title: 'Tuberculosis',
            arTitle: 'السل',
            icon: 'bacteria',
            color: '#9b59b6',
            description: 'Specialized care for tuberculosis and related conditions.',
            url: 'elsader-hospital.html?specialty=tuberculosis'
        },
        {
            id: 'elsader',
            title: 'Bronchitis',
            arTitle: 'التهاب الشعب الهوائية',
            icon: 'wind',
            color: '#1abc9c',
            description: 'Treatment for acute and chronic bronchitis.',
            url: 'elsader-hospital.html?specialty=bronchitis'
        },
        {
            id: 'elsader',
            title: 'Emphysema',
            arTitle: 'النفاخ الرئوي',
            icon: 'lungs',
            color: '#f39c12',
            description: 'Management of emphysema and related lung conditions.',
            url: 'elsader-hospital.html?specialty=emphysema'
        },
        {
            id: 'elsader',
            title: 'Lung Cancer',
            arTitle: 'سرطان الرئة',
            icon: 'activity',
            color: '#e74c3c',
            description: 'Comprehensive care for lung cancer patients.',
            url: 'elsader-hospital.html?specialty=lung-cancer'
        },
        {
            id: 'elsader',
            title: 'Pulmonary Fibrosis',
            arTitle: 'التليف الرئوي',
            icon: 'lungs',
            color: '#2c3e50',
            description: 'Specialized treatment for pulmonary fibrosis.',
            url: 'elsader-hospital.html?specialty=pulmonary-fibrosis'
        },
        {
            id: 'elsader',
            title: 'Pulmonary Embolism',
            arTitle: 'الانصمام الرئوي',
            icon: 'activity',
            color: '#c0392b',
            description: 'Emergency and follow-up care for pulmonary embolism.',
            url: 'elsader-hospital.html?specialty=pulmonary-embolism'
        },
        {
            id: 'elsader',
            title: 'Pleural Effusion',
            arTitle: 'الارتشاح الجنبي',
            icon: 'droplet',
            color: '#3498db',
            description: 'Treatment for fluid accumulation around the lungs.',
            url: 'elsader-hospital.html?specialty=pleural-effusion'
        },
        {
            id: 'elsader',
            title: 'ILD',
            arTitle: 'أمراض الرئة الخلالية',
            icon: 'lungs',
            color: '#8e44ad',
            description: 'Management of interstitial lung diseases.',
            url: 'elsader-hospital.html?specialty=ild'
        },
        {
            id: 'elsader',
            title: 'Respiratory Failure',
            arTitle: 'فشل تنفسي',
            icon: 'activity',
            color: '#e67e22',
            description: 'Critical care for acute and chronic respiratory failure.',
            url: 'elsader-hospital.html?specialty=respiratory-failure'
        }
    ];

    const container = document.getElementById('specialtiesGrid');
    if (!container) return;

    // Clear any existing content
    container.innerHTML = '';

    // Add CSS for the animation
    const style = document.createElement('style');
    style.textContent = `
        .specialty-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .specialty-card.visible {
            opacity: 1;
            transform: translateY(0);
        }
        .specialty-card:hover {
            transform: translateY(-5px) !important;
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
    `;
    document.head.appendChild(style);

    // Create and append cards with staggered animation
    specialties.forEach((specialty, index) => {
        const col = document.createElement('div');
        col.className = 'col-12 col-md-6 col-lg-4 col-xl-3 mb-4';
        
        const card = document.createElement('a');
        card.href = specialty.url;
        card.className = 'card h-100 specialty-card text-decoration-none text-dark';
        card.style.borderLeft = `4px solid ${specialty.color}`;
        card.style.transition = 'transform 0.2s, box-shadow 0.2s';
        card.style.cursor = 'pointer';
        
        // Add hover effect
        card.onmouseover = () => card.style.transform = 'translateY(-5px)';
        card.onmouseout = () => card.style.transform = 'translateY(0)';
        
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        cardBody.innerHTML = `
            <div class="d-flex align-items-center mb-3">
                <div class="rounded-circle p-3 me-3" style="background-color: ${specialty.color}20;">
                    <i class="bi bi-${specialty.icon}" style="color: ${specialty.color}; font-size: 1.5rem;"></i>
                </div>
                <h5 class="card-title mb-0">${specialty.title} <small class="text-muted d-block">${specialty.arTitle}</small></h5>
            </div>
            <p class="card-text">${specialty.description}</p>
            <div class="text-primary mt-2">Learn more <i class="bi bi-arrow-right"></i></div>
        `;
        
        card.appendChild(cardBody);
        col.appendChild(card);
        container.appendChild(col);
        
        // Add staggered animation
        setTimeout(() => {
            card.classList.add('visible');
        }, 100 * index);
    });
}

// Function to setup patient consultation search
function setupPatientConsultation() {
    const searchBtn = document.getElementById('searchConsultation');
    const bookBtn = document.getElementById('bookAppointment');
    const patientIdInput = document.getElementById('patientId');
    
    if (searchBtn && patientIdInput) {
        searchBtn.addEventListener('click', () => {
            const patientId = patientIdInput.value.trim();
            if (patientId) {
                // Store patient ID in session storage
                sessionStorage.setItem('patientId', patientId);
                // Navigate to consultation page
                window.location.href = `consultation.html?patientId=${encodeURIComponent(patientId)}`;
            } else {
                alert('Please enter a valid Patient ID');
            }
        });
        
        // Allow search on Enter key
        patientIdInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }
    
    if (bookBtn) {
        bookBtn.addEventListener('click', () => {
            window.location.href = 'book-appointment.html';
        });
    }
}

// Function to create footer with patient consultation search
function createFooter() {
    const footer = document.getElementById('footer');
    if (!footer) return;
    
    footer.style.backgroundColor = '#003366';
    footer.className = 'py-4 mt-auto';
    
    const container = document.createElement('div');
    container.className = 'container';
    
    const row = document.createElement('div');
    row.className = 'row';
    
    // Hospital Info Column
    const infoCol = document.createElement('div');
    infoCol.className = 'col-md-4 mb-4 mb-md-0';
    infoCol.innerHTML = `
        <h5 class="mb-3" style="color: white;">GovHospitals</h5>
        <p class="mb-2" style="color: #e9ecef;"><i class="bi bi-geo-alt-fill me-2"></i> 123 Medical Street, Health District</p>
        <p class="mb-2" style="color: #e9ecef;"><i class="bi bi-telephone-fill me-2"></i> +20 123 456 7890</p>
        <p class="mb-0" style="color: #e9ecef;"><i class="bi bi-envelope-fill me-2"></i> info@el3amhospitals.com</p>
    `;
    
    // Quick Links Column
    const linksCol = document.createElement('div');
    linksCol.className = 'col-md-4 mb-4 mb-md-0';
    linksCol.innerHTML = `
        <h5 class="mb-3" style="color: white;">Quick Links</h5>
        <ul class="list-unstyled">
            <li class="mb-2"><a href="home.html" class="text-white text-decoration-none">Home</a></li>
            <li class="mb-2"><a href="hospitals.html" class="text-white text-decoration-none">Our Hospitals</a></li>
            <li class="mb-2"><a href="spec-el3am.html" class="text-white text-decoration-none">Specialties</a></li>
            <li class="mb-2"><a href="contact.html" class="text-white text-decoration-none">Contact Us</a></li>
            <li><a href="review.html" class="text-white text-decoration-none">Patient Reviews</a></li>
        </ul>
    `;
    
    // Patient Consultation Column
    const contactCol = document.createElement('div');
    contactCol.className = 'col-md-4';
    contactCol.innerHTML = `
        <h5 class="mb-3" style="color: white;">Patient Consultation</h5>
        <p style="color: #e9ecef;">Search for your consultation or book a new appointment.</p>
        <div class="search-container mb-3">
            <div class="input-group">
                <input type="text" id="patientId" class="form-control" placeholder="Enter Patient ID" aria-label="Patient ID">
                <button class="btn btn-primary" type="button" id="searchConsultation">
                    <i class="bi bi-search"></i>
                </button>
            </div>
            <div class="d-grid gap-2 mt-3">
                <button class="btn btn-outline-light" type="button" id="bookAppointment">
                    <i class="bi bi-calendar-plus me-2"></i>Book New Appointment
                </button>
            </div>
        </div>
        <style>
            #searchConsultation {
                min-width: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .search-container {
                background-color: rgba(255, 255, 255, 0.05);
                padding: 15px;
                border-radius: 8px;
            }
        </style>
    `;
    
    // Copyright Row
    const copyrightRow = document.createElement('div');
    copyrightRow.className = 'row mt-4 pt-3 border-top';
    copyrightRow.style.borderTopColor = 'rgba(255, 255, 255, 0.1)';
    copyrightRow.innerHTML = `
        <div class="col-12 text-center">
            <p class="mb-0" style="color: #adb5bd;">&copy; ${new Date().getFullYear()} El3am Hospitals. All rights reserved.</p>
        </div>
    `;
    
    // Assemble footer
    row.appendChild(infoCol);
    row.appendChild(linksCol);
    row.appendChild(contactCol);
    container.appendChild(row);
    container.appendChild(copyrightRow);
    footer.appendChild(container);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
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
        createSpecialtyCards();
        setTimeout(setupPatientConsultation, 100);
    });
});
