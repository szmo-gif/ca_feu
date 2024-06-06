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

const getDirections = () => {
  return [
    [0, 1], [1, 0], [0, -1], [-1, 0]
  ];
};

const initializeVisited = (height, width) => {
  return Array.from({ length: height }, () => Array(width).fill(false));
};

const findEntry = (maze, entry) => {
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      if (maze[i][j] === entry) {
        return [i, j];
      }
    }
  }
  return null;
};

const isValidMove = (nx, ny, height, width, visited, maze, obstacles) => {
  return nx >= 0 && nx < height && ny >= 0 && ny < width && !visited[nx][ny] && maze[nx][ny] !== obstacles;
};

const solveMaze = ({ height, width, obstacles, chemin, entry, exit, maze }) => {
  const directions = getDirections();
  const visited = initializeVisited(height, width);
  const queue = [];

  const start = findEntry(maze, entry);
  if (!start) {
    console.error("Entrée non trouvée");
    return false;
  }

  queue.push([...start, []]);
  visited[start[0]][start[1]] = true;

  while (queue.length) {
    const [x, y, path] = queue.shift();

    if (maze[x][y] === exit) {
      return path.concat([[x, y]]);
    }

    for (const [dx, dy] of directions) {
      const [nx, ny] = [x + dx, y + dy];

      if (isValidMove(nx, ny, height, width, visited, maze, obstacles)) {
        visited[nx][ny] = true;
        queue.push([nx, ny, path.concat([[x, y]])]);
      }
    }
  }

  return false;
};

const displayResolvedMaze = () => {
  const args = getArguments();
  const data = readFile(args[0]);

  const maze = mazeInfo(data);

  const solved = solveMaze(maze);
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

displayResolvedMaze();
