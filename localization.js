// CSS Grid Mastery - Localization System
// Multi-language support with Georgian (for 10x Academy students)

const TRANSLATIONS = {
    en: {
        // Navigation
        nav: {
            fundamentals: 'Fundamentals',
            placement: 'Placement',
            alignment: 'Alignment',
            advanced: 'Advanced',
            practice: 'Practice',
            games: '🎮 Games'
        },
        
        // Lessons
        lessons: {
            intro: 'Introduction',
            container: 'Grid Container',
            columnsRows: 'Columns & Rows',
            gap: 'Gap & Spacing',
            frUnit: 'The fr Unit',
            linePlacement: 'Line-Based Placement',
            span: 'Spanning Items',
            gridAreas: 'Grid Areas',
            namedLines: 'Named Lines',
            justifyItems: 'Justify Items',
            alignItems: 'Align Items',
            placeItems: 'Place Items',
            justifyContent: 'Justify Content',
            alignContent: 'Align Content',
            autoFill: 'Auto-Fill & Auto-Fit',
            minmax: 'minmax()',
            autoFlow: 'Auto Flow',
            subgrid: 'Subgrid'
        },

        // Challenges
        challenges: {
            holyGrail: 'Challenge: Holy Grail',
            cardGrid: 'Challenge: Card Grid',
            dashboard: 'Challenge: Dashboard'
        },

        // Game modes
        games: {
            gridBattle: 'Grid Battle',
            gridBattleDesc: 'Race against time to build layouts',
            debugDetective: 'Debug Detective',
            debugDetectiveDesc: 'Find and fix CSS bugs',
            cloneChallenge: 'Clone Challenge',
            cloneChallengeDesc: 'Recreate famous layouts',
            dailyChallenge: 'Daily Challenge',
            dailyChallengeDesc: "Today's unique challenge",
            achievements: 'Achievements',
            achievementsDesc: 'Track your progress'
        },

        // UI Elements
        ui: {
            progress: 'Progress',
            lessons: 'lessons',
            of: 'of',
            viewCertificate: 'View Certificate',
            quickReference: '📋 Quick Reference',
            builtFor: 'Built for 10x Academy',
            by: 'by',
            tryIt: 'Try It',
            reset: 'Reset',
            runCode: 'Run Code',
            showSolution: 'Show Solution',
            checkAnswer: 'Check Answer',
            hint: 'Hint',
            next: 'Next',
            previous: 'Previous',
            start: 'Start',
            submit: 'Submit',
            timeLeft: 'Time Left',
            score: 'Score',
            xp: 'XP',
            level: 'Level',
            streak: 'day streak',
            complete: 'Complete!',
            perfect: 'Perfect!',
            close: 'Close'
        },

        // Levels
        levels: {
            novice: 'Novice',
            apprentice: 'Apprentice',
            intermediate: 'Intermediate',
            advanced: 'Advanced',
            master: 'Master'
        },

        // Achievements
        achievementNames: {
            firstLesson: 'First Steps',
            gridApprentice: 'Grid Apprentice',
            gridMaster: 'Grid Master',
            speedDemon: 'Speed Demon',
            perfectScore: 'Perfectionist',
            debugPro: 'Bug Hunter',
            debugMaster: 'Debug Master',
            cloneWarrior: 'Clone Warrior',
            cloneMaster: 'Clone Master',
            streak3: 'Getting Warm',
            streak7: 'On Fire',
            streak30: 'Unstoppable',
            dailyWarrior: 'Daily Warrior',
            battleVeteran: 'Battle Veteran',
            allRounder: 'All-Rounder'
        },

        // Messages
        messages: {
            challengeComplete: 'Challenge Complete!',
            lessonComplete: 'Lesson Complete!',
            achievementUnlocked: 'Achievement Unlocked!',
            levelUp: 'Level Up!',
            newStreak: 'Streak Extended!',
            tryAgain: 'Not quite right. Try again!',
            goodJob: 'Great job! Keep learning!',
            certificateUnlocked: 'Certificate Unlocked!'
        },

        // Tutorial
        tutorial: {
            welcome: 'Welcome to CSS Grid Mastery! 🎉',
            welcomeDesc: "Learn CSS Grid through interactive lessons and fun game modes. Let's take a quick tour!",
            lessons: 'Structured Lessons 📚',
            lessonsDesc: 'Start with the fundamentals and progress through placement, alignment, and advanced topics.',
            gamesIntro: 'Game Modes 🎮',
            gamesIntroDesc: 'Practice what you learn with Grid Battle, Debug Detective, Clone Challenge, and Daily Challenges!',
            progress: 'Track Your Progress 📊',
            progressDesc: 'Earn XP by completing lessons and challenges. Level up from Novice to Master!',
            certificate: 'Unlock the Certificate 🏆',
            certificateDesc: 'Complete all 21 lessons to earn your CSS Grid Mastery certificate!',
            ready: 'Ready to Start! 🚀',
            readyDesc: 'Each lesson has explanations, live code editors, and visual previews.',
            skipTour: 'Skip Tour',
            startLearning: 'Start Learning!'
        },

        // Accessibility
        a11y: {
            settings: 'Accessibility Settings',
            highContrast: 'High Contrast',
            highContrastDesc: 'Increase color contrast for better visibility',
            reducedMotion: 'Reduced Motion',
            reducedMotionDesc: 'Disable animations and transitions',
            largeText: 'Large Text',
            largeTextDesc: 'Increase font size throughout the app',
            dyslexiaFont: 'Dyslexia-Friendly Font',
            dyslexiaFontDesc: 'Use OpenDyslexic font for easier reading',
            focusIndicators: 'Enhanced Focus Indicators',
            focusIndicatorsDesc: 'Make keyboard focus more visible',
            keyboardShortcuts: 'Keyboard Shortcuts'
        }
    },

    // Georgian translations
    ka: {
        nav: {
            fundamentals: 'საფუძვლები',
            placement: 'განთავსება',
            alignment: 'გასწორება',
            advanced: 'გაღრმავებული',
            practice: 'პრაქტიკა',
            games: '🎮 თამაშები'
        },

        lessons: {
            intro: 'შესავალი',
            container: 'Grid კონტეინერი',
            columnsRows: 'სვეტები და რიგები',
            gap: 'Gap და დაშორება',
            frUnit: 'fr ერთეული',
            linePlacement: 'ხაზებით განთავსება',
            span: 'გაშლილი ელემენტები',
            gridAreas: 'Grid არეები',
            namedLines: 'დასახელებული ხაზები',
            justifyItems: 'Justify Items',
            alignItems: 'Align Items',
            placeItems: 'Place Items',
            justifyContent: 'Justify Content',
            alignContent: 'Align Content',
            autoFill: 'Auto-Fill და Auto-Fit',
            minmax: 'minmax()',
            autoFlow: 'Auto Flow',
            subgrid: 'Subgrid'
        },

        challenges: {
            holyGrail: 'გამოწვევა: Holy Grail',
            cardGrid: 'გამოწვევა: ბარათების Grid',
            dashboard: 'გამოწვევა: Dashboard'
        },

        games: {
            gridBattle: 'Grid ბრძოლა',
            gridBattleDesc: 'შეჯიბრე დროსთან layout-ების აგებაში',
            debugDetective: 'ბაგების დეტექტივი',
            debugDetectiveDesc: 'იპოვე და გაასწორე CSS ბაგები',
            cloneChallenge: 'კლონირების გამოწვევა',
            cloneChallengeDesc: 'აღადგინე ცნობილი layout-ები',
            dailyChallenge: 'დღის გამოწვევა',
            dailyChallengeDesc: 'დღევანდელი უნიკალური გამოწვევა',
            achievements: 'მიღწევები',
            achievementsDesc: 'თვალი ადევნე პროგრესს'
        },

        ui: {
            progress: 'პროგრესი',
            lessons: 'გაკვეთილი',
            of: '-დან',
            viewCertificate: 'სერტიფიკატის ნახვა',
            quickReference: '📋 სწრაფი მითითება',
            builtFor: 'შექმნილია 10x Academy-სთვის',
            by: 'ავტორები:',
            tryIt: 'სცადე',
            reset: 'თავიდან',
            runCode: 'გაშვება',
            showSolution: 'პასუხის ნახვა',
            checkAnswer: 'შემოწმება',
            hint: 'მინიშნება',
            next: 'შემდეგი',
            previous: 'წინა',
            start: 'დაწყება',
            submit: 'გაგზავნა',
            timeLeft: 'დარჩენილი დრო',
            score: 'ქულა',
            xp: 'XP',
            level: 'დონე',
            streak: 'დღიანი სერია',
            complete: 'დასრულებულია!',
            perfect: 'იდეალური!',
            close: 'დახურვა'
        },

        levels: {
            novice: 'დამწყები',
            apprentice: 'შეგირდი',
            intermediate: 'საშუალო',
            advanced: 'წინსვლილი',
            master: 'ოსტატი'
        },

        achievementNames: {
            firstLesson: 'პირველი ნაბიჯები',
            gridApprentice: 'Grid შეგირდი',
            gridMaster: 'Grid ოსტატი',
            speedDemon: 'სისწრაფის დემონი',
            perfectScore: 'პერფექციონისტი',
            debugPro: 'ბაგების მონადირე',
            debugMaster: 'Debug ოსტატი',
            cloneWarrior: 'კლონირების მეომარი',
            cloneMaster: 'კლონირების ოსტატი',
            streak3: 'თბილდება',
            streak7: 'ცეცხლზე',
            streak30: 'შეუჩერებელი',
            dailyWarrior: 'ყოველდღიური მეომარი',
            battleVeteran: 'ბრძოლის ვეტერანი',
            allRounder: 'უნივერსალური'
        },

        messages: {
            challengeComplete: 'გამოწვევა დასრულდა!',
            lessonComplete: 'გაკვეთილი დასრულდა!',
            achievementUnlocked: 'მიღწევა განბლოკილია!',
            levelUp: 'დონის ამაღლება!',
            newStreak: 'სერია გაგრძელდა!',
            tryAgain: 'არასწორია. სცადე ხელახლა!',
            goodJob: 'კარგი სამუშაო! განაგრძე სწავლა!',
            certificateUnlocked: 'სერტიფიკატი განბლოკილია!'
        },

        tutorial: {
            welcome: 'კეთილი იყოს თქვენი მობრძანება CSS Grid Mastery-ში! 🎉',
            welcomeDesc: 'ისწავლე CSS Grid ინტერაქტიული გაკვეთილებითა და სახალისო თამაშებით.',
            lessons: 'სტრუქტურირებული გაკვეთილები 📚',
            lessonsDesc: 'დაიწყე საფუძვლებით და გაიარე განთავსება, გასწორება და გაღრმავებული თემები.',
            gamesIntro: 'თამაშის რეჟიმები 🎮',
            gamesIntroDesc: 'ივარჯიშე Grid ბრძოლით, Debug დეტექტივით და ყოველდღიური გამოწვევებით!',
            progress: 'თვალი ადევნე პროგრესს 📊',
            progressDesc: 'დააგროვე XP გაკვეთილებისა და გამოწვევების დასრულებით.',
            certificate: 'განბლოკე სერტიფიკატი 🏆',
            certificateDesc: 'დაასრულე ყველა 21 გაკვეთილი სერტიფიკატის მისაღებად!',
            ready: 'მზად ხარ! 🚀',
            readyDesc: 'თითოეულ გაკვეთილს აქვს ახსნა, კოდის რედაქტორი და ვიზუალური გადახედვა.',
            skipTour: 'ტურის გამოტოვება',
            startLearning: 'დაიწყე სწავლა!'
        },

        a11y: {
            settings: 'ხელმისაწვდომობის პარამეტრები',
            highContrast: 'მაღალი კონტრასტი',
            highContrastDesc: 'გაზარდე ფერთა კონტრასტი უკეთესი ხილვადობისთვის',
            reducedMotion: 'შემცირებული მოძრაობა',
            reducedMotionDesc: 'გამორთე ანიმაციები და გადასვლები',
            largeText: 'დიდი ტექსტი',
            largeTextDesc: 'გაზარდე შრიფტის ზომა',
            dyslexiaFont: 'დისლექსიისთვის მორგებული შრიფტი',
            dyslexiaFontDesc: 'გამოიყენე OpenDyslexic შრიფტი',
            focusIndicators: 'გაძლიერებული ფოკუსის ინდიკატორები',
            focusIndicatorsDesc: 'გახადე კლავიატურის ფოკუსი უფრო თვალსაჩინო',
            keyboardShortcuts: 'კლავიატურის მალსახმობები'
        }
    }
};

