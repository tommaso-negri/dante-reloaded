export default class Bible extends Phaser.Sprite {
  constructor(game) {
    super(game, 0, 0, 'bible');

    this.exists = false;

    this.game.physics.enable(this);
    this.body.allowGravity = false;
    this.body.immovable = true;
  }

  stdReset(x, y) {
    this.reset(x, y);
    this.frozen = false;
    this.energy = this.maxHealth;
    this.exists = true;
    this.dying = false;
    this.sleeping = true; // the enemy is sleeping, and will cancel it's update
  }

  spawn(x, y) {
    this.stdReset(x, y);
  }

  death() {
    this.exists = false;
  }

  hit() {
    this.death()
  }
}