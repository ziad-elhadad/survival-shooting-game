// Main entry point
let game = null;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
    setupEventListeners();
    loadHighScores();
});

function initializeGame() {
    game = new Game();
}

function setupEventListeners() {
    // Menu buttons
    document.getElementById('start-button').addEventListener('click', () => {
        game.showScreen('game-screen');
        game.start();
    });
    
    document.getElementById('instructions-button').addEventListener('click', () => {
        game.showScreen('instructions-screen');
    });
    
    document.getElementById('highscores-button').addEventListener('click', () => {
        displayHighScores();
        game.showScreen('highscores-screen');
    });
    
    // Game buttons
    document.getElementById('pause-button').addEventListener('click', () => {
        game.pause();
        game.showScreen('pause-screen');
    });
    
    // Pause menu buttons
    document.getElementById('resume-button').addEventListener('click', () => {
        game.showScreen('game-screen');
        game.resume();
    });
    
    document.getElementById('restart-button').addEventListener('click', () => {
        game.showScreen('game-screen');
        game.start();
    });
    
    document.getElementById('menu-button').addEventListener('click', () => {
        game.showScreen('menu-screen');
    });
    
    // Game over buttons
    document.getElementById('save-score-button').addEventListener('click', () => {
        const nameInput = document.getElementById('player-name');
        const name = nameInput.value.trim() || 'Anonymous';
        
        saveHighScore({
            name: name,
            score: game.score,
            wave: game.wave,
            date: new Date().toISOString()
        });
        
        nameInput.value = '';
        alert('Score saved!');
    });
    
    document.getElementById('play-again-button').addEventListener('click', () => {
        game.showScreen('game-screen');
        game.start();
    });
    
    document.getElementById('back-menu-button').addEventListener('click', () => {
        game.showScreen('menu-screen');
    });
    
    // Instructions screen
    document.getElementById('back-from-instructions').addEventListener('click', () => {
        game.showScreen('menu-screen');
    });
    
    // High scores screen
    document.getElementById('back-from-scores').addEventListener('click', () => {
        game.showScreen('menu-screen');
    });
}

// High scores management
function loadHighScores() {
    return Utils.storage.load('highscores', []);
}

function saveHighScore(scoreData) {
    let scores = loadHighScores();
    scores.push(scoreData);
    
    // Sort by score (descending)
    scores.sort((a, b) => b.score - a.score);
    
    // Keep only top 10
    scores = scores.slice(0, 10);
    
    Utils.storage.save('highscores', scores);
}

function displayHighScores() {
    const scores = loadHighScores();
    const tbody = document.getElementById('highscores-body');
    tbody.innerHTML = '';
    
    if (scores.length === 0) {
        const row = tbody.insertRow();
        const cell = row.insertCell();
        cell.colSpan = 4;
        cell.textContent = 'No scores yet. Be the first!';
        cell.style.textAlign = 'center';
        cell.style.padding = '20px';
        return;
    }
    
    scores.forEach((score, index) => {
        const row = tbody.insertRow();
        
        const rankCell = row.insertCell();
        rankCell.textContent = index + 1;
        
        const nameCell = row.insertCell();
        nameCell.textContent = score.name;
        
        const scoreCell = row.insertCell();
        scoreCell.textContent = Utils.formatNumber(score.score);
        
        const waveCell = row.insertCell();
        waveCell.textContent = score.wave;
        
        // Highlight top 3
        if (index < 3) {
            row.style.background = 'rgba(254, 202, 87, 0.2)';
        }
    });
}
