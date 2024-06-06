const fs = require('fs');

// Function to read a file and return its content
const readFile = (fileName) => {
  try {
    return fs.readFileSync(fileName, 'utf8');
  } catch (error) {
    console.error(`Error reading file ${fileName}: ${error}`);
    process.exit(1);
  }
};

// Function to get command line arguments
const getArguments = () => {
  return process.argv.slice(2);
};

// Function to perform BFS to find the shape in the board
const findPositionBFS = (board, toFind) => {
  const boardLines = board.trim().split('\n');
  const toFindLines = toFind.trim().split('\n');

  const rows = boardLines.length;
  const cols = boardLines[0].length;
  const toFindRows = toFindLines.length;
  const toFindCols = toFindLines[0].length;

  const directions = [
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: -1, y: 0 }
  ];

  const queue = [];

  for (let i = 0; i <= rows - toFindRows; i++) {
    for (let j = 0; j <= cols - toFindCols; j++) {
      if (boardLines[i][j] === toFindLines[0][0]) {
        queue.push({ x: j, y: i, depth: 0 });
      }
    }
  }

  while (queue.length > 0) {
    const { x, y, depth } = queue.shift();

    let match = true;
    for (let k = 0; k < toFindRows; k++) {
      for (let l = 0; l < toFindCols; l++) {
        const charBoard = boardLines[y + k].charAt(x + l);
        const charToFind = toFindLines[k].charAt(l);
        if (charToFind !== ' ' && charBoard !== charToFind) {
          match = false;
          break;
        }
      }
      if (!match) break;
    }

    if (match) return { x: x + 1, y: y + 1 }; // Adding 1 because coordinates are 1-based

    for (const direction of directions) {
      const newX = x + direction.x;
      const newY = y + direction.y;
      if (
        newX >= 0 && newX <= cols - toFindCols &&
        newY >= 0 && newY <= rows - toFindRows
      ) {
        queue.push({ x: newX, y: newY, depth: depth + 1 });
      }
    }
  }

  return null;
};

// Function to display the shape within the board
const displayShapeInBoard = (board, shape, position) => {
  const boardLines = board.trim().split('\n');
  const shapeLines = shape.trim().split('\n');

  for (let i = 0; i < boardLines.length; i++) {
    let line = '';
    for (let j = 0; j < boardLines[0].length; j++) {
      if (i >= position.y - 1 && i < position.y - 1 + shapeLines.length &&
        j >= position.x - 1 && j < position.x - 1 + shapeLines[0].length) {
        const charBoard = boardLines[i].charAt(j);
        const charShape = shapeLines[i - position.y + 1].charAt(j - position.x + 1);
        line += (charShape !== ' ' && charBoard === charShape) ? charShape : '-';
      } else {
        line += '-';
      }
    }
    console.log(line);
  }
};

const isCheckArguments = (args) => {
  if (args.length === 2) {
    return true
  }
  return false
}

// Main function
const displayForm = () => {
  const args = getArguments();

  if (!isCheckArguments(args)) {
    console.error('erreur');
    return
  }

  const boardFile = args[0];
  const toFindFile = args[1];

  const boardContent = readFile(boardFile);
  const toFindContent = readFile(toFindFile);

  const position = findPositionBFS(boardContent, toFindContent);

  if (position) {
    console.log('Trouver!');
    console.log(`${position.x - 1},${position.y - 1}`);
    displayShapeInBoard(boardContent, toFindContent, position);
  } else {
    console.log('Introuvable!');
  }
};

// Call the main function
displayForm();
