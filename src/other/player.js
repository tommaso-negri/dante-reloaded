let jumpControll = 0;

export default class Player extends Phaser.Sprite {
  constructor(game, commands) {
    super(game, 0, 0, 'playerSprite');
    this.exists = false;
    this.anchor.setTo(0.5, 0.5);

    this.vulnerabilities = {
      ghost: 0.3,
      bomb: 10
    };

    this.game.physics.enable(this);
    this.game.physics.arcade.gravity.y = 250;
    this.body.collideWorldBounds = true;
    this.body.bounce.y = 0.1;
    this.body.linearDamping = 1;
    this.body.allowGravity = true;
    this.body.immovable = false;
    this.body.velocity.y = 0;
    
    this.animations.add('right', [1,2,3,4,5,6,7,8,9], 25, true);
    this.animations.add('left', [20,19,18,17,16,15,14,13,12], 25, true);
    this.animations.add('jumpRight', [26], 10, true);
    this.animations.add('jumpLeft', [28], 10, true);
    
    this.maxHealth = 1;
    this.healthControll = false;
    this.commands = commands;
    this.directionControll = 'right';

    this.game.camera.follow(this, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
  }

  stdReset(x, y) {
    this.reset(x, y);
    this.energy = this.maxHealth;
    this.exists = true;
    this.dying = false;
    this.invincible = false;
  }

  spawn(x, y, data) {
    this.stdReset(x, y);
  }

  hit(enemy) {
    if (this.dying || this.invincible) {
      return
    }

    this.healthControll = true;
    this.game.time.events.add(Phaser.Timer.SECOND * 10, function(){
      this.healthControll = false;
    }.bind(this))

    if (enemy.key == 'ghost') {
      // this.health -= this.vulnerabilities.ghost;
      this.health -= 0.3;
      // this.x -= 20;
      this.invincible = true;
      this.game.time.events.add(Phaser.Timer.SECOND * 1.2, function() {
        this.invincible = false;
      }.bind(this));
    }

    if (this.health < 0) {
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
  }

  update() {
    if (this.invincible) {
      this.alpha = 0.6
    } else {
      this.alpha = 1;
    }

    if (!this.healthControll) {
      this.health = 1;
    }

    // PLAYER MOVEMENTS
    // if (this.commands.right.isDown && this.commands.left.isDown) {
    //   this.body.velocity.x = 0;
    // }

    if (this.commands.left.isDown) {
      this.positionControll = 'left';

      if (this.commands.shift.isDown) {
        this.body.velocity.x = -250;
        this.animations.play('left').speed = 15;
      } else {
        this.body.velocity.x = -150;
        this.animations.play('left');
      }
    } else if (this.commands.right.isDown) {
      this.positionControll = 'right';

      if (this.commands.shift.isDown) {
        this.body.velocity.x = 250;
        this.animations.play('right').speed = 15;
      } else {
        this.body.velocity.x = 150;
        this.animations.play('right');
      }
    } else {
      this.frame = 0;
      this.positionControll = 'right';
    }

    // DOUBLE JUMP
    this.game.input.keyboard.onDownCallback = function(e) {
      if(e.keyCode == Phaser.Keyboard.SPACEBAR && jumpControll==1 || this.body.blocked.right || this.body.blocked.left) {
        this.body.velocity.y = -150;
        jumpControll=0;
      }

      if (e.keyCode == Phaser.Keyboard.SPACEBAR && jumpControll==0 && this.body.onFloor()) {
        this.body.velocity.y = -200;
        jumpControll=1;
      }
    }.bind(this)

    if (this.body.velocity.y < -0.38 || this.body.velocity.y > 0 || !this.body.onFloor()) {
      if (this.positionControll == 'right') {
        this.animations.play('jumpRight');
      } else if (this.positionControll == 'left') {
        this.animations.play('jumpLeft')
      }
    }

    // if (this.body.velocity.x != 0 || this.body.y != 0) {
    //   this.positionControll = {
    //     x: this.body.x,
    //     y: this.body.y
    //   }
    // }
    
  }
}