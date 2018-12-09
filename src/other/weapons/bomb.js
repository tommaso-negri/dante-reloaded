export default class Bomb extends Phaser.Sprite {
  constructor(game, bulletType) {
    super(game, 0, 0, 'bible')

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
    this.alpha = 1;
    this.scale.set(1);
    this.exploded = false;

    this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);

    game.time.events.add(Phaser.Timer.SECOND * 1, function(){
      this.exploded = true;
      game.time.events.add(Phaser.Timer.SECOND * 0.0001, function(){
        // this.exists = false;
        this.width = 150;
        this.height = 150;
        this.alpha = 0;
        game.camera.shake(0.01, 300);
        let bombExplosion = new BombExplosion(this.game);
        this.game.add.existing(bombExplosion);
        bombExplosion.spawn(this.x, this.y);
        game.time.events.add(Phaser.Timer.SECOND * 0.0001, function(){
          this.exists = false;
        }.bind(this))
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

export class BombExplosion extends Phaser.Sprite {
  constructor(game) {
    super(game, 0, 0, 'kaboom');
    this.exists = false;
    this.anchor.setTo(0.5, 0.5);

    this.width = 150;
    this.height = 150;
  }

  stdReset(x, y) {
    this.reset(x, y);
    this.exists = true;
  }

  spawn(x, y, data) {
    this.stdReset(x, y);
    this.animations.add('kaboom');
    this.play('kaboom', 30, false, true);
    this.game.time.events.add(Phaser.Timer.SECOND * 3, function(){
      this.exists = false;
    }.bind(this))
  }
}