class LocalizationSystem {
    constructor() {
        this.currentLang = localStorage.getItem('gridMasteryLang') || 'en';
        this.translations = TRANSLATIONS;
        this.observers = [];
    }

    setLanguage(lang) {
        if (!this.translations[lang]) {
            console.warn(`Language '${lang}' not supported. Falling back to English.`);
            lang = 'en';
        }
        
        this.currentLang = lang;
        localStorage.setItem('gridMasteryLang', lang);
        document.documentElement.lang = lang;
        
        // Update UI
        this.updateUI();
        
        // Notify observers
        this.observers.forEach(callback => callback(lang));
        
        // Announce to screen reader
        if (window.a11y) {
            window.a11y.announce(`Language changed to ${lang === 'ka' ? 'Georgian' : 'English'}`);
        }
    }

    get(key) {
        const keys = key.split('.');
        let value = this.translations[this.currentLang];
        
        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                // Fallback to English
                value = this.translations.en;
                for (const k2 of keys) {
                    if (value && value[k2]) {
                        value = value[k2];
                    } else {
                        return key; // Return key if not found
                    }
                }
                break;
            }
        }
        
        return value;
    }

    // Shorthand for get
    t(key) {
        return this.get(key);
    }

    // Add observer for language changes
    onLanguageChange(callback) {
        this.observers.push(callback);
    }

    // Update UI elements with translations
    updateUI() {
        // Update data-i18n elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            el.textContent = this.get(key);
        });

        // Update data-i18n-placeholder elements
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            el.placeholder = this.get(key);
        });

        // Update data-i18n-title elements
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.dataset.i18nTitle;
            el.title = this.get(key);
        });

        // Update data-i18n-aria elements
        document.querySelectorAll('[data-i18n-aria]').forEach(el => {
            const key = el.dataset.i18nAria;
            el.setAttribute('aria-label', this.get(key));
        });
    }

    // Create language switcher UI
    createSwitcher() {
        const switcher = document.createElement('div');
        switcher.className = 'lang-switcher';
        switcher.innerHTML = `
            <button class="lang-btn ${this.currentLang === 'en' ? 'active' : ''}" 
                    onclick="i18n.setLanguage('en')" 
                    aria-label="Switch to English">
                🇬🇧 EN
            </button>
            <button class="lang-btn ${this.currentLang === 'ka' ? 'active' : ''}" 
                    onclick="i18n.setLanguage('ka')"
                    aria-label="Switch to Georgian">
                🇬🇪 ქა
            </button>
        `;
        return switcher;
    }

    // Get list of available languages
    getAvailableLanguages() {
        return Object.keys(this.translations).map(code => ({
            code,
            name: code === 'en' ? 'English' : 'ქართული',
            flag: code === 'en' ? '🇬🇧' : '🇬🇪'
        }));
    }
}

