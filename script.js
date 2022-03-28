// Queries
const displayValue = document.querySelector('.display-results');
const buttons = document.querySelectorAll('button'); 

// Variables
let num1 = 0;
let num2 = 0;
let operator;

// Store a hash for every operator
const operatorSigns = {
	'+': (num1, num2) => num1 + num2,
	'-': (num1, num2) => num1 - num2,
	'x': (num1, num2) => num1 * num2,
	'÷': (num1, num2) => (num2 === 0) 
					? 'Cannot divide by 0' 
					: num1 % num2 === 0 ? num1 / num2 : (num1 / num2).toFixed(2)
}; 

// Array of functions
const buttonTypes = {
	number: buttonInput => applyNumberButton(buttonInput),
	operator: buttonInput => applyOperatorButton(buttonInput),
	clear: applyClearButton,
	equal: applyEqualButton
}; 

// Functions
function applyEqualButton() {
	num1 = parseFloat(num1);
	num2 = parseFloat(num2);
	displayValue.textContent = operatorSigns[operator](num1, num2);
	num1 = parseFloat(displayValue.textContent).toFixed(2);
	num2 = 0;
	operator = '';
}

function applyClearButton() {
	displayValue.textContent = '';
	num1 = 0;
	num2 = 0;
	operator = '';  
}
	
function applyOperatorButton(buttonInput) {
	if(!operator)
		displayValue.textContent += ' ' + buttonInput + ' ';
	else { 
		if(!num2)
			displayValue.textContent = displayValue.textContent.replace(operator, buttonInput); 
		else { 
			num1 = parseFloat(displayValue.textContent).toFixed(2);
			num2 = 0;
			displayValue.textContent += ' ' + buttonInput + ' ';
		}
	}
	operator = buttonInput;
}

function applyNumberButton(buttonInput) {
	displayValue.textContent += buttonInput;
	!operator ? num1 += buttonInput : num2 += buttonInput;
}

function addEventListenerList(list, event, fn) {
	list.forEach(button => button.addEventListener(event, fn));
};

addEventListenerList(buttons, "click", e => {
	const buttonInput = e.target.textContent;
	const buttonClass = e.target.classList[0];

	(buttonClass === "number" || buttonClass === "operator")
		? buttonTypes[buttonClass](buttonInput)
		: buttonTypes[buttonClass]();
})