function convertCurrency(amount, exchangeRate) {
    return amount * exchangeRate;
}

function updateConvertedAmount(convertedAmount) {
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `<span style="font-size:1.3rem;color:#2563eb;font-weight:bold;">Converted Amount:</span><br><span style="font-size:1.5rem;">${convertedAmount.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>`;
}

// Wage data extracted from Wage.txt
const wageData = [
    { country: 'Estonia', wage: 689.41 },
    { country: 'Australia', wage: 2461.53 },
    { country: 'Turkey', wage: 524.0 },
    { country: 'Germany', wage: 1838.44 },
    { country: 'USA', wage: 1256.67 },
    { country: 'France', wage: 1734.69 },
    { country: 'UK', wage: 1952.7 },
    { country: 'Russia', wage: 212.6 },
    { country: 'Japan', wage: 1468.73 },
    { country: 'Guyana', wage: 211.99 },
    // ...add more countries as needed from Wage.txt...
];

// Helper to get flag emoji from country name (works for most countries)
function getFlagEmoji(country) {
    const isoMap = {
        'Estonia': 'EE', 'Australia': 'AU', 'Turkey': 'TR', 'Germany': 'DE', 'USA': 'US', 'France': 'FR', 'UK': 'GB', 'Russia': 'RU', 'Japan': 'JP', 'Guyana': 'GY'
        // ...add more mappings as needed...
    };
    const code = isoMap[country];
    if (!code) return '🏳️';
    return code.replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt()));
}

function calculateRelativePrices(userPrice, userCountry) {
    const home = wageData.find(w => w.country === userCountry);
    if (!home) return [];
    return wageData.map(w => ({
        country: w.country,
        flag: getFlagEmoji(w.country),
        price: (userPrice / home.wage) * w.wage
    }));
}

function renderTable(prices, currency) {
    const container = document.getElementById('result-table-container');
    let html = `<table style="width:100%;border-collapse:collapse;text-align:center;">
        <thead>
            <tr style="background:#f4f6fb;">
                <th style="padding:8px;border-bottom:1px solid #e2e8f0;">Flag</th>
                <th style="padding:8px;border-bottom:1px solid #e2e8f0;">Country</th>
                <th style="padding:8px;border-bottom:1px solid #e2e8f0;">Price (${currency})</th>
            </tr>
        </thead>
        <tbody>`;
    prices.forEach(({ country, flag, price }) => {
        html += `<tr>
            <td style="font-size:2rem;">${flag}</td>
            <td>${country}</td>
            <td style="font-weight:bold;">${price.toFixed(2)} ${currency}</td>
        </tr>`;
    });
    html += '</tbody></table>';
    container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('price-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const spinner = document.getElementById('spinner');
        spinner.style.display = 'block';
        setTimeout(() => {
            const price = parseFloat(document.getElementById('price').value);
            const currency = document.getElementById('currency').value;
            const homeCountry = document.getElementById('home-country').value;
            const prices = calculateRelativePrices(price, homeCountry);
            renderTable(prices, currency);
            spinner.style.display = 'none';
        }, 400);
    });
});