let bombs = []

function addBomb(x, y) {
    // Créer un élément HTML pour afficher la bombe
    const bombElement = document.createElement("div");
    bombElement.classList.add("bomb");
    bombElement.style.left = x + "px";
    bombElement.style.top = y + "px";
    document.querySelector(".playground").appendChild(bombElement);
  
    // Lancer le timer d'explosion
    const timeoutId = setTimeout(() => {
      explodeBomb(x, y, bombElement);
    }, 2000); // 2000ms = 2 secondes
  
    // Ajouter cette bombe dans le tableau bombs
    bombs.push({ x, y, timeoutId, element: bombElement });
  }

  document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        addBomb(window.playerPosition.x * 24, window.playerPosition.y * 24);
    }
  });

// Explosion  
function explodeBomb(x, y, bombElement) {
    const cellSize = 24;
    const explosionRange = 1;
    const directions = [
      { dx: 0, dy: -1 },
      { dx: 0, dy: 1 },
      { dx: -1, dy: 0 },
      { dx: 1, dy: 0 } 
    ];
  
    // Supprimer la bombe
    bombElement.remove();
  
    // Position en cases
    const cellX = Math.floor(x / cellSize);
    const cellY = Math.floor(y / cellSize);
  
    // Créer explosion au centre
    createExplosion(cellX, cellY);
  
    // Dans les 4 directions
    directions.forEach(direction => {
      for (let i = 1; i <= explosionRange; i++) {
        const targetX = cellX + direction.dx * i;
        const targetY = cellY + direction.dy * i;
  
        // vérifier si dans les limites
        if (targetX < 0 || targetX > 32 || targetY < 0 || targetY > 32) break;
  
        const targetCell = window.grid[targetY][targetX];
        if (!targetCell) break;
  
        if (targetCell.type === 'borderWall' || targetCell.type === 'fixedWall') {
          break; // stop si mur indestructible
        }
  
        if (targetCell.type === 'destructible') {
          targetCell.element.classList.remove('destructible');
          targetCell.element.classList.add('empty');
          targetCell.type = 'empty';
          createExplosion(targetX, targetY);
          break; // stop après avoir détruit le bloc
        }
  
        // si case vide
        if (targetCell.type === 'empty') {
          createExplosion(targetX, targetY);
        }
      }
    });
  }

  function createExplosion(cellX, cellY) {
    const cellSize = 24;
    const explosionElement = document.createElement("div");
    explosionElement.classList.add("explosion");
    explosionElement.style.left = `${cellX * cellSize}px`;
    explosionElement.style.top = `${cellY * cellSize}px`;
    document.querySelector(".playground").appendChild(explosionElement);
  
    // Positions à vérifier : la case explosion + ses 4 adjacentes
    const positionsToCheck = [
      { x: cellX, y: cellY },
      { x: cellX + 1, y: cellY },
      { x: cellX - 1, y: cellY },
      { x: cellX, y: cellY + 1 },
      { x: cellX, y: cellY - 1 }
    ];
  
    // Check en boucle toutes les 50ms pendant 500ms
    const checkInterval = setInterval(() => {
      const px = window.playerPosition.x;
      const py = window.playerPosition.y;
  
      // Est-ce que le joueur est sur une case touchée par l'explosion ?
      const hit = positionsToCheck.some(pos => pos.x === px && pos.y === py);
  
      if (hit) {
        console.log("💀 Player dead by explosion nearby!");
        alert("Game Over!");
        clearInterval(checkInterval);
        window.location.reload();
      }
    }, 50);
  
    // Supprimer la flamme après 500ms et arrêter le check
    setTimeout(() => {
      clearInterval(checkInterval);
      explosionElement.remove();
    }, 500);
  
    // Check ennemis tout de suite (tu peux adapter comme pour le joueur si besoin)
    checkEnemiesHit(cellX, cellY);
  }
  
  