// CSS Grid Mastery - Sound Effects & Animations System
// Using Web Audio API for satisfying game sounds

class SoundSystem {
    constructor() {
        this.enabled = localStorage.getItem('soundEnabled') !== 'false';
        this.volume = parseFloat(localStorage.getItem('soundVolume') || '0.5');
        this.audioContext = null;
        this.sounds = {};
        this.init();
    }

    init() {
        // Create audio context on first user interaction
        const initAudio = () => {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            document.removeEventListener('click', initAudio);
            document.removeEventListener('keydown', initAudio);
        };
        document.addEventListener('click', initAudio);
        document.addEventListener('keydown', initAudio);
    }

    ensureContext() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        return this.audioContext;
    }

    // Generate synthesized sounds
    playTone(frequency, duration, type = 'sine', gain = 0.3) {
        if (!this.enabled) return;
        
        const ctx = this.ensureContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
        
        gainNode.gain.setValueAtTime(gain * this.volume, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + duration);
    }

    // Success sound - ascending notes
    playSuccess() {
        if (!this.enabled) return;
        
        const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 (major chord)
        notes.forEach((freq, i) => {
            setTimeout(() => {
                this.playTone(freq, 0.15, 'sine', 0.25);
            }, i * 80);
        });
    }

    // Error/wrong sound - descending minor
    playError() {
        if (!this.enabled) return;
        this.playTone(300, 0.2, 'sawtooth', 0.15);
        setTimeout(() => this.playTone(250, 0.3, 'sawtooth', 0.1), 100);
    }

    // Level up fanfare
    playLevelUp() {
        if (!this.enabled) return;
        
        const fanfare = [
            { freq: 523.25, delay: 0 },    // C5
            { freq: 659.25, delay: 100 },  // E5
            { freq: 783.99, delay: 200 },  // G5
            { freq: 1046.50, delay: 300 }, // C6
            { freq: 783.99, delay: 450 },  // G5
            { freq: 1046.50, delay: 550 }, // C6 (final)
        ];
        
        fanfare.forEach(note => {
            setTimeout(() => {
                this.playTone(note.freq, 0.25, 'triangle', 0.3);
            }, note.delay);
        });
    }

    // Achievement unlock - magical sparkle
    playAchievement() {
        if (!this.enabled) return;
        
        const sparkle = [392, 523.25, 659.25, 783.99, 1046.50];
        sparkle.forEach((freq, i) => {
            setTimeout(() => {
                this.playTone(freq, 0.12, 'sine', 0.2);
            }, i * 60);
        });
    }

    // Click/tap sound
    playClick() {
        if (!this.enabled) return;
        this.playTone(800, 0.05, 'sine', 0.15);
    }

    // Typing sound
    playType() {
        if (!this.enabled) return;
        const freq = 300 + Math.random() * 100;
        this.playTone(freq, 0.03, 'square', 0.05);
    }

    // Timer tick
    playTick() {
        if (!this.enabled) return;
        this.playTone(1000, 0.02, 'sine', 0.1);
    }

    // Timer warning (last 10 seconds)
    playWarning() {
        if (!this.enabled) return;
        this.playTone(440, 0.1, 'sine', 0.2);
    }

    // Countdown beep
    playCountdown() {
        if (!this.enabled) return;
        this.playTone(880, 0.15, 'sine', 0.25);
    }

    // Game start
    playStart() {
        if (!this.enabled) return;
        this.playTone(440, 0.1, 'sine', 0.3);
        setTimeout(() => this.playTone(660, 0.15, 'sine', 0.3), 150);
    }

    // Combo sound (for streaks)
    playCombo(multiplier = 1) {
        if (!this.enabled) return;
        const baseFreq = 400 + (multiplier * 100);
        this.playTone(baseFreq, 0.1, 'triangle', 0.25);
    }

    // XP gain sound
    playXPGain() {
        if (!this.enabled) return;
        this.playTone(600, 0.08, 'sine', 0.2);
        setTimeout(() => this.playTone(800, 0.08, 'sine', 0.2), 50);
    }

    // Daily challenge complete
    playDailyComplete() {
        if (!this.enabled) return;
        const melody = [523.25, 587.33, 659.25, 783.99, 659.25, 783.99, 1046.50];
        melody.forEach((freq, i) => {
            setTimeout(() => {
                this.playTone(freq, 0.15, 'sine', 0.25);
            }, i * 100);
        });
    }

    // Toggle sound on/off
    toggle() {
        this.enabled = !this.enabled;
        localStorage.setItem('soundEnabled', this.enabled);
        if (this.enabled) {
            this.playClick();
        }
        return this.enabled;
    }

    setVolume(vol) {
        this.volume = Math.max(0, Math.min(1, vol));
        localStorage.setItem('soundVolume', this.volume);
    }
}

