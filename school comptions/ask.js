// Language configuration
const lang = {
    current: 'en',
    strings: {
        // Bot responses
        hello: {
            en: 'Hello! How can I assist you today with our hospital services?',
            ar: 'مرحباً! كيف يمكنني مساعدتك اليوم بخصوص خدمات مستشفانا؟'
        },
        hi: {
            en: 'Hi there! What can I help you with regarding our hospital?',
            ar: 'مرحباً! كيف يمكنني مساعدتك بخصوص مستشفانا؟'
        },
        location: {
            en: 'Our main hospital is located at 123 Medical Center Drive, Kafr El-Sheikh. We also have branches in other districts.',
            ar: 'يقع مستشفانا الرئيسي في 123 شارع المركز الطبي، كفر الشيخ. ولدينا فروع أخرى في مناطق مختلفة.'
        },
        working_hours: {
            en: 'Emergency: 24/7\nOPD: 8:00 AM - 10:00 PM\nSpecialty Clinics: 9:00 AM - 5:00 PM',
            ar: 'الطوارئ: على مدار الساعة\nالعيادات الخارجية: من 8 صباحاً حتى 10 مساءً\nالعيادات التخصصية: من 9 صباحاً حتى 5 مساءً'
        },
        emergency: {
            en: 'For emergencies, please call 123 immediately or visit our emergency department which is open 24/7.',
            ar: 'للحالات الطارئة، يرجى الاتصال بالرقم 123 فوراً أو التوجه إلى قسم الطوارئ المفتوح على مدار الساعة.'
        },
        appointment: {
            en: 'You can book an appointment by calling our helpline at 12345 or through our online portal.',
            ar: 'يمكنك حجز موعد من خلال الاتصال بخط المساعدة على الرقم 12345 أو من خلال البوابة الإلكترونية.'
        },
        services: {
            en: 'We offer a wide range of services including emergency care, surgery, maternity, pediatrics, and specialized treatments.',
            ar: 'نوفر مجموعة واسعة من الخدمات تشمل الرعاية الطارئة والجراحة والولادة وطب الأطفال والعلاجات المتخصصة.'
        },
        contact: {
            en: 'You can reach us at:\nPhone: 12345\nEmail: info@govhospitals.com\nEmergency: 123',
            ar: 'يمكنك التواصل معنا على:\nالهاتف: 12345\nالبريد الإلكتروني: info@govhospitals.com\nالطوارئ: 123'
        },
        default: {
            en: "I'm here to help. Please choose from these common questions:",
            ar: "أنا هنا لمساعدتك. يرجى الاختيار من بين هذه الأسئلة الشائعة:"
        },
        welcome: {
            en: 'Welcome to our hospital support. How can I help you today?',
            ar: 'مرحباً بكم في دعم مستشفانا. كيف يمكنني مساعدتك اليوم؟'
        },
        send: {
            en: 'Send',
            ar: 'إرسال'
        },
        placeholder: {
            en: 'Type your question here...',
            ar: 'اكتب سؤالك هنا...'
        },
        hospital_support: {
            en: 'Hospital Support',
            ar: 'دعم المستشفى'
        },
        ask_anything: {
            en: 'Ask us anything about our services',
            ar: 'اسألنا عن أي شيء بخصوص خدماتنا'
        },
        choose_language: {
            en: 'Choose Language',
            ar: 'اختر اللغة'
        },
        arabic: {
            en: 'Arabic',
            ar: 'العربية'
        },
        english: {
            en: 'English',
            ar: 'الإنجليزية'
        }
    },
    
    // Common questions in both languages
    commonQuestions: [
        {
            en: 'Hospital Locations',
            ar: 'مواقع المستشفيات',
            response: 'location'
        },
        {
            en: 'Working Hours',
            ar: 'ساعات العمل',
            response: 'working_hours'
        },
        {
            en: 'Emergency Services',
            ar: 'خدمات الطوارئ',
            response: 'emergency'
        },
        {
            en: 'Book Appointment',
            ar: 'حجز موعد',
            response: 'appointment'
        },
        {
            en: 'Our Services',
            ar: 'خدماتنا',
            response: 'services'
        },
        {
            en: 'Contact Us',
            ar: 'اتصل بنا',
            response: 'contact'
        }
    ],
    
    // Switch between languages
    switchLanguage: function() {
        this.current = this.current === 'en' ? 'ar' : 'en';
        document.documentElement.lang = this.current;
        document.documentElement.dir = this.current === 'ar' ? 'rtl' : 'ltr';
        
        // Toggle language display
        document.querySelectorAll('.lang-text').forEach(el => {
            el.style.display = 'none';
        });
        document.querySelectorAll(`.lang-${this.current}`).forEach(el => {
            el.style.display = 'inline';
        });
        
        // Update UI elements
        document.querySelectorAll('[data-en]').forEach(el => {
            const key = el.getAttribute('data-en');
            if (this.strings[key]) {
                el.textContent = this.strings[key][this.current];
            }
        });
        
        // Update placeholders
        document.querySelectorAll('[data-placeholder-en]').forEach(el => {
            el.placeholder = el.getAttribute(`data-placeholder-${this.current}`);
        });
        
        // Update button texts
        document.querySelectorAll('[data-text-en]').forEach(el => {
            const key = el.getAttribute('data-text-en');
            if (this.strings[key]) {
                el.textContent = this.strings[key][this.current];
            }
        });
    },
    
    // Get localized string
    t: function(key) {
        return this.strings[key]?.[this.current] || key;
    }
};

