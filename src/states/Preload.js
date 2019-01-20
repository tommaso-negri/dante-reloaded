import GameTitle from './GameTitle'

export default class Preload extends Phaser.State {
  constructor() {
    super('preload')
  }

  preload() {
    /******* LOADING ANIMATION *******/
    this.loadingBar = this.game.add.sprite(160,240,"loading")
    this.loadingBar.anchor.setTo(0.5,0.5)
    this.loadingBar.position.x = this.game.world.centerX
    this.loadingBar.position.y = this.game.world.centerY
    this.load.setPreloadSprite(this.loadingBar)

    /******* ASSETS - PARCHMENTS *******/
    this.game.load.image('characters', 'assets/images/parchments/characters.png')
    this.game.load.image('commands', 'assets/images/parchments/commands.png')
    this.game.load.image('credits', 'assets/images/parchments/credits.png')

    /******* ASSETS - TILEMAPS *******/
    // LEVEL1 SCENE1
    this.game.load.tilemap('l1s1Map', 'assets/tilemaps/level1/scene1/l1s1Map.json', null, Phaser.Tilemap.TILED_JSON)
    this.game.load.image('l1s1Tileset', 'assets/tilemaps/level1/scene1/l1s1Tileset.png')
    // LEVEL1 SCENE2
    this.game.load.tilemap('l1s2Map', 'assets/tilemaps/level1/scene2/l1s2Map.json', null, Phaser.Tilemap.TILED_JSON)
    this.game.load.image('l1s2Tileset', 'assets/tilemaps/level1/scene2/l1s2Tileset.png')
    // LEVEL1 SCENE3
    this.game.load.tilemap('l1s3Map', 'assets/tilemaps/level1/scene3/l1s3Map.json', null, Phaser.Tilemap.TILED_JSON)
    this.game.load.image('l1s3Tileset', 'assets/tilemaps/level1/scene3/l1s3Tileset.png')
    // LEVEL2 SCENE1
    this.game.load.tilemap('l2s1Map', 'assets/tilemaps/level2/scene1/l2s1Map.json', null, Phaser.Tilemap.TILED_JSON)
    this.game.load.image('l2s1Tileset', 'assets/tilemaps/level2/scene1/l2s1Tileset.png')
    // LEVEL2 SCENE2
    this.game.load.tilemap('l2s2Map', 'assets/tilemaps/level2/scene2/l2s2Map.json', null, Phaser.Tilemap.TILED_JSON)
    this.game.load.image('l2s2Tileset', 'assets/tilemaps/level2/scene2/l2s2Tileset.png')
    // LEVEL2 SCENE3
    this.game.load.tilemap('l2s3Map', 'assets/tilemaps/level2/scene3/l2s3Map.json', null, Phaser.Tilemap.TILED_JSON)
    this.game.load.image('l2s3Tileset', 'assets/tilemaps/level2/scene3/l2s3Tileset.png')

    /******* ASSETS - WEAPONS *******/
    this.game.load.image('bullet', 'assets/sprites/bullet.png')
    this.game.load.image('bible', 'assets/images/bible.png')
    this.game.load.atlas('bomb_explosion', 'assets/sprites/bomb_explosion/bomb_explosion.png', 'assets/sprites/bomb_explosion/bomb_explosion.json')

    /******* ASSETS - PLAYER *******/
    // this.game.load.atlas('player', 'assets/sprites/player/player.png', 'assets/sprites/player/player.json')
    this.game.load.spritesheet('player', 'assets/sprites/danteRGB.png', 40, 54.98)

    /******* ASSETS - ENEMIES *******/
    this.game.load.image('ghost', 'assets/images/ghost.png')
    this.game.load.image('soul', 'assets/sprites/soul.gif')

    /******* ASSETS - GUI *******/
    this.game.load.spritesheet('contatore', 'assets/images/contatore.png', 1062.75, 501)

    /******* ASSETS - PARALLAX BGs *******/
    // LEVEL1 SCENE1
    this.game.load.image('l1s1BG_1', 'assets/images/BGs/level1/scene1/l1s1BG_1.png')
    this.game.load.image('l1s1BG_2', 'assets/images/BGs/level1/scene1/l1s1BG_2.png')
    this.game.load.image('l1s1BG_3', 'assets/images/BGs/level1/scene1/l1s1BG_3.png')
    this.game.load.image('l1s1BG_4', 'assets/images/BGs/level1/scene1/l1s1BG_4.png')
    // LEVEL1 SCENE2
    this.game.load.image('l1s2BG_1', 'assets/images/BGs/level1/scene2/l1s2BG_1.png')
    this.game.load.image('l1s2BG_2', 'assets/images/BGs/level1/scene2/l1s2BG_2.png')
    this.game.load.image('l1s2BG_3', 'assets/images/BGs/level1/scene2/l1s2BG_3.png')
    this.game.load.image('l1s2BG_4', 'assets/images/BGs/level1/scene2/l1s2BG_4.png')
    this.game.load.image('l1s2BG_5', 'assets/images/BGs/level1/scene2/l1s2BG_5.png')
    // LEVEL1 SCENE3
    this.game.load.image('l1s3BG_1', 'assets/images/BGs/level1/scene3/l1s3BG_1.png')
    this.game.load.image('l1s3BG_2', 'assets/images/BGs/level1/scene3/l1s3BG_2.png')
    this.game.load.image('l1s3BG_3', 'assets/images/BGs/level1/scene3/l1s3BG_3.png')
    this.game.load.image('l1s3BG_4', 'assets/images/BGs/level1/scene3/l1s3BG_4.png')
    // LEVEL2 SCENE1
    this.game.load.image('l2s1BG_1', 'assets/images/BGs/level2/scene1/l2s1BG_1.png')
    this.game.load.image('l2s1BG_2', 'assets/images/BGs/level2/scene1/l2s1BG_2.png')
    this.game.load.image('l2s1BG_3', 'assets/images/BGs/level2/scene1/l2s1BG_3.png')
    // LEVEL2 SCENE2
    this.game.load.image('l2s2BG_1', 'assets/images/BGs/level2/scene2/l2s2BG_1.png')
    this.game.load.image('l2s2BG_2', 'assets/images/BGs/level2/scene2/l2s2BG_2.png')
    // LEVEL2 SCENE3
    this.game.load.image('l2s3BG_1', 'assets/images/BGs/level2/scene3/l2s3BG_1.png')
    this.game.load.image('l2s3BG_2', 'assets/images/BGs/level2/scene3/l2s3BG_2.png')
    this.game.load.image('l2s3BG_3', 'assets/images/BGs/level2/scene3/l2s3BG_3.png')

    /******* ASSETS - SFX *******/
    this.game.load.audio('explosion', 'assets/audio/sfx/explosion.mp3')
    this.game.load.audio('bullet', 'assets/audio/sfx/bullet.mp3')
    this.game.load.audio('bombCollection', 'assets/audio/sfx/bombCollection.mp3')
    this.game.load.audio('hellBackground', 'assets/audio/sfx/hellBackground.mp3')

    /******* ASSETS - GAME TITLE *******/
    this.game.load.image('gameTitleBG', 'assets/images/GameTitle.jpeg')

    /******* ASSETS - OTHER *******/
    this.game.load.image('stairs', 'assets/sprites/stairs.png')
    this.game.load.image('movente', 'assets/sprites/movingPlatform.png')
    this.game.load.image('testFlashback', 'assets/images/testFlashback.png')
  }

  create() {
    /******* STATE - GAME TITLE *******/
    this.state.add('gameTitle', GameTitle)
    this.state.start('gameTitle')
  }
}