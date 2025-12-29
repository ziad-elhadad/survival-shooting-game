# Documentation

## Game Architecture

### Core Components

1. **Game Loop**: Handles update and render cycles
2. **Input System**: Manages keyboard and mouse input
3. **Entity System**: Base class for all game objects
4. **Collision Detection**: Handles all collision logic
5. **UI Management**: Manages screens and HUD

### Class Hierarchy

```
Entity (base class)
├── Player
├── Enemy
├── Projectile
└── PowerUp
```

### Game Flow

1. **Menu Screen**: Player starts here
2. **Game Screen**: Main gameplay
3. **Pause Screen**: Game paused
4. **Game Over Screen**: When player dies

### Adding New Features

#### Adding a New Enemy Type

1. Extend the `Enemy` class in `enemy.js`
2. Add configuration in `config.js`
3. Update spawn logic in `game.js`

#### Adding a New Power-up

1. Add power-up type in `config.js`
2. Update `PowerUp` class in `powerup.js`
3. Add effect logic in `player.js`

#### Adding Sound Effects

1. Add audio files to `assets/sounds/`
2. Create an audio manager in `src/js/audio.js`
3. Integrate with game events

## Performance Tips

- Limit particle effects for better performance
- Use object pooling for frequently created objects
- Optimize collision detection with spatial partitioning
- Consider using requestAnimationFrame for smooth animation

## Browser Compatibility

The game is tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
