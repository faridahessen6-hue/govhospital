export function createFooter() {
    // Prefer an existing footer container if available
    let footer = document.getElementById('footer');
    if (footer && footer.dataset.initialized === 'true') {
        // Already initialized, avoid duplicates
        return;
    }

    if (!footer) {
        footer = document.createElement('footer');
        footer.id = 'footer';
        // If there's an #app container, append inside; otherwise append to body
        const app = document.getElementById('app');
        (app || document.body).appendChild(footer);
    }

    // Mark as initialized to prevent duplicate builds
    footer.dataset.initialized = 'true';

    // Clear any existing content in the footer container
    footer.innerHTML = '';
    footer.className = 'bg-dark text-light pt-5';
    
    const container = document.createElement('div');
    container.className = 'container';
    
    // Main footer content
    const footerContent = document.createElement('div');
    footerContent.className = 'row g-4';
    
    // Footer sections
    const sections = [
        {
            title: 'GovHealthcare',
            icon: 'hospital',
            content: 'Your trusted partner in healthcare services, providing easy access to medical facilities and appointments.',
            social: [
                { icon: 'facebook', url: '#' },
                { icon: 'twitter', url: '#' },
                { icon: 'instagram', url: '#' },
                { icon: 'linkedin', url: '#' }
            ]
        },
        {
            title: 'Quick Links',
            links: [
                { text: 'Home', url: 'home.html', icon: 'chevron-left' },
                { text: 'Hospitals', url: 'hospitals.html', icon: 'hospital' },
                { text: 'Book Appointment', url: 'book.html', icon: 'calendar-plus' },
                { text: 'Ask a Question', url: 'ask.html', icon: 'question-circle' },
                { text: 'About Us', url: 'about.html', icon: 'info-circle' },
                { text: 'Contact', url: 'contact.html', icon: 'envelope' }
            ]
        },
        {
            title: 'Services',
            links: [

                { text: 'Lab Tests', url: '#', icon: 'clipboard2-pulse' },
                { text: 'Radiology', url: '#', icon: 'clipboard2-pulse' },
                { text: 'Emergency Care', url: '#', icon: 'clipboard2-pulse' },
                { text: 'Pharmacy', url: '#', icon: 'clipboard2-pulse' },
                { text: 'Ambulance', url: '#', icon: 'clipboard2-pulse' }
            ]
        },
        {
            title: 'Contact Us',
            contacts: [
                { icon: 'geo-alt', text: '123 Healthcare St, Medical District, City', url: '#' },
                { icon: 'telephone', text: '+20 123 456 7890', url: 'tel:+201234567890' },
                { icon: 'envelope', text: 'info@govhealthcare.eg', url: 'mailto:info@govhealthcare.eg' },
                { icon: 'clock', text: '24/7 Emergency Services Available' }
            ]
        }
    ];
    
    // Create sections
    sections.forEach(section => {
        const col = document.createElement('div');
        col.className = 'col-lg-3 col-md-6 mb-4';
        
        const sectionTitle = document.createElement('h5');
        sectionTitle.className = 'mb-4 position-relative pb-2';
        sectionTitle.style.borderBottom = '2px solid var(--accent-color)';
        
        if (section.icon) {
            const icon = document.createElement('i');
            icon.className = `bi bi-${section.icon} me-2`;
            sectionTitle.appendChild(icon);
        }
        
        sectionTitle.appendChild(document.createTextNode(section.title));
        col.appendChild(sectionTitle);
        
        // Section content based on type
        if (section.content) {
            const content = document.createElement('p');
            content.className = 'text-white-50';
            content.textContent = section.content;
            col.appendChild(content);
            
            if (section.social) {
                const socialLinks = document.createElement('div');
                socialLinks.className = 'd-flex mt-4 footer-social';
                
                section.social.forEach(social => {
                    const link = document.createElement('a');
                    link.href = social.url;
                    link.className = 'btn btn-outline-light btn-sm rounded-circle me-2 d-flex align-items-center justify-content-center';
                    link.style.width = '36px';
                    link.style.height = '36px';
                    link.innerHTML = `<i class="bi bi-${social.icon}"></i>`;
                    link.setAttribute('aria-label', social.icon);
                    socialLinks.appendChild(link);
                });
                
                col.appendChild(socialLinks);
            }
        } 
        else if (section.links) {
            const linkList = document.createElement('ul');
            linkList.className = 'list-unstyled';
            
            section.links.forEach(link => {
                const li = document.createElement('li');
                li.className = 'mb-2';
                
                const a = document.createElement('a');
                a.href = link.url;
                a.className = 'text-decoration-none d-flex align-items-center';
                a.style.color = '#adb5bd';
                a.style.transition = 'all 0.3s';
                
                const icon = document.createElement('i');
                icon.className = `bi bi-${link.icon} me-2`;
                icon.style.transition = 'transform 0.3s';
                
                a.appendChild(icon);
                a.appendChild(document.createTextNode(link.text));
                
                a.addEventListener('mouseover', () => {
                    a.style.color = 'white';
                    a.style.paddingLeft = '5px';
                    icon.style.transform = 'translateX(3px)';
                });
                
                a.addEventListener('mouseout', () => {
                    a.style.color = '#adb5bd';
                    a.style.paddingLeft = '0';
                    icon.style.transform = 'translateX(0)';
                });
                
                li.appendChild(a);
                linkList.appendChild(li);
            });
            
            col.appendChild(linkList);
        }
        else if (section.contacts) {
            const contactList = document.createElement('ul');
            contactList.className = 'list-unstyled';
            
            section.contacts.forEach(contact => {
                const li = document.createElement('li');
                li.className = 'mb-3 d-flex';
                
                const icon = document.createElement('i');
                icon.className = `bi bi-${contact.icon} me-3 mt-1`;
                icon.style.color = 'var(--accent-color)';
                
                li.appendChild(icon);
                
                if (contact.url) {
                    const a = document.createElement('a');
                    a.href = contact.url;
                    a.className = 'text-decoration-none text-white-50';
                    a.style.transition = 'all 0.3s';
                    a.textContent = contact.text;
                    
                    a.addEventListener('mouseover', () => {
                        a.style.color = 'white';
                        a.style.paddingLeft = '5px';
                    });
                    
                    a.addEventListener('mouseout', () => {
                        a.style.color = '#adb5bd';
                        a.style.paddingLeft = '0';
                    });
                    
                    li.appendChild(a);
                } else {
                    const span = document.createElement('span');
                    span.className = 'text-white-50';
                    span.textContent = contact.text;
                    li.appendChild(span);
                }
                
                contactList.appendChild(li);
            });
            
            col.appendChild(contactList);
        }
        
        footerContent.appendChild(col);
    });
    
    container.appendChild(footerContent);
    
    // Copyright section
    const copyright = document.createElement('div');
    copyright.className = 'text-center py-4 mt-4 border-top border-secondary';
    copyright.innerHTML = `
        <p class="mb-0 text-white-50">&copy; ${new Date().getFullYear()} GovHealthcare. All rights reserved.</p>
        <div class="mt-2">
            <a href="#" class="text-white-50 me-2">Privacy Policy</a>
            <span class="text-white-50">|</span>
            <a href="#" class="text-white-50 mx-2">Terms of Service</a>
            <span class="text-white-50">|</span>
            <a href="#" class="text-white-50 ms-2">Sitemap</a>
        </div>
    `;
    
    container.appendChild(copyright);
    footer.appendChild(container);
    
    // Add styles (scoped to footer)
    const style = document.createElement('style');
    style.textContent = `
        footer {
            background: linear-gradient(135deg, #1a5f7a, #0c3a4a) !important;
        }
        footer h5 { color: white; font-weight: 600; letter-spacing: 0.5px; }
        footer a { text-decoration: none; }
        .footer-social .btn { transition: all 0.3s ease; }
        .footer-social .btn:hover {
            background-color: var(--accent-color) !important;
            border-color: var(--accent-color) !important;
            transform: translateY(-3px);
        }
        @media (max-width: 991.98px) {
            .footer-section { text-align: center; }
            .footer-section ul { padding-left: 0; }
            .footer-section .d-flex { justify-content: center; }
        }
    `;
    document.head.appendChild(style);
}
