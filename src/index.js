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

function updateCountryComparisons(amount, currency, exchangeRates) {
    const comparisonList = document.getElementById('comparison-list');
    let html = '<ul>';
    countryWages.forEach(({ country, wage, currency: wageCurrency }) => {
        // Convert input amount to the country's currency
        const toTRY = amount * (exchangeRates[currency] || 1); // input to TRY
        const countryAmount = toTRY / (exchangeRates[wageCurrency] || 1); // TRY to country currency
        const hours = (countryAmount / wage).toFixed(2);
        html += `<li><span style='font-weight:bold;'>${countryAmount.toLocaleString(undefined, { style: 'currency', currency: wageCurrency })}</span> in <span style='color:#2563eb;'>${country}</span> <span style='color:#888;'>(~${hours} hours min. wage)</span></li>`;
    });
    html += '</ul>';
    comparisonList.innerHTML = html;
}

function handleFormSubmit(event) {
    event.preventDefault();
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'block';
    setTimeout(() => {
        const amountInput = document.getElementById('amount');
        const currencySelect = document.getElementById('currency');
        const amount = parseFloat(amountInput.value);
        const currency = currencySelect.value;

        // Example exchange rates to TRY (should be updated with real data or API)
        const exchangeRates = {
            USD: 32.0,
            EUR: 34.5,
            GBP: 40.2,
            RUB: 0.35,
            JPY: 0.21,
            TRY: 1
        };

        const exchangeRate = exchangeRates[currency] || 1;
        const convertedAmount = convertCurrency(amount, exchangeRate);

        updateConvertedAmount(convertedAmount);
        updateCountryComparisons(amount, currency, exchangeRates);
        spinner.style.display = 'none';
    }, 600);
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('currency-form');
    form.addEventListener('submit', handleFormSubmit);
    // Initial comparison (optional, for better UX)
    updateCountryComparisons(1, 'USD', {
        USD: 32.0,
        EUR: 34.5,
        GBP: 40.2,
        RUB: 0.35,
        JPY: 0.21,
        TRY: 1
    });
});