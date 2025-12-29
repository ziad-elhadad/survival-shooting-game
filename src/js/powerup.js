// PowerUp class
class PowerUp extends Entity {
    constructor(x, y) {
        const types = Object.keys(CONFIG.powerup.types);
        const typeName = Utils.randomChoice(types);
        const type = CONFIG.powerup.types[typeName];
        
        super(x, y, CONFIG.powerup.size, type.color);
        this.type = type.effect;
        this.lifespan = 10000; // 10 seconds before disappearing
        this.createdAt = Date.now();
    }
    
    update() {
        // Check if expired
        if (Date.now() - this.createdAt > this.lifespan) {
            this.alive = false;
        }
        
        // Gentle floating animation
        this.y += Math.sin(Date.now() / 200) * 0.5;
    }
    
    draw(ctx) {
        // Draw pulsing powerup
        const pulse = Math.sin(Date.now() / 100) * 0.3 + 0.7;
        const size = this.size * pulse;
        
        // Outer glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        
        // Draw powerup body
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x - size / 4, this.y - size / 4, size / 3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 0;
        
        // Draw icon based on type
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        let icon = '';
        switch(this.type) {
            case 'health': icon = '+'; break;
            case 'speed': icon = '»'; break;
            case 'damage': icon = '!'; break;
            case 'rapidFire': icon = '⚡'; break;
        }
        
        ctx.fillText(icon, this.x, this.y);
    }
}
