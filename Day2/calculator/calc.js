const buttons = [
  ["1", "2", "3", "+"],
  ["4", "5", "6", "-"],
  ["7", "8", "9", "*"],
  ["C", "0", ".", "/"],
];

let container = document.querySelector("#container");
for (let row of buttons) {
  let rowDiv = document.createElement("div");
  rowDiv.className = "row";
  for (let i = 0; i < row.length; i++) {
    let button = document.createElement("button");
    button.innerText = row[i];
    rowDiv.appendChild(button);
  }
  container.appendChild(rowDiv);
}

document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", (e) => {
    // console.log(e.currentTarget.innerText);
    handleInput(e.currentTarget.innerText);
  });
});

let displayedText = "";
let previousResult = "";
function handleInput(input) {
  if (
    displayedText == "Syntax Error" ||
    displayedText == "enter a full expression first!"
  )
    displayedText = "";
  if (input == "C") clearCalc();
  else if (input == "=") calculate();
  else if (isOperator(input)) displayedText += ` ${input} `;
  else {
    if (previousResult && !isNaN(Number(displayedText))) {
      displayedText = "";
    }
    displayedText += input;
  }

  document.querySelector("input").value = displayedText;
}

function clearCalc() {
  displayedText = "";
}

function isOperator(input) {
  return ["+", "-", "/", "*"].includes(input);
}

function calculate() {
  let input = displayedText.split(" ");
  // console.log(input);
  let tempResult = NaN;
  if (input.length >= 3)
    for (let i = 1; i < input.length - 1; i += 2) {
      if (isOperator(input[i])) {
        if (!isOperator(input[i - 1]) && !isOperator(input[i + 1])) {
          switch (input[i]) {
            case "+":
              tempResult = Number(input[i - 1]) + Number(input[i + 1]);
              break;
            case "-":
              tempResult = Number(input[i - 1]) - Number(input[i + 1]);
              break;
            case "*":
              tempResult = Number(input[i - 1]) * Number(input[i + 1]);
              break;
            case "/":
              tempResult =
                Number(input[i + 1]) == 0
                  ? NaN
                  : Number(input[i - 1]) / Number(input[i + 1]);
              break;
          }
          if (isNaN(tempResult)) {
            displayedText = "Syntax Error";
            return;
          }
          input[i + 1] = tempResult.toString();
        } else {
          displayedText = "Syntax Error";
          return;
        }
      }
    }
  displayedText = isNaN(tempResult)
    ? "enter a full expression first!"
    : input[input.length - 1];

  previousResult = displayedText;
}

function getDisplay() {
  // console.log(displayedText);
  return displayedText;
}
