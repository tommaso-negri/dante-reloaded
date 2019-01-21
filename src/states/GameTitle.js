import L1S1 from './level1/L1S1'
import L1S2 from './level1/L1S2'
import L1S3 from './level1/L1S3'
import L2S1 from './level2/L2S1'
import L2S2 from './level2/L2S2'
import L2S3 from './level2/L2S3'
import LevelF from './LevelF'
import LoadingL2 from './LoadingL2'

export default class GameTitle extends Phaser.State {
  constructor() {
    super('gameTitle')
  }

  preload() {
    this.state.add('L2S3', L2S3)
  }

  create() {
    this.creditsControll = false
    localStorage.setItem('numBombs', `${0}`)

    /******* GAME TITLE BG *******/
    this.gameTitleBG = this.game.add.image(0, 0, 'gameTitleBG')
    this.gameTitleBG.width = this.game.width
    this.gameTitleBG.height = this.game.height
    this.gameTitleBG.alpha = 0

    this.gameTitleStart = this.game.add.image(0, 0, 'gameTitleStart')
    this.gameTitleStart.position.x = 520
    this.gameTitleStart.position.y = 20
    this.gameTitleStart.alpha = 0

    this.gameTitleCredits = this.game.add.image(0, 0, 'gameTitleCredits')
    this.gameTitleCredits.position.x = 10
    this.gameTitleCredits.position.y = 15
    this.gameTitleCredits.scale.set(0.6, 0.6)
    this.gameTitleCredits.inputEnabled = true
    this.gameTitleCredits.alpha = 0


    this.charactersImage = this.game.add.image(0, 0, 'characters')
    this.charactersImage.alpha = 0

    this.commandsImage = this.game.add.image(0, 0, 'commands')
    this.commandsImage.alpha = 0
    
    this.creditsImage = this.game.add.image(0, 0, 'credits')
    this.creditsImage.alpha = 0
    this.backButton = this.game.add.image(200, 650, 'back')
    this.backButton.alpha = 0
    this.backButton.inputEnabled = true

    /******* NOTICE *******/
    this.textStyle = { font: "20px Helvetica", fill: "#ffffff", align: "center",  }
    this.notice = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 295, "Fai click per avviare il gioco", this.textStyle)
    this.notice.anchor.setTo(0.5, 0.5)
    this.notice.smoothed = false
    this.notice.alpha = 0

    this.game.add.tween(this.gameTitleBG).to({ alpha: 1 }, 2000, "Linear", true, Phaser.Timer.SECOND * 1)
    this.game.add.tween(this.gameTitleStart).to({ alpha: 1 }, 2000, "Linear", true, Phaser.Timer.SECOND * 1)
    this.game.add.tween(this.gameTitleCredits).to({ alpha: 1 }, 2000, "Linear", true, Phaser.Timer.SECOND * 1)
    
    this.game.time.events.add(Phaser.Timer.SECOND * 3, function(){
      this.test = this.game.add.tween(this.notice).to({ alpha: 1 }, 700, "Linear", true, 0, -1)
      this.test.yoyo(true, 700)
    }.bind(this))

    this.charactersImageAnimIn = this.game.add.tween(this.charactersImage).to({ alpha: 1 }, 500, "Linear", false, Phaser.Timer.SECOND * 0.8)
    this.charactersImageAnimOut = this.game.add.tween(this.charactersImage).to({ alpha: 0 }, 300, "Linear", false)

    this.commandsImageAnimIn = this.game.add.tween(this.commandsImage).to({ alpha: 1 }, 500, "Linear", false, Phaser.Timer.SECOND * 0.4)
    this.commandsImageAnimOut = this.game.add.tween(this.commandsImage).to({ alpha: 0 }, 300, "Linear", false)
    
    this.creditsImageAnimIn = this.game.add.tween(this.creditsImage).to({ alpha: 1 }, 500, "Linear", false, Phaser.Timer.SECOND * 0.4)
    this.creditsImageAnimOut = this.game.add.tween(this.creditsImage).to({ alpha: 0 }, 300, "Linear", false)
    this.backButtonImageAnimIn = this.game.add.tween(this.backButton).to({ alpha: 1 }, 500, "Linear", false, Phaser.Timer.SECOND * 0.4)
    this.backButtonImageAnimOut = this.game.add.tween(this.backButton).to({ alpha: 0 }, 300, "Linear", false)

