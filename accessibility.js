// CSS Grid Mastery - Accessibility System
// Screen reader support, high contrast mode, keyboard navigation

class AccessibilitySystem {
    constructor() {
        this.settings = this.loadSettings();
        this.init();
    }

    loadSettings() {
        const saved = localStorage.getItem('a11ySettings');
        return saved ? JSON.parse(saved) : {
            highContrast: false,
            reducedMotion: false,
            largeText: false,
            focusIndicators: true,
            screenReaderMode: false,
            dyslexiaFont: false
        };
    }

    saveSettings() {
        localStorage.setItem('a11ySettings', JSON.stringify(this.settings));
    }

    init() {
        // Apply saved settings
        this.applySettings();
        
        // Check system preferences
        this.checkSystemPreferences();
        
        // Set up keyboard navigation
        this.setupKeyboardNav();
        
        // Add skip link
        this.addSkipLink();
        
        // Enhance ARIA
        this.enhanceAria();
        
        // Listen for preference changes
        this.watchPreferences();
    }

    applySettings() {
        const root = document.documentElement;
        
        root.classList.toggle('high-contrast', this.settings.highContrast);
        root.classList.toggle('reduced-motion', this.settings.reducedMotion);
        root.classList.toggle('large-text', this.settings.largeText);
        root.classList.toggle('enhanced-focus', this.settings.focusIndicators);
        root.classList.toggle('screen-reader-mode', this.settings.screenReaderMode);
        root.classList.toggle('dyslexia-font', this.settings.dyslexiaFont);

        // Announce to screen readers
        if (this.settings.screenReaderMode) {
            this.announce('Screen reader mode enabled');
        }
    }

    checkSystemPreferences() {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (prefersReducedMotion.matches) {
            this.settings.reducedMotion = true;
            this.applySettings();
        }

        // Check for high contrast preference
        const prefersHighContrast = window.matchMedia('(prefers-contrast: more)');
        if (prefersHighContrast.matches) {
            this.settings.highContrast = true;
            this.applySettings();
        }
    }

