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

// Function to display the sudoku
const displaySudoku = (sudoku) => {
  sudoku.forEach(row => console.log(row.join('')));
}

// Function to solve the sudoku
const solvedSudoku = (sudoku) => {
  const empty = foundCaseEmpty(sudoku);
  if (!empty) {
    return true; // Sudoku résolu
  }

  const [line, column] = empty;

  for (let num = 1; num <= 9; num++) {
    if (isCaseEmpty(sudoku, line, column, num)) {
      sudoku[line][column] = num;

      if (solvedSudoku(sudoku)) {
        return true;
      }

      sudoku[line][column] = "."; // Réinitialiser pour essayer une autre valeur
    }
  }

  return false; // Aucune valeur ne convient, défaire le dernier placement
}

// Function to find an empty cell in the sudoku
const foundCaseEmpty = (sudoku) => {
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
const isCaseEmpty = (sudoku, line, column, num) => {
  // Check the row
  for (let i = 0; i < 9; i++) {
    if (sudoku[line][i] === num) {
      return false;
    }
  }

  // Check the column
  for (let i = 0; i < 9; i++) {
    if (sudoku[i] && sudoku[i][column] === num) { // Check if sudoku[i] is defined
      return false;
    }
  }

  // Check the 3x3 block
  const blocLine = Math.floor(line / 3) * 3;
  const blocColumn = Math.floor(column / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const currentline = blocLine + i;
      const currentcolumn = blocColumn + j;
      if (sudoku[currentline] && sudoku[currentline][currentcolumn] === num) {
        return false;
      }
    }
  }

  return true;
}

// Example usage
const file = getArguments()[0];
const sudoku = readFile(file).split("\n").map(row => row.split(""));

console.log("Sudoku avant résolution :");
displaySudoku(sudoku);
console.log("-------------------------");
if (solvedSudoku(sudoku)) {
  console.log("Sudoku résolu :");
  displaySudoku(sudoku);
} else {
  console.log("Aucune solution trouvée.");
}
