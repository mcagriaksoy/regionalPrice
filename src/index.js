function convertCurrency(amount, exchangeRate) {
    return amount * exchangeRate;
}

function updateConvertedAmount(convertedAmount) {
    const resultElement = document.getElementById('result');
    resultElement.textContent = `Converted Amount: ${convertedAmount} TRY`;
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    const amountInput = document.getElementById('amount');
    const amount = parseFloat(amountInput.value);
    
    const exchangeRate = 27.0; // Example exchange rate from USD to TRY
    const convertedAmount = convertCurrency(amount, exchangeRate);
    
    updateConvertedAmount(convertedAmount);
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('currency-form');
    form.addEventListener('submit', handleFormSubmit);
});