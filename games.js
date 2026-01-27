// CSS Grid Mastery - Game System
// XP, Levels, Achievements, Streaks, and Game Modes

// ============== XP & LEVEL SYSTEM ==============
const LEVELS = [
    { name: 'Novice', minXP: 0, maxXP: 100, emoji: '🌱', color: '#6b7280' },
    { name: 'Apprentice', minXP: 100, maxXP: 500, emoji: '📚', color: '#3b82f6' },
    { name: 'Intermediate', minXP: 500, maxXP: 1500, emoji: '⚡', color: '#8b5cf6' },
    { name: 'Advanced', minXP: 1500, maxXP: 3000, emoji: '🔥', color: '#f59e0b' },
    { name: 'Master', minXP: 3000, maxXP: Infinity, emoji: '👑', color: '#ef4444' }
];

const XP_REWARDS = {
    lessonComplete: 25,
    challengeComplete: 100,
    gridBattleWin: 50,
    gridBattlePerfect: 100,
    debugFixed: 40,
    cloneComplete: 150,
    dailyChallenge: 75,
    streak3: 50,
    streak7: 150,
    streak30: 500
};

// ============== ACHIEVEMENTS ==============
const ACHIEVEMENTS = {
    firstLesson: { 
        id: 'firstLesson', 
        name: 'First Steps', 
        description: 'Complete your first lesson', 
        emoji: '👣',
        xpReward: 10 
    },
    gridApprentice: { 
        id: 'gridApprentice', 
        name: 'Grid Apprentice', 
        description: 'Complete 5 lessons', 
        emoji: '📖',
        xpReward: 50 
    },
    gridMaster: { 
        id: 'gridMaster', 
        name: 'Grid Master', 
        description: 'Complete all 21 lessons', 
        emoji: '🎓',
        xpReward: 200 
    },
    speedDemon: { 
        id: 'speedDemon', 
        name: 'Speed Demon', 
        description: 'Complete a Grid Battle in under 30 seconds', 
        emoji: '⚡',
        xpReward: 75 
    },
    perfectScore: { 
        id: 'perfectScore', 
        name: 'Perfectionist', 
        description: 'Get 100% accuracy in Grid Battle', 
        emoji: '💯',
        xpReward: 100 
    },
    debugPro: { 
        id: 'debugPro', 
        name: 'Bug Hunter', 
        description: 'Complete 5 Debug Detective challenges', 
        emoji: '🔍',
        xpReward: 100 
    },
    debugMaster: { 
        id: 'debugMaster', 
        name: 'Debug Master', 
        description: 'Complete all Debug Detective challenges', 
        emoji: '🐛',
        xpReward: 200 
    },
    cloneWarrior: { 
        id: 'cloneWarrior', 
        name: 'Clone Warrior', 
        description: 'Complete a Clone Challenge', 
        emoji: '🎨',
        xpReward: 75 
    },
    cloneMaster: { 
        id: 'cloneMaster', 
        name: 'Clone Master', 
        description: 'Complete all Clone Challenges', 
        emoji: '🖼️',
        xpReward: 250 
    },
    streak3: { 
        id: 'streak3', 
        name: 'Getting Warm', 
        description: '3-day streak', 
        emoji: '🔥',
        xpReward: 50 
    },
    streak7: { 
        id: 'streak7', 
        name: 'On Fire', 
        description: '7-day streak', 
        emoji: '🔥🔥',
        xpReward: 150 
    },
    streak30: { 
        id: 'streak30', 
        name: 'Unstoppable', 
        description: '30-day streak', 
        emoji: '🔥🔥🔥',
        xpReward: 500 
    },
    dailyWarrior: { 
        id: 'dailyWarrior', 
        name: 'Daily Warrior', 
        description: 'Complete 10 daily challenges', 
        emoji: '📅',
        xpReward: 150 
    },
    battleVeteran: { 
        id: 'battleVeteran', 
        name: 'Battle Veteran', 
        description: 'Win 10 Grid Battles', 
        emoji: '⚔️',
        xpReward: 150 
    },
    allRounder: { 
        id: 'allRounder', 
        name: 'All-Rounder', 
        description: 'Try all game modes', 
        emoji: '🎮',
        xpReward: 100 
    }
};

// ============== GAME STATE MANAGER ==============
class GameState {
    constructor() {
        this.load();
    }
    
    load() {
        const saved = localStorage.getItem('gridMasteryGameState');
        if (saved) {
            const data = JSON.parse(saved);
            this.xp = data.xp || 0;
            this.achievements = data.achievements || [];
            this.streakDays = data.streakDays || 0;
            this.lastActiveDate = data.lastActiveDate || null;
            this.gridBattleStats = data.gridBattleStats || { played: 0, won: 0, bestTime: null };
            this.debugStats = data.debugStats || { completed: [], hintsUsed: 0 };
            this.cloneStats = data.cloneStats || { completed: [] };
            this.dailyStats = data.dailyStats || { completed: [], currentStreak: 0 };
            this.gameModesPlayed = data.gameModesPlayed || [];
        } else {
            this.xp = 0;
            this.achievements = [];
            this.streakDays = 0;
            this.lastActiveDate = null;
            this.gridBattleStats = { played: 0, won: 0, bestTime: null };
            this.debugStats = { completed: [], hintsUsed: 0 };
            this.cloneStats = { completed: [] };
            this.dailyStats = { completed: [], currentStreak: 0 };
            this.gameModesPlayed = [];
        }
        this.updateStreak();
    }
    
