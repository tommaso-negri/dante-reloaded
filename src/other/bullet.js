export default class Bullet extends Phaser.Weapon {
  constructor(game) {
    super(game);
    this.exists = false;

    // BODY
    // this.game.physics.enable(this);
    // this.body.allowGravity = false;
    // this.body.immovable = true;

    this.data = {
      type: 'normal'
    };
  }

  stdReset(x, y) {
    this.fireFrom.set(x, y);
    this.exists = true;
  }

  spawn(x, y) {
    this.stdReset(x, y);
    this.fire;
  }
}