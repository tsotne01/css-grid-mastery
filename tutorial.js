// CSS Grid Mastery - Tutorial & Onboarding System
// First-time user walkthrough with interactive tooltips

class TutorialSystem {
    constructor() {
        this.currentStep = 0;
        this.isActive = false;
        this.overlay = null;
        this.tooltip = null;
        this.highlightBox = null;
        
        this.steps = [
            {
                target: '.logo',
                title: 'Welcome to CSS Grid Mastery! 🎉',
                content: 'Learn CSS Grid through interactive lessons and fun game modes. Let\'s take a quick tour!',
                position: 'bottom'
            },
            {
                target: '.nav-section:first-of-type',
                title: 'Structured Lessons 📚',
                content: 'Start with the fundamentals and progress through placement, alignment, and advanced topics. Each lesson has live code editors!',
                position: 'right'
            },
            {
                target: '.games-nav',
                title: 'Game Modes 🎮',
                content: 'Practice what you learn with fun game modes: Grid Battle (timed challenges), Debug Detective (find the bugs), Clone Challenge (recreate layouts), and Daily Challenges!',
                position: 'right'
            },
            {
                target: '#player-stats',
                title: 'Track Your Progress 📊',
                content: 'Earn XP by completing lessons and challenges. Level up from Novice to Master! Maintain your streak for bonus XP.',
                position: 'bottom'
            },
            {
                target: '.progress-section',
                title: 'Unlock the Certificate 🏆',
                content: 'Complete all 21 lessons to earn your CSS Grid Mastery certificate!',
                position: 'right'
            },
            {
                target: '.theme-toggle',
                title: 'Customize Your Experience ⚙️',
                content: 'Toggle between dark and light themes. Your preferences are saved automatically.',
                position: 'bottom'
            },
            {
                target: '#lesson-container',
                title: 'Ready to Start! 🚀',
                content: 'Each lesson has explanations, live code editors, and visual previews. Edit the code and see changes instantly!',
                position: 'top',
                action: 'start'
            }
        ];
    }

    shouldShowTutorial() {
        return !localStorage.getItem('tutorialCompleted') && 
               !localStorage.getItem('tutorialSkipped');
    }

    start() {
        if (!this.shouldShowTutorial()) return;
        
        this.isActive = true;
        this.currentStep = 0;
        this.createOverlay();
        this.showStep(0);
        
        // Track tutorial start
        this.trackEvent('tutorial_started');
    }

    createOverlay() {
        // Create overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'tutorial-overlay';
        document.body.appendChild(this.overlay);

        // Create highlight box
        this.highlightBox = document.createElement('div');
        this.highlightBox.className = 'tutorial-highlight';
        document.body.appendChild(this.highlightBox);

        // Create tooltip
        this.tooltip = document.createElement('div');
        this.tooltip.className = 'tutorial-tooltip';
        document.body.appendChild(this.tooltip);
    }

