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

const isCheckArgs = (args) => {
  if (args.length === 1) {
    return true;
  }
  return false;
}

// Function to display the sudoku
const displaySudoku = (sudoku) => {
  sudoku.forEach(row => console.log(row.join('')));
}

// Function to solve the sudoku
const solveSudoku = (sudoku) => {
  const empty = findEmptyCell(sudoku);
  if (!empty) {
    return true; // Sudoku solved
  }

  const [line, column] = empty;

  for (let num = 1; num <= 9; num++) {
    if (isValidPlacement(sudoku, line, column, num)) {
      sudoku[line][column] = String(num);

      if (solveSudoku(sudoku)) {
        return true;
      }

      sudoku[line][column] = "."; // Reset and try another number
    }
  }

  return false; // No number fits, backtrack
}

// Function to find an empty cell in the sudoku
const findEmptyCell = (sudoku) => {
  for (let line = 0; line < 9; line++) {
    for (let column = 0; column < 9; column++) {
      if (sudoku[line][column] === ".") {
        return [line, column]; // Return the coordinates of the first empty cell found
      }
    }
  }
  return null;
}

// Function to check if a placement is valid in the sudoku
const isValidPlacement = (sudoku, line, column, num) => {
  // Check the row
  for (let i = 0; i < 9; i++) {
    if (sudoku[line][i] === String(num)) {
      return false;
    }
  }

  // Check the column
  for (let i = 0; i < 9; i++) {
    if (sudoku[i] && sudoku[i][column] === String(num)) { // Check if sudoku[i] is defined
      return false;
    }
  }

  // Check the 3x3 block
  const blockLine = Math.floor(line / 3) * 3;
  const blockColumn = Math.floor(column / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const currentLine = blockLine + i;
      const currentColumn = blockColumn + j;
      if (sudoku[currentLine] && sudoku[currentLine][currentColumn] === String(num)) {
        return false;
      }
    }
  }

  return true;
}

const displayResolvedSudoku = () => {
  const args = getArguments();

  if (!isCheckArgs(args)) {
    console.error("error");
    return;
  }

const file = args[0];

  const sudoku = readFile(file).split("\n").map(row => row.split(""));

  console.log("Sudoku avant résolution :");
  displaySudoku(sudoku);
  console.log("-------------------------");
  if (solveSudoku(sudoku)) {
    console.log("Sudoku résolu :");
    displaySudoku(sudoku);
  } else {
    console.log("Aucune solution trouvée.");
  }
}

displayResolvedSudoku();
