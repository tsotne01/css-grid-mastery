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
function renderGridBattleMenu() {
    gameState.recordGameMode('gridBattle');
    const container = document.getElementById('game-container');
    
    const completedBattles = gameState.gridBattleStats.played || 0;
    
    container.innerHTML = `
        <div class="game-container">
            <div class="game-header">
                <h1>⚔️ Grid Battle</h1>
                <button class="game-btn secondary" onclick="backToLessons()">← Back to Lessons</button>
            </div>
            
            <div class="challenge-card">
                <h2>Time Attack Mode</h2>
                <p class="description">Race against the clock to recreate CSS Grid layouts. The faster and more accurate you are, the higher your score!</p>
                <div style="display: flex; gap: 12px; margin-top: 16px;">
                    <span class="difficulty difficulty-1">⚡ Speed Bonus</span>
                    <span class="difficulty difficulty-2">🎯 Accuracy Points</span>
                    <span class="difficulty difficulty-3">💯 Perfect Bonus</span>
                </div>
            </div>
            
            <h3 style="margin-bottom: 16px;">Select Challenge</h3>
            <div class="challenge-list">
                ${GRID_BATTLE_CHALLENGES.map((c, i) => `
                    <div class="challenge-list-item ${gameState.gridBattleStats.completed?.includes(c.id) ? 'completed' : ''}" 
                         onclick="startGridBattle(${c.id})">
                        <div class="info">
                            <span class="name">${c.name}</span>
                            <span class="meta">
                                <span class="difficulty difficulty-${c.difficulty}">${'⭐'.repeat(c.difficulty)}</span>
                                · ${c.timeLimit}s time limit
                            </span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

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

// ============== INITIALIZATION ==============
document.addEventListener('DOMContentLoaded', () => {
    // Update player stats on load
    if (typeof gameState !== 'undefined') {
        gameState.updateUI();
    }
});

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

console.log('🎮 Game modes loaded!');
