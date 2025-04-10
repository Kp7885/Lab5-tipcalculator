const billInput = document.getElementById("billTotal");
const tipSlider = document.getElementById("tipRange");
const tipPercentDisplay = document.getElementById("tipPercent");
const currencySelect = document.getElementById("currency");
const errorMessage = document.getElementById("errorMessage");
const billWithTax = document.getElementById("billWithTax");
const convertedTip = document.getElementById("convertedTip");
const convertedTotal = document.getElementById("convertedTotal");

function updateCalculations() {
  let bill = parseFloat(billInput.value);

  if (isNaN(bill) || bill < 0) {
    errorMessage.textContent = "Please enter a valid positive number for the bill total.";
    billWithTax.value = '';
    convertedTip.value = '';
    convertedTotal.value = '';
    return;
  }
  else {
    errorMessage.textContent = ""; // Clear message
  }
  const taxRate = 0.11;
  const tipPercent = parseInt(tipSlider.value);
  const billTaxed = bill + bill * taxRate;
  const tipAmount = billTaxed * (tipPercent / 100);
  const totalWithTip = billTaxed + tipAmount;

  tipPercentDisplay.textContent = tipPercent;

  // Set base USD values
  billWithTax.value = billTaxed.toFixed(2);

  const selectedCurrency = currencySelect.value;
  let conversionRate = 1;
  let symbol = "$";

  if (selectedCurrency === "EUR") {
    conversionRate = 0.95;
    symbol = "€";
  } else if (selectedCurrency === "INR") {
    conversionRate = 85;
    symbol = "₹";
  }

  const convertedTipAmount = tipAmount * conversionRate;
  const convertedTotalAmount = totalWithTip * conversionRate;

  convertedTip.value = `${symbol}${convertedTipAmount.toFixed(2)}`;
  convertedTotal.value = `${symbol}${convertedTotalAmount.toFixed(2)}`;
}

// Bind input events
billInput.addEventListener("input", updateCalculations);
tipSlider.addEventListener("input", updateCalculations);
currencySelect.addEventListener("change", updateCalculations);