/******* IMPORTS *******/
import Player from '../../other/player'
import Weapon from '../../other/weapons/weapon'
import Bullet from '../../other/weapons/bullet'
import Bomb from '../../other/weapons/bomb'
import Ghost from '../../other/enemies/ghost'
import Skull from '../../other/enemies/skull'
import Bible from '../../other/bible'
import Stairs from '../../other/stairs'
import Pool from '../../other/pool'
import BombCounter from '../../other/inGameUi/bombCounter'

import LoadingL2 from '../LoadingL2'

export default class L1S3 extends Phaser.State {
  constructor() {
    super('L1S3')
  }

  create() {
    /******* VARIABLES *******/
    this.playerOldPos = {
      x: 0,
      y: 0
    }
    this.numBombs = 0
    this.bombDropping = false

    /******* SFX *******/
    this.sfxBombCollection = this.game.add.audio('bombCollection')
    this.sfxHellBackground = this.game.add.audio('hellBackground')

    /******* PARALLAX BGs *******/
    this.parallax1 = this.game.add.tileSprite(0,
      this.game.height - this.game.cache.getImage('l1s3BG_1').height,
      this.game.cache.getImage('l1s3BG_1').width,
      this.game.cache.getImage('l1s3BG_1').height,
      'l1s3BG_1'
    );
    this.parallax2 = this.game.add.tileSprite(0,
        this.game.height - this.game.cache.getImage('l1s3BG_2').height,
        this.game.cache.getImage('l1s3BG_2').width,
        this.game.cache.getImage('l1s3BG_2').height,
        'l1s3BG_2'
    );
    this.parallax3 = this.game.add.tileSprite(0,
        this.game.height - this.game.cache.getImage('l1s3BG_3').height,
        this.game.cache.getImage('l1s3BG_3').width,
        this.game.cache.getImage('l1s3BG_3').height,
        'l1s3BG_3'
    );
    this.parallax4 = this.game.add.tileSprite(0,
        this.game.height - this.game.cache.getImage('l1s3BG_4').height,
        this.game.cache.getImage('l1s3BG_4').width,
        this.game.cache.getImage('l1s3BG_4').height,
        'l1s3BG_4'
    );

    /******* WORLD *******/
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.game.world.setBounds(0, 0, 96*32, 24*32)

    /******* TILEMAP CUSTOM LAYERS *******/
    this.map = this.game.add.tilemap('l1s3Map')
    this.map.addTilesetImage('l1s3Tileset', 'l1s3Tileset')
    this.map.customLayers = [];
    this.MAP_OBJECTS_INDEX = [307];
    for (let i=4; i>0; i--) {
      let layer = this.map.createLayer('layer' + i)
      this.game.physics.arcade.enable(layer)
      this.map.setCollisionByExclusion(this.MAP_OBJECTS_INDEX, true, layer)
      this.map.customLayers[i-1] = layer
    }

    /******* FLASHBACKS *******/
    // FLASHBACK4
    this.flashback4 = this.game.add.image(0, 0, 'flashback4')
    this.flashback4.alpha = 0
    this.flashback4.fixedToCamera = true
    this.flashback4AnimIn = this.game.add.tween(this.flashback4).to({ alpha: 1 }, 500, "Linear", false, Phaser.Timer.SECOND * 0.8)

    /******* STAIRS *******/
    this.stairsPool = new Pool(this.game, Stairs, 3, true, 'Stairs')
    this.stairsPool.create(7*32, -2*32)
    this.stairsPool.create(7*32, -6*32)

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
    this.player.spawn(7*32, -3*32)

    /******* BIBLES *******/
    this.biblePool = new Pool(game, Bible, 2, true, 'Bibles');
    this.biblePool.create(40*32, 2*32);
    this.biblePool.create(77*32, 7*32);

    /******* ENEMIES *******/
    // SKULLS
    this.skullPool = new Pool(this.game, Skull, 5, true, 'Skulls')
    this.skullPool.create(19*32, 15*32, {patrollL: 19*32, patrollR: 22*32});
    // GHOSTS
    this.ghostPool = new Pool(this.game, Ghost, 5, true, 'Ghosts')
    this.ghostPool.create(34*32, 18*32, {patrollL: 34*32, patrollR: 41*32});

    /******* WEAPONS *******/
    // GUN
    this.gun = new Weapon(game, Bullet, 64, false, {bulletSpeed: 500, fireRate: 270, bulletType: 'gun'}, 'Gun');
    // BOMB
    this.bomb = new Weapon(game, Bomb, 3, false, {bulletSpeed: 0, fireRate: 300, bulletType: 'bomb'}, 'Bomb');

    /******* GAME UI *******/
    this.bombUI = new BombCounter(this.game)
    this.game.add.existing(this.bombUI);
  }

  update() {
    /******* PARALLAX BGs *******/
    // PARALLAX
    if (this.player.position.x > 15*32 && this.player.position.x < 81*32) {
      if (this.playerOldPos.x > this.player.body.x) {
        this.parallax1.tilePosition.x += 0.0;
        this.parallax2.tilePosition.x += 0.1;
        this.parallax3.tilePosition.x += 0.2;
        this.parallax4.tilePosition.x += 0.4;
      }
  
      if (this.playerOldPos.x < this.player.body.x) {
        this.parallax1.tilePosition.x -= 0.0;
        this.parallax2.tilePosition.x -= 0.1;
        this.parallax3.tilePosition.x -= 0.2;
        this.parallax4.tilePosition.x -= 0.4;
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

    /******* DROPS *******/
    this.game.physics.arcade.overlap(this.player, this.biblePool, function(player, bible) {

      if (this.numBombs < 3) {
        this.numBombs++
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
    this.game.physics.arcade.overlap(this.bomb, this.skullPool, function(bullet, enemy){
      enemy.hit(bullet);
    })
    this.game.physics.arcade.overlap(this.bomb, this.ghostPool, function(bullet, enemy){
      enemy.hit(bullet);
    })

    /******* TILEMAP CUSTOM LAYERS *******/
    for (let i=0; i<4; i++) {
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

    /******* NEXT LEVEL *******/
    if (this.player.position.x > 84*32 && this.player.position.y > 19*32 && this.player.position.y < 23*32) {
      this.player.commands.right.isDown = true
      this.player.settings.acceleration = 6000
    }
    if (this.player.position.x > 89*32 && this.player.position.y > 19*32 && this.player.position.y < 23*32) {
      this.flashback4AnimIn.start()
      this.game.add.tween(this.player).to({ alpha: 0 }, 200, "Linear", true)

      this.game.time.events.add(Phaser.Timer.SECOND * 8, function(){
        this.camera.fade('#000000', Phaser.Timer.SECOND * 1)
        this.camera.onFadeComplete.add(this.fadeComplete,this)
      }, this)
    }
  }

  fadeComplete() {
    this.state.add('LoadingL2', LoadingL2)
    this.state.start('LoadingL2')
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