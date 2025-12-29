// Utility functions
const Utils = {
    // Get random number between min and max
    random(min, max) {
        return Math.random() * (max - min) + min;
    },
    
    // Get random integer between min and max (inclusive)
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    // Calculate distance between two points
    distance(x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    },
    
    // Calculate angle between two points
    angle(x1, y1, x2, y2) {
        return Math.atan2(y2 - y1, x2 - x1);
    },
    
    // Normalize a vector
    normalize(x, y) {
        const length = Math.sqrt(x * x + y * y);
        if (length === 0) return { x: 0, y: 0 };
        return { x: x / length, y: y / length };
    },
    
    // Check if point is inside circle
    pointInCircle(px, py, cx, cy, radius) {
        return this.distance(px, py, cx, cy) < radius;
    },
    
    // Clamp value between min and max
    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    },
    
    // Get random item from array
    randomChoice(array) {
        return array[Math.floor(Math.random() * array.length)];
    },
    
    // Format number with commas
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    
    // Local storage helpers
    storage: {
        save(key, data) {
            try {
                localStorage.setItem(key, JSON.stringify(data));
                return true;
            } catch (e) {
                console.error('Failed to save to localStorage:', e);
                return false;
            }
        },
        
        load(key, defaultValue = null) {
            try {
                const data = localStorage.getItem(key);
                return data ? JSON.parse(data) : defaultValue;
            } catch (e) {
                console.error('Failed to load from localStorage:', e);
                return defaultValue;
            }
        }
    }
};
