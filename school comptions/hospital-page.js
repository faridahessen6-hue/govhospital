// Shared functionality for all hospital pages

// Imports of shared utilities
import { applyTheme } from './src/ui/theme.js';
import { showLoading } from './src/ui/loading.js';
import { ageGroups } from './src/data/age-groups.js';
import { createHeader } from './src/ui/header.js';
import { createFooter } from './src/ui/footer.js';

// Default configuration
const defaultConfig = {
    name: 'Hospital',
    nameAr: 'مستشفى',
    description: 'Healthcare Services',
    descriptionAr: 'خدمات الرعاية الصحية',
    primaryColor: '#1a5f7a', // Updated to match unified theme
    secondaryColor: '#57c5b6',
    accentColor: '#159895',
    icon: 'hospital',
    logo: 'bi-hospital',
    phone: '',
    address: ''
};

// Specialty mapping
const specialtyMapping = {
    // El Ramad Hospital Specialties
    'cardiology': { name: 'Cardiology', arName: 'أمراض القلب', icon: 'heart-pulse', color: '#e74c3c' },
    'conjunctivitis': { name: 'Conjunctivitis', arName: 'التهاب الملتحمة', icon: 'eye', color: '#3498db' },
    'keratitis': { name: 'Keratitis', arName: 'التهاب القرنية', icon: 'eye', color: '#2ecc71' },
    'blepharitis': { name: 'Blepharitis', arName: 'التهاب جفن العين', icon: 'eye', color: '#9b59b6' },
    'stye': { name: 'Stye', arName: 'شعيرة العين', icon: 'eye', color: '#1abc9c' },
    'dry-eye': { name: 'Dry Eye', arName: 'جفاف العين', icon: 'eye', color: '#f39c12' },
    'cataracts': { name: 'Cataracts', arName: 'المياه البيضاء', icon: 'eye', color: '#e74c3c' },
    'glaucoma': { name: 'Glaucoma', arName: 'الجلوكوما', icon: 'eye', color: '#2c3e50' },
    'retinal-diseases': { name: 'Retinal Diseases', arName: 'أمراض الشبكية', icon: 'eye', color: '#c0392b' },
    'refractive-errors': { name: 'Refractive Errors', arName: 'عيوب الانكسار', icon: 'eye', color: '#3498db' },
    
    // El Kebd Hospital Specialties
    'hepatitis': { name: 'Hepatitis', arName: 'التهاب الكبد', icon: 'activity', color: '#0d6efd' },
    'cirrhosis': { name: 'Cirrhosis', arName: 'تليف الكبد', icon: 'heart-pulse', color: '#6610f2' },
    'fatty-liver': { name: 'Fatty Liver', arName: 'الكبد الدهني', icon: 'droplet', color: '#198754' },
    'liver-cancer': { name: 'Liver Cancer', arName: 'سرطان الكبد', icon: 'activity', color: '#dc3545' },
    'liver-failure': { name: 'Liver Failure', arName: 'فشل الكبد', icon: 'heart-pulse', color: '#fd7e14' },
    
    // Add more specialties as needed
};

