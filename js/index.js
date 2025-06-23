// --- Only keep the necessary code for the calculator ---

// Helper to get flag image URL from country name
function getFlagImageUrl(country) {
    let code = isoMap[country];
    if (!code) return null;
    return `https://flagcdn.com/48x36/${code}.png`;
}

// Calculate regional prices based on user input
function calculateRelativePrices(userPrice, userCountry, limitPercent = 80) {
    const home = wageData.find(w => w.country === userCountry);
    if (!home) return [];
    const limit = Math.abs(Number(limitPercent)) || 80;
    return wageData.map(w => {
        let rawPrice = userPrice / home.wage * w.wage;
        // Cap the price difference to ±limit%
        let minPrice = userPrice * (1 - limit / 100);
        let maxPrice = userPrice * (1 + limit / 100);
        let cappedPrice = Math.max(minPrice, Math.min(maxPrice, rawPrice));
        return {
            country: w.country,
            flagUrl: getFlagImageUrl(w.country),
            price: parseFloat(cappedPrice.toFixed(2))
        };
    });
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

// Add exchange rates (will be updated from remote API)
let exchangeRates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    TRY: 32.5,
    JPY: 157,
    RUB: 91,
    GYD: 209,
    // ...add more as needed
};

// Fetch exchange rates from remote API
function fetchExchangeRates() {
    // Use exchangerate.host for free, no API key needed
    fetch('https://api.exchangerate.host/latest?base=USD')
        .then(res => res.json())
        .then(data => {
            if (data && data.rates) {
                exchangeRates = { ...exchangeRates, ...data.rates };
            }
        })
        .catch(() => {
            // If fetch fails, keep hardcoded rates
        });
}

// Fetch rates on page load
fetchExchangeRates();

// Sorting state
let currentSort = { by: 'country', asc: true };

// Sort prices array
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

// Update sort button styles
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

