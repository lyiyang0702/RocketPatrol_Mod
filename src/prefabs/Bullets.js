//Bullets Prefab
class Bullets extends Phaser.GameObjects.Sprite {
    constructor (scene,x,y,texture,frame,LeftRight){
        super (scene,x,y,texture,frame);
    
    // add object to existing scene
        scene.add.existing (this);
        this.alpha = 0;
        this.moveSpeed = 8;
        this.sfxP = scene.sound.add('sfx_p'); // add rocket sfx
        this.sfxM = scene.sound.add('sfx_m'); // add rocket sfx
        this.isFiring_1 = false; // track right rocket's firing status
        this.isFiring_2 = false; // track left rocket's firing status
        this.position = LeftRight;
        this.score = 0;
    }

    update (){
        // if fired, move up
        if (this.isFiring_1 && this.position == 1  ){
            this.alpha = 1;
            if (this.x >= -120){
                this.x -= this.moveSpeed;
            }
        }
        if (this.isFiring_2 &&this.position == 2 ){
            this.alpha = 1;
            if (this.x <= game.config.width + 120){
                this.x += this.moveSpeed;
            }
        }  
  
        // fire button
        if (!this.isFiring_1 && this.position == 1){
            if (Phaser.Input.Keyboard.JustDown (keyF)){
                this.isFiring_1 = true;
                this.sfxP.play(); //play sfx
            }
        }
        if (!this.isFiring_2 && this.position == 2){
            if (Phaser.Input.Keyboard.JustDown (keySPACE)){
                this.isFiring_2 = true;
                this.sfxM.play(); //play sfx
            }
        }
    }

}