    save() {
        localStorage.setItem('gridMasteryGameState', JSON.stringify({
            xp: this.xp,
            achievements: this.achievements,
            streakDays: this.streakDays,
            lastActiveDate: this.lastActiveDate,
            gridBattleStats: this.gridBattleStats,
            debugStats: this.debugStats,
            cloneStats: this.cloneStats,
            dailyStats: this.dailyStats,
            gameModesPlayed: this.gameModesPlayed
        }));
    }
    
    addXP(amount, reason = '') {
        this.xp += amount;
        this.save();
        this.showXPGain(amount, reason);
        this.updateUI();
        this.checkLevelUp();
        return this.xp;
    }
    
    getLevel() {
        for (let i = LEVELS.length - 1; i >= 0; i--) {
            if (this.xp >= LEVELS[i].minXP) {
                return LEVELS[i];
            }
        }
        return LEVELS[0];
    }
    
    getNextLevel() {
        const currentLevel = this.getLevel();
        const currentIndex = LEVELS.findIndex(l => l.name === currentLevel.name);
        return currentIndex < LEVELS.length - 1 ? LEVELS[currentIndex + 1] : null;
    }
    
    getLevelProgress() {
        const level = this.getLevel();
        const nextLevel = this.getNextLevel();
        if (!nextLevel) return 100;
        
        const xpInLevel = this.xp - level.minXP;
        const xpForLevel = nextLevel.minXP - level.minXP;
        return Math.round((xpInLevel / xpForLevel) * 100);
    }
    
    checkLevelUp() {
        const level = this.getLevel();
        const prevXP = this.xp - 1; // Rough check
        let prevLevel = LEVELS[0];
        for (let i = LEVELS.length - 1; i >= 0; i--) {
            if (prevXP >= LEVELS[i].minXP) {
                prevLevel = LEVELS[i];
                break;
            }
        }
        
        if (level.name !== prevLevel.name) {
            this.showLevelUp(level);
        }
    }
    
    unlockAchievement(achievementId) {
        if (this.achievements.includes(achievementId)) return false;
        
        const achievement = ACHIEVEMENTS[achievementId];
        if (!achievement) return false;
        
        this.achievements.push(achievementId);
        this.addXP(achievement.xpReward, achievement.name);
        this.showAchievement(achievement);
        this.save();
        return true;
    }
    
    hasAchievement(achievementId) {
        return this.achievements.includes(achievementId);
    }
    
    updateStreak() {
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        
        if (this.lastActiveDate === today) {
            // Already active today
            return;
        } else if (this.lastActiveDate === yesterday) {
            // Continue streak
            this.streakDays++;
            this.lastActiveDate = today;
            this.checkStreakAchievements();
        } else if (this.lastActiveDate !== today) {
            // Streak broken or first day
            this.streakDays = 1;
            this.lastActiveDate = today;
        }
        this.save();
    }
    
    checkStreakAchievements() {
        if (this.streakDays >= 3 && !this.hasAchievement('streak3')) {
            this.unlockAchievement('streak3');
        }
        if (this.streakDays >= 7 && !this.hasAchievement('streak7')) {
            this.unlockAchievement('streak7');
        }
        if (this.streakDays >= 30 && !this.hasAchievement('streak30')) {
            this.unlockAchievement('streak30');
        }
    }
    
    recordGameMode(mode) {
        if (!this.gameModesPlayed.includes(mode)) {
            this.gameModesPlayed.push(mode);
            this.save();
            
            // Check all-rounder achievement
            const allModes = ['gridBattle', 'debugDetective', 'cloneChallenge', 'dailyChallenge'];
            if (allModes.every(m => this.gameModesPlayed.includes(m))) {
                this.unlockAchievement('allRounder');
            }
        }
    }
    
    // UI Updates
    showXPGain(amount, reason) {
        const toast = document.createElement('div');
        toast.className = 'xp-toast';
        toast.innerHTML = `+${amount} XP ${reason ? `<span class="xp-reason">${reason}</span>` : ''}`;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }
    
    showLevelUp(level) {
        const modal = document.createElement('div');
        modal.className = 'level-up-modal';
        modal.innerHTML = `
            <div class="level-up-content">
                <div class="level-emoji">${level.emoji}</div>
                <h2>Level Up!</h2>
                <p>You are now a <strong style="color: ${level.color}">${level.name}</strong></p>
                <button onclick="this.parentElement.parentElement.remove()">Continue</button>
            </div>
        `;
        document.body.appendChild(modal);
        
        if (typeof confetti !== 'undefined') {
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        }
    }
    
