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

    /******* ASSETS - TILEMAPS *******/
    this.game.load.tilemap('level1Map', 'assets/tilemaps/level1/Level1Map.json', null, Phaser.Tilemap.TILED_JSON)
    this.game.load.image('level1Tileset', 'assets/tilemaps/level1/Level1Tileset.png')

    /******* ASSETS - WEAPONS *******/
    this.game.load.image('bullet', 'assets/sprites/bullet.png')
    this.game.load.image('bible', 'assets/images/bible.png')
    this.game.load.atlas('bomb_explosion', 'assets/sprites/bomb_explosion/bomb_explosion.png', 'assets/sprites/bomb_explosion/bomb_explosion.json')

    /******* ASSETS - PLAYER *******/
    this.game.load.atlas('player', 'assets/sprites/player/player.png', 'assets/sprites/player/player.json')

    /******* ASSETS - ENEMIES *******/
    this.game.load.image('ghost', 'assets/images/ghost.png')
    this.game.load.image('soul', 'assets/sprites/soul.gif')

    /******* ASSETS - GUI *******/
    this.game.load.spritesheet('contatore', 'assets/images/contatore.png', 1062.75, 501)

    /******* ASSETS - PARALLAX BGs *******/
    // LEVEL1 SCENE1
    this.game.load.image('level1BG1A', 'assets/tilemaps/level1/BGs/BG1/sfondo_4.png')
    this.game.load.image('level1BG1B', 'assets/tilemaps/level1/BGs/BG1/sfondo_3.png')
    this.game.load.image('level1BG1C', 'assets/tilemaps/level1/BGs/BG1/sfondo_2.png')
    this.game.load.image('level1BG1D', 'assets/tilemaps/level1/BGs/BG1/sfondo_1.png')

    /******* ASSETS - SFX *******/
    this.game.load.audio('explosion', 'assets/audio/sfx/explosion.mp3')
    this.game.load.audio('bullet', 'assets/audio/sfx/bullet.mp3')
    this.game.load.audio('bombCollection', 'assets/audio/sfx/bombCollection.mp3')
    this.game.load.audio('hellBackground', 'assets/audio/sfx/hellBackground.mp3')

    /******* ASSETS - GAME TITLE *******/
    this.game.load.image('gameTitleBG', 'assets/images/GameTitle.jpeg')

    /******* ASSETS - OTHER *******/
    this.game.load.image('movente', 'assets/sprites/movingPlatform.png')
    this.game.load.image('testFlashback', 'assets/images/testFlashback.png')
  }

  create() {
    /******* STATE - GAME TITLE *******/
    this.state.add('gameTitle', GameTitle)
    this.state.start('gameTitle')
  }
}