// CSS Grid Mastery - Application Logic

let currentLesson = 'intro';
const totalLessons = 21;

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
    
    // Re-render current content when language changes
    if (window.i18n) {
        window.i18n.onLanguageChange(() => {
            // Reload current lesson if in lesson view
            const lessonContainer = document.getElementById('lesson-container');
            if (lessonContainer && lessonContainer.style.display !== 'none' && currentLesson) {
                loadLesson(currentLesson);
            }
            // Reload current game mode if in game view
            const gameContainer = document.getElementById('game-container');
            if (gameContainer && gameContainer.style.display !== 'none' && typeof currentGameMode !== 'undefined' && currentGameMode) {
                loadGameMode(currentGameMode);
            }
        });
    }
});

// Get localized lesson title/subtitle
function getLocalizedLessonText(lessonId, field) {
    if (window.i18n && window.CONTENT_TRANSLATIONS?.lessons?.[lessonId]?.[field]) {
        const trans = window.CONTENT_TRANSLATIONS.lessons[lessonId][field];
        return trans[window.i18n.currentLang] || trans.en || lessons[lessonId][field];
    }
    return lessons[lessonId][field];
}

// Get localized lesson content (process HTML to translate embedded text)
function getLocalizedLessonContent(lessonId) {
    const lesson = lessons[lessonId];
    if (!lesson) return '';
    
    let content = lesson.content;
    const lang = window.i18n?.currentLang || 'en';
    
    // If English, return original content
    if (lang === 'en') return content;
    
    // For Georgian, process the HTML to translate common strings
    const translations = {
        // Section headers and common phrases
        'Pro Tip': 'პროფესიონალის რჩევა',
        'Key Insight': 'მთავარი აღმოჩენა',
        'Try This': 'სცადე ეს',
        'Challenge': 'გამოწვევა',
        'Need a hint?': 'გჭირდება მინიშნება?',
        'Solution': 'ამოხსნა',
        'Interactive Controls': 'ინტერაქტიული კონტროლები',
        'Try Each Value': 'სცადე თითოეული მნიშვნელობა',
        'Live Preview': 'პირდაპირი გადახედვა',
        'Beginner': 'დამწყები',
        'Intermediate': 'საშუალო',
        'Advanced': 'გაღრმავებული',
        'Reset': 'თავიდან',
        'Common Patterns': 'გავრცელებული შაბლონები',
        'Common Use Cases': 'გავრცელებული გამოყენების შემთხვევები',
        // Lesson-specific sections (from content-translations)
        'What is CSS Grid?': 'რა არის CSS Grid?',
        'Grid vs Flexbox': 'Grid vs Flexbox',
        'Your First Grid': 'შენი პირველი Grid',
        'Creating a Grid Container': 'Grid კონტეინერის შექმნა',
        'Grid vs Inline-Grid': 'Grid vs Inline-Grid',
        'Defining Grid Tracks': 'Grid ტრეკების განსაზღვრა',
        'The Gap Property': 'Gap თვისება',
        'Gap Explorer': 'Gap-ის მკვლევარი',
        'Row Gap': 'რიგის Gap',
        'Column Gap': 'სვეტის Gap',
        'Gap vs Margin': 'Gap vs Margin',
        'What is fr?': 'რა არის fr?',
        'Fraction Units': 'წილის ერთეულები',
        'How fr Calculates': 'როგორ ითვლის fr',
        'fr vs %': 'fr vs %',
        'Grid Lines': 'Grid ხაზები',
        'Line Placement': 'ხაზით განთავსება',
        'Negative Line Numbers': 'უარყოფითი ხაზის ნომრები',
        'Memorize This': 'დაიმახსოვრე ეს',
        'The span Keyword': 'span საკვანძო სიტყვა',
        'Spanning Grid Items': 'გაშლილი Grid ელემენტები',
        'Naming Areas': 'არეების დასახელება',
        'Named Grid Areas': 'დასახელებული Grid არეები',
        'Empty Cells': 'ცარიელი უჯრები',
        'Why Use Areas?': 'რატომ გამოვიყენოთ არეები?',
        'Naming Grid Lines': 'Grid ხაზების დასახელება',
        'Named Lines': 'დასახელებული ხაზები',
        'When to Use Named Lines': 'როდის გამოვიყენოთ დასახელებული ხაზები',
        'justify-items': 'justify-items',
        'Justify Items': 'Justify Items',
        'align-items': 'align-items',
        'Align Items': 'Align Items',
        'place-items': 'place-items',
        'Place Items': 'Place Items',
        'Place Items — Perfect Centering': 'Place Items — იდეალური ცენტრირება',
        'The Easiest Centering Trick': 'ყველაზე მარტივი ცენტრირების ხრიკი',
        'justify-content': 'justify-content',
        'Justify Content': 'Justify Content',
        'When Does This Apply?': 'როდის მოქმედებს ეს?',
        'align-content': 'align-content',
        'Align Content': 'Align Content',
        'auto-fill vs auto-fit': 'auto-fill vs auto-fit',
        'The Difference': 'განსხვავება',
        'Responsive Grid Magic': 'რესპონსიული Grid მაგია',
        'The Holy Grail of Responsive Grids': 'რესპონსიული Grid-ების წმინდა გრაალი',
        'The minmax() Function': 'minmax() ფუნქცია',
        'minmax() in Action': 'minmax() მოქმედებაში',
        'Special Keywords': 'სპეციალური საკვანძო სიტყვები',
        'grid-auto-flow': 'grid-auto-flow',
        'Auto Flow Direction': 'Auto Flow მიმართულება',
        'dense is Amazing': 'dense საოცარია',
        'What is Subgrid?': 'რა არის Subgrid?',
        'Browser Support': 'ბრაუზერის მხარდაჭერა',
        'When to Use Subgrid': 'როდის გამოვიყენოთ Subgrid',
        'Your Mission': 'შენი მისია',
        'Requirements:': 'მოთხოვნები:',
        'repeat() Shorthand': 'repeat() შემოკლება',
        // Tips and descriptions
        'CSS Grid is a two-dimensional layout system designed specifically for the web.': 'CSS Grid არის ორგანზომილებიანი განლაგების სისტემა, რომელიც სპეციალურად ვებისთვის შეიქმნა.',
        'Unlike Flexbox (which is one-dimensional), Grid lets you control both columns AND rows at the same time.': 'Flexbox-ისგან განსხვავებით (რომელიც ერთგანზომილებიანია), Grid გაძლევს საშუალებას აკონტროლო სვეტები და რიგები ერთდროულად.',
        'Think of it like a spreadsheet — you define rows and columns, then place items exactly where you want them.': 'წარმოიდგინე როგორც ცხრილი — განსაზღვრავ რიგებსა და სვეტებს, შემდეგ ათავსებ ელემენტებს ზუსტად იქ, სადაც გინდა.',
        'Best for one direction (row OR column). Great for navigation, card layouts, centering.': 'საუკეთესოა ერთი მიმართულებისთვის (რიგი ან სვეტი). შესანიშნავია ნავიგაციისთვის, ბარათების განლაგებისთვის, ცენტრირებისთვის.',
        'Best for two directions (rows AND columns). Perfect for page layouts, complex component structures.': 'საუკეთესოა ორი მიმართულებისთვის (რიგები და სვეტები). იდეალურია გვერდის განლაგებისთვის, რთული კომპონენტების სტრუქტურებისთვის.',
        "You don't have to choose one — they work beautifully together!": 'არ გჭირდება ერთის არჩევა — ისინი მშვენივრად მუშაობენ ერთად!',
        'Use Grid for the overall page structure, and Flexbox for components inside grid cells.': 'გამოიყენე Grid გვერდის მთლიანი სტრუქტურისთვის, და Flexbox კომპონენტებისთვის Grid უჯრებში.',
        'Change the grid to have 2 columns instead of 3. What happens?': 'შეცვალე Grid რომ ჰქონდეს 2 სვეტი 3-ის ნაცვლად. რა ხდება?',
        'The items will now flow into 2 columns, creating 3 rows': 'ელემენტები ახლა 2 სვეტში განთავსდება, 3 რიგის შექმნით',
        'To create a grid, simply apply': 'Grid-ის შესაქმნელად, უბრალოდ მიანიჭე',
        'to a container element. All direct children automatically become grid items.': 'კონტეინერ ელემენტს. ყველა პირდაპირი შვილი ავტომატურად ხდება Grid ელემენტი.',
        'Block-level grid container (takes full width)': 'ბლოკის დონის Grid კონტეინერი (იკავებს სრულ სიგანეს)',
        'Inline-level grid container (shrinks to content)': 'ხაზშიდა Grid კონტეინერი (იკუმშება კონტენტზე)',
        'items just stack vertically. The grid exists, but has no defined structure yet.': 'ელემენტები უბრალოდ ვერტიკალურად ეწყობა. Grid არსებობს, მაგრამ ჯერ არ აქვს განსაზღვრული სტრუქტურა.',
        'Notice how the container shrinks to fit its content?': 'შეამჩნიე როგორ იკუმშება კონტეინერი კონტენტზე?',
        'Grid tracks are the spaces between grid lines.': 'Grid ტრეკები არის სივრცეები Grid ხაზებს შორის.',
        'defines column tracks': 'განსაზღვრავს სვეტების ტრეკებს',
        'defines row tracks': 'განსაზღვრავს რიგების ტრეკებს',
        'You can use any CSS length unit:': 'შეგიძლია გამოიყენო ნებისმიერი CSS სიგრძის ერთეული:',
        'Instead of writing': 'ნაცვლად იმისა, რომ დაწერო',
        'The': 'ეს',
        'property adds space between grid tracks (rows and columns).': 'თვისება ამატებს სივრცეს Grid ტრეკებს შორის (რიგები და სვეტები).',
        "It's the modern replacement for the older": 'ეს არის ძველის თანამედროვე შემცვლელი',
        'Unlike margins, gap only creates space': 'მარჯინებისგან განსხვავებით, gap ქმნის სივრცეს მხოლოდ',
        'between': 'შორის',
        'items, never on the outer edges. This makes layouts much more predictable!': 'ელემენტებს, არასოდეს გარე კიდეებზე. ეს განლაგებებს ბევრად უფრო პროგნოზირებადს ხდის!',
        'The': '',
        'unit stands for "fraction".': 'ერთეული ნიშნავს "წილს".',
        'It divides available space proportionally between tracks.': 'ის ყოფს ხელმისაწვდომ სივრცეს პროპორციულად ტრეკებს შორის.',
        'Think of it like slicing a pizza —': 'წარმოიდგინე როგორც პიცის დაჭრა —',
        'means "give the middle slice twice as much space".': 'ნიშნავს "მიეცი შუა ნაჭერს ორჯერ მეტი სივრცე".',
        'Fixed sizes are allocated first (px, %, etc.)': 'ჯერ ფიქსირებული ზომები ნაწილდება (px, %, და ა.შ.)',
        'Gaps are subtracted': 'Gap-ები გამოაკლდება',
        'Remaining space is divided by total fr units': 'დარჩენილი სივრცე იყოფა fr ერთეულების ჯამზე',
        'when you can — it automatically accounts for gaps, while percentages don\'t!': 'როცა შეგიძლია — ის ავტომატურად ითვალისწინებს gap-ებს, პროცენტები კი არა!',
        'Create a "Holy Grail" layout: fixed 200px sidebar on the left, flexible content in the middle, fixed 150px sidebar on the right.': 'შექმენი "Holy Grail" განლაგება: ფიქსირებული 200px სვეტი მარცხნივ, მოქნილი კონტენტი შუაში, ფიქსირებული 150px სვეტი მარჯვნივ.',
        'Every grid has invisible lines that separate tracks. Lines are numbered starting from 1.': 'ყველა Grid-ს აქვს უხილავი ხაზები, რომლებიც ყოფენ ტრეკებს. ხაზები დანომრილია 1-დან.',
        'A 3-column grid has': '3-სვეტიან Grid-ს აქვს',
        '4 column lines': '4 სვეტის ხაზი',
        'You can count from the end using negative numbers.': 'შეგიძლია დათვალო ბოლოდან უარყოფითი რიცხვებით.',
        'is the last line.': 'არის ბოლო ხაზი.',
        'Lines are like fence posts, tracks are like fence panels.': 'ხაზები ჰგვანან ღობის ბოძებს, ტრეკები — ღობის პანელებს.',
        'A 3-column grid has 3 panels (tracks) and 4 posts (lines).': '3-სვეტიან Grid-ს აქვს 3 პანელი (ტრეკი) და 4 ბოძი (ხაზი).',
        'Instead of specifying exact end lines, use': 'ზუსტი დასასრულის ხაზების მითითების ნაცვლად, გამოიყენე',
        'to cover a number of tracks.': 'ტრეკების რაოდენობის დასაფარად.',
        'Use spanning for: featured cards, hero sections, sidebar layouts, image galleries with different-sized thumbnails.': 'გამოიყენე გაშლა: გამორჩეული ბარათებისთვის, hero სექციებისთვის, სვეტების განლაგებისთვის, სურათების გალერეებისთვის სხვადასხვა ზომის მინიატურებით.',
        'Create a "bento box" layout where the first item spans 2 columns, and the 4th item spans 2 rows.': 'შექმენი "bento box" განლაგება, სადაც პირველი ელემენტი ფარავს 2 სვეტს, ხოლო მე-4 ელემენტი — 2 რიგს.',
        'Instead of line numbers, you can name areas and place items by name. Much more readable!': 'ხაზის ნომრების ნაცვლად, შეგიძლია დაასახელო არეები და განათავსო ელემენტები სახელით. ბევრად უფრო წაკითხვადია!',
        'Use a dot': 'გამოიყენე წერტილი',
        'to leave cells empty:': 'უჯრების ცარიელად დასატოვებლად:',
        'Grid areas make responsive layouts trivial — just redefine': 'Grid არეები რესპონსიულ განლაგებებს ტრივიალურს ხდის — უბრალოდ ხელახლა განსაზღვრე',
        'in a media query!': 'media query-ში!',
        'You can name lines using square brackets in your template definitions:': 'შეგიძლია დაასახელო ხაზები კვადრატულ ფრჩხილებში შაბლონის განსაზღვრისას:',
        'Named lines shine in complex layouts where you reference the same lines repeatedly.': 'დასახელებული ხაზები ბრწყინავენ რთულ განლაგებებში, სადაც ერთსა და იმავე ხაზებს მრავალჯერ მიმართავ.',
        "They're also great for component libraries.": 'ისინი ასევე შესანიშნავია კომპონენტების ბიბლიოთეკებისთვის.',
        'Controls how items are aligned along the inline (horizontal) axis within their cells.': 'აკონტროლებს როგორ არის გასწორებული ელემენტები inline (ჰორიზონტალურ) ღერძზე მათ უჯრებში.',
        'Controls how items are aligned along the block (vertical) axis within their cells.': 'აკონტროლებს როგორ არის გასწორებული ელემენტები block (ვერტიკალურ) ღერძზე მათ უჯრებში.',
        'Combines': 'აერთიანებს',
        'and': 'და',
        'into one shorthand.': 'ერთ შემოკლებულ ფორმაში.',
        'This is the fastest way to center anything in CSS:': 'ეს არის ყველაზე სწრაფი გზა ნებისმიერის დაცენტრებისთვის CSS-ში:',
        "When your grid tracks don't fill the entire container, this property controls how the grid itself is positioned horizontally.": 'როცა Grid ტრეკები არ ავსებენ მთელ კონტეინერს, ეს თვისება აკონტროლებს როგორ არის განთავსებული თავად Grid ჰორიზონტალურად.',
        "only has an effect when your grid tracks (columns) don't fill the entire container width.": '-ს ეფექტი აქვს მხოლოდ მაშინ, როცა Grid ტრეკები (სვეტები) არ ავსებენ კონტეინერის მთელ სიგანეს.',
        'Use fixed sizes or max-content to see it work.': 'გამოიყენე ფიქსირებული ზომები ან max-content სანახავად.',
        "When your grid tracks don't fill the entire container vertically, this property controls how the grid itself is positioned.": 'როცა Grid ტრეკები არ ავსებენ მთელ კონტეინერს ვერტიკალურად, ეს თვისება აკონტროლებს როგორ არის განთავსებული თავად Grid.',
        'These keywords create dynamic column counts based on available space.': 'ეს საკვანძო სიტყვები ქმნიან დინამიურ სვეტების რაოდენობას ხელმისაწვდომი სივრცის მიხედვით.',
        'Creates as many tracks as possible, even if empty': 'ქმნის რაც შეიძლება მეტ ტრეკს, თუნდაც ცარიელს',
        'Creates tracks, but collapses empty ones to 0': 'ქმნის ტრეკებს, მაგრამ აკეცავს ცარიელებს 0-მდე',
        'In most cases, you want': 'უმეტეს შემთხვევაში, გინდა',
        'with': '-თან ერთად',
        'This single line creates a fully responsive grid with no media queries!': 'ეს ერთი ხაზი ქმნის სრულად რესპონსიულ Grid-ს media query-ების გარეშე!',
        'Creates a size range that adapts based on available space.': 'ქმნის ზომის დიაპაზონს, რომელიც ადაპტირდება ხელმისაწვდომი სივრცის მიხედვით.',
        'Smallest size without overflow': 'ყველაზე პატარა ზომა გადავსების გარეშე',
        'Ideal size for content': 'იდეალური ზომა კონტენტისთვის',
        'Adapts to content': 'ადაპტირდება კონტენტზე',
        "Controls the direction items flow when they're not explicitly placed.": 'აკონტროლებს მიმართულებას, რომლითაც მიედინება ელემენტები, როცა ისინი ცხადად არ არის განთავსებული.',
        'Add': 'დაამატე',
        "to fill gaps when items are different sizes. Perfect for masonry-like layouts!": 'ხარვეზების შესავსებად, როცა ელემენტები სხვადასხვა ზომისაა. იდეალურია masonry-ს მსგავსი განლაგებებისთვის!',
        "Subgrid lets a grid item's children align to the parent grid's tracks instead of creating a new independent grid.": 'Subgrid საშუალებას აძლევს Grid ელემენტის შვილებს გასწორდნენ მშობელი Grid-ის ტრეკებთან, ახალი დამოუკიდებელი Grid-ის შექმნის ნაცვლად.',
        'Subgrid has good support in modern browsers. Check caniuse.com for current status.': 'Subgrid-ს კარგი მხარდაჭერა აქვს თანამედროვე ბრაუზერებში. შეამოწმე caniuse.com მიმდინარე სტატუსისთვის.',
        "Subgrid is perfect for: card layouts where content needs to align, forms with aligned labels, and any nested content that should respect the parent's grid.": 'Subgrid იდეალურია: ბარათების განლაგებებისთვის, სადაც კონტენტი უნდა იყოს გასწორებული, ფორმებისთვის გასწორებული ლეიბლებით, და ნებისმიერი ჩადგმული კონტენტისთვის, რომელმაც უნდა დაიცვას მშობლის Grid.',
        "Create a classic page layout with header, footer, main content, and two sidebars using CSS Grid.": 'შექმენი კლასიკური გვერდის განლაგება header-ით, footer-ით, მთავარი კონტენტით და ორი სვეტით CSS Grid-ის გამოყენებით.',
        'Header spans the full width': 'Header ფარავს სრულ სიგანეს',
        'Footer spans the full width': 'Footer ფარავს სრულ სიგანეს',
        'Left sidebar is 200px wide': 'მარცხენა სვეტი არის 200px სიგანის',
        'Right sidebar is 150px wide': 'მარჯვენა სვეტი არის 150px სიგანის',
        'Main content fills the remaining space': 'მთავარი კონტენტი ავსებს დარჩენილ სივრცეს',
        'Build a card grid that automatically adjusts the number of columns based on available space.': 'ააგე ბარათების Grid, რომელიც ავტომატურად არეგულირებს სვეტების რაოდენობას ხელმისაწვდომი სივრცის მიხედვით.',
        'Cards should be at least 250px wide': 'ბარათები უნდა იყოს მინიმუმ 250px სიგანის',
        'Cards should grow to fill available space': 'ბარათები უნდა იზრდებოდეს ხელმისაწვდომი სივრცის შესავსებად',
        'Use 20px gap between cards': 'გამოიყენე 20px დაშორება ბარათებს შორის',
        'No media queries needed!': 'media query-ები არ არის საჭირო!',
        'Create a modern dashboard layout with a fixed sidebar, header, and flexible widget area.': 'შექმენი თანამედროვე dashboard განლაგება ფიქსირებული სვეტით, header-ით და მოქნილი ვიჯეტების არეით.',
        'Previous': 'წინა',
        'Next': 'შემდეგი',
        '(resize browser to see magic!)': '(შეცვალე ბრაუზერის ზომა მაგიის სანახავად!)'
    };
    
    // Apply translations
    for (const [en, ka] of Object.entries(translations)) {
        // Escape special regex characters in the English string
        const escaped = en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        content = content.replace(new RegExp(escaped, 'g'), ka);
    }
    
    return content;
}

