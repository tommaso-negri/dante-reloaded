import Phaser from 'phaser-ce';

let map;
let layer;
let player;
let playerOldPos = {
  x: 0,
  y: 0
};
let jumpControll;
let commands;
let weapon;
let parallax1;
let parallax2;
let parallax3;
let parallax4;
let parallax5;
let parallax6;
let parallax7;
let checkpoint1_spento;
let checkpoint1;

let gun;
// let music;


export default class Level1 extends Phaser.State {
  constructor() {
    super('Level1')
  }

  preload() {
    game.load.tilemap('Level1Map', 'assets/tilemaps/level1/Level1Map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/tilemaps/level1/Tiles_32x32.png');
    game.load.image('dude', 'assets/sprites/phaser-dude.png');
    game.load.image('bomba', 'assets/images/diamond.png');

    game.load.spritesheet('checkpoint', 'assets/images/Checkpoint.png', 65, 96);
    // this.game.load.audio('music', ['assets/audio/bg_music.mp3']);

    // PARALLAX BGs
    game.load.image('1', 'assets/images/1.png');
    game.load.image('2', 'assets/images/2.png');
    game.load.image('3', 'assets/images/3.png');
    game.load.image('4', 'assets/images/4.png');
    game.load.image('5', 'assets/images/5.png');
    game.load.image('6', 'assets/images/6.png');
    game.load.image('7', 'assets/images/7.png');
  }

  create() {
    game.time.advancedTiming = true;

    // PARALLAX
    parallax1 = this.game.add.tileSprite(-100, - 100, window.innerWidth, window.innerHeight, "1");
    parallax2 = this.game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, "2");
    parallax3 = this.game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, "3");
    parallax4 = this.game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, "4");
    parallax5 = this.game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, "5");
    parallax6 = this.game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, "6");
    parallax7 = this.game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, "7");
    parallax1.fixedToCamera =  true;
    parallax2.fixedToCamera =  true;
    parallax3.fixedToCamera =  true;
    parallax4.fixedToCamera =  true;
    parallax5.fixedToCamera =  true;
    parallax6.fixedToCamera =  true;
    parallax7.fixedToCamera =  true;

    //CHECKPOINT

    checkpoint1 = game.add.sprite(29*32, 17*32,'checkpoint');
    game.physics.arcade.enable(checkpoint1);
    checkpoint1.animations.add('spento', [1],10, true);
    checkpoint1.animations.add('acceso', [0],10, true);
    checkpoint1_spento = true;

    //

    game.physics.startSystem(Phaser.Physics.ARCADE);
    jumpControll=0;

    // Audio
    // music = game.add.audio('music');s
    // music.play();

    map = game.add.tilemap('Level1Map');

    map.addTilesetImage('Tiles_32x32', 'tiles');

    layer = map.createLayer('World1');

    map.setCollision(1);
    map.setCollision(53);
    map.setCollision(54);

    player = game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'dude')

    game.physics.enable(player)

    game.physics.arcade.gravity.y = 250;

    player.body.collideWorldBounds = true;

    player.body.bounce.y = 0.1;
    player.body.linearDamping = 1;

    // game.camera.follow(player);
    game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

    // game.world.setBounds(0,0, 1920, 1080)
    game.world.setBounds(0, 0, 1920, 1920);

    //weapon bomba
    weapon = game.add.weapon(3, 'bomba');
    weapon.trackSprite(player, 16, 32);
    weapon.bullets.setAll("width", 32);
    weapon.bullets.setAll("height", 28);
    weapon.fireAngle = 0;
    weapon.bulletGravity = 0;
    weapon.bulletSpeed = 0;
    weapon.onFire.add(bomba);

    // GUN
    gun = game.add.weapon(100, 'bomba');
    gun.trackSprite(player, 16, 32);
    gun.bullets.setAll("width", 32);
    gun.bullets.setAll("height", 28);
    gun.fireAngle = 0;
    // gun.bulletGravity = 0;
    gun.bulletGravity.y = -250;
    gun.bulletSpeed = 0;
    // gun.onFire.add(bomba);
    gun.bulletSpeed = 600;
    gun.fireRate = 100;
    gun.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;


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
  }

  update() {
    game.physics.arcade.collide(player, layer);
    game.physics.arcade.collide(checkpoint1, layer);
    game.physics.arcade.collide(weapon.bullets, layer);
    game.physics.arcade.collide(gun.bullets, layer, function(bullet, layer){
      bullet.kill()
    });

    player.body.velocity.x = 0;

    if(commands.gunFire.isDown) {
      gun.fire()
    }

    //CHECKPOINT

      //checkpoint function

//
      // NELL'ENEMY   game.physics.arcade.overlap(enemy, player, function(e,p) {
        //if(nemico_attivo == true){
          //p.kill();
          //player_respawn();   ---->  VA INSERITO QUESTO PER FAR FUNZIONARE IL CHECKPOINT
        //}
  //  });
//



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



    if (commands.left.isDown) {

      if (commands.shift.isDown) {
        player.body.velocity.x = -250;
      } else {
        player.body.velocity.x = -150;
      }

      // PARALLAX
      if (playerOldPos.x != player.body.x) {
        parallax1.tilePosition.x += 0.1;
        parallax2.tilePosition.x += 0.8;
        parallax3.tilePosition.x += 1.2;
        parallax4.tilePosition.x += 1.6;
        parallax5.tilePosition.x += 2;
        parallax6.tilePosition.x += 2.4;
        parallax7.tilePosition.x += 5;
      }
    } else if (commands.right.isDown) {

      if (commands.shift.isDown) {
        player.body.velocity.x = 250;
      } else {
        player.body.velocity.x = 150;
      }

      // PARALLAX
      if (playerOldPos.x != player.body.x) {
        parallax1.tilePosition.x -= 0.1;
        parallax2.tilePosition.x -= 0.8;
        parallax3.tilePosition.x -= 1.2;
        parallax4.tilePosition.x -= 1.6;
        parallax5.tilePosition.x -= 2;
        parallax6.tilePosition.x -= 2.4;
        parallax7.tilePosition.x -= 5;
      }
    }

    if (commands.controlsDown.isDown) {
      weapon.fire();
    }

    // DOUBLE JUMP
    game.input.keyboard.onDownCallback = function(e) {
      if(e.keyCode == Phaser.Keyboard.SPACEBAR && jumpControll==0){
      player.body.velocity.y = -150;
      jumpControll=1;
      }

      if (e.keyCode == Phaser.Keyboard.SPACEBAR && jumpControll==1 && player.body.onFloor()) {
      player.body.velocity.y = -200;
      jumpControll=0;
      }
    };

    if (player.body.velocity.x != 0 || player.body.y != 0) {
      playerOldPos.x = player.body.x;
      playerOldPos.y = player.body.y;
    }

  }

  // render() {
  //   // game.debug.text(player.body.velocity.x, 2, 14, "#00ff00");
  //   gun.debug();
  // }

}

function player_respawn(){
  if (player.alive == false && checkpoint1_spento == true){
    game.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
    player.reset(12*32,2*32);
  })
  }
  if (player.alive == false && checkpoint1_spento == false){
    game.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
    player.reset(25*32,5*32);
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