// CSS Grid Mastery - Lesson Content
const lessons = {
    intro: {
        title: "Introduction to CSS Grid",
        subtitle: "The most powerful layout system in CSS. Master it and you'll never struggle with layouts again.",
        content: `
            <div class="lesson-section">
                <h2><span class="icon">🎯</span> What is CSS Grid?</h2>
                <p>CSS Grid is a two-dimensional layout system designed specifically for the web. Unlike Flexbox (which is one-dimensional), Grid lets you control both columns AND rows at the same time.</p>
                <p>Think of it like a spreadsheet — you define rows and columns, then place items exactly where you want them.</p>
            </div>

            <div class="lesson-section">
                <h2><span class="icon">⚡</span> Grid vs Flexbox</h2>
                <ul>
                    <li><strong>Flexbox:</strong> Best for one direction (row OR column). Great for navigation, card layouts, centering.</li>
                    <li><strong>Grid:</strong> Best for two directions (rows AND columns). Perfect for page layouts, complex component structures.</li>
                </ul>
                <p>You don't have to choose one — they work beautifully together!</p>
                
                <div class="tip">
                    <div class="tip-header">💡 Pro Tip</div>
                    <p>Use Grid for the overall page structure, and Flexbox for components inside grid cells.</p>
                </div>
            </div>

            <div class="playground">
                <div class="playground-header">
                    <div class="playground-title">
                        <span class="dot"></span>
                        Your First Grid
                    </div>
                    <div class="playground-actions">
                        <button class="btn btn-secondary" onclick="resetCode('intro')">Reset</button>
                    </div>
                </div>
                <div class="playground-body">
                    <div class="code-panel">
                        <div class="code-tabs">
                            <div class="code-tab active">CSS</div>
                        </div>
                        <div class="code-editor">
                            <textarea id="code-intro" spellcheck="false">.container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
}</textarea>
                        </div>
                    </div>
                    <div class="preview-panel">
                        <div class="preview-label">Live Preview</div>
                        <div class="preview-container">
                            <div id="preview-intro" class="grid-preview">
                                <div class="grid-item">1</div>
                                <div class="grid-item">2</div>
                                <div class="grid-item">3</div>
                                <div class="grid-item">4</div>
                                <div class="grid-item">5</div>
                                <div class="grid-item">6</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="challenge">
                <div class="challenge-header">
                    <h3>🎮 Try This</h3>
                    <span class="challenge-badge">Beginner</span>
                </div>
                <p class="challenge-task">Change the grid to have 2 columns instead of 3. What happens?</p>
                <details class="challenge-hints">
                    <summary>Need a hint?</summary>
                    <ul>
                        <li>Change <code>1fr 1fr 1fr</code> to <code>1fr 1fr</code></li>
                        <li>The items will now flow into 2 columns, creating 3 rows</li>
                    </ul>
                </details>
            </div>
        `,
        defaultCode: `.container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
}`
    },

    container: {
        title: "Grid Container",
        subtitle: "The parent element that holds all your grid items. This is where the magic begins.",
        content: `
            <div class="lesson-section">
                <h2><span class="icon">📦</span> Creating a Grid Container</h2>
                <p>To create a grid, simply apply <code>display: grid</code> to a container element. All direct children automatically become grid items.</p>
                <pre><code>.container {
    display: grid; /* or inline-grid */
}</code></pre>
                <p><strong>display: grid</strong> → Block-level grid container (takes full width)</p>
                <p><strong>display: inline-grid</strong> → Inline-level grid container (shrinks to content)</p>
            </div>

            <div class="playground">
                <div class="playground-header">
                    <div class="playground-title">
                        <span class="dot"></span>
                        Grid vs Inline-Grid
                    </div>
                    <div class="playground-actions">
                        <button class="btn btn-secondary" onclick="resetCode('container')">Reset</button>
                    </div>
                </div>
                <div class="playground-body">
                    <div class="code-panel">
                        <div class="code-tabs">
                            <div class="code-tab active">CSS</div>
                        </div>
                        <div class="code-editor">
                            <textarea id="code-container" spellcheck="false">.container {
    display: grid;
    grid-template-columns: 100px 100px;
    gap: 8px;
    background: rgba(99, 102, 241, 0.2);
    padding: 10px;
}</textarea>
                        </div>
                    </div>
                    <div class="preview-panel">
                        <div class="preview-label">Live Preview</div>
                        <div class="preview-container">
                            <div id="preview-container" class="grid-preview">
                                <div class="grid-item">A</div>
                                <div class="grid-item">B</div>
                                <div class="grid-item">C</div>
                                <div class="grid-item">D</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tip">
                <div class="tip-header">💡 Key Insight</div>
                <p>Without <code>grid-template-columns</code> or <code>grid-template-rows</code>, items just stack vertically. The grid exists, but has no defined structure yet.</p>
            </div>

            <div class="challenge">
                <div class="challenge-header">
                    <h3>🎮 Try This</h3>
                    <span class="challenge-badge">Beginner</span>
                </div>
                <p class="challenge-task">Change <code>display: grid</code> to <code>display: inline-grid</code>. Notice how the container shrinks to fit its content?</p>
            </div>
        `,
        defaultCode: `.container {
    display: grid;
    grid-template-columns: 100px 100px;
    gap: 8px;
    background: rgba(99, 102, 241, 0.2);
    padding: 10px;
}`
    },

    'columns-rows': {
        title: "Columns & Rows",
        subtitle: "Define the structure of your grid with grid-template-columns and grid-template-rows.",
        content: `
            <div class="lesson-section">
                <h2><span class="icon">📐</span> Defining Grid Tracks</h2>
                <p>Grid tracks are the spaces between grid lines. You define them with:</p>
                <ul>
                    <li><code>grid-template-columns</code> — defines column tracks</li>
                    <li><code>grid-template-rows</code> — defines row tracks</li>
                </ul>
                <p>You can use any CSS length unit: <code>px</code>, <code>%</code>, <code>em</code>, <code>rem</code>, <code>fr</code>, <code>auto</code>, etc.</p>
            </div>

            <div class="lesson-section">
                <h2><span class="icon">📏</span> Common Patterns</h2>
                <pre><code>/* Fixed sizes */
grid-template-columns: 100px 200px 100px;

/* Percentages */
grid-template-columns: 25% 50% 25%;

/* Mixed */
grid-template-columns: 200px auto 200px;

/* Repeat notation */
grid-template-columns: repeat(3, 1fr);

/* Same as: 1fr 1fr 1fr */</code></pre>
            </div>

            <div class="playground">
                <div class="playground-header">
                    <div class="playground-title">
                        <span class="dot"></span>
                        Column & Row Templates
                    </div>
                    <div class="playground-actions">
                        <button class="btn btn-secondary" onclick="resetCode('columns-rows')">Reset</button>
                    </div>
                </div>
                <div class="playground-body">
                    <div class="code-panel">
                        <div class="code-tabs">
                            <div class="code-tab active">CSS</div>
                        </div>
                        <div class="code-editor">
                            <textarea id="code-columns-rows" spellcheck="false">.container {
    display: grid;
    grid-template-columns: 100px 150px 100px;
    grid-template-rows: 60px 80px;
    gap: 10px;
}</textarea>
                        </div>
                    </div>
                    <div class="preview-panel">
                        <div class="preview-label">Live Preview</div>
                        <div class="preview-container">
                            <div id="preview-columns-rows" class="grid-preview">
                                <div class="grid-item">1</div>
                                <div class="grid-item">2</div>
                                <div class="grid-item">3</div>
                                <div class="grid-item">4</div>
                                <div class="grid-item">5</div>
                                <div class="grid-item">6</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tip">
                <div class="tip-header">💡 repeat() Shorthand</div>
                <p>Instead of writing <code>1fr 1fr 1fr 1fr</code>, use <code>repeat(4, 1fr)</code>. You can also mix patterns: <code>repeat(2, 1fr 2fr)</code> creates <code>1fr 2fr 1fr 2fr</code></p>
            </div>

            <div class="challenge">
                <div class="challenge-header">
                    <h3>🎮 Challenge</h3>
                    <span class="challenge-badge">Intermediate</span>
                </div>
                <p class="challenge-task">Create a layout with 4 equal columns using <code>repeat()</code>. Then make the first row 100px tall and the second row 50px.</p>
                <details class="challenge-hints">
                    <summary>Solution</summary>
                    <ul>
                        <li><code>grid-template-columns: repeat(4, 1fr);</code></li>
                        <li><code>grid-template-rows: 100px 50px;</code></li>
                    </ul>
                </details>
            </div>
        `,
        defaultCode: `.container {
    display: grid;
    grid-template-columns: 100px 150px 100px;
    grid-template-rows: 60px 80px;
    gap: 10px;
}`
    },

    gap: {
        title: "Gap & Spacing",
        subtitle: "Control the gutters between grid cells with the gap properties.",
        content: `
            <div class="lesson-section">
                <h2><span class="icon">↔️</span> The Gap Property</h2>
                <p>The <code>gap</code> property adds space between grid tracks (rows and columns). It's the modern replacement for the older <code>grid-gap</code>.</p>
                <pre><code>/* Same gap for rows and columns */
gap: 20px;

/* Different gaps: row-gap column-gap */
gap: 10px 20px;

/* Individual properties */
row-gap: 10px;
column-gap: 20px;</code></pre>
            </div>

            <div class="playground">
                <div class="playground-header">
                    <div class="playground-title">
                        <span class="dot"></span>
                        Gap Explorer
                    </div>
                    <div class="playground-actions">
                        <button class="btn btn-secondary" onclick="resetCode('gap')">Reset</button>
                    </div>
                </div>
                <div class="playground-body">
                    <div class="code-panel">
                        <div class="code-tabs">
                            <div class="code-tab active">CSS</div>
                        </div>
                        <div class="code-editor">
                            <textarea id="code-gap" spellcheck="false">.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}</textarea>
                        </div>
                    </div>
                    <div class="preview-panel">
                        <div class="preview-label">Live Preview</div>
                        <div class="preview-container">
                            <div id="preview-gap" class="grid-preview show-lines">
                                <div class="grid-item">1</div>
                                <div class="grid-item">2</div>
                                <div class="grid-item">3</div>
                                <div class="grid-item">4</div>
                                <div class="grid-item">5</div>
                                <div class="grid-item">6</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="controls">
                <div class="controls-header">🎛️ Interactive Controls</div>
                <div class="control-group">
                    <div class="control-label">
                        <span>Row Gap</span>
                        <span class="control-value" id="row-gap-value">20px</span>
                    </div>
                    <input type="range" class="control-slider" id="row-gap-slider" min="0" max="50" value="20" oninput="updateGap()">
                </div>
                <div class="control-group">
                    <div class="control-label">
                        <span>Column Gap</span>
                        <span class="control-value" id="col-gap-value">20px</span>
                    </div>
                    <input type="range" class="control-slider" id="col-gap-slider" min="0" max="50" value="20" oninput="updateGap()">
                </div>
            </div>

            <div class="tip">
                <div class="tip-header">💡 Gap vs Margin</div>
                <p>Unlike margins, gap only creates space <em>between</em> items, never on the outer edges. This makes layouts much more predictable!</p>
            </div>
        `,
        defaultCode: `.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}`
    },

    'fr-unit': {
        title: "The fr Unit",
        subtitle: "The most powerful unit in Grid. It represents a fraction of available space.",
        content: `
            <div class="lesson-section">
                <h2><span class="icon">✨</span> What is fr?</h2>
                <p>The <code>fr</code> unit stands for "fraction". It divides available space proportionally between tracks.</p>
                <pre><code>/* Equal thirds */
grid-template-columns: 1fr 1fr 1fr;

/* 1:2:1 ratio */
grid-template-columns: 1fr 2fr 1fr;

/* Fixed + flexible */
grid-template-columns: 200px 1fr 100px;</code></pre>
                <p>Think of it like slicing a pizza — <code>1fr 2fr 1fr</code> means "give the middle slice twice as much space".</p>
            </div>

            <div class="playground">
                <div class="playground-header">
                    <div class="playground-title">
                        <span class="dot"></span>
                        Fraction Units
                    </div>
                    <div class="playground-actions">
                        <button class="btn btn-secondary" onclick="resetCode('fr-unit')">Reset</button>
                    </div>
                </div>
                <div class="playground-body">
                    <div class="code-panel">
                        <div class="code-tabs">
                            <div class="code-tab active">CSS</div>
                        </div>
                        <div class="code-editor">
                            <textarea id="code-fr-unit" spellcheck="false">.container {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    gap: 10px;
}</textarea>
                        </div>
                    </div>
                    <div class="preview-panel">
                        <div class="preview-label">Live Preview</div>
                        <div class="preview-container">
                            <div id="preview-fr-unit" class="grid-preview">
                                <div class="grid-item">1fr</div>
                                <div class="grid-item">2fr</div>
                                <div class="grid-item">1fr</div>
                                <div class="grid-item">1fr</div>
                                <div class="grid-item">2fr</div>
                                <div class="grid-item">1fr</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="lesson-section">
                <h2><span class="icon">🧮</span> How fr Calculates</h2>
                <ol>
                    <li>Fixed sizes are allocated first (px, %, etc.)</li>
                    <li>Gaps are subtracted</li>
                    <li>Remaining space is divided by total fr units</li>
                </ol>
                <pre><code>/* Container: 1000px wide, gap: 20px */
grid-template-columns: 200px 1fr 2fr;

/* Calculation:
   1000px - 200px - (2 × 20px) = 760px remaining
   1fr = 760px ÷ 3 = ~253px
   2fr = ~507px */</code></pre>
            </div>

            <div class="tip">
                <div class="tip-header">💡 fr vs %</div>
                <p>Use <code>fr</code> over <code>%</code> when you can — it automatically accounts for gaps, while percentages don't!</p>
            </div>

            <div class="challenge">
                <div class="challenge-header">
                    <h3>🎮 Challenge</h3>
                    <span class="challenge-badge">Intermediate</span>
                </div>
                <p class="challenge-task">Create a "Holy Grail" layout: fixed 200px sidebar on the left, flexible content in the middle, fixed 150px sidebar on the right.</p>
                <details class="challenge-hints">
                    <summary>Solution</summary>
                    <ul>
                        <li><code>grid-template-columns: 200px 1fr 150px;</code></li>
                    </ul>
                </details>
            </div>
        `,
        defaultCode: `.container {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    gap: 10px;
}`
    },

    'line-placement': {
        title: "Line-Based Placement",
        subtitle: "Place items precisely by specifying which grid lines they start and end at.",
        content: `
            <div class="lesson-section">
                <h2><span class="icon">📍</span> Grid Lines</h2>
                <p>Every grid has invisible lines that separate tracks. Lines are numbered starting from 1.</p>
                <p>A 3-column grid has <strong>4 column lines</strong> (1, 2, 3, 4).</p>
                <pre><code>/* Place item from column line 1 to 3 */
grid-column-start: 1;
grid-column-end: 3;

/* Shorthand */
grid-column: 1 / 3;

/* Same for rows */
grid-row: 1 / 2;</code></pre>
            </div>

            <div class="playground">
                <div class="playground-header">
                    <div class="playground-title">
                        <span class="dot"></span>
                        Line Placement
                    </div>
                    <div class="playground-actions">
                        <button class="btn btn-secondary" onclick="resetCode('line-placement')">Reset</button>
                    </div>
                </div>
                <div class="playground-body">
                    <div class="code-panel">
                        <div class="code-tabs">
                            <div class="code-tab active">CSS</div>
                        </div>
                        <div class="code-editor">
                            <textarea id="code-line-placement" spellcheck="false">.container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 80px);
    gap: 10px;
}

.item-1 {
    grid-column: 1 / 3;
    grid-row: 1 / 2;
}</textarea>
                        </div>
                    </div>
                    <div class="preview-panel">
                        <div class="preview-label">Live Preview</div>
                        <div class="preview-container">
                            <div id="preview-line-placement" class="grid-preview show-lines">
                                <div class="grid-item" style="grid-column: 1 / 3;">1</div>
                                <div class="grid-item">2</div>
                                <div class="grid-item">3</div>
                                <div class="grid-item">4</div>
                                <div class="grid-item">5</div>
                                <div class="grid-item">6</div>
                                <div class="grid-item">7</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="lesson-section">
                <h2><span class="icon">➡️</span> Negative Line Numbers</h2>
                <p>You can count from the end using negative numbers. <code>-1</code> is the last line.</p>
                <pre><code>/* Span from start to end */
grid-column: 1 / -1;

/* Last two columns */
grid-column: -3 / -1;</code></pre>
            </div>

            <div class="tip">
                <div class="tip-header">💡 Memorize This</div>
                <p>Lines are like fence posts, tracks are like fence panels. A 3-column grid has 3 panels (tracks) and 4 posts (lines).</p>
            </div>
        `,
        defaultCode: `.container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 80px);
    gap: 10px;
}

.item-1 {
    grid-column: 1 / 3;
    grid-row: 1 / 2;
}`
    },

    span: {
        title: "Spanning Items",
        subtitle: "Make items span across multiple rows or columns.",
        content: `
            <div class="lesson-section">
                <h2><span class="icon">↔️</span> The span Keyword</h2>
                <p>Instead of specifying exact end lines, use <code>span</code> to cover a number of tracks.</p>
                <pre><code>/* Span 2 columns from wherever it starts */
grid-column: span 2;

/* Start at line 2, span 3 columns */
grid-column: 2 / span 3;

/* Span both ways */
grid-column: span 2;
grid-row: span 2;</code></pre>
            </div>

            <div class="playground">
                <div class="playground-header">
                    <div class="playground-title">
                        <span class="dot"></span>
                        Spanning Grid Items
                    </div>
                    <div class="playground-actions">
                        <button class="btn btn-secondary" onclick="resetCode('span')">Reset</button>
                    </div>
                </div>
                <div class="playground-body">
                    <div class="code-panel">
                        <div class="code-tabs">
                            <div class="code-tab active">CSS</div>
                        </div>
                        <div class="code-editor">
                            <textarea id="code-span" spellcheck="false">.container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 80px);
    gap: 10px;
}

.featured {
    grid-column: span 2;
    grid-row: span 2;
}</textarea>
                        </div>
                    </div>
                    <div class="preview-panel">
                        <div class="preview-label">Live Preview</div>
                        <div class="preview-container">
                            <div id="preview-span" class="grid-preview">
                                <div class="grid-item" style="grid-column: span 2; grid-row: span 2;">Featured</div>
                                <div class="grid-item">2</div>
                                <div class="grid-item">3</div>
                                <div class="grid-item">4</div>
                                <div class="grid-item">5</div>
                                <div class="grid-item">6</div>
                                <div class="grid-item">7</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tip">
                <div class="tip-header">💡 Common Use Cases</div>
                <p>Use spanning for: featured cards, hero sections, sidebar layouts, image galleries with different-sized thumbnails.</p>
            </div>

            <div class="challenge">
                <div class="challenge-header">
                    <h3>🎮 Challenge</h3>
                    <span class="challenge-badge">Intermediate</span>
                </div>
                <p class="challenge-task">Create a "bento box" layout where the first item spans 2 columns, and the 4th item spans 2 rows.</p>
            </div>
        `,
        defaultCode: `.container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 80px);
    gap: 10px;
}

.featured {
    grid-column: span 2;
    grid-row: span 2;
}`
    },

    'grid-areas': {
        title: "Grid Areas",
        subtitle: "Name your grid areas for semantic, readable layouts. This is a game-changer!",
        content: `
            <div class="lesson-section">
                <h2><span class="icon">🏷️</span> Naming Areas</h2>
                <p>Instead of line numbers, you can name areas and place items by name. Much more readable!</p>
                <pre><code>.container {
    display: grid;
    grid-template-columns: 200px 1fr 200px;
    grid-template-rows: 60px 1fr 40px;
    grid-template-areas:
        "header header header"
        "sidebar content aside"
        "footer footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }</code></pre>
            </div>

            <div class="playground">
                <div class="playground-header">
                    <div class="playground-title">
                        <span class="dot"></span>
                        Named Grid Areas
                    </div>
                    <div class="playground-actions">
                        <button class="btn btn-secondary" onclick="resetCode('grid-areas')">Reset</button>
                    </div>
                </div>
                <div class="playground-body">
                    <div class="code-panel">
                        <div class="code-tabs">
                            <div class="code-tab active">CSS</div>
                        </div>
                        <div class="code-editor">
                            <textarea id="code-grid-areas" spellcheck="false">.container {
    display: grid;
    grid-template-columns: 150px 1fr;
    grid-template-rows: 50px 1fr 40px;
    grid-template-areas:
        "header header"
        "sidebar main"
        "footer footer";
    gap: 10px;
    height: 300px;
}</textarea>
                        </div>
                    </div>
                    <div class="preview-panel">
                        <div class="preview-label">Live Preview</div>
                        <div class="preview-container">
                            <div id="preview-grid-areas" class="grid-preview" style="height: 300px;">
                                <div class="grid-item" style="grid-area: header;">Header</div>
                                <div class="grid-item" style="grid-area: sidebar;">Sidebar</div>
                                <div class="grid-item" style="grid-area: main;">Main</div>
                                <div class="grid-item" style="grid-area: footer;">Footer</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="lesson-section">
                <h2><span class="icon">⬜</span> Empty Cells</h2>
                <p>Use a dot <code>.</code> to leave cells empty:</p>
                <pre><code>grid-template-areas:
    "header header header"
    "sidebar . content"
    "footer footer footer";</code></pre>
            </div>

            <div class="tip">
                <div class="tip-header">💡 Why Use Areas?</div>
                <p>Grid areas make responsive layouts trivial — just redefine <code>grid-template-areas</code> in a media query!</p>
            </div>
        `,
        defaultCode: `.container {
    display: grid;
    grid-template-columns: 150px 1fr;
    grid-template-rows: 50px 1fr 40px;
    grid-template-areas:
        "header header"
        "sidebar main"
        "footer footer";
    gap: 10px;
    height: 300px;
}`
    },

    'named-lines': {
        title: "Named Lines",
        subtitle: "Give meaningful names to your grid lines for even clearer placement.",
        content: `
            <div class="lesson-section">
                <h2><span class="icon">🏷️</span> Naming Grid Lines</h2>
                <p>You can name lines using square brackets in your template definitions:</p>
                <pre><code>grid-template-columns: 
    [sidebar-start] 200px 
    [sidebar-end content-start] 1fr 
    [content-end];

/* Then place items by name */
.sidebar {
    grid-column: sidebar-start / sidebar-end;
}</code></pre>
            </div>

            <div class="playground">
                <div class="playground-header">
                    <div class="playground-title">
                        <span class="dot"></span>
                        Named Lines
                    </div>
                    <div class="playground-actions">
                        <button class="btn btn-secondary" onclick="resetCode('named-lines')">Reset</button>
                    </div>
                </div>
                <div class="playground-body">
                    <div class="code-panel">
                        <div class="code-tabs">
                            <div class="code-tab active">CSS</div>
                        </div>
                        <div class="code-editor">
                            <textarea id="code-named-lines" spellcheck="false">.container {
    display: grid;
    grid-template-columns: 
        [full-start] 1fr 
        [content-start] 2fr 
        [content-end] 1fr 
        [full-end];
    grid-template-rows: repeat(3, 80px);
    gap: 10px;
}

.full-width {
    grid-column: full-start / full-end;
}</textarea>
                        </div>
                    </div>
                    <div class="preview-panel">
                        <div class="preview-label">Live Preview</div>
                        <div class="preview-container">
                            <div id="preview-named-lines" class="grid-preview">
                                <div class="grid-item" style="grid-column: 1 / -1;">Full Width</div>
                                <div class="grid-item">1</div>
                                <div class="grid-item">2</div>
                                <div class="grid-item">3</div>
                                <div class="grid-item">4</div>
                                <div class="grid-item">5</div>
                                <div class="grid-item">6</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tip">
                <div class="tip-header">💡 When to Use Named Lines</div>
                <p>Named lines shine in complex layouts where you reference the same lines repeatedly. They're also great for component libraries.</p>
            </div>
        `,
        defaultCode: `.container {
    display: grid;
    grid-template-columns: 
        [full-start] 1fr 
        [content-start] 2fr 
        [content-end] 1fr 
        [full-end];
    grid-template-rows: repeat(3, 80px);
    gap: 10px;
}

.full-width {
    grid-column: full-start / full-end;
}`
    },

    'justify-items': {
        title: "Justify Items",
        subtitle: "Align items horizontally (inline axis) within their grid cells.",
        content: `
            <div class="lesson-section">
                <h2><span class="icon">↔️</span> justify-items</h2>
                <p>Controls how items are aligned along the inline (horizontal) axis within their cells.</p>
                <pre><code>justify-items: start;    /* Left edge */
justify-items: end;      /* Right edge */
justify-items: center;   /* Center */
justify-items: stretch;  /* Fill cell (default) */</code></pre>
            </div>

            <div class="playground">
                <div class="playground-header">
                    <div class="playground-title">
                        <span class="dot"></span>
                        Justify Items
                    </div>
                    <div class="playground-actions">
                        <button class="btn btn-secondary" onclick="resetCode('justify-items')">Reset</button>
                    </div>
                </div>
                <div class="playground-body">
                    <div class="code-panel">
                        <div class="code-tabs">
                            <div class="code-tab active">CSS</div>
                        </div>
                        <div class="code-editor">
                            <textarea id="code-justify-items" spellcheck="false">.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    justify-items: center;
}</textarea>
                        </div>
                    </div>
                    <div class="preview-panel">
                        <div class="preview-label">Live Preview</div>
                        <div class="preview-container">
                            <div id="preview-justify-items" class="grid-preview show-lines">
                                <div class="grid-item" style="width: auto; padding: 10px 20px;">1</div>
                                <div class="grid-item" style="width: auto; padding: 10px 20px;">2</div>
                                <div class="grid-item" style="width: auto; padding: 10px 20px;">3</div>
                                <div class="grid-item" style="width: auto; padding: 10px 20px;">4</div>
                                <div class="grid-item" style="width: auto; padding: 10px 20px;">5</div>
                                <div class="grid-item" style="width: auto; padding: 10px 20px;">6</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="controls">
                <div class="controls-header">🎛️ Try Each Value</div>
                <div class="control-group">
                    <div class="control-buttons">
                        <button class="control-btn" onclick="setJustifyItems('start')">start</button>
                        <button class="control-btn" onclick="setJustifyItems('end')">end</button>
                        <button class="control-btn active" onclick="setJustifyItems('center')">center</button>
                        <button class="control-btn" onclick="setJustifyItems('stretch')">stretch</button>
                    </div>
                </div>
            </div>
        `,
        defaultCode: `.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    justify-items: center;
}`
    },

    'align-items': {
        title: "Align Items",
        subtitle: "Align items vertically (block axis) within their grid cells.",
        content: `
            <div class="lesson-section">
                <h2><span class="icon">↕️</span> align-items</h2>
                <p>Controls how items are aligned along the block (vertical) axis within their cells.</p>
                <pre><code>align-items: start;    /* Top */
align-items: end;      /* Bottom */
align-items: center;   /* Center */
align-items: stretch;  /* Fill cell (default) */</code></pre>
            </div>

            <div class="playground">
                <div class="playground-header">
                    <div class="playground-title">
                        <span class="dot"></span>
                        Align Items
                    </div>
                    <div class="playground-actions">
                        <button class="btn btn-secondary" onclick="resetCode('align-items')">Reset</button>
                    </div>
                </div>
                <div class="playground-body">
                    <div class="code-panel">
                        <div class="code-tabs">
                            <div class="code-tab active">CSS</div>
                        </div>
                        <div class="code-editor">
                            <textarea id="code-align-items" spellcheck="false">.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 100px);
    gap: 10px;
    align-items: center;
}</textarea>
                        </div>
                    </div>
                    <div class="preview-panel">
                        <div class="preview-label">Live Preview</div>
                        <div class="preview-container">
                            <div id="preview-align-items" class="grid-preview show-lines" style="grid-template-rows: repeat(2, 100px);">
                                <div class="grid-item" style="height: auto; padding: 15px;">1</div>
                                <div class="grid-item" style="height: auto; padding: 15px;">2</div>
                                <div class="grid-item" style="height: auto; padding: 15px;">3</div>
                                <div class="grid-item" style="height: auto; padding: 15px;">4</div>
                                <div class="grid-item" style="height: auto; padding: 15px;">5</div>
                                <div class="grid-item" style="height: auto; padding: 15px;">6</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="controls">
                <div class="controls-header">🎛️ Try Each Value</div>
                <div class="control-group">
                    <div class="control-buttons">
                        <button class="control-btn" onclick="setAlignItems('start')">start</button>
                        <button class="control-btn" onclick="setAlignItems('end')">end</button>
                        <button class="control-btn active" onclick="setAlignItems('center')">center</button>
                        <button class="control-btn" onclick="setAlignItems('stretch')">stretch</button>
                    </div>
                </div>
            </div>
        `,
        defaultCode: `.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 100px);
    gap: 10px;
    align-items: center;
}`
    },

    'place-items': {
        title: "Place Items",
        subtitle: "The shorthand for align-items + justify-items in one property.",
        content: `
            <div class="lesson-section">
                <h2><span class="icon">🎯</span> place-items</h2>
                <p>Combines <code>align-items</code> and <code>justify-items</code> into one shorthand.</p>
                <pre><code>/* align-items / justify-items */
place-items: center center;

/* If both are the same, use one value */
place-items: center;

/* Perfect centering! */
display: grid;
place-items: center;</code></pre>
            </div>

            <div class="playground">
                <div class="playground-header">
                    <div class="playground-title">
                        <span class="dot"></span>
                        Place Items — Perfect Centering
                    </div>
                    <div class="playground-actions">
                        <button class="btn btn-secondary" onclick="resetCode('place-items')">Reset</button>
                    </div>
                </div>
                <div class="playground-body">
                    <div class="code-panel">
                        <div class="code-tabs">
                            <div class="code-tab active">CSS</div>
                        </div>
                        <div class="code-editor">
                            <textarea id="code-place-items" spellcheck="false">.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 100px);
    gap: 10px;
    place-items: center;
}</textarea>
                        </div>
                    </div>
                    <div class="preview-panel">
                        <div class="preview-label">Live Preview</div>
                        <div class="preview-container">
                            <div id="preview-place-items" class="grid-preview show-lines" style="grid-template-rows: repeat(2, 100px);">
                                <div class="grid-item" style="width: auto; height: auto; padding: 15px 20px;">1</div>
                                <div class="grid-item" style="width: auto; height: auto; padding: 15px 20px;">2</div>
                                <div class="grid-item" style="width: auto; height: auto; padding: 15px 20px;">3</div>
                                <div class="grid-item" style="width: auto; height: auto; padding: 15px 20px;">4</div>
                                <div class="grid-item" style="width: auto; height: auto; padding: 15px 20px;">5</div>
                                <div class="grid-item" style="width: auto; height: auto; padding: 15px 20px;">6</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tip">
                <div class="tip-header">💡 The Easiest Centering Trick</div>
                <p>This is the fastest way to center anything in CSS:<br><code>display: grid; place-items: center;</code></p>
            </div>
        `,
        defaultCode: `.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 100px);
    gap: 10px;
    place-items: center;
}`
    },

    'justify-content': {
        title: "Justify Content",
        subtitle: "Align the entire grid horizontally when it's smaller than its container.",
        content: `
            <div class="lesson-section">
                <h2><span class="icon">↔️</span> justify-content</h2>
                <p>When your grid tracks don't fill the entire container, this property controls how the grid itself is positioned horizontally.</p>
                <pre><code>justify-content: start;         /* Left */
justify-content: end;           /* Right */
justify-content: center;        /* Center */
justify-content: space-between; /* Edges, gaps between */
justify-content: space-around;  /* Equal gaps around */
justify-content: space-evenly;  /* Perfectly equal */</code></pre>
            </div>

            <div class="playground">
                <div class="playground-header">
                    <div class="playground-title">
                        <span class="dot"></span>
                        Justify Content
                    </div>
                    <div class="playground-actions">
                        <button class="btn btn-secondary" onclick="resetCode('justify-content')">Reset</button>
                    </div>
                </div>
                <div class="playground-body">
                    <div class="code-panel">
                        <div class="code-tabs">
                            <div class="code-tab active">CSS</div>
                        </div>
                        <div class="code-editor">
                            <textarea id="code-justify-content" spellcheck="false">.container {
    display: grid;
    grid-template-columns: repeat(3, 80px);
    gap: 10px;
    justify-content: space-between;
}</textarea>
                        </div>
                    </div>
                    <div class="preview-panel">
                        <div class="preview-label">Live Preview</div>
                        <div class="preview-container">
                            <div id="preview-justify-content" class="grid-preview" style="background: rgba(99, 102, 241, 0.1);">
                                <div class="grid-item">1</div>
                                <div class="grid-item">2</div>
                                <div class="grid-item">3</div>
                                <div class="grid-item">4</div>
                                <div class="grid-item">5</div>
                                <div class="grid-item">6</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="controls">
                <div class="controls-header">🎛️ Try Each Value</div>
                <div class="control-group">
                    <div class="control-buttons">
                        <button class="control-btn" onclick="setJustifyContent('start')">start</button>
                        <button class="control-btn" onclick="setJustifyContent('center')">center</button>
                        <button class="control-btn" onclick="setJustifyContent('end')">end</button>
                        <button class="control-btn active" onclick="setJustifyContent('space-between')">space-between</button>
                        <button class="control-btn" onclick="setJustifyContent('space-around')">space-around</button>
                        <button class="control-btn" onclick="setJustifyContent('space-evenly')">space-evenly</button>
                    </div>
                </div>
            </div>

            <div class="tip">
                <div class="tip-header">💡 When Does This Apply?</div>
                <p>justify-content only has an effect when your grid tracks (columns) don't fill the entire container width. Use fixed sizes or max-content to see it work.</p>
            </div>
        `,
        defaultCode: `.container {
    display: grid;
    grid-template-columns: repeat(3, 80px);
    gap: 10px;
    justify-content: space-between;
}`
    },

    'align-content': {
        title: "Align Content",
        subtitle: "Align the entire grid vertically when it's smaller than its container.",
        content: `
            <div class="lesson-section">
                <h2><span class="icon">↕️</span> align-content</h2>
                <p>When your grid tracks don't fill the entire container vertically, this property controls how the grid itself is positioned.</p>
                <pre><code>align-content: start;         /* Top */
align-content: end;           /* Bottom */
align-content: center;        /* Center */
align-content: space-between; /* Edges, gaps between */
align-content: space-around;  /* Equal gaps around */
align-content: space-evenly;  /* Perfectly equal */</code></pre>
            </div>

            <div class="playground">
                <div class="playground-header">
                    <div class="playground-title">
                        <span class="dot"></span>
                        Align Content
                    </div>
                    <div class="playground-actions">
                        <button class="btn btn-secondary" onclick="resetCode('align-content')">Reset</button>
                    </div>
                </div>
                <div class="playground-body">
                    <div class="code-panel">
                        <div class="code-tabs">
                            <div class="code-tab active">CSS</div>
                        </div>
                        <div class="code-editor">
                            <textarea id="code-align-content" spellcheck="false">.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 60px);
    gap: 10px;
    height: 300px;
    align-content: center;
}</textarea>
                        </div>
                    </div>
                    <div class="preview-panel">
                        <div class="preview-label">Live Preview</div>
                        <div class="preview-container">
                            <div id="preview-align-content" class="grid-preview" style="height: 300px; background: rgba(99, 102, 241, 0.1);">
                                <div class="grid-item">1</div>
                                <div class="grid-item">2</div>
                                <div class="grid-item">3</div>
                                <div class="grid-item">4</div>
                                <div class="grid-item">5</div>
                                <div class="grid-item">6</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="controls">
                <div class="controls-header">🎛️ Try Each Value</div>
                <div class="control-group">
                    <div class="control-buttons">
                        <button class="control-btn" onclick="setAlignContent('start')">start</button>
                        <button class="control-btn active" onclick="setAlignContent('center')">center</button>
                        <button class="control-btn" onclick="setAlignContent('end')">end</button>
                        <button class="control-btn" onclick="setAlignContent('space-between')">space-between</button>
                        <button class="control-btn" onclick="setAlignContent('space-around')">space-around</button>
                        <button class="control-btn" onclick="setAlignContent('space-evenly')">space-evenly</button>
                    </div>
                </div>
            </div>
        `,
        defaultCode: `.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 60px);
    gap: 10px;
    height: 300px;
    align-content: center;
}`
    },

    'auto-fill': {
        title: "Auto-Fill & Auto-Fit",
        subtitle: "Create responsive grids that automatically adjust the number of columns.",
        content: `
            <div class="lesson-section">
                <h2><span class="icon">🔄</span> auto-fill vs auto-fit</h2>
                <p>These keywords create dynamic column counts based on available space.</p>
                <pre><code>/* Create as many 200px columns as will fit */
grid-template-columns: repeat(auto-fill, 200px);

/* Same, but collapsed empty tracks */
grid-template-columns: repeat(auto-fit, 200px);

/* With minmax for flexibility */
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));</code></pre>
            </div>

            <div class="lesson-section">
                <h2><span class="icon">🤔</span> The Difference</h2>
                <ul>
                    <li><strong>auto-fill:</strong> Creates as many tracks as possible, even if empty</li>
                    <li><strong>auto-fit:</strong> Creates tracks, but collapses empty ones to 0</li>
                </ul>
                <p>In most cases, you want <code>auto-fit</code> with <code>minmax()</code>.</p>
            </div>

            <div class="playground">
                <div class="playground-header">
                    <div class="playground-title">
                        <span class="dot"></span>
                        Responsive Grid Magic
                    </div>
                    <div class="playground-actions">
                        <button class="btn btn-secondary" onclick="resetCode('auto-fill')">Reset</button>
                    </div>
                </div>
                <div class="playground-body">
                    <div class="code-panel">
                        <div class="code-tabs">
                            <div class="code-tab active">CSS</div>
                        </div>
                        <div class="code-editor">
                            <textarea id="code-auto-fill" spellcheck="false">.container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 15px;
}</textarea>
                        </div>
                    </div>
                    <div class="preview-panel">
                        <div class="preview-label">Live Preview (resize browser to see magic!)</div>
                        <div class="preview-container">
                            <div id="preview-auto-fill" class="grid-preview">
                                <div class="grid-item">1</div>
                                <div class="grid-item">2</div>
                                <div class="grid-item">3</div>
                                <div class="grid-item">4</div>
                                <div class="grid-item">5</div>
                                <div class="grid-item">6</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tip">
                <div class="tip-header">💡 The Holy Grail of Responsive Grids</div>
                <p><code>grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));</code><br>
                This single line creates a fully responsive grid with no media queries!</p>
            </div>
        `,
        defaultCode: `.container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 15px;
}`
    },

    minmax: {
        title: "minmax()",
        subtitle: "Set minimum and maximum sizes for grid tracks.",
        content: `
            <div class="lesson-section">
                <h2><span class="icon">📏</span> The minmax() Function</h2>
                <p>Creates a size range that adapts based on available space.</p>
                <pre><code>/* At least 100px, at most 200px */
grid-template-columns: minmax(100px, 200px) 1fr;

/* At least 100px, but can grow */
grid-template-columns: minmax(100px, 1fr);

/* Content-based minimum */
grid-template-columns: minmax(min-content, 300px);

/* Let content decide, but cap it */
grid-template-columns: minmax(auto, 50%);</code></pre>
            </div>

            <div class="playground">
                <div class="playground-header">
                    <div class="playground-title">
                        <span class="dot"></span>
                        minmax() in Action
                    </div>
                    <div class="playground-actions">
                        <button class="btn btn-secondary" onclick="resetCode('minmax')">Reset</button>
                    </div>
                </div>
                <div class="playground-body">
                    <div class="code-panel">
                        <div class="code-tabs">
                            <div class="code-tab active">CSS</div>
                        </div>
                        <div class="code-editor">
                            <textarea id="code-minmax" spellcheck="false">.container {
    display: grid;
    grid-template-columns: 
        minmax(100px, 200px) 
        minmax(200px, 1fr) 
        minmax(100px, 200px);
    gap: 10px;
}</textarea>
                        </div>
                    </div>
                    <div class="preview-panel">
                        <div class="preview-label">Live Preview</div>
                        <div class="preview-container">
                            <div id="preview-minmax" class="grid-preview">
                                <div class="grid-item">Sidebar<br>100-200px</div>
                                <div class="grid-item">Content<br>200px-1fr</div>
                                <div class="grid-item">Aside<br>100-200px</div>
                                <div class="grid-item">A</div>
                                <div class="grid-item">B</div>
                                <div class="grid-item">C</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="lesson-section">
                <h2><span class="icon">🔑</span> Special Keywords</h2>
                <ul>
                    <li><code>min-content</code> — Smallest size without overflow</li>
                    <li><code>max-content</code> — Ideal size for content</li>
                    <li><code>auto</code> — Adapts to content (min: min-content, max: max-content)</li>
                </ul>
            </div>
        `,
        defaultCode: `.container {
    display: grid;
    grid-template-columns: 
        minmax(100px, 200px) 
        minmax(200px, 1fr) 
        minmax(100px, 200px);
    gap: 10px;
}`
    },

    'auto-flow': {
        title: "Auto Flow",
        subtitle: "Control how auto-placed items flow into the grid.",
        content: `
            <div class="lesson-section">
                <h2><span class="icon">🌊</span> grid-auto-flow</h2>
                <p>Controls the direction items flow when they're not explicitly placed.</p>
                <pre><code>grid-auto-flow: row;        /* Fill rows first (default) */
grid-auto-flow: column;     /* Fill columns first */
grid-auto-flow: dense;      /* Fill gaps aggressively */
grid-auto-flow: row dense;  /* Rows, but fill gaps */</code></pre>
            </div>

            <div class="playground">
                <div class="playground-header">
                    <div class="playground-title">
                        <span class="dot"></span>
                        Auto Flow Direction
                    </div>
                    <div class="playground-actions">
                        <button class="btn btn-secondary" onclick="resetCode('auto-flow')">Reset</button>
                    </div>
                </div>
                <div class="playground-body">
                    <div class="code-panel">
                        <div class="code-tabs">
                            <div class="code-tab active">CSS</div>
                        </div>
                        <div class="code-editor">
                            <textarea id="code-auto-flow" spellcheck="false">.container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 80px);
    grid-auto-flow: row dense;
    gap: 10px;
}

.wide {
    grid-column: span 2;
}</textarea>
                        </div>
                    </div>
                    <div class="preview-panel">
                        <div class="preview-label">Live Preview</div>
                        <div class="preview-container">
                            <div id="preview-auto-flow" class="grid-preview">
                                <div class="grid-item" style="grid-column: span 2;">Wide 1</div>
                                <div class="grid-item">2</div>
                                <div class="grid-item" style="grid-column: span 2;">Wide 3</div>
                                <div class="grid-item">4</div>
                                <div class="grid-item">5</div>
                                <div class="grid-item">6</div>
                                <div class="grid-item">7</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="controls">
                <div class="controls-header">🎛️ Try Each Flow</div>
                <div class="control-group">
                    <div class="control-buttons">
                        <button class="control-btn" onclick="setAutoFlow('row')">row</button>
                        <button class="control-btn" onclick="setAutoFlow('column')">column</button>
                        <button class="control-btn active" onclick="setAutoFlow('row dense')">row dense</button>
                    </div>
                </div>
            </div>

            <div class="tip">
                <div class="tip-header">💡 When to Use dense</div>
                <p>Use <code>dense</code> for image galleries or masonry-like layouts where visual order doesn't matter. Avoid it when order is important (accessibility).</p>
            </div>
        `,
        defaultCode: `.container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 80px);
    grid-auto-flow: row dense;
    gap: 10px;
}

.wide {
    grid-column: span 2;
}`
    },

    subgrid: {
        title: "Subgrid",
        subtitle: "Let nested grids inherit tracks from their parent. A CSS Grid superpower!",
        content: `
            <div class="lesson-section">
                <h2><span class="icon">🪆</span> What is Subgrid?</h2>
                <p>Subgrid allows a nested grid to use the tracks of its parent grid. Perfect for cards with consistent internal alignment!</p>
                <pre><code>.parent {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.child {
    display: grid;
    grid-template-columns: subgrid;
    grid-column: span 2;
}</code></pre>
            </div>

            <div class="playground">
                <div class="playground-header">
                    <div class="playground-title">
                        <span class="dot"></span>
                        Subgrid Demo
                    </div>
                    <div class="playground-actions">
                        <button class="btn btn-secondary" onclick="resetCode('subgrid')">Reset</button>
                    </div>
                </div>
                <div class="playground-body">
                    <div class="code-panel">
                        <div class="code-tabs">
                            <div class="code-tab active">CSS</div>
                        </div>
                        <div class="code-editor">
                            <textarea id="code-subgrid" spellcheck="false">.parent {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
}

.card {
    display: grid;
    grid-template-columns: subgrid;
    grid-column: span 2;
    background: rgba(99, 102, 241, 0.2);
    padding: 10px;
    border-radius: 8px;
}</textarea>
                        </div>
                    </div>
                    <div class="preview-panel">
                        <div class="preview-label">Live Preview</div>
                        <div class="preview-container">
                            <div id="preview-subgrid" class="grid-preview" style="grid-template-columns: repeat(4, 1fr);">
                                <div style="display: grid; grid-template-columns: subgrid; grid-column: span 2; background: rgba(99, 102, 241, 0.2); padding: 10px; border-radius: 8px; gap: 10px;">
                                    <div class="grid-item">A1</div>
                                    <div class="grid-item">A2</div>
                                </div>
                                <div style="display: grid; grid-template-columns: subgrid; grid-column: span 2; background: rgba(139, 92, 246, 0.2); padding: 10px; border-radius: 8px; gap: 10px;">
                                    <div class="grid-item">B1</div>
                                    <div class="grid-item">B2</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tip">
                <div class="tip-header">💡 Subgrid Use Cases</div>
                <p>Perfect for: Card grids with aligned titles/descriptions, form labels aligned across multiple fields, table-like layouts with flexible content.</p>
            </div>

            <div class="lesson-section">
                <h2><span class="icon">⚠️</span> Browser Support</h2>
                <p>Subgrid is supported in all modern browsers (Chrome 117+, Firefox 71+, Safari 16+). For older browsers, use fallbacks.</p>
            </div>
        `,
        defaultCode: `.parent {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
}

.card {
    display: grid;
    grid-template-columns: subgrid;
    grid-column: span 2;
    background: rgba(99, 102, 241, 0.2);
    padding: 10px;
    border-radius: 8px;
}`
    },

    'challenge-1': {
        title: "Challenge: Holy Grail Layout",
        subtitle: "Build the classic Holy Grail layout with header, footer, sidebar, content, and aside.",
        content: `
            <div class="lesson-section">
                <h2><span class="icon">🏆</span> The Challenge</h2>
                <p>Create the "Holy Grail" layout: a header spanning the full width, a footer spanning the full width, and a three-column middle section with a sidebar, main content, and aside.</p>
                <p><strong>Requirements:</strong></p>
                <ul>
                    <li>Header: full width, 60px tall</li>
                    <li>Footer: full width, 40px tall</li>
                    <li>Sidebar: 200px wide</li>
                    <li>Content: flexible (takes remaining space)</li>
                    <li>Aside: 150px wide</li>
                    <li>Gap: 10px everywhere</li>
                </ul>
            </div>

            <div class="playground">
                <div class="playground-header">
                    <div class="playground-title">
                        <span class="dot"></span>
                        Your Solution
                    </div>
                    <div class="playground-actions">
                        <button class="btn btn-primary" onclick="checkChallenge1()">Check Solution</button>
                        <button class="btn btn-secondary" onclick="showSolution('challenge-1')">Show Answer</button>
                    </div>
                </div>
                <div class="playground-body">
                    <div class="code-panel">
                        <div class="code-tabs">
                            <div class="code-tab active">CSS</div>
                        </div>
                        <div class="code-editor">
                            <textarea id="code-challenge-1" spellcheck="false">.container {
    display: grid;
    /* Your code here */
    
    height: 400px;
}</textarea>
                        </div>
                    </div>
                    <div class="preview-panel">
                        <div class="preview-label">Live Preview</div>
                        <div class="preview-container">
                            <div id="preview-challenge-1" class="grid-preview" style="height: 400px;">
                                <div class="grid-item" style="grid-area: header;">Header</div>
                                <div class="grid-item" style="grid-area: sidebar;">Sidebar</div>
                                <div class="grid-item" style="grid-area: content;">Content</div>
                                <div class="grid-item" style="grid-area: aside;">Aside</div>
                                <div class="grid-item" style="grid-area: footer;">Footer</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <details class="challenge-hints" style="margin-top: 20px;">
                <summary>Hints</summary>
                <ul>
                    <li>Use <code>grid-template-areas</code> for semantic placement</li>
                    <li>Define columns: 200px for sidebar, 1fr for content, 150px for aside</li>
                    <li>Define rows: 60px for header, 1fr for middle, 40px for footer</li>
                </ul>
            </details>
        `,
        defaultCode: `.container {
    display: grid;
    /* Your code here */
    
    height: 400px;
}`,
        solution: `.container {
    display: grid;
    grid-template-columns: 200px 1fr 150px;
    grid-template-rows: 60px 1fr 40px;
    grid-template-areas:
        "header header header"
        "sidebar content aside"
        "footer footer footer";
    gap: 10px;
    height: 400px;
}`
    },

    'challenge-2': {
        title: "Challenge: Responsive Card Grid",
        subtitle: "Create a card grid that automatically adjusts columns based on screen width.",
        content: `
            <div class="lesson-section">
                <h2><span class="icon">🏆</span> The Challenge</h2>
                <p>Create a responsive card grid where:</p>
                <ul>
                    <li>Cards are minimum 250px wide</li>
                    <li>Cards grow to fill available space</li>
                    <li>Number of columns adjusts automatically</li>
                    <li>Gap of 20px between cards</li>
                    <li>No media queries needed!</li>
                </ul>
            </div>

            <div class="playground">
                <div class="playground-header">
                    <div class="playground-title">
                        <span class="dot"></span>
                        Your Solution
                    </div>
                    <div class="playground-actions">
                        <button class="btn btn-primary" onclick="checkChallenge2()">Check Solution</button>
                        <button class="btn btn-secondary" onclick="showSolution('challenge-2')">Show Answer</button>
                    </div>
                </div>
                <div class="playground-body">
                    <div class="code-panel">
                        <div class="code-tabs">
                            <div class="code-tab active">CSS</div>
                        </div>
                        <div class="code-editor">
                            <textarea id="code-challenge-2" spellcheck="false">.container {
    display: grid;
    /* Your code here - one line! */
    
}</textarea>
                        </div>
                    </div>
                    <div class="preview-panel">
                        <div class="preview-label">Live Preview (resize browser!)</div>
                        <div class="preview-container">
                            <div id="preview-challenge-2" class="grid-preview">
                                <div class="grid-item">Card 1</div>
                                <div class="grid-item">Card 2</div>
                                <div class="grid-item">Card 3</div>
                                <div class="grid-item">Card 4</div>
                                <div class="grid-item">Card 5</div>
                                <div class="grid-item">Card 6</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <details class="challenge-hints" style="margin-top: 20px;">
                <summary>Hints</summary>
                <ul>
                    <li>Use <code>repeat()</code> with <code>auto-fit</code></li>
                    <li>Use <code>minmax()</code> for flexible sizing</li>
                    <li>The answer is literally one line of CSS</li>
                </ul>
            </details>
        `,
        defaultCode: `.container {
    display: grid;
    /* Your code here - one line! */
    
}`,
        solution: `.container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}`
    },

    'challenge-3': {
        title: "Challenge: Dashboard Layout",
        subtitle: "Build a complex dashboard with a sidebar, header, main content, and widgets.",
        content: `
            <div class="lesson-section">
                <h2><span class="icon">🏆</span> The Challenge</h2>
                <p>Create a dashboard layout with:</p>
                <ul>
                    <li>Fixed sidebar on the left (80px wide)</li>
                    <li>Header at the top (50px tall, doesn't include sidebar)</li>
                    <li>Main content area</li>
                    <li>Two widget areas on the right (stacked)</li>
                    <li>Gap: 15px</li>
                    <li>Total height: 400px</li>
                </ul>
            </div>

            <div class="playground">
                <div class="playground-header">
                    <div class="playground-title">
                        <span class="dot"></span>
                        Your Solution
                    </div>
                    <div class="playground-actions">
                        <button class="btn btn-primary" onclick="checkChallenge3()">Check Solution</button>
                        <button class="btn btn-secondary" onclick="showSolution('challenge-3')">Show Answer</button>
                    </div>
                </div>
                <div class="playground-body">
                    <div class="code-panel">
                        <div class="code-tabs">
                            <div class="code-tab active">CSS</div>
                        </div>
                        <div class="code-editor">
                            <textarea id="code-challenge-3" spellcheck="false">.container {
    display: grid;
    /* Your code here */
    
    height: 400px;
}</textarea>
                        </div>
                    </div>
                    <div class="preview-panel">
                        <div class="preview-label">Live Preview</div>
                        <div class="preview-container">
                            <div id="preview-challenge-3" class="grid-preview" style="height: 400px;">
                                <div class="grid-item" style="grid-area: sidebar;">📊</div>
                                <div class="grid-item" style="grid-area: header;">Header</div>
                                <div class="grid-item" style="grid-area: main;">Main Content</div>
                                <div class="grid-item" style="grid-area: widget1;">Widget 1</div>
                                <div class="grid-item" style="grid-area: widget2;">Widget 2</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <details class="challenge-hints" style="margin-top: 20px;">
                <summary>Hints</summary>
                <ul>
                    <li>Sidebar spans the full height (all rows)</li>
                    <li>Use <code>grid-template-areas</code> for clarity</li>
                    <li>Think: 3 columns (sidebar, main, widgets) and 3 rows (header, main, main)</li>
                </ul>
            </details>
        `,
        defaultCode: `.container {
    display: grid;
    /* Your code here */
    
    height: 400px;
}`,
        solution: `.container {
    display: grid;
    grid-template-columns: 80px 1fr 200px;
    grid-template-rows: 50px 1fr 1fr;
    grid-template-areas:
        "sidebar header header"
        "sidebar main widget1"
        "sidebar main widget2";
    gap: 15px;
    height: 400px;
}`
    }
};

// Navigation order
const lessonOrder = [
    'intro', 'container', 'columns-rows', 'gap', 'fr-unit',
    'line-placement', 'span', 'grid-areas', 'named-lines',
    'justify-items', 'align-items', 'place-items', 'justify-content', 'align-content',
    'auto-fill', 'minmax', 'auto-flow', 'subgrid',
    'challenge-1', 'challenge-2', 'challenge-3'
];
