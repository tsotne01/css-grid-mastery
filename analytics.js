// CSS Grid Mastery - Analytics & Stats Dashboard
// Personal progress tracking, time spent, accuracy graphs

class AnalyticsSystem {
    constructor() {
        this.data = this.loadData();
        this.sessionStart = Date.now();
        this.currentLesson = null;
        this.lessonStartTime = null;
        
        // Track session
        this.trackSession();
        
        // Save periodically
        setInterval(() => this.saveData(), 30000);
        
        // Save on page unload
        window.addEventListener('beforeunload', () => this.saveData());
    }

    loadData() {
        const saved = localStorage.getItem('gridMasteryAnalytics');
        return saved ? JSON.parse(saved) : {
            totalTimeSpent: 0,
            sessionsCount: 0,
            lessonsCompleted: [],
            lessonTimes: {},
            challengeAttempts: {},
            dailyActivity: {},
            accuracyHistory: [],
            xpHistory: [],
            levelHistory: [],
            streakHistory: [],
            firstVisit: Date.now(),
            lastVisit: null
        };
    }

    saveData() {
        this.data.lastVisit = Date.now();
        localStorage.setItem('gridMasteryAnalytics', JSON.stringify(this.data));
    }

    trackSession() {
        this.data.sessionsCount++;
        
        // Track daily activity
        const today = new Date().toISOString().split('T')[0];
        if (!this.data.dailyActivity[today]) {
            this.data.dailyActivity[today] = { time: 0, lessons: 0, challenges: 0 };
        }
        
        // Update total time periodically
        setInterval(() => {
            const elapsed = (Date.now() - this.sessionStart) / 1000;
            this.data.totalTimeSpent += 1; // Add 1 second
            this.data.dailyActivity[today].time += 1;
        }, 1000);
    }

    startLesson(lessonId) {
        this.currentLesson = lessonId;
        this.lessonStartTime = Date.now();
    }

    endLesson(lessonId, completed = true) {
        if (this.lessonStartTime && this.currentLesson === lessonId) {
            const timeSpent = (Date.now() - this.lessonStartTime) / 1000;
            
            if (!this.data.lessonTimes[lessonId]) {
                this.data.lessonTimes[lessonId] = [];
            }
            this.data.lessonTimes[lessonId].push({
                time: timeSpent,
                completed,
                date: Date.now()
            });

            if (completed && !this.data.lessonsCompleted.includes(lessonId)) {
                this.data.lessonsCompleted.push(lessonId);
                
                const today = new Date().toISOString().split('T')[0];
                if (this.data.dailyActivity[today]) {
                    this.data.dailyActivity[today].lessons++;
                }
            }

            this.currentLesson = null;
            this.lessonStartTime = null;
            this.saveData();
        }
    }

    trackChallenge(challengeId, result) {
        if (!this.data.challengeAttempts[challengeId]) {
            this.data.challengeAttempts[challengeId] = [];
        }
        
        this.data.challengeAttempts[challengeId].push({
            ...result,
            date: Date.now()
        });

        // Track accuracy
        this.data.accuracyHistory.push({
            challenge: challengeId,
            accuracy: result.accuracy || 0,
            date: Date.now()
        });

        const today = new Date().toISOString().split('T')[0];
        if (this.data.dailyActivity[today]) {
            this.data.dailyActivity[today].challenges++;
        }

        this.saveData();
    }

    trackXP(amount, source) {
        this.data.xpHistory.push({
            amount,
            source,
            date: Date.now()
        });
        this.saveData();
    }

    trackLevelUp(newLevel) {
        this.data.levelHistory.push({
            level: newLevel,
            date: Date.now()
        });
        this.saveData();
    }

    trackStreak(streak) {
        this.data.streakHistory.push({
            streak,
            date: Date.now()
        });
        this.saveData();
    }

