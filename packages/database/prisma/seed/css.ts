import type { SubjectData } from "./types";

export const cssSubject: SubjectData = {
  slug: "css",
  title: "CSS",
  description:
      "Master cascading stylesheets - from selectors and the box model to flexbox, grid, animations, and modern CSS architecture",
  icon: "Palette",
  color: "text-blue-500",
  order: 2,
  topics: [
    {
      slug: "css-basics",
      title: "CSS Basics",
      description:
        "Learn the core building blocks of CSS - selectors, colors, units, the box model, and display fundamentals",
      order: 1,
      subtopics: [
        {
          slug: "selectors",
          title: "Selectors",
          order: 1,
          content: {
            overview:
            "CSS selectors are patterns used to select and style HTML elements. They are the bridge between your HTML structure and CSS rules, determining which elements receive which styles.",
            problemStatement:
            "Without selectors, there would be no way to target specific elements on a page for styling. You would have to apply the same styles to everything or resort to inline styles, making code repetitive, unmaintainable, and impossible to scale.",
            intuitionFirst:
            "Think of CSS selectors like an addressing system. Just as a postal address narrows down from country to street to house number, selectors narrow down from all elements on a page to a very specific one. The more specific your selector, the more precisely you can target what to style.",
            realLifeAnalogy:
            "CSS selectors are like a restaurant reservation system. A type selector (div) is like saying \"a customer\" - too vague. A class selector (.VIP) is like saying \"any VIP customer\". An ID selector (#table5) is like saying \"the specific party at table 5\".",
            visualExplanation:
            "  +----------+       Selector Match\n  | <html>   |       div -> matches ALL <div>\n  |  + <div>  |      .box -> matches ANY class=\"box\"\n  |  | + <p>  |      #id -> matches ONE element\n  |  | + <p>  |      div > p -> direct child <p> of <div>\n  |  + <div>  |      div + p -> <p> immediately after <div>\n  +----------+",
            howItWorks:
            "The browser's CSS engine reads selectors from right to left. For \"div p.highlight\", the engine first finds all elements with class \"highlight\" that are <p>, then filters to only those inside a <div>. This right-to-left matching is more efficient because it reduces the candidate set early. Selectors have different specificity weights: inline styles (1000), IDs (100), classes/attributes/pseudo-classes (10), elements/pseudo-elements (1). When multiple selectors match, the one with highest specificity wins.",
            beginnerExample:
            "/* Type selector */\np { color: blue; }\n\n/* Class selector */\n.highlight { background: yellow; }\n\n/* ID selector */\n#header { font-size: 24px; }\n\n/* Descendant selector */\ndiv p { line-height: 1.6; }\n\n/* Child selector */\nul > li { list-style: square; }\n\n/* Attribute selector */\ninput[type=\"text\"] { border: 1px solid gray; }",
            commonMistakes:
            "Overusing IDs for styling (they have the highest specificity and are hard to override), making selectors too deep (e.g., div.container > ul.list > li.item > a.link), relying on !important instead of fixing specificity, and overusing the universal selector * in performance-critical animations.",
            bestPractices:
            "Prefer classes over IDs for styling, keep selectors shallow (2-3 levels deep max), use meaningful class names (BEM methodology), avoid !important, and leverage specificity intentionally rather than fighting it.",
            performanceNotes:
            "The universal selector (*) and descendant selectors with many levels are the slowest for browsers to evaluate. Browsers optimize well for common selectors, but extremely complex selectors can cause style recalculation delays in large DOMs, especially during JavaScript-triggered layout changes.",
            codingExamples:
            "/* Specificity examples - each is more specific than the last */\np { color: black; }           /* specificity: 1 */\n.highlight { color: red; }    /* specificity: 10 */\n#banner { color: green; }     /* specificity: 100 */",
          },
          quiz: [
            {"id": "css-selectors-1", "question": "What is the specificity of a class selector?", "options": ["10", "1", "100", "0"], "correctIndex": 0, "explanation": "Class selectors have a specificity weight of 10.", "difficulty": "easy"},
            {"id": "css-selectors-2", "question": "How does the browser's CSS engine read selectors for matching?", "options": ["Right to left", "Left to right", "Top to bottom", "Random based on specificity"], "correctIndex": 0, "explanation": "The CSS engine reads selectors from right to left for efficiency.", "difficulty": "medium"},
            {"id": "css-selectors-3", "question": "Given <div class='box' id='main'>, which selector has the highest specificity?", "options": ["#main { color: red; }", ".box { color: blue; }", "div { color: green; }", "div.box { color: yellow; }"], "correctIndex": 0, "explanation": "The ID selector #main has specificity 100, which beats class (10) and element (1) selectors.", "difficulty": "hard"},
          ],
          faangQuestions: [
            {"question": "Explain the CSS cascade algorithm in detail. How does specificity, source order, and importance interact to determine which styles apply?", "answer": "The cascade algorithm has 4 steps: 1) Collect all CSS declarations from all sources (author stylesheets, user stylesheets, browser defaults). 2) Sort by origin and importance: !important declarations trump normal ones; within importance, author > user > browser. 3) Sort by specificity: inline styles (1000) > IDs (100) > classes/pseudo-classes/attributes (10) > elements/pseudo-elements (1). 4) If two declarations have the same specificity, the one that appears later in the source order wins.", "difficulty": "hard", "company": "Google"},
            {"question": "How do CSS pseudo-classes like :is(), :where(), :not(), and :has() differ in specificity behavior? Why were these designed this way?", "answer": ":is() and :not() take the specificity of their most specific argument. :where() always has zero specificity. :has() follows the same rule as :is(). This design allows developers to intentionally choose specificity behavior: use :where() for reset/normalize styles that should be easy to override, use :is() when you need the specificity of the most specific argument.", "difficulty": "expert", "company": "Meta"},
          ],
          codingChallenges: [
            {"title": "CSS Selector Specificity Calculator", "description": "Create an HTML page where users can input a CSS selector and see its specificity breakdown (inline, ID, class, element counts). Support compound selectors like div.class#id and multiple selectors separated by commas.", "difficulty": "medium", "solutionHint": "Parse selector by counting IDs (#), classes (.), pseudo-classes (:), attributes ([]), and elements. Split on combinators (>, +, ~, space) first."},
          ],
        },
        {
          slug: "colors",
          title: "Colors",
          order: 2,
          content: {
            overview:
            "CSS offers multiple ways to specify colors: named colors, hexadecimal notation, RGB, RGBA, HSL, HSLA, and modern color spaces like OKLCH, LAB, and color(). Each method serves different use cases and offers different advantages.",
            problemStatement:
            "Before standardized color systems, representing colors consistently across browsers was unreliable. Early CSS only had about 16 named colors, making fine-grained design control impossible.",
            intuitionFirst:
            "Think of color functions as different color-mixing philosophies. Hex and RGB are like mixing paint by numbers (combining red, green, blue channels). HSL describes color by hue (the pure color), saturation (intensity), and lightness (brightness vs darkness), which is more intuitive for humans.",
            realLifeAnalogy:
            "Named colors are like Crayola crayons - familiar but very limited. Hex codes are like precise GPS coordinates for colors. HSL is like giving directions: \"turn left at red (hue), go very red (saturation), but make it a bit dimmer (lightness)\".",
            visualExplanation:
            "  Color Spaces Comparison\n  +-----------+------------------------+\n  | Hex      | #FF5733               |\n  | RGB      | rgb(255, 87, 51)     |\n  | HSL      | hsl(10, 100%, 60%)   |\n  | OKLCH    | oklch(0.628, 0.257, 29.234) |\n  +-----------+------------------------+\n  Each representation describes the same orange-red differently.",
            howItWorks:
            "The browser parses color strings using the CSS Color parsing algorithm. Hex values undergo a conversion to RGB: each pair of hex digits (FF, 57, 33) is converted to decimal (255, 87, 51). HSL converts to RGB using mathematical formulas involving hue angle (0-360 deg), saturation (0-100%), and lightness (0-100%). The alpha channel is composited during the painting phase by blending the color with the background.",
            beginnerExample:
            "/* Named colors */\ncolor: red;\ncolor: transparent;\n\n/* Hexadecimal */\ncolor: #ff0000;\ncolor: #f00;  /* shorthand */\ncolor: #ff000080;  /* 8-digit hex with alpha */\n\n/* RGB / RGBA */\ncolor: rgb(255, 0, 0);\ncolor: rgba(255, 0, 0, 0.5);\n\n/* HSL / HSLA */\ncolor: hsl(0, 100%, 50%);\ncolor: hsla(0, 100%, 50%, 0.3);\n\n/* Modern */\ncolor: oklch(0.628, 0.257, 29.234);",
            commonMistakes:
            "Using hex codes without alpha when transparency is needed (use rgba/hsla or 8-digit hex), hardcoding color values instead of using CSS custom properties, ignoring accessibility contrast guidelines, and using too many similar color shades.",
            bestPractices:
            "Use HSL for human-readable and easily modifiable colors, use CSS custom properties for theme color palettes, ensure WCAG AA contrast ratio of 4.5:1 for normal text and 3:1 for large text (18px+ bold or 24px+ regular).",
            performanceNotes:
            "Modern color functions (oklch, color()) have negligible performance difference vs hex/RGB in modern browsers. Pre-2020 browsers may have slower parsing for modern color functions, but the difference is imperceptible in practice.",
            codingExamples:
            ":root {\n  --primary: hsl(210, 100%, 50%);\n  --primary-light: hsl(210, 100%, 70%);\n  --primary-dark: hsl(210, 100%, 30%);\n}\n\n.button {\n  background: var(--primary);\n  color: white;\n  border: 2px solid var(--primary-dark);\n}\n\n.button:hover {\n  background: var(--primary-light);\n}",
          },
          quiz: [
            {"id": "css-colors-1", "question": "What does the alpha channel in RGBA control?", "options": ["Transparency level (0 = fully transparent, 1 = fully opaque)", "Hue angle", "Saturation percentage", "Color temperature"], "correctIndex": 0, "explanation": "The alpha channel controls opacity from 0 (fully transparent) to 1 (fully opaque).", "difficulty": "easy"},
            {"id": "css-colors-2", "question": "What is the main advantage of HSL over RGB for designers?", "options": ["Easier to adjust lightness/darkness intuitively", "Supports 16 million more colors", "Faster browser parsing", "Automatically meets WCAG contrast requirements"], "correctIndex": 0, "explanation": "HSL separates hue, saturation, and lightness into independent axes, making brightness adjustments intuitive.", "difficulty": "medium"},
            {"id": "css-colors-3", "question": "What is the minimum WCAG AA contrast ratio required for normal body text?", "options": ["4.5:1", "3:1", "7:1", "2:1"], "correctIndex": 0, "explanation": "WCAG AA requires a contrast ratio of 4.5:1 for normal-sized text and 3:1 for large text.", "difficulty": "hard"},
          ],
          faangQuestions: [
            {"question": "How does the OKLCH color space improve upon RGB and HSL for design systems? What makes it perceptually uniform?", "answer": "OKLCH is perceptually uniform: numerically equal changes produce visually equal changes across the entire spectrum. HSL has non-uniform lightness (yellows appear lighter, blues appear darker at the same lightness value). OKLCH models human vision more accurately by using the Oklab color space which accounts for how cone cells in the human eye perceive color differences.", "difficulty": "hard", "company": "Stripe"},
            {"question": "How does the CSS color-mix() function work? Give three practical use cases with examples.", "answer": "color-mix(in <colorspace>, <color1>, <color2> [percentages]) blends two colors in a specified color space. Use cases: 1) Generating hover states: color-mix(in srgb, var(--primary), black 20%). 2) Creating brand variants without extra CSS variables. 3) Implementing dark mode by mixing with white/black at different percentages.", "difficulty": "medium", "company": "Adobe"},
          ],
          codingChallenges: [
            {"title": "Color Space Converter", "description": "Build an interactive tool that converts colors between hex, RGB, and HSL formats in real time as the user types in any format.", "difficulty": "medium", "solutionHint": "Parse hex/RGB/HSL input with regex, convert using standard formulas (e.g., hex to RGB, RGB to HSL algorithm), update all output fields on any input change."},
            {"title": "WCAG Contrast Checker", "description": "Create an interactive tool that shows the contrast ratio between a foreground and background color, indicating if it passes WCAG AA and AAA at both normal and large text sizes.", "difficulty": "hard", "solutionHint": "Use the relative luminance formula: L = 0.2126*R + 0.7152*G + 0.0722*B. Contrast ratio = (L1 + 0.05) / (L2 + 0.05). AA: 4.5:1 normal, 3:1 large. AAA: 7:1 normal, 4.5:1 large."},
          ],
        },
        {
          slug: "css-units",
          title: "CSS Units",
          order: 3,
          content: {
            overview:
            "CSS provides a variety of units: absolute units (px, pt, cm, in, mm, pc, Q) and relative units (%, em, rem, vw, vh, vmin, vmax, ch, ex, lh, and newer viewport variants dvw/dvh/svw/svh/lvw/lvh, plus container query units cqw/cqh/cqi/cqb/cqmin/cqmax). Understanding when to use each is crucial for building responsive, accessible designs.",
            problemStatement:
            "Fixed-size designs break on different screen sizes. Using absolute units everywhere leads to layouts that overflow small screens or look tiny on large ones. Using relative units incorrectly can cause unexpected behavior.",
            intuitionFirst:
            "Think of CSS units like measurement tools in real life. Inches and centimeters are absolute (like px) - they stay the same everywhere. Percentages are like fractions of a container. em and rem are like setting font size relative to a baseline text size.",
            realLifeAnalogy:
            "CSS units are like ordering drinks at different venues: vw/vh is like filling any glass to the brim (viewport-relative). Percentage is like dividing a pizza among friends (parent-relative). rem is like having a standard shot glass that everyone uses (root font-size). em is like a cup size that varies by restaurant (parent-relative).",
            visualExplanation:
            "  +---------------------------+\n  | Viewport (100vw x 100vh)  |\n  |                           |\n  |  +---------+  50vw wide  |\n  |  | 50%     | = half of  |\n  |  | of      | the parent |\n  |  | parent  | = 25vw     |\n  |  +---------+             |\n  |  1rem = root font-size  |\n  +---------------------------+",
            howItWorks:
            "Absolute units are fixed: 1px = 1/96th of an inch (on standard screens). Relative units are computed relative to something else: em is relative to the parent element's font-size, rem is relative to the root (<html>) font-size, vw equals 1% of viewport width, vh equals 1% of viewport height, % is relative to the parent element's matching CSS property. Container query units (cqw, cqh, etc.) are relative to the nearest container's size (defined with container-type or container properties).",
            beginnerExample:
            "/* Absolute */\n.box { width: 200px; border: 1px solid black; }\n\n/* Relative to parent */\n.child { width: 50%; }  /* 50% of parent width */\n\n/* Relative to font-size */\n.text { font-size: 2rem; }  /* 2x root font-size */\n.margin { margin: 1em; }    /* 1x current font-size */\n\n/* Relative to viewport */\n.hero { height: 100vh; }  /* full viewport height */\n.sidebar { width: 30vw; } /* 30% of viewport width */\n\n/* Relative to character width */\n.article { max-width: 80ch; }  /* 80 characters wide */",
            commonMistakes:
            "Using em for font-size in deeply nested elements causes compounding (unexpected larger sizes), using px for everything breaks responsiveness, using vw for font-sizes without min/max clamping causes text to be too small on narrow screens.",
            bestPractices:
            "Use rem for typography (respects user font-size preferences), % for layout widths, vw/vh for full-screen hero sections, px for borders and small decorative elements, clamp() for responsive font-sizes that need min/max boundaries.",
            performanceNotes:
            "Computing relative units can cause minor layout recalculations, but modern browser engines handle this efficiently. Container units may trigger recalculation when the container size changes, but this is well-optimized.",
            codingExamples:
            ":root { font-size: 16px; }\n\n.card {\n  width: min(90%, 400px);\n  padding: 1.5rem;\n  font-size: clamp(1rem, 2.5vw, 1.5rem);\n}\n\n/* Visual: nested em compounding */\n/* div { font-size: 1.5em; } -> 1.5x parent */\n/*   div { font-size: 1.5em; } -> 1.5x of 1.5em = 2.25x root */",
          },
          quiz: [
            {"id": "css-units-1", "question": "What does the CSS unit 'rem' stand for and what is it relative to?", "options": ["Root em - relative to the <html> element's font-size", "Relative em - relative to parent font-size", "Regular em - relative to body font-size", "Responsive em - relative to viewport size"], "correctIndex": 0, "explanation": "rem (root em) is always relative to the root element's (<html>) font-size, not the parent.", "difficulty": "easy"},
            {"id": "css-units-2", "question": "What problem can occur when using em for font-size in deeply nested elements?", "options": ["Compounding effect - each nested level multiplies the size", "em cannot be used for font-size property", "em only works on width and height", "It causes an infinite loop in CSS parsing"], "correctIndex": 0, "explanation": "em compounds: if a parent has font-size: 1.5em (relative to its parent), a child with font-size: 1.5em becomes 2.25x the root size.", "difficulty": "medium"},
            {"id": "css-units-3", "question": "What does the CSS clamp() function do and why is it useful for responsive typography?", "options": ["Clamps a value between a minimum and maximum range based on a preferred value", "Clamps elements to stay within the viewport", "Removes whitespace around elements", "Fixes aspect ratio of elements"], "correctIndex": 0, "explanation": "clamp(MIN, VAL, MAX) ensures a value stays between MIN and MAX, with VAL as the preferred value. It's perfect for fluid typography that scales with viewport but has limits.", "difficulty": "medium"},
          ],
          faangQuestions: [
            {"question": "Explain the difference between viewport units (vw/vh), dynamic viewport units (dvw/dvh), small viewport units (svw/svh), and large viewport units (lvw/lvh). When would you use each?", "answer": "Standard vw/vh use the initial containing block (viewport size). dvw/dvh use the dynamic viewport, which accounts for mobile browser toolbars expanding and collapsing in real time. svw/svh use the smallest possible viewport (toolbars expanded). lvw/lvh use the largest possible viewport (toolbars retracted). Use dvh for mobile layouts to prevent layout jumps when toolbars appear/disappear. Use svh for elements that must always fit on screen. Use lvh for desktop-optimized designs.", "difficulty": "expert", "company": "Apple"},
            {"question": "How do container query units (cqw, cqh, cqi, cqb) differ from viewport units? Implement a component that uses them.", "answer": "Container query units are relative to the nearest container's size (defined with container-type or container properties), not the viewport. cqw = 1% of container width, cqh = 1% of container height, cqi = 1% of container inline size, cqb = 1% of container block size. Use case: a card component that sizes its font relative to the available container space, making it responsive regardless of where it's placed.", "difficulty": "hard", "company": "Microsoft"},
          ],
          codingChallenges: [
            {"title": "Responsive Type Scale Generator", "description": "Create a tool that generates a responsive type scale using clamp() and rem units. Take a base size (e.g., 16px) and scale ratio (e.g., 1.25) as inputs, then generate h1-h6 and body styles with fluid sizing.", "difficulty": "medium", "solutionHint": "Use clamp(minSize, preferredSize + viewportUnits, maxSize). Generate each heading level by multiplying base by ratio^level. Use viewport units as the preferred value for fluid scaling."},
          ],
        },
        {
          slug: "box-model",
          title: "Box Model",
          order: 4,
          content: {
            overview:
            "The CSS box model is the foundation of every element on a web page. Every element is a rectangular box consisting of: content, padding, border, and margin. Understanding how these layers interact and how box-sizing affects dimensions is essential for building reliable layouts.",
            problemStatement:
            "Without understanding the box model, adding padding or border to an element unexpectedly changes its total width, breaking layouts and causing horizontal scrollbars on pages.",
            intuitionFirst:
            "Imagine an element as a framed picture hanging on a wall. The actual picture is the content. The mat board around it is the padding. The picture frame is the border. The space between this frame and neighboring frames on the wall is the margin.",
            realLifeAnalogy:
            "The box model is like shipping a gift: the item itself is the content. The bubble wrap is the padding (inside the box, protecting the item). The cardboard box is the border (the visible boundary). The empty space between this box and other boxes in the truck is the margin (outside the box).",
            visualExplanation:
            "  +-- Margin (transparent) --------------------+\n  |  +-- Border (visible) ----------------+    |\n  |  |  +-- Padding (background) ------+  |    |\n  |  |  |   Content                   |  |    |\n  |  |  |   [text / image]            |  |    |\n  |  |  +------------------------------+  |    |\n  |  +-----------------------------------+    |\n  +-------------------------------------------+",
            howItWorks:
            "The browser renders each element as a rectangular box. With box-sizing: content-box (default), the width property only sets the content width. Total width = width + padding-left + padding-right + border-left + border-right. With box-sizing: border-box, width includes content + padding + border. Margin is always outside and never included in the computed width - it creates space between elements and can collapse vertically between adjacent block elements.",
            beginnerExample:
            ".box {\n  width: 200px;\n  padding: 20px;\n  border: 5px solid black;\n  margin: 10px;\n  background: lightblue;\n}\n\n/* Content-box (default): */\n/* Total width = 200 + 20*2 + 5*2 = 250px */\n\n/* Same box with border-box: */\n.box {\n  box-sizing: border-box;\n  /* Total width = 200px (content shrinks to 150px) */\n}\n\n/* Margin collapsing */\nh1 { margin-bottom: 30px; }\nh2 { margin-top: 20px; }\n/* Vertical gap between h1 and h2 = 30px, NOT 50px */",
            commonMistakes:
            "Not setting box-sizing: border-box globally, forgetting that outline does not take up space (it overlays), assuming padding and border add to the set width (they do with content-box but not with border-box), confusing margin with padding (margin is outside the border, padding is inside).",
            bestPractices:
            "Set box-sizing: border-box on all elements (*, *::before, *::after { box-sizing: border-box; }). Use margin for spacing between elements, use padding for spacing inside elements. Be aware of margin collapsing. Avoid negative margins when possible.",
            performanceNotes:
            "The box model calculation is fundamental and has negligible performance impact. Changing box-sizing on an element triggers a layout recalculation, but this is a one-time cost per element change.",
            codingExamples:
            "*, *::before, *::after {\n  box-sizing: border-box;\n}\n\n.card {\n  width: 300px;\n  padding: 1.5rem;\n  border: 2px solid #333;\n  margin: 1rem;\n}\n\n/* Prevent margin collapse between children */\n.container { display: flow-root; }",
          },
          quiz: [
            {"id": "css-boxmodel-1", "question": "What is the total width of an element with width: 100px, padding: 10px, border: 5px solid, using the default box-sizing (content-box)?", "options": ["130px", "100px", "120px", "115px"], "correctIndex": 0, "explanation": "Total width = 100 (content) + 10*2 (padding left+right) + 5*2 (border left+right) = 130px.", "difficulty": "easy"},
            {"id": "css-boxmodel-2", "question": "What is the key difference between margin and padding in the CSS box model?", "options": ["Margin is outside the border (transparent gap), padding is inside the border (shows element background)", "Padding is outside the border, margin is inside the border", "They are the same thing with different defaults", "Margin adds to border width, padding adds to content size"], "correctIndex": 0, "explanation": "Margin creates transparent space outside the border between elements. Padding creates space inside the border between the content and the border, and shows the element's background color.", "difficulty": "medium"},
            {"id": "css-boxmodel-3", "question": "What is margin collapsing in CSS? When does it occur?", "options": ["Vertical margins of adjacent block elements collapse into the larger of the two margins", "Margins disappear entirely when elements are next to each other", "Vertical and horizontal margins both collapse", "Margins add together between sibling elements"], "correctIndex": 0, "explanation": "Vertical margins of adjacent block-level elements collapse: the margin between them equals the larger of the two, not their sum. Horizontal margins never collapse.", "difficulty": "hard"},
          ],
          faangQuestions: [
            {"question": "Explain margin collapsing in CSS in detail. List all specific cases where margins collapse and how negative margins interact.", "answer": "Margins collapse in three cases: 1) Adjacent siblings - the bottom margin of the top element and top margin of the bottom element collapse. 2) Parent and first/last child - when no border, padding, or inline content separates them, the parent's margin collapses with the child's. 3) Empty blocks - all margins of an empty block collapse. The resulting margin equals the max of the positive margins minus the sum of absolute values of negative margins. Only vertical margins collapse (block direction).", "difficulty": "hard", "company": "Google"},
            {"question": "How does the CSS box-model interact with scrollable overflow? Which parts of the box are included in the scrollable area?", "answer": "The scrollable overflow area includes the content area and padding. Borders and margins are outside the scroll area - they remain visible and fixed while content scrolls. This means scrollbars cover content and padding but never borders or margins, ensuring the visual border always stays intact.", "difficulty": "expert", "company": "Microsoft"},
          ],
          codingChallenges: [
            {"title": "Box Model Visualizer", "description": "Build an interactive visualization of the CSS box model. Use sliders to adjust width, padding, border-width, and margin. Show each layer with distinct colors (content=blue, padding=green, border=yellow, margin=transparent) and display computed total dimensions.", "difficulty": "medium", "solutionHint": "Use nested divs for each layer. The innermost div is content. Wrap with padding div (background color shows), then border div (with actual border), then margin div (transparent, use outline or box-shadow for visualization). Display formulas."},
          ],
        },
        {
          slug: "display-positioning",
          title: "Display and Positioning",
          order: 5,
          content: {
            overview:
            "The display and position properties control how elements are laid out on the page. Display determines whether an element is block, inline, inline-block, or participates in a layout context like flex or grid. Position determines how elements are placed relative to their normal position, their parent, or the viewport.",
            problemStatement:
            "By default, all elements follow normal document flow (block elements stack vertically, inline elements flow horizontally). To create complex layouts, overlapping elements, fixed headers, or side-by-side content, you must override these defaults.",
            intuitionFirst:
            "Think of the document flow like water flowing down a river. Block elements are like large barges taking the full width. Inline elements are like small boats that can fit side by side. Changing position is like pulling a boat out of the water and placing it anywhere you want - on the riverbank, in the air, or even glued to your glasses.",
            realLifeAnalogy:
            "Display types are like furniture arrangements: block = a large sofa that takes up a whole wall. Inline = a small chair that can share space with other chairs. inline-block = a narrow table that can sit between chairs but still has a defined shape. Position values: static = normal placement. relative = shifted but still reserving its original space. absolute = removed from the room entirely and placed freely. fixed = glued to your field of view. sticky = starts like normal furniture but sticks to you when you move past it.",
            visualExplanation:
            "  Display Modes\n  +-- Block ------------------------+\n  |  Takes full available width     |\n  |  New line before and after      |\n  +--------------------------------+\n  +-- Inline ---+  +-- Inline ----+\n  | Fits within |  | text flow    |\n  | line        |  | same line    |\n  +-------------+  +-------------+\n  +-- Inline-Block ----------------+\n  | Inline flow, block-like box   |\n  | Can set width and height      |\n  +-------------------------------+",
            howItWorks:
            "The browser performs layout by determining geometric properties of each element. display:block creates a block formatting context (BFC) - the element takes full available width and starts on a new line. display:inline flows content horizontally within a line box, ignoring width/height. display:inline-block flows inline but respects width/height. position:relative offsets from the element's normal position using top/right/bottom/left. position:absolute removes the element from normal flow and positions relative to the nearest positioned ancestor. position:fixed positions relative to the viewport. position:sticky toggles between relative and fixed based on scroll position.",
            beginnerExample:
            "/* Display values */\n.block { display: block; }      /* full width, new line */\n.inline { display: inline; }    /* flows in text */\n.inline-block { display: inline-block; }  /* inline but with box */\n.none { display: none; }        /* removed from layout */\n\n/* Position values */\n.relative { position: relative; top: 10px; left: 10px; }\n.absolute { position: absolute; top: 0; right: 0; }\n.fixed { position: fixed; bottom: 0; width: 100%; }\n.sticky { position: sticky; top: 0; }\n\n/* Z-index stacking */\n.modal { position: absolute; z-index: 100; }",
            commonMistakes:
            "Using absolute positioning when flexbox or grid would be more appropriate, forgetting to set position:relative on the parent when using absolute children, using z-index without setting a position value (z-index only works on positioned elements), hiding elements with display:none when visibility:hidden is semantically correct.",
            bestPractices:
            "Use flexbox/grid for 1D/2D layouts instead of absolute positioning in most cases. Use position:relative sparingly (mostly as a positioning context for absolute children). Use position:fixed and sticky only for UI chrome (headers, modals, tooltips). Keep z-index values organized with a system (e.g., increments of 10 or 100).",
            performanceNotes:
            "position:fixed and position:sticky can create new containing blocks and stacking contexts. Overusing position:absolute can complicate accessibility (visual order may not match DOM order). display:none elements are not rendered at all; visibility:hidden elements are rendered but invisible (they still take up layout space).",
            codingExamples:
            "/* Creating a stacking context */\n.header {\n  position: relative;\n  z-index: 10;\n}\n\n/* Fixed sidebar */\n.sidebar {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 250px;\n  height: 100vh;\n}\n\n/* Sticky section headers */\n.section-title {\n  position: sticky;\n  top: 0;\n  background: white;\n  z-index: 1;\n}",
          },
          quiz: [
            {"id": "css-display-1", "question": "What is the difference between display:none and visibility:hidden?", "options": ["display:none removes element from layout entirely; visibility:hidden hides it visually but preserves its layout space", "visibility:hidden removes from layout; display:none hides but keeps space", "They are identical in behavior", "display:none is for accessibility, visibility:hidden is for visual only"], "correctIndex": 0, "explanation": "display:none removes the element from the document flow entirely (not rendered). visibility:hidden hides it visually but preserves its layout space (still occupies space in the flow).", "difficulty": "easy"},
            {"id": "css-display-2", "question": "What does position:absolute position an element relative to?", "options": ["The nearest ancestor with a position value other than static", "The viewport", "The document root element (<html>)", "The direct parent element always"], "correctIndex": 0, "explanation": "Absolute positioning is relative to the nearest ancestor that has a position value of relative, absolute, fixed, or sticky. If none exists, it's relative to the initial containing block (<html>).", "difficulty": "medium"},
            {"id": "css-display-3", "question": "How does position:sticky behave differently from position:fixed?", "options": ["Sticky toggles between relative and fixed based on scroll position; fixed is always viewport-relative", "Sticky is always relative to the parent; fixed is viewport-relative", "They behave identically", "Fixed requires JavaScript to work; sticky is pure CSS"], "correctIndex": 0, "explanation": "Sticky acts as relative positioning normally, but switches to fixed positioning when the element reaches a defined scroll threshold (top, bottom, etc.).", "difficulty": "hard"},
          ],
          faangQuestions: [
            {"question": "What is a stacking context in CSS? List all properties that can create a new stacking context.", "answer": "A stacking context is a conceptual layer that groups elements with a common z-axis ordering. It is created by: position with z-index value (not auto), opacity < 1, transform (not none), filter (not none), perspective (not none), clip-path (not none), mask / mask-image (not none), mix-blend-mode (not normal), isolation: isolate, will-change with any of the above, contain: paint/style/layout, and -webkit-overflow-scrolling: touch. Each stacking context is independent - elements inside cannot interleave with elements outside.", "difficulty": "hard", "company": "Google"},
            {"question": "Explain the differences between block formatting context (BFC), inline formatting context (IFC), and flex formatting context. When does each apply?", "answer": "BFC: block-level boxes stacked vertically, margins collapse, floats are contained. Created by overflow:hidden, display:flow-root, float, etc. IFC: inline boxes flow horizontally, wrapping to multiple lines, text-align and vertical-align apply. Created by display:inline(-block). Flex formatting context: flex items arranged in main/cross axis direction, no margin collapsing, alignment properties. Each formatting context has its own layout rules and isolates its children from external layout influences.", "difficulty": "expert", "company": "Meta"},
          ],
          codingChallenges: [
            {"title": "Build a Sticky Notes Dashboard", "description": "Create a dashboard page with: a fixed header at the top, sticky section headers that remain visible while scrolling through content, a modal overlay with absolute positioning, and inline-block cards arranged in a grid. Demonstrate understanding of all positioning types.", "difficulty": "hard", "solutionHint": "Use position:fixed for main header, position:sticky for section titles (with top: 0), position:absolute with z-index:100 for the modal, and display:inline-block or flex for the card grid."},
          ],
        },
      ],
    },
    {
      slug: "flexbox",
      title: "Flexbox",
      description:
        "Master CSS Flexbox - from flex containers and items to alignment, wrapping, and building complex one-dimensional layouts",
      order: 2,
      subtopics: [
        {
          slug: "flex-container",
          title: "Flex Container",
          order: 1,
          content: {
            overview:
            "The flex container is the parent element that enables the flexbox layout context. By setting display: flex or display: inline-flex on an element, its children become flex items that can be arranged along a main axis and cross axis.",
            problemStatement:
            "Before flexbox, creating centered layouts, equal-height columns, or distributing space evenly required hacks with floats, tables, or JavaScript calculations.",
            intuitionFirst:
            "Think of a flex container like a luggage rack on a train. The rack is the container, the suitcases are the items. You can control how items are placed along the rack (main axis), how they align (cross axis), and what happens when there are too many items (wrapping).",
            realLifeAnalogy:
            "A flex container is like a flexible bookshelf. The shelf (container) can decide whether books (items) are arranged left-to-right or top-to-bottom. It can space them evenly, pack them at one end, or spread them out. If books don't fit on one shelf, they can wrap to the next.",
            visualExplanation:
            "  Flex Container (display: flex)\n  +-- Main Axis (flex-direction: row) -->\n  | +------+ +------+ +------+\n  | |item1 | |item2 | |item3 |\n  | +------+ +------+ +------+\n  | ^                       ^\n  | Cross Axis              |\n  | (align-items)           |\n  +--------------------------+",
            howItWorks:
            "When display: flex is set, the element establishes a flex formatting context. Its children become flex items. The main axis direction is defined by flex-direction (row, row-reverse, column, column-reverse). The cross axis is perpendicular. The browser distributes space along these axes based on container properties (justify-content, align-items, flex-wrap) and item properties (flex-grow, flex-shrink, flex-basis, align-self).",
            beginnerExample:
            ".container {\n  display: flex;\n  justify-content: center;  /* center along main axis */\n  align-items: center;      /* center along cross axis */\n  height: 200px;\n}\n\n.item { width: 100px; height: 100px; }\n\n/* Result: items are perfectly centered both horizontally and vertically */",
            commonMistakes:
            "Forgetting that flex only applies to direct children (not grandchildren), using height: 100% without setting parent height, expecting flex to work like grid for 2D layouts.",
            bestPractices:
            "Set gap for spacing (instead of margins on items), use min-height: 0 to prevent overflow, be explicit about flex-direction rather than relying on default (row).",
            performanceNotes:
            "Flexbox layout calculations are highly optimized in modern browsers. Flexbox performs well even with hundreds of items.",
          },
          quiz: [
            {"id": "css-flex-1", "question": "What display value enables flexbox layout on a container?", "options": ["display: flex", "display: block", "display: inline", "display: flexbox"], "correctIndex": 0, "explanation": "display: flex creates a block-level flex container. display: inline-flex creates an inline-level flex container.", "difficulty": "easy"},
            {"id": "css-flex-2", "question": "What is the difference between justify-content and align-items in flexbox?", "options": ["justify-content aligns along main axis, align-items along cross axis", "justify-content aligns along cross axis, align-items along main axis", "They are aliases for the same property", "justify-content is for rows, align-items is for columns"], "correctIndex": 0, "explanation": "justify-content controls distribution along the main axis (defined by flex-direction). align-items controls alignment along the cross axis.", "difficulty": "medium"},
            {"id": "css-flex-3", "question": "What does flex-wrap: wrap do in a flex container?", "options": ["Allows items to wrap to multiple lines when they exceed container width", "Wraps text within flex items", "Wraps the container itself", "Prevents items from wrapping"], "correctIndex": 0, "explanation": "flex-wrap: wrap allows flex items to wrap onto multiple lines when their total size exceeds the container's main axis size.", "difficulty": "medium"},
          ],
          faangQuestions: [
            {"question": "Explain the difference between align-items, align-self, and align-content in flexbox. When does each apply?", "answer": "align-items sets default cross-axis alignment for all flex items. align-self overrides alignment for individual items. align-content controls spacing between wrapped flex lines (only works when flex-wrap is wrap and there are multiple lines).", "difficulty": "hard", "company": "Google"},
            {"question": "How does the flex property work with its three values (flex-grow, flex-shrink, flex-basis)? What does flex: 1 mean?", "answer": "flex: 1 is shorthand for flex-grow: 1, flex-shrink: 1, flex-basis: 0%. It means the item can grow to fill available space (1 share), shrink if needed (1 share), and starts from 0 basis (even distribution).", "difficulty": "hard", "company": "Meta"},
          ],
          codingChallenges: [
            {"title": "Build a Responsive Card Layout with Flexbox", "description": "Create a responsive card grid using flexbox. Cards should be side by side on desktop and stack vertically on mobile. Use flex-wrap, gap, and media queries. Each card has an image, title, and description.", "difficulty": "medium", "solutionHint": "Use display: flex with flex-wrap: wrap on container. Set flex: 1 1 300px on cards for responsive sizing. Use media query to change flex-direction or adjust flex-basis."},
          ],
        },
        {
          slug: "flex-items",
          title: "Flex Items",
          order: 2,
          content: {
            overview:
            "Flex items have their own properties that control how they grow, shrink, and align within the flex container. Understanding flex-grow, flex-shrink, flex-basis, align-self, and order gives you fine-grained control over individual item behavior.",
            problemStatement:
            "Even with a flex container, items may distribute space unevenly or not as intended. Item-level properties solve specific sizing and alignment needs for individual elements.",
            intuitionFirst:
            "Think of flex items as passengers on a train. flex-grow determines who gets more legroom when there's extra space. flex-shrink determines who has to squeeze when space is tight. flex-basis is like each passenger's default seat size.",
            realLifeAnalogy:
            "Flex item properties are like restaurant table arrangements: flex-grow = who gets extra bread when the basket is full. flex-shrink = who has to share when the bread runs out. order = who gets served first. align-self = the one person sitting sideways at the table.",
            howItWorks:
            "flex-basis sets the initial main size before space distribution. It can be a length or percentage (default: auto, meaning use item's width/height). After all items' flex-basis values are subtracted from the container size, any remaining (or deficit) space is distributed according to flex-grow (positive space) and flex-shrink (negative space) ratios.",
            beginnerExample:
            ".item {\n  flex-grow: 1;    /* can grow to fill space */\n  flex-shrink: 1;  /* can shrink if needed */\n  flex-basis: 0;   /* start from 0 for even distribution */\n}\n\n/* Shorthand: flex: 1 1 0; */\n\n/* Specific sizing */\n.logo { flex: 0 0 auto; }  /* never grow or shrink */\n.main { flex: 2; }          /* take 2x space of others */\n.sidebar { flex: 1; }      /* take 1x space */\n\n/* Reorder */\n.item:last-child { order: -1; }  /* move to front */",
            commonMistakes:
            "Using order without considering accessibility (visual order != tab order), forgetting that order only affects visual rendering, setting both flex-grow: 1 and width: 100% which conflicts.",
            bestPractices:
            "Use the flex shorthand rather than individual properties, use min-width on flex items to prevent them from shrinking below usable size, avoid using order for meaningful content reordering.",
          },
          quiz: [
            {"id": "css-flexitems-1", "question": "What does flex-basis: 0 do in the flex shorthand?", "options": ["Sets the initial size to 0, allowing equal distribution based on grow/shrink factors", "Makes the item invisible initially", "Sets the item to auto-size based on content", "Prevents the item from growing"], "correctIndex": 0, "explanation": "flex-basis: 0 sets the initial main size to 0, so flex-grow factors determine the distribution of all available space equally.", "difficulty": "hard"},
            {"id": "css-flexitems-2", "question": "What does align-self: stretch do to a flex item?", "options": ["Stretches the item to fill the cross axis size of the container", "Stretches the item to fill the main axis size", "Stretches the content inside the item", "Has no effect on flex items"], "correctIndex": 0, "explanation": "align-self: stretch overrides the container's align-items value for a single item, stretching it to fill the cross axis.", "difficulty": "medium"},
            {"id": "css-flexitems-3", "question": "What is the risk of using the order property for visual reordering?", "options": ["Visual order may not match DOM order, causing accessibility issues for keyboard/screen reader users", "It can cause infinite layout recalculations", "It only works in Chrome", "It requires JavaScript to function"], "correctIndex": 0, "explanation": "order only changes visual rendering, not the DOM/tab order. This can create a confusing experience for keyboard and screen reader users.", "difficulty": "medium"},
          ],
          faangQuestions: [
            {"question": "How does the flex shorthand with three values work? Explain flex: 1, flex: auto, flex: none, and flex: initial.", "answer": "flex: 1 = flex-grow: 1, flex-shrink: 1, flex-basis: 0% (even distribution, can grow/shrink). flex: auto = grow: 1, shrink: 1, basis: auto (based on content size). flex: none = grow: 0, shrink: 0, basis: auto (fixed size). flex: initial = grow: 0, shrink: 1, basis: auto (default).", "difficulty": "hard", "company": "Google"},
            {"question": "How does the auto margin (margin-left: auto) technique work in flexbox? Give a practical example.", "answer": "Auto margins in flexbox absorb available space in the direction they are applied. margin-left: auto pushes all remaining space before the element, effectively right-aligning it. Common use: navigation bar where one link (e.g., \"Sign In\") is pushed to the right side while others are left-aligned.", "difficulty": "medium", "company": "Airbnb"},
          ],
          codingChallenges: [
          ],
        },
        {
          slug: "alignment-spacing",
          title: "Alignment and Spacing",
          order: 3,
          content: {
            overview:
            "Flexbox provides powerful alignment and spacing capabilities: justify-content for main-axis distribution, align-items for single-line cross-axis alignment, align-content for multi-line cross-axis distribution, and the gap property for consistent spacing between items.",
            problemStatement:
            "Creating equal spacing between elements, centering content both ways, or distributing items evenly used to require manual margin calculations or JavaScript.",
            intuitionFirst:
            "Alignment properties are like different ways to arrange books on a shelf: justify-content decides the horizontal spacing (packed at start, centered, spread evenly). align-items decides vertical positioning (top, middle, bottom) within the shelf.",
            realLifeAnalogy:
            "justify-content values: flex-start = people queuing at one door. center = people gathering in the middle. space-between = people equally spaced but not at the edges. space-around = people equally spaced with half-spaces at edges. space-evenly = everyone has the same breathing room.",
            howItWorks:
            "justify-content operates on the main axis and distributes space between items. flex-start/end moves items to the start/end. center moves them to the middle. space-between puts first/last items at edges, equal space between others. space-around puts equal space around each item. space-evenly puts equal space between all items including edges. gap sets fixed spacing between items without affecting outer edges.",
            beginnerExample:
            ".container {\n  display: flex;\n  gap: 16px;                /* 16px between items */\n  justify-content: center;  /* center group of items */\n  align-items: center;      /* center items vertically */\n}\n\n/* Common patterns */\n.nav { justify-content: space-between; }  /* logo left, links right */\n.hero { align-items: center; }            /* vertically center */\n.grid { flex-wrap: wrap; gap: 24px; }     /* responsive grid */",
            commonMistakes:
            "Using gap when items need different spacing, using justify-content when flex-direction changes the main axis (forgetting that flex-direction: column swaps the axes), setting fixed heights on flex items that should grow.",
            bestPractices:
            "Use gap for consistent spacing instead of margins on child items, be explicit about align-items default (stretch creates equal-height columns), test alignment with different content lengths.",
          },
          quiz: [
            {"id": "css-align-1", "question": "What is the difference between space-between and space-evenly in justify-content?", "options": ["space-between puts first/last items at edges; space-evenly has equal space around all items", "space-between has equal space around all items; space-evenly puts items at edges", "They are identical", "space-between only works with flex-wrap"], "correctIndex": 0, "explanation": "space-between places first and last items flush with container edges. space-evenly distributes equal space between all items including edges.", "difficulty": "medium"},
            {"id": "css-align-2", "question": "When does align-content take effect in a flex container?", "options": ["Only when flex-wrap is set and there are multiple lines", "Always, regardless of wrapping", "Only on the main axis", "Only when align-items is also set"], "correctIndex": 0, "explanation": "align-content only affects multi-line flex containers (flex-wrap: wrap or wrap-reverse) and controls distribution of space between lines.", "difficulty": "hard"},
            {"id": "css-align-3", "question": "What does the gap property in flexbox do?", "options": ["Sets fixed spacing between flex items without affecting outer edges", "Sets the margin around each flex item", "Sets the padding inside each flex item", "Sets the minimum distance between flex lines"], "correctIndex": 0, "explanation": "gap sets consistent spacing between flex items only (not between items and container edges).", "difficulty": "easy"},
          ],
          faangQuestions: [
            {"question": "Compare and contrast the gap property in flexbox vs grid vs multi-column layout.", "answer": "In all three, gap sets spacing between items/cells/columns without affecting outer edges. Flexbox gap works on the main axis (and cross axis with row-gap/column-gap). Grid gap applies to both row and column tracks. Multi-column layout uses column-gap between columns. The behavior is consistent - it creates a gutter without affecting outer margins.", "difficulty": "medium", "company": "Microsoft"},
            {"question": "How would you create a perfectly centered modal using flexbox? What edge cases must you consider?", "answer": "Container: display: flex, justify-content: center, align-items: center, min-height: 100vh. Modal: max-width, max-height with overflow: auto for content overflow. Edge cases: viewport height changes (mobile toolbar), content overflow (scroll), small screens (full-width modal).", "difficulty": "hard", "company": "Amazon"},
          ],
          codingChallenges: [
          ],
        },
      ],
    },
    {
      slug: "grid",
      title: "CSS Grid",
      description:
        "Master two-dimensional layouts with CSS Grid - explicit and implicit grids, template areas, responsive patterns, and alignment",
      order: 3,
      subtopics: [
        {
          slug: "grid-container",
          title: "Grid Container",
          order: 1,
          content: {
            overview:
            "CSS Grid Layout is a two-dimensional layout system that allows you to create complex, responsive layouts by dividing a page into rows and columns simultaneously. Unlike flexbox which is one-dimensional, grid excels at controlling both axes at once.",
            problemStatement:
            "Building complex 2D layouts (magazine-style pages, dashboards, gallery grids) required nested flexbox, float hacks, or complex JavaScript calculations before CSS Grid.",
            intuitionFirst:
            "Think of CSS Grid as a spreadsheet. You define rows and columns (like Excel), then place items into specific cells. Items can span multiple rows or columns (like merging cells in Excel). Unlike flexbox which is a single row or column, grid is a complete table of cells.",
            realLifeAnalogy:
            "CSS Grid is like a city planner's grid of streets and avenues. The columns are north-south avenues, the rows are east-west streets. Each block (cell) can contain a building. Buildings can span multiple blocks, just like grid items can span multiple tracks.",
            visualExplanation:
            "  Grid Layout\n  +-------+-------+-------+\n  | 1     | 2     | 3     |  <- Row 1\n  +-------+-------+-------+\n  | 4     | 5     | 6     |  <- Row 2\n  +-------+-------+-------+\n  | 7     | 8     | 9     |  <- Row 3\n  |       | span 2|       |\n  +-------+-------+-------+\n  ^Col 1   ^Col 2   ^Col 3",
            howItWorks:
            "A grid container is created with display: grid or display: inline-grid. Grid lines are numbered starting from 1. Grid tracks (columns and rows) are defined by grid-template-columns and grid-template-rows. Items are placed using grid-column and grid-row properties (span notation for multiple tracks). The grid creates an implicit grid for items beyond the explicitly defined tracks.",
            beginnerExample:
            ".container {\n  display: grid;\n  grid-template-columns: 1fr 2fr 1fr;  /* 3 columns */\n  grid-template-rows: auto 1fr auto;    /* 3 rows */\n  gap: 16px;\n}\n\n.header { grid-column: 1 / -1; }  /* span full width */\n.main { grid-column: 2; }        /* middle column */\n.sidebar { grid-column: 1; }     /* left column */\n.footer { grid-column: 1 / -1; } /* span full width */",
            commonMistakes:
            "Forgetting that grid creates a fixed number of columns regardless of content count (unlike flexbox), using fr units without understanding they distribute remaining space after fixed tracks, not setting a height on the grid container when using fr rows.",
            bestPractices:
            "Use minmax() for responsive track sizing, use the gap property instead of margins, use grid-auto-rows for consistent implicit row sizes, prefer grid-template-areas for complex layouts.",
          },
          quiz: [
            {"id": "css-grid-1", "question": "What does the fr unit represent in CSS Grid?", "options": ["A fraction of the available space in the grid container", "A fixed pixel value", "A viewport-relative unit", "A percentage of the parent width"], "correctIndex": 0, "explanation": "fr (fraction) distributes available space proportionally. 1fr = 1 share of remaining space after fixed-size tracks are allocated.", "difficulty": "easy"},
            {"id": "css-grid-2", "question": "How do you make a grid item span multiple columns?", "options": ["Using grid-column: span 2 or grid-column: 1 / 3", "Using width: 200%", "Using flex-grow: 2", "Using colspan: 2 attribute"], "correctIndex": 0, "explanation": "grid-column: span 2 makes an item span 2 columns. grid-column: 1 / 3 places it from line 1 to line 3 (spanning 2 columns).", "difficulty": "medium"},
            {"id": "css-grid-3", "question": "What is the difference between grid lines and grid tracks?", "options": ["Lines are the numbered dividers between tracks; tracks are the rows/columns themselves", "Lines are horizontal only; tracks can be both horizontal and vertical", "They are the same thing", "Tracks are defined first, then lines are created automatically"], "correctIndex": 0, "explanation": "Grid lines (numbered 1, 2, 3...) are the dividers between grid tracks. Grid tracks are the rows and columns created by grid-template-columns/rows.", "difficulty": "medium"},
          ],
          faangQuestions: [
            {"question": "Explain the difference between explicit and implicit grid. How does grid-auto-rows and grid-auto-columns control implicit tracks?", "answer": "Explicit grid is defined by grid-template-columns and grid-template-rows. Implicit grid is created for items placed outside the explicit grid. grid-auto-rows and grid-auto-columns set the size of these automatically-created tracks. grid-auto-flow controls how auto-placed items are filled into the grid.", "difficulty": "hard", "company": "Google"},
            {"question": "How does subgrid (display: subgrid) work and when would you use it?", "answer": "subgrid allows a grid item to inherit the grid tracks of its parent grid container. This enables alignment across nested grids. Use cases: aligning form labels across cards in a grid, keeping tabular data aligned within nested sections.", "difficulty": "expert", "company": "Stripe"},
          ],
          codingChallenges: [
            {"title": "Build a Magazine-Style Layout with CSS Grid", "description": "Create a magazine-style page layout using CSS Grid. Include a full-width header, a featured article spanning 2 columns, a sidebar, a multi-column gallery section, and a footer. Use grid-template-areas for semantic naming.", "difficulty": "hard", "solutionHint": "Use grid-template-areas for layout: 'header header header' 'featured featured sidebar' 'gallery gallery gallery' 'footer footer footer'. Use media queries to stack on mobile."},
          ],
        },
        {
          slug: "grid-template-areas",
          title: "Grid Template Areas",
          order: 2,
          content: {
            overview:
            "grid-template-areas provides a visual, ASCII-art-like way to define grid layouts. You name grid areas using the grid-area property on items, then arrange them as a visual grid using named strings. This makes layout structure immediately readable.",
            problemStatement:
            "Without grid-template-areas, item placement requires counting grid lines and writing grid-column/grid-row numbers, which can be error-prone and hard to visualize.",
            intuitionFirst:
            "grid-template-areas is like a seating chart for a wedding. Each named area (like a person's name) is placed in a specific position in the grid, creating a visual map of where everything goes.",
            realLifeAnalogy:
            "Grid template areas are like drawing a floorplan on graph paper. You label each room (kitchen, living room, bedroom) and your labels create a visual map. The browser uses this map to know exactly where each element should be placed.",
            howItWorks:
            "Each grid item gets a grid-area name. The grid container uses grid-template-areas with strings of names. Each string represents one row. Each name within a string represents a column. Names can repeat to span multiple columns. A period (.) creates an empty cell.",
            beginnerExample:
            ".container {\n  display: grid;\n  grid-template-areas:\n    \"header  header  header\"\n    \"sidebar content content\"\n    \"sidebar content content\"\n    \"footer  footer  footer\";\n  grid-template-columns: 200px 1fr 1fr;\n  grid-template-rows: auto 1fr 1fr auto;\n  gap: 16px;\n}\n\n.header { grid-area: header; }\n.sidebar { grid-area: sidebar; }\n.content { grid-area: content; }\n.footer { grid-area: footer; }",
            commonMistakes:
            "Creating non-rectangular areas (each area must be a continuous rectangle), mismatching area name counts between rows, misspelling area names (CSS silently ignores mismatches).",
            bestPractices:
            "Use descriptive area names (header, sidebar, main, footer), keep the ASCII-art aligned, use periods for empty cells.",
          },
          quiz: [
            {"id": "css-gridareas-1", "question": "What character represents an empty cell in grid-template-areas?", "options": [". (period)", "_ (underscore)", "null", "0"], "correctIndex": 0, "explanation": "A period (.) in grid-template-areas creates an empty/unused cell in the grid.", "difficulty": "easy"},
            {"id": "css-gridareas-2", "question": "In grid-template-areas, each string creates what?", "options": ["One row", "One column", "One grid cell", "One grid area"], "correctIndex": 0, "explanation": "Each string in grid-template-areas represents one row of the grid. Each name within the string represents a cell in that column position.", "difficulty": "medium"},
            {"id": "css-gridareas-3", "question": "What happens if the grid-area names in template-areas don't match any item's grid-area property?", "options": ["The browser creates an implicit grid area with that name but it has no content", "The CSS is invalid and the property is ignored", "The area is filled with the next available item", "It throws a JavaScript error"], "correctIndex": 0, "explanation": "If a name appears in grid-template-areas but no item has that grid-area, an implicit named grid area is created but remains empty.", "difficulty": "hard"},
          ],
          faangQuestions: [
            {"question": "How would you implement a responsive Holy Grail layout using grid-template-areas with a mobile-first approach?", "answer": "Mobile-first: single column (all areas stacked), then media query for wider screens with multi-column areas. Use grid-area names consistently across breakpoints. Start with 'header', 'main', 'footer' on mobile. Add 'nav' and 'aside' on desktop.", "difficulty": "hard", "company": "Amazon"},
            {"question": "How do grid-template-areas interact with grid-template-columns and grid-template-rows in terms of sizing?", "answer": "grid-template-areas defines the number of rows and columns by its structure. These dimensions must be consistent with grid-template-columns (1 column per area width) and grid-template-rows (1 row per area height). The counts must match or the property is invalid.", "difficulty": "medium", "company": "Google"},
          ],
          codingChallenges: [
          ],
        },
        {
          slug: "auto-fit-fill",
          title: "Auto-fit vs Auto-fill",
          order: 3,
          content: {
            overview:
            "The auto-fit and auto-fill keywords in repeat() create flexible grid track lists that automatically adjust the number of columns/rows based on available space. They work with minmax() to create responsive grids without media queries.",
            problemStatement:
            "Traditional responsive design requires multiple media queries to adjust column counts at different breakpoints. auto-fit/auto-fill with minmax() creates self-adjusting grids.",
            intuitionFirst:
            "auto-fill fills the row with as many tracks as possible (even if empty), maintaining consistent grid structure. auto-fit fits the tracks to the available items, collapsing empty ones.",
            realLifeAnalogy:
            "auto-fill is like having parking spots painted on the street - you paint spots for the maximum number of cars that could fit, even if some are empty. auto-fit is like a flexible parking lot that adjusts the spot sizes based on how many cars actually arrive.",
            howItWorks:
            "repeat(auto-fit, minmax(250px, 1fr)): The browser calculates how many 250px+ tracks fit in the container. auto-fit keeps the tracks after items (expanding empty ones). auto-fill still renders the tracks but leaves them empty (visible as gaps). The difference is visible when there are fewer items than tracks.",
            beginnerExample:
            ".gallery {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 16px;\n}\n\n/* With 3 items in a 900px container: */\n/* minmax(250px, 1fr) -> floor(900/250) = 3 tracks of 300px each */\n/* Works at 400px: 1 track. 700px: 2 tracks. 950px: 3 tracks. */\n\n/* auto-fill comparison */\n.grid-auto-fill {\n  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));\n  /* Empty tracks remain visible */\n}",
            commonMistakes:
            "Confusing auto-fit with auto-fill (wrong one creates unexpected gaps), not accounting for gap in min size calculation, using auto-fit without minmax.",
            bestPractices:
            "Use auto-fit for most responsive grids, use auto-fill when consistent track structure matters, calculate min size as minimum_width + gap.",
          },
          quiz: [
            {"id": "css-autofit-1", "question": "What is the key difference between auto-fit and auto-fill in grid repeat()?", "options": ["auto-fit collapses empty tracks (items expand); auto-fill maintains empty tracks (creating gaps)", "auto-fill collapses empty tracks; auto-fit maintains empty tracks", "They are identical", "auto-fit only works with fixed-size tracks"], "correctIndex": 0, "explanation": "auto-fit collapses empty grid tracks, allowing items to use their space. auto-fill creates all tracks as defined, including empty ones.", "difficulty": "hard"},
            {"id": "css-autofit-2", "question": "What does minmax(250px, 1fr) achieve in a grid definition?", "options": ["Tracks are at least 250px but can grow to fill available space evenly", "Tracks are exactly 250px or 1fr based on content", "Minimum track size is 1fr, maximum is 250px", "It sets the grid gap to 250px"], "correctIndex": 0, "explanation": "minmax(250px, 1fr) creates tracks that are at minimum 250px wide but can grow equally (1fr) to fill remaining space.", "difficulty": "medium"},
            {"id": "css-autofit-3", "question": "How many columns would repeat(auto-fit, minmax(200px, 1fr)) create in a 750px container?", "options": ["3 columns of 250px each", "4 columns of 187.5px each", "3 columns of 200px each with 150px left over", "2 columns of 375px each"], "correctIndex": 0, "explanation": "floor(750/200) = 3 columns. With auto-fit, each gets 250px (750/3), fitting the max range.", "difficulty": "hard"},
          ],
          faangQuestions: [
            {"question": "How would you implement a self-adapting grid that shows 1 column on mobile, 2 on tablet, 3 on desktop, and 4 on wide screens WITHOUT using media queries?", "answer": "Use grid-template-columns: repeat(auto-fit, minmax(MIN, 1fr)) where MIN is adjusted. For different breakpoints: set MIN to different values. Or combine with clamp: minmax(clamp(200px, 25vw, 400px), 1fr). For explicit per-breakpoint control, container queries or the traditional media query approach is clearer.", "difficulty": "hard", "company": "Stripe"},
            {"question": "What are the performance implications of using auto-fit/auto-fill with many grid items? How does it compare to explicit grid definitions?", "answer": "auto-fit/auto-fill requires the browser to calculate the number of tracks on layout, which adds computational overhead proportional to the number of items. For a few hundred items, the performance is similar to explicit grids. For thousands, explicit grids may be faster.", "difficulty": "expert", "company": "Google"},
          ],
          codingChallenges: [
          ],
        },
      ],
    },
    {
      slug: "responsive-design",
      title: "Responsive Design",
      description:
        "Create layouts that adapt to any screen size using media queries, fluid layouts, responsive units, and mobile-first design principles",
      order: 4,
      subtopics: [
        {
          slug: "media-queries",
          title: "Media Queries",
          order: 1,
          content: {
            overview:
            "Media queries are CSS rules that apply styles conditionally based on device characteristics: viewport width, height, orientation, resolution, color capability, and more. They are the cornerstone of responsive web design.",
            problemStatement:
            "Before media queries, websites were either fixed-width (broken on different screens) or used JavaScript to detect screen size and load different stylesheets.",
            intuitionFirst:
            "Media queries are like dress codes that change based on the venue. A restaurant might require formal wear, while a beach bar allows casual. Similarly, your CSS can adapt: large screens get multi-column layouts, small screens get simplified stacked designs.",
            realLifeAnalogy:
            "Media queries are like a shape-shifting building. When a tall person enters (portrait orientation), the ceiling rises. When a wide group enters (landscape), the walls expand. The building automatically adjusts to accommodate different people (devices).",
            howItWorks:
            "The browser evaluates media queries against the current viewport. @media (max-width: 768px) applies when the viewport is 768px or narrower. Multiple conditions can be combined with and, or (comma), and not. Media queries are also available in HTML (media attribute on link/ style) and JavaScript (window.matchMedia).",
            beginnerExample:
            "/* Base: mobile styles (default) */\n.grid { grid-template-columns: 1fr; }\n\n/* Tablet */\n@media (min-width: 768px) {\n  .grid { grid-template-columns: repeat(2, 1fr); }\n}\n\n/* Desktop */\n@media (min-width: 1024px) {\n  .grid { grid-template-columns: repeat(3, 1fr); }\n}\n\n/* Orientation */\n@media (orientation: landscape) {\n  .sidebar { width: 30vw; }\n}\n\n/* Print */\n@media print {\n  .nav { display: none; }\n}",
            commonMistakes:
            "Using both min-width and max-width in conflicting ways, not resetting properties that no longer apply, storing breakpoints inconsistently.",
            bestPractices:
            "Adopt mobile-first approach (min-width queries), use consistent breakpoint values, test on real devices, prefer em/rem for breakpoints.",
          },
          quiz: [
            {"id": "css-mediaq-1", "question": "What is the correct syntax for a media query applying to screens narrower than 768px?", "options": ["@media (max-width: 768px) { ... }", "@media screen and width < 768px { ... }", "@media (width <= 768px) { ... }", "@media max-width(768px) { ... }"], "correctIndex": 0, "explanation": "@media (max-width: 768px) is the standard syntax. Range syntax (width <= 768px) is newer but supported in modern browsers.", "difficulty": "easy"},
            {"id": "css-mediaq-2", "question": "What's the difference between mobile-first and desktop-first media queries?", "options": ["Mobile-first uses min-width (base styles for mobile, add for larger). Desktop-first uses max-width (base for desktop, override for smaller)", "Mobile-first uses max-width; desktop-first uses min-width", "They are the same approach", "Mobile-first requires JavaScript; desktop-first is pure CSS"], "correctIndex": 0, "explanation": "Mobile-first uses min-width breakpoints (add complexity as screen grows). Desktop-first uses max-width breakpoints (remove complexity as screen shrinks).", "difficulty": "medium"},
            {"id": "css-mediaq-3", "question": "What media feature checks if the device is in portrait or landscape orientation?", "options": ["orientation", "aspect-ratio", "device-orientation", "view-orientation"], "correctIndex": 0, "explanation": "@media (orientation: portrait) and @media (orientation: landscape) check the viewport orientation.", "difficulty": "easy"},
          ],
          faangQuestions: [
            {"question": "Compare the responsive images approach using srcset, sizes, and <picture> element. When would you use each?", "answer": "srcset with sizes: different image versions for different screen widths. <picture>: art direction (different crops/aspect ratios for different viewports). Use srcset for resolution/width switching, <picture> for completely different images (e.g., portrait vs landscape crops).", "difficulty": "hard", "company": "Google"},
            {"question": "How do container queries (@container) differ from media queries? When would you use container queries instead of media queries?", "answer": "Container queries respond to a parent container's size, not the viewport. Use container queries for reusable components that must adapt to their placement context (e.g., a sidebar widget that works in both sidebar and main content area). Media queries are for page-level layout breakpoints.", "difficulty": "hard", "company": "Netflix"},
          ],
          codingChallenges: [
            {"title": "Build a Responsive Dashboard with Multiple Breakpoints", "description": "Create a dashboard layout that adapts across mobile (1 column, stacked), tablet (2 columns, collapsed nav), and desktop (3 columns, full sidebar nav). Use mobile-first approach with min-width media queries.", "difficulty": "hard", "solutionHint": "Base: 1 column stacked. @media (min-width: 768px): 2 columns, show collapsed nav. @media (min-width: 1024px): 3 columns with full sidebar. Use CSS Grid or Flexbox."},
          ],
        },
        {
          slug: "fluid-layouts",
          title: "Fluid Layouts",
          order: 2,
          content: {
            overview:
            "Fluid layouts use relative units (%, vw, vh, rem) and functions like min(), max(), clamp(), and calc() to create designs that smoothly adapt to any viewport size without abrupt breakpoints.",
            problemStatement:
            "Media queries create abrupt breakpoints where layouts jump from one state to another. Fluid layouts provide continuous adaptation, eliminating these jumps.",
            intuitionFirst:
            "Fluid layouts are like water filling any container - it smoothly adapts to the shape without sudden changes. Media queries are like a transformer toy that clicks into distinct configurations.",
            realLifeAnalogy:
            "A fluid layout is like a stretchy fabric that fits any body shape. Media queries are like buying different sizes of jeans (S, M, L, XL) - they work but have size jumps between them.",
            howItWorks:
            "Fluid values combine relative sizing with constraint functions. min(100%, 1200px) gives a container that fills small screens but caps at 1200px on large ones. clamp(1rem, 2.5vw, 2rem) creates type that scales smoothly but stays within limits. calc() combines units: calc(100% - 40px).",
            beginnerExample:
            ".container {\n  width: min(100% - 2rem, 1200px);\n  margin-inline: auto;\n}\n\nh1 {\n  font-size: clamp(1.5rem, 4vw + 1rem, 3rem);\n}\n\n.card {\n  width: min(100%, 400px);\n  padding: clamp(1rem, 3vw, 2rem);\n}\n\n.grid {\n  grid-template-columns: repeat(auto-fit, minmax(clamp(200px, 30%, 400px), 1fr));\n}",
            commonMistakes:
            "Using clamp() without considering preferred value may exceed max at certain viewports, applying fluid typography to every element, not testing extreme zoom levels.",
            bestPractices:
            "Combine clamp() with a type scale, use min() for container max-width, use max() for minimum sizes, test at extreme breakpoints.",
          },
          quiz: [
            {"id": "css-fluid-1", "question": "What does min(100%, 1200px) do as a container width?", "options": ["Takes the smaller of 100% of parent or 1200px", "Takes the larger of 100% of parent or 1200px", "Adds 100% and 1200px", "Creates a range between 100% and 1200px"], "correctIndex": 0, "explanation": "min() returns the smallest value. So min(100%, 1200px) means 'fill the parent but never exceed 1200px'.", "difficulty": "medium"},
            {"id": "css-fluid-2", "question": "What is the advantage of using clamp() for responsive typography over media queries?", "options": ["Smooth continuous scaling without breakpoint jumps", "Better browser support", "Simpler to write with fewer lines", "Automatic font loading optimization"], "correctIndex": 0, "explanation": "clamp() provides smooth font-size transition across all viewport sizes, avoiding the abrupt size jumps of media query breakpoints.", "difficulty": "medium"},
            {"id": "css-fluid-3", "question": "What does calc(100% - 40px) achieve in a fluid layout?", "options": ["Fills 100% of parent width minus 40px (accounting for fixed-width elements)", "Calculates 100% of 40px", "Creates a 40px margin on both sides", "Subtracts the element width from 100%"], "correctIndex": 0, "explanation": "calc() allows mixing units. 100% - 40px is useful for full-width elements that need to account for fixed-size siblings or spacing.", "difficulty": "medium"},
          ],
          faangQuestions: [
            {"question": "How would you implement a fluid type scale that scales linearly between viewport breakpoints? Provide the complete approach using clamp().", "answer": "Define base size (e.g., 16px at 320px viewport, 20px at 1200px viewport). Use formula: clamp(16px, SIZE + VIEWPORT_UNIT, 20px). Calculate slope: (20-16)/(1200-320). Preferred value = base + slope * 100vw. Result: clamp(16px, 0.5rem + 1.136vw, 20px). Apply ratio for heading levels.", "difficulty": "hard", "company": "Apple"},
            {"question": "Explain the difference between max-width: 1200px and width: min(100%, 1200px). Are they equivalent? What are edge cases?", "answer": "They are functionally equivalent for basic containers. Both cap at 1200px and fill smaller screens. Edge cases: width: min(100%, 1200px) with margin: auto centers automatically if width is less than 100%. max-width with explicit width: 100% achieves the same. min() is more concise but max-width is more widely supported in older browsers.", "difficulty": "medium", "company": "Shopify"},
          ],
          codingChallenges: [
          ],
        },
        {
          slug: "mobile-first-vs-desktop-first",
          title: "Mobile-first vs Desktop-first",
          order: 3,
          content: {
            overview:
            "Mobile-first design starts with the smallest viewport and adds complexity as space increases (using min-width queries). Desktop-first starts with the largest viewport and removes complexity as space decreases (using max-width queries). Each has tradeoffs.",
            problemStatement:
            "Choosing the wrong approach leads to unnecessarily complex CSS, with excessive overrides and harder-to-maintain stylesheets.",
            intuitionFirst:
            "Mobile-first is like building a house from the foundation up - start simple and add features as you grow. Desktop-first is like starting with a mansion and removing rooms as the lot gets smaller.",
            realLifeAnalogy:
            "Mobile-first: Start with a bicycle (core function), upgrade to a car (add comfort), then to an RV (add luxury). Desktop-first: Start with the RV and remove features until you have a bicycle when space is tight.",
            howItWorks:
            "Mobile-first: Base styles target mobile (single column, stacked layout). @media (min-width: 768px) adds tablet styles. @media (min-width: 1024px) adds desktop styles. Desktop-first: Base targets desktop (multi-column, sidebars). @media (max-width: 1023px) removes sidebar. @media (max-width: 767px) stacks everything.",
            beginnerExample:
            "/* Mobile-First (recommended) */\n/* Mobile base: single column */\n.layout { grid-template-columns: 1fr; }\n\n/* Tablet */\n@media (min-width: 768px) {\n  .layout { grid-template-columns: 200px 1fr; }\n}\n\n/* Desktop */\n@media (min-width: 1024px) {\n  .layout { grid-template-columns: 250px 1fr 200px; }\n}\n\n/* Avoid Desktop-First (leads to more overrides) */\n/* Desktop base */\n.layout { grid-template-columns: 250px 1fr 200px; }\n/* Override for smaller screens */\n@media (max-width: 1023px) {\n  .layout { grid-template-columns: 1fr; }\n}",
            commonMistakes:
            "Writing desktop styles in the base layer (unnecessary overrides), using max-width queries in a mobile-first design, not considering hybrid approaches.",
            bestPractices:
            "Start with smallest viewport and add complexity, use min-width queries exclusively, only use desktop-first for admin dashboards.",
          },
          quiz: [
            {"id": "css-mobilefirst-1", "question": "Which media query approach is generally recommended for new projects?", "options": ["Mobile-first with min-width queries", "Desktop-first with max-width queries", "Both are equally recommended", "Neither - use JavaScript instead"], "correctIndex": 0, "explanation": "Mobile-first (min-width) is recommended because it starts simple and adds complexity, resulting in cleaner CSS with fewer overrides.", "difficulty": "easy"},
            {"id": "css-mobilefirst-2", "question": "What is a key advantage of mobile-first design beyond CSS simplicity?", "options": ["Prioritizes performance and core content for all users", "Loads faster on all devices", "Uses less bandwidth automatically", "Has better SEO out of the box"], "correctIndex": 0, "explanation": "Mobile-first forces prioritization of essential content and performance optimization that benefits all users, not just mobile.", "difficulty": "medium"},
            {"id": "css-mobilefirst-3", "question": "When might desktop-first be a better choice than mobile-first?", "options": ["When the primary audience is desktop users and mobile is secondary (e.g., data dashboards)", "When the site has many images", "When using CSS Grid", "When the client prefers desktop"], "correctIndex": 0, "explanation": "Desktop-first works well when the desktop experience is the priority and mobile is a secondary use case (e.g., enterprise dashboards).", "difficulty": "medium"},
          ],
          faangQuestions: [
            {"question": "How would you implement a responsive navigation that transforms from a horizontal bar (desktop) to a hamburger menu (mobile) using both CSS and minimal JavaScript?", "answer": "CSS: Mobile-first - hide nav links by default, show hamburger. @media (min-width: 768px) - show horizontal nav, hide hamburger. JavaScript: toggle 'open' class on hamburger click to show/hide mobile menu. Use aria-expanded for accessibility.", "difficulty": "hard", "company": "Amazon"},
            {"question": "Discuss the role of progressive enhancement vs graceful degradation in responsive web design.", "answer": "Progressive enhancement (aligned with mobile-first) starts with a baseline experience that works everywhere, then adds layers of enhancement for capable browsers/devices. Graceful degradation (aligned with desktop-first) starts with the full experience and tries to scale back. Progressive enhancement is generally preferred for broader compatibility.", "difficulty": "hard", "company": "Microsoft"},
          ],
          codingChallenges: [
          ],
        },
      ],
    },
    {
      slug: "css-animations",
      title: "CSS Animations",
      description:
        "Bring your designs to life with CSS transitions, transforms, and keyframe animations for performant, engaging user interfaces",
      order: 5,
      subtopics: [
        {
          slug: "transitions",
          title: "Transitions",
          order: 1,
          content: {
            overview:
            "CSS transitions allow property changes to occur smoothly over a duration rather than instantaneously. They provide basic animation for state changes (hover, focus, active, class changes) without JavaScript.",
            problemStatement:
            "Without transitions, interactive elements jump instantly between states, creating jarring user experiences.",
            intuitionFirst:
            "Transitions are like a dimmer switch instead of an on/off light switch. Instead of a light suddenly turning on, it gradually brightens, creating a smooth, pleasant experience.",
            realLifeAnalogy:
            "Transitions are like an elevator instead of stairs. A color change without transition is like instantly teleporting between floors (disorienting). With transition, it's a smooth ride between floors (pleasant and trackable).",
            howItWorks:
            "The transition shorthand combines: transition-property (which properties to animate), transition-duration (how long), transition-timing-function (easing curve: ease, linear, ease-in, ease-out, ease-in-out, cubic-bezier), transition-delay (wait before starting). Not all properties are animatable (display is not, opacity and transform are).",
            beginnerExample:
            ".button {\n  background: blue;\n  color: white;\n  transition: background 0.3s ease, transform 0.2s ease;\n}\n\n.button:hover {\n  background: darkblue;\n  transform: translateY(-2px);\n}\n\n/* Longhand */\n.card {\n  transition-property: box-shadow, transform;\n  transition-duration: 0.3s, 0.2s;\n  transition-timing-function: ease-out;\n}\n\n.card:hover {\n  box-shadow: 0 8px 24px rgba(0,0,0,0.15);\n  transform: scale(1.02);\n}",
            commonMistakes:
            "Using transition: all (performance issues, unintended animations), forgetting transitions only work between explicit states, animating non-performant properties.",
            bestPractices:
            "Animate only transform and opacity, use explicit property names, set appropriate durations (200-300ms), respect prefers-reduced-motion.",
          },
          quiz: [
            {"id": "css-transition-1", "question": "Which CSS properties have better performance when animated with transitions?", "options": ["opacity and transform (GPU-accelerated)", "width and height (CPU-calculated)", "all properties perform equally", "box-shadow and border-radius"], "correctIndex": 0, "explanation": "opacity and transform are composited on the GPU, avoiding layout/recalc triggers. width/height trigger layout recalculations.", "difficulty": "medium"},
            {"id": "css-transition-2", "question": "What does transition: all 0.5s do?", "options": ["Applies a 0.5s transition to all animatable properties", "Applies a 0.5s transition only to the 'all' property", "Is invalid syntax", "Transitions all properties but with 0.5s delay"], "correctIndex": 0, "explanation": "transition: all 0.5s transitions every animatable property with 0.5s duration. It's convenient but can cause unintended animations.", "difficulty": "easy"},
            {"id": "css-transition-3", "question": "What timing function creates a bouncy effect that overshoots and settles?", "options": ["cubic-bezier(0.68, -0.55, 0.27, 1.55)", "ease-in-out", "linear", "steps(5)"], "correctIndex": 0, "explanation": "A cubic-bezier with values outside 0-1 range (like the given one) creates overshoot/elastic effects.", "difficulty": "hard"},
          ],
          faangQuestions: [
            {"question": "Explain the performance implications of transitioning different CSS properties (layout, paint, composite). Which properties should you prefer for smooth 60fps animations?", "answer": "Layout-triggering properties (width, height, top, left) are most expensive. Paint-triggering properties (color, background) are medium cost. Composite-only properties (opacity, transform) are cheapest - they run on the GPU compositor thread. For 60fps: prefer transform and opacity.", "difficulty": "hard", "company": "Google"},
            {"question": "How does the transitionend event work and what practical use cases does it have?", "answer": "The transitionend event fires when a CSS transition completes. Each property that transitions fires a separate event. Use cases: chaining animations, triggering JavaScript after a transition completes, detecting when a slide-in panel is fully open, analytics tracking for animation completion.", "difficulty": "medium", "company": "Spotify"},
          ],
          codingChallenges: [
            {"title": "Build an Interactive Button with Micro-interactions", "description": "Create a button with multiple micro-interactions: hover (subtle lift), active (press down), focus (glow ring), disabled (fade out). Use transitions for smooth state changes. Include a loading state that shows a spinner.", "difficulty": "medium", "solutionHint": "Use transform for lift/press effects, box-shadow for glow, opacity for fade. Add a CSS-only spinner with ::after pseudo-element. Use transition with different durations per state."},
          ],
        },
        {
          slug: "transforms",
          title: "Transforms",
          order: 2,
          content: {
            overview:
            "CSS transforms modify the coordinate space of elements: translate (move), rotate, scale, skew, and 3D perspective transforms. They create visual effects without affecting document flow.",
            problemStatement:
            "Positioning elements visually without affecting layout required complex positioning hacks. Creating rotation, scaling, or 3D effects required images or JavaScript.",
            intuitionFirst:
            "Transforms are like a funhouse mirror for elements - you can stretch, squash, spin, or tilt elements without changing their actual size or position in the document flow.",
            realLifeAnalogy:
            "Transforms are like editing a photo in a digital app: you can rotate, resize, skew, or add perspective without changing the original file. The element's original space in the layout is preserved (the \"ghost\" outline stays).",
            howItWorks:
            "Transforms create a new local coordinate system for the element. Each transform function: translate(tx, ty) moves, rotate(a) rotates around origin, scale(s) scales, skew(ax, ay) skews. transform-origin sets the pivot point. 3D transforms (translateZ, rotateX, perspective) require perspective on parent. Multiple transforms are applied right-to-left.",
            beginnerExample:
            ".card {\n  transition: transform 0.3s ease;\n}\n\n.card:hover {\n  transform: translateY(-8px) scale(1.02);\n  /* Moves up and slightly enlarges */\n}\n\n/* 3D Card flip */\n.scene {\n  perspective: 600px;\n}\n\n.card {\n  transform-style: preserve-3d;\n  transition: transform 0.6s;\n}\n\n.card.flipped {\n  transform: rotateY(180deg);\n}\n\n/* Fixed aspect ratio pill */\n.pill { transform: scaleX(2); }",
            commonMistakes:
            "Forgetting transforms do not affect document flow (preserved space causes overlapping), applying transforms in wrong order (right-to-left), using percentage transforms relative to own size.",
            bestPractices:
            "Use transform for GPU-accelerated animations, combine with transition, apply 3D transforms sparingly (new stacking contexts), use will-change.",
          },
          quiz: [
            {"id": "css-transform-1", "question": "What does transform: translate(-50%, -50%) do to an element?", "options": ["Moves it left by 50% of its own width and up by 50% of its own height", "Moves it left by 50px and up by 50px", "Moves it to the center of its parent", "Moves it right by 50% and down by 50%"], "correctIndex": 0, "explanation": "translate(-50%, -50%) shifts the element left by 50% of its width and up by 50% of its height. Combined with top: 50%; left: 50%; it perfectly centers.", "difficulty": "medium"},
            {"id": "css-transform-2", "question": "What property determines the pivot point for a transform like rotate()?", "options": ["transform-origin", "perspective-origin", "transform-style", "rotate-origin"], "correctIndex": 0, "explanation": "transform-origin sets the pivot point (defaults to center/50% 50%). rotate() spins around this point.", "difficulty": "easy"},
            {"id": "css-transform-3", "question": "What does perspective: 600px on a parent element do for 3D transforms on children?", "options": ["Creates a 3D space where children with 3D transforms appear to have depth. Smaller values = more dramatic 3D effect", "Sets the element's z-position to 600px", "Creates a 600px tall 3D space", "Sets the distance between 3D layers to 600px"], "correctIndex": 0, "explanation": "perspective creates a 3D space. The value determines the viewer's distance from the z=0 plane. Smaller values = stronger 3D effect.", "difficulty": "hard"},
          ],
          faangQuestions: [
            {"question": "How does the browser compositing pipeline handle elements with transform: translateZ(0) or will-change: transform? Why is this performant?", "answer": "These properties promote the element to its own compositor layer (GPU texture). The browser composites this layer independently without re-layouting or repainting the entire page. This is why transform/opacity animations can run at 60fps - they only trigger compositing.", "difficulty": "hard", "company": "Google"},
            {"question": "Explain the order of operations for multiple transform functions. Why does transform: translate() rotate() differ from transform: rotate() translate()?", "answer": "Transforms are applied right-to-left (from the element's perspective). rotate() then translate(): the translate direction is rotated from the local axis (moves in rotated direction). translate() then rotate(): the element is first moved, then rotated around the new position. This affects the final visual position.", "difficulty": "expert", "company": "Meta"},
          ],
          codingChallenges: [
          ],
        },
        {
          slug: "keyframes",
          title: "Keyframe Animations",
          order: 3,
          content: {
            overview:
            "@keyframes animations give you precise, multi-step control over an animation sequence. Unlike transitions (which only animate between two states), keyframes can define complex sequences with multiple intermediate states, looping, and direction control.",
            problemStatement:
            "Transitions only animate between two states (start/end). Complex animations with multiple steps, repeated patterns, or non-reversible animation require @keyframes.",
            intuitionFirst:
            "Keyframes are like a flipbook animation. Each keyframe is a page in the flipbook showing the state at that point. When you flip through quickly, the element appears to smoothly animate from one state to another.",
            realLifeAnalogy:
            "Keyframes are like a choreographed dance routine. Each keyframe is a specific pose at a specific beat. The CSS animation plays through these poses in sequence, creating a smooth dance performance.",
            howItWorks:
            "@keyframes defines stages (0%-100% or from/to) with CSS property values. The animation property orchestrates: animation-name (which keyframes), animation-duration, animation-timing-function (per-keyframe or overall), animation-iteration-count (infinite for looping), animation-direction (normal, reverse, alternate), animation-fill-mode (forwards, backwards, both), animation-delay.",
            beginnerExample:
            "@keyframes slideIn {\n  from {\n    opacity: 0;\n    transform: translateX(-100px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n\n@keyframes bounce {\n  0% { transform: scale(1); }\n  50% { transform: scale(1.2); }\n  100% { transform: scale(1); }\n}\n\n.element {\n  animation: slideIn 0.5s ease-out, bounce 0.3s ease 0.5s;\n  animation-iteration-count: 1, infinite;\n}",
            commonMistakes:
            "Not setting animation-fill-mode: forwards when element should retain final state, triggering layout by animating non-performant properties, overly complex keyframes.",
            bestPractices:
            "Use animation-fill-mode: forwards for enter animations, animate only transform and opacity, keep keyframes simple (2-4 stops).",
          },
          quiz: [
            {"id": "css-keyframes-1", "question": "What does animation-fill-mode: forwards do?", "options": ["Retains the final keyframe state after the animation ends (doesn't reset to original)", "Plays the animation forward only", "Fills the element with the animation color", "Makes the animation play in reverse after completion"], "correctIndex": 0, "explanation": "animation-fill-mode: forwards keeps the element at the state of the last keyframe (100%) after the animation completes.", "difficulty": "medium"},
            {"id": "css-keyframes-2", "question": "What does animation-direction: alternate do?", "options": ["Plays the animation forward, then backward alternately in each cycle", "Plays the animation in reverse", "Uses an alternate keyframe set", "Makes the animation choose a random direction"], "correctIndex": 0, "explanation": "alternate plays the animation from 0% to 100%, then from 100% back to 0%, then forward again, etc.", "difficulty": "medium"},
            {"id": "css-keyframes-3", "question": "How many keyframe stops can you have in a @keyframes rule besides 'from' and 'to'?", "options": ["Any number using percentage values (25%, 50%, 75%)", "Only one extra stop", "Up to 10 stops maximum", "No additional stops allowed"], "correctIndex": 0, "explanation": "You can define any number of intermediate keyframes using percentage values like 10%, 25%, 50%, 75% for precise multi-step control.", "difficulty": "easy"},
          ],
          faangQuestions: [
            {"question": "How does the Web Animations API (WAAPI) compare to CSS @keyframes animations? When would you use each?", "answer": "WAAPI provides JavaScript control over animations (pause, reverse, playback rate, seek) that CSS alone cannot do. Use CSS for simple declarative animations. Use WAAPI for interactive animations that respond to user input, need programmatic control, or need synchronization with other animations.", "difficulty": "hard", "company": "Google"},
            {"question": "How does animation performance differ between animating transform vs width vs box-shadow? What causes jank?", "answer": "Transform animations run on the compositor thread (GPU). Width animations trigger layout recalculations on the main thread (expensive). Box-shadow triggers paint. Jank occurs when the main thread is busy with layout/paint and can't produce frames at 60fps. Solutions: animate only transform and opacity, use will-change, debounce heavy JavaScript.", "difficulty": "expert", "company": "Meta"},
          ],
          codingChallenges: [
          ],
        },
      ],
    },
    {
      slug: "advanced-css",
      title: "Advanced CSS",
      description:
        "Explore CSS custom properties, modern selectors, pseudo-classes, pseudo-elements, CSS architecture methodologies, and BEM conventions",
      order: 6,
      subtopics: [
        {
          slug: "css-custom-properties",
          title: "CSS Custom Properties (Variables)",
          order: 1,
          content: {
            overview:
            "CSS custom properties (CSS variables) allow you to store values and reuse them throughout your stylesheet. They cascade like other CSS properties, can be overridden, and can even be manipulated with JavaScript, making them far more powerful than preprocessor variables.",
            problemStatement:
            "Without custom properties, updating colors, spacing, or fonts across a large project required find-and-replace or preprocessor variables that don't cascade or update at runtime.",
            intuitionFirst:
            "CSS custom properties are like named slots in a template. You define a variable once (like --primary-color: blue), and everywhere it's used, the browser substitutes the value. Change the definition, and all usages update instantly.",
            realLifeAnalogy:
            "CSS variables are like a restaurant menu where the prices are listed in chalk. When the chef needs to update the price of an ingredient (variable change), they just update the central price list, and all menu items using that ingredient automatically reflect the new cost.",
            howItWorks:
            "Custom properties are defined with --prefix: value; syntax, usually on :root for global scope. They are accessed with var(--name) and can have fallbacks: var(--name, fallback). They inherit through the cascade (unlike preprocessor variables). JavaScript can read/set them with getPropertyValue/setProperty on element.style. They work in media queries, calc(), and can be animated.",
            beginnerExample:
            ":root {\n  --primary: #3498db;\n  --primary-dark: #2980b9;\n  --spacing: 16px;\n  --font-size: 16px;\n  --border-radius: 8px;\n}\n\n.card {\n  background: var(--primary);\n  padding: var(--spacing);\n  border-radius: var(--border-radius);\n  font-size: var(--font-size);\n}\n\n/* Theming with override */\n.dark-theme {\n  --primary: #2c3e50;\n  --primary-dark: #1a252f;\n}\n\n/* JavaScript override */\n// document.documentElement.style.setProperty(\"--spacing\", \"32px\")",
            commonMistakes:
            "Assuming CSS custom properties work in media queries (they don't), using var() without fallback, expecting preprocessor-like behavior.",
            bestPractices:
            "Always provide fallback values for var(), use :root for globals, scope variables to components, use setProperty() for dynamic updates.",
          },
          quiz: [
            {"id": "css-vars-1", "question": "Where should you define global CSS custom properties for maximum scope?", "options": [":root pseudo-class", "body element", "html element", "Anywhere with var()"], "correctIndex": 0, "explanation": ":root (same as <html> but higher specificity) is the convention for global CSS custom properties that cascade to all elements.", "difficulty": "easy"},
            {"id": "css-vars-2", "question": "How does CSS custom property inheritance differ from preprocessor (SCSS/LESS) variables?", "options": ["CSS custom properties cascade and can be overridden at any level; preprocessor variables are compiled once and don't cascade", "They are functionally identical", "Preprocessor variables cascade; CSS variables don't", "CSS variables require JavaScript to change; preprocessor variables auto-update"], "correctIndex": 0, "explanation": "CSS custom properties are real CSS properties that inherit through the cascade. Preprocessor variables are compiled away during build and don't exist at runtime.", "difficulty": "medium"},
            {"id": "css-vars-3", "question": "What is the fallback syntax for a CSS custom property?", "options": ["var(--name, fallback-value)", "var(--name || fallback-value)", "var(--name, default: fallback-value)", "fallback(--name, fallback-value)"], "correctIndex": 0, "explanation": "var(--name, fallback) uses fallback-value when --name is not defined or invalid.", "difficulty": "easy"},
          ],
          faangQuestions: [
            {"question": "How can CSS custom properties be used to implement dynamic theming (dark mode, user-defined colors, accented UI)? Provide a complete strategy.", "answer": "Define theme colors as CSS custom properties on :root (light) and [data-theme='dark'] (dark). Toggle theme by changing the data-theme attribute via JavaScript. For user-defined colors, use JavaScript to setProperty() on document.documentElement. Store preference in localStorage. Use CSS @media (prefers-color-scheme) for OS-level dark mode detection.", "difficulty": "hard", "company": "GitHub"},
            {"question": "Explain how CSS custom properties interact with the cascade, specificity, and the inherit/initial/unset keywords.", "answer": "CSS custom properties follow normal cascade and inheritance. Setting --var on an element affects only that element and its descendants (inherited). Specificity applies to the rule declaring the variable, not the var() usage. inherit forces inheritance, initial resets the property to its initial value (empty/invalid), unset uses inherit if the property inherits or initial if not. invalid custom properties with no fallback are treated as unset.", "difficulty": "expert", "company": "Stripe"},
          ],
          codingChallenges: [
            {"title": "Build a Theme Switcher with CSS Custom Properties", "description": "Create a page with 3 themes (light, dark, high-contrast) using CSS custom properties. Include a theme toggle UI, transition between themes, and persist the user's choice in localStorage. Ensure all theme colors meet WCAG AA contrast.", "difficulty": "hard", "solutionHint": "Define all colors on :root and override in [data-theme='X']. Use JavaScript to toggle data-theme and save to localStorage. Add transition: background 0.3s, color 0.3s for smooth switching."},
          ],
        },
        {
          slug: "pseudo-classes-elements",
          title: "Pseudo-classes and Pseudo-elements",
          order: 2,
          content: {
            overview:
            "Pseudo-classes (:hover, :focus, :nth-child, :not, :is, :where, :has) select elements based on state or position. Pseudo-elements (::before, ::after, ::first-line, ::selection) create virtual elements or select parts of elements.",
            problemStatement:
            "Styling specific element states (hovered, focused, every 3rd child) or adding decorative content without extra HTML required workarounds before pseudo-classes/elements.",
            intuitionFirst:
            "Pseudo-classes are like filters that select elements based on invisible characteristics (position, state, relationship). Pseudo-elements are like CSS-generated virtual HTML elements that don't exist in the DOM.",
            realLifeAnalogy:
            "Pseudo-class: n-th child is like saying \"every 3rd person in a queue gets a free coffee\" - you're targeting based on position, not identity. Pseudo-element: ::before is like adding a nametag to a person without actually pinning a physical tag - the tag appears but isn't part of the person's body.",
            howItWorks:
            "Pseudo-classes: single colon (:) filtering based on state/position. :nth-child(an+b) selects based on algebraic formula. :not() excludes. :is() accepts a list for grouping. :has() selects parents containing certain children. Pseudo-elements: double colon (::) creating virtual elements. ::before/::after insert content (must have content property). ::first-letter/::first-line style text portions.",
            beginnerExample:
            "/* Pseudo-classes */\nli:nth-child(odd) { background: #f5f5f5; }\nli:nth-child(3n+1) { color: red; }  /* 1st, 4th, 7th */\nbutton:not(.primary) { background: gray; }\nform:has(input:invalid) { border: 2px solid red; }\n:is(h1, h2, h3) .highlight { color: gold; }\n\n/* Pseudo-elements (double colon) */\n.quote::before { content: \"\\201C\"; }  /* left double quote */\n.quote::after { content: \"\\201D\"; }   /* right double quote */\n::selection { background: yellow; }\np::first-letter { font-size: 2em; }",
            commonMistakes:
            "Forgetting ::before/::after require content property to render, using single colon for pseudo-elements, creating inaccessible content.",
            bestPractices:
            "Use double colon (::) for pseudo-elements, keep decorative content in ::before/::after, use content: \"\" for empty decorative elements.",
          },
          quiz: [
            {"id": "css-pseudo-1", "question": "What is the difference between ::before and :before notation?", "options": ["::before is the modern CSS3 pseudo-element syntax; :before was the older CSS2 syntax", ":before is for pseudo-classes; ::before is for pseudo-elements", "They are identical", "::before only works in Chrome"], "correctIndex": 0, "explanation": "CSS3 introduced :: (double colon) for pseudo-elements to distinguish from pseudo-classes. :before still works for backward compatibility but ::before is the modern standard.", "difficulty": "medium"},
            {"id": "css-pseudo-2", "question": "What CSS pseudo-class selects elements that are the first child of their parent?", "options": [":first-child", ":first-of-type", ":nth-child(1)", ":first"], "correctIndex": 0, "explanation": ":first-child selects an element that is the first child of its parent (regardless of type). :first-of-type selects the first element of its type among siblings.", "difficulty": "easy"},
            {"id": "css-pseudo-3", "question": "What must the content property be for ::before and ::after pseudo-elements to render?", "options": ["It must be set to something (even an empty string is fine)", "It's optional", "It must be a URL", "It must be 'attr()'"], "correctIndex": 0, "explanation": "::before and ::after will not render unless the content property is set. An empty string content:  is valid and useful for decorative elements.", "difficulty": "medium"},
          ],
          faangQuestions: [
            {"question": "How does the :has() pseudo-class change CSS capabilities? Provide three practical use cases.", "answer": ":has() is a parent selector - it selects an element that contains specific children. Use cases: 1) Card with image gets different layout: .card:has(img) { grid-template-columns: 1fr 2fr; } 2) Form group with errors: .field:has(:invalid) { border-color: red; } 3) Navigation with dropdown: li:has(ul) { position: relative; }", "difficulty": "hard", "company": "Google"},
            {"question": "Compare and contrast :nth-child(an+b), :nth-of-type(an+b), and :nth-last-child(an+b). Give examples of each.", "answer": ":nth-child counts all siblings regardless of type. :nth-of-type counts only siblings of the same element type. :nth-last-child counts from the end. Example: p:nth-child(2) picks the 2nd child - if it's not a p, nothing is selected. p:nth-of-type(2) picks the 2nd <p> among all siblings. :nth-last-child(-n+3) picks the last 3 children.", "difficulty": "hard", "company": "Amazon"},
          ],
          codingChallenges: [
          ],
        },
        {
          slug: "css-architecture",
          title: "CSS Architecture and BEM",
          order: 3,
          content: {
            overview:
            "CSS architecture refers to how you organize, structure, and name your CSS to maintain scalability, reusability, and clarity as projects grow. BEM (Block Element Modifier) is one of the most popular naming conventions.",
            problemStatement:
            "Without a consistent architecture, CSS quickly becomes unmaintainable: specificity wars, !important overrides, hard-to-find selectors, and cascading side effects.",
            intuitionFirst:
            "CSS architecture is like a library cataloging system. Without it, books (styles) are scattered randomly. With BEM, every style has a predictable location and name, just like every book has a Dewey Decimal number.",
            realLifeAnalogy:
            "BEM is like a standardized shipping label format: BLOCK is the city (component name), ELEMENT is the street (component part), MODIFIER is the apartment number (variant). Example: card__title--highlighted - clear, predictable, no ambiguity.",
            howItWorks:
            "BEM: Block (component), Element (part of block, preceded by __), Modifier (variant, preceded by --). Examples: .button, .button__icon, .button--primary. Other architectures: SMACSS (categorization), ITCSS (layered triangle), OOCSS (separation of structure from skin), Utility-first (functional atomic classes like Tailwind).",
            beginnerExample:
            "/* BEM Naming */\n/* Block: card */\n.card { ... }\n\n/* Element: parts of card */\n.card__title { ... }\n.card__body { ... }\n.card__footer { ... }\n\n/* Modifier: variants */\n.card--featured { border-color: gold; }\n.card__title--large { font-size: 1.5em; }\n\n/* HTML:\n<div class=\"card card--featured\">\n  <h2 class=\"card__title card__title--large\">Title</h2>\n  <p class=\"card__body\">Content</p>\n</div>\n*/",
            commonMistakes:
            "Mixing methodologies without clear rules, deeply nested BEM selectors, names describing appearance instead of purpose.",
            bestPractices:
            "Choose one architecture, use names describing purpose, keep BEM flat, use utility classes for one-offs, document conventions.",
          },
          quiz: [
            {"id": "css-arch-1", "question": "In BEM, what does the double underscore (__) indicate?", "options": ["An Element (part of the Block)", "A Modifier", "A Block variant", "A child component"], "correctIndex": 0, "explanation": "In BEM, __ separates the Block from its Element (e.g., card__title means 'title element of the card block').", "difficulty": "easy"},
            {"id": "css-arch-2", "question": "What problem does BEM primarily solve?", "options": ["CSS specificity conflicts through predictable naming", "CSS animation performance", "CSS grid layout issues", "CSS browser compatibility"], "correctIndex": 0, "explanation": "BEM solves specificity conflicts by keeping all selectors at the same specificity level (one class each), making overrides predictable.", "difficulty": "medium"},
            {"id": "css-arch-3", "question": "How does ITCSS (Inverted Triangle CSS) organize styles differently from BEM?", "options": ["ITCSS layers styles by specificity/precedence (Settings > Tools > Generic > Elements > Objects > Components > Trumps)", "ITCSS uses a triangle naming pattern", "ITCSS is only for grid layouts", "ITCSS replaces BEM entirely"], "correctIndex": 0, "explanation": "ITCSS organizes styles into layers going from generic to specific, controlling specificity and preventing cascade issues.", "difficulty": "hard"},
          ],
          faangQuestions: [
            {"question": "Compare Utility-first CSS (Tailwind approach) with BEM methodology. What are the tradeoffs for large-scale applications?", "answer": "Utility-first: rapid prototyping, no naming decisions, smaller CSS bundles with purge, but verbose HTML. BEM: semantic naming, clear component structure, easier to understand component boundaries, but can lead to long class names and requires naming discipline. For large apps, BEM excels for long-lived codebases; utility-first excels for fast iteration and small teams.", "difficulty": "expert", "company": "Shopify"},
            {"question": "How would you scale CSS in a large team with multiple feature teams working on the same codebase? What architectural decisions prevent conflicts?", "answer": "Use BEM or CSS Modules for scoping. Establish a CSS architecture (ITCSS layers). Use CSS custom properties for theme values. Implement design tokens. Use linting (stylelint) with team conventions. Consider CSS-in-JS or scoped CSS for component-scoped styles. Regular CSS audits. Enforce a single methodology across the project.", "difficulty": "hard", "company": "Meta"},
          ],
          codingChallenges: [
          ],
        },
      ],
    },
    {
      slug: "tailwind-css",
      title: "Tailwind CSS",
      description:
        "Master utility-first CSS with Tailwind - from utility classes and responsive design to custom themes, dark mode, and component extraction patterns",
      order: 7,
      subtopics: [
        {
          slug: "utility-classes",
          title: "Utility Classes",
          order: 1,
          content: {
            overview:
            "Tailwind CSS is a utility-first CSS framework that provides low-level utility classes for building custom designs without writing custom CSS. Instead of pre-built components, Tailwind offers building blocks like flex, pt-4, text-center, and shadow-lg.",
            problemStatement:
            "Traditional CSS frameworks (Bootstrap, Foundation) provide pre-built components that are hard to customize without overrides. Writing custom CSS for every project leads to inconsistencies and bloat.",
            intuitionFirst:
            "Tailwind utilities are like Lego bricks. You build components by combining small, single-purpose classes directly in HTML, rather than writing custom CSS for each component.",
            realLifeAnalogy:
            "Utility-first CSS is like cooking with individual ingredients vs. frozen meals (component frameworks). With Tailwind, you control every aspect - the exact salt amount, the cooking time, the spice level. With Bootstrap, you get a pre-cooked meal that's harder to customize.",
            howItWorks:
            "Tailwind scans your HTML/JS files for class names, generates only the CSS you need (purging unused styles). Each utility class sets one or two CSS properties. For example: flex = display: flex, items-center = align-items: center, space-x-4 = margin-left (all children except first) = 1rem. Classes follow a consistent naming convention: property-direction-value.",
            beginnerExample:
            "<!-- Without Tailwind: custom CSS -->\n<div class=\"card\">\n  <h2>Title</h2>\n  <p>Content</p>\n</div>\n\n<!-- With Tailwind: utilities in HTML -->\n<div class=\"p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4\">\n  <div class=\"shrink-0\">\n    <img class=\"h-12 w-12\" src=\"/img/logo.svg\" alt=\"Logo\">\n  </div>\n  <div>\n    <div class=\"text-xl font-medium text-black\">Title</div>\n    <p class=\"text-gray-500\">Content</p>\n  </div>\n</div>",
            commonMistakes:
            "Not configuring content paths (Tailwind purges all styles if wrong), overusing @apply (defeats utility purpose), duplicating existing classes.",
            bestPractices:
            "Configure content paths precisely, use @apply sparingly, customize theme config, use JIT engine.",
          },
          quiz: [
            {"id": "css-tailwind-1", "question": "How does Tailwind handle unused CSS in production builds?", "options": ["Tree-shaking / purging: scans your HTML/JS for class names and removes unused utilities", "All CSS is always included regardless of usage", "Unused CSS is hidden with display: none", "You must manually delete unused classes"], "correctIndex": 0, "explanation": "Tailwind's purge (JIT mode) scans your templates and generates only the CSS classes actually used, resulting in very small bundles.", "difficulty": "medium"},
            {"id": "css-tailwind-2", "question": "What does the class 'p-4' mean in Tailwind?", "options": ["padding: 1rem (16px by default)", "padding: 4px", "padding: 4rem", "position: absolute with 4px offset"], "correctIndex": 0, "explanation": "p-4 sets padding on all sides to 1rem (4 * 0.25rem = 1rem, where 1 unit = 0.25rem in Tailwind's default spacing scale).", "difficulty": "easy"},
            {"id": "css-tailwind-3", "question": "How do you apply hover styles in Tailwind?", "options": ["By prefixing the utility with hover: (e.g., hover:bg-blue-700)", "Using @media queries in the class", "By defining hover styles in the config file", "Tailwind doesn't support hover states"], "correctIndex": 0, "explanation": "Tailwind uses variant prefixes: hover:, focus:, active:, lg:, dark:, etc. applied before the utility class.", "difficulty": "easy"},
          ],
          faangQuestions: [
            {"question": "Compare Tailwind CSS with CSS-in-JS approaches (Styled Components, Emotion). What are the tradeoffs for developer experience, build size, and runtime performance?", "answer": "Tailwind: smaller build sizes (purged CSS), no runtime cost, faster initial load, but verbose HTML and requires learning utility naming. CSS-in-JS: dynamic styles at runtime, co-located with components, full JavaScript power for styles, but larger bundles (runtime), slower rendering (style injection), and harder to extract static CSS for SSR.", "difficulty": "hard", "company": "Netflix"},
            {"question": "How would you handle component reusability in Tailwind? Discuss the @apply directive, component extraction patterns, and when each is appropriate.", "answer": "1) @apply: extract repeated utility patterns in CSS using @apply (e.g., .btn { @apply px-4 py-2 bg-blue-500 rounded; }). 2) Component abstraction: create React/Vue components that encapsulate utility classes. 3) Tailwind plugin: add custom component styles via plugins. Use @apply for small, repeated patterns. Use component abstraction for larger composite components.", "difficulty": "medium", "company": "Vercel"},
          ],
          codingChallenges: [
            {"title": "Convert a Bootstrap Component to Tailwind", "description": "Take a Bootstrap card component and re-implement it using Tailwind utility classes. Include: card with image, title, text, and button. Ensure responsive behavior works without custom CSS.", "difficulty": "medium", "solutionHint": "Start with the Bootstrap HTML structure. Replace Bootstrap classes (card, card-body, btn-primary) with Tailwind equivalents (rounded-lg, shadow-md, p-6, bg-blue-500, hover:bg-blue-700). Use flex and gap for spacing instead of card-body."},
          ],
        },
        {
          slug: "responsive-utilities",
          title: "Responsive Utilities",
          order: 2,
          content: {
            overview:
            "Tailwind provides responsive variant prefixes (sm:, md:, lg:, xl:, 2xl:) that apply utilities at specific breakpoints. Combined with Tailwind's mobile-first approach, you can build responsive layouts directly in HTML without media queries.",
            problemStatement:
            "Writing responsive styles requires separate media query blocks, which separates responsive rules from base styles and makes it harder to see the full responsive behavior at a glance.",
            intuitionFirst:
            "Tailwind responsive prefixes are like responsive dressing: \"lg:flex\" means \"apply display: flex when the viewport is large.\" It's the utility class equivalent of @media (min-width: 1024px) { display: flex; }",
            realLifeAnalogy:
            "Responsive utilities are like a shape-shifting table that changes size based on the room. sm: = small room (phone), everything stacks. md: = medium room (tablet), side by side. lg: = large room (desktop), full multi-column layout.",
            howItWorks:
            "Tailwind breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px). These are min-width queries. A class like md:grid only applies at viewports 768px and wider. Multiple breakpoints can be combined: base layout (mobile) is defined without prefix, then md:, lg: add changes. This naturally creates a mobile-first approach.",
            beginnerExample:
            "<!-- Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop -->\n<div class=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4\">\n  <div class=\"bg-white p-4 rounded-lg shadow\">Item 1</div>\n  <div class=\"bg-white p-4 rounded-lg shadow\">Item 2</div>\n  <div class=\"bg-white p-4 rounded-lg shadow\">Item 3</div>\n</div>\n\n<!-- Responsive flex: stack on mobile, row on desktop -->\n<div class=\"flex flex-col md:flex-row\">\n  <div class=\"md:w-1/4\">Sidebar</div>\n  <div class=\"md:w-3/4\">Content</div>\n</div>",
            commonMistakes:
            "Applying responsive classes inconsistently, not testing every breakpoint, applying prefixes in wrong order.",
            bestPractices:
            "Use mobile-first (no prefix for base), add breakpoint prefixes for changes, test at every breakpoint boundary.",
          },
          quiz: [
            {"id": "css-tailwind-resp-1", "question": "What is the default breakpoint for the md: prefix in Tailwind?", "options": ["768px", "640px", "1024px", "Customizable in config"], "correctIndex": 0, "explanation": "md: applies at min-width: 768px. Tailwind breakpoints are: sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px.", "difficulty": "easy"},
            {"id": "css-tailwind-resp-2", "question": "In Tailwind's mobile-first approach, what does a class without a breakpoint prefix (like flex) do?", "options": ["Applies at all viewport sizes (mobile base)", "Applies only at the smallest breakpoint", "Doesn't apply until explicitly prefixed", "Applies only at default (no breakpoint)"], "correctIndex": 0, "explanation": "Unprefixed utilities apply at all viewport sizes (the mobile base). Breakpoint prefixes override or supplement for larger screens.", "difficulty": "medium"},
            {"id": "css-tailwind-resp-3", "question": "How do you hide an element on mobile and show it on desktop using Tailwind?", "options": ["hidden md:block", "display: none md:display: block", "hide sm:show", "invisible md:visible"], "correctIndex": 0, "explanation": "hidden (hidden on all screens), md:block (visible on md and up). Or use sm:hidden lg:block for more control.", "difficulty": "medium"},
          ],
          faangQuestions: [
            {"question": "How would you implement a responsive navigation using Tailwind that transforms from a hamburger menu on mobile to a horizontal bar on desktop? Include the JavaScript needed for the mobile toggle.", "answer": "HTML structure: nav with logo, mobile hamburger button (block md:hidden), nav links (hidden md:flex). JavaScript: toggle class on menu button click. Tailwind: use md:flex for desktop horizontal nav, absolute positioning for mobile dropdown. Accessibility: aria-expanded, aria-controls, role='navigation'.", "difficulty": "hard", "company": "Shopify"},
            {"question": "Discuss how Tailwind handles custom breakpoints and what strategies you can use when the default breakpoints don't fit your design system.", "answer": "Customize breakpoints in tailwind.config.js: theme.extend.screens. You can rename, add, or remove breakpoints. For component-specific breakpoints, use the min/max notation: screens: { tablet: '800px', desktop: '1200px' }. Tailwind v3 also supports arbitrary values: min-[900px]:flex.", "difficulty": "medium", "company": "Vercel"},
          ],
          codingChallenges: [
          ],
        },
        {
          slug: "custom-themes",
          title: "Custom Themes and Configuration",
          order: 3,
          content: {
            overview:
            "Tailwind is highly customizable through its configuration file (tailwind.config.js). You can extend the default theme with custom colors, fonts, spacing, breakpoints, and even create your own utility classes and plugins.",
            problemStatement:
            "Every project has unique design requirements (brand colors, custom fonts, specific spacing values). Without customization, you'd need to write custom CSS alongside Tailwind, defeating the purpose.",
            intuitionFirst:
            "The Tailwind config is like a restaurant's ingredient list. The default theme is the base pantry, but you can add your own special ingredients (custom colors, fonts) through the config extend feature.",
            realLifeAnalogy:
            "Tailwind's config is like a design system blueprint: \"Our primary color is #3498db, our spacing is based on a 4px grid, our font is Inter.\" The config centralizes all these decisions, and Tailwind generates the corresponding utility classes automatically.",
            howItWorks:
            "tailwind.config.js exports a config object. theme.extend adds to the default (preserving defaults). theme overrides replaces it entirely. Custom colors generate utilities like text-brand, bg-brand, border-brand. plugins add entirely new utilities or components. content config tells Tailwind which files to scan for class names.",
            beginnerExample:
            "// tailwind.config.js\nmodule.exports = {\n  content: [\"./src/**/*.{html,js}\"],\n  theme: {\n    extend: {\n      colors: {\n        brand: {\n          50: \"#eff6ff\",\n          500: \"#3b82f6\",\n          900: \"#1e3a5f\",\n        },\n      },\n      fontFamily: {\n        heading: [\"Inter\", \"sans-serif\"],\n      },\n      spacing: {\n        18: \"4.5rem\",\n      },\n    },\n  },\n  plugins: [\n    require(\"@tailwindcss/forms\"),\n    require(\"@tailwindcss/typography\"),\n  ],\n};",
            commonMistakes:
            "Overriding entire theme instead of extending (losing defaults), not purging unused custom utilities, creating conflicting color names.",
            bestPractices:
            "Use extend to preserve defaults, limit custom colors to brand palette (5-10), use semantic naming.",
          },
          quiz: [
            {"id": "css-tailwind-config-1", "question": "What is the difference between `theme` and `theme.extend` in Tailwind config?", "options": ["theme.extend adds to defaults; theme overrides entirely", "theme.extend overrides; theme adds to defaults", "They are interchangeable", "theme is for colors only; theme.extend is for spacing"], "correctIndex": 0, "explanation": "theme.extend merges your values with Tailwind defaults. theme (without extend) replaces the entire theme configuration.", "difficulty": "medium"},
            {"id": "css-tailwind-config-2", "question": "How do you add a custom font in Tailwind?", "options": ["Add to fontFamily in theme.extend, then import the font (via CSS @import or link tag)", "Fonts are automatically included", "Add font files to the public folder", "Custom fonts require a Tailwind plugin"], "correctIndex": 0, "explanation": "Add the font to theme.extend.fontFamily (e.g., heading: ['Inter', 'sans-serif']), then load the font separately via @import or <link>.", "difficulty": "easy"},
            {"id": "css-tailwind-config-3", "question": "What CSS file replaces Tailwind's @tailwind directives in the build process?", "options": ["Generated by Tailwind based on your config and content scanning", "A manual CSS file you must create", "An npm package called tailwind-css", "None - Tailwind doesn't use CSS directives"], "correctIndex": 0, "explanation": "Tailwind processes @tailwind base/components/utilities directives and generates the actual CSS based on your config and scanned content.", "difficulty": "medium"},
          ],
          faangQuestions: [
            {"question": "How would you implement a design token system using Tailwind's configuration? Discuss how brand colors, spacing scales, and typography tokens map to Tailwind utilities.", "answer": "Map design tokens to Tailwind config: colors palette in theme.extend.colors, spacing scale in spacing (or use Tailwind defaults), typography in fontFamily/fontSize. Each token generates utility classes: color token 'brand/500' generates bg-brand/500, text-brand/500, border-brand/500. Use CSS custom properties in tandem: define tokens as CSS variables, reference in Tailwind config via the function syntax.", "difficulty": "hard", "company": "Stripe"},
            {"question": "What is the Tailwind JIT (Just-in-Time) engine and how does it improve the development experience compared to the traditional (AOT) build?", "answer": "JIT generates CSS on-demand as you write classes, instead of generating a massive stylesheet upfront. Benefits: instant build times, unlimited variants (arbitrary values like top-[117px]), exact same CSS in dev and production (no purge surprises), smaller dev stylesheets. Since v3, JIT is the default engine.", "difficulty": "medium", "company": "Vercel"},
          ],
          codingChallenges: [
          ],
        },
        {
          slug: "dark-mode",
          title: "Dark Mode in Tailwind",
          order: 4,
          content: {
            overview:
            "Tailwind provides a dark variant (dark:) that applies styles when dark mode is active. It supports three strategies: media (based on OS preference), class (toggle via JavaScript), and selector (for custom selectors).",
            problemStatement:
            "Implementing dark mode traditionally requires many media queries, duplicated CSS, or complex JavaScript theme switching. Dark mode styles are often scattered throughout the codebase.",
            intuitionFirst:
            "The dark: prefix is like a \"when dark\" filter for utilities. dark:bg-gray-900 means \"use this background in dark mode.\" It's as simple as adding one more class to each element.",
            realLifeAnalogy:
            "Dark mode in Tailwind is like having a reversible jacket. The base class is the outside color (light mode), and the dark: prefix is the inside color (dark mode). When you flip the jacket (toggle dark mode), all the dark: styles activate automatically.",
            howItWorks:
            "With darkMode: \"class\" in config, the dark: variant applies when a parent element has the \"dark\" class (usually on <html> or <body>). Toggle the class via JavaScript. With darkMode: \"media\", it follows prefers-color-scheme OS setting. The variant works on any utility: dark:bg-black, dark:text-white, dark:border-gray-700.",
            beginnerExample:
            "<!-- HTML structure with dark mode -->\n<html class=\"dark\">\n<body class=\"bg-white dark:bg-gray-900 text-black dark:text-white\">\n  <div class=\"p-6 bg-gray-100 dark:bg-gray-800 rounded-lg\">\n    <h2 class=\"text-lg font-bold dark:text-gray-100\">Title</h2>\n    <p class=\"text-gray-600 dark:text-gray-400\">Content</p>\n  </div>\n</body>\n</html>\n\n// JavaScript toggle\n// document.documentElement.classList.toggle(\"dark\")\n\n// Config\n// tailwind.config.js\nmodule.exports = {\n  darkMode: \"class\", // or \"media\"\n}",
            commonMistakes:
            "Forgetting dark: variants on all relevant elements, not handling images in dark mode, applying dark mode to every element without scoping.",
            bestPractices:
            "Set body-level dark:bg-gray-900/text-white defaults, use dark: consistently, test both modes, add transition for smooth switching.",
          },
          quiz: [
            {"id": "css-tailwind-dark-1", "question": "How do you configure Tailwind to support class-based dark mode toggling?", "options": ["Set darkMode: 'class' in tailwind.config.js", "Dark mode works automatically", "Add a dark CSS file", "Use the prefers-dark variant"], "correctIndex": 0, "explanation": "Add darkMode: 'class' to config. Then use the dark: variant, and toggle the 'dark' class on a parent element (usually <html>) via JavaScript.", "difficulty": "medium"},
            {"id": "css-tailwind-dark-2", "question": "What does dark:bg-gray-800 do when dark mode is NOT active?", "options": ["The class has no effect - the element uses the base background", "It applies gray-800 background", "It applies the inverse of gray-800", "It applies a light background instead"], "correctIndex": 0, "explanation": "The dark: variant only applies when dark mode is active. Without dark mode, the base class (if any) applies, or the element has no background style.", "difficulty": "medium"},
            {"id": "css-tailwind-dark-3", "question": "What is the difference between darkMode: 'media' and darkMode: 'class' in Tailwind?", "options": ["media follows OS preference automatically; class requires manual toggling and allows user override", "media is for images only; class is for backgrounds", "They are identical in behavior", "media is deprecated; class is the only option"], "correctIndex": 0, "explanation": "'media' uses the prefers-color-scheme CSS media query (automatic based on OS). 'class' uses a CSS class toggle (requires JavaScript but gives user control).", "difficulty": "easy"},
          ],
          faangQuestions: [
            {"question": "How would you implement a dark mode toggle that persists user preference across sessions using Tailwind? Include handling of the OS-level prefers-color-scheme as the initial default.", "answer": "In tailwind.config.js: darkMode: 'class'. In JS: check localStorage for saved theme; if none, check prefers-color-scheme via matchMedia. Apply 'dark' class to <html>. On toggle, save to localStorage. Add a CSS transition: * { transition: background-color 0.3s, color 0.3s; } for smooth switching. Disable transitions on page load to avoid flash.", "difficulty": "hard", "company": "GitHub"},
            {"question": "Discuss strategies for migrating a large CSS codebase to Tailwind. How would you handle existing custom CSS, component libraries, and team adoption?", "answer": "1) Install Tailwind alongside existing CSS (no purge initially). 2) Gradually replace custom CSS with utilities, starting with new components. 3) Use @layer to manage Tailwind load order. 4) Extract common patterns as components, not @apply. 5) Configure theme to match brand. 6) Adopt incrementally - not a rewrite. 7) Use stylelint with Tailwind plugin for consistency. 8) Pair program for knowledge sharing.", "difficulty": "expert", "company": "Meta"},
          ],
          codingChallenges: [
          ],
        },
      ],
    },
    ]
  };
