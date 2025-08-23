// Helper: get user's country using geolocation API
function detectUserCountry(callback) {
    fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
            if (data && data.country_name) {
                callback(data.country_name);
            } else {
                callback(null);
            }
        })
        .catch(() => callback(null));
}

// --- Only keep the necessary code for the calculator ---

// Helper to get flag image URL from country name
function getFlagImageUrl(country) {
    let code = isoMap[country];
    if (!code) return null;
    return `https://flagcdn.com/48x36/${code}.png`;
}

// --- Dynamic Economic Data ---
// Store PPP and GDP per capita by country
let pppData = {}; // { country: PPP value }
let gdpData = {}; // { country: GDP per capita value }

// Fetch PPP data (World Bank API, latest available year)
function fetchPPPData() {
    fetch('https://api.worldbank.org/v2/en/indicator/PA.NUS.PPP?downloadformat=json')
        .then(res => res.json())
        .then(data => {
            // The API returns a zipped file for download, so let's use a static fallback for now
            // You can replace this with a direct API or static JSON for production
            // Example fallback:
            pppData = {
                "USA": 1,
                "Turkey": 3.5,
                "Germany": 0.9,
                "France": 0.95,
                "Russia": 2.5,
                "Japan": 0.8,
                "UK": 0.85,
                // ...add more as needed
            };
        })
        .catch(() => {
            // fallback static data
            pppData = {
                "USA": 1,
                "Turkey": 3.5,
                "Germany": 0.9,
                "France": 0.95,
                "Russia": 2.5,
                "Japan": 0.8,
                "UK": 0.85,
                // ...add more as needed
            };
        });
}

// Fetch GDP per capita data (World Bank API, latest available year)
function fetchGDPData() {
    fetch('https://api.worldbank.org/v2/en/indicator/NY.GDP.PCAP.CD?downloadformat=json')
        .then(res => res.json())
        .then(data => {
            // The API returns a zipped file for download, so let's use a static fallback for now
            gdpData = {
                "USA": 70000,
                "Turkey": 11000,
                "Germany": 50000,
                "France": 45000,
                "Russia": 13000,
                "Japan": 40000,
                "UK": 47000,
                // ...add more as needed
            };
        })
        .catch(() => {
            // fallback static data
            gdpData = {
                "USA": 70000,
                "Turkey": 11000,
                "Germany": 50000,
                "France": 45000,
                "Russia": 13000,
                "Japan": 40000,
                "UK": 47000,
                // ...add more as needed
            };
        });
}

// Fetch dynamic data on page load
fetchPPPData();
fetchGDPData();

