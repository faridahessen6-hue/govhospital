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
    
    // Add event listeners after the element is added to DOM
    setTimeout(() => {
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
    });
}

// Function to create specialty cards with staggered animation
function createSpecialtyCards() {
    const specialties = [
        {
            title: 'Acne',
            arTitle: 'حب الشباب',
            icon: 'emoji-dizzy',
            color: '#e74c3c',
            description: 'Treatment for all types of acne including blackheads, whiteheads, and severe cystic acne.',
            url: 'al3am-hospital.html'  
        },
        {
            title: 'Eczema',
            arTitle: 'الإكزيما',
            icon: 'emoji-frown',
            color: '#3498db',
            description: 'Management of atopic dermatitis and other forms of eczema with advanced therapies.',
            url: 'al3am-hospital.html'  
        },
        {
            title: 'Psoriasis',
            arTitle: 'الصدفية',
            icon: 'circle',
            color: '#9b59b6',
            description: 'Comprehensive care for psoriasis including topical treatments and biologic therapies.',
            url: 'al3am-hospital.html'  
        },
        {
            title: 'Vitiligo',
            arTitle: 'البهاق',
            icon: 'circle-half',
            color: '#2c3e50',
            description: 'Treatment options for vitiligo including phototherapy and surgical techniques.',
            url: 'al3am-hospital.html'  
        },
        {
            title: 'Urticaria',
            arTitle: 'الأرتيكاريا',
            icon: 'cloud-haze',
            color: '#1abc9c',
            description: 'Diagnosis and management of chronic urticaria and hives.',
            url: 'al3am-hospital.html'  
        },
        {
            title: 'Fungal Infections',
            arTitle: 'العدوى الفطرية',
            icon: 'bug',
            color: '#f39c12',
            description: 'Treatment for various fungal infections including ringworm and athlete\'s foot.',
            url: 'al3am-hospital.html'  
        },
        {
            title: 'Bacterial Infections',
            arTitle: 'الالتهابات البكتيرية',
            icon: 'bug-fill',
            color: '#e67e22',
            description: 'Care for bacterial skin infections like impetigo and cellulitis.',
            url: 'al3am-hospital.html'  
        },
        {
            title: 'Viral Infections',
            arTitle: 'الالتهابات الفيروسية',
            icon: 'virus',
            color: '#e74c3c',
            description: 'Treatment for warts, herpes, chickenpox, and other viral skin conditions.',
            url: 'al3am-hospital.html'  
        },
        {
            title: 'Contact Dermatitis',
            arTitle: 'التهاب الجلد التماسي',
            icon: 'hand-index-thumb',
            color: '#3498db',
            description: 'Identification and management of contact allergens and irritants.',
            url: 'al3am-hospital.html'  
        },
        {
            title: 'Rosacea',
            arTitle: 'العد الوردي',
            icon: 'droplet',
            color: '#e84393',
            description: 'Treatment for rosacea including laser therapy and topical medications.',
            url: 'al3am-hospital.html'  
        },
        {
            title: 'Alopecia',
            arTitle: 'الثعلبة',
            icon: 'scissors',
            color: '#2c3e50',
            description: 'Management of hair loss conditions including alopecia areata.',
            url: 'al3am-hospital.html'  
        },
        {
            title: 'Melasma',
            arTitle: 'الكلف',
            icon: 'brightness-high',
            color: '#8e44ad',
            description: 'Treatment for hyperpigmentation and melasma with advanced skin care.',
            url: 'al3am-hospital.html'  
        },
        {
            title: 'Scabies',
            arTitle: 'الجرب',
            icon: 'bug',
            color: '#7f8c8d',
            description: 'Effective treatment for scabies and other parasitic skin infections.',
            url: 'al3am-hospital.html'  
        },
        {
            title: 'Lupus',
            arTitle: 'الذئبة الجلدية',
            icon: 'circle',
            color: '#e74c3c',
            description: 'Management of cutaneous lupus erythematosus and related conditions.',
            url: 'al3am-hospital.html'  
        },
        {
            title: 'Skin Cancer',
            arTitle: 'سرطان الجلد',
            icon: 'activity',
            color: '#2c3e50',
            description: 'Screening, diagnosis, and treatment of various skin cancers.',
            url: 'al3am-hospital.html'  
        }
    ];

    const container = document.getElementById('specialtiesGrid');
    if (!container) return;

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
            box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
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
    });
});
