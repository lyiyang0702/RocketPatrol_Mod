class Play extends Phaser.Scene {
    constructor () {
        super ("playScene");
    }
    
    preload() {
        // load images
        this.load.path = './assets/';
        this.load.image ('Phoenix', 'Phoenix.png' )
        this.load.image ('Miles','Miles.png');
        this.load.image ('Bullets_1','objection2.png');
        this.load.image ('Bullets_2','objection.png');
        this.load.image ('spaceship1','6.png');
        this.load.image ('spaceship2','7.png');
        this.load.image ('spaceship3','8.png');
        this.load.image ('starfield','bb.png');
        // load spritesheet
        this.load.spritesheet ('guilty','guilty.png',{frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 3});
        this.load.spritesheet ('notguilty','notguilty.png',{frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 2});
    }

    create() {
        // place tile 
        this.starfield = this.add.tileSprite (0,0,480,640,'starfield').setOrigin(0,0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xF7FC0C).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xF7FC0C).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xF7FC0C).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xF7FC0C).setOrigin(0, 0);
        // right rocket (p1)
        this.p1Rocket = new Rocket(this,game.config.width - borderUISize-borderPadding/3 , game.config.height/2, 'Miles',0,1).setOrigin(0.5,0.5);
        this.p1Bullets = new Bullets (this,game.config.width - borderUISize-borderPadding/3-borderUISize,game.config.height/2, "Bullets_1",0,1); 
        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width/2 - 5* borderUISize, game.config.height-borderUISize*2 , 'spaceship1', 0, 30).setOrigin(0,0.5);
        this.ship02 = new Spaceship(this, game.config.width/2 - borderPadding  ,  game.config.height-borderUISize*4, 'spaceship2', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width/2 + 4*borderUISize, game.config.height-borderUISize*5, 'spaceship3', 0, 10).setOrigin(0,0);
        // define keys
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        // animation config
        this.anims.create ({
            key: 'Guilty',
            frames: this.anims.generateFrameNumbers('guilty',{start: 0,end: 3,first: 0}),
            frameRate: 5
        });

        this.anims.create ({
            key: 'NotGuilty',
            frames: this.anims.generateFrameNumbers('notguilty',{start: 0,end: 2,first: 0}),
            frameRate: 5
        });

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top:5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreRight = this.add.text(borderUISize*15 + borderPadding , borderUISize + borderPadding*2, this.p1Bullets.score,scoreConfig);
        if (game.settings.multiplayer){
            // left rocket (p2)
            this.p2Rocket = new Rocket(this, borderUISize + borderPadding/3 ,game.config.height/2, 'Phoenix',0,2).setOrigin(0.5,0.5);
            this.p2Bullets = new Bullets (this, borderUISize + borderPadding/3 + borderUISize ,game.config.height/2, 'Bullets_2',0,2);
            this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p2Bullets.score,scoreConfig);
        } 
        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }
    
    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.start("menuScene");
        }
        this.starfield.tilePositionY -= 4;

        if (!this.gameOver){
            // rocket update
            this.p1Rocket.update();
            this.BulletsReset(this.p1Bullets,this.p1Rocket);
            this.p1Bullets.update();
            // left player score
        if (game.settings.multiplayer){
            this.p2Rocket.update();
            this.BulletsReset(this.p2Bullets,this.p2Rocket);
            this.p2Bullets.update();
        }
            // update spaceships (x3)
            this.ship01.update();               
            this.ship02.update();
            this.ship03.update();
        }

        // check collisions
        if(this.checkCollision(this.p1Bullets, this.ship03)) {
            this.BulletsReset(this.p1Bullets,this.p1Rocket);
            this.ShipExplode(this.ship03,this.p1Bullets);
        }
        if (this.checkCollision(this.p1Bullets, this.ship02)) {
            this.BulletsReset(this.p1Bullets,this.p1Rocket);
            this.ShipExplode(this.ship02,this.p1Bullets);
        }
        if (this.checkCollision(this.p1Bullets, this.ship01)) {
            this.BulletsReset(this.p1Bullets,this.p1Rocket);
            this.ShipExplode(this.ship01,this.p1Bullets);
        }
        if (game.settings.multiplayer){
            if(this.checkCollision(this.p2Bullets, this.ship03)) {
                this.BulletsReset(this.p2Bullets,this.p2Rocket);
                this.ShipExplode(this.ship03,this.p2Bullets);
            }
            if (this.checkCollision(this.p2Bullets, this.ship02)) {
                this.BulletsReset(this.p2Bullets,this.p2Rocket);
                this.ShipExplode(this.ship02,this.p2Bullets);
            }
            if (this.checkCollision(this.p2Bullets, this.ship01)) {
                this.BulletsReset(this.p2Bullets,this.p2Rocket);
                this.ShipExplode(this.ship01,this.p2Bullets);
            }
        }
    }

    BulletsReset(bullet,rocket){
        // reset
        if (bullet.x <= -120 && bullet.position == 1 ){
            bullet.alpha = 0;
            bullet.isFiring_1 = false;
            bullet.x = rocket.x - borderUISize;
            bullet.y = rocket.y;
        }
        else if (bullet.x >= game.config.width + 120 && bullet.position == 2){
            bullet.alpha = 0;
            bullet.isFiring_2 = false;
            bullet.x = rocket.x + borderUISize;
            bullet.y = rocket.y;
        }
    }

    checkCollision(bullet, ship) {
        // simple AABB checking
        if (bullet.x  < ship.x + ship.width && 
            bullet.x + bullet.width/8 > ship.x && 
            bullet.y < ship.y + ship.height &&
            bullet.y + bullet.height/8 > ship. y) {
                return true;
            } 
        else {
            return false;
        }
    }
    
    ShipExplode(ship,bullet){
        // temporarily hide ship
        ship.alpha = 0;
        // score add and repaint
        if (ship.points == 20){
            bullet.score -= ship.points;
            // create explosion at ship's position
            let boom = this.add.sprite(ship.x, ship.y, 'notguilty').setOrigin (0,0);
            boom.anims.play ('NotGuilty');           //play explode animation
            boom.on ('animationcomplete', ()=>{    // callback after animation completes
            ship.reset();                      // reset ship position
            ship.alpha = 1;                    // make ship visible again
            boom.destroy();                    // remove explosion sprite
            });
        }
        else {
            // create explosion at ship's position
            let boom = this.add.sprite(ship.x, ship.y, 'guilty').setOrigin (0,0);
            boom.anims.play ('Guilty');           //play explode animation
            boom.on ('animationcomplete', ()=>{    // callback after animation completes
            ship.reset();                      // reset ship position
            ship.alpha = 1;                    // make ship visible again
            boom.destroy();                    // remove explosion sprite
            });
            bullet.score +=ship.points;
        }
        if (bullet.position == 1){
            this.scoreRight.text = bullet.score;
        }
        else if (bullet.position == 2){
            this.scoreLeft.text = bullet.score;
        }
        this.sound.play('sfx_explosion');
    }
}