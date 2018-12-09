export default class MovingPlatform extends Phaser.Sprite {
  constructor(game, sprite) {
    super(game, 0, 0, sprite);
    
    this.exists = false;

    this.game.physics.arcade.enable(this);
    this.body.immovable = true;
    this.body.allowGravity = false;
  }

  stdReset(x, y) {
    this.reset(x, y);
    this.exists = true;
  }

  spawn(x, y, data) {
    this.stdReset(x, y);
    // this.loadTexture(data.sprite);
    this.sprite = data.sprite
  }

  update() {
    if(this.x > 52*32) {
      this.body.velocity.x = -50;
    }

    if(this.x < 38*32) {
      this.body.velocity.x = 50;
    }
  }
}