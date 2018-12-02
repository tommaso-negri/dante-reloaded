export default class Bible extends Phaser.Sprite {
  constructor(game) {
    super(game, 0, 0, 'bible');

    this.exists = false;

    this.game.physics.enable(this);
    this.game.physics.arcade.gravity.y = 250;
    this.body.allowGravity = false;
    this.body.immovable = true;
  }

  stdReset(x, y) {
    this.reset(x, y);
    this.exists = true;
  }

  spawn(x, y) {
    this.stdReset(x, y);
  }

  hit() {
    this.death()
  }

  death() {
    this.exists = false;
  }
}