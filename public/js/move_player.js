window.addEventListener('DOMContentLoaded', () => {
const player = document.querySelector(".player");
const cellSize = 24; // à redéfinir ici car utilisé aussi en plateau.js

player.style.width = `${cellSize}px`;
player.style.height = `${cellSize}px`;

// Position initiale dans la zone spawn (1,1 ou 2,2)
let playerPosition = { x: 1, y: 1 };
const maxX = 32; // cols - 1
const maxY = 32; // rows - 1

// Position initiale visuelle
player.style.left = `${playerPosition.x * cellSize}px`;
player.style.top = `${playerPosition.y * cellSize}px`;

// Fonction qui vérifie si la case est franchissable
function canMoveTo(x, y) {
  if (x < 0 || x > maxX || y < 0 || y > maxY) return false;
  if (!window.grid) return false;

  const cell = window.grid[y][x];
  if (!cell) return false;

  // bloquer murs extérieurs, murs fixes et blocs destructibles
  if (cell.type === 'borderWall' || cell.type === 'fixedWall' || cell.type === 'destructible') {
    return false;
  }

  return true;
}

function movePlayer(event) {
  let newX = playerPosition.x;
  let newY = playerPosition.y;

  switch(event.key) {
    case "ArrowUp":
      newY--;
      break;
    case "ArrowDown":
      newY++;
      break;
    case "ArrowLeft":
      newX--;
      break;
    case "ArrowRight":
      newX++;
      break;
    default:
      return; // ignore autres touches
  }

  if (canMoveTo(newX, newY)) {
    playerPosition.x = newX;
    playerPosition.y = newY;
    updatePlayerPosition();
  }
}

function updatePlayerPosition() {
  player.style.left = `${playerPosition.x * cellSize}px`;
  player.style.top = `${playerPosition.y * cellSize}px`;
}

document.addEventListener("keydown", movePlayer);
});