// Render the results table
function renderTable(prices, currency, shownCount = 5, userPrice = null, searchTerm = '') {
    const container = document.getElementById('result-table-container');
    
    let html = `
    <div style="margin-bottom:1rem;">
        <input id="country-search-box" type="text" placeholder="Search country..." 
               style="width:100%;padding:0.5rem;border-radius:6px;border:1px solid #e2e8f0;">
    </div>
    <div style="margin-bottom:1rem;">
        <button id="sort-by-country" class="sort-btn" style="margin-right:10px;padding:8px 16px;border:1px solid #e2e8f0;border-radius:6px;cursor:pointer;">
            Sort by Country ↕
        </button>
        <button id="sort-by-price" class="sort-btn" style="padding:8px 16px;border:1px solid #e2e8f0;border-radius:6px;cursor:pointer;">
            Sort by Price ↕
        </button>
    </div>
    <div style="max-height:60vh;overflow-y:auto;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
        <table style="width:100%;border-collapse:collapse;background:white;">
            <thead>
                <tr style="background:#f8fafc;">
                    <th style="padding:12px;text-align:left;">Flag</th>
                    <th style="padding:12px;text-align:left;">Country</th>
                    <th style="padding:12px;text-align:right;">Price (${currency})</th>
                    <th style="padding:12px;text-align:right;">Local Price</th>
                    <th style="padding:12px;text-align:right;">Change %</th>
                </tr>
            </thead>
            <tbody>`;

    // Filter and sort prices
    let displayPrices = prices;
    if (searchTerm) {
        displayPrices = prices.filter(p => 
            p.country.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    // Apply current sort
    displayPrices = sortPrices(displayPrices, currentSort.by, currentSort.asc);
    
    displayPrices.slice(0, shownCount).forEach(({ country, flagUrl, price }) => {
        const changePercent = userPrice ? ((price - userPrice) / userPrice) * 100 : 0;
        const changeColor = changePercent >= 0 ? '#16a34a' : '#dc2626';
        const localCurrency = countryCurrencyMap[country] || currency;

        // Convert USD price to local currency using exchangeRates
        let localPrice = price;
        if (exchangeRates['USD'] && exchangeRates[localCurrency]) {
            localPrice = (price * (exchangeRates[localCurrency] / exchangeRates['USD']));
        }
        // Fallback: just show price if no rate
        localPrice = localPrice.toFixed(2);

        html += `
            <tr style="border-bottom:1px solid #e2e8f0;">
                <td style="padding:12px;">
                    ${flagUrl ? `<img src="${flagUrl}" alt="${country} flag" 
                     style="width:32px;height:24px;border-radius:4px;">` : ''}
                </td>
                <td style="padding:12px;">${country}</td>
                <td style="padding:12px;text-align:right;font-weight:500;">
                    ${price.toFixed(2)} ${currency}
                </td>
                <td style="padding:12px;text-align:right;font-weight:500;">
                    ${localPrice} ${localCurrency}
                </td>
                <td style="padding:12px;text-align:right;color:${changeColor};font-weight:500;">
                    ${changePercent > 0 ? '+' : ''}${changePercent.toFixed(1)}%
                </td>
            </tr>`;
    });
    
    html += `</tbody></table></div>`;
    
    if (displayPrices.length > shownCount) {
        html += `
        <div style="text-align:center;margin-top:1rem;">
            <button id="show-more-btn" style="background:#e53935;color:white;
                    padding:8px 16px;border:none;border-radius:6px;cursor:pointer;">
                Show More Results
            </button>
        </div>`;
    }
    
    container.innerHTML = html;
    container.classList.remove('d-none');

    // Add event listeners
    const searchBox = document.getElementById('country-search-box');
    if (searchBox) {
        searchBox.value = searchTerm;
        searchBox.oninput = (e) => {
            renderTable(prices, currency, shownCount, userPrice, e.target.value);
        };
    }

    const showMoreBtn = document.getElementById('show-more-btn');
    if (showMoreBtn) {
        showMoreBtn.onclick = () => {
            renderTable(prices, currency, shownCount + 10, userPrice, searchTerm);
        };
    }

    // Add sorting button event listeners
    const sortCountryBtn = document.getElementById('sort-by-country');
    const sortPriceBtn = document.getElementById('sort-by-price');
    
    if (sortCountryBtn) {
        sortCountryBtn.onclick = () => {
            if (currentSort.by === 'country') {
                currentSort.asc = !currentSort.asc;
            } else {
                currentSort.by = 'country';
                currentSort.asc = true;
            }
            renderTable(prices, currency, shownCount, userPrice, searchTerm);
        };
    }
    
    if (sortPriceBtn) {
        sortPriceBtn.onclick = () => {
            if (currentSort.by === 'price') {
                currentSort.asc = !currentSort.asc;
            } else {
                currentSort.by = 'price';
                currentSort.asc = true;
            }
            renderTable(prices, currency, shownCount, userPrice, searchTerm);
        };
    }
}

// Populate country dropdown when page loads
document.addEventListener('DOMContentLoaded', function() {
    const homeCountrySelect = document.getElementById('home-country');
    const currencySelect = document.getElementById('currency');
    
    // Populate countries dropdown
    if (homeCountrySelect) {
        wageData.sort((a, b) => a.country.localeCompare(b.country))
               .forEach(country => {
            const option = document.createElement('option');
            option.value = country.country;
            option.textContent = country.country;
            homeCountrySelect.appendChild(option);
        });
    }
    
    // Add basic currencies
    if (currencySelect) {
        ['USD', 'EUR', 'GBP', 'JPY', 'TRY'].forEach(currency => {
            const option = document.createElement('option');
            option.value = currency;
            option.textContent = currency;
            currencySelect.appendChild(option);
        });
    }
    
    // Insert Advanced Options button and area
    const form = document.getElementById('price-form');
    if (form) {
        // Create a wrapper div for the buttons if not present
        let btnWrapper = form.querySelector('.form-btn-wrapper');
        if (!btnWrapper) {
            btnWrapper = document.createElement('div');
            btnWrapper.className = 'form-btn-wrapper';
            // Move the submit button into the wrapper
            const calcBtn = form.querySelector('[type="submit"]');
            if (calcBtn) btnWrapper.appendChild(calcBtn);
            form.appendChild(btnWrapper);
        }

        // Create advanced options button and area
        const advBtn = document.createElement('button');
        advBtn.type = 'button';
        advBtn.id = 'advanced-options-btn';
        advBtn.textContent = 'Advanced Options';
        advBtn.style.marginRight = '10px';

        const advArea = document.createElement('div');
        advArea.id = 'advanced-options-area';
        advArea.style.display = 'none';
        advArea.style.margin = '10px 0';
        advArea.innerHTML = `
            <label style="font-weight:500;">
                Price Difference Limit (%): 
                <input type="number" id="limit-percent" min="1" max="99" value="80" style="width:60px;margin-left:8px;">
            </label>
        `;

        // Insert Advanced Options button before the Calculate button in the wrapper
        const calcBtn = btnWrapper.querySelector('[type="submit"]');
        btnWrapper.insertBefore(advBtn, calcBtn);

        // Insert Advanced Options area after the button wrapper, inside the form
        form.insertBefore(advArea, btnWrapper.nextSibling);

        advBtn.onclick = function() {
            advArea.style.display = advArea.style.display === 'none' ? 'block' : 'none';
        };

        // Add form submission handler
        form.addEventListener('submit', handleRegionalPriceCalculation);
    }
});

// Update form handler
function handleRegionalPriceCalculation(event) {
    event.preventDefault();

    const form = event.target;
    const price = parseFloat(form.querySelector('#price').value);
    const currency = form.querySelector('#currency').value;
    const homeCountry = form.querySelector('#home-country').value;
    const limitInput = document.getElementById('limit-percent');
    const limitPercent = limitInput ? parseFloat(limitInput.value) : 80;

    const spinner = document.getElementById('spinner');
    const resultContainer = document.getElementById('result-table-container');

    // Input validation
    if (isNaN(price) || price <= 0 || !homeCountry) {
        resultContainer.innerHTML = '<div style="color:#dc2626;padding:1rem;">Please enter a valid price and select your country.</div>';
        resultContainer.classList.remove('d-none');
        return;
    }

    // Show loading state
    resultContainer.classList.add('d-none');
    if (spinner) spinner.style.display = 'block';

    // Calculate prices
    setTimeout(() => {
        const prices = calculateRelativePrices(price, homeCountry, limitPercent);
        if (spinner) spinner.style.display = 'none';
        renderTable(prices, currency, 10, price);
    }, 400);
}