    watchPreferences() {
        window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
            this.settings.reducedMotion = e.matches;
            this.applySettings();
            this.saveSettings();
        });

        window.matchMedia('(prefers-contrast: more)').addEventListener('change', (e) => {
            this.settings.highContrast = e.matches;
            this.applySettings();
            this.saveSettings();
        });
    }

    setupKeyboardNav() {
        // Track focus for better keyboard navigation
        document.addEventListener('keydown', (e) => {
            // Tab key tracking
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }

            // Arrow key navigation in lists
            if (e.target.closest('.nav-section')) {
                this.handleNavArrows(e);
            }

            // Escape to close modals
            if (e.key === 'Escape') {
                this.closeActiveModal();
            }

            // Keyboard shortcuts
            this.handleShortcuts(e);
        });

        // Remove keyboard nav class on mouse use
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });
    }

    handleNavArrows(e) {
        const links = Array.from(document.querySelectorAll('.nav-link'));
        const currentIndex = links.indexOf(document.activeElement);

        if (currentIndex === -1) return;

        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            e.preventDefault();
            const next = links[currentIndex + 1];
            if (next) next.focus();
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            const prev = links[currentIndex - 1];
            if (prev) prev.focus();
        } else if (e.key === 'Home') {
            e.preventDefault();
            links[0]?.focus();
        } else if (e.key === 'End') {
            e.preventDefault();
            links[links.length - 1]?.focus();
        }
    }

    handleShortcuts(e) {
        // Don't trigger in text inputs
        if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

        // Alt + S: Toggle sound
        if (e.altKey && e.key === 's') {
            e.preventDefault();
            if (window.sounds) {
                const enabled = window.sounds.toggle();
                this.announce(`Sound ${enabled ? 'enabled' : 'disabled'}`);
            }
        }

        // Alt + H: Toggle high contrast
        if (e.altKey && e.key === 'h') {
            e.preventDefault();
            this.toggleHighContrast();
        }

        // Alt + M: Toggle reduced motion
        if (e.altKey && e.key === 'm') {
            e.preventDefault();
            this.toggleReducedMotion();
        }

        // Alt + A: Open accessibility settings
        if (e.altKey && e.key === 'a') {
            e.preventDefault();
            this.showSettingsPanel();
        }

        // Ctrl/Cmd + ?: Show keyboard shortcuts
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault();
            this.showShortcutsHelp();
        }
    }

    closeActiveModal() {
        const modal = document.querySelector('.modal-overlay.active, .tutorial-overlay');
        if (modal) {
            modal.click(); // Trigger close
        }
    }

    addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#lesson-container';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    enhanceAria() {
        // Add ARIA labels to interactive elements
        document.querySelectorAll('.nav-link').forEach((link, i) => {
            link.setAttribute('role', 'menuitem');
            link.setAttribute('aria-label', `Lesson: ${link.textContent}`);
        });

        // Add ARIA to progress bar
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.setAttribute('role', 'progressbar');
            progressBar.setAttribute('aria-valuenow', '0');
            progressBar.setAttribute('aria-valuemin', '0');
            progressBar.setAttribute('aria-valuemax', '100');
            progressBar.setAttribute('aria-label', 'Course progress');
        }

        // Add live region for announcements
        const liveRegion = document.createElement('div');
        liveRegion.id = 'a11y-announcer';
        liveRegion.setAttribute('role', 'status');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        document.body.appendChild(liveRegion);

        // Add landmarks
        document.querySelector('.sidebar')?.setAttribute('role', 'navigation');
        document.querySelector('.content')?.setAttribute('role', 'main');
    }

    // Announce message to screen readers
    announce(message, priority = 'polite') {
        const announcer = document.getElementById('a11y-announcer');
        if (announcer) {
            announcer.setAttribute('aria-live', priority);
            announcer.textContent = '';
            
            // Use setTimeout to ensure the message is announced
            setTimeout(() => {
                announcer.textContent = message;
            }, 100);
        }
    }

    // Toggle functions
    toggleHighContrast() {
        this.settings.highContrast = !this.settings.highContrast;
        this.applySettings();
        this.saveSettings();
        this.announce(`High contrast ${this.settings.highContrast ? 'enabled' : 'disabled'}`);
    }

    toggleReducedMotion() {
        this.settings.reducedMotion = !this.settings.reducedMotion;
        this.applySettings();
        this.saveSettings();
        this.announce(`Reduced motion ${this.settings.reducedMotion ? 'enabled' : 'disabled'}`);
    }

    toggleLargeText() {
        this.settings.largeText = !this.settings.largeText;
        this.applySettings();
        this.saveSettings();
        this.announce(`Large text ${this.settings.largeText ? 'enabled' : 'disabled'}`);
    }

    toggleDyslexiaFont() {
        this.settings.dyslexiaFont = !this.settings.dyslexiaFont;
        this.applySettings();
        this.saveSettings();
        this.announce(`Dyslexia-friendly font ${this.settings.dyslexiaFont ? 'enabled' : 'disabled'}`);
    }

    toggleScreenReaderMode() {
        this.settings.screenReaderMode = !this.settings.screenReaderMode;
        this.applySettings();
        this.saveSettings();
    }

    // Show accessibility settings panel
    showSettingsPanel() {
        const existing = document.getElementById('a11y-panel');
        if (existing) {
            existing.remove();
            return;
        }

        const panel = document.createElement('div');
        panel.id = 'a11y-panel';
        panel.className = 'a11y-panel';
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-label', 'Accessibility Settings');
        
        panel.innerHTML = `
            <div class="a11y-panel-content">
                <h2>♿ Accessibility Settings</h2>
                <button class="a11y-close" onclick="a11y.closeSettingsPanel()" aria-label="Close">&times;</button>
                
                <div class="a11y-options">
                    <label class="a11y-option">
                        <input type="checkbox" ${this.settings.highContrast ? 'checked' : ''} 
                            onchange="a11y.toggleHighContrast()">
                        <span class="checkmark"></span>
                        <div>
                            <strong>High Contrast</strong>
                            <small>Increase color contrast for better visibility</small>
                        </div>
                    </label>

                    <label class="a11y-option">
                        <input type="checkbox" ${this.settings.reducedMotion ? 'checked' : ''}
                            onchange="a11y.toggleReducedMotion()">
                        <span class="checkmark"></span>
                        <div>
                            <strong>Reduced Motion</strong>
                            <small>Disable animations and transitions</small>
                        </div>
                    </label>

                    <label class="a11y-option">
                        <input type="checkbox" ${this.settings.largeText ? 'checked' : ''}
                            onchange="a11y.toggleLargeText()">
                        <span class="checkmark"></span>
                        <div>
                            <strong>Large Text</strong>
                            <small>Increase font size throughout the app</small>
                        </div>
                    </label>

                    <label class="a11y-option">
                        <input type="checkbox" ${this.settings.dyslexiaFont ? 'checked' : ''}
                            onchange="a11y.toggleDyslexiaFont()">
                        <span class="checkmark"></span>
                        <div>
                            <strong>Dyslexia-Friendly Font</strong>
                            <small>Use OpenDyslexic font for easier reading</small>
                        </div>
                    </label>

                    <label class="a11y-option">
                        <input type="checkbox" ${this.settings.focusIndicators ? 'checked' : ''}
                            onchange="a11y.settings.focusIndicators = this.checked; a11y.applySettings(); a11y.saveSettings()">
                        <span class="checkmark"></span>
                        <div>
                            <strong>Enhanced Focus Indicators</strong>
                            <small>Make keyboard focus more visible</small>
                        </div>
                    </label>
                </div>

                <div class="a11y-shortcuts">
                    <h3>Keyboard Shortcuts</h3>
                    <ul>
                        <li><kbd>Alt</kbd> + <kbd>S</kbd> — Toggle sound</li>
                        <li><kbd>Alt</kbd> + <kbd>H</kbd> — Toggle high contrast</li>
                        <li><kbd>Alt</kbd> + <kbd>M</kbd> — Toggle reduced motion</li>
                        <li><kbd>Alt</kbd> + <kbd>A</kbd> — Accessibility settings</li>
                        <li><kbd>←</kbd> <kbd>→</kbd> — Navigate lessons</li>
                        <li><kbd>Tab</kbd> — Indent code</li>
                        <li><kbd>?</kbd> — Show cheatsheet</li>
                        <li><kbd>Esc</kbd> — Close modal</li>
                    </ul>
                </div>
            </div>
        `;

        document.body.appendChild(panel);
        
        // Focus the panel
        panel.querySelector('h2').focus();
        
        // Close on outside click
        panel.addEventListener('click', (e) => {
            if (e.target === panel) {
                this.closeSettingsPanel();
            }
        });
    }

    closeSettingsPanel() {
        const panel = document.getElementById('a11y-panel');
        if (panel) {
            panel.classList.add('closing');
            setTimeout(() => panel.remove(), 200);
        }
    }

    showShortcutsHelp() {
        this.announce('Opening keyboard shortcuts help');
        this.showSettingsPanel();
    }

    // Update progress bar accessibility
    updateProgressAria(percent) {
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.setAttribute('aria-valuenow', percent);
            this.announce(`Progress: ${percent}%`);
        }
    }
}

