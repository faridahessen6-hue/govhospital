import { typeWriter } from '../../ui/typewriter.js';

// Shared Booking Core (Phase 5)
// Non-breaking: this module does not auto-run. Consumers import and call initBooking.

export const DEFAULT_PRICES = {
  consultation: 200,
  tests: 150,
  xray: 300,
};

export const DEFAULT_PAYMENT = {
  visa: '1234 5678 9012 3456',
  mobileWallet: '0100 123 4567',
  bankTransfer: 'EG12345678901234567890123456',
};

// Typing handled by shared typeWriter

export function initBooking({
  titleSelector = '#typewriter',
  containerSelector = '#booking-form',
  prices = DEFAULT_PRICES,
  payment = DEFAULT_PAYMENT,
  titleText = 'book a medical appointmentحجز كشف',
} = {}) {
  const title = document.querySelector(titleSelector);
  if (title) {
    typeWriter(title, titleText, 100).then(() => buildForm(containerSelector, prices, payment));
  } else {
    buildForm(containerSelector, prices, payment);
  }
}

function buildForm(containerSelector, PRICES, PAYMENT_NUMBERS) {
  const formContainer = document.querySelector(containerSelector);
  if (!formContainer) return;

  formContainer.innerHTML = '';
  const form = document.createElement('form');
  form.id = 'booking-form-inner';
  form.className = 'needs-validation';
  form.noValidate = true;

  const personalInfoSection = document.createElement('div');
  personalInfoSection.className = 'mb-4';
  personalInfoSection.innerHTML = `
    <h5 class="mb-3 text-primary">
      <i class="bi bi-person-lines-fill me-2"></i>
      معلومات المريض
    </h5>
  `;

  const fields = [
    {
      id: 'healthCard', label: 'رقم البطاقة الصحية', type: 'text',
      placeholder: 'أدخل رقم البطاقة الصحية', required: true, pattern: '^[0-9]+$',
      errorMessage: 'يجب إدخال رقم البطاقة الصحية (أرقام فقط)'
    },
    {
      id: 'fullName', label: 'الاسم', type: 'text', placeholder: 'أدخل الاسم بالكامل', required: true,
      errorMessage: 'يجب إدخال الاسم بالكامل'
    },
    {
      id: 'phoneNumber', label: 'رقم الموبايل', type: 'tel', placeholder: 'أدخل رقم الموبايل', required: true,
      pattern: '^[0-9]{11}$', errorMessage: 'يجب إدخال رقم موبايل صحيح (11 رقم)'
    },
  ];

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

  const servicesSection = document.createElement('div');
  servicesSection.className = 'mb-4';
  servicesSection.innerHTML = `
    <h5 class="mb-3 text-primary">
      <i class="bi bi-clipboard2-pulse-fill me-2"></i>
      الخدمات المطلوبة
    </h5>
    <div class="form-check mb-2">
      <input class="form-check-input service-checkbox" type="checkbox" value="consultation" id="consultation" checked>
      <label class="form-check-label" for="consultation">كشف طبي - ${PRICES.consultation} ج.م</label>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input service-checkbox" type="checkbox" value="tests" id="tests">
      <label class="form-check-label" for="tests">تحاليل طبية - ${PRICES.tests} ج.م</label>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input service-checkbox" type="checkbox" value="xray" id="xray">
      <label class="form-check-label" for="xray">أشعة - ${PRICES.xray} ج.م</label>
    </div>
  `;

  const paymentSection = document.createElement('div');
  paymentSection.className = 'mb-4';
  paymentSection.innerHTML = `
    <h5 class="mb-3 text-primary">
      <i class="bi bi-credit-card-fill me-2"></i>
      طريقة الدفع
    </h5>
    <div class="form-check mb-2">
      <input class="form-check-input" type="radio" name="paymentMethod" id="cash" value="cash" checked>
      <label class="form-check-label" for="cash"><i class="bi bi-cash-coin me-1"></i>الدفع نقداً عند الوصول</label>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="radio" name="paymentMethod" id="visa" value="visa">
      <label class="form-check-label" for="visa"><i class="bi bi-credit-card me-1"></i>الدفع ببطاقة الائتمان</label>
      <div id="visaDetails" class="payment-details mt-2 ms-4 d-none">
        <small class="text-muted">رقم البطاقة: ${PAYMENT_NUMBERS.visa}</small><br>
        <small class="text-muted">اسم البطاقة: CLINIC NAME</small>
      </div>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="radio" name="paymentMethod" id="mobileWallet" value="mobileWallet">
      <label class="form-check-label" for="mobileWallet"><i class="bi bi-phone-fill me-1"></i>محفظة إلكترونية</label>
      <div id="mobileWalletDetails" class="payment-details mt-2 ms-4 d-none">
        <small class="text-muted">رقم المحفظة: ${PAYMENT_NUMBERS.mobileWallet}</small><br>
        <small class="text-muted">اسم المحفظة: CLINIC NAME</small>
      </div>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="radio" name="paymentMethod" id="bankTransfer" value="bankTransfer">
      <label class="form-check-label" for="bankTransfer"><i class="bi bi-bank me-1"></i>تحويل بنكي</label>
      <div id="bankTransferDetails" class="payment-details mt-2 ms-4 d-none">
        <small class="text-muted">رقم الحساب: ${PAYMENT_NUMBERS.bankTransfer}</small><br>
        <small class="text-muted">اسم البنك: BANK NAME</small><br>
        <small class="text-muted">اسم المستفيد: CLINIC NAME</small>
      </div>
    </div>
  `;

  const totalSection = document.createElement('div');
  totalSection.className = 'alert alert-info d-flex justify-content-between align-items-center';
  totalSection.innerHTML = `
    <span class="fw-bold">الإجمالي:</span>
    <span id="totalPrice" class="fw-bold fs-5">${PRICES.consultation} ج.م</span>
  `;

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.className = 'btn btn-primary btn-lg w-100';
  submitBtn.innerHTML = `<i class="bi bi-check-circle-fill me-2"></i>تأكيد الحجز`;

  form.appendChild(personalInfoSection);
  form.appendChild(servicesSection);
  form.appendChild(paymentSection);
  form.appendChild(totalSection);
  form.appendChild(submitBtn);
  formContainer.appendChild(form);

  // Event handlers
  form.querySelectorAll('.service-checkbox').forEach(cb => cb.addEventListener('change', () => calculateTotal(PRICES)));
  form.addEventListener('submit', handleFormSubmit(PRICES));
  document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
    radio.addEventListener('change', function() {
      document.querySelectorAll('.payment-details').forEach(detail => detail.classList.add('d-none'));
      const detailsId = this.id + 'Details';
      const detailsElement = document.getElementById(detailsId);
      if (detailsElement) detailsElement.classList.remove('d-none');
    });
  });
}

