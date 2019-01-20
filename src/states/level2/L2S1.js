/******* IMPORTS *******/
import Player from '../../other/player'
import Weapon from '../../other/weapons/weapon'
import Bullet from '../../other/weapons/bullet'
import Bomb from '../../other/weapons/bomb'
import Ghost from '../../other/enemies/ghost'
import Soul from '../../other/enemies/soul'
import Bible from '../../other/bible'

export default class L2S1 extends Phaser.State {
  constructor() {
    super('L2S1')
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
      this.game.height - this.game.cache.getImage('l2s1BG_1').height,
      this.game.cache.getImage('l2s1BG_1').width,
      this.game.cache.getImage('l2s1BG_1').height,
      'l2s1BG_1'
    );
    this.parallax2 = this.game.add.tileSprite(0,
        this.game.height - this.game.cache.getImage('l2s1BG_2').height,
        this.game.cache.getImage('l2s1BG_2').width,
        this.game.cache.getImage('l2s1BG_2').height,
        'l2s1BG_2'
    );
    this.parallax3 = this.game.add.tileSprite(0,
        this.game.height - this.game.cache.getImage('l2s1BG_3').height,
        this.game.cache.getImage('l2s1BG_3').width,
        this.game.cache.getImage('l2s1BG_3').height,
        'l2s1BG_3'
    );

    /******* WORLD *******/
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.game.world.setBounds(0, 0, 96*32, 24*32)

    /******* TILEMAP CUSTOM LAYERS *******/
    this.map = this.game.add.tilemap('l2s1Map')
    this.map.addTilesetImage('l2s1Tileset', 'l2s1Tileset')
    this.map.customLayers = [];
    this.MAP_OBJECTS_INDEX = [307];
    for (let i=3; i>0; i--) {
      let layer = this.map.createLayer('layer' + i)
      this.game.physics.arcade.enable(layer)
      this.map.setCollisionByExclusion(this.MAP_OBJECTS_INDEX, true, layer)
      this.map.customLayers[i-1] = layer
    }

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
    this.player.spawn(5*32, 4*32)
  }

  update() {
    /******* PARALLAX BGs *******/
    // PARALLAX
    if (this.player.position.x > 15*32 && this.player.position.x < 81*32) {
      if (this.playerOldPos.x > this.player.body.x) {
        this.parallax1.tilePosition.x += 0.1;
        this.parallax2.tilePosition.x += 0.2;
        this.parallax3.tilePosition.x += 0.4;
      }
  
      if (this.playerOldPos.x < this.player.body.x) {
        this.parallax1.tilePosition.x -= 0.1;
        this.parallax2.tilePosition.x -= 0.2;
        this.parallax3.tilePosition.x -= 0.4;
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

  }

  collisionHandler(index) {
    return function (sprite, layer) {
      console.log(index)
    }
  }
}