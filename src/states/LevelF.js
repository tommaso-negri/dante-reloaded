import Phaser from 'phaser-ce'

import Player from '../other/player'

import Pool from '../other/pool'
import BossFightButton from '../other/bossFight/bossFightButton'
import BossFightTarget from '../other/bossFight/bossFightTarget'
import BossFightPlatform from '../other/bossFight/bossFightPlatform'

export default class LevelF extends Phaser.State {
  constructor() {
    super('LevelF')
  }

  preload() {
    this.game.load.tilemap('levelFMap', 'assets/tilemaps/levelF/LevelFMap.json', null, Phaser.Tilemap.TILED_JSON)
    this.game.load.image('levelFTileset', 'assets/tilemaps/levelF/LevelFTileset.png')

    game.load.spritesheet('player', 'assets/sprites/omino.png', 51, 71)

    this.game.load.image('bossFightButton', 'assets/sprites/boss_fight/button/BossFightButton.png')
    this.game.load.image('bossFightButtonPressed', 'assets/sprites/boss_fight/button/BossFightButtonPressed.png')
    this.game.load.image('bossFightTarget', 'assets/sprites/boss_fight/target.png')
    this.game.load.image('bossFightPlatform', 'assets/sprites/boss_fight/platform.png')
  }

  create() {
    this.game.stage.backgroundColor = "#4488AA";

    // WORLD, MAP, TILESET
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.map = game.add.tilemap('levelFMap')
    this.map.addTilesetImage('LevelFTileset', 'levelFTileset')
    this.layer = this.map.createLayer('Livello tile 1')
    this.map.setCollisionBetween(1,2)
    this.layer.resizeWorld()

    // PLAYER COMMANDS
    this.commands = {
      up: game.input.keyboard.addKey(Phaser.Keyboard.W),
      down: game.input.keyboard.addKey(Phaser.Keyboard.S),
      left: game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: game.input.keyboard.addKey(Phaser.Keyboard.D),
      spaceBar: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
      shift: game.input.keyboard.addKey(Phaser.Keyboard.SHIFT),
      controlsUp: game.input.keyboard.addKey(Phaser.Keyboard.UP),
      controlsDown: game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
      controlsLeft: game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
      controlsRight: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
    };

    // PLAYER
    this.player = new Player(this.game, this.commands)
    this.game.add.existing(this.player)
    this.player.spawn(6*32, 20*32)

    // BUTTONS
    this.buttonPool = new Pool(this.game, BossFightButton, 6, true, 'Buttons')
    this.buttonPool.create(6*32, 15*32)
    this.buttonPool.create(10*32, 11*32)
    this.buttonPool.create(5*32, 7*32)
    this.buttonPool.create(25*32, 15*32)
    this.buttonPool.create(21*32, 11*32)
    this.buttonPool.create(26*32, 7*32)

    this.game.time.events.loop(Phaser.Timer.SECOND * 5, function(){
      this.buttonPool.forEachAlive(function(i){
        i.disable()
      })
      this.game.time.events.add(Phaser.Timer.SECOND * 0.5, function(){
        this.buttonPool.getRandom(0).enable();
      }.bind(this))
    }.bind(this))

    // TARGETS
    this.targetPool = new Pool(this.game, BossFightTarget, 2, true, 'Targets')
    this.targetPool.create(19*32, 5*32)
    this.targetPool.create(12*32, 5*32)

    // PLATFORMS
    this.platformPool1 = new Pool(this.game, BossFightPlatform, 7, true, 'Platforms')
    this.platformPool1.create(9*32, 21*32)
    this.platformPool1.create(10*32, 21*32)
    this.platformPool1.create(11*32, 21*32)
    this.platformPool1.create(12*32, 21*32)
    this.platformPool1.create(13*32, 21*32)
    this.platformPool1.create(14*32, 21*32)
    this.platformPool1.create(15*32, 21*32)

    this.platformPool2 = new Pool(this.game, BossFightPlatform, 7, true, 'Platforms')
    this.platformPool2.create(16*32, 21*32)
    this.platformPool2.create(17*32, 21*32)
    this.platformPool2.create(18*32, 21*32)
    this.platformPool2.create(19*32, 21*32)
    this.platformPool2.create(20*32, 21*32)
    this.platformPool2.create(21*32, 21*32)
    this.platformPool2.create(22*32, 21*32)
  }

  update() {
    // PHYSIC COLLISIONS
    this.game.physics.arcade.collide(this.player, this.layer)
    this.game.physics.arcade.collide(this.player, this.platformPool1)
    this.game.physics.arcade.collide(this.player, this.platformPool2)

    // ITEMS
    this.game.physics.arcade.overlap(this.player, this.buttonPool, function(player, button){
      if (button.enabled == true) {
        this.buttonPool.forEachAlive(function(i){
          i.disable()
        })

        this.platformPool1.forEachAlive(function(i){
          i.disappear()
        })

        this.platformPool2.forEachAlive(function(i){
          i.disappear()
        })
      }
    }.bind(this))
  }
}