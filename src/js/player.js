// Player class
class Player extends Entity {
    constructor(x, y) {
        super(x, y, CONFIG.player.size, CONFIG.player.color);
        this.speed = CONFIG.player.speed;
        this.maxHealth = CONFIG.player.maxHealth;
        this.health = this.maxHealth;
        this.angle = 0;
        this.ammo = CONFIG.weapon.magazineSize;
        this.maxAmmo = CONFIG.weapon.magazineSize;
        this.reloading = false;
        this.lastShotTime = 0;
        this.powerups = {
            speed: 1,
            damage: 1,
            rapidFire: 1
        };
        this.powerupTimers = {};
    }
    
    update(input, canvasWidth, canvasHeight) {
        // Movement
        let moveX = 0;
        let moveY = 0;
        
        if (input.isKeyPressed('w') || input.isKeyPressed('arrowup')) moveY -= 1;
        if (input.isKeyPressed('s') || input.isKeyPressed('arrowdown')) moveY += 1;
        if (input.isKeyPressed('a') || input.isKeyPressed('arrowleft')) moveX -= 1;
        if (input.isKeyPressed('d') || input.isKeyPressed('arrowright')) moveX += 1;
        
        // Normalize diagonal movement
        if (moveX !== 0 || moveY !== 0) {
            const normalized = Utils.normalize(moveX, moveY);
            this.velocity.x = normalized.x * this.speed * this.powerups.speed;
            this.velocity.y = normalized.y * this.speed * this.powerups.speed;
        } else {
            this.velocity.x = 0;
            this.velocity.y = 0;
        }
        
        super.update();
        this.checkBounds(canvasWidth, canvasHeight);
        
        // Aim towards mouse
        const mouse = input.getMousePosition();
        this.angle = Utils.angle(this.x, this.y, mouse.x, mouse.y);
        
        // Reload
        if (input.isKeyPressed('r') && !this.reloading && this.ammo < this.maxAmmo) {
            this.reload();
        }
        

    }
    
    shoot() {
        const currentTime = Date.now();
        const fireRate = CONFIG.weapon.fireRate / this.powerups.rapidFire;
        
        if (this.reloading || this.ammo <= 0 || currentTime - this.lastShotTime < fireRate) {
            return null;
        }
        
        this.lastShotTime = currentTime;
        this.ammo--;
        
        if (this.ammo === 0) {
            this.reload();
        }
        
        // Create projectile
        const projectile = new Projectile(
            this.x + Math.cos(this.angle) * this.size,
            this.y + Math.sin(this.angle) * this.size,
            this.angle,
            CONFIG.projectile.damage * this.powerups.damage
        );
        
        return projectile;
    }
    
    reload() {
        if (this.reloading) return;
        
        this.reloading = true;
        setTimeout(() => {
            this.ammo = this.maxAmmo;
            this.reloading = false;
        }, CONFIG.weapon.reloadTime);
    }
    
    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.health = 0;
            this.alive = false;
        }
    }
    
    heal(amount) {
        this.health = Math.min(this.health + amount, this.maxHealth);
    }
    
    applyPowerup(type, duration = CONFIG.powerup.duration) {
        switch(type) {
            case 'health':
                this.heal(50);
                break;
            case 'speed':
                this.powerups.speed = 1.5;
                this.setPowerupTimer('speed', duration);
                break;
            case 'damage':
                this.powerups.damage = 2;
                this.setPowerupTimer('damage', duration);
                break;
            case 'rapidFire':
                this.powerups.rapidFire = 2;
                this.setPowerupTimer('rapidFire', duration);
                break;
        }
    }
    
    setPowerupTimer(type, duration) {
        if (this.powerupTimers[type]) {
            clearTimeout(this.powerupTimers[type]);
        }
        
        this.powerupTimers[type] = setTimeout(() => {
            this.powerups[type] = 1;
            delete this.powerupTimers[type];
        }, duration);
    }
    

    
    draw(ctx) {
        // Draw player body
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw player outline
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw weapon
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
            this.x + Math.cos(this.angle) * CONFIG.player.weaponLength,
            this.y + Math.sin(this.angle) * CONFIG.player.weaponLength
        );
        ctx.stroke();
        
        // Draw active powerup indicators
        let offset = 0;
        if (this.powerups.speed > 1) {
            this.drawPowerupIndicator(ctx, offset++, '#3498db');
        }
        if (this.powerups.damage > 1) {
            this.drawPowerupIndicator(ctx, offset++, '#e74c3c');
        }
        if (this.powerups.rapidFire > 1) {
            this.drawPowerupIndicator(ctx, offset++, '#9b59b6');
        }
    }
    
    drawPowerupIndicator(ctx, offset, color) {
        const indicatorSize = 5;
        const distance = this.size + 10;
        const angle = (offset * Math.PI * 2 / 3) - Math.PI / 2;
        
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(
            this.x + Math.cos(angle) * distance,
            this.y + Math.sin(angle) * distance,
            indicatorSize,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }
    
    getHealthPercentage() {
        return (this.health / this.maxHealth) * 100;
    }
}
