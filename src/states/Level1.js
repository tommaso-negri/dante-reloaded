import Phaser from 'phaser-ce';

let map;
let layer;
let player;
let cursors;
let jump;

export default class Level1 extends Phaser.State {
  constructor() {
    super('Level1')
  }

  preload() {
    game.load.tilemap('Level1Map', 'assets/tilemaps/level1/Level1Map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/tilemaps/level1/Tiles_32x32.png');
    game.load.image('dude', 'assets/sprites/phaser-dude.png');
    let test;
  }

  create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    jump=0;

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

    player.body.bounce.y = 0.2;
    player.body.linearDamping = 1;

    game.camera.follow(player);

    cursors = game.input.keyboard.createCursorKeys();
  }

  update() {
    game.physics.arcade.collide(player, layer);

    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;
    }

   game.input.keyboard.onUpCallback = function( e ){
      if(e.keyCode == Phaser.Keyboard.UP && jump==0){
      player.body.velocity.y = -150;
      jump=1;
      
      }
      if (e.keyCode == Phaser.Keyboard.UP && jump==1 && player.body.onFloor()) {
      player.body.velocity.y = -200;
      jump=0;
      }
    };
  }
}
