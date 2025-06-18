const playground = document.querySelector(".playground")
const cols = 33
const rows = 33
const cellSize = 24
const grid = []


for (let y = 0; y < rows; y++) {
    const row = []
    for (let x = 0; x < cols; x++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.left = `${x * cellSize}px`;
        cell.style.top = `${y * cellSize}px`;

        // Déterminer le type
        let cellType;
        const isSpawnZone = (x <= 2 && y <= 2);
        const isEdge = (x === 0 || x === cols - 1 || y === 0 || y === rows - 1);
        
        if (isEdge) {
            cellType = 'borderWall';
        } else if (isSpawnZone) {
            cellType = 'empty';
        } else {
            const r = Math.random();
            if (r < 0.1) {
                cellType = 'fixedWall';
            }
            else if (r < 0.3) {
                cellType = 'destructible';
            } 
            else {
                cellType = 'empty';
            }
        }
        
        cell.classList.add(cellType); // affecte le visuel
        row.push(cellType);           // ajoute à la mémoire
        playground.appendChild(cell); // ajoute à l'écran
}}
