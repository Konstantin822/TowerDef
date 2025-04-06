export class Enemy {
    constructor(path, isStrong = false) {
        this.path = path
        this.currentTargetIndex = 0
        this.x = path[0].x
        this.y = path[0].y
        this.speed = isStrong ? 0.5 : 1
        this.hp = isStrong ? 4 : 2
        this.color = isStrong ? 'purple' : 'red'
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

        ctx.fillStyle = 'white'
        ctx.font = '12px Arial'
        ctx.fillText(this.hp, this.x + 10, this.y + 20)
    }
}