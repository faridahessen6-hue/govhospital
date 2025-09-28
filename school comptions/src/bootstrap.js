import { createHeader } from './ui/header.js';
import { createFooter } from './ui/footer.js';

function ready(fn) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    fn();
  }
}

// Simple router map. Keep minimal initially to avoid double inits with legacy scripts.
const routes = {
  // Example: when fully migrated, we can enable this to own the animation setup
  // hospitals: async () => {
  //   const { createCircleAnimation } = await import('./pages/hospitals/animation.js');
  //   createCircleAnimation();
  // },
  'booking-adult': async () => {
    const { initBooking } = await import('./pages/booking/booking-core.js');
    initBooking();
  },
  'booking-teen': async () => {
    const { initBooking } = await import('./pages/booking/booking-core.js');
    initBooking();
  },
  'booking-middle': async () => {
    const { initBooking } = await import('./pages/booking/booking-core.js');
    initBooking();
  },
  'booking-old': async () => {
    const { initBooking } = await import('./pages/booking/booking-core.js');
    initBooking();
  },
  'ask': async () => {
    const { initAskChat } = await import('./ui/chat-core.js');
    initAskChat();
  },
  'review': async () => {
    const { initReviewChat } = await import('./ui/chat-core.js');
    initReviewChat();
  },
  'about': async () => {
    const { typeWriter } = await import('./ui/typewriter.js');
    const enText = "We're here to make hospital services in Kafr El-Sheikh simple and stress-free!\n\nNo more long trips or waiting in endless lines — everything you need is now in one place:\n\n* Find all public hospitals in Kafr El-Sheikh\n* Book easily through our online forms\n* Get free medical consultations anytime\n* Receive medicine and treatment support for all ages\n\nOur goal is simple: save your time, reduce effort, and keep healthcare just one click away.";
    const arText = "إحنا هنا علشان نخلي خدمات المستشفيات في كفر الشيخ أسهل وأقرب ليك!\n\nمش هتضيع وقتك في مشاوير ولا طوابير — كل اللي محتاجه هتلاقيه عندنا:\n\n* كل المستشفيات الحكومية في كفر الشيخ في مكان واحد\n* حجز واستمارات أونلاين بسهولة\n* استشارات طبية مجانية طول الوقت\n* صرف علاج ودعم لأي سن\n\nهدفنا بسيط: نوفر وقتك، نقلل مجهودك، ونخلي الخدمة الصحية على بُعد كليك واحدة.";
    const enEl = document.getElementById('en-text');
    const arEl = document.getElementById('ar-text');
    document.querySelectorAll('.language-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.language-tab, .language-content').forEach(el => el.classList.remove('active'));
        tab.classList.add('active');
        const lang = tab.getAttribute('data-lang');
        document.getElementById(`${lang}-content`).classList.add('active');
        if (lang === 'en') {
          typeWriter(enEl, enText, 30);
        } else {
          typeWriter(arEl, arText, 30);
        }
      });
    });
    // start with English
    typeWriter(enEl, enText, 30);
  },
  'password': () => {
    const recoveryForm = document.getElementById('recoveryForm');
    if (recoveryForm) {
      recoveryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const phoneInput = document.getElementById('phoneNumber');
        const phoneNumber = phoneInput ? phoneInput.value : '';
        sessionStorage.setItem('recoveryPhone', phoneNumber);
        window.location.href = 'code.html';
      });
    }
  },
  'code': () => {
    // Display stored phone number
    const phoneNumber = sessionStorage.getItem('recoveryPhone');
    const phoneEl = document.getElementById('phoneNumberDisplay');
    if (phoneEl && phoneNumber) phoneEl.textContent = phoneNumber;

    // Code inputs behavior
    const codeInputs = document.querySelectorAll('.code-input');
    codeInputs.forEach((input, index) => {
      input.addEventListener('input', function() {
        if (this.value.length === 1 && index < codeInputs.length - 1) {
          codeInputs[index + 1].focus();
        }
      });
      input.addEventListener('keydown', function(e) {
        if (e.key === 'Backspace' && !this.value && index > 0) {
          codeInputs[index - 1].focus();
        }
      });
      input.addEventListener('keypress', function(e) {
        if (e.key < '0' || e.key > '9') e.preventDefault();
      });
    });

    // Verification submit
    const verificationForm = document.getElementById('verificationForm');
    if (verificationForm) {
      verificationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const code = Array.from(codeInputs).map(input => input.value).join('');
        console.log('Verification code:', code);
        window.location.href = 'reset-password.html';
      });
    }

    // Resend code
    const resendCodeBtn = document.getElementById('resendCode');
    if (resendCodeBtn) {
      resendCodeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        alert('A new verification code has been sent to your phone.');
      });
    }
  },
};

ready(() => {
  // Mount shared UI (guards prevent duplicates)
  createHeader();
  createFooter();

  // Lightweight dispatch
  const page = document.body?.dataset?.page;
  if (page && typeof routes[page] === 'function') {
    routes[page]();
  }
});
