export default class BossFightTarget extends Phaser.Sprite {
  constructor(game) {
    super(game, 0, 0, 'bossFightTarget')
    this.exists = false

    // BODY
    this.game.physics.enable(this)
    this.body.gravity.y = 650
    this.body.collideWorldBounds = false
    this.body.bounce.y = 0.1
    this.body.linearDamping = 1
    this.body.allowGravity = false
    this.body.immovable = false
    this.body.velocity.y = 0
    
  }

  spawn(x, y) {
    this.reset(x, y)
    this.exists = true
  }
}