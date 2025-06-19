const player = document.querySelector(".player");
player.style.width = "24px";
player.style.height = "24px";
player.style.left = `${cellSize}px`;  // position x=1
player.style.top = `${cellSize}px`;   // position y=1

let playerPosition = {x: 0, y: 0 };

document.addEventListener("keydown", movePlayer);

function movePlayer(event) {
    switch(event.key) {
        case "ArrowUp" :
            playerPosition.y = Math.max(0, playerPosition.y - 1)
            break;
        case "ArrowDown" :
            playerPosition.y = Math.min(0, playerPosition.y + 1)
            break;
        case "ArrowLeft" : 
            playerPosition.x = Math.max(0, playerPosition.x -1)
            break;
        case "ArrowRight" :
            playerPosition.x = Math.min(0, playerPosition.x + 1)
            break;             
    }
    updatePlayerPosition();
}
function updatePlayerPosition() {
    const player = document.getElementById("player");
    player.style.gridRowStart = playerPosition.x + 1;
    player.style.gridColumnStart = playerPosition.y + 1;
}