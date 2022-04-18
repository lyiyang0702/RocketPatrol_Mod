// points breakdown
// implement simultaneous two player mode (left and right player) (30 pts)
// Redesign the game's artwork, UI, and sound to change its theme/aesthetic (ace attorney themes) (60 pts)
// Create and implement a new weapon (w/ new behavior and graphics) (objection bullets) (20 pts)

// Yiyang Lu RocketPatrol Mod 04/18/2022
// around 15 hours work

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
