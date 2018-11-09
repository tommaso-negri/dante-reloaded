import Phaser from 'phaser';

let player
let platforms
let cursors

export default class Level1 extends Phaser.Scene {
  constructor() {
    super('Level1')
  }

  preload() {
    this.load.spritesheet('player', 'assets/dude.png', {
    frameWidth: 32, frameHeight: 48 });
    this.load.image('platform', 'assets/platform.png');
    this.load.image('sky', 'assets/sky.png');

    this.load.image('tiles1', 'assets/super_mario.png');
		this.load.tilemapTiledJSON('map1', 'assets/maps/Level1Map.json');
  }

  create() {
    this.add.image(0, 0, 'sky').setOrigin(0, 0);

    let map1 = this.make.tilemap({ key: 'map1' });
    let tileset1 = map1.addTilesetImage('SuperMarioBros-World1-1', 'tiles1');
    let layer1 = map1.createStaticLayer('World1', tileset1, 0, 0);

    cursors = this.input.keyboard.createCursorKeys();

    let controlConfig = {
      camera: this.cameras.main,
      left: cursors.left,
      right: cursors.right,
      speed: 0.5
    };

    let controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);

    this.cameras.main.setBounds(0, 0, layer1.x + layer1.width, 0);

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
  }

  update() {
    // this.physics.add.collider(player, platforms);

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