import { Projectile } from "./projectile.js"

export class Tower {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.range = 100
    }

    draw(ctx) {
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.x, this.y, 40, 40)

        ctx.beginPath()
        ctx.arc(this.x + 20, this.y + 20, this.range, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(0, 0, 255, 0.3)'
        ctx.stroke()
    }

    shoot() {
        return new Projectile(this.x + 40, this.y + 20)
    }
}