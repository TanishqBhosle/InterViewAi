#!/usr/bin/env python3
"""Generate the complete css.ts seed file using json.dumps for proper escaping."""
import json
import os

path = r'E:\InterView Ai\packages\database\prisma\seed\css.ts'

def js_str(s):
    """Wrap string in properly escaped JS double-quoted string using json.dumps."""
    return json.dumps(s, ensure_ascii=False)

# Helper: build a field line with proper indentation
def f(indent, field_name, value):
    """Generate 'fieldName: "escaped value",' or 'fieldName: value,'"""
    pad = '  ' * indent
    return f'{pad}{field_name}: {js_str(value)},'

# Helper: build a field with multi-line string value
def f_multiline(indent, field_name, value):
    """For long values, put the string on the next line."""
    pad = '  ' * indent
    next_pad = '  ' * (indent + 1)
    return f'{pad}{field_name}:\n{next_pad}{js_str(value)},'

output = []
indent = 0

def L(line=''):
    """Add line at current indent level. Empty string = blank line."""
    if line:
        pad = '  ' * indent
        output.append(pad + line)
    else:
        output.append('')

def IL(line='', inc=0):
    """Add line with current indent + inc."""
    pad = '  ' * max(0, indent + inc)
    output.append(pad + line)

def push_indent():
    global indent
    indent += 1

def pop_indent():
    global indent
    indent -= 1

# ============================================================
# FILE HEADER
# ============================================================
L('import type { SubjectData } from "./types";')
L()
L('export const cssSubject: SubjectData = {')
push_indent()  # indent 1 for inside the export
IL('slug: "css",')
IL('title: "CSS",')
IL('description:')
IL('  "Master cascading stylesheets - from selectors and the box model to flexbox, grid, animations, and modern CSS architecture",', inc=1)
IL('icon: "Palette",')
IL('color: "text-blue-500",')
IL('order: 2,')
IL('topics: [')
push_indent()  # indent 2 for inside topics array

# ============================================================
# Helper functions for topic/subtopic structure
# ============================================================

def start_topic(slug, title, description, order_val):
    L('{')
    push_indent()
    IL(f'slug: "{slug}",')
    IL(f'title: "{title}",')
    IL(f'description:')
    IL(f'  "{description}",')
    IL(f'order: {order_val},')
    IL('subtopics: [')
    push_indent()

def end_topic():
    pop_indent()
    IL('],')
    pop_indent()
    L('},')

def start_subtopic(slug, title, order_val):
    L('{')
    push_indent()
    IL(f'slug: "{slug}",')
    IL(f'title: "{title}",')
    IL(f'order: {order_val},')
    IL('content: {')
    push_indent()

def end_content():
    pop_indent()
    IL('},')

def close_subtopic():
    pop_indent()
    L('},')

def content_field(field_name, value):
    """Add a content field like 'overview: "text",'"""
    # For content fields, indent is currently at subtopic content level
    IL(f'{field_name}:')
    IL(f'{js_str(value)},')

def add_quiz(questions):
    IL('quiz: [')
    push_indent()
    for q in questions:
        q_json = json.dumps(q, ensure_ascii=False)
        IL(f'{q_json},')
    pop_indent()
    IL('],')

def add_faang(questions):
    IL('faangQuestions: [')
    push_indent()
    for q in questions:
        q_json = json.dumps(q, ensure_ascii=False)
        IL(f'{q_json},')
    pop_indent()
    IL('],')

def add_challenges(challenges):
    IL('codingChallenges: [')
    push_indent()
    for c in challenges:
        c_json = json.dumps(c, ensure_ascii=False)
        IL(f'{c_json},')
    pop_indent()
    IL('],')

# ============================================================
# TOPIC 1: CSS Basics
# ============================================================
start_topic('css-basics', 'CSS Basics',
    'Learn the core building blocks of CSS - selectors, colors, units, the box model, and display fundamentals', 1)

