import { Tower } from './tower.js'
import { Enemy } from './enemy.js'
import { Projectile } from './projectile.js'

export class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas
        this.ctx = ctx
        this.towers = []
        this.enemies = []
        this.projectiles = []
        this.init()
    }

    init() {
        this.towers.push(new Tower(100, 100))
        this.enemies.push(new Enemy(700, 100))
    }

    start() {
        setInterval(() => {
            this.towers.forEach(tower => {
                this.projectiles.push(tower.shoot())
            })
        }, 1000) // Башня стреляет раз в секунду
        this.update()
    }

    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.towers.forEach(tower => tower.draw(this.ctx))
        this.enemies.forEach(enemy => {
            enemy.update()
            enemy.draw(this.ctx)
        })
        this.projectiles.forEach((projectile, pIndex) => {
            projectile.update()
            projectile.draw(this.ctx)

            if (projectile.x > this.canvas.width) {
                this.projectiles.slice(pIndex, 1)
            }

            this.enemies.forEach((enemy, eIndex) => {
                if (this.checkCollision(projectile, enemy)) {
                    this.projectiles.splice(pIndex, 1)
                    this.enemies.splice(eIndex, 1)
                }
            })
        })
        requestAnimationFrame(() => this.update())
    }

    checkCollision(projectile, enemy) {
        return (
            projectile.x < enemy.x + 30 &&
            projectile.x + 10 > enemy.x &&
            projectile.y < enemy.y + 30 &&
            projectile.y + 5 > enemy.y
        )
    }
}