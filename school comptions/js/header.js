// Thin legacy wrapper for buildless compatibility
(function() {
  const s = document.createElement('script');
  s.type = 'module';
  s.textContent = `
    import { createHeader } from './src/ui/header.js';
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => createHeader());
    } else {
      createHeader();
    }
  `;
  document.head.appendChild(s);
})();
