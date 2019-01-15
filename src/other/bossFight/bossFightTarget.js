export default class BossFightTarget extends Phaser.Sprite {
  constructor(game) {
    super(game, 0, 0, 'bossFightTarget')
    this.exists = false
    
  }

  spawn(x, y) {
    this.reset(x, y)
    this.exists = true
  }
}