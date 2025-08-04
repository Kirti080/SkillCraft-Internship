const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let currentExpression = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');

    if (value === 'C') {
      currentExpression = '';
      updateDisplay('');
    } else if (value === '=') {
      calculateResult();
    } else {
      currentExpression += value;
      updateDisplay(currentExpression);
    }
  });
});

// Update display value
function updateDisplay(value) {
  display.value = value || '0';
}

// Calculate expression
function calculateResult() {
  try {
    const result = eval(currentExpression);
    currentExpression = result.toString();
    updateDisplay(currentExpression);
  } catch {
    updateDisplay('Error');
    currentExpression = '';
  }
}

// Handle keyboard input
document.addEventListener('keydown', (event) => {
  const allowedKeys = '0123456789+-*/().';
  const key = event.key;

  if (allowedKeys.includes(key)) {
    currentExpression += key;
    updateDisplay(currentExpression);
  } else if (key === 'Enter') {
    calculateResult();
  } else if (key === 'Backspace') {
    currentExpression = currentExpression.slice(0, -1);
    updateDisplay(currentExpression);
  } else if (key.toLowerCase() === 'c') {
    currentExpression = '';
    updateDisplay('');
  }
});