// ============== ACCESSIBILITY STYLES ==============
const a11yStyles = document.createElement('style');
a11yStyles.textContent = `
    /* Skip link */
    .skip-link {
        position: fixed;
        top: -100px;
        left: 20px;
        background: var(--primary, #6366f1);
        color: white;
        padding: 12px 24px;
        border-radius: 0 0 8px 8px;
        z-index: 100000;
        transition: top 0.2s ease;
        text-decoration: none;
        font-weight: 500;
    }

    .skip-link:focus {
        top: 0;
    }

    /* Screen reader only */
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }

    /* Enhanced focus indicators */
    .enhanced-focus *:focus {
        outline: 3px solid var(--primary, #6366f1) !important;
        outline-offset: 2px !important;
    }

    .keyboard-nav *:focus {
        outline: 3px solid var(--primary, #6366f1);
        outline-offset: 2px;
    }

    /* High contrast mode */
    .high-contrast {
        --bg: #000 !important;
        --bg-card: #1a1a1a !important;
        --bg-secondary: #0d0d0d !important;
        --text: #fff !important;
        --text-secondary: #e0e0e0 !important;
        --primary: #00ff00 !important;
        --primary-hover: #00cc00 !important;
        --border: #fff !important;
    }

    .high-contrast .code-editor,
    .high-contrast .preview-area {
        border: 2px solid #fff !important;
    }

    .high-contrast .nav-link:hover,
    .high-contrast .nav-link.active {
        background: #333 !important;
        color: #fff !important;
    }

    /* Reduced motion */
    .reduced-motion *,
    .reduced-motion *::before,
    .reduced-motion *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }

    /* Large text mode */
    .large-text {
        font-size: 120%;
    }

    .large-text .code-editor {
        font-size: 1.1rem !important;
    }

    .large-text h1 { font-size: 2.5rem; }
    .large-text h2 { font-size: 2rem; }
    .large-text h3 { font-size: 1.5rem; }
    .large-text p, .large-text li { font-size: 1.15rem; }

    /* Dyslexia-friendly font */
    @font-face {
        font-family: 'OpenDyslexic';
        src: url('https://cdn.jsdelivr.net/npm/open-dyslexic@1.0.3/woff/OpenDyslexic-Regular.woff') format('woff');
        font-weight: normal;
    }

    .dyslexia-font * {
        font-family: 'OpenDyslexic', sans-serif !important;
        letter-spacing: 0.05em;
        word-spacing: 0.1em;
        line-height: 1.8;
    }

    /* Accessibility panel */
    .a11y-panel {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100000;
        animation: fadeIn 0.2s ease;
    }

    .a11y-panel.closing {
        animation: fadeIn 0.2s ease reverse;
    }

    .a11y-panel-content {
        background: var(--bg-card, #1e293b);
        border-radius: 16px;
        padding: 30px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
    }

    .a11y-panel h2 {
        margin: 0 0 20px;
        color: var(--text, #f8fafc);
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .a11y-close {
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        font-size: 2rem;
        color: var(--text-secondary, #94a3b8);
        cursor: pointer;
        line-height: 1;
        padding: 5px;
    }

    .a11y-close:hover {
        color: var(--text, #f8fafc);
    }

    .a11y-options {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-bottom: 25px;
    }

    .a11y-option {
        display: flex;
        align-items: flex-start;
        gap: 15px;
        padding: 15px;
        background: var(--bg-secondary, #0f172a);
        border-radius: 10px;
        cursor: pointer;
        transition: background 0.2s ease;
    }

    .a11y-option:hover {
        background: var(--bg-tertiary, #1e293b);
    }

    .a11y-option input[type="checkbox"] {
        width: 22px;
        height: 22px;
        accent-color: var(--primary, #6366f1);
        cursor: pointer;
        margin-top: 2px;
    }

    .a11y-option div {
        flex: 1;
    }

    .a11y-option strong {
        display: block;
        color: var(--text, #f8fafc);
        margin-bottom: 4px;
    }

    .a11y-option small {
        color: var(--text-secondary, #94a3b8);
        font-size: 0.85rem;
    }

    .a11y-shortcuts {
        padding-top: 20px;
        border-top: 1px solid var(--border, #334155);
    }

    .a11y-shortcuts h3 {
        margin: 0 0 15px;
        color: var(--text, #f8fafc);
        font-size: 1rem;
    }

    .a11y-shortcuts ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .a11y-shortcuts li {
        padding: 8px 0;
        color: var(--text-secondary, #94a3b8);
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .a11y-shortcuts kbd {
        background: var(--bg-tertiary, #334155);
        border: 1px solid var(--border, #475569);
        border-radius: 4px;
        padding: 3px 8px;
        font-family: monospace;
        font-size: 0.85rem;
        color: var(--text, #f8fafc);
    }

    /* Focus trap for modals */
    .a11y-panel:focus-within {
        outline: none;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    /* Mobile */
    @media (max-width: 768px) {
        .a11y-panel-content {
            padding: 20px;
            margin: 10px;
        }

        .a11y-shortcuts li {
            flex-wrap: wrap;
        }
    }
`;
document.head.appendChild(a11yStyles);

// ============== GLOBAL INSTANCE ==============
const a11y = new AccessibilitySystem();

// Add accessibility button to UI
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.createElement('button');
    btn.className = 'a11y-toggle-btn';
    btn.innerHTML = '♿';
    btn.setAttribute('aria-label', 'Accessibility Settings');
    btn.setAttribute('title', 'Accessibility Settings (Alt+A)');
    btn.onclick = () => a11y.showSettingsPanel();
    
    const style = document.createElement('style');
    style.textContent = `
        .a11y-toggle-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--bg-card, #1e293b);
            border: 2px solid var(--primary, #6366f1);
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 9999;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .a11y-toggle-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
        }

        @media (max-width: 768px) {
            .a11y-toggle-btn {
                bottom: 80px;
            }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(btn);
});

// Export
window.a11y = a11y;

console.log('♿ Accessibility system loaded!');
