function evaluateExpression(expression) {
  const operatorPrecedence = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2
  };

  const operators = [];
  const operands = [];

  const performOperation = () => {
    const operator = operators.pop();
    const operand2 = operands.pop();
    const operand1 = operands.pop();
    let result;

    switch (operator) {
      case '+':
        result = operand1 + operand2;
        break;
      case '-':
        result = operand1 - operand2;
        break;
      case '*':
        result = operand1 * operand2;
        break;
      case '/':
        result = operand1 / operand2;
        break;
    }

    operands.push(result);
  };

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    if (char === '(') {
      let count = 1;
      let j = i + 1;
      while (count > 0 && j < expression.length) {
        if (expression[j] === '(') {
          count++;
        } else if (expression[j] === ')') {
          count--;
        }
        j++;
      }
      const subExpression = expression.slice(i + 1, j - 1);
      operands.push(evaluateExpression(subExpression));
      i = j - 1;
    } else if (char in operatorPrecedence) {
      const currentPrecedence = operatorPrecedence[char];
      while (
        operators.length > 0 &&
        operatorPrecedence[operators[operators.length - 1]] >= currentPrecedence
      ) {
        performOperation();
      }
      operators.push(char);
    } else if (!isNaN(parseInt(char))) {
      let num = char;
      while (!isNaN(parseInt(expression[i + 1]))) {
        num += expression[i + 1];
        i++;
      }
      operands.push(parseInt(num));
    }
  }

  while (operators.length > 0) {
    performOperation();
  }

  return operands.pop();
}

function extractArgumentsFromParenthesis(argument) {
  const result = [];
  let currentArgument = '';

  for (let i = 0; i < argument.length; i++) {
    const char = argument[i];
    
    if (char === '(') {
      let count = 1;
      let j = i + 1;
      while (count > 0 && j < argument.length) {
        if (argument[j] === '(') {
          count++;
        } else if (argument[j] === ')') {
          count--;
        }
        j++;
      }
      const subExpression = argument.slice(i + 1, j - 1);
      result.push(evaluateExpression(subExpression));
      i = j - 1;
    } else if (char === '+' || char === '-' || char === '*' || char === '/') {
      if (currentArgument !== '') {
        result.push(parseInt(currentArgument));
        currentArgument = '';
      }
      result.push(char);
    } else {
      currentArgument += char;
    }
  }

  if (currentArgument !== '') {
    result.push(parseInt(currentArgument));
  }

  return result;
}

function main() {
  const argument = process.argv.slice(2);
  const result = evaluateExpression(extractArgumentsFromParenthesis(argument.join(' '))); // Join the argument array into a single string
  console.log(result);
}

main();
