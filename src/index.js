import Phaser from 'phaser';
import config from './config/config';
import Level1 from './scenes/Level1'

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('Level1', Level1);
    this.scene.start('Level1')
  }
}

window.onload = function() {
  window.game = new Game();
}