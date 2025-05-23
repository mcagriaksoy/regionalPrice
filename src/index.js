// Sort wageData alphabetically by country
const wageData = [
    { country: 'Switzerland', wage: 4215.55 },
    { country: 'Australia', wage: 2461.53 },
    { country: 'New Zealand', wage: 2452.02 },
    { country: 'Luxembourg', wage: 2438.65 },
    { country: 'UK', wage: 1952.7 },
    { country: 'Belgium', wage: 1942.04 },
    { country: 'Ireland', wage: 1870.59 },
    { country: 'Netherlands', wage: 1851.3 },
    { country: 'Germany', wage: 1838.44 },
    { country: 'France', wage: 1734.69 },
    { country: 'San Marino', wage: 1680.88 },
    { country: 'Israel', wage: 1640.77 },
    { country: 'South Korea', wage: 1593.14 },
    { country: 'Japan', wage: 1468.73 },
    { country: 'USA', wage: 1256.67 },
    { country: 'Spain', wage: 1229.84 },
    { country: 'Slovenia', wage: 1132.61 },
    { country: 'Cyprus', wage: 917.11 },
    { country: 'The Bahamas', wage: 910 },
    { country: 'Greece', wage: 876.87 },
    { country: 'Portugal', wage: 867.04 },
    { country: 'Oman', wage: 845.25 },
    { country: 'Malta', wage: 835.16 },
    { country: 'Lithuania', wage: 769.53 },
    { country: 'Barbados', wage: 736.67 },
    { country: 'Palau', wage: 728 },
    { country: 'Estonia', wage: 689.41 },
    { country: 'Slovakia', wage: 680.98 },
    { country: 'Iran', wage: 632.26 },
    { country: 'Antigua and Barbuda', wage: 631.7 },
    { country: 'Marshall Islands', wage: 624 },
    { country: 'Dominica', wage: 577.78 },
    { country: 'Saint Kitts and Nevis', wage: 577.78 },
    { country: 'Montenegro', wage: 561.38 },
    { country: 'Trinidad and Tobago', wage: 538.58 },
    { country: 'Latvia', wage: 527.07 },
    { country: 'Argentina', wage: 482.64 },
    { country: 'Seychelles', wage: 465.4 },
    { country: 'Serbia', wage: 423.64 },
    { country: 'Saint Vincent and the Grenadines', wage: 385.19 },
    { country: 'Jordan', wage: 366.2 },
    { country: 'Guatemala', wage: 365.26 },
    { country: 'Grenada', wage: 337.04 },
    { country: 'Fiji', wage: 329.48 },
    { country: 'Libya', wage: 321.83 },
    { country: 'Belize', wage: 321.75 },
    { country: 'Morocco', wage: 314.7 },
    { country: 'Albania', wage: 282.48 },
    { country: 'Qatar', wage: 274.73 },
    { country: 'Gabon', wage: 270.5 },
    { country: 'Thailand', wage: 249.2 },
    { country: 'Kuwait', wage: 248.64 },
    { country: 'Iraq', wage: 241.38 },
    { country: 'Peru', wage: 239.66 },
    { country: 'Ukraine', wage: 212.72 },
    { country: 'Russia', wage: 212.6 },
    { country: 'Guyana', wage: 211.99 },
    { country: 'Equatorial Guinea', wage: 211.54 },
    { country: 'Papua New Guinea', wage: 207.48 },
    { country: 'Solomon Islands', wage: 204.58 },
    { country: 'Kiribati', wage: 203.12 },
    { country: 'Cambodia', wage: 194 },
    { country: 'Suriname', wage: 181.97 },
    { country: 'Belarus', wage: 178.78 },
    { country: 'Azerbaijan', wage: 176.47 },
    { country: 'Indonesia', wage: 174.96 },
    { country: 'Vietnam', wage: 168.26 },
    { country: 'Armenia', wage: 153.22 },
    { country: 'Philippines', wage: 148.86 },
    { country: 'Mongolia', wage: 147.41 },
    { country: 'Haiti', wage: 145.7 },
    { country: 'Algeria', wage: 140.14 },
    { country: 'Cape Verde', wage: 139.46 },
    { country: 'Comoros', wage: 132.23 },
    { country: 'Kenya', wage: 130.57 },
    { country: 'Nepal', wage: 126.97 },
    { country: 'Pakistan', wage: 116.63 },
    { country: 'East Timor', wage: 115 },
    { country: 'Mozambique', wage: 113.8 },
    { country: 'Lesotho', wage: 109.62 },
    { country: 'Chad', wage: 108.2 },
    { country: 'Kazakhstan', wage: 99.79 },
    { country: 'Democratic Republic of the Congo', wage: 92.47 },
    { country: 'Myanmar', wage: 90.33 },
    { country: 'Senegal', wage: 88.39 },
    { country: 'Uzbekistan', wage: 83.5 },
    { country: 'Afghanistan', wage: 71.6 },
    { country: 'Angola', wage: 71.17 },
    { country: 'Sierra Leone', wage: 65.87 },
    { country: 'Central African Republic', wage: 63.12 },
    { country: 'Bhutan', wage: 62.82 },
    { country: 'India', wage: 62.61 },
    { country: 'Tanzania', wage: 61.48 },
    { country: 'Togo', wage: 56.25 },
    { country: 'Ghana', wage: 56.11 },
    { country: 'Niger', wage: 54.18 },
    { country: 'Tajikistan', wage: 52.46 },
    { country: 'Malawi', wage: 46.7 },
    { country: 'Sri Lanka', wage: 39.75 },
    { country: 'Guinea-Bissau', wage: 34.32 },
    { country: 'Eswatini', wage: 28.41 },
    { country: 'The Gambia', wage: 25.25 },
    { country: 'Kyrgyzstan', wage: 21.9 },
    { country: 'Bangladesh', wage: 16.58 },
    { country: 'Georgia', wage: 6.21 },
    { country: 'Rwanda', wage: 2.54 },
    { country: 'Uganda', wage: 1.63 }
];
wageData.sort((a, b) => a.country.localeCompare(b.country));