// Load a lesson
function loadLesson(lessonId) {
    const lesson = lessons[lessonId];
    if (!lesson) return;
    
    // Mark previous lesson as complete (if not a challenge)
    if (currentLesson && !currentLesson.startsWith('challenge')) {
        markComplete(currentLesson);
    }
    
    currentLesson = lessonId;
    
    // Build lesson HTML
    const container = document.getElementById('lesson-container');
    
    // Get previous/next lessons
    const currentIndex = lessonOrder.indexOf(lessonId);
    const prevLesson = currentIndex > 0 ? lessonOrder[currentIndex - 1] : null;
    const nextLesson = currentIndex < lessonOrder.length - 1 ? lessonOrder[currentIndex + 1] : null;
    
    // Get localized content
    const title = getLocalizedLessonText(lessonId, 'title');
    const subtitle = getLocalizedLessonText(lessonId, 'subtitle');
    const content = getLocalizedLessonContent(lessonId);
    const prevText = window.i18n?.tc('ui.previous') || 'Previous';
    const nextText = window.i18n?.tc('ui.next') || 'Next';
    
    container.innerHTML = `
        <div class="lesson">
            <div class="lesson-header">
                <h1>${title}</h1>
                <p class="subtitle">${subtitle}</p>
            </div>
            <div class="lesson-content">
                ${content}
            </div>
            <div class="lesson-nav">
                ${prevLesson ? `
                    <button class="lesson-nav-btn" onclick="navigateTo('${prevLesson}')">
                        <span>←</span>
                        <div>
                            <div class="direction">${prevText}</div>
                            <div class="title">${getLocalizedLessonText(prevLesson, 'title')}</div>
                        </div>
                    </button>
                ` : '<div></div>'}
                ${nextLesson ? `
                    <button class="lesson-nav-btn" onclick="navigateTo('${nextLesson}')">
                        <div>
                            <div class="direction">${nextText}</div>
                            <div class="title">${getLocalizedLessonText(nextLesson, 'title')}</div>
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
        celebrate('Holy Grail Mastered! 🏆');
        markComplete('challenge-1');
    } else {
        showHint('Not quite there yet. Make sure you have:\n• grid-template-areas defined\n• Header spanning full width\n• Sidebar at 200px\n• Footer spanning full width');
    }
}

