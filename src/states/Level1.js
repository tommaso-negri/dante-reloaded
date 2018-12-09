import Phaser from 'phaser-ce';

import Player from '../other/player'
import Pool from '../other/pool'
import Bible from '../other/bible'
import Ghost from '../other/enemies/ghost'
import Soul from '../other/enemies/soul'
import Bullet from '../other/weapons/bullet'
import Bomb from '../other/weapons/bomb'
import Weapon from '../other/weapons/weapon'
import bombCounter from '../other/inGameUi/bombCounter'
import MovingPlatformPool from '../other/movingPlatform/movingPlatformPool'
import MovingPlatform from '../other/movingPlatform/movingPlatform';

let map;
let layer;
let movente;
let movingPlatformPool;

let player;
let playerOldPos = {
  x: 0,
  y: 0
};
let commands;

let gun;
let bomb;
let numBombs = 0;

let biblePool;

let ghostPool;
let soulPool;

let flashbacks = {
  uno: true,
  due: true,
  tre: true
}

let bombUI;
let bombDropping = false;

export default class Level1 extends Phaser.State {
  constructor() {
    super('Level1')
  }

  preload() {
    game.load.tilemap('MappaOk', 'assets/tilemaps/level1/MappaOK.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/tilemaps/level1/TileOk.png');
    game.load.spritesheet('playerSprite', 'assets/sprites/omino.png', 51, 71)
    game.load.image('bullet', 'assets/sprites/bullet.png');
    game.load.spritesheet('kaboom', 'assets/sprites/explode.png', 128, 128);

    game.load.image('ghost', 'assets/images/ghost.png');
    game.load.image('soul', 'assets/sprites/soul.gif')
    game.load.image('bible', 'assets/images/bible.png');
    game.load.image('movente', 'assets/images/semimovente.png');
    game.load.image('testFlashback', 'assets/images/testFlashback.png')

    game.load.spritesheet('contatore', 'assets/images/contatore.png', 1062.75, 501)
    // this.game.load.audio('music', ['assets/audio/bg_music.mp3']);

    // PARALLAX BGs
    game.load.image('level1BG1', 'assets/images/level1BGs/level1BG1.png');
    game.load.image('level1BG2', 'assets/images/level1BGs/level1BG2.png');
    game.load.image('level1BG3', 'assets/images/level1BGs/level1BG3.png');
    game.load.image('level1BG4', 'assets/images/level1BGs/level1BG4.png');
  }

  create() {

    // PARALLAX
    this.parallax1 = this.game.add.tileSprite(0,
        this.game.height - this.game.cache.getImage('level1BG1').height,
        this.game.width,
        this.game.cache.getImage('level1BG1').height,
        'level1BG1'
    );
    this.parallax2 = this.game.add.tileSprite(0,
        this.game.height - this.game.cache.getImage('level1BG2').height,
        this.game.width,
        this.game.cache.getImage('level1BG2').height,
        'level1BG2'
    );
    this.parallax3 = this.game.add.tileSprite(0,
        this.game.height - this.game.cache.getImage('level1BG3').height,
        this.game.width,
        this.game.cache.getImage('level1BG3').height,
        'level1BG3'
    );
    this.parallax4 = this.game.add.tileSprite(0,
        this.game.height - this.game.cache.getImage('level1BG4').height,
        this.game.width,
        this.game.cache.getImage('level1BG4').height,
        'level1BG4'
    );
    this.parallax1.fixedToCamera =  true;
    this.parallax2.fixedToCamera =  true;
    this.parallax3.fixedToCamera =  true;
    this.parallax4.fixedToCamera =  true;

    // WORLD & MAP & TILESET
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0, 0, 96*32, 72*32);

    map = game.add.tilemap('MappaOk');
    map.addTilesetImage('TileOk', 'tiles');
    layer = map.createLayer('Tile Layer 1');
    // map.setCollision(1);
    map.setCollisionBetween(1,49);

    //MOVING PLATFORMS
    // movingPlatformPool = new Pool(game, MovingPlatform, 1, true, 'movingPlatform');
    // movingPlatformPool.create(37*32, 49*32, {sprite: 'movente'})

