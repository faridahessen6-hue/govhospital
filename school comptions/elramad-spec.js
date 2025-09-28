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

// Function to create footer (similar to hospitals.js)
function createFooter() {
    const footer = document.getElementById('footer');
    if (!footer) return;
    
    // Ensure the footer has the correct background color
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
    
    // Contact Form Column
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
                background-color: rgba(255, 255, 255, 0.1);
                padding: 15px;
                border-radius: 8px;
            }
        </style>
    `;
    
    // Copyright Row
    const copyrightRow = document.createElement('div');
    copyrightRow.className = 'row mt-4 pt-3 border-top';
    copyrightRow.style.borderTopColor = 'rgba(255, 255, 255, 0.1) !important';
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

// Function to handle Learn More button click
function handleLearnMoreClick(hospitalId, specialty) {
    // Store the specialty in sessionStorage to be used in the hospital page
    sessionStorage.setItem('selectedSpecialty', specialty);
    // Navigate to the hospital page with the hospital ID
    window.location.href = `hospital-template.html?hospital=${hospitalId}&specialty=${encodeURIComponent(specialty)}`;
}

// Function to create specialty cards with smooth fade-in animation
function createSpecialtyCards() {
    const specialties = [
        {
            id: 'elramad',
            title: 'Cardiology',
            arTitle: 'أمراض القلب',
            icon: 'heart-pulse',
            color: '#e74c3c',
            description: 'Comprehensive heart care and treatment for all cardiac conditions.',
            url: 'elramad-hospital.html?specialty=cardiology'
        },
        {
            id: 'elramad',
            title: 'Conjunctivitis',
            arTitle: 'التهاب الملتحمة (الرمد)',
            icon: 'eye',
            color: '#3498db',
            description: 'Treatment for pink eye including bacterial, viral, and allergic conjunctivitis.',
            url: 'elramad-hospital.html?specialty=conjunctivitis'
        },
        {
            id: 'elramad',
            title: 'Keratitis',
            arTitle: 'التهاب القرنية',
            icon: 'eye',
            color: '#2ecc71',
            description: 'Care for corneal inflammation and infections that can affect vision.',
            url: 'elramad-hospital.html?specialty=keratitis'
        },
        {
            id: 'elramad',
            title: 'Blepharitis',
            arTitle: 'التهاب جفن العين',
            icon: 'eye',
            color: '#9b59b6',
            description: 'Management of chronic eyelid inflammation and related conditions.',
            url: 'elramad-hospital.html?specialty=blepharitis'
        },
        {
            id: 'elramad',
            title: 'Stye',
            arTitle: 'دمل الجفن / شعيرة',
            icon: 'eye',
            color: '#1abc9c',
            description: 'Treatment for styes (hordeolum) and chalazion on the eyelid.',
            url: 'elramad-hospital.html?specialty=stye'
        },
        {
            id: 'elramad',
            title: 'Dry Eye Syndrome',
            arTitle: 'جفاف العين',
            icon: 'eye',
            color: '#f39c12',
            description: 'Management of chronic dry eye and related discomfort.',
            url: 'elramad-hospital.html?specialty=dry-eye'
        },
        {
            id: 'elramad',
            title: 'Cataracts',
            arTitle: 'المياه البيضاء',
            icon: 'eye',
            color: '#e74c3c',
            description: 'Diagnosis and surgical treatment of cataracts.',
            url: 'elramad-hospital.html?specialty=cataracts'
        },
        {
            id: 'elramad',
            title: 'Glaucoma',
            arTitle: 'الجلوكوما',
            icon: 'eye',
            color: '#2c3e50',
            description: 'Management and treatment of glaucoma to prevent vision loss.',
            url: 'elramad-hospital.html?specialty=glaucoma'
        },
        {
            id: 'elramad',
            title: 'Retinal Diseases',
            arTitle: 'أمراض الشبكية',
            icon: 'eye',
            color: '#c0392b',
            description: 'Treatment for retinal conditions including diabetic retinopathy and macular degeneration.',
            url: 'elramad-hospital.html?specialty=retinal-diseases'
        },
        {
            id: 'elramad',
            title: 'Refractive Errors',
            arTitle: 'عيوب الانكسار',
            icon: 'eye',
            color: '#3498db',
            description: 'Correction of nearsightedness, farsightedness, and astigmatism.',
            url: 'elramad-hospital.html?specialty=refractive-errors'
        }
    ];

    const container = document.getElementById('specialtiesGrid');
    if (!container) return;

    container.innerHTML = ''; // Clear any existing content

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
        
        const card = document.createElement('div');
        card.className = 'card h-100 specialty-card';
        card.style.borderLeft = `4px solid ${specialty.color}`;
        
        // Create learn more button
        const learnMoreBtn = document.createElement('button');
        learnMoreBtn.className = 'btn btn-outline-primary btn-sm mt-2';
        learnMoreBtn.textContent = 'Learn More';
        learnMoreBtn.onclick = () => handleLearnMoreClick(specialty.id, specialty.title);
        
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
        `;
        
        // Append the button to the card body
        cardBody.appendChild(learnMoreBtn);
        card.appendChild(cardBody);
        col.appendChild(card);
        container.appendChild(col);
        
        // Add staggered animation
        setTimeout(() => {
            card.classList.add('visible');
        }, 100 * index);
    });
}

// Add event listeners for patient consultation
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
                // Navigate to consultation page or show results
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
