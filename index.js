function convertCurrency(amount, exchangeRate) {
    return amount * exchangeRate;
}

function updateConvertedAmount(convertedAmount) {
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `<span style="font-size:1.3rem;color:#2563eb;font-weight:bold;">Converted Amount:</span><br><span style="font-size:1.5rem;">${convertedAmount.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>`;
}

// Example Wage.txt content as a string (replace with your actual data)
const wageTxt = `57,Guyana,$211.99\n51,Turkey,₺51.4\n12,Germany,€12\n7.25,USA,$7.25\n11.52,France,€11.52\n10.42,UK,£10.42\n162,Russia,₽162\n961,Japan,¥961`;

function parseWageTxt(txt) {
    return txt.split('\n').map(line => {
        const [wage, country, currencyWage] = line.split(',');
        // Extract currency symbol and value
        const match = currencyWage.match(/([\D]+)([\d.]+)/);
        let currency = '', wageValue = 0;
        if (match) {
            currency = match[1].replace(/\s/g, '');
            wageValue = parseFloat(match[2]);
        }
        // Map symbols to ISO codes
        const symbolToCode = { '$': 'USD', '€': 'EUR', '₺': 'TRY', '£': 'GBP', '₽': 'RUB', '¥': 'JPY' };
        return {
            country: country.trim(),
            wage: parseFloat(wage),
            currency: symbolToCode[currency] || currency
        };
    });
}

const countryWages = parseWageTxt(wageTxt);

// Predefined weights for each country (example values)
const countryData = [
    { name: 'Turkey', weight: 1.0, flag: '🇹🇷' },
    { name: 'Germany', weight: 1.6, flag: '🇩🇪' },
    { name: 'USA', weight: 1.3, flag: '🇺🇸' },
    { name: 'France', weight: 1.5, flag: '🇫🇷' },
    { name: 'UK', weight: 1.4, flag: '🇬🇧' },
    { name: 'Russia', weight: 0.8, flag: '🇷🇺' },
    { name: 'Japan', weight: 1.2, flag: '🇯🇵' },
    { name: 'Guyana', weight: 0.7, flag: '🇬🇾' }
];

function calculatePrices(basePrice) {
    return countryData.map(country => ({
        ...country,
        price: basePrice * country.weight
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
    prices.forEach(({ name, flag, price }) => {
        html += `<tr>
            <td style="font-size:1.5rem;">${flag}</td>
            <td>${name}</td>
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
            const prices = calculatePrices(price);
            renderTable(prices, currency);
            spinner.style.display = 'none';
        }, 400);
    });
});