    showStep(index) {
        const step = this.steps[index];
        if (!step) {
            this.complete();
            return;
        }

        const target = document.querySelector(step.target);
        if (!target) {
            // Skip if target not found
            this.nextStep();
            return;
        }

        // Position highlight box
        const rect = target.getBoundingClientRect();
        const padding = 8;
        
        this.highlightBox.style.cssText = `
            position: fixed;
            left: ${rect.left - padding}px;
            top: ${rect.top - padding}px;
            width: ${rect.width + padding * 2}px;
            height: ${rect.height + padding * 2}px;
            pointer-events: none;
            z-index: 10001;
            border-radius: 8px;
            box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.7);
            transition: all 0.3s ease;
        `;

        // Build tooltip content
        this.tooltip.innerHTML = `
            <div class="tutorial-tooltip-content">
                <h3>${step.title}</h3>
                <p>${step.content}</p>
                <div class="tutorial-nav">
                    <div class="tutorial-dots">
                        ${this.steps.map((_, i) => `
                            <span class="dot ${i === index ? 'active' : ''} ${i < index ? 'completed' : ''}"></span>
                        `).join('')}
                    </div>
                    <div class="tutorial-buttons">
                        ${index > 0 ? '<button class="tutorial-btn secondary" onclick="tutorial.prevStep()">Back</button>' : ''}
                        <button class="tutorial-btn secondary" onclick="tutorial.skip()">Skip Tour</button>
                        <button class="tutorial-btn primary" onclick="tutorial.nextStep()">
                            ${index === this.steps.length - 1 ? 'Start Learning!' : 'Next'}
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Position tooltip
        this.positionTooltip(rect, step.position);

        // Animate in
        this.tooltip.classList.add('visible');

        // Play sound
        if (window.sounds) {
            window.sounds.playClick();
        }

        // Scroll target into view if needed
        if (rect.top < 0 || rect.bottom > window.innerHeight) {
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    positionTooltip(targetRect, position) {
        const tooltip = this.tooltip;
        const tooltipRect = tooltip.getBoundingClientRect();
        const margin = 20;
        
        let left, top;

        switch (position) {
            case 'top':
                left = targetRect.left + (targetRect.width - 350) / 2;
                top = targetRect.top - 10 - margin;
                tooltip.style.transform = 'translateY(-100%)';
                break;
            case 'bottom':
                left = targetRect.left + (targetRect.width - 350) / 2;
                top = targetRect.bottom + margin;
                tooltip.style.transform = 'translateY(0)';
                break;
            case 'left':
                left = targetRect.left - 350 - margin;
                top = targetRect.top + (targetRect.height - 200) / 2;
                tooltip.style.transform = 'translateX(0)';
                break;
            case 'right':
            default:
                left = targetRect.right + margin;
                top = targetRect.top + (targetRect.height - 200) / 2;
                tooltip.style.transform = 'translateX(0)';
                break;
        }

        // Keep tooltip in viewport
        left = Math.max(20, Math.min(left, window.innerWidth - 370));
        top = Math.max(20, Math.min(top, window.innerHeight - 250));

        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
    }

    nextStep() {
        this.currentStep++;
        if (this.currentStep >= this.steps.length) {
            this.complete();
        } else {
            this.showStep(this.currentStep);
        }
    }

    prevStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.showStep(this.currentStep);
        }
    }

    skip() {
        localStorage.setItem('tutorialSkipped', 'true');
        this.trackEvent('tutorial_skipped', { step: this.currentStep });
        this.cleanup();
    }

    complete() {
        localStorage.setItem('tutorialCompleted', 'true');
        this.trackEvent('tutorial_completed');
        
        // Celebrate!
        if (window.sounds) {
            window.sounds.playSuccess();
        }
        if (window.particles) {
            window.particles.celebrate();
        }

        this.cleanup();
    }

    cleanup() {
        this.isActive = false;
        
        if (this.overlay) {
            this.overlay.classList.add('fade-out');
            setTimeout(() => this.overlay?.remove(), 300);
        }
        if (this.highlightBox) {
            this.highlightBox.classList.add('fade-out');
            setTimeout(() => this.highlightBox?.remove(), 300);
        }
        if (this.tooltip) {
            this.tooltip.classList.add('fade-out');
            setTimeout(() => this.tooltip?.remove(), 300);
        }
    }

    trackEvent(event, data = {}) {
        console.log(`[Tutorial] ${event}`, data);
        // Could send to analytics
    }

    // Reset tutorial (for testing)
    reset() {
        localStorage.removeItem('tutorialCompleted');
        localStorage.removeItem('tutorialSkipped');
        console.log('[Tutorial] Reset complete');
    }
}

// ============== FEATURE TOOLTIPS ==============
class FeatureTooltips {
    constructor() {
        this.shown = JSON.parse(localStorage.getItem('shownTooltips') || '[]');
        this.tooltips = {
            codeEditor: {
                trigger: '#code-intro',
                title: '💡 Pro Tip',
                content: 'Press Tab to indent, Cmd/Ctrl+Enter to run your code!',
                position: 'top'
            },
            gridBattle: {
                trigger: '[onclick*="gridBattle"]',
                title: '⚔️ Grid Battle',
                content: 'Race against time to build CSS Grid layouts! Faster = more XP.',
                position: 'right'
            },
            streak: {
                trigger: '.stat-streak',
                title: '🔥 Keep Your Streak!',
                content: 'Complete at least one challenge daily to maintain your streak and earn bonus XP!',
                position: 'bottom'
            },
            achievements: {
                trigger: '[onclick*="achievements"]',
                title: '🏆 Achievements',
                content: '15 achievements to unlock! Complete challenges, maintain streaks, and master CSS Grid.',
                position: 'right'
            }
        };
    }

    showOnce(id) {
        if (this.shown.includes(id)) return;
        
        const config = this.tooltips[id];
        if (!config) return;

        const trigger = document.querySelector(config.trigger);
        if (!trigger) return;

        // Mark as shown
        this.shown.push(id);
        localStorage.setItem('shownTooltips', JSON.stringify(this.shown));

        // Create tooltip
        this.createTooltip(trigger, config);
    }

    createTooltip(trigger, config) {
        const tooltip = document.createElement('div');
        tooltip.className = 'feature-tooltip';
        tooltip.innerHTML = `
            <div class="feature-tooltip-arrow"></div>
            <strong>${config.title}</strong>
            <p>${config.content}</p>
            <button class="feature-tooltip-close" onclick="this.parentElement.remove()">Got it!</button>
        `;

        const rect = trigger.getBoundingClientRect();
        
        switch (config.position) {
            case 'top':
                tooltip.style.left = `${rect.left + rect.width / 2}px`;
                tooltip.style.top = `${rect.top - 10}px`;
                tooltip.style.transform = 'translate(-50%, -100%)';
                break;
            case 'bottom':
                tooltip.style.left = `${rect.left + rect.width / 2}px`;
                tooltip.style.top = `${rect.bottom + 10}px`;
                tooltip.style.transform = 'translateX(-50%)';
                break;
            case 'right':
                tooltip.style.left = `${rect.right + 10}px`;
                tooltip.style.top = `${rect.top + rect.height / 2}px`;
                tooltip.style.transform = 'translateY(-50%)';
                break;
        }

        document.body.appendChild(tooltip);

        // Auto-dismiss after 8 seconds
        setTimeout(() => {
            tooltip.classList.add('fade-out');
            setTimeout(() => tooltip.remove(), 300);
        }, 8000);
    }

    reset() {
        this.shown = [];
        localStorage.removeItem('shownTooltips');
    }
}

// ============== TUTORIAL STYLES ==============
const tutorialStyles = document.createElement('style');
tutorialStyles.textContent = `
    .tutorial-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: transparent;
        z-index: 10000;
        pointer-events: none;
    }