    // PLAYER COMMANDS
    commands = {
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
    player = new Player(game, commands);
    game.add.existing(player);
    player.spawn(1*32, 69*32);

    // BIBLES POOL
    biblePool = new Pool(game, Bible, 2, true, 'Bibles');
    biblePool.create(36*32, 61*32);
    biblePool.create(7*32, 54*32);
    biblePool.create(46*32, 55*32);

    // SOULS POOL
    soulPool = new Pool(game, Soul, 3, false, 'Souls');
    soulPool.create(21*32, 58*32, {patrollL: 21*32, patrollR: 27*32});

    // GHOSTS POOL
    ghostPool = new Pool(game, Ghost, 3, false, 'Ghosts');
    ghostPool.create(5*32, 69*32, {patrollL: 0, patrollR: 0});
    // ghostPool.create(4*32, 58*32, {patrollL: 4*32, patrollR: 8*32})

    // WEAPONS
    gun = new Weapon(game, Bullet, 64, false, {bulletSpeed: 500, fireRate: 270, bulletType: 'gun'}, 'Gun');

    bomb = new Weapon(game, Bomb, 3, false, {bulletSpeed: 0, fireRate: 300, bulletType: 'bomb'}, 'Bomb');

    // IN GAME GUI
    bombUI = new bombCounter(game)
    game.add.existing(bombUI);
  }

  update() {
    // PHYSIC COLLISIONS
    game.physics.arcade.collide(player, layer);
    game.physics.arcade.collide(biblePool, layer);
    game.physics.arcade.collide(soulPool, layer);
    game.physics.arcade.collide(ghostPool, layer);
    game.physics.arcade.collide(bomb, layer);
    game.physics.arcade.collide(gun, layer, function(bullet, layer){
      bullet.exists = false;
    });
    // game.physics.arcade.collide(player, movingPlatformPool);


    // ITEMS
    game.physics.arcade.overlap(player, biblePool, function(player, bible) {
      bible.hit();

      if (numBombs <= 3) {
        numBombs++
      }
      bombUI.dataGatering(numBombs);
    });


    // PLAYER HIT
    game.physics.arcade.overlap(player, soulPool, function(player, enemy){
      player.hit(enemy);
    })
    game.physics.arcade.overlap(player, ghostPool, function(player, enemy){
      player.hit(enemy);
    })
    
    
    // ENEMY HIT
    game.physics.arcade.overlap(gun, soulPool, function(bullet, enemy){
      enemy.hit(bullet);
      bullet.exists = false;
    })
    game.physics.arcade.overlap(gun, ghostPool, function(bullet, enemy){
      enemy.hit(bullet);
      bullet.exists = false;
    })
    game.physics.arcade.overlap(bomb, soulPool, function(bullet, enemy){
      enemy.hit(bullet);
    })
    game.physics.arcade.overlap(bomb, ghostPool, function(bullet, enemy){
      enemy.hit(bullet);
    })


    // GUN
    if (commands.controlsLeft.isDown) {
      gun.fire(player, {direction: 180})
    }

    if(commands.controlsRight.isDown) {
      gun.fire(player, {direction: 0})
    }


    // BOMB DROPPING
    if (this.inputIsActive(Phaser.Keyboard.DOWN)) {
      bombDropping = true;
    }

    if (numBombs > 0 && bombDropping && this.inputReleased(Phaser.Keyboard.DOWN)) {
      numBombs -= 1;
      bombUI.dataGatering(numBombs);
      bombDropping = false;
      bomb.fire(player, {direction: 0});
    }


    // PARALLAX
    if (playerOldPos.x > player.body.x) {
      this.parallax1.tilePosition.x += 0.1;
      this.parallax2.tilePosition.x += 0.8;
      this.parallax3.tilePosition.x += 1.2;
      this.parallax4.tilePosition.x += 1.6;
    }

    if (playerOldPos.x < player.body.x) {
      this.parallax1.tilePosition.x -= 0.1;
      this.parallax2.tilePosition.x -= 0.8;
      this.parallax3.tilePosition.x -= 1.2;
      this.parallax4.tilePosition.x -= 1.6;
    }

    if (player.body.velocity.x != 0 || player.body.y != 0) {
      playerOldPos.x = player.body.x;
      playerOldPos.y = player.body.y;
    }

    // FLASHBACKS
    if (player.x >= 45*32 && player.y <= 55*32 && flashbacks.uno) {
      this.gameFlashback('testFlashback', 'uno')
    }
  }

  gameFlashback(image, index) {
    let flashback;
    flashback = this.game.add.sprite(0,0, image);
    this.game.add.existing(flashback);
    flashback.fixedToCamera = true;
    console.log(flashbacks.uno)
    setTimeout(function(){
        this.game.paused = false;
        flashback.destroy();
    }.bind(this), 3000);
    flashbacks[index] = false;
    console.log(flashbacks.uno)
    this.game.paused = true;
  };

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

  // render() {
  //   this.game.debug.start(32, 32);
  //   this.game.debug.line(`Health: ${player.health}/${player.maxHealth}`);
  //   this.game.debug.line(`Velocity: ${player.body.velocity.y}/${player.body.velocity.y}`);
  // }

}