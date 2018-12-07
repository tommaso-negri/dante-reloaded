export default class Bible extends Phaser.Sprite {
  constructor(game) {
    super(game, 0, 0, 'bible');

    this.exists = false;

    this.game.physics.enable(this);
    this.game.physics.arcade.gravity.y = 250;
    this.body.allowGravity = true;
    this.body.immovable = false;
  }

  stdReset(x, y) {
    this.reset(x, y);
    this.exists = true;
  }

  spawn(x, y) {
    this.stdReset(x, y);
    // this.body.velocity.x = 10
  }

  hit() {
    this.death()
  }

  death() {
    this.exists = false;
  }
}