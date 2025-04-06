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
        this.strongEnemiesStarted = false
        this.init()
        this.addEventListeners()
    }

    init() {
        this.towers.push(new Tower(100, 100))
        this.enemies.push(new Enemy([{ x: 700, y: 300 }, { x: 500, y: 300 }, { x: 500, y: 500 }, { x: 300, y: 500 }]))
    }

    spawnEnemy(isStrong = false) {
        const enemy = new Enemy([
            { x: 700, y: 300 },
            { x: 500, y: 300 },
            { x: 500, y: 500 },
            { x: 300, y: 300 }
        ], isStrong)
        this.enemies.push(enemy)
    }

    start() {
        setInterval(() => {
            this.towers.forEach(tower => {
                const target = tower.findTarget(this.enemies)
                if (target) {
                    this.projectiles.push(tower.shoot(target))
                }
            })
        }, 1000) // Башня стреляет раз в секунду

        // Спаун врагов
        setInterval(() => {
            this.spawnEnemy()
        }, 3000)

        // Спавн сильных врагов
        setTimeout(() => {
            this.strongEnemiesStarted = true
            setInterval(() => {
                this.spawnEnemy(true)
            }, 5000) // Спавн каждые 5 сек
        }, 5000) // Спавн через 5 сек после начала игры

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
            if (!projectile.target || projectile.target.hp <= 0) {
                this.projectiles.splice(pIndex, 1);
                return;
            }
            projectile.update()
            projectile.draw(this.ctx)

            if (projectile.x > this.canvas.width) {
                this.projectiles.splice(pIndex, 1)
            }

            this.enemies.forEach((enemy, eIndex) => {
                if (this.checkCollision(projectile, enemy)) {
                    this.projectiles.splice(pIndex, 1)
                    enemy.hp--
                    if (enemy.hp <= 0) {
                        this.enemies.splice(eIndex, 1)
                    }
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

    addEventListeners() {
        this.canvas.addEventListener('click', (event) => {
            const rect = this.canvas.getBoundingClientRect()
            const x = event.clientX - rect.left
            const y = event.clientY - rect.top

            const isOccupied = this.towers.some(tower =>
                Math.abs(tower.x - (x - 20)) < 40 && Math.abs(tower.y - (y - 20)) < 40
            );

            if (!isOccupied) {
                this.towers.push(new Tower(x - 20, y - 20))
            }
        })
    }
}