function convertCurrency(amount, exchangeRate) {
    return amount * exchangeRate;
}

function updateConvertedAmount(convertedAmount) {
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `<span style="font-size:1.3rem;color:#2563eb;font-weight:bold;">Converted Amount:</span><br><span style="font-size:1.5rem;">${convertedAmount.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>`;
}

// Helper to get flag image URL from country name
function getFlagImageUrl(country) {
    const isoMap = {
        'Estonia': 'ee', 'Australia': 'au', 'Turkey': 'tr', 'Germany': 'de', 'USA': 'us', 'France': 'fr', 'UK': 'gb', 'Russia': 'ru', 'Japan': 'jp', 'Guyana': 'gy',
        'New Zealand': 'nz', 'Luxembourg': 'lu', 'Belgium': 'be', 'Ireland': 'ie', 'Netherlands': 'nl', 'San Marino': 'sm', 'Israel': 'il', 'South Korea': 'kr',
        'Spain': 'es', 'Slovenia': 'si', 'Cyprus': 'cy', 'The Bahamas': 'bs', 'Greece': 'gr', 'Portugal': 'pt', 'Oman': 'om', 'Malta': 'mt', 'Lithuania': 'lt',
        'Barbados': 'bb', 'Palau': 'pw', 'Slovakia': 'sk', 'Iran': 'ir', 'Antigua and Barbuda': 'ag', 'Marshall Islands': 'mh', 'Dominica': 'dm',
        'Saint Kitts and Nevis': 'kn', 'Montenegro': 'me', 'Trinidad and Tobago': 'tt', 'Latvia': 'lv', 'Argentina': 'ar', 'Seychelles': 'sc', 'Serbia': 'rs',
        'Saint Vincent and the Grenadines': 'vc', 'Jordan': 'jo', 'Guatemala': 'gt', 'Grenada': 'gd', 'Fiji': 'fj', 'Libya': 'ly', 'Belize': 'bz',
        'Morocco': 'ma', 'Albania': 'al', 'Qatar': 'qa', 'Gabon': 'ga', 'Thailand': 'th', 'Kuwait': 'kw', 'Iraq': 'iq', 'Peru': 'pe', 'Ukraine': 'ua',
        'Russia': 'ru', 'Guyana': 'gy', 'Equatorial Guinea': 'gq', 'Papua New Guinea': 'pg', 'Solomon Islands': 'sb', 'Kiribati': 'ki', 'Cambodia': 'kh',
        'Suriname': 'sr', 'Belarus': 'by', 'Azerbaijan': 'az', 'Indonesia': 'id', 'Vietnam': 'vn', 'Armenia': 'am', 'Philippines': 'ph', 'Mongolia': 'mn',
        'Haiti': 'ht', 'Algeria': 'dz', 'Cape Verde': 'cv', 'Comoros': 'km', 'Kenya': 'ke', 'Nepal': 'np', 'Pakistan': 'pk', 'East Timor': 'tl',
        'Mozambique': 'mz', 'Lesotho': 'ls', 'Chad': 'td', 'Kazakhstan': 'kz', 'Democratic Republic of the Congo': 'cd', 'Myanmar': 'mm', 'Senegal': 'sn',
        'Uzbekistan': 'uz', 'Afghanistan': 'af', 'Angola': 'ao', 'Sierra Leone': 'sl', 'Central African Republic': 'cf', 'Bhutan': 'bt', 'India': 'in',
        'Tanzania': 'tz', 'Togo': 'tg', 'Ghana': 'gh', 'Niger': 'ne', 'Tajikistan': 'tj', 'Malawi': 'mw', 'Sri Lanka': 'lk', 'Guinea-Bissau': 'gw',
        'Eswatini': 'sz', 'The Gambia': 'gm', 'Kyrgyzstan': 'kg', 'Bangladesh': 'bd', 'Georgia': 'ge', 'Rwanda': 'rw', 'Uganda': 'ug'
    };
    let code = isoMap[country];
    if (!code) return null;
    return `https://flagcdn.com/48x36/${code}.png`;
}

