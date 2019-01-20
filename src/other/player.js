export default class Player extends Phaser.Sprite {
  constructor(game, commands) {
    super(game, 0, 0, 'player');
    this.exists = false;
    this.anchor.setTo(0.5, 0.5);
    this.frame = 17

    this.vulnerabilities = {
      ghost: 0.3,
      soul: 1.2,
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
      jumps: 0,
      jumping: false,
      jumpSpeed: -330,
      fallDamage: false,
      gameStarted: true
    }

    this.commands = commands;

    this.game.physics.enable(this);
    this.body.gravity.y = 650;
    this.body.collideWorldBounds = false;
    this.body.bounce.y = 0.1;
    this.body.linearDamping = 1;
    this.body.allowGravity = true;
    this.body.immovable = false;
    this.body.velocity.y = 0;
    this.outOfBoundsKill = true;
    this.body.maxVelocity.setTo(this.settings.maxSpeed, 10000);
    
    this.animations.add('right', [18,19,20,21,22,23,24,25,26], 15, true);
    this.animations.add('left', [15,14,13,12,11,10,9,8,7], 15, true);
    this.animations.add('jumpLeft', [4,3,2,1,0], 10, true);
    // this.animations.add('jumpRight', [28,29,30,31,32,33], 15, true);
    // this.animations.add('jumpLeft', [0,1,2,3,4,5], 15, true);

    // this.animations.add('rightWalk', Phaser.Animation.generateFrameNames('Dante-RightWalk', 10, 1), 15, true)
    // this.animations.add('leftWalk', Phaser.Animation.generateFrameNames('Dante-LeftWalk', 1, 10), 15, true)

    this.game.camera.follow(this, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

    this.game.time.events.loop(Phaser.Timer.SECOND * 3, function(){
      if (this.settings.healthControll) {
        this.heal(10)
      }
    }.bind(this))

    // this.game.time.events.add(Phaser.Timer.SECOND * 0.5, function(){
    //   this.settings.gameStarted = true
    // }, this)
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

    if (enemy.key == 'soul') {
      this.health -= this.vulnerabilities.soul;
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

    // game.camera.focusOnXY(this.x + 0, this.y - 250)

    if (this.invincible) {
      this.alpha = 0.6
    } else {
      this.alpha = 1;
    }

    // PLAYER MOVEMENTS
    if (this.settings.gameStarted) {
      if (this.commands.left.isDown) {
        this.positionControll = 'left';
        this.animations.play('left');
  
        if (this.commands.shift.isDown) {
          this.body.acceleration.x = -(this.settings.acceleration * 2);
        } else {
          this.body.acceleration.x = -this.settings.acceleration;
        }
  
      } else if (this.commands.right.isDown) {
        this.positionControll = 'right'
        this.animations.play('right')
  
        if (this.commands.shift.isDown) {
          this.body.acceleration.x = (this.settings.acceleration * 2);
        } else {
          this.body.acceleration.x = this.settings.acceleration;
        }
      } else {
        this.animations.stop('right')
        this.animations.stop('left')
        if (this.positionControll == 'left') {
          this.frame = 16
        } else if (this.positionControll == 'right') {
          this.frame = 17
        }
        // this.animations.stop('rightWalk');
        // this.animations.stop('leftWalk')
        // this.frameName = 'Dante-RightWalk10'
        this.body.acceleration.x = 0;
        this.body.velocity.x = 0;
      }
    }

    if (this.body.velocity.y > -0.97 && this.positionControll == 'left') {
      this.frame = 1
    } else if (this.body.velocity.y > -0.97 && this.positionControll == 'right') {
      this.frame = 32
    }

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

  onStairs() {
    if (this.commands.up.isDown) {
      this.body.velocity.y = -100
    } else if (this.commands.down.isDown) {
      this.body.velocity.y = 100
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