    this.game.input.onTap.add(this.onClick, this)

    /******* FLASHBACKS *******/
    // FLASHBACK1
    this.flashback1 = this.game.add.image(0, 0, 'flashback1')
    this.flashback1.alpha = 0
    this.flashback1AnimIn = this.game.add.tween(this.flashback1).to({ alpha: 1 }, 500, "Linear", false, Phaser.Timer.SECOND * 0.4)
    this.flashback1AnimOut = this.game.add.tween(this.flashback1).to({ alpha: 0 }, 500, "Linear", false)
    // FLASHBACK2
    this.flashback2 = this.game.add.image(0, 0, 'flashback2')
    this.flashback2.alpha = 0
    this.flashback2AnimIn = this.game.add.tween(this.flashback2).to({ alpha: 1 }, 500, "Linear", false)
    this.flashback2AnimOut = this.game.add.tween(this.flashback2).to({ alpha: 0 }, 500, "Linear", false)
    // FLASHBACK3
    this.flashback3 = this.game.add.image(0, 0, 'flashback3')
    this.flashback3.alpha = 0
    this.flashback3AnimIn = this.game.add.tween(this.flashback3).to({ alpha: 1 }, 500, "Linear", false)
    this.flashback3AnimOut = this.game.add.tween(this.flashback3).to({ alpha: 0 }, 500, "Linear", false)
  }

  update() {
    if (this.gameTitleCredits.input.pointerOver()) {
      this.gameTitleCredits.loadTexture('gameTitleCreditsOver')
      // this.creditsControll = true
    } else {
      this.gameTitleCredits.loadTexture('gameTitleCredits')
      // this.creditsControll = false
    }
    if (this.gameTitleCredits.input.pointerDown()) {
      this.creditsImageAnimIn.start()
      this.backButtonImageAnimIn.start()
      this.creditsControll = true
    }
    if (this.backButton.input.pointerDown()) {
      this.creditsImageAnimOut.start()
      this.backButtonImageAnimOut.start()
      this.game.time.events.add(Phaser.Timer.SECOND * 0.1, function(){
        this.creditsControll = false
      }, this)
    }
  }

  onClick() {
    this.state.start('L1S1')
    if (!this.creditsControll) {
      this.game.add.tween(this.gameTitleBG).to({ alpha: 0 }, 500, "Linear", true)
      this.game.add.tween(this.gameTitleStart).to({ alpha: 0 }, 500, "Linear", true)
      this.game.add.tween(this.gameTitleCredits).to({ alpha: 0 }, 500, "Linear", true)
      this.notice.destroy()
      this.charactersImageAnimIn.start()

      this.game.time.events.add(Phaser.Timer.SECOND * 3, function(){
        this.charactersImageAnimOut.start()
        this.commandsImageAnimIn.start()

        this.game.time.events.add(Phaser.Timer.SECOND * 3, function(){
          this.commandsImageAnimOut.start()

          this.game.time.events.add(Phaser.Timer.SECOND * 3, function(){
            this.commandsImageAnimOut.start()
            this.flashback1AnimIn.start()

            this.game.time.events.add(Phaser.Timer.SECOND * 3, function(){
              this.flashback1AnimOut.start()
              this.flashback2AnimIn.start()

              this.game.time.events.add(Phaser.Timer.SECOND * 3, function(){
                this.flashback2AnimOut.start()
                this.flashback3AnimIn.start()

                this.game.time.events.add(Phaser.Timer.SECOND * 3, function(){
                  this.flashback3AnimOut.start()

                  this.game.time.events.add(Phaser.Timer.SECOND * 0.3, function(){
                    this.state.start('L1S1')
                  }, this)
                }, this)
              }, this)
            }, this)
          }, this)
        }, this)
      }, this)
    }
  }

  shutdown() {
    // this.background.destroy();    //Phaser.Image
    //  this.mySprite.destroy(true);  //Phaser.Sprite
    //  this.myImage.destroy(true);   //Phaser.Image
    //  this.game.cache.removeImage("image-I-wont-use-anymore", true);
  }
}