    showAchievement(achievement) {
        const toast = document.createElement('div');
        toast.className = 'achievement-toast';
        toast.innerHTML = `
            <div class="achievement-emoji">${achievement.emoji}</div>
            <div class="achievement-info">
                <strong>Achievement Unlocked!</strong>
                <span>${achievement.name}</span>
            </div>
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    
    updateUI() {
        // Update XP display if it exists
        const xpDisplay = document.getElementById('player-xp');
        if (xpDisplay) xpDisplay.textContent = this.xp;
        
        const levelDisplay = document.getElementById('player-level');
        if (levelDisplay) {
            const level = this.getLevel();
            levelDisplay.innerHTML = `${level.emoji} ${level.name}`;
            levelDisplay.style.color = level.color;
        }
        
        const progressDisplay = document.getElementById('level-progress');
        if (progressDisplay) {
            progressDisplay.style.width = `${this.getLevelProgress()}%`;
        }
        
        const streakDisplay = document.getElementById('streak-count');
        if (streakDisplay) {
            streakDisplay.textContent = this.streakDays;
        }
    }
}

// Global game state instance
const gameState = new GameState();

// ============== GRID BATTLE CHALLENGES ==============
const GRID_BATTLE_CHALLENGES = [
    {
        id: 1,
        name: "Simple 3-Column",
        difficulty: 1,
        timeLimit: 120,
        description: "Create a simple 3-column grid",
        targetCSS: `display: grid;
grid-template-columns: 1fr 1fr 1fr;
gap: 10px;`,
        html: '<div class="item">1</div><div class="item">2</div><div class="item">3</div><div class="item">4</div><div class="item">5</div><div class="item">6</div>',
        hints: ['Use display: grid', 'grid-template-columns defines columns', '1fr means 1 fraction of space']
    },
    {
        id: 2,
        name: "Two Row Layout",
        difficulty: 1,
        timeLimit: 120,
        description: "Create a 2x2 grid with 100px rows",
        targetCSS: `display: grid;
grid-template-columns: 1fr 1fr;
grid-template-rows: 100px 100px;
gap: 10px;`,
        html: '<div class="item">A</div><div class="item">B</div><div class="item">C</div><div class="item">D</div>',
        hints: ['Use grid-template-rows for row sizes', 'px units for fixed sizes']
    },
    {
        id: 3,
        name: "Sidebar Layout",
        difficulty: 2,
        timeLimit: 90,
        description: "Create a sidebar (200px) + main content layout",
        targetCSS: `display: grid;
grid-template-columns: 200px 1fr;
gap: 20px;`,
        html: '<div class="item sidebar">Sidebar</div><div class="item main">Main Content</div>',
        hints: ['Fixed width + flexible width', 'First column 200px, second 1fr']
    },
    {
        id: 4,
        name: "Card Grid",
        difficulty: 2,
        timeLimit: 90,
        description: "Create a responsive card grid with auto-fit",
        targetCSS: `display: grid;
grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
gap: 15px;`,
        html: '<div class="item">Card 1</div><div class="item">Card 2</div><div class="item">Card 3</div><div class="item">Card 4</div><div class="item">Card 5</div><div class="item">Card 6</div>',
        hints: ['Use repeat() with auto-fit', 'minmax() for responsive sizing']
    },
    {
        id: 5,
        name: "Header-Main-Footer",
        difficulty: 2,
        timeLimit: 90,
        description: "Create a classic page layout",
        targetCSS: `display: grid;
grid-template-rows: 60px 1fr 40px;
min-height: 300px;`,
        html: '<div class="item header">Header</div><div class="item main">Main</div><div class="item footer">Footer</div>',
        hints: ['Use grid-template-rows', 'Header and footer fixed, main flexible']
    },
    {
        id: 6,
        name: "Holy Grail",
        difficulty: 3,
        timeLimit: 90,
        description: "Create the famous Holy Grail layout",
        targetCSS: `display: grid;
grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
grid-template-columns: 150px 1fr 150px;
grid-template-rows: 60px 1fr 40px;
min-height: 300px;
gap: 10px;`,
        html: '<div class="item" style="grid-area: header">Header</div><div class="item" style="grid-area: nav">Nav</div><div class="item" style="grid-area: main">Main</div><div class="item" style="grid-area: aside">Aside</div><div class="item" style="grid-area: footer">Footer</div>',
        hints: ['Use grid-template-areas', 'Define areas with quoted strings', 'Assign items with grid-area']
    },
    {
        id: 7,
        name: "Centered Content",
        difficulty: 2,
        timeLimit: 60,
        description: "Center a box both vertically and horizontally",
        targetCSS: `display: grid;
place-items: center;
min-height: 200px;`,
        html: '<div class="item">Centered!</div>',
        hints: ['place-items is a shorthand', 'center centers both axes']
    },
    {
        id: 8,
        name: "Dense Packing",
        difficulty: 3,
        timeLimit: 90,
        description: "Use dense auto-flow to fill gaps",
        targetCSS: `display: grid;
grid-template-columns: repeat(4, 1fr);
grid-auto-flow: dense;
gap: 10px;`,
        html: '<div class="item" style="grid-column: span 2">Wide 1</div><div class="item">2</div><div class="item">3</div><div class="item" style="grid-column: span 2">Wide 2</div><div class="item">4</div><div class="item">5</div><div class="item">6</div>',
        hints: ['grid-auto-flow controls placement', 'dense fills in gaps']
    },
    {
        id: 9,
        name: "Gallery Grid",
        difficulty: 3,
        timeLimit: 90,
        description: "Create a gallery with a featured image",
        targetCSS: `display: grid;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: repeat(2, 150px);
gap: 10px;`,
        html: '<div class="item featured" style="grid-column: span 2; grid-row: span 2">Featured</div><div class="item">1</div><div class="item">2</div><div class="item">3</div><div class="item">4</div>',
        hints: ['Featured spans 2 columns and 2 rows', 'Use grid-column and grid-row: span']
    },
    {
        id: 10,
        name: "Dashboard Layout",
        difficulty: 4,
        timeLimit: 120,
        description: "Create a complex dashboard with widgets",
        targetCSS: `display: grid;
grid-template-columns: 80px 1fr 1fr 250px;
grid-template-rows: 60px 1fr 1fr;
gap: 15px;
min-height: 400px;`,
        html: '<div class="item" style="grid-column: 1 / -1">Header</div><div class="item" style="grid-row: 2 / -1">Nav</div><div class="item">Widget 1</div><div class="item">Widget 2</div><div class="item" style="grid-row: 2 / -1">Stats</div><div class="item" style="grid-column: 2 / 4">Main Content</div>',
        hints: ['Use negative line numbers', 'Span from 2 to -1 for remaining', 'Mix fixed and flexible columns']
    },
    // ============== RESPONSIVE CHALLENGES (11-20) ==============
    {
        id: 11,
        name: "Auto-Fit Cards",
        difficulty: 2,
        timeLimit: 90,
        category: 'responsive',
        description: "Create cards that auto-fit and wrap responsively",
        targetCSS: `display: grid;
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
gap: 20px;`,
        html: '<div class="item">Card 1</div><div class="item">Card 2</div><div class="item">Card 3</div><div class="item">Card 4</div>',
        hints: ['auto-fit fills available space', 'minmax sets min and max size', 'Cards will wrap automatically']
    },
    {
        id: 12,
        name: "Auto-Fill vs Auto-Fit",
        difficulty: 2,
        timeLimit: 90,
        category: 'responsive',
        description: "Use auto-fill to maintain empty columns",
        targetCSS: `display: grid;
grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
gap: 15px;`,
        html: '<div class="item">1</div><div class="item">2</div><div class="item">3</div>',
        hints: ['auto-fill creates empty tracks', 'auto-fit collapses empty tracks', 'Both work with minmax']
    },
    {
        id: 13,
        name: "Fluid Typography Grid",
        difficulty: 3,
        timeLimit: 90,
        category: 'responsive',
        description: "Create a responsive text layout with clamp-like behavior",
        targetCSS: `display: grid;
grid-template-columns: minmax(300px, 60ch) 1fr;
gap: 30px;`,
        html: '<div class="item main-text">Main Content Area</div><div class="item sidebar">Sidebar</div>',
        hints: ['ch unit is character width', 'Great for readable text widths', 'Combine minmax with fixed units']
    },
    {
        id: 14,
        name: "Responsive Image Gallery",
        difficulty: 3,
        timeLimit: 90,
        category: 'responsive',
        description: "Create a gallery that adapts from 1 to 4 columns",
        targetCSS: `display: grid;
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
gap: 16px;`,
        html: '<div class="item">📷</div><div class="item">📷</div><div class="item">📷</div><div class="item">📷</div><div class="item">📷</div><div class="item">📷</div><div class="item">📷</div><div class="item">📷</div>',
        hints: ['More items = more responsive', '250px is a good breakpoint', 'Images maintain aspect ratio']
    },
    {
        id: 15,
        name: "Mobile-First Layout",
        difficulty: 3,
        timeLimit: 120,
        category: 'responsive',
        description: "Create a layout that stacks on mobile, side-by-side on desktop",
        targetCSS: `display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
gap: 24px;`,
        html: '<div class="item">Section 1</div><div class="item">Section 2</div>',
        hints: ['300px minimum for mobile', 'auto-fit expands on larger screens', 'Gap provides breathing room']
    },
    {
        id: 16,
        name: "Responsive Masonry-Like",
        difficulty: 4,
        timeLimit: 120,
        category: 'responsive',
        description: "Create a Pinterest-style layout with auto-rows",
        targetCSS: `display: grid;
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
grid-auto-rows: 100px;
gap: 15px;`,
        html: '<div class="item" style="grid-row: span 2">Tall</div><div class="item">Small</div><div class="item" style="grid-row: span 3">Taller</div><div class="item">Small</div><div class="item" style="grid-row: span 2">Tall</div><div class="item">Small</div>',
        hints: ['grid-auto-rows for implicit rows', 'Span rows for varying heights', 'Dense packing fills gaps']
    },
    {
        id: 17,
        name: "Full-Bleed Layout",
        difficulty: 3,
        timeLimit: 90,
        category: 'responsive',
        description: "Create content with full-width breakouts",
        targetCSS: `display: grid;
grid-template-columns: 1fr min(65ch, 100%) 1fr;
gap: 20px;`,
        html: '<div class="item" style="grid-column: 2">Centered Content</div><div class="item" style="grid-column: 1 / -1">Full Width!</div><div class="item" style="grid-column: 2">Centered Again</div>',
        hints: ['min() picks smallest value', '65ch is readable width', '1 / -1 spans full width']
    },
    {
        id: 18,
        name: "Responsive Nav Grid",
        difficulty: 2,
        timeLimit: 90,
        category: 'responsive',
        description: "Navigation that wraps gracefully",
        targetCSS: `display: grid;
grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
gap: 10px;`,
        html: '<div class="item">Home</div><div class="item">About</div><div class="item">Services</div><div class="item">Portfolio</div><div class="item">Contact</div>',
        hints: ['100px min for nav items', 'auto-fit wraps on small screens', 'Equal-width items']
    },
    {
        id: 19,
        name: "Responsive Feature Grid",
        difficulty: 3,
        timeLimit: 90,
        category: 'responsive',
        description: "Feature cards with a hero spanning full width",
        targetCSS: `display: grid;
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
gap: 24px;`,
        html: '<div class="item" style="grid-column: 1 / -1">Hero Feature</div><div class="item">Feature 1</div><div class="item">Feature 2</div><div class="item">Feature 3</div>',
        hints: ['Hero spans all columns', 'Features wrap responsively', '280px is tablet-friendly']
    },
    {
        id: 20,
        name: "Adaptive Sidebar",
        difficulty: 4,
        timeLimit: 120,
        category: 'responsive',
        description: "Sidebar that collapses on small screens",
        targetCSS: `display: grid;
grid-template-columns: fit-content(200px) 1fr;
gap: 20px;`,
        html: '<div class="item sidebar">Sidebar (shrinks)</div><div class="item main">Main Content</div>',
        hints: ['fit-content() shrinks to content', 'Max 200px but can be smaller', 'Main content fills remaining']
    },
    // ============== SPEED CHALLENGES (21-30) ==============
    {
        id: 21,
        name: "Quick 2x2",
        difficulty: 1,
        timeLimit: 30,
        category: 'speed',
        description: "Create a 2x2 grid - GO FAST!",
        targetCSS: `display: grid;
grid-template-columns: 1fr 1fr;
gap: 10px;`,
        html: '<div class="item">1</div><div class="item">2</div><div class="item">3</div><div class="item">4</div>',
        hints: ['2 columns of 1fr each', 'Simple and fast!']
    },
    {
        id: 22,
        name: "Speed Center",
        difficulty: 1,
        timeLimit: 20,
        category: 'speed',
        description: "Center one item - fastest way!",
        targetCSS: `display: grid;
place-items: center;
min-height: 200px;`,
        html: '<div class="item">Centered!</div>',
        hints: ['place-items is the shortcut', 'One property does it all!']
    },
    {
        id: 23,
        name: "Quick Columns",
        difficulty: 1,
        timeLimit: 30,
        category: 'speed',
        description: "3 equal columns, NOW!",
        targetCSS: `display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 15px;`,
        html: '<div class="item">A</div><div class="item">B</div><div class="item">C</div>',
        hints: ['repeat() saves typing', '3 columns of 1fr']
    },
    {
        id: 24,
        name: "Speed Span",
        difficulty: 2,
        timeLimit: 45,
        category: 'speed',
        description: "First item spans 2 columns!",
        targetCSS: `display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 10px;`,
        html: '<div class="item" style="grid-column: span 2">Wide</div><div class="item">1</div><div class="item">2</div>',
        hints: ['grid-column: span 2', '2-column grid base']
    },
    {
        id: 25,
        name: "Quick Header Footer",
        difficulty: 2,
        timeLimit: 45,
        category: 'speed',
        description: "Header + Content + Footer layout",
        targetCSS: `display: grid;
grid-template-rows: auto 1fr auto;
min-height: 300px;`,
        html: '<div class="item">Header</div><div class="item">Content</div><div class="item">Footer</div>',
        hints: ['Rows: auto, 1fr, auto', 'Content grows to fill']
    },
    {
        id: 26,
        name: "Speed Gap",
        difficulty: 1,
        timeLimit: 30,
        category: 'speed',
        description: "4 items with 20px gap",
        targetCSS: `display: grid;
grid-template-columns: 1fr 1fr;
gap: 20px;`,
        html: '<div class="item">1</div><div class="item">2</div><div class="item">3</div><div class="item">4</div>',
        hints: ['gap: 20px', '2x2 grid with spacing']
    },
    {
        id: 27,
        name: "Quick Areas",
        difficulty: 3,
        timeLimit: 60,
        category: 'speed',
        description: "Use grid-template-areas FAST!",
        targetCSS: `display: grid;
grid-template-areas: "a a" "b c";
gap: 10px;`,
        html: '<div class="item" style="grid-area: a">A spans</div><div class="item" style="grid-area: b">B</div><div class="item" style="grid-area: c">C</div>',
        hints: ['Named areas in quotes', 'Repeat names to span']
    },
    {
        id: 28,
        name: "Speed Fixed + Flex",
        difficulty: 2,
        timeLimit: 45,
        category: 'speed',
        description: "250px sidebar + flexible main",
        targetCSS: `display: grid;
grid-template-columns: 250px 1fr;
gap: 20px;`,
        html: '<div class="item">Sidebar</div><div class="item">Main</div>',
        hints: ['Fixed + flexible', '250px then 1fr']
    },
    {
        id: 29,
        name: "Quick Stack",
        difficulty: 1,
        timeLimit: 30,
        category: 'speed',
        description: "Stack items vertically with gap",
        targetCSS: `display: grid;
gap: 16px;`,
        html: '<div class="item">One</div><div class="item">Two</div><div class="item">Three</div>',
        hints: ['No columns needed!', 'Just display: grid + gap']
    },
    {
        id: 30,
        name: "Speed Dense",
        difficulty: 3,
        timeLimit: 60,
        category: 'speed',
        description: "Fill gaps with dense packing!",
        targetCSS: `display: grid;
grid-template-columns: repeat(3, 1fr);
grid-auto-flow: dense;
gap: 10px;`,
        html: '<div class="item" style="grid-column: span 2">Wide 1</div><div class="item">2</div><div class="item" style="grid-column: span 2">Wide 2</div><div class="item">3</div><div class="item">4</div>',
        hints: ['grid-auto-flow: dense', 'Fills gaps automatically']
    },
    // ============== ADVANCED PATTERNS (31-35) ==============
    {
        id: 31,
        name: "Magazine Layout",
        difficulty: 4,
        timeLimit: 120,
        category: 'advanced',
        description: "Create a complex magazine-style layout",
        targetCSS: `display: grid;
grid-template-columns: repeat(4, 1fr);
grid-template-rows: repeat(3, 100px);
gap: 15px;`,
        html: '<div class="item" style="grid-column: span 2; grid-row: span 2">Feature</div><div class="item">Story 1</div><div class="item">Story 2</div><div class="item" style="grid-row: span 2">Sidebar</div><div class="item" style="grid-column: span 2">Wide Story</div>',
        hints: ['Combine row and column spans', 'Think in rectangles', '4-column base grid']
    },
    {
        id: 32,
        name: "App Shell",
        difficulty: 4,
        timeLimit: 120,
        category: 'advanced',
        description: "Create a modern app layout with header, sidebar, main, footer",
        targetCSS: `display: grid;
grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
grid-template-columns: 240px 1fr;
grid-template-rows: 60px 1fr 40px;
min-height: 400px;`,
        html: '<div class="item" style="grid-area: header">Header</div><div class="item" style="grid-area: sidebar">Sidebar</div><div class="item" style="grid-area: main">Main Content</div><div class="item" style="grid-area: footer">Footer</div>',
        hints: ['Use grid-template-areas', 'Combine areas with explicit sizes', 'Standard app layout']
    },
    {
        id: 33,
        name: "Card Masonry",
        difficulty: 4,
        timeLimit: 120,
        category: 'advanced',
        description: "Create a masonry-like card layout",
        targetCSS: `display: grid;
grid-template-columns: repeat(3, 1fr);
grid-auto-rows: 50px;
gap: 12px;`,
        html: '<div class="item" style="grid-row: span 3">Tall Card</div><div class="item" style="grid-row: span 2">Medium</div><div class="item" style="grid-row: span 4">Extra Tall</div><div class="item" style="grid-row: span 2">Medium</div><div class="item" style="grid-row: span 3">Tall</div>',
        hints: ['Small auto-rows as units', 'Span different row counts', 'Creates varied heights']
    },
    {
        id: 34,
        name: "12-Column Grid",
        difficulty: 4,
        timeLimit: 120,
        category: 'advanced',
        description: "Create a Bootstrap-style 12-column system",
        targetCSS: `display: grid;
grid-template-columns: repeat(12, 1fr);
gap: 20px;`,
        html: '<div class="item" style="grid-column: span 12">Full Width (12)</div><div class="item" style="grid-column: span 6">Half (6)</div><div class="item" style="grid-column: span 6">Half (6)</div><div class="item" style="grid-column: span 4">Third (4)</div><div class="item" style="grid-column: span 4">Third (4)</div><div class="item" style="grid-column: span 4">Third (4)</div>',
        hints: ['12 columns of 1fr', 'Span for different widths', 'Like Bootstrap columns']
    },
    {
        id: 35,
        name: "Hero + Grid",
        difficulty: 4,
        timeLimit: 120,
        category: 'advanced',
        description: "Hero image with content grid below",
        targetCSS: `display: grid;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: 200px auto;
gap: 20px;`,
        html: '<div class="item" style="grid-column: 1 / -1">Hero Image</div><div class="item">Card 1</div><div class="item">Card 2</div><div class="item">Card 3</div>',
        hints: ['Hero spans all columns', 'First row fixed height', 'Cards auto-size below']
    }
];

// ============== DEBUG DETECTIVE CHALLENGES ==============
const DEBUG_CHALLENGES = [
    {
        id: 1,
        name: "Missing Display",
        difficulty: 1,
        description: "The grid isn't working! Find the bug.",
        buggyCSS: `.container {
    /* display: grid; */
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
}`,
        fixedCSS: `.container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
}`,
        hint: "Grid won't work without declaring it first...",
        explanation: "You need display: grid to enable grid layout"
    },
    {
        id: 2,
        name: "Typo in Template",
        difficulty: 1,
        description: "Columns aren't sizing correctly",
        buggyCSS: `.container {
    display: grid;
    grid-templete-columns: 1fr 1fr 1fr;
    gap: 10px;
}`,
        fixedCSS: `.container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
}`,
        hint: "Check your spelling carefully...",
        explanation: "It's 'template' not 'templete'"
    },
    {
        id: 3,
        name: "Missing Unit",
        difficulty: 1,
        description: "Gap isn't being applied",
        buggyCSS: `.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20;
}`,
        fixedCSS: `.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}`,
        hint: "Numbers need units in CSS...",
        explanation: "Gap needs a unit like px, rem, or em"
    },
    {
        id: 4,
        name: "Invalid Repeat",
        difficulty: 2,
        description: "The repeat function isn't working",
        buggyCSS: `.container {
    display: grid;
    grid-template-columns: repeat(3 1fr);
    gap: 10px;
}`,
        fixedCSS: `.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
}`,
        hint: "repeat() takes two arguments separated by...",
        explanation: "repeat() needs a comma: repeat(count, value)"
    },
    {
        id: 5,
        name: "Area Mismatch",
        difficulty: 2,
        description: "Grid areas aren't being assigned",
        buggyCSS: `.container {
    display: grid;
    grid-template-areas:
        "header header"
        "sidebar main";
}