# --- Subtopic 1.1: Selectors ---
start_subtopic('selectors', 'Selectors', 1)
content_field('overview', 'CSS selectors are patterns used to select and style HTML elements. They are the bridge between your HTML structure and CSS rules, determining which elements receive which styles.')
content_field('problemStatement', 'Without selectors, there would be no way to target specific elements on a page for styling. You would have to apply the same styles to everything or resort to inline styles, making code repetitive, unmaintainable, and impossible to scale.')
content_field('intuitionFirst', 'Think of CSS selectors like an addressing system. Just as a postal address narrows down from country to street to house number, selectors narrow down from all elements on a page to a very specific one. The more specific your selector, the more precisely you can target what to style.')
content_field('realLifeAnalogy', 'CSS selectors are like a restaurant reservation system. A type selector (div) is like saying "a customer" - too vague. A class selector (.VIP) is like saying "any VIP customer". An ID selector (#table5) is like saying "the specific party at table 5".')
content_field('visualExplanation', '  +----------+       Selector Match\n  | <html>   |       div -> matches ALL <div>\n  |  + <div>  |      .box -> matches ANY class="box"\n  |  | + <p>  |      #id -> matches ONE element\n  |  | + <p>  |      div > p -> direct child <p> of <div>\n  |  + <div>  |      div + p -> <p> immediately after <div>\n  +----------+')
content_field('howItWorks', 'The browser\'s CSS engine reads selectors from right to left. For "div p.highlight", the engine first finds all elements with class "highlight" that are <p>, then filters to only those inside a <div>. This right-to-left matching is more efficient because it reduces the candidate set early. Selectors have different specificity weights: inline styles (1000), IDs (100), classes/attributes/pseudo-classes (10), elements/pseudo-elements (1). When multiple selectors match, the one with highest specificity wins.')
content_field('beginnerExample', '/* Type selector */\np { color: blue; }\n\n/* Class selector */\n.highlight { background: yellow; }\n\n/* ID selector */\n#header { font-size: 24px; }\n\n/* Descendant selector */\ndiv p { line-height: 1.6; }\n\n/* Child selector */\nul > li { list-style: square; }\n\n/* Attribute selector */\ninput[type="text"] { border: 1px solid gray; }')
content_field('commonMistakes', 'Overusing IDs for styling (they have the highest specificity and are hard to override), making selectors too deep (e.g., div.container > ul.list > li.item > a.link), relying on !important instead of fixing specificity, and overusing the universal selector * in performance-critical animations.')
content_field('bestPractices', 'Prefer classes over IDs for styling, keep selectors shallow (2-3 levels deep max), use meaningful class names (BEM methodology), avoid !important, and leverage specificity intentionally rather than fighting it.')
content_field('performanceNotes', 'The universal selector (*) and descendant selectors with many levels are the slowest for browsers to evaluate. Browsers optimize well for common selectors, but extremely complex selectors can cause style recalculation delays in large DOMs, especially during JavaScript-triggered layout changes.')
content_field('codingExamples', '/* Specificity examples - each is more specific than the last */\np { color: black; }           /* specificity: 1 */\n.highlight { color: red; }    /* specificity: 10 */\n#banner { color: green; }     /* specificity: 100 */')
end_content()

add_quiz([
    {"id": "css-selectors-1", "question": "What is the specificity of a class selector?", "options": ["10", "1", "100", "0"], "correctIndex": 0, "explanation": "Class selectors have a specificity weight of 10.", "difficulty": "easy"},
    {"id": "css-selectors-2", "question": "How does the browser's CSS engine read selectors for matching?", "options": ["Right to left", "Left to right", "Top to bottom", "Random based on specificity"], "correctIndex": 0, "explanation": "The CSS engine reads selectors from right to left for efficiency.", "difficulty": "medium"},
    {"id": "css-selectors-3", "question": "Given <div class='box' id='main'>, which selector has the highest specificity?", "options": ["#main { color: red; }", ".box { color: blue; }", "div { color: green; }", "div.box { color: yellow; }"], "correctIndex": 0, "explanation": "The ID selector #main has specificity 100, which beats class (10) and element (1) selectors.", "difficulty": "hard"},
])
add_faang([
    {"question": "Explain the CSS cascade algorithm in detail. How does specificity, source order, and importance interact to determine which styles apply?", "answer": "The cascade algorithm has 4 steps: 1) Collect all CSS declarations from all sources (author stylesheets, user stylesheets, browser defaults). 2) Sort by origin and importance: !important declarations trump normal ones; within importance, author > user > browser. 3) Sort by specificity: inline styles (1000) > IDs (100) > classes/pseudo-classes/attributes (10) > elements/pseudo-elements (1). 4) If two declarations have the same specificity, the one that appears later in the source order wins.", "difficulty": "hard", "company": "Google"},
    {"question": "How do CSS pseudo-classes like :is(), :where(), :not(), and :has() differ in specificity behavior? Why were these designed this way?", "answer": ":is() and :not() take the specificity of their most specific argument. :where() always has zero specificity. :has() follows the same rule as :is(). This design allows developers to intentionally choose specificity behavior: use :where() for reset/normalize styles that should be easy to override, use :is() when you need the specificity of the most specific argument.", "difficulty": "expert", "company": "Meta"},
])
add_challenges([
    {"title": "CSS Selector Specificity Calculator", "description": "Create an HTML page where users can input a CSS selector and see its specificity breakdown (inline, ID, class, element counts). Support compound selectors like div.class#id and multiple selectors separated by commas.", "difficulty": "medium", "solutionHint": "Parse selector by counting IDs (#), classes (.), pseudo-classes (:), attributes ([]), and elements. Split on combinators (>, +, ~, space) first."},
])
close_subtopic()

