// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, type) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);               //add to existing scene
        this.points = pointValue;               // store pointValue
        this.moveSpeed = game.settings.spaceshipSpeed;                     // pixels per frame
        //adding different sprite type
        this.type = type
        if (this.type == 2) {
            this.moveSpeed = game.settings.spaceshipSpeed + 1;
        };

        //add sprite animation    minor guidence provided by Annika Kennedy(classmate)
        this.anims.create({
            key: 'dragon',
            frames: this.anims.generateFrameNumbers('dragon', {start: 0, end: 3, 
            first: 0}),
            frameRate: 3,
            repeat: -1
         });
         this.anims.play('dragon');

         if (this.type == 2) {
             this.anims.create({
                 key: 'goldDragon',
                 frames: this.anims.generateFrameNumbers('goldDragon', {start: 0, end: 3, first: 0}),
                 frameRate: 5,
                 repeat: -1
             })
            this.anims.play('goldDragon')
         }
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