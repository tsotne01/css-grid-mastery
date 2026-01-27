// CSS Grid Mastery - Application Logic

let currentLesson = 'intro';
const totalLessons = 21;

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Load initial lesson
    loadLesson('intro');
    
    // Set up navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const lessonId = link.dataset.lesson;
            loadLesson(lessonId);
            
            // Update active state
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
});

// Load a lesson
function loadLesson(lessonId) {
    const lesson = lessons[lessonId];
    if (!lesson) return;
    
    // Mark previous lesson as complete (if not a challenge)
    if (currentLesson && !currentLesson.startsWith('challenge')) {
        markComplete(currentLesson);
    }
    
    currentLesson = lessonId;
    
    // Build lesson HTML
    const container = document.getElementById('lesson-container');
    
    // Get previous/next lessons
    const currentIndex = lessonOrder.indexOf(lessonId);
    const prevLesson = currentIndex > 0 ? lessonOrder[currentIndex - 1] : null;
    const nextLesson = currentIndex < lessonOrder.length - 1 ? lessonOrder[currentIndex + 1] : null;
    
    container.innerHTML = `
        <div class="lesson">
            <div class="lesson-header">
                <h1>${lesson.title}</h1>
                <p class="subtitle">${lesson.subtitle}</p>
            </div>
            <div class="lesson-content">
                ${lesson.content}
            </div>
            <div class="lesson-nav">
                ${prevLesson ? `
                    <button class="lesson-nav-btn" onclick="navigateTo('${prevLesson}')">
                        <span>←</span>
                        <div>
                            <div class="direction">Previous</div>
                            <div class="title">${lessons[prevLesson].title}</div>
                        </div>
                    </button>
                ` : '<div></div>'}
                ${nextLesson ? `
                    <button class="lesson-nav-btn" onclick="navigateTo('${nextLesson}')">
                        <div>
                            <div class="direction">Next</div>
                            <div class="title">${lessons[nextLesson].title}</div>
                        </div>
                        <span>→</span>
                    </button>
                ` : '<div></div>'}
            </div>
        </div>
    `;
    
    // Set up code editor listeners
    const codeEditor = document.getElementById(`code-${lessonId}`);
    if (codeEditor) {
        codeEditor.addEventListener('input', () => {
            updatePreview(lessonId);
        });
        // Initial preview
        setTimeout(() => updatePreview(lessonId), 100);
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Navigate to a lesson
function navigateTo(lessonId) {
    loadLesson(lessonId);
    
    // Update nav
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.lesson === lessonId);
    });
}

// Update preview based on code
function updatePreview(lessonId) {
    const codeEditor = document.getElementById(`code-${lessonId}`);
    const preview = document.getElementById(`preview-${lessonId}`);
    
    if (!codeEditor || !preview) return;
    
    const css = codeEditor.value;
    
    // Parse and apply CSS
    try {
        // Extract container styles
        const containerMatch = css.match(/\.container\s*\{([^}]+)\}/);
        if (containerMatch) {
            const styles = containerMatch[1];
            preview.style.cssText = parseStyles(styles);
        }
        
        // Extract item-specific styles
        const itemMatches = css.matchAll(/\.(item-\d+|featured|wide|full-width)\s*\{([^}]+)\}/g);
        for (const match of itemMatches) {
            const className = match[1];
            const styles = match[2];
            const items = preview.querySelectorAll(`.grid-item`);
            
            // Apply based on class name
            if (className === 'item-1' && items[0]) {
                items[0].style.cssText += parseStyles(styles);
            } else if (className === 'featured' && items[0]) {
                items[0].style.cssText += parseStyles(styles);
            }
        }
    } catch (e) {
        console.error('CSS parse error:', e);
    }
}

// Parse CSS styles string into inline style format
function parseStyles(cssText) {
    return cssText
        .split(';')
        .map(rule => rule.trim())
        .filter(rule => rule.length > 0)
        .join('; ') + ';';
}

// Reset code to default
function resetCode(lessonId) {
    const lesson = lessons[lessonId];
    const codeEditor = document.getElementById(`code-${lessonId}`);
    
    if (lesson && codeEditor) {
        codeEditor.value = lesson.defaultCode;
        updatePreview(lessonId);
    }
}