# --- Subtopic 1.2: Colors ---
start_subtopic('colors', 'Colors', 2)
content_field('overview', 'CSS offers multiple ways to specify colors: named colors, hexadecimal notation, RGB, RGBA, HSL, HSLA, and modern color spaces like OKLCH, LAB, and color(). Each method serves different use cases and offers different advantages.')
content_field('problemStatement', 'Before standardized color systems, representing colors consistently across browsers was unreliable. Early CSS only had about 16 named colors, making fine-grained design control impossible.')
content_field('intuitionFirst', 'Think of color functions as different color-mixing philosophies. Hex and RGB are like mixing paint by numbers (combining red, green, blue channels). HSL describes color by hue (the pure color), saturation (intensity), and lightness (brightness vs darkness), which is more intuitive for humans.')
content_field('realLifeAnalogy', 'Named colors are like Crayola crayons - familiar but very limited. Hex codes are like precise GPS coordinates for colors. HSL is like giving directions: "turn left at red (hue), go very red (saturation), but make it a bit dimmer (lightness)".')
content_field('visualExplanation', '  Color Spaces Comparison\n  +-----------+------------------------+\n  | Hex      | #FF5733               |\n  | RGB      | rgb(255, 87, 51)     |\n  | HSL      | hsl(10, 100%, 60%)   |\n  | OKLCH    | oklch(0.628, 0.257, 29.234) |\n  +-----------+------------------------+\n  Each representation describes the same orange-red differently.')
content_field('howItWorks', 'The browser parses color strings using the CSS Color parsing algorithm. Hex values undergo a conversion to RGB: each pair of hex digits (FF, 57, 33) is converted to decimal (255, 87, 51). HSL converts to RGB using mathematical formulas involving hue angle (0-360 deg), saturation (0-100%), and lightness (0-100%). The alpha channel is composited during the painting phase by blending the color with the background.')
content_field('beginnerExample', '/* Named colors */\ncolor: red;\ncolor: transparent;\n\n/* Hexadecimal */\ncolor: #ff0000;\ncolor: #f00;  /* shorthand */\ncolor: #ff000080;  /* 8-digit hex with alpha */\n\n/* RGB / RGBA */\ncolor: rgb(255, 0, 0);\ncolor: rgba(255, 0, 0, 0.5);\n\n/* HSL / HSLA */\ncolor: hsl(0, 100%, 50%);\ncolor: hsla(0, 100%, 50%, 0.3);\n\n/* Modern */\ncolor: oklch(0.628, 0.257, 29.234);')
content_field('commonMistakes', 'Using hex codes without alpha when transparency is needed (use rgba/hsla or 8-digit hex), hardcoding color values instead of using CSS custom properties, ignoring accessibility contrast guidelines, and using too many similar color shades.')
content_field('bestPractices', 'Use HSL for human-readable and easily modifiable colors, use CSS custom properties for theme color palettes, ensure WCAG AA contrast ratio of 4.5:1 for normal text and 3:1 for large text (18px+ bold or 24px+ regular).')
content_field('performanceNotes', 'Modern color functions (oklch, color()) have negligible performance difference vs hex/RGB in modern browsers. Pre-2020 browsers may have slower parsing for modern color functions, but the difference is imperceptible in practice.')
content_field('codingExamples', ':root {\n  --primary: hsl(210, 100%, 50%);\n  --primary-light: hsl(210, 100%, 70%);\n  --primary-dark: hsl(210, 100%, 30%);\n}\n\n.button {\n  background: var(--primary);\n  color: white;\n  border: 2px solid var(--primary-dark);\n}\n\n.button:hover {\n  background: var(--primary-light);\n}')
end_content()

