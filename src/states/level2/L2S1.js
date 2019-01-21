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

import L2S2 from './L2S2'

export default class L2S1 extends Phaser.State {
  constructor() {
    super('L2S1')
  }

  create() {
    /******* VARIABLES *******/
    this.playerOldPos = {
      x: 0,
      y: 0
    }
    this.luciferoMet = false
    this.numBombs = localStorage.getItem('numBombs')
    this.bombDropping = false

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

    /******* LUCIFERO *******/
    this.lucifero = this.game.add.image(19*32, 1*32 + 2, 'lucifero')
    this.lucifero.alpha = 0
    this.luciferoAnimIn = this.game.add.tween(this.lucifero).to({ alpha: 1 }, 400, "Linear", false, Phaser.Timer.SECOND * 1.2)
    this.luciferoAnimOut = this.game.add.tween(this.lucifero).to({ alpha: 0 }, 400, "Linear", false)

    /******* STAIRS *******/
    this.stairsPool = new Pool(this.game, Stairs, 3, true, 'Stairs')
    this.stairsPool.create(88*32, -1*32)
    this.stairsPool.create(88*32, -5*32)

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
    this.player.spawn(6*32 + 12, 6*32 - 27.49)
    this.player.positionControll = 'left'

    /******* BIBLES *******/
    this.biblePool = new Pool(game, Bible, 2, true, 'Bibles');
    this.biblePool.create(20*32, 21*32);
    this.biblePool.create(76*32, 11*32);

    /******* ENEMIES *******/
    // // SKULLS
    // this.skullPool = new Pool(this.game, Skull, 5, true, 'Skulls')
    // this.skullPool.create(2*32, 5*32, {patrollL: 2*32, patrollR: 7*32});
    // GHOSTS
    this.ghostPool = new Pool(this.game, Ghost, 5, true, 'Ghosts')
    this.ghostPool.create(13*32, 17*32, {patrollL: 12*32, patrollR: 16*32});
    this.ghostPool.create(61*32, 14*32, {patrollL: 61*32, patrollR: 67*32});
    // DEVIL
    this.devilPool = new Pool(this.game, Devil, 5, true, 'Devils')
    this.devilPool.create(37*32, 14*32, {patrollL: 37*32, patrollR: 39*32});

    /******* WEAPONS *******/
    // GUN
    this.gun = new Weapon(game, Bullet, 64, false, {bulletSpeed: 500, fireRate: 270, bulletType: 'gun'}, 'Gun');
    // BOMB
    this.bomb = new Weapon(game, Bomb, 3, false, {bulletSpeed: 0, fireRate: 300, bulletType: 'bomb'}, 'Bomb');

    /******* GAME UI *******/
    this.bombUI = new BombCounter(this.game)
    this.game.add.existing(this.bombUI);

    /******* FLASHBACKS *******/
    // FLASHBACK5
    this.flashback5 = this.game.add.image(0, 0, 'flashback5')
    this.flashback5.alpha = 0
    this.flashback5AnimIn = this.game.add.tween(this.flashback5).to({ alpha: 1 }, 500, "Linear", false, Phaser.Timer.SECOND * 2.6)
    this.flashback5AnimOut = this.game.add.tween(this.flashback5).to({ alpha: 0 }, 500, "Linear", false)

    /******* DIALOGS *******/
    // DIALOG1
    this.dia2_1 = this.game.add.image(0, 0, 'dia_2.1')
    this.dia2_1.fixedToCamera = true
    this.dia2_1.alpha = 0
    // DIALOG2
    this.dia2_2 = this.game.add.image(0, 0, 'dia_2.2')
    this.dia2_2.fixedToCamera = true
    this.dia2_2.alpha = 0
    // DIALOG3
    this.dia2_3 = this.game.add.image(0, 0, 'dia_2.3')
    this.dia2_3.fixedToCamera = true
    this.dia2_3.alpha = 0
    // DIALOG4
    this.dia2_4 = this.game.add.image(0, 0, 'dia_2.4')
    this.dia2_4.fixedToCamera = true
    this.dia2_4.alpha = 0
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
        this.game.physics.arcade.collide(this.map.customLayers[i], this.player, this.collisionHandlerLava(i))
      }
    }

    /******* LUCIFERO *******/
    if (this.player.position.x > 2*32 && this.player.position.x < 7*32 && this.player.position.y > 9*32 && this.player.position.y < 13*32) {
      if (localStorage.getItem('dialog2') == 'false') {
        this.luciferoAppears()
      }
    }

    /******* STAIRS *******/
    this.player.settings.onTheStairs = false
    this.game.physics.arcade.overlap(this.player, this.stairsPool, function(player, stairs){
      player.settings.onTheStairs = true
    })

    /******* NEXT LEVEL *******/
    if (this.player.position.x < 90*32 && this.player.position.x > 85*32 && this.player.position.y < -1*32) {
      this.state.add('L2S2', L2S2)
      this.state.start('L2S2')
    }

  }

  luciferoAppears() {
    this.player.settings.acceleration = 0

    this.camera.shake(0.01, 1500)
    this.luciferoAnimIn.start()

    this.game.time.events.add(Phaser.Timer.SECOND * 1, function(){
      this.player.positionControll = null
      this.player.frame = 40
    }, this)

    this.flashback5AnimIn.start()

    this.game.time.events.add(Phaser.Timer.SECOND * 8, function(){
      this.flashback5AnimOut.start()

      this.game.time.events.add(Phaser.Timer.SECOND * 1, function(){
        this.dia2_1.alpha = 1

        this.game.time.events.add(Phaser.Timer.SECOND * 2.5, function(){
          this.dia2_1.alpha = 0
          this.dia2_2.alpha = 1

          this.game.time.events.add(Phaser.Timer.SECOND * 3.8, function(){
            this.dia2_2.alpha = 0
            this.dia2_3.alpha = 1

            this.game.time.events.add(Phaser.Timer.SECOND * 2.5, function(){
              this.dia2_3.alpha = 0
              this.dia2_4.alpha = 1

              this.game.time.events.add(Phaser.Timer.SECOND * 2.5, function(){
                this.dia2_4.alpha = 0

                this.camera.shake(0.01, 500)
                this.luciferoAnimOut.start()
                this.player.settings.acceleration = 9800
                this.player.frame = 14
                localStorage.setItem('dialog2', 'true')
              }, this)
            }, this)
          }, this)
        }, this)
      }, this)
    }, this)
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

  collisionHandlerLava(index) {
    return function (sprite, layer) {
      sprite.death()
    }
  }

  collisionHandlerGun(index) {
    return function (bullet, layer) {
      bullet.exists = false
    }
  }

}