    // Analytics calculations
    getStats() {
        const totalTime = this.data.totalTimeSpent;
        const lessonsCompleted = this.data.lessonsCompleted.length;
        const totalLessons = 21;
        
        // Calculate average accuracy
        const accuracies = this.data.accuracyHistory.map(a => a.accuracy);
        const avgAccuracy = accuracies.length > 0 
            ? accuracies.reduce((a, b) => a + b, 0) / accuracies.length 
            : 0;

        // Calculate XP per day
        const xpByDay = {};
        this.data.xpHistory.forEach(x => {
            const day = new Date(x.date).toISOString().split('T')[0];
            xpByDay[day] = (xpByDay[day] || 0) + x.amount;
        });

        // Get current streak
        let currentStreak = 0;
        const today = new Date().toISOString().split('T')[0];
        let checkDate = new Date();
        
        while (true) {
            const dateStr = checkDate.toISOString().split('T')[0];
            if (this.data.dailyActivity[dateStr] && this.data.dailyActivity[dateStr].time > 60) {
                currentStreak++;
                checkDate.setDate(checkDate.getDate() - 1);
            } else if (dateStr !== today) {
                break;
            } else {
                checkDate.setDate(checkDate.getDate() - 1);
            }
        }

        // Best day
        let bestDay = { date: null, xp: 0 };
        Object.entries(xpByDay).forEach(([date, xp]) => {
            if (xp > bestDay.xp) {
                bestDay = { date, xp };
            }
        });

        return {
            totalTime,
            totalTimeFormatted: this.formatTime(totalTime),
            sessionsCount: this.data.sessionsCount,
            lessonsCompleted,
            totalLessons,
            progressPercent: Math.round((lessonsCompleted / totalLessons) * 100),
            avgAccuracy: Math.round(avgAccuracy),
            currentStreak,
            bestStreak: Math.max(...(this.data.streakHistory.map(s => s.streak) || [0]), currentStreak),
            totalChallenges: Object.keys(this.data.challengeAttempts).length,
            totalAttempts: Object.values(this.data.challengeAttempts).flat().length,
            xpByDay,
            bestDay,
            daysSinceStart: Math.floor((Date.now() - this.data.firstVisit) / (1000 * 60 * 60 * 24)),
            recentActivity: this.getRecentActivity()
        };
    }

    getRecentActivity(days = 7) {
        const activity = [];
        const now = new Date();
        
        for (let i = 0; i < days; i++) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            
            activity.push({
                date: dateStr,
                dayName: date.toLocaleDateString('en', { weekday: 'short' }),
                data: this.data.dailyActivity[dateStr] || { time: 0, lessons: 0, challenges: 0 }
            });
        }
        
