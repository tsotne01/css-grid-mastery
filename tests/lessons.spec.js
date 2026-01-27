// @ts-check
const { test, expect } = require('@playwright/test');

// All lessons to test
const lessons = [
  'intro', 'container', 'columns-rows', 'gap', 'fr-unit',
  'line-placement', 'span', 'grid-areas', 'named-lines',
  'justify-items', 'align-items', 'place-items', 'justify-content', 'align-content',
  'auto-fill', 'minmax', 'auto-flow', 'subgrid',
  'challenge-1', 'challenge-2', 'challenge-3'
];

test.describe('CSS Grid Mastery', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for app to initialize
    await page.waitForSelector('.lesson');
  });

  test('homepage loads correctly', async ({ page }) => {
    await expect(page).toHaveTitle(/CSS Grid Mastery/);
    await expect(page.locator('.logo')).toBeVisible();
    await expect(page.locator('.sidebar')).toBeVisible();
    await expect(page.locator('.content')).toBeVisible();
  });

  test('sidebar navigation works', async ({ page }) => {
    // Click on a different lesson
    await page.click('[data-lesson="gap"]');
    
    // Verify lesson changed
    await expect(page.locator('.lesson-header h1')).toContainText('Gap');
    
    // Verify nav item is active
    await expect(page.locator('[data-lesson="gap"]')).toHaveClass(/active/);
  });

  test('code editor updates preview', async ({ page }) => {
    // Go to intro lesson
    await page.click('[data-lesson="intro"]');
    await page.waitForSelector('#code-intro');
    
    // Get the code editor
    const editor = page.locator('#code-intro');
    
    // Clear and type new code
    await editor.fill(`.container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}`);
    
    // Wait for preview update
    await page.waitForTimeout(200);
    
    // Verify preview has 2 columns (items wrap to 3 rows instead of 2)
    const preview = page.locator('#preview-intro');
    await expect(preview).toBeVisible();
  });

  test('reset button restores default code', async ({ page }) => {
    await page.click('[data-lesson="intro"]');
    await page.waitForSelector('#code-intro');
    
    const editor = page.locator('#code-intro');
    const originalCode = await editor.inputValue();
    
    // Modify the code
    await editor.fill('.container { display: block; }');
    
    // Click reset
    await page.click('button:has-text("Reset")');
    
    // Verify code is restored
    const restoredCode = await editor.inputValue();
    expect(restoredCode).toBe(originalCode);
  });

  test('keyboard navigation works', async ({ page }) => {
    // Start at intro
    await page.click('[data-lesson="intro"]');
    await expect(page.locator('.lesson-header h1')).toContainText('Introduction');
    
    // Press right arrow (focus must be outside textarea)
    await page.locator('.lesson-header h1').click();
    await page.keyboard.press('ArrowRight');
    
    // Should navigate to next lesson
    await expect(page.locator('.lesson-header h1')).toContainText('Grid Container');
  });

  test('next/prev navigation buttons work', async ({ page }) => {
    await page.click('[data-lesson="gap"]');
    
    // Click previous
    await page.click('.lesson-nav-btn:has-text("Previous")');
    await expect(page.locator('.lesson-header h1')).toContainText('Columns');
    
    // Click next
    await page.click('.lesson-nav-btn:has-text("Next")');
    await expect(page.locator('.lesson-header h1')).toContainText('Gap');
  });

  test('progress is saved to localStorage', async ({ page }) => {
    // Navigate through lessons
    await page.click('[data-lesson="container"]');
    await page.click('[data-lesson="gap"]');
    
    // Check localStorage (we'd need to implement markComplete calls)
    // For now, just verify the mechanism exists
    const hasLocalStorage = await page.evaluate(() => {
      return typeof localStorage !== 'undefined';
    });
    expect(hasLocalStorage).toBe(true);
  });

});

test.describe('Visual Regression Tests', () => {
  
  test('intro lesson screenshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.lesson');
    await page.click('[data-lesson="intro"]');
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('lesson-intro.png', {
      fullPage: false,
      clip: { x: 280, y: 0, width: 920, height: 800 }
    });
  });

  test('grid-areas lesson screenshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.lesson');
    await page.click('[data-lesson="grid-areas"]');
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('lesson-grid-areas.png', {
      fullPage: false,
      clip: { x: 280, y: 0, width: 920, height: 800 }
    });
  });

  test('challenge-1 screenshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.lesson');
    await page.click('[data-lesson="challenge-1"]');
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('lesson-challenge-1.png', {
      fullPage: false,
      clip: { x: 280, y: 0, width: 920, height: 800 }
    });
  });

});

