class Background {
    constructor(bgSrc) {
        this.sprite = new Image();
        this.sprite.src = bgSrc;

    }

    draw() { // Desenha o background
        ctx.drawImage(this.sprite, 0, 0, canvas.width, canvas.height);

        if (indexBG==0){
            //Verificar se há moedas para desenhar
            if (coins1.length > 0) {
                coins1.forEach(coin => {
                    coin.updateCoin();
                });
            }
            
        } else if (indexBG==1){
             //Verificar se há moedas para desenhar
             if (fruits1.length > 0) {
                fruits1.forEach(fruit => {
                    fruit.updateFruit();
                });
            }    

        } else if (indexBG==2){
             //Verificar se há moedas para desenhar
             if (fruits2.length > 0) {
                fruits2.forEach(fruit => {
                    fruit.updateFruit();
                });
            }

            //Verificar se há moedas para desenhar
            if (coins2.length > 0) {
                coins2.forEach(coin => {
                    coin.updateCoin();
                });
            }


        } else if (indexBG==3){
            fireworks[0].updateFireworks();
            fireworks[1].updateFireworks();
            fireworks[2].updateFireworks();
        }
    }

}


class Door{
    constructor(door, doorSrc){
        this.door = door;
        this.spriteDoor = new Image();
        this.spriteDoor.src = doorSrc;

        this.currentFrame = 0;
        this.framesDrawn = 0;
        this.maxFrames = 4;
    }
    drawDoor(){
        ctx.drawImage(this.spriteDoor, 0, this.door.height * this.currentFrame,
            this.door.width, this.door.height, 
            this.door.x, this.door.y, 
            this.door.width+8, this.door.height+15);
    }

    updateDoor(){
        this.currentFrame = this.currentFrame % this.maxFrames;

        this.framesDrawn++;
        if (this.framesDrawn>=100){
            this.currentFrame++;
            this.framesDrawn=0;
        }
    }
}