        return activity.reverse();
    }

    getLessonStats(lessonId) {
        const times = this.data.lessonTimes[lessonId] || [];
        if (times.length === 0) return null;

        const totalTime = times.reduce((sum, t) => sum + t.time, 0);
        const avgTime = totalTime / times.length;
        const bestTime = Math.min(...times.map(t => t.time));
        
        return {
            attempts: times.length,
            totalTime,
            avgTime: this.formatTime(avgTime),
            bestTime: this.formatTime(bestTime),
            completed: times.some(t => t.completed)
        };
    }

    formatTime(seconds) {
        if (seconds < 60) {
            return `${Math.round(seconds)}s`;
        } else if (seconds < 3600) {
            const mins = Math.floor(seconds / 60);
            const secs = Math.round(seconds % 60);
            return `${mins}m ${secs}s`;
        } else {
            const hours = Math.floor(seconds / 3600);
            const mins = Math.floor((seconds % 3600) / 60);
            return `${hours}h ${mins}m`;
        }
    }

    // Generate stats dashboard HTML
    renderDashboard() {
        const stats = this.getStats();
        
        return `
            <div class="analytics-dashboard">
                <h2>📊 Your Learning Journey</h2>
                
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon">⏱️</div>
                        <div class="stat-value">${stats.totalTimeFormatted}</div>
                        <div class="stat-label">Total Time Spent</div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon">📚</div>
                        <div class="stat-value">${stats.lessonsCompleted}/${stats.totalLessons}</div>
                        <div class="stat-label">Lessons Completed</div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon">🎯</div>
                        <div class="stat-value">${stats.avgAccuracy}%</div>
                        <div class="stat-label">Average Accuracy</div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon">🔥</div>
                        <div class="stat-value">${stats.currentStreak}</div>
                        <div class="stat-label">Current Streak</div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon">🏆</div>
                        <div class="stat-value">${stats.bestStreak}</div>
                        <div class="stat-label">Best Streak</div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon">⚔️</div>
                        <div class="stat-value">${stats.totalAttempts}</div>
                        <div class="stat-label">Challenge Attempts</div>
                    </div>
                </div>

                <div class="activity-section">
                    <h3>📅 Last 7 Days</h3>
                    <div class="activity-chart">
                        ${stats.recentActivity.map(day => `
                            <div class="activity-day">
                                <div class="activity-bar-container">
                                    <div class="activity-bar" style="height: ${Math.min(100, day.data.time / 60)}%"></div>
                                </div>
                                <span class="day-label">${day.dayName}</span>
                                <span class="day-time">${this.formatTime(day.data.time)}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="progress-section">
                    <h3>📈 Progress Overview</h3>
                    <div class="progress-ring-container">
                        <svg class="progress-ring" viewBox="0 0 120 120">
                            <circle class="progress-ring-bg" cx="60" cy="60" r="54" />
                            <circle class="progress-ring-fill" cx="60" cy="60" r="54" 
                                    style="stroke-dasharray: ${stats.progressPercent * 3.39} 339" />
                        </svg>
                        <div class="progress-ring-text">
                            <span class="progress-percent">${stats.progressPercent}%</span>
                            <span class="progress-label">Complete</span>
                        </div>
                    </div>
                </div>

                <div class="milestones-section">
                    <h3>🏅 Milestones</h3>
                    <div class="milestones-list">
                        <div class="milestone ${stats.lessonsCompleted >= 1 ? 'achieved' : ''}">
                            <span class="milestone-icon">${stats.lessonsCompleted >= 1 ? '✅' : '⭕'}</span>
                            <span>Complete first lesson</span>
                        </div>
                        <div class="milestone ${stats.lessonsCompleted >= 5 ? 'achieved' : ''}">
                            <span class="milestone-icon">${stats.lessonsCompleted >= 5 ? '✅' : '⭕'}</span>
                            <span>Complete 5 lessons</span>
                        </div>
                        <div class="milestone ${stats.lessonsCompleted >= 10 ? 'achieved' : ''}">
                            <span class="milestone-icon">${stats.lessonsCompleted >= 10 ? '✅' : '⭕'}</span>
                            <span>Halfway there! (10 lessons)</span>
                        </div>
                        <div class="milestone ${stats.lessonsCompleted >= 21 ? 'achieved' : ''}">
                            <span class="milestone-icon">${stats.lessonsCompleted >= 21 ? '✅' : '⭕'}</span>
                            <span>Complete all lessons</span>
                        </div>
                        <div class="milestone ${stats.currentStreak >= 7 ? 'achieved' : ''}">
                            <span class="milestone-icon">${stats.currentStreak >= 7 ? '✅' : '⭕'}</span>
                            <span>7-day learning streak</span>
                        </div>
                        <div class="milestone ${stats.totalAttempts >= 50 ? 'achieved' : ''}">
                            <span class="milestone-icon">${stats.totalAttempts >= 50 ? '✅' : '⭕'}</span>
                            <span>50 challenge attempts</span>
                        </div>
                    </div>
                </div>

                ${stats.bestDay.date ? `
                    <div class="best-day-section">
                        <h3>⭐ Best Day</h3>
                        <p>Your most productive day was <strong>${new Date(stats.bestDay.date).toLocaleDateString()}</strong> 
                           with <strong>${stats.bestDay.xp} XP</strong> earned!</p>
                    </div>
                ` : ''}

                <button class="btn btn-secondary" onclick="analytics.exportData()">
                    📥 Export My Data
                </button>
            </div>
        `;
    }

    exportData() {
        const data = {
            stats: this.getStats(),
            raw: this.data
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `css-grid-mastery-stats-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    // Reset all data (for testing)
    reset() {
        localStorage.removeItem('gridMasteryAnalytics');
        this.data = this.loadData();
        console.log('[Analytics] Data reset');
    }
}

