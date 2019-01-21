import Enemy from './enemy'

export default class Devil extends Enemy {
  constructor(game) {
    super(game, 'devil')
    
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

    this.animations.add('walkLeft', [20,19,18,17,16,15,14,13,12,11], 15, true)
    this.animations.add('walkRight', [1,2,3,4,5,6,7,8,9,10], 15, true)
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
        this.animations.play('walkLeft')
      }
      if (this.x <= this.settings.patrollL + (this.width/2)) {
        this.body.velocity.x = 80;
        this.animations.play('walkRight')
      }
    }
  }

}