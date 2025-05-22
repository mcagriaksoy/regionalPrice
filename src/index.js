function convertCurrency(amount, exchangeRate) {
    return amount * exchangeRate;
}

function updateConvertedAmount(convertedAmount) {
    const resultElement = document.getElementById('result');
    resultElement.textContent = `Converted Amount: ${convertedAmount.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}`;
}

// Hardcoded wage data (country, hourly wage, currency)
const countryWages = [
    { country: "Turkey", wage: 51.4, currency: "TRY" },
    { country: "Germany", wage: 12, currency: "EUR" },
    { country: "USA", wage: 7.25, currency: "USD" },
    { country: "France", wage: 11.52, currency: "EUR" },
    { country: "UK", wage: 10.42, currency: "GBP" },
    { country: "Russia", wage: 162.0, currency: "RUB" },
    { country: "Japan", wage: 961, currency: "JPY" }
];

function updateCountryComparisons(amount, currency, exchangeRates) {
    const comparisonElement = document.getElementById('comparison');
    let html = '<ul>';
    countryWages.forEach(({ country, wage, currency: wageCurrency }) => {
        // Convert input amount to the country's currency
        const toTRY = amount * (exchangeRates[currency] || 1); // input to TRY
        const countryAmount = toTRY / (exchangeRates[wageCurrency] || 1); // TRY to country currency
        const hours = (countryAmount / wage).toFixed(2);
        html += `<li>${countryAmount.toLocaleString(undefined, { style: 'currency', currency: wageCurrency })} in ${country} (${hours} hours of minimum wage)</li>`;
    });
    html += '</ul>';
    comparisonElement.innerHTML = html;
}

function handleFormSubmit(event) {
    event.preventDefault();

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
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('currency-form');
    form.addEventListener('submit', handleFormSubmit);
});