// CSS Grid Mastery - Theme Customization System
// Multiple color themes and custom accent colors

const THEMES = {
    dark: {
        name: 'Dark',
        icon: '🌙',
        colors: {
            bg: '#0f0f0f',
            bgCard: '#1a1a1a',
            bgCode: '#252525',
            bgHover: '#2a2a2a',
            text: '#ffffff',
            textSecondary: '#a0a0a0',
            border: '#2a2a2a',
            accent: '#6366f1'
        }
    },
    light: {
        name: 'Light',
        icon: '☀️',
        colors: {
            bg: '#f5f5f5',
            bgCard: '#ffffff',
            bgCode: '#f0f0f0',
            bgHover: '#e5e5e5',
            text: '#1a1a1a',
            textSecondary: '#666666',
            border: '#e0e0e0',
            accent: '#6366f1'
        }
    },
    midnight: {
        name: 'Midnight',
        icon: '🌃',
        colors: {
            bg: '#0f172a',
            bgCard: '#1e293b',
            bgCode: '#0f172a',
            bgHover: '#334155',
            text: '#f8fafc',
            textSecondary: '#94a3b8',
            border: '#334155',
            accent: '#6366f1'
        }
    },
    forest: {
        name: 'Forest',
        icon: '🌲',
        colors: {
            bg: '#0a0f0a',
            bgCard: '#1a251a',
            bgCode: '#0f170f',
            bgHover: '#253025',
            text: '#e8f5e8',
            textSecondary: '#8fbc8f',
            border: '#2d3e2d',
            accent: '#22c55e'
        }
    },
    ocean: {
        name: 'Ocean',
        icon: '🌊',
        colors: {
            bg: '#0a1628',
            bgCard: '#132742',
            bgCode: '#0d1e36',
            bgHover: '#1e3a5f',
            text: '#e0f2fe',
            textSecondary: '#7dd3fc',
            border: '#1e3a5f',
            accent: '#0ea5e9'
        }
    },
    sunset: {
        name: 'Sunset',
        icon: '🌅',
        colors: {
            bg: '#1a0a1a',
            bgCard: '#2d1a2d',
            bgCode: '#1f0f1f',
            bgHover: '#3d2a3d',
            text: '#fce7f3',
            textSecondary: '#f9a8d4',
            border: '#4a2a4a',
            accent: '#ec4899'
        }
    },
    coffee: {
        name: 'Coffee',
        icon: '☕',
        colors: {
            bg: '#1c1410',
            bgCard: '#2a201a',
            bgCode: '#1f1812',
            bgHover: '#3a2e26',
            text: '#f5ebe0',
            textSecondary: '#c4a77d',
            border: '#3a2e26',
            accent: '#d97706'
        }
    },
    synthwave: {
        name: 'Synthwave',
        icon: '🎵',
        colors: {
            bg: '#0f0024',
            bgCard: '#1a0033',
            bgCode: '#12002a',
            bgHover: '#2a0055',
            text: '#ff00ff',
            textSecondary: '#00ffff',
            border: '#330066',
            accent: '#ff00ff'
        }
    }
};

const ACCENT_COLORS = [
    { name: 'Indigo', color: '#6366f1' },
    { name: 'Purple', color: '#8b5cf6' },
    { name: 'Pink', color: '#ec4899' },
    { name: 'Red', color: '#ef4444' },
    { name: 'Orange', color: '#f97316' },
    { name: 'Yellow', color: '#eab308' },
    { name: 'Green', color: '#22c55e' },
    { name: 'Teal', color: '#14b8a6' },
    { name: 'Cyan', color: '#06b6d4' },
    { name: 'Blue', color: '#3b82f6' }
];

class ThemeSystem {
    constructor() {
        this.currentTheme = localStorage.getItem('gridMasteryTheme') || 'dark';
        this.customAccent = localStorage.getItem('gridMasteryAccent') || '#6366f1';
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.applyAccent(this.customAccent);
    }

    applyTheme(themeId) {
        const theme = THEMES[themeId];
        if (!theme) return;

        this.currentTheme = themeId;
        localStorage.setItem('gridMasteryTheme', themeId);

        const root = document.documentElement;
        
        // Apply colors
        root.style.setProperty('--bg-dark', theme.colors.bg);
        root.style.setProperty('--bg-card', theme.colors.bgCard);
        root.style.setProperty('--bg-code', theme.colors.bgCode);
        root.style.setProperty('--bg-hover', theme.colors.bgHover);
        root.style.setProperty('--text-primary', theme.colors.text);
        root.style.setProperty('--text-secondary', theme.colors.textSecondary);
        root.style.setProperty('--border', theme.colors.border);

        // Update body background
        document.body.style.background = theme.colors.bg;

        // Update theme toggle icon
        const icon = document.getElementById('theme-icon');
        if (icon) icon.textContent = theme.icon;

        // Notify
        if (window.a11y) {
            window.a11y.announce(`Theme changed to ${theme.name}`);
        }
    }

