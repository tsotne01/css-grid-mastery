# CSS Grid Mastery ⊞

An interactive learning platform for mastering CSS Grid, built for [10x Academy](https://10x.edu.ge) students.

🔗 **Live Demo:** [https://tsotne01.github.io/css-grid-mastery/](https://tsotne01.github.io/css-grid-mastery/)

## Features

### 📚 Learning
- **21 comprehensive lessons** covering everything from basics to advanced techniques
- **Live code editors** with instant preview
- **Interactive controls** to experiment with Grid properties
- **3 practical challenges** to test your skills

### 🎮 Game Modes
- **⚔️ Grid Battle** - Time attack challenges (35 total!)
  - Basic challenges (10)
  - Responsive challenges (10)
  - Speed challenges (10)
  - Advanced patterns (5)
- **🔍 Debug Detective** - Find and fix CSS bugs (10 challenges)
- **🎨 Clone Challenge** - Recreate real website layouts (5 challenges)
  - Twitter, YouTube, Netflix, Spotify, GitHub
- **📅 Daily Challenge** - New challenge every day with streaks!

### 🏆 Progression System
- **XP & Levels** - Earn XP and progress from Novice to Master
- **15 Achievements** - Unlock badges for your accomplishments
- **Streak Tracking** - Build daily learning habits
- **Progress saved** to localStorage

### 💅 UI/UX
- 📱 **Mobile responsive** design
- 🌙 **Dark/Light mode** toggle
- ⌨️ **Keyboard navigation** (arrow keys, Tab, ?)
- 🎉 **Confetti celebrations** for achievements

## Topics Covered

### Fundamentals
- Grid Container
- Columns & Rows  
- Gap & Spacing
- The `fr` Unit

### Placement
- Line-Based Placement
- Spanning Items
- Grid Areas
- Named Lines

### Alignment
- justify-items / align-items
- place-items
- justify-content / align-content

### Advanced
- auto-fill & auto-fit
- minmax()
- Auto Flow
- Subgrid

## Game Mode Details

### ⚔️ Grid Battle
Race against the clock to recreate CSS Grid layouts:
- See the target layout
- Write CSS to match it
- Score = Accuracy + Speed Bonus + Perfect Bonus
- Use hints (costs points)

### 🔍 Debug Detective  
Find and fix common CSS Grid bugs:
- Typos, missing properties, wrong values
- Learn from common mistakes
- Hints available

### 🎨 Clone Challenge
Recreate layouts from famous websites:
- Twitter sidebar
- YouTube video grid
- Netflix browse row
- Spotify playlist
- GitHub repo page

### 📅 Daily Challenge
- New challenge generated each day
- Build streaks for consecutive days
- Share your results!

## Built With

- Pure HTML, CSS, JavaScript (no frameworks)
- [Playwright](https://playwright.dev/) for testing
- Hosted on GitHub Pages

## For Students

1. Start with the Introduction lesson
2. Read the explanation, then experiment with the code editor
3. Try the interactive controls where available
4. Complete the challenges at the end
5. Play the game modes to practice!
6. Your progress is saved automatically!

## Local Development

```bash
# Clone the repo
git clone https://github.com/tsotne01/css-grid-mastery.git
cd css-grid-mastery

# Install dependencies
npm install

# Run tests
npx playwright test

# Open in browser
npx serve .
```

## Testing

```bash
# Run all tests
npx playwright test

# Run with UI
npx playwright test --ui

# Run specific project
npx playwright test --project=chromium
```

## Credits

Built with ❤️ by Tsotne Chkhenkeli & Kai for 10x Academy

---

*Master CSS Grid, and you'll never struggle with layouts again!* 🎮
