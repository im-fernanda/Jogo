// Função acionada ao apertar a tecla
function keyDownHandler(e) { 
    console.log(e.key);
    if (e.key === 'ArrowRight') {
        currentPlayer.speed.x = 5;
        currentPlayer.spritePlayer = RunRight;
    } else if (e.key === 'ArrowLeft') {
        currentPlayer.speed.x = -5;
        currentPlayer.spritePlayer = RunLeft;
    } else if (e.key === 'ArrowUp') {
        currentPlayer.speed.y = -10;
        currentPlayer.jump();
    } else if (e.key === 'Enter'){
        flag = true;
    }
}

// Função acionada ao soltar a tecla
function keyUpHandler(e) { 
    if (e.key === 'ArrowRight') {
        currentPlayer.speed.x = 0;
        currentPlayer.spritePlayer = StandRight;
    } else if (e.key === 'ArrowLeft') {
        currentPlayer.speed.x = 0;
        currentPlayer.spritePlayer = StandLeft;
    } else if (e.key === 'Enter'){
        flag = false;
    }
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);