export default class BossFightLava extends Phaser.Sprite {
  constructor(game) {
    super(game, 0, 0, 'bossFightLava')
    this.exists = false

    // BODY
    this.game.physics.enable(this)
    this.body.allowGravity = false
    this.body.immovable = true
  }

  spawn(x, y) {
    this.reset(x, y)
    this.exists = true
  }
}