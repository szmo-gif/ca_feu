const fs = require('fs');

const getArguments = () => {
  return process.argv.slice(2);
};

const isGoodArguments = (args) => {
  return args.length === 1;
};

const readFile = (fileName) => {
  try {
    return fs.readFileSync(fileName, 'utf8').trim().split('\n');
  } catch (error) {
    console.error(`Error reading file ${fileName}: ${error}`);
    process.exit(1);
  }
};

const parseTray = (lines) => {
  const [header, ...trayLines] = lines;
  const numLines = parseInt(header[0]);
  const emptyChar = header[1];
  const obstacleChar = header[2];

  return {
    tray: trayLines.map(line => line.split('')),
    emptyChar,
    obstacleChar,
    fullChar: 'O', // Caractère pour le plein
  };
};

const fillLargestSquare = (tray, emptyChar, fullChar) => {
  const rows = tray.length;
  const cols = tray[0].length;

  const largestSquare = Array.from({ length: rows }, () => Array(cols).fill(0));
  let maxSize = 0, maxRow = 0, maxCol = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (tray[i][j] === emptyChar) {
        if (i === 0 || j === 0) {
          largestSquare[i][j] = 1;
        } else {
          largestSquare[i][j] = Math.min(largestSquare[i - 1][j], largestSquare[i][j - 1], largestSquare[i - 1][j - 1]) + 1;
        }
        if (largestSquare[i][j] > maxSize) {
          maxSize = largestSquare[i][j];
          maxRow = i;
          maxCol = j;
        }
      }
    }
  }

  for (let i = maxRow; i > maxRow - maxSize; i--) {
    for (let j = maxCol; j > maxCol - maxSize; j--) {
      tray[i][j] = fullChar;
    }
  }
};

const displayTray = (tray) => {
  tray.forEach(row => {
    console.log(row.join(''));
  });
};

const main = () => {
  const args = getArguments();

  if (!isGoodArguments(args)) {
    console.error('Usage: node feu04.js <fileName>');
    return;
  }

  const fileName = args[0];
  const fileContent = readFile(fileName);
  
  const { tray, emptyChar, obstacleChar, fullChar } = parseTray(fileContent);

  fillLargestSquare(tray, emptyChar, fullChar);
  displayTray(tray);
};

main();
