// CSS Grid Mastery - Content Translations
// Full Georgian (ka) translations for all lessons, games, and challenges

const CONTENT_TRANSLATIONS = {
    // ============== LESSON TRANSLATIONS ==============
    lessons: {
        intro: {
            title: {
                en: "Introduction to CSS Grid",
                ka: "CSS Grid-ის შესავალი"
            },
            subtitle: {
                en: "The most powerful layout system in CSS. Master it and you'll never struggle with layouts again.",
                ka: "CSS-ის ყველაზე მძლავრი განლაგების სისტემა. დაეუფლე მას და აღარასოდეს გაგიჭირდება განლაგებების შექმნა."
            },
            sections: {
                whatIsGrid: {
                    en: "What is CSS Grid?",
                    ka: "რა არის CSS Grid?"
                },
                whatIsGridDesc: {
                    en: "CSS Grid is a two-dimensional layout system designed specifically for the web. Unlike Flexbox (which is one-dimensional), Grid lets you control both columns AND rows at the same time.",
                    ka: "CSS Grid არის ორგანზომილებიანი განლაგების სისტემა, რომელიც სპეციალურად ვებისთვის შეიქმნა. Flexbox-ისგან განსხვავებით (რომელიც ერთგანზომილებიანია), Grid გაძლევს საშუალებას აკონტროლო სვეტები და რიგები ერთდროულად."
                },
                spreadsheetAnalogy: {
                    en: "Think of it like a spreadsheet — you define rows and columns, then place items exactly where you want them.",
                    ka: "წარმოიდგინე როგორც ცხრილი — განსაზღვრავ რიგებსა და სვეტებს, შემდეგ ათავსებ ელემენტებს ზუსტად იქ, სადაც გინდა."
                },
                gridVsFlexbox: {
                    en: "Grid vs Flexbox",
                    ka: "Grid vs Flexbox"
                },
                flexboxDesc: {
                    en: "Best for one direction (row OR column). Great for navigation, card layouts, centering.",
                    ka: "საუკეთესოა ერთი მიმართულებისთვის (რიგი ან სვეტი). შესანიშნავია ნავიგაციისთვის, ბარათების განლაგებისთვის, ცენტრირებისთვის."
                },
                gridDesc: {
                    en: "Best for two directions (rows AND columns). Perfect for page layouts, complex component structures.",
                    ka: "საუკეთესოა ორი მიმართულებისთვის (რიგები და სვეტები). იდეალურია გვერდის განლაგებისთვის, რთული კომპონენტების სტრუქტურებისთვის."
                },
                canUseBoth: {
                    en: "You don't have to choose one — they work beautifully together!",
                    ka: "არ გჭირდება ერთის არჩევა — ისინი მშვენივრად მუშაობენ ერთად!"
                },
                proTip: {
                    en: "Use Grid for the overall page structure, and Flexbox for components inside grid cells.",
                    ka: "გამოიყენე Grid გვერდის მთლიანი სტრუქტურისთვის, და Flexbox კომპონენტებისთვის Grid უჯრებში."
                },
                yourFirstGrid: {
                    en: "Your First Grid",
                    ka: "შენი პირველი Grid"
                },
                tryThis: {
                    en: "Try This",
                    ka: "სცადე ეს"
                },
                tryThisChallenge: {
                    en: "Change the grid to have 2 columns instead of 3. What happens?",
                    ka: "შეცვალე Grid რომ ჰქონდეს 2 სვეტი 3-ის ნაცვლად. რა ხდება?"
                },
                hint1: {
                    en: "Change <code>1fr 1fr 1fr</code> to <code>1fr 1fr</code>",
                    ka: "შეცვალე <code>1fr 1fr 1fr</code> → <code>1fr 1fr</code>"
                },
                hint2: {
                    en: "The items will now flow into 2 columns, creating 3 rows",
                    ka: "ელემენტები ახლა 2 სვეტში განთავსდება, 3 რიგის შექმნით"
                }
            }
        },

        container: {
            title: {
                en: "Grid Container",
                ka: "Grid კონტეინერი"
            },
            subtitle: {
                en: "The parent element that holds all your grid items. This is where the magic begins.",
                ka: "მშობელი ელემენტი, რომელიც შეიცავს ყველა Grid ელემენტს. აქედან იწყება მაგია."
            },
            sections: {
                creatingContainer: {
                    en: "Creating a Grid Container",
                    ka: "Grid კონტეინერის შექმნა"
                },
                creatingDesc: {
                    en: "To create a grid, simply apply <code>display: grid</code> to a container element. All direct children automatically become grid items.",
                    ka: "Grid-ის შესაქმნელად, უბრალოდ მიანიჭე <code>display: grid</code> კონტეინერ ელემენტს. ყველა პირდაპირი შვილი ავტომატურად ხდება Grid ელემენტი."
                },
                displayGrid: {
                    en: "<strong>display: grid</strong> → Block-level grid container (takes full width)",
                    ka: "<strong>display: grid</strong> → ბლოკის დონის Grid კონტეინერი (იკავებს სრულ სიგანეს)"
                },
                displayInlineGrid: {
                    en: "<strong>display: inline-grid</strong> → Inline-level grid container (shrinks to content)",
                    ka: "<strong>display: inline-grid</strong> → ხაზშიდა Grid კონტეინერი (იკუმშება კონტენტზე)"
                },
                gridVsInlineGrid: {
                    en: "Grid vs Inline-Grid",
                    ka: "Grid vs Inline-Grid"
                },
                keyInsight: {
                    en: "Key Insight",
                    ka: "მთავარი აღმოჩენა"
                },
                keyInsightDesc: {
                    en: "Without <code>grid-template-columns</code> or <code>grid-template-rows</code>, items just stack vertically. The grid exists, but has no defined structure yet.",
                    ka: "<code>grid-template-columns</code> ან <code>grid-template-rows</code> გარეშე, ელემენტები უბრალოდ ვერტიკალურად ეწყობა. Grid არსებობს, მაგრამ ჯერ არ აქვს განსაზღვრული სტრუქტურა."
                },
                tryThisChallenge: {
                    en: "Change <code>display: grid</code> to <code>display: inline-grid</code>. Notice how the container shrinks to fit its content?",
                    ka: "შეცვალე <code>display: grid</code> → <code>display: inline-grid</code>. შეამჩნიე როგორ იკუმშება კონტეინერი კონტენტზე?"
                }
            }
        },

        'columns-rows': {
            title: {
                en: "Columns & Rows",
                ka: "სვეტები და რიგები"
            },
            subtitle: {
                en: "Define the structure of your grid with grid-template-columns and grid-template-rows.",
                ka: "განსაზღვრე Grid-ის სტრუქტურა grid-template-columns და grid-template-rows-ით."
            },
            sections: {
                definingTracks: {
                    en: "Defining Grid Tracks",
                    ka: "Grid ტრეკების განსაზღვრა"
                },
                tracksDesc: {
                    en: "Grid tracks are the spaces between grid lines. You define them with:",
                    ka: "Grid ტრეკები არის სივრცეები Grid ხაზებს შორის. მათ განსაზღვრავ:"
                },
                columnsProperty: {
                    en: "<code>grid-template-columns</code> — defines column tracks",
                    ka: "<code>grid-template-columns</code> — განსაზღვრავს სვეტების ტრეკებს"
                },
                rowsProperty: {
                    en: "<code>grid-template-rows</code> — defines row tracks",
                    ka: "<code>grid-template-rows</code> — განსაზღვრავს რიგების ტრეკებს"
                },
                unitsDesc: {
                    en: "You can use any CSS length unit: <code>px</code>, <code>%</code>, <code>em</code>, <code>rem</code>, <code>fr</code>, <code>auto</code>, etc.",
                    ka: "შეგიძლია გამოიყენო ნებისმიერი CSS სიგრძის ერთეული: <code>px</code>, <code>%</code>, <code>em</code>, <code>rem</code>, <code>fr</code>, <code>auto</code>, და ა.შ."
                },
                commonPatterns: {
                    en: "Common Patterns",
                    ka: "გავრცელებული შაბლონები"
                },
                repeatShorthand: {
                    en: "repeat() Shorthand",
                    ka: "repeat() შემოკლება"
                },
                repeatDesc: {
                    en: "Instead of writing <code>1fr 1fr 1fr 1fr</code>, use <code>repeat(4, 1fr)</code>. You can also mix patterns: <code>repeat(2, 1fr 2fr)</code> creates <code>1fr 2fr 1fr 2fr</code>",
                    ka: "<code>1fr 1fr 1fr 1fr</code>-ის ნაცვლად გამოიყენე <code>repeat(4, 1fr)</code>. ასევე შეგიძლია შეურიო შაბლონები: <code>repeat(2, 1fr 2fr)</code> ქმნის <code>1fr 2fr 1fr 2fr</code>"
                },
                challenge: {
                    en: "Create a layout with 4 equal columns using <code>repeat()</code>. Then make the first row 100px tall and the second row 50px.",
                    ka: "შექმენი განლაგება 4 თანაბარი სვეტით <code>repeat()</code>-ის გამოყენებით. შემდეგ გახადე პირველი რიგი 100px სიმაღლის და მეორე 50px."
                }
            }
        },

        gap: {
            title: {
                en: "Gap & Spacing",
                ka: "Gap და დაშორება"
            },
            subtitle: {
                en: "Control the gutters between grid cells with the gap properties.",
                ka: "აკონტროლე მანძილი Grid უჯრებს შორის gap თვისებებით."
            },
            sections: {
                gapProperty: {
                    en: "The Gap Property",
                    ka: "Gap თვისება"
                },
                gapDesc: {
                    en: "The <code>gap</code> property adds space between grid tracks (rows and columns). It's the modern replacement for the older <code>grid-gap</code>.",
                    ka: "<code>gap</code> თვისება ამატებს სივრცეს Grid ტრეკებს შორის (რიგები და სვეტები). ეს არის ძველი <code>grid-gap</code>-ის თანამედროვე შემცვლელი."
                },
                gapExplorer: {
                    en: "Gap Explorer",
                    ka: "Gap-ის მკვლევარი"
                },
                interactiveControls: {
                    en: "Interactive Controls",
                    ka: "ინტერაქტიული კონტროლები"
                },
                rowGap: {
                    en: "Row Gap",
                    ka: "რიგის Gap"
                },
                columnGap: {
                    en: "Column Gap",
                    ka: "სვეტის Gap"
                },
                gapVsMargin: {
                    en: "Gap vs Margin",
                    ka: "Gap vs Margin"
                },
                gapVsMarginDesc: {
                    en: "Unlike margins, gap only creates space <em>between</em> items, never on the outer edges. This makes layouts much more predictable!",
                    ka: "მარჯინებისგან განსხვავებით, gap ქმნის სივრცეს მხოლოდ ელემენტებს <em>შორის</em>, არასოდეს გარე კიდეებზე. ეს განლაგებებს ბევრად უფრო პროგნოზირებადს ხდის!"
                }
            }
        },

        'fr-unit': {
            title: {
                en: "The fr Unit",
                ka: "fr ერთეული"
            },
            subtitle: {
                en: "The most powerful unit in Grid. It represents a fraction of available space.",
                ka: "Grid-ის ყველაზე მძლავრი ერთეული. წარმოადგენს ხელმისაწვდომი სივრცის წილს."
            },
            sections: {
                whatIsFr: {
                    en: "What is fr?",
                    ka: "რა არის fr?"
                },
                frDesc: {
                    en: "The <code>fr</code> unit stands for \"fraction\". It divides available space proportionally between tracks.",
                    ka: "<code>fr</code> ერთეული ნიშნავს \"წილს\". ის ყოფს ხელმისაწვდომ სივრცეს პროპორციულად ტრეკებს შორის."
                },
                pizzaAnalogy: {
                    en: "Think of it like slicing a pizza — <code>1fr 2fr 1fr</code> means \"give the middle slice twice as much space\".",
                    ka: "წარმოიდგინე როგორც პიცის დაჭრა — <code>1fr 2fr 1fr</code> ნიშნავს \"მიეცი შუა ნაჭერს ორჯერ მეტი სივრცე\"."
                },
                howFrCalculates: {
                    en: "How fr Calculates",
                    ka: "როგორ ითვლის fr"
                },
                step1: {
                    en: "Fixed sizes are allocated first (px, %, etc.)",
                    ka: "ჯერ ფიქსირებული ზომები ნაწილდება (px, %, და ა.შ.)"
                },
                step2: {
                    en: "Gaps are subtracted",
                    ka: "Gap-ები გამოაკლდება"
                },
                step3: {
                    en: "Remaining space is divided by total fr units",
                    ka: "დარჩენილი სივრცე იყოფა fr ერთეულების ჯამზე"
                },
                frVsPercent: {
                    en: "fr vs %",
                    ka: "fr vs %"
                },
                frVsPercentDesc: {
                    en: "Use <code>fr</code> over <code>%</code> when you can — it automatically accounts for gaps, while percentages don't!",
                    ka: "გამოიყენე <code>fr</code> <code>%</code>-ის ნაცვლად როცა შეგიძლია — ის ავტომატურად ითვალისწინებს gap-ებს, პროცენტები კი არა!"
                },
                challenge: {
                    en: "Create a \"Holy Grail\" layout: fixed 200px sidebar on the left, flexible content in the middle, fixed 150px sidebar on the right.",
                    ka: "შექმენი \"Holy Grail\" განლაგება: ფიქსირებული 200px სვეტი მარცხნივ, მოქნილი კონტენტი შუაში, ფიქსირებული 150px სვეტი მარჯვნივ."
                }
            }
        },

        'line-placement': {
            title: {
                en: "Line-Based Placement",
                ka: "ხაზებზე დაფუძნებული განთავსება"
            },
            subtitle: {
                en: "Place items precisely by specifying which grid lines they start and end at.",
                ka: "განათავსე ელემენტები ზუსტად მიუთითებ რომელ Grid ხაზებზე იწყებენ და ამთავრებენ."
            },
            sections: {
                gridLines: {
                    en: "Grid Lines",
                    ka: "Grid ხაზები"
                },
                gridLinesDesc: {
                    en: "Every grid has invisible lines that separate tracks. Lines are numbered starting from 1.",
                    ka: "ყველა Grid-ს აქვს უხილავი ხაზები, რომლებიც ყოფენ ტრეკებს. ხაზები დანომრილია 1-დან."
                },
                threeColumnExample: {
                    en: "A 3-column grid has <strong>4 column lines</strong> (1, 2, 3, 4).",
                    ka: "3-სვეტიან Grid-ს აქვს <strong>4 სვეტის ხაზი</strong> (1, 2, 3, 4)."
                },
                negativeLines: {
                    en: "Negative Line Numbers",
                    ka: "უარყოფითი ხაზის ნომრები"
                },
                negativeLinesDesc: {
                    en: "You can count from the end using negative numbers. <code>-1</code> is the last line.",
                    ka: "შეგიძლია დათვალო ბოლოდან უარყოფითი რიცხვებით. <code>-1</code> არის ბოლო ხაზი."
                },
                memorizeThis: {
                    en: "Memorize This",
                    ka: "დაიმახსოვრე ეს"
                },
                fenceAnalogy: {
                    en: "Lines are like fence posts, tracks are like fence panels. A 3-column grid has 3 panels (tracks) and 4 posts (lines).",
                    ka: "ხაზები ჰგვანან ღობის ბოძებს, ტრეკები — ღობის პანელებს. 3-სვეტიან Grid-ს აქვს 3 პანელი (ტრეკი) და 4 ბოძი (ხაზი)."
                }
            }
        },

        span: {
            title: {
                en: "Spanning Items",
                ka: "გაშლილი ელემენტები"
            },
            subtitle: {
                en: "Make items span across multiple rows or columns.",
                ka: "გაშალე ელემენტები რამდენიმე რიგზე ან სვეტზე."
            },
            sections: {
                spanKeyword: {
                    en: "The span Keyword",
                    ka: "span საკვანძო სიტყვა"
                },
                spanDesc: {
                    en: "Instead of specifying exact end lines, use <code>span</code> to cover a number of tracks.",
                    ka: "ზუსტი დასასრულის ხაზების მითითების ნაცვლად, გამოიყენე <code>span</code> ტრეკების რაოდენობის დასაფარად."
                },
                commonUseCases: {
                    en: "Common Use Cases",
                    ka: "გავრცელებული გამოყენების შემთხვევები"
                },
                useCasesDesc: {
                    en: "Use spanning for: featured cards, hero sections, sidebar layouts, image galleries with different-sized thumbnails.",
                    ka: "გამოიყენე გაშლა: გამორჩეული ბარათებისთვის, hero სექციებისთვის, სვეტების განლაგებისთვის, სურათების გალერეებისთვის სხვადასხვა ზომის მინიატურებით."
                },
                challenge: {
                    en: "Create a \"bento box\" layout where the first item spans 2 columns, and the 4th item spans 2 rows.",
                    ka: "შექმენი \"bento box\" განლაგება, სადაც პირველი ელემენტი ფარავს 2 სვეტს, ხოლო მე-4 ელემენტი — 2 რიგს."
                }
            }
        },

        'grid-areas': {
            title: {
                en: "Grid Areas",
                ka: "Grid არეები"
            },
            subtitle: {
                en: "Name your grid areas for semantic, readable layouts. This is a game-changer!",
                ka: "დაასახელე Grid არეები სემანტიკური, წაკითხვადი განლაგებებისთვის. ეს თამაშის შემცვლელია!"
            },
            sections: {
                namingAreas: {
                    en: "Naming Areas",
                    ka: "არეების დასახელება"
                },
                namingDesc: {
                    en: "Instead of line numbers, you can name areas and place items by name. Much more readable!",
                    ka: "ხაზის ნომრების ნაცვლად, შეგიძლია დაასახელო არეები და განათავსო ელემენტები სახელით. ბევრად უფრო წაკითხვადია!"
                },
                emptyCells: {
                    en: "Empty Cells",
                    ka: "ცარიელი უჯრები"
                },
                emptyCellsDesc: {
                    en: "Use a dot <code>.</code> to leave cells empty:",
                    ka: "გამოიყენე წერტილი <code>.</code> უჯრების ცარიელად დასატოვებლად:"
                },
                whyUseAreas: {
                    en: "Why Use Areas?",
                    ka: "რატომ გამოვიყენოთ არეები?"
                },
                whyUseAreasDesc: {
                    en: "Grid areas make responsive layouts trivial — just redefine <code>grid-template-areas</code> in a media query!",
                    ka: "Grid არეები რესპონსიულ განლაგებებს ტრივიალურს ხდის — უბრალოდ ხელახლა განსაზღვრე <code>grid-template-areas</code> media query-ში!"
                }
            }
        },

        'named-lines': {
            title: {
                en: "Named Lines",
                ka: "დასახელებული ხაზები"
            },
            subtitle: {
                en: "Give meaningful names to your grid lines for even clearer placement.",
                ka: "მიეცი მნიშვნელოვანი სახელები Grid ხაზებს უფრო გასაგები განთავსებისთვის."
            },
            sections: {
                namingLines: {
                    en: "Naming Grid Lines",
                    ka: "Grid ხაზების დასახელება"
                },
                namingDesc: {
                    en: "You can name lines using square brackets in your template definitions:",
                    ka: "შეგიძლია დაასახელო ხაზები კვადრატულ ფრჩხილებში შაბლონის განსაზღვრისას:"
                },
                whenToUse: {
                    en: "When to Use Named Lines",
                    ka: "როდის გამოვიყენოთ დასახელებული ხაზები"
                },
                whenToUseDesc: {
                    en: "Named lines shine in complex layouts where you reference the same lines repeatedly. They're also great for component libraries.",
                    ka: "დასახელებული ხაზები ბრწყინავენ რთულ განლაგებებში, სადაც ერთსა და იმავე ხაზებს მრავალჯერ მიმართავ. ისინი ასევე შესანიშნავია კომპონენტების ბიბლიოთეკებისთვის."
                }
            }
        },

        'justify-items': {
            title: {
                en: "Justify Items",
                ka: "Justify Items"
            },
            subtitle: {
                en: "Align items horizontally (inline axis) within their grid cells.",
                ka: "გაასწორე ელემენტები ჰორიზონტალურად (inline ღერძზე) მათ Grid უჯრებში."
            },
            sections: {
                justifyItems: {
                    en: "justify-items",
                    ka: "justify-items"
                },
                desc: {
                    en: "Controls how items are aligned along the inline (horizontal) axis within their cells.",
                    ka: "აკონტროლებს როგორ არის გასწორებული ელემენტები inline (ჰორიზონტალურ) ღერძზე მათ უჯრებში."
                },
                tryEachValue: {
                    en: "Try Each Value",
                    ka: "სცადე თითოეული მნიშვნელობა"
                }
            }
        },

        'align-items': {
            title: {
                en: "Align Items",
                ka: "Align Items"
            },
            subtitle: {
                en: "Align items vertically (block axis) within their grid cells.",
                ka: "გაასწორე ელემენტები ვერტიკალურად (block ღერძზე) მათ Grid უჯრებში."
            },
            sections: {
                alignItems: {
                    en: "align-items",
                    ka: "align-items"
                },
                desc: {
                    en: "Controls how items are aligned along the block (vertical) axis within their cells.",
                    ka: "აკონტროლებს როგორ არის გასწორებული ელემენტები block (ვერტიკალურ) ღერძზე მათ უჯრებში."
                }
            }
        },

        'place-items': {
            title: {
                en: "Place Items",
                ka: "Place Items"
            },
            subtitle: {
                en: "The shorthand for align-items + justify-items in one property.",
                ka: "შემოკლებული ფორმა align-items + justify-items ერთ თვისებაში."
            },
            sections: {
                placeItems: {
                    en: "place-items",
                    ka: "place-items"
                },
                desc: {
                    en: "Combines <code>align-items</code> and <code>justify-items</code> into one shorthand.",
                    ka: "აერთიანებს <code>align-items</code>-ს და <code>justify-items</code>-ს ერთ შემოკლებულ ფორმაში."
                },
                easiestCenteringTrick: {
                    en: "The Easiest Centering Trick",
                    ka: "ყველაზე მარტივი ცენტრირების ხრიკი"
                },
                centeringDesc: {
                    en: "This is the fastest way to center anything in CSS:",
                    ka: "ეს არის ყველაზე სწრაფი გზა ნებისმიერის დაცენტრებისთვის CSS-ში:"
                }
            }
        },

        'justify-content': {
            title: {
                en: "Justify Content",
                ka: "Justify Content"
            },
            subtitle: {
                en: "Align the entire grid horizontally when it's smaller than its container.",
                ka: "გაასწორე მთელი Grid ჰორიზონტალურად, როცა ის უფრო პატარაა ვიდრე მისი კონტეინერი."
            },
            sections: {
                justifyContent: {
                    en: "justify-content",
                    ka: "justify-content"
                },
                desc: {
                    en: "When your grid tracks don't fill the entire container, this property controls how the grid itself is positioned horizontally.",
                    ka: "როცა Grid ტრეკები არ ავსებენ მთელ კონტეინერს, ეს თვისება აკონტროლებს როგორ არის განთავსებული თავად Grid ჰორიზონტალურად."
                },
                whenApplies: {
                    en: "When Does This Apply?",
                    ka: "როდის მოქმედებს ეს?"
                },
                whenAppliesDesc: {
                    en: "justify-content only has an effect when your grid tracks (columns) don't fill the entire container width. Use fixed sizes or max-content to see it work.",
                    ka: "justify-content-ს ეფექტი აქვს მხოლოდ მაშინ, როცა Grid ტრეკები (სვეტები) არ ავსებენ კონტეინერის მთელ სიგანეს. გამოიყენე ფიქსირებული ზომები ან max-content სანახავად."
                }
            }
        },

        'align-content': {
            title: {
                en: "Align Content",
                ka: "Align Content"
            },
            subtitle: {
                en: "Align the entire grid vertically when it's smaller than its container.",
                ka: "გაასწორე მთელი Grid ვერტიკალურად, როცა ის უფრო პატარაა ვიდრე მისი კონტეინერი."
            },
            sections: {
                alignContent: {
                    en: "align-content",
                    ka: "align-content"
                },
                desc: {
                    en: "When your grid tracks don't fill the entire container vertically, this property controls how the grid itself is positioned.",
                    ka: "როცა Grid ტრეკები არ ავსებენ მთელ კონტეინერს ვერტიკალურად, ეს თვისება აკონტროლებს როგორ არის განთავსებული თავად Grid."
                }
            }
        },

        'auto-fill': {
            title: {
                en: "Auto-Fill & Auto-Fit",
                ka: "Auto-Fill და Auto-Fit"
            },
            subtitle: {
                en: "Create responsive grids that automatically adjust the number of columns.",
                ka: "შექმენი რესპონსიული Grid-ები, რომლებიც ავტომატურად არეგულირებენ სვეტების რაოდენობას."
            },
            sections: {
                autoFillVsAutoFit: {
                    en: "auto-fill vs auto-fit",
                    ka: "auto-fill vs auto-fit"
                },
                desc: {
                    en: "These keywords create dynamic column counts based on available space.",
                    ka: "ეს საკვანძო სიტყვები ქმნიან დინამიურ სვეტების რაოდენობას ხელმისაწვდომი სივრცის მიხედვით."
                },
                difference: {
                    en: "The Difference",
                    ka: "განსხვავება"
                },
                autoFillDesc: {
                    en: "<strong>auto-fill:</strong> Creates as many tracks as possible, even if empty",
                    ka: "<strong>auto-fill:</strong> ქმნის რაც შეიძლება მეტ ტრეკს, თუნდაც ცარიელს"
                },
                autoFitDesc: {
                    en: "<strong>auto-fit:</strong> Creates tracks, but collapses empty ones to 0",
                    ka: "<strong>auto-fit:</strong> ქმნის ტრეკებს, მაგრამ აკეცავს ცარიელებს 0-მდე"
                },
                recommendation: {
                    en: "In most cases, you want <code>auto-fit</code> with <code>minmax()</code>.",
                    ka: "უმეტეს შემთხვევაში, გინდა <code>auto-fit</code> <code>minmax()</code>-თან ერთად."
                },
                holyGrail: {
                    en: "The Holy Grail of Responsive Grids",
                    ka: "რესპონსიული Grid-ების წმინდა გრაალი"
                },
                holyGrailDesc: {
                    en: "This single line creates a fully responsive grid with no media queries!",
                    ka: "ეს ერთი ხაზი ქმნის სრულად რესპონსიულ Grid-ს media query-ების გარეშე!"
                }
            }
        },

        minmax: {
            title: {
                en: "minmax()",
                ka: "minmax()"
            },
            subtitle: {
                en: "Set minimum and maximum sizes for grid tracks.",
                ka: "დააყენე მინიმალური და მაქსიმალური ზომები Grid ტრეკებისთვის."
            },
            sections: {
                minmaxFunction: {
                    en: "The minmax() Function",
                    ka: "minmax() ფუნქცია"
                },
                desc: {
                    en: "Creates a size range that adapts based on available space.",
                    ka: "ქმნის ზომის დიაპაზონს, რომელიც ადაპტირდება ხელმისაწვდომი სივრცის მიხედვით."
                },
                specialKeywords: {
                    en: "Special Keywords",
                    ka: "სპეციალური საკვანძო სიტყვები"
                },
                minContent: {
                    en: "<code>min-content</code> — Smallest size without overflow",
                    ka: "<code>min-content</code> — ყველაზე პატარა ზომა გადავსების გარეშე"
                },
                maxContent: {
                    en: "<code>max-content</code> — Ideal size for content",
                    ka: "<code>max-content</code> — იდეალური ზომა კონტენტისთვის"
                },
                auto: {
                    en: "<code>auto</code> — Adapts to content (min: min-content, max: max-content)",
                    ka: "<code>auto</code> — ადაპტირდება კონტენტზე (min: min-content, max: max-content)"
                }
            }
        },

        'auto-flow': {
            title: {
                en: "Auto Flow",
                ka: "Auto Flow"
            },
            subtitle: {
                en: "Control how auto-placed items flow into the grid.",
                ka: "აკონტროლე როგორ მიედინება ავტომატურად განთავსებული ელემენტები Grid-ში."
            },
            sections: {
                gridAutoFlow: {
                    en: "grid-auto-flow",
                    ka: "grid-auto-flow"
                },
                desc: {
                    en: "Controls the direction items flow when they're not explicitly placed.",
                    ka: "აკონტროლებს მიმართულებას, რომლითაც მიედინება ელემენტები, როცა ისინი ცხადად არ არის განთავსებული."
                },
                denseAmazing: {
                    en: "dense is Amazing",
                    ka: "dense საოცარია"
                },
                denseDesc: {
                    en: "Add <code>dense</code> to fill gaps when items are different sizes. Perfect for masonry-like layouts!",
                    ka: "დაამატე <code>dense</code> ხარვეზების შესავსებად, როცა ელემენტები სხვადასხვა ზომისაა. იდეალურია masonry-ს მსგავსი განლაგებებისთვის!"
                }
            }
        },

        subgrid: {
            title: {
                en: "Subgrid",
                ka: "Subgrid"
            },
            subtitle: {
                en: "Align nested grids with their parent grid's tracks. The holy grail of nested layouts!",
                ka: "გაასწორე ჩადგმული Grid-ები მშობელი Grid-ის ტრეკებთან. ჩადგმული განლაგებების წმინდა გრაალი!"
            },
            sections: {
                whatIsSubgrid: {
                    en: "What is Subgrid?",
                    ka: "რა არის Subgrid?"
                },
                subgridDesc: {
                    en: "Subgrid lets a grid item's children align to the parent grid's tracks instead of creating a new independent grid.",
                    ka: "Subgrid საშუალებას აძლევს Grid ელემენტის შვილებს გასწორდნენ მშობელი Grid-ის ტრეკებთან, ახალი დამოუკიდებელი Grid-ის შექმნის ნაცვლად."
                },
                browserSupport: {
                    en: "Browser Support",
                    ka: "ბრაუზერის მხარდაჭერა"
                },
                browserSupportDesc: {
                    en: "Subgrid has good support in modern browsers. Check caniuse.com for current status.",
                    ka: "Subgrid-ს კარგი მხარდაჭერა აქვს თანამედროვე ბრაუზერებში. შეამოწმე caniuse.com მიმდინარე სტატუსისთვის."
                },
                whenToUse: {
                    en: "When to Use Subgrid",
                    ka: "როდის გამოვიყენოთ Subgrid"
                },
                whenToUseDesc: {
                    en: "Subgrid is perfect for: card layouts where content needs to align, forms with aligned labels, and any nested content that should respect the parent's grid.",
                    ka: "Subgrid იდეალურია: ბარათების განლაგებებისთვის, სადაც კონტენტი უნდა იყოს გასწორებული, ფორმებისთვის გასწორებული ლეიბლებით, და ნებისმიერი ჩადგმული კონტენტისთვის, რომელმაც უნდა დაიცვას მშობლის Grid."
                }
            }
        },

        'challenge-1': {
            title: {
                en: "Challenge: Holy Grail Layout",
                ka: "გამოწვევა: Holy Grail განლაგება"
            },
            subtitle: {
                en: "Build the classic Holy Grail layout using everything you've learned.",
                ka: "ააგე კლასიკური Holy Grail განლაგება ყველაფრის გამოყენებით, რაც ისწავლე."
            },
            sections: {
                yourMission: {
                    en: "Your Mission",
                    ka: "შენი მისია"
                },
                missionDesc: {
                    en: "Create a classic page layout with header, footer, main content, and two sidebars using CSS Grid.",
                    ka: "შექმენი კლასიკური გვერდის განლაგება header-ით, footer-ით, მთავარი კონტენტით და ორი სვეტით CSS Grid-ის გამოყენებით."
                },
                requirements: {
                    en: "Requirements:",
                    ka: "მოთხოვნები:"
                },
                req1: {
                    en: "Header spans the full width",
                    ka: "Header ფარავს სრულ სიგანეს"
                },
                req2: {
                    en: "Footer spans the full width",
                    ka: "Footer ფარავს სრულ სიგანეს"
                },
                req3: {
                    en: "Left sidebar is 200px wide",
                    ka: "მარცხენა სვეტი არის 200px სიგანის"
                },
                req4: {
                    en: "Right sidebar is 150px wide",
                    ka: "მარჯვენა სვეტი არის 150px სიგანის"
                },
                req5: {
                    en: "Main content fills the remaining space",
                    ka: "მთავარი კონტენტი ავსებს დარჩენილ სივრცეს"
                }
            }
        },

        'challenge-2': {
            title: {
                en: "Challenge: Card Grid",
                ka: "გამოწვევა: ბარათების Grid"
            },
            subtitle: {
                en: "Create a responsive card grid that adapts to any screen size.",
                ka: "შექმენი რესპონსიული ბარათების Grid, რომელიც ადაპტირდება ნებისმიერ ეკრანის ზომაზე."
            },
            sections: {
                yourMission: {
                    en: "Your Mission",
                    ka: "შენი მისია"
                },
                missionDesc: {
                    en: "Build a card grid that automatically adjusts the number of columns based on available space.",
                    ka: "ააგე ბარათების Grid, რომელიც ავტომატურად არეგულირებს სვეტების რაოდენობას ხელმისაწვდომი სივრცის მიხედვით."
                },
                requirements: {
                    en: "Requirements:",
                    ka: "მოთხოვნები:"
                },
                req1: {
                    en: "Cards should be at least 250px wide",
                    ka: "ბარათები უნდა იყოს მინიმუმ 250px სიგანის"
                },
                req2: {
                    en: "Cards should grow to fill available space",
                    ka: "ბარათები უნდა იზრდებოდეს ხელმისაწვდომი სივრცის შესავსებად"
                },
                req3: {
                    en: "Use 20px gap between cards",
                    ka: "გამოიყენე 20px დაშორება ბარათებს შორის"
                },
                req4: {
                    en: "No media queries needed!",
                    ka: "media query-ები არ არის საჭირო!"
                }
            }
        },

        'challenge-3': {
            title: {
                en: "Challenge: Dashboard Layout",
                ka: "გამოწვევა: Dashboard განლაგება"
            },
            subtitle: {
                en: "Build a complex dashboard with multiple widgets and a sidebar.",
                ka: "ააგე რთული dashboard მრავალი ვიჯეტით და სვეტით."
            },
            sections: {
                yourMission: {
                    en: "Your Mission",
                    ka: "შენი მისია"
                },
                missionDesc: {
                    en: "Create a modern dashboard layout with a fixed sidebar, header, and flexible widget area.",
                    ka: "შექმენი თანამედროვე dashboard განლაგება ფიქსირებული სვეტით, header-ით და მოქნილი ვიჯეტების არეით."
                }
            }
        }
    },

    // ============== GAME MODE TRANSLATIONS ==============
    gameModes: {
        gridBattle: {
            title: {
                en: "Grid Battle",
                ka: "Grid ბრძოლა"
            },
            subtitle: {
                en: "Time Attack Mode",
                ka: "დროის შეტევის რეჟიმი"
            },
            description: {
                en: "Race against the clock to recreate CSS Grid layouts. The faster and more accurate you are, the higher your score!",
                ka: "იჯიბრე საათის წინააღმდეგ CSS Grid განლაგებების აღსადგენად. რაც უფრო სწრაფი და ზუსტი ხარ, მით მეტია შენი ქულა!"
            },
            speedBonus: {
                en: "Speed Bonus",
                ka: "სისწრაფის ბონუსი"
            },
            accuracyPoints: {
                en: "Accuracy Points",
                ka: "სიზუსტის ქულები"
            },
            perfectBonus: {
                en: "Perfect Bonus",
                ka: "სრულყოფილების ბონუსი"
            },
            challengesCompleted: {
                en: "challenges completed",
                ka: "გამოწვევა დასრულებული"
            },
            categories: {
                all: { en: "All Challenges", ka: "ყველა გამოწვევა" },
                basic: { en: "Basic (1-10)", ka: "საბაზისო (1-10)" },
                responsive: { en: "Responsive", ka: "რესპონსიული" },
                speed: { en: "Speed Run", ka: "სისწრაფის რბოლა" },
                advanced: { en: "Advanced", ka: "გაღრმავებული" }
            },
            yourMission: {
                en: "Your Mission",
                ka: "შენი მისია"
            },
            targetLayout: {
                en: "Target Layout",
                ka: "სამიზნე განლაგება"
            },
            yourCSS: {
                en: "Your CSS",
                ka: "შენი CSS"
            },
            yourResult: {
                en: "Your Result",
                ka: "შენი შედეგი"
            },
            hint: {
                en: "Hint",
                ka: "მინიშნება"
            },
            submitSolution: {
                en: "Submit Solution",
                ka: "გამოგზავნე ამოხსნა"
            },
            victory: {
                en: "Victory!",
                ka: "გამარჯვება!"
            },
            tryAgain: {
                en: "Try Again",
                ka: "სცადე თავიდან"
            },
            totalScore: {
                en: "Total Score",
                ka: "საერთო ქულა"
            },
            accuracy: {
                en: "Accuracy",
                ka: "სიზუსტე"
            },
            timeBonus: {
                en: "Time Bonus",
                ka: "დროის ბონუსი"
            },
            missingOrIncorrect: {
                en: "Missing or Incorrect:",
                ka: "აკლია ან არასწორია:"
            },
            solution: {
                en: "Solution:",
                ka: "ამოხსნა:"
            },
            backToChallenges: {
                en: "Back to Challenges",
                ka: "უკან გამოწვევებში"
            },
            nextChallenge: {
                en: "Next Challenge",
                ka: "შემდეგი გამოწვევა"
            }
        },

        debugDetective: {
            title: {
                en: "Debug Detective",
                ka: "ბაგების დეტექტივი"
            },
            subtitle: {
                en: "Find and Fix the Bug",
                ka: "იპოვე და გაასწორე ბაგი"
            },
            description: {
                en: "Each challenge contains broken CSS. Find the bug, fix it, and learn from common mistakes!",
                ka: "თითოეული გამოწვევა შეიცავს გატეხილ CSS-ს. იპოვე ბაგი, გაასწორე და ისწავლე გავრცელებული შეცდომებიდან!"
            },
            bugIdentification: {
                en: "Bug Identification",
                ka: "ბაგის იდენტიფიცირება"
            },
            quickFix: {
                en: "Quick Fix",
                ka: "სწრაფი გასწორება"
            },
            hintsAvailable: {
                en: "Hints Available",
                ka: "მინიშნებები ხელმისაწვდომია"
            },
            theBug: {
                en: "The Bug",
                ka: "ბაგი"
            },
            fixTheCSS: {
                en: "Fix the CSS",
                ka: "გაასწორე CSS"
            },
            showHint: {
                en: "Show Hint",
                ka: "აჩვენე მინიშნება"
            },
            submitFix: {
                en: "Submit Fix",
                ka: "გამოგზავნე გასწორება"
            },
            bugFixed: {
                en: "Bug Fixed!",
                ka: "ბაგი გასწორდა!"
            },
            greatWork: {
                en: "Great detective work!",
                ka: "შესანიშნავი სადეტექტივო მუშაობა!"
            },
            lessonLearned: {
                en: "Lesson Learned:",
                ka: "ნასწავლი გაკვეთილი:"
            },
            notQuiteRight: {
                en: "Not Quite Right",
                ka: "არ არის სრულიად სწორი"
            },
            yourCode: {
                en: "Your Code:",
                ka: "შენი კოდი:"
            },
            expectedFix: {
                en: "Expected Fix:",
                ka: "მოსალოდნელი გასწორება:"
            },
            explanation: {
                en: "Explanation:",
                ka: "ახსნა:"
            },
            moreChallenges: {
                en: "More Challenges",
                ka: "მეტი გამოწვევა"
            },
            nextBug: {
                en: "Next Bug",
                ka: "შემდეგი ბაგი"
            }
        },

        cloneChallenge: {
            title: {
                en: "Clone Challenge",
                ka: "კლონირების გამოწვევა"
            },
            subtitle: {
                en: "Recreate Real Layouts",
                ka: "აღადგინე რეალური განლაგებები"
            },
            description: {
                en: "Clone famous website layouts using CSS Grid. Match the reference as closely as possible!",
                ka: "აკლონირე ცნობილი ვებსაიტების განლაგებები CSS Grid-ის გამოყენებით. დააახლოვე რეფერენსს რაც შეიძლება ზუსტად!"
            },
            websiteChallenges: {
                en: "Website Challenges",
                ka: "ვებსაიტის გამოწვევები"
            },
            referenceLayout: {
                en: "Reference Layout",
                ka: "სარეფერენსო განლაგება"
            },
            showSolution: {
                en: "Show Solution",
                ka: "აჩვენე ამოხსნა"
            },
            cloneComplete: {
                en: "Clone Complete!",
                ka: "კლონირება დასრულდა!"
            },
            layoutMatch: {
                en: "Your layout matches the reference!",
                ka: "შენი განლაგება ემთხვევა რეფერენსს!"
            },
            nextClone: {
                en: "Next Clone",
                ka: "შემდეგი კლონი"
            },
            closeMatch: {
                en: "Close Match!",
                ka: "ახლო მსგავსება!"
            },
            goodAttempt: {
                en: "Good attempt! Here's what was different:",
                ka: "კარგი მცდელობა! აი რა იყო განსხვავებული:"
            }
        },

        dailyChallenge: {
            title: {
                en: "Daily Challenge",
                ka: "დღის გამოწვევა"
            },
            subtitle: {
                en: "Today's Challenge",
                ka: "დღევანდელი გამოწვევა"
            },
            description: {
                en: "A new grid challenge every day. Complete it to maintain your streak!",
                ka: "ახალი Grid გამოწვევა ყოველდღე. დაასრულე სერიის შესანარჩუნებლად!"
            },
            bonusXP: {
                en: "Bonus XP for daily completion!",
                ka: "ბონუს XP ყოველდღიური დასრულებისთვის!"
            },
            alreadyCompleted: {
                en: "Already Completed!",
                ka: "უკვე დასრულებულია!"
            },
            comeBackTomorrow: {
                en: "You've completed today's challenge. Come back tomorrow for a new one!",
                ka: "დღევანდელი გამოწვევა დასრულებულია. დაბრუნდი ხვალ ახლისთვის!"
            },
            completedToday: {
                en: "Completed Today",
                ka: "დღეს დასრულებული"
            },
            currentStreak: {
                en: "Current Streak",
                ka: "მიმდინარე სერია"
            },
            days: {
                en: "days",
                ka: "დღე"
            }
        },

        achievements: {
            title: {
                en: "Achievements",
                ka: "მიღწევები"
            },
            subtitle: {
                en: "Your Progress",
                ka: "შენი პროგრესი"
            },
            unlocked: {
                en: "Unlocked",
                ka: "განბლოკილი"
            },
            locked: {
                en: "Locked",
                ka: "დაბლოკილი"
            },
            totalXP: {
                en: "Total XP",
                ka: "სულ XP"
            },
            achievementsUnlocked: {
                en: "achievements unlocked",
                ka: "მიღწევა განბლოკილი"
            }
        },

        puzzleMode: {
            title: {
                en: "Puzzle Mode",
                ka: "თავსატეხის რეჟიმი"
            },
            subtitle: {
                en: "Solve Grid Puzzles",
                ka: "ამოხსენი Grid თავსატეხები"
            },
            description: {
                en: "Drag and drop CSS properties to solve layout puzzles!",
                ka: "გადაიტანე CSS თვისებები განლაგების თავსატეხების ამოსახსნელად!"
            }
        },

        survivalMode: {
            title: {
                en: "Survival Mode",
                ka: "გადარჩენის რეჟიმი"
            },
            subtitle: {
                en: "How Long Can You Last?",
                ka: "რამდენ ხანს გაძლებ?"
            },
            description: {
                en: "Challenges get progressively harder. One mistake and it's game over!",
                ka: "გამოწვევები თანდათან უფრო რთულდება. ერთი შეცდომა და თამაში დასრულებულია!"
            }
        },

        speedRun: {
            title: {
                en: "Speed Run",
                ka: "სისწრაფის რბოლა"
            },
            subtitle: {
                en: "Race Against Time",
                ka: "რბოლა დროის წინააღმდეგ"
            },
            description: {
                en: "Complete all lessons as fast as possible!",
                ka: "დაასრულე ყველა გაკვეთილი რაც შეიძლება სწრაფად!"
            }
        }
    },

    // ============== GRID BATTLE CHALLENGES ==============
    challenges: {
        // Challenge names and descriptions
        1: {
            name: { en: "Simple 3-Column", ka: "მარტივი 3-სვეტიანი" },
            description: { en: "Create a simple 3-column grid", ka: "შექმენი მარტივი 3-სვეტიანი Grid" },
            hints: [
                { en: "Use display: grid", ka: "გამოიყენე display: grid" },
                { en: "grid-template-columns defines columns", ka: "grid-template-columns განსაზღვრავს სვეტებს" },
                { en: "1fr means 1 fraction of space", ka: "1fr ნიშნავს სივრცის 1 წილს" }
            ]
        },
        2: {
            name: { en: "Two Row Layout", ka: "ორრიგიანი განლაგება" },
            description: { en: "Create a 2x2 grid with 100px rows", ka: "შექმენი 2x2 Grid 100px რიგებით" },
            hints: [
                { en: "Use grid-template-rows for row sizes", ka: "გამოიყენე grid-template-rows რიგების ზომებისთვის" },
                { en: "px units for fixed sizes", ka: "px ერთეულები ფიქსირებული ზომებისთვის" }
            ]
        },
        3: {
            name: { en: "Sidebar Layout", ka: "სვეტის განლაგება" },
            description: { en: "Create a sidebar (200px) + main content layout", ka: "შექმენი სვეტი (200px) + მთავარი კონტენტის განლაგება" },
            hints: [
                { en: "Fixed width + flexible width", ka: "ფიქსირებული სიგანე + მოქნილი სიგანე" },
                { en: "First column 200px, second 1fr", ka: "პირველი სვეტი 200px, მეორე 1fr" }
            ]
        },
        4: {
            name: { en: "Card Grid", ka: "ბარათების Grid" },
            description: { en: "Create a responsive card grid with auto-fit", ka: "შექმენი რესპონსიული ბარათების Grid auto-fit-ით" },
            hints: [
                { en: "Use repeat() with auto-fit", ka: "გამოიყენე repeat() auto-fit-ით" },
                { en: "minmax() for responsive sizing", ka: "minmax() რესპონსიული ზომებისთვის" }
            ]
        },
        5: {
            name: { en: "Header-Main-Footer", ka: "Header-მთავარი-Footer" },
            description: { en: "Create a classic page layout", ka: "შექმენი კლასიკური გვერდის განლაგება" },
            hints: [
                { en: "Use grid-template-rows", ka: "გამოიყენე grid-template-rows" },
                { en: "Header and footer fixed, main flexible", ka: "Header და footer ფიქსირებული, მთავარი მოქნილი" }
            ]
        },
        6: {
            name: { en: "Holy Grail", ka: "Holy Grail" },
            description: { en: "Create the famous Holy Grail layout", ka: "შექმენი ცნობილი Holy Grail განლაგება" },
            hints: [
                { en: "Use grid-template-areas", ka: "გამოიყენე grid-template-areas" },
                { en: "Define areas with quoted strings", ka: "განსაზღვრე არეები ბრჭყალებიან სტრინგებით" },
                { en: "Assign items with grid-area", ka: "მიანიჭე ელემენტები grid-area-ით" }
            ]
        },
        7: {
            name: { en: "Centered Content", ka: "ცენტრირებული კონტენტი" },
            description: { en: "Center a box both vertically and horizontally", ka: "დაცენტრე ყუთი ვერტიკალურად და ჰორიზონტალურად" },
            hints: [
                { en: "place-items is a shorthand", ka: "place-items არის შემოკლება" },
                { en: "center centers both axes", ka: "center ცენტრავს ორივე ღერძს" }
            ]
        },
        8: {
            name: { en: "Dense Packing", ka: "მკვრივი შეფუთვა" },
            description: { en: "Use dense auto-flow to fill gaps", ka: "გამოიყენე dense auto-flow ხარვეზების შესავსებად" },
            hints: [
                { en: "grid-auto-flow controls placement", ka: "grid-auto-flow აკონტროლებს განთავსებას" },
                { en: "dense fills in gaps", ka: "dense ავსებს ხარვეზებს" }
            ]
        },
        9: {
            name: { en: "Gallery Grid", ka: "გალერეის Grid" },
            description: { en: "Create a gallery with a featured image", ka: "შექმენი გალერეა გამორჩეული სურათით" },
            hints: [
                { en: "Featured spans 2 columns and 2 rows", ka: "გამორჩეული ფარავს 2 სვეტს და 2 რიგს" },
                { en: "Use grid-column and grid-row: span", ka: "გამოიყენე grid-column და grid-row: span" }
            ]
        },
        10: {
            name: { en: "Dashboard Layout", ka: "Dashboard განლაგება" },
            description: { en: "Create a complex dashboard with widgets", ka: "შექმენი რთული dashboard ვიჯეტებით" },
            hints: [
                { en: "Use negative line numbers", ka: "გამოიყენე უარყოფითი ხაზის ნომრები" },
                { en: "Span from 2 to -1 for remaining", ka: "გაშალე 2-დან -1-მდე დარჩენილისთვის" },
                { en: "Mix fixed and flexible columns", ka: "შეურიე ფიქსირებული და მოქნილი სვეტები" }
            ]
        }
    },

    // ============== DEBUG CHALLENGES ==============
    debugChallenges: {
        1: {
            name: { en: "Missing Display", ka: "აკლია Display" },
            description: { en: "The grid isn't working! Find the bug.", ka: "Grid არ მუშაობს! იპოვე ბაგი." },
            hint: { en: "Grid won't work without declaring it first...", ka: "Grid არ იმუშავებს მისი გამოცხადების გარეშე..." },
            explanation: { en: "You need display: grid to enable grid layout", ka: "საჭიროა display: grid Grid განლაგების გასააქტიურებლად" }
        },
        2: {
            name: { en: "Typo in Template", ka: "ბეჭდვითი შეცდომა Template-ში" },
            description: { en: "Columns aren't sizing correctly", ka: "სვეტები არასწორად ზომავენ" },
            hint: { en: "Check your spelling carefully...", ka: "ყურადღებით შეამოწმე მართლწერა..." },
            explanation: { en: "It's 'template' not 'templete'", ka: "უნდა იყოს 'template' და არა 'templete'" }
        },
        3: {
            name: { en: "Missing Unit", ka: "აკლია ერთეული" },
            description: { en: "Gap isn't being applied", ka: "Gap არ გამოიყენება" },
            hint: { en: "Numbers need units in CSS...", ka: "რიცხვებს CSS-ში ერთეულები სჭირდება..." },
            explanation: { en: "Gap needs a unit like px, rem, or em", ka: "Gap-ს სჭირდება ერთეული როგორიცაა px, rem, ან em" }
        },
        4: {
            name: { en: "Invalid Repeat", ka: "არასწორი Repeat" },
            description: { en: "The repeat function isn't working", ka: "repeat ფუნქცია არ მუშაობს" },
            hint: { en: "repeat() takes two arguments separated by...", ka: "repeat() იღებს ორ არგუმენტს გამოყოფილს..." },
            explanation: { en: "repeat() needs a comma: repeat(count, value)", ka: "repeat()-ს სჭირდება მძიმე: repeat(რაოდენობა, მნიშვნელობა)" }
        },
        5: {
            name: { en: "Area Mismatch", ka: "არეის შეუსაბამობა" },
            description: { en: "Grid areas aren't being assigned", ka: "Grid არეები არ ენიჭება" },
            hint: { en: "The area names must match exactly...", ka: "არეის სახელები ზუსტად უნდა ემთხვეოდეს..." },
            explanation: { en: "grid-area value must match the name in grid-template-areas", ka: "grid-area მნიშვნელობა უნდა ემთხვეოდეს სახელს grid-template-areas-ში" }
        },
        6: {
            name: { en: "Broken Minmax", ka: "გატეხილი Minmax" },
            description: { en: "Responsive columns aren't working", ka: "რესპონსიული სვეტები არ მუშაობს" },
            hint: { en: "minmax() needs proper syntax...", ka: "minmax()-ს სწორი სინტაქსი სჭირდება..." },
            explanation: { en: "minmax() needs a comma between min and max values", ka: "minmax()-ს სჭირდება მძიმე min და max მნიშვნელობებს შორის" }
        },
        7: {
            name: { en: "Wrong Span", ka: "არასწორი Span" },
            description: { en: "Item isn't spanning correctly", ka: "ელემენტი არასწორად იშლება" },
            hint: { en: "Check the span syntax...", ka: "შეამოწმე span სინტაქსი..." },
            explanation: { en: "Use 'span 2' not '2 span' - keyword comes first", ka: "გამოიყენე 'span 2' და არა '2 span' - საკვანძო სიტყვა პირველი მოდის" }
        },
        8: {
            name: { en: "Auto-flow Issue", ka: "Auto-flow პრობლემა" },
            description: { en: "Items aren't filling gaps", ka: "ელემენტები არ ავსებენ ხარვეზებს" },
            hint: { en: "There's a keyword for dense packing...", ka: "არსებობს საკვანძო სიტყვა მკვრივი შეფუთვისთვის..." },
            explanation: { en: "Use grid-auto-flow: dense to fill gaps", ka: "გამოიყენე grid-auto-flow: dense ხარვეზების შესავსებად" }
        },
        9: {
            name: { en: "Alignment Bug", ka: "გასწორების ბაგი" },
            description: { en: "Items aren't centering", ka: "ელემენტები არ ცენტრდება" },
            hint: { en: "place-items is a shorthand for...", ka: "place-items არის შემოკლება..." },
            explanation: { en: "place-items: center centers both axes at once", ka: "place-items: center ცენტრავს ორივე ღერძს ერთდროულად" }
        },
        10: {
            name: { en: "Line Number Error", ka: "ხაზის ნომრის შეცდომა" },
            description: { en: "Item placement is off", ka: "ელემენტის განთავსება არასწორია" },
            hint: { en: "Grid lines start at 1, not 0...", ka: "Grid ხაზები 1-დან იწყება, არა 0-დან..." },
            explanation: { en: "Grid lines are 1-indexed, not 0-indexed like arrays", ka: "Grid ხაზები 1-დან იწყება, არა 0-დან როგორც მასივები" }
        }
    },

    // ============== CLONE CHALLENGES ==============
    cloneChallenges: {
        youtube: {
            name: { en: "YouTube Layout", ka: "YouTube განლაგება" },
            description: { en: "Recreate YouTube's video grid layout", ka: "აღადგინე YouTube-ის ვიდეო Grid განლაგება" }
        },
        twitter: {
            name: { en: "Twitter/X Feed", ka: "Twitter/X არხი" },
            description: { en: "Clone the Twitter/X feed layout", ka: "აკლონირე Twitter/X არხის განლაგება" }
        },
        pinterest: {
            name: { en: "Pinterest Masonry", ka: "Pinterest Masonry" },
            description: { en: "Create a Pinterest-style masonry grid", ka: "შექმენი Pinterest-ის სტილის masonry Grid" }
        },
        spotify: {
            name: { en: "Spotify Dashboard", ka: "Spotify Dashboard" },
            description: { en: "Build Spotify's album grid layout", ka: "ააგე Spotify-ის ალბომის Grid განლაგება" }
        },
        netflix: {
            name: { en: "Netflix Rows", ka: "Netflix რიგები" },
            description: { en: "Recreate Netflix's horizontal scroll rows", ka: "აღადგინე Netflix-ის ჰორიზონტალური სქროლის რიგები" }
        }
    },

    // ============== COMMON UI STRINGS ==============
    ui: {
        back: { en: "Back", ka: "უკან" },
        backToLessons: { en: "Back to Lessons", ka: "უკან გაკვეთილებში" },
        next: { en: "Next", ka: "შემდეგი" },
        previous: { en: "Previous", ka: "წინა" },
        reset: { en: "Reset", ka: "თავიდან" },
        submit: { en: "Submit", ka: "გაგზავნა" },
        tryAgain: { en: "Try Again", ka: "სცადე თავიდან" },
        hint: { en: "Hint", ka: "მინიშნება" },
        solution: { en: "Solution", ka: "ამოხსნა" },
        difficulty: { en: "Difficulty", ka: "სირთულე" },
        timeLeft: { en: "Time Left", ka: "დარჩენილი დრო" },
        score: { en: "Score", ka: "ქულა" },
        livePreview: { en: "Live Preview", ka: "პირდაპირი გადახედვა" },
        needHint: { en: "Need a hint?", ka: "გჭირდება მინიშნება?" },
        beginner: { en: "Beginner", ka: "დამწყები" },
        intermediate: { en: "Intermediate", ka: "საშუალო" },
        advanced: { en: "Advanced", ka: "გაღრმავებული" },
        challenge: { en: "Challenge", ka: "გამოწვევა" },
        proTip: { en: "Pro Tip", ka: "პროფესიონალის რჩევა" }
    },

    // ============== ACHIEVEMENT DESCRIPTIONS ==============
    achievementDescriptions: {
        firstLesson: { en: "Complete your first lesson", ka: "დაასრულე შენი პირველი გაკვეთილი" },
        gridApprentice: { en: "Complete 5 lessons", ka: "დაასრულე 5 გაკვეთილი" },
        gridMaster: { en: "Complete all 21 lessons", ka: "დაასრულე ყველა 21 გაკვეთილი" },
        speedDemon: { en: "Complete a Grid Battle in under 30 seconds", ka: "დაასრულე Grid ბრძოლა 30 წამში" },
        perfectScore: { en: "Get 100% accuracy in Grid Battle", ka: "მიიღე 100% სიზუსტე Grid ბრძოლაში" },
        debugPro: { en: "Complete 5 Debug Detective challenges", ka: "დაასრულე 5 Debug დეტექტივის გამოწვევა" },
        debugMaster: { en: "Complete all Debug Detective challenges", ka: "დაასრულე ყველა Debug დეტექტივის გამოწვევა" },
        cloneWarrior: { en: "Complete a Clone Challenge", ka: "დაასრულე კლონირების გამოწვევა" },
        cloneMaster: { en: "Complete all Clone Challenges", ka: "დაასრულე ყველა კლონირების გამოწვევა" },
        streak3: { en: "3-day streak", ka: "3-დღიანი სერია" },
        streak7: { en: "7-day streak", ka: "7-დღიანი სერია" },
        streak30: { en: "30-day streak", ka: "30-დღიანი სერია" },
        dailyWarrior: { en: "Complete 10 daily challenges", ka: "დაასრულე 10 ყოველდღიური გამოწვევა" },
        battleVeteran: { en: "Win 10 Grid Battles", ka: "მოიგე 10 Grid ბრძოლა" },
        allRounder: { en: "Try all game modes", ka: "სცადე ყველა თამაშის რეჟიმი" },
        bossSlayer: { en: "Complete a Boss Battle challenge", ka: "დაასრულე ბოსის ბრძოლის გამოწვევა" },
        survivalPro: { en: "Score 500+ in Survival Mode", ka: "დააგროვე 500+ ქულა გადარჩენის რეჟიმში" },
        speedRunner: { en: "Complete Speed Run under 3 minutes", ka: "დაასრულე სისწრაფის რბოლა 3 წუთში" },
        puzzleMaster: { en: "Complete all Puzzle Mode challenges", ka: "დაასრულე თავსატეხის რეჟიმის ყველა გამოწვევა" },
        nightOwl: { en: "Practice after midnight", ka: "ივარჯიშე შუაღამის შემდეგ" },
        earlyBird: { en: "Practice before 7 AM", ka: "ივარჯიშე დილის 7-მდე" },
        centurion: { en: "Complete 100 challenges total", ka: "დაასრულე სულ 100 გამოწვევა" },
        xpHoarder: { en: "Earn 5000 XP total", ka: "დააგროვე სულ 5000 XP" },
        socialButterfly: { en: "Share your progress", ka: "გააზიარე შენი პროგრესი" },
        weekendWarrior: { en: "Complete 5 challenges on a weekend", ka: "დაასრულე 5 გამოწვევა შაბათ-კვირას" }
    }
};

// Helper function to get localized content
function getLocalizedContent(path, defaultLang = 'en') {
    const lang = window.i18n?.currentLang || defaultLang;
    const keys = path.split('.');
    let value = CONTENT_TRANSLATIONS;
    
    for (const key of keys) {
        if (value && value[key] !== undefined) {
            value = value[key];
        } else {
            console.warn(`Translation not found: ${path}`);
            return path;
        }
    }
    
    // If value is an object with language keys, return the appropriate language
    if (value && typeof value === 'object' && (value.en !== undefined || value.ka !== undefined)) {
        return value[lang] || value.en || path;
    }
    
    return value;
}

// Shorthand
function t(path) {
    return getLocalizedContent(path);
}

// Export
window.CONTENT_TRANSLATIONS = CONTENT_TRANSLATIONS;
window.getLocalizedContent = getLocalizedContent;
window.tc = t; // tc = translate content

console.log('📚 Content translations loaded!');
