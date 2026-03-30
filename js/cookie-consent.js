(function () {
  'use strict';

  const STORAGE_KEY = 'regionalprice_cookie_consent_v1';
  const GA_MEASUREMENT_ID = window.RP_ANALYTICS_ID || 'G-0GPLWP4J43';
  let analyticsLoaded = false;

  function getPagePrefix() {
    const path = (window.location.pathname || '').replace(/\\/g, '/');
    return /\/blog(\/|$)/i.test(path) ? '../' : '';
  }

  function getStoredConsent() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      console.warn('Cookie consent state could not be read.', error);
      return null;
    }
  }

  function storeConsent(status) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
        status: status,
        updatedAt: new Date().toISOString()
      }));
    } catch (error) {
      console.warn('Cookie consent state could not be saved.', error);
    }
  }

  function ensureAnalytics() {
    if (analyticsLoaded || !GA_MEASUREMENT_ID) {
      return;
    }

    analyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

    window.gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });

    window.gtag('js', new Date());

    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_MEASUREMENT_ID);
    document.head.appendChild(gtagScript);

    window.gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true
    });
  }

  function buildBanner() {
    if (document.getElementById('rp-cookie-banner')) {
      return;
    }

    const banner = document.createElement('div');
    banner.id = 'rp-cookie-banner';
    banner.innerHTML = `
      <div class="rp-cookie-banner__card" role="dialog" aria-live="polite" aria-label="Cookie preferences">
        <p class="rp-cookie-banner__eyebrow">Privacy Choices</p>
        <h2>Cookies on Regional Price Calculator</h2>
        <p>We only use essential site storage by default. Analytics stays off unless you explicitly accept it.</p>
        <p class="rp-cookie-banner__links">
          <a href="${getPagePrefix()}privacy.html">Privacy Policy</a>
          <a href="${getPagePrefix()}cookie-policy.html">Cookie Policy</a>
        </p>
        <div class="rp-cookie-banner__actions">
          <button type="button" class="rp-cookie-btn rp-cookie-btn--primary" data-cookie-choice="accepted">Accept Analytics</button>
          <button type="button" class="rp-cookie-btn rp-cookie-btn--secondary" data-cookie-choice="rejected">Reject Non-Essential</button>
        </div>
      </div>
    `;

    let style = document.getElementById('rp-cookie-banner-style');
    if (!style) {
      style = document.createElement('style');
      style.id = 'rp-cookie-banner-style';
      style.textContent = `
      #rp-cookie-banner {
        position: fixed;
        left: 20px;
        bottom: 20px;
        z-index: 9999;
        width: min(420px, calc(100vw - 32px));
      }
      .rp-cookie-banner__card {
        background: #0f172a;
        color: #e2e8f0;
        border: 1px solid rgba(148, 163, 184, 0.22);
        border-radius: 20px;
        box-shadow: 0 24px 60px rgba(2, 6, 23, 0.35);
        padding: 22px 20px;
      }
      .rp-cookie-banner__card h2 {
        color: #f8fafc;
        font-size: 1.2rem;
        margin-bottom: 0.75rem;
      }
      .rp-cookie-banner__card p {
        color: #cbd5e1;
        margin-bottom: 0.9rem;
        line-height: 1.6;
      }
      .rp-cookie-banner__eyebrow {
        text-transform: uppercase;
        letter-spacing: 0.16em;
        font-size: 0.72rem;
        color: #f2b489;
        font-weight: 700;
      }
      .rp-cookie-banner__links {
        display: flex;
        flex-wrap: wrap;
        gap: 14px;
      }
      .rp-cookie-banner__links a {
        color: #f2b489;
        font-weight: 600;
      }
      .rp-cookie-banner__actions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 1rem;
      }
      .rp-cookie-btn {
        border: 0;
        border-radius: 999px;
        cursor: pointer;
        font-weight: 700;
        padding: 0.8rem 1.2rem;
      }
      .rp-cookie-btn--primary {
        background: #ef4444;
        color: #fff;
      }
      .rp-cookie-btn--secondary {
        background: #e2e8f0;
        color: #0f172a;
      }
      #rp-cookie-settings-button {
        position: fixed;
        left: 20px;
        bottom: 20px;
        z-index: 9998;
        border: 0;
        border-radius: 999px;
        background: #0f172a;
        color: #f8fafc;
        box-shadow: 0 16px 36px rgba(2, 6, 23, 0.28);
        cursor: pointer;
        font-size: 0.95rem;
        font-weight: 700;
        padding: 0.8rem 1.1rem;
      }
      #rp-cookie-settings-button.is-hidden {
        display: none;
      }
      @media (max-width: 767px) {
        #rp-cookie-banner,
        #rp-cookie-settings-button {
          left: 16px;
          right: 16px;
          width: auto;
        }
        .rp-cookie-btn {
          width: 100%;
        }
      }
    `;
      document.head.appendChild(style);
    }

    document.body.appendChild(banner);

    banner.addEventListener('click', function (event) {
      const button = event.target.closest('[data-cookie-choice]');
      if (!button) {
        return;
      }

      applyConsent(button.getAttribute('data-cookie-choice'));
    });
  }

  function removeBanner() {
    const banner = document.getElementById('rp-cookie-banner');
    if (banner) {
      banner.remove();
    }
  }

  function ensureSettingsButton() {
    if (document.getElementById('rp-cookie-settings-button')) {
      return;
    }

    const button = document.createElement('button');
    button.id = 'rp-cookie-settings-button';
    button.type = 'button';
    button.textContent = 'Cookie Settings';
    button.addEventListener('click', function () {
      removeBanner();
      buildBanner();
      button.classList.add('is-hidden');
    });

    document.body.appendChild(button);
  }

  function syncSettingsButton() {
    const button = document.getElementById('rp-cookie-settings-button');
    const banner = document.getElementById('rp-cookie-banner');
    if (!button) {
      return;
    }

    button.classList.toggle('is-hidden', Boolean(banner));
  }

  function applyConsent(status) {
    storeConsent(status);
    removeBanner();
    if (status === 'accepted') {
      ensureAnalytics();
    }
    syncSettingsButton();
  }

  function initCookieConsent() {
    ensureSettingsButton();

    const consent = getStoredConsent();
    if (consent && consent.status === 'accepted') {
      ensureAnalytics();
    } else if (!consent || consent.status !== 'rejected') {
      buildBanner();
    }

    syncSettingsButton();
  }

  window.openCookiePreferences = function () {
    removeBanner();
    buildBanner();
    syncSettingsButton();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookieConsent);
  } else {
    initCookieConsent();
  }
})();
