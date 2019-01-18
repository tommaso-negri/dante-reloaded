import Preload from './Preload'

export default class Boot extends Phaser.State {
  constructor() {
    super('boot')
  }

  preload() {
    /******* ASSETS - LOADING ANIMATION *******/
    this.game.load.image('loading', 'assets/sprites/ui/loading.gif')
  }

  create() {
    /******* STATE - PRELOAD *******/
    this.game.state.add('preload', Preload)
    this.game.state.start('preload')
  }
}