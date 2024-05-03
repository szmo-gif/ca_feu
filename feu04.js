const getArguments = () => {
  return process.argv.slice(2);
}

const isGoodArguments = (args) => {
  if(args.length === 2 && !isNaN(args[0]) && !isNaN(args[1])) {
    return true;
}
  return false;
}

const displayTray = (tray) => {
  tray.forEach(row => {
    console.log(row.join(''));
  });
}

const generateTray = (line) => {
  let tray = [];
  for (let i = 0; i < line; i++) {
    tray.push(Array(line).fill('.'));
  }
  return tray;
}

const placeFixedObstacles = (tray, numObstacles) => {
  for (let i = 0; i < numObstacles; i++) {
    let obstacleX = Math.floor(Math.random() * tray.length);
    let obstacleY = Math.floor(Math.random() * tray[0].length);
    tray[obstacleX][obstacleY] = 'X';
  }
}

const fillLargestSquare = (tray) => {
  const rows = tray.length;
  const cols = tray[0].length;

  // Créer une matrice pour stocker la taille du plus grand carré
  const largestSquare = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
  let maxSize = 0;
  let maxRow = 0;
  let maxCol = 0;

  for (let i = 0; i < rows; i++) {
    largestSquare[i][0] = tray[i][0] === '.' ? 1 : 0;
    if (largestSquare[i][0] > maxSize) {
      maxSize = largestSquare[i][0];
      maxRow = i;
      maxCol = 0;
    }
  }
  for (let j = 0; j < cols; j++) {
    largestSquare[0][j] = tray[0][j] === '.' ? 1 : 0;
    if (largestSquare[0][j] > maxSize) {
      maxSize = largestSquare[0][j];
      maxRow = 0;
      maxCol = j;
    }
  }

  // Remplir le reste de la matrice largestSquare
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      if (tray[i][j] === '.') {
        largestSquare[i][j] = Math.min(largestSquare[i - 1][j], largestSquare[i][j - 1], largestSquare[i - 1][j - 1]) + 1;
        if (largestSquare[i][j] > maxSize) {
          maxSize = largestSquare[i][j];
          maxRow = i - maxSize + 1;
          maxCol = j - maxSize + 1;
        }
      }
    }
  }

  // Remplacer les '.' du plus grand carré par des 'O'
  for (let i = maxRow; i < maxRow + maxSize; i++) { 
    for (let j = maxCol; j < maxCol + maxSize; j++) { 
      tray[i][j] = 'O';
    }
  }
}


const main = () => {
  const args = getArguments();

  if (!isGoodArguments(args)) {
    console.error('error');
    return;
  }
  
  const line = parseInt(args[0]); // Taille du plateau
  const numObstacles = parseInt(args[1]); // Nombre d'obstacles

  const tray = generateTray(line);
  placeFixedObstacles(tray, numObstacles);

  fillLargestSquare(tray);
  displayTray(tray);
}

main();
