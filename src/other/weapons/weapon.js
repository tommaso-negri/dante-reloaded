let overrideElementsNum

export default class Weapon extends Phaser.Group {
  constructor(game, spriteType, instances, override, weaponConfig, name) {
    super(game, game.world, name)
    this.game = game;
    this.spriteType = spriteType;
    this.weaponConfig = weaponConfig;
    overrideElementsNum = override;

    this.nextFire = 0;
    this.bulletSpeed = weaponConfig.bulletSpeed;
    this.fireRate = weaponConfig.fireRate;

    if (instances > 0) {
      let bullet;
      for (var i = 0; i < instances; i++) {
        bullet = this.add(new spriteType(game, weaponConfig.bulletType));
      }
    }
    return this;
  }

  fire(source, data) {
    if (this.game.time.time < this.nextFire) {return;}

    let x = source.x + 0;
    let y = source.y + 0;

    if (data.direction == 180) {
      x = source.x - 30;
      y = source.y + 0;
    }
    if (data.direction == 0 && this.weaponConfig.bulletType != 'bomb') {
      x = source.x + 30;
      y = source.y + 0;
    }
    if (data.direction == -90) {
      x = source.x + 0;
      y = source.y + 30;
    }

    let obj = this.getFirstExists(false);
    if (!obj) {
      if (!overrideElementsNum) {
        return
      } else {
        obj = new spriteType(this.game, weaponConfig.bulletType);
        this.add(obj, true);
      }
    }
    
    obj.fire(x, y, data.direction, this.bulletSpeed, 0, 0);

    this.nextFire = this.game.time.time + this.fireRate;
  }

  reset() {
    this.bulletSpeed = 300;
    this.fireRate = 300;

    this.visible = false;
    this.callAll('reset', null, 0, 0);
    this.setAll('exists', false);
  }
}