add_quiz([
    {"id": "css-colors-1", "question": "What does the alpha channel in RGBA control?", "options": ["Transparency level (0 = fully transparent, 1 = fully opaque)", "Hue angle", "Saturation percentage", "Color temperature"], "correctIndex": 0, "explanation": "The alpha channel controls opacity from 0 (fully transparent) to 1 (fully opaque).", "difficulty": "easy"},
    {"id": "css-colors-2", "question": "What is the main advantage of HSL over RGB for designers?", "options": ["Easier to adjust lightness/darkness intuitively", "Supports 16 million more colors", "Faster browser parsing", "Automatically meets WCAG contrast requirements"], "correctIndex": 0, "explanation": "HSL separates hue, saturation, and lightness into independent axes, making brightness adjustments intuitive.", "difficulty": "medium"},
    {"id": "css-colors-3", "question": "What is the minimum WCAG AA contrast ratio required for normal body text?", "options": ["4.5:1", "3:1", "7:1", "2:1"], "correctIndex": 0, "explanation": "WCAG AA requires a contrast ratio of 4.5:1 for normal-sized text and 3:1 for large text.", "difficulty": "hard"},
])
add_faang([
    {"question": "How does the OKLCH color space improve upon RGB and HSL for design systems? What makes it perceptually uniform?", "answer": "OKLCH is perceptually uniform: numerically equal changes produce visually equal changes across the entire spectrum. HSL has non-uniform lightness (yellows appear lighter, blues appear darker at the same lightness value). OKLCH models human vision more accurately by using the Oklab color space which accounts for how cone cells in the human eye perceive color differences.", "difficulty": "hard", "company": "Stripe"},
    {"question": "How does the CSS color-mix() function work? Give three practical use cases with examples.", "answer": "color-mix(in <colorspace>, <color1>, <color2> [percentages]) blends two colors in a specified color space. Use cases: 1) Generating hover states: color-mix(in srgb, var(--primary), black 20%). 2) Creating brand variants without extra CSS variables. 3) Implementing dark mode by mixing with white/black at different percentages.", "difficulty": "medium", "company": "Adobe"},
])
add_challenges([
    {"title": "Color Space Converter", "description": "Build an interactive tool that converts colors between hex, RGB, and HSL formats in real time as the user types in any format.", "difficulty": "medium", "solutionHint": "Parse hex/RGB/HSL input with regex, convert using standard formulas (e.g., hex to RGB, RGB to HSL algorithm), update all output fields on any input change."},
    {"title": "WCAG Contrast Checker", "description": "Create an interactive tool that shows the contrast ratio between a foreground and background color, indicating if it passes WCAG AA and AAA at both normal and large text sizes.", "difficulty": "hard", "solutionHint": "Use the relative luminance formula: L = 0.2126*R + 0.7152*G + 0.0722*B. Contrast ratio = (L1 + 0.05) / (L2 + 0.05). AA: 4.5:1 normal, 3:1 large. AAA: 7:1 normal, 4.5:1 large."},
])
close_subtopic()

# --- Subtopic 1.3: CSS Units ---
start_subtopic('css-units', 'CSS Units', 3)
content_field('overview', 'CSS provides a variety of units: absolute units (px, pt, cm, in, mm, pc, Q) and relative units (%, em, rem, vw, vh, vmin, vmax, ch, ex, lh, and newer viewport variants dvw/dvh/svw/svh/lvw/lvh, plus container query units cqw/cqh/cqi/cqb/cqmin/cqmax). Understanding when to use each is crucial for building responsive, accessible designs.')
content_field('problemStatement', 'Fixed-size designs break on different screen sizes. Using absolute units everywhere leads to layouts that overflow small screens or look tiny on large ones. Using relative units incorrectly can cause unexpected behavior.')
content_field('intuitionFirst', 'Think of CSS units like measurement tools in real life. Inches and centimeters are absolute (like px) - they stay the same everywhere. Percentages are like fractions of a container. em and rem are like setting font size relative to a baseline text size.')
content_field('realLifeAnalogy', 'CSS units are like ordering drinks at different venues: vw/vh is like filling any glass to the brim (viewport-relative). Percentage is like dividing a pizza among friends (parent-relative). rem is like having a standard shot glass that everyone uses (root font-size). em is like a cup size that varies by restaurant (parent-relative).')
content_field('visualExplanation', '  +---------------------------+\n  | Viewport (100vw x 100vh)  |\n  |                           |\n  |  +---------+  50vw wide  |\n  |  | 50%     | = half of  |\n  |  | of      | the parent |\n  |  | parent  | = 25vw     |\n  |  +---------+             |\n  |  1rem = root font-size  |\n  +---------------------------+')
content_field('howItWorks', 'Absolute units are fixed: 1px = 1/96th of an inch (on standard screens). Relative units are computed relative to something else: em is relative to the parent element\'s font-size, rem is relative to the root (<html>) font-size, vw equals 1% of viewport width, vh equals 1% of viewport height, % is relative to the parent element\'s matching CSS property. Container query units (cqw, cqh, etc.) are relative to the nearest container\'s size (defined with container-type or container properties).')
content_field('beginnerExample', '/* Absolute */\n.box { width: 200px; border: 1px solid black; }\n\n/* Relative to parent */\n.child { width: 50%; }  /* 50% of parent width */\n\n/* Relative to font-size */\n.text { font-size: 2rem; }  /* 2x root font-size */\n.margin { margin: 1em; }    /* 1x current font-size */\n\n/* Relative to viewport */\n.hero { height: 100vh; }  /* full viewport height */\n.sidebar { width: 30vw; } /* 30% of viewport width */\n\n/* Relative to character width */\n.article { max-width: 80ch; }  /* 80 characters wide */')
content_field('commonMistakes', 'Using em for font-size in deeply nested elements causes compounding (unexpected larger sizes), using px for everything breaks responsiveness, using vw for font-sizes without min/max clamping causes text to be too small on narrow screens.')
content_field('bestPractices', 'Use rem for typography (respects user font-size preferences), % for layout widths, vw/vh for full-screen hero sections, px for borders and small decorative elements, clamp() for responsive font-sizes that need min/max boundaries.')
content_field('performanceNotes', 'Computing relative units can cause minor layout recalculations, but modern browser engines handle this efficiently. Container units may trigger recalculation when the container size changes, but this is well-optimized.')
content_field('codingExamples', ':root { font-size: 16px; }\n\n.card {\n  width: min(90%, 400px);\n  padding: 1.5rem;\n  font-size: clamp(1rem, 2.5vw, 1.5rem);\n}\n\n/* Visual: nested em compounding */\n/* div { font-size: 1.5em; } -> 1.5x parent */\n/*   div { font-size: 1.5em; } -> 1.5x of 1.5em = 2.25x root */')
end_content()

