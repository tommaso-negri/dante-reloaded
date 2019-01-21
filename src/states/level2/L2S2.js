/******* IMPORTS *******/
import Player from '../../other/player'
import Weapon from '../../other/weapons/weapon'
import Bullet from '../../other/weapons/bullet'
import Bomb from '../../other/weapons/bomb'
import Ghost from '../../other/enemies/ghost'
import Soul from '../../other/enemies/soul'
import Bible from '../../other/bible'
import Stairs from '../../other/stairs'
import Pool from '../../other/pool'

import L2S3 from './L2S3'

export default class L2S2 extends Phaser.State {
  constructor() {
    super('L2S2')
  }

  preload() {

  }

  create() {
    /******* VARIABLES *******/
    this.playerOldPos = {
      x: 0,
      y: 0
    }

    /******* SFX *******/
    this.sfxBombCollection = this.game.add.audio('bombCollection')
    this.sfxHellBackground = this.game.add.audio('hellBackground')

    /******* PARALLAX BGs *******/
    this.parallax1 = this.game.add.tileSprite(0,
      this.game.height - this.game.cache.getImage('l2s2BG_1').height,
      this.game.cache.getImage('l2s2BG_1').width,
      this.game.cache.getImage('l2s2BG_1').height,
      'l2s2BG_1'
    );
    this.parallax2 = this.game.add.tileSprite(0,
        this.game.height - this.game.cache.getImage('l2s2BG_2').height,
        this.game.cache.getImage('l2s2BG_2').width,
        this.game.cache.getImage('l2s2BG_2').height,
        'l2s2BG_2'
    );

    /******* WORLD *******/
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.game.world.setBounds(0, 0, 96*32, 24*32)

    /******* TILEMAP CUSTOM LAYERS *******/
    this.map = this.game.add.tilemap('l2s2Map')
    this.map.addTilesetImage('l2s2Tileset', 'l2s2Tileset')
    this.map.customLayers = [];
    this.MAP_OBJECTS_INDEX = [307];
    for (let i=3; i>0; i--) {
      let layer = this.map.createLayer('layer' + i)
      this.game.physics.arcade.enable(layer)
      this.map.setCollisionByExclusion(this.MAP_OBJECTS_INDEX, true, layer)
      this.map.customLayers[i-1] = layer
    }

    /******* STAIRS *******/
    this.stairsPool = new Pool(this.game, Stairs, 3, true, 'Stairs')
    this.stairsPool.create(88*32, 22*32)
    this.stairsPool.create(88*32, 26*32)
    this.stairsPool.create(7*32, -1*32)
    this.stairsPool.create(7*32, -5*32)

    this.safeBarrier1 = this.game.add.sprite(87*32, 28*32)
    this.game.physics.arcade.enable(this.safeBarrier1)
    this.safeBarrier1.body.allowGravity = false
    this.safeBarrier1.body.immovable = true
    this.safeBarrier1.width = 4*32
    this.safeBarrier1.height = 1*32

    this.safeBarrier2 = this.game.add.sprite(85*32, 24*32)
    this.game.physics.arcade.enable(this.safeBarrier2)
    this.safeBarrier2.body.allowGravity = false
    this.safeBarrier2.body.immovable = true
    this.safeBarrier2.width = 1*32
    this.safeBarrier2.height = 4*32

    this.safeBarrier3 = this.game.add.sprite(90*32, 24*32)
    this.game.physics.arcade.enable(this.safeBarrier3)
    this.safeBarrier3.body.allowGravity = false
    this.safeBarrier3.body.immovable = true
    this.safeBarrier3.width = 1*32
    this.safeBarrier3.height = 4*32


    /******* PLAYER *******/
    // PLAYER COMMANDS
    this.commands = {
      up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
      down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
      left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
      spaceBar: this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
      shift: this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT),
      controlsUp: this.game.input.keyboard.addKey(Phaser.Keyboard.UP),
      controlsDown: this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
      controlsLeft: this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
      controlsRight: this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
    }
    // PLAYER
    this.player = new Player(this.game, this.commands)
    this.game.add.existing(this.player)
    this.player.spawn(87*32 + 30, 25*32)
  }

  update() {
    /******* PARALLAX BGs *******/
    // PARALLAX
    if (this.player.position.x > 15*32 && this.player.position.x < 81*32) {
      if (this.playerOldPos.x > this.player.body.x) {
        this.parallax1.tilePosition.x += 0.0;
        this.parallax2.tilePosition.x += 0.1;
      }
  
      if (this.playerOldPos.x < this.player.body.x) {
        this.parallax1.tilePosition.x -= 0.0;
        this.parallax2.tilePosition.x -= 0.1;
      }
    }
    // UPDATE PLAYER OLD POSITION
    if (this.player.body.velocity.x != 0 || this.player.body.y != 0) {
      this.playerOldPos.x = this.player.body.x;
      this.playerOldPos.y = this.player.body.y;
    }

    /******* TILEMAP CUSTOM LAYERS *******/
    for (let i=0; i<3; i++) {
      if (i == 0) {
        this.game.physics.arcade.collide(this.map.customLayers[i], this.player, this.collisionHandler(i))
      }
      if (i == 1) {
        this.game.physics.arcade.collide(this.map.customLayers[i], this.player, this.collisionHandler(i))
      }
    }

    /******* STAIRS *******/
    this.player.settings.onTheStairs = false
    this.game.physics.arcade.overlap(this.player, this.stairsPool, function(player, stairs){
      player.settings.onTheStairs = true
    })
    this.game.physics.arcade.collide(this.player, this.safeBarrier1)
    this.game.physics.arcade.collide(this.player, this.safeBarrier2)
    this.game.physics.arcade.collide(this.player, this.safeBarrier3)

    /******* NEXT LEVEL *******/
    if (this.player.position.x < 10*32 && this.player.position.x > 5*32 && this.player.position.y < -1*32) {
      this.state.add('L2S3', L2S3)
      this.state.start('L2S3')
    }

  }

  collisionHandler(index) {
    return function (sprite, layer) {
      console.log(index)
    }
  }
}