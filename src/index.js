function convertCurrency(amount, exchangeRate) {
    return amount * exchangeRate;
}

function updateConvertedAmount(convertedAmount) {
    const resultElement = document.getElementById('result');
    resultElement.textContent = `Converted Amount: ${convertedAmount.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}`;
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
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('currency-form');
    form.addEventListener('submit', handleFormSubmit);
});