add_quiz([
    {"id": "css-units-1", "question": "What does the CSS unit 'rem' stand for and what is it relative to?", "options": ["Root em - relative to the <html> element's font-size", "Relative em - relative to parent font-size", "Regular em - relative to body font-size", "Responsive em - relative to viewport size"], "correctIndex": 0, "explanation": "rem (root em) is always relative to the root element's (<html>) font-size, not the parent.", "difficulty": "easy"},
    {"id": "css-units-2", "question": "What problem can occur when using em for font-size in deeply nested elements?", "options": ["Compounding effect - each nested level multiplies the size", "em cannot be used for font-size property", "em only works on width and height", "It causes an infinite loop in CSS parsing"], "correctIndex": 0, "explanation": "em compounds: if a parent has font-size: 1.5em (relative to its parent), a child with font-size: 1.5em becomes 2.25x the root size.", "difficulty": "medium"},
    {"id": "css-units-3", "question": "What does the CSS clamp() function do and why is it useful for responsive typography?", "options": ["Clamps a value between a minimum and maximum range based on a preferred value", "Clamps elements to stay within the viewport", "Removes whitespace around elements", "Fixes aspect ratio of elements"], "correctIndex": 0, "explanation": "clamp(MIN, VAL, MAX) ensures a value stays between MIN and MAX, with VAL as the preferred value. It's perfect for fluid typography that scales with viewport but has limits.", "difficulty": "medium"},
])
add_faang([
    {"question": "Explain the difference between viewport units (vw/vh), dynamic viewport units (dvw/dvh), small viewport units (svw/svh), and large viewport units (lvw/lvh). When would you use each?", "answer": "Standard vw/vh use the initial containing block (viewport size). dvw/dvh use the dynamic viewport, which accounts for mobile browser toolbars expanding and collapsing in real time. svw/svh use the smallest possible viewport (toolbars expanded). lvw/lvh use the largest possible viewport (toolbars retracted). Use dvh for mobile layouts to prevent layout jumps when toolbars appear/disappear. Use svh for elements that must always fit on screen. Use lvh for desktop-optimized designs.", "difficulty": "expert", "company": "Apple"},
    {"question": "How do container query units (cqw, cqh, cqi, cqb) differ from viewport units? Implement a component that uses them.", "answer": "Container query units are relative to the nearest container's size (defined with container-type or container properties), not the viewport. cqw = 1% of container width, cqh = 1% of container height, cqi = 1% of container inline size, cqb = 1% of container block size. Use case: a card component that sizes its font relative to the available container space, making it responsive regardless of where it's placed.", "difficulty": "hard", "company": "Microsoft"},
])
add_challenges([
    {"title": "Responsive Type Scale Generator", "description": "Create a tool that generates a responsive type scale using clamp() and rem units. Take a base size (e.g., 16px) and scale ratio (e.g., 1.25) as inputs, then generate h1-h6 and body styles with fluid sizing.", "difficulty": "medium", "solutionHint": "Use clamp(minSize, preferredSize + viewportUnits, maxSize). Generate each heading level by multiplying base by ratio^level. Use viewport units as the preferred value for fluid scaling."},
])
close_subtopic()