.header { grid-area: head; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }`,
        fixedCSS: `.container {
    display: grid;
    grid-template-areas:
        "header header"
        "sidebar main";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }`,
        hint: "The area names must match exactly...",
        explanation: "grid-area value must match the name in grid-template-areas"
    },
    {
        id: 6,
        name: "Broken Minmax",
        difficulty: 2,
        description: "Responsive columns aren't working",
        buggyCSS: `.container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px 1fr));
    gap: 10px;
}`,
        fixedCSS: `.container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
}`,
        hint: "minmax() needs proper syntax...",
        explanation: "minmax() needs a comma between min and max values"
    },
    {
        id: 7,
        name: "Wrong Property",
        difficulty: 2,
        description: "Items aren't centering",
        buggyCSS: `.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    place-content: center;
    height: 300px;
}`,
        fixedCSS: `.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    place-items: center;
    height: 300px;
}`,
        hint: "place-content vs place-items - which centers items in their cells?",
        explanation: "place-items centers items within cells, place-content positions the grid itself"
    },
    {
        id: 8,
        name: "Invalid Line Number",
        difficulty: 3,
        description: "Item isn't spanning correctly",
        buggyCSS: `.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}

.featured {
    grid-column: 1 / 4;
    grid-row: 1 / 3;
}`,
        fixedCSS: `.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}

