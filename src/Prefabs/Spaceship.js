// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);               //add to existing scene
        this.points = pointValue;               // store pointValue
        this.moveSpeed = game.settings.spaceshipSpeed;                     // pixels per frame
        //add sprite animation
        this.anims.create({
            key: 'dragon',
            frames: this.anims.generateFrameNumbers('dragon', {start: 0, end: 3, 
            first: 0}),
            frameRate: 3,
            repeat: -1
         });
         this.anims.play('dragon');
    }
    update() {
        //move spaceship left
        this.x -= this.moveSpeed;
        //wrap around from left edge to right edge
        if(this.x <= 0 - this.width) {
            this.reset();
        }
    }

    //position reset
    reset() {
        this.x = game.config.width;
    }
}