# --- Subtopic 1.4: Box Model ---
start_subtopic('box-model', 'Box Model', 4)
content_field('overview', 'The CSS box model is the foundation of every element on a web page. Every element is a rectangular box consisting of: content, padding, border, and margin. Understanding how these layers interact and how box-sizing affects dimensions is essential for building reliable layouts.')
content_field('problemStatement', 'Without understanding the box model, adding padding or border to an element unexpectedly changes its total width, breaking layouts and causing horizontal scrollbars on pages.')
content_field('intuitionFirst', 'Imagine an element as a framed picture hanging on a wall. The actual picture is the content. The mat board around it is the padding. The picture frame is the border. The space between this frame and neighboring frames on the wall is the margin.')
content_field('realLifeAnalogy', 'The box model is like shipping a gift: the item itself is the content. The bubble wrap is the padding (inside the box, protecting the item). The cardboard box is the border (the visible boundary). The empty space between this box and other boxes in the truck is the margin (outside the box).')
content_field('visualExplanation', '  +-- Margin (transparent) --------------------+\n  |  +-- Border (visible) ----------------+    |\n  |  |  +-- Padding (background) ------+  |    |\n  |  |  |   Content                   |  |    |\n  |  |  |   [text / image]            |  |    |\n  |  |  +------------------------------+  |    |\n  |  +-----------------------------------+    |\n  +-------------------------------------------+')
content_field('howItWorks', 'The browser renders each element as a rectangular box. With box-sizing: content-box (default), the width property only sets the content width. Total width = width + padding-left + padding-right + border-left + border-right. With box-sizing: border-box, width includes content + padding + border. Margin is always outside and never included in the computed width - it creates space between elements and can collapse vertically between adjacent block elements.')
content_field('beginnerExample', '.box {\n  width: 200px;\n  padding: 20px;\n  border: 5px solid black;\n  margin: 10px;\n  background: lightblue;\n}\n\n/* Content-box (default): */\n/* Total width = 200 + 20*2 + 5*2 = 250px */\n\n/* Same box with border-box: */\n.box {\n  box-sizing: border-box;\n  /* Total width = 200px (content shrinks to 150px) */\n}\n\n/* Margin collapsing */\nh1 { margin-bottom: 30px; }\nh2 { margin-top: 20px; }\n/* Vertical gap between h1 and h2 = 30px, NOT 50px */')
content_field('commonMistakes', 'Not setting box-sizing: border-box globally, forgetting that outline does not take up space (it overlays), assuming padding and border add to the set width (they do with content-box but not with border-box), confusing margin with padding (margin is outside the border, padding is inside).')
content_field('bestPractices', 'Set box-sizing: border-box on all elements (*, *::before, *::after { box-sizing: border-box; }). Use margin for spacing between elements, use padding for spacing inside elements. Be aware of margin collapsing. Avoid negative margins when possible.')
content_field('performanceNotes', 'The box model calculation is fundamental and has negligible performance impact. Changing box-sizing on an element triggers a layout recalculation, but this is a one-time cost per element change.')
content_field('codingExamples', '*, *::before, *::after {\n  box-sizing: border-box;\n}\n\n.card {\n  width: 300px;\n  padding: 1.5rem;\n  border: 2px solid #333;\n  margin: 1rem;\n}\n\n/* Prevent margin collapse between children */\n.container { display: flow-root; }')
end_content()

