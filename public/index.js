// wageData.sort((a, b) => a.country.localeCompare(b.country));

function convertCurrency(amount, exchangeRate) {
    return amount * exchangeRate;
}

function updateConvertedAmount(convertedAmount) {
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `
    <span style="font-size:1.3rem;color:#2563eb;font-weight:bold;">Converted Amount:</span><br><span style="font-size:1.5rem;">${
        convertedAmount.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>`;
}

// Helper to get flag image URL from country name
function getFlagImageUrl(country) {
    // isoMap is now loaded from data.js
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

// Helper: country to currency code (expand as needed)
const countryCurrencyMap = {
    'Turkey': 'TRY',
    'USA': 'USD',
    'UK': 'GBP',
    'Germany': 'EUR',
    'France': 'EUR',
    'Russia': 'RUB',
    'Japan': 'JPY',
    'Guyana': 'GYD',
    'Luxembourg': 'EUR',
    'Belgium': 'EUR',
    'Ireland': 'EUR',
};

// Sorting state (no button selected by default)
let currentSort = { by: null, asc: true };

// Helper to sort prices array
function sortPrices(prices, by, asc = true) {
    const sorted = [...prices];
    sorted.sort((a, b) => {
        if (by === 'country') {
            return asc
                ? a.country.localeCompare(b.country)
                : b.country.localeCompare(a.country);
        } else if (by === 'price') {
            return asc ? a.price - b.price : b.price - a.price;
        }
        return 0;
    });
    return sorted;
}

// Enhance: highlight active sort button
function updateSortButtonStyles() {
    const sortCountryBtn = document.getElementById('sort-country-btn');
    const sortPriceBtn = document.getElementById('sort-price-btn');
    if (sortCountryBtn) {
        if (currentSort.by === 'country') {
            sortCountryBtn.style.background = '#e53935';
            sortCountryBtn.style.color = '#fff';
            sortCountryBtn.innerHTML = `Country ${currentSort.asc ? '▲' : '▼'}`;
        } else {
            sortCountryBtn.style.background = '#fff';
            sortCountryBtn.style.color = '#333';
            sortCountryBtn.innerHTML = 'Country';
        }
    }
    if (sortPriceBtn) {
        if (currentSort.by === 'price') {
            sortPriceBtn.style.background = '#e53935';
            sortPriceBtn.style.color = '#fff';
            sortPriceBtn.innerHTML = `Price ${currentSort.asc ? '▲' : '▼'}`;
        } else {
            sortPriceBtn.style.background = '#fff';
            sortPriceBtn.style.color = '#333';
            sortPriceBtn.innerHTML = 'Price';
        }
    }
}

function renderTable(prices, currency, shownCount = 5, userPrice = null, searchTerm = '') {
    const container = document.getElementById('result-table-container');
    // Search box
    let html = `
    <div style="margin-bottom:1rem;display:flex;align-items:center;gap:0.7rem;">
      <input id="country-search-box" type="text" placeholder="Search country..." style="flex:1;padding:0.5rem 1rem;border-radius:6px;border:1px solid #e2e8f0;font-size:1rem;">
    </div>
    `;

    // Sorting controls
    html += `
    <div style="margin-bottom:0.7rem;display:flex;gap:1rem;align-items:center;">
      <span style="font-weight:bold;">Order by:</span>
      <button id="sort-country-btn" style="padding:0.3rem 1rem;border-radius:6px;border:1px solid #e2e8f0;background:#fff;color:#333;font-weight:bold;cursor:pointer;">Country</button>
      <button id="sort-price-btn" style="padding:0.3rem 1rem;border-radius:6px;border:1px solid #e2e8f0;background:#fff;color:#333;font-weight:bold;cursor:pointer;">Price</button>
    </div>
    `;

    // Filter prices by search term
    let filteredPrices = prices;
    if (searchTerm && searchTerm.trim() !== '') {
        const term = searchTerm.trim().toLowerCase();
        filteredPrices = prices.filter(p => p.country.toLowerCase().includes(term));
    }

    // Sort prices before rendering
    let sortedPrices = filteredPrices;
    if (currentSort.by) {
        sortedPrices = sortPrices(filteredPrices, currentSort.by, currentSort.asc);
    }

    // Set a fixed height and enable vertical scroll for the table container
    html += `
    <div style="display:flex;flex-direction:column;align-items:center;width:100%;position:relative;">
      <div id="table-scroll-container" style="max-width:1000px;width:100%;margin:0 auto;overflow-x:auto;overflow-y:auto;max-height:60vh;min-height:100px;border-radius:12px;box-shadow:0 2px 8px rgba(223, 48, 25, 0.04);background:#fff;position:relative;">
        <table style="width:100%;min-width:780px;border-collapse:collapse;text-align:center;">
            <thead>
                <tr style="background:#f4f6fb;">
                    <th style="padding:8px 12px;border-bottom:1px solid #e2e8f0;">Flag</th>
                    <th style="padding:8px 12px;border-bottom:1px solid #e2e8f0;">Country</th>
                    <th style="padding:8px 12px;border-bottom:1px solid #e2e8f0;">Price (${currency})</th>
                    <th style="padding:8px 12px;border-bottom:1px solid #e2e8f0;">Local Price</th>
                    <th style="padding:8px 12px;border-bottom:1px solid #e2e8f0;">Profit %</th>
                </tr>
            </thead>
            <tbody>`;
    sortedPrices.slice(0, shownCount).forEach(({ country, flagUrl, price }) => {
        const localWage = wageData.find(w => w.country === country)?.wage || 0;
        const localCurrency = countryCurrencyMap[country] || currency;
        let profitPercent = 0;
        if (userPrice && userPrice !== 0) {
            profitPercent = ((price - userPrice) / userPrice) * 100;
        }
        html += `<tr>
            <td style="font-size:2rem;padding:8px 12px;">${flagUrl ? `<img src="${flagUrl}" alt="${country} flag" style="width:32px;height:24px;border-radius:4px;box-shadow:0 1px 4px rgba(0,0,0,0.08);">` : ''}</td>
            <td style="padding:8px 12px;">${country}</td>
            <td style="font-weight:bold;padding:8px 12px;">${price.toFixed(2)} ${currency}</td>
            <td style="font-weight:bold;padding:8px 12px;">${localWage.toLocaleString(undefined, { style: 'currency', currency: localCurrency })}</td>
            <td style="font-weight:bold;padding:8px 12px;color:${profitPercent >= 0 ? '#388e3c' : '#d32f2f'};">${profitPercent.toFixed(1)}%</td>
        </tr>`;
    });
    html += '</tbody></table>';
    // Move Show More button inside scroll container, sticky at bottom
    if (filteredPrices.length > shownCount) {
        html += `<div style="position:sticky;bottom:0;z-index:2;background:#fff;display:flex;justify-content:center;width:100%;box-shadow:0 -2px 8px rgba(229,57,53,0.06);">
          <button id="show-more-btn" style="margin:0.5rem 0 0.5rem 0;padding:0.7rem 1.5rem;font-size:1rem;background:linear-gradient(90deg,#e53935 0%,#d32f2f 100%);color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:bold;box-shadow:0 2px 8px rgba(229,57,53,0.12);transition:background 0.2s;">↓ Show More ↓</button>
        </div>`;
    }
    html += `</div>`; // close table-scroll-container
    html += `</div>`; // close flex wrapper
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

    container.innerHTML = html;

    // Sorting button events
    const sortCountryBtn = document.getElementById('sort-country-btn');
    const sortPriceBtn = document.getElementById('sort-price-btn');
    if (sortCountryBtn) {
        sortCountryBtn.onclick = function () {
            if (currentSort.by === 'country') {
                currentSort.asc = !currentSort.asc;
            } else {
                currentSort.by = 'country';
                currentSort.asc = true;
            }
            renderTable(prices, currency, shownCount, userPrice, document.getElementById('country-search-box').value);
            updateSortButtonStyles();
        };
    }
    if (sortPriceBtn) {
        sortPriceBtn.onclick = function () {
            if (currentSort.by === 'price') {
                currentSort.asc = !currentSort.asc;
            } else {
                currentSort.by = 'price';
                currentSort.asc = false;
            }
            renderTable(prices, currency, shownCount, userPrice, document.getElementById('country-search-box').value);
            updateSortButtonStyles();
        };
    }
    // Set initial sort button styles
    updateSortButtonStyles();

    // Add event listener for Show More
    if (typeof window.paypalModalClosed === 'undefined') window.paypalModalClosed = false;
    let shownCountCurrent = shownCount;
    const showMoreBtn = document.getElementById('show-more-btn');
    if (showMoreBtn) {
        showMoreBtn.onclick = function () {
            shownCountCurrent += 10;
            renderTable(prices, currency, shownCountCurrent, userPrice, document.getElementById('country-search-box').value);
            if (!window.paypalModalClosed) {
                const modal = document.getElementById('paypal-modal');
                modal.style.display = 'flex';
                modal.style.justifyContent = 'center';
                modal.style.alignItems = 'center';
            }
        };
    }

    // Search box event
    const searchBox = document.getElementById('country-search-box');
    if (searchBox) {
        searchBox.value = searchTerm || '';
        searchBox.oninput = function () {
            // When searching, show all matches (no paging)
            renderTable(prices, currency, 1000, userPrice, searchBox.value);
        };
    }

    // Add event delegation for closing modal
    document.addEventListener('click', function (event) {
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
        howBtn.onclick = function () {
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
        currencySelect.innerHTML = '<option value="€">EUR - Euro</option><option value="$">USD - US Dollar</option>';
    }
    const priceInput = document.getElementById('price');
    const form = document.getElementById('price-form');
    const calculateBtn = form.querySelector('button[type="submit"]');

    // Group the label+input/select for hiding
    const homeCountryLabel = form.querySelector('label[for="home-country"]');
    const priceLabel = form.querySelector('label[for="price"]');
    const currencyLabel = form.querySelector('label[for="currency"]');

    function setFormFieldsVisible(visible) {
        // Hide/show label and input/select together
        [homeCountryLabel, homeCountrySelect, priceLabel, priceInput, currencyLabel, currencySelect].forEach(el => {
            if (el) el.style.display = visible ? '' : 'none';
        });
    }

    // Initial state
    setFormFieldsVisible(true);
    calculateBtn.textContent = 'Calculate Regional Prices';

    function resetForm() {
        setFormFieldsVisible(true);
        calculateBtn.textContent = 'Calculate Regional Prices';
        form.reset();
        document.getElementById('result-table-container').innerHTML = '';
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (calculateBtn.textContent === 'New Search') {
            resetForm();
            return;
        }
        const spinner = document.getElementById('spinner');
        spinner.style.display = 'block';
        setTimeout(() => {
            const price = parseFloat(priceInput.value);
            const currency = currencySelect.value;
            const homeCountry = homeCountrySelect.value;
            const prices = calculateRelativePrices(price, homeCountry);
            renderTable(prices, currency, 6, price, '');
            spinner.style.display = 'none';
            setFormFieldsVisible(false);
            calculateBtn.textContent = 'New Search';
        }, 400);
    });

});