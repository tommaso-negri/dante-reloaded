export default class Stairs extends Phaser.Sprite {
  constructor(game) {
    super(game, 0, 0, 'stairs')
    this.exists = false
    this.anchor.set(0.5, 0)

    this.game.physics.enable(this)
    this.body.allowGravity = false
    this.body.immovable = true
  }

  spawn(x, y) {
    this.reset(x, y)
    this.exists = true
  }
}