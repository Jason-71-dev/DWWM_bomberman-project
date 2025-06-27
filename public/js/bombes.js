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

    // Supprimer la bombe du tableau bombs
    bombs = bombs.filter(bomb => !(bomb.x === x && bomb.y === y));


  
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
      
          // Destruction d'un bloc destructible
          if (targetCell.type === 'destructible') {
            console.log('Avant destruction:', targetCell.element.className);
            targetCell.element.classList.remove('destructible');
            targetCell.element.classList.add('empty');
            console.log('Après destruction:', targetCell.element.className);
            targetCell.type = 'empty'; // important : mise à jour du type
            createExplosion(targetX, targetY);
            break; // stop après avoir détruit le bloc
          }
      
          // Case vide → on crée l'explosion mais on continue
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
  
      // Vérifie joueur/explosion
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
  
    // Check ennemis tout de suite
    checkEnemiesHit(cellX, cellY);
  }
  function checkEnemiesHit(cellX, cellY) {
    // Check si un ennemi est touché à cette case
    const cellSize = 24;
    window.enemies = window.enemies.filter(enemy => {
      if (enemy.x === cellX && enemy.y === cellY) {
        enemy.element.remove();
        console.log("🔥 Ennemi éliminé !");
        return false; // On l'enlève du tableau
      }
      return true;
    });
  }
  
  