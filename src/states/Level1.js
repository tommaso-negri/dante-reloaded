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
let parallax1;
let parallax2;
let parallax3;
let parallax4;
let parallax5;
let parallax6;
let parallax7;

export default class Level1 extends Phaser.State {
  constructor() {
    super('Level1')
  }

  preload() {
    game.load.tilemap('Level1Map', 'assets/tilemaps/level1/Level1Map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/tilemaps/level1/Tiles_32x32.png');
    game.load.image('dude', 'assets/sprites/phaser-dude.png');

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
    // PARALLAX
    parallax1 = this.game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, "1");
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


    game.physics.startSystem(Phaser.Physics.ARCADE);
    jumpControll=0;

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

    game.camera.follow(player);

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
  }

  update() {
    game.physics.arcade.collide(player, layer);

    player.body.velocity.x = 0;

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
  }
}
