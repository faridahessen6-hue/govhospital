// Function to create header (matching home.js)
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
    brandLink.innerHTML = '<i class="bi bi-hospital me-2"></i>Gov Hospitals';
    
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
        { text: 'About', href: 'about.html', icon: 'info-circle' },
        { text: 'Contact', href: 'contact.html', icon: 'envelope', active: true },
        { text: 'Reviews', href: 'review.html', icon: 'star' }
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

// Function to create footer (matching home.js)
function createFooter() {
    const footer = document.getElementById('footer');
    if (!footer) return;
    
    footer.className = 'text-white py-4';
    footer.style.backgroundColor = '#003366';
    
    const container = document.createElement('div');
    container.className = 'container';
    
    const row = document.createElement('div');
    row.className = 'row';
    
    // Footer sections
    const sections = [
        {
            title: 'Gov Hospitals',
            icon: 'hospital',
            content: 'Your trusted healthcare provider for quality medical services.',
            links: []
        },
        {
            title: 'hospital',
            icon: 'hospital',
            content: '',
            links: ['find hospital', 'Schedule', 'Grades']
        },
        {
            title: 'transport',
            icon: 'bus',
            content: '',
            links: ['public transport', 'road conditions', 'travel alerts']
        },
        {
            title: 'Quick Links',
            icon: 'info-circle',
            content: '',
            links: [
                { text: 'Home', icon: 'house' },
                { text: 'About', icon: 'info' },
                { text: 'Contact', icon: 'envelope' },
                { text: 'policies', icon: 'shield-check' },
                { text: 'customer engagement', icon: 'people' },
                { text: 'reservation', icon: 'calendar-check' }
            ]
        }
    ];
    
    sections.forEach(section => {
        const col = document.createElement('div');
        col.className = 'col-md-3 col-sm-6 mb-4';
        
        const sectionTitle = document.createElement('h5');
        sectionTitle.style.color = 'white';
        sectionTitle.style.marginBottom = '1rem';
        
        const icon = document.createElement('i');
        icon.className = `bi bi-${section.icon} me-2`;
        sectionTitle.appendChild(icon);
        sectionTitle.appendChild(document.createTextNode(section.title));
        
        col.appendChild(sectionTitle);
        
        if (section.content) {
            const content = document.createElement('p');
            content.textContent = section.content;
            content.style.color = '#adb5bd';
            col.appendChild(content);
        }
        
        if (section.links.length > 0) {
            const linkList = document.createElement('ul');
            linkList.className = 'list-unstyled';
            
            section.links.forEach(link => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = '#';
                a.style.color = '#adb5bd';
                a.style.textDecoration = 'none';
                a.style.display = 'block';
                a.style.padding = '0.25rem 0';
                
                if (typeof link === 'string') {
                    a.textContent = link;
                    a.href = '#' + link.toLowerCase().replace(/\s+/g, '-');
                } else {
                    const linkIcon = document.createElement('i');
                    linkIcon.className = `bi bi-${link.icon} me-2`;
                    a.appendChild(linkIcon);
                    a.appendChild(document.createTextNode(link.text));
                    a.href = link.text.toLowerCase() + '.html';
                }
                
                a.addEventListener('mouseover', () => {
                    a.style.color = 'white';
                    a.style.textDecoration = 'underline';
                });
                
                a.addEventListener('mouseout', () => {
                    a.style.color = '#adb5bd';
                    a.style.textDecoration = 'none';
                });
                
                li.appendChild(a);
                linkList.appendChild(li);
            });
            
            col.appendChild(linkList);
        }
        
        row.appendChild(col);
    });
    
    // Copyright section
    const hr = document.createElement('hr');
    hr.style.margin = '2rem 0 1rem';
    hr.style.borderColor = 'rgba(255,255,255,0.1)';
    
    const copyrightRow = document.createElement('div');
    copyrightRow.className = 'row mt-4';
    
    const copyrightCol = document.createElement('div');
    copyrightCol.className = 'col-12 text-center';
    
    const copyrightText = document.createElement('p');
    copyrightText.className = 'mb-0';
    copyrightText.style.color = '#6c757d';
    copyrightText.textContent = `© ${new Date().getFullYear()} Gov Hospitals. All rights reserved.`;
    
    copyrightCol.appendChild(copyrightText);
    copyrightRow.appendChild(copyrightCol);
    
    // Assemble footer
    container.appendChild(row);
    container.appendChild(hr);
    container.appendChild(copyrightRow);
    footer.appendChild(container);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Header and footer are mounted by shared wrappers (js/header.js, js/footer.js)

    // Form submission handler (moved from inline script in contact.html)
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name')?.value;
            const email = document.getElementById('email')?.value;
            const cardNumber = document.getElementById('card number')?.value;
            const message = document.getElementById('message')?.value;

            // Here you would typically send the form data to a server
            console.log('Form submitted:', { name, email, cardNumber, message });

            // Show success message
            form.innerHTML = `
                <div class="alert alert-success text-center" role="alert">
                    <h4 class="alert-heading">Thank you for contacting us!</h4>
                    <p>We will reply as soon as possible.</p>
                    <hr>
                    <p class="mb-0">Your reference number: #${Math.floor(100000 + Math.random() * 900000)}</p>
                </div>
            `;
        });
    }
});