// Initialize chat when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chatMessages');
    const messageForm = document.getElementById('messageForm');
    const userInput = document.getElementById('userInput');
    const langToggle = document.getElementById('langToggle');
    
    // Set initial language
    lang.switchLanguage();
    
    // Language toggle
    langToggle.addEventListener('click', function(e) {
        e.preventDefault();
        lang.switchLanguage();
        // Clear and reset chat
        chatMessages.innerHTML = '';
        showWelcomeMessage();
    });
    
    // Show welcome message
    function showWelcomeMessage() {
        addMessage(lang.t('welcome'), false);
        showCommonQuestions();
    }
    
    // Add message to chat
    function addMessage(message, isUser = false, isOptions = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        if (isOptions) {
            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'options-container';
            
            message.forEach(question => {
                const optionBtn = document.createElement('button');
                optionBtn.className = 'btn btn-outline-primary btn-sm';
                optionBtn.textContent = question[lang.current];
                optionBtn.addEventListener('click', () => {
                    // When an option is clicked, send it as a user message
                    addMessage(question[lang.current], true);
                    // Process the selected option
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
    
    // Show common questions as clickable options
    function showCommonQuestions() {
        addMessage(lang.t('default'), false);
        addMessage(lang.commonQuestions, false, true);
    }
    
    // Process user input
    function processMessage(message) {
        let responseKey = message.toLowerCase().replace(/\s+/g, '_');
        
        // Show typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'message bot-message';
        typingIndicator.id = 'typingIndicator';
        typingIndicator.textContent = '...';
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simulate typing delay
        setTimeout(() => {
            document.getElementById('typingIndicator')?.remove();
            
            // Get response based on the key
            const response = lang.t(responseKey) || lang.t('default');
            addMessage(response);
            
            // Show common questions after response
            setTimeout(showCommonQuestions, 1000);
        }, 1000);
    }
    
    // Handle form submission
    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const message = userInput.value.trim();
        
        if (message) {
            // Add user message
            addMessage(message, true);
            userInput.value = '';
            
            // Process and respond
            setTimeout(() => processMessage(message), 500);
        }
    });
    
    // Initial welcome message
    showWelcomeMessage();
});

// Add some styles for the options
const style = document.createElement('style');
style.textContent = `
    .options-container {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 10px;
    }
    
    .options-container button {
        white-space: nowrap;
        text-align: left;
        transition: all 0.2s;
    }
    
    .options-container button:hover {
        transform: translateY(-2px);
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
`;
document.head.appendChild(style);
