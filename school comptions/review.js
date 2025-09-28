// Sample responses for the chat
const botResponses = [
    "Thank you for your feedback! We appreciate you taking the time to share your experience.",
    "We're sorry to hear about your experience. Could you please provide more details?",
    "That's great to hear! We're glad we could meet your expectations.",
    "Thank you for your valuable feedback. We'll use it to improve our services.",
    "We appreciate your patience and understanding. Is there anything specific you'd like us to know?"
];

// Function to add a new message to the chat
function addMessage(text, isUser = false) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'sent' : 'received'}`;
    messageDiv.textContent = text;
    
    // Add timestamp
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const timeSpan = document.createElement('span');
    timeSpan.className = 'd-block text-end mt-1';
    timeSpan.style.fontSize = '0.75rem';
    timeSpan.style.opacity = '0.7';
    timeSpan.textContent = time;
    
    messageDiv.appendChild(timeSpan);
    chatMessages.appendChild(messageDiv);
    
    // Auto-scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to get a random response from the bot
function getBotResponse() {
    const randomIndex = Math.floor(Math.random() * botResponses.length);
    return botResponses[randomIndex];
}

// Function to handle form submission
function handleSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (message) {
        // Add user message
        addMessage(message, true);
        input.value = '';
        
        // Simulate bot response after a short delay
        setTimeout(() => {
            addMessage(getBotResponse());
        }, 1000);
    }
}

// Initialize the chat
function initChat() {
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', handleSubmit);
    }
    
    // Add welcome message
    setTimeout(() => {
        addMessage("Hello! Thank you for sharing your experience with us. How can we assist you today?");
    }, 500);
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChat);
} else {
    initChat();
}

// Export for testing if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { addMessage, getBotResponse };
}
