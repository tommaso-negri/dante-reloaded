export default class FallingPlatform extends Phaser.Sprite {
  constructor(game, x, y, sprite, group) {
    if (typeof group === 'undefined') { group = game.world }
    super(game, x, y, sprite)

    this.game.physics.arcade.enable(this)
    this.anchor.x = 0.5
    this.body.immovable = true
    this.body.allowGravity = false

    group.add(this)
  }

  initFalling() {
    // DEV: AGGIUNGERE FUNZIONE DI TWEENING
    this.body.velocity.y = +30
    this.game.time.events.add(Phaser.Timer.SECOND * 1, function(){
      this.exists = false;
    }.bind(this))
  }
}