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

import L1S2 from './L1S2'

export default class L1S1 extends Phaser.State {
  constructor() {
    super('L1S1')
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
      this.game.height - this.game.cache.getImage('l1s1BG_1').height,
      this.game.cache.getImage('l1s1BG_1').width,
      this.game.cache.getImage('l1s1BG_1').height,
      'l1s1BG_1'
    );
    this.parallax2 = this.game.add.tileSprite(0,
        this.game.height - this.game.cache.getImage('l1s1BG_2').height,
        this.game.cache.getImage('l1s1BG_2').width,
        this.game.cache.getImage('l1s1BG_2').height,
        'l1s1BG_2'
    );
    this.parallax3 = this.game.add.tileSprite(0,
        this.game.height - this.game.cache.getImage('l1s1BG_3').height,
        this.game.cache.getImage('l1s1BG_3').width,
        this.game.cache.getImage('l1s1BG_3').height,
        'l1s1BG_3'
    );
    this.parallax4 = this.game.add.tileSprite(0,
        this.game.height - this.game.cache.getImage('l1s1BG_4').height,
        this.game.cache.getImage('l1s1BG_4').width,
        this.game.cache.getImage('l1s1BG_4').height,
        'l1s1BG_4'
    );

    /******* WORLD *******/
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.game.world.setBounds(0, 0, 96*32, 24*32)

    /******* TILEMAP CUSTOM LAYERS *******/
    this.map = this.game.add.tilemap('l1s1Map')
    this.map.addTilesetImage('l1s1Tileset', 'l1s1Tileset')
    this.map.customLayers = [];
    this.MAP_OBJECTS_INDEX = [307];
    for (let i=4; i>0; i--) {
      let layer = this.map.createLayer('layer' + i)
      this.game.physics.arcade.enable(layer)
      this.map.setCollisionByExclusion(this.MAP_OBJECTS_INDEX, true, layer)
      this.map.customLayers[i-1] = layer
    }

    /******* STAIRS *******/
    this.stairsPool = new Pool(this.game, Stairs, 3, true, 'Stairs')
    this.stairsPool.create(88*32, 22*32)
    // this.stairsPool.create(7*32, -6*32)

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
    this.player.spawn(2*32, 17*32)
  }

  update() {
    /******* PARALLAX BGs *******/
    // PARALLAX
    if (this.player.position.x > 15*32 && this.player.position.x < 81*32) {
      if (this.playerOldPos.x > this.player.body.x) {
        this.parallax1.tilePosition.x += 0.0;
        this.parallax2.tilePosition.x += 0.05;
        this.parallax3.tilePosition.x += 0.1;
        this.parallax4.tilePosition.x += 0.2;
      }
  
      if (this.playerOldPos.x < this.player.body.x) {
        this.parallax1.tilePosition.x -= 0.0;
        this.parallax2.tilePosition.x -= 0.05;
        this.parallax3.tilePosition.x -= 0.1;
        this.parallax4.tilePosition.x -= 0.2;
      }
    }
    // UPDATE PLAYER OLD POSITION
    if (this.player.body.velocity.x != 0 || this.player.body.y != 0) {
      this.playerOldPos.x = this.player.body.x;
      this.playerOldPos.y = this.player.body.y;
    }

    /******* TILEMAP CUSTOM LAYERS *******/
    for (let i=0; i<4; i++) {
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

    /******* NEXT LEVEL *******/
    if (this.player.position.x < 90*32 && this.player.position.x > 85*32 && this.player.position.y > 24*32) {
      this.state.add('L1S2', L1S2)
      this.state.start('L1S2')
    }

  }

  render() {
    this.game.debug.start(32, 32);
    this.game.debug.line(`Health: ${this.player.health}/${this.player.maxHealth}`);
    this.game.debug.line(`Velocity: ${this.player.body.velocity.y}`);
  }

  collisionHandler(index) {
    return function (sprite, layer) {
      console.log(index)
    }
  }

}