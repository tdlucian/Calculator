let buffer = '0';
let runningTotal = '0';
let previousOperator = null;

//function to control button click
function buttonclick(value) {
    if (isNaN(parseInt(value))) {
        numbers(value);
    } else {
        symbols(value);
    }
    numbersConsole();
}

//function to handle numbers
function numbers(number) {
    if (buffer === '0'){
        buffer = number;
    } else {
        buffer += number;
    }
}

//function to handle math operations
function handleOperators(value) {
    if (buffer === '0') {
        //nothing to do
        return;
    }

    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        commitOperation (intBuffer);
    }

    previousOperator = value;
    buffer = '0';

}

function commitOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '-') {
        runningTotal -= intBuffer;        
    } else if (previousOpwerator === 'x') {
        runningTotal *= intBuffer;
    } else if (previousOpwerator === '÷') {
        runningTotal /= intBuffer;
    }
} 

//function to handle symbols
function symbols(symbol) {
    switch(symbol) {
        case 'C':
            buffer = '0';
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
                numbersConsole();
            } else {
                buffer = buffer.substring(0, buffer.length-1);
            }
            break;
        case '=':
            if (previousOperator === null) {
                //nothing to do... I'm waiting for numbers
                return;        
            }
            commitOperation(parseInt(buffer));
            previousOperator = null;
            buffer = "" + runningTotal;
            runningTotal = 0;
            break;
        case '+':
            handleOperators(symbol);
            break;
        case '-':
            handleOperators(symbol);
            break;
        case '÷':
            handleOperators(symbol);
            break;
        case 'x':
            handleOperators(symbol);
            break;            
    }
}


function numbersConsole() {
    res.innerText = buffer;
}


function init() {
    document.querySelector('.calculator-buttons')
    .addEventListener("click", function(event) {
        buttonClick(event.target.innerText);
    });
}

init();