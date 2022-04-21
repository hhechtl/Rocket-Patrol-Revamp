class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload(){
        //load images/title sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('sunset', './assets/sunset.png');
        this.load.image('rocks', './assets/rocks.png');
        this.load.image('road', './assets/Road.png');
        // load spritesheets
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('explosionGold', './assets/explosionGold.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('dragon', './assets/dragon.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 3});
        this.load.spritesheet('goldDragon', './assets/goldDragon.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame:3});
        // load background music
        this.load.audio('bg_music', './assets/BackgroundMusic.mp3');            //Royalty free music from https://www.FesliyanStudios.com non-commercial liscence
    }
    
    create() {
        //play audio                                            method for background audio found on https://stackoverflow.com/questions/34210393/looping-audio-in-phaser 
        var cowboyMusic = this.sound.add('bg_music'); 
        cowboyMusic.setLoop(true);
        cowboyMusic.play();
        // place parallax tile sprite
        this.sunset = this.add.tileSprite(0, 0, 640, 480, 'sunset').setOrigin(0, 0);
        this.rocks = this.add.tileSprite(0, 0, 640, 480, 'rocks').setOrigin(0, 0);
        this.road = this.add.tileSprite(0, 0, 640, 480, 'road').setOrigin(0, 0);
        // green UI Background
        //this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 1, 0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'dragon', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'dragon', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'dragon', 0, 10).setOrigin(0,0);
        this.ship04 = new Spaceship(this, game.config.width + borderUISize*3, borderPadding*5 + borderPadding*5, 'goldDragon', 0, 60, 2).setOrigin(0,0);
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 7
        });
        this.anims.create({
            key: 'explodeGold',
            frames: this.anims.generateFrameNumbers('explosionGold', { start: 0, end: 9, first: 0}),
            frameRate: 7
        });
        //initialize score
        this.p1Score = 0;
        // display score
        let scoreConfig = {
        fontFamily: 'Brush Script MT',
        fontSize: '32px',
        backgroundColor: '#704C1C',
        color: '#33FFC9',
        align: 'right',
        padding: {
        top: 5,
        bottom: 5,
        },
        fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        // check key imput for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        if (!this.gameOver) {
            this.sunset.tilePositionX -= .5;  //scroll parrallax
            this.rocks.tilePositionX -= 1;
            this.road.tilePositionX -= 3;
            this.p1Rocket.update();
            this.ship01.update();               // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
        }
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this. checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if (this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset();
            this.goldShipExplode(this.ship04);
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');                  //play explode animation
        boom.on('animationcomplete', () => {         //callback after aim completes
            ship.reset();                            //reset ship position
            ship.alpha = 1;                          //make ship visible again
            boom.destroy();                          //remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score
        this.sound.play('sfx_explosion');
    }

    goldShipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosionGold').setOrigin(0, 0);
        boom.anims.play('explodeGold');                  //play explode animation
        boom.on('animationcomplete', () => {         //callback after aim completes
            ship.reset();                            //reset ship position
            ship.alpha = 1;                          //make ship visible again
            boom.destroy();                          //remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score
        this.sound.play('sfx_explosion');
    }
}