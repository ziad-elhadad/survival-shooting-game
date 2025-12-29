// Base entity class
class Entity {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.velocity = { x: 0, y: 0 };
        this.alive = true;
    }
    
    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
    
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
    
    checkBounds(width, height) {
        if (this.x - this.size < 0) {
            this.x = this.size;
            this.velocity.x = 0;
        }
        if (this.x + this.size > width) {
            this.x = width - this.size;
            this.velocity.x = 0;
        }
        if (this.y - this.size < 0) {
            this.y = this.size;
            this.velocity.y = 0;
        }
        if (this.y + this.size > height) {
            this.y = height - this.size;
            this.velocity.y = 0;
        }
    }
    
    collidesWith(other) {
        const distance = Utils.distance(this.x, this.y, other.x, other.y);
        return distance < this.size + other.size;
    }
}
