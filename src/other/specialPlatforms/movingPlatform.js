export default class MovingPlatform extends Phaser.Sprite {
  constructor(game, x, y, sprite, group) {
    if (typeof group === 'undefined') { group = game.world }
    super(game, x, y, sprite)

    this.game.physics.arcade.enable(this)
    this.anchor.x = 0.5
    this.body.immovable = true
    this.body.allowGravity = false
    this.body.customSeparateX = true
    this.body.customSeparateY = true

    this.playerLocked = false

    group.add(this)
  }

  addMotionPath(motionPath) {
    this.tweenX = this.game.add.tween(this.body);
    this.tweenY = this.game.add.tween(this.body);

    //  motionPath is an array containing objects with this structure
    //  [
    //   { x: "+200", xSpeed: 2000, xEase: "Linear", y: "-200", ySpeed: 2000, yEase: "Sine.easeIn" }
    //  ]

    for (var i = 0; i < motionPath.length; i++)
    {
        this.tweenX.to( { x: motionPath[i].x }, motionPath[i].xSpeed, motionPath[i].xEase);
        this.tweenY.to( { y: motionPath[i].y }, motionPath[i].ySpeed, motionPath[i].yEase);
    }

    this.tweenX.loop();
    this.tweenY.loop();
  }

  start() {
    this.tweenX.start();
    this.tweenY.start();
  }

  stop() {
    this.tweenX.stop();
    this.tweenY.stop();
  }
}