add_quiz([
    {"id": "css-boxmodel-1", "question": "What is the total width of an element with width: 100px, padding: 10px, border: 5px solid, using the default box-sizing (content-box)?", "options": ["130px", "100px", "120px", "115px"], "correctIndex": 0, "explanation": "Total width = 100 (content) + 10*2 (padding left+right) + 5*2 (border left+right) = 130px.", "difficulty": "easy"},
    {"id": "css-boxmodel-2", "question": "What is the key difference between margin and padding in the CSS box model?", "options": ["Margin is outside the border (transparent gap), padding is inside the border (shows element background)", "Padding is outside the border, margin is inside the border", "They are the same thing with different defaults", "Margin adds to border width, padding adds to content size"], "correctIndex": 0, "explanation": "Margin creates transparent space outside the border between elements. Padding creates space inside the border between the content and the border, and shows the element's background color.", "difficulty": "medium"},
    {"id": "css-boxmodel-3", "question": "What is margin collapsing in CSS? When does it occur?", "options": ["Vertical margins of adjacent block elements collapse into the larger of the two margins", "Margins disappear entirely when elements are next to each other", "Vertical and horizontal margins both collapse", "Margins add together between sibling elements"], "correctIndex": 0, "explanation": "Vertical margins of adjacent block-level elements collapse: the margin between them equals the larger of the two, not their sum. Horizontal margins never collapse.", "difficulty": "hard"},
])
add_faang([
    {"question": "Explain margin collapsing in CSS in detail. List all specific cases where margins collapse and how negative margins interact.", "answer": "Margins collapse in three cases: 1) Adjacent siblings - the bottom margin of the top element and top margin of the bottom element collapse. 2) Parent and first/last child - when no border, padding, or inline content separates them, the parent's margin collapses with the child's. 3) Empty blocks - all margins of an empty block collapse. The resulting margin equals the max of the positive margins minus the sum of absolute values of negative margins. Only vertical margins collapse (block direction).", "difficulty": "hard", "company": "Google"},
    {"question": "How does the CSS box-model interact with scrollable overflow? Which parts of the box are included in the scrollable area?", "answer": "The scrollable overflow area includes the content area and padding. Borders and margins are outside the scroll area - they remain visible and fixed while content scrolls. This means scrollbars cover content and padding but never borders or margins, ensuring the visual border always stays intact.", "difficulty": "expert", "company": "Microsoft"},
])
add_challenges([
    {"title": "Box Model Visualizer", "description": "Build an interactive visualization of the CSS box model. Use sliders to adjust width, padding, border-width, and margin. Show each layer with distinct colors (content=blue, padding=green, border=yellow, margin=transparent) and display computed total dimensions.", "difficulty": "medium", "solutionHint": "Use nested divs for each layer. The innermost div is content. Wrap with padding div (background color shows), then border div (with actual border), then margin div (transparent, use outline or box-shadow for visualization). Display formulas."},
])
close_subtopic()

# --- Subtopic 1.5: Display and Positioning ---
start_subtopic('display-positioning', 'Display and Positioning', 5)
content_field('overview', 'The display and position properties control how elements are laid out on the page. Display determines whether an element is block, inline, inline-block, or participates in a layout context like flex or grid. Position determines how elements are placed relative to their normal position, their parent, or the viewport.')
content_field('problemStatement', 'By default, all elements follow normal document flow (block elements stack vertically, inline elements flow horizontally). To create complex layouts, overlapping elements, fixed headers, or side-by-side content, you must override these defaults.')
content_field('intuitionFirst', 'Think of the document flow like water flowing down a river. Block elements are like large barges taking the full width. Inline elements are like small boats that can fit side by side. Changing position is like pulling a boat out of the water and placing it anywhere you want - on the riverbank, in the air, or even glued to your glasses.')
content_field('realLifeAnalogy', 'Display types are like furniture arrangements: block = a large sofa that takes up a whole wall. Inline = a small chair that can share space with other chairs. inline-block = a narrow table that can sit between chairs but still has a defined shape. Position values: static = normal placement. relative = shifted but still reserving its original space. absolute = removed from the room entirely and placed freely. fixed = glued to your field of view. sticky = starts like normal furniture but sticks to you when you move past it.')
content_field('visualExplanation', '  Display Modes\n  +-- Block ------------------------+\n  |  Takes full available width     |\n  |  New line before and after      |\n  +--------------------------------+\n  +-- Inline ---+  +-- Inline ----+\n  | Fits within |  | text flow    |\n  | line        |  | same line    |\n  +-------------+  +-------------+\n  +-- Inline-Block ----------------+\n  | Inline flow, block-like box   |\n  | Can set width and height      |\n  +-------------------------------+')
content_field('howItWorks', 'The browser performs layout by determining geometric properties of each element. display:block creates a block formatting context (BFC) - the element takes full available width and starts on a new line. display:inline flows content horizontally within a line box, ignoring width/height. display:inline-block flows inline but respects width/height. position:relative offsets from the element\'s normal position using top/right/bottom/left. position:absolute removes the element from normal flow and positions relative to the nearest positioned ancestor. position:fixed positions relative to the viewport. position:sticky toggles between relative and fixed based on scroll position.')
content_field('beginnerExample', '/* Display values */\n.block { display: block; }      /* full width, new line */\n.inline { display: inline; }    /* flows in text */\n.inline-block { display: inline-block; }  /* inline but with box */\n.none { display: none; }        /* removed from layout */\n\n/* Position values */\n.relative { position: relative; top: 10px; left: 10px; }\n.absolute { position: absolute; top: 0; right: 0; }\n.fixed { position: fixed; bottom: 0; width: 100%; }\n.sticky { position: sticky; top: 0; }\n\n/* Z-index stacking */\n.modal { position: absolute; z-index: 100; }')
content_field('commonMistakes', 'Using absolute positioning when flexbox or grid would be more appropriate, forgetting to set position:relative on the parent when using absolute children, using z-index without setting a position value (z-index only works on positioned elements), hiding elements with display:none when visibility:hidden is semantically correct.')
content_field('bestPractices', 'Use flexbox/grid for 1D/2D layouts instead of absolute positioning in most cases. Use position:relative sparingly (mostly as a positioning context for absolute children). Use position:fixed and sticky only for UI chrome (headers, modals, tooltips). Keep z-index values organized with a system (e.g., increments of 10 or 100).')
content_field('performanceNotes', 'position:fixed and position:sticky can create new containing blocks and stacking contexts. Overusing position:absolute can complicate accessibility (visual order may not match DOM order). display:none elements are not rendered at all; visibility:hidden elements are rendered but invisible (they still take up layout space).')
content_field('codingExamples', '/* Creating a stacking context */\n.header {\n  position: relative;\n  z-index: 10;\n}\n\n/* Fixed sidebar */\n.sidebar {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 250px;\n  height: 100vh;\n}\n\n/* Sticky section headers */\n.section-title {\n  position: sticky;\n  top: 0;\n  background: white;\n  z-index: 1;\n}')
end_content()

