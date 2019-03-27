'use strict'

function calculate(text) {
    return math.eval(text);
}
function calcThis() {
    const numButtons = document.querySelectorAll('.digit');
    const operatorButtons = document.querySelectorAll('.operator');
    const clearButton = document.querySelector('.clear')
    const equalButton = document.querySelector('.equal')
    const paragraph = document.querySelector('p');
    let evalText = "";
    for (let button of numButtons) {
        paragraph.textContent = "";
        button.addEventListener('click', function(){
            paragraph.textContent += button.textContent;
                // https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
            evalText += button.textContent;
        });
    }

    for (let button of operatorButtons) {
        paragraph.textContent = "";
        if (button.textContent === "x") {
            button.addEventListener('click', function(){
                evalText += "*";
            });
        } else {
            button.addEventListener('click', function(){
                evalText += button.textContent;
            });
        }
    }

    clearButton.addEventListener('click', function(){
        paragraph.textContent = "";
        evalText = "";
    })

    equalButton.addEventListener('click', function(){
        paragraph.textContent = calculate(evalText);
        evalText = paragraph.textContent
    })
}


function main() {
    calcThis();
}

document.addEventListener('DOMContentLoaded', main)
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
