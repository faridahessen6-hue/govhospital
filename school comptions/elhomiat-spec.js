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
        <h5 class="mb-3" style="color: white;">Gov Hospitals</h5>
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
        <h5 class="mb-3" style="color: white;">Newsletter</h5>
        <p style="color: #e9ecef;">Subscribe to our newsletter for health tips and updates.</p>
        <div class="input-group mb-3">
            <input type="email" class="form-control" placeholder="Your Email" aria-label="Your Email">
            <button class="btn btn-primary" type="button">Subscribe</button>
        </div>
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

// Function to create specialty cards with staggered animation
function createSpecialtyCards() {
    const specialties = [
        {
            id: 'elhomiat',
            title: 'Typhoid Fever',
            arTitle: 'الحمى التيفودية',
            icon: 'thermometer-high',
            color: '#e74c3c',
            description: 'Diagnosis and treatment of typhoid fever caused by Salmonella Typhi.',
            url: 'elhomiat-hospital.html?specialty=typhoid-fever'
        },
        {
            id: 'elhomiat',
            title: 'Paratyphoid Fever',
            arTitle: 'الحمى نظيرة التيفودية',
            icon: 'thermometer-sun',
            color: '#e67e22',
            description: 'Management of paratyphoid fever, similar to but milder than typhoid.',
            url: 'elhomiat-hospital.html?specialty=paratyphoid-fever'
        },
        {
            id: 'elhomiat',
            title: 'Malaria',
            arTitle: 'الملاريا',
            icon: 'bug',
            color: '#2ecc71',
            description: 'Treatment and prevention of malaria, a mosquito-borne disease.',
            url: 'elhomiat-hospital.html?specialty=malaria'
        },
        {
            id: 'elhomiat',
            title: 'Dengue Fever',
            arTitle: 'حمى الضنك',
            icon: 'bug-fill',
            color: '#e74c3c',
            description: 'Care for dengue fever, a mosquito-borne tropical disease.',
            url: 'elhomiat-hospital.html?specialty=dengue-fever'
        },
        {
            id: 'elhomiat',
            title: 'Yellow Fever',
            arTitle: 'الحمى الصفراء',
            icon: 'exclamation-triangle',
            color: '#f1c40f',
            description: 'Vaccination and treatment for yellow fever.',
            url: 'elhomiat-hospital.html?specialty=yellow-fever'
        },
        {
            id: 'elhomiat',
            title: 'Scarlet Fever',
            arTitle: 'الحمى القرمزية',
            icon: 'thermometer-high',
            color: '#e74c3c',
            description: 'Treatment for streptococcal infection causing rash and fever.',
            url: 'elhomiat-hospital.html?specialty=scarlet-fever'
        },
        {
            id: 'elhomiat',
            title: 'Rheumatic Fever',
            arTitle: 'الحمى الروماتيزمية',
            icon: 'heart-pulse',
            color: '#e74c3c',
            description: 'Management of rheumatic fever and prevention of complications.',
            url: 'elhomiat-hospital.html?specialty=rheumatic-fever'
        },
        {
            id: 'elhomiat',
            title: 'Q Fever',
            arTitle: 'حمى كيو',
            icon: 'thermometer-high',
            color: '#8e44ad',
            description: 'Treatment for Q fever, a bacterial infection from animals.',
            url: 'elhomiat-hospital.html?specialty=q-fever'
        },
        {
            id: 'elhomiat',
            title: 'Rocky Mountain Spotted Fever',
            arTitle: 'حمى الجبال الصخرية المبقعة',
            icon: 'mountain',
            color: '#c0392b',
            description: 'Treatment for this tick-borne bacterial disease.',
            url: 'elhomiat-hospital.html?specialty=rocky-mountain-fever'
        },
        {
            id: 'elhomiat',
            title: 'Lassa Fever',
            arTitle: 'حمى لاسا',
            icon: 'virus',
            color: '#7f8c8d',
            description: 'Care for Lassa fever, an acute viral illness.',
            url: 'elhomiat-hospital.html?specialty=lassa-fever'
        },
        {
            id: 'elhomiat',
            title: 'Ebola Virus Disease',
            arTitle: 'مرض فيروس إيبولا',
            icon: 'virus2',
            color: '#2c3e50',
            description: 'Specialized care for Ebola virus disease.',
            url: 'elhomiat-hospital.html?specialty=ebola'
        },
        {
            id: 'elhomiat',
            title: 'Marburg Virus Disease',
            arTitle: 'مرض فيروس ماربورغ',
            icon: 'virus',
            color: '#2c3e50',
            description: 'Treatment for Marburg virus disease, a severe hemorrhagic fever.',
            url: 'elhomiat-hospital.html?specialty=marburg'
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
