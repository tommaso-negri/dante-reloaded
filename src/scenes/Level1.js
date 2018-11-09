import Phaser from 'phaser';

let player
let platforms
let cursors
let map

export default class Level1 extends Phaser.Scene {
  constructor() {
    super('Level1')
  }

  preload() {
    this.load.spritesheet('player', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('platform', 'assets/platform.png');
    this.load.image('sky', 'assets/sky.png');

    this.load.image('tiles', 'assets/super_mario.png');
		this.load.tilemapTiledJSON('map', 'assets/maps/Level1Map.json');
  }

  create() {
    this.add.image(0, 0, 'sky').setOrigin(0, 0);

    this.map = this.add.tilemap('map');
    this.map.addTilesetImage('super_mario','tiles');
    this.backgroundLayer = this.map.createLayer('backgroundLayer');	

    // platforms = this.physics.add.staticGroup();

    // platforms.create(400, 568, 'platform').setScale(2).refreshBody();
    // platforms.create(600, 400, 'platform');
    // platforms.create(50, 250, 'platform');
    // platforms.create(750, 220, 'platform');

    player = this.physics.add.sprite(80, 196, 'player');
    player.setCollideWorldBounds(true);
    player.setBounce(0.2);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
    
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'player', frame: 4 } ],
        frameRate: 20
    });
    
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.physics.add.collider(player, platforms);

    player.body.velocity.x = 0;
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
  }
}