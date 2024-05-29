const fs = require('fs');

const getArguments = () => {
  return process.argv.slice(2);
};

const readFile = (fileName) => {
  try {
    return fs.readFileSync(fileName, 'utf8').trim().split('\n');
  } catch (error) {
    console.error(`Error reading file ${fileName}: ${error}`);
    process.exit(1);
  }
}

const mazeInfo = (data) => {
  const [sizeLine, ...mazeLines] = data;
  const [height, width, obstacles, chemin, entry, exit] = sizeLine.split(' ');
  return { height: parseInt(height), width: parseInt(width), obstacles, chemin, entry, exit, maze: mazeLines.map(line => line.split('')) };
}

const findPathBFS = (mazeInfo) => {
  const { height, width, obstacles, chemin, entry, exit, maze } = mazeInfo;

  const directions = [
    [0, 1], [1, 0], [0, -1], [-1, 0]
  ];
  const visited = Array.from({ length: height }, () => Array(width).fill(false));
  const queue = [];
  
  // Trouver les coordonnées de l'entrée
  let start = null;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (maze[i][j] === entry) {
        start = [i, j];
        break;
      }
    }
    if (start) break;
  }
  
  if (!start) {
    console.error("Entrée non trouvée");
    return false;
  }

  queue.push([...start, []]); // Ajouter les coordonnées de départ et le chemin initial
  visited[start[0]][start[1]] = true;

  while (queue.length) {
    const [x, y, path] = queue.shift();

    if (maze[x][y] === exit) {
      return path.concat([[x, y]]);
    }

    for (const [dx, dy] of directions) {
      const [nx, ny] = [x + dx, y + dy];

      if (nx >= 0 && nx < height && ny >= 0 && ny < width &&
          !visited[nx][ny] && maze[nx][ny] !== obstacles) {
        
        visited[nx][ny] = true;
        queue.push([nx, ny, path.concat([[x, y]])]);
      }
    }
  }

  return false; // Aucun chemin trouvé
}

const main = () => {
  const args = getArguments();
  const data = readFile(args[0]);

  const maze = mazeInfo(data);

  const solved = findPathBFS(maze);
  console.log(`solved: ${solved ? 'Yes' : 'No'}`);

  if (solved) {
    const path = solved;
    path.forEach(([x, y]) => {
      if (maze.maze[x][y] !== maze.entry && maze.maze[x][y] !== maze.exit) {
        maze.maze[x][y] = maze.chemin;
      }
    });
  }

  console.log(`hauteur: ${maze.height}`);
  console.log(`largeur: ${maze.width}`);
  console.log(`obstacles: ${maze.obstacles}`);
  console.log(`chemin: ${maze.chemin}`);
  console.log(`entry: ${maze.entry}`);
  console.log(`exit: ${maze.exit}`);

  maze.maze.forEach(line => console.log(line.join('')));
}

main();
