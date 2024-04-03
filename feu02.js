const fs = require('fs');

const getArguments = () => {
  return process.argv.slice(2);
}

// Fonction pour lire le contenu d'un fichier// Fonction pour lire le contenu d'un fichier
const readFile = (filename) => {
  try {
    // Lire le contenu du fichier et remplacer les retours chariots par une chaîne vide
    const content = fs.readFileSync(filename, 'utf8').replace(/\r/g, '');
    return content.split('\n');
  } catch (err) {
    throw new Error(`Erreur lors de la lecture du fichier '${filename}': ${err.message}`);
  }
}


// Fonction pour trouver la position de la forme dans le plateau
const findShape = (boardFile, toFindFile) => {
  const boardContent = readFile(boardFile);
  const toFindContent = readFile(toFindFile);

  console.log("Contenu du plateau :");
  console.log(boardContent);
  console.log("Contenu de la forme à trouver :");
  console.log(toFindContent);

  // Parcourir chaque case du plateau
  for (let i = 0; i <= boardContent.length - toFindContent.length; i++) {
    for (let j = 0; j <= boardContent[i].length - toFindContent[0].length; j++) {
      let found = true;
      // Comparer la forme avec les cases du plateau, en ignorant les espaces
      for (let k = 0; k < toFindContent.length; k++) {
        for (let l = 0; l < toFindContent[k].length; l++) {
          // Ignorer les espaces dans la comparaison
          if (toFindContent[k][l] !== ' ' && boardContent[i + k][j + l] !== toFindContent[k][l]) {
            found = false;
            break;
          }
        }
        if (!found) break;
      }
      // Si la forme est trouvée, afficher ses coordonnées
      if (found) {
        console.log("Trouvé !");
        console.log(`Coordonnées : ${i + 1},${j + 1}`);
        console.log("----");
        for (let m = 0; m < toFindContent.length; m++) {
          console.log(boardContent[i + m].substring(j) + "\n");
        }
        return;
      }
    }
  }
  console.log("Introuvable");
}


const main = () => {
  const boardFile = getArguments()[0];
  const toFindFile = getArguments()[1];
  console.log("Plateau à partir du fichier :", boardFile);
  console.log("Forme à trouver à partir du fichier :", toFindFile);
  findShape(boardFile, toFindFile);
}

main();
