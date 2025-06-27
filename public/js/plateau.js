const playground = document.querySelector(".playground");
const cols = 33;
const rows = 33;
const cellSize = 24;
const grid = [];

for (let y = 0; y < rows; y++) {
  const row = [];
  for (let x = 0; x < cols; x++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.style.position = "absolute";          // important pour positionner avec left/top
    cell.style.width = `${cellSize}px`;
    cell.style.height = `${cellSize}px`;
    cell.style.left = `${x * cellSize}px`;
    cell.style.top = `${y * cellSize}px`;

    let cellType;
    const isSpawnZone = (x <= 2 && y <= 2);
    const isEdge = (x === 0 || x === cols - 1 || y === 0 || y === rows - 1);

    if (isEdge) {
      cellType = 'borderWall';      // Mur extérieur fixe
    } 
    else if (isSpawnZone) {
      cellType = 'empty';           // Zone de spawn vide
    }
    else {
      const r = Math.random();
      if (r < 0.2) cellType = 'fixedWall';        // Mur indestructible aléatoire
      else if (r < 0.3) cellType = 'destructible'; // Bloc destructible aléatoire
      else cellType = 'empty';                      // Case vide
    }

    cell.classList.add(cellType);
    playground.appendChild(cell);

    row.push({
      element: cell,
      type: cellType
    });
  }
  grid.push(row);
}

window.grid = grid; // rendre grid accessible globalement
