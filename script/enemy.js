export class Enemy {
    constructor(path) {
        this.path = path
        this.currentTargetIndex = 0
        this.x = path[0].x
        this.y = path[0].y
        this.speed = 1
    }

    update() {
        if (this.currentTargetIndex < this.path.length) {
            const target = this.path[this.currentTargetIndex]
            const dx = target.x - this.x
            const dy = target.y - this.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < this.speed) {
                this.x = target.x
                this.y = target.y
                this.currentTargetIndex++
            } else {
                this.x += (dx / distance) * this.speed
                this.y += (dy / distance) * this.speed
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = 'red'
        ctx.fillRect(this.x, this.y, 30, 30)
    }
}