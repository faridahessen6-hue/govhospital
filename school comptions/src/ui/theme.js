export function applyTheme(config) {
  const style = document.createElement('style');
  style.id = 'hospital-theme';
  style.textContent = `
        :root {
            --primary-color: ${config.primaryColor};
            --secondary-color: ${config.secondaryColor};
            --accent-color: ${config.accentColor};
        }
        .btn-primary {
            background-color: var(--primary-color) !important;
            border-color: var(--primary-color) !important;
        }
        .btn-primary:hover {
            background-color: var(--accent-color) !important;
            border-color: var(--accent-color) !important;
        }
        .text-primary {
            color: var(--primary-color) !important;
        }
        .bg-primary {
            background-color: var(--primary-color) !important;
        }
        /* Navigation styles */
        .navbar {
            background-color: var(--primary-color) !important;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
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
    `;
  document.head.appendChild(style);
}