    applyAccent(color) {
        this.customAccent = color;
        localStorage.setItem('gridMasteryAccent', color);

        const root = document.documentElement;
        root.style.setProperty('--accent', color);
        root.style.setProperty('--primary', color);

        // Calculate hover color (slightly lighter)
        const hoverColor = this.lightenColor(color, 15);
        root.style.setProperty('--accent-hover', hoverColor);
        root.style.setProperty('--primary-hover', hoverColor);

        // Calculate glow color
        root.style.setProperty('--accent-glow', `${color}33`);
    }

    lightenColor(hex, percent) {
        const num = parseInt(hex.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return '#' + (
            0x1000000 +
            (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)
        ).toString(16).slice(1);
    }

    nextTheme() {
        const themeIds = Object.keys(THEMES);
        const currentIndex = themeIds.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % themeIds.length;
        this.applyTheme(themeIds[nextIndex]);
        
        if (window.sounds) {
            window.sounds.playClick();
        }
    }

    showThemePicker() {
        const existing = document.getElementById('theme-picker');
        if (existing) {
            existing.remove();
            return;
        }

        const picker = document.createElement('div');
        picker.id = 'theme-picker';
        picker.className = 'theme-picker';
        picker.onclick = (e) => { if (e.target === picker) picker.remove(); };

        picker.innerHTML = `
            <div class="theme-picker-content">
                <button class="picker-close" onclick="this.parentElement.parentElement.remove()">×</button>
                <h2>🎨 Customize Theme</h2>
                
                <h3>Color Theme</h3>
                <div class="theme-grid">
                    ${Object.entries(THEMES).map(([id, theme]) => `
                        <button class="theme-option ${this.currentTheme === id ? 'active' : ''}"
                                onclick="themeSystem.applyTheme('${id}')"
                                style="background: ${theme.colors.bgCard}; border-color: ${theme.colors.border};">
                            <span class="theme-icon">${theme.icon}</span>
                            <span class="theme-name">${theme.name}</span>
                        </button>
                    `).join('')}
                </div>

                <h3>Accent Color</h3>
                <div class="accent-grid">
                    ${ACCENT_COLORS.map(accent => `
                        <button class="accent-option ${this.customAccent === accent.color ? 'active' : ''}"
                                onclick="themeSystem.applyAccent('${accent.color}')"
                                style="background: ${accent.color};"
                                title="${accent.name}">
                        </button>
                    `).join('')}
                </div>

                <div class="custom-accent">
                    <label>Custom Color:</label>
                    <input type="color" value="${this.customAccent}" 
                           onchange="themeSystem.applyAccent(this.value)">
                </div>

                <button class="game-btn secondary" onclick="this.parentElement.parentElement.remove()">
                    Done
                </button>
            </div>
        `;

        document.body.appendChild(picker);

        if (window.sounds) {
            window.sounds.playClick();
        }
    }
}

// ============== THEME PICKER STYLES ==============
const themeStyles = document.createElement('style');
themeStyles.textContent = `
    .theme-picker {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.2s ease;
    }

    .theme-picker-content {
        background: var(--bg-card);
        border-radius: 16px;
        padding: 30px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
    }

    .theme-picker-content h2 {
        margin: 0 0 20px;
        text-align: center;
    }

    .theme-picker-content h3 {
        margin: 20px 0 12px;
        font-size: 0.9rem;
        color: var(--text-secondary);
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .picker-close {
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--text-secondary);
        cursor: pointer;
    }

    .theme-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 10px;
    }

    .theme-option {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 15px 10px;
        border: 2px solid;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .theme-option:hover {
        transform: translateY(-2px);
    }

    .theme-option.active {
        border-color: var(--accent) !important;
        box-shadow: 0 0 15px var(--accent-glow);
    }

    .theme-icon {
        font-size: 1.5rem;
    }

    .theme-name {
        font-size: 0.8rem;
        color: inherit;
    }

    .accent-grid {
        display: grid;
        grid-template-columns: repeat(10, 1fr);
        gap: 8px;
    }

    .accent-option {
        width: 100%;
        aspect-ratio: 1;
        border: 2px solid transparent;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .accent-option:hover {
        transform: scale(1.1);
    }

    .accent-option.active {
        border-color: white;
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
    }

    .custom-accent {
        display: flex;
        align-items: center;
        gap: 15px;
        margin: 20px 0;
        padding: 15px;
        background: var(--bg-code);
        border-radius: 8px;
    }

    .custom-accent label {
        color: var(--text-secondary);
    }

    .custom-accent input[type="color"] {
        width: 50px;
        height: 35px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        background: none;
    }

    /* Theme button in header */
    .theme-toggle {
        cursor: pointer;
    }

    @media (max-width: 768px) {
        .accent-grid {
            grid-template-columns: repeat(5, 1fr);
        }
        
        .theme-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }
`;
document.head.appendChild(themeStyles);

// ============== GLOBAL INSTANCE ==============
const themeSystem = new ThemeSystem();
window.themeSystem = themeSystem;

// Override the toggleTheme function
window.toggleTheme = function() {
    themeSystem.nextTheme();
};

// Add long-press/right-click for theme picker
document.querySelector('.theme-toggle')?.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    themeSystem.showThemePicker();
});

// Double-click also opens picker
document.querySelector('.theme-toggle')?.addEventListener('dblclick', () => {
    themeSystem.showThemePicker();
});

console.log('🎨 Theme system loaded! Right-click or double-click theme toggle for more options.');
