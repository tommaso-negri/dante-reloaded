let overrideElementsNum

export default class MovingPlatformPool extends Phaser.Group {
  constructor(game, spriteType, sprite, instances, override, name) {
    super(game, game.world, name);
    this.game = game;
    this.spriteType = spriteType;
    this.sprite = sprite;
    overrideElementsNum = override;
    if (instances > 0) {
      let sprite;
      for (var i = 0; i < instances; i++) {
        sprite = this.add(new spriteType(game, sprite));
      }
    }
    return this;
  }
 
  create(x, y, data) {
    let obj = this.getFirstExists(false);
    if (!obj) {
      if (!overrideElementsNum) {
        return
      } else {
        obj = new this.spriteType(this.game, this.sprite);
        this.add(obj, true);
      }
    }
    return obj.spawn(x, y, data);
  }
}