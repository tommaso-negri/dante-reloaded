export default class BossFightButton extends Phaser.Sprite {
  constructor(game) {
    super(game, 0, 0, 'bossFightButtonPressed')
    this.exists = false

    // BODY
    this.game.physics.enable(this)
    this.body.allowGravity = false
    this.body.immovable = true

    this.enabled = false
  }

  spawn(x, y) {
    this.reset(x, y)
    this.exists = true
  }

  enable() {
    this.loadTexture('bossFightButton')
    this.enabled = true
  }

  disable() {
    this.loadTexture('bossFightButtonPressed')
    this.enabled = false
  }
}