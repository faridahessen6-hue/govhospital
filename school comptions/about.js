// Function to create header (similar to home.js)
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
        { text: 'Hospitals', href: 'hospitals.html', icon: 'hospital' },
        { text: 'Specialties', href: 'spec-el3am.html', icon: 'clipboard2-pulse' },
        { text: 'About', href: 'about.html', icon: 'info-circle', active: true },
        { text: 'Contact', href: 'contact.html', icon: 'envelope' },
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
