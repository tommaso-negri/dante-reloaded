export default class BombCounter extends Phaser.Sprite {
  constructor(game) {
    super(game, 25, 25, 'bombCounter');
    this.exists = true;
    this.scale.set(0.7, 0.7)

    this.numBombs = localStorage.getItem('numBombs')

    this.fixedToCamera = true;

    this.animations.add('vuoto', [0], 10, true);
    this.animations.add('una', [1], 10, true);
    this.animations.add('due', [2], 10, true);
    this.animations.add('tre', [3], 10, true);
  }

  stdReset(x, y) {
    this.reset(x, y);
    this.exists = true;
  }

  spawn(x, y, data) {
    this.stdReset(x, y);
  }

  dataGatering(numBombs) {
    this.numBombs = numBombs
  }

  update() {
    if (this.numBombs == 0) {
      this.animations.play('vuoto')
    }
    if (this.numBombs == 1) {
      this.animations.play('una')
    } else if (this.numBombs == 2) {
      this.animations.play('due')
    } else if (this.numBombs == 3) {
      this.animations.play('tre')
    }
  }
}