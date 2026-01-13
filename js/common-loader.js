/**
 * Common Header/Footer Loader
 * Loads shared navigation and footer HTML to reduce code duplication
 */

(function() {
  'use strict';

  // Load header (navigation)
  function loadHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
      fetch('/includes/header.html')
        .then(response => response.text())
        .then(html => {
          // Extract just the nav element from the header.html
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const nav = doc.querySelector('nav');
          if (nav) {
            headerPlaceholder.appendChild(nav);
          }
        })
        .catch(error => console.error('Error loading header:', error));
    }
  }

  // Load footer (scripts)
  function loadFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
      fetch('/includes/footer.html')
        .then(response => response.text())
        .then(html => {
          // Extract script tags and append them to body
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const scripts = doc.querySelectorAll('script');
          scripts.forEach(script => {
            const newScript = document.createElement('script');
            if (script.src) {
              newScript.src = script.src;
            } else {
              newScript.textContent = script.textContent;
            }
            document.body.appendChild(newScript);
          });
        })
        .catch(error => console.error('Error loading footer:', error));
    }
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      loadHeader();
      loadFooter();
    });
  } else {
    loadHeader();
    loadFooter();
  }
})();
