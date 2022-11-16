// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor (scene,x,y,texture,frame, pointValue){
        super (scene,x,y,texture,frame);

        // add object to existing scene
        scene.add.existing (this);
        this.points = pointValue; // store pointValue
        this.moveSpeed = game.settings.spaceshipSpeed;
        if (pointValue == 20){
            this.moveSpeed +=0.1;
        }
        else if (pointValue == 30){
            this.moveSpeed +=0.3;
        }
    }

    update (){
        // move spaceship left
        this.y -= this.moveSpeed;
        // wrap around from left edge to right edge
        
        if (this.y <= 0 - this.height) {
            this.reset();
        }
    }

    // position reset
    reset () {
        this.y = game.config.height;
    }
}