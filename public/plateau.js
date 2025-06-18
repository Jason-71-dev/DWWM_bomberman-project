const playground = document.querySelector(".playground")
const cols = 33
const rows = 33
const cellSize = 24

for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        playground.appendChild(cell);
        cell.style.left = `${x * cellSize}px`;
        cell.style.top = `${y * cellSize}px`;

        // TYPES DE BLOCS
        if (x === 0 || x === cols - 1 || y === 0 || y === rows - 1) {
            // Bords extérieurs
            cell.classList.add("wall");
        }
        else if (x % 2 === 0 && y % 2 ===0) {
            cell.classList.add("wall")
        }
        else if (Math.random() < 0.2) {
            // 20% de chance -> bloc destructible
        }
        else {
            cell.classList.add("empty")
        }
    }
}