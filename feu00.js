const getArguments = () => {
  return process.argv.slice(2);
}

const checkArgs = (args) => {
  if(args.length === 2) {
    return true
  }
  return false
}

const checkNumbers = (args) => {
  if(!isNaN(args[0]) && !isNaN(args[1])) {
    return true
  }
  return false
}

const buildSquare = (args) => {
  const square = [];
  const widths = args[0]; 
  const heights = args[1]; 
  const corner = "o";
  const line = "-";
  const space = " ";
  const side = "|";

  const firstAndLastLine = corner + line.repeat(widths - 2) + corner;
  const leftAndRightLines = side + space.repeat(widths - 2) + side;

  square.push(firstAndLastLine); 
  for (let i = 0; i < heights - 2; i++) {
    square.push(leftAndRightLines);
  }
  square.push(firstAndLastLine);

  return square.join('\n'); 
}

const displaySquare = () => {
  const args = getArguments();
  if(!checkArgs(args) || !checkNumbers(args)) {
    console.log("error");
    return
  }
  const square = buildSquare(args);
  return console.log(square);
}

displaySquare();