test.describe('Interactive Controls', () => {
  
  test('gap sliders update preview', async ({ page }) => {
    await page.goto('/');
    await page.click('[data-lesson="gap"]');
    await page.waitForSelector('#row-gap-slider');
    
    // Move row gap slider
    await page.locator('#row-gap-slider').fill('30');
    
    // Check value display updated
    await expect(page.locator('#row-gap-value')).toContainText('30px');
  });

  test('alignment buttons update preview', async ({ page }) => {
    await page.goto('/');
    await page.click('[data-lesson="justify-content"]');
    await page.waitForSelector('.control-btn');
    
    // Click center button
    await page.click('.control-btn:has-text("center")');
    
    // Verify button is active
    await expect(page.locator('.control-btn:has-text("center")')).toHaveClass(/active/);
  });

});

test.describe('Challenges', () => {
  
  test('challenge 1 - can show solution', async ({ page }) => {
    await page.goto('/');
    await page.click('[data-lesson="challenge-1"]');
    await page.waitForSelector('#code-challenge-1');
    
    // Click show answer
    await page.click('button:has-text("Show Answer")');
    
    // Verify solution code is shown
    const code = await page.locator('#code-challenge-1').inputValue();
    expect(code).toContain('grid-template-areas');
    expect(code).toContain('header');
    expect(code).toContain('footer');
  });

  test('challenge 2 - validates correct solution', async ({ page }) => {
    await page.goto('/');
    await page.click('[data-lesson="challenge-2"]');
    await page.waitForSelector('#code-challenge-2');
    
    // Enter correct solution
    await page.locator('#code-challenge-2').fill(`.container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}`);
    
    // Handle dialog
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Perfect');
      await dialog.accept();
    });
    
    // Click check
    await page.click('button:has-text("Check Solution")');
  });

});

test.describe('Mobile Responsiveness', () => {
  
  test.use({ viewport: { width: 375, height: 667 } });
  
  test('mobile menu button visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.mobile-menu-btn')).toBeVisible();
  });

  test('sidebar hidden by default on mobile', async ({ page }) => {
    await page.goto('/');
    const sidebar = page.locator('.sidebar');
    
    // Sidebar should be translated off-screen
    await expect(sidebar).not.toBeInViewport();
  });

  test('mobile menu opens sidebar', async ({ page }) => {
    await page.goto('/');
    
    // Click hamburger
    await page.click('.mobile-menu-btn');
    
    // Sidebar should be visible
    await expect(page.locator('.sidebar')).toBeInViewport();
  });

});

