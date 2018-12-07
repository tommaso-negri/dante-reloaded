export default class Bomb extends Phaser.Sprite {
  constructor(game, bulletType) {
    super(game, 0, 0, 'bomba')

    this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
    this.anchor.set(0.5);

    this.game.physics.enable(this);
    this.game.physics.arcade.gravity.y = 250;
    this.body.allowGravity = true;
    this.body.immovable = false;

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.exists = false;

    this.tracking = false;
    this.scaleSpeed = 0;

    this.bulletType = bulletType;
    this.exploded = false;
  }

  fire(x, y, angle, speed, gx, gy, data) {
    gx = gx || 0;
    gy = gy || 0;

    this.exists = true;
    this.reset(x, y);
    this.scale.set(1);
    // this.hitArea = new Phaser.Circle(x, y, 90);
    // this.body.setSize(0, 0, 100, 100);

    let test = new Phaser.Circle(x,y,90)

    this.addChild(test)

    this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);

    game.time.events.add(Phaser.Timer.SECOND * 3, function(){
      this.exploded = true;
      game.time.events.add(Phaser.Timer.SECOND * 0.0001, function(){
        this.exists = false;
        game.camera.shake(0.01, 300);
      }.bind(this))
    }.bind(this));

    this.angle = angle;

    this.body.gravity.set(gx, gy);
  }

  update() {
    if (this.tracking) {
      this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
    }

    if (this.scaleSpeed > 0) {
      this.scale.x += this.scaleSpeed;
      this.scale.y += this.scaleSpeed;
    }
  }
}