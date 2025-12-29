# Survival Shooting Game

A fast-paced, browser-based survival shooting game built with HTML5 Canvas and vanilla JavaScript. Fight through endless waves of enemies, collect power-ups, and try to survive as long as possible!

## 🎮 Features

- **Wave-based Gameplay**: Face increasingly difficult waves of enemies
- **Power-ups System**: Collect power-ups to enhance your abilities
  - Health restoration
  - Speed boost
  - Damage multiplier
  - Rapid fire
- **Dynamic Difficulty**: Enemy health, speed, and damage scale with each wave
- **Scoring System**: Track your score and compete for high scores
- **Smooth Controls**: WASD/Arrow keys for movement, mouse for aiming
- **Visual Effects**: Glowing projectiles, health bars, and particle effects
- **Local High Scores**: Your best scores are saved locally

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js (optional, for running local server)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ziad-elhadad/survival-shooting-game.git
cd survival-shooting-game
```

2. Install dependencies (optional):
```bash
npm install
```

3. Start the game:

**Option 1: Using npm (recommended)**
```bash
npm start
```

**Option 2: Direct browser access**
Simply open `index.html` in your web browser.

**Option 3: Using Python**
```bash
# Python 3
python -m http.server 8080

# Then open http://localhost:8080 in your browser
```

## 🎯 How to Play

### Controls

- **WASD** or **Arrow Keys**: Move your character
- **Mouse**: Aim your weapon
- **Left Click** or **Space**: Shoot
- **R**: Reload your weapon
- **P** or **ESC**: Pause the game

### Objective

Survive as many waves as possible by shooting down enemies before they reach you. Each wave increases in difficulty with more enemies, higher health, and increased damage. Collect power-ups dropped by enemies to give yourself an edge.

### Tips

- Keep moving to avoid enemy swarms
- Reload during safe moments
- Prioritize collecting health power-ups when low on HP
- Use the wave clear delay to reposition yourself
- Maintain good accuracy for bonus points

## 📁 Project Structure

```
survival-shooting-game/
├── index.html              # Main HTML file
├── src/
│   ├── css/
│   │   └── style.css      # Game styling
│   └── js/
│       ├── config.js      # Game configuration
│       ├── utils.js       # Utility functions
│       ├── input.js       # Input handling
│       ├── entities.js    # Base entity class
│       ├── player.js      # Player class
│       ├── enemy.js       # Enemy class
│       ├── projectile.js  # Projectile class
│       ├── powerup.js     # Power-up class
│       ├── collision.js   # Collision detection
│       ├── game.js        # Main game logic
│       └── main.js        # Entry point
├── assets/                # Game assets (images, sounds)
│   ├── images/
│   ├── sounds/
│   └── sprites/
├── docs/                  # Documentation
├── package.json           # Project dependencies
└── README.md             # This file
```

## 🎨 Customization

You can easily customize the game by editing `src/js/config.js`:

- Player speed, health, and size
- Enemy attributes and spawn rates
- Weapon fire rate and damage
- Power-up effects and spawn chances
- Wave difficulty scaling
- Scoring system

## 🛠️ Technologies Used

- **HTML5 Canvas**: For rendering game graphics
- **Vanilla JavaScript**: Game logic and mechanics
- **CSS3**: Styling and UI design
- **LocalStorage API**: Saving high scores

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🎯 Future Enhancements

- [ ] Sound effects and background music
- [ ] Multiple weapon types
- [ ] Boss battles every N waves
- [ ] Multiplayer support
- [ ] Mobile touch controls
- [ ] Achievement system
- [ ] Different enemy types with unique behaviors
- [ ] Procedurally generated maps

## 👤 Author

Created with ❤️ by the Survival Shooting Game Team

## 🙏 Acknowledgments

- Inspired by classic survival shooter games
- Built as a learning project for HTML5 Canvas game development

---

**Enjoy the game and good luck surviving!** 🎮🔫