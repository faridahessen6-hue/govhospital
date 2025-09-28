// Function to display policies
async function displayPolicies() {
    const container = document.getElementById('policies-container');
    if (!container) return;

    const policies = [
        {
            ar: 'نحن ملتزمون بتقديم رعاية صحية عالية الجودة لجميع المرضى',
            en: 'We are committed to providing high-quality healthcare to all patients',
            icon: 'check-circle-fill',
            color: '#6c757d'  // Bootstrap gray
        },
        {
            ar: 'نحترم خصوصية وسرية معلومات المرضى',
            en: 'We respect patient privacy and confidentiality',
            icon: 'shield-lock-fill',
            color: '#868e96'  // Slightly lighter gray
        },
        {
            ar: 'نضمن بيئة آمنة ونظيفة لجميع المرضى والزوار',
            en: 'We ensure a safe and clean environment for all patients and visitors',
            icon: 'shield-check',
            color: '#495057'  // Slightly darker gray
        },
        {
            ar: 'نوفر رعاية عادلة ومتساوية للجميع',
            en: 'We provide fair and equal care for all',
            icon: 'people-fill',
            color: '#adb5bd'  // Lighter gray
        },
        {
            ar: 'نسعى دائمًا لتحسين جودة خدماتنا',
            en: 'We continuously strive to improve our service quality',
            icon: 'graph-up',
            color: '#343a40'  // Dark gray
        }
    ];

    // Clear existing content
    container.innerHTML = '';

    // Add each policy to the container
    policies.forEach((policy, index) => {
        const policyElement = document.createElement('div');
        policyElement.className = 'col-md-6 col-lg-4';
        policyElement.innerHTML = `
            <div class="policy-card h-100" style="border-right: 4px solid ${policy.color};">
                <div class="d-flex align-items-center mb-3">
                    <i class="bi bi-${policy.icon} me-2" style="color: ${policy.color}; font-size: 1.5rem;"></i>
                    <h4 class="mb-0" style="color: ${policy.color};">${index + 1}</h4>
                </div>
                <div class="policy-content">
                    <p class="english-text fw-bold mb-3" style="color: ${policy.color};">${policy.en}</p>
                    <p class="arabic-text text-muted mb-0" style="border-top: 1px solid ${policy.color}40; padding-top: 10px;">${policy.ar}</p>
                </div>
            </div>
        `;
        container.appendChild(policyElement);
    });

    // Add fade-in animation to policy cards
    const cards = document.querySelectorAll('.policy-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.animation = 'fadeIn 0.5s ease-out forwards';
            card.style.animationDelay = `${index * 0.1}s`;
        }, 100);
    });
}

// Initialize the page
function initPage() {
    // Header and footer are mounted by shared wrappers (js/header.js, js/footer.js)
    displayPolicies();
}

// Wait for the DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', initPage);
