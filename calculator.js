let total = 0;
let screenNum = "0";
let previousChar;
let screen = document.querySelector(".screen");

function buttonClick(input) {
  if (isNaN(parseInt(input))) {
    handleSymbol(input);
  } else {
    handleNumber(input);
  }
  renderOnScreen()
}

function handleSymbol(input) {
  switch (input) {
    case "C":
      screenNum = "0";
      total = 0;
      break;
    case "←":
      if (screenNum === "0" || screenNum.length === 1 || typeof(screenNum) != "string") {
        screenNum = "0";
      } else {
        let editedNum = screenNum.slice(0, -1);
        screenNum = editedNum;
      }
      break;
    case "=":
      completeEquation(parseInt(screenNum))
      previousChar = null;
      break;
    case "÷":
    case "×":
    case "-":
    case "+":
      handleMath(input);
      break;
  };
}

function handleNumber(input) {
  if (screenNum === "0") {
    screenNum = input;
  } else {
    screenNum += input;
  }
}

function handleMath(input) {
  if (screenNum === "0") {
    return;
  }
  let intInput = parseInt(screenNum)
  if (total === 0) {
    total = intInput;
  } else {
    completeEquation(intInput);
  }
  previousChar = input;
  screenNum = "0";
}

function completeEquation(intInput) {
  if (previousChar === "+") {
    total += intInput;
  } else if (previousChar === "-") {
    total -= intInput
  } else if (previousChar === "×") {
    total *= intInput;
  } else if (previousChar === "÷") {
    total /= intInput;
  }
  screenNum = total
}

function renderOnScreen() {
  screen.innerText = screenNum;
}

function init() {
  document
  .querySelector(".calculator-buttons")
  .addEventListener("click", (e) => {
    buttonClick(e.target.innerText);
  })
}

init();