import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js'
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js'
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js'

import config from './config/config'
import Level1 from './states/Level1'
import LevelF from './states/LevelF'

import Boot from './states/Boot'

class Game extends Phaser.Game {
  constructor() {
    super(config)
    this.state.add('Boot', Boot)
    this.state.start('Boot')
    // this.state.add('Level1', Level1)
    // this.state.start('Level1')
  }
}

window.onload = function() {
  window.game = new Game()
}