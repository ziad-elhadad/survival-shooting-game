// Main game class
class Game {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.input = new InputManager();
        this.collisionManager = new CollisionManager();
        
        this.setupCanvas();
        this.reset();
    }
    
    setupCanvas() {
        this.canvas.width = CONFIG.canvas.width;
        this.canvas.height = CONFIG.canvas.height;
    }
    
    reset() {
        this.player = new Player(this.canvas.width / 2, this.canvas.height / 2);
        this.enemies = [];
        this.projectiles = [];
        this.powerups = [];
        this.particles = [];
        
        this.wave = 1;
        this.score = 0;
        this.gameRunning = false;
        this.paused = false;
        this.waveClearTime = null;
        
        this.collisionManager.reset();
    }
    
    start() {
        this.reset();
        this.gameRunning = true;
        this.spawnWave();
        this.loop();
    }
    
    pause() {
        this.paused = true;
    }
    
    resume() {
        this.paused = false;
        this.loop();
    }
    
    spawnWave() {
        const enemyCount = CONFIG.wave.baseEnemyCount + (this.wave - 1) * CONFIG.wave.enemyIncrement;
        
        for (let i = 0; i < enemyCount; i++) {
            // Spawn enemies around the edges
            let x, y;
            const side = Math.floor(Math.random() * 4);
            
            switch(side) {
                case 0: // Top
                    x = Utils.random(0, this.canvas.width);
                    y = -CONFIG.enemy.spawnDistance;
                    break;
                case 1: // Right
                    x = this.canvas.width + CONFIG.enemy.spawnDistance;
                    y = Utils.random(0, this.canvas.height);
                    break;
                case 2: // Bottom
                    x = Utils.random(0, this.canvas.width);
                    y = this.canvas.height + CONFIG.enemy.spawnDistance;
                    break;
                case 3: // Left
                    x = -CONFIG.enemy.spawnDistance;
                    y = Utils.random(0, this.canvas.height);
                    break;
            }
            
            this.enemies.push(new Enemy(x, y, this.wave));
        }
    }
    
    update() {
        if (!this.gameRunning || this.paused) return;
        
        // Check for pause input
        if (this.input.isKeyPressed('p') || this.input.isKeyPressed('escape')) {
            this.pause();
            return;
        }
        
        // Update player
        this.player.update(this.input, this.canvas.width, this.canvas.height);
        
        // Shooting
        if (this.input.isMousePressed() || this.input.isKeyPressed(' ')) {
            const projectile = this.player.shoot();
            if (projectile) {
                this.projectiles.push(projectile);
                this.collisionManager.trackProjectileFired();
            }
        }
        
        // Update enemies
        for (const enemy of this.enemies) {
            enemy.update(this.player.x, this.player.y);
        }
        
        // Update projectiles
        for (const projectile of this.projectiles) {
            projectile.update(this.canvas.width, this.canvas.height);
        }
        
        // Update powerups
        for (const powerup of this.powerups) {
            powerup.update();
        }
        
        // Collision detection
        const killedEnemies = this.collisionManager.checkProjectileEnemyCollisions(this.projectiles, this.enemies);
        
        for (const enemy of killedEnemies) {
            this.score += CONFIG.score.enemyKill;
            
            // Spawn powerup chance
            if (Math.random() < CONFIG.powerup.spawnChance) {
                this.powerups.push(new PowerUp(enemy.x, enemy.y));
            }
        }
        
        const damageToPlayer = this.collisionManager.checkPlayerEnemyCollisions(this.player, this.enemies);
        if (damageToPlayer > 0) {
            this.player.takeDamage(damageToPlayer);
        }
        
        this.collisionManager.checkPlayerPowerupCollisions(this.player, this.powerups);
        
        // Remove dead entities
        this.enemies = this.enemies.filter(e => e.alive);
        this.projectiles = this.projectiles.filter(p => p.alive);
        this.powerups = this.powerups.filter(p => p.alive);
        
        // Check wave completion
        if (this.enemies.length === 0 && this.waveClearTime === null) {
            this.waveClearTime = Date.now();
            this.score += CONFIG.score.waveComplete;
            
            const accuracy = this.collisionManager.getAccuracy();
            if (accuracy > 75) {
                this.score += CONFIG.score.accuracyBonus;
            }
        }
        
        if (this.waveClearTime && Date.now() - this.waveClearTime > CONFIG.wave.waveClearDelay) {
            this.wave++;
            this.waveClearTime = null;
            this.spawnWave();
        }
        
        // Check game over
        if (!this.player.alive) {
            this.gameOver();
        }
        
        // Update UI
        this.updateUI();
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#0f0f1e';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid (optional background)
        this.drawGrid();
        
        // Draw entities
        for (const powerup of this.powerups) {
            powerup.draw(this.ctx);
        }
        
        for (const projectile of this.projectiles) {
            projectile.draw(this.ctx);
        }
        
        for (const enemy of this.enemies) {
            enemy.draw(this.ctx);
        }
        
        this.player.draw(this.ctx);
        
        // Draw wave clear message
        if (this.waveClearTime) {
            this.drawWaveClearMessage();
        }
        
        // Draw reloading indicator
        if (this.player.reloading) {
            this.drawReloadingIndicator();
        }
    }
    
    drawGrid() {
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        this.ctx.lineWidth = 1;
        
        const gridSize = 50;
        
        for (let x = 0; x < this.canvas.width; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        
        for (let y = 0; y < this.canvas.height; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
    }
    
    drawWaveClearMessage() {
        this.ctx.fillStyle = 'rgba(254, 202, 87, 0.9)';
        this.ctx.font = 'bold 48px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        
        const text = `Wave ${this.wave} Complete!`;
        this.ctx.fillText(text, this.canvas.width / 2, this.canvas.height / 2);
        
        this.ctx.font = '24px Arial';
        this.ctx.fillText('Next wave incoming...', this.canvas.width / 2, this.canvas.height / 2 + 50);
    }
    
    drawReloadingIndicator() {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        this.ctx.font = 'bold 24px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('RELOADING...', this.canvas.width / 2, this.canvas.height - 50);
    }
    
    updateUI() {
        document.getElementById('score').textContent = Utils.formatNumber(this.score);
        document.getElementById('wave').textContent = this.wave;
        document.getElementById('ammo').textContent = this.player.reloading ? 'R' : this.player.ammo;
        
        const healthFill = document.getElementById('health-fill');
        const healthPercentage = this.player.getHealthPercentage();
        healthFill.style.width = healthPercentage + '%';
    }
    
    gameOver() {
        this.gameRunning = false;
        
        document.getElementById('final-score').textContent = Utils.formatNumber(this.score);
        document.getElementById('final-wave').textContent = this.wave;
        
        this.showScreen('gameover-screen');
    }
    
    showScreen(screenId) {
        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => screen.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
    }
    
    loop() {
        if (this.paused) return;
        
        this.update();
        this.draw();
        
        if (this.gameRunning) {
            requestAnimationFrame(() => this.loop());
        }
    }
}
