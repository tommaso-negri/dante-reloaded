import Enemy from './enemy'

export default class Ghost extends Enemy {
  constructor(game) {
    super(game, 'ghost')
    
    this.body.allowGravity = true;
    this.body.immovable = false;
    this.body.velocity.x = 0;

    this.vulnerabilities = {
      gun: 0.3,
      bomb: 10
    };

    this.settings = {
      patrollL: 0,
      patrollR: 0
    }

    this.height = 32;
    this.width = 32;
  }

  hit(bullet) {
    if (this.dying) {
      return
    }

    if (bullet.bulletType == 'gun') {
      this.health -= this.vulnerabilities.gun;
    } else if (bullet.bulletType == 'bomb' && bullet.exploded == true) {
      this.health -= this.vulnerabilities.bomb;
    }

    if (this.health < 0) {
      this.dying = true;
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;
      this.body.allowGravity = false;
      this.death();
    }
  }

  spawn(x, y, data) {
    this.stdReset(x, y);
    if (data.patrollL == 0 && data.patrollR == 0) {
      return
    } else {
      this.body.velocity.x = 80;
      this.settings = {
        patrollL: data.patrollL,
        patrollR: data.patrollR
      };
    }
  }

  update() {
    if (this.settings.patrollR == 0 && this.settings.patrollL == 0) {
      return
    } else {
      if (this.x + (this.width/2) >= this.settings.patrollR) {
        this.body.velocity.x = -80;
      }
      if (this.x <= this.settings.patrollL + (this.width/2)) {
        this.body.velocity.x = 80;
      }
    }
  }

}