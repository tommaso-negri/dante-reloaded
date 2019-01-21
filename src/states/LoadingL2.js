import L2S1 from './level2/L2S1'

export default class LoadingL2 extends Phaser.State {
  constructor() {
    super('loadingL2')
  }

  preload() {
    /******* LOADING VIDEO *******/
    this.loadingVideo = this.game.add.video('loadingVideo')
    this.loadingVideo.play(true)
    this.loadingVideo.addToWorld()

    /******* ASSETS - TILEMAPS *******/
    // LEVEL2 SCENE1
    this.game.load.tilemap('l2s1Map', 'assets/tilemaps/level2/scene1/l2s1Map.json', null, Phaser.Tilemap.TILED_JSON)
    this.game.load.image('l2s1Tileset', 'assets/tilemaps/level2/scene1/l2s1Tileset.png')
    // LEVEL2 SCENE2
    this.game.load.tilemap('l2s2Map', 'assets/tilemaps/level2/scene2/l2s2Map.json', null, Phaser.Tilemap.TILED_JSON)
    this.game.load.image('l2s2Tileset', 'assets/tilemaps/level2/scene2/l2s2Tileset.png')
    // LEVEL2 SCENE3
    this.game.load.tilemap('l2s3Map', 'assets/tilemaps/level2/scene3/l2s3Map.json', null, Phaser.Tilemap.TILED_JSON)
    this.game.load.image('l2s3Tileset', 'assets/tilemaps/level2/scene3/l2s3Tileset.png')

    /******* ASSETS - PARALLAX BGs *******/
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

    /******* OTHER *******/
    this.game.load.image('devilFinalLevel', 'assets/sprites/devilFinalLevel.png')
  }

  create() {
    /******* STATE - L2S1 *******/
    this.state.add('L2S1', L2S1)
    this.state.start('L2S1')
  }
}