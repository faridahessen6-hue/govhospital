// Default hospital configuration
const hospitalConfig = {
    name: 'Default Hospital',
    nameAr: 'المستشفى الافتراضي',
    description: 'Comprehensive healthcare services',
    descriptionAr: 'خدمات رعاية صحية شاملة',
    logo: 'bi-hospital',
    primaryColor: '#003366',
    secondaryColor: '#002244',
    phone: '+20 123 456 7890',
    address: '123 Medical Street, Health District',
    addressAr: '123 شارع ميديكال، حي الصحة',
    specialties: [
        'General Medicine',
        'Emergency Care',
        'Pediatrics',
        'Gynecology',
        'Cardiology'
    ],
    services: [
        '24/7 Emergency Services',
        'Laboratory Services',
        'Radiology',
        'Pharmacy',
        'Inpatient Care'
    ]
};

// Initialize the hospital page
function initHospitalPage() {
    // Set page title
    document.title = `${hospitalConfig.name} - GovHospitals`;
    
    // Create header
    const header = document.createElement('header');
    header.className = 'hospital-header py-4';
    header.innerHTML = `
        <div class="container">
            <div class="d-flex align-items-center">
                <i class="bi ${hospitalConfig.logo} me-3" style="font-size: 2.5rem;"></i>
                <div>
                    <h1 class="h2 mb-1">${hospitalConfig.name}</h1>
                    <p class="mb-0">${hospitalConfig.description}</p>
                </div>
            </div>
        </div>
    `;
    
    // Create main content
    const main = document.createElement('main');
    main.className = 'container my-4';
    main.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <div class="card mb-4">
                    <div class="card-body">
                        <h2 class="h4 mb-3">About Us</h2>
                        <p class="card-text">${hospitalConfig.description} (${hospitalConfig.descriptionAr})</p>
                        <p class="card-text">
                            <i class="bi bi-geo-alt-fill me-2"></i> 
                            ${hospitalConfig.address}<br>
                            <small class="text-muted">${hospitalConfig.addressAr}</small>
                        </p>
                        <p class="card-text">
                            <i class="bi bi-telephone-fill me-2"></i> 
                            <a href="tel:${hospitalConfig.phone.replace(/\D/g, '')}" class="text-decoration-none">
                                ${hospitalConfig.phone}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card mb-4">
                    <div class="card-body">
                        <h2 class="h4 mb-3">Our Specialties</h2>
                        <ul class="list-unstyled">
                            ${hospitalConfig.specialties.map(spec => 
                                `<li class="mb-2">
                                    <i class="bi bi-check-circle-fill text-success me-2"></i>
                                    ${spec}
                                </li>`
                            ).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-body">
                <h2 class="h4 mb-3">Our Services</h2>
                <div class="row">
                    ${hospitalConfig.services.map(service => `
                        <div class="col-md-4 mb-3">
                            <div class="d-flex align-items-center">
                                <i class="bi bi-check-circle-fill text-success me-2"></i>
                                <span>${service}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    // Clear and append content
    const app = document.getElementById('app');
    if (app) {
        app.innerHTML = '';
        app.appendChild(header);
        app.appendChild(main);
    }
    
    // Apply theme colors
    document.documentElement.style.setProperty('--primary-color', hospitalConfig.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', hospitalConfig.secondaryColor);
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', initHospitalPage);
