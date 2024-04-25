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

// Function to find the coordinates of the top-left corner of the shape on the board
const findPosition = (board, toFind) => {
  const boardLines = board.trim().split('\n');
  const toFindLines = toFind.trim().split('\n');

  for (let i = 0; i <= boardLines.length - toFindLines.length; i++) {
    for (let j = 0; j <= boardLines[0].length - toFindLines[0].length; j++) {
      let match = true;
      for (let k = 0; k < toFindLines.length; k++) {
        for (let l = 0; l < toFindLines[0].length; l++) {
          const charBoard = boardLines[i + k].charAt(j + l);
          const charToFind = toFindLines[k].charAt(l);
          if (charToFind !== ' ' && charBoard !== charToFind) {
            match = false;
            break;
          }
        }
        if (!match) break;
      }
      if (match) return { x: j + 1, y: i + 1 }; // Adding 1 because coordinates are 1-based
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

const isNotArguments = (args) => {
  if (args.length === 2) {
    return true
  }
  return false
}

// Main function
const main = () => {
  const args = getArguments();

  if (!isNotArguments(args)) {
    console.error('erreur');
    return
  }

  const boardFile = args[0];
  const toFindFile = args[1];

  const boardContent = readFile(boardFile);
  const toFindContent = readFile(toFindFile);

  const position = findPosition(boardContent, toFindContent);

  if (position) {
    console.log('Trouver!');
    console.log(`${position.x - 1},${position.y - 1}`);
    displayShapeInBoard(boardContent, toFindContent, position);
  } else {
    console.log('Introuvable!');
  }
};

// Call the main function
main();