// Show solution for challenges
function showSolution(lessonId) {
    const lesson = lessons[lessonId];
    const codeEditor = document.getElementById(`code-${lessonId}`);
    
    if (lesson && lesson.solution && codeEditor) {
        codeEditor.value = lesson.solution;
        updatePreview(lessonId);
    }
}

// Interactive control functions
function updateGap() {
    const rowGap = document.getElementById('row-gap-slider')?.value || 20;
    const colGap = document.getElementById('col-gap-slider')?.value || 20;
    
    document.getElementById('row-gap-value').textContent = `${rowGap}px`;
    document.getElementById('col-gap-value').textContent = `${colGap}px`;
    
    const preview = document.getElementById('preview-gap');
    if (preview) {
        preview.style.rowGap = `${rowGap}px`;
        preview.style.columnGap = `${colGap}px`;
    }
    
    // Update code editor
    const codeEditor = document.getElementById('code-gap');
    if (codeEditor) {
        codeEditor.value = `.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${rowGap}px ${colGap}px;
}`;
    }
}

function setJustifyItems(value) {
    const preview = document.getElementById('preview-justify-items');
    if (preview) {
        preview.style.justifyItems = value;
    }
    
    // Update buttons
    document.querySelectorAll('#justify-items .control-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent === value);
    });
    
    // Update code
    const codeEditor = document.getElementById('code-justify-items');
    if (codeEditor) {
        codeEditor.value = `.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    justify-items: ${value};
}`;
    }
}

function setAlignItems(value) {
    const preview = document.getElementById('preview-align-items');
    if (preview) {
        preview.style.alignItems = value;
    }
    
    // Update code
    const codeEditor = document.getElementById('code-align-items');
    if (codeEditor) {
        codeEditor.value = `.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 100px);
    gap: 10px;
    align-items: ${value};
}`;
    }
}

function setJustifyContent(value) {
    const preview = document.getElementById('preview-justify-content');
    if (preview) {
        preview.style.justifyContent = value;
    }
    
    // Update buttons
    document.querySelectorAll('.control-btn').forEach(btn => {
        if (btn.onclick?.toString().includes('setJustifyContent')) {
            btn.classList.toggle('active', btn.textContent === value);
        }
    });
    
    // Update code
    const codeEditor = document.getElementById('code-justify-content');
    if (codeEditor) {
        codeEditor.value = `.container {
    display: grid;
    grid-template-columns: repeat(3, 80px);
    gap: 10px;
    justify-content: ${value};
}`;
    }
}

function setAlignContent(value) {
    const preview = document.getElementById('preview-align-content');
    if (preview) {
        preview.style.alignContent = value;
    }
    
    // Update code
    const codeEditor = document.getElementById('code-align-content');
    if (codeEditor) {
        codeEditor.value = `.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 60px);
    gap: 10px;
    height: 300px;
    align-content: ${value};
}`;
    }
}

function setAutoFlow(value) {
    const preview = document.getElementById('preview-auto-flow');
    if (preview) {
        preview.style.gridAutoFlow = value;
    }
    
    // Update code
    const codeEditor = document.getElementById('code-auto-flow');
    if (codeEditor) {
        codeEditor.value = `.container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 80px);
    grid-auto-flow: ${value};
    gap: 10px;
}

.wide {
    grid-column: span 2;
}`;
    }
}

// Challenge verification
function checkChallenge1() {
    const code = document.getElementById('code-challenge-1')?.value || '';
    
    const hasAreas = code.includes('grid-template-areas');
    const hasHeader = code.includes('header');
    const hasFooter = code.includes('footer');
    const hasSidebar = code.includes('sidebar') || code.includes('200px');
    
    if (hasAreas && hasHeader && hasFooter && hasSidebar) {
        celebrate('Holy Grail Mastered! 🏆');
        markComplete('challenge-1');
    } else {
        showHint('Not quite there yet. Make sure you have:\n• grid-template-areas defined\n• Header spanning full width\n• Sidebar at 200px\n• Footer spanning full width');
    }
}

function checkChallenge2() {
    const code = document.getElementById('code-challenge-2')?.value || '';
    
    const hasAutoFit = code.includes('auto-fit') || code.includes('auto-fill');
    const hasMinmax = code.includes('minmax');
    const has250 = code.includes('250px');
    const has1fr = code.includes('1fr');
    
    if (hasAutoFit && hasMinmax && has250 && has1fr) {
        celebrate('Responsive Grid Master! 📱');
        markComplete('challenge-2');
    } else {
        showHint('Almost there! Make sure you use:\n• repeat() with auto-fit or auto-fill\n• minmax(250px, 1fr)');
    }
}

