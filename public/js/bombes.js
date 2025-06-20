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

