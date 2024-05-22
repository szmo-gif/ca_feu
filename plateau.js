const fs = require('fs');

const getArguments = () => {
  return process.argv.slice(2);
};

const isGoodArguments = (args) => {
  if (args.length !== 4 || isNaN(args[0]) || isNaN(args[1])) {
    return false;
  }
  return true;
};

const generateTray = (line, charVoid) => {
  let tray = [];
  for (let i = 0; i < line; i++) {
    tray.push(Array(line).fill(charVoid));
  }
  return tray;
};

const placeFixedObstacles = (tray, numObstacles, charObstacle) => {
  for (let i = 0; i < numObstacles; i++) {
    let obstacleX = Math.floor(Math.random() * tray.length);
    let obstacleY = Math.floor(Math.random() * tray[0].length);
    tray[obstacleX][obstacleY] = charObstacle;
  }
};

const displayTray = (tray) => {
  tray.forEach(row => {
    console.log(row.join(''));
  });
};

const writeTrayToFile = (tray, numLines, charVoid, charObstacle) => {
  const filePath = 'plateau.txt';
  const header = `${numLines}${charVoid}${charObstacle}`;
  const trayContent = tray.map(row => row.join('')).join('\n');
  const fileContent = `${header}\n${trayContent}`;
  fs.writeFileSync(filePath, fileContent, 'utf8');
  console.log(`Plateau généré et sauvegardé dans ${filePath}`);
};

const main = () => {
  const args = getArguments();

  if (!isGoodArguments(args)) {
    console.error('Usage: node plateau.js <lines> <numObstacles> <charVoid> <charObstacle>');
    return;
  }

  const line = parseInt(args[0]); // Taille du plateau
  const numObstacles = parseInt(args[1]); // Nombre d'obstacles
  const charVoid = args[2]; // Caractère vide
  const charObstacle = args[3]; // Caractère obstacle

  const tray = generateTray(line, charVoid);
  placeFixedObstacles(tray, numObstacles, charObstacle);

  // Afficher le plateau
  displayTray(tray);

  // Écrire le plateau dans un fichier avec l'en-tête
  writeTrayToFile(tray, line, charVoid, charObstacle);
};

main();