function checkChallenge3() {
    const code = document.getElementById('code-challenge-3')?.value || '';
    
    const hasAreas = code.includes('grid-template-areas');
    const hasSidebar = code.includes('sidebar');
    const hasWidget = code.includes('widget');
    const has80 = code.includes('80px');
    
    if (hasAreas && hasSidebar && hasWidget && has80) {
        celebrate('Dashboard Pro! 📊');
        markComplete('challenge-3');
        
        // Check if all challenges complete
        const completed = JSON.parse(localStorage.getItem('gridMasteryCompleted') || '[]');
        if (completed.includes('challenge-1') && completed.includes('challenge-2') && completed.includes('challenge-3')) {
            setTimeout(() => {
                celebrate('🌟 CSS Grid Master! 🌟');
            }, 2500);
        }
    } else {
        showHint('Keep trying! Make sure you have:\n• grid-template-areas with sidebar, header, main, widget1, widget2\n• Sidebar at 80px spanning all rows');
    }
}

// Show hint toast
function showHint(message) {
    const hint = document.createElement('div');
    hint.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: var(--bg-card);
        border: 1px solid var(--warning);
        border-radius: var(--radius);
        padding: 16px 24px;
        max-width: 350px;
        z-index: 3000;
        animation: fadeIn 0.3s ease;
        white-space: pre-line;
    `;
    hint.innerHTML = `
        <div style="display: flex; align-items: start; gap: 12px;">
            <span style="font-size: 1.5rem;">💡</span>
            <div>
                <strong style="color: var(--warning);">Hint</strong>
                <p style="margin-top: 4px; color: var(--text-secondary); font-size: 0.9rem;">${message}</p>
            </div>
        </div>
    `;
    document.body.appendChild(hint);
    
    setTimeout(() => {
        hint.style.animation = 'fadeIn 0.3s ease reverse';
        setTimeout(() => hint.remove(), 300);
    }, 4000);
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Escape to close modals
    if (e.key === 'Escape') {
        hideCheatsheet();
    }
    
    // ? to show cheatsheet
    if (e.key === '?' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        showCheatsheet();
    }
    
    // Cmd/Ctrl + Enter to run code
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        updatePreview(currentLesson);
    }
    
    // Arrow keys for navigation (when not in textarea)
    if (e.target.tagName !== 'TEXTAREA') {
        const currentIndex = lessonOrder.indexOf(currentLesson);
        
        if (e.key === 'ArrowRight' && currentIndex < lessonOrder.length - 1) {
            navigateTo(lessonOrder[currentIndex + 1]);
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
            navigateTo(lessonOrder[currentIndex - 1]);
        }
    }
    
    // Tab key in textarea for indentation
    if (e.key === 'Tab' && e.target.tagName === 'TEXTAREA') {
        e.preventDefault();
        const textarea = e.target;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        
        textarea.value = textarea.value.substring(0, start) + '    ' + textarea.value.substring(end);
        textarea.selectionStart = textarea.selectionEnd = start + 4;
        
        // Trigger preview update
        textarea.dispatchEvent(new Event('input'));
    }
});

// Track completed lessons
function markComplete(lessonId) {
    const completed = JSON.parse(localStorage.getItem('gridMasteryCompleted') || '[]');
    if (!completed.includes(lessonId)) {
        completed.push(lessonId);
        localStorage.setItem('gridMasteryCompleted', JSON.stringify(completed));
    }
    
    // Update nav
    const link = document.querySelector(`[data-lesson="${lessonId}"]`);
    if (link) {
        link.classList.add('completed');
    }
    
    // Update progress
    updateProgress();
}

// Update progress display
function updateProgress() {
    const completed = JSON.parse(localStorage.getItem('gridMasteryCompleted') || '[]');
    const count = completed.length;
    const percent = Math.round((count / totalLessons) * 100);
    
    const percentEl = document.getElementById('progress-percent');
    const fillEl = document.getElementById('progress-fill');
    const textEl = document.getElementById('progress-text');
    const certBtn = document.getElementById('cert-btn');
    
    if (percentEl) percentEl.textContent = `${percent}%`;
    if (fillEl) fillEl.style.width = `${percent}%`;
    if (textEl) textEl.textContent = `${count} of ${totalLessons} lessons`;
    
    // Unlock certificate when complete
    if (certBtn) {
        if (count >= totalLessons) {
            certBtn.classList.add('unlocked');
            certBtn.textContent = '🏆 Certificate Unlocked!';
        }
    }
}

// Load completed state on init
function loadCompletedState() {
    const completed = JSON.parse(localStorage.getItem('gridMasteryCompleted') || '[]');
    completed.forEach(lessonId => {
        const link = document.querySelector(`[data-lesson="${lessonId}"]`);
        if (link) {
            link.classList.add('completed');
        }
    });
    updateProgress();
}

// Cheatsheet modal
function showCheatsheet() {
    document.getElementById('cheatsheet-modal').classList.add('active');
}

function hideCheatsheet() {
    document.getElementById('cheatsheet-modal').classList.remove('active');
}

// Celebration animation
function celebrate(message = 'Challenge Complete!') {
    // Fire confetti
    if (typeof confetti !== 'undefined') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
        
        // Double burst
        setTimeout(() => {
            confetti({
                particleCount: 50,
                angle: 60,
                spread: 55,
                origin: { x: 0 }
            });
            confetti({
                particleCount: 50,
                angle: 120,
                spread: 55,
                origin: { x: 1 }
            });
        }, 250);
    }
    
    // Show celebration card
    const celebration = document.createElement('div');
    celebration.className = 'celebration';
    celebration.innerHTML = `
        <div class="emoji">🎉</div>
        <h2>${message}</h2>
        <p>Great job! Keep learning!</p>
    `;
    document.body.appendChild(celebration);
    
    // Remove after 2 seconds
    setTimeout(() => {
        celebration.style.animation = 'celebrateIn 0.3s ease reverse';
        setTimeout(() => celebration.remove(), 300);
    }, 2000);
}

// Call on load
loadCompletedState();

// Mobile sidebar toggle
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    sidebar.classList.toggle('open');
    
    // Create overlay if it doesn't exist
    if (!overlay) {
        const newOverlay = document.createElement('div');
        newOverlay.className = 'sidebar-overlay';
        newOverlay.onclick = toggleSidebar;
        document.body.appendChild(newOverlay);
    }
    
    document.querySelector('.sidebar-overlay')?.classList.toggle('active');
}

// Close sidebar when clicking a nav link on mobile
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            toggleSidebar();
        }
    });
});

// Theme toggle
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('gridMasteryTheme', newTheme);
    
    // Update icon
    document.getElementById('theme-icon').textContent = newTheme === 'light' ? '☀️' : '🌙';
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('gridMasteryTheme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const icon = document.getElementById('theme-icon');
    if (icon) icon.textContent = savedTheme === 'light' ? '☀️' : '🌙';
}

// Initialize theme
loadTheme();

// Show completion certificate
function showCertificate() {
    const completed = JSON.parse(localStorage.getItem('gridMasteryCompleted') || '[]');
    if (completed.length < totalLessons) {
        alert(`Complete all ${totalLessons} lessons to unlock your certificate! (${completed.length}/${totalLessons} done)`);
        return;
    }
    
    const cert = document.createElement('div');
    cert.className = 'modal-overlay active';
    cert.onclick = () => cert.remove();
    cert.innerHTML = `
        <div class="modal-content certificate" onclick="event.stopPropagation()">
            <div class="cert-header">🏆</div>
            <h2>Certificate of Completion</h2>
            <p class="cert-subtitle">This certifies that</p>
            <p class="cert-name">A Dedicated Student</p>
            <p class="cert-subtitle">has successfully mastered</p>
            <h3>CSS Grid Layout</h3>
            <p class="cert-details">Completing all 21 lessons and 3 challenges</p>
            <p class="cert-date">${new Date().toLocaleDateString()}</p>
            <div class="cert-footer">
                <span>10x Academy</span>
                <span>CSS Grid Mastery</span>
            </div>
            <button class="btn btn-primary" onclick="this.parentElement.parentElement.remove()" style="margin-top: 20px;">Close</button>
        </div>
    `;
    document.body.appendChild(cert);
    
    // Confetti!
    if (typeof confetti !== 'undefined') {
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
    }
}

console.log('🎨 CSS Grid Mastery loaded!');
console.log('⌨️ Keyboard shortcuts: ← → navigate | ? cheatsheet | Tab indent | Esc close');
