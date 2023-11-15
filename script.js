function converter(direction) {
	let converterInputField = document.querySelector('.converterInput');
	let converterOutputField = document.querySelector('.converterOutput');
	let currencyInputField = document.querySelector('.activeInputSwitcherItem > p');
	let currencyOutputField = document.querySelector('.activeOutputSwitcherItem > p');
	let inputCurrency = currencyInputField.textContent;
	let outputCurrency = currencyOutputField.textContent;
	inputCurrency = inputCurrency.trim();
	outputCurrency = outputCurrency.trim();
	let currencyOfInput = document.querySelector('.converterInputBoxRate > p');
	let currencyOfOutput = document.querySelector('.converterOutputBoxRate > p');
	let dataField = document.querySelector('.converterDate');
	let inputValue = converterInputField.value;
	let outputValue = converterOutputField.value;
	let rate;
	let reverseRate;
	let responce = fetch('https://www.cbr-xml-daily.ru/daily_json.js')
		.then(
			responce => responce.json(),
			error => alert('Ошибка Подключения')
		);
	responce.then(responce => {
		if(inputCurrency == 'RUB' && outputCurrency == 'RUB') {
			rate = 1;
			reverseRate = 1;
		}
		else if(inputCurrency == 'RUB') {
			rate = responce.Valute[outputCurrency].Value;
			reverseRate = 1/rate;
		}
		else if(outputCurrency == 'RUB') {
			reverseRate = responce.Valute[inputCurrency].Value;
			rate = 1/reverseRate;
		}
		else {
			rate = responce.Valute[inputCurrency].Value / responce.Valute[outputCurrency].Value;
			reverseRate = responce.Valute[outputCurrency].Value / responce.Valute[inputCurrency].Value
		}
		currencyOfInput.textContent = '1 ' + inputCurrency + ' = ' + reverseRate + ' ' + outputCurrency;
		currencyOfOutput.textContent = '1 ' + outputCurrency + ' = ' + rate + ' ' + inputCurrency;
		if(direction == 'fromInput') {
		    outputValue = inputValue * reverseRate;
			converterOutputField.value = outputValue.toString();
		}
		else if(direction == 'fromOutput') {
			outputValue = outputValue * rate;
			converterInputField.value = outputValue.toString();
		}

	});

}
function switchInputValutes() {
	document.querySelector('.activeInputSwitcherItem').classList.remove('activeInputSwitcherItem');
	this.classList.add('activeInputSwitcherItem');
	converter('fromOutput');
}
function switchOutputValutes() {
	document.querySelector('.activeOutputSwitcherItem').classList.remove('activeOutputSwitcherItem');
	this.classList.add('activeOutputSwitcherItem');
	converter('fromInput');
}
function switchInput() {
	let switcherWindowModal = document.querySelectorAll('.converterSwitcherWindow');
	let converterSwitcherItem = document.querySelectorAll('.converterSwitcherInputItem')[3];
	let itemText = this.querySelector('b');
	let converterSwitcherItemText = converterSwitcherItem.querySelector('p');
	let activeSwitcherItem = document.querySelector('.activeInputSwitcherItem');
	activeSwitcherItem.classList.remove('activeInputSwitcherItem');
	converterSwitcherItemText.textContent = itemText.textContent;
	converterSwitcherItem.classList.add('activeInputSwitcherItem');
	converter('fromOutput');
	for(let i = 0; i < 2; i++) {
		switcherWindowModal[i].style.display = 'none';
	}
}
function switchOutput() {
	let switcherWindowModal = document.querySelectorAll('.converterSwitcherWindow');
	let converterSwitcherItem = document.querySelectorAll('.converterSwitcherOutputItem')[3];
	let itemText = this.querySelector('b');
	let converterSwitcherItemText = converterSwitcherItem.querySelector('p');
	let activeSwitcherItem = document.querySelector('.activeOutputSwitcherItem');
	activeSwitcherItem.classList.remove('activeOutputSwitcherItem');
	converterSwitcherItemText.textContent = itemText.textContent;
	converterSwitcherItem.classList.add('activeOutputSwitcherItem');
	converter('fromInput');
	for(let i = 0; i < 2; i++) {
		switcherWindowModal[i].style.display = 'none';
	}
}
let converterInputField = document.querySelector('.converterInput');
let converterOutputField = document.querySelector('.converterOutput');
let switcherInput = document.querySelectorAll('.converterSwitcherInputItem');
let switcherOutput = document.querySelectorAll('.converterSwitcherOutputItem');
converterInputField.addEventListener('change', () => {
	converter('fromInput');
});
converterOutputField.addEventListener('change', () => {
	converter('fromOutput');
})
switcherInput.forEach((element) => {	
	element.onclick = switchInputValutes;
})
switcherOutput.forEach((element) => {
	element.onclick = switchOutputValutes;
})
let switcherWindowModal = document.querySelectorAll('.converterSwitcherWindow');
let converterSwitcherArrowInput = document.querySelector('.converterSwitcherInputArrow');
let converterSwitcherArrowOutput = document.querySelector('.converterSwitcherOutputArrow');
converterSwitcherArrowInput.addEventListener('click', () => {
	switcherWindowModal[0].style.display = 'flex';
	let switcherWindowItemInput = document.querySelectorAll('.switcherWindowItemInput');
	switcherWindowItemInput.forEach((element) => {
	element.onclick = switchInput;
	})
})
converterSwitcherArrowOutput.addEventListener('click', () => {
	switcherWindowModal[1].style.display = 'flex';
	let switcherWindowItemOutput = document.querySelectorAll('.switcherWindowItemOutput');
	switcherWindowItemOutput.forEach((element => {
		element.onclick = switchOutput;
	}))

})
let convertSideChangeIcon = document.querySelector('.converterSideChangeContain');
convertSideChangeIcon.addEventListener('click', () => {
	let activeInputValute = document.querySelector('.activeInputSwitcherItem > p');
	let activeOutputValute = document.querySelector('.activeOutputSwitcherItem > p');
	let auxValuesOfValute = activeInputValute.textContent;
	activeInputValute.textContent = activeOutputValute.textContent;
	activeOutputValute.textContent = auxValuesOfValute;
	converter('fromInput');
})