/******* IMPORTS *******/
import Player from '../../other/player'
import Weapon from '../../other/weapons/weapon'
import Bullet from '../../other/weapons/bullet'
import Bomb from '../../other/weapons/bomb'
import Ghost from '../../other/enemies/ghost'
import Skull from '../../other/enemies/skull'
import Devil from '../../other/enemies/devil'
import Bible from '../../other/bible'
import Stairs from '../../other/stairs'
import Pool from '../../other/pool'
import BombCounter from '../../other/inGameUi/bombCounter'

import LevelF from '../LevelF'

export default class L2S3 extends Phaser.State {
  constructor() {
    super('L2S3')
  }

  create() {
    /******* VARIABLES *******/
    this.playerOldPos = {
      x: 0,
      y: 0
    }
    this.numBombs = localStorage.getItem('numBombs')
    this.bombDropping = false

    /******* SFX *******/
    this.sfxBombCollection = this.game.add.audio('bombCollection')
    this.sfxHellBackground = this.game.add.audio('hellBackground')

    /******* PARALLAX BGs *******/
    this.parallax1 = this.game.add.tileSprite(0,
      this.game.height - this.game.cache.getImage('l2s3BG_1').height,
      this.game.cache.getImage('l2s3BG_1').width,
      this.game.cache.getImage('l2s3BG_1').height,
      'l2s3BG_1'
    );
    this.parallax2 = this.game.add.tileSprite(0,
        this.game.height - this.game.cache.getImage('l2s3BG_2').height,
        this.game.cache.getImage('l2s3BG_2').width,
        this.game.cache.getImage('l2s3BG_2').height,
        'l2s3BG_2'
    );
    this.parallax3 = this.game.add.tileSprite(0,
        this.game.height - this.game.cache.getImage('l2s3BG_3').height,
        this.game.cache.getImage('l2s3BG_3').width,
        this.game.cache.getImage('l2s3BG_3').height,
        'l2s3BG_3'
    );

    /******* WORLD *******/
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.game.world.setBounds(0, 0, 96*32, 24*32)

    /******* TILEMAP CUSTOM LAYERS *******/
    this.map = this.game.add.tilemap('l2s3Map')
    this.map.addTilesetImage('l2s3Tileset', 'l2s3Tileset')
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
    this.stairsPool.create(8*32, 22*32)
    this.stairsPool.create(8*32, 26*32)

    this.safeBarrier1 = this.game.add.sprite(5*32, 28*32)
    this.game.physics.arcade.enable(this.safeBarrier1)
    this.safeBarrier1.body.allowGravity = false
    this.safeBarrier1.body.immovable = true
    this.safeBarrier1.width = 4*32
    this.safeBarrier1.height = 1*32

    this.safeBarrier2 = this.game.add.sprite(5*32, 24*32)
    this.game.physics.arcade.enable(this.safeBarrier2)
    this.safeBarrier2.body.allowGravity = false
    this.safeBarrier2.body.immovable = true
    this.safeBarrier2.width = 1*32
    this.safeBarrier2.height = 4*32

    this.safeBarrier3 = this.game.add.sprite(10*32, 24*32)
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
    this.player.spawn(83*32, 9*32)

    /******* BIBLES *******/
    this.biblePool = new Pool(game, Bible, 2, true, 'Bibles');
    this.biblePool.create(18*32, 11*32);
    this.biblePool.create(91*32, 11*32);
    // this.biblePool.create(10*32, 12*32);

    /******* ENEMIES *******/
    // SKULLS
    // this.skullPool = new Pool(this.game, Skull, 5, true, 'Skulls')
    // this.skullPool.create(9*32, 13*32, {patrollL: 9*32, patrollR: 11*32});
    // GHOSTS
    this.ghostPool = new Pool(this.game, Ghost, 5, true, 'Ghosts')
    this.ghostPool.create(9*32, 13*32, {patrollL: 9*32, patrollR: 11*32});
    this.ghostPool.create(82*32, 10*32, {patrollL: 81*32, patrollR: 85*32});
    // DEVIL
    this.devilPool = new Pool(this.game, Devil, 5, true, 'Devils')
    this.devilPool.create(11*32, 21*32, {patrollL: 10*32, patrollR: 13*32});
    this.devilPool.create(60*32, 15*32, {patrollL: 60*32, patrollR: 62*32});

    /******* WEAPONS *******/
    // GUN
    this.gun = new Weapon(game, Bullet, 64, false, {bulletSpeed: 500, fireRate: 270, bulletType: 'gun'}, 'Gun');
    // BOMB
    this.bomb = new Weapon(game, Bomb, 3, false, {bulletSpeed: 0, fireRate: 300, bulletType: 'bomb'}, 'Bomb');

    /******* GAME UI *******/
    this.bombUI = new BombCounter(this.game)
    this.game.add.existing(this.bombUI);

    /******* DEVIL FINAL LEVEL *******/
    this.devilFinalLevel = this.game.add.sprite(96*32, 0*32, 'devilFinalLevel')
    this.devilFinalLevel.anchor.set(1, 0)
  }

