const getArguments = () => {
  return process.argv.slice(2);
}

const ischeckArgs = (args) => {
  if(args.length === 2) {
    return true
  }
  return false
}

const ischeckNumbers = (args) => {
  if(!isNaN(args[0]) && !isNaN(args[1])) {
    return true
  }
  return false
}

const buildSquare = (widths, heights) => {
  const square = [];
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
  if(!ischeckArgs(args) || !ischeckNumbers(args)) {
    console.log("error");
    return
  }
  const widths = args[0];
  const heights = args[1];
  const square = buildSquare(widths, heights);
  return console.log(square);
}

displaySquare();
