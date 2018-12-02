import Enemy from './enemy'

export default class Ghost extends Enemy {
  constructor(game) {
    super(game, 'ghost')

    this.vulnerabilities = {
      normal: 0,
      bomb: 10
    };

    this.height = 32;
    this.width = 32;
  }

  spawn(x, y) {
    this.stdReset(x, y);
  }

  
}