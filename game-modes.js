// CSS Grid Mastery - Game Mode UI
// Handles rendering and interaction for each game mode

let currentGameMode = null;
let currentChallenge = null;
let gameTimer = null;

// ============== LOAD GAME MODE ==============
function loadGameMode(mode) {
    currentGameMode = mode;
    
    // Hide lesson container, show game container
    document.getElementById('lesson-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    
    // Update nav
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelectorAll('.game-mode-btn').forEach(b => b.classList.remove('active'));
    event?.target?.closest('.game-mode-btn')?.classList.add('active');
    
    // Update game state
    gameState.updateUI();
    
    // Render appropriate mode
    switch(mode) {
        case 'gridBattle':
            renderGridBattleMenu();
            break;
        case 'debugDetective':
            renderDebugDetectiveMenu();
            break;
        case 'cloneChallenge':
            renderCloneChallengeMenu();
            break;
        case 'dailyChallenge':
            renderDailyChallenge();
            break;
        case 'achievements':
            renderAchievements();
            break;
    }
}

// Return to lessons
function backToLessons() {
    document.getElementById('lesson-container').style.display = 'block';
    document.getElementById('game-container').style.display = 'none';
    document.querySelectorAll('.game-mode-btn').forEach(b => b.classList.remove('active'));
    if (gameTimer) gameTimer.stop();
    currentGameMode = null;
    currentChallenge = null;
}

// ============== GRID BATTLE ==============
let currentBattleCategory = 'all';

function renderGridBattleMenu() {
    gameState.recordGameMode('gridBattle');
    const container = document.getElementById('game-container');
    
    const categories = [
        { id: 'all', name: 'All Challenges', emoji: '📋' },
        { id: 'basic', name: 'Basic (1-10)', emoji: '🌱' },
        { id: 'responsive', name: 'Responsive', emoji: '📱' },
        { id: 'speed', name: 'Speed Run', emoji: '⚡' },
        { id: 'advanced', name: 'Advanced', emoji: '🔥' }
    ];
    
    const filteredChallenges = GRID_BATTLE_CHALLENGES.filter(c => {
        if (currentBattleCategory === 'all') return true;
        if (currentBattleCategory === 'basic') return c.id <= 10;
        return c.category === currentBattleCategory;
    });
    
    const completedCount = (gameState.gridBattleStats.completed || []).length;
    const totalCount = GRID_BATTLE_CHALLENGES.length;
    
    container.innerHTML = `
        <div class="game-container">
            <div class="game-header">
                <h1>⚔️ Grid Battle</h1>
                <button class="game-btn secondary" onclick="backToLessons()">← Back to Lessons</button>
            </div>
            
            <div class="challenge-card">
                <h2>Time Attack Mode</h2>
                <p class="description">Race against the clock to recreate CSS Grid layouts. The faster and more accurate you are, the higher your score!</p>
                <div style="display: flex; gap: 12px; margin-top: 16px; flex-wrap: wrap;">
                    <span class="difficulty difficulty-1">⚡ Speed Bonus</span>
                    <span class="difficulty difficulty-2">🎯 Accuracy Points</span>
                    <span class="difficulty difficulty-3">💯 Perfect Bonus</span>
                </div>
                <div style="margin-top: 16px;">
                    <strong>${completedCount}/${totalCount}</strong> challenges completed
                </div>
            </div>
            
            <div style="display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap;">
                ${categories.map(cat => `
                    <button class="game-btn ${currentBattleCategory === cat.id ? 'primary' : 'secondary'}" 
                            onclick="setBattleCategory('${cat.id}')" style="flex: 0 0 auto;">
                        ${cat.emoji} ${cat.name}
                    </button>
                `).join('')}
            </div>
            
            <div class="challenge-list">
                ${filteredChallenges.map(c => `
                    <div class="challenge-list-item ${gameState.gridBattleStats.completed?.includes(c.id) ? 'completed' : ''}" 
                         onclick="startGridBattle(${c.id})">
                        <div class="info">
                            <span class="name">${c.name}</span>
                            <span class="meta">
                                <span class="difficulty difficulty-${c.difficulty}">${'⭐'.repeat(c.difficulty)}</span>
                                · ${c.timeLimit}s
                                ${c.category ? ` · ${c.category}` : ''}
                            </span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function setBattleCategory(category) {
    currentBattleCategory = category;
    renderGridBattleMenu();
}
window.setBattleCategory = setBattleCategory;

function startGridBattle(challengeId) {
    const challenge = GRID_BATTLE_CHALLENGES.find(c => c.id === challengeId);
    if (!challenge) return;
    
    currentChallenge = challenge;
    const container = document.getElementById('game-container');
    
    container.innerHTML = `
        <div class="game-container">
            <div class="game-header">
                <h1>⚔️ ${challenge.name}</h1>
                <div class="game-timer" id="battle-timer">${challenge.timeLimit}</div>
            </div>
            
            <div class="challenge-card">
                <h2>Your Mission</h2>
                <p class="description">${challenge.description}</p>
                <span class="difficulty difficulty-${challenge.difficulty}">Difficulty: ${'⭐'.repeat(challenge.difficulty)}</span>
            </div>
            
            <div class="target-preview">
                <h3>🎯 Target Layout</h3>
                <div class="grid-preview" id="target-preview">
                    <div class="preview-grid" style="${challenge.targetCSS.replace(/\n/g, ' ')}">
                        ${challenge.html}
                    </div>
                </div>
            </div>
            
            <div class="game-editor">
                <div class="code-panel">
                    <div class="panel-header">
                        <h4>Your CSS</h4>
                        <button class="hint-btn" onclick="showBattleHint()" id="hint-btn">
                            💡 Hint (-10 pts)
                        </button>
                    </div>
                    <textarea id="battle-code" placeholder=".container {
    display: grid;
    /* Your code here */
}">.container {
    display: grid;
    
}</textarea>
                </div>
                <div class="preview-panel">
                    <div class="panel-header">
                        <h4>Your Result</h4>
                    </div>
                    <div class="preview-content" id="battle-preview">
                        <div class="preview-grid" id="user-grid">
                            ${challenge.html}
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="game-actions">
                <button class="game-btn secondary" onclick="renderGridBattleMenu()">← Back</button>
                <button class="game-btn success" onclick="submitGridBattle()">✓ Submit Solution</button>
            </div>
            
            <div id="hint-display" style="display: none;"></div>
        </div>
    `;
    
    // Add preview styling
    addPreviewStyles();
    
    // Set up live preview
    const codeEditor = document.getElementById('battle-code');
    codeEditor.addEventListener('input', updateBattlePreview);
    
    // Start timer
    gameTimer = new GameTimer(
        challenge.timeLimit,
        (remaining) => {
            const timerEl = document.getElementById('battle-timer');
            timerEl.textContent = remaining;
            if (remaining <= 10) timerEl.classList.add('danger');
            else if (remaining <= 30) timerEl.classList.add('warning');
        },
        () => {
            submitGridBattle();
        }
    );
    gameTimer.start();
}

function addPreviewStyles() {
    // Add styles for preview grids
    const style = document.createElement('style');
    style.id = 'preview-styles';
    style.textContent = `
        .preview-grid {
            background: var(--bg-dark);
            padding: 10px;
            border-radius: 8px;
            min-height: 150px;
        }
        .preview-grid .item,
        .preview-grid .grid-item,
        .preview-grid > div {
            background: var(--accent);
            color: white;
            padding: 12px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);
}

function updateBattlePreview() {
    const code = document.getElementById('battle-code').value;
    const userGrid = document.getElementById('user-grid');
    
    // Parse and apply CSS
    const containerMatch = code.match(/\.container\s*\{([^}]+)\}/);
    if (containerMatch) {
        const styles = containerMatch[1]
            .split(';')
            .map(s => s.trim())
            .filter(s => s)
            .join('; ');
        userGrid.style.cssText = styles;
    }
}

let hintUsed = false;
function showBattleHint() {
    if (hintUsed || !currentChallenge) return;
    
    hintUsed = true;
    const hintIndex = Math.floor(Math.random() * currentChallenge.hints.length);
    const hint = currentChallenge.hints[hintIndex];
    
    const hintDisplay = document.getElementById('hint-display');
    hintDisplay.style.display = 'block';
    hintDisplay.innerHTML = `
        <div class="hint-display">
            <span class="hint-icon">💡</span>
            <div>
                <strong>Hint:</strong>
                <p>${hint}</p>
            </div>
        </div>
    `;
    
    document.getElementById('hint-btn').disabled = true;
}

function submitGridBattle() {
    if (gameTimer) gameTimer.stop();
    
    const code = document.getElementById('battle-code').value;
    const result = compareCSS(code, currentChallenge.targetCSS);
    const timeElapsed = gameTimer ? gameTimer.getElapsed() : currentChallenge.timeLimit;
    const timeRemaining = Math.max(0, currentChallenge.timeLimit - timeElapsed);
    
    const score = calculateGridBattleScore(result.accuracy, timeRemaining, currentChallenge.timeLimit);
    if (hintUsed) score.total = Math.max(0, score.total - 10);
    
    // Update stats
    gameState.gridBattleStats.played++;
    if (result.accuracy >= 80) {
        gameState.gridBattleStats.won++;
        gameState.addXP(XP_REWARDS.gridBattleWin, 'Grid Battle Win');
        
        if (result.accuracy === 100) {
            gameState.addXP(XP_REWARDS.gridBattlePerfect - XP_REWARDS.gridBattleWin, 'Perfect Score!');
            if (!gameState.hasAchievement('perfectScore')) {
                gameState.unlockAchievement('perfectScore');
            }
        }
    }
    
    if (timeElapsed < 30 && result.accuracy >= 80 && !gameState.hasAchievement('speedDemon')) {
        gameState.unlockAchievement('speedDemon');
    }
    
    if (gameState.gridBattleStats.won >= 10 && !gameState.hasAchievement('battleVeteran')) {
        gameState.unlockAchievement('battleVeteran');
    }
    
    if (!gameState.gridBattleStats.completed) gameState.gridBattleStats.completed = [];
    if (!gameState.gridBattleStats.completed.includes(currentChallenge.id)) {
        gameState.gridBattleStats.completed.push(currentChallenge.id);
    }
    
    gameState.save();
    
    // Show results
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <div class="game-container">
            <div class="game-header">
                <h1>${result.accuracy >= 80 ? '🎉 Victory!' : '😅 Try Again'}</h1>
            </div>
            
            <div class="score-display">
                <div class="score-value">${score.total}</div>
                <p style="color: var(--text-secondary);">Total Score</p>
                <div class="score-breakdown">
                    <div class="score-item">
                        <div class="label">Accuracy</div>
                        <div class="value">${result.accuracy}%</div>
                    </div>
                    <div class="score-item">
                        <div class="label">Time Bonus</div>
                        <div class="value">+${score.timeBonus}</div>
                    </div>
                    <div class="score-item">
                        <div class="label">Perfect Bonus</div>
                        <div class="value">+${score.perfectBonus}</div>
                    </div>
                </div>
            </div>
            
            ${result.missing.length > 0 ? `
                <div class="challenge-card">
                    <h3>Missing or Incorrect:</h3>
                    <ul style="margin-top: 12px; color: var(--text-secondary);">
                        ${result.missing.map(m => `<li><code>${m}</code></li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            
            <div class="challenge-card">
                <h3>Solution:</h3>
                <pre style="margin-top: 12px; background: var(--bg-dark); padding: 16px; border-radius: 8px; overflow-x: auto;"><code>${currentChallenge.targetCSS}</code></pre>
            </div>
            
            <div class="game-actions">
                <button class="game-btn secondary" onclick="renderGridBattleMenu()">← Back to Challenges</button>
                <button class="game-btn primary" onclick="startGridBattle(${currentChallenge.id})">🔄 Try Again</button>
                ${currentChallenge.id < GRID_BATTLE_CHALLENGES.length ? `
                    <button class="game-btn success" onclick="startGridBattle(${currentChallenge.id + 1})">Next Challenge →</button>
                ` : ''}
            </div>
        </div>
    `;
    
    hintUsed = false;
}

// ============== DEBUG DETECTIVE ==============
function renderDebugDetectiveMenu() {
    gameState.recordGameMode('debugDetective');
    const container = document.getElementById('game-container');
    
    container.innerHTML = `
        <div class="game-container">
            <div class="game-header">
                <h1>🔍 Debug Detective</h1>
                <button class="game-btn secondary" onclick="backToLessons()">← Back to Lessons</button>
            </div>
            
            <div class="challenge-card">
                <h2>Find and Fix the Bug</h2>
                <p class="description">Each challenge contains broken CSS. Find the bug, fix it, and learn from common mistakes!</p>
                <div style="display: flex; gap: 12px; margin-top: 16px;">
                    <span class="difficulty difficulty-1">🐛 Bug Identification</span>
                    <span class="difficulty difficulty-2">🔧 Quick Fix</span>
                    <span class="difficulty difficulty-3">💡 Hints Available</span>
                </div>
            </div>
            
            <h3 style="margin-bottom: 16px;">Debug Challenges</h3>
            <div class="challenge-list">
                ${DEBUG_CHALLENGES.map(c => `
                    <div class="challenge-list-item ${gameState.debugStats.completed?.includes(c.id) ? 'completed' : ''}" 
                         onclick="startDebugChallenge(${c.id})">
                        <div class="info">
                            <span class="name">${c.name}</span>
                            <span class="meta">
                                <span class="difficulty difficulty-${c.difficulty}">${'⭐'.repeat(c.difficulty)}</span>
                                · ${c.description}
                            </span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

let debugHintsUsed = 0;
function startDebugChallenge(challengeId) {
    const challenge = DEBUG_CHALLENGES.find(c => c.id === challengeId);
    if (!challenge) return;
    
    currentChallenge = challenge;
    debugHintsUsed = 0;
    
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <div class="game-container">
            <div class="game-header">
                <h1>🔍 ${challenge.name}</h1>
                <span class="difficulty difficulty-${challenge.difficulty}">Difficulty: ${'⭐'.repeat(challenge.difficulty)}</span>
            </div>
            
            <div class="challenge-card">
                <h2>🐛 The Bug</h2>
                <p class="description">${challenge.description}</p>
            </div>
            
            <div class="game-editor">
                <div class="code-panel" style="grid-column: span 2;">
                    <div class="panel-header">
                        <h4>Fix the CSS</h4>
                        <button class="hint-btn" onclick="showDebugHint()" id="debug-hint-btn">
                            💡 Show Hint (-20 pts)
                        </button>
                    </div>
                    <textarea id="debug-code" style="min-height: 300px;">${challenge.buggyCSS}</textarea>
                </div>
            </div>
            
            <div id="debug-hint-display" style="display: none;"></div>
            
            <div class="game-actions">
                <button class="game-btn secondary" onclick="renderDebugDetectiveMenu()">← Back</button>
                <button class="game-btn success" onclick="submitDebugSolution()">✓ Submit Fix</button>
            </div>
        </div>
    `;
}

function showDebugHint() {
    if (!currentChallenge) return;
    
    debugHintsUsed++;
    gameState.debugStats.hintsUsed++;
    
    const hintDisplay = document.getElementById('debug-hint-display');
    hintDisplay.style.display = 'block';
    hintDisplay.innerHTML = `
        <div class="hint-display">
            <span class="hint-icon">💡</span>
            <div>
                <strong>Hint:</strong>
                <p>${currentChallenge.hint}</p>
            </div>
        </div>
    `;
    
    document.getElementById('debug-hint-btn').disabled = true;
}

function submitDebugSolution() {
    const userCode = document.getElementById('debug-code').value;
    const normalizedUser = normalizeCSS(userCode);
    const normalizedFixed = normalizeCSS(currentChallenge.fixedCSS);
    
    const isCorrect = normalizedUser === normalizedFixed || 
                      compareCSS(userCode, currentChallenge.fixedCSS).accuracy >= 95;
    
    const container = document.getElementById('game-container');
    
    if (isCorrect) {
        // Mark as completed
        if (!gameState.debugStats.completed) gameState.debugStats.completed = [];
        if (!gameState.debugStats.completed.includes(currentChallenge.id)) {
            gameState.debugStats.completed.push(currentChallenge.id);
            const xpEarned = Math.max(10, XP_REWARDS.debugFixed - (debugHintsUsed * 20));
            gameState.addXP(xpEarned, 'Bug Fixed!');
        }
        
        // Check achievements
        if (gameState.debugStats.completed.length >= 5 && !gameState.hasAchievement('debugPro')) {
            gameState.unlockAchievement('debugPro');
        }
        if (gameState.debugStats.completed.length >= 10 && !gameState.hasAchievement('debugMaster')) {
            gameState.unlockAchievement('debugMaster');
        }
        
        gameState.save();
        
        container.innerHTML = `
            <div class="game-container">
                <div class="game-header">
                    <h1>🎉 Bug Fixed!</h1>
                </div>
                
                <div class="score-display">
                    <div class="score-value">✓</div>
                    <p style="color: var(--success);">Great detective work!</p>
                </div>
                
                <div class="challenge-card">
                    <h3>📚 Lesson Learned:</h3>
                    <p style="margin-top: 12px;">${currentChallenge.explanation}</p>
                </div>
                
                <div class="game-actions">
                    <button class="game-btn secondary" onclick="renderDebugDetectiveMenu()">← More Challenges</button>
                    ${currentChallenge.id < DEBUG_CHALLENGES.length ? `
                        <button class="game-btn primary" onclick="startDebugChallenge(${currentChallenge.id + 1})">Next Bug →</button>
                    ` : ''}
                </div>
            </div>
        `;
    } else {
        container.innerHTML = `
            <div class="game-container">
                <div class="game-header">
                    <h1>🤔 Not Quite Right</h1>
                </div>
                
                <div class="challenge-card">
                    <h3>Your Code:</h3>
                    <pre style="margin-top: 12px; background: var(--bg-dark); padding: 16px; border-radius: 8px;">${userCode}</pre>
                </div>
                
                <div class="challenge-card">
                    <h3>Expected Fix:</h3>
                    <pre style="margin-top: 12px; background: var(--bg-dark); padding: 16px; border-radius: 8px;">${currentChallenge.fixedCSS}</pre>
                </div>
                
                <div class="challenge-card">
                    <h3>📚 Explanation:</h3>
                    <p style="margin-top: 12px;">${currentChallenge.explanation}</p>
                </div>
                
                <div class="game-actions">
                    <button class="game-btn secondary" onclick="renderDebugDetectiveMenu()">← Back</button>
                    <button class="game-btn primary" onclick="startDebugChallenge(${currentChallenge.id})">🔄 Try Again</button>
                </div>
            </div>
        `;
    }
}

// ============== CLONE CHALLENGE ==============
function renderCloneChallengeMenu() {
    gameState.recordGameMode('cloneChallenge');
    const container = document.getElementById('game-container');
    
    container.innerHTML = `
        <div class="game-container">
            <div class="game-header">
                <h1>🎨 Clone Challenge</h1>
                <button class="game-btn secondary" onclick="backToLessons()">← Back to Lessons</button>
            </div>
            
            <div class="challenge-card">
                <h2>Recreate Real Layouts</h2>
                <p class="description">Clone famous website layouts using CSS Grid. Match the reference as closely as possible!</p>
            </div>
            
            <h3 style="margin-bottom: 16px;">Website Challenges</h3>
            <div class="challenge-list">
                ${CLONE_CHALLENGES.map(c => `
                    <div class="challenge-list-item ${gameState.cloneStats.completed?.includes(c.id) ? 'completed' : ''}" 
                         onclick="startCloneChallenge('${c.id}')">
                        <div class="info">
                            <span class="name">${c.name}</span>
                            <span class="meta">
                                <span class="difficulty difficulty-${c.difficulty}">${'⭐'.repeat(c.difficulty)}</span>
                                · ${c.description}
                            </span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function startCloneChallenge(challengeId) {
    const challenge = CLONE_CHALLENGES.find(c => c.id === challengeId);
    if (!challenge) return;
    
    currentChallenge = challenge;
    
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <div class="game-container">
            <div class="game-header">
                <h1>🎨 ${challenge.name}</h1>
                <span class="difficulty difficulty-${challenge.difficulty}">${'⭐'.repeat(challenge.difficulty)}</span>
            </div>
            
            <div class="challenge-card">
                <p class="description">${challenge.description}</p>
            </div>
            
            <div class="clone-reference">
                <h3>🎯 Reference Layout</h3>
                <div class="ref-preview" id="clone-reference">
                    <div style="${challenge.reference.match(/\{([^}]+)\}/)?.[1]?.replace(/\n/g, ' ') || ''}">
                        ${challenge.html}
                    </div>
                </div>
            </div>
            
            <div class="game-editor">
                <div class="code-panel">
                    <div class="panel-header">
                        <h4>Your CSS</h4>
                    </div>
                    <textarea id="clone-code" placeholder=".container {
    display: grid;
    /* Match the reference layout */
}">.container {
    display: grid;
    
}</textarea>
                </div>
                <div class="preview-panel">
                    <div class="panel-header">
                        <h4>Your Result</h4>
                    </div>
                    <div class="preview-content">
                        <div id="clone-preview">
                            ${challenge.html}
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="game-actions">
                <button class="game-btn secondary" onclick="renderCloneChallengeMenu()">← Back</button>
                <button class="game-btn primary" onclick="showCloneSolution()">👁️ Show Solution</button>
                <button class="game-btn success" onclick="submitCloneChallenge()">✓ Submit</button>
            </div>
        </div>
    `;
    
    // Set up live preview
    const codeEditor = document.getElementById('clone-code');
    codeEditor.addEventListener('input', updateClonePreview);
    addPreviewStyles();
}

function updateClonePreview() {
    const code = document.getElementById('clone-code').value;
    const preview = document.getElementById('clone-preview');
    
    const containerMatch = code.match(/\.container\s*\{([^}]+)\}/);
    if (containerMatch) {
        const styles = containerMatch[1]
            .split(';')
            .map(s => s.trim())
            .filter(s => s)
            .join('; ');
        preview.style.cssText = styles;
    }
}

function showCloneSolution() {
    const code = document.getElementById('clone-code');
    code.value = currentChallenge.reference;
    updateClonePreview();
}

function submitCloneChallenge() {
    const code = document.getElementById('clone-code').value;
    const result = compareCSS(code, currentChallenge.reference);
    
    if (result.accuracy >= 70) {
        if (!gameState.cloneStats.completed) gameState.cloneStats.completed = [];
        if (!gameState.cloneStats.completed.includes(currentChallenge.id)) {
            gameState.cloneStats.completed.push(currentChallenge.id);
            gameState.addXP(XP_REWARDS.cloneComplete, 'Clone Complete!');
            
            if (!gameState.hasAchievement('cloneWarrior')) {
                gameState.unlockAchievement('cloneWarrior');
            }
            
            if (gameState.cloneStats.completed.length >= 5 && !gameState.hasAchievement('cloneMaster')) {
                gameState.unlockAchievement('cloneMaster');
            }
        }
        gameState.save();
        
        const container = document.getElementById('game-container');
        container.innerHTML = `
            <div class="game-container">
                <div class="game-header">
                    <h1>🎉 Great Clone!</h1>
                </div>
                
                <div class="score-display">
                    <div class="score-value">${result.accuracy}%</div>
                    <p style="color: var(--success);">Accuracy</p>
                </div>
                
                <div class="game-actions">
                    <button class="game-btn secondary" onclick="renderCloneChallengeMenu()">← More Clones</button>
                </div>
            </div>
        `;
    } else {
        alert(`${result.accuracy}% accuracy - try to match the reference more closely!`);
    }
}

// ============== DAILY CHALLENGE ==============
function renderDailyChallenge() {
    gameState.recordGameMode('dailyChallenge');
    const challenge = getDailyChallenge();
    const isComplete = isDailyChallengeComplete();
    
    const container = document.getElementById('game-container');
    
    // Build calendar
    const today = new Date();
    const calendar = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const isCompleted = gameState.dailyStats.completed.includes(dateStr);
        const isToday = i === 0;
        calendar.push({ date: date.getDate(), completed: isCompleted, isToday });
    }
    
    container.innerHTML = `
        <div class="game-container">
            <div class="game-header">
                <h1>📅 Daily Challenge</h1>
                <button class="game-btn secondary" onclick="backToLessons()">← Back</button>
            </div>
            
            <div class="streak-display">
                <span class="fire-emoji">🔥</span>
                <div>
                    <div class="streak-number">${gameState.dailyStats.currentStreak || 0}</div>
                    <div class="streak-label">Day Streak</div>
                </div>
            </div>
            
            <div class="daily-calendar">
                ${calendar.map(d => `
                    <div class="calendar-day ${d.completed ? 'completed' : ''} ${d.isToday ? 'today' : ''}">
                        ${d.date}
                    </div>
                `).join('')}
            </div>
            
            <div class="challenge-card">
                <h2>Today's Challenge: ${challenge.name}</h2>
                <p class="description">${challenge.description || 'Complete today\'s challenge!'}</p>
                <span class="difficulty difficulty-${challenge.difficulty || 2}">
                    Type: ${challenge.type === 'gridBattle' ? '⚔️ Grid Battle' : 
                           challenge.type === 'debug' ? '🔍 Debug' : '🎨 Clone'}
                </span>
            </div>
            
            ${isComplete ? `
                <div class="score-display">
                    <div class="score-value">✓</div>
                    <p style="color: var(--success);">Completed! Come back tomorrow.</p>
                </div>
                <button class="share-btn" onclick="shareDailyResult()" style="margin: 20px auto; display: flex;">
                    📤 Share Result
                </button>
            ` : `
                <div class="game-actions">
                    <button class="game-btn primary" onclick="startDailyChallenge()">
                        Start Today's Challenge
                    </button>
                </div>
            `}
        </div>
    `;
}

function startDailyChallenge() {
    const challenge = getDailyChallenge();
    
    switch(challenge.type) {
        case 'gridBattle':
            startGridBattle(challenge.id);
            break;
        case 'debug':
            startDebugChallenge(challenge.id);
            break;
        case 'clone':
            startCloneChallenge(challenge.id);
            break;
    }
    
    // Mark as complete when done
    completeDailyChallenge();
}

function shareDailyResult() {
    const streak = gameState.dailyStats.currentStreak;
    const text = `🎮 CSS Grid Mastery Daily Challenge\n🔥 ${streak} day streak!\n\nLearn CSS Grid: https://tsotne01.github.io/css-grid-mastery/`;
    
    if (navigator.share) {
        navigator.share({ text });
    } else {
        navigator.clipboard.writeText(text);
        alert('Result copied to clipboard!');
    }
}

// ============== ACHIEVEMENTS ==============
function renderAchievements() {
    const container = document.getElementById('game-container');
    
    const achievementList = Object.values(ACHIEVEMENTS);
    
    container.innerHTML = `
        <div class="game-container">
            <div class="game-header">
                <h1>🏆 Achievements</h1>
                <button class="game-btn secondary" onclick="backToLessons()">← Back</button>
            </div>
            
            <div class="challenge-card">
                <h2>Your Progress</h2>
                <p class="description">
                    ${gameState.achievements.length} / ${achievementList.length} achievements unlocked
                </p>
                <div class="stat-xp-bar" style="margin-top: 12px;">
                    <div class="fill" style="width: ${(gameState.achievements.length / achievementList.length) * 100}%"></div>
                </div>
            </div>
            
            <div class="achievements-grid">
                ${achievementList.map(a => `
                    <div class="achievement-card ${gameState.hasAchievement(a.id) ? 'unlocked' : 'locked'}">
                        <div class="achievement-icon">${a.emoji}</div>
                        <div class="achievement-name">${a.name}</div>
                        <div class="achievement-desc">${a.description}</div>
                        <div style="margin-top: 8px; color: var(--accent); font-size: 0.85rem;">
                            +${a.xpReward} XP
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// ============== PUZZLE MODE ==============
// Drag and drop CSS properties to correct places

const PUZZLE_CHALLENGES = [
    {
        id: 1,
        name: "Basic Grid Setup",
        description: "Arrange the properties to create a 3-column grid",
        blanks: ["display: ___", "grid-template-columns: ___", "gap: ___"],
        options: ["grid", "repeat(3, 1fr)", "20px", "flex", "auto", "10%"],
        correctAnswers: ["grid", "repeat(3, 1fr)", "20px"],
        xp: 30
    },
    {
        id: 2,
        name: "Spanning Columns",
        description: "Make an item span 2 columns",
        blanks: ["grid-column: ___"],
        options: ["span 2", "1 / 3", "2", "auto"],
        correctAnswers: ["span 2"],
        xp: 25
    },
    {
        id: 3,
        name: "Grid Areas",
        description: "Complete the grid area setup",
        blanks: ["grid-template-areas: ___", "grid-area: ___"],
        options: ["'header header' 'sidebar main'", "header", "'a b' 'c d'", "main"],
        correctAnswers: ["'header header' 'sidebar main'", "header"],
        xp: 40
    },
    {
        id: 4,
        name: "Alignment Magic",
        description: "Center items both horizontally and vertically",
        blanks: ["place-items: ___"],
        options: ["center", "start", "end", "stretch"],
        correctAnswers: ["center"],
        xp: 20
    },
    {
        id: 5,
        name: "Responsive Grid",
        description: "Create an auto-responsive grid",
        blanks: ["grid-template-columns: repeat(___, minmax(200px, 1fr))"],
        options: ["auto-fit", "auto-fill", "3", "auto"],
        correctAnswers: ["auto-fit"],
        xp: 35
    }
];

let currentPuzzle = null;
let puzzleAnswers = [];

function renderPuzzleMode() {
    gameState.recordGameMode('puzzleMode');
    const container = document.getElementById('game-container');
    
    const completedPuzzles = gameState.gridBattleStats.puzzlesCompleted || [];
    
    container.innerHTML = `
        <div class="game-container">
            <div class="game-header">
                <h1>🧩 Puzzle Mode</h1>
                <button class="game-btn secondary" onclick="backToLessons()">← Back</button>
            </div>
            
            <div class="challenge-card">
                <h2>Drag & Drop CSS</h2>
                <p class="description">Drag the correct CSS values into the blanks to complete each grid layout. Test your CSS Grid knowledge!</p>
                <div style="margin-top: 16px;">
                    <strong>${completedPuzzles.length}/${PUZZLE_CHALLENGES.length}</strong> puzzles solved
                </div>
            </div>
            
            <div class="challenge-list">
                ${PUZZLE_CHALLENGES.map(puzzle => `
                    <div class="challenge-item ${completedPuzzles.includes(puzzle.id) ? 'completed' : ''}" 
                         onclick="startPuzzle(${puzzle.id})">
                        <div class="challenge-info">
                            <span class="challenge-name">${puzzle.name}</span>
                            <span class="challenge-desc">${puzzle.description}</span>
                        </div>
                        <div class="challenge-meta">
                            <span class="xp-badge">+${puzzle.xp} XP</span>
                            ${completedPuzzles.includes(puzzle.id) ? '<span class="completed-badge">✓</span>' : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // Play sound
    if (window.sounds) window.sounds.playClick();
}

function startPuzzle(puzzleId) {
    currentPuzzle = PUZZLE_CHALLENGES.find(p => p.id === puzzleId);
    if (!currentPuzzle) return;
    
    puzzleAnswers = new Array(currentPuzzle.blanks.length).fill(null);
    
    const container = document.getElementById('game-container');
    
    container.innerHTML = `
        <div class="game-container puzzle-game">
            <div class="game-header">
                <h1>🧩 ${currentPuzzle.name}</h1>
                <button class="game-btn secondary" onclick="renderPuzzleMode()">← Back</button>
            </div>
            
            <p class="description">${currentPuzzle.description}</p>
            
            <div class="puzzle-blanks">
                ${currentPuzzle.blanks.map((blank, i) => `
                    <div class="puzzle-line">
                        <code>${blank.replace('___', `<span class="puzzle-blank" data-index="${i}" 
                            ondragover="event.preventDefault()" 
                            ondrop="dropAnswer(event, ${i})">${puzzleAnswers[i] || '___'}</span>`)}</code>
                    </div>
                `).join('')}
            </div>
            
            <div class="puzzle-options" id="puzzle-options">
                ${currentPuzzle.options.map(opt => `
                    <div class="puzzle-option" draggable="true" 
                         ondragstart="dragAnswer(event, '${opt}')"
                         onclick="selectAnswer('${opt}')">
                        ${opt}
                    </div>
                `).join('')}
            </div>
            
            <button class="game-btn primary" onclick="checkPuzzle()">Check Answer</button>
        </div>
    `;
    
    if (window.sounds) window.sounds.playStart();
}

let selectedAnswer = null;

function selectAnswer(answer) {
    selectedAnswer = answer;
    document.querySelectorAll('.puzzle-option').forEach(el => {
        el.classList.toggle('selected', el.textContent.trim() === answer);
    });
}

function dragAnswer(event, answer) {
    event.dataTransfer.setData('text/plain', answer);
}

function dropAnswer(event, index) {
    event.preventDefault();
    const answer = event.dataTransfer.getData('text/plain');
    puzzleAnswers[index] = answer;
    updatePuzzleUI();
}

function updatePuzzleUI() {
    document.querySelectorAll('.puzzle-blank').forEach((el, i) => {
        el.textContent = puzzleAnswers[i] || '___';
        el.classList.toggle('filled', !!puzzleAnswers[i]);
    });
}

function checkPuzzle() {
    if (!currentPuzzle) return;
    
    const correct = currentPuzzle.correctAnswers.every((answer, i) => 
        puzzleAnswers[i] === answer || 
        (Array.isArray(answer) && answer.includes(puzzleAnswers[i]))
    );
    
    if (correct) {
        // Mark completed
        if (!gameState.gridBattleStats.puzzlesCompleted) {
            gameState.gridBattleStats.puzzlesCompleted = [];
        }
        if (!gameState.gridBattleStats.puzzlesCompleted.includes(currentPuzzle.id)) {
            gameState.gridBattleStats.puzzlesCompleted.push(currentPuzzle.id);
            gameState.addXP(currentPuzzle.xp, 'puzzle');
        }
        
        if (window.sounds) window.sounds.playSuccess();
        if (window.particles) window.particles.celebrate();
        
        showPuzzleResult(true);
    } else {
        if (window.sounds) window.sounds.playError();
        showPuzzleResult(false);
    }
}

function showPuzzleResult(success) {
    const resultDiv = document.createElement('div');
    resultDiv.className = `puzzle-result ${success ? 'success' : 'error'}`;
    resultDiv.innerHTML = success 
        ? `<h3>🎉 Correct!</h3><p>+${currentPuzzle.xp} XP</p><button class="game-btn primary" onclick="renderPuzzleMode()">Continue</button>`
        : `<h3>❌ Not quite right</h3><p>Try again!</p><button class="game-btn secondary" onclick="this.parentElement.remove()">Retry</button>`;
    document.querySelector('.puzzle-game').appendChild(resultDiv);
}

// ============== SURVIVAL MODE ==============
// Endless challenges, 3 lives

let survivalState = {
    lives: 3,
    score: 0,
    streak: 0,
    currentChallenge: null,
    challengeIndex: 0
};

function renderSurvivalMode() {
    gameState.recordGameMode('survivalMode');
    const container = document.getElementById('game-container');
    
    const highScore = gameState.gridBattleStats.survivalHighScore || 0;
    
    container.innerHTML = `
        <div class="game-container">
            <div class="game-header">
                <h1>💀 Survival Mode</h1>
                <button class="game-btn secondary" onclick="backToLessons()">← Back</button>
            </div>
            
            <div class="challenge-card survival-intro">
                <h2>Can You Survive?</h2>
                <p class="description">Endless CSS Grid challenges. You have 3 lives. One wrong answer = lose a life. How far can you go?</p>
                
                <div class="survival-stats">
                    <div class="survival-stat">
                        <span class="label">High Score</span>
                        <span class="value">${highScore}</span>
                    </div>
                    <div class="survival-stat">
                        <span class="label">Lives</span>
                        <span class="value">❤️❤️❤️</span>
                    </div>
                </div>
                
                <button class="game-btn primary large" onclick="startSurvivalMode()">
                    Start Survival
                </button>
            </div>
        </div>
    `;
    
    if (window.sounds) window.sounds.playClick();
}

function startSurvivalMode() {
    survivalState = {
        lives: 3,
        score: 0,
        streak: 0,
        currentChallenge: null,
        challengeIndex: 0
    };
    
    nextSurvivalChallenge();
    if (window.sounds) window.sounds.playStart();
}

function nextSurvivalChallenge() {
    // Mix all challenges
    const allChallenges = [...GRID_BATTLE_CHALLENGES, ...DEBUG_CHALLENGES.map(d => ({
        ...d,
        type: 'debug',
        targetCSS: d.buggyCSS
    }))];
    
    // Pick a random one
    survivalState.currentChallenge = allChallenges[Math.floor(Math.random() * allChallenges.length)];
    survivalState.challengeIndex++;
    
    renderSurvivalChallenge();
}

function renderSurvivalChallenge() {
    const challenge = survivalState.currentChallenge;
    const container = document.getElementById('game-container');
    
    const livesHTML = '❤️'.repeat(survivalState.lives) + '🖤'.repeat(3 - survivalState.lives);
    
    container.innerHTML = `
        <div class="game-container survival-active">
            <div class="survival-header">
                <div class="survival-lives">${livesHTML}</div>
                <div class="survival-score">Score: ${survivalState.score}</div>
                <div class="survival-streak">🔥 ${survivalState.streak}</div>
            </div>
            
            <div class="survival-challenge">
                <h2>Challenge #${survivalState.challengeIndex}</h2>
                ${challenge.type === 'debug' ? `
                    <p class="description">Find and fix the bug!</p>
                    <div class="code-display">
                        <pre><code>${challenge.buggyCSS}</code></pre>
                    </div>
                    <div class="bug-options">
                        ${generateBugOptions(challenge).map((opt, i) => `
                            <button class="game-btn bug-option" onclick="checkSurvivalAnswer('${opt}', ${i})">
                                ${opt}
                            </button>
                        `).join('')}
                    </div>
                ` : `
                    <p class="description">${challenge.description}</p>
                    <div class="target-preview">
                        <style>${challenge.targetCSS}</style>
                        <div class="grid-preview" style="${challenge.targetCSS.match(/\.container\s*\{([^}]+)\}/)?.[1] || ''}">
                            ${Array(challenge.gridItems || 6).fill(0).map((_, i) => 
                                `<div class="grid-item">${i + 1}</div>`
                            ).join('')}
                        </div>
                    </div>
                    <textarea id="survival-code" class="code-editor" placeholder="Write your CSS...">${challenge.defaultCode || '.container {\n    display: grid;\n    \n}'}</textarea>
                    <button class="game-btn primary" onclick="checkSurvivalCode()">Submit</button>
                `}
            </div>
        </div>
    `;
}

function generateBugOptions(challenge) {
    // Generate multiple choice options including the correct fix
    const correct = challenge.correctCSS.split(';')[0].trim();
    const options = [correct];
    
    const fakeOptions = [
        'grid-template-columns: auto',
        'display: flex',
        'gap: 0',
        'grid-auto-flow: dense',
        'justify-items: end'
    ];
    
    while (options.length < 4) {
        const fake = fakeOptions[Math.floor(Math.random() * fakeOptions.length)];
        if (!options.includes(fake)) {
            options.push(fake);
        }
    }
    
    // Shuffle
    return options.sort(() => Math.random() - 0.5);
}

function checkSurvivalAnswer(answer, index) {
    const challenge = survivalState.currentChallenge;
    const correct = challenge.correctCSS.includes(answer);
    
    if (correct) {
        survivalState.score += 100 * (1 + survivalState.streak * 0.1);
        survivalState.streak++;
        
        if (window.sounds) window.sounds.playSuccess();
        if (window.particles) {
            const btn = document.querySelectorAll('.bug-option')[index];
            const rect = btn.getBoundingClientRect();
            window.particles.xpParticles(rect.left + rect.width/2, rect.top);
        }
        
        setTimeout(() => nextSurvivalChallenge(), 500);
    } else {
        survivalState.lives--;
        survivalState.streak = 0;
        
        if (window.sounds) window.sounds.playError();
        
        if (survivalState.lives <= 0) {
            endSurvivalMode();
        } else {
            // Show wrong answer feedback
            document.querySelectorAll('.bug-option')[index].classList.add('wrong');
            setTimeout(() => nextSurvivalChallenge(), 1000);
        }
    }
}

function checkSurvivalCode() {
    const code = document.getElementById('survival-code').value;
    const challenge = survivalState.currentChallenge;
    
    // Simple validation
    const requiredProps = (challenge.targetCSS.match(/[a-z-]+:/g) || [])
        .map(p => p.replace(':', ''));
    
    const hasRequired = requiredProps.every(prop => code.includes(prop));
    
    if (hasRequired) {
        survivalState.score += challenge.xp || 50;
        survivalState.streak++;
        
        if (window.sounds) window.sounds.playSuccess();
        setTimeout(() => nextSurvivalChallenge(), 500);
    } else {
        survivalState.lives--;
        survivalState.streak = 0;
        
        if (window.sounds) window.sounds.playError();
        
        if (survivalState.lives <= 0) {
            endSurvivalMode();
        } else {
            setTimeout(() => nextSurvivalChallenge(), 1000);
        }
    }
}

function endSurvivalMode() {
    const container = document.getElementById('game-container');
    
    // Update high score
    if (survivalState.score > (gameState.gridBattleStats.survivalHighScore || 0)) {
        gameState.gridBattleStats.survivalHighScore = survivalState.score;
        gameState.save();
    }
    
    // Award XP based on score
    const xpEarned = Math.floor(survivalState.score / 10);
    gameState.addXP(xpEarned, 'survival');
    
    if (window.sounds) window.sounds.playLevelUp();
    if (window.particles) window.particles.celebrate();
    
    container.innerHTML = `
        <div class="game-container">
            <div class="game-over">
                <h1>💀 Game Over</h1>
                <div class="final-score">
                    <div class="score-value">${survivalState.score}</div>
                    <div class="score-label">Final Score</div>
                </div>
                <div class="game-over-stats">
                    <div class="stat">
                        <span class="label">Challenges Completed</span>
                        <span class="value">${survivalState.challengeIndex - 1}</span>
                    </div>
                    <div class="stat">
                        <span class="label">XP Earned</span>
                        <span class="value">+${xpEarned}</span>
                    </div>
                    <div class="stat">
                        <span class="label">High Score</span>
                        <span class="value">${gameState.gridBattleStats.survivalHighScore}</span>
                    </div>
                </div>
                <div class="game-over-buttons">
                    <button class="game-btn primary" onclick="startSurvivalMode()">Try Again</button>
                    <button class="game-btn secondary" onclick="renderSurvivalMode()">Back to Menu</button>
                </div>
            </div>
        </div>
    `;
}

// ============== SPEED RUN MODE ==============
// Complete all basics in minimum time

let speedRunState = {
    startTime: null,
    currentIndex: 0,
    completed: [],
    totalTime: 0
};

const SPEED_RUN_CHALLENGES = GRID_BATTLE_CHALLENGES.filter(c => c.id <= 10);

function renderSpeedRun() {
    gameState.recordGameMode('speedRun');
    const container = document.getElementById('game-container');
    
    const bestTime = gameState.gridBattleStats.speedRunBestTime;
    const bestTimeFormatted = bestTime ? formatSpeedRunTime(bestTime) : '--:--';
    
    container.innerHTML = `
        <div class="game-container">
            <div class="game-header">
                <h1>⏱️ Speed Run</h1>
                <button class="game-btn secondary" onclick="backToLessons()">← Back</button>
            </div>
            
            <div class="challenge-card speedrun-intro">
                <h2>Race Against Time!</h2>
                <p class="description">Complete all 10 basic Grid challenges as fast as possible. Your time starts when you click Start!</p>
                
                <div class="speedrun-stats">
                    <div class="speedrun-stat">
                        <span class="label">Best Time</span>
                        <span class="value" id="best-time">${bestTimeFormatted}</span>
                    </div>
                    <div class="speedrun-stat">
                        <span class="label">Challenges</span>
                        <span class="value">${SPEED_RUN_CHALLENGES.length}</span>
                    </div>
                </div>
                
                <button class="game-btn primary large" onclick="startSpeedRun()">
                    🏁 Start Speed Run
                </button>
            </div>
        </div>
    `;
    
    if (window.sounds) window.sounds.playClick();
}

function startSpeedRun() {
    speedRunState = {
        startTime: Date.now(),
        currentIndex: 0,
        completed: [],
        totalTime: 0
    };
    
    if (window.sounds) window.sounds.playStart();
    renderSpeedRunChallenge();
}

function renderSpeedRunChallenge() {
    const challenge = SPEED_RUN_CHALLENGES[speedRunState.currentIndex];
    if (!challenge) {
        finishSpeedRun();
        return;
    }
    
    const container = document.getElementById('game-container');
    const elapsed = Date.now() - speedRunState.startTime;
    
    container.innerHTML = `
        <div class="game-container speedrun-active">
            <div class="speedrun-header">
                <div class="speedrun-timer" id="speedrun-timer">${formatSpeedRunTime(elapsed)}</div>
                <div class="speedrun-progress">
                    ${speedRunState.currentIndex + 1} / ${SPEED_RUN_CHALLENGES.length}
                </div>
            </div>
            
            <div class="speedrun-challenge">
                <h3>${challenge.name}</h3>
                <p>${challenge.description}</p>
                
                <div class="target-preview">
                    <style>${challenge.targetCSS}</style>
                    <div class="grid-preview" style="${challenge.targetCSS.match(/\.container\s*\{([^}]+)\}/)?.[1] || ''}">
                        ${Array(challenge.gridItems || 6).fill(0).map((_, i) => 
                            `<div class="grid-item">${i + 1}</div>`
                        ).join('')}
                    </div>
                </div>
                
                <textarea id="speedrun-code" class="code-editor">${challenge.defaultCode || '.container {\n    display: grid;\n    \n}'}</textarea>
                
                <div class="speedrun-buttons">
                    <button class="game-btn primary" onclick="submitSpeedRunChallenge()">Next →</button>
                    <button class="game-btn secondary" onclick="skipSpeedRunChallenge()">Skip</button>
                </div>
            </div>
        </div>
    `;
    
    // Start timer update
    updateSpeedRunTimer();
}

let speedRunTimerInterval = null;

function updateSpeedRunTimer() {
    if (speedRunTimerInterval) clearInterval(speedRunTimerInterval);
    
    speedRunTimerInterval = setInterval(() => {
        const elapsed = Date.now() - speedRunState.startTime;
        const timerEl = document.getElementById('speedrun-timer');
        if (timerEl) {
            timerEl.textContent = formatSpeedRunTime(elapsed);
        }
    }, 100);
}

function formatSpeedRunTime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const tenths = Math.floor((ms % 1000) / 100);
    return `${minutes}:${secs.toString().padStart(2, '0')}.${tenths}`;
}

function submitSpeedRunChallenge() {
    const challenge = SPEED_RUN_CHALLENGES[speedRunState.currentIndex];
    const code = document.getElementById('speedrun-code').value;
    
    // Basic validation - check if required properties are present
    const requiredProps = ['grid', 'grid-template'];
    const hasBasics = requiredProps.some(prop => code.includes(prop));
    
    if (hasBasics) {
        speedRunState.completed.push(challenge.id);
        if (window.sounds) window.sounds.playSuccess();
    } else {
        if (window.sounds) window.sounds.playError();
    }
    
    speedRunState.currentIndex++;
    renderSpeedRunChallenge();
}

function skipSpeedRunChallenge() {
    speedRunState.currentIndex++;
    if (window.sounds) window.sounds.playClick();
    renderSpeedRunChallenge();
}

function finishSpeedRun() {
    if (speedRunTimerInterval) clearInterval(speedRunTimerInterval);
    
    const totalTime = Date.now() - speedRunState.startTime;
    const completedCount = speedRunState.completed.length;
    const xpEarned = completedCount * 25;
    
    // Update best time
    if (completedCount === SPEED_RUN_CHALLENGES.length) {
        const currentBest = gameState.gridBattleStats.speedRunBestTime;
        if (!currentBest || totalTime < currentBest) {
            gameState.gridBattleStats.speedRunBestTime = totalTime;
            gameState.save();
        }
    }
    
    gameState.addXP(xpEarned, 'speedrun');
    
    if (window.sounds) window.sounds.playLevelUp();
    if (window.particles) window.particles.celebrate();
    
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <div class="game-container">
            <div class="speedrun-finish">
                <h1>🏁 Finished!</h1>
                
                <div class="finish-time">
                    <div class="time-value">${formatSpeedRunTime(totalTime)}</div>
                    <div class="time-label">Total Time</div>
                </div>
                
                <div class="finish-stats">
                    <div class="stat">
                        <span class="value">${completedCount}/${SPEED_RUN_CHALLENGES.length}</span>
                        <span class="label">Completed</span>
                    </div>
                    <div class="stat">
                        <span class="value">+${xpEarned}</span>
                        <span class="label">XP Earned</span>
                    </div>
                </div>
                
                ${completedCount === SPEED_RUN_CHALLENGES.length && totalTime === gameState.gridBattleStats.speedRunBestTime ? `
                    <div class="new-record">🎉 New Personal Best!</div>
                ` : ''}
                
                <div class="finish-buttons">
                    <button class="game-btn primary" onclick="startSpeedRun()">Try Again</button>
                    <button class="game-btn secondary" onclick="renderSpeedRun()">Back to Menu</button>
                </div>
            </div>
        </div>
    `;
}

// ============== ANALYTICS VIEW ==============
function renderAnalytics() {
    gameState.recordGameMode('analytics');
    const container = document.getElementById('game-container');
    
    if (window.analytics) {
        container.innerHTML = `
            <div class="game-container">
                <div class="game-header">
                    <h1>📊 My Stats</h1>
                    <button class="game-btn secondary" onclick="backToLessons()">← Back</button>
                </div>
                ${window.analytics.renderDashboard()}
            </div>
        `;
    } else {
        container.innerHTML = `
            <div class="game-container">
                <div class="game-header">
                    <h1>📊 My Stats</h1>
                    <button class="game-btn secondary" onclick="backToLessons()">← Back</button>
                </div>
                <p>Analytics not available.</p>
            </div>
        `;
    }
}

// ============== INITIALIZATION ==============
document.addEventListener('DOMContentLoaded', () => {
    // Update player stats on load
    if (typeof gameState !== 'undefined') {
        gameState.updateUI();
    }
});

// Update loadGameMode to handle new modes
const originalLoadGameMode = loadGameMode;
loadGameMode = function(mode) {
    currentGameMode = mode;
    
    // Hide lesson container, show game container
    document.getElementById('lesson-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    
    // Update nav
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelectorAll('.game-mode-btn').forEach(b => b.classList.remove('active'));
    event?.target?.closest('.game-mode-btn')?.classList.add('active');
    
    // Update game state
    if (typeof gameState !== 'undefined') {
        gameState.updateUI();
    }
    
    // Render appropriate mode
    switch(mode) {
        case 'gridBattle':
            renderGridBattleMenu();
            break;
        case 'debugDetective':
            renderDebugDetectiveMenu();
            break;
        case 'cloneChallenge':
            renderCloneChallengeMenu();
            break;
        case 'puzzleMode':
            renderPuzzleMode();
            break;
        case 'survivalMode':
            renderSurvivalMode();
            break;
        case 'speedRun':
            renderSpeedRun();
            break;
        case 'dailyChallenge':
            renderDailyChallenge();
            break;
        case 'achievements':
            renderAchievements();
            break;
        case 'analytics':
            renderAnalytics();
            break;
    }
};

// Export functions
window.loadGameMode = loadGameMode;
window.backToLessons = backToLessons;
window.startGridBattle = startGridBattle;
window.submitGridBattle = submitGridBattle;
window.showBattleHint = showBattleHint;
window.renderGridBattleMenu = renderGridBattleMenu;
window.renderDebugDetectiveMenu = renderDebugDetectiveMenu;
window.startDebugChallenge = startDebugChallenge;
window.showDebugHint = showDebugHint;
window.submitDebugSolution = submitDebugSolution;
window.renderCloneChallengeMenu = renderCloneChallengeMenu;
window.startCloneChallenge = startCloneChallenge;
window.showCloneSolution = showCloneSolution;
window.submitCloneChallenge = submitCloneChallenge;
window.renderDailyChallenge = renderDailyChallenge;
window.startDailyChallenge = startDailyChallenge;
window.shareDailyResult = shareDailyResult;
window.renderAchievements = renderAchievements;
window.renderPuzzleMode = renderPuzzleMode;
window.startPuzzle = startPuzzle;
window.checkPuzzle = checkPuzzle;
window.renderSurvivalMode = renderSurvivalMode;
window.startSurvivalMode = startSurvivalMode;
window.renderSpeedRun = renderSpeedRun;
window.startSpeedRun = startSpeedRun;
window.renderAnalytics = renderAnalytics;

console.log('🎮 Game modes loaded!');
