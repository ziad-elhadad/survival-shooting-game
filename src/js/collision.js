// Collision detection
class CollisionManager {
    constructor() {
        this.projectileHits = 0;
        this.projectilesFired = 0;
    }
    
    checkProjectileEnemyCollisions(projectiles, enemies) {
        const killed = [];
        
        for (let i = projectiles.length - 1; i >= 0; i--) {
            const projectile = projectiles[i];
            
            for (let j = enemies.length - 1; j >= 0; j--) {
                const enemy = enemies[j];
                
                if (projectile.collidesWith(enemy)) {
                    enemy.takeDamage(projectile.damage);
                    projectile.alive = false;
                    this.projectileHits++;
                    
                    if (!enemy.alive) {
                        killed.push(enemy);
                    }
                    break;
                }
            }
        }
        
        return killed;
    }
    
    checkPlayerEnemyCollisions(player, enemies) {
        let totalDamage = 0;
        
        for (const enemy of enemies) {
            if (player.collidesWith(enemy) && enemy.canDamagePlayer()) {
                totalDamage += enemy.damage;
            }
        }
        
        return totalDamage;
    }
    
    checkPlayerPowerupCollisions(player, powerups) {
        const collected = [];
        
        for (let i = powerups.length - 1; i >= 0; i--) {
            const powerup = powerups[i];
            
            if (player.collidesWith(powerup)) {
                player.applyPowerup(powerup.type);
                powerup.alive = false;
                collected.push(powerup);
            }
        }
        
        return collected;
    }
    
    trackProjectileFired() {
        this.projectilesFired++;
    }
    
    getAccuracy() {
        if (this.projectilesFired === 0) return 0;
        return (this.projectileHits / this.projectilesFired) * 100;
    }
    
    reset() {
        this.projectileHits = 0;
        this.projectilesFired = 0;
    }
}
