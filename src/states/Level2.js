import Phaser from 'phaser-ce'

import Player from '../other/player'
import Pool from '../other/pool'
import Bible from '../other/bible'
import Bullet from '../other/weapons/bullet'
import Bomb from '../other/weapons/bomb'
import Weapon from '../other/weapons/weapon'
import BombCounter from '../other/inGameUi/bombCounter'

let map
let layer

let player
let playerOldPos = {
  x: 0,
  y: 0
}
let commands

let gun
let bomb
let numBoms = 0

let biblePool

let flashbacks = {
  one: true,
  two: true,
  three: true
}

let bombUI
let bombDropping = false

export default class Level2 extends Phaser.State {
  constructor() {
    super('Level2')
  }

  preload() {
    game.load.tilemap('Level2Map', 'assets/tilemaps/level2/Level2Map.json', null, Phaser.Tilemap.TILED_JSON)
    game.load.image('tiles', 'assets/tilemaps/level1/TileOk.png')

    game.load.spritesheet('playerSprite', 'assets/sprites/omino.png', 51, 71)
  }

  create() {
    // WORLD, MAP, TILESET
    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.world.setBounds(0, 0, 96*32, 72*32)

    map = game.add.tilemap('Level2Map')
    map.addTilesetImage('TileOk', 'tiles')
    layer = map.createLayer('Tile Layer 1')
    // map.setCollision(1)
    map.setCollisionBetween(1,49)

    // PLAYER COMMANDS
    commands = {
      up: game.input.keyboard.addKey(Phaser.Keyboard.W),
      down: game.input.keyboard.addKey(Phaser.Keyboard.S),
      left: game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: game.input.keyboard.addKey(Phaser.Keyboard.D),
      spaceBar: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
      shift: game.input.keyboard.addKey(Phaser.Keyboard.SHIFT),
      controlsUp: game.input.keyboard.addKey(Phaser.Keyboard.UP),
      controlsDown: game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
      controlsLeft: game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
      controlsRight: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
    }

    // PLAYER
    player = new Player(game, commands);
    game.add.existing(player);
    player.spawn(1*32, 69*32);
  }

  update() {

  }
}