// ============== PARTICLE SYSTEM ==============
class ParticleSystem {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.animating = false;
    }

    init() {
        if (this.canvas) return;
        
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'particle-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    // Create particles at position
    emit(x, y, options = {}) {
        this.init();
        
        const count = options.count || 20;
        const colors = options.colors || ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];
        const spread = options.spread || 360;
        const speed = options.speed || 5;
        const size = options.size || 6;
        const gravity = options.gravity || 0.15;
        const life = options.life || 60;

        for (let i = 0; i < count; i++) {
            const angle = (spread === 360) 
                ? Math.random() * Math.PI * 2 
                : ((Math.random() - 0.5) * spread * Math.PI / 180) - Math.PI / 2;
            
            const velocity = speed * (0.5 + Math.random() * 0.5);
            
            this.particles.push({
                x, y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                size: size * (0.5 + Math.random() * 0.5),
                color: colors[Math.floor(Math.random() * colors.length)],
                life: life,
                maxLife: life,
                gravity,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.2,
                shape: options.shape || 'circle'
            });
        }

        if (!this.animating) {
            this.animating = true;
            this.animate();
        }
    }

    // Celebration burst (for achievements, level ups)
    celebrate(x = window.innerWidth / 2, y = window.innerHeight / 2) {
        this.emit(x, y, {
            count: 50,
            colors: ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'],
            spread: 360,
            speed: 8,
            size: 8,
            life: 80
        });
    }

    // Star burst for perfect scores
    starBurst(x, y) {
        this.emit(x, y, {
            count: 30,
            colors: ['#ffd700', '#ffed4e', '#fff'],
            spread: 360,
            speed: 6,
            size: 10,
            life: 60,
            shape: 'star'
        });
    }

    // XP gain particles
    xpParticles(x, y) {
        this.emit(x, y, {
            count: 10,
            colors: ['#6366f1', '#8b5cf6'],
            spread: 120,
            speed: 3,
            size: 4,
            gravity: -0.05, // Float up
            life: 40
        });
    }

    // Error shake particles
    errorParticles(x, y) {
        this.emit(x, y, {
            count: 15,
            colors: ['#ef4444', '#f87171', '#fca5a5'],
            spread: 360,
            speed: 4,
            size: 5,
            life: 30
        });
    }

    animate() {
        if (!this.ctx || this.particles.length === 0) {
            this.animating = false;
            if (this.ctx) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            }
            return;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.life--;
            p.rotation += p.rotationSpeed;

            const alpha = p.life / p.maxLife;
            
            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rotation);
            this.ctx.globalAlpha = alpha;
            this.ctx.fillStyle = p.color;

            if (p.shape === 'star') {
                this.drawStar(0, 0, p.size, 5);
            } else if (p.shape === 'square') {
                this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            } else {
                this.ctx.beginPath();
                this.ctx.arc(0, 0, p.size, 0, Math.PI * 2);
                this.ctx.fill();
            }

            this.ctx.restore();

            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }

        requestAnimationFrame(() => this.animate());
    }

    drawStar(cx, cy, size, points) {
        const outer = size;
        const inner = size / 2;
        
        this.ctx.beginPath();
        for (let i = 0; i < points * 2; i++) {
            const radius = i % 2 === 0 ? outer : inner;
            const angle = (i * Math.PI) / points - Math.PI / 2;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;
            
            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        this.ctx.closePath();
        this.ctx.fill();
    }
}

