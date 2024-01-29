const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const gravity = 0.5;
let isDoorOpen = false; 
let indexFruits = 0;
let indexQuestion = 0;
let dialog = false;
let indexBG = 0;
let indexPlayer = 0;
let answer;
let flag = false;
let incorrect = false;
let dead = false;
let score = 0;
let scoreUp = false;


RunRight = new Image();
RunRight.src = 'Imgs/Player/Run.png';
StandRight = new Image();
StandRight.src = 'Imgs/Player/Idle.png';
RunLeft = new Image();
RunLeft.src = 'Imgs/Player/RunLeft.png';
StandLeft = new Image();
StandLeft.src = 'Imgs/Player/IdleLeft.png';
imageJUMP = new Image();
imageJUMP.src = 'Imgs/Player/Jump.png';
imageDead = new Image();
imageDead.src = 'imgs/PLayer/Dead.png';
imageGUARD = new Image();
imageGUARD.src = 'Imgs/Player/GUARD.png';


let currentPlayer = new Player({position:{x: 0, y:100}, collisionBlocks: ArrayCollisionBlocks[0], width: 128, height: 130, image: StandRight, maxFrames:5, frameBuffer: 6});
const npc = new Player({position:{x: 670, y:205}, collisionBlocks: ArrayCollisionBlocks[0], width: 128, height: 130, image: imageGUARD, maxFrames:4, frameBuffer: 10});

const door = new Door( {x:622, y:228, width:95, height:64}, 'imgs/Assets/Door.png');
const fireworks = [
    new Fireworks({x:280, y:100, width:92, height:94}, 'imgs/Assets/Explosion.png', 56),
    new Fireworks({x:378, y:80, width:92, height:94}, 'imgs/Assets/Explosion.png', 56),
    new Fireworks({x:470, y:100, width:92, height:94}, 'imgs/Assets/Explosion.png', 56)
];

const player = [ // Vetor dde players para facilitar a troca de colisões
    new Player({position:{x: 0, y:0}, collisionBlocks: ArrayCollisionBlocks[0], width: 128, height: 130, image: StandRight, maxFrames:6}),
    new Player({position:{x: 0, y:0}, collisionBlocks: ArrayCollisionBlocks[1], width: 128, height: 130, image: StandRight, maxFrames:6}),
    new Player({position:{x: 0, y:150}, collisionBlocks: ArrayCollisionBlocks[2], width: 128, height: 130, image: StandRight, maxFrames:6}),
    new Player({position:{x: 0, y:150}, collisionBlocks: ArrayCollisionBlocks[3], width: 128, height: 130, image: StandRight, maxFrames:6})
];

const bg = [ // Vetor de backgrounds para facilitar a troca de cenário
    new Background('imgs/Backgrounds/Ruinas1.png'),
    new Background('imgs/Backgrounds/Temple1Complete.png'),
    new Background('imgs/Backgrounds/Temple2Complete.png'),
    new Background('imgs/Backgrounds/cenario1.png')
];

const coins1 = [
    new Coin({x:420, y:280, width:10, height:10}, 'imgs/Assets/Coin.png', 4),
    new Coin({x:450, y:260, width:10, height:10}, 'imgs/Assets/Coin.png', 4),
    new Coin({x:480, y:240, width:10, height:10}, 'imgs/Assets/Coin.png', 4)
];
const coins2 = [
    new Coin({x:600, y:300, width:10, height:10}, 'imgs/Assets/Coin.png', 4),
    new Coin({x:600, y:200, width:10, height:10}, 'imgs/Assets/Coin.png', 4),
    new Coin({x:600, y:100, width:10, height:10}, 'imgs/Assets/Coin.png', 4)
];

const fruits1 = [
    new Fruit({x:400, y:250, width:32, height:32}, 'imgs/Assets/Bananas.png', 16),
    new Fruit({x:180, y:350, width:32, height:32}, 'imgs/Assets/Bananas.png', 16),
    new Fruit({x:360, y:250, width:32, height:32}, 'imgs/Assets/Apple.png', 16),
    new Fruit({x:320, y:270, width:32, height:32}, 'imgs/Assets/Melon.png', 16)
];
const fruits2 = [
    new Fruit({x:450, y:132, width:32, height:32}, 'imgs/Assets/Bananas.png', 16),
    new Fruit({x:540, y:200, width:32, height:32}, 'imgs/Assets/Melon.png', 16),
    new Fruit({x:188, y:132, width:32, height:32}, 'imgs/Assets/Apple.png', 16),
    new Fruit({x:208, y:132, width:32, height:32}, 'imgs/Assets/Apple.png', 16),
    new Fruit({x:228, y:132, width:32, height:32}, 'imgs/Assets/Apple.png', 16),
    new Fruit({x:500, y:170, width:32, height:32}, 'imgs/Assets/Apple.png', 16)
]

const questions = [
    '2^x = 16?',
    'Δ = x^2 + (6*6)x?',
    'Cos(π)?',
    'Parabéns!!!'
];

const answers = [
    '4',
    '36',
    '-1'
];

function drawScore(){
    ctx.font = '30px Uncial Antiqua';
    ctx.textAlign = 'left';
    ctx.fillStyle = 'white';
    ctx.fillText('Score: ' + score, 20, 50);
}

function showPrompt(){
    if(incorrect){
        answer = prompt('Resposta Incorreta! Tente novamente: ');
    } else {
        answer = prompt('Digite sua resposta: ');
        flag = false;
    }
}

function showDialog(msg) {
    const boxWidth = 180;
    const boxHeight = 50;
    const borderWidth = 3; // Largura da borda

    // Desenha a borda preta
    ctx.fillStyle = 'black';
    ctx.fillRect(canvas.width / 2 - boxWidth / 2 - borderWidth, canvas.height / 2 - 200 - boxHeight / 2 - borderWidth, boxWidth + 2 * borderWidth, boxHeight + 2 * borderWidth);

    // Desenha um retângulo branco como fundo da caixa de diálogo
    ctx.fillStyle = 'white';
    ctx.fillRect(canvas.width / 2 - boxWidth / 2, canvas.height / 2 - 200 - boxHeight / 2, boxWidth, boxHeight);

    // Desenha o texto na caixa de diálogo
    ctx.fillStyle = 'black';
    ctx.font = '20px Unical Antiqua';
    ctx.fillText(msg, canvas.width / 2 - ctx.measureText(msg).width / 2, canvas.height / 2 - 200 + 7); // Ajusta verticalmente para o meio da caixa
}

function changeBackground() { // Função para trocar o background
    if (indexBG < bg.length-1) {
        indexBG++; 
        dialog = false;
        indexQuestion++;
    } 

    currentPlayer = player[indexPlayer];

    if(indexPlayer < bg.length-1){
        indexPlayer++;
    } 
}

// Função de detecção de colisão com as animações
function checkAssetsCollision(player, coin) {
    return (
        player.position.x < coin.coin.x + coin.coin.width &&
        player.position.x + player.width > coin.coin.x &&
        player.position.y < coin.coin.y + coin.coin.height &&
        player.position.y + player.height > coin.coin.y
    );
}


// Função de atualização da tela de jogo
function updateGameArea() { 
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bg[indexBG].draw();
    if(indexBG==0){
        door.drawDoor();
        if (currentPlayer.position.x>310){
            door.updateDoor();
            isDoorOpen = true;
        }
        npc.updatePlayer();

   }

   drawScore();
   
   
   if (indexBG==0){
       ArrayCollisionBlocks[0].forEach((collisionBlock) => {
           collisionBlock.update();
        })
  
        // Verifica a colisão as com moedas
        coins1.forEach((coin, index) => {
        if (checkAssetsCollision(currentPlayer, coin)) {
            // Remove a moeda do vetor quando há uma colisão
            coins1.splice(index, 1);
            score++;
        }
        });

        // Atualiza as moedas restantes
        coins1.forEach(coin => {
            if (coin) {
            coin.updateCoin();
        } }
        );
    } else if (indexBG==1){
        ArrayCollisionBlocks[1].forEach((collisionBlock) => {
            collisionBlock.update();
        })

        // Verifica a colisão com as frutas
        fruits1.forEach((fruit, index) => {
        if (checkAssetsCollision(currentPlayer, fruit)) {
            fruits1.splice(index, 1);
            score++;
        }
        });
     
        fruits1.forEach(fruit => {
            if (fruit) {
            fruit.updateFruit();
        } }
        );

    } else if (indexBG==2){
        ArrayCollisionBlocks[2].forEach((collisionBlock) => {
            collisionBlock.update();
        })

        // Verifica a colisão com as frutas
        fruits2.forEach((fruit, index) => {
        if (checkAssetsCollision(currentPlayer, fruit)) {
            fruits2.splice(index, 1);
            score++;
            }
        });
         
        fruits2.forEach(fruit => {
            if (fruit) {
            fruit.updateFruit();
        } }
        );

        // Verifica a colisão com as moedas
        coins2.forEach((coin, index) => {
        if (checkAssetsCollision(currentPlayer, coin)) {
            coins2.splice(index, 1);
            score++;
        }
        });

        coins2.forEach(coin => {
            if (coin) {
            coin.updateCoin();
        } }
        );

        //Verifica se o jogador caiu na água
        if(currentPlayer.position.x > 458 && currentPlayer.position.y > 349){
            currentPlayer.spritePlayer = imageDead;
            dead = true;
            score--;
        }
        if(dead){
            currentPlayer.position.x = 0;
            currentPlayer.position.y = 150;
            dialog = false;
            dead = false;
            currentPlayer.spritePlayer = StandRight;
        }

    } else if (indexBG==3){
        ArrayCollisionBlocks[3].forEach((collisionBlock) => {
            collisionBlock.update();
        })
    }
           
   if(currentPlayer.position.x > canvas.width - 210){ 
        dialog = true;
   }
   if(dialog){
        showDialog(questions[indexQuestion]);
        if(flag){
            do{
                showPrompt();
                if(answer != answers[indexQuestion]){
                    incorrect = true;
                }
            } while (answer != answers[indexQuestion]);

        score++;
        incorrect = false;

        alert('Resposta Correta!');
        changeBackground();

    }
}
    currentPlayer.updatePlayer();

}


function gameLoop() {
    updateGameArea();
    requestAnimationFrame(gameLoop);
}

gameLoop();