  update() {
    /******* PARALLAX BGs *******/
    // PARALLAX
    if (this.player.position.x > 15*32 && this.player.position.x < 81*32) {
      if (this.playerOldPos.x > this.player.body.x) {
        this.parallax1.tilePosition.x += 0.0;
        this.parallax2.tilePosition.x += 0.05;
        this.parallax3.tilePosition.x += 0.1;
      }
  
      if (this.playerOldPos.x < this.player.body.x) {
        this.parallax1.tilePosition.x -= 0.0;
        this.parallax2.tilePosition.x -= 0.05;
        this.parallax3.tilePosition.x -= 0.1;
      }
    }
    // UPDATE PLAYER OLD POSITION
    if (this.player.body.velocity.x != 0 || this.player.body.y != 0) {
      this.playerOldPos.x = this.player.body.x;
      this.playerOldPos.y = this.player.body.y;
    }

    /******* PLAYER HIT *******/
    this.game.physics.arcade.overlap(this.player, this.skullPool, function(player, enemy){
      player.hit(enemy);
    })
    this.game.physics.arcade.overlap(this.player, this.ghostPool, function(player, enemy){
      player.hit(enemy);
    })
    this.game.physics.arcade.overlap(this.player, this.devilPool, function(player, enemy){
      player.hit(enemy);
    })

    /******* DROPS *******/
    this.game.physics.arcade.overlap(this.player, this.biblePool, function(player, bible) {

      if (this.numBombs < 3) {
        this.numBombs++
        localStorage.setItem('numBombs', `${this.numBombs}`)
        bible.hit();
        this.sfxBombCollection.play()
      }
      this.bombUI.dataGatering(this.numBombs);
    }.bind(this));

    /******* GUN *******/
    if (this.commands.controlsLeft.isDown) {
      this.gun.fire(this.player, {direction: 180})
    }

    if(this.commands.controlsRight.isDown) {
      this.gun.fire(this.player, {direction: 0})
    }

    /******* BOMBS DROPPING *******/
    if (this.inputIsActive(Phaser.Keyboard.DOWN)) {
      this.bombDropping = true;
    }
    if (this.numBombs > 0 && this.bombDropping && this.inputReleased(Phaser.Keyboard.DOWN)) {
      this.numBombs -= 1;
      localStorage.setItem('numBombs', `${this.numBombs}`)
      this.bombUI.dataGatering(this.numBombs);
      this.bombDropping = false;
      this.bomb.fire(this.player, {direction: 0});
    }

    /******* ENEMIES HIT *******/
    this.game.physics.arcade.overlap(this.gun, this.skullPool, function(bullet, enemy){
      enemy.hit(bullet);
      bullet.exists = false;
    })
    this.game.physics.arcade.overlap(this.gun, this.ghostPool, function(bullet, enemy){
      enemy.hit(bullet);
      bullet.exists = false;
    })
    this.game.physics.arcade.overlap(this.gun, this.devilPool, function(bullet, enemy){
      enemy.hit(bullet);
      bullet.exists = false;
    })
    this.game.physics.arcade.overlap(this.bomb, this.skullPool, function(bullet, enemy){
      enemy.hit(bullet);
    })
    this.game.physics.arcade.overlap(this.bomb, this.ghostPool, function(bullet, enemy){
      enemy.hit(bullet);
    })
    this.game.physics.arcade.overlap(this.bomb, this.devilPool, function(bullet, enemy){
      enemy.hit(bullet);
    })

    /******* TILEMAP CUSTOM LAYERS *******/
    for (let i=0; i<3; i++) {
      if (i == 0) {
        this.game.physics.arcade.collide(this.map.customLayers[i], this.player, this.collisionHandler(i))
        this.game.physics.arcade.collide(this.map.customLayers[i], this.skullPool)
        this.game.physics.arcade.collide(this.map.customLayers[i], this.ghostPool)
        this.game.physics.arcade.collide(this.map.customLayers[i], this.devilPool)
        this.game.physics.arcade.collide(this.map.customLayers[i], this.biblePool)
        this.game.physics.arcade.collide(this.map.customLayers[i], this.gun, this.collisionHandlerGun(i))
        this.game.physics.arcade.collide(this.map.customLayers[i], this.bomb)
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
    if (this.player.position.x > 86*32 && this.player.position.y > 2*32 && this.player.position.y < 6*32) {
      this.player.commands.right.isDown = true
      this.player.settings.acceleration = 6000
    }
    if (this.player.position.x > 89*32 && this.player.position.x < 91*32 && this.player.position.y > 2*32 && this.player.position.y < 6*32) {
      this.game.camera.shake(0.002, 300)
    }
    if (this.player.position.x > 90*32 && this.player.position.x < 92*32 && this.player.position.y > 2*32 && this.player.position.y < 6*32) {
      this.game.camera.shake(0.004, 300)
    }
    if (this.player.position.x > 91*32 && this.player.position.x < 96*32 && this.player.position.y > 2*32 && this.player.position.y < 6*32) {
      this.game.camera.shake(0.007, 300)
    }
    if (this.player.position.x > 93*32 && this.player.position.y > 2*32 && this.player.position.y < 6*32) {
      this.camera.fade('#000000', Phaser.Timer.SECOND * 1.5)
      this.camera.onFadeComplete.add(this.fadeComplete,this)
    }
  }

  fadeComplete() {
    this.state.add('LevelF', LevelF)
    this.state.start('LevelF')
  }

  inputIsActive(key) {
    let isActive = false;
    isActive = this.game.input.keyboard.downDuration(key);
    return isActive;
  };

  inputReleased(key) {
    let released = false;
    released = this.game.input.keyboard.upDuration(key);
    return released;
  };

  collisionHandler(index) {
    return function (sprite, layer) {
      console.log(index)
    }
  }

  collisionHandlerGun(index) {
    return function (bullet, layer) {
      layer.exists = false
    }
  }
}