// ============== ANIMATION UTILITIES ==============
const Animations = {
    // Shake element
    shake(element, intensity = 5) {
        element.style.animation = 'none';
        element.offsetHeight; // Trigger reflow
        element.style.animation = `shake ${0.4}s ease-out`;
    },

    // Bounce element
    bounce(element) {
        element.style.animation = 'none';
        element.offsetHeight;
        element.style.animation = 'bounce 0.5s ease-out';
    },

    // Pulse element
    pulse(element) {
        element.style.animation = 'none';
        element.offsetHeight;
        element.style.animation = 'pulse 0.3s ease-out';
    },

    // Pop in
    popIn(element) {
        element.style.animation = 'none';
        element.offsetHeight;
        element.style.animation = 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    },

    // Slide in from direction
    slideIn(element, direction = 'up') {
        element.style.animation = 'none';
        element.offsetHeight;
        element.style.animation = `slideIn${direction.charAt(0).toUpperCase() + direction.slice(1)} 0.4s ease-out`;
    },

    // Glow effect
    glow(element, color = '#6366f1') {
        element.style.boxShadow = `0 0 0 0 ${color}`;
        element.style.animation = 'glow 0.6s ease-out';
    },

    // Number count up
    countUp(element, target, duration = 1000) {
        const start = parseInt(element.textContent) || 0;
        const startTime = performance.now();
        
        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * eased);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };
        
        requestAnimationFrame(update);
    },

    // XP bar fill animation
    fillBar(element, percentage) {
        element.style.transition = 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        element.style.width = `${percentage}%`;
    },

    // Typewriter effect
    typewriter(element, text, speed = 30) {
        let i = 0;
        element.textContent = '';
        
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        
        type();
    },

    // Floating text (for XP gains)
    floatingText(text, x, y, options = {}) {
        const el = document.createElement('div');
        el.className = 'floating-text';
        el.textContent = text;
        el.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            color: ${options.color || '#6366f1'};
            font-weight: bold;
            font-size: ${options.size || '1.2rem'};
            pointer-events: none;
            z-index: 10000;
            animation: floatUp 1s ease-out forwards;
        `;
        document.body.appendChild(el);
        
        setTimeout(() => el.remove(), 1000);
    }
};

// ============== CSS FOR ANIMATIONS ==============
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-5px); }
        40% { transform: translateX(5px); }
        60% { transform: translateX(-5px); }
        80% { transform: translateX(5px); }
    }

    @keyframes bounce {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }

    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }

    @keyframes popIn {
        0% { transform: scale(0); opacity: 0; }
        80% { transform: scale(1.1); }
        100% { transform: scale(1); opacity: 1; }
    }

    @keyframes slideInUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }

    @keyframes slideInDown {
        from { transform: translateY(-20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }

    @keyframes slideInLeft {
        from { transform: translateX(-20px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideInRight {
        from { transform: translateX(20px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes glow {
        0% { box-shadow: 0 0 5px currentColor; }
        50% { box-shadow: 0 0 20px currentColor, 0 0 30px currentColor; }
        100% { box-shadow: 0 0 5px currentColor; }
    }

    @keyframes floatUp {
        0% { 
            opacity: 1; 
            transform: translateY(0) scale(1);
        }
        100% { 
            opacity: 0; 
            transform: translateY(-50px) scale(1.2);
        }
    }

    @keyframes ripple {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(4); opacity: 0; }
    }

    @keyframes shimmer {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
    }

    .shimmer {
        background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,255,255,0.4) 50%,
            transparent 100%
        );
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
    }

    .ripple-effect {
        position: relative;
        overflow: hidden;
    }

    .ripple-effect::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
        transform: scale(0);
        opacity: 0;
    }

    .ripple-effect.rippling::after {
        animation: ripple 0.6s ease-out;
    }

    /* Screen shake for errors */
    .screen-shake {
        animation: screenShake 0.3s ease-out;
    }

    @keyframes screenShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-4px) rotate(-0.5deg); }
        50% { transform: translateX(4px) rotate(0.5deg); }
        75% { transform: translateX(-4px) rotate(-0.5deg); }
    }

    /* Success flash */
    .success-flash {
        animation: successFlash 0.5s ease-out;
    }

    @keyframes successFlash {
        0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
        50% { box-shadow: 0 0 20px 10px rgba(34, 197, 94, 0.3); }
        100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
    }

    /* Combo indicator */
    .combo-indicator {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 3rem;
        font-weight: bold;
        color: #ffd700;
        text-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
        animation: comboPopIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        pointer-events: none;
        z-index: 10000;
    }

    @keyframes comboPopIn {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
        60% { transform: translate(-50%, -50%) scale(1.3); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
    }
`;
document.head.appendChild(animationStyles);

// ============== GLOBAL INSTANCES ==============
const sounds = new SoundSystem();
const particles = new ParticleSystem();

// Export for use in other modules
window.sounds = sounds;
window.particles = particles;
window.Animations = Animations;

console.log('🔊 Sound & Animation system loaded!');
