import Phaser from 'phaser-ce'

import Player from '../other/player'

import Pool from '../other/pool'
import Weapon from '../other/weapons/weapon'
import Bullet from '../other/weapons/bullet'
import BossFightButton from '../other/bossFight/bossFightButton'
import BossFightTarget from '../other/bossFight/bossFightTarget'
import BossFightPlatform from '../other/bossFight/bossFightPlatform'
import BossFightLava from '../other/bossFight/bossFightLava'
import BossFightVillain from '../other/bossFight/bossFightVillain'

export default class LevelF extends Phaser.State {
  constructor() {
    super('LevelF')
  }

  preload() {
    this.game.load.tilemap('levelFMap', 'assets/tilemaps/levelF/LevelFMap.json', null, Phaser.Tilemap.TILED_JSON)
    this.game.load.image('levelFTileset', 'assets/tilemaps/levelF/LevelFTileset.png')

    this.game.load.spritesheet('player', 'assets/sprites/omino.png', 51, 71)

    this.game.load.image('bullet', 'assets/sprites/bullet.png')

    this.game.load.image('bossFightButton', 'assets/sprites/boss_fight/button/BossFightButton.png')
    this.game.load.image('bossFightButtonPressed', 'assets/sprites/boss_fight/button/BossFightButtonPressed.png')
    this.game.load.image('bossFightTarget', 'assets/sprites/boss_fight/target.png')
    this.game.load.image('bossFightPlatform', 'assets/sprites/boss_fight/platform.png')
    this.game.load.image('bossFightLava', 'assets/sprites/boss_fight/lava.png')
    this.game.load.image('bossFightVillain', 'assets/sprites/boss_fight/villain.png')

    this.game.load.audio('bullet', 'assets/audio/sfx/bullet.mp3');
  }

  create() {
    this.game.stage.backgroundColor = "#4488AA";

    this.platformDisabled = false
    this.fightStarted = false

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

    // VILLAIN
    this.villain = new BossFightVillain(this.game)
    this.game.add.existing(this.villain)
    this.villain.spawn(15*32, -4*32)

    // INIT BUTTON
    this.initButton = new BossFightButton(this.game)
    this.game.add.existing(this.initButton)
    this.initButton.spawn(25*32, 20*32)
    this.initButton.show()
    this.initButton.enable()

    // BUTTONS
    this.buttonPool = new Pool(this.game, BossFightButton, 6, true, 'Buttons')
    this.buttonPool.create(6*32, 15*32)
    this.buttonPool.create(10*32, 11*32)
    this.buttonPool.create(5*32, 7*32)
    this.buttonPool.create(25*32, 15*32)
    this.buttonPool.create(21*32, 11*32)
    this.buttonPool.create(26*32, 7*32)

    this.game.time.events.loop(Phaser.Timer.SECOND * 5, function(){
      if (this.fightStarted) {

        this.buttonPool.forEachAlive(function(i){
          i.disable()
        })

        this.game.time.events.add(Phaser.Timer.SECOND * 0.5, function(){
          this.buttonPool.getRandom(0).enable();
        }.bind(this))

      }
    }.bind(this))

    // TARGETS
    this.targetPool = new Pool(this.game, BossFightTarget, 2, true, 'Targets')
    this.targetPool.create(19*32, -5*32)
    this.targetPool.create(12*32, -10*32)

    this.targetBarrier = this.game.add.group()
    this.targetBarrier.addChild(this.game.add.sprite(12*32, 6*32))
    this.targetBarrier.addChild(this.game.add.sprite(19*32, 6*32))
    this.game.add.existing(this.targetBarrier)
    this.game.physics.arcade.enable(this.targetBarrier)
    this.targetPool.enableBody = true
    this.targetBarrier.setAll('width', 32)
    this.targetBarrier.setAll('height', 32)
    this.targetBarrier.setAll('body.immovable', true)
    this.targetBarrier.setAll('body.allowGravity', false)

    // PLATFORMS
    this.platformPool1 = new Pool(this.game, BossFightPlatform, 7, true, 'Platforms1')
    this.platformPool1.create(15*32, 21*32)
    this.platformPool1.create(14*32, 21*32)
    this.platformPool1.create(13*32, 21*32)
    this.platformPool1.create(12*32, 21*32)
    this.platformPool1.create(11*32, 21*32)
    this.platformPool1.create(10*32, 21*32)
    this.platformPool1.create(9*32, 21*32)

    this.platformPool2 = new Pool(this.game, BossFightPlatform, 7, true, 'Platforms2')
    this.platformPool2.create(16*32, 21*32)
    this.platformPool2.create(17*32, 21*32)
    this.platformPool2.create(18*32, 21*32)
    this.platformPool2.create(19*32, 21*32)
    this.platformPool2.create(20*32, 21*32)
    this.platformPool2.create(21*32, 21*32)
    this.platformPool2.create(22*32, 21*32)

    this.platformPoolBoss = new Pool(this.game, BossFightPlatform, 4, true, 'PlatformsBoss')
    this.platformPoolBoss.create(14*32, 5*32)
    this.platformPoolBoss.create(15*32, 5*32)
    this.platformPoolBoss.create(16*32, 5*32)
    this.platformPoolBoss.create(17*32, 5*32)

    // LAVA
    this.lavaPool = new Pool(this.game, BossFightLava, 14, true, 'Lava')
    this.lavaPool.create(9*32, 22*32)
    this.lavaPool.create(10*32, 22*32)
    this.lavaPool.create(11*32, 22*32)
    this.lavaPool.create(12*32, 22*32)
    this.lavaPool.create(13*32, 22*32)
    this.lavaPool.create(14*32, 22*32)
    this.lavaPool.create(15*32, 22*32)
    this.lavaPool.create(16*32, 22*32)
    this.lavaPool.create(17*32, 22*32)
    this.lavaPool.create(18*32, 22*32)
    this.lavaPool.create(19*32, 22*32)
    this.lavaPool.create(20*32, 22*32)
    this.lavaPool.create(21*32, 22*32)
    this.lavaPool.create(22*32, 22*32)

    // WEAPONS
    this.gun = new Weapon(this.game, Bullet, 64, false, {bulletSpeed: 500, fireRate: 270, bulletType: 'gun'}, 'Gun')
  }