function checkChallenge2() {
    const code = document.getElementById('code-challenge-2')?.value || '';
    
    const hasAutoFit = code.includes('auto-fit') || code.includes('auto-fill');
    const hasMinmax = code.includes('minmax');
    const has250 = code.includes('250px');
    const has1fr = code.includes('1fr');
    
    if (hasAutoFit && hasMinmax && has250 && has1fr) {
        celebrate('Responsive Grid Master! 📱');
        markComplete('challenge-2');
    } else {
        showHint('Almost there! Make sure you use:\n• repeat() with auto-fit or auto-fill\n• minmax(250px, 1fr)');
    }
}

function checkChallenge3() {
    const code = document.getElementById('code-challenge-3')?.value || '';
    
    const hasAreas = code.includes('grid-template-areas');
    const hasSidebar = code.includes('sidebar');
    const hasWidget = code.includes('widget');
    const has80 = code.includes('80px');
    
    if (hasAreas && hasSidebar && hasWidget && has80) {
        celebrate('Dashboard Pro! 📊');
        markComplete('challenge-3');
        
        // Check if all challenges complete
        const completed = JSON.parse(localStorage.getItem('gridMasteryCompleted') || '[]');
        if (completed.includes('challenge-1') && completed.includes('challenge-2') && completed.includes('challenge-3')) {
            setTimeout(() => {
                celebrate('🌟 CSS Grid Master! 🌟');
            }, 2500);
        }
    } else {
        showHint('Keep trying! Make sure you have:\n• grid-template-areas with sidebar, header, main, widget1, widget2\n• Sidebar at 80px spanning all rows');
    }
}

