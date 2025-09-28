// src/ui/chat-core.js
// Shared Chat Core

// ---- ASK CHAT (localized with suggestions) ----
export function initAskChat() {
  const chatMessages = document.getElementById('chatMessages');
  const messageForm = document.getElementById('messageForm');
  const userInput = document.getElementById('userInput');
  const langToggle = document.getElementById('langToggle');
  if (!chatMessages || !messageForm || !userInput || !langToggle) return;

  const lang = createLangState();
  // Initial language
  lang.switchLanguage();

  langToggle.addEventListener('click', function(e) {
    e.preventDefault();
    lang.switchLanguage();
    // Clear and reset chat
    chatMessages.innerHTML = '';
    showWelcomeMessage();
  });

  function showWelcomeMessage() {
    addMessage(lang.t('welcome'), false);
    showCommonQuestions();
  }

  function addMessage(message, isUser = false, isOptions = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;

    if (isOptions) {
      const optionsContainer = document.createElement('div');
      optionsContainer.className = 'options-container';

      message.forEach(question => {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'btn btn-outline-primary btn-sm suggestion-btn';
        optionBtn.textContent = question[lang.current];
        optionBtn.addEventListener('click', () => {
          addMessage(question[lang.current], true);
          setTimeout(() => processMessage(question.response), 500);
        });
        optionsContainer.appendChild(optionBtn);
      });

      messageDiv.appendChild(optionsContainer);
    } else {
      messageDiv.textContent = message;
    }

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showCommonQuestions() {
    addMessage(lang.t('default'), false);
    addMessage(lang.commonQuestions, false, true);
  }

  function processMessage(message) {
    const responseKey = String(message).toLowerCase().replace(/\s+/g, '_');

    // Typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message bot-message';
    typingIndicator.id = 'typingIndicator';
    typingIndicator.textContent = '...';
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
      document.getElementById('typingIndicator')?.remove();
      const response = lang.t(responseKey) || lang.t('default');
      addMessage(response);
      setTimeout(showCommonQuestions, 1000);
    }, 1000);
  }

  messageForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const message = userInput.value.trim();
    if (message) {
      addMessage(message, true);
      userInput.value = '';
      setTimeout(() => processMessage(message), 500);
    }
  });

  // Kick off
  showWelcomeMessage();
}

