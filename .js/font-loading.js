// Add loading class initially
document.documentElement.classList.add('font-loading');

// Use Font Loading API if available
if ('fonts' in document) {
  document.fonts.ready.then(() => {
    document.documentElement.classList.remove('font-loading');
  });
} else {
  // Fallback for browsers without Font Loading API
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.documentElement.classList.remove('font-loading');
    }, 100);
  });
}

// Optional: Preload specific fonts
const fontPreloader = {
  preload: function(fontFamily, fontUrl) {
    const font = new FontFace(fontFamily, `url(${fontUrl})`);
    font.load().then((loadedFont) => {
      document.fonts.add(loadedFont);
    });
  }
};

// Usage example:
// fontPreloader.preload('YourCustomFont', 'path/to/your-font.woff2');
