(function () {
  'use strict';

  function getPagePrefix() {
    const path = (window.location.pathname || '').replace(/\\/g, '/');
    return /\/blog(\/|$)/i.test(path) ? '../' : '';
  }

  function injectThemeOverrides() {
    if (document.getElementById('rp-global-theme')) {
      return;
    }

    const style = document.createElement('style');
    style.id = 'rp-global-theme';
    style.textContent = `
      .rp-soft-surface {
        background: linear-gradient(180deg, #fbf6f1 0%, #f3e7dc 100%);
      }

      .rp-card {
        background: #fffaf6;
        border: 1px solid rgba(110, 90, 80, 0.16);
        border-radius: 18px;
        box-shadow: 0 18px 40px rgba(36, 24, 20, 0.08);
      }

      .rp-section-title {
        color: #241814;
      }

      .rp-muted {
        color: #6e5a50;
      }

      .rp-sponsor-card {
        background: linear-gradient(135deg, #2d1c17 0%, #4c2b20 100%);
        border-radius: 22px;
        color: #f8efe8;
        box-shadow: 0 24px 54px rgba(36, 24, 20, 0.22);
        overflow: hidden;
      }

      .rp-sponsor-card a,
      .rp-sponsor-card p,
      .rp-sponsor-card h3,
      .rp-sponsor-card small {
        color: inherit;
      }
    `;

    document.head.appendChild(style);
  }

  function buildHeader(prefix) {
    return `
      <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar ftco-navbar-light site-navbar-target" id="ftco-navbar">
        <div class="container">
          <a class="navbar-brand" href="${prefix}index.html">R€gionalPrice</a>
          <button class="navbar-toggler js-fh5co-nav-toggle fh5co-nav-toggle" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="oi oi-menu"></span> Menu
          </button>
          <div class="collapse navbar-collapse" id="ftco-nav">
            <ul class="navbar-nav nav ml-auto">
              <li class="nav-item"><a href="${prefix}index.html#home-section" class="nav-link"><span>Home</span></a></li>
              <li class="nav-item"><a href="${prefix}index.html#about-section" class="nav-link"><span>About</span></a></li>
              <li class="nav-item"><a href="${prefix}index.html#calculate-section" class="nav-link"><span>Calculator</span></a></li>
              <li class="nav-item"><a href="${prefix}blog.html" class="nav-link"><span>Guides</span></a></li>
              <li class="nav-item"><a href="${prefix}index.html#contact-section" class="nav-link"><span>Contact</span></a></li>
            </ul>
          </div>
        </div>
      </nav>
    `;
  }

  function buildFooter(prefix) {
    return `
      <footer class="ftco-footer ftco-section" style="background: linear-gradient(180deg, #050505 0%, #111111 100%); padding: 5em 0 3em;">
        <div class="container">
          <div class="row justify-content-center mb-5">
            <div class="col-lg-12">
              <div style="border-radius: 24px; background: linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02)); border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 28px 70px rgba(0,0,0,0.22); padding: 2rem 2.25rem;">
                <div class="row align-items-center">
                  <div class="col-lg-8 mb-4 mb-lg-0">
                    <p class="mb-2" style="letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.62); font-size: 0.78rem;">Regional Pricing Tools</p>
                    <h3 style="color: #ffffff; font-size: 2rem; font-weight: 700; margin-bottom: 0.75rem;">Calculate faster, learn faster, ship prices with confidence</h3>
                    <p class="mb-0" style="color: rgba(255,255,255,0.74); max-width: 720px;">Use the calculator for quick country pricing, then go deeper with platform guides, premium exports, and pricing audit support.</p>
                  </div>
                  <div class="col-lg-4 text-lg-right">
                    <a href="${prefix}index.html#calculate-section" class="btn btn-primary px-4 py-3 mr-lg-2 mb-3 mb-lg-0">Open Calculator</a>
                    <a href="${prefix}index.html#contact-section" class="btn px-4 py-3" style="background:#ffffff;color:#111111;font-weight:700;">Talk to Us</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-md-4 mb-4">
              <h4 style="color: #ffffff; font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem;">Regional Price Calculator</h4>
              <p style="color: rgba(255,255,255,0.72); max-width: 360px;">A practical pricing tool for SaaS teams, app publishers, and game studios that need country-level pricing decisions without the clutter.</p>
              <p class="mb-2"><a href="mailto:regionalprice@zohomail.eu" style="color: #ffffff; font-weight: 600;">regionalprice@zohomail.eu</a></p>
              <p class="mb-0" style="color: rgba(255,255,255,0.56);">Built for pricing guidance, exports, and consulting leads.</p>
            </div>
            <div class="col-md-2 col-6 mb-4">
              <h4 style="color: #ffffff; font-size: 1rem; font-weight: 700; margin-bottom: 1rem;">Product</h4>
              <ul class="list-unstyled mb-0">
                <li class="mb-2"><a href="${prefix}index.html#calculate-section" style="color: rgba(255,255,255,0.78);">Calculator</a></li>
                <li class="mb-2"><a href="${prefix}index.html#services-section" style="color: rgba(255,255,255,0.78);">Premium</a></li>
                <li class="mb-2"><a href="${prefix}api-docs.html" style="color: rgba(255,255,255,0.78);">API Access</a></li>
                <li><a href="${prefix}index.html#contact-section" style="color: rgba(255,255,255,0.78);">Pricing Audit</a></li>
              </ul>
            </div>
            <div class="col-md-3 col-6 mb-4">
              <h4 style="color: #ffffff; font-size: 1rem; font-weight: 700; margin-bottom: 1rem;">Learn</h4>
              <ul class="list-unstyled mb-0">
                <li class="mb-2"><a href="${prefix}blog.html" style="color: rgba(255,255,255,0.78);">All Guides</a></li>
                <li class="mb-2"><a href="${prefix}blog/steam-regional-pricing-guide.html" style="color: rgba(255,255,255,0.78);">Steam Guide</a></li>
                <li class="mb-2"><a href="${prefix}blog/google-play-pricing-strategy.html" style="color: rgba(255,255,255,0.78);">Google Play Guide</a></li>
                <li><a href="${prefix}blog/understanding-purchasing-power-parity.html" style="color: rgba(255,255,255,0.78);">PPP Guide</a></li>
              </ul>
            </div>
            <div class="col-md-3 mb-4">
              <h4 style="color: #ffffff; font-size: 1rem; font-weight: 700; margin-bottom: 1rem;">Company</h4>
              <ul class="list-unstyled mb-0">
                <li class="mb-2"><a href="${prefix}index.html#about-section" style="color: rgba(255,255,255,0.78);">About</a></li>
                <li class="mb-2"><a href="${prefix}terms-and-conditions.html" style="color: rgba(255,255,255,0.78);">Terms</a></li>
                <li class="mb-2"><a href="${prefix}privacy.html" style="color: rgba(255,255,255,0.78);">Privacy</a></li>
                <li class="mb-2"><a href="${prefix}cookie-policy.html" style="color: rgba(255,255,255,0.78);">Cookies</a></li>
                <li><a href="#" onclick="window.openCookiePreferences && window.openCookiePreferences(); return false;" style="color: rgba(255,255,255,0.78);">Cookie Settings</a></li>
              </ul>
            </div>
          </div>
          <div class="row pt-4" style="border-top: 1px solid rgba(255,255,255,0.10);">
            <div class="col-md-7 text-center text-md-left mb-2 mb-md-0">
              <p class="mb-0" style="color: rgba(255,255,255,0.54);">Copyright &copy;<span id="current-year"></span> Regional Price Calculator. All rights reserved.</p>
            </div>
            <div class="col-md-5 text-center text-md-right">
              <p class="mb-0" style="color: rgba(255,255,255,0.54);">Clearer pricing guidance for global software teams.</p>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  function setCurrentYear(scope) {
    const yearSpan = scope.querySelector('#current-year');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  }

  function appendScriptOnce(src) {
    const absolute = new URL(src, window.location.href).href;
    const existing = Array.from(document.scripts).some(script => script.src === absolute);
    if (existing) {
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    document.body.appendChild(script);
  }

  function loadHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder) {
      return;
    }

    const prefix = getPagePrefix();
    headerPlaceholder.innerHTML = buildHeader(prefix);
  }

  function loadFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (!footerPlaceholder) {
      return;
    }

    const prefix = getPagePrefix();
    footerPlaceholder.innerHTML = buildFooter(prefix);
    setCurrentYear(footerPlaceholder);
    appendScriptOnce(prefix + 'js/cookie-consent.js');
  }

  function init() {
    injectThemeOverrides();
    loadHeader();
    loadFooter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
