// Thin legacy wrapper for buildless compatibility
(function() {
  const s = document.createElement('script');
  s.type = 'module';
  s.textContent = `
    import { createFooter } from '../src/ui/footer.js';
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => createFooter());
    } else {
      createFooter();
    }
  `;
  document.head.appendChild(s);
})();
