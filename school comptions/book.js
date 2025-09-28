// Main styles function
function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Base styles */
        :root {
            --primary-color: #1a5f7a;
            --secondary-color: #57c5b6;
            --accent-color: #159895;
            --light-color: #f8f9fa;
            --dark-color: #212529;
        }
        
        body {
            font-family: 'Tajawal', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            color: var(--dark-color);
            background-color: #f8f9fa;
            padding-top: 76px; /* Account for fixed header */
        }
        
        /* Navigation styles */
        .navbar {
            background-color: var(--primary-color) !important;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .nav-link {
            color: rgba(255,255,255,0.9) !important;
            transition: all 0.3s ease;
        }
        
        .nav-link:hover, .nav-link:focus {
            color: white !important;
            background-color: rgba(255,255,255,0.15);
        }
        
        .nav-link.active {
            background-color: var(--accent-color) !important;
            color: white !important;
            font-weight: 500;
        }
        
        /* Booking container */
        .booking-container {
            max-width: 900px;
            margin: 2rem auto;
            padding: 2.5rem;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            flex: 1;
            border: 1px solid #e9ecef;
        }
        
        /* Typewriter text */
        #typewriter {
            color: var(--primary-color);
            font-size: 2.25rem;
            font-weight: 700;
            text-align: center;
            margin: 1.5rem 0 2.5rem;
            min-height: 3.5rem;
            direction: ltr;
        }
        
        /* Buttons */
        .btn-primary {
            background-color: var(--primary-color);
            border-color: var(--primary-color);
            padding: 0.5rem 1.5rem;
            font-weight: 500;
            transition: all 0.3s ease;
        }
        
        .btn-primary:hover, .btn-primary:focus {
            background-color: #144d63;
            border-color: #144d63;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        /* Form elements */
        .form-control, .form-select {
            padding: 0.75rem 1rem;
            border: 1px solid #dee2e6;
            border-radius: 6px;
            transition: all 0.3s ease;
        }
        
        .form-control:focus, .form-select:focus {
            border-color: var(--accent-color);
            box-shadow: 0 0 0 0.25rem rgba(21, 152, 149, 0.25);
        }
        
        .form-label {
            font-weight: 500;
            margin-bottom: 0.5rem;
            color: var(--dark-color);
        }
        
        /* Validation */
        .was-validated .form-control:valid,
        .form-control.is-valid,
        .was-validated .form-select:valid,
        .form-select.is-valid {
            border-color: #198754;
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23198754' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
            padding-right: calc(1.5em + 0.75rem);
            background-repeat: no-repeat;
            background-position: right calc(0.375em + 0.1875rem) center;
            background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
        }
        
        .was-validated .form-control:invalid,
        .form-control.is-invalid,
        .was-validated .form-select:invalid,
        .form-select.is-invalid {
            border-color: #dc3545;
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
            padding-right: calc(1.5em + 0.75rem);
            background-repeat: no-repeat;
            background-position: right calc(0.375em + 0.1875rem) center;
            background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
        }
        
        .invalid-feedback {
            display: none;
            width: 100%;
            margin-top: 0.25rem;
            font-size: 0.875em;
            color: #dc3545;
        }
        
        .was-validated .form-control:invalid~.invalid-feedback,
        .form-control.is-invalid~.invalid-feedback,
        .was-validated .form-select:invalid~.invalid-feedback,
        .form-select.is-invalid~.invalid-feedback {
            display: block;
        }
        
        /* Payment details */
        .payment-details {
            background-color: #f8f9fa;
            padding: 1.25rem;
            border-radius: 8px;
            border-right: 3px solid var(--accent-color);
            margin: 1.5rem 0;
        }
        
        .payment-details small {
            display: block;
            line-height: 1.6;
            color: #6c757d;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
            .booking-container {
                padding: 1.5rem;
                margin: 1rem;
            }
            
            #typewriter {
                font-size: 1.75rem;
                margin: 1rem 0 2rem;
            }
        }
    `;
    document.head.appendChild(style);
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
            <p class="mb-0">تمام تم تاكيد الحجز يوم السبت من 3-12</p>
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
