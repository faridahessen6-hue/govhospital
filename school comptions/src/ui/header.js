
import { $, createElement, on, delegate } from '../core/dom.js';
// Default header configuration
const defaultHeaderConfig = {
    showLogo: true,
    showNav: true,
    showThemeToggle: true,
    showLanguageToggle: true,
    transparent: false,
    fixed: false
};

/**
 * Creates and initializes the header component
 * @param {HTMLElement} container - The container element where the header will be inserted
 * @param {Object} config - Configuration object
 * @param {string} [config.theme='light'] - Initial theme
 * @param {Function} [config.onThemeChange] - Callback when theme changes
 * @param {Function} [config.onLanguageChange] - Callback when language changes
 * @returns {Object} - Public API methods
 */
export function createHeader(container, config = {}) {
    const mergedConfig = { ...defaultHeaderConfig, ...config };
    let currentTheme = localStorage.getItem('theme') || 'light';
    let currentLanguage = localStorage.getItem('language') || 'en';
    
    // Create header element
    const header = createElement('header', {
        id: 'main-header',
        class: `header ${mergedConfig.transparent ? 'header-transparent' : ''} ${mergedConfig.fixed ? 'fixed-top' : ''}`,
        'data-theme': currentTheme
    });

    // Create header content
    const headerContent = createElement('div', { class: 'container' }, [
        createElement('nav', { class: 'navbar navbar-expand-lg' }, [
            // Logo/Brand
            mergedConfig.showLogo ? createElement('a', { 
                class: 'navbar-brand', 
                href: 'index.html' 
            }, [
                createElement('i', { class: `bi bi-${mergedConfig.logo || 'hospital'} me-2` }),
                document.createTextNode(mergedConfig.title || 'Hospital')
            ]) : null,
            
            // Mobile menu button
            createElement('button', { 
                class: 'navbar-toggler',
                type: 'button',
                'data-bs-toggle': 'collapse',
                'data-bs-target': '#navbarNav',
                'aria-controls': 'navbarNav',
                'aria-expanded': 'false',
                'aria-label': 'Toggle navigation'
            }, [
                createElement('span', { class: 'navbar-toggler-icon' })
            ]),
            
            // Navigation menu
            createElement('div', { 
                id: 'navbarNav',
                class: 'collapse navbar-collapse'
            }, [
                createElement('ul', { class: 'navbar-nav me-auto' }, [
                    createElement('li', { class: 'nav-item' }, [
                        createElement('a', { class: 'nav-link', href: 'hospitals.html' }, 'Hospitals')
                    ]),
                    createElement('li', { class: 'nav-item' }, [
                        createElement('a', { class: 'nav-link', href: 'booking.html' }, 'Book Appointment')
                    ]),
                    createElement('li', { class: 'nav-item' }, [
                        createElement('a', { class: 'nav-link', href: 'contact.html' }, 'Contact')
                    ])
                ]),
                
                // Right-aligned controls
                createElement('div', { class: 'd-flex align-items-center' }, [
                    // Theme toggle
                    mergedConfig.showThemeToggle ? createElement('button', { 
                        class: 'btn btn-link nav-link',
                        'aria-label': 'Toggle theme',
                        'data-theme-toggle': ''
                    }, [
                        createElement('i', { class: `bi bi-${currentTheme === 'dark' ? 'sun' : 'moon'}` })
                    ]) : null,
                    
                    // Language toggle
                    mergedConfig.showLanguageToggle ? createElement('button', { 
                        class: 'btn btn-link nav-link',
                        'aria-label': 'Toggle language',
                        'data-language-toggle': ''
                    }, [
                        document.createTextNode(currentLanguage === 'en' ? 'عربي' : 'EN')
                    ]) : null
                ])
            ])
        ])
    ]);

    // Append content to header
    header.appendChild(headerContent);
    
    // Clear container and append header
    container.innerHTML = '';
    container.appendChild(header);
    
    // Initialize event listeners
    const cleanupFns = [
        // Theme toggle
        delegate(header, '[data-theme-toggle]', 'click', () => {
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
            if (typeof mergedConfig.onThemeChange === 'function') {
                mergedConfig.onThemeChange(newTheme);
            }
        }),
        
        // Language toggle
        delegate(header, '[data-language-toggle]', 'click', () => {
            const newLanguage = currentLanguage === 'en' ? 'ar' : 'en';
            setLanguage(newLanguage);
            if (typeof mergedConfig.onLanguageChange === 'function') {
                mergedConfig.onLanguageChange(newLanguage);
            }
        })
    ];
    
    // Set initial theme and language
    setTheme(currentTheme);
    setLanguage(currentLanguage);
    
    // Public API
    return {
        setTheme,
        setLanguage,
        destroy: () => {
            cleanupFns.forEach(cleanup => cleanup());
            header.remove();
        }
    };
    
    // Helper functions
    function setTheme(theme) {
        currentTheme = theme;
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-bs-theme', theme);
        header.setAttribute('data-theme', theme);
        
        // Update theme toggle icon
        const themeToggle = header.querySelector('[data-theme-toggle] i');
        if (themeToggle) {
            themeToggle.className = `bi bi-${theme === 'dark' ? 'sun' : 'moon'}`;
        }
    }
    
    function setLanguage(lang) {
        currentLanguage = lang;
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        // Update language toggle text
        const langToggle = header.querySelector('[data-language-toggle]');
        if (langToggle) {
            langToggle.textContent = lang === 'en' ? 'عربي' : 'EN';
        }
    }
}

// Initialize header automatically if data-header attribute is present
document.addEventListener('DOMContentLoaded', () => {
    const headerContainers = document.querySelectorAll('[data-header]');
    headerContainers.forEach(container => {
        const config = {
            title: container.dataset.headerTitle,
            logo: container.dataset.headerLogo,
            showLogo: container.dataset.headerShowLogo !== 'false',
            showNav: container.dataset.headerShowNav !== 'false',
            showThemeToggle: container.dataset.headerShowThemeToggle !== 'false',
            showLanguageToggle: container.dataset.headerShowLanguageToggle !== 'false',
            transparent: container.dataset.headerTransparent === 'true',
            fixed: container.dataset.headerFixed === 'true'
        };
        
        createHeader(container, config);
    });
});
