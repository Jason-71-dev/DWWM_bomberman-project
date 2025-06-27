// Créer un tableau global pour les ennemis
window.enemies = [];

function createEnemy(x, y) {
  const cellSize = 24;
  const enemy = document.createElement("div");
  enemy.classList.add("enemy");
  enemy.style.left = `${x * cellSize}px`;
  enemy.style.top = `${y * cellSize}px`;
  document.querySelector(".playground").appendChild(enemy);

  // Ajout dans le tableau des ennemis
  window.enemies.push({
    x: x,
    y: y,
    element: enemy
  });
}

// Exemple : on place 3 ennemis aléatoirement dans des cases vides
window.addEventListener("DOMContentLoaded", () => {
  const maxX = 32;
  const maxY = 32;

  for (let i = 0; i < 3; i++) {
    let x, y;
    do {
      x = Math.floor(Math.random() * maxX);
      y = Math.floor(Math.random() * maxY);
    } while (window.grid[y][x].type !== "empty");

    createEnemy(x, y);
  }
});
