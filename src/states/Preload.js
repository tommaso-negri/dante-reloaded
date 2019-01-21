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

    /******* ASSETS - WEAPONS *******/
    this.game.load.image('bullet', 'assets/sprites/bullet.png')
    this.game.load.image('bible', 'assets/sprites/bible.png')
    this.game.load.atlas('bomb_explosion', 'assets/sprites/bomb_explosion/bomb_explosion.png', 'assets/sprites/bomb_explosion/bomb_explosion.json')

    /******* ASSETS - PLAYER *******/
    this.game.load.spritesheet('player', 'assets/sprites/player.png', 40, 54.98)

    /******* ASSETS - ENEMIES *******/
    this.game.load.spritesheet('ghost', 'assets/sprites/ghost.png', 42, 80)
    this.game.load.spritesheet('skull', 'assets/sprites/skull.png', 36, 70)
    this.game.load.spritesheet('devil', 'assets/sprites/devil.png', 36, 70.1)

    /******* ASSETS - GUI *******/
    this.game.load.spritesheet('bombCounter', 'assets/sprites/ui/bombCounter.png', 200, 96)

    /******* ASSETS - FLASHBACKS *******/
    this.game.load.image('flashback1', 'assets/images/flashbacks/flashback1.png')
    this.game.load.image('flashback2', 'assets/images/flashbacks/flashback2.png')
    this.game.load.image('flashback3', 'assets/images/flashbacks/flashback3.png')
    this.game.load.image('flashback4', 'assets/images/flashbacks/flashback4.png')
    this.game.load.image('flashback5', 'assets/images/flashbacks/flashback5.png')
    this.game.load.image('flashback6', 'assets/images/flashbacks/flashback6.png')
    this.game.load.image('flashback7', 'assets/images/flashbacks/flashback7.png')
    this.game.load.image('flashback8', 'assets/images/flashbacks/flashback8.png')

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

    /******* ASSETS - SFX *******/
    this.game.load.audio('explosion', 'assets/audio/sfx/explosion.mp3')
    this.game.load.audio('bullet', 'assets/audio/sfx/bullet.mp3')
    this.game.load.audio('bombCollection', 'assets/audio/sfx/bombCollection.mp3')
    this.game.load.audio('hellBackground', 'assets/audio/sfx/hellBackground.mp3')

    /******* ASSETS - GAME TITLE *******/
    this.game.load.image('gameTitleBG', 'assets/sprites/ui/gameTitleBG.png')
    this.game.load.image('gameTitleStart', 'assets/sprites/ui/gameTitleStart.png')
    this.game.load.image('gameTitleCredits', 'assets/sprites/ui/gameTitleCredits.png')
    this.game.load.image('gameTitleCreditsOver', 'assets/sprites/ui/gameTitleCreditsOver.png')
    this.game.load.image('back', 'assets/sprites/ui/back.png')

    /******* ASSETS - DIALOGS *******/
    this.game.load.image('dia_1.1', 'assets/images/dialogs/dia_1.1.png')
    this.game.load.image('dia_1.2', 'assets/images/dialogs/dia_1.2.png')
    this.game.load.image('dia_1.3', 'assets/images/dialogs/dia_1.3.png')

    /******* ASSETS - OTHER *******/
    this.game.load.image('stairs', 'assets/sprites/stairs.png')
    this.game.load.image('movente', 'assets/sprites/movingPlatform.png')
    this.game.load.image('testFlashback', 'assets/images/testFlashback.png')
    this.game.load.video('loadingVideo', 'assets/sprites/ui/loadingVideo.mp4')

// DA RIMUOVERE ALLA FINE

    // /******* ASSETS - TILEMAPS *******/
    // // LEVEL2 SCENE1
    // this.game.load.tilemap('l2s1Map', 'assets/tilemaps/level2/scene1/l2s1Map.json', null, Phaser.Tilemap.TILED_JSON)
    // this.game.load.image('l2s1Tileset', 'assets/tilemaps/level2/scene1/l2s1Tileset.png')
    // // LEVEL2 SCENE2
    // this.game.load.tilemap('l2s2Map', 'assets/tilemaps/level2/scene2/l2s2Map.json', null, Phaser.Tilemap.TILED_JSON)
    // this.game.load.image('l2s2Tileset', 'assets/tilemaps/level2/scene2/l2s2Tileset.png')
    // // LEVEL2 SCENE3
    // this.game.load.tilemap('l2s3Map', 'assets/tilemaps/level2/scene3/l2s3Map.json', null, Phaser.Tilemap.TILED_JSON)
    // this.game.load.image('l2s3Tileset', 'assets/tilemaps/level2/scene3/l2s3Tileset.png')

    // /******* ASSETS - PARALLAX BGs *******/
    // // LEVEL2 SCENE1
    // this.game.load.image('l2s1BG_1', 'assets/images/BGs/level2/scene1/l2s1BG_1.png')
    // this.game.load.image('l2s1BG_2', 'assets/images/BGs/level2/scene1/l2s1BG_2.png')
    // this.game.load.image('l2s1BG_3', 'assets/images/BGs/level2/scene1/l2s1BG_3.png')
    // // LEVEL2 SCENE2
    // this.game.load.image('l2s2BG_1', 'assets/images/BGs/level2/scene2/l2s2BG_1.png')
    // this.game.load.image('l2s2BG_2', 'assets/images/BGs/level2/scene2/l2s2BG_2.png')
    // // LEVEL2 SCENE3
    // this.game.load.image('l2s3BG_1', 'assets/images/BGs/level2/scene3/l2s3BG_1.png')
    // this.game.load.image('l2s3BG_2', 'assets/images/BGs/level2/scene3/l2s3BG_2.png')
    // this.game.load.image('l2s3BG_3', 'assets/images/BGs/level2/scene3/l2s3BG_3.png')

    // /******* ASSETS - DIALOGS *******/
    // this.game.load.image('dia_2.1', 'assets/images/dialogs/dia_2.1.png')
    // this.game.load.image('dia_2.2', 'assets/images/dialogs/dia_2.2.png')
    // this.game.load.image('dia_2.3', 'assets/images/dialogs/dia_2.3.png')
    // this.game.load.image('dia_2.4', 'assets/images/dialogs/dia_2.4.png')

    // /******* OTHER *******/
    // this.game.load.image('devilFinalLevel', 'assets/sprites/devilFinalLevel.png')
    // this.game.load.image('lucifero', 'assets/sprites/lucifero.png')
  }

  create() {
    /******* STATE - GAME TITLE *******/
    this.state.add('gameTitle', GameTitle)
    this.state.start('gameTitle')
  }
}