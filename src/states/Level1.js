import Phaser from 'phaser-ce';

import Player from '../other/player'
import Pool from '../other/pool'
import Bible from '../other/bible'
import Ghost from '../other/ghost'
import Bullet from '../other/bullet'
import Bomb from '../other/bomb'
import Weapon from '../other/weapon'

let map;
let layer;
let player;
let playerOldPos = {
  x: 0,
  y: 0
};
let commands;
let weapon;
let checkpoint1_spento;
let checkpoint1;

let gun;
let bomb;
// let music;

let biblePool;
let ghostPool;

export default class Level1 extends Phaser.State {
  constructor() {
    super('Level1')
  }

  preload() {
    game.load.tilemap('MappaOk', 'assets/tilemaps/level1/MappaOK.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/tilemaps/level1/TileOk.png');
    game.load.image('dude', 'assets/sprites/phaser-dude.png');
    game.load.spritesheet('playerSprite', 'assets/sprites/omino.png', 35.1333333, 48)
    game.load.image('bomba', 'assets/images/diamond.png');

    game.load.image('ghost', 'assets/images/ghost.png');
    game.load.image('bible', 'assets/images/bible.png');

    game.load.spritesheet('checkpoint', 'assets/images/Checkpoint.png', 65, 96);
    // this.game.load.audio('music', ['assets/audio/bg_music.mp3']);

    // PARALLAX BGs
    game.load.image('level1BG1', 'assets/images/level1BGs/level1BG1.png');
    game.load.image('level1BG2', 'assets/images/level1BGs/level1BG2.png');
    game.load.image('level1BG3', 'assets/images/level1BGs/level1BG3.png');
    game.load.image('level1BG4', 'assets/images/level1BGs/level1BG4.png');
  }

  create() {

    // PARALLAX
    // this.game.stage.backgroundColor = '#697e96';
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


    //CHECKPOINT
    checkpoint1 = game.add.sprite(26*32, 58*32,'checkpoint');
    game.physics.arcade.enable(checkpoint1);
    checkpoint1.animations.add('spento', [1],10, true);
    checkpoint1.animations.add('acceso', [0],10, true);
    checkpoint1_spento = true;

    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Audio
    // music = game.add.audio('music');s
    // music.play();


    // MAP & TILESET
    map = game.add.tilemap('MappaOk');
    map.addTilesetImage('TileOk', 'tiles');
    layer = map.createLayer('Tile Layer 1');
    // map.setCollision(1);
    map.setCollisionBetween(1,49)

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
      controlsRight: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
      gunFire: game.input.keyboard.addKey(Phaser.Keyboard.P)
    };

    // PLAYER
    player = new Player(game, commands);
    game.add.existing(player);
    player.spawn(7*32, 66*32);


    game.world.setBounds(0, 0, 102*32, 78*32);

    //weapon bomba
    weapon = game.add.weapon(3, 'bomba');
    weapon.trackSprite(player, 16, 32);
    weapon.bullets.setAll("width", 32);
    weapon.bullets.setAll("height", 28);
    weapon.fireAngle = 0;
    weapon.bulletGravity = 0;
    weapon.bulletSpeed = 0;
    // weapon.onFire.add(bomba);

    // GUN

    // BIBLES GROUP & SPAWN
    biblePool = new Pool(game, Bible, 2, true, 'Bibles');
    biblePool.create(17*32, 68*32);
    biblePool.create(6*32, 58*32);
    biblePool.create(17*32, 63*32);
    biblePool.create(6*32, 61*32);

    ghostPool = new Pool(game, Ghost, 3, false, 'Ghost');
    ghostPool.create(22*32, 60*32, {patrollL: 22*32, patrollR: 31*32})
    ghostPool.create(4*32, 58*32, {patrollL: 4*32, patrollR: 8*32})
    ghostPool.create(14*32, 63*32, {patrollL: 14*32, patrollR: 17*32})

    gun = new Weapon(game, Bullet, 64, false, {bulletSpeed: 600, fireRate: 100, bulletType: 'gun'}, 'Gun');

    bomb = new Weapon(game, Bomb, 3, false, {bulletSpeed: 0, fireRate: 300, bulletType: 'bomb'}, 'Bomb')
  }

  update() {
    game.physics.arcade.overlap(player, biblePool, function(player, bible) {
      // enemy.hit(player);
      bible.hit();
    });

    game.physics.arcade.overlap(player, ghostPool, function(player, ghost){
      player.hit(ghost);
    })
    
    game.physics.arcade.collide(biblePool, layer);
    game.physics.arcade.collide(ghostPool, layer);
    game.physics.arcade.collide(player, layer);
    game.physics.arcade.collide(checkpoint1, layer);
    game.physics.arcade.collide(bomb, layer);
    game.physics.arcade.collide(gun, layer, function(bullet, layer){
      bullet.exists = false;
    });
    game.physics.arcade.overlap(gun, ghostPool, function(bullet, ghost){
      ghost.hit(bullet);
      bullet.exists = false;
    })
    game.physics.arcade.overlap(bomb, ghostPool, function(bullet, ghost){
        ghost.hit(bullet);
        // player.kill();
        // player_respawn();
    })

    player.body.velocity.x = 0;

    //CHECKPOINT
    // game.physics.arcade.overlap(enemy, player, function(e,p) {
    //   if(nemico_attivo == true){
    //     p.kill();
    //     player_respawn();
    //   }
    // });



    //checkpoint spawn


    game.physics.arcade.overlap(player, checkpoint1, function(){
      checkpoint1_spento = false;

    });


    if (checkpoint1_spento == true) {
      checkpoint1.animations.play('spento');
    }
    if (checkpoint1_spento == false) {
      checkpoint1.animations.play('acceso');
    }

    if (commands.controlsDown.isDown) {
      // weapon.fire();
      // bomb.fire(player);
      game.camera.shake(0.01, 300);
    }

    if (commands.controlsLeft.isDown) {
      gun.fire(player, {direction: 180})
    }

    if(commands.controlsRight.isDown) {
      gun.fire(player, {direction: 0})
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

  }

  render() {
    this.game.debug.start(32, 32);
    this.game.debug.line(`Health: ${player.health}/${player.maxHealth}`);
    this.game.debug.line(`Velocity: ${player.body.velocity.y}/${player.body.velocity.y}`);
  }

}

function player_respawn(){
  if (player.alive == false && checkpoint1_spento == true){
    game.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
    player.reset(5*32, 66*32);
  })
  }
  if (player.alive == false && checkpoint1_spento == false){
    game.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
    player.reset(26*32, 60*32);
  })
  }
}

function bomba(bullet, weapon){
  game.time.events.add(Phaser.Timer.SECOND * 3, function(){
    bullet.kill();
    game.camera.shake(0.01, 300);
    player.kill();
    player_respawn();
  });
}