    .tutorial-overlay.fade-out {
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .tutorial-highlight {
        transition: all 0.4s ease;
    }

    .tutorial-highlight.fade-out {
        opacity: 0;
    }

    .tutorial-tooltip {
        position: fixed;
        width: 350px;
        max-width: calc(100vw - 40px);
        background: var(--bg-card, #1e293b);
        border: 2px solid var(--primary, #6366f1);
        border-radius: 12px;
        padding: 0;
        z-index: 10002;
        opacity: 0;
        transition: all 0.3s ease;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }

    .tutorial-tooltip.visible {
        opacity: 1;
    }

    .tutorial-tooltip.fade-out {
        opacity: 0;
        transform: scale(0.95);
    }

    .tutorial-tooltip-content {
        padding: 20px;
    }

    .tutorial-tooltip h3 {
        margin: 0 0 10px;
        font-size: 1.2rem;
        color: var(--text, #f8fafc);
    }

    .tutorial-tooltip p {
        margin: 0 0 20px;
        color: var(--text-secondary, #94a3b8);
        line-height: 1.6;
    }

    .tutorial-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
    }

    .tutorial-dots {
        display: flex;
        gap: 6px;
    }

    .tutorial-dots .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--bg-tertiary, #334155);
        transition: all 0.3s ease;
    }

    .tutorial-dots .dot.active {
        background: var(--primary, #6366f1);
        transform: scale(1.2);
    }

    .tutorial-dots .dot.completed {
        background: var(--success, #22c55e);
    }

    .tutorial-buttons {
        display: flex;
        gap: 8px;
    }

    .tutorial-btn {
        padding: 8px 16px;
        border-radius: 6px;
        font-size: 0.9rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        border: none;
    }

    .tutorial-btn.primary {
        background: var(--primary, #6366f1);
        color: white;
    }

    .tutorial-btn.primary:hover {
        background: var(--primary-hover, #4f46e5);
    }

    .tutorial-btn.secondary {
        background: transparent;
        color: var(--text-secondary, #94a3b8);
        border: 1px solid var(--border, #334155);
    }

    .tutorial-btn.secondary:hover {
        background: var(--bg-tertiary, #334155);
        color: var(--text, #f8fafc);
    }

    /* Feature tooltips */
    .feature-tooltip {
        position: fixed;
        width: 250px;
        background: var(--bg-card, #1e293b);
        border: 1px solid var(--primary, #6366f1);
        border-radius: 8px;
        padding: 12px 15px;
        z-index: 9999;
        animation: tooltipIn 0.3s ease;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }

    .feature-tooltip.fade-out {
        animation: tooltipOut 0.3s ease forwards;
    }

    @keyframes tooltipIn {
        from { opacity: 0; transform: translateY(-50%) scale(0.95); }
        to { opacity: 1; transform: translateY(-50%) scale(1); }
    }

    @keyframes tooltipOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }

    .feature-tooltip strong {
        display: block;
        margin-bottom: 6px;
        color: var(--text, #f8fafc);
    }

    .feature-tooltip p {
        margin: 0 0 10px;
        font-size: 0.85rem;
        color: var(--text-secondary, #94a3b8);
        line-height: 1.5;
    }

    .feature-tooltip-close {
        background: var(--primary, #6366f1);
        color: white;
        border: none;
        padding: 6px 12px;
        border-radius: 4px;
        font-size: 0.8rem;
        cursor: pointer;
        transition: background 0.2s ease;
    }

    .feature-tooltip-close:hover {
        background: var(--primary-hover, #4f46e5);
    }

    .feature-tooltip-arrow {
        position: absolute;
        width: 10px;
        height: 10px;
        background: var(--bg-card, #1e293b);
        border: 1px solid var(--primary, #6366f1);
        border-right: none;
        border-bottom: none;
        transform: rotate(45deg);
        left: -6px;
        top: calc(50% - 5px);
    }

    /* Mobile adjustments */
    @media (max-width: 768px) {
        .tutorial-tooltip {
            width: calc(100vw - 40px);
            left: 20px !important;
            transform: none !important;
        }

        .tutorial-buttons {
            flex-wrap: wrap;
        }

        .tutorial-btn {
            flex: 1;
            min-width: 80px;
        }
    }
`;
document.head.appendChild(tutorialStyles);

// ============== GLOBAL INSTANCES ==============
const tutorial = new TutorialSystem();
const featureTooltips = new FeatureTooltips();

// Auto-start tutorial for new users after a short delay
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (tutorial.shouldShowTutorial()) {
            tutorial.start();
        }
    }, 1000);
});

// Export
window.tutorial = tutorial;
window.featureTooltips = featureTooltips;

console.log('📖 Tutorial system loaded!');
