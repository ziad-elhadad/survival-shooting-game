// Game configuration
const CONFIG = {
    // Canvas settings
    canvas: {
        width: 1200,
        height: 800
    },
    
    // Player settings
    player: {
        size: 30,
        speed: 5,
        maxHealth: 100,
        color: '#4facfe',
        weaponLength: 40
    },
    
    // Enemy settings
    enemy: {
        baseSize: 25,
        baseSpeed: 2,
        baseHealth: 50,
        spawnDistance: 100,
        colors: ['#ee5a6f', '#f29263', '#ff6b6b']
    },
    
    // Projectile settings
    projectile: {
        size: 5,
        speed: 10,
        damage: 25,
        color: '#feca57'
    },
    
    // Weapon settings
    weapon: {
        fireRate: 200, // milliseconds between shots
        magazineSize: 30,
        reloadTime: 2000 // milliseconds
    },
    
    // Power-up settings
    powerup: {
        size: 20,
        spawnChance: 0.15, // 15% chance on enemy death
        duration: 10000, // 10 seconds
        types: {
            HEALTH: { color: '#2ecc71', effect: 'health' },
            SPEED: { color: '#3498db', effect: 'speed' },
            DAMAGE: { color: '#e74c3c', effect: 'damage' },
            RAPID_FIRE: { color: '#9b59b6', effect: 'rapidFire' }
        }
    },
    
    // Wave settings
    wave: {
        baseEnemyCount: 5,
        enemyIncrement: 3,
        difficultyMultiplier: 1.15,
        waveClearDelay: 3000 // milliseconds
    },
    
    // Scoring
    score: {
        enemyKill: 100,
        waveComplete: 500,
        accuracyBonus: 50
    }
};
