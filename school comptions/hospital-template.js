// Template for Hospital Configuration
// Copy this file and update the values for each hospital

// Specialty mapping to match the IDs from spec-el3am.js
const specialtyMapping = {
    'cardiology': 'Cardiology',
    'neurology': 'Neurology',
    'orthopedics': 'Orthopedics',
    'pediatrics': 'Pediatrics',
    'dermatology': 'Dermatology',
    'ophthalmology': 'Ophthalmology',
    'ent': 'ENT',
    'dentistry': 'Dentistry',
    'gynecology': 'Gynecology',
    'operations': 'Operations',
    'pharmacy': 'Pharmacy',
    'emergency': 'Emergency Care',
    'radiology': 'Radiology',
    'laboratory': 'Laboratory'
};

// Get specialty from URL
const urlParams = new URLSearchParams(window.location.search);
const specialtyParam = urlParams.get('specialty');
const currentSpecialty = specialtyMapping[specialtyParam] || '';

const hospitalConfig = {
    // Hospital Information
    name: 'HOSPITAL_NAME',
    nameAr: 'اسم المستشفى',
    description: 'Hospital description in English',
    descriptionAr: 'وصف المستشفى بالعربية',
    specialties: currentSpecialty ? [currentSpecialty] : [], // Add current specialty if any
    
    // Color Scheme
    primaryColor: '#3498db',    // Main color
    secondaryColor: '#2980b9',  // Secondary color for gradients
    accentColor: '#159895',     // Accent color used for active nav/buttons
    
    // Icons (from Bootstrap Icons)
    icon: 'hospital',
    logo: 'bi-hospital',
    
    // Contact Information (optional)
    address: 'Hospital Address',
    phone: '123-456-7890',
    email: 'info@hospital.com'
};

// Initialize the hospital page when DOM is loaded
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

    // Set theme variables BEFORE mounting header/footer so header color matches
    try {
        const cfg = hospitalConfig;
        document.documentElement.style.setProperty('--primary-color', cfg.primaryColor);
        document.documentElement.style.setProperty('--secondary-color', cfg.secondaryColor);
        if (cfg.accentColor) document.documentElement.style.setProperty('--accent-color', cfg.accentColor);
    } catch (e) {
        console.warn('Failed to set theme variables early', e);
    }

    // Dynamically load shared header/footer wrappers (buildless-safe)
    const loadWrappers = () => new Promise((resolve) => {
        const headerScript = document.createElement('script');
        headerScript.src = 'js/header.js';
        headerScript.onload = () => {
            const footerScript = document.createElement('script');
            footerScript.src = 'js/footer.js';
            footerScript.onload = resolve;
            document.body.appendChild(footerScript);
        };
        document.body.appendChild(headerScript);
    });

    // After wrappers load, proceed with template-specific initialization
    loadWrappers().then(() => {
        // Set page title with specialty if available
        document.title = currentSpecialty 
            ? `${currentSpecialty} - ${hospitalConfig.name} - GovHospitals`
            : `${hospitalConfig.name} - GovHospitals`;
        
        // Update UI based on specialty
        if (currentSpecialty) {
            const specialtyTitle = document.getElementById('specialty-title');
            if (specialtyTitle) {
                specialtyTitle.textContent = currentSpecialty;
                specialtyTitle.classList.remove('d-none');
            }
        }
        
        // Check if hospital page is loaded
        if (typeof initHospitalPage === 'function') {
            // Initialize with hospital configuration
            initHospitalPage(hospitalConfig);
        } else {
            console.error('hospital-page.js not loaded');
            // Fallback in case hospital-page.js fails to load
            const app = document.getElementById('app');
            if (app) {
                app.innerHTML = `
                <div class="container my-5">
                    <div class="alert alert-danger">
                        <h4 class="alert-heading">Error Loading Page</h4>
                        <p>There was an error loading the hospital page. Please try again later.</p>
                        ${currentSpecialty ? `<p>Specialty: ${currentSpecialty}</p>` : ''}
                        <hr>
                        <p class="mb-0">${hospitalConfig.name} - ${hospitalConfig.nameAr}</p>
                    </div>
                </div>
            `;
            }
        }
    });
});
