const fs = require('fs');

// Fonction pour lire un fichier et retourner son contenu
function lireFichier(nomFichier) {
    try {
        return fs.readFileSync(nomFichier, 'utf8');
    } catch (err) {
        console.error(`Erreur de lecture du fichier ${nomFichier}: ${err}`);
        process.exit(1);
    }
}

// Fonction pour trouver les coordonnées du coin supérieur gauche de la forme dans le plateau
function trouverPosition(board, toFind) {
    const boardLines = board.trim().split('\n');
    const toFindLines = toFind.trim().split('\n');

    for (let i = 0; i <= boardLines.length - toFindLines.length; i++) {
        for (let j = 0; j <= boardLines[0].length - toFindLines[0].length; j++) {
            let match = true;
            for (let k = 0; k < toFindLines.length; k++) {
                for (let l = 0; l < toFindLines[0].length; l++) {
                    const charPlateau = boardLines[i + k].charAt(j + l);
                    const charForme = toFindLines[k].charAt(l);
                    if (charForme !== ' ' && charPlateau !== charForme) {
                        match = false;
                        break;
                    }
                }
                if (!match) break;
            }
            if (match) return { x: j + 1, y: i + 1 }; // Ajouter 1 car les coordonnées sont basées sur l'index 1
        }
    }

    return null;
}

// Fonction pour afficher la représentation de la forme dans le plateau
function afficherFormeDansPlateau(board, toFind, position) {
    const boardLines = board.trim().split('\n');
    const toFindLines = toFind.trim().split('\n');

    for (let i = 0; i < boardLines.length; i++) {
        let line = "";
        for (let j = 0; j < boardLines[0].length; j++) {
            if (i >= position.y - 1 && i < position.y - 1 + toFindLines.length &&
                j >= position.x - 1 && j < position.x - 1 + toFindLines[0].length) {
                const charPlateau = boardLines[i].charAt(j);
                const charForme = toFindLines[i - position.y + 1].charAt(j - position.x + 1);
                line += (charForme !== ' ' && charPlateau === charForme) ? charForme : '-';
            } else {
                line += '-';
            }
        }
        console.log(line);
    }
}

// Fonction principale
function main(boardFile, toFindFile) {
    console.log("Lecture des fichiers...");
    const boardContent = lireFichier(boardFile);
    const toFindContent = lireFichier(toFindFile);
    console.log("Contenu du plateau:", boardContent);
    console.log("Forme à trouver:", toFindContent);

    console.log("Recherche de la forme...");
    const position = trouverPosition(boardContent, toFindContent);

    if (position) {
        console.log("Trouvé !");
        console.log(`Coordonnées : ${position.x-1},${position.y-1}`);
        console.log("Plateau avec la forme trouvée :");
        afficherFormeDansPlateau(boardContent, toFindContent, position);
    } else {
        console.log("Introuvable");
    }
}

// Appel de la fonction principale avec les arguments du programme
const args = process.argv.slice(2);
if (args.length !== 2) {
    console.error("Usage: node exo.js board.txt to_find.txt");
    process.exit(1);
}

main(args[0], args[1]);
