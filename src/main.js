let config = {
    type: Phaser.CANVAS,
    width: 480,
    height: 640,
    scene: [Menu,Play]
}

let game = new Phaser.Game(config);

// Set UI sizes
let borderUISize = game.config.height / 30;
let borderPadding = borderUISize / 6;

// reserve keyboard vars
let keyF, keyR, keyUP, keyDOWN, keyTWO, keyW, keyS, keySPACE,keyLEFT,keyRIGHT;