// Get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Initialize the hospital page
function initHospitalPage(config = {}) {
    try {
        showLoading(true);
        
        // Merge with default config
        const pageConfig = { ...defaultConfig, ...config };
        
        // Apply theme
        applyTheme(pageConfig);
        
        // Get app container
        const app = document.getElementById('app');
        if (!app) {
            throw new Error('App container not found');
        }
        
        // Clear existing content
        app.innerHTML = '';
        
        // Create header container (will be populated by header.js)
        const header = document.createElement('header');
        header.id = 'header';
        app.appendChild(header);
        
        // Create main content
        const main = document.createElement('main');
        main.className = 'container py-4';
        
        // Add page title
        const pageTitle = document.createElement('h1');
        pageTitle.className = 'text-center mb-4';
        
        // Check for specialty parameter
        const specialtyParam = getUrlParameter('specialty');
        if (specialtyParam && specialtyMapping[specialtyParam]) {
            const specialty = specialtyMapping[specialtyParam];
            pageTitle.innerHTML = `
                <div class="d-flex align-items-center justify-content-center">
                    <div class="me-3" style="color: ${specialty.color};">
                        <i class="bi bi-${specialty.icon}" style="font-size: 2rem;"></i>
                    </div>
                    <div>
                        <div>${specialty.name}</div>
                        <div class="text-muted small">${specialty.arName}</div>
                    </div>
                </div>
                <div class="mt-2 text-muted">${pageConfig.name}</div>
            `;
        } else {
            pageTitle.textContent = pageConfig.name;
        }
        
        main.appendChild(pageTitle);
        
        // Add specialty description if available
        if (specialtyParam && specialtyMapping[specialtyParam]) {
            const specialty = specialtyMapping[specialtyParam];
            const specialtyDesc = document.createElement('div');
            specialtyDesc.className = 'alert alert-info';
            specialtyDesc.innerHTML = `
                <h5>About ${specialty.name} Services</h5>
                <p>Our ${specialty.name} department provides comprehensive care and treatment for all related conditions. 
                Our team of specialists is dedicated to delivering the highest quality of care using the latest medical advancements.</p>
                <p>Please select an age group below to proceed with booking an appointment.</p>
            `;
            main.appendChild(specialtyDesc);
        }
        
        // Add age group selection
        const ageGroupSection = createAgeGroupSelection();
        main.appendChild(ageGroupSection);
        
        // Add main content to app
        app.appendChild(main);
        
        // Create footer container (will be populated by footer.js)
        const footer = document.createElement('footer');
        footer.id = 'footer';
        app.appendChild(footer);
        
        // Mount shared header and footer directly (guards prevent duplicates)
        createHeader(header, {
            title: pageConfig.name,
            logo: pageConfig.logo,
            onThemeChange: (theme) => {
                document.documentElement.setAttribute('data-bs-theme', theme);
                localStorage.setItem('theme', theme);
            },
            onLanguageChange: (lang) => {
                document.documentElement.lang = lang;
                document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
                localStorage.setItem('language', lang);
                // In a real app, you would update the UI text based on language
            }
        });
        createFooter();
        
        // Update header with hospital info if needed
        const headerTitle = document.querySelector('.navbar-brand');
        if (headerTitle) {
            headerTitle.innerHTML = `
                <i class="bi ${pageConfig.logo} me-2"></i>
                ${pageConfig.name}
            `;
        }
        
        // Hide loading when everything is ready
        showLoading(false);
        
    } catch (error) {
        console.error('Error initializing hospital page:', error);
        showLoading(false);
        
        const app = document.getElementById('app');
        if (app) {
            app.innerHTML = `
                <div class="container mt-5">
                    <div class="alert alert-danger">
                        <h4 class="alert-heading">Error</h4>
                        <p>Failed to load the hospital page. Please try again later.</p>
                        <hr>
                        <p class="mb-0">${error.message || 'Unknown error'}</p>
                    </div>
                </div>
            `;
        }
    }
}

// Create age group selection
function createAgeGroupSelection() {
    const section = document.createElement('section');
    section.className = 'age-selection';
    
    const container = document.createElement('div');
    container.className = 'row g-4 justify-content-center';
    
    ageGroups.forEach(group => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-3';
        
        const card = document.createElement('div');
        card.className = 'card h-100 border-0 shadow-sm';
        card.style.cursor = 'pointer';
        card.onclick = () => selectAgeGroup(group.id);
        
        card.innerHTML = `
            <div class="card-body text-center p-4">
                <i class="bi bi-${group.icon} display-4 mb-3" style="color: var(--primary-color);"></i>
                <h3 class="h5 mb-2">${group.name}</h3>
                <p class="text-muted mb-0">${group.range} years</p>
                <div class="mt-3">
                    <span class="btn btn-sm btn-outline-primary">Select <i class="bi bi-arrow-right ms-1"></i></span>
                </div>
            </div>
        `;
        
        col.appendChild(card);
        container.appendChild(col);
    });
    
    section.appendChild(container);
    return section;
}

// Make the function globally available
function selectAgeGroup(groupId) {
    const group = ageGroups.find(g => g.id === groupId);
    if (group) {
        window.location.href = group.link;
    }
}

export { initHospitalPage, selectAgeGroup };
