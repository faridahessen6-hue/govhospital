// Main styles function
function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Base styles */
        body {
            font-family: 'Tajawal', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            color: #003366;
        }
        
        /* Navigation styles */
        .navbar {
            background-color: #003366 !important;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .nav-link {
            color: rgba(255,255,255,0.9) !important;
        }
        
        .nav-link:hover {
            color: white !important;
            background-color: rgba(255,255,255,0.15);
        }
        
        .nav-link.active {
            font-weight: bold;
            background-color: rgba(255,255,255,0.2);
        }
        
        /* Footer styles */
        footer {
            background-color: #003366 !important;
            color: white;
            padding: 1.5rem 0;
            margin-top: auto;
        }
        
        /* Booking container */
        .booking-container {
            max-width: 800px;
            margin: 2rem auto;
            padding: 2rem;
            background: white;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            flex: 1;
            border: 1px solid #e0e6ed;
        }
        
        /* Typewriter text */
        #typewriter {
            color: #003366;
            font-size: 2rem;
            font-weight: bold;
            text-align: center;
            margin: 1rem 0 2rem;
            min-height: 3rem;
            min-width: 100%;
            direction: ltr;
        }
        
        /* Buttons */
        .btn-primary {
            background-color: #003366;
            border-color: #002b55;
        }
        
        .btn-primary:hover {
            background-color: #002b55;
            border-color: #002040;
        }
        
        /* Form elements */
        .form-control:focus {
            border-color: #003366;
            box-shadow: 0 0 0 0.25rem rgba(0, 51, 102, 0.25);
        }
        
        /* Validation */
        .was-validated .form-control:valid:focus, 
        .form-control.is-valid:focus {
            border-color: #003366;
            box-shadow: 0 0 0 0.25rem rgba(0, 51, 102, 0.25);
        }
        
        /* Links */
        a {
            color: #003366;
            text-decoration: none;
        }
        
        a:hover {
            color: #002040;
            text-decoration: underline;
        }
        
        .payment-details {
            background-color: #f8f9fa;
            padding: 0.75rem;
            border-radius: 0.25rem;
            border-right: 3px solid #0d6efd;
        }
        
        .payment-details small {
            display: block;
            line-height: 1.5;
        }
    `;
    document.head.appendChild(style);
}

// Create footer function
function createFooter() {
    const footer = document.createElement('footer');
    footer.className = 'mt-5';
    footer.style.backgroundColor = '#003366';
    footer.style.color = 'white';
    
    const container = document.createElement('div');
    container.className = 'container';
    
    const row = document.createElement('div');
    row.className = 'row justify-content-center';
    
    const col = document.createElement('div');
    col.className = 'col-12 text-center';
    
    // Add social media icons
    const socialIcons = document.createElement('div');
    socialIcons.className = 'mb-3';
    
    const socialLinks = [
        { icon: 'facebook', url: '#' },
        { icon: 'twitter', url: '#' },
        { icon: 'instagram', url: '#' },
        { icon: 'whatsapp', url: '#' }
    ];
    
    socialLinks.forEach(social => {
        const link = document.createElement('a');
        link.href = social.url;
        link.className = 'text-white mx-2';
        link.style.fontSize = '1.5rem';
        link.innerHTML = `<i class="bi bi-${social.icon}"></i>`;
        socialIcons.appendChild(link);
    });
    
    // Add contact info with icons
    const contactInfo = document.createElement('div');
    contactInfo.className = 'mb-3';
    contactInfo.innerHTML = `
        <div class="mb-2">
            <i class="bi bi-telephone-fill me-2"></i>
            <span>+20 123 456 7890</span>
        </div>
        <div>
            <i class="bi bi-envelope-fill me-2"></i>
            <span>info@example.com</span>
        </div>
    `;
    
    // Add copyright
    const copyright = document.createElement('p');
    copyright.className = 'mb-0';
    copyright.innerHTML = `
        <i class="bi bi-c-circle"></i>
        ${new Date().getFullYear()} جميع الحقوق محفوظة
    `;
    
    col.appendChild(socialIcons);
    col.appendChild(contactInfo);
    col.appendChild(copyright);
    row.appendChild(col);
    container.appendChild(row);
    footer.appendChild(container);
    
    return footer;
}

// Create header function
function createHeader() {
    const header = document.createElement('header');
    
    const nav = document.createElement('nav');
    nav.className = 'navbar navbar-expand-lg navbar-dark';
    nav.style.backgroundColor = '#003366';
    
    const container = document.createElement('div');
    container.className = 'container';
    
    // Brand with icon
    const brand = document.createElement('a');
    brand.className = 'navbar-brand d-flex align-items-center';
    brand.href = 'home.html';
    brand.innerHTML = `
        <i class="bi bi-house-door-fill me-2"></i>
        الرئيسية
    `;
    
    // Toggler button
    const toggler = document.createElement('button');
    toggler.className = 'navbar-toggler';
    toggler.type = 'button';
    toggler.setAttribute('data-bs-toggle', 'collapse');
    toggler.setAttribute('data-bs-target', '#navbarNav');
    toggler.innerHTML = '<span class="navbar-toggler-icon"></span>';
    
    // Navigation items
    const collapse = document.createElement('div');
    collapse.className = 'collapse navbar-collapse';
    collapse.id = 'navbarNav';
    
    const navList = document.createElement('ul');
    navList.className = 'navbar-nav me-auto';
    
    // Home link
    const homeItem = document.createElement('li');
    homeItem.className = 'nav-item';
    const homeLink = document.createElement('a');
    homeLink.className = 'nav-link d-flex align-items-center';
    homeLink.href = 'home.html';
    homeLink.innerHTML = `
        <i class="bi bi-house-door me-1"></i>
        الرئيسية
    `;
    homeItem.appendChild(homeLink);
    
    // Hospitals link
    const hospitalsItem = document.createElement('li');
    hospitalsItem.className = 'nav-item';
    const hospitalsLink = document.createElement('a');
    hospitalsLink.className = 'nav-link d-flex align-items-center';
    hospitalsLink.href = 'hospitals.html';
    hospitalsLink.innerHTML = `
        <i class="bi bi-hospital me-1"></i>
        المستشفيات
    `;
    hospitalsItem.appendChild(hospitalsLink);
    
    // Book appointment link (active)
    const bookItem = document.createElement('li');
    bookItem.className = 'nav-item';
    const bookLink = document.createElement('a');
    bookLink.className = 'nav-link active d-flex align-items-center';
    bookLink.href = 'book.html';
    bookLink.innerHTML = `
        <i class="bi bi-calendar-check-fill me-1"></i>
        حجز كشف
    `;
    bookItem.appendChild(bookLink);
    
    // Add items to navigation
    navList.appendChild(homeItem);
    navList.appendChild(hospitalsItem);
    navList.appendChild(bookItem);
    
    // Build the header structure
    collapse.appendChild(navList);
    container.appendChild(brand);
    container.appendChild(toggler);
    container.appendChild(collapse);
    nav.appendChild(container);
    header.appendChild(nav);
    
    return header;
}

// Load header and footer
function loadHeader() {
    const header = document.getElementById('header');
    if (header) {
        const headerElement = createHeader();
        header.innerHTML = '';
        header.appendChild(headerElement);
    }
}

function loadFooter() {
    const footer = document.getElementById('footer');
    if (footer) {
        const footerElement = createFooter();
        footer.innerHTML = '';
        footer.appendChild(footerElement);
    }
}

// Typewriter effect
function typeText(element, text, speed = 100, callback) {
    let index = 0;
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    element.textContent = '';
    type();
}

// Initialize page
window.onload = function() {
    // Add styles
    addStyles();
    
    // Header and footer are mounted by shared wrappers (js/header.js, js/footer.js)
     
    // Start typewriter effect for the title
    const title = document.getElementById('typewriter');
    if (title) {
        typeText(title, 'book a medical appointmentحجز كشف', 100, initializeBookingForm);
    } else {
        initializeBookingForm();
    }
};

const PRICES = {
    consultation: 200,
    tests: 150,
    xray: 300
};

const PAYMENT_NUMBERS = {
    visa: '1234 5678 9012 3456',
    mobileWallet: '0100 123 4567',
    bankTransfer: 'EG12345678901234567890123456'
};

// Initialize the booking form
function initializeBookingForm() {
    const formContainer = document.getElementById('booking-form');
    if (!formContainer) return;

    formContainer.innerHTML = '';
    
    const form = document.createElement('form');
    form.id = 'booking-form-inner';
    form.className = 'needs-validation';
    form.noValidate = true;
    
    // Personal Information Section
    const personalInfoSection = document.createElement('div');
    personalInfoSection.className = 'mb-4';
    personalInfoSection.innerHTML = `
        <h5 class="mb-3 text-primary">
            <i class="bi bi-person-lines-fill me-2"></i>
            معلومات المريض
        </h5>
    `;
    
    // Existing form fields
    const fields = [
        {
            id: 'healthCard',
            label: 'رقم البطاقة الصحية',
            type: 'text',
            placeholder: 'أدخل رقم البطاقة الصحية',
            required: true,
            pattern: '^[0-9]+$',
            errorMessage: 'يجب إدخال رقم البطاقة الصحية (أرقام فقط)'
        },
        {
            id: 'fullName',
            label: 'الاسم',
            type: 'text',
            placeholder: 'أدخل الاسم بالكامل',
            required: true,
            errorMessage: 'يجب إدخال الاسم بالكامل'
        },
        {
            id: 'phoneNumber',
            label: 'رقم الموبايل',
            type: 'tel',
            placeholder: 'أدخل رقم الموبايل',
            required: true,
            pattern: '^[0-9]{11}$',
            errorMessage: 'يجب إدخال رقم موبايل صحيح (11 رقم)'
        }
    ];

    // Add fields to personal info section
    fields.forEach(field => {
        const group = document.createElement('div');
        group.className = 'mb-3';
        group.innerHTML = `
            <label for="${field.id}" class="form-label">${field.label}</label>
            <input type="${field.type}" class="form-control" id="${field.id}" 
                   placeholder="${field.placeholder}" ${field.required ? 'required' : ''} 
                   ${field.pattern ? `pattern="${field.pattern}"` : ''}>
            <div class="invalid-feedback">${field.errorMessage}</div>
        `;
        personalInfoSection.appendChild(group);
    });

    // Services Section
    const servicesSection = document.createElement('div');
    servicesSection.className = 'mb-4';
    servicesSection.innerHTML = `
        <h5 class="mb-3 text-primary">
            <i class="bi bi-clipboard2-pulse-fill me-2"></i>
            الخدمات المطلوبة
        </h5>
        <div class="form-check mb-2">
            <input class="form-check-input service-checkbox" type="checkbox" value="consultation" id="consultation" checked>
            <label class="form-check-label" for="consultation">
                كشف طبي - ${PRICES.consultation} ج.م
            </label>
        </div>
        <div class="form-check mb-2">
            <input class="form-check-input service-checkbox" type="checkbox" value="tests" id="tests">
            <label class="form-check-label" for="tests">
                تحاليل طبية - ${PRICES.tests} ج.م
            </label>
        </div>
        <div class="form-check mb-2">
            <input class="form-check-input service-checkbox" type="checkbox" value="xray" id="xray">
            <label class="form-check-label" for="xray">
                أشعة - ${PRICES.xray} ج.م
            </label>
        </div>
    `;

    // Payment Section
    const paymentSection = document.createElement('div');
    paymentSection.className = 'mb-4';
    paymentSection.innerHTML = `
        <h5 class="mb-3 text-primary">
            <i class="bi bi-credit-card-fill me-2"></i>
            طريقة الدفع
        </h5>
        <div class="form-check mb-2">
            <input class="form-check-input" type="radio" name="paymentMethod" id="cash" value="cash" checked>
            <label class="form-check-label" for="cash">
                <i class="bi bi-cash-coin me-1"></i>
                الدفع نقداً عند الوصول
            </label>
        </div>
        <div class="form-check mb-2">
            <input class="form-check-input" type="radio" name="paymentMethod" id="visa" value="visa">
            <label class="form-check-label" for="visa">
                <i class="bi bi-credit-card me-1"></i>
                الدفع ببطاقة الائتمان
            </label>
            <div id="visaDetails" class="payment-details mt-2 ms-4 d-none">
                <small class="text-muted">رقم البطاقة: ${PAYMENT_NUMBERS.visa}</small><br>
                <small class="text-muted">اسم البطاقة: CLINIC NAME</small>
            </div>
        </div>
        <div class="form-check mb-2">
            <input class="form-check-input" type="radio" name="paymentMethod" id="mobileWallet" value="mobileWallet">
            <label class="form-check-label" for="mobileWallet">
                <i class="bi bi-phone-fill me-1"></i>
                محفظة إلكترونية
            </label>
            <div id="mobileWalletDetails" class="payment-details mt-2 ms-4 d-none">
                <small class="text-muted">رقم المحفظة: ${PAYMENT_NUMBERS.mobileWallet}</small><br>
                <small class="text-muted">اسم المحفظة: CLINIC NAME</small>
            </div>
        </div>
        <div class="form-check mb-2">
            <input class="form-check-input" type="radio" name="paymentMethod" id="bankTransfer" value="bankTransfer">
            <label class="form-check-label" for="bankTransfer">
                <i class="bi bi-bank me-1"></i>
                تحويل بنكي
            </label>
            <div id="bankTransferDetails" class="payment-details mt-2 ms-4 d-none">
                <small class="text-muted">رقم الحساب: ${PAYMENT_NUMBERS.bankTransfer}</small><br>
                <small class="text-muted">اسم البنك: BANK NAME</small><br>
                <small class="text-muted">اسم المستفيد: CLINIC NAME</small>
            </div>
        </div>
    `;

    // Total Price Section
    const totalSection = document.createElement('div');
    totalSection.className = 'alert alert-info d-flex justify-content-between align-items-center';
    totalSection.innerHTML = `
        <span class="fw-bold">الإجمالي:</span>
        <span id="totalPrice" class="fw-bold fs-5">${PRICES.consultation} ج.م</span>
    `;

    // Submit Button
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.className = 'btn btn-primary btn-lg w-100';
    submitBtn.innerHTML = `
        <i class="bi bi-check-circle-fill me-2"></i>
        تأكيد الحجز
    `;

    // Assemble the form
    form.appendChild(personalInfoSection);
    form.appendChild(servicesSection);
    form.appendChild(paymentSection);
    form.appendChild(totalSection);
    form.appendChild(submitBtn);
    
    formContainer.appendChild(form);

    // Add event listeners for price calculation
    const checkboxes = form.querySelectorAll('.service-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculateTotal);
    });

    // Add form submission handler
    form.addEventListener('submit', handleFormSubmit);
    
    // Setup input validation
    setupInputValidation(form);

    // Add payment method change handler
    document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
        radio.addEventListener('change', function() {
            // Hide all payment details
            document.querySelectorAll('.payment-details').forEach(detail => {
                detail.classList.add('d-none');
            });
            
            // Show selected payment details
            const detailsId = this.id + 'Details';
            const detailsElement = document.getElementById(detailsId);
            if (detailsElement) {
                detailsElement.classList.remove('d-none');
            }
        });
    });
}

// Calculate total price
function calculateTotal() {
    const checkboxes = document.querySelectorAll('.service-checkbox:checked');
    let total = 0;
    
    checkboxes.forEach(checkbox => {
        total += PRICES[checkbox.value];
    });
    
    document.getElementById('totalPrice').textContent = `${total} ج.م`;
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    
    if (!form.checkValidity()) {
        e.stopPropagation();
        form.classList.add('was-validated');
        return;
    }
    
    // Get selected services
    const selectedServices = [];
    document.querySelectorAll('.service-checkbox:checked').forEach(checkbox => {
        selectedServices.push(checkbox.nextElementSibling.textContent.trim());
    });
    
    // Get payment method
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').nextElementSibling.textContent.trim();
    
    // Show confirmation with payment info
    showConfirmationMessage(selectedServices, paymentMethod);
    
    // Reset form
    form.reset();
    form.classList.remove('was-validated');
    
    // Reset total
    document.getElementById('totalPrice').textContent = `${PRICES.consultation} ج.م`;
}

// Show confirmation message
function showConfirmationMessage(services, paymentMethod) {
    const container = document.querySelector('.booking-container');
    if (!container) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.id = 'confirmation-message';
    messageDiv.className = 'alert alert-success mt-4';
    messageDiv.style.cssText = 'opacity: 0; transition: opacity 1s ease-in-out;';
    
    let servicesList = services.map(service => `- ${service}`).join('<br>');
    let total = services.reduce((sum, service) => {
        const price = Object.entries(PRICES).find(([key]) => 
            service.includes(key.charAt(0).toUpperCase() + key.slice(1))
        )?.[1] || 0;
        return sum + price;
    }, 0);
    
    messageDiv.innerHTML = `
        <h5 class="alert-heading"><i class="bi bi-check-circle-fill me-2"></i>تم تأكيد الحجز بنجاح</h5>
        <div class="en-message" style="opacity: 0; transition: opacity 1s ease-in-out 0.5s;">
            <p class="mb-2">Your booking has been confirmed. The appointment is on Saturday from 12 to 6.</p>
        </div>
        <div class="ar-message" style="opacity: 0; transition: opacity 1s ease-in-out 1.5s;">
            <p class="mb-0">تمام تم تاكيد الحجز يوم السبت من 8-10</p>
        </div>
        <hr>
        <p class="mb-1"><strong>الخدمات المختارة:</strong></p>
        <p class="mb-1">${servicesList}</p>
        <p class="mb-1"><strong>طريقة الدفع:</strong> ${paymentMethod}</p>
        <p class="mb-0"><strong>المجموع:</strong> ${total} ج.م</p>
    `;
    
    container.appendChild(messageDiv);
    
    // Trigger fade in
    setTimeout(() => {
        messageDiv.style.opacity = '1';
        // Fade in English message
        setTimeout(() => {
            const enMessage = messageDiv.querySelector('.en-message');
            if (enMessage) enMessage.style.opacity = '1';
            
            // Fade in Arabic message
            setTimeout(() => {
                const arMessage = messageDiv.querySelector('.ar-message');
                if (arMessage) arMessage.style.opacity = '1';
            }, 1000);
        }, 100);
    }, 100);
    
    // Hide message after 20 seconds
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        setTimeout(() => {
            messageDiv.remove();
        }, 1000);
    }, 20000);
}

// Setup input validation
function setupInputValidation(form) {
    const inputs = form.querySelectorAll('input');
    
    inputs.forEach(input => {
        // Validate on blur
        input.addEventListener('blur', () => {
            validateInput(input);
        });
        
        // Clear validation on input
        input.addEventListener('input', () => {
            if (input.validity.valid) {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
            }
        });
    });
}

// Validate single input
function validateInput(input) {
    if (!input.checkValidity()) {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        return false;
    } else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        return true;
    }
}
