// Projectile class
class Projectile extends Entity {
    constructor(x, y, angle, damage) {
        super(x, y, CONFIG.projectile.size, CONFIG.projectile.color);
        this.angle = angle;
        this.damage = damage;
        this.velocity.x = Math.cos(angle) * CONFIG.projectile.speed;
        this.velocity.y = Math.sin(angle) * CONFIG.projectile.speed;
    }
    
    update(canvasWidth, canvasHeight) {
        super.update();
        
        // Remove if out of bounds
        if (this.x < 0 || this.x > canvasWidth || this.y < 0 || this.y > canvasHeight) {
            this.alive = false;
        }
    }
    
    draw(ctx) {
        // Draw projectile with glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        super.draw(ctx);
        ctx.shadowBlur = 0;
    }
}