add_quiz([
    {"id": "css-display-1", "question": "What is the difference between display:none and visibility:hidden?", "options": ["display:none removes element from layout entirely; visibility:hidden hides it visually but preserves its layout space", "visibility:hidden removes from layout; display:none hides but keeps space", "They are identical in behavior", "display:none is for accessibility, visibility:hidden is for visual only"], "correctIndex": 0, "explanation": "display:none removes the element from the document flow entirely (not rendered). visibility:hidden hides it visually but preserves its layout space (still occupies space in the flow).", "difficulty": "easy"},
    {"id": "css-display-2", "question": "What does position:absolute position an element relative to?", "options": ["The nearest ancestor with a position value other than static", "The viewport", "The document root element (<html>)", "The direct parent element always"], "correctIndex": 0, "explanation": "Absolute positioning is relative to the nearest ancestor that has a position value of relative, absolute, fixed, or sticky. If none exists, it's relative to the initial containing block (<html>).", "difficulty": "medium"},
    {"id": "css-display-3", "question": "How does position:sticky behave differently from position:fixed?", "options": ["Sticky toggles between relative and fixed based on scroll position; fixed is always viewport-relative", "Sticky is always relative to the parent; fixed is viewport-relative", "They behave identically", "Fixed requires JavaScript to work; sticky is pure CSS"], "correctIndex": 0, "explanation": "Sticky acts as relative positioning normally, but switches to fixed positioning when the element reaches a defined scroll threshold (top, bottom, etc.).", "difficulty": "hard"},
])
add_faang([
    {"question": "What is a stacking context in CSS? List all properties that can create a new stacking context.", "answer": "A stacking context is a conceptual layer that groups elements with a common z-axis ordering. It is created by: position with z-index value (not auto), opacity < 1, transform (not none), filter (not none), perspective (not none), clip-path (not none), mask / mask-image (not none), mix-blend-mode (not normal), isolation: isolate, will-change with any of the above, contain: paint/style/layout, and -webkit-overflow-scrolling: touch. Each stacking context is independent - elements inside cannot interleave with elements outside.", "difficulty": "hard", "company": "Google"},
    {"question": "Explain the differences between block formatting context (BFC), inline formatting context (IFC), and flex formatting context. When does each apply?", "answer": "BFC: block-level boxes stacked vertically, margins collapse, floats are contained. Created by overflow:hidden, display:flow-root, float, etc. IFC: inline boxes flow horizontally, wrapping to multiple lines, text-align and vertical-align apply. Created by display:inline(-block). Flex formatting context: flex items arranged in main/cross axis direction, no margin collapsing, alignment properties. Each formatting context has its own layout rules and isolates its children from external layout influences.", "difficulty": "expert", "company": "Meta"},
])
add_challenges([
    {"title": "Build a Sticky Notes Dashboard", "description": "Create a dashboard page with: a fixed header at the top, sticky section headers that remain visible while scrolling through content, a modal overlay with absolute positioning, and inline-block cards arranged in a grid. Demonstrate understanding of all positioning types.", "difficulty": "hard", "solutionHint": "Use position:fixed for main header, position:sticky for section titles (with top: 0), position:absolute with z-index:100 for the modal, and display:inline-block or flex for the card grid."},
])
close_subtopic()

# Close CSS Basics topic (leave topics array open for append script)
end_topic()

# Write the file (without closing topics array or export)
content = '\n'.join(output) + '\n'

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Written {len(content)} bytes ({len(output)} lines) to {path}")