function calculateTotal(PRICES) {
  const checkboxes = document.querySelectorAll('.service-checkbox:checked');
  let total = 0;
  checkboxes.forEach(checkbox => { total += PRICES[checkbox.value]; });
  const el = document.getElementById('totalPrice');
  if (el) el.textContent = `${total} ج.م`;
}

function handleFormSubmit(PRICES) {
  return function(e) {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add('was-validated');
      return;
    }
    // Gather selected services
    const selectedServices = [];
    document.querySelectorAll('.service-checkbox:checked').forEach(checkbox => {
      selectedServices.push(checkbox.nextElementSibling.textContent.trim());
    });
    // Payment method text
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').nextElementSibling.textContent.trim();

    showConfirmationMessage(selectedServices, paymentMethod, PRICES);
    form.reset();
    form.classList.remove('was-validated');
    const totalEl = document.getElementById('totalPrice');
    if (totalEl) totalEl.textContent = `${PRICES.consultation} ج.م`;
  };
}

function showConfirmationMessage(services, paymentMethod, PRICES) {
  const container = document.querySelector('.booking-container');
  if (!container) return;
  const messageDiv = document.createElement('div');
  messageDiv.id = 'confirmation-message';
  messageDiv.className = 'alert alert-success mt-4';
  messageDiv.style.cssText = 'opacity: 0; transition: opacity 1s ease-in-out;';
  const total = services.reduce((sum, service) => {
    const map = {
      consultation: PRICES.consultation,
      tests: PRICES.tests,
      xray: PRICES.xray,
    };
    // Rough parse: check contains Arabic labels too; fallback to consultation
    const found = Object.entries(map).find(([k]) => service.toLowerCase().includes(k))?.[1] ?? PRICES.consultation;
    return sum + found;
  }, 0);
  messageDiv.innerHTML = `
    <h5 class="alert-heading"><i class="bi bi-check-circle-fill me-2"></i>تم تأكيد الحجز بنجاح</h5>
    <div class="en-message" style="opacity: 0; transition: opacity 1s ease-in-out 0.5s;">
      <p class="mb-2">Your booking has been confirmed. Please check your messages for details.</p>
    </div>
    <div class="ar-message" style="opacity: 0; transition: opacity 1s ease-in-out 1.5s;">
      <p class="mb-0">تم تأكيد الحجز. سيتم إرسال التفاصيل إليك.</p>
    </div>
    <hr>
    <p class="mb-1"><strong>الخدمات المختارة:</strong></p>
    <p class="mb-1">${services.join('<br>')}</p>
    <p class="mb-1"><strong>طريقة الدفع:</strong> ${paymentMethod}</p>
    <p class="mb-0"><strong>المجموع:</strong> ${total} ج.م</p>
  `;
  container.appendChild(messageDiv);
  setTimeout(() => { messageDiv.style.opacity = '1'; }, 100);
  setTimeout(() => {
    messageDiv.style.opacity = '0';
    setTimeout(() => messageDiv.remove(), 1000);
  }, 20000);
}
