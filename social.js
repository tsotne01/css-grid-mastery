// CSS Grid Mastery - Social Sharing Features
// Share score cards, generate images, social buttons

class SocialSharing {
    constructor() {
        this.canvas = null;
        this.ctx = null;
    }

    // Generate a shareable score card image
    async generateScoreCard(stats) {
        // Create canvas
        const canvas = document.createElement('canvas');
        canvas.width = 600;
        canvas.height = 400;
        const ctx = canvas.getContext('2d');

        // Background gradient
        const gradient = ctx.createLinearGradient(0, 0, 600, 400);
        gradient.addColorStop(0, '#1e1b4b');
        gradient.addColorStop(1, '#312e81');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 600, 400);

        // Add subtle grid pattern
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.1)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 600; i += 30) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, 400);
            ctx.stroke();
        }
        for (let i = 0; i < 400; i += 30) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(600, i);
            ctx.stroke();
        }

        // Title
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('CSS Grid Mastery', 300, 50);

        // Subtitle
        ctx.fillStyle = '#a5b4fc';
        ctx.font = '16px Inter, sans-serif';
        ctx.fillText('My Learning Progress', 300, 80);

        // Stats cards
        const statsData = [
            { label: 'Level', value: stats.level || 'Novice', emoji: stats.levelEmoji || '🌱' },
            { label: 'XP', value: stats.xp?.toLocaleString() || '0', emoji: '⭐' },
            { label: 'Streak', value: `${stats.streak || 0} days`, emoji: '🔥' },
            { label: 'Completed', value: `${stats.completed || 0}%`, emoji: '✅' }
        ];

        const cardWidth = 120;
        const cardHeight = 100;
        const startX = 45;
        const cardY = 120;
        const gap = 20;

        statsData.forEach((stat, i) => {
            const x = startX + i * (cardWidth + gap);

            // Card background
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            this.roundRect(ctx, x, cardY, cardWidth, cardHeight, 12);
            ctx.fill();

            // Emoji
            ctx.font = '32px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(stat.emoji, x + cardWidth / 2, cardY + 40);

            // Value
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 20px Inter, sans-serif';
            ctx.fillText(stat.value, x + cardWidth / 2, cardY + 70);

            // Label
            ctx.fillStyle = '#a5b4fc';
            ctx.font = '12px Inter, sans-serif';
            ctx.fillText(stat.label, x + cardWidth / 2, cardY + 90);
        });

        // Achievements section
        if (stats.achievements && stats.achievements.length > 0) {
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 16px Inter, sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText('Recent Achievements:', 45, 260);

            ctx.font = '24px sans-serif';
            const achievementEmojis = stats.achievements.slice(0, 6).map(a => a.emoji).join(' ');
            ctx.fillText(achievementEmojis, 45, 295);
        }

        // Footer
        ctx.fillStyle = '#64748b';
        ctx.font = '14px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🎮 Built for 10x Academy', 300, 350);
        ctx.fillText('tsotne01.github.io/css-grid-mastery', 300, 375);

        return canvas.toDataURL('image/png');
    }

    // Helper: Draw rounded rectangle
    roundRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
    }

    // Generate shareable text
    generateShareText(stats) {
        const lines = [
            '🎮 CSS Grid Mastery Progress',
            '',
            `${stats.levelEmoji || '🌱'} Level: ${stats.level || 'Novice'}`,
            `⭐ XP: ${stats.xp?.toLocaleString() || 0}`,
            `🔥 Streak: ${stats.streak || 0} days`,
            `✅ ${stats.completed || 0}% complete`,
            '',
            '🎯 Learn CSS Grid with interactive challenges!',
            '👉 tsotne01.github.io/css-grid-mastery'
        ];
        return lines.join('\n');
    }

    // Generate Daily Challenge share text
    generateDailyShareText(result) {
        const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const bars = this.generateStreakBars(result.streak || 0);
        
        return [
            `🗓️ CSS Grid Daily Challenge - ${date}`,
            '',
            result.completed ? '✅ Completed!' : '❌ Try again tomorrow!',
            `⏱️ Time: ${result.time || '--'}`,
            `🔥 Streak: ${bars}`,
            '',
            '🎮 tsotne01.github.io/css-grid-mastery'
        ].join('\n');
    }

    // Generate visual streak bars
    generateStreakBars(streak) {
        const filled = Math.min(streak, 7);
        const empty = 7 - filled;
        return '🟩'.repeat(filled) + '⬜'.repeat(empty);
    }

    // Share to Twitter/X
    shareToTwitter(text) {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank', 'width=550,height=420');
    }

    // Share to LinkedIn
    shareToLinkedIn(url, title, summary) {
        const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        window.open(shareUrl, '_blank', 'width=550,height=420');
    }

    // Share to Facebook
    shareToFacebook(url) {
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(shareUrl, '_blank', 'width=550,height=420');
    }

    // Copy to clipboard
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.showCopySuccess();
            return true;
        } catch (err) {
            // Fallback
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            this.showCopySuccess();
            return true;
        }
    }

    // Show copy success toast
    showCopySuccess() {
        const toast = document.createElement('div');
        toast.className = 'share-toast';
        toast.innerHTML = '✅ Copied to clipboard!';
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }

    // Download score card
    async downloadScoreCard(stats) {
        const dataUrl = await this.generateScoreCard(stats);
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `css-grid-mastery-${new Date().toISOString().split('T')[0]}.png`;
        a.click();
    }

    // Native Web Share API (mobile)
    async nativeShare(data) {
        if (navigator.share) {
            try {
                await navigator.share(data);
                return true;
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error('Share failed:', err);
                }
            }
        }
        return false;
    }

    // Create share modal
    showShareModal(stats) {
        const text = this.generateShareText(stats);
        const url = 'https://tsotne01.github.io/css-grid-mastery/';

        const modal = document.createElement('div');
        modal.className = 'share-modal-overlay';
        modal.onclick = (e) => { if (e.target === modal) modal.remove(); };

        modal.innerHTML = `
            <div class="share-modal">
                <button class="share-close" onclick="this.parentElement.parentElement.remove()">×</button>
                <h2>📤 Share Your Progress</h2>
                
                <div class="share-preview">
                    <pre>${text}</pre>
                </div>
                
                <div class="share-buttons">
                    <button class="share-btn twitter" onclick="social.shareToTwitter(\`${text.replace(/`/g, '\\`')}\`)">
                        𝕏 Twitter
                    </button>
                    <button class="share-btn linkedin" onclick="social.shareToLinkedIn('${url}', 'CSS Grid Mastery', 'Learning CSS Grid!')">
                        in LinkedIn
                    </button>
                    <button class="share-btn copy" onclick="social.copyToClipboard(\`${text.replace(/`/g, '\\`')}\`)">
                        📋 Copy Text
                    </button>
                </div>
                
                <div class="share-actions">
                    <button class="game-btn secondary" onclick="social.downloadScoreCard(${JSON.stringify(stats).replace(/"/g, '&quot;')})">
                        📥 Download Image
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Try native share on mobile
        if (navigator.share) {
            const nativeBtn = document.createElement('button');
            nativeBtn.className = 'share-btn native';
            nativeBtn.innerHTML = '📱 Share';
            nativeBtn.onclick = () => this.nativeShare({ title: 'CSS Grid Mastery', text, url });
            modal.querySelector('.share-buttons').prepend(nativeBtn);
        }
    }
}

// ============== SHARE STYLES ==============
const shareStyles = document.createElement('style');
shareStyles.textContent = `
    .share-modal-overlay {
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

    .share-modal {
        background: var(--bg-card, #1e293b);
        border-radius: 16px;
        padding: 30px;
        max-width: 500px;
        width: 90%;
        position: relative;
    }

    .share-modal h2 {
        margin: 0 0 20px;
        text-align: center;
    }

    .share-close {
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--text-secondary);
        cursor: pointer;
    }

    .share-preview {
        background: var(--bg-code, #0f172a);
        border-radius: 8px;
        padding: 15px;
        margin-bottom: 20px;
        max-height: 200px;
        overflow-y: auto;
    }

    .share-preview pre {
        margin: 0;
        white-space: pre-wrap;
        font-size: 0.9rem;
        color: var(--text-secondary);
    }

    .share-buttons {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        margin-bottom: 15px;
    }

    .share-btn {
        flex: 1;
        min-width: 100px;
        padding: 12px 20px;
        border: none;
        border-radius: 8px;
        font-weight: 500;
        cursor: pointer;
        transition: transform 0.2s ease, opacity 0.2s ease;
    }

    .share-btn:hover {
        transform: translateY(-2px);
        opacity: 0.9;
    }

    .share-btn.twitter {
        background: #000;
        color: white;
    }

    .share-btn.linkedin {
        background: #0077b5;
        color: white;
    }

    .share-btn.copy {
        background: var(--primary, #6366f1);
        color: white;
    }

    .share-btn.native {
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
    }

    .share-actions {
        text-align: center;
    }

    .share-toast {
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--success, #22c55e);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 500;
        z-index: 10001;
        animation: slideUp 0.3s ease;
    }

    .share-toast.fade-out {
        animation: slideUp 0.3s ease reverse;
    }

    @keyframes slideUp {
        from { 
            opacity: 0;
            transform: translate(-50%, 20px);
        }
        to {
            opacity: 1;
            transform: translate(-50%, 0);
        }
    }

    /* Share button in game modes */
    .share-progress-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 20px;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        border: none;
        border-radius: 8px;
        font-weight: 500;
        cursor: pointer;
        transition: transform 0.2s ease;
    }

    .share-progress-btn:hover {
        transform: translateY(-2px);
    }

    @media (max-width: 768px) {
        .share-buttons {
            flex-direction: column;
        }

        .share-btn {
            min-width: unset;
        }
    }
`;
document.head.appendChild(shareStyles);

// ============== GLOBAL INSTANCE ==============
const social = new SocialSharing();
window.social = social;

// Add share button to achievements page
function addShareButton() {
    const achievementsPage = document.querySelector('.achievements-container');
    if (achievementsPage && !achievementsPage.querySelector('.share-progress-btn')) {
        const btn = document.createElement('button');
        btn.className = 'share-progress-btn';
        btn.innerHTML = '📤 Share Progress';
        btn.onclick = () => {
            const stats = {
                level: gameState?.getLevel()?.name || 'Novice',
                levelEmoji: gameState?.getLevel()?.emoji || '🌱',
                xp: gameState?.xp || 0,
                streak: gameState?.streakDays || 0,
                completed: gameState?.getLevelProgress() || 0,
                achievements: gameState?.achievements?.map(id => ACHIEVEMENTS[id]).filter(Boolean) || []
            };
            social.showShareModal(stats);
        };
        achievementsPage.prepend(btn);
    }
}

// Watch for achievements page
const observer = new MutationObserver(() => {
    addShareButton();
});
observer.observe(document.body, { childList: true, subtree: true });

console.log('📤 Social sharing loaded!');
