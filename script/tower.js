import { Projectile } from "./projectile.js"

export class Tower {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.range = 200
    }

    draw(ctx) {
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.x, this.y, 40, 40)

        ctx.beginPath()
        ctx.arc(this.x + 20, this.y + 20, this.range, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(0, 0, 255, 0.3)'
        ctx.stroke()
    }

    findTarget(enemies) {
        return enemies.find(enemy => {
            const dx = enemy.x - this.x
            const dy = enemy.y - this.y
            return Math.sqrt(dx * dx + dy * dy) <= this.range
        })
    }

    shoot(target) {
        return new Projectile(this.x + 20, this.y + 20, target)
    }
}