class CollisionBlock {
    constructor(options) {
        this.position = options.position || { x: 0, y: 0 };
        this.width = 62;
        this.height = 34;
    }

    draw() { 
        ctx.fillStyle = 'rgba(255,0,0,0)'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update(){
        this.draw();
    }
}

function collision(object1, object2){
    return (object1.position.y + object1.height >= object2.position.y &&
            object1.position.y <= object2.position.y + object2.height &&
            object1.position.x <= object2.position.x + object2.width &&
            object1.position.x + object1.width >= object2.position.x
    )
};
