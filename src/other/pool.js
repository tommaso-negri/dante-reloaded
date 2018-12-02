export default class Pool extends Phaser.Group {
  constructor(game, spriteType, instances, name) {
    /* I call super (Phaser.Group) on which the Pool is extended.*/
    super(game, game.world, name);
    this.game = game;
    this.spriteType = spriteType; // Needed when creating new objects in the pool
    if (instances > 0) { // We don't need to add anything to the group
      let sprite;
      for (var i = 0; i < instances; i++) {
        sprite = this.add(new spriteType(game)); // Add new sprite
      }
    }
    return this;
  }
 
  create(x, y, data) {
    // Find the first child that has a false exist property:
    let obj = this.getFirstExists(false);
    if (!obj) {
      // We failed to find an availble child, so we create one now and add it to the pool.
      obj = new this.spriteType(this.game);
      this.add(obj, true);
    }
    /* We call the childs spawn method and return the object to whatever triggered this.
     The spawn method will handle stuff like position, resetting the health property
     and setting exists to true. The spawned object will live even if the returned
     reference is ignored:*/
    return obj.spawn(x, y, data);
  }
}