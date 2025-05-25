// Defer loading of non-critical resources
function loadDeferredStyles() {
    const stylesheets = document.querySelectorAll('link[data-deferred="true"]');
    stylesheets.forEach(sheet => {
        sheet.media = 'all';
        sheet.removeAttribute('data-deferred');
    });
}

function loadDeferredScripts() {
    const scripts = document.querySelectorAll('script[data-deferred="true"]');
    scripts.forEach(script => {
        const newScript = document.createElement('script');
        newScript.src = script.src;
        document.body.appendChild(newScript);
        script.remove();
    });
}

// Load deferred resources after page load
window.addEventListener('load', () => {
    loadDeferredStyles();
    loadDeferredScripts();
});
