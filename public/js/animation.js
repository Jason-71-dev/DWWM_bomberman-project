function moveEnemies() {
    const directions = [
      { dx: 0, dy: -1 },
      { dx: 0, dy: 1 },
      { dx: -1, dy: 0 },
      { dx: 1, dy: 0 }
    ];
    const cellSize = 24;
    const maxX = 32;
    const maxY = 32;
  
    for (let enemy of window.enemies) {
      const randomDir = directions[Math.floor(Math.random() * directions.length)];
      const newX = enemy.x + randomDir.dx;
      const newY = enemy.y + randomDir.dy;
  
      // Check limites et obstacles
      if (
        newX >= 0 &&
        newX < maxX &&
        newY >= 0 &&
        newY < maxY &&
        window.grid[newY][newX].type === "empty"
      ) {
        enemy.x = newX;
        enemy.y = newY;
        enemy.element.style.left = `${newX * cellSize}px`;
        enemy.element.style.top = `${newY * cellSize}px`;
      }
    }
  }
  
  // Bouge les ennemis toutes les 600ms
  setInterval(moveEnemies, 600);
  