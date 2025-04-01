import { Projectile } from "./projectile.js"

export class Tower {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    draw(ctx) {
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.x, this.y, 40, 40)
    }

    shoot() {
        return new Projectile(this.x + 40, this.y + 20)
    }
}