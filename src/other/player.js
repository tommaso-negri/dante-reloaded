export default class Player extends Phaser.Sprite {
  constructor(game, commands) {
    super(game, 0, 0, 'player');
    this.exists = false;
    this.anchor.setTo(0.5, 0.5);
    this.frame = 14
    this.positionControll = 'right'

    this.vulnerabilities = {
      ghost: 0.3,
      skull: 1.2,
      devil: 5,
      gravity: 10
    };

    this.settings = {
      spawnX: 0,
      spawnY: 0,
      maxHealth: 100,
      healthControll: true,
      maxSpeed: 300,
      acceleration: 9800,
      onTheGround: null,
      onTheStairs: null,
      jumps: 0,
      jumping: false,
      jumpSpeed: -330,
      fallDamage: false
    }

    this.commands = commands;

    this.game.physics.enable(this);
    this.body.gravity.y = 650;
    this.body.collideWorldBounds = false;
    this.body.linearDamping = 1;
    this.body.allowGravity = true;
    this.body.immovable = false;
    this.body.velocity.y = 0;
    this.outOfBoundsKill = true;
    this.body.maxVelocity.setTo(this.settings.maxSpeed, 10000);
    
    this.animations.add('walkRight', [19,20,21,22,23,24,25,26,27,23], 15, true);
    this.animations.add('walkLeft', [36,35,34,33,32,31,30,29,28,32], 15, true);
    this.animations.add('runRight', [10,11,12,13,14,15,16,17,18,14], 15, true);
    this.animations.add('runLeft', [9,8,7,6,5,4,3,2,1,5], 15, true);
    this.animations.add('onTheStairs', [38,39], 5, true);

    this.game.camera.follow(this, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

    this.game.time.events.loop(Phaser.Timer.SECOND * 3, function(){
      if (this.settings.healthControll) {
        this.heal(10)
      }
    }.bind(this))
  }

  stdReset(x, y) {
    this.reset(x, y);
    this.health = this.settings.maxHealth;
    this.exists = true;
    this.dying = false;
    this.invincible = false;
  }

  spawn(x, y, data) {
    this.stdReset(x, y);
    this.settings.spawnX = x;
    this.settings.spawnY = y;
  }

  hit(enemy) {
    if (this.dying || this.invincible) {
      return
    }

    this.settings.healthControll = false;

    if (enemy.key == 'ghost') {
      this.health -= this.vulnerabilities.ghost;
      this.invincible = true;
    }

    if (enemy.key == 'skull') {
      this.health -= this.vulnerabilities.skull;
      this.invincible = true;
    }

    if (enemy.key == 'devil') {
      this.health -= this.vulnerabilities.devil;
      this.invincible = true;
    }

    if (enemy == 'gravity') {
      this.health -= this.vulnerabilities.gravity
      this.invincible = true;
    }

    this.game.time.events.add(Phaser.Timer.SECOND * 1.2, function() {
      this.invincible = false;
      this.settings.healthControll = true;
    }.bind(this));
    
    if (this.health <= 0) {
      this.dying = true;
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;
      this.body.allowGravity = false;
      this.death();
    }
  }

  death() {
    this.exists = false;
    this.game.camera.follow(null);

    // setTimeout(function(){
    //   this.reset(this.settings.spawnX, this.settings.spawnY);
    //   this.exists = true;
    //   this.dying = false;
    //   this.revive();
    //   this.game.camera.follow(this, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    // }.bind(this), 500)
  }

  update() {
    this.body.velocity.x = 0;

    if (this.invincible) {
      this.alpha = 0.6
    } else {
      this.alpha = 1;
    }

    // PLAYER MOVEMENTS
    if (this.commands.left.isDown && this.commands.shift.isDown) {
      this.positionControll = 'left';
      this.body.acceleration.x = -(this.settings.acceleration * 2);
      this.animations.play('runLeft')

    } else if (this.commands.right.isDown && this.commands.shift.isDown) {
      this.positionControll = 'right';
      this.body.acceleration.x = (this.settings.acceleration * 2);
      this.animations.play('runRight')

    } else if (this.commands.left.isDown) {
      this.positionControll = 'left';
      this.body.acceleration.x = -(this.settings.acceleration / 1.5);
      this.animations.play('walkLeft')

    } else if (this.commands.right.isDown) {
      this.positionControll = 'right';
      this.body.acceleration.x = (this.settings.acceleration / 1.5);
      this.animations.play('walkRight')

    } else {
      this.animations.stop('walkLeft')
      this.animations.stop('walkRight')
      this.animations.stop('runLeft')
      this.animations.stop('runRight')
      if ((!this.commands.up.isDown || !this.commands.down.isDown) && !this.settings.onTheStairs) {
        if (this.positionControll == 'left') {
          this.frame = 5
        } else if (this.positionControll == 'right') {
          this.frame = 14
        }
      }
      this.body.acceleration.x = 0;
      this.body.velocity.x = 0;
    }

    if (this.commands.up.isDown && this.settings.onTheStairs) {
      this.body.velocity.y = -100
      this.animations.play('onTheStairs')
    } else if (this.commands.down.isDown && this.settings.onTheStairs) {
      this.body.velocity.y = 100
      this.animations.play('onTheStairs')
    } else if (this.settings.onTheStairs) {
      this.animations.stop('onTheStairs')
      if (this.body.velocity.y > -0 && this.positionControll == 'left') {
        this.frame = 0
      } else if (this.body.velocity.y > -0 && this.positionControll == 'right') {
        this.frame = 37
      } else if (this.positionControll == 'left') {
        this.frame = 5
      } else if (this.positionControll == 'right') {
        this.frame = 14
      }
    }

    if (!this.settings.onTheStairs && this.body.velocity.y > -0 && this.positionControll == 'left') {
      this.frame = 0
    } else if (!this.settings.onTheStairs && this.body.velocity.y > -0 && this.positionControll == 'right') {
      this.frame = 37
    }

    // if (this.settings.onTheStairs && this.commands.up.isDown) {
    //   this.body.velocity.y = -100
    //   this.animations.play('onTheStairs')
    // } else if (this.settings.onTheStairs && this.commands.down.isDown) {
    //   this.body.velocity.y = 100
    //   this.animations.play('onTheStairs')
    // } else {
    //   this.animations.stop('onTheStairs')
    // }

    // this.animations.stop('walkLeft')
    // this.animations.stop('walkRight')
    // this.animations.stop('runLeft')
    // this.animations.stop('runRight')
    // if (!this.settings.onTheStairs && this.positionControll == 'left') {
    //   this.frame = 5
    // } else if (!this.settings.onTheStairs && this.positionControll == 'right') {
    //   this.frame = 14
    // }
    // this.body.acceleration.x = 0;
    // this.body.velocity.x = 0;


    // if (this.commands.left.isDown) {
    //   this.positionControll = 'left';

    //   if (this.commands.shift.isDown) {

    //     if (!this.settings.onTheStairs) {
    //       this.animations.play('runLeft')
    //     }

    //     this.body.acceleration.x = -(this.settings.acceleration * 2);

    //   } else {
    //     if (!this.settings.onTheStairs) {
    //       this.animations.play('walkLeft');
    //     }
    //     this.body.acceleration.x = -(this.settings.acceleration / 1.5);
    //   }

    // } else if (this.commands.right.isDown) {
    //   this.positionControll = 'right'

    //   if (this.commands.shift.isDown) {
    //     if (!this.settings.onTheStairs) {
    //       this.animations.play('runRight')
    //     }
    //     this.body.acceleration.x = (this.settings.acceleration * 2);
    //   } else {
    //     if (!this.settings.onTheStairs) {
    //       this.animations.play('walkRight')
    //     }
    //     this.body.acceleration.x = (this.settings.acceleration / 1.5);
    //   }
      
    // } else {
    //   this.animations.stop('walkLeft')
    //   this.animations.stop('walkRight')
    //   this.animations.stop('runLeft')
    //   this.animations.stop('runRight')
    //   if (!this.settings.onTheStairs && this.positionControll == 'left') {
    //     this.frame = 5
    //   } else if (!this.settings.onTheStairs && this.positionControll == 'right') {
    //     this.frame = 14
    //   }
    //   this.body.acceleration.x = 0;
    //   this.body.velocity.x = 0;
    // }

    // DOUBLE JUMP
    this.settings.onTheGround = this.body.onFloor()

    if (this.settings.onTheGround || this.body.touching.down) {
      this.settings.jumps = 2
      this.settings.jumping = false
    }

    if (this.settings.jumps > 0 && this.jumpInputIsActive(5)) {
      this.body.velocity.y = this.settings.jumpSpeed
      this.settings.jumping = true
    }

    if (this.settings.jumping && this.jumpInputReleased()) {
      this.settings.jumps--;
      this.settings.jumping = false;
    }

    // PLAYER FALL DAMAGE
    if (this.body.velocity.y > 800) {
      this.settings.fallDamage = true
    }
    if (this.settings.fallDamage && (this.body.onFloor() || this.body.touching.down)) {
      this.hit('gravity')
      this.settings.fallDamage = false
    }
    
  }

  jumpInputIsActive(duration) {
    let isActive = false;

    isActive = this.game.input.keyboard.downDuration(Phaser.Keyboard.SPACEBAR);

    return isActive;
  }

  jumpInputReleased() {
    let released = false;

    released = this.game.input.keyboard.upDuration(Phaser.Keyboard.SPACEBAR);

    return released;
  }
}