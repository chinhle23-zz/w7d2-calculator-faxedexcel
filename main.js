'use strict'

function calculate(text) {
    return math.eval(text);
}

function containOperator(char) {
    switch (char) {
        case "/":
        case "*":
        case "-":
        case "+":
            return true
    }
    return false
}

function calcThis() {
    const numButtons = document.querySelectorAll('.digit');
    const operatorButtons = document.querySelectorAll('.operator');
    const clearButton = document.querySelector('.clear')
    const equalButton = document.querySelector('.equal')
    const display = document.querySelector('p');
    let evalText = "";
    let calculatedText = "";
    for (let button of numButtons) {
        button.addEventListener('click', function(){
            if (calculatedText != "" && !containOperator(evalText[evalText.length-1])) {
                // if equal button is clicked and next button clicked is a number button, then reset everything
                display.textContent = "";
                    // https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
                evalText = "";
                calculatedText = "";
            }
            if (containOperator(evalText[evalText.length-1])) {
                // if operator button is clicked and next button clicked is a number button, then reset the display
                display.textContent = "";
            }
            display.textContent += button.textContent;
            evalText += button.textContent;
        });
    }

    for (let button of operatorButtons) {
        if (button.textContent === "x") {
            button.addEventListener('click', function(){
                if (!containOperator(evalText[evalText.length - 1])) {
                    evalText += "*";
                } else {
                    evalText = evalText.substring(0, evalText.length - 1);
                        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring
                }
            });
        } else {
            button.addEventListener('click', function(){
                if (!containOperator(evalText[evalText.length-1])) {
                    evalText += button.textContent;
                } else {
                    evalText = evalText.substring(0, evalText.length - 1);
                }
            });
        }
    }

    clearButton.addEventListener('click', function(){
        display.textContent = "";
        evalText = "";
        calculatedText = "";
    })

    equalButton.addEventListener('click', function(){
        if (evalText != "") {
            display.textContent = calculate(evalText);
            evalText = display.textContent
            calculatedText = evalText
        }
    })
}


function main() {
    calcThis();
}

document.addEventListener('DOMContentLoaded', main)
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
