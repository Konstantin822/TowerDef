import { Tower } from './tower.js'
import { Enemy } from './enemy.js'

export class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas
        this.ctx = ctx
        this.towers = []
        this.enemies = []
        this.init()
    }

    init() {
        this.towers.push(new Tower(100, 100))
        this.enemies.push(new Enemy(700, 300))
    }

    start() {
        this.update()
    }

    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.towers.forEach(tower => tower.draw(this.ctx))
        this.enemies.forEach(enemy => enemy.draw(this.ctx))
        requestAnimationFrame(() => this.update())
    }
}