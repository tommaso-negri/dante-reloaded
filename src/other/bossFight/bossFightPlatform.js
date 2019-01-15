export default class BossFightPlatform extends Phaser.Sprite {
  constructor(game) {
    super(game, 0, 0, 'bossFightPlatform')
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

  disappear() {
    this.exists = false
    this.game.time.events.add(Phaser.Timer.SECOND * 2, function(){
      this.exists = true
    }.bind(this))
  }
}