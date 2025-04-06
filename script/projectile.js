export class Projectile {
    constructor(x, y, target) {
        this.x = x
        this.y = y
        this.target = target
        this.speed = 2
    }

    update() {
        if (this.target) {
            const dx = this.target.x - this.x
            const dy = this.target.y - this.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < this.speed) {
                this.x = this.target.x
                this.y = this.target.y
            } else {
                this.x += (dx / distance) * this.speed
                this.y += (dy / distance) * this.speed
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = 'green'
        ctx.fillRect(this.x, this.y, 10, 5)
    }
}