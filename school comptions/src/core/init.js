import { createHeader } from '../ui/header.js';
import { createFooter } from '../ui/footer.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize header
    const headerContainer = document.getElementById('main-header');
    if (headerContainer) {
        createHeader(headerContainer, {
            title: 'Hospital System',
            logo: 'hospital',
            showThemeToggle: true,
            showLanguageToggle: true
        });
    }

    // Initialize footer
    const footerContainer = document.getElementById('main-footer');
    if (footerContainer) {
        createFooter(footerContainer, {
            year: new Date().getFullYear(),
            company: 'Hospital System'
        });
    }
});

// Export for tree-shaking
export { createHeader, createFooter };
