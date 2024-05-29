const fs = require('fs');

const getArguments = () => {
  const args = process.argv.slice(2);
  return args;
}

const isGoodArguments = (args) => {
  if (args.length < 3 || args[2].length < 5) {
    return false;
  }
  return true;
}

const generateMaze = (height, width, chars) => {
  const entry = Math.floor(Math.random() * (width - 4)) + 2;
  const exit = Math.floor(Math.random() * (width - 4)) + 2;

  let maze = [];

  for (let y = 0; y < height; y++) {
    let row = '';
    for (let x = 0; x < width; x++) {
      if (y === 0 && x === entry) {
        row += chars[3];
      } else if (y === height - 1 && x === exit) {
        row += chars[4];
      } else if (y >= 1 && y < height - 1 && x >= 1 && x < width - 1 && Math.random() * 100 > 20) {
        row += chars[1];
      } else {
        row += chars[0];
      }
    }
    maze.push(row);
  }

  return maze;
}

const writeMazeToFile = (maze, height, width, chars) => {
  const filePath = 'labyrinthe.txt';
  const header = `${height} ${width} ${chars}`;
  const mazeContent = maze.join('\n');
  const fileContent = `${header}\n${mazeContent}`;
  fs.writeFileSync(filePath, fileContent, 'utf8');
  console.log(`Labyrinthe généré et sauvegardé dans ${filePath}`);
}

const main = () => {
  const args = getArguments();
  if (!isGoodArguments(args)) {
    console.error("params needed: height width characters");
    return;
  }

  const height = parseInt(args[0]);
  const width = parseInt(args[1]);
  const chars = args[2];

  const maze = generateMaze(height, width, chars);
  writeMazeToFile(maze, height, width, chars);
}

main();
