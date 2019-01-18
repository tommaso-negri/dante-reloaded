import Level1 from './Level1'

export default class GameTitle extends Phaser.State {
  constructor() {
    super('gameTitle')
  }

  preload() {
    this.state.add('Level1', Level1)
  }

  create() {
    /******* GAME TITLE BG *******/
    this.gameTitleBG = this.game.add.image(0, 0, 'gameTitleBG')
    this.gameTitleBG.width = this.game.width
    this.gameTitleBG.height = this.game.height
    this.gameTitleBG.alpha = 0

    /******* NOTICE *******/
    this.textStyle = { font: "20px Helvetica", fill: "#ffffff", align: "center",  }
    this.notice = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 295, "Fai click per avviare il gioco", this.textStyle)
    this.notice.anchor.setTo(0.5, 0.5)
    this.notice.smoothed = false
    this.notice.alpha = 0

    this.game.add.tween(this.gameTitleBG).to( { alpha: 1 }, 2000, "Linear", true, Phaser.Timer.SECOND * 1)
    
    this.game.time.events.add(Phaser.Timer.SECOND * 3, function(){
      this.test = this.game.add.tween(this.notice).to( { alpha: 1 }, 700, "Linear", true, 0, -1)
      this.test.yoyo(true, 700)
    }.bind(this))

    // this.game.time.events.loop(5, function(){
    //   this.game.add.tween(this.notice).to( { alpha: 0 }, 500, "Linear", true)
    //   this.game.add.tween(this.notice).to( { alpha: 1 }, 500, "Linear", true)
    // }.bind(this))

    this.game.input.onTap.add(this.onClick, this)
  }

  onClick() {
    this.state.start('Level1')
  }

  shutdown() {
    // this.background.destroy();    //Phaser.Image
    //  this.mySprite.destroy(true);  //Phaser.Sprite
    //  this.myImage.destroy(true);   //Phaser.Image
    //  this.game.cache.removeImage("image-I-wont-use-anymore", true);
  }
}