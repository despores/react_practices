window.onload = function() {
  var display = document.getElementById("display");
  var buttons = document.querySelectorAll(".button");
  var currentNumber = "0";
  var currentOperation = null;
  var firstOperand = null;
  var secondOperand = null;
  var result = null;
  
  buttons.forEach(function(button) {
    button.addEventListener("click", function() {
      if (button.id === "clear") {
        clearDisplay();
      } else if (button.classList.contains("operation")) {
        handleOperation(button);
      } else if (button.id === "equals") {
        calculateResult();
      } else {
        appendNumber(button);
      }
      animateButton(button);
    });
  });
  
  function clearDisplay() {
    currentNumber = "";
    currentOperation = null;
    firstOperand = null;
    secondOperand = null;
    result = null;
    display.textContent = "0";
    resetOperationButtons();
  }
  
  function handleOperation(button) {
    if (currentOperation === null) {
      currentOperation = button.id;
      firstOperand = Number(currentNumber);
      currentNumber = "";
      button.classList.add("active");
    } else {
      calculateResult();
      currentOperation = button.id;
      if(result !== null) {
        firstOperand = Number(result);
        currentNumber = "";
        resetOperationButtons();
        button.classList.add("active");
        result = null;
      }
    }
  }
  
  function appendNumber(button) {
    if (currentNumber.length < 15) {
      if (button.id === "decimal" && currentNumber.includes(".")) {
        return;
      }
      if (currentNumber === "0" && button.id !== "decimal") {
        currentNumber = "";
      }
      currentNumber += button.textContent;
      display.textContent = currentNumber;
    }
  }
  
  function calculateResult() {
    if (currentOperation !== null && currentNumber !== "") {
      secondOperand = Number(currentNumber);
      switch (currentOperation) {
        case "add":
          result = firstOperand + secondOperand;
          break;
        case "subtract":
          result = firstOperand - secondOperand;
          break;
        case "multiply":
          result = firstOperand * secondOperand;
          break;
        case "divide":
          result = firstOperand / secondOperand;
          break;
        default:
          return;
      }
      displayResult(result);
      resetOperationButtons();
      currentNumber = String(result);
      secondOperand = null;
      currentOperation = null;
    }
  }
  
  function displayResult(result) {
    result = Number(result.toFixed(Math.max(0, 14 - result.toString().split('.')[0].length)));
    if (result.toString().length > 15) {
      display.textContent = result.toExponential(5);
    } else {
      display.textContent = result;
    }
  }
  
  function resetOperationButtons() {
    var operationButtons = document.querySelectorAll(".operation");
    operationButtons.forEach(function(button) {
      button.classList.remove("active");
    });
  }
  
  function animateButton(button) {
    button.classList.add("highlight");
    setTimeout(function() {
      button.classList.remove("highlight");
    }, 100);
  }
};