// ============== LOCALIZATION STYLES ==============
const i18nStyles = document.createElement('style');
i18nStyles.textContent = `
    .lang-switcher {
        display: flex;
        gap: 5px;
        padding: 5px;
        background: var(--bg-secondary, #0f172a);
        border-radius: 8px;
    }

    .lang-btn {
        padding: 6px 12px;
        border: none;
        border-radius: 6px;
        background: transparent;
        color: var(--text-secondary, #94a3b8);
        font-size: 0.85rem;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .lang-btn:hover {
        background: var(--bg-tertiary, #1e293b);
        color: var(--text, #f8fafc);
    }

    .lang-btn.active {
        background: var(--primary, #6366f1);
        color: white;
    }

    /* Georgian font support */
    @font-face {
        font-family: 'BPG Nino Mtavruli';
        src: url('https://cdn.jsdelivr.net/gh/nicklarsennz/bpg-web-fonts/fonts/bpg-nino-mtavruli-webfont.woff2') format('woff2');
        font-weight: normal;
        font-display: swap;
    }

    html[lang="ka"] {
        font-family: 'BPG Nino Mtavruli', 'Inter', sans-serif;
    }

    html[lang="ka"] h1,
    html[lang="ka"] h2,
    html[lang="ka"] h3 {
        font-family: 'BPG Nino Mtavruli', 'Inter', sans-serif;
    }

    /* RTL support (for future Arabic, Hebrew, etc.) */
    html[dir="rtl"] {
        direction: rtl;
    }

    html[dir="rtl"] .sidebar {
        right: 0;
        left: auto;
        border-right: none;
        border-left: 1px solid var(--border, #334155);
    }

    html[dir="rtl"] .content {
        margin-left: 0;
        margin-right: 280px;
    }
`;
document.head.appendChild(i18nStyles);

// ============== GLOBAL INSTANCE ==============
const i18n = new LocalizationSystem();

// Add language switcher to sidebar
document.addEventListener('DOMContentLoaded', () => {
    const navFooter = document.querySelector('.nav-footer');
    if (navFooter) {
        const switcher = i18n.createSwitcher();
        navFooter.insertBefore(switcher, navFooter.firstChild);
    }

    // Apply initial language
    document.documentElement.lang = i18n.currentLang;
    
    // Update UI with translations
    setTimeout(() => i18n.updateUI(), 100);
});

// Export
window.i18n = i18n;

console.log('🌍 Localization system loaded!');
