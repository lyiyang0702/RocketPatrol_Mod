//Rocket Prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor (scene,x,y,texture,frame,position){
        super (scene,x,y,texture,frame);

        // add object to existing scene
        scene.add.existing (this);
        this.moveSpeed = 2;
        this.players = position;
    }
    
    update(){
        // left/right movement
        if (this.players == 1 ){
            if (keyUP.isDown && this.y >= borderUISize + this.width){
                this.y -= this.moveSpeed;
            }
            else if (keyDOWN.isDown  && this.y <= game.config.height - borderUISize - this.width) {
                this.y += this.moveSpeed;
            }
        }
        if (this.players == 2 ){
            if (keyW.isDown && this.y >= borderUISize + this.width){
                this.y -= this.moveSpeed;
            }
            else if (keyS.isDown  && this.y <= game.config.height - borderUISize - this.width) {
                this.y += this.moveSpeed;
            }
        }
    }

}