.featured {
    grid-column: 1 / -1;
    grid-row: 1 / 3;
}`,
        hint: "What if you want to span to the end regardless of column count?",
        explanation: "Use -1 to span to the last line (more flexible)"
    },
    {
        id: 9,
        name: "Quote Issues",
        difficulty: 3,
        description: "Grid areas aren't parsing",
        buggyCSS: `.container {
    display: grid;
    grid-template-areas:
        'header header'
        "sidebar main"
        'footer footer';
}`,
        fixedCSS: `.container {
    display: grid;
    grid-template-areas:
        "header header"
        "sidebar main"
        "footer footer";
}`,
        hint: "Consistency matters in CSS strings...",
        explanation: "Use consistent quote types for grid-template-areas"
    },
    {
        id: 10,
        name: "Implicit vs Explicit",
        difficulty: 3,
        description: "Auto rows are too small",
        buggyCSS: `.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 100px;
    gap: 10px;
}`,
        fixedCSS: `.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 100px;
    gap: 10px;
}`,
        hint: "template-rows only defines explicit rows, what about the rest?",
        explanation: "Use grid-auto-rows for implicit (auto-generated) rows"
    }
];

// ============== CLONE CHALLENGES ==============
const CLONE_CHALLENGES = [
    {
        id: 'twitter',
        name: "Twitter/X Sidebar",
        difficulty: 3,
        description: "Recreate Twitter's sidebar navigation layout",
        targetLayout: {
            columns: '60px 1fr',
            rows: 'repeat(8, auto)',
            gap: '8px'
        },
        reference: `/* Twitter Sidebar */