// ============== ANALYTICS STYLES ==============
const analyticsStyles = document.createElement('style');
analyticsStyles.textContent = `
    .analytics-dashboard {
        padding: 20px;
        max-width: 800px;
        margin: 0 auto;
    }

    .analytics-dashboard h2 {
        margin-bottom: 30px;
        color: var(--text, #f8fafc);
    }

    .analytics-dashboard h3 {
        margin: 30px 0 15px;
        color: var(--text, #f8fafc);
        font-size: 1.1rem;
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 15px;
        margin-bottom: 30px;
    }

    .stat-card {
        background: var(--bg-card, #1e293b);
        border-radius: 12px;
        padding: 20px;
        text-align: center;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .stat-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    .stat-icon {
        font-size: 2rem;
        margin-bottom: 10px;
    }

    .stat-value {
        font-size: 1.8rem;
        font-weight: bold;
        color: var(--primary, #6366f1);
        margin-bottom: 5px;
    }

    .stat-label {
        color: var(--text-secondary, #94a3b8);
        font-size: 0.85rem;
    }

    /* Activity Chart */
    .activity-chart {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        height: 150px;
        padding: 20px;
        background: var(--bg-card, #1e293b);
        border-radius: 12px;
    }

    .activity-day {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        max-width: 80px;
    }

    .activity-bar-container {
        height: 100px;
        width: 30px;
        background: var(--bg-tertiary, #334155);
        border-radius: 4px;
        display: flex;
        align-items: flex-end;
        overflow: hidden;
    }

    .activity-bar {
        width: 100%;
        background: linear-gradient(to top, var(--primary, #6366f1), #8b5cf6);
        border-radius: 4px 4px 0 0;
        transition: height 0.5s ease;
        min-height: 2px;
    }

    .day-label {
        margin-top: 8px;
        font-size: 0.75rem;
        color: var(--text-secondary, #94a3b8);
    }

    .day-time {
        font-size: 0.7rem;
        color: var(--text-tertiary, #64748b);
    }

    /* Progress Ring */
    .progress-ring-container {
        display: flex;
        justify-content: center;
        padding: 30px;
        background: var(--bg-card, #1e293b);
        border-radius: 12px;
        position: relative;
    }

    .progress-ring {
        width: 150px;
        height: 150px;
        transform: rotate(-90deg);
    }

    .progress-ring-bg {
        fill: none;
        stroke: var(--bg-tertiary, #334155);
        stroke-width: 10;
    }

    .progress-ring-fill {
        fill: none;
        stroke: var(--primary, #6366f1);
        stroke-width: 10;
        stroke-linecap: round;
        transition: stroke-dasharray 1s ease;
    }

    .progress-ring-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
    }

    .progress-percent {
        display: block;
        font-size: 2rem;
        font-weight: bold;
        color: var(--primary, #6366f1);
    }

    .progress-label {
        display: block;
        font-size: 0.85rem;
        color: var(--text-secondary, #94a3b8);
    }

    /* Milestones */
    .milestones-list {
        background: var(--bg-card, #1e293b);
        border-radius: 12px;
        padding: 15px;
    }

    .milestone {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 15px;
        border-radius: 8px;
        color: var(--text-secondary, #94a3b8);
        transition: background 0.2s ease;
    }

    .milestone:hover {
        background: var(--bg-tertiary, #334155);
    }

    .milestone.achieved {
        color: var(--text, #f8fafc);
    }

    .milestone.achieved .milestone-icon {
        color: var(--success, #22c55e);
    }

    .milestone-icon {
        font-size: 1.2rem;
    }

    /* Best Day */
    .best-day-section {
        background: linear-gradient(135deg, var(--primary, #6366f1), #8b5cf6);
        border-radius: 12px;
        padding: 20px;
        color: white;
        text-align: center;
    }

    .best-day-section h3 {
        color: white;
        margin-top: 0;
    }

    .best-day-section p {
        margin: 0;
        font-size: 1.1rem;
    }

    /* Export button */
    .analytics-dashboard .btn {
        margin-top: 30px;
        width: 100%;
    }

    /* Mobile */
    @media (max-width: 768px) {
        .stats-grid {
            grid-template-columns: repeat(2, 1fr);
        }

        .activity-chart {
            padding: 15px 10px;
        }

        .activity-bar-container {
            width: 20px;
        }
    }
`;
document.head.appendChild(analyticsStyles);

// ============== GLOBAL INSTANCE ==============
const analytics = new AnalyticsSystem();

// Export
window.analytics = analytics;

console.log('📊 Analytics system loaded!');
