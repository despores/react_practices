import React, { useState } from 'react';
import './style.css'

function App() {

  const [calc, setCalc] = useState({
    curNum: "0",
    displayNumber: "0",
    currentOperation: null,
    firstOperand: null,
  })

  function clearDisplay() {
    setCalc({
      curNum: "",
      displayNumber: "0",
      currentOperation: null,
      firstOperand: null,
    })
  }

  function handleOperation(operation) {
    if (calc.currentOperation === null) {
      setCalc({
        ...calc,
        currentOperation: operation,
        firstOperand: parseFloat(calc.curNum),
        curNum: "",
      })
    } else {
      calculateResult(operation);
    }
  }

  function appendNumber(number) {
    var newNum = calc.curNum;
    if (calc.curNum.length < 15) {
      if (number === "." && calc.curNum.includes(".")) {
        return;
      }
      if (calc.curNum === "0" && number !== ".") {
        newNum = number;
      } else {
        newNum += number;
      }
      setCalc({
        ...calc,
        curNum: newNum,
        displayNumber: newNum,
      })
    }
  }

  function calculateResult(newOperation) {
    if (calc.currentOperation !== null && calc.curNum !== "") {
      const math = (a, b, sign) => 
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "*"
          ? a * b
          : a / b;

      var res = (calc.curNum === "0" && calc.currentOperation === "/")
        ? "Ошибка"
        : math(calc.firstOperand, parseFloat(calc.curNum), calc.currentOperation);
      setCalc({
        firstOperand:
          newOperation === null
            ? null
            : res,
        currentOperation: newOperation,
        curNum: 
          newOperation === null
            ? String(res)
            : res === "Ошибка"
              ? res
              : "0",
        displayNumber: displayResult(res),
      })
    }
  }

  function displayResult(result) {
    if (isNaN(parseFloat(result))) {
      return "Ошибка";
    }
    result = Number(result.toFixed(Math.max(0, 14 - result.toString().split('.')[0].length)));
    if (result.toString().length > 15) {
      return result.toExponential(5);
    } else {
      return result;
    }
  }

  const handleButtonClick = (value) => {
    switch (value) {
      case "C":
        clearDisplay();
        break;
      case '+':
        handleOperation(value);
        break;
      case "-":
        handleOperation(value);
        break;
      case "*":
        handleOperation(value);
        break;
      case "/":
        handleOperation(value);
        break;
      case "=":
        calculateResult(null);
        break;
      default:
        appendNumber(value);
    }
  }

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">{calc.displayNumber}</div>
        <button className="button" onClick={() => handleButtonClick('7')}>7</button>
        <button className="button" onClick={() => handleButtonClick('8')}>8</button>
        <button className="button" onClick={() => handleButtonClick('9')}>9</button>
        <button className="button operation" onClick={() => handleButtonClick('/')}>÷</button>
        <button className="button" onClick={() => handleButtonClick('4')}>4</button>
        <button className="button" onClick={() => handleButtonClick('5')}>5</button>
        <button className="button" onClick={() => handleButtonClick('6')}>6</button>
        <button className="button operation" onClick={() => handleButtonClick('*')}>x</button>
        <button className="button" onClick={() => handleButtonClick('1')}>1</button>
        <button className="button" onClick={() => handleButtonClick('2')}>2</button>
        <button className="button" onClick={() => handleButtonClick('3')}>3</button>
        <button className="button operation" onClick={() => handleButtonClick('-')}>-</button>
        <button className="button" onClick={() => handleButtonClick('0')}>0</button>
        <button className="button" onClick={() => handleButtonClick('.')}>.</button>
        <button className="button" onClick={() => handleButtonClick('=')}>=</button>
        <button className="button operation" onClick={() => handleButtonClick('+')}>+</button>
        <button className="button" onClick={() => handleButtonClick('C')}>C</button>
      </div>
    </div>
  );
}

export default App;
