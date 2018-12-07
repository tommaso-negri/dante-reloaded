export default class Enemy extends Phaser.Sprite {
  constructor(game, sprite) {
    super(game, 0, 0, sprite);
    this.exists = false;
    this.anchor.setTo(0.5, 0.5);

    // BODY
    this.game.physics.enable(this);
    this.game.physics.arcade.gravity.y = 250;
    this.body.allowGravity = false;
    this.body.immovable = true;

    // VULNERABILITIES
    this.vulnerabilities = {
      gun: 1,
      bomb: 10
    };
    
    // OTHER
    this.maxHealth = 1;
    this.damage = 8;
  }

  stdReset(x, y) {
    this.reset(x, y);
    this.energy = this.maxHealth;
    this.exists = true;
    this.dying = false;
  }

  hit(bullet) {
    this.hit(bullet)
  }

  death() {
    this.exists = false;
  }
}