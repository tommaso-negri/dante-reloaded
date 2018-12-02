let overrideElementsNum

export default class Pool extends Phaser.Group {
  constructor(game, spriteType, instances, override, name) {
    super(game, game.world, name);
    this.game = game;
    this.spriteType = spriteType;
    overrideElementsNum = override;
    if (instances > 0) {
      let sprite;
      for (var i = 0; i < instances; i++) {
        sprite = this.add(new spriteType(game));
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
        obj = new this.spriteType(this.game);
        this.add(obj, true);
      }
    }
    return obj.spawn(x, y, data);
  }
}