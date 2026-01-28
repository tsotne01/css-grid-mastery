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
            puzzleMode: 'Puzzle Mode',
            puzzleModeDesc: 'Solve grid puzzles',
            survivalMode: 'Survival Mode',
            survivalModeDesc: 'How long can you last?',
            speedRun: 'Speed Run',
            speedRunDesc: 'Complete lessons as fast as possible',
            dailyChallenge: 'Daily Challenge',
            dailyChallengeDesc: "Today's unique challenge",
            achievements: 'Achievements',
            achievementsDesc: 'Track your progress',
            analytics: 'My Stats',
            analyticsDesc: 'View your learning analytics'
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

        // Cheatsheet
        cheatsheet: {
            title: 'CSS Grid Quick Reference',
            containerProps: 'Container Properties',
            itemPlacement: 'Item Placement',
            alignment: 'Alignment',
            responsiveMagic: 'Responsive Magic',
            // Container descriptions
            createsGrid: 'Creates a grid container',
            defineColumns: 'Define column sizes',
            defineRows: 'Define row sizes',
            spaceBetween: 'Space between items',
            nameRegions: 'Name grid regions',
            // Placement descriptions
            spanColumns: 'Span columns 1-2',
            spanRows: 'Span 2 rows',
            placeInArea: 'Place in named area',
            // Alignment descriptions
            horizontalCell: 'Horizontal in cell',
            verticalCell: 'Vertical in cell',
            centerBoth: 'Center both axes',
            // Responsive descriptions
            autoResponsive: 'Auto-responsive columns',
            fractionSpace: 'Fraction of free space',
            sizeRange: 'Size range'
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
            puzzleMode: 'თავსატეხების რეჟიმი',
            puzzleModeDesc: 'ამოხსენი Grid თავსატეხები',
            survivalMode: 'გადარჩენის რეჟიმი',
            survivalModeDesc: 'რამდენ ხანს გაძლებ?',
            speedRun: 'სისწრაფის რბოლა',
            speedRunDesc: 'დაასრულე გაკვეთილები რაც შეიძლება სწრაფად',
            dailyChallenge: 'დღის გამოწვევა',
            dailyChallengeDesc: 'დღევანდელი უნიკალური გამოწვევა',
            achievements: 'მიღწევები',
            achievementsDesc: 'თვალი ადევნე პროგრესს',
            analytics: 'ჩემი სტატისტიკა',
            analyticsDesc: 'ნახე შენი სწავლის ანალიტიკა'
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

        cheatsheet: {
            title: 'CSS Grid სწრაფი მითითება',
            containerProps: 'კონტეინერის თვისებები',
            itemPlacement: 'ელემენტის განთავსება',
            alignment: 'გასწორება',
            responsiveMagic: 'რესპონსიული მაგია',
            // Container descriptions
            createsGrid: 'ქმნის Grid კონტეინერს',
            defineColumns: 'განსაზღვრავს სვეტების ზომას',
            defineRows: 'განსაზღვრავს რიგების ზომას',
            spaceBetween: 'დაშორება ელემენტებს შორის',
            nameRegions: 'დაასახელებს Grid რეგიონებს',
            // Placement descriptions
            spanColumns: 'გაშლა 1-2 სვეტზე',
            spanRows: 'გაშლა 2 რიგზე',
            placeInArea: 'განთავსება დასახელებულ არეში',
            // Alignment descriptions
            horizontalCell: 'ჰორიზონტალური უჯრაში',
            verticalCell: 'ვერტიკალური უჯრაში',
            centerBoth: 'ცენტრირება ორივე ღერძზე',
            // Responsive descriptions
            autoResponsive: 'ავტო-რესპონსიული სვეტები',
            fractionSpace: 'თავისუფალი სივრცის ნაწილი',
            sizeRange: 'ზომის დიაპაზონი'
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

        // ============== DYNAMIC TRANSLATIONS ==============
        // Update navigation section headers
        const sectionHeaders = {
            'Fundamentals': 'nav.fundamentals',
            'Placement': 'nav.placement',
            'Alignment': 'nav.alignment',
            'Advanced': 'nav.advanced',
            'Practice': 'nav.practice',
            '🎮 Games': 'nav.games'
        };
        
        document.querySelectorAll('.nav-section h3').forEach(h3 => {
            const originalText = h3.textContent.trim();
            // Check if this is the games header (has emoji)
            if (originalText.includes('Games') || originalText.includes('თამაშები')) {
                h3.textContent = this.get('nav.games');
            } else {
                // Find matching key
                for (const [en, key] of Object.entries(sectionHeaders)) {
                    if (originalText === en || this.translations.ka?.nav && Object.values(this.translations.ka.nav).includes(originalText)) {
                        h3.textContent = this.get(key);
                        break;
                    }
                }
            }
        });

        // Update nav links based on data-lesson attribute
        const lessonKeyMap = {
            'intro': 'lessons.intro',
            'container': 'lessons.container',
            'columns-rows': 'lessons.columnsRows',
            'gap': 'lessons.gap',
            'fr-unit': 'lessons.frUnit',
            'line-placement': 'lessons.linePlacement',
            'span': 'lessons.span',
            'grid-areas': 'lessons.gridAreas',
            'named-lines': 'lessons.namedLines',
            'justify-items': 'lessons.justifyItems',
            'align-items': 'lessons.alignItems',
            'place-items': 'lessons.placeItems',
            'justify-content': 'lessons.justifyContent',
            'align-content': 'lessons.alignContent',
            'auto-fill': 'lessons.autoFill',
            'minmax': 'lessons.minmax',
            'auto-flow': 'lessons.autoFlow',
            'subgrid': 'lessons.subgrid',
            'challenge-1': 'challenges.holyGrail',
            'challenge-2': 'challenges.cardGrid',
            'challenge-3': 'challenges.dashboard'
        };

        document.querySelectorAll('.nav-link[data-lesson]').forEach(link => {
            const lesson = link.dataset.lesson;
            if (lessonKeyMap[lesson]) {
                link.textContent = this.get(lessonKeyMap[lesson]);
            }
        });

        // Update game mode buttons
        const gameModeMap = {
            'gridBattle': { name: 'games.gridBattle', emoji: '⚔️' },
            'debugDetective': { name: 'games.debugDetective', emoji: '🔍' },
            'cloneChallenge': { name: 'games.cloneChallenge', emoji: '🎨' },
            'puzzleMode': { name: 'games.puzzleMode', emoji: '🧩' },
            'survivalMode': { name: 'games.survivalMode', emoji: '💀' },
            'speedRun': { name: 'games.speedRun', emoji: '⏱️' },
            'dailyChallenge': { name: 'games.dailyChallenge', emoji: '📅' },
            'achievements': { name: 'games.achievements', emoji: '🏆' },
            'analytics': { name: 'games.analytics', emoji: '📊' }
        };

        document.querySelectorAll('.game-mode-btn').forEach(btn => {
            const onclick = btn.getAttribute('onclick');
            if (onclick) {
                const match = onclick.match(/loadGameMode\(['"](\w+)['"]\)/);
                if (match && gameModeMap[match[1]]) {
                    const textSpan = btn.querySelector('span:not(.emoji)');
                    if (textSpan) {
                        textSpan.textContent = this.get(gameModeMap[match[1]].name);
                    }
                }
            }
        });

        // Update progress section
        const progressLabel = document.querySelector('.progress-info span:first-child');
        if (progressLabel && (progressLabel.textContent.includes('Progress') || progressLabel.textContent.includes('პროგრესი'))) {
            progressLabel.textContent = this.get('ui.progress') + ':';
        }

        // Update "View Certificate" button
        document.querySelectorAll('button').forEach(btn => {
            const text = btn.textContent.trim();
            if (text.includes('View Certificate') || text.includes('სერტიფიკატის ნახვა')) {
                btn.textContent = '🎓 ' + this.get('ui.viewCertificate');
            }
            if (text.includes('Quick Reference') || text.includes('სწრაფი მითითება')) {
                btn.textContent = this.get('ui.quickReference');
            }
        });

        // Update footer text
        const footer = document.querySelector('.nav-footer p');
        if (footer) {
            footer.innerHTML = `${this.get('ui.builtFor')} <a href="https://10x.edu.ge" target="_blank" rel="noopener">10x Academy</a> ${this.get('ui.by')} <a href="https://github.com/Tsotne01" target="_blank" rel="noopener">Tsotne</a>`;
        }

        // Update language switcher active state
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent.includes('EN') && this.currentLang === 'en') {
                btn.classList.add('active');
            }
            if (btn.textContent.includes('ქა') && this.currentLang === 'ka') {
                btn.classList.add('active');
            }
        });

        // ============== CHEATSHEET TRANSLATIONS ==============
        const cheatsheetModal = document.getElementById('cheatsheet-modal');
        if (cheatsheetModal) {
            // Update title
            const title = cheatsheetModal.querySelector('.modal-content > h2');
            if (title) {
                title.textContent = this.get('cheatsheet.title');
            }

            // Update section headers
            const sections = cheatsheetModal.querySelectorAll('.cheatsheet-section');
            const sectionKeys = ['containerProps', 'itemPlacement', 'alignment', 'responsiveMagic'];
            sections.forEach((section, index) => {
                const h3 = section.querySelector('h3');
                if (h3 && sectionKeys[index]) {
                    h3.textContent = this.get('cheatsheet.' + sectionKeys[index]);
                }
            });

            // Update cheatsheet item descriptions
            const descriptionMap = {
                'Creates a grid container': 'cheatsheet.createsGrid',
                'ქმნის Grid კონტეინერს': 'cheatsheet.createsGrid',
                'Define column sizes': 'cheatsheet.defineColumns',
                'განსაზღვრავს სვეტების ზომას': 'cheatsheet.defineColumns',
                'Define row sizes': 'cheatsheet.defineRows',
                'განსაზღვრავს რიგების ზომას': 'cheatsheet.defineRows',
                'Space between items': 'cheatsheet.spaceBetween',
                'დაშორება ელემენტებს შორის': 'cheatsheet.spaceBetween',
                'Name grid regions': 'cheatsheet.nameRegions',
                'დაასახელებს Grid რეგიონებს': 'cheatsheet.nameRegions',
                'Span columns 1-2': 'cheatsheet.spanColumns',
                'გაშლა 1-2 სვეტზე': 'cheatsheet.spanColumns',
                'Span 2 rows': 'cheatsheet.spanRows',
                'გაშლა 2 რიგზე': 'cheatsheet.spanRows',
                'Place in named area': 'cheatsheet.placeInArea',
                'განთავსება დასახელებულ არეში': 'cheatsheet.placeInArea',
                'Horizontal in cell': 'cheatsheet.horizontalCell',
                'ჰორიზონტალური უჯრაში': 'cheatsheet.horizontalCell',
                'Vertical in cell': 'cheatsheet.verticalCell',
                'ვერტიკალური უჯრაში': 'cheatsheet.verticalCell',
                'Center both axes': 'cheatsheet.centerBoth',
                'ცენტრირება ორივე ღერძზე': 'cheatsheet.centerBoth',
                'Auto-responsive columns': 'cheatsheet.autoResponsive',
                'ავტო-რესპონსიული სვეტები': 'cheatsheet.autoResponsive',
                'Fraction of free space': 'cheatsheet.fractionSpace',
                'თავისუფალი სივრცის ნაწილი': 'cheatsheet.fractionSpace',
                'Size range': 'cheatsheet.sizeRange',
                'ზომის დიაპაზონი': 'cheatsheet.sizeRange'
            };

            cheatsheetModal.querySelectorAll('.cheatsheet-item span').forEach(span => {
                const text = span.textContent.trim();
                if (descriptionMap[text]) {
                    span.textContent = this.get(descriptionMap[text]);
                }
            });
        }
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