.container {
    display: grid;
    grid-template-columns: 60px 1fr;
    grid-template-rows: repeat(8, auto);
    gap: 8px;
    padding: 12px;
}`,
        html: `
            <div class="icon">🏠</div><div class="label">Home</div>
            <div class="icon">🔍</div><div class="label">Explore</div>
            <div class="icon">🔔</div><div class="label">Notifications</div>
            <div class="icon">✉️</div><div class="label">Messages</div>
            <div class="icon">📑</div><div class="label">Lists</div>
            <div class="icon">🔖</div><div class="label">Bookmarks</div>
            <div class="icon">👤</div><div class="label">Profile</div>
            <div class="icon">⚙️</div><div class="label">Settings</div>
        `
    },
    {
        id: 'youtube',
        name: "YouTube Video Grid",
        difficulty: 2,
        description: "Recreate YouTube's video thumbnail grid",
        targetLayout: {
            columns: 'repeat(auto-fill, minmax(300px, 1fr))',
            rows: 'auto',
            gap: '16px'
        },
        reference: `/* YouTube Grid */
.container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
    padding: 24px;
}`,
        html: `
            <div class="video-card">Video 1</div>
            <div class="video-card">Video 2</div>
            <div class="video-card">Video 3</div>
            <div class="video-card">Video 4</div>
            <div class="video-card">Video 5</div>
            <div class="video-card">Video 6</div>
        `
    },
    {
        id: 'netflix',
        name: "Netflix Browse",
        difficulty: 3,
        description: "Recreate Netflix's content rows",
        targetLayout: {
            columns: 'repeat(6, 1fr)',
            rows: 'auto',
            gap: '4px'
        },
        reference: `/* Netflix Row */