// Show hint toast
function showHint(message) {
    const hint = document.createElement('div');
    hint.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: var(--bg-card);
        border: 1px solid var(--warning);
        border-radius: var(--radius);
        padding: 16px 24px;
        max-width: 350px;
        z-index: 3000;
        animation: fadeIn 0.3s ease;
        white-space: pre-line;
    `;
    hint.innerHTML = `
        <div style="display: flex; align-items: start; gap: 12px;">
            <span style="font-size: 1.5rem;">💡</span>
            <div>
                <strong style="color: var(--warning);">Hint</strong>
                <p style="margin-top: 4px; color: var(--text-secondary); font-size: 0.9rem;">${message}</p>
            </div>
        </div>
    `;
    document.body.appendChild(hint);
    
    setTimeout(() => {
        hint.style.animation = 'fadeIn 0.3s ease reverse';
        setTimeout(() => hint.remove(), 300);
    }, 4000);
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Escape to close modals
    if (e.key === 'Escape') {
        hideCheatsheet();
    }
    
    // ? to show cheatsheet
    if (e.key === '?' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        showCheatsheet();
    }
    
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
    
    // Tab key in textarea for indentation
    if (e.key === 'Tab' && e.target.tagName === 'TEXTAREA') {
        e.preventDefault();
        const textarea = e.target;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        
        textarea.value = textarea.value.substring(0, start) + '    ' + textarea.value.substring(end);
        textarea.selectionStart = textarea.selectionEnd = start + 4;
        
        // Trigger preview update
        textarea.dispatchEvent(new Event('input'));
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
    
    // Update progress
    updateProgress();
}

// Update progress display
function updateProgress() {
    const completed = JSON.parse(localStorage.getItem('gridMasteryCompleted') || '[]');
    const count = completed.length;
    const percent = Math.round((count / totalLessons) * 100);
    
    const percentEl = document.getElementById('progress-percent');
    const fillEl = document.getElementById('progress-fill');
    const textEl = document.getElementById('progress-text');
    const certBtn = document.getElementById('cert-btn');
    
    if (percentEl) percentEl.textContent = `${percent}%`;
    if (fillEl) fillEl.style.width = `${percent}%`;
    if (textEl) textEl.textContent = `${count} of ${totalLessons} lessons`;
    
    // Unlock certificate when complete
    if (certBtn) {
        if (count >= totalLessons) {
            certBtn.classList.add('unlocked');
            certBtn.textContent = '🏆 Certificate Unlocked!';
        }
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
    updateProgress();
}

// Cheatsheet modal
function showCheatsheet() {
    document.getElementById('cheatsheet-modal').classList.add('active');
}

function hideCheatsheet() {
    document.getElementById('cheatsheet-modal').classList.remove('active');
}

// Celebration animation
function celebrate(message = 'Challenge Complete!') {
    // Fire confetti
    if (typeof confetti !== 'undefined') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
        
        // Double burst
        setTimeout(() => {
            confetti({
                particleCount: 50,
                angle: 60,
                spread: 55,
                origin: { x: 0 }
            });
            confetti({
                particleCount: 50,
                angle: 120,
                spread: 55,
                origin: { x: 1 }
            });
        }, 250);
    }
    
    // Show celebration card
    const celebration = document.createElement('div');
    celebration.className = 'celebration';
    celebration.innerHTML = `
        <div class="emoji">🎉</div>
        <h2>${message}</h2>
        <p>Great job! Keep learning!</p>
    `;
    document.body.appendChild(celebration);
    
    // Remove after 2 seconds
    setTimeout(() => {
        celebration.style.animation = 'celebrateIn 0.3s ease reverse';
        setTimeout(() => celebration.remove(), 300);
    }, 2000);
}

// Call on load
loadCompletedState();

// Mobile sidebar toggle
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    sidebar.classList.toggle('open');
    
    // Create overlay if it doesn't exist
    if (!overlay) {
        const newOverlay = document.createElement('div');
        newOverlay.className = 'sidebar-overlay';
        newOverlay.onclick = toggleSidebar;
        document.body.appendChild(newOverlay);
    }
    
    document.querySelector('.sidebar-overlay')?.classList.toggle('active');
}

// Close sidebar when clicking a nav link on mobile
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            toggleSidebar();
        }
    });
});

// Theme toggle
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('gridMasteryTheme', newTheme);
    
    // Update icon
    document.getElementById('theme-icon').textContent = newTheme === 'light' ? '☀️' : '🌙';
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('gridMasteryTheme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const icon = document.getElementById('theme-icon');
    if (icon) icon.textContent = savedTheme === 'light' ? '☀️' : '🌙';
}

// Initialize theme
loadTheme();

// Show completion certificate
function showCertificate() {
    const completed = JSON.parse(localStorage.getItem('gridMasteryCompleted') || '[]');
    if (completed.length < totalLessons) {
        alert(`Complete all ${totalLessons} lessons to unlock your certificate! (${completed.length}/${totalLessons} done)`);
        return;
    }
    
    const cert = document.createElement('div');
    cert.className = 'modal-overlay active';
    cert.onclick = () => cert.remove();
    cert.innerHTML = `
        <div class="modal-content certificate" onclick="event.stopPropagation()">
            <div class="cert-header">🏆</div>
            <h2>Certificate of Completion</h2>
            <p class="cert-subtitle">This certifies that</p>
            <p class="cert-name">A Dedicated Student</p>
            <p class="cert-subtitle">has successfully mastered</p>
            <h3>CSS Grid Layout</h3>
            <p class="cert-details">Completing all 21 lessons and 3 challenges</p>
            <p class="cert-date">${new Date().toLocaleDateString()}</p>
            <div class="cert-footer">
                <span>10x Academy</span>
                <span>CSS Grid Mastery</span>
            </div>
            <button class="btn btn-primary" onclick="this.parentElement.parentElement.remove()" style="margin-top: 20px;">Close</button>
        </div>
    `;
    document.body.appendChild(cert);
    
    // Confetti!
    if (typeof confetti !== 'undefined') {
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
    }
}

// Sound toggle
function toggleSound() {
    if (window.sounds) {
        const enabled = window.sounds.toggle();
        document.getElementById('sound-icon').textContent = enabled ? '🔊' : '🔇';
    }
}

// Load sound preference
function loadSoundState() {
    const enabled = localStorage.getItem('soundEnabled') !== 'false';
    const icon = document.getElementById('sound-icon');
    if (icon) icon.textContent = enabled ? '🔊' : '🔇';
}

// Initialize sound state
document.addEventListener('DOMContentLoaded', loadSoundState);

// Integrate with analytics
const originalMarkComplete = markComplete;
markComplete = function(lessonId) {
    originalMarkComplete(lessonId);
    
    // Track with analytics
    if (window.analytics) {
        window.analytics.endLesson(lessonId, true);
    }
    
    // Play sound
    if (window.sounds) {
        window.sounds.playSuccess();
    }
};

// Track lesson start
const originalLoadLesson = loadLesson;
loadLesson = function(lessonId) {
    // Track with analytics
    if (window.analytics) {
        if (currentLesson) {
            window.analytics.endLesson(currentLesson, false);
        }
        window.analytics.startLesson(lessonId);
    }
    
    originalLoadLesson(lessonId);
};

// Enhance celebrate with sound
const originalCelebrate = celebrate;
celebrate = function(message = 'Challenge Complete!') {
    originalCelebrate(message);
    
    if (window.sounds) {
        window.sounds.playLevelUp();
    }
    
    if (window.particles) {
        window.particles.celebrate();
    }
};

console.log('🎨 CSS Grid Mastery loaded!');
console.log('⌨️ Keyboard shortcuts: ← → navigate | ? cheatsheet | Tab indent | Esc close');
console.log('🔊 Sound: Alt+S to toggle | ♿ Accessibility: Alt+A');
