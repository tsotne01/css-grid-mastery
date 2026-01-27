// CSS Grid Mastery - Application Logic

let currentLesson = 'intro';

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
        alert('🎉 Great job! Your Holy Grail layout looks correct!');
    } else {
        alert('Not quite there yet. Make sure you have:\n- grid-template-areas defined\n- Header spanning full width\n- Sidebar at 200px\n- Footer spanning full width');
    }
}

function checkChallenge2() {
    const code = document.getElementById('code-challenge-2')?.value || '';
    
    const hasAutoFit = code.includes('auto-fit') || code.includes('auto-fill');
    const hasMinmax = code.includes('minmax');
    const has250 = code.includes('250px');
    const has1fr = code.includes('1fr');
    
    if (hasAutoFit && hasMinmax && has250 && has1fr) {
        alert('🎉 Perfect! You\'ve mastered responsive grids!');
    } else {
        alert('Almost there! Make sure you use:\n- repeat() with auto-fit or auto-fill\n- minmax(250px, 1fr)');
    }
}

function checkChallenge3() {
    const code = document.getElementById('code-challenge-3')?.value || '';
    
    const hasAreas = code.includes('grid-template-areas');
    const hasSidebar = code.includes('sidebar');
    const hasWidget = code.includes('widget');
    const has80 = code.includes('80px');
    
    if (hasAreas && hasSidebar && hasWidget && has80) {
        alert('🎉 Excellent! Your dashboard layout is complete!');
    } else {
        alert('Keep trying! Make sure you have:\n- grid-template-areas with sidebar, header, main, widget1, widget2\n- Sidebar at 80px spanning all rows');
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
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
}

// Call on load
loadCompletedState();

console.log('🎨 CSS Grid Mastery loaded! Use arrow keys to navigate lessons.');
