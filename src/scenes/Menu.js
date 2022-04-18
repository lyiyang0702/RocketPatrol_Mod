class Menu extends Phaser.Scene {
    constructor () {
        super ("menuScene");
    }

    preload() {
        // load audio
        this.load.path = './assets/';
        this.load.image ('menuBg','back.png');
        this.load.audio('sfx_select', 'blip_select12.wav');
        this.load.audio('sfx_explosion', 'explosion38.wav');
        this.load.audio('sfx_p', 'p1.wav');
        this.load.audio('sfx_m', 'm1.wav');
    }

    create() {
       
        this.menuBg = this.add.tileSprite (0,0,480,640,'menuBg').setOrigin(0,0);
        // game porperties
        game.settings = {
          spaceshipSpeed: 0,
          multiplayer: false,
          gameTimer: 0 
        }

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyTWO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    }

    update() {

      // two players
      if (Phaser.Input.Keyboard.JustDown(keyTWO)){
        game.settings.multiplayer = true;
      }
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings.spaceshipSpeed = 3;
          game.settings.gameTimer = 60000;
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings.spaceshipSpeed = 4;
          game.settings.gameTimer = 45000;
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
    }
}