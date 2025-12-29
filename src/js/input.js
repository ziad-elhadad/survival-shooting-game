// Input manager
class InputManager {
    constructor() {
        this.keys = {};
        this.mouse = {
            x: 0,
            y: 0,
            clicked: false,
            pressed: false
        };
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Keyboard events
        window.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
            
            // Prevent default for game keys
            if (['w', 'a', 's', 'd', ' ', 'r', 'p', 'escape'].includes(e.key.toLowerCase())) {
                e.preventDefault();
            }
        });
        
        window.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });
        
        // Mouse events on canvas
        const canvas = document.getElementById('game-canvas');
        
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            
            this.mouse.x = (e.clientX - rect.left) * scaleX;
            this.mouse.y = (e.clientY - rect.top) * scaleY;
        });
        
        canvas.addEventListener('mousedown', (e) => {
            if (e.button === 0) { // Left click
                this.mouse.clicked = true;
                this.mouse.pressed = true;
            }
        });
        
        canvas.addEventListener('mouseup', (e) => {
            if (e.button === 0) {
                this.mouse.pressed = false;
            }
        });
        
        canvas.addEventListener('mouseleave', () => {
            this.mouse.pressed = false;
        });
    }
    
    isKeyPressed(key) {
        return this.keys[key.toLowerCase()] || false;
    }
    
    isMouseClicked() {
        if (this.mouse.clicked) {
            this.mouse.clicked = false;
            return true;
        }
        return false;
    }
    
    isMousePressed() {
        return this.mouse.pressed;
    }
    
    getMousePosition() {
        return { x: this.mouse.x, y: this.mouse.y };
    }
    
    reset() {
        this.keys = {};
        this.mouse.clicked = false;
        this.mouse.pressed = false;
    }
}
