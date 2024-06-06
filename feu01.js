const getArguments = () => {
  return process.argv.slice(2);
};

const ischeckArgs = (args) => {
  if (args.length === 1) {
    return true;
  }
  return false;
};

const ischeckparenthesis = (args) => {
  let parenthesis = 0;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '(') {
      parenthesis++;
    } else if (args[i] === ')') {
      parenthesis--;
    }
    if (parenthesis < 0) {
      return false;
    }
  }
  return parenthesis === 0;
};

const noNestedParentheses = (args) => {
  let parenthesis = 0;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '(') {
      parenthesis++;
      if (parenthesis > 1) {
        return false;  // Détecte des parenthèses imbriquées
      }
    } else if (args[i] === ')') {
      parenthesis--;
    }
  }
  return true;
};

const performOperation = (operator, operand1, operand2) => {
  switch (operator) {
    case '+':
      return operand1 + operand2;
    case '-':
      return operand1 - operand2;
    case '*':
      return operand1 * operand2;
    case '/':
      return operand1 / operand2;
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
};

const evaluateExpression = (expression) => {
  const operatorPrecedence = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2
  };

  const operators = [];
  const operands = [];

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    if (char in operatorPrecedence) {
      const currentPrecedence = operatorPrecedence[char];
      while (
        operators.length > 0 &&
        operatorPrecedence[operators[operators.length - 1]] >= currentPrecedence
      ) {
        const operator = operators.pop();
        const operand2 = operands.pop();
        const operand1 = operands.pop();
        operands.push(performOperation(operator, operand1, operand2));
      }
      operators.push(char);
    } else if (!isNaN(char)) {
      let num = char;
      while (!isNaN(expression[i + 1])) {
        num += expression[i + 1];
        i++;
      }
      operands.push(parseInt(num));
    }
  }

  while (operators.length > 0) {
    const operator = operators.pop();
    const operand2 = operands.pop();
    const operand1 = operands.pop();
    operands.push(performOperation(operator, operand1, operand2));
  }

  return operands.pop();
};

const extractArgumentsFromParenthesis = (argument) => {
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
};

const displayResultExpression = () => {
  const argument = getArguments();

  if (!ischeckArgs(argument)) {
    console.log('error: invalid number of arguments');
    return;
  }

  const joinArgument = argument.join('');

  if (!ischeckparenthesis(joinArgument)) {
    console.log('error: unbalanced parentheses');
    return;
  }

  if (!noNestedParentheses(joinArgument)) {
    console.log('error: nested parentheses are not allowed');
    return;
  }

  const extractedArguments = extractArgumentsFromParenthesis(joinArgument);
  
  const result = evaluateExpression(extractedArguments);
  console.log(result);
};

displayResultExpression();