function calculateRelativePrices(userPrice, userCountry) {
    const home = wageData.find(w => w.country === userCountry);
    if (!home) return [];
    return wageData.map(w => ({
        country: w.country,
        flagUrl: getFlagImageUrl(w.country),
        price: (userPrice / home.wage) * w.wage
    }));
}

function renderTable(prices, currency, shownCount = 5) {
    const container = document.getElementById('result-table-container');
    let html = `<div id="table-scroll-container" style="max-height:60vh;overflow-y:auto;border-radius:12px;box-shadow:0 2px 8px rgba(223, 48, 25, 0.04);">
    <table style="width:100%;border-collapse:collapse;text-align:center;">
        <thead>
            <tr style="background:#f4f6fb;">
                <th style="padding:8px;border-bottom:1px solid #e2e8f0;">Flag</th>
                <th style="padding:8px;border-bottom:1px solid #e2e8f0;">Country</th>
                <th style="padding:8px;border-bottom:1px solid #e2e8f0;">Price (${currency})</th>
            </tr>
        </thead>
        <tbody>`;
    prices.slice(0, shownCount).forEach(({ country, flagUrl, price }) => {
        html += `<tr>
            <td style="font-size:2rem;">${flagUrl ? `<img src="${flagUrl}" alt="${country} flag" style="width:32px;height:24px;border-radius:4px;box-shadow:0 1px 4px rgba(0,0,0,0.08);">` : ''}</td>
            <td>${country}</td>
            <td style="font-weight:bold;">${price.toFixed(2)} ${currency}</td>
        </tr>`;
    });
    html += '</tbody></table></div>';
    if (prices.length > shownCount) {
        html += `<button id="show-more-btn" style="margin-top:1rem;padding:0.7rem 1.5rem;font-size:1rem;background:linear-gradient(90deg,#e53935 0%,#d32f2f 100%);color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:bold;box-shadow:0 2px 8px rgba(229,57,53,0.12);transition:background 0.2s;">↓ Show More ↓</button>`;
    }
    // Modal for PayPal donation
    html += `
    <div id="paypal-modal" style="display:none;position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(229,57,53,0.12);z-index:1000;justify-content:center;align-items:center;">
      <div style="background:#fff;padding:2rem 2.5rem;border-radius:16px;box-shadow:0 4px 24px rgba(229,57,53,0.15);max-width:350px;text-align:center;position:relative;">
        <button id="close-paypal-modal" style="position:absolute;top:10px;right:10px;background:#fff;border:2px solid #e53935;border-radius:50%;font-size:1.7rem;cursor:pointer;line-height:1;width:38px;height:38px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(229,57,53,0.12);color:#d32f2f;z-index:10;">&#10005;</button>
        <h3 style="margin-bottom:1rem;color:#d32f2f;">Support this project!</h3>
        <p style="margin-bottom:1.5rem;">If you find this tool useful, consider donating via PayPal to support further development.</p>
        <form action="https://www.paypal.com/donate" method="post" target="_top">
<input type="hidden" name="hosted_button_id" value="QD5J7HPVUXW5G" />
<input type="image" style="width:150px;" src="https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
<img alt="" border="0" src="https://www.paypal.com/en_DE/i/scr/pixel.gif" width="1" height="1" />
</form>
 </div>
    </div>`;
    // How to use modal and button
    html += `
    <button id="how-to-use-btn" style="position:fixed;top:40px;right:18px;z-index:1200;padding:0.5rem 1.1rem;font-size:1.1rem;background:linear-gradient(90deg,#e53935 0%,#d32f2f 100%);color:#fff;border:none;border-radius:20px;cursor:pointer;font-weight:bold;box-shadow:0 2px 8px rgba(229,57,53,0.18);letter-spacing:0.02em;">?</button>
    <div id="how-to-use-modal" style="display:none;position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(229,57,53,0.10);z-index:2000;justify-content:center;align-items:center;">
      <div style="background:#fff;padding:2rem 2.5rem;border-radius:16px;box-shadow:0 4px 24px rgba(229,57,53,0.15);max-width:400px;text-align:left;position:relative;">
        <button id="close-how-to-use-modal" style="position:absolute;top:10px;right:10px;background:#fff;border:2px solid #e53935;border-radius:50%;font-size:1.7rem;cursor:pointer;line-height:1;width:38px;height:38px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(229,57,53,0.12);color:#d32f2f;z-index:10;">&#10005;</button>
        <h3 style="margin-bottom:1rem;color:#d32f2f;">How to use</h3>
        <ul style="padding-left:1.2em;">
          <li>1. Select your country and enter the price you want to compare.</li>
          <li>2. Choose the currency (EUR or USD).</li>
          <li>3. Click 'Calculate Regional Prices' to see the comparison table.</li>
          <li>4. Use 'Show More' to see more countries.</li>
        </ul>
      </div>
    </div>`;
    container.innerHTML = html;
    // Add event listener for Show More
    if (typeof window.paypalModalClosed === 'undefined') window.paypalModalClosed = false;
    let shownCountCurrent = shownCount;
    const showMoreBtn = document.getElementById('show-more-btn');
    if (showMoreBtn) {
        showMoreBtn.onclick = function() {
            shownCountCurrent += 10;
            renderTable(prices, currency, shownCountCurrent);
            if (!window.paypalModalClosed) {
                const modal = document.getElementById('paypal-modal');
                modal.style.display = 'flex';
                modal.style.justifyContent = 'center';
                modal.style.alignItems = 'center';
            }
        };
    }
    // Add event delegation for closing modal
    document.addEventListener('click', function(event) {
        const modal = document.getElementById('paypal-modal');
        if (modal && modal.style.display !== 'none') {
            if (event.target && event.target.id === 'close-paypal-modal') {
                modal.style.display = 'none';
                window.paypalModalClosed = true;
            }
            if (event.target && event.target.id === 'paypal-modal') {
                modal.style.display = 'none';
                window.paypalModalClosed = true;
            }
        }
        // How to use modal
        const howModal = document.getElementById('how-to-use-modal');
        if (howModal && howModal.style.display !== 'none') {
            if (event.target && event.target.id === 'close-how-to-use-modal') {
                howModal.style.display = 'none';
            }
            if (event.target && event.target.id === 'how-to-use-modal') {
                howModal.style.display = 'none';
            }
        }
    });
    // How to use button
    const howBtn = document.getElementById('how-to-use-btn');
    if (howBtn) {
        howBtn.onclick = function() {
            const howModal = document.getElementById('how-to-use-modal');
            howModal.style.display = 'flex';
            howModal.style.justifyContent = 'center';
            howModal.style.alignItems = 'center';
        };
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Populate home-country select dynamically
    const homeCountrySelect = document.getElementById('home-country');
    homeCountrySelect.innerHTML = wageData.map(w => `<option value="${w.country}">${w.country}</option>`).join('');
    // Populate currency select if needed
    const currencySelect = document.getElementById('currency');
    if (currencySelect && currencySelect.options.length === 0) {
        currencySelect.innerHTML = '<option value="EUR">EUR - Euro</option><option value="USD">USD - US Dollar</option>';
    }
    const form = document.getElementById('price-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const spinner = document.getElementById('spinner');
        spinner.style.display = 'block';
        setTimeout(() => {
            const price = parseFloat(document.getElementById('price').value);
            const currency = document.getElementById('currency').value;
            const homeCountry = document.getElementById('home-country').value;
            const prices = calculateRelativePrices(price, homeCountry);
            renderTable(prices, currency, 6);
            spinner.style.display = 'none';
        }, 400);
    });
    // Add How to use button and modal to body if not present
    if (!document.getElementById('how-to-use-btn')) {
        const howBtn = document.createElement('button');
        howBtn.id = 'how-to-use-btn';
        howBtn.innerHTML = '?';
        howBtn.style.position = 'fixed';
        howBtn.style.top = '40px';
        howBtn.style.right = '18px';
        howBtn.style.zIndex = '1200';
        howBtn.style.padding = '0.5rem 1.1rem';
        howBtn.style.fontSize = '1.1rem';
        howBtn.style.background = 'linear-gradient(90deg,#e53935 0%,#d32f2f 100%)';
        howBtn.style.color = '#fff';
        howBtn.style.border = 'none';
        howBtn.style.borderRadius = '20px';
        howBtn.style.cursor = 'pointer';
        howBtn.style.fontWeight = 'bold';
        howBtn.style.boxShadow = '0 2px 8px rgba(229,57,53,0.18)';
        howBtn.style.letterSpacing = '0.02em';
        document.body.appendChild(howBtn);
    }
    if (!document.getElementById('how-to-use-modal')) {
        const howModal = document.createElement('div');
        howModal.id = 'how-to-use-modal';
        howModal.style.display = 'none';
        howModal.style.position = 'fixed';
        howModal.style.top = '0';
        howModal.style.left = '0';
        howModal.style.width = '100vw';
        howModal.style.height = '100vh';
        howModal.style.background = 'rgba(229,57,53,0.10)';
        howModal.style.zIndex = '2000';
        howModal.style.justifyContent = 'center';
        howModal.style.alignItems = 'center';
        howModal.innerHTML = `
      <div style="background:#fff;padding:2rem 2.5rem;border-radius:16px;box-shadow:0 4px 24px rgba(229,57,53,0.15);max-width:400px;text-align:left;position:relative;">
        <button id="close-how-to-use-modal" style="position:absolute;top:10px;right:10px;background:#fff;border:2px solid #e53935;border-radius:50%;font-size:1.7rem;cursor:pointer;line-height:1;width:38px;height:38px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(229,57,53,0.12);color:#d32f2f;z-index:10;">&#10005;</button>
        <h3 style="margin-bottom:1rem;color:#d32f2f;">How to use</h3>
        <ul style="padding-left:1.2em;">
          <li>1. Select your country and enter the price you want to compare.</li>
          <li>2. Choose the currency (EUR or USD).</li>
          <li>3. Click 'Calculate Regional Prices' to see the comparison table.</li>
          <li>4. Use 'Show More' to see more countries.</li>
        </ul>
      </div>`;
        document.body.appendChild(howModal);
    }
    // How to use button event
    const howBtn = document.getElementById('how-to-use-btn');
    if (howBtn) {
        howBtn.onclick = function() {
            const howModal = document.getElementById('how-to-use-modal');
            howModal.style.display = 'flex';
            howModal.style.justifyContent = 'center';
            howModal.style.alignItems = 'center';
        };
    }
    // How to use modal close event
    document.addEventListener('click', function(event) {
        const howModal = document.getElementById('how-to-use-modal');
        if (howModal && howModal.style.display !== 'none') {
            if (event.target && event.target.id === 'close-how-to-use-modal') {
                howModal.style.display = 'none';
            }
            if (event.target && event.target.id === 'how-to-use-modal') {
                howModal.style.display = 'none';
            }
        }
    });
});