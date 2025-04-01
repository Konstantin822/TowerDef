export class Enemy {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.speed = 1
    }

    update() {
        this.x -= this.speed // Двигаем влево
    }

    draw(ctx) {
        ctx.fillStyle = 'red'
        ctx.fillRect(this.x, this.y, 30, 30)
    }
}