  update() {
    // PLAYER PHYSIC COLLISIONS
    this.game.physics.arcade.collide(this.player, this.layer)
    this.game.physics.arcade.collide(this.player, this.platformPool1)
    this.game.physics.arcade.collide(this.player, this.platformPool2)
    this.game.physics.arcade.collide(this.player, this.platformPoolBoss)
    this.game.physics.arcade.overlap(this.player, this.lavaPool, function(player, lava){
      player.death()
    })
    this.game.physics.arcade.overlap(this.player, this.initButton, function(player, initButton){
      initButton.disable()
      this.initFight()
    }.bind(this))
    
    this.game.physics.arcade.overlap(this.player, this.buttonPool, function(player, button){
      if (button.enabled == true) {
        this.buttonPool.forEachAlive(function(i){
          i.disable()
        })

        for (let i = 0; i < this.platformPool1.children.length; i++) {
          this.game.time.events.add(Phaser.Timer.SECOND * (0.1 * i), function(){
            this.platformPool1.children[i].disappear()
          }.bind(this))
        }

        for (let i = 0; i < this.platformPool2.children.length; i++) {
          this.game.time.events.add(Phaser.Timer.SECOND * (0.1 * i), function(){
            this.platformPool2.children[i].disappear()
          }.bind(this))
        }

        this.game.time.events.add(Phaser.Timer.SECOND * 2, function(){
          for (let i = this.platformPool1.children.length - 1; i >= 0 ; i--) {
            this.platformPool1.getChildAt(i).appear(i)
          }
        }.bind(this))

        this.game.time.events.add(Phaser.Timer.SECOND * 2, function(){
          for (let i = this.platformPool2.children.length - 1; i >= 0 ; i--) {
            this.platformPool2.getChildAt(i).appear(i)
          }
        }.bind(this))

        this.platformDisabled = true

        this.game.time.events.add(Phaser.Timer.SECOND * 5, function(){
          this.platformDisabled = false
        }.bind(this))
      }
    }.bind(this))

    // VILLAIN PHYSIC COLLISIONS
    this.game.physics.arcade.collide(this.villain, this.platformPoolBoss, function(){
      if (!this.fightStarted) {
        this.game.camera.shake(0.01, 1000)
        this.fightStarted = true
      }
    }.bind(this))
    this.game.physics.arcade.collide(this.villain, this.lavaPool, function(villain, lava){
      this.platformPoolBoss.forEach(function(i){i.appearInstatly()})
      villain.position.x = 15*32
      villain.position.y = 2*32
    }.bind(this))

    // GUN PHYSIC COLLISIONS
    this.game.physics.arcade.collide(this.gun, this.layer, function(bullet, layer){
      bullet.exists = false
    })

    this.game.physics.arcade.collide(this.gun, this.targetPool, function(bullet, target){
      bullet.exists = false
      if (this.platformDisabled) {
        this.platformPoolBoss.forEachAlive(function(i){
          i.disappear(2)
        })
      }
    }.bind(this))

    // OTHER
    this.game.physics.arcade.collide(this.targetPool, this.targetBarrier)

    if (this.platformDisabled) {
      this.buttonPool.forEachAlive(function(i){
        i.disable()
      })
    }

    // GUN
    if (this.commands.controlsLeft.isDown) {
      this.gun.fire(this.player, {direction: 180})
    }

    if (this.commands.controlsRight.isDown) {
      this.gun.fire(this.player, {direction: 0})
    }
  }

  initFight() {
    this.villain.body.allowGravity = true
    this.game.time.events.add(Phaser.Timer.SECOND * 1.6, function(){
      for (let i = 0; i < this.buttonPool.children.length; i++) {
        this.game.time.events.add(Phaser.Timer.SECOND * (0.15 * i), function(){
          this.buttonPool.children[i].show()
        }.bind(this))
      }
      this.targetPool.setAll('body.allowGravity', true)
      this.game.time.events.add(Phaser.Timer.SECOND * 4, function(){
        this.targetPool.setAll('body.immovable', true)
        this.targetPool.setAll('body.gravity', 10)
      }.bind(this))
    }.bind(this))
  }
}