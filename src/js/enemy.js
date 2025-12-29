// Enemy class
class Enemy extends Entity {
    constructor(x, y, wave) {
        const size = CONFIG.enemy.baseSize;
        const color = Utils.randomChoice(CONFIG.enemy.colors);
        super(x, y, size, color);
        
        this.wave = wave;
        this.speed = CONFIG.enemy.baseSpeed * Math.pow(CONFIG.wave.difficultyMultiplier, wave - 1);
        this.maxHealth = CONFIG.enemy.baseHealth * Math.pow(CONFIG.wave.difficultyMultiplier, wave - 1);
        this.health = this.maxHealth;
        this.damage = 10 * Math.pow(1.1, wave - 1);
        this.lastDamageTime = 0;
        this.damageInterval = 1000; // Damage player once per second on contact
    }
    
    update(targetX, targetY) {
        // Move towards target (player)
        const angle = Utils.angle(this.x, this.y, targetX, targetY);
        this.velocity.x = Math.cos(angle) * this.speed;
        this.velocity.y = Math.sin(angle) * this.speed;
        
        super.update();
    }
    
    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.alive = false;
        }
    }
    
    canDamagePlayer() {
        const currentTime = Date.now();
        if (currentTime - this.lastDamageTime >= this.damageInterval) {
            this.lastDamageTime = currentTime;
            return true;
        }
        return false;
    }
    
    draw(ctx) {
        // Draw enemy body
        super.draw(ctx);
        
        // Draw health bar
        const barWidth = this.size * 2;
        const barHeight = 4;
        const barX = this.x - barWidth / 2;
        const barY = this.y - this.size - 10;
        
        // Background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(barX, barY, barWidth, barHeight);
        
        // Health
        const healthPercentage = this.health / this.maxHealth;
        ctx.fillStyle = healthPercentage > 0.5 ? '#2ecc71' : healthPercentage > 0.25 ? '#f39c12' : '#e74c3c';
        ctx.fillRect(barX, barY, barWidth * healthPercentage, barHeight);
        
        // Border
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.strokeRect(barX, barY, barWidth, barHeight);
    }
}