.container {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 4px;
}

.container:hover .item:not(:hover) {
    opacity: 0.5;
}`,
        html: `
            <div class="movie">🎬</div>
            <div class="movie">🎥</div>
            <div class="movie">📺</div>
            <div class="movie">🎞️</div>
            <div class="movie">📽️</div>
            <div class="movie">🎦</div>
        `
    },
    {
        id: 'spotify',
        name: "Spotify Playlist",
        difficulty: 2,
        description: "Recreate Spotify's playlist track list",
        targetLayout: {
            columns: '40px 1fr 1fr 80px',
            rows: 'repeat(5, 56px)',
            gap: '0'
        },
        reference: `/* Spotify Playlist */
.container {
    display: grid;
    grid-template-columns: 40px 1fr 1fr 80px;
    grid-auto-rows: 56px;
    align-items: center;
}`,
        html: `
            <div class="num">1</div><div class="title">Song Title</div><div class="album">Album Name</div><div class="duration">3:24</div>
            <div class="num">2</div><div class="title">Another Song</div><div class="album">Album Name</div><div class="duration">4:15</div>
            <div class="num">3</div><div class="title">Third Track</div><div class="album">Different Album</div><div class="duration">2:58</div>
            <div class="num">4</div><div class="title">Fourth Song</div><div class="album">Album Name</div><div class="duration">3:42</div>
            <div class="num">5</div><div class="title">Last One</div><div class="album">Final Album</div><div class="duration">5:01</div>
        `
    },
    {
        id: 'github',
        name: "GitHub Repo Page",
        difficulty: 4,
        description: "Recreate GitHub's repository page layout",
        targetLayout: {
            columns: '1fr 300px',
            areas: '"main sidebar"',
            gap: '24px'
        },
        reference: `/* GitHub Repo Layout */
.container {
    display: grid;
    grid-template-columns: 1fr 300px;
    grid-template-areas: "main sidebar";
    gap: 24px;
    padding: 24px;
}