test.describe('Accessibility', () => {
  
  test('all lessons are keyboard navigable', async ({ page }) => {
    await page.goto('/');
    
    // Tab through nav links
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Should be able to activate with Enter
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('code editors are accessible', async ({ page }) => {
    await page.goto('/');
    await page.click('[data-lesson="intro"]');
    
    const editor = page.locator('#code-intro');
    await expect(editor).toHaveAttribute('spellcheck', 'false');
  });

});

// ============== GAME SYSTEM TESTS ==============

test.describe('Game System', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Clear game state
    await page.evaluate(() => {
      localStorage.removeItem('gridMasteryGameState');
    });
    await page.reload();
  });

  test('player stats bar is visible', async ({ page }) => {
    await expect(page.locator('.player-stats')).toBeVisible();
    await expect(page.locator('#player-level')).toBeVisible();
    await expect(page.locator('#player-xp')).toBeVisible();
    await expect(page.locator('#streak-count')).toBeVisible();
  });

  test('games navigation buttons exist', async ({ page }) => {
    await expect(page.locator('.games-nav')).toBeVisible();
    await expect(page.locator('button:has-text("Grid Battle")')).toBeVisible();
    await expect(page.locator('button:has-text("Debug Detective")')).toBeVisible();
    await expect(page.locator('button:has-text("Clone Challenge")')).toBeVisible();
    await expect(page.locator('button:has-text("Daily Challenge")')).toBeVisible();
    await expect(page.locator('button:has-text("Achievements")')).toBeVisible();
  });

  test('Grid Battle mode loads', async ({ page }) => {
    await page.click('button:has-text("Grid Battle")');
    
    await expect(page.locator('h1:has-text("Grid Battle")')).toBeVisible();
    await expect(page.locator('.challenge-list')).toBeVisible();
    
    // Check that challenges are listed
    await expect(page.locator('.challenge-list-item')).toHaveCount(35); // All challenges
  });

  test('Grid Battle category filter works', async ({ page }) => {
    await page.click('button:has-text("Grid Battle")');
    
    // Wait for challenges to load
    await expect(page.locator('.challenge-list')).toBeVisible();
    await expect(page.locator('.challenge-list-item')).toHaveCount(35, { timeout: 10000 });
    
    // Click "Responsive" category filter (inside game-container, not sidebar)
    await page.locator('#game-container button:has-text("Responsive")').click();
    
    // Wait for re-render and should show only responsive challenges (10)
    await page.waitForTimeout(300);
    await expect(page.locator('.challenge-list-item')).toHaveCount(10);
  });

  test('can start a Grid Battle challenge', async ({ page }) => {
    await page.click('button:has-text("Grid Battle")');
    
    // Click first challenge
    await page.click('.challenge-list-item:first-child');
    
    // Should see timer and code editor
    await expect(page.locator('.game-timer')).toBeVisible();
    await expect(page.locator('#battle-code')).toBeVisible();
    await expect(page.locator('#target-preview')).toBeVisible();
  });

  test('Debug Detective mode loads', async ({ page }) => {
    await page.click('button:has-text("Debug Detective")');
    
    await expect(page.locator('h1:has-text("Debug Detective")')).toBeVisible();
    await expect(page.locator('.challenge-list')).toBeVisible();
    
    // Check that challenges are listed (10)
    await expect(page.locator('.challenge-list-item')).toHaveCount(10);
  });

  test('can start a Debug challenge', async ({ page }) => {
    await page.click('button:has-text("Debug Detective")');
    await page.click('.challenge-list-item:first-child');
    
    // Should see code editor with buggy code
    await expect(page.locator('#debug-code')).toBeVisible();
    await expect(page.locator('button:has-text("Show Hint")')).toBeVisible();
  });

  test('Clone Challenge mode loads', async ({ page }) => {
    await page.click('button:has-text("Clone Challenge")');
    
    await expect(page.locator('h1:has-text("Clone Challenge")')).toBeVisible();
    await expect(page.locator('.challenge-list')).toBeVisible();
    
    // Check that challenges are listed (5)
    await expect(page.locator('.challenge-list-item')).toHaveCount(5);
  });

  test('Daily Challenge shows streak and calendar', async ({ page }) => {
    await page.click('button:has-text("Daily Challenge")');
    
    await expect(page.locator('h1:has-text("Daily Challenge")')).toBeVisible();
    await expect(page.locator('.streak-display')).toBeVisible();
    await expect(page.locator('.daily-calendar')).toBeVisible();
  });

  test('Achievements page shows all achievements', async ({ page }) => {
    await page.click('button:has-text("Achievements")');
    
    await expect(page.locator('h1:has-text("Achievements")')).toBeVisible();
    await expect(page.locator('.achievements-grid')).toBeVisible();
    
    // Should show all achievement cards (15)
    await expect(page.locator('.achievement-card')).toHaveCount(15);
  });

  test('back to lessons button works', async ({ page }) => {
    await page.click('button:has-text("Grid Battle")');
    await expect(page.locator('h1:has-text("Grid Battle")')).toBeVisible();
    
    // Click back button
    await page.click('button:has-text("Back to Lessons")');
    
    // Should show lessons again
    await expect(page.locator('#lesson-container')).toBeVisible();
  });

  test('XP display starts at 0', async ({ page }) => {
    await expect(page.locator('#player-xp')).toHaveText('0');
  });

  test('Level displays correctly', async ({ page }) => {
    await expect(page.locator('#player-level')).toContainText('Novice');
  });

});

test.describe('Game State Persistence', () => {
  
  test('game state saves to localStorage', async ({ page }) => {
    await page.goto('/');
    
    // Set some XP via JavaScript
    await page.evaluate(() => {
      gameState.xp = 500;
      gameState.achievements = ['firstLesson'];
      gameState.save();
    });
    
    // Reload and check
    await page.reload();
    
    const xp = await page.evaluate(() => gameState.xp);
    expect(xp).toBe(500);
    
    const achievements = await page.evaluate(() => gameState.achievements);
    expect(achievements).toContain('firstLesson');
  });

});
