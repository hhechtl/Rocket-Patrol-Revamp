let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config);

//reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;

//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
//Hunter Hechtl, 4/20/2022, "Derg Patrol", ~10 hours of work
//attempted mods:
//Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60),
//Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20),
//Implement parallax scrolling (10),
//Add your own (copyright-free) background music to the Play scene (5)