.files { grid-area: main; }
.about { grid-area: sidebar; }`,
        html: `
            <div class="files">
                <div>📁 src/</div>
                <div>📁 tests/</div>
                <div>📄 README.md</div>
                <div>📄 package.json</div>
            </div>
            <div class="about">
                <h3>About</h3>
                <p>Repository description goes here</p>
                <div>⭐ 1.2k stars</div>
                <div>🍴 234 forks</div>
            </div>
        `
    }
];

// ============== DAILY CHALLENGE GENERATOR ==============
function getDailyChallenge() {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    
    // Seeded random generator
    const seededRandom = (seed) => {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    };
    
    // Pick challenge type
    const types = ['gridBattle', 'debug', 'clone'];
    const typeIndex = Math.floor(seededRandom(seed) * types.length);
    const type = types[typeIndex];
    
    // Pick specific challenge based on type
    let challenge;
    switch(type) {
        case 'gridBattle':
            const battleIndex = Math.floor(seededRandom(seed + 1) * GRID_BATTLE_CHALLENGES.length);
            challenge = { ...GRID_BATTLE_CHALLENGES[battleIndex], type: 'gridBattle' };
            break;
        case 'debug':
            const debugIndex = Math.floor(seededRandom(seed + 2) * DEBUG_CHALLENGES.length);
            challenge = { ...DEBUG_CHALLENGES[debugIndex], type: 'debug' };
            break;
        case 'clone':
            const cloneIndex = Math.floor(seededRandom(seed + 3) * CLONE_CHALLENGES.length);
            challenge = { ...CLONE_CHALLENGES[cloneIndex], type: 'clone' };
            break;
    }
    
    challenge.date = today.toISOString().split('T')[0];
    return challenge;
}

function isDailyChallengeComplete() {
    const today = new Date().toISOString().split('T')[0];
    return gameState.dailyStats.completed.includes(today);
}

function completeDailyChallenge() {
    const today = new Date().toISOString().split('T')[0];
    if (!gameState.dailyStats.completed.includes(today)) {
        gameState.dailyStats.completed.push(today);
        
        // Check streak
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        if (gameState.dailyStats.completed.includes(yesterday)) {
            gameState.dailyStats.currentStreak++;
        } else {
            gameState.dailyStats.currentStreak = 1;
        }
        
        gameState.addXP(XP_REWARDS.dailyChallenge, 'Daily Challenge');
        gameState.recordGameMode('dailyChallenge');
        gameState.save();
        
        // Check achievement
        if (gameState.dailyStats.completed.length >= 10 && !gameState.hasAchievement('dailyWarrior')) {
            gameState.unlockAchievement('dailyWarrior');
        }
        
        return true;
    }
    return false;
}

// ============== TIMER COMPONENT ==============
class GameTimer {
    constructor(duration, onTick, onComplete) {
        this.duration = duration;
        this.remaining = duration;
        this.onTick = onTick;
        this.onComplete = onComplete;
        this.interval = null;
        this.startTime = null;
    }
    
    start() {
        this.startTime = Date.now();
        this.interval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            this.remaining = Math.max(0, this.duration - elapsed);
            
            if (this.onTick) this.onTick(this.remaining);
            
            if (this.remaining <= 0) {
                this.stop();
                if (this.onComplete) this.onComplete();
            }
        }, 100);
    }
    
    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
    
    getElapsed() {
        if (!this.startTime) return 0;
        return Math.floor((Date.now() - this.startTime) / 1000);
    }
    
    reset(duration = null) {
        this.stop();
        if (duration) this.duration = duration;
        this.remaining = this.duration;
        this.startTime = null;
    }
}

// ============== CSS COMPARISON ==============
function normalizeCSS(css) {
    return css
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .replace(/;\s*/g, ';')
        .replace(/:\s*/g, ':')
        .replace(/{\s*/g, '{')
        .replace(/}\s*/g, '}')
        .replace(/,\s*/g, ',')
        .trim();
}

function compareCSS(userCSS, targetCSS) {
    const normalUser = normalizeCSS(userCSS);
    const normalTarget = normalizeCSS(targetCSS);
    
    // Extract key properties
    const extractProps = (css) => {
        const props = {};
        const matches = css.match(/([a-z-]+):\s*([^;]+)/g) || [];
        matches.forEach(m => {
            const [key, value] = m.split(':').map(s => s.trim());
            props[key] = value;
        });
        return props;
    };
    
    const userProps = extractProps(normalUser);
    const targetProps = extractProps(normalTarget);
    
    let matchCount = 0;
    let totalProps = Object.keys(targetProps).length;
    
    Object.keys(targetProps).forEach(key => {
        if (userProps[key] && normalizeCSS(userProps[key]) === normalizeCSS(targetProps[key])) {
            matchCount++;
        }
    });
    
    return {
        accuracy: totalProps > 0 ? Math.round((matchCount / totalProps) * 100) : 0,
        matched: matchCount,
        total: totalProps,
        missing: Object.keys(targetProps).filter(k => !userProps[k] || normalizeCSS(userProps[k]) !== normalizeCSS(targetProps[k]))
    };
}

// ============== SCORE CALCULATION ==============
function calculateGridBattleScore(accuracy, timeRemaining, totalTime) {
    const baseScore = accuracy;
    const timeBonus = Math.round((timeRemaining / totalTime) * 50);
    const perfectBonus = accuracy === 100 ? 25 : 0;
    
    return {
        baseScore,
        timeBonus,
        perfectBonus,
        total: baseScore + timeBonus + perfectBonus
    };
}

// Export for use
window.gameState = gameState;
window.GRID_BATTLE_CHALLENGES = GRID_BATTLE_CHALLENGES;
window.DEBUG_CHALLENGES = DEBUG_CHALLENGES;
window.CLONE_CHALLENGES = CLONE_CHALLENGES;
window.getDailyChallenge = getDailyChallenge;
window.isDailyChallengeComplete = isDailyChallengeComplete;
window.completeDailyChallenge = completeDailyChallenge;
window.GameTimer = GameTimer;
window.compareCSS = compareCSS;
window.calculateGridBattleScore = calculateGridBattleScore;
window.LEVELS = LEVELS;
window.ACHIEVEMENTS = ACHIEVEMENTS;
window.XP_REWARDS = XP_REWARDS;

console.log('🎮 CSS Grid Mastery Games loaded!');
