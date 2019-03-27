'use strict'

function calculate(text) {
    return math.eval(text);
}

function containOperator(text) {
    return text.includes("/") || text.includes("*") || text.includes("-") || text.includes("+")
}

function displayEvalText(text) {
    let newArray;
    let newText;
    if (text.includes("*")) {
        newArray = text.split("*");
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
        newArray.splice(1, 0, "*");
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
        newText = newArray.join(" ");
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join
        return newText;
    } else if (text.includes("/")) {
        newArray = text.split("/");
        newArray.splice(1, 0, "/");
        newText = newArray.join(" ");
        return newText;
    } else if (text.includes("-")) {
        newArray = text.split("-");
        newArray.splice(1, 0, "-");
        newText = newArray.join(" ");
        return newText;
    } else if (text.includes("+")) {
        newArray = text.split("+");
        newArray.splice(1, 0, "+");
        newText = newArray.join(" ");
        return newText;
    } else {
        return text;
    }
}

function calcThis() {
    const numButtons = document.querySelectorAll('.digit');
    const operatorButtons = document.querySelectorAll('.operator');
    const clearButton = document.querySelector('.clear');
    const equalButton = document.querySelector('.equal');
    const decimalButton = document.querySelector('.decimal');
    const display = document.querySelector('.text');
    const evalDisplay = document.querySelector('.eval_text');
    let evalText = "";
    let lastClicked = "";
    for (let button of numButtons) {
        button.addEventListener('click', function(){
            if (lastClicked === "equal") {
                // if the last button clicked was equal, then reset everything
                display.textContent = "";
                    // https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
                evalText = "";
            }
            if (lastClicked === "operator") {
                // if the last button clicked was an operator, then reset the display
                display.textContent = "";
            }
            display.textContent += button.textContent;
            evalText += button.textContent;
            evalDisplay.textContent = displayEvalText(evalText);
            lastClicked = "number"
        });
    }

    for (let button of operatorButtons) {
        if (button.textContent === "x") {
            // if 'x' operator button is clicked, then add '*' to the evalText
            button.addEventListener('click', function(){
                if (lastClicked === "number" && containOperator(evalText)) {
                    // if the last button clicked was a number and the text to be evaluated already contains an operator, then calculate and display
                    display.textContent = calculate(evalText);
                    evalText = display.textContent
                    evalText += "*";
                    evalDisplay.textContent = displayEvalText(evalText);
                    lastClicked = "operator"
                }
                if (lastClicked === "number" || lastClicked === "equal") {
                    // if the last button clicked was a number or equal, then add the operator to the evalText
                    evalText += "*";
                    evalDisplay.textContent = displayEvalText(evalText);
                    lastClicked = "operator"
                }
                if (lastClicked === "operator") {
                    // if the last button clicked was an operator, then remove the operator and replace it with the new operator
                    evalText = evalText.substring(0, evalText.length - 1);
                        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring
                    evalText += "*";
                    evalDisplay.textContent = displayEvalText(evalText);
                    lastClicked = "operator"
                }
            });
        } else {
            // if any operator button other than 'x' is clicked, add that button's text to the evalText
            button.addEventListener('click', function() {
                if (lastClicked === "number" && containOperator(evalText)) {
                    display.textContent = calculate(evalText);
                    evalText = display.textContent
                    evalText += button.textContent;
                    evalDisplay.textContent = displayEvalText(evalText);
                    lastClicked = "operator"
                }
                if (lastClicked === "number" || lastClicked === "equal") {
                    evalText += button.textContent;
                    evalDisplay.textContent = displayEvalText(evalText);
                    lastClicked = "operator"
                }
                if (lastClicked === "operator") {
                    evalText = evalText.substring(0, evalText.length - 1);
                    evalText += button.textContent;
                    evalDisplay.textContent = displayEvalText(evalText);
                    lastClicked = "operator"
                }
            });
        }
    }

    decimalButton.addEventListener('click', function() {
        if (lastClicked === "equal" || evalText === "") {
            display.textContent = "0";
            evalText = "0";
            evalDisplay.textContent = displayEvalText(evalText);
        }
        if (lastClicked === "operator") {
            display.textContent = "0";
            evalText += "0";
            evalDisplay.textContent = displayEvalText(evalText);
        }
        display.textContent += decimalButton.textContent;
        evalText += decimalButton.textContent;
        evalDisplay.textContent = displayEvalText(evalText);
        lastClicked = "decimal"
    })

    clearButton.addEventListener('click', function() {
        // clears everything
        display.textContent = "";
        evalText = "";
        evalDisplay.textContent = displayEvalText(evalText);
        lastClicked = "clear";
    })

    equalButton.addEventListener('click', function(){
        if (lastClicked === "number" && containOperator(evalText)) {
            // if the last button clicked was a number and the text to be evaluated contains an operator, then calculate and display
            display.textContent = calculate(evalText);
            evalText = display.textContent
            evalDisplay.textContent = displayEvalText(evalText);
            lastClicked = "equal"
        }
    })
}


function main() {
    calcThis();
}

document.addEventListener('DOMContentLoaded', main)
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
