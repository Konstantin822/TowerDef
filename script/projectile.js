export class Projectile {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.speed = 5
    }

    update() {
        this.x += this.speed // Двигаем вправо
    }

    draw(ctx) {
        ctx.fillStyle = 'green'
        ctx.fillRect(this.x, this.y, 10, 5)
    }
}