// Calculate regional prices based on user input and advanced settings
function calculateRelativePrices(userPrice, userCountry, limitPercent = 80, options = {}) {
    const home = wageData.find(w => w.country === userCountry);
    if (!home) return [];
    const limit = Math.abs(Number(limitPercent)) || 80;
    const {
        minPrice = '', // absolute min price (in user's currency)
        maxPrice = '', // absolute max price (in user's currency)
        rounding = 'none', // 'none', 'nearest', 'down', 'up'
        enableCapping = true,
        calculationMode: modeOverride // allow override from options
    } = options;

    const mode = modeOverride || calculationMode;

    // Get home country dynamic data
    const homePPP = pppData[userCountry] || 1;
    const homeGDP = gdpData[userCountry] || 1;

    return wageData.map(w => {
        let basePrice = userPrice;
        let targetPPP = pppData[w.country] || 1;
        let targetGDP = gdpData[w.country] || 1;

        let rawPrice;
        if (mode === 'wage') {
            rawPrice = userPrice / home.wage * w.wage;
        } else if (mode === 'ppp') {
            rawPrice = userPrice / homePPP * targetPPP;
        } else if (mode === 'gdp') {
            rawPrice = userPrice / homeGDP * targetGDP;
        } else { // hybrid
            // Weighted average: 40% wage, 30% PPP, 30% GDP
            const wagePart = userPrice / home.wage * w.wage;
            const pppPart = userPrice / homePPP * targetPPP;
            const gdpPart = userPrice / homeGDP * targetGDP;
            rawPrice = 0.4 * wagePart + 0.3 * pppPart + 0.3 * gdpPart;
        }

        // Cap the price difference to ±limit% if enabled
        let cappedPrice = rawPrice;
        if (enableCapping) {
            let minLimit = userPrice * (1 - limit / 100);
            let maxLimit = userPrice * (1 + limit / 100);
            cappedPrice = Math.max(minLimit, Math.min(maxLimit, cappedPrice));
        }

        // Apply absolute min/max if set
        if (minPrice !== '' && !isNaN(minPrice)) cappedPrice = Math.max(Number(minPrice), cappedPrice);
        if (maxPrice !== '' && !isNaN(maxPrice)) cappedPrice = Math.min(Number(maxPrice), cappedPrice);

        // Rounding
        if (rounding === 'nearest') cappedPrice = Math.round(cappedPrice);
        else if (rounding === 'down') cappedPrice = Math.floor(cappedPrice);
        else if (rounding === 'up') cappedPrice = Math.ceil(cappedPrice);

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

    // Helper to fetch live exchange rate and update localPrice cell
    async function getLiveLocalPrice(price, localCurrency, cell, baseCurrency) {
        try {
            // Use exchangerate.host API for conversion, with selected base currency
            const res = await fetch(`https://api.exchangerate.host/convert?from=${baseCurrency}&to=${localCurrency}&amount=${price}`);
            const data = await res.json();
            if (data && data.result) {
                cell.textContent = `${data.result.toFixed(2)} ${localCurrency}`;
            } else {
                cell.textContent = `${price.toFixed(2)} ${localCurrency}`;
            }
        } catch {
            cell.textContent = `${price.toFixed(2)} ${localCurrency}`;
        }
    }

    displayPrices.slice(0, shownCount).forEach(({ country, flagUrl, price }) => {
        const changePercent = userPrice ? ((price - userPrice) / userPrice) * 100 : 0;
        const changeColor = changePercent >= 0 ? '#16a34a' : '#dc2626';
        const localCurrency = countryCurrencyMap[country] || currency;

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
                <td style="padding:12px;text-align:right;font-weight:500;" class="local-price-cell" data-price="${price}" data-currency="${localCurrency}">
                    Loading...
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

    // Update local price cells with live data
    const localPriceCells = container.querySelectorAll('.local-price-cell');
    localPriceCells.forEach(cell => {
        const price = parseFloat(cell.getAttribute('data-price'));
        const localCurrency = cell.getAttribute('data-currency');
        // Fetch and update asynchronously, using selected currency as base
        (async () => {
            await getLiveLocalPrice(price, localCurrency, cell, currency);
        })();
    });

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

// Add world map container below results table
function ensureWorldMapContainer() {
    let mapContainer = document.getElementById('worldmap-container');
    if (!mapContainer) {
        mapContainer = document.createElement('div');
        mapContainer.id = 'worldmap-container';
        mapContainer.style = 'width:100%;height:500px;margin:2rem 0;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.1);';
        const resultTableContainer = document.getElementById('result-table-container');
        if (resultTableContainer) {
            resultTableContainer.parentNode.insertBefore(mapContainer, resultTableContainer.nextSibling);
        }
    }
    return mapContainer;
}

// Load leaflet.js and world geojson if not already loaded
function loadLeafletAndGeoJSON(callback) {
    if (window.L && window.worldGeoJSON) return callback();
    if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
    }
    if (!window.L) {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.onload = () => {
            loadWorldGeoJSON(callback);
        };
        document.body.appendChild(script);
    } else {
        loadWorldGeoJSON(callback);
    }
}
function loadWorldGeoJSON(callback) {
    if (window.worldGeoJSON) return callback();
    fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')
        .then(res => res.json())
        .then(geojson => {
            window.worldGeoJSON = geojson;
            callback();
        });
}

// Helper: get country ISO2 code from name (use isoMap)
function getCountryISO2(name) {
    return isoMap[name] || null;
}

// Render world map heatmap using getHeatColor
function renderWorldMap(prices) {
    ensureWorldMapContainer();
    loadLeafletAndGeoJSON(() => {
        if (window._leafletMap) {
            window._leafletMap.remove();
        }
        const map = L.map('worldmap-container', {
            zoomControl: false,
            attributionControl: false,
        }).setView([20, 0], 2);
        window._leafletMap = map;
        const priceVals = prices.map(p => p.price);
        const minPrice = Math.min(...priceVals);
        const maxPrice = Math.max(...priceVals);
        const priceByISO = {};
        prices.forEach(p => {
            const iso2 = getCountryISO2(p.country);
            if (iso2) priceByISO[iso2.toUpperCase()] = p.price;
        });
        L.geoJSON(window.worldGeoJSON, {
            style: feature => {
                const iso2 = feature.id;
                const price = priceByISO[iso2];
                return {
                    fillColor: price ? getHeatColor(price, minPrice, maxPrice) : '#eee',
                    weight: 0.5,
                    color: '#888',
                    fillOpacity: price ? 0.8 : 0.2,
                };
            },
            onEachFeature: (feature, layer) => {
                const iso2 = feature.id;
                const price = priceByISO[iso2];
                if (price) {
                    layer.bindTooltip(`${feature.properties.name}: ${price.toFixed(2)}`);
                } else {
                    layer.bindTooltip(feature.properties.name);
                }
            }
        }).addTo(map);
    });
}

// After rendering table, also render world map
const originalRenderTable = renderTable;
renderTable = function(prices, currency, shownCount = 5, userPrice = null, searchTerm = '') {
    originalRenderTable(prices, currency, shownCount, userPrice, searchTerm);
    renderWorldMap(prices);
}

// Populate country dropdown and marketplace when page loads
document.addEventListener('DOMContentLoaded', function () {
    const homeCountrySelect = document.getElementById('home-country');
    const currencySelect = document.getElementById('currency');
    const form = document.getElementById('price-form');

    // --- Add marketplace select ---
    if (form) {
        let marketplaceWrapper = form.querySelector('.marketplace-wrapper');
        if (!marketplaceWrapper) {
            marketplaceWrapper = document.createElement('div');
            marketplaceWrapper.className = 'marketplace-wrapper';
            marketplaceWrapper.style.marginBottom = '10px';
            marketplaceWrapper.innerHTML = `
                <label style="font-weight:500;">
                    Marketplace:
                    <select id="marketplace" style="margin-left:8px;">
                        <option value="Google Play Store">Google Play Store</option>
                        <option value="Steam">Steam</option>
                        <option value="App Store">App Store</option>
                        <option value="Huawei Store">Huawei Store</option>
                        <option value="Roblox Marketplace">Roblox Marketplace</option>
                        <option value="Epic Games Store">Epic Games Store</option>
                        <option value="Amazon Appstore">Amazon Appstore</option>
                        <option value="Microsoft Store">Microsoft Store</option>
                        <option value="PlayStation Store">PlayStation Store</option>
                        <option value="Nintendo eShop">Nintendo eShop</option>
                    </select>
                </label>
            `;
            form.insertBefore(marketplaceWrapper, form.firstChild.nextSibling);
        }
    }

    // Populate countries dropdown
    if (homeCountrySelect) {
        // Remove all options first
        homeCountrySelect.innerHTML = '';
        wageData.sort((a, b) => a.country.localeCompare(b.country))
            .forEach(country => {
                const option = document.createElement('option');
                option.value = country.country;
                option.textContent = country.country;
                homeCountrySelect.appendChild(option);
            });

        // Auto-select user's country using geolocation, fallback to USA
        detectUserCountry(function (userCountry) {
            let found = false;
            if (userCountry) {
                for (let i = 0; i < homeCountrySelect.options.length; i++) {
                    if (homeCountrySelect.options[i].value === userCountry) {
                        homeCountrySelect.selectedIndex = i;
                        found = true;
                        break;
                    }
                }
            }
            if (!found) {
                // fallback to USA
                for (let i = 0; i < homeCountrySelect.options.length; i++) {
                    if (homeCountrySelect.options[i].value === 'USA') {
                        homeCountrySelect.selectedIndex = i;
                        break;
                    }
                }
            }
        });
    }

    // Add basic currencies
    if (currencySelect) {
        currencySelect.innerHTML = '';
        ['USD', 'EUR', 'GBP', 'JPY', 'TRY'].forEach(currency => {
            const option = document.createElement('option');
            option.value = currency;
            option.textContent = currency;
            currencySelect.appendChild(option);
        });
    }

    // --- Advanced Options button and area ---
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

        // Only add Advanced Options button/area if not already present
        if (!form.querySelector('#advanced-options-btn')) {
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
                <div style="margin-bottom:10px;">
                    <label style="font-weight:500;">
                        Price Difference Limit (%): 
                        <input type="number" id="limit-percent" min="1" max="99" value="80" style="width:60px;margin-left:8px;">
                    </label>
                </div>
                <div style="margin-bottom:10px;">
                    <label style="font-weight:500;">
                        Minimum Price (your currency): 
                        <input type="number" id="min-price" min="0" step="0.01" style="width:80px;margin-left:8px;">
                    </label>
                </div>
                <div style="margin-bottom:10px;">
                    <label style="font-weight:500;">
                        Maximum Price (your currency): 
                        <input type="number" id="max-price" min="0" step="0.01" style="width:80px;margin-left:8px;">
                    </label>
                </div>
                <div style="margin-bottom:10px;">
                    <label style="font-weight:500;">
                        Rounding: 
                        <select id="rounding" style="margin-left:8px;">
                            <option value="none">No rounding</option>
                            <option value="nearest">Nearest integer</option>
                            <option value="down">Round down</option>
                            <option value="up">Round up</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label style="font-weight:500;">
                        <input type="checkbox" id="enable-capping" checked style="margin-right:6px;">
                        Enable price difference capping
                    </label>
                </div>
            `;

            // Insert Advanced Options button before the Calculate button in the wrapper
            const calcBtn = btnWrapper.querySelector('[type="submit"]');
            btnWrapper.insertBefore(advBtn, calcBtn);

            // Insert Advanced Options area after the button wrapper, inside the form
            form.insertBefore(advArea, btnWrapper.nextSibling);

            advBtn.onclick = function () {
                advArea.style.display = advArea.style.display === 'none' ? 'block' : 'none';
            };
        }
    }

    // --- Calculation Mode ---
    // Allow user to select calculation mode: wage, PPP, GDP, hybrid
    let calculationMode = 'hybrid'; // default

    // Add calculation mode selector to the form
    if (form && !form.querySelector('#calculation-mode')) {
        const modeDiv = document.createElement('div');
        modeDiv.style.marginBottom = '10px';
        modeDiv.innerHTML = `
            <label style="font-weight:500;">
                Calculation Mode:
                <select id="calculation-mode" style="margin-left:8px;">
                    <option value="hybrid">Hybrid (Wage + PPP + GDP)</option>
                    <option value="wage">Wage Only</option>
                    <option value="ppp">PPP Only</option>
                    <option value="gdp">GDP per Capita Only</option>
                </select>
            </label>
        `;
        form.insertBefore(modeDiv, form.firstChild.nextSibling);
        document.getElementById('calculation-mode').onchange = function (e) {
            calculationMode = e.target.value;
        };
    }
});

// Update form handler
function handleRegionalPriceCalculation(event) {
    event.preventDefault();

    const form = event.target;
    const price = parseFloat(form.querySelector('#price').value);
    const currency = form.querySelector('#currency').value;
    const homeCountry = form.querySelector('#home-country').value;
    const marketplaceInput = form.querySelector('#marketplace');
    const marketplace = marketplaceInput ? marketplaceInput.value : '';
    const limitInput = document.getElementById('limit-percent');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const roundingInput = document.getElementById('rounding');
    const enableCappingInput = document.getElementById('enable-capping');
    const modeInput = document.getElementById('calculation-mode');

    const limitPercent = limitInput ? parseFloat(limitInput.value) : 80;
    const minPrice = minPriceInput && minPriceInput.value !== '' ? parseFloat(minPriceInput.value) : '';
    const maxPrice = maxPriceInput && maxPriceInput.value !== '' ? parseFloat(maxPriceInput.value) : '';
    const rounding = roundingInput ? roundingInput.value : 'none';
    const enableCapping = enableCappingInput ? enableCappingInput.checked : true;
    const calculationModeValue = modeInput ? modeInput.value : calculationMode;

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
        const prices = calculateRelativePrices(price, homeCountry, limitPercent, {
            minPrice,
            maxPrice,
            rounding,
            enableCapping,
            marketplace,
            calculationMode: calculationModeValue
        });
        if (spinner) spinner.style.display = 'none';
        renderTable(prices, currency, 10, price);
    }, 400);
}

// Intercept Calculate button to show ad popup before calculation
document.addEventListener('DOMContentLoaded', function () {
    // Ad popup logic
    var calcBtn = document.getElementById('calculate-btn');
    var form = document.getElementById('price-form');
    var adPopup = document.getElementById('ad-popup-modal');
    var adClose = document.getElementById('ad-popup-close');
    let allowSubmit = false;

    if (calcBtn && form && adPopup && adClose) {
        // Remove any previous submit listeners to avoid double handling
        form.onsubmit = null;
        // Intercept form submit
        form.addEventListener('submit', function (e) {
            // Always prevent default to avoid page reload
            e.preventDefault();
            if (!allowSubmit) {
                adPopup.style.display = 'flex';
            } else {
                allowSubmit = false; // reset for next submit
                // Call the calculation handler directly instead of submitting the form
                handleRegionalPriceCalculation(e);
            }
        });

        adClose.addEventListener('click', function () {
            adPopup.style.display = 'none';
            allowSubmit = true;
            // Trigger calculation directly, not form.submit()
            const fakeEvent = new Event('submit', { bubbles: true, cancelable: true });
            form.dispatchEvent(fakeEvent);
        });
    }
});

function getHeatColor(price, min, max) {
    // Normalize price between min and max
    var t = (max === min) ? 0 : Math.max(0, Math.min(1, (price - min) / (max - min)));
    // Interpolate from green (low) to yellow (mid) to red (high)
    var r, g;
    if (t < 0.5) {
        // Green to yellow
        r = Math.round(2 * t * 255);
        g = 200;
    } else {
        // Yellow to red
        r = 255;
        g = Math.round(200 - 2 * (t - 0.5) * 200);
    }
    return 'rgb(' + r + ',' + g + ',64)';
}