function createLangState() {
  const state = {
    current: 'en',
    strings: {
      hello: { en: 'Hello! How can I assist you today with our hospital services?', ar: 'مرحباً! كيف يمكنني مساعدتك اليوم بخصوص خدمات مستشفانا؟' },
      hi: { en: 'Hi there! What can I help you with regarding our hospital?', ar: 'مرحباً! كيف يمكنني مساعدتك بخصوص مستشفانا؟' },
      location: { en: 'Our main hospital is located at 123 Medical Center Drive, Kafr El-Sheikh. We also have branches in other districts.', ar: 'يقع مستشفانا الرئيسي في 123 شارع المركز الطبي، كفر الشيخ. ولدينا فروع أخرى في مناطق مختلفة.' },
      working_hours: { en: 'Emergency: 24/7\nOPD: 8:00 AM - 10:00 PM\nSpecialty Clinics: 9:00 AM - 5:00 PM', ar: 'الطوارئ: على مدار الساعة\nالعيادات الخارجية: من 8 صباحاً حتى 10 مساءً\nالعيادات التخصصية: من 9 صباحاً حتى 5 مساءً' },
      emergency: { en: 'For emergencies, please call 123 immediately or visit our emergency department which is open 24/7.', ar: 'للحالات الطارئة، يرجى الاتصال بالرقم 123 فوراً أو التوجه إلى قسم الطوارئ المفتوح على مدار الساعة.' },
      appointment: { en: 'You can book an appointment by calling our helpline at 12345 or through our online portal.', ar: 'يمكنك حجز موعد من خلال الاتصال بخط المساعدة على الرقم 12345 أو من خلال البوابة الإلكترونية.' },
      services: { en: 'We offer a wide range of services including emergency care, surgery, maternity, pediatrics, and specialized treatments.', ar: 'نوفر مجموعة واسعة من الخدمات تشمل الرعاية الطارئة والجراحة والولادة وطب الأطفال والعلاجات المتخصصة.' },
      contact: { en: 'You can reach us at:\nPhone: 12345\nEmail: info@govhospitals.com\nEmergency: 123', ar: 'يمكنك التواصل معنا على:\nالهاتف: 12345\nالبريد الإلكتروني: info@govhospitals.com\nالطوارئ: 123' },
      default: { en: "I'm here to help. Please choose from these common questions:", ar: 'أنا هنا لمساعدتك. يرجى الاختيار من بين هذه الأسئلة الشائعة:' },
      welcome: { en: 'Welcome to our hospital support. How can I help you today?', ar: 'مرحباً بكم في دعم مستشفانا. كيف يمكنني مساعدتك اليوم؟' }
    },
    commonQuestions: [
      { en: 'Hospital Locations', ar: 'مواقع المستشفيات', response: 'location' },
      { en: 'Working Hours', ar: 'ساعات العمل', response: 'working_hours' },
      { en: 'Emergency Services', ar: 'خدمات الطوارئ', response: 'emergency' },
      { en: 'Book Appointment', ar: 'حجز موعد', response: 'appointment' },
      { en: 'Our Services', ar: 'خدماتنا', response: 'services' },
      { en: 'Contact Us', ar: 'اتصل بنا', response: 'contact' },
    ],
    switchLanguage: function() {
      this.current = this.current === 'en' ? 'ar' : 'en';
      document.documentElement.lang = this.current;
      document.documentElement.dir = this.current === 'ar' ? 'rtl' : 'ltr';

      // Toggle language display for any .lang-text controls if present
      document.querySelectorAll('.lang-text').forEach(el => { el.style.display = 'none'; });
      document.querySelectorAll(`.lang-${this.current}`).forEach(el => { el.style.display = 'inline'; });

      // Update placeholders
      document.querySelectorAll('[data-placeholder-en]')
        .forEach(el => { el.placeholder = el.getAttribute(`data-placeholder-${this.current}`) || el.placeholder; });
    },
    t: function(key) { return this.strings[key]?.[this.current] || key; }
  };
  return state;
}

// ---- REVIEW CHAT (simple simulated bot) ----
export function initReviewChat() {
  const chatMessages = document.getElementById('chatMessages');
  const reviewForm = document.getElementById('reviewForm');
  const messageInput = document.getElementById('messageInput');
  if (!chatMessages || !reviewForm || !messageInput) return;

  const botResponses = [
    'Thank you for your feedback! We appreciate you taking the time to share your experience.',
    "We're sorry to hear about your experience. Could you please provide more details?",
    "That's great to hear! We're glad we could meet your expectations.",
    'Thank you for your valuable feedback. We\'ll use it to improve our services.',
    'We appreciate your patience and understanding. Is there anything specific you\'d like us to know?'
  ];

  function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'sent' : 'received'}`;
    messageDiv.textContent = text;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const timeSpan = document.createElement('span');
    timeSpan.className = 'd-block text-end mt-1';
    timeSpan.style.fontSize = '0.75rem';
    timeSpan.style.opacity = '0.7';
    timeSpan.textContent = time;
    messageDiv.appendChild(timeSpan);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function getBotResponse() {
    const randomIndex = Math.floor(Math.random() * botResponses.length);
    return botResponses[randomIndex];
  }

  function handleSubmit(e) {
    e.preventDefault();
    const message = messageInput.value.trim();
    if (!message) return;
    addMessage(message, true);
    messageInput.value = '';
    setTimeout(() => addMessage(getBotResponse()), 1000);
  }

  reviewForm.addEventListener('submit', handleSubmit);
  setTimeout(() => addMessage('Hello! Thank you for sharing your experience with us. How can we assist you today?'), 500);
}
