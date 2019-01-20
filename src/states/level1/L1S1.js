/******* IMPORTS *******/
import Player from '../../other/player'
import Weapon from '../../other/weapons/weapon'
import Bullet from '../../other/weapons/bullet'
import Bomb from '../../other/weapons/bomb'
import Ghost from '../../other/enemies/ghost'
import Soul from '../../other/enemies/soul'
import Bible from '../../other/bible'

import L1S2 from './L1S2'

var MAP_OBJECTS_INDEX = [8736, 8737, 8738, 8739, 8740];

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
      this.game.width,
      this.game.cache.getImage('l1s1BG_1').height,
      'l1s1BG_1'
    );
    this.parallax2 = this.game.add.tileSprite(0,
        this.game.height - this.game.cache.getImage('l1s1BG_2').height,
        this.game.width,
        this.game.cache.getImage('l1s1BG_2').height,
        'l1s1BG_2'
    );
    this.parallax3 = this.game.add.tileSprite(0,
        this.game.height - this.game.cache.getImage('l1s1BG_3').height,
        this.game.width,
        this.game.cache.getImage('l1s1BG_3').height,
        'l1s1BG_3'
    );
    this.parallax4 = this.game.add.tileSprite(0,
        this.game.height - this.game.cache.getImage('l1s1BG_4').height,
        this.game.width,
        this.game.cache.getImage('l1s1BG_4').height,
        'l1s1BG_4'
    );
    this.parallax1.fixedToCamera =  true;
    this.parallax2.fixedToCamera =  true;
    this.parallax3.fixedToCamera =  true;
    this.parallax4.fixedToCamera =  true;

    /******* WORLD, MAP, TILESET *******/
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.game.world.setBounds(0, 0, 96*32, 24*32)
    this.map = this.game.add.tilemap('l1s1Map')
    this.map.addTilesetImage('l1s1Tileset', 'l1s1Tileset')

    // TEST
    // setting up layers for the tilemap.
    this.map.myLayers = [];
    // multilayered-plataformer tilemap has 4 layers named:
    //     layer1, layer2, layer3 and layer4
    for (let i=4; i>0; i--) {
        let layer = this.map.createLayer('layer' + i);
        // enabling collisions for this layer
        this.game.physics.arcade.enable(layer);
        // setting collision for one different item at each layer.
        this.map.setCollisionByExclusion([MAP_OBJECTS_INDEX[i-1]], true, layer);
        // this.map.setCollisionBetween(1,9216)
        // setting a different transparency to each layer
        layer.alpha = (5-i)/4;
        this.map.myLayers[i-1] = layer;
    }
    // END TEST
  
    // this.layer2 = this.map.createLayer('Spikes')
    // this.layer = this.map.createLayer('Terrain')
    // this.layer3 = this.map.createLayer('Water&Spears')
    // this.layer4 = this.map.createLayer('Decorations')
    // map.setCollision(1)
    // this.map.setCollisionBetween(1,9216)
    // this.layer.resizeWorld();

    // this.game.physics.arcade.enable(this.layer2, Phaser.Physics.ARCADE, true)

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
    this.player.spawn(1*32, 17*32)
  }

  update() {
    // this.game.physics.arcade.collide(this.player, this.layer);
    // this.game.physics.arcade.collide(this.player, this.layer2, function(){
    //   console.log('hello')
    // });

    if (this.player.position.x > 89*32) {
      this.state.add('L1S2', L1S2)
      this.state.start('L1S2')
    }

    /******* PARALLAX BGs *******/
    // PARALLAX
    if (this.player.position.x > 8*32) {
      if (this.playerOldPos.x > this.player.body.x) {
        this.parallax1.tilePosition.x += 0.1;
        this.parallax2.tilePosition.x += 0.8;
        this.parallax3.tilePosition.x += 1.2;
        this.parallax4.tilePosition.x += 1.6;
      }
  
      if (this.playerOldPos.x < this.player.body.x) {
        this.parallax1.tilePosition.x -= 0.1;
        this.parallax2.tilePosition.x -= 0.8;
        this.parallax3.tilePosition.x -= 1.2;
        this.parallax4.tilePosition.x -= 1.6;
      }
    }
    // UPDATE PLAYER OLD POSITION
    if (this.player.body.velocity.x != 0 || this.player.body.y != 0) {
      this.playerOldPos.x = this.player.body.x;
      this.playerOldPos.y = this.player.body.y;
    }

    // TEST
    for (let i=0; i<4; i++) {
      this.game.physics.arcade.collide(this.map.myLayers[i], this.player, this.collisionHandler(i));
    }
    // END TEST

  }

  collisionHandler(index) {
    return function (sprite, layer) {
      console.log(index)
    };
  };

}