class Player {
    constructor( {position, collisionBlocks, width, height, image, maxFrames, frameBuffer}) {
        this.position = position;
        this.collisionBlocks = collisionBlocks;
        
        this.speed = {x:0, y:0}
        this.width = width;
        this.height = height;
    
        this.isJumping = false;

        this.spritePlayer = image;

        this.currentFrame = 0;
        this.framesDrawn = 0;
        this.frameBuffer = frameBuffer;
        this.maxFrames = maxFrames;

    }
    drawPlayer() {
        ctx.drawImage(this.spritePlayer, this.width * this.currentFrame, 0, 
                    this.width, this.height, 
                    this.position.x, this.position.y,
                    this.width-18, this.height-10);
    }
    updatePlayer() {
        this.drawPlayer();
        
        this.framesDrawn++;
        if(this.framesDrawn % this.frameBuffer == 0){
        
            if (this.currentFrame<this.maxFrames){
                this.currentFrame++
            } else {
                this.currentFrame = 0;
            }
        }

        if (this.position.x < 0) {
            this.position.x = 0;
        }
        if (this.position.x + this.width > canvas.width) {
            this.position.x = canvas.width - this.width;
        }
        
        this.position.x += this.speed.x;
        
        this.checkForHorizontalCollisions();
        this.applyGravity();
        this.checkForVerticalCollisions();
    }
    
    jump() {
        if (!this.isJumping) { //Ao soltar a tecla up
            this.speed.y = -10;
            this.isJumping = true;
        }
    }

    checkForHorizontalCollisions(){
        if (indexBG==0){
            collisionX(currentPlayer, ArrayCollisionBlocks[0]);
                        
        } else if (indexBG==1){
            collisionX(currentPlayer, ArrayCollisionBlocks[1]);

        } else if (indexBG==2){
            collisionX(currentPlayer, ArrayCollisionBlocks[2]);

        } else if (indexBG==3){
            collisionX(currentPlayer, ArrayCollisionBlocks[3]);
     
        }
    }

    applyGravity(){
        this.speed.y += gravity;
        this.position.y += this.speed.y;
    }

    checkForVerticalCollisions(){
        if (indexBG==0){ 
            collisionY(currentPlayer, ArrayCollisionBlocks[0], npc);
            
        } else if (indexBG==1){ 
            collisionY(currentPlayer, ArrayCollisionBlocks[1], npc);

        } else if (indexBG==2){ 
            collisionY(currentPlayer, ArrayCollisionBlocks[2], npc);

        } else if (indexBG==3){ 
            collisionY(currentPlayer, ArrayCollisionBlocks[3], npc);
        }
    }


}

function collisionX(currentPlayer, ArrayCollisionBlocks){
    for (let i=0; i<ArrayCollisionBlocks.length; i++){
        const collisionBlock = ArrayCollisionBlocks[i];
        if(collision(currentPlayer, collisionBlock) ){
            console.log("Colidindo no eixo y!!!")

            //Blocos abaixo do player
            if (currentPlayer.speed.x > 0){
                currentPlayer.speed.x = 0;
                currentPlayer.position.x = collisionBlock.position.x - currentPlayer.width - 0.01;
            }
            //Blocos acima do player
            if (currentPlayer.speed.x < 0){
                currentPlayer.speed.x = 0;
                currentPlayer.position.x = collisionBlock.position.x + collisionBlock.width + 0.01;
            }
        }
    }
}

function collisionY(currentPlayer, ArrayCollisionBlocks, npc){
    for (let i=0; i<ArrayCollisionBlocks.length; i++){
        const collisionBlock = ArrayCollisionBlocks[i];   
        // Instrução para se houver colisão
        if(collision(currentPlayer, collisionBlock) ){
            //console.log("Colidindo no eixo x!!!")

            //Blocos abaixo do player
            if (currentPlayer.speed.y > 0){
                currentPlayer.speed.y = 0;
                currentPlayer.position.y = collisionBlock.position.y - currentPlayer.height - 0.01;
                break;
            }
            //Blocos acima do player
            if (currentPlayer.speed.y < 0){
                currentPlayer.speed.y = 0;
                currentPlayer.position.y = collisionBlock.position.y + currentPlayer.ArrayCollisionBlocks.height + 0.01;
                break;
                }
            }
        if(collision(npc, collisionBlock) ){
                // console.log("Colidindo no eixo x!!!")

                //Blocos abaixo do player
                if (npc.speed.y > 0){
                    npc.speed.y = 0;
                    npc.position.y = collisionBlock.position.y - npc.height - 0.01;
                    break;
                }
                //Blocos acima do player
                if (npc.speed.y < 0){
                    npc.speed.y = 0;
                    npc.position.y = collisionBlock.position.y + npc.ArrayCollisionBlocks.height + 0.01;
                    break;
                    }
                }
        }   
}