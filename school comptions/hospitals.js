// Hospitals page initializer (legacy buildless)

document.addEventListener('DOMContentLoaded', () => {
  // Ensure footer sticks to bottom with flex layout
  document.body.style.display = 'flex';
  document.body.style.flexDirection = 'column';
  document.body.style.minHeight = '100vh';
  const mainContent = document.querySelector('main') || document.querySelector('.container') || document.getElementById('circle-container');
  if (mainContent) mainContent.style.flex = '1 0 auto';

  // Load animation as an ES module and initialize
  const s = document.createElement('script');
  s.type = 'module';
  s.textContent = `
    import { createCircleAnimation } from './src/pages/hospitals/animation.js';
    const run = () => createCircleAnimation();
    run();
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(run, 250);
    });
  `;
  document.head.appendChild(s);
});