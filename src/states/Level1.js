import Phaser from 'phaser-ce';

let player;

export default class Level1 extends Phaser.State {
  constructor() {
    super('Level1')
  }

  preload() {
    game.load.image('logo', './assets/images/phaser.png');
    let jump;
  }

  create() {
    var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
    logo.anchor.setTo(0.5, 0.5);
  }

  update() {

  }
}