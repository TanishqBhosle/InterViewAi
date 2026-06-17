import type { SubjectData } from "./types";

export const htmlSubject: SubjectData = {
  slug: "html",
  title: "HTML",
  description:
    "Master the foundation of the web - from document structure to semantic markup, forms, media, and accessibility",
  icon: "FileCode",
  color: "text-orange-500",
  order: 1,
  topics: [
    {
      slug: "html-fundamentals",
      title: "HTML Fundamentals",
      description:
        "Understand the core foundation of HTML - what it is, how documents are structured, and why semantics matter",
      order: 1,
      subtopics: [
        {
          slug: "what-is-html",
          title: "What is HTML",
          order: 1,
          content: {
            overview:
              "HTML (HyperText Markup Language) is the standard language for creating web pages and web applications. It describes the structure of a web page semantically using a system of tags and attributes.",
            problemStatement:
              "Before HTML, there was no standardized way to structure and share documents across different computer systems. Researchers needed a method to link related documents and present information in a structured, universal format that any machine could interpret.",
            intuitionFirst:
              "Think of HTML as the skeleton of a web page. Just as your skeleton gives your body structure, shape, and support, HTML gives a webpage its fundamental layout and organization. CSS adds the skin and clothes (styling), and JavaScript adds the muscles and brain (interactivity).",
            realLifeAnalogy:
              "Building a webpage with HTML is like building a house. HTML provides the framework - walls, rooms, floors. CSS is the interior design - paint colors, furniture style, wallpaper. JavaScript is the electricity and plumbing - making things work and respond. Without the framework (HTML), you just have a pile of materials with no structure.",
            howItWorks:
              "HTML works through a system of tags enclosed in angle brackets (< >). Most tags come in pairs: an opening tag like <p> and a closing tag like </p>. The browser reads the HTML file, parses the tags, and renders the content according to the Document Object Model (DOM) - a tree-like representation of the page structure. Each tag tells the browser what type of content it contains and how it relates to other content.",
            beginnerExplanation:
              "When you write HTML, you are essentially creating a set of instructions for the browser. The browser reads these instructions and displays your content accordingly. It's like giving stage directions for a play - you tell the actors (browser) where to stand, what to say, and how to interact with props (images, links, etc.).",
            beginnerExample:
              '<!DOCTYPE html>\n<html>\n<head>\n  <title>My First Page</title>\n</head>\n<body>\n  <h1>Hello, World!</h1>\n  <p>This is my first HTML page.</p>\n</body>\n</html>',
            commonMistakes:
              "Forgetting to close tags (e.g., <p> without </p>), using deprecated tags like <font> or <center>, using excessive <div> elements instead of semantic tags, and not using proper nesting (e.g., putting a <p> inside a <ul> directly).",
            bestPractices:
              "Always use semantic HTML5 tags, close all tags properly, use lowercase for tag names, indent your code for readability, validate your HTML with the W3C Validator, and separate structure (HTML) from presentation (CSS) and behavior (JS).",
          },
          quiz: [
            {
              id: "html-what-1",
              question: "What does HTML stand for?",
              options: [
                "HyperText Markup Language",
                "HighText Machine Language",
                "HyperText Markdown Language",
                "Home Tool Markup Language",
              ],
              correctIndex: 0,
              explanation:
                "HTML stands for HyperText Markup Language. HyperText refers to the ability to link between documents, and Markup Language means it uses tags to annotate text.",
              difficulty: "easy",
            },
            {
              id: "html-what-2",
              question:
                "Which of the following best describes the role of HTML in web development?",
              options: [
                "It defines the structure and content of a web page",
                "It controls the visual styling and layout of a web page",
                "It handles user interactions and dynamic behavior",
                "It manages server-side data processing",
              ],
              correctIndex: 0,
              explanation:
                "HTML is responsible for defining the structure and content of a web page. CSS handles styling, and JavaScript handles interactivity.",
              difficulty: "easy",
            },
            {
              id: "html-what-3",
              question:
                "In the HTML document tree (DOM), what is the relationship between <html> and <body>?",
              options: [
                "<body> is a child of <html>",
                "<html> is a child of <body>",
                "They are sibling elements",
                "<body> and <html> are unrelated",
              ],
              correctIndex: 0,
              explanation:
                "In the DOM tree, <html> is the root element, and <body> is a direct child (along with <head>). This parent-child relationship defines the document hierarchy.",
              difficulty: "medium",
            },
          ],
          faangQuestions: [
            {
              question:
                "How does the browser parse HTML and construct the DOM? Explain the critical rendering path.",
              answer:
                "The browser parses HTML sequentially from top to bottom. The HTML parser tokenizes the raw bytes into tags, attributes, and text. It builds the DOM tree node by node. When it encounters external resources like CSS (blocking) or scripts (blocking unless async/defer), it pauses parsing. The DOM construction is intertwined with CSSOM construction. Together they form the render tree, which goes through layout (reflow) and paint phases. Modern browsers use speculative parsing to look ahead for resource loading while the main parser is blocked.",
              difficulty: "hard",
              company: "Google",
            },
            {
              question:
                "What is the difference between a tag, an element, and an attribute in HTML?",
              answer:
                "A tag is the markup syntax itself, e.g., <div>, </div>. An element includes the opening tag, content, and closing tag, e.g., <div>Hello</div>. An attribute provides additional information about an element, placed inside the opening tag, e.g., <div class='container'>. All attributes have a name and a value. Some attributes are boolean (like disabled) and don't require a value.",
              difficulty: "easy",
              company: "Amazon",
            },
          ],
          codingChallenges: [],
        },
        {
          slug: "structure-of-html-document",
          title: "Structure of HTML Document",
          order: 2,
          content: {
            overview:
              "An HTML document follows a specific hierarchical structure that every browser expects. The structure consists of a DOCTYPE declaration followed by the <html> root element, which contains <head> and <body> sections.",
            problemStatement:
              "Without a standardized document structure, browsers would have no reliable way to interpret and render web pages. Different browsers might display the same content differently, leading to inconsistent user experiences and making web development chaotic.",
            intuitionFirst:
              "An HTML document is like a well-organized book. The <!DOCTYPE html> is the ISBN and copyright page telling you what kind of book it is. The <head> is the table of contents and introduction. The <body> is all the chapters and actual content. The <html> tag is the book cover holding everything together.",
            realLifeAnalogy:
              "Think of an HTML document like a human letter. The <!DOCTYPE> is the envelope type. The <head> contains metadata like the sender/recipient address and date. The <body> is the actual letter content. Just as a letter follows conventions for readability, an HTML document follows structural rules for browser compatibility.",
            howItWorks:
              "The browser's rendering engine processes the HTML document in stages. It starts with the DOCTYPE to determine rendering mode (standards vs quirks). Then it creates the DOM tree with <html> as the root. <head> contains metadata that isnt rendered visually but affects behavior (title, links, scripts). <body> contains all visible content. The parser handles this in a single pass, building the tree incrementally.",
            beginnerExplanation:
              "The document structure acts as a blueprint for the browser. Just as a building needs a solid foundation and framework before adding electrical wiring and interior design, an HTML document needs the proper structural elements before you can add content and styling.",
            beginnerExample:
              '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Document Structure</title>\n</head>\n<body>\n  <header>\n    <h1>Welcome</h1>\n  </header>\n  <main>\n    <p>Content goes here.</p>\n  </main>\n  <footer>\n    <p>&copy; 2026</p>\n  </footer>\n</body>\n</html>',
            commonMistakes:
              "Omitting the <html> tag, placing content inside <head>, having multiple <body> tags, using multiple DOCTYPE declarations, and forgetting to specify the lang attribute on the <html> tag for accessibility.",
            bestPractices:
              "Always use <!DOCTYPE html> for HTML5, include the lang attribute for accessibility and SEO, keep <head> for metadata only, keep <body> for visible content only, use proper nesting, and validate your document structure.",
          },
          quiz: [
            {
              id: "html-struct-1",
              question: "What is the correct order of elements in an HTML document?",
              options: [
                "<!DOCTYPE html>, <html>, <head>, <body>",
                "<html>, <head>, <!DOCTYPE html>, <body>",
                "<head>, <body>, <html>, <!DOCTYPE html>",
                "<html>, <!DOCTYPE html>, <head>, <body>",
              ],
              correctIndex: 0,
              explanation:
                "The correct structure is: DOCTYPE declaration first, then <html> as the root element, containing <head> (metadata) and <body> (visible content).",
              difficulty: "easy",
            },
            {
              id: "html-struct-2",
              question:
                "What is the purpose of the <head> element in an HTML document?",
              options: [
                "To contain metadata and resource links",
                "To display the main page heading",
                "To hold all visible page content",
                "To define the page footer",
              ],
              correctIndex: 0,
              explanation:
                "The <head> element contains metadata such as the page title, character encoding, stylesheet links, and scripts. It does not display content visually on the page.",
              difficulty: "easy",
            },
            {
              id: "html-struct-3",
              question:
                "If you omit the <html> tag from your document, what happens?",
              options: [
                "Browsers will still parse and render the content",
                "The page will not render at all",
                "Only text content will display",
                "A validation error prevents the page from loading",
              ],
              correctIndex: 0,
              explanation:
                "Browsers are forgiving and will parse the document even without the explicit <html> tag, automatically inserting it in the DOM. However, it is best practice to include it.",
              difficulty: "medium",
            },
          ],
          faangQuestions: [
            {
              question:
                "Explain the difference between standards mode and quirks mode in browsers. How does the DOCTYPE affect this?",
              answer:
                "Standards mode makes the browser render the page according to W3C specifications. Quirks mode mimics older browser behavior for backward compatibility. The DOCTYPE declaration at the top of the HTML document triggers standards mode. Without a DOCTYPE (or with an outdated one), browsers switch to quirks mode, causing inconsistent box models, different font sizing, and layout bugs. In HTML5, <!DOCTYPE html> is the simplest way to ensure standards mode.",
              difficulty: "hard",
              company: "Microsoft",
            },
            {
              question:
                "How does the browser handle mismatched or improperly nested HTML tags? What recovery mechanisms exist?",
              answer:
                "Browsers use error recovery algorithms defined in the HTML specification. When encountering improperly nested tags, the parser applies specific rules: unclosed tags in certain contexts are auto-closed, misnested tags are reordered to create valid trees. For example, <b><i>text</b></i> is parsed as <b><i>text</i></b>. The parser maintains a stack of open elements and uses a complex state machine to handle errors gracefully, ensuring the page renders as intended despite markup errors.",
              difficulty: "hard",
              company: "Google",
            },
          ],
          codingChallenges: [],
        },
        {
          slug: "doctype",
          title: "DOCTYPE",
          order: 3,
          content: {
            overview:
              "The <!DOCTYPE html> declaration is the first line in an HTML document. It tells the browser which version of HTML the page is written in and ensures the browser renders the page in standards mode.",
            problemStatement:
              "In the early days of the web, different browsers implemented HTML features inconsistently. Web developers had to write separate code for different browsers. A mechanism was needed to tell browsers which rendering rules to follow.",
            intuitionFirst:
              "Think of DOCTYPE as a handshake between your document and the browser. It says, Hello, I am an HTML5 document. Please use the modern standards to render me. Without it, the browser assumes you are writing old legacy HTML and may render things unpredictably.",
            realLifeAnalogy:
              "DOCTYPE is like the best before date on food packaging. It tells you what version you are dealing with. If there is no date, you might assume the food is old and treat it differently. Similarly, without a DOCTYPE, browsers assume the HTML might be outdated and switch to quirks mode.",
            howItWorks:
              "The browser reads the DOCTYPE before parsing any HTML. For HTML5, the DOCTYPE is simply <!DOCTYPE html> (case-insensitive). This triggers standards mode, where the browser follows W3C specifications. Older HTML versions had complex DOCTYPE definitions like <!DOCTYPE HTML PUBLIC -//W3C//DTD HTML 4.01//EN ...>. The simplified HTML5 DOCTYPE ensures maximum compatibility.",
            beginnerExplanation:
              "Think of the DOCTYPE as the first instruction you give the browser. Its like telling a chef whether you want a traditional recipe or a modern fusion dish before they start cooking. The browser needs to know which set of rules to follow right from the start.",
            beginnerExample:
              '<!DOCTYPE html>\n<html>\n<head>\n  <title>Correct DOCTYPE</title>\n</head>\n<body>\n  <p>This page uses HTML5 standards mode.</p>\n</body>\n</html>',
            commonMistakes:
              "Omitting the DOCTYPE entirely, using outdated DOCTYPEs (HTML4 or XHTML variants), adding spaces before the DOCTYPE, or placing comments before it.",
            bestPractices:
              "Always use <!DOCTYPE html> as the very first line (no exceptions), make sure nothing appears before it (not even whitespace if possible), and use lowercase doctype for consistency.",
            performanceNotes:
              "The DOCTYPE itself has negligible performance impact. However, quirks mode (no DOCTYPE) can significantly slow down rendering because browsers apply legacy CSS rules and different box models, leading to layout recalculations.",
          },
          quiz: [
            {
              id: "html-doctype-1",
              question: "What is the correct DOCTYPE declaration for HTML5?",
              options: [
                "<!DOCTYPE html>",
                "<!DOCTYPE HTML5>",
                "<!DOCTYPE html PUBLIC -//W3C//DTD HTML5//EN>",
                "<!DOCTYPE html5>",
              ],
              correctIndex: 0,
              explanation:
                "HTML5 uses the simple <!DOCTYPE html> declaration. It is case-insensitive and much simpler than the verbose declarations required for HTML 4.01 or XHTML.",
              difficulty: "easy",
            },
            {
              id: "html-doctype-2",
              question:
                "What happens when a browser renders a page without a DOCTYPE?",
              options: [
                "It renders in quirks mode",
                "It refuses to render the page",
                "It renders in full standards mode",
                "It automatically adds a DOCTYPE",
              ],
              correctIndex: 0,
              explanation:
                "Without a DOCTYPE, browsers switch to quirks mode, where they emulate older non-standard behavior for backward compatibility. This often leads to CSS layout bugs.",
              difficulty: "medium",
            },
            {
              id: "html-doctype-3",
              question: "Can you place HTML comments before the <!DOCTYPE html>?",
              options: [
                "No, the DOCTYPE must be the very first thing in the document",
                "Yes, comments are ignored so its fine",
                "Only single-line comments are allowed before DOCTYPE",
                "It depends on the browser",
              ],
              correctIndex: 0,
              explanation:
                "According to the HTML specification, the DOCTYPE must be the first thing in the document. Anything before it (including comments) can trigger quirks mode in some browsers.",
              difficulty: "hard",
            },
          ],
          faangQuestions: [
            {
              question:
                "What is the difference between standards mode, almost-standards mode, and quirks mode? When does each trigger?",
              answer:
                "Standards mode is triggered by <!DOCTYPE html> (HTML5) or valid HTML4 Strict/XHTML DOCTYPEs. Almost-standards mode (Gecko) triggers with transitional DOCTYPEs and differs only in how it handles images inside table cells. Quirks mode triggers with no DOCTYPE or outdated/incorrect DOCTYPEs. The key differences are in the box model (IE5 vs W3C), inline element sizing, font sizing inheritance, and table layout algorithms. Modern browsers only use standards and quirks modes; almost-standards is largely historical in Gecko.",
              difficulty: "hard",
              company: "Mozilla",
            },
            {
              question:
                "Why did HTML5 simplify the DOCTYPE compared to HTML 4.01 and XHTML?",
              answer:
                "HTML5 simplified the DOCTYPE because the previous DOCTYPEs (which referenced specific DTDs via URLs) were complex, hard to remember, and often copied incorrectly. The verbose syntax existed because HTML 4.01 and XHTML required a Document Type Definition (DTD) reference for validation. HTML5 is no longer based on SGML, so a DTD reference is unnecessary. The simplified DOCTYPE triggers full standards mode in all modern browsers while being easy for developers to remember and type correctly.",
              difficulty: "medium",
              company: "Apple",
            },
          ],
          codingChallenges: [],
        },
        {
          slug: "head-and-body",
          title: "Head and Body",
          order: 4,
          content: {
            overview:
              "An HTML document is divided into two main sections: <head> and <body>. The <head> contains metadata about the document, while the <body> contains all the visible content that users see and interact with.",
            problemStatement:
              "Web pages need a way to separate metadata (information about the document) from actual content. Without this separation, browsers could not efficiently load resources, search engines could not easily find metadata, and the document structure would be confusing.",
            intuitionFirst:
              "The <head> is like the control room of a building - it contains all the wiring, pipes, and infrastructure that make things work but that visitors never see. The <body> is the actual building interior where people live and work and interact.",
            realLifeAnalogy:
              "A human body has a head (brain, senses, control center) and a body (limbs, organs, visible form). In HTML, <head> contains the brains - metadata, title, links to resources. The <body> contains the physical form - everything you see on the page.",
            howItWorks:
              "The browser parses <head> first, processing metadata like title (for the browser tab), meta tags (for SEO and viewport), and links to CSS/JS resources. These resources may block or defer rendering. Only after processing <head> does the browser render the <body> content. The <body> element represents the main content area and is where all visible HTML elements live.",
            beginnerExplanation:
              "When you load a web page, the browser first reads the head section to understand how the page should be configured. Then it renders the body section which contains everything you actually see. This two-part structure keeps configuration separate from content.",
            beginnerExample:
              '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="description" content="Free web tutorials">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>My Web Page</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <h1>Visible Content</h1>\n  <p>This text appears in the browser window.</p>\n  <img src="photo.jpg" alt="A photo">\n  <script src="script.js"></script>\n</body>\n</html>',
            commonMistakes:
              "Putting <script> or <link> in the <body> when they belong in <head>, placing visible content in <head>, having multiple <body> elements, and forgetting to include essential <head> elements like viewport meta tag.",
            bestPractices:
              "Use <head> only for metadata, title, and resource links. Put all visible elements in <body>. Place <script> tags at the bottom of <body> for better performance (or use defer/async). Always include viewport meta tag for mobile responsiveness.",
          },
          quiz: [
            {
              id: "html-head-body-1",
              question: "Which element contains all the visible content of a web page?",
              options: ["<body>", "<head>", "<html>", "<main>"],
              correctIndex: 0,
              explanation:
                "The <body> element contains all the content that is visible to users, including text, images, links, forms, and other media elements.",
              difficulty: "easy",
            },
            {
              id: "html-head-body-2",
              question:
                "Which of the following belongs in the <head> section?",
              options: [
                '<meta charset="UTF-8">',
                "<h1>Page Title</h1>",
                "<p>Some text</p>",
                "<img src=photo.jpg>",
              ],
              correctIndex: 0,
              explanation:
                "<meta> tags belong in the <head> section as they provide metadata about the document. Headings, paragraphs, and images are visible content that go in the <body>.",
              difficulty: "easy",
            },
            {
              id: "html-head-body-3",
              question:
                "What is the recommended placement for <script> tags for optimal page loading performance?",
              options: [
                "At the end of the <body> element",
                "In the <head> element",
                "At the beginning of the <body> element",
                "After the closing </html> tag",
              ],
              correctIndex: 0,
              explanation:
                "Placing <script> tags just before the closing </body> tag ensures the HTML content is parsed and displayed before scripts load and execute, improving perceived performance. Alternatively, use defer or async in the <head>.",
              difficulty: "medium",
            },
          ],
          faangQuestions: [
            {
              question:
                "How do browsers handle render-blocking resources in the <head>? Explain strategies to optimize this.",
              answer:
                "CSS in the <head> (via <link> or <style>) is render-blocking by default - the browser will not render anything until the CSSOM is built. JavaScript is also render-blocking unless marked async or defer. To optimize: inline critical CSS in a <style> tag, defer non-critical CSS, use media attributes on <link> (e.g. media=print), load non-critical JS with defer/async, and use preload/preconnect hints. Modern approaches include code-splitting CSS and using server-side rendering to deliver above-the-fold content quickly.",
              difficulty: "hard",
              company: "Google",
            },
            {
              question:
                "What is the purpose of the <base> element in the head, and what issues can it cause?",
              answer:
                "The <base> element specifies the base URL used for resolving all relative URLs in the document. For example, <base href=https://example.com/subdir/> makes a link to page.html resolve to https://example.com/subdir/page.html. Issues: it affects ALL relative URLs, including in <a>, <img>, <link>, and <form>. Accidentally setting a wrong base URL can break all resource loading and navigation. It can also interfere with anchor links (#section) if not handled correctly. Only one <base> element is allowed per document.",
              difficulty: "hard",
              company: "Amazon",
            },
          ],
          codingChallenges: [],
        },
        {
          slug: "meta-tags",
          title: "Meta Tags",
          order: 5,
          content: {
            overview:
              "Meta tags are HTML elements that provide structured metadata about a web page. They are placed in the <head> section and are not visible to users but are read by browsers, search engines, and other web services.",
            problemStatement:
              "Web pages need a standardized way to communicate metadata - information about the document itself - to browsers, search engines, social media platforms, and other tools. Without meta tags, critical information like character encoding, page description, and viewport settings would be unavailable.",
            intuitionFirst:
              "Meta tags are like an ID card for your web page. They tell search engines what your page is about, tell browsers how to display it, and tell social media platforms how to show a preview when someone shares a link.",
            realLifeAnalogy:
              "Think of meta tags like the nutrition label on food packaging. The food itself (page content) is what you consume, but the nutrition label (meta tags) tells you important information at a glance: ingredients (keywords), serving size (viewport), calories (description), and more.",
            howItWorks:
              "Meta tags use the <meta> element with attributes like name (identifies the type of metadata) and content (provides the value). Common examples: <meta name=description content=...> for SEO, <meta charset=UTF-8> for character encoding, <meta name=viewport content=width=device-width, initial-scale=1.0> for responsive design. Social media platforms use specific meta tags like Open Graph (og:title) for rich link previews.",
            beginnerExplanation:
              "Meta tags are invisible instructions that help other machines understand your page. When you share a link on social media and it shows a nice preview with an image and description, that is thanks to meta tags. They make your page presentable and understandable to other services.",
            beginnerExample:
              '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="description" content="Learn HTML5 from scratch with interactive tutorials and examples.">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <meta property="og:title" content="HTML Tutorial">\n  <meta property="og:description" content="Master HTML5 from scratch.">\n  <meta property="og:image" content="https://example.com/thumbnail.jpg">\n  <meta name="theme-color" content="#ff6600">\n  <title>HTML Tutorial</title>\n</head>\n<body></body>\n</html>',
            commonMistakes:
              "Forgetting the viewport meta tag (breaking mobile responsiveness), using duplicate meta descriptions, stuffing keywords irrelevantly, using the wrong charset (should be UTF-8), and not including Open Graph tags for social sharing.",
            bestPractices:
              "Always include charset, viewport, and description meta tags. Write unique meta descriptions for each page (150-160 characters). Use Open Graph tags for social media previews. Keep keyword meta tags minimal (Google largely ignores them). Set theme-color for mobile browser UI customization.",
          },
          quiz: [
            {
              id: "html-meta-1",
              question:
                "Which meta tag is essential for making a website mobile-responsive?",
              options: [
                '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
                '<meta name="responsive" content="true">',
                '<meta name="mobile" content="enabled">',
                '<meta name="device" content="all">',
              ],
              correctIndex: 0,
              explanation:
                "The viewport meta tag controls the layout on mobile browsers. Without it, mobile browsers render pages at desktop width (typically 980px) and then zoom out, making text appear tiny.",
              difficulty: "easy",
            },
            {
              id: "html-meta-2",
              question:
                "What Open Graph meta tag property is used to specify how a link appears on Facebook when shared?",
              options: [
                "og:title, og:description, og:image",
                "meta:social, meta:share, meta:preview",
                "fb:title, fb:description, fb:image",
                "share:title, share:description, share:image",
              ],
              correctIndex: 0,
              explanation:
                "Open Graph protocol uses og:title, og:description, and og:image meta tags to control how content appears when shared on social media platforms like Facebook, LinkedIn, and others.",
              difficulty: "medium",
            },
            {
              id: "html-meta-3",
              question:
                "Which HTTP-equivalent meta tag can be used to refresh the page every 30 seconds?",
              options: [
                '<meta http-equiv="refresh" content="30">',
                '<meta http-equiv="reload" content="30">',
                '<meta http-equiv="redirect" content="30">',
                '<meta http-equiv="timer" content="30">',
              ],
              correctIndex: 0,
              explanation:
                "The http-equiv=refresh attribute with a content value in seconds tells the browser to refresh the page after that interval. This can also be used for redirects by adding ;url=...",
              difficulty: "hard",
            },
          ],
          faangQuestions: [
            {
              question:
                "What is the Open Graph protocol and why is it important for SEO and social sharing?",
              answer:
                "Open Graph (OG) is a protocol introduced by Facebook that enables any web page to become a rich object in social graphs. By adding OG meta tags (og:title, og:description, og:image, og:url), developers control how their content appears when shared on social platforms. This is important for SEO because it increases click-through rates from social shares, improves brand visibility, and can affect search rankings indirectly through engagement signals. OG tags also standardize how link previews appear across Facebook, LinkedIn, Twitter (via Twitter Cards), and Slack.",
              difficulty: "medium",
              company: "Meta",
            },
            {
              question:
                "How do meta tags affect SEO, and which ones are still relevant in modern search algorithms?",
              answer:
                "Modern search engines (Google, Bing) use meta tags differently than in the past. The description meta tag is still important as it often appears in search result snippets, influencing click-through rates. The robots meta tag controls crawling and indexing (noindex, nofollow). The viewport tag is crucial for mobile-first indexing. The charset tag helps search engines interpret content correctly. However, the keywords meta tag is largely ignored by Google due to past abuse. Open Graph and Twitter Card tags improve social visibility, which indirectly affects SEO. Google also uses structured data (JSON-LD) alongside meta tags for rich results.",
              difficulty: "hard",
              company: "Google",
            },
          ],
          codingChallenges: [],
        },
        {
          slug: "seo-basics",
          title: "SEO Basics",
          order: 6,
          content: {
            overview:
              "Search Engine Optimization (SEO) in HTML involves structuring your markup and content to help search engines understand, index, and rank your web pages effectively. Good HTML SEO means using semantic elements, proper heading hierarchy, descriptive meta tags, and clean URL structures.",
            problemStatement:
              "With billions of web pages on the internet, users rely on search engines to find relevant content. Without proper SEO optimization, even the best content can remain invisible. Search engines need clear semantic signals to understand what a page is about and how valuable it is.",
            intuitionFirst:
              "Think of SEO as making your website search engine friendly. It is like organizing a library - if books are properly categorized and labeled, people can find them easily. If they are just thrown on shelves randomly, they will never be discovered.",
            realLifeAnalogy:
              "SEO is like putting up a clear storefront sign, having a good store layout, and being listed in the phone book. The better your signage (titles, headings) and the more directories that list you (backlinks), the more customers (visitors) will find your store.",
            howItWorks:
              "Search engines use crawlers (spiders) that follow links across the web, download pages, and analyze the HTML structure. They look at title tags, heading hierarchy, meta descriptions, alt text on images, internal linking structure, and content relevance. Algorithms then index and rank pages based on hundreds of signals including keyword relevance, page speed, mobile-friendliness, backlink quality, and user engagement metrics.",
            beginnerExplanation:
              "SEO is about making your content easy to find. When you write a blog post, you want people to discover it when they search Google. By using proper HTML structure, descriptive titles, and relevant keywords naturally in your content, you help search engines understand and recommend your page to the right audience.",
            beginnerExample:
              '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>Complete HTML Guide for Beginners | Learn Web Development</title>\n  <meta name="description" content="A comprehensive guide to HTML for beginners. Learn semantic markup, forms, media, and SEO best practices.">\n  <link rel="canonical" href="https://example.com/html-guide">\n</head>\n<body>\n  <h1>HTML Guide for Beginners</h1>\n  <h2>Getting Started with HTML</h2>\n  <p>HTML is the foundation of the web...</p>\n  <h3>What You Need</h3>\n  <p>Just a text editor and a browser.</p>\n  <a href="/css-guide">Learn CSS fundamentals</a>\n</body>\n</html>',
            commonMistakes:
              "Using non-descriptive title tags (just Home), having multiple <h1> elements, using generic link text like click here, hiding content from search engines (cloaking), keyword stuffing, and ignoring mobile optimization.",
            bestPractices:
              "Write unique descriptive title tags (50-60 characters), use a single <h1> per page with a clear hierarchy, write compelling meta descriptions (150-160 chars), use descriptive anchor text, optimize images with alt text, create an XML sitemap, use canonical URLs to avoid duplicate content, and ensure mobile responsiveness.",
          },
          quiz: [
            {
              id: "html-seo-1",
              question:
                "What is the most important HTML element for SEO?",
              options: [
                "The <title> tag",
                "The <footer> tag",
                "The <nav> tag",
                "The <style> tag",
              ],
              correctIndex: 0,
              explanation:
                "The <title> tag is the single most important HTML element for SEO. It appears as the clickable headline in search results and heavily influences both rankings and click-through rates.",
              difficulty: "easy",
            },
            {
              id: "html-seo-2",
              question:
                "How many <h1> tags should a well-optimized page have?",
              options: [
                "One",
                "As many as needed",
                "At least three",
                "None",
              ],
              correctIndex: 0,
              explanation:
                "A well-optimized page should have exactly one <h1> tag that represents the main topic. Multiple <h1> tags dilute the semantic structure and confuse search engines about the primary topic.",
              difficulty: "medium",
            },
            {
              id: "html-seo-3",
              question:
                "What is the purpose of a canonical URL (<link rel=canonical>)?",
              options: [
                "To prevent duplicate content issues by specifying the preferred version of a page",
                "To make a page load faster",
                "To encrypt the page content",
                "To redirect users to a different website",
              ],
              correctIndex: 0,
              explanation:
                "A canonical URL tells search engines which version of a page is the master copy when similar or duplicate content exists at multiple URLs. This consolidates ranking signals and prevents SEO dilution.",
              difficulty: "hard",
            },
          ],
          faangQuestions: [
            {
              question:
                "How does semantic HTML improve SEO and accessibility? Provide specific examples.",
              answer:
                "Semantic HTML (<header>, <nav>, <main>, <article>, <section>, <aside>, <footer>) provides meaning to the document structure. For SEO: search engines use these landmarks to understand content hierarchy and relevance. <article> signals standalone content, <nav> identifies navigation, <h1>-<h6> establish topic hierarchy. For accessibility: screen readers use semantic elements to navigate, providing keyboard shortcuts (e.g. jumping between landmarks). Example: <nav aria-label=Main> tells both search engines and screen readers that this is the primary navigation. Properly structured semantic HTML improves search snippets, featured snippets, and voice search results.",
              difficulty: "hard",
              company: "Google",
            },
            {
              question:
                "What is mobile-first indexing and how should HTML be adapted for it?",
              answer:
                "Mobile-first indexing means Google primarily uses the mobile version of a page for indexing and ranking. Since 2019, Googlebot crawls with a smartphone user agent. Adaptation requires: responsive design with viewport meta tag, using the same content on mobile and desktop (no hidden mobile content), ensuring touch-friendly elements (proper sizing/spacing), optimizing loading speed (Core Web Vitals), using proper font sizes (16px minimum to prevent zooming), avoiding intrusive interstitials, and ensuring structured data is identical on both versions. The meta name=viewport tag is critical. Images must be responsive using srcset/sizes attributes.",
              difficulty: "hard",
              company: "Google",
            },
          ],
          codingChallenges: [],
        },
        {
          slug: "semantic-html",
          title: "Semantic HTML",
          order: 7,
          content: {
            overview:
              "Semantic HTML means using HTML elements that carry meaning about the content they contain, rather than just describing presentation. Elements like <header>, <nav>, <main>, <article>, <section>, <aside>, and <footer> clearly describe their role in the document structure.",
            problemStatement:
              "Before HTML5, developers used <div> elements with class names like header or footer to structure pages. This created a div soup that was hard for search engines, screen readers, and other tools to parse. Machines could not understand the role or importance of different content sections.",
            intuitionFirst:
              "Semantic HTML is like using proper labels on boxes when moving houses. Instead of having 50 identical unlabeled boxes (<div>), you label some as kitchen, bedroom, books, fragile so everyone knows what is inside and where things go.",
            realLifeAnalogy:
              "Imagine reading a book where everything is just plain text - no chapter titles, no headings, no table of contents. That is a page built entirely with <div>s. Now imagine a book with clear chapter headings, subheadings, sidebars, and footnotes - that is semantic HTML. The structure makes the content understandable and navigable.",
            howItWorks:
              "Semantic elements are parsed by the browser and exposed in the accessibility tree, making navigation easier for screen readers. Search engines give more weight to content in semantic elements (especially <h1> and <article>). Browsers apply default styling to some semantic elements (like <nav>), but their primary value is the meaning they convey, not their appearance.",
            beginnerExplanation:
              "Semantic HTML is about choosing the right tool for the job. Just as you would not use a hammer to cut a piece of wood, you should not use a <div> when a <header> or <nav> would be more appropriate. The right element makes your code self-documenting and more meaningful to machines.",
            beginnerExample:
              '<header>\n  <nav>\n    <ul>\n      <li><a href="/">Home</a></li>\n      <li><a href="/about">About</a></li>\n    </ul>\n  </nav>\n</header>\n<main>\n  <article>\n    <h1>Blog Post</h1>\n    <p>Content here...</p>\n  </article>\n  <aside>\n    <h2>Related Links</h2>\n    <ul><li><a href="/other">Other Post</a></li></ul>\n  </aside>\n</main>\n<footer>\n  <p>&copy; 2026 Learning Hub</p>\n</footer>',
            commonMistakes:
              "Using <section> just to add styling hooks (use <div> for that), nesting headings incorrectly inside semantic elements, using <article> for non-standalone content, overusing <aside> for content that is actually part of the main flow, and forgetting the <main> element (there should only be one per page).",
            bestPractices:
              "Use <header> for introductory content or navigational aids, <main> for unique page content (use once), <article> for self-contained compositions, <section> for thematic grouping with a heading, <aside> for tangentially related content, <nav> for major navigation blocks, and <footer> for the end of a section or page. Always validate your semantic structure.",
          },
          quiz: [
            {
              id: "html-semantic-1",
              question:
                "Which semantic element should be used to wrap the main navigation links of a site?",
              options: ["<nav>", "<menu>", "<header>", "<aside>"],
              correctIndex: 0,
              explanation:
                "The <nav> element is specifically designed to contain major navigation blocks, such as a site primary menu, table of contents, or index of pages.",
              difficulty: "easy",
            },
            {
              id: "html-semantic-2",
              question:
                "How many <main> elements should a single HTML document contain?",
              options: [
                "One",
                "One per section",
                "As many as needed",
                "None, it is optional",
              ],
              correctIndex: 0,
              explanation:
                "There should be exactly one <main> element per page. It represents the dominant content and should not be nested within <article>, <aside>, <nav>, or <header>.",
              difficulty: "medium",
            },
            {
              id: "html-semantic-3",
              question:
                "When should you use <article> instead of <section>?",
              options: [
                "When the content can be independently distributed or syndicated",
                "When the content needs a heading",
                "When the content is a sidebar",
                "When the content is the main navigation",
              ],
              correctIndex: 0,
              explanation:
                "Use <article> for content that is self-contained and could be independently distributed or reused (blog posts, news articles, forum posts). Use <section> for thematic grouping of content, typically with a heading.",
              difficulty: "medium",
            },
          ],
          faangQuestions: [
            {
              question:
                "Explain the role of ARIA landmarks and how they relate to semantic HTML5 elements. Do semantic elements replace ARIA?",
              answer:
                "ARIA (Accessible Rich Internet Applications) landmarks provide roles that complement semantic HTML. HTML5 semantic elements like <nav> (role=navigation), <main> (role=main), <header> (role=banner when scoped to page), and <footer> (role=contentinfo when scoped to page) have implicit ARIA roles. However, semantic elements do not entirely replace ARIA. ARIA is needed for dynamic content, custom widgets, and complex interfaces that HTML5 semantics cannot describe. The rule: use native HTML semantic elements first (they have built-in keyboard support and accessibility), and only use ARIA when semantic HTML is insufficient.",
              difficulty: "hard",
              company: "Apple",
            },
            {
              question:
                "What is the div soup problem and how does semantic HTML solve it? Describe the impact on SEO, accessibility, and maintainability.",
              answer:
                "Div soup refers to HTML documents where content is wrapped almost exclusively in <div> and <span> elements with class names used for meaning (e.g. <div class=header>). Problem: search engines cannot distinguish between navigation, main content, and sidebars without heuristic analysis. Screen readers cannot provide efficient navigation shortcuts. Developers struggle to understand the document structure. Semantic HTML solves this by providing meaningful elements (<header>, <nav>, <main>, <article>, <aside>, <footer>) that explicitly communicate structure. Impact: SEO improves as search engines better understand content hierarchy, accessibility improves as screen readers offer landmark navigation, and maintainability improves as code becomes self-documenting.",
              difficulty: "hard",
              company: "Amazon",
            },
          ],
          codingChallenges: [
            {
              title: "Build a Semantic HTML Page Layout",
              description:
                "Create a complete HTML page that uses semantic elements to build a blog layout. The page should include: a header with site title and navigation, a main content area with at least two articles (each with a heading, date, and paragraph), a sidebar with related links, and a footer with copyright information. Ensure proper heading hierarchy and use only semantic HTML elements.",
              difficulty: "easy",
              solutionHint:
                "Use <header> with <nav> inside, <main> for primary content with <article> elements, <aside> for the sidebar, and <footer> for the bottom. Use <h1> for the site title, <h2> for article titles, and <h3> for sidebar headings.",
            },
          ],
        },
      ],
    },
    {
      slug: "text-elements",
      title: "Text Elements",
      description:
        "Learn how to structure and style textual content using headings, paragraphs, and inline text elements",
      order: 2,
      subtopics: [
        {
          slug: "headings",
          title: "Headings",
          order: 1,
          content: {
            overview:
              "HTML provides six levels of headings, from <h1> (most important) to <h6> (least important). Headings define the hierarchical structure of content, helping both users and search engines understand the organization of information on a page.",
            problemStatement:
              "Without a standardized heading system, documents would lack visual and structural hierarchy. Readers could not scan content efficiently, search engines could not determine topic importance, and screen readers could not provide navigation between sections.",
            intuitionFirst:
              "HTML headings work like a books table of contents. <h1> is the book title, <h2> are chapter titles, <h3> are section headings within chapters, and so on. This hierarchy helps readers understand the relationship between different pieces of content.",
            realLifeAnalogy:
              "Think of headings as the menu in a restaurant. The restaurant name (<h1>) appears at the top. Then come categories like Appetizers (<h2>), with specific dishes listed under each (<h3>). You would not list a dish name (<h3>) before the category name (<h2>), just as you should not skip heading levels in HTML.",
            howItWorks:
              "Browsers render headings with default font sizes (h1 largest, h6 smallest) and bold weight. However, the real value is semantic: search engines use headings to understand content topics and relevance, screen readers use them for navigation (allowing users to jump between sections), and browsers expose them in the accessibility tree.",
            beginnerExplanation:
              "Headings create a roadmap for your content. Just as chapters and sections help you navigate a textbook, HTML headings help both humans and search engines navigate your web page. Always think of your heading structure as an outline of your content.",
            beginnerExample:
              '<h1>Complete Web Development Guide</h1>\n<h2>Frontend Development</h2>\n<p>Frontend development involves building what users see and interact with.</p>\n<h3>HTML</h3>\n<p>HTML provides the structure of web pages.</p>\n<h3>CSS</h3>\n<p>CSS controls the visual presentation.</p>\n<h4>Flexbox</h4>\n<p>A modern layout module for one-dimensional layouts.</p>\n<h2>Backend Development</h2>\n<p>Backend development handles server-side logic and data.</p>',
            commonMistakes:
              "Skipping heading levels (e.g. going from <h1> to <h3>), using multiple <h1> elements per page, using headings for their visual size rather than semantic meaning (use CSS instead), and nesting headings incorrectly (headings are not nested inside each other).",
            bestPractices:
              "Use a single <h1> per page for the main title, maintain a logical hierarchy without skipping levels, use CSS for visual styling of headings, keep headings descriptive and concise, and ensure headings accurately reflect the content beneath them.",
          },
          quiz: [
            {
              id: "html-headings-1",
              question: "How many heading levels does HTML support?",
              options: ["6 (h1-h6)", "3 (h1-h3)", "5 (h1-h5)", "Unlimited"],
              correctIndex: 0,
              explanation:
                "HTML supports six heading levels: <h1> through <h6>. This provides a semantic hierarchy for document structure.",
              difficulty: "easy",
            },
            {
              id: "html-headings-2",
              question:
                "What is the best practice for using <h1> on a page?",
              options: [
                "Use exactly one <h1> that describes the pages main topic",
                "Use <h1> for every major section",
                "Avoid <h1> entirely, start with <h2>",
                "Use <h1> for the site logo and another for the page title",
              ],
              correctIndex: 0,
              explanation:
                "Best practice is to use a single <h1> per page that clearly describes the pages primary topic. Multiple <h1> elements dilute semantic meaning and can confuse search engines.",
              difficulty: "medium",
            },
            {
              id: "html-headings-3",
              question:
                "Is it acceptable to have <h1> followed by <h4> with no <h2> or <h3> in between?",
              options: [
                "No, it violates accessibility and SEO best practices",
                "Yes, HTML allows it technically",
                "Yes, but only if the <h4> is inside a <section>",
                "No, the validator will throw an error",
              ],
              correctIndex: 0,
              explanation:
                "While HTML allows skipping heading levels syntactically, it violates accessibility and SEO best practices. Screen reader users rely on proper heading hierarchy for navigation, and skipping levels suggests broken content structure.",
              difficulty: "hard",
            },
          ],
          faangQuestions: [
            {
              question:
                "How do screen readers utilize HTML headings for navigation, and what happens when the heading hierarchy is broken?",
              answer:
                "Screen readers provide a Headings List or Heading Navigation feature (e.g. pressing H to jump between headings). Users can navigate by heading level (press 1 for h1, 2 for h2, etc.). When hierarchy is broken (e.g. h1 to h4), the screen reader announces the level change but the user perceives a structural gap. This creates confusion because the logical flow is unclear. Broken hierarchy also affects the accessibility tree computed roles and can cause assistive technologies to misinterpret the document outline. WCAG 2.1 Success Criterion 1.3.1 (Info and Relationships) requires that heading levels reflect the content structure accurately.",
              difficulty: "hard",
              company: "Apple",
            },
            {
              question:
                "Does Google use heading tags as a direct ranking factor? How should headings be optimized for featured snippets?",
              answer:
                "Google has stated that heading tags are not a direct high-weight ranking factor, but they are important for SEO indirectly. Headings help Google understand content structure and relevance, which influences how content is indexed and displayed in search results. For featured snippets (position zero), headings are crucial - Google often pulls the heading text as the snippet title. To optimize for featured snippets: use clear question-based <h2> tags that match search queries, structure content with a single <h1>, use descriptive <h2> for each section, and ensure each heading is immediately followed by relevant content that answers the implied question.",
              difficulty: "medium",
              company: "Google",
            },
          ],
          codingChallenges: [],
        },
        {
          slug: "paragraphs",
          title: "Paragraphs",
          order: 2,
          content: {
            overview:
              "The <p> element represents a paragraph of text. It is one of the most fundamental HTML elements, used to group related sentences and thoughts into distinct blocks of content.",
            problemStatement:
              "Without a dedicated paragraph element, text would appear as one continuous block, making content difficult to read, scan, and understand. There would be no structural way to separate ideas, and styling text blocks would require excessive <br> tags.",
            intuitionFirst:
              "A paragraph (<p>) is like a paragraph in a book or article - it is a self-contained unit of text that develops a single idea. Just as you would not write an entire chapter as one paragraph, you should break web content into logical paragraphs.",
            realLifeAnalogy:
              "Think of paragraphs as containers of thoughts in a conversation. When you speak, you pause between ideas. Paragraphs create those pauses in written content, giving readers a moment to absorb one idea before moving to the next.",
            howItWorks:
              "The browser renders <p> elements as block-level elements, meaning they start on a new line and take up the full available width. By default, paragraphs have margins on top and bottom (typically 1em) which creates visual spacing between blocks of text. The browser automatically wraps text within a paragraph to fit the container width.",
            beginnerExplanation:
              "When you write a paragraph in HTML, you are telling the browser to display a block of text with spacing before and after it. This creates visual breathing room that makes content easier to read than one giant block of text.",
            beginnerExample:
              '<h1>About Web Development</h1>\n<p>Web development is the process of building websites and applications for the internet. It encompasses everything from simple static pages to complex web-based applications, e-commerce platforms, and social networks.</p>\n<p>Front-end developers focus on the visual and interactive aspects that users see and interact with directly. They work with HTML, CSS, and JavaScript to create responsive and engaging user interfaces.</p>\n<p>Back-end developers work on the server-side logic, databases, and APIs that power the front-end experience.</p>',
            commonMistakes:
              "Using <br> tags to create spacing between paragraphs instead of using separate <p> elements, nesting <p> inside other <p> elements (invalid HTML), putting block-level elements like <div> inside <p>, and using empty <p> elements for spacing.",
            bestPractices:
              "Use <p> for each logical block of text, do not nest block-level elements inside <p>, use CSS (margin/padding) for spacing instead of empty <p> or multiple <br> tags, and keep paragraphs focused on a single topic for readability.",
          },
          quiz: [
            {
              id: "html-paragraphs-1",
              question: "Which HTML element is used to define a paragraph?",
              options: ["<p>", "<para>", "<text>", "<pg>"],
              correctIndex: 0,
              explanation:
                "The <p> element defines a paragraph. It is a block-level element that automatically adds margins before and after the text.",
              difficulty: "easy",
            },
            {
              id: "html-paragraphs-2",
              question:
                "What happens if you put a <div> inside a <p> element?",
              options: [
                "The browser auto-closes the <p> before the <div>",
                "The <div> renders normally inside the paragraph",
                "The page fails to validate but renders",
                "The <p> element becomes a child of the <div>",
              ],
              correctIndex: 0,
              explanation:
                "According to the HTML spec, the <p> element content model is phrasing content only. Block-level elements like <div> cannot be inside <p>. The browser auto-closes the <p> when it encounters the <div>, resulting in invalid nesting.",
              difficulty: "hard",
            },
            {
              id: "html-paragraphs-3",
              question:
                "What is the default display behavior of a <p> element?",
              options: [
                "Block-level - starts on a new line with margins",
                "Inline - stays on the same line",
                "Inline-block - sits inline but respects margins",
                "Flex - displays children in a flex layout",
              ],
              correctIndex: 0,
              explanation:
                "<p> is a block-level element by default. It starts on a new line, takes up the full available width, and has top and bottom margins (typically 1em).",
              difficulty: "medium",
            },
          ],
          faangQuestions: [
            {
              question:
                "How does the browser handle whitespace in <p> elements? Explain the concept of whitespace collapsing.",
              answer:
                "HTML collapses whitespace by default. Multiple spaces, tabs, and newlines inside a <p> are condensed into a single space when rendered. For example, Hello     World and Hello with newlines both render as Hello World. This is called whitespace collapse and is defined in the CSS white-space property (default: normal). To preserve whitespace, use <pre> tags, CSS white-space: pre, or the non-breaking space entity (&nbsp;). This behavior ensures consistent rendering regardless of how the HTML is formatted in the source code.",
              difficulty: "medium",
              company: "Microsoft",
            },
            {
              question:
                "What is the difference between <p> and <article> when structuring textual content for a blog? How do screen readers differentiate them?",
              answer:
                "<p> represents a single paragraph of text - a block of related sentences. <article> represents a complete self-contained composition that could be independently syndicated (a blog post, news story, forum post). <article> can contain multiple <p> elements, headings, images, and other content. Screen readers treat <p> as a text block that users can navigate with arrow keys. <article> is a landmark region that users can jump to using landmark navigation (similar to main, nav). The key difference is semantic granularity: <p> is a text unit, <article> is a content unit.",
              difficulty: "hard",
              company: "Amazon",
            },
          ],
          codingChallenges: [],
        },
        {
          slug: "span",
          title: "Span",
          order: 3,
          content: {
            overview:
              "The <span> element is an inline container used to group text or elements for styling purposes. It has no semantic meaning on its own and is purely a presentational hook for CSS and JavaScript.",
            problemStatement:
              "Developers often need to apply styles or attach behaviors to specific portions of text within a larger block (like a paragraph). Without an inline container element, there would be no way to target sub-sections of text without breaking the content flow.",
            intuitionFirst:
              "Think of <span> as a highlighter pen. When you read a book and want to highlight a specific phrase without changing the structure of the sentence, you use a highlighter. <span> does the same for HTML - it marks specific text without altering the document flow.",
            realLifeAnalogy:
              "<span> is like using a marker to circle a specific word in a newspaper article. The article remains the same, but you have visually marked a portion of it. Similarly, <span> wraps around inline content to apply CSS or JavaScript hooks without changing the content structure.",
            howItWorks:
              "<span> is an inline element, meaning it flows within the surrounding text without breaking the line. It creates no visual change by itself (no margins, no line breaks). It is purely a container. When styled with CSS or selected with JavaScript, it affects only the content it wraps. Multiple <span> elements can exist within the same parent element.",
            beginnerExplanation:
              "Use <span> when you want to style a specific piece of text inside a paragraph or heading without affecting the surrounding text. For example, you might use <span> to change the color of one word in a sentence.",
            beginnerExample:
              '<p>This is a paragraph with a\n  <span style="color: red; font-weight: bold;">highlighted section</span>\n  in the middle of the sentence. The span allows us to style\n  <span style="background-color: yellow;">specific words</span>\n  without breaking the text flow.</p>',
            commonMistakes:
              "Using <span> when a semantic element (<strong>, <em>, <mark>) would be more appropriate, nesting block-level elements inside <span>, using <span> for layout purposes (use <div> for block-level layout), and overusing <span> when CSS pseudo-elements could suffice.",
            bestPractices:
              "Use <span> only when no semantic HTML element fits, use CSS classes (not inline styles) with <span> for maintainability, keep <span> content inline-only, and prefer semantic elements like <strong> or <em> for emphasis and <mark> for highlighted text.",
          },
          quiz: [
            {
              id: "html-span-1",
              question: "What display type does the <span> element have by default?",
              options: ["Inline", "Block", "Inline-block", "Flex"],
              correctIndex: 0,
              explanation:
                "<span> is an inline element by default. It flows within the surrounding text without creating line breaks, taking up only as much width as its content requires.",
              difficulty: "easy",
            },
            {
              id: "html-span-2",
              question:
                "Which is more semantically correct for emphasizing text?",
              options: [
                "<strong> or <em>",
                "<span class=bold>",
                "<span style=font-weight:bold>",
                "<i> or <b>",
              ],
              correctIndex: 0,
              explanation:
                "For emphasis, semantic elements like <strong> (strong importance) and <em> (stress emphasis) are more appropriate than <span> with styling. They convey meaning to search engines and screen readers.",
              difficulty: "medium",
            },
            {
              id: "html-span-3",
              question:
                "Can a <span> element contain a <div> element?",
              options: [
                "No, because <div> is block-level and cannot be inside an inline element",
                "Yes, any element can contain any other element",
                "Yes, but only in HTML5",
                "No, <div> can only contain <span>, not vice versa",
              ],
              correctIndex: 0,
              explanation:
                "According to HTML spec, <span> can only contain phrasing content (inline elements). <div> is flow content (block-level) and cannot be nested inside <span>. The browser will auto-close the <span> when it encounters the <div>.",
              difficulty: "hard",
            },
          ],
          faangQuestions: [
            {
              question:
                "Describe the differences between <span>, <div>, and HTML5 semantic elements in terms of accessibility, SEO, and browser rendering.",
              answer:
                "Accessibility: <div> and <span> have no semantic meaning and are ignored by screen readers unless given ARIA roles. Semantic elements (<nav>, <main>, <article>) provide built-in landmark roles. SEO: <div> and <span> contribute no semantic value to search engines. Semantic elements help search engines understand content structure and importance. Rendering: <div> is block-level (full width, line breaks), <span> is inline (flows with text). Both have no default visual styling. Semantic elements may have defaults. Best practice: use semantic HTML first, <div> for block-level layout containers when no semantic element fits, and <span> only for inline styling hooks.",
              difficulty: "hard",
              company: "Google",
            },
            {
              question:
                "How does the browser handle CSS styles applied to a <span> compared to a block-level element like <div>? Explain the concept of containing block.",
              answer:
                "For <span> (inline), CSS properties like width, height, and margin-top/bottom have no effect. Padding-top/bottom works visually but does not affect surrounding content flow (can overlap). For <div> (block), all box-model properties work normally. The containing block for <span> is the nearest block-level ancestor. Width is determined by content, not by the containing block. For <div>, the containing block determines the default width (100%). Understanding this is critical for layout: transforming <span> with display: inline-block gives it block-like box properties while keeping inline flow.",
              difficulty: "hard",
              company: "Mozilla",
            },
          ],
          codingChallenges: [],
        },
        {
          slug: "div",
          title: "Div",
          order: 4,
          content: {
            overview:
              "The <div> element is a generic block-level container with no semantic meaning. It is the most versatile layout element in HTML, used to group content for styling, scripting, and document structure purposes.",
            problemStatement:
              "Web pages need a way to group related content together for layout and styling purposes. While semantic elements describe specific content types, many grouping scenarios do not have a semantic equivalent. A generic container is needed for these cases.",
            intuitionFirst:
              "If <span> is a highlighter for specific words, <div> is a storage box. You use boxes to organize related items, label them, and arrange them on shelves. Similarly, <div> organizes related content into visual groups.",
            realLifeAnalogy:
              "Think of <div> as a plastic storage container. You use it to group related items: kitchen utensils in one, books in another. The container itself has no meaning - it is what is inside and how you arrange the containers that matters. In a webpage, <div> groups related elements so CSS can position and style them together.",
            howItWorks:
              "<div> is a block-level element, meaning it starts on a new line and takes up the full available width by default. It has no default visual styling (no margins, padding, or borders unless CSS is applied). It can contain any type of content: text, images, forms, tables, and other <div> elements. It essentially creates a generic box in the document flow.",
            beginnerExplanation:
              "Think of <div> as an empty container that you can use to group elements together. You might wrap a group of related elements in a <div> so you can style them as a unit or position them together on the page.",
            beginnerExample:
              '<div class="container">\n  <h1>My Dashboard</h1>\n  <div class="card">\n    <h2>Profile Section</h2>\n    <p>Welcome back, User!</p>\n  </div>\n  <div class="card">\n    <h2>Notifications</h2>\n    <p>You have 3 unread messages.</p>\n  </div>\n</div>',
            commonMistakes:
              "Using <div> when semantic elements (<header>, <main>, <section>, <article>, <nav>) are more appropriate (div soup), over-nesting <div> elements creating deeply nested structures, using <div> for text content that belongs in <p>, and relying on <div> for interactive behavior without proper ARIA roles.",
            bestPractices:
              "Use semantic HTML elements before reaching for <div>, use CSS classes (not IDs) for styling <div> elements, keep <div> nesting to a minimum (3-4 levels max), use <div> for layout and grouping only when no semantic alternative exists, and add ARIA roles when <div> is used for interactive widgets.",
          },
          quiz: [
            {
              id: "html-div-1",
              question: "What is the default display property of a <div> element?",
              options: ["Block", "Inline", "Inline-block", "Table"],
              correctIndex: 0,
              explanation:
                "The <div> element is a block-level element by default. It starts on a new line and takes up the full width available to it.",
              difficulty: "easy",
            },
            {
              id: "html-div-2",
              question:
                "What is div soup and why is it problematic?",
              options: [
                "Using <div> excessively instead of semantic HTML elements, harming accessibility and SEO",
                "A type of CSS framework",
                "Using too many nested <span> elements",
                "A deprecated HTML feature",
              ],
              correctIndex: 0,
              explanation:
                "Div soup refers to HTML documents over-reliant on nested <div> elements with class names for meaning, instead of using semantic HTML5 elements. This harms accessibility (poor screen reader navigation) and SEO (search engines cannot understand structure).",
              difficulty: "medium",
            },
            {
              id: "html-div-3",
              question:
                "Can a <div> be placed inside a <p> element?",
              options: [
                "No, the browser auto-closes the <p> before the <div>",
                "Yes, a <div> can be anywhere",
                "Yes, but only if the <p> has a class",
                "No, <div> can only contain <p>",
              ],
              correctIndex: 0,
              explanation:
                "The <p> element can only contain phrasing content (inline elements). <div> is flow content, so the parser immediately closes the <p> when it encounters a <div>, resulting in unexpected DOM structure.",
              difficulty: "hard",
            },
          ],
          faangQuestions: [
            {
              question:
                "When should you use <div> versus a semantic HTML5 element? Provide specific scenarios and explain the trade-offs.",
              answer:
                "Use semantic elements when the content has a defined role: <header> for introductory content, <nav> for navigation, <main> for primary content, <article> for self-contained compositions, <section> for thematic grouping, <aside> for tangential content, <footer> for closing content. Use <div> when: (1) a purely presentational container is needed for CSS layout (e.g. flex/grid container that does not represent a document section), (2) no semantic element accurately describes the grouping, (3) grouping elements for JavaScript manipulation without semantic meaning. Trade-offs: semantic elements improve accessibility (landmark navigation), SEO (content understanding), and code readability. <div> is more flexible but provides no semantic value.",
              difficulty: "hard",
              company: "Microsoft",
            },
            {
              question:
                "Explain the role of <div> in creating CSS layout systems like Flexbox and Grid. How does the box model apply differently?",
              answer:
                "<div> is the primary building block for CSS layouts. In Flexbox, a <div> with display: flex creates a flex formatting context where child <div> elements become flex items. In Grid, display: grid creates a grid formatting context. The box model (content-box, padding-box, border-box) applies consistently to <div> elements. However, in flex context, the default box-sizing might be content-box unless overridden. <div> elements in a flex container can have auto-margins, flex-grow/shrink properties. In block formatting context (default), <div> elements stack vertically with margin collapsing. In flex/grid contexts, margin collapsing does not occur.",
              difficulty: "hard",
              company: "Google",
            },
          ],
          codingChallenges: [],
        },
        {
          slug: "pre",
          title: "Pre",
          order: 5,
          content: {
            overview:
              "The <pre> element represents preformatted text. It preserves both spaces and line breaks exactly as written in the HTML source. Text inside <pre> is typically displayed in a monospace (fixed-width) font.",
            problemStatement:
              "Standard HTML collapses whitespace and ignores line breaks. This makes it impossible to display code snippets, ASCII art, poetry, or any content where spacing and alignment are meaningful without a dedicated element that preserves formatting.",
            intuitionFirst:
              "Think of <pre> as a transparent sheet of paper laid over your code. Whatever you write on that paper appears exactly as written - every space, every newline, every indent. The browser does not reformat it like it does with regular HTML text.",
            realLifeAnalogy:
              "Imagine typing a poem in a word processor. With normal text, the word processor might reflow lines to fit the page width. With <pre>, every space and line break is locked in place - like using a typewriter where each character occupies exactly the same width.",
            howItWorks:
              "The <pre> element has default CSS of white-space: pre, which preserves all whitespace characters (spaces, tabs, newlines). The font-family defaults to monospace. It is a block-level element. Importantly, HTML tags inside <pre> are still parsed and rendered (unless escaped). If you want to display angle brackets as text, you must use HTML entities (&lt; and &gt;).",
            beginnerExplanation:
              "Use <pre> when you want to display text exactly as you typed it - with all spaces, tabs, and line breaks preserved. This is perfect for showing code examples or any content where formatting matters.",
            beginnerExample:
              '<pre>\n  /\\      /\\\n /  \\    /  \\\n/    \\  /    \\\n------  ------\n  \\    /  \\    /\n   \\  /    \\  /\n    \\/      \\/\n</pre>\n<pre>\nfunction greet(name) {\n  console.log("Hello, " + name + "!");\n}\n</pre>',
            commonMistakes:
              "Using <pre> for content that does not need preserved whitespace, forgetting to escape HTML entities (< and >) inside <pre> when displaying code, wrapping <pre> content in <p> tags (which collapses whitespace), and not considering that <pre> can cause horizontal overflow on small screens.",
            bestPractices:
              "Use <pre> for code blocks, ASCII art, and any content where whitespace matters, always escape HTML entities in <pre> when displaying markup, set a max-width and overflow-x: auto for responsive <pre> blocks, and consider using <code> inside <pre> for semantic code blocks.",
          },
          quiz: [
            {
              id: "html-pre-1",
              question: "What is the default font family used by the <pre> element?",
              options: ["Monospace", "Serif", "Sans-serif", "Cursive"],
              correctIndex: 0,
              explanation:
                "The <pre> element is rendered in a monospace (fixed-width) font by default. This makes it ideal for displaying code and text where character alignment matters.",
              difficulty: "easy",
            },
            {
              id: "html-pre-2",
              question:
                "Which CSS property gives <pre> its whitespace-preserving behavior?",
              options: [
                "white-space: pre",
                "text-align: left",
                "word-break: keep-all",
                "display: pre",
              ],
              correctIndex: 0,
              explanation:
                "The default CSS white-space: pre on <pre> elements tells the browser to preserve all whitespace characters and line breaks exactly as they appear in the source HTML.",
              difficulty: "medium",
            },
            {
              id: "html-pre-3",
              question:
                "If you want to display <div> inside a <pre> element as text, what should you do?",
              options: [
                "Use &lt;div&gt; HTML entities",
                "Wrap it in a <code> tag",
                "Use a backslash before the <",
                "It will display as text automatically",
              ],
              correctIndex: 0,
              explanation:
                "HTML tags inside <pre> are still parsed as HTML. To display angle brackets as text, you must use HTML entities: &lt; for < and &gt; for >. Otherwise the browser will try to render <div> as an actual HTML element.",
              difficulty: "hard",
            },
          ],
          faangQuestions: [
            {
              question:
                "How does the <pre> element interact with the accessibility tree? What considerations should developers make for screen readers?",
              answer:
                "The <pre> element is exposed in the accessibility tree with its whitespace preserved. Screen readers will read the text as-is, including excessive whitespace, which can be confusing. For example, ASCII art with many spaces causes screen readers to pause or say blank repeatedly. Considerations: (1) Use aria-label or aria-describedby to provide a text description for visual content like ASCII art, (2) for code blocks, wrap <code> inside <pre> and add role=document for better navigation, (3) consider providing a skip to text option for large preformatted blocks, (4) test with screen readers to ensure whitespace does not create a poor experience.",
              difficulty: "hard",
              company: "Apple",
            },
            {
              question:
                "Compare and contrast <pre>, <code>, and <samp> elements. When would you use each, and which combinations are semantically correct?",
              answer:
                "<pre> preserves whitespace and is block-level, used for any preformatted text. <code> represents a fragment of computer code (inline by default), indicating semantic meaning as code. <samp> represents sample output from a program. Combinations: <pre><code> is the standard for code blocks - <pre> preserves formatting, <code> adds semantic meaning. <pre><samp> for sample output. Use <code> alone for inline code references. <samp> alone for inline output examples. Avoid <pre> without <code> for code blocks as it lacks semantic meaning.",
              difficulty: "hard",
              company: "Google",
            },
          ],
          codingChallenges: [],
        },
        {
          slug: "code",
          title: "Code",
          order: 6,
          content: {
            overview:
              "The <code> element is used to display computer code text. It is an inline element that typically renders in a monospace font, indicating that the enclosed text is a fragment of programming code.",
            problemStatement:
              "In technical documentation and tutorials, code fragments need to be visually and semantically distinguished from regular text. Without a dedicated element, readers could not easily identify code references, and screen readers could not announce them appropriately.",
            intuitionFirst:
              "Think of <code> as quotation marks for programming. Just as quotation marks tell readers these are someones exact words, <code> tells readers this is programming syntax, not regular language.",
            realLifeAnalogy:
              "When writing a recipe, you might put the names of ingredients in bold to distinguish them from instructions. Similarly, <code> distinguishes programming terms and syntax from explanatory text.",
            howItWorks:
              "The <code> element applies browser-default monospace font styling, but more importantly, it adds semantic meaning. Screen readers can announce code before reading the content. Search engines understand that the content is code-related. For multi-line code blocks, <code> is typically nested inside <pre> to preserve formatting. Without <pre>, the <code> element alone does not preserve whitespace.",
            beginnerExplanation:
              "Use <code> when you mention a specific function name, variable, or HTML tag in your text. It marks the text as code, making it visually distinct and semantically meaningful.",
            beginnerExample:
              '<p>To log a message to the console, use the\n<code>console.log()</code> method. For example:</p>\n<pre><code>const greeting = "Hello, World!";\nconsole.log(greeting);\n// Output: Hello, World!</code></pre>\n<p>The <code>const</code> keyword declares a\nvariable that cannot be reassigned.</p>',
            commonMistakes:
              "Using <code> without <pre> for multi-line code blocks (whitespace gets collapsed), forgetting to escape HTML entities inside <code>, using <code> for non-code content (like filenames - use <samp> instead), and not using <pre><code> combination for code blocks.",
            bestPractices:
              "Use <code> for inline code references, use <pre><code> for multi-line code blocks, always escape HTML special characters (&, <, >) inside <code>, use CSS for additional code styling (background, padding, border-radius), and consider adding a copy-to-clipboard button for code blocks.",
          },
          quiz: [
            {
              id: "html-code-1",
              question:
                "Which element should be used for inline code references?",
              options: ["<code>", "<pre>", "<samp>", "<kbd>"],
              correctIndex: 0,
              explanation:
                "<code> is the correct element for inline code fragments. <pre> preserves whitespace, <samp> represents program output, and <kbd> represents keyboard input.",
              difficulty: "easy",
            },
            {
              id: "html-code-2",
              question:
                "What is the correct way to display a multi-line code block?",
              options: [
                "<pre><code>code here</code></pre>",
                "<code>code here</code>",
                "<pre>code here</pre>",
                "<blockquote><code>code here</code></blockquote>",
              ],
              correctIndex: 0,
              explanation:
                "For multi-line code blocks, <pre><code> is the standard. <pre> preserves whitespace and line breaks, while <code> adds semantic meaning that this is computer code.",
              difficulty: "medium",
            },
            {
              id: "html-code-3",
              question:
                "Should HTML tags inside <code> be escaped with HTML entities?",
              options: [
                "Yes, otherwise the browser parses them as actual HTML",
                "No, <code> automatically escapes all content",
                "Only inside <pre><code>, not <code> alone",
                "It depends on the browser",
              ],
              correctIndex: 0,
              explanation:
                "The <code> element does not change the content parsing. HTML tags inside <code> will still be interpreted as HTML markup. You must use &lt; and &gt; entities to display angle brackets literally.",
              difficulty: "hard",
            },
          ],
          faangQuestions: [
            {
              question:
                "What is the difference between <code>, <kbd>, <samp>, and <var> in HTML? Provide use cases for each.",
              answer:
                "<code> represents computer code (e.g. <code>console.log()</code>). <kbd> represents user keyboard input (e.g. <kbd>Ctrl+C</kbd>). <samp> represents sample program output (e.g. <samp>Hello World</samp>). <var> represents a variable name (e.g. <var>username</var>). All are inline elements rendered in monospace by default. Use cases: <code> for API names and code syntax, <kbd> for keyboard shortcuts in documentation, <samp> for showing command output or error messages, <var> for mathematical variables or code variable names.",
              difficulty: "medium",
              company: "Amazon",
            },
            {
              question:
                "How should syntax highlighting be implemented for <code> blocks in a way that is both visually appealing and accessible?",
              answer:
                "Server-side: use libraries like Prism.js or highlight.js that generate span elements with semantic class names (e.g. <span class=keyword>, <span class=string>). Client-side: run the highlighter in JavaScript after page load. For accessibility: (1) ensure color contrast ratios meet WCAG AA (4.5:1 for text), (2) do not rely solely on color - use patterns or text labels where possible, (3) provide a copy code button, (4) add role=document and tabindex=0 for screen reader navigation inside code blocks, (5) use aria-label on the pre element to describe the language. Avoid images of code entirely.",
              difficulty: "hard",
              company: "GitHub",
            },
          ],
          codingChallenges: [],
        },
        {
          slug: "blockquote",
          title: "Blockquote",
          order: 7,
          content: {
            overview:
              "The <blockquote> element represents a section of content quoted from another source. It is a block-level element typically rendered with indentation to visually distinguish quoted content from surrounding text.",
            problemStatement:
              "When referencing external sources, articles, or speeches, content needs to be visually and semantically distinguished from the author original writing. Without a dedicated quote element, readers could not easily identify sourced material, and proper attribution would be inconsistent.",
            intuitionFirst:
              "Think of <blockquote> as the HTML equivalent of putting text inside quotation marks, but on a larger scale. It is like the blockquote formatting in a research paper that says this came from somewhere else.",
            realLifeAnalogy:
              "In a courtroom transcript, the witness testimony is clearly separated and labeled from the lawyer questions. Similarly, <blockquote> sets apart someone else words from your own, giving proper credit and making the source clear to the reader.",
            howItWorks:
              "<blockquote> is a block-level element with default left and right margins (typically 40px) to create indentation. It can contain other block-level elements like paragraphs, headings, and lists. The optional cite attribute can specify the URL of the source document. For inline quotes, use the <q> element. For attribution, the <cite> element can be used within or after the blockquote.",
            beginnerExplanation:
              "Use <blockquote> when you want to quote a longer passage from another source. The indentation makes it visually clear that these are someone else words. Always include a citation to give credit.",
            beginnerExample:
              '<p>The author makes a compelling argument:</p>\n<blockquote cite="https://example.com/article">\n  <p>Semantic HTML is not just about making code look pretty. It is the foundation of an accessible, searchable, and maintainable web.</p>\n  <footer>- Jane Smith, <cite>The Web Developer Journey</cite></footer>\n</blockquote>\n<p>As the author notes, <q>HTML is the bedrock of the web</q>.</p>',
            commonMistakes:
              "Using <blockquote> for indentation (use CSS padding/margin instead), forgetting the cite attribute when the source URL is known, nesting <blockquote> inside <p> (block-level inside phrasing content), and using <blockquote> for dialogue in fiction.",
            bestPractices:
              "Use <blockquote> only for actual quoted content, include the cite attribute with the source URL when available, use <q> for inline quotes, combine <blockquote> with <cite> for proper attribution, and use CSS for visual styling.",
          },
          quiz: [
            {
              id: "html-blockquote-1",
              question:
                "Which attribute is used on <blockquote> to specify the source URL?",
              options: ["cite", "src", "source", "href"],
              correctIndex: 0,
              explanation:
                "The cite attribute on <blockquote> specifies the URL of the original source from which the quotation is taken. It is optional but recommended for proper attribution.",
              difficulty: "easy",
            },
            {
              id: "html-blockquote-2",
              question:
                "What is the difference between <blockquote> and <q>?",
              options: [
                "<blockquote> is block-level and indented, <q> is inline and adds quotation marks",
                "<blockquote> adds quotation marks, <q> is indented",
                "They are identical in rendering",
                "<q> is for longer quotes, <blockquote> is for shorter ones",
              ],
              correctIndex: 0,
              explanation:
                "<blockquote> is a block-level element for longer quotes, rendered with indentation by default. <q> is an inline element for short quotes, and browsers automatically add quotation marks around <q> content.",
              difficulty: "medium",
            },
            {
              id: "html-blockquote-3",
              question:
                "Can a <blockquote> contain a <div> element?",
              options: [
                "Yes, <blockquote> can contain flow content including <div>",
                "No, <blockquote> can only contain phrasing content",
                "Yes, but only a single <div> inside a <blockquote>",
                "No, <div> cannot be inside a <blockquote>",
              ],
              correctIndex: 0,
              explanation:
                "The <blockquote> element has a content model of flow content, meaning it can contain any flow elements including <div>, <p>, <h1>-<h6>, <ul>, and more.",
              difficulty: "hard",
            },
          ],
          faangQuestions: [
            {
              question:
                "How should you semantically structure a <blockquote> with attribution? Include considerations for accessibility and SEO.",
              answer:
                "For a blockquote with attribution: wrap the quoted text in a <p> or other flow content inside <blockquote>, and use a <footer> element inside the <blockquote> for the citation. Use <cite> for the source title within the footer. Example: <blockquote cite=URL><p>Quote text...</p><footer>- Author, <cite>Source Title</cite></footer></blockquote>. For accessibility: screen readers announce blockquote boundaries. The cite attribute is not visible but is available to screen readers. For SEO: search engines use <blockquote> content as a signal of external sourcing.",
              difficulty: "hard",
              company: "Google",
            },
            {
              question:
                "Explain the difference between the cite attribute on <blockquote> and the <cite> element. When should you use each?",
              answer:
                "The cite attribute on <blockquote> is a URL reference to the original source document. It is invisible to users but available to screen readers and browsers. The <cite> element represents the title of the cited work (book, article, song, etc.) and is visible to users. Example: <blockquote cite=https://example.com/book>...<cite>Book Title</cite></blockquote>. Use the cite attribute for tracking the source URL, and use the <cite> element to display the source title to users. They serve different purposes: the attribute is machine-readable, the element is human-readable.",
              difficulty: "hard",
              company: "Mozilla",
            },
          ],
          codingChallenges: [],
        },
      ],
    },
    {
      slug: "lists",
      title: "Lists",
      description:
        "Master ordered, unordered, and description lists to organize content effectively",
      order: 3,
      subtopics: [
        {
          slug: "ordered-list",
          title: "Ordered List",
          order: 1,
          content: {
            overview:
              "The <ol> element creates an ordered (numbered) list. Each item in the list is wrapped in an <li> (list item) element. Ordered lists are used when the sequence of items matters, such as step-by-step instructions, rankings, or numbered procedures.",
            problemStatement:
              "When presenting sequential information - like recipe steps, top-10 rankings, or instructions - readers need to follow a specific order. Without a dedicated ordered list element, conveying sequence would require manually typing numbers, which breaks if items are added or reordered.",
            intuitionFirst:
              "Think of an ordered list as a numbered checklist. The numbers tell you not just what items exist, but what order they should be done in. It is like the numbered steps in an IKEA furniture assembly guide - the sequence is crucial.",
            realLifeAnalogy:
              "A numbered list is like a race result: 1st place, 2nd place, 3rd place. The order matters, and the numbers convey importance and sequence. If you change the order, the meaning changes entirely.",
            howItWorks:
              "The <ol> element renders as a block-level list with each <li> automatically numbered. Browsers apply default padding-left (typically 40px) for the number space. The type attribute can change the numbering style (1, A, a, I, i). The start attribute sets the starting number. The reversed attribute creates a descending list. CSS counters can override the default numbering for advanced styling.",
            beginnerExplanation:
              "When you create an ordered list, the browser automatically numbers each item for you. If you add or remove items, the browser renumbers everything automatically. This is much better than typing 1, 2, 3 manually.",
            beginnerExample:
              '<h2>How to Make Tea</h2>\n<ol>\n  <li>Boil water in a kettle.</li>\n  <li>Place a tea bag in your cup.</li>\n  <li>Pour the hot water over the tea bag.</li>\n  <li>Let it steep for 3-5 minutes.</li>\n  <li>Remove the tea bag.</li>\n  <li>Enjoy your tea!</li>\n</ol>\n<ol type="A">\n  <li>First item (labeled A)</li>\n  <li>Second item (labeled B)</li>\n</ol>',
            commonMistakes:
              "Using <ol> for items where order does not matter (use <ul>), manually typing numbers instead of using <ol>, forgetting to close <li> tags, nesting lists incorrectly, and using CSS to remove numbers without considering accessibility impact.",
            bestPractices:
              "Use <ol> only when the order of items is meaningful, use the type and start attributes appropriately, nest lists properly (entire <ol> inside <li> of parent list), style list markers with CSS (list-style-type), and ensure list semantics are correct for screen readers.",
          },
          quiz: [
            {
              id: "html-ol-1",
              question: "Which HTML element creates a numbered list?",
              options: ["<ol>", "<ul>", "<dl>", "<li>"],
              correctIndex: 0,
              explanation:
                "<ol> (Ordered List) creates a numbered list. <ul> creates a bulleted list, <dl> creates a description list, and <li> is a list item element.",
              difficulty: "easy",
            },
            {
              id: "html-ol-2",
              question:
                "What attribute changes the numbering type to Roman numerals?",
              options: ["type=I", "style=roman", "format=roman", "numbers=roman"],
              correctIndex: 0,
              explanation:
                'The type attribute with value I renders uppercase Roman numerals (I, II, III, IV, etc.). Use i for lowercase Roman numerals.',
              difficulty: "medium",
            },
            {
              id: "html-ol-3",
              question:
                "When you nest an <ol> inside an <li>, how does the numbering behave?",
              options: [
                "The nested list restarts numbering and uses a different style by default",
                "The numbering continues from the parent list",
                "The nested list is not allowed",
                "All items across both lists get sequential numbers",
              ],
              correctIndex: 0,
              explanation:
                "Nested <ol> elements restart numbering at 1 by default. Browsers often automatically use different numbering styles at different nesting levels for clarity (1, a, i, etc.).",
              difficulty: "hard",
            },
          ],
          faangQuestions: [
            {
              question:
                "What is the difference between the <ol> start and value attributes? How do they affect the accessibility tree?",
              answer:
                "The start attribute sets the starting number for the entire list (e.g. start=5 begins at 5). The value attribute on individual <li> elements overrides the number for that specific item (e.g. <li value=10>). In the accessibility tree, both are conveyed correctly: screen readers announce number 5 for the first item if start=5, and number 10 for the item with value=10. However, manually resetting numbers can confuse users if the visual sequence does not match the logical order. Use reversed for descending lists instead of manually setting values.",
              difficulty: "hard",
              company: "Microsoft",
            },
            {
              question:
                "How do ordered lists interact with CSS counter-based numbering? When would you use CSS counters over the HTML type attribute?",
              answer:
                "CSS counters (counter-reset, counter-increment, content: counter()) provide more control over list numbering than HTML type attributes. Use CSS counters when: (1) you need custom separator characters (e.g. 1. vs 1) vs Item 1), (2) you want complex multi-level numbering like 1.1, 1.2, 2.1.1, (3) you need to integrate list numbering with non-list elements, (4) you want different numbering formats for different list levels. However, HTML type attribute is simpler and more accessible by default.",
              difficulty: "hard",
              company: "Google",
            },
          ],
          codingChallenges: [],
        },
        {
          slug: "unordered-list",
          title: "Unordered List",
          order: 2,
          content: {
            overview:
              "The <ul> element creates an unordered (bulleted) list. Like <ol>, each item is wrapped in an <li> element. Unordered lists are used when the sequence of items is not important, such as feature lists, shopping lists, or navigation menus.",
            problemStatement:
              "Many collections of items on a web page do not have a specific order - like bullet points in a presentation, ingredients in a recipe, or features of a product. Without a dedicated element for unordered collections, these would be presented as plain text without visual grouping.",
            intuitionFirst:
              "Think of an unordered list as a to-do list where no task is more important than another. The bullets are just visual markers saying here is another item in this group. The order does not matter - you can rearrange them and the meaning stays the same.",
            realLifeAnalogy:
              "A shopping list is a perfect real-world unordered list. You need flour, eggs, milk, and sugar. It does not matter if you write eggs first or flour first - they are all equally important items you need to buy.",
            howItWorks:
              "The <ul> element renders as a block-level list with each <li> preceded by a bullet marker (typically a disc). Browsers apply default padding-left for the bullet space. The CSS list-style-type property controls the bullet style (disc, circle, square, none). Nested <ul> elements automatically change bullet styles at each level.",
            beginnerExplanation:
              "Use an unordered list when you have a collection of related items where the order does not matter. The browser adds bullets automatically, and you can change the bullet style with CSS.",
            beginnerExample:
              '<h2>Shopping List</h2>\n<ul>\n  <li>Milk</li>\n  <li>Eggs</li>\n  <li>Bread</li>\n  <li>Fruits</li>\n</ul>\n<ul>\n  <li>Frontend Technologies\n    <ul>\n      <li>HTML</li>\n      <li>CSS</li>\n      <li>JavaScript</li>\n    </ul>\n  </li>\n  <li>Backend Technologies\n    <ul>\n      <li>Node.js</li>\n      <li>Python</li>\n    </ul>\n  </li>\n</ul>',
            commonMistakes:
              "Using <ul> when the order of items is important (use <ol>), using <br> between items instead of proper <li> elements, using <ul> for layout purposes (use CSS grid/flexbox), and forgetting to set list-style: none when removing bullets visually (screen readers still need list semantics).",
            bestPractices:
              "Use <ul> only for collections where order is irrelevant, nest lists properly with entire <ul> inside <li>, use CSS list-style-type for bullet customization, maintain list semantics even when visually removing bullets (use list-style: none, not display: block on <li>), and use <ul> for navigation menus.",
          },
          quiz: [
            {
              id: "html-ul-1",
              question:
                "When should you use <ul> instead of <ol>?",
              options: [
                "When the order of items does not matter",
                "When you want bullet points instead of numbers",
                "When the list has fewer than 5 items",
                "When the list contains links",
              ],
              correctIndex: 0,
              explanation:
                "Use <ul> when the sequence of items is not meaningful - the items could be rearranged without changing the meaning. <ol> is for sequences where order matters.",
              difficulty: "easy",
            },
            {
              id: "html-ul-2",
              question:
                "Which CSS property controls the bullet style of an unordered list?",
              options: ["list-style-type", "bullet-style", "marker-type", "list-marker"],
              correctIndex: 0,
              explanation:
                "The CSS list-style-type property controls the marker style for list items. Values include disc, circle, square, none, and many others.",
              difficulty: "medium",
            },
            {
              id: "html-ul-3",
              question:
                "If you remove list bullets with CSS (list-style: none), should you still use <ul> semantically?",
              options: [
                "Yes, because screen readers still need the list semantics for navigation",
                "No, use <div> elements instead",
                "Only if the list has more than 3 items",
                "No, removing bullets means it is no longer a list",
              ],
              correctIndex: 0,
              explanation:
                "Semantic HTML should be maintained regardless of visual presentation. Screen readers announce the number of items in a list and allow navigation between items. Removing visual bullets does not change the semantic meaning.",
              difficulty: "hard",
            },
          ],
          faangQuestions: [
            {
              question:
                "How do screen readers handle nested unordered lists? What announcement differences exist between <ul> and <ol> for accessibility?",
              answer:
                "Screen readers announce the nesting level for nested lists. For a 2-level deep nested <ul>, a screen reader might say List, 3 items, level 1 then List, 2 items, level 2 when entering a nested list. For <ul>, screen readers say bullet or list item without numbering. For <ol>, they announce the number (e.g. Item 1 of 3). This is why using <ol> only when order matters is important - screen reader users rely on these cues.",
              difficulty: "hard",
              company: "Apple",
            },
            {
              question:
                "What are the performance and semantic implications of using <ul> for navigation menus versus using <nav> with <a> elements directly?",
              answer:
                "Using <nav><ul><li><a> for navigation is the most semantic and accessible pattern. The <nav> landmark identifies it as navigation, <ul> groups related links, <li> provides list semantics (screen readers announce X items in navigation), and <a> provides the clickable link. Stripping <ul> and <li> loses the ability for screen reader users to navigate between items with list shortcuts. Performance impact is negligible.",
              difficulty: "medium",
              company: "Amazon",
            },
          ],
          codingChallenges: [],
        },
        {
          slug: "description-list",
          title: "Description List",
          order: 3,
          content: {
            overview:
              "The <dl> element creates a description list (formerly called definition list). It contains groups of terms (<dt>) and their corresponding descriptions (<dd>). It is ideal for glossaries, metadata, key-value pairs, and any content that follows a name-value pattern.",
            problemStatement:
              "Many web content scenarios involve name-value pairs: glossary terms with definitions, product features with descriptions, or metadata fields with values. Using unordered or ordered lists for these cases loses the semantic connection between the term and its description.",
            intuitionFirst:
              "Think of a description list like a dictionary entry. Each word (the term) has one or more definitions (the descriptions). The <dt>-<dd> pairing creates a clear relationship that says this term is defined by this description.",
            realLifeAnalogy:
              "A restaurant menu is a description list. The dish names are the terms (<dt>) - Margherita Pizza, Caesar Salad. The descriptions are the details (<dd>) - Tomato, mozzarella, basil on thin crust, Romaine lettuce, croutons, parmesan, Caesar dressing.",
            howItWorks:
              "The <dl> element wraps the entire list. Inside, <dt> defines a term/name, and <dd> defines the description/value. Multiple <dt> elements can be paired with multiple <dd> elements. Browsers typically render <dd> with indentation (margin-left). The grouping is purely semantic - there is no visual grouping by default beyond indentation.",
            beginnerExplanation:
              "Use a description list when you have terms and their definitions - like a glossary. The browser indents the descriptions to visually show which term they belong to.",
            beginnerExample:
              '<h2>Web Development Glossary</h2>\n<dl>\n  <dt>HTML</dt>\n  <dd>HyperText Markup Language - the standard language for creating web pages.</dd>\n  <dt>CSS</dt>\n  <dd>Cascading Style Sheets - a language for describing the presentation of web pages.</dd>\n  <dt>JavaScript</dt>\n  <dd>A programming language that enables interactive web pages.</dd>\n</dl>',
            commonMistakes:
              "Using <dl> for dialog (use <blockquote> instead), using <ul> or <ol> for term-description pairs, using <br> or <div> inside <dl> instead of <dt> and <dd>, and incorrectly wrapping entire groups in a wrapper element.",
            bestPractices:
              "Use <dl> when there is a clear name-value relationship, use multiple <dt> elements for synonyms and multiple <dd> elements for multiple descriptions, style <dd> indentation with CSS margin rather than relying on defaults, and use <dl> for metadata, glossaries, and FAQ entries.",
          },
          quiz: [
            {
              id: "html-dl-1",
              question:
                "Which element represents the term in a description list?",
              options: ["<dt>", "<dd>", "<dl>", "<term>"],
              correctIndex: 0,
              explanation:
                "<dt> (Definition Term) represents the term or name being defined. <dd> provides the description or value, and <dl> wraps the entire list.",
              difficulty: "easy",
            },
            {
              id: "html-dl-2",
              question:
                "How many <dd> elements can be associated with a single <dt>?",
              options: ["One or more", "Exactly one", "At most two", "None - they are independent"],
              correctIndex: 0,
              explanation:
                "A single <dt> can be associated with multiple <dd> elements. Similarly, multiple <dt> elements can share a single <dd>.",
              difficulty: "medium",
            },
            {
              id: "html-dl-3",
              question:
                "Which of the following is NOT an appropriate use case for <dl>?",
              options: [
                "Marking up a conversation between two people",
                "A glossary of terms with definitions",
                "Product specifications with feature/value pairs",
                "Metadata like Author: John, Date: 2026",
              ],
              correctIndex: 0,
              explanation:
                "<dl> is not appropriate for conversations or dialogue. Use <blockquote> with attribution for dialog. <dl> is for name-value groups like glossaries, specifications, and metadata.",
              difficulty: "hard",
            },
          ],
          faangQuestions: [
            {
              question:
                "How do screen readers and search engines interpret <dl>, <dt>, and <dd> elements differently from <ul>/<ol> lists?",
              answer:
                "Screen readers treat <dl> differently from <ul>/<ol>. They announce definition list with N items. Navigation between <dt> elements is possible but less standardized than <ul>/<ol>. Some screen readers provide next definition shortcuts. The <dt> is announced as the term, and users can choose to hear the associated <dd>. For search engines, <dl> signals a structured name-value relationship, potentially used for rich snippets (like FAQ schema, product specs). Using <dl> appropriately can improve structured data understanding without requiring additional schema markup.",
              difficulty: "hard",
              company: "Google",
            },
            {
              question:
                "Can <dl> contain interactive elements? What are the accessibility implications of nesting <a> or <button> inside <dt> or <dd>?",
              answer:
                "Yes, <dl> can contain interactive elements. The content model of <dt> and <dd> includes flow content, so <a>, <button>, and other interactive elements are valid. For accessibility: interactive elements inside <dt>/<dd> should have clear focus indicators. If <dt> is a clickable term (like an accordion trigger), add role=button and aria-expanded. If <dd> contains links, ensure they are focusable and have descriptive text.",
              difficulty: "hard",
              company: "Mozilla",
            },
          ],
          codingChallenges: [
            {
              title: "Build a Glossary Page with All Three List Types",
              description:
                "Create an HTML page that includes: (1) A table of contents using an ordered list, (2) A feature highlights section using an unordered list, and (3) A glossary of 5 HTML terms using a description list. The page should have proper headings and semantic structure.",
              difficulty: "easy",
              solutionHint:
                "Use <h1> for the page title, then <h2> for each section. For the TOC use <ol> with <a> links. For features use <ul>. For the glossary use <dl> with <dt> for each term and <dd> for the definition.",
            },
          ],
        },
      ],
    },
    {
      slug: "links",
      title: "Links",
      description:
        "Understand how to create hyperlinks for navigation, resources, email, and telephone connections",
      order: 4,
      subtopics: [
        {
          slug: "anchor-tag",
          title: "Anchor Tag",
          order: 1,
          content: {
            overview:
              "The <a> (anchor) element creates a hyperlink to web pages, files, email addresses, locations within the same page, or anything else a URL can address. It is the foundation of web navigation and what makes the web a web of interconnected documents.",
            problemStatement:
              "The web core value is interconnection - the ability to link from one document to another. Before the web, documents existed in isolation. Users needed a way to navigate between related documents, and a standardized linking mechanism was essential for the web to function.",
            intuitionFirst:
              "The anchor tag is like a portal or doorway. When you click a link, you are stepping through a doorway from one room (webpage) to another. The href attribute is the address of where the doorway leads.",
            realLifeAnalogy:
              "Anchor tags are like references in a research paper bibliography, but instantly accessible. Instead of See Smith et al., 2020 (p. 45), you get a clickable reference that takes you directly to the source.",
            howItWorks:
              "The <a> element href attribute specifies the target URL. When clicked, the browser navigates to the specified URL. The target attribute controls where the link opens (_self for same tab, _blank for new tab). The rel attribute describes the relationship (nofollow, noopener, noreferrer for security). The browser tracks visited links with the :visited CSS pseudo-class. Links are focusable by default, enabling keyboard navigation with Tab.",
            beginnerExplanation:
              "A link is created by wrapping text or content in an <a> tag with an href attribute. When users click the link, they are taken to the URL specified in href. The text between the opening and closing tags is what users see and click on.",
            beginnerExample:
              '<a href="https://www.example.com">Visit Example Website</a>\n<a href="/about">About Us (relative URL)</a>\n<a href="#section2">Jump to Section 2 (same page)</a>\n<a href="https://www.example.com" target="_blank" rel="noopener noreferrer">Open in New Tab (secure)</a>\n<a href="/files/document.pdf" download="Guide.pdf">Download PDF Guide</a>',
            commonMistakes:
              "Using click here as link text (bad for SEO and accessibility), forgetting rel=noopener noreferrer for _blank links (security risk), leaving href empty or using href=# for JavaScript links, and not distinguishing visited links visually.",
            bestPractices:
              "Use descriptive meaningful link text that works out of context, always add rel=noopener noreferrer when using target=_blank, use relative URLs for same-site links, provide fallback text for icon-only links (aria-label), and ensure link focus states are visible for keyboard users.",
          },
          quiz: [
            {
              id: "html-anchor-1",
              question: "Which attribute defines the destination URL in an anchor tag?",
              options: ["href", "src", "link", "url"],
              correctIndex: 0,
              explanation:
                "The href (hypertext reference) attribute specifies the URL the link navigates to. It can point to external pages, internal files, page fragments, email, or telephone numbers.",
              difficulty: "easy",
            },
            {
              id: "html-anchor-2",
              question:
                "Why should you add rel=noopener noreferrer when using target=_blank?",
              options: [
                "To prevent the new page from accessing the original page via window.opener",
                "To make the link open faster",
                "To ensure the link works in all browsers",
                "To add a tracking parameter to the URL",
              ],
              correctIndex: 0,
              explanation:
                "Without rel=noopener noreferrer, the opened page can access window.opener to manipulate the original page (tabnabbing vulnerability). noopener prevents this, and noreferrer hides the referrer information.",
              difficulty: "medium",
            },
            {
              id: "html-anchor-3",
              question:
                "What happens if an <a> tag has no href attribute?",
              options: [
                "It renders as plain text and is not keyboard-focusable",
                "It still navigates to the current page",
                "It automatically links to the page URL",
                "The browser throws a validation error",
              ],
              correctIndex: 0,
              explanation:
                "An anchor tag without an href is a placeholder link. It renders as regular text, is not focusable via keyboard, and does not behave as a link.",
              difficulty: "hard",
            },
          ],
          faangQuestions: [
            {
              question:
                "Explain the security implications of target=_blank without rel=noopener. Describe the tabnabbing vulnerability in detail.",
              answer:
                "Tabnabbing is a phishing attack that exploits window.opener. When a page opens a link with target=_blank (no rel=noopener), the new page gets a reference to the original page window object via window.opener. The malicious page can then redirect the original page to a phishing site using window.opener.location = fake-login-page. When the user returns to the original tab (now a fake login page), they may enter credentials thinking it is the legitimate site. rel=noopener sets window.opener to null, preventing this. rel=noreferrer additionally hides the HTTP Referer header.",
              difficulty: "hard",
              company: "Google",
            },
            {
              question:
                "How does the browser determine which links to prerender or prefetch? What HTML attributes or elements control this behavior?",
              answer:
                "Browsers use the <link> element with rel attributes: prefetch (speculative fetch for future navigation, low priority), preload (for current page resources, high priority), prerender (renders entire page in background - deprecated/limited), dns-prefetch (resolves DNS early), preconnect (DNS + TCP/TLS handshake). For <a> elements, Chrome speculation rules API enables prefetching based on user behavior. Modern approaches include using the Speculation Rules API (JSON config) for more sophisticated prefetching strategies.",
              difficulty: "hard",
              company: "Google",
            },
          ],
          codingChallenges: [],
        },
        {
          slug: "internal-links",
          title: "Internal Links",
          order: 2,
          content: {
            overview:
              "Internal links connect different pages within the same website using relative URLs. They are crucial for site navigation, establishing information hierarchy, and distributing page authority throughout the site.",
            problemStatement:
              "A multi-page website needs a way to connect its pages together. Using absolute URLs for same-site links creates maintenance issues (breaking if the domain changes) and does not leverage the site directory structure. A relative addressing system is needed.",
            intuitionFirst:
              "Internal links are like hallways and doors within a building. You do not need the full street address to go from the lobby to the third floor - you just need to know which hallway (directory) and room (page) to go to.",
            realLifeAnalogy:
              "Think of a website like a house. External links are like the front door (address). Internal links are the internal doors connecting rooms. You navigate from the living room to the kitchen using relative paths rather than full addresses.",
            howItWorks:
              "Relative URLs are resolved by the browser based on the current page URL. Types: relative (href=about.html resolves from current directory), root-relative (href=/about resolves from domain root), and directory traversal (href=../about.html goes up one level). Internal links do not include the protocol or domain. They are faster, easier to maintain, and work across different environments.",
            beginnerExplanation:
              "Internal links use relative paths that are shorter and more maintainable than full URLs. For example, instead of linking to https://mysite.com/about, you can just use /about. This makes your site easier to move between servers.",
            beginnerExample:
              '<nav>\n  <ul>\n    <li><a href="/">Home</a></li>\n    <li><a href="/about">About</a></li>\n    <li><a href="/blog">Blog</a></li>\n    <li><a href="/contact">Contact</a></li>\n  </ul>\n</nav>\n<p>If current page is: https://example.com/blog/index.html</p>\n<ul>\n  <li><a href="post1.html">Post 1</a> (same directory: /blog/post1.html)</li>\n  <li><a href="../about.html">About</a> (up one level: /about.html)</li>\n  <li><a href="/contact">Contact</a> (root-relative: /contact)</li>\n</ul>',
            commonMistakes:
              "Using absolute URLs (https://...) for internal links, using broken relative paths, forgetting to update links when restructuring the site, and using too many directory levels in paths leading to fragility.",
            bestPractices:
              "Use root-relative paths (/about) for site-wide navigation and relative paths (../page.html) for content within the same directory section, avoid excessively deep directory structures, test all internal links after site changes, and use descriptive anchor text.",
          },
          quiz: [
            {
              id: "html-internal-1",
              question:
                "What is a relative URL?",
              options: [
                "A URL that is resolved relative to the current page or domain root",
                "A URL that uses HTTPS protocol",
                "A URL that points to another website",
                "A URL that contains query parameters",
              ],
              correctIndex: 0,
              explanation:
                "A relative URL is specified relative to the current page location or domain root. It does not include protocol or domain parts and is resolved by the browser based on the current page URL.",
              difficulty: "easy",
            },
            {
              id: "html-internal-2",
              question:
                "What does href=/about resolve to on a page at https://example.com/blog/post.html?",
              options: [
                "https://example.com/about",
                "https://example.com/blog/about",
                "https://example.com/blog/post/about",
                "about.html in the current directory",
              ],
              correctIndex: 0,
              explanation:
                "A leading slash (/) means root-relative. It resolves from the domain root, so /about always goes to https://example.com/about regardless of the current page path.",
              difficulty: "medium",
            },
            {
              id: "html-internal-3",
              question:
                "What is the main advantage of using relative URLs for internal links?",
              options: [
                "They work across different environments (local, staging, production)",
                "They load faster than absolute URLs",
                "They are automatically indexed by search engines",
                "They do not require an href attribute",
              ],
              correctIndex: 0,
              explanation:
                "Relative URLs work across different environments because they do not include the domain name. This means the same code works on localhost, staging, and production without modification.",
              difficulty: "medium",
            },
          ],
          faangQuestions: [
            {
              question:
                "How do internal linking structures affect SEO and page authority distribution? What is a silo structure?",
              answer:
                "Internal linking distributes page authority (PageRank) throughout a site. A well-structured internal linking strategy ensures important pages receive more link equity. A silo structure organizes content into thematic groups where pages within a silo link primarily to each other, creating topical authority. Benefits: (1) establishes content hierarchy for search engines, (2) distributes ranking power to important pages, (3) reduces bounce rate by providing relevant next steps, (4) helps search engines discover all pages. Best practice: use a flat hierarchy (any page reachable within 3-4 clicks from homepage), use descriptive anchor text, and link to related content naturally.",
              difficulty: "hard",
              company: "Google",
            },
            {
              question:
                "How does the browser resolve relative URLs? Explain the algorithm step by step.",
              answer:
                "The browser resolution algorithm: (1) If the URL starts with //, use the current protocol. (2) If it starts with /, resolve relative to the domain root. (3) If it starts with ./ or just a path, resolve relative to the current directory. (4) If it starts with ../, go up one directory level from the current path. (5) If there is a base URL set via <base> tag, that becomes the base for all relative URLs. The algorithm uses the URL of the current page as the base URL unless overridden by the <base> element.",
              difficulty: "hard",
              company: "Microsoft",
            },
          ],
          codingChallenges: [],
        },
        {
          slug: "external-links",
          title: "External Links",
          order: 3,
          content: {
            overview:
              "External links point to resources on different domains or websites. They require absolute URLs (including protocol and domain) and have specific considerations for security, SEO, and user experience.",
            problemStatement:
              "When linking to other websites, developers need to ensure users can navigate away safely, search engines understand the relationship, and security vulnerabilities are prevented. External links also affect SEO through the linking site authority.",
            intuitionFirst:
              "External links are like roads leading out of your town to other cities. You need to provide clear directions (full URL), warn travelers about what to expect (rel attributes), and ensure your town is not vulnerable to attacks from the road.",
            realLifeAnalogy:
              "An external link is like referring a friend to another business. You give them the full address (complete URL), warn them if the business might be fishy (rel=nofollow), and make sure the visit does not compromise your own security.",
            howItWorks:
              "External links use absolute URLs: protocol + domain + path. The rel attribute controls the relationship: rel=nofollow tells search engines not to pass authority, rel=noopener prevents tabnabbing, rel=sponsored identifies paid links, rel=ugc marks user-generated content. Browsers typically indicate external links with a different icon or styling.",
            beginnerExplanation:
              "When you link to a different website, you must use the complete URL including https://. Always add rel=noopener noreferrer when opening external links in a new tab to protect your site from security risks.",
            beginnerExample:
              '<a href="https://www.google.com">Search Google</a>\n<a href="https://github.com" target="_blank" rel="noopener noreferrer">Visit GitHub (new tab, secure)</a>\n<a href="https://sponsored-site.com" rel="sponsored nofollow">Sponsored Content</a>\n<a href="https://user-forum.com" rel="ugc">User Forum Post</a>',
            commonMistakes:
              "Forgetting rel=noopener for _blank links (security vulnerability), using rel=nofollow on all external links unnecessarily, not visually distinguishing external links for users, and using absolute URLs for what should be internal links.",
            bestPractices:
              "Always add rel=noopener noreferrer for _blank external links, use rel=nofollow for untrusted content, use rel=sponsored for paid links, use rel=ugc for user-generated content, notify users when opening a new tab, and style external links with an indicator icon.",
          },
          quiz: [
            {
              id: "html-external-1",
              question:
                "What is an absolute URL?",
              options: [
                "A complete URL including protocol and domain",
                "A URL without the domain name",
                "A URL that always starts with a slash",
                "A URL that points to the current page",
              ],
              correctIndex: 0,
              explanation:
                "An absolute URL includes the complete path: protocol (https://), domain (example.com), and path (/page). External links always use absolute URLs.",
              difficulty: "easy",
            },
            {
              id: "html-external-2",
              question:
                "Which rel value should be used for paid or sponsored links?",
              options: ["sponsored", "paid", "ad", "commercial"],
              correctIndex: 0,
              explanation:
                "rel=sponsored identifies links that are part of advertisements, sponsorships, or paid placements. This helps search engines understand the nature of the link.",
              difficulty: "medium",
            },
            {
              id: "html-external-3",
              question:
                "What does rel=nofollow tell search engines?",
              options: [
                "Not to pass link authority or ranking credit to the linked page",
                "Not to index the current page",
                "Not to follow any links on the linked page",
                "Not to cache the linked page",
              ],
              correctIndex: 0,
              explanation:
                "rel=nofollow tells search engines not to pass PageRank or authority to the linked page. It is used for untrusted content, user-generated links, and paid links.",
              difficulty: "medium",
            },
          ],
          faangQuestions: [
            {
              question:
                "What is the difference between nofollow, sponsored, and ugc link attributes? How should each be used for SEO compliance?",
              answer:
                "nofollow: tells search engines not to pass link equity. Use for untrusted or unverified links. sponsored: specifically identifies paid links, advertisements, or sponsored content. This replaces nofollow for commercial links per Google guidelines. ugc: marks user-generated content links (comments, forum posts). All three prevent passing PageRank. Using the correct attribute helps Google understand the link context and avoid penalties. Google treats all three the same for ranking, but the semantic distinction helps with future algorithm updates. Best practice: use sponsored for affiliate/paid, ugc for comments/forums, and nofollow for untrusted or crawled links.",
              difficulty: "hard",
              company: "Google",
            },
            {
              question:
                "How does Google use external links for ranking? Explain PageRank and link authority.",
              answer:
                "PageRank is Google algorithm that measures the importance of web pages by counting the quantity and quality of links pointing to them. Each external link is seen as a vote of confidence. Higher authority sites passing links provide more value. Factors that affect link value: (1) authority of the linking domain, (2) relevance of the linking page content, (3) whether the link is editorial or paid (nofollow/sponsored), (4) the anchor text used, (5) the position of the link on the page. Google Penguin update penalizes sites with unnatural link profiles. Modern SEO emphasizes link quality over quantity.",
              difficulty: "hard",
              company: "Google",
            },
          ],
          codingChallenges: [],
        },
        {
          slug: "email-links",
          title: "Email Links",
          order: 4,
          content: {
            overview:
              "Email links use the mailto: URI scheme in an anchor tag href attribute to open the user default email client with a pre-populated message. They can specify recipients, subject, body, CC, and BCC fields.",
            problemStatement:
              "Websites often need to provide a way for users to send emails. Providing a raw email address requires users to copy it and manually open their email client. A standardized way to launch the email client with pre-filled fields streamlines communication.",
            intuitionFirst:
              "An email link is like a pre-addressed envelope. Instead of writing the address yourself, you receive an envelope where the address, subject line, and even the message body are already filled in - you just need to hit send.",
            realLifeAnalogy:
              "Think of a mailto link like a pre-printed postcard with the recipients address already written. You just add your message and drop it in the mailbox. The mailto link does the addressing for you.",
            howItWorks:
              "The mailto: URI scheme is followed by one or more email addresses. Parameters like ?subject=, &body=, &cc=, &bcc= can be appended. Spaces should be encoded as %20, and line breaks as %0A. The browser intercepts the click and opens the default email client (Outlook, Gmail web, Apple Mail, etc.) with the provided parameters pre-filled.",
            beginnerExplanation:
              "When you click an email link, your computer opens your email program with a new message already addressed. You can even pre-fill the subject line and body text to make it easier for your users.",
            beginnerExample:
              '<a href="mailto:info@example.com">Send us an email</a>\n<a href="mailto:support@example.com?subject=Help%20Request&body=I%20need%20assistance%20with...">Request Support</a>\n<a href="mailto:team@example.com?cc=manager@example.com&bcc=archive@example.com&subject=Meeting%20Request">Schedule Meeting</a>',
            commonMistakes:
              "Not URL-encoding spaces and special characters in subject/body, forgetting that mobile devices may not handle mailto: links well, not providing a fallback for users without configured email clients, and exposing email addresses to spam bots (use contact forms instead).",
            bestPractices:
              "URL-encode all parameters, provide a fallback contact form for users without email clients, consider using contact forms rather than mailto links to avoid spam harvesting, keep subject lines concise, and test across different email clients and devices.",
          },
          quiz: [
            {
              id: "html-email-1",
              question:
                "What URI scheme is used for email links?",
              options: ["mailto:", "email:", "sendto:", "mail:"],
              correctIndex: 0,
              explanation:
                "The mailto: URI scheme is the standard way to create email links in HTML. It opens the user default email client with pre-populated fields.",
              difficulty: "easy",
            },
            {
              id: "html-email-2",
              question:
                "How do you add a subject line to an email link?",
              options: [
                'href="mailto:user@example.com?subject=Hello"',
                'href="mailto:user@example.com&subject=Hello"',
                'href="mailto:user@example.com/subject=Hello"',
                'href="mailto:subject=Hello/user@example.com"',
              ],
              correctIndex: 0,
              explanation:
                "The subject parameter is added after the email address with a question mark: ?subject=YourSubject. Multiple parameters are separated by &.",
              difficulty: "medium",
            },
            {
              id: "html-email-3",
              question:
                "What is a downside of using mailto links on a public website?",
              options: [
                "Email addresses can be harvested by spambots",
                "They do not work on any browser",
                "They require JavaScript to function",
                "They only work with Gmail",
              ],
              correctIndex: 0,
              explanation:
                "Email addresses in mailto links are easily harvested by automated spambots. Consider using contact forms, obfuscation techniques, or JavaScript-based solutions to protect email addresses.",
              difficulty: "medium",
            },
          ],
          faangQuestions: [
            {
              question:
                "How do different browsers and operating systems handle mailto: links? What happens if no email client is configured?",
              answer:
                "On desktop: Windows opens the default mail client (Outlook, Mail app) or prompts to choose an app. macOS opens Apple Mail by default. On mobile: Android and iOS open the native mail app or show a chooser dialog. If no email client is configured: browsers may show an error dialog, do nothing, or (in modern Chrome) open the web-based Gmail compose if the user is logged in. The behavior is OS-specific and browser-specific. Developers should provide fallback options like a contact form link when possible.",
              difficulty: "hard",
              company: "Microsoft",
            },
            {
              question:
                "What are the security and privacy concerns with mailto links? How can developers mitigate email harvesting?",
              answer:
                "Security concerns: (1) Spambots scrape mailto: links from HTML source, (2) exposed email addresses increase spam risk, (3) mailto: can be used in phishing if users do not verify the recipient. Mitigation techniques: (1) use contact forms instead of mailto links, (2) obfuscate email addresses with JavaScript (e.g. build the href dynamically), (3) use HTML entities to encode characters, (4) use services like CloudFlare Email Protection, (5) encode email as images (bad for accessibility), (6) use rel=noreferrer with mailto links. Best practice: use a server-side contact form handler for public sites and reserve mailto for internal applications or authenticated contexts.",
              difficulty: "hard",
              company: "Amazon",
            },
          ],
          codingChallenges: [],
        },
        {
          slug: "telephone-links",
          title: "Telephone Links",
          order: 5,
          content: {
            overview:
              "Telephone links use the tel: URI scheme to make phone numbers clickable on mobile devices and desktop applications. Clicking a telephone link initiates a call on mobile devices or opens a dialer application.",
            problemStatement:
              "On mobile devices, users expect to tap a phone number to call it directly. Without a standardized way to mark up phone numbers, users would have to memorize or copy-paste numbers into their phone dialer, creating friction in the user experience.",
            intuitionFirst:
              "Telephone links are like speed dial buttons. Instead of manually dialing a number, you just press a button and your phone starts calling. The tel: link does this for phone numbers on web pages.",
            realLifeAnalogy:
              "Think of a telephone link like a business card with a tap-to-call button on it. Instead of typing the number into your phone, you tap the number and it immediately starts dialing.",
            howItWorks:
              "The tel: URI scheme followed by the phone number initiates a call on supported devices. The number should include the country code (+1 for US, +44 for UK, etc.). On mobile devices, tapping the link opens the dialer with the number pre-filled. On desktop, it may open calling apps like Skype or FaceTime, or show a dialog with the number.",
            beginnerExample:
              '<a href="tel:+1234567890">Call us: +1 (234) 567-890</a>\n<a href="tel:+1234567890" aria-label="Call our support team">\n  <svg><!-- phone icon --></svg> Call Support\n</a>',
            commonMistakes:
              "Omitting the country code (essential for international visitors), using spaces or special characters that may not parse correctly, not providing the phone number as visible text for non-clickable contexts (printed pages), and forgetting that desktop users may not be able to make calls.",
            bestPractices:
              "Always include the country code (e.g. +1 for US/Canada), format the visible number for human readability (e.g. +1 (234) 567-890), use the href with plain digits only (no spaces/dashes), provide the phone number as visible text for non-clickable scenarios, and consider offering a fallback for desktop users.",
          },
          quiz: [
            {
              id: "html-tel-1",
              question:
                "What URI scheme is used for telephone links?",
              options: ["tel:", "phone:", "call:", "dial:"],
              correctIndex: 0,
              explanation:
                "The tel: URI scheme creates clickable telephone links. On mobile devices, it initiates a call. On desktop, it may open calling applications.",
              difficulty: "easy",
            },
            {
              id: "html-tel-2",
              question:
                "Why should you include the country code in a telephone link?",
              options: [
                "So the number works for international visitors",
                "It is not necessary, country code is optional",
                "To make the link look professional",
                "To prevent spam calls",
              ],
              correctIndex: 0,
              explanation:
                "Including the country code (+ prefix) ensures the number works correctly for all users, regardless of their location or mobile carrier.",
              difficulty: "medium",
            },
            {
              id: "html-tel-3",
              question:
                "What happens on a desktop computer when a user clicks a tel: link?",
              options: [
                "It may open a calling application or show the number depending on the OS",
                "Nothing, tel: links only work on mobile",
                "It sends an SMS message instead",
                "It copies the number to the clipboard",
              ],
              correctIndex: 0,
              explanation:
                "On desktop, tel: links may open applications like Skype, FaceTime, or Windows Phone Link, or prompt the user to choose a calling app. Some browsers show the number and let the user copy it.",
              difficulty: "hard",
            },
          ],
          faangQuestions: [
            {
              question:
                "How do tel: links interact with click-to-call analytics and conversion tracking? What considerations exist for privacy regulations?",
              answer:
                "Click-to-call tracking can be implemented via: (1) JavaScript event listeners on tel: links to fire analytics events, (2) Google Click-to-Call tracking which wraps the number, (3) Google Ads call extensions for paid search. For privacy: GDPR requires consent before tracking calls, TCPA (US) regulates automated calls, and call recording requires disclosure. tel: links themselves do not expose user data, but analytics platforms may collect call duration and outcome. Best practice: implement call tracking with proper privacy disclosures and obtain consent where required.",
              difficulty: "hard",
              company: "Google",
            },
            {
              question:
                "What is the correct format for international telephone numbers in tel: links? How does the RFC 3966 standard apply?",
              answer:
                "RFC 3966 (the tel URI standard) specifies: tel:+[country code][subscriber number]. The number must start with + followed by the country code. No spaces, hyphens, or parentheses in the href. Example: tel:+1234567890. The visible text can be formatted for readability: +1 (234) 567-890. Extensions can be added: tel:+1234567890;ext=123. The visual format should match local conventions for the target audience. The URI format (all digits) ensures maximum compatibility across devices and browsers.",
              difficulty: "hard",
              company: "Apple",
            },
          ],
          codingChallenges: [],
        },
      ],
    },
    {
      slug: "media",
      title: "Media",
      description:
        "Explore how to embed images, audio, video, and iframes to create rich multimedia experiences",
      order: 5,
      subtopics: [
        {
          slug: "images",
          title: "Images",
          order: 1,
          content: {
            overview:
              "The <img> element embeds an image into an HTML page. It is a self-closing tag that requires at minimum the src (source URL) and alt (alternative text) attributes. Images make web pages visually engaging and convey information that text alone cannot.",
            problemStatement:
              "Web pages need to display visual content - photographs, illustrations, diagrams, and icons. Without a standardized image embedding mechanism, visual content could not be integrated with text, and users with visual impairments would have no way to understand image content.",
            intuitionFirst:
              "Think of the <img> tag as a picture frame on a wall. The src attribute tells you which picture to put in the frame, and the alt attribute is like a label beneath the frame describing the picture for people who cannot see it.",
            realLifeAnalogy:
              "An <img> tag is like a framed photograph. The src is the photo itself, the alt text is the caption written on the back for someone who cannot see the photo, and width/height are the frame dimensions.",
            howItWorks:
              "The browser sends an HTTP request for the image file specified in the src attribute. While the image loads, the browser reserves space if width/height are specified (preventing layout shift). The alt text is read by screen readers and displayed if the image fails to load. Modern responsive images use srcset and sizes attributes for different screen resolutions. The loading attribute (lazy vs eager) controls lazy loading behavior.",
            beginnerExplanation:
              "To add an image, you tell the browser where the image file is located (src) and provide a text description of what the image shows (alt). The browser downloads and displays the image automatically.",
            beginnerExample:
              '<img src="photo.jpg" alt="A beautiful sunset over the ocean">\n<img src="logo.svg" alt="Company Logo" width="200" height="100">\n<img src="photo.jpg"\n  srcset="photo-400w.jpg 400w, photo-800w.jpg 800w, photo-1200w.jpg 1200w"\n  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"\n  alt="Responsive image example">',
            commonMistakes:
              "Forgetting the alt attribute (accessibility failure), not specifying width/height (causes layout shift), using oversized images (hurts performance), not using srcset for responsive images, and using images when CSS could achieve the same effect.",
            bestPractices:
              "Always include descriptive alt text, specify width and height to prevent Cumulative Layout Shift (CLS), use modern formats (WebP, AVIF) with fallback via <picture>, optimize images for web (compress, resize), use srcset for responsive images, implement lazy loading with loading=lazy, and use SVG for icons and logos.",
            performanceNotes:
              "Images account for 60-70% of a typical webpage weight. Best practices: compress with tools like imagemin, use responsive images (srcset/sizes), implement lazy loading, use CDN for delivery, and consider using HTTP/2 for parallel loading.",
          },
          quiz: [
            {
              id: "html-img-1",
              question: "Which attribute provides alternative text for screen readers?",
              options: ["alt", "title", "desc", "aria-label"],
              correctIndex: 0,
              explanation:
                "The alt attribute provides alternative text for images. It is read by screen readers, displayed when the image fails to load, and used by search engines.",
              difficulty: "easy",
            },
            {
              id: "html-img-2",
              question:
                "What is the purpose of the srcset attribute on an <img> element?",
              options: [
                "To provide different image versions for different screen sizes and resolutions",
                "To set the image source URL",
                "To add a fallback image if the primary one fails",
                "To preload images before they are needed",
              ],
              correctIndex: 0,
              explanation:
                "The srcset attribute allows the browser to choose the best image version based on the device screen size, resolution, and pixel density. It is part of responsive image techniques.",
              difficulty: "medium",
            },
            {
              id: "html-img-3",
              question:
                "How do width and height attributes on <img> help with Core Web Vitals?",
              options: [
                "They reserve space for the image, preventing Cumulative Layout Shift (CLS)",
                "They make the image load faster",
                "They compress the image automatically",
                "They improve the image quality",
              ],
              correctIndex: 0,
              explanation:
                "Specifying width and height attributes reserves the image space in the layout before the image loads, preventing content from shifting around as images load - this improves the CLS metric.",
              difficulty: "hard",
            },
          ],
          faangQuestions: [
            {
              question:
                "How do modern image formats (WebP, AVIF) compare to legacy formats (JPEG, PNG, GIF)? What are the browser support considerations?",
              answer:
                "WebP offers 25-35% smaller file sizes than JPEG for similar quality, supports transparency and animation. AVIF offers 50% smaller than JPEG with better HDR and wide color gamut support. Legacy: JPEG (lossy, photos), PNG (lossless, transparency, diagrams), GIF (animation, limited 256 colors). Browser support: WebP supported in Chrome, Firefox, Edge, Safari 14+. AVIF supported in Chrome, Firefox, Opera, Safari 16.4+. For compatibility, use <picture> element with multiple <source> elements providing different formats and a fallback <img> for legacy browsers.",
              difficulty: "hard",
              company: "Google",
            },
            {
              question:
                "Explain the loading attribute on <img> elements. How does native lazy loading work and what are its limitations?",
              answer:
                "The loading attribute accepts: eager (load immediately, default), lazy (defer loading until the image is near the viewport), auto (browser default). Native lazy loading (loading=lazy) delays loading off-screen images until the user scrolls near them, using IntersectionObserver internally. Benefits: reduces initial page weight, saves bandwidth, improves load time. Limitations: (1) the browser still needs to know the image dimensions (set width/height), (2) lazy images may not be discovered by search engine crawlers as quickly, (3) not suitable for above-the-fold images (affects LCP), (4) JavaScript-based lazy loading offers more control (custom thresholds, placeholders). Chrome and Firefox were first to implement; Safari added in 15.4+.",
              difficulty: "hard",
              company: "Google",
            },
          ],
          codingChallenges: [],
        },
        {
          slug: "audio",
          title: "Audio",
          order: 2,
          content: {
            overview:
              "The <audio> element embeds sound content in web pages. It supports playback controls, multiple source formats for browser compatibility, and various attributes to control playback behavior like autoplay, looping, and preloading.",
            problemStatement:
              "Web pages needed a standardized way to play audio files without relying on third-party plugins like Flash or Silverlight. Users expect to listen to music, podcasts, and sound effects directly in the browser with native controls.",
            intuitionFirst:
              "The <audio> element is like a built-in music player on your webpage. Instead of having to download an audio file and open it in a separate application, users can play it right where they are browsing.",
            realLifeAnalogy:
              "Think of the <audio> element like a portable radio built into the webpage. It has play, pause, and volume controls (if you add the controls attribute), and you can tune into different audio streams or files.",
            howItWorks:
              "The browser checks each <source> element in order and plays the first format it supports. Common formats: MP3 (broad support), AAC, OGG, WAV. The controls attribute adds a native playback UI. The autoplay attribute starts playback automatically (often blocked by browsers). The loop attribute repeats playback. The preload attribute hints at what to preload (none, metadata, auto).",
            beginnerExample:
              '<audio controls>\n  <source src="music.mp3" type="audio/mpeg">\n  <source src="music.ogg" type="audio/ogg">\n  Your browser does not support the audio element.\n</audio>\n<audio controls autoplay loop>\n  <source src="background.mp3" type="audio/mpeg">\n</audio>',
            commonMistakes:
              "Only providing one audio format (browser may not support it), forgetting the controls attribute (users cannot play/pause), relying on autoplay (browsers block it), and not providing fallback content for unsupported browsers.",
            bestPractices:
              "Provide at least two formats (MP3 + OGG/WAV for broad compatibility), include the controls attribute, set preload=metadata to reduce bandwidth, provide fallback text between the tags, and respect browser autoplay policies (do not rely on autoplay for critical content).",
            performanceNotes:
              "Audio files should be compressed appropriately: MP3 at 128-192 kbps for music, 64-96 kbps for speech/podcasts. Consider using the preload attribute strategically: none for many-page sites, metadata for most cases, auto for the primary audio page.",
          },
          quiz: [
            {
              id: "html-audio-1",
              question:
                "Which attribute adds play/pause/volume controls to an audio player?",
              options: ["controls", "player", "toolbar", "showcontrols"],
              correctIndex: 0,
              explanation:
                "The controls attribute adds the browser native audio controls including play/pause button, volume slider, seek bar, and current time display.",
              difficulty: "easy",
            },
            {
              id: "html-audio-2",
              question:
                "Why should you provide multiple <source> elements inside an <audio> element?",
              options: [
                "To ensure browser compatibility with different audio formats",
                "To play multiple audio files simultaneously",
                "To create a playlist",
                "To adjust volume levels",
              ],
              correctIndex: 0,
              explanation:
                "Different browsers support different audio formats. Providing MP3 and OGG sources ensures the audio plays across all major browsers. The browser uses the first format it supports.",
              difficulty: "medium",
            },
            {
              id: "html-audio-3",
              question:
                "Why might the autoplay attribute not work in modern browsers?",
              options: [
                "Browsers block autoplay with audio to prevent unwanted noise",
                "Autoplay is a deprecated attribute",
                "It only works with the controls attribute present",
                "It requires a user gesture first",
              ],
              correctIndex: 0,
              explanation:
                "Modern browsers block autoplay for audio (and video with audio) to prevent intrusive autoplay experiences. Autoplay is generally allowed if the media is muted or if the user has interacted with the site.",
              difficulty: "hard",
            },
          ],
          faangQuestions: [
            {
              question:
                "How does the Audio element work with the Web Audio API? When would you use one vs the other?",
              answer:
                "<audio> is a declarative HTML element for simple playback needs - play an audio file with controls. Web Audio API is a JavaScript API for advanced audio processing - generating sounds, applying effects (reverb, EQ), visualizing audio (spectrum analysis), spatial audio, and real-time manipulation. Use <audio> for: playing podcasts, background music, sound effects with basic controls. Use Web Audio API for: audio visualization, audio synthesis, game audio, voice processing, multi-track mixing, or when you need precise timing and low-latency playback. They can be combined: you can feed an <audio> element into the Web Audio API via AudioSourceNode for processing.",
              difficulty: "hard",
              company: "Google",
            },
            {
              question:
                "What are the accessibility considerations for the <audio> element? How should transcripts and captions be provided?",
              answer:
                "Accessibility considerations: (1) Provide a text transcript of the audio content for deaf users - this can be a link to a transcript page or visible text on the page. (2) Ensure controls are keyboard accessible (Tab to focus, Space/Enter to play/pause). (3) Use aria-label on the audio element if it lacks visible controls. (4) Avoid autoplay as it interferes with screen readers. (5) Indicate the audio duration before users start playback. (6) For podcasts or spoken content, provide chapter markers. HTML5 does not have native captions for <audio> (unlike <video> with <track>), so transcripts are the primary accessibility solution.",
              difficulty: "hard",
              company: "Apple",
            },
          ],
          codingChallenges: [],
        },
        {
          slug: "video",
          title: "Video",
          order: 3,
          content: {
            overview:
              "The <video> element embeds video content in web pages. It supports multiple source formats, built-in controls, subtitles/captions via <track> elements, and attributes controlling playback behavior, size, and appearance.",
            problemStatement:
              "Before HTML5, embedding video on the web required third-party plugins like Flash or Silverlight, which had security issues, poor performance, and limited mobile support. A native browser video solution was needed.",
            intuitionFirst:
              "The <video> element is like having a built-in video player on your website. It works just like YouTube or Vimeo embedded players, but without requiring external services or plugins.",
            realLifeAnalogy:
              "Think of the <video> element as a television built into your webpage. You can change channels (different video files), adjust volume, and turn subtitles on and off - all without leaving the page.",
            howItWorks:
              "The browser checks each <source> for a supported format. Modern formats: MP4 (H.264) has universal support, WebM (VP9) is good for Chrome/Firefox, and HEVC (H.265) on Apple devices. The <track> element adds WebVTT subtitle/caption tracks. Attributes: controls, autoplay, muted, loop, poster (thumbnail), playsinline (iPhone). The video element can be styled with CSS and manipulated with JavaScript via the HTMLMediaElement API.",
            beginnerExample:
              '<video controls width="640" poster="thumbnail.jpg">\n  <source src="video.mp4" type="video/mp4">\n  <source src="video.webm" type="video/webm">\n  <track src="subtitles.vtt" kind="subtitles" srclang="en" label="English">\n  <p>Your browser does not support HTML video.</p>\n</video>\n<video controls muted autoplay loop>\n  <source src="background-video.mp4" type="video/mp4">\n</video>',
            commonMistakes:
              "Only providing one video format, forgetting controls (users cannot play/pause), not including a poster image, not using muted with autoplay (will be blocked), and not providing captions/subtitles for accessibility.",
            bestPractices:
              "Provide MP4 (H.264) and WebM formats, include controls attribute, use a poster image to show a preview before playback, always mute autoplay videos, add captions via <track>, optimize video compression for web (cloud encoding services help), and consider lazy loading below-the-fold videos.",
          },
          quiz: [
            {
              id: "html-video-1",
              question:
                "Which element is used to add subtitles or captions to a video?",
              options: ["<track>", "<caption>", "<subtitle>", "<text>"],
              correctIndex: 0,
              explanation:
                "The <track> element specifies timed text tracks (subtitles, captions, descriptions, chapters) for <video> and <audio> elements. It uses WebVTT format files.",
              difficulty: "easy",
            },
            {
              id: "html-video-2",
              question:
                "What is the purpose of the poster attribute on a <video> element?",
              options: [
                "To show an image while the video is downloading or before playback",
                "To display a watermark on the video",
                "To add a frame border around the video",
                "To set the video thumbnail for social media sharing",
              ],
              correctIndex: 0,
              explanation:
                "The poster attribute specifies an image to show while the video is downloading or until the user presses play. It acts as a video thumbnail.",
              difficulty: "medium",
            },
            {
              id: "html-video-3",
              question:
                "Why must autoplay videos also include the muted attribute in most browsers?",
              options: [
                "Browsers require autoplay videos to be muted to prevent intrusive playback",
                "It is only for iPhone compatibility",
                "It reduces bandwidth usage",
                "It improves video quality",
              ],
              correctIndex: 0,
              explanation:
                "Modern browsers block autoplay of any video that has audio. The muted attribute must be present (or the video must lack an audio track) for autoplay to work. This prevents unwanted noise from auto-playing videos.",
              difficulty: "medium",
            },
          ],
          faangQuestions: [
            {
              question:
                "What factors affect video loading and playback performance on the web? How can developers optimize video delivery?",
              answer:
                "Key factors: (1) File size - resolution, bitrate, codec, and duration determine download time. (2) Network conditions - mobile networks, slow connections. (3) Browser parsing - video preloading behavior. (4) Device capabilities - hardware decoding, screen resolution. Optimization strategies: (1) Use adaptive bitrate streaming (HLS/DASH) for different connection speeds. (2) Compress with efficient codecs (HEVC, AV1). (3) Use CDN with edge caching. (4) Implement lazy loading - only load when near viewport. (5) Preload metadata only (preload=metadata). (6) Use poster images to provide immediate visual feedback. (7) Consider resolution switching based on viewport size.",
              difficulty: "hard",
              company: "Google",
            },
            {
              question:
                "How do codecs affect browser compatibility for the <video> element? Explain the patent and royalty landscape.",
              answer:
                "Different browsers support different codecs: H.264 (MP4) - universal support but patent-encumbered, WebM (VP8/VP9) - open and royalty-free, HEVC (H.265) - supported on Apple/Safari but heavy patent licensing, AV1 - latest open format but requires hardware decoding for efficiency. The patent landscape: H.264 requires licensing through MPEG LA, H.265 has complex patent pools (royalties), VP9 and AV1 are royalty-free, making them attractive for web use. Browser makers navigate this differently - Google pushes WebM/AV1, Apple supports HEVC, Mozilla supports all formats. For broad compatibility, provide at least MP4 (H.264) and WebM sources.",
              difficulty: "hard",
              company: "Mozilla",
            },
          ],
          codingChallenges: [],
        },
        {
          slug: "iframe",
          title: "Iframe",
          order: 4,
          content: {
            overview:
              "The <iframe> (inline frame) element embeds another HTML page within the current page. It is used for embedding external content like maps, videos, social media posts, and third-party applications.",
            problemStatement:
              "Websites often need to display content from other sources - a YouTube video, a Google Map, a Twitter feed. Without iframes, integrating third-party content would require complex JavaScript APIs, CORS handling, or server-side fetching.",
            intuitionFirst:
              "An iframe is like a window within your webpage that looks into another website. You control the size and position of the window, but what appears inside belongs to someone else domain.",
            realLifeAnalogy:
              "Think of an iframe like a picture-in-picture TV. Your main program (your website) continues playing, but a smaller window in the corner shows something from a different channel (another website).",
            howItWorks:
              "The iframe creates a nested browsing context with its own DOM, CSS, and JavaScript. The src attribute points to the embedded page. The sandbox attribute restricts what the iframe can do (forms, scripts, popups). The allow attribute enables specific features (fullscreen, payment). Security is enforced by the same-origin policy - the parent page cannot access iframe content from different origins unless CORS headers allow it.",
            beginnerExample:
              '<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ"\n  width="560" height="315"\n  title="YouTube video player"\n  frameborder="0"\n  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"\n  allowfullscreen>\n</iframe>\n\n<iframe src="https://www.google.com/maps/embed?..."></iframe>\n\n<iframe srcdoc="<p>Inline HTML content instead of a URL</p>"></iframe>',
            commonMistakes:
              "Not using the title attribute (accessibility), forgetting the sandbox attribute (security), not specifying a loading strategy, using iframes for own-site content (use server-side includes instead), and not setting appropriate height (causing scrollbars or cutoff content).",
            bestPractices:
              "Always include a descriptive title attribute for accessibility, use the sandbox attribute with minimal required permissions, set loading=lazy for below-the-fold iframes, specify explicit width and height, use allow attribute to grant only needed permissions, and use the srcdoc attribute for inline content.",
            securityNotes:
              "Iframes are a common vector for clickjacking attacks. Protect your own pages with X-Frame-Options: DENY or Content-Security-Policy: frame-ancestors. When embedding third-party iframes, use sandbox with limited permissions. Never trust data from iframes (same-origin policy prevents reading, but clickjacking is still a risk).",
          },
          quiz: [
            {
              id: "html-iframe-1",
              question: "What does iframe stand for?",
              options: [
                "Inline Frame",
                "Internal Frame",
                "Interactive Frame",
                "Integrated Frame",
              ],
              correctIndex: 0,
              explanation:
                "Iframe stands for Inline Frame. It embeds another HTML document within the current page, creating a nested browsing context.",
              difficulty: "easy",
            },
            {
              id: "html-iframe-2",
              question:
                "Which attribute restricts what an iframe can do (forms, scripts, popups)?",
              options: ["sandbox", "restrict", "security", "limit"],
              correctIndex: 0,
              explanation:
                "The sandbox attribute applies restrictions to the iframe content. With no value, it applies all restrictions. Individual permissions can be enabled (allow-scripts, allow-forms, etc.).",
              difficulty: "medium",
            },
            {
              id: "html-iframe-3",
              question:
                "What is clickjacking and how can it be prevented?",
              options: [
                "A technique where an attacker embeds a page in an invisible iframe to trick users into clicking something - prevent with X-Frame-Options header",
                "A type of DDoS attack - prevent with rate limiting",
                "A method to steal cookies - prevent with HttpOnly flag",
                "A CSS injection attack - prevent with CSP headers",
              ],
              correctIndex: 0,
              explanation:
                "Clickjacking tricks users into clicking something different from what they perceive by overlaying an invisible iframe. Prevent by sending X-Frame-Options: DENY or Content-Security-Policy: frame-ancestors header.",
              difficulty: "hard",
            },
          ],
          faangQuestions: [
            {
              question:
                "How does the same-origin policy affect iframes? What are postMessage and how do they enable cross-origin communication?",
              answer:
                "The same-origin policy prevents a parent page from accessing the DOM of an iframe loaded from a different origin (protocol, domain, or port). The parent can still set iframe src and dimensions but cannot read content. window.postMessage() enables safe cross-origin communication: the parent calls iframe.contentWindow.postMessage(data, targetOrigin), and the iframe listens for message events (and vice versa). Always specify targetOrigin for security (not '*'). This is the standard way for widgets (like YouTube, Stripe) to communicate with the parent page securely.",
              difficulty: "hard",
              company: "Google",
            },
            {
              question:
                "What are the performance implications of using iframes? How do they affect page load metrics like LCP and FID?",
              answer:
                "Iframes significantly impact performance because each iframe creates a new browsing context that loads its own resources (HTML, CSS, JS, images). This increases: (1) total page weight, (2) number of HTTP requests, (3) memory usage, (4) main thread work. Impact on Core Web Vitals: LCP - iframes delay LCP because the browser must parse additional documents. FID - iframes can block the main thread during parsing. Best practices: use loading=lazy for non-critical iframes, avoid iframes above the fold, preconnect to iframe origins, set explicit dimensions to prevent layout shift, and consider using JavaScript APIs or server-side includes instead where possible.",
              difficulty: "hard",
              company: "Google",
            },
          ],
          codingChallenges: [],
        },
      ],
    },
    {
      slug: "tables",
      title: "Tables",
      description:
        "Learn to structure tabular data with rows, columns, headers, footers, and advanced spanning techniques",
      order: 6,
      subtopics: [
        {
          slug: "table-element",
          title: "Table",
          order: 1,
          content: {
            overview:
              "The <table> element organizes data into rows and columns. It is the foundation for displaying tabular information - anything from schedules and pricing charts to data grids and comparison tables.",
            problemStatement:
              "Presenting structured data in a grid format is a common need, but doing so without a dedicated table element would require complex CSS positioning or list hacks. A native tabular structure is essential for data-heavy content.",
            intuitionFirst:
              "Think of an HTML table like a spreadsheet in Excel. You have cells organized into rows and columns, and you can put different types of data into each cell.",
            realLifeAnalogy:
              "An HTML table is like a train timetable. It has columns (departure time, destination, platform) and rows (each train entry). The structure makes it easy to quickly find the information you need.",
            howItWorks:
              "Tables are built with <tr> (table row) elements containing <td> (table data/cell) elements. Tables can optionally have <thead> (header section), <tbody> (body section), and <tfoot> (footer section). The browser uses a table layout algorithm to calculate column widths based on content (auto layout) or explicit widths (fixed layout via CSS).",
            beginnerExplanation:
              "Tables are perfect for displaying structured data where relationships between values matter. Always use proper table semantics so screen readers can announce cell positions and relationships.",
            beginnerExample:
              '<table>\n  <thead>\n    <tr>\n      <th>Product</th>\n      <th>Price</th>\n      <th>Quantity</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Widget A</td>\n      <td>$10.00</td>\n      <td>50</td>\n    </tr>\n    <tr>\n      <td>Widget B</td>\n      <td>$15.00</td>\n      <td>30</td>\n    </tr>\n  </tbody>\n  <tfoot>\n    <tr>\n      <td>Total</td>\n      <td>$25.00</td>\n      <td>80</td>\n    </tr>\n  </tfoot>\n</table>',
            commonMistakes:
              "Using tables for layout (aging practice - use CSS Grid/Flexbox), not using proper table structure (thead/tbody/tfoot), and leaving table empty of semantic structure.",
            bestPractices:
              "Use tables only for tabular data, not layout, always use <th> for header cells with scope attribute, use caption for table description, use thead/tbody/tfoot for structural clarity, and keep tables responsive with horizontal scroll on small screens.",
          },
          quiz: [
            {
              id: "html-table-1",
              question: "Which element defines a table row?",
              options: ["<tr>", "<td>", "<th>", "<row>"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "easy",
            },
            {
              id: "html-table-2",
              question: "What is the purpose of the <thead> element?",
              options: [
                "To group header content in a table",
                "To style the top border of a table",
                "To create a table heading",
                "To define the first row of a table",
              ],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "medium",
            },
            {
              id: "html-table-3",
              question: "Is it acceptable to use HTML tables for page layout?",
              options: [
                "No, use CSS Grid or Flexbox for layout instead",
                "Yes, it is the recommended approach",
                "Only for email newsletters",
                "Yes, but only in HTML4",
              ],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "medium",
            },
          ],
          faangQuestions: [
            {
              question:
                "How does the browser table layout algorithm work? Explain the difference between table-layout: auto and table-layout: fixed.",
              answer:
                "auto (default): The browser determines column widths based on content. It reads the entire table content first, then calculates the optimal width for each column. This ensures no overflow but requires two passes, which can be slow on large tables. fixed: Column widths are determined by the first row widths, not content. This allows the browser to render the table in a single pass, improving performance on large tables. With fixed layout, you can set column widths via <colgroup> or the first row. Content that exceeds the column width is clipped or overflows. Fixed layout is preferred for large data tables and when columns have predictable widths.",
              difficulty: "hard",
              company: "Google",
            },
            {
              question:
                "How do screen readers navigate HTML tables? What attributes and elements improve table accessibility?",
              answer:
                "Screen readers navigate tables by cell coordinates (row/column). They announce the row and column position and read header associations. Key accessibility features: (1) <caption> provides a table summary, (2) <th> with scope=col or scope=row associates headers with data cells, (3) headers attribute on <td> can explicitly reference header IDs for complex tables, (4) <thead>, <tbody>, <tfoot> provide structural landmarks, (5) avoid spanning cells (colspan/rowspan) when possible as they complicate navigation.",
              difficulty: "hard",
              company: "Apple",
            },
          ],
          codingChallenges: [],
        },
        {
          slug: "row",
          title: "Row",
          order: 2,
          content: {
            overview:
              "A table row is defined by the <tr> element, containing a horizontal group of cells (<td> or <th>). Rows are the fundamental building blocks of tables, organizing data horizontally across columns.",
            problemStatement:
              "Tabular data needs horizontal groupings that represent a single record or entry. Without rows, table cells would be disconnected, and there would be no way to indicate which cells belong to the same data record.",
            intuitionFirst:
              "Think of a table row as a single entry in a contact list. Each row contains related information about one person: name, phone number, email address - all connected horizontally.",
            realLifeAnalogy:
              "In a spreadsheet, a row represents a single record. In a grade book, one row = one student with their scores across multiple assignments. The <tr> element creates that horizontal grouping in HTML.",
            howItWorks:
              "The <tr> element is a container for table cells. It must be a direct child of <table>, <thead>, <tbody>, or <tfoot>. Browsers automatically group rows and calculate the table structure. Rows can be styled collectively - adding borders, hover effects, and alternating colors (using CSS :nth-child).",
            beginnerExplanation:
              "Each <tr> represents one horizontal record in your table. Keep related data together in the same row so the table layout stays consistent.",
            beginnerExample:
              '<table>\n  <tr>\n    <th>Name</th>\n    <th>Age</th>\n    <th>City</th>\n  </tr>\n  <tr>\n    <td>Alice</td>\n    <td>28</td>\n    <td>New York</td>\n  </tr>\n  <tr>\n    <td>Bob</td>\n    <td>34</td>\n    <td>London</td>\n  </tr>\n</table>',
            commonMistakes:
              "Putting <tr> directly inside <table> without proper sectioning elements (thead/tbody/tfoot), having mismatched cell counts across rows, and not using <th> for header rows.",
            bestPractices:
              "Place header rows inside <thead>, data rows inside <tbody>. Ensure each row has the same number of cells (unless using colspan/rowspan). Use CSS :nth-child(even) for alternating row colors to improve readability.",
          },
          quiz: [
            {
              id: "html-row-1",
              question: "Which element defines a table row?",
              options: ["<tr>", "<td>", "<th>", "<row>"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "easy",
            },
            {
              id: "html-row-2",
              question: "What happens if one row has fewer cells than others?",
              options: [
                "The remaining columns will be empty for that row",
                "The table will not render",
                "The row is merged with the next row",
                "The browser automatically adds empty cells",
              ],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "medium",
            },
            {
              id: "html-row-3",
              question: "How can you create alternating row colors in a table?",
              options: [
                "Using CSS :nth-child(even) on <tr> elements",
                "Using the bgcolor attribute on <tr>",
                "Using the stripe attribute on <table>",
                "Using the alternate attribute on <tr>",
              ],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "easy",
            },
          ],
          faangQuestions: [],
          codingChallenges: [],
        },
        {
          slug: "column",
          title: "Column",
          order: 3,
          content: {
            overview:
              "Columns in HTML tables are vertical groupings of cells. While HTML tables are row-centric in structure, the <col> and <colgroup> elements provide a way to apply styling and properties to entire columns.",
            problemStatement:
              "Tables naturally organize data by rows (<tr>), but many styling scenarios require column-level control - such as highlighting a specific column, setting uniform width, or aligning data vertically. Without column elements, developers would need to style each cell individually.",
            intuitionFirst:
              "If rows are the horizontal slices of a table, columns are the vertical slices. Think of a timeline where each column represents a date, and each row is a different category of events happening on that date.",
            realLifeAnalogy:
              "A calendar is a table where each column is a day of the week and each row is a week. The column groups all Mondays together. <colgroup> lets you style all cells in a column as a group.",
            howItWorks:
              "<colgroup> and <col> elements are placed inside <table> before <thead>. A <col> element represents one column. The span attribute on <col> makes it apply to multiple columns. These elements primarily affect column widths, backgrounds, borders, and visibility - not content.",
            beginnerExplanation:
              "Use <colgroup> to apply styles to entire columns at once instead of styling each cell individually. This is especially useful for setting column widths consistently.",
            beginnerExample:
              '<table>\n  <colgroup>\n    <col span="2" style="background: #f0f0f0;">\n    <col style="background: #e0e0ff;">\n  </colgroup>\n  <thead>\n    <tr>\n      <th>Product</th>\n      <th>Category</th>\n      <th>Price</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Widget A</td>\n      <td>Tools</td>\n      <td></td>\n    </tr>\n  </tbody>\n</table>',
            commonMistakes:
              "Using <col> for text alignment (does not work - use CSS on td/th), putting <colgroup> in wrong position, and using too many <col> elements.",
            bestPractices:
              "Use <colgroup> for structural column styling (widths, backgrounds), use CSS nth-child selectors for cell-level styling, keep <col> count matching actual columns, and use span attribute to group identical columns.",
          },
          quiz: [
            {
              id: "html-col-1",
              question: "Which element allows you to style an entire column?",
              options: ["<col>", "<column>", "<colgroup>", "<colstyle>"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "easy",
            },
            {
              id: "html-col-2",
              question: "Where should <colgroup> be placed in a table?",
              options: [
                "Before <thead> and <tbody>",
                "After <tbody>",
                "Inside <thead>",
                "Inside the first <tr>",
              ],
              correctIndex: 0,
              explanation:
                "<colgroup> must be placed inside <table>, before any <thead>, <tbody>, <tfoot>, or <tr> elements.",
              difficulty: "medium",
            },
            {
              id: "html-col-3",
              question: "Can <col> elements affect text alignment inside cells?",
              options: [
                "No, use CSS on td/th selectors for text alignment",
                "Yes, text-align works on <col>",
                "Only in some browsers",
                "Yes, with the align attribute",
              ],
              correctIndex: 0,
              explanation:
                "<col> does not support text alignment properties. Text alignment must be applied to <td> or <th> elements using CSS.",
              difficulty: "hard",
            },
          ],
          faangQuestions: [],
          codingChallenges: [],
        },
        {
          slug: "header",
          title: "Header",
          order: 4,
          content: {
            overview:
              "Table header cells are defined with the <th> element. They provide semantic meaning that the cell contains header information for a row or column, helping both users and assistive technologies understand the table structure.",
            problemStatement:
              "In data tables, users need to know what each column or row represents. Without semantically designated header cells, screen readers cannot announce column/row context, and visual differentiation requires non-semantic CSS hacks.",
            intuitionFirst:
              "Header cells are like column labels in a spreadsheet. They tell you what kind of data is in each column: Name, Date, Amount. Without headers, you have numbers and text with no context.",
            realLifeAnalogy:
              "A table header is like the label on a filing cabinet drawer. Without labels, you would have to open every drawer to find what you need. Headers tell you immediately what data to expect in each column.",
            howItWorks:
              "The <th> element works like <td> but carries semantic meaning. The scope attribute (scope=col, scope=row, scope=colgroup, scope=rowgroup) explicitly associates headers with cells. Browsers render <th> text as bold and centered by default. Screen readers use <th> to announce context when navigating cells.",
            beginnerExample:
              '<table>\n  <tr>\n    <th scope="col">Name</th>\n    <th scope="col">Email</th>\n    <th scope="col">Role</th>\n  </tr>\n  <tr>\n    <th scope="row">Alice</th>\n    <td>alice@example.com</td>\n    <td>Developer</td>\n  </tr>\n</table>',
            commonMistakes:
              "Using <td> instead of <th> for headers, forgetting the scope attribute, using multiple header rows without proper association, and styling <th> with CSS when the semantic meaning is what really matters.",
            bestPractices:
              "Use <th> for all header cells, always include scope attribute (scope=col for column headers, scope=row for row headers), keep headers concise, and use multiple header rows for complex tables with proper scope associations.",
          },
          quiz: [
            {
              id: "html-header-1",
              question: "Which element defines a table header cell?",
              options: ["<th>", "<td>", "<thead>", "<header>"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "easy",
            },
            {
              id: "html-header-2",
              question: "What does scope=row indicate?",
              options: [
                "The header applies to the current row",
                "The header applies to the current column",
                "The header spans multiple rows",
                "The header is the table title",
              ],
              correctIndex: 0,
              explanation:
                "scope=row indicates that the <th> element is a header for the row it belongs to. This is commonly used for the first cell in each row that labels the row data.",
              difficulty: "medium",
            },
          ],
          faangQuestions: [],
          codingChallenges: [],
        },
        {
          slug: "footer",
          title: "Footer",
          order: 5,
          content: {
            overview:
              "The <tfoot> element groups footer rows in a table. It typically contains summary data, totals, averages, or notes related to the table content. It can appear after <thead> but before <tbody> in HTML, though visually it appears at the bottom.",
            problemStatement:
              "Tables often need summary rows displaying totals, averages, or aggregated data. Without a semantic footer section, these rows would be indistinguishable from regular data rows, and the table structure would lack clarity.",
            intuitionFirst:
              "Think of <tfoot> as the totals row at the bottom of a receipt. It sums up everything above and gives you the final numbers. Screen readers can jump directly to this summary.",
            realLifeAnalogy:
              "A table footer is like the bottom line of a bank statement. While the main rows show individual transactions, the footer shows the ending balance. It provides the summary conclusion to the data above.",
            howItWorks:
              "<tfoot> in HTML must appear after <caption> and <colgroup> but can appear before or after <tbody>. When printing long tables across multiple pages, the footer content repeats at the bottom of each page. Browsers handle the visual placement automatically - tfoot appears at the bottom regardless of its position in the source order.",
            beginnerExample:
              '<table>\n  <thead>\n    <tr>\n      <th>Item</th>\n      <th>Price</th>\n      <th>Total</th>\n    </tr>\n  </thead>\n  <tfoot>\n    <tr>\n      <td>Total</td>\n      <td></td>\n      <td>.00</td>\n    </tr>\n  </tfoot>\n  <tbody>\n    <tr>\n      <td>Widget</td>\n      <td>.00</td>\n      <td>.00</td>\n    </tr>\n    <tr>\n      <td>Gadget</td>\n      <td>.00</td>\n      <td>.00</td>\n    </tr>\n  </tbody>\n</table>',
            commonMistakes:
              "Placing <tfoot> after <tbody> in source order (valid but older spec required it before), using <tfoot> for content that is not summary data, and forgetting that <tfoot> rows print at the bottom of each printed page.",
            bestPractices:
              "Use <tfoot> for summary or aggregate data, place it before <tbody> for better screen reader experience (summary first), ensure totals and summaries are clearly labeled, and use appropriate CSS to visually distinguish footer rows from body rows.",
          },
          quiz: [
            {
              id: "html-tfoot-1",
              question: "What does <tfoot> represent in a table?",
              options: [
                "A group of footer rows with summary data",
                "The bottom border of a table",
                "The last column of a table",
                "A footnote for the table caption",
              ],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "easy",
            },
            {
              id: "html-tfoot-2",
              question: "How does <tfoot> behave when printing a long table?",
              options: [
                "It repeats at the bottom of each printed page",
                "It appears only on the first page",
                "It appears only on the last page",
                "It is hidden when printing",
              ],
              correctIndex: 0,
              explanation:
                "When printing a multi-page table, the <tfoot> content is repeated at the bottom of each page, similar to how <thead> repeats at the top of each page.",
              difficulty: "medium",
            },
          ],
          faangQuestions: [],
          codingChallenges: [],
        },
        {
          slug: "colspan",
          title: "Colspan",
          order: 6,
          content: {
            overview:
              "The colspan attribute on a <td> or <th> element makes the cell span across multiple columns. It merges adjacent cells horizontally, creating wider cells that cover the space of multiple columns.",
            problemStatement:
              "Tables often need cells that extend across multiple columns - like a title row that spans all columns, or a category label that groups several columns together. Without colspan, developers would need to use nested tables or leave empty cells.",
            intuitionFirst:
              "Colspan is like merging cells in a spreadsheet. If you have a table with 3 columns and your header text needs space from all 3, colspan=3 makes that cell stretch across all three columns.",
            realLifeAnalogy:
              "Think of colspan like a wide parking space that spans two regular parking spots. Instead of one car per spot, a bus (your wide cell) takes up the space of two cars.",
            howItWorks:
              "The value of colspan specifies how many columns the cell should span. The cell expands rightward, and the following cells in the row shift accordingly. The total colspan values in a row must equal the total number of columns. If they do not, the table browser adds implicit empty cells to fill the gap.",
            beginnerExample:
              '<table>\n  <tr>\n    <th colspan="3">Monthly Sales Report</th>\n  </tr>\n  <tr>\n    <th>Product</th>\n    <th>January</th>\n    <th>February</th>\n  </tr>\n  <tr>\n    <td>Widget</td>\n    <td>,000</td>\n    <td>,500</td>\n  </tr>\n</table>',
            commonMistakes:
              "Setting colspan larger than remaining columns, inconsistent colspan counts across rows causing alignment issues, forgetting to account for colspan when calculating total columns, and using colspan when the same effect could be achieved with better table structure.",
            bestPractices:
              "Plan your table structure before coding, ensure total spanned columns equal total columns in every row, use colspan for section headings and grouping labels, and test with screen readers to ensure announcements make sense with merged cells.",
          },
          quiz: [
            {
              id: "html-colspan-1",
              question: "What does colspan=2 do to a table cell?",
              options: [
                "It makes the cell span across 2 columns",
                "It makes the cell 2 pixels wide",
                "It duplicates the cell content across 2 columns",
                "It creates 2 sub-cells inside the cell",
              ],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "easy",
            },
            {
              id: "html-colspan-2",
              question: "If a table has 4 columns and one row has colspan=3 on the first cell, how many more cells are needed in that row?",
              options: ["1 more cell", "2 more cells", "0 more cells", "3 more cells"],
              correctIndex: 0,
              explanation:
                "After a cell with colspan=3, the row has 1 column remaining. You need one more cell to complete the row (or if this is the only cell and it spans all 4, you would use colspan=4).",
              difficulty: "medium",
            },
          ],
          faangQuestions: [],
          codingChallenges: [],
        },
        {
          slug: "rowspan",
          title: "Rowspan",
          order: 7,
          content: {
            overview:
              "The rowspan attribute on a <td> or <th> element makes the cell span across multiple rows. It merges adjacent cells vertically, creating taller cells that extend downward through several rows.",
            problemStatement:
              "Tables sometimes need cells that extend vertically across multiple rows - like a category label that groups several rows together, or an image that accompanies multiple entries. Without rowspan, developers would have to repeat the same content across rows.",
            intuitionFirst:
              "Rowspan is like merging cells vertically in a spreadsheet. If you have a category name that applies to three rows, rowspan=3 makes that category cell span all three rows vertically.",
            realLifeAnalogy:
              "Think of rowspan like a tall bookshelf that takes up space from floor to ceiling. Instead of having multiple shelves (cells), you have one tall unit spanning multiple levels.",
            howItWorks:
              "The value of rowspan specifies how many rows the cell should span. The cell expands downward, pushing content in subsequent rows to the right. When using rowspan, you must omit cells from subsequent rows for the spanned vertical space.",
            beginnerExample:
              '<table>\n  <tr>\n    <th rowspan="2">Category</th>\n    <th>Item</th>\n    <th>Price</th>\n  </tr>\n  <tr>\n    <td>Widget A</td>\n    <td></td>\n  </tr>\n  <tr>\n    <th>Electronics</th>\n    <td>Gadget B</td>\n    <td></td>\n  </tr>\n</table>',
            commonMistakes:
              "Forgetting to omit cells in rows covered by rowspan, creating inconsistent table grid, using rowspan when a better normalized table structure exists, and not testing with screen readers which may announce rowspan cells confusingly.",
            bestPractices:
              "Plan the grid structure carefully, omit spanned cells in subsequent rows, validate the table visually and with tools, use rowspan sparingly as it complicates accessibility, and provide proper header associations for complex rowspan layouts.",
          },
          quiz: [
            {
              id: "html-rowspan-1",
              question: "What does rowspan=3 do to a table cell?",
              options: [
                "It makes the cell span across 3 rows",
                "It makes the cell 3 pixels tall",
                "It creates 3 copies of the cell vertically",
                "It groups 3 cells into the same row",
              ],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "easy",
            },
            {
              id: "html-rowspan-2",
              question: "If a cell has rowspan=2, how is the next row affected?",
              options: [
                "You must omit one cell in the next row for the spanned space",
                "The next row is automatically merged",
                "You must add rowspan=2 to the next row too",
                "The rowspan is ignored",
              ],
              correctIndex: 0,
              explanation:
                "When a cell has rowspan=2, it occupies space in both the current and next rows. In the next row, you must omit the cell that would appear in the spanned column position.",
              difficulty: "hard",
            },
          ],
          faangQuestions: [
            {
              question:
                "How do colspan and rowspan affect the accessibility of complex tables? What strategies improve screen reader navigation?",
              answer:
                "Colspan and rowspan significantly complicate screen reader navigation because the cell-to-header associations become non-rectangular. Strategies: (1) Use the headers attribute on <td> to explicitly associate cells with header IDs for complex spans, (2) simplify table structure to minimize spanning, (3) consider splitting complex tables into multiple simpler tables, (4) use aria-describedby to provide additional context, (5) test with actual screen readers (NVDA, VoiceOver) to verify announcements, (6) provide a data table description or summary for very complex tables, (7) avoid spanning both directions (colspan AND rowspan in the same table region) when possible.",
              difficulty: "hard",
              company: "Apple",
            },
          ],
          codingChallenges: [
            {
              title: "Build a Complex Table with Spanning",
              description:
                "Create an HTML table that represents a weekly schedule. Use colspan and rowspan to merge cells appropriately. The table should have: a header row spanning all columns with the month/year, time slot rows (Morning, Afternoon, Evening) with rowspan, and day columns (Mon-Fri). Show different activities in each time slot for each day.",
              difficulty: "medium",
              solutionHint:
                "Use <thead> with colspan for the title, use <tbody> with <th scope=row> for time slots with rowspan, and <td> elements for each day-time combination. Ensure the total colspan values add up in each row.",
            },
          ],
        },
      ],
    },
    {
      slug: "forms",
      title: "Forms",
      description:
        "Master form creation - from input types and labels to validation, file uploads, and accessible form design",
      order: 7,
      subtopics: [
        {
          slug: "form-tag",
          title: "Form Tag",
          order: 1,
          content: {
            overview: "The <form> element is a container for interactive controls that collect user input and submit it to a server. It defines the method and action for form submission.",
            problemStatement: "Web applications need to collect user input. Without a standardized form element, there would be no reliable way to group inputs and send data to servers.",
            intuitionFirst: "A form is like a paper application form. It has fields to fill in, labels telling you what goes where, and a submit button. The <form> tag is the entire piece of paper.",
            realLifeAnalogy: "Think of a <form> like a physical mailbox. You put items into the box, close the door (validation), and the box sends everything to the right address (action URL).",
            howItWorks: "When submitted, the browser collects named input values, serializes them as key-value pairs, and sends them to the action URL. GET appends data to URL. POST sends in request body.",
            beginnerExplanation: "Forms collect user data and send it somewhere. The action tells where to send it, method tells how to send it, and input fields collect the actual data.",
            beginnerExample: '<form action=\"/submit\" method=\"POST\">\n  <label for=\"name\">Name:</label>\n  <input type=\"text\" id=\"name\" name=\"name\" required>\n  <button type=\"submit\">Submit</button>\n</form>',
            commonMistakes: "Forgetting the name attribute on inputs, using GET for sensitive data, not including a submit button.",
            bestPractices: "Use POST for data mutations, GET for search, always include name attributes, use proper input types."
          },
          quiz: [
            {
              id: "html-form-1",
              question: "Which HTTP method should be used for a login form?",
              options: ["POST", "GET", "PUT", "DELETE"],
              correctIndex: 0,
              explanation: "POST sends data in the request body, keeping passwords out of the URL.",
              difficulty: "easy",
            },
            {
              id: "html-form-2",
              question: "What happens if an input has no name attribute?",
              options: ["Its data is not sent", "It submits empty", "The form errors", "Name defaults to id"],
              correctIndex: 0,
              explanation: "The name attribute is required for form data to be included in submission.",
              difficulty: "medium",
            },
            {
              id: "html-form-3",
              question: "What enctype is needed for file uploads?",
              options: ["multipart/form-data", "application/x-www-form-urlencoded", "text/plain", "application/json"],
              correctIndex: 0,
              explanation: "File uploads require enctype=multipart/form-data for binary data.",
              difficulty: "hard"
            }
          ],
          faangQuestions: [
            {
              question: "How does browser form submission work under the hood?",
              answer: "User clicks submit, browser fires submit event, performs client validation, serializes form data into query string (GET) or body (POST), creates HTTP request, sends to action URL, handles response. Modern SPAs often prevent default and use fetch/XHR.",
              difficulty: "hard",
              company: "Google"
            },
            {
              question: "What is the difference between HTML and server-side validation? Why both?",
              answer: "HTML validation provides instant client feedback. Server-side validation is mandatory for security. Client-side can be bypassed. Both: client for UX, server for security.",
              difficulty: "hard",
              company: "Amazon"
            }
          ],
          codingChallenges: []
        },
        {
          slug: "input-types",
          title: "Input Types",
          order: 2,
          content: {
            overview: "HTML5 introduced specialized input types beyond basic text. Types like email, password, number, date, color, range provide built-in validation and specialized mobile keyboards.",
            problemStatement: "Different data types need different input methods. Generic text inputs provide poor UX for specific data like emails, numbers, or dates.",
            intuitionFirst: "Input types are like specialized tools. Each input type is the right tool for its specific data type.",
            realLifeAnalogy: "Different input types are like different types of parking spaces: compact cars get small spaces (text), buses need big spaces (textarea).",
            howItWorks: "The type attribute tells the browser what data to expect. The browser uses this for specialized keyboards, native controls, built-in validation, and input restriction.",
            beginnerExplanation: "Choosing the right input type makes forms easier to use. type=email checks for @, type=number shows a number pad on phones.",
            beginnerExample: '<input type=\"text\"><input type=\"email\"><input type=\"password\"><input type=\"number\"><input type=\"date\"><input type=\"color\"><input type=\"range\"><input type=\"tel\"><input type=\"file\">',
            commonMistakes: "Using type=text for everything, not setting min/max for number inputs, forgetting type=password for passwords.",
            bestPractices: "Use the most specific input type for each field, always pair with labels, set constraints, provide clear error messages."
          },
          quiz: [
            {
              id: "html-input-1",
              question: "Which input type shows a date picker?",
              options: ["date", "calendar", "datetime", "picker"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "easy",
            },
            {
              id: "html-input-2",
              question: "What input type should be used for passwords?",
              options: ["password", "secret", "hidden", "secure"],
              correctIndex: 0,
              explanation: "type=password masks input characters to prevent shoulder-surfing.",
              difficulty: "easy",
            },
            {
              id: "html-input-3",
              question: "Which input type provides a slider control?",
              options: ["range", "slider", "number", "scale"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "medium",
            }
          ],
          faangQuestions: [
            {
              question: "How do different input types affect mobile keyboards?",
              answer: "type=email shows @ and .com keys, type=tel shows numeric keypad, type=url shows . and / keys, type=search shows search button. This reduces user effort and improves form completion rates.",
              difficulty: "hard",
              company: "Apple"
            },
            {
              question: "What is the inputmode attribute and how does it complement type?",
              answer: "inputmode hints at which keyboard to show independent of type. Useful when you want a specific keyboard but cannot use the corresponding type (e.g., numeric keyboard for credit card with spaces).",
              difficulty: "hard",
              company: "Google"
            }
          ],
          codingChallenges: []
        },
        {
          slug: "labels",
          title: "Labels",
          order: 3,
          content: {
            overview: "The <label> element associates text with a form control, making it clear what input is expected. Labels improve usability and accessibility by expanding the clickable area and providing screen reader announcements.",
            problemStatement: "Form inputs need descriptive text that tells users what data to enter. Without proper labels, users cannot understand input purpose, screen readers cannot announce field names, and click targets are smaller.",
            intuitionFirst: "A label is like a name tag at a conference. It tells you who the person (input field) is. When you click the name tag, it is like tapping the person shoulder - it activates the input.",
            realLifeAnalogy: "Labels on forms are like labels on filing cabinet drawers. Without labels, you have to open every drawer to find what you need. Labels tell you immediately what each drawer (input) contains.",
            howItWorks: "Labels associate with inputs via the for attribute matching the input id, or by wrapping the input element. Clicking the label focuses/activates the associated input. Screen readers announce the label text when the input receives focus.",
            beginnerExplanation: "Always use <label> with your form inputs. Clicking the label text focuses the input, which is especially helpful for checkboxes and radio buttons where the click target is small.",
            beginnerExample: '<label for=\"email\">Email Address:</label>\n<input type=\"email\" id=\"email\" name=\"email\">\n\n<label>\n  <input type=\"checkbox\" name=\"agree\"> I agree to the terms\n</label>',
            commonMistakes: "Forgetting the for attribute (label not associated), using placeholder as label replacement (bad for UX and accessibility), not labeling all form controls, and using span/div instead of label.",
            bestPractices: "Always use <label> for every form control, use the for attribute matching input id, avoid using placeholder as label, use wrapping <label> for checkboxes/radios, and ensure labels are visible (not hidden)."
          },
          quiz: [
            {
              id: "html-label-1",
              question: "What attribute on <label> links it to an input?",
              options: ["for", "to", "input", "target"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "easy",
            },
            {
              id: "html-label-2",
              question: "What happens when you click a properly associated label?",
              options: ["The associated input receives focus", "The form is submitted", "The page scrolls to the top", "Nothing happens"],
              correctIndex: 0,
              explanation: "Clicking a label focuses or activates the associated input. This is especially helpful for checkboxes, radios, and small inputs.",
              difficulty: "medium",
            },
            {
              id: "html-label-3",
              question: "Is it acceptable to use placeholder text instead of a label?",
              options: ["No, placeholders disappear on input and fail accessibility", "Yes, placeholders are the modern approach", "Only on mobile devices", "Yes, for search forms only"],
              correctIndex: 0,
              explanation: "Placeholders disappear when users start typing, making it hard to remember what the field was for. They also have poor contrast and are not announced properly by all screen readers.",
              difficulty: "hard"
            }
          ],
          faangQuestions: [
            {
              question: "How do labels interact with screen readers? Explain the different association methods and their accessibility implications.",
              answer: "Three methods: (1) for/id association - most robust, screen reader announces label when input focused. (2) Wrapping input inside label - works but harder to style. (3) aria-label or aria-labelledby - for when visual label is not possible. Screen readers prioritize label text. The for/id method is preferred because it works even if the label and input are in different containers. Wrapping can break with some CSS layouts. Hidden labels (class=sr-only) are acceptable when visual design cannot accommodate visible labels.",
              difficulty: "hard",
              company: "Apple"
            },
            {
              question: "What is the difference between aria-label, aria-labelledby, and HTML <label>? When would you use each?",
              answer: "<label> is the standard HTML association - visible text that clicks with the input. aria-label provides an invisible label for screen readers only. aria-labelledby references another element by ID as the label. Use <label> when you have visible label text. Use aria-label for icon-only buttons or inputs without visible text. Use aria-labelledby when the label text is already present on the page but not directly adjacent. aria-label overrides <label> text for screen readers.",
              difficulty: "hard",
              company: "Google"
            }
          ],
          codingChallenges: []
        },
        {
          slug: "textarea",
          title: "Textarea",
          order: 4,
          content: {
            overview: "The <textarea> element creates a multi-line text input field. Unlike <input type=text>, it allows users to enter multiple lines of text with automatic line wrapping.",
            problemStatement: "Many form scenarios require longer text input - comments, messages, descriptions, biographies. A single-line input does not work for these cases. A resizable multi-line text area is needed.",
            intuitionFirst: "Textarea is like a text message vs an email. Input is like a text message (short, single line). Textarea is like an email body (long, multi-line, you can write paragraphs).",
            realLifeAnalogy: "A textarea is like a blank sheet of paper for writing, while an input is like a single-line fill-in-the-blank. Use textarea when you expect more than a sentence of text.",
            howItWorks: "Textarea is a block-level element that creates a resizable text box. Rows and cols attributes set initial dimensions (rows for height, cols for width). The wrap attribute controls line wrapping (soft/hard). Users can resize it by default (CSS resize property controls this).",
            beginnerExample: '<label for=\"bio\">Biography:</label>\n<textarea id=\"bio\" name=\"bio\" rows=\"4\" cols=\"50\" placeholder=\"Tell us about yourself...\"></textarea>\n\n<label for=\"comment\">Comment:</label>\n<textarea id=\"comment\" name=\"comment\" rows=\"6\" maxlength=\"500\"></textarea>',
            commonMistakes: "Not setting rows/cols (too small default), forgetting maxlength for length-limited inputs, wrapping textarea content as an attribute (it uses content between tags), and not providing a label.",
            bestPractices: "Set appropriate rows and cols for expected input, use maxlength to limit input length (show character count), provide placeholder text as hint, use CSS for responsive sizing, and style the resize behavior appropriately.",
            performanceNotes: "Textarea re-renders can be expensive in large forms. Avoid excessive JavaScript listeners. For very large text inputs, consider using a contenteditable div or rich text editor."
          },
          quiz: [
            {
              id: "html-textarea-1",
              question: "Which element creates a multi-line text input?",
              options: ["<textarea>", "<input type=text multiline>", "<text>", "<paragraph>"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "easy",
            },
            {
              id: "html-textarea-2",
              question: "What attributes set the initial size of a textarea?",
              options: ["rows and cols", "width and height", "size and length", "lines and chars"],
              correctIndex: 0,
              explanation: "The rows attribute sets the number of visible text lines (height), and cols sets the character width. These provide the initial dimensions.",
              difficulty: "medium",
            },
            {
              id: "html-textarea-3",
              question: "How is the initial value of a textarea specified in HTML?",
              options: ["Between opening and closing tags", "In the value attribute", "In the default attribute", "In the content attribute"],
              correctIndex: 0,
              explanation: "Unlike <input>, the <textarea> element uses its content (between opening and closing tags) as the initial value.",
              difficulty: "hard"
            }
          ],
          faangQuestions: [
            {
              question: "How does textarea differ from a contenteditable div for rich text editing? What are the performance implications?",
              answer: "Textarea provides plain text only, native OS spell-check, and standard form behavior (can be submitted in forms). contenteditable div supports rich text (bold, italic, lists, images) but does not participate in form submission (requires JS to extract HTML). Performance: textarea is highly optimized in browsers and handles large text well. contenteditable div is more complex - it involves the full editing engine, can be slower with large content, and may have inconsistent behavior across browsers. For rich text editors, libraries like Quill, TipTap, or TinyMCE use contenteditable but add their own abstractions for consistency.",
              difficulty: "hard",
              company: "Google"
            }
          ],
          codingChallenges: []
        },
        {
          slug: "select",
          title: "Select",
          order: 5,
          content: {
            overview: "The <select> element creates a drop-down list of options for users to choose from. It is used when there are multiple predefined options but only one (or a few with multiple attribute) can be selected.",
            problemStatement: "When users need to choose from a list of options, typing free text is error-prone and inconsistent. A pre-defined drop-down ensures valid data entry and a better user experience.",
            intuitionFirst: "A select dropdown is like a vending machine - you see all the options available and choose one by pressing a button. You cannot choose something that is not listed.",
            realLifeAnalogy: "Think of a select dropdown like a restaurant menu. The options are listed (appetizers, entrees, desserts), and you pick one. You cannot order something that is not on the menu.",
            howItWorks: "Each <option> element represents a choice. The selected attribute marks the default. Multiple <optgroup> elements group related options. The multiple attribute (with Ctrl/Cmd click) allows multi-select. The browser renders a native dropdown widget that differs by OS and browser.",
            beginnerExample: '<label for=\"country\">Country:</label>\n<select id=\"country\" name=\"country\">\n  <option value=\"\">Select a country</option>\n  <option value=\"us\">United States</option>\n  <option value=\"uk\">United Kingdom</option>\n  <option value=\"ca\">Canada</option>\n</select>\n\n<label for=\"interests\">Interests (hold Ctrl to select multiple):</label>\n<select id=\"interests\" name=\"interests\" multiple>\n  <option value=\"tech\">Technology</option>\n  <option value=\"sports\">Sports</option>\n  <option value=\"music\">Music</option>\n</select>\n\n<select>\n  <optgroup label=\"Fruits\">\n    <option value=\"apple\">Apple</option>\n    <option value=\"banana\">Banana</option>\n  </optgroup>\n  <optgroup label=\"Vegetables\">\n    <option value=\"carrot\">Carrot</option>\n    <option value=\"broccoli\">Broccoli</option>\n  </optgroup>\n</select>',
            commonMistakes: "Not providing a default empty option, using placeholder text that is also a valid option, not grouping related options with optgroup, and using select for fewer than 4 options (use radio buttons instead for fewer).",
            bestPractices: "Use optgroup for category grouping, include a disabled selected option as placeholder, use multiple attribute sparingly (consider checkboxes instead for multi-select), keep option text concise, and sort options logically."
          },
          quiz: [
            {
              id: "html-select-1",
              question: "Which element creates a drop-down list?",
              options: ["<select>", "<dropdown>", "<list>", "<options>"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "easy",
            },
            {
              id: "html-select-2",
              question: "What element groups related options in a select?",
              options: ["<optgroup>", "<optiongroup>", "<group>", "<section>"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "easy",
            },
            {
              id: "html-select-3",
              question: "When should you use radio buttons instead of a <select>?",
              options: ["When there are fewer than 5 options", "When there are more than 10 options", "When options are hierarchical", "When options come from a database"],
              correctIndex: 0,
              explanation: "Radio buttons are better for 2-5 options as they show all choices at once without requiring interaction to see them. Select is better for 5+ options to conserve space.",
              difficulty: "medium"
            }
          ],
          faangQuestions: [
            {
              question: "How does the <select> element differ from a custom JavaScript dropdown in terms of accessibility and performance?",
              answer: "Native <select> is automatically accessible - screen readers announce options, keyboard navigation (arrow keys, type to search) works natively, and it is consistent with OS conventions. Custom dropdowns require ARIA roles (combobox, listbox), keyboard event handlers, focus management, and often fail accessibility audits. Performance: native select is highly optimized. Custom dropdowns require JavaScript execution, DOM manipulation, and event listeners. However, native select cannot be styled consistently across browsers. The trade-off: use native select for accessibility and performance; use custom select only when visual design demands it and with proper ARIA implementation.",
              difficulty: "hard",
              company: "Google"
            }
          ],
          codingChallenges: []
        },
        {
          slug: "radio",
          title: "Radio",
          order: 6,
          content: {
            overview: "Radio buttons allow users to select exactly one option from a set. They are grouped by sharing the same name attribute. When one radio is selected, others in the group are automatically deselected.",
            problemStatement: "When users must choose exactly one option from a small set (like gender, payment method, or shipping option), radio buttons provide the clearest UX because all options are visible simultaneously.",
            intuitionFirst: "Radio buttons are like the preset buttons on a car radio - you press one station and the previous one pops out. Only one can be selected at a time.",
            realLifeAnalogy: "Think of radio buttons like multiple-choice questions on a test. You can select only one answer, and all options are visible for comparison.",
            howItWorks: "All radio buttons with the same name attribute form a group. Selecting one radio automatically deselects others in the group. The value attribute indicates what data is sent. Each radio should have a unique id for its label. The checked attribute marks the default selection.",
            beginnerExample: '<fieldset>\n  <legend>Select your payment method:</legend>\n  <label>\n    <input type=\"radio\" name=\"payment\" value=\"credit\"> Credit Card\n  </label>\n  <label>\n    <input type=\"radio\" name=\"payment\" value=\"paypal\" checked> PayPal\n  </label>\n  <label>\n    <input type=\"radio\" name=\"payment\" value=\"bank\"> Bank Transfer\n  </label>\n</fieldset>',
            commonMistakes: "Using different name values (breaks grouping), forgetting to set a default with checked, using radio when checkboxes are needed (multi-select), and not wrapping in <fieldset> with <legend> for accessibility.",
            bestPractices: "Always wrap radio groups in <fieldset> with <legend>, give all radios in a group the same name, mark a default option with checked, ensure labels are clickable, and sort options logically (most common first)."
          },
          quiz: [
            {
              id: "html-radio-1",
              question: "What makes radio buttons work as a group?",
              options: ["Same name attribute", "Same class name", "Same id prefix", "Being in the same div"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "easy",
            },
            {
              id: "html-radio-2",
              question: "When should radio buttons be used?",
              options: ["For selecting one option from a small set", "For selecting multiple options", "For entering text values", "For file uploads"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "medium",
            }
          ],
          faangQuestions: [],
          codingChallenges: []
        },
        {
          slug: "checkbox",
          title: "Checkbox",
          order: 7,
          content: {
            overview: "Checkboxes allow users to select zero, one, or multiple independent options from a set. Unlike radio buttons, each checkbox operates independently.",
            problemStatement: "Many scenarios require selecting multiple options - interests, features, permissions. Users need a control that can be toggled on or off independently for each choice.",
            intuitionFirst: "Checkboxes are like toggles on a settings panel. Each feature can be independently turned on or off. One choice does not affect the others.",
            realLifeAnalogy: "Think of checkboxes like a shopping list - you can check off multiple items independently. Checking milk does not uncheck eggs.",
            howItWorks: "Each checkbox has its own name and value. Multiple checkboxes can share the same name (with different values) to send an array of values. The checked attribute sets the default state. Checkboxes send their value only when checked - if unchecked, nothing is sent.",
            beginnerExample: '<fieldset>\n  <legend>Select your interests:</legend>\n  <label>\n    <input type=\"checkbox\" name=\"interests\" value=\"tech\"> Technology\n  </label>\n  <label>\n    <input type=\"checkbox\" name=\"interests\" value=\"sports\"> Sports\n  </label>\n  <label>\n    <input type=\"checkbox\" name=\"interests\" value=\"music\" checked> Music\n  </label>\n</fieldset>\n\n<label>\n  <input type=\"checkbox\" name=\"agree\" required> I agree to the terms and conditions\n</label>',
            commonMistakes: "Using radio buttons when multiple selections are allowed, not wrapping in <fieldset> with <legend>, forgetting that unchecked checkboxes send no data, and using boolean true/false values incorrectly.",
            bestPractices: "Group related checkboxes in <fieldset> with <legend>, keep checkbox labels concise and clear, use an explicit label wrapping or for attribute, pre-check defaults when appropriate, and provide select all/deselect all for large groups."
          },
          quiz: [
            {
              id: "html-checkbox-1",
              question: "What is sent to the server when a checkbox is unchecked?",
              options: ["Nothing", "false", "off", "0"],
              correctIndex: 0,
              explanation: "Unchecked checkboxes send no data to the server. Only checked checkboxes send their name=value pair.",
              difficulty: "medium",
            },
            {
              id: "html-checkbox-2",
              question: "Can checkboxes have the same name attribute?",
              options: ["Yes, to send multiple values under the same key", "No, each checkbox must have a unique name", "Only if they share the same value", "Only on form submission"],
              correctIndex: 0,
              explanation: "Multiple checkboxes can share the same name with different values. The server receives an array of selected values under that name.",
              difficulty: "hard"
            }
          ],
          faangQuestions: [],
          codingChallenges: []
        },
        {
          slug: "validation",
          title: "Validation",
          order: 8,
          content: {
            overview: "HTML5 provides built-in form validation through attributes like required, minlength, maxlength, pattern, min, max, and type-specific validation. This catches invalid data before submission without JavaScript.",
            problemStatement: "Invalid form data wastes server resources, creates poor UX, and can cause security issues. Without client-side validation, users must submit and wait for server errors. A instant feedback mechanism is needed.",
            intuitionFirst: "Form validation is like a gatekeeper at a club. The bouncer (validation) checks your ID (input) before letting you in (submitting). If something is wrong, you are told immediately.",
            realLifeAnalogy: "HTML validation is like spell-check in a word processor. It highlights mistakes in real-time as you type, so you can fix them before submitting the final document.",
            howItWorks: "The Constraint Validation API drives HTML validation. Attributes set constraints, and the browser checks them on form submission. Invalid inputs trigger :invalid CSS pseudo-class and show native error messages. The setCustomValidity() method allows custom error messages via JavaScript. The novalidate attribute on <form> disables validation.",
            beginnerExample: '<form>\n  <label for=\"email\">Email (required, must be valid format):</label>\n  <input type=\"email\" id=\"email\" name=\"email\" required>\n\n  <label for=\"age\">Age (18-120):</label>\n  <input type=\"number\" id=\"age\" name=\"age\" min=\"18\" max=\"120\" required>\n\n  <label for=\"zip\">ZIP Code (5 digits):</label>\n  <input type=\"text\" id=\"zip\" name=\"zip\" pattern=\"[0-9]{5}\" title=\"5-digit ZIP code\">\n\n  <label for=\"pw\">Password (min 8 chars):</label>\n  <input type=\"password\" id=\"pw\" name=\"pw\" minlength=\"8\" required>\n\n  <button type=\"submit\">Submit</button>\n</form>',
            commonMistakes: "Relying solely on client-side validation (server-side still required), using pattern without title attribute, not customizing error messages (native messages vary by browser), and disabling validation with novalidate unnecessarily.",
            bestPractices: "Use appropriate input types for type validation, combine constraints (required + pattern + minlength), customize error messages with setCustomValidity, style :valid/:invalid states, and always validate on the server as well.",
            visualExplanation: "Validation States:\n  :valid - green border, input passes constraints\n  :invalid - red border, input fails constraints\n  :required - applies to required inputs\n  :focus:invalid - show errors as user types\n  :focus:valid - confirm correct input in real-time"
          },
          quiz: [
            {
              id: "html-val-1",
              question: "Which attribute makes a field mandatory?",
              options: ["required", "mandatory", "must", "enforce"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "easy",
            },
            {
              id: "html-val-2",
              question: "What is the purpose of the pattern attribute?",
              options: ["To validate input against a regex pattern", "To set input background pattern", "To pattern-match password hints", "To create input masks"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "medium",
            },
            {
              id: "html-val-3",
              question: "Can HTML validation be bypassed?",
              options: ["Yes, by disabling JavaScript or modifying HTML", "No, it is enforced by the browser", "Only in older browsers", "Yes, but only with server-side code"],
              correctIndex: 0,
              explanation: "HTML validation is client-side only and can be bypassed. This is why server-side validation is always necessary for security.",
              difficulty: "hard"
            }
          ],
          faangQuestions: [
            {
              question: "How does the Constraint Validation API work? Explain how to create custom validation messages.",
              answer: "The Constraint Validation API provides methods on form elements: checkValidity() returns boolean, validationMessage returns error string, setCustomValidity(message) sets a custom error. When validity is false, the element matches :invalid CSS. Custom messages override browser defaults. Example: input.addEventListener(invalid, (e) => e.target.setCustomValidity(Please enter a valid value)). The validityState object has properties: valueMissing, typeMismatch, patternMismatch, tooLong, tooShort, rangeUnderflow, rangeOverflow, stepMismatch, badInput, customError.",
              difficulty: "hard",
              company: "Google"
            },
            {
              question: "How should validation errors be displayed for optimal accessibility and UX?",
              answer: "Best practices: (1) Show errors inline (next to the field), not aggregated at top only. (2) Use aria-describedby on input linking to error message element. (3) Use aria-invalid=true on invalid inputs. (4) Use role=alert on error messages. (5) Keep error messages specific (Enter a valid email, not Invalid input). (6) Show errors after submission or on blur, not while typing (unless real-time validation). (7) Ensure error messages have sufficient color contrast. (8) Use the :invalid CSS pseudo-class for visual cues but do not rely on color alone. (9) Announce errors to screen readers with live region.",
              difficulty: "hard",
              company: "Apple"
            }
          ],
          codingChallenges: []
        },
        {
          slug: "file-upload",
          title: "File Upload",
          order: 9,
          content: {
            overview: "The <input type=file> element allows users to select files from their device to upload. It supports single or multiple file selection, file type filtering via the accept attribute, and works with multipart/form-data encoding.",
            problemStatement: "Web applications often need to accept file uploads - profile pictures, documents, resumes. A standardized way to access the file system and select files is essential.",
            intuitionFirst: "The file input is like a mailbox slot. Users insert their file, and the form packages it up and sends it to the server. The accept attribute is like a sign saying 'letters only, no packages.'",
            realLifeAnalogy: "Think of file upload like dropping off photos at a pharmacy for printing. You choose which photos (files) to submit, and the store processes them (server handles the files).",
            howItWorks: "The file input opens the OS file picker dialog. The accept attribute filters file types (accept=image/*, .pdf, .doc). The multiple attribute allows selecting multiple files. The File API (JavaScript) provides access to file metadata (name, size, type) and content (via FileReader). Form enctype must be multipart/form-data.",
            beginnerExample: '<form action=\"/upload\" method=\"POST\" enctype=\"multipart/form-data\">\n  <label for=\"avatar\">Profile Picture:</label>\n  <input type=\"file\" id=\"avatar\" name=\"avatar\" accept=\"image/*\">\n\n  <label for=\"documents\">Documents (PDF, up to 5):</label>\n  <input type=\"file\" id=\"documents\" name=\"documents\" accept=\".pdf\" multiple>\n\n  <button type=\"submit\">Upload</button>\n</form>',
            commonMistakes: "Forgetting enctype=multipart/form-data on the form, not validating file size/type on client and server, using a single file input when multiple files are expected without the multiple attribute, and not showing upload progress.",
            bestPractices: "Always validate file type and size on both client (accept attribute + JavaScript) and server, show upload progress with XMLHttpRequest or Fetch API, provide drag-and-drop for better UX, handle large files with chunked upload, and display selected file names before upload.",
            securityNotes: "Never trust file metadata (rename files server-side), validate file content type (not just extension), scan for malware, set max file size limits, use virus scanning, store files outside web root or use secure URLs, and limit file types allowed."
          },
          quiz: [
            {
              id: "html-file-1",
              question: "What enctype is required for file upload forms?",
              options: ["multipart/form-data", "application/x-www-form-urlencoded", "text/plain", "application/json"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "easy",
            },
            {
              id: "html-file-2",
              question: "What attribute restricts which file types can be selected?",
              options: ["accept", "type", "filter", "allow"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "easy",
            },
            {
              id: "html-file-3",
              question: "How can you allow selecting multiple files?",
              options: ["Add the multiple attribute", "Use multiple file inputs", "Set max=999", "It is not possible with HTML alone"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "medium",
            }
          ],
          faangQuestions: [
            {
              question: "How does file upload work? Explain the shift from form-based uploads to AJAX/progress-based uploads.",
              answer: "Traditional form-based upload: form submits with multipart/form-data, browser navigates away, server processes and returns response. AJAX upload: JavaScript captures files via the File API, uses XMLHttpRequest or Fetch API to send FormData object asynchronously. Benefits: (1) Progress tracking via xhr.upload.onprogress, (2) no page navigation, (3) parallel uploads, (4) better error handling, (5) drag-and-drop support. The Fetch API does not natively support progress events (use XMLHttpRequest for progress or ReadableStream). Modern approach: use libraries like Dropzone.js, Uppy, or tus-js-client for resumable uploads.",
              difficulty: "hard",
              company: "Google"
            },
            {
              question: "What are the security considerations for file upload functionality? Describe common attacks and mitigations.",
              answer: "Common attacks: (1) Malware upload - attacker uploads infected files. Mitigation: virus scanning, file type validation (magic bytes), extension whitelist. (2) Remote code execution - uploading PHP/script files that get executed. Mitigation: store files outside web root, disable execute permissions on upload directory, rename files server-side. (3) Path traversal - exploit filename paths to write outside upload directory. Mitigation: sanitize filenames, strip path components. (4) Denial of service - large file uploads consume server resources. Mitigation: enforce size limits, limit upload rate, use CDN for storage. (5) MIME type spoofing - file extension does not match content. Mitigation: validate magic bytes, do not trust Content-Type or extension alone.",
              difficulty: "expert",
              company: "Amazon"
            }
          ],
          codingChallenges: [
            {
              title: "Build a Complete Registration Form",
              description: "Create a registration form with: text inputs (name, email, phone), password with validation (min 8 chars, 1 number), date of birth, country select dropdown, interests checkboxes, gender radio buttons, a bio textarea, a profile picture file upload, and proper form validation using HTML5 attributes.",
              difficulty: "medium",
              solutionHint: "Use <fieldset> with <legend> for grouping, input types (email, tel, password, date, file), select with optgroup, checkboxes with same name, radio with same name, textarea with rows/cols, and validation attributes (required, pattern, minlength, accept)."
            }
          ]
        }
      ]
    },
    {
      slug: "semantic-tags",
      title: "Semantic Tags",
      description:
        "Deep dive into HTML5 semantic elements that give structure and meaning to web content",
      order: 8,
      subtopics: [
        {
          slug: "header",
          title: "Header",
          order: 1,
          content: {
            overview: "The <header> element represents introductory content, typically a group of introductory or navigational aids. It may contain headings, logos, navigation links, search bars, and other introductory content.",
            problemStatement: "Web pages need a designated area for introductory content - site titles, logos, navigation. Without a semantic header element, developers used div with class=header, providing no meaning to assistive technologies or search engines.",
            intuitionFirst: "The <header> is like the cover page of a book. It tells you the title, author, and what the book is about. It introduces the content that follows.",
            realLifeAnalogy: "Think of <header> like the entrance to a museum. It has the museum name (site title), a map (navigation), and maybe an introductory video. It sets the stage for everything inside.",
            howItWorks: "<header> is a block-level semantic element that can be used multiple times per page (within <article>, <section>, etc.). When at the top of the page, it typically contains the site branding. When inside <article>, it introduces that article. It has an implicit ARIA role of banner when used as the page-level header (only one per page).",
            beginnerExample: '<header>\n  <a href="/">\n    <img src="logo.svg" alt="Site Logo">\n  </a>\n  <nav>\n    <ul>\n      <li><a href="/">Home</a></li>\n      <li><a href="/about">About</a></li>\n      <li><a href="/contact">Contact</a></li>\n    </ul>\n  </nav>\n</header>\n\n<article>\n  <header>\n    <h1>Blog Post Title</h1>\n    <p>Published on <time datetime=\"2026-01-15\">Jan 15</time></p>\n  </header>\n  <p>Article content...</p>\n</article>',
            commonMistakes: "Using <header> just for visual styling (use CSS), nesting <header> inside <footer>, using multiple page-level headers, and placing <header> where it does not introduce content.",
            bestPractices: "Use <header> at the top of the page for site branding and navigation, use <header> inside <article> for article introduction, do not confuse with <head> (metadata), and only one page-level <header> should have role=banner."
          },
          quiz: [
            {
              id: "html-sem-header-1",
              question: "Can a page have multiple <header> elements?",
              options: ["Yes, within different sections/articles", "No, only one per page", "Yes, but only two", "No, <header> is deprecated"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "medium",
            },
            {
              id: "html-sem-header-2",
              question: "What is the implicit ARIA role of a page-level <header>?",
              options: ["banner", "header", "navigation", "contentinfo"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "hard",
            }
          ],
          faangQuestions: [],
          codingChallenges: []
        },
        {
          slug: "footer-element",
          title: "Footer",
          order: 2,
          content: {
            overview: "The <footer> element represents the closing or end section of a page or section. It typically contains copyright information, author credits, sitemap links, back-to-top links, and related documents.",
            problemStatement: "Pages need a designated area for closing content like copyright notices, legal links, and contact information. A semantic footer element provides meaning and structure to this common page region.",
            intuitionFirst: "The <footer> is like the last page of a book - it has the copyright notice, publisher information, and where the book was printed. It signals to the reader that the content is ending.",
            realLifeAnalogy: "Think of <footer> like the credits at the end of a movie. It rolls after the main content and contains additional information about who made it and what came next.",
            howItWorks: "<footer> is a block-level semantic element. Like <header>, it can be used per-section or per-page. When at the bottom of the page, it has an implicit ARIA role of contentinfo (only one per page). It often contains <address> for contact info and <small> for legal text.",
            beginnerExample: '<footer>\n  <p>&copy; 2026 Learning Hub. All rights reserved.</p>\n  <nav>\n    <a href="/privacy">Privacy Policy</a> |\n    <a href="/terms">Terms of Service</a>\n  </nav>\n  <address>123 Learning St, Web City</address>\n</footer>\n\n<article>\n  <p>Article content...</p>\n  <footer>\n    <p>Written by John Doe</p>\n  </footer>\n</article>',
            commonMistakes: "Using <footer> for non-footer content, placing <footer> outside <body>, putting navigation-only content in footer, and having multiple footers with role=contentinfo.",
            bestPractices: "Use <footer> for closing/end-section content, include copyright, contact, and legal links, use <footer> inside articles for author/byline info, and only one page-level footer with contentinfo role."
          },
          quiz: [
            {
              id: "html-sem-footer-1",
              question: "What is the implicit ARIA role of the page-level <footer>?",
              options: ["contentinfo", "footer", "complementary", "region"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "medium",
            },
            {
              id: "html-sem-footer-2",
              question: "Can <footer> contain <nav> elements?",
              options: ["Yes, for secondary navigation", "No, nav belongs in header", "Only for sitemaps", "No, footer cannot contain interactive elements"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "easy",
            }
          ],
          faangQuestions: [],
          codingChallenges: []
        },
        {
          slug: "main",
          title: "Main",
          order: 3,
          content: {
            overview: "The <main> element represents the dominant content of the <body> of a document. There should be exactly one <main> element per page, and it should not be nested inside <article>, <aside>, <header>, <footer>, or <nav>.",
            problemStatement: "Accessibility tools needed a way to skip directly to the primary content, bypassing repeated navigation and headers. Without a designated main element, screen reader users had to tab through navigation to reach content.",
            intuitionFirst: "The <main> element is like the main stage at a concert. The header and nav are the lobby and corridors, but <main> is where the actual performance happens - the primary reason the audience came.",
            realLifeAnalogy: "Think of <main> as the centerpiece of a newspaper - the main story. Everything around it (header with newspaper name, sidebar with ads, footer with subscription info) is secondary. The main article is why you bought the paper.",
            howItWorks: "<main> is a block-level semantic element with an implicit ARIA role of main. Screen readers provide a shortcut to jump to it (keyboard shortcut). It should contain content unique to the page (not repeated across pages like sidebars or navigation). Browsers and frameworks may use it for skip-to-content links.",
            beginnerExample: '<body>\n  <header>Site branding and nav</header>\n  <main>\n    <h1>Page Title</h1>\n    <p>This is the primary content of the page.</p>\n    <article>\n      <h2>Article Title</h2>\n      <p>Article content...</p>\n    </article>\n  </main>\n  <aside>Sidebar content</aside>\n  <footer>Copyright info</footer>\n</body>',
            commonMistakes: "Having multiple <main> elements, nesting <main> inside <article> or <section>, putting repeated content (sidebars, copyright) inside <main>, and not including a skip-to-content link targeting <main>.",
            bestPractices: "Use exactly one <main> per page, place it directly inside <body> (not nested in other elements), include a skip-to-content link targeting it, and put only unique page content inside it."
          },
          quiz: [
            {
              id: "html-sem-main-1",
              question: "How many <main> elements should a page have?",
              options: ["Exactly one", "One per section", "As many as needed", "None, it is optional"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "easy",
            },
            {
              id: "html-sem-main-2",
              question: "What ARIA role does <main> have implicitly?",
              options: ["main", "region", "contentinfo", "document"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "easy",
            }
          ],
          faangQuestions: [],
          codingChallenges: []
        },
        {
          slug: "section",
          title: "Section",
          order: 4,
          content: {
            overview: "The <section> element represents a standalone section of content that is thematically grouped. Each section should typically have a heading (h1-h6) as a child to label the section topic.",
            problemStatement: "Long pages need logical groupings of related content. Without a semantic sectioning element, developers used divs with classes, providing no inherent structure for search engines or accessibility tools to understand content grouping.",
            intuitionFirst: "A <section> is like a chapter in a book. Each chapter covers a specific topic and has its own title. Multiple sections make up the whole document, just as chapters make up a book.",
            realLifeAnalogy: "Think of <section> like departments in a department store. Each department (electronics, clothing, home goods) is a separate section with its own category. They are all part of the same store, but each has distinct, related content.",
            howItWorks: "<section> creates a new section in the document outline. It is a block-level semantic element. When you nest <section> elements, you create a hierarchy that forms the document outline. Each section should have a heading. <section> is generic - use <article>, <nav>, or <aside> when more specific semantics apply.",
            beginnerExample: '<section>\n  <h2>Getting Started</h2>\n  <p>This section covers the basics to get you started.</p>\n  <section>\n    <h3>Installation</h3>\n    <p>How to install the software.</p>\n  </section>\n  <section>\n    <h3>Configuration</h3>\n    <p>How to configure your setup.</p>\n  </section>\n</section>',
            commonMistakes: "Using <section> just as a styling hook (use <div> for that), not including a heading inside <section>, using <section> when <article> is more appropriate, and over-nesting sections without clear thematic grouping.",
            bestPractices: "Use <section> for thematic groups of content, always include a heading, use <article> instead for self-contained content, use <div> for purely styling containers, and ensure the section grouping makes logical sense."
          },
          quiz: [
            {
              id: "html-sem-section-1",
              question: "When should you use <section> vs <article>?",
              options: ["<section> for thematic grouping, <article> for self-contained content", "They are interchangeable", "<section> is for sidebars, <article> is for main content", "<article> is for blog posts only"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "medium",
            },
            {
              id: "html-sem-section-2",
              question: "Should a <section> have a heading?",
              options: ["Yes, typically it should have a heading", "No, headings are optional", "Only if it is inside <article>", "Only if it is the first section"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "easy",
            }
          ],
          faangQuestions: [],
          codingChallenges: []
        },
        {
          slug: "article",
          title: "Article",
          order: 5,
          content: {
            overview: "The <article> element represents a self-contained composition that can be independently distributed or reused. Examples include blog posts, news articles, forum posts, user comments, and widget content.",
            problemStatement: "Content that could stand alone - like a blog post, news story, or comment - needs a semantic wrapper indicating it is independent. Without <article>, self-contained content is indistinguishable from surrounding page sections.",
            intuitionFirst: "An <article> is like a magazine article that can be pulled out and read on its own. It makes sense even when separated from the rest of the page. It has its own title, content, and often its own header/footer.",
            realLifeAnalogy: "Think of <article> like a newspaper article. Each article on the page is self-contained - it has its own headline, byline, and content. You could cut it out and share it, and it would still make sense.",
            howItWorks: "<article> is a block-level semantic element that creates a nested document outline. It can contain its own <header>, <footer>, <section> elements. It has an implicit ARIA role of article. Search engines use <article> to identify independent content for search snippets. <article> can be nested (e.g., a blog post containing user comments as child articles).",
            beginnerExample: '<article>\n  <header>\n    <h1>How to Learn HTML in 2026</h1>\n    <p>By John Doe | Published: <time datetime="2026-03-15">March 15, 2026</time></p>\n  </header>\n  <p>HTML is the foundation of web development...</p>\n  <section>\n    <h2>Why Learn HTML?</h2>\n    <p>HTML is essential for web development.</p>\n  </section>\n  <footer>\n    <p>Category: Web Development | Tags: HTML, Beginner</p>\n  </footer>\n</article>',
            commonMistakes: "Using <article> for content that is not self-contained (use <section>), forgetting that comments inside a blog post are child articles, not including a heading, and using <article> for every list item.",
            bestPractices: "Use <article> for content that could be syndicated (RSS, social media), include a heading and publication date, use nested <article> for comments/replies, and use <section> within <article> for internal theming."
          },
          quiz: [
            {
              id: "html-sem-article-1",
              question: "What kind of content belongs in an <article> element?",
              options: ["Self-contained content that can be independently distributed", "Any section of a webpage", "Only blog posts and news articles", "Only content with images"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "easy",
            },
            {
              id: "html-sem-article-2",
              question: "Can you nest <article> elements inside another <article>?",
              options: ["Yes, for comments related to a blog post", "No, that is invalid HTML", "Only one level deep", "Yes, but only with ARIA roles"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "medium",
            }
          ],
          faangQuestions: [],
          codingChallenges: []
        },
        {
          slug: "aside",
          title: "Aside",
          order: 6,
          content: {
            overview: "The <aside> element represents content that is tangentially related to the content around it. It is often used for sidebars, pull quotes, advertisements, related links, and contextual notes.",
            problemStatement: "Content related but not essential to the main topic - like side notes, related articles, or advertisements - needs to be semantically separated from the main content. Without <aside>, this secondary content is structurally mixed with primary content.",
            intuitionFirst: "An <aside> is like the margin notes in a textbook. They contain extra information that supplements the main text but is not required to understand it. You can skip them and still grasp the main content.",
            realLifeAnalogy: "Think of <aside> like the sidebar in a blog - related posts, author bio, tag cloud. It is related to the content but not part of the main flow. If removed, the main article still makes perfect sense.",
            howItWorks: "<aside> is a block-level semantic element with an implicit ARIA role of complementary. When nested inside <article>, it relates to that article. When at the page level, it relates to the overall page. The browser positions it in the flow by default, but CSS is typically used to place it as a sidebar.",
            beginnerExample: '<article>\n  <h1>Main Article</h1>\n  <p>Primary content goes here...</p>\n  <aside>\n    <h2>Related Articles</h2>\n    <ul>\n      <li><a href="/html-basics">HTML Basics</a></li>\n      <li><a href="/css-guide">CSS Guide</a></li>\n    </ul>\n  </aside>\n</article>\n\n<aside>\n  <h2>Advertisement</h2>\n  <p>Sponsored content</p>\n</aside>',
            commonMistakes: "Using <aside> for content that is actually part of the main flow, putting navigation in <aside> (use <nav>), using multiple asides without logical separation, and placing <aside> inside <main> when it should be outside.",
            bestPractices: "Use <aside> for tangential or supplementary content, ensure the content is related but non-essential, use <nav> for navigation blocks, and place <aside> appropriately in the document flow."
          },
          quiz: [
            {
              id: "html-sem-aside-1",
              question: "What is the purpose of the <aside> element?",
              options: ["For content tangentially related to the surrounding content", "For main navigation menus", "For page footers", "For storing hidden content"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "easy",
            },
            {
              id: "html-sem-aside-2",
              question: "What is the implicit ARIA role of <aside>?",
              options: ["complementary", "aside", "region", "navigation"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "medium",
            }
          ],
          faangQuestions: [],
          codingChallenges: []
        },
        {
          slug: "nav",
          title: "Nav",
          order: 7,
          content: {
            overview: "The <nav> element represents a section of a page that links to other pages or to parts within the page. It is intended for major navigation blocks, not all groups of links.",
            problemStatement: "Navigation is a critical page landmark that screen reader users need to quickly identify and skip or access. Without a semantic navigation element, finding the main navigation required tabbing through all content.",
            intuitionFirst: "The <nav> element is like a signpost at a crossroads. It points you to where you can go and helps you navigate between destinations. It is the most important landmark for understanding a site structure.",
            realLifeAnalogy: "Think of <nav> like the directory sign in a shopping mall. It lists the major stores (pages) and their locations (URLs). Additional smaller signs inside stores are like <a> links outside of <nav>.",
            howItWorks: "<nav> is a block-level semantic element with an implicit ARIA role of navigation. Screen readers provide shortcuts to jump between navigation landmarks. Multiple <nav> elements should have distinct aria-labels (Main navigation, Footer navigation). Not all links need to be in <nav> - only major navigation blocks.",
            beginnerExample: '<nav aria-label="Main navigation">\n  <ul>\n    <li><a href="/">Home</a></li>\n    <li><a href="/courses">Courses</a></li>\n    <li><a href="/about">About</a></li>\n    <li><a href="/contact">Contact</a></li>\n  </ul>\n</nav>',
            commonMistakes: "Putting every link on the page in <nav> (only primary navigation), not using aria-label when multiple nav elements exist, using <nav> for breadcrumbs (acceptable) but forgetting the aria-label, and using <div> for navigation instead of <nav>.",
            bestPractices: "Use <nav> for primary and secondary navigation blocks, add aria-label to distinguish multiple nav elements, use <ul> for link lists inside <nav>, keep navigation concise, and use skip-to-content links for accessibility."
          },
          quiz: [
            {
              id: "html-sem-nav-1",
              question: "Should every link on a page be inside a <nav> element?",
              options: ["No, only major navigation blocks", "Yes, every link needs nav", "Only external links", "Only footer links"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "medium",
            },
            {
              id: "html-sem-nav-2",
              question: "What is the implicit ARIA role of <nav>?",
              options: ["navigation", "nav", "list", "region"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "easy",
            }
          ],
          faangQuestions: [],
          codingChallenges: [
            {
              title: "Build a Complete Semantic HTML Page",
              description: "Create a full page layout using only semantic HTML5 elements. Include: <header> with site title and <nav>, <main> with two <article> elements (each with <header>, <section>, <footer>), an <aside> with related links, and a <footer> with copyright. Ensure proper heading hierarchy and ARIA landmarks.",
              difficulty: "easy",
              solutionHint: "Use <h1> for site title in header, <h2> for article headings, <h3> for sections within articles. Add aria-label to nav elements. Use <time> for dates and <address> in footer."
            }
          ]
        }
      ]
    },
    {
      slug: "accessibility",
      title: "Accessibility",
      description:
        "Learn how to make HTML accessible to all users including those using screen readers and assistive technologies",
      order: 9,
      subtopics: [
        {
          slug: "aria-labels",
          title: "ARIA Labels",
          order: 1,
          content: {
            overview: "ARIA (Accessible Rich Internet Applications) labels provide additional context and descriptions for screen readers when native HTML semantics are insufficient. Key attributes include aria-label, aria-labelledby, and aria-describedby.",
            problemStatement: "Many UI elements (icon buttons, progress bars, custom controls) lack visible text labels or have complex structures that screen readers cannot interpret from HTML alone. ARIA bridges this gap by providing extra semantic information.",
            intuitionFirst: "ARIA labels are like audio descriptions for a movie. They provide additional narration about what is happening for people who cannot see the visuals. ARIA does the same for web elements that screen readers cannot understand.",
            realLifeAnalogy: "Think of ARIA attributes like adding sticky notes to a document for someone who will read it aloud. The sticky notes say things like this button opens a menu, this section is the main content, this error is important.",
            howItWorks: "aria-label provides a string label for an element. aria-labelledby references the ID of another element as the label. aria-describedby adds a longer description. These override or supplement the accessible name computed from the element content. Screen readers announce the ARIA label instead of or in addition to the element text.",
            beginnerExample: '<button aria-label="Close dialog" onclick="closeDialog()">\n  <svg><!-- X icon --></svg>\n</button>\n\n<div role="progressbar" aria-label="Loading progress" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">\n  60%\n</div>\n\n<input type="text" aria-describedby="email-hint">\n<p id="email-hint">We will never share your email</p>',
            commonMistakes: "Overusing ARIA when native HTML semantics work (use semantic HTML first), using aria-label on non-interactive elements unnecessarily, forgetting to localize ARIA labels, and using aria-labelledby with invalid IDs.",
            bestPractices: "Follow the first rule of ARIA: use native HTML semantics first, use aria-label for icon-only buttons and controls without visible text, use aria-labelledby when label text is already visible elsewhere, use aria-describedby for additional help text, and test with screen readers.",
            performanceNotes: "ARIA attributes do not affect performance. They are only metadata in the accessibility tree. However, overly complex ARIA can confuse screen readers and create a poor user experience."
          },
          quiz: [
            {
              id: "html-aria-1",
              question: "When should you use aria-label?",
              options: ["For icon-only buttons without visible text", "For every element on the page", "Instead of alt text on images", "Only for form inputs"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "easy",
            },
            {
              id: "html-aria-2",
              question: "What is the difference between aria-label and aria-labelledby?",
              options: ["aria-label provides a direct string, aria-labelledby references another element ID", "They are the same", "aria-labelledby is for labels, aria-label is for descriptions", "aria-label is newer and preferred"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "medium",
            },
            {
              id: "html-aria-3",
              question: "What is the first rule of ARIA?",
              options: ["Use native HTML semantics first before adding ARIA", "Always use ARIA on custom elements", "ARIA should be used on every interactive element", "Never use ARIA with semantic HTML"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "hard",
            }
          ],
          faangQuestions: [
            {
              question: "How does the browser compute the accessible name for an element? Explain the accessible name computation algorithm.",
              answer: "The accessible name is computed in order of priority: (1) aria-labelledby (references element IDs, highest priority), (2) aria-label (direct string), (3) element attributes (e.g., alt on <img>, title on all elements), (4) element content (text content of the element and its children), (5) placeholder (for inputs). The algorithm stops at the first valid source. For example, if aria-label is present, aria-labelledby takes precedence. If neither exists, the element content is used. Understanding this is crucial for predicting what screen readers will announce.",
              difficulty: "hard",
              company: "Google"
            },
            {
              question: "What are ARIA live regions and how do they work? Provide use cases.",
              answer: "ARIA live regions (aria-live) allow dynamic content updates to be announced by screen readers without the user having to focus on the updated area. Values: off (default), polite (announces when idle), assertive (announces immediately). Use aria-live=polite for chat messages, stock tickers, and notifications. Use role=status or role=alert for built-in live region behavior. aria-atomic specifies whether the entire region or just changed parts should be announced. aria-relevant specifies what types of changes trigger announcements (additions, removals, text). Important: do not use assertive unless absolutely necessary as it interrupts the current speech.",
              difficulty: "hard",
              company: "Apple"
            }
          ],
          codingChallenges: []
        },
        {
          slug: "alt-text",
          title: "Alt Text",
          order: 2,
          content: {
            overview: "Alt text (alternative text) is a textual replacement for images on a web page. It is specified using the alt attribute on the <img> element and is essential for accessibility, SEO, and when images fail to load.",
            problemStatement: "Not all users can see images - blind users rely on screen readers, users on slow connections may have images disabled, and browsers may fail to load images. Without alt text, these users miss the content and purpose of images.",
            intuitionFirst: "Alt text is like a verbal description of a photograph for someone who cannot see it. You describe what is in the image and its purpose, not just list what is technically present.",
            realLifeAnalogy: "Alt text is like the audio description track on a DVD. While the visuals play, a narrator describes what is happening on screen for viewers who cannot see it. Similarly, alt text describes images for users who cannot see them.",
            howItWorks: "The alt attribute is added to <img> elements. Screen readers read the alt text when they encounter the image. Search engines use alt text for image SEO. When an image fails to load, the browser displays the alt text in place of the image. If an image is purely decorative, use alt= (empty) to tell screen readers to skip it.",
            beginnerExample: '<img src="photo.jpg" alt="A child playing with a dog in a sunny park">\n\n<img src="logo.svg" alt="Company Name - Home">\n\n<img src="decorative-border.png" alt="">\n\n<img src="chart.png" alt="Bar chart showing Q4 sales increased 25% compared to Q3">\n\n<a href="/download"><img src="download-icon.svg" alt="Download the PDF guide"></a>',
            commonMistakes: "Using alt=image or alt=photo (unhelpful), forgetting alt attribute entirely (accessibility failure), using alt for decorative images (should be empty), writing alt text that duplicates adjacent text, and using long descriptions when a concise one suffices.",
            bestPractices: "Describe the content and function of the image, keep it concise (under 125 characters), use empty alt for decorative images, include text that is in the image, end with a period for screen reader pauses, and use longdesc or aria-describedby for complex infographics."
          },
          quiz: [
            {
              id: "html-alt-1",
              question: "What alt text should a decorative image have?",
              options: ["Empty alt attribute (alt=)", "decorative image", "No alt attribute at all", "decoration"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "medium",
            },
            {
              id: "html-alt-2",
              question: "What is the recommended maximum length for alt text?",
              options: ["125 characters", "50 characters", "250 characters", "No limit"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "medium",
            },
            {
              id: "html-alt-3",
              question: "What happens if an image fails to load and has alt text?",
              options: ["The alt text is displayed in place of the image", "Nothing - the image is just missing", "A broken image icon shows", "The page shows an error message"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "easy",
            }
          ],
          faangQuestions: [
            {
              question: "How should alt text be written for complex images like charts, graphs, and infographics? What techniques provide equivalent information?",
              answer: "For complex images: provide a concise alt describing the overall message or conclusion (e.g., alt=Bar chart showing 40% revenue growth in 2026), and provide detailed data elsewhere (table, description text, or via aria-describedby). WCAG requires the equivalent information to be available in text. Techniques: (1) Use a nearby data table for chart data. (2) Use aria-describedby on the img pointing to a detailed description paragraph. (3) Use the <figure> and <figcaption> elements with full description inside figcaption. (4) Link to a separate accessible data page. Avoid alt text that is too long - screen readers read the entire alt without pause.",
              difficulty: "hard",
              company: "Google"
            }
          ],
          codingChallenges: []
        },
        {
          slug: "screen-readers",
          title: "Screen Readers",
          order: 3,
          content: {
            overview: "Screen readers are assistive technologies that convert digital text into synthesized speech or braille output. They allow blind and visually impaired users to navigate and interact with web content by reading aloud the accessible information.",
            problemStatement: "Millions of users rely on screen readers to access the web. Without proper HTML semantics and ARIA attributes, these users cannot navigate, understand, or interact with web content effectively.",
            intuitionFirst: "A screen reader is like having a personal assistant read every webpage to you aloud. It announces headings, links, images (via alt text), and form controls. The quality of the experience depends entirely on the HTML structure.",
            realLifeAnalogy: "Think of a screen reader like an audiobook narrator. A good narrator (well-structured HTML) reads with proper emphasis, pauses at section breaks, and describes images. A bad narrator (poor HTML) reads everything in a monotone without any structure.",
            howItWorks: "Screen readers parse the accessibility tree (a simplified version of the DOM) built by the browser. They provide navigation shortcuts: H for headings, Tab for links, D for landmarks, T for tables. Users can navigate by these elements, list them, or read linearly. Each element is announced with its role, name, state, and value. CSS visual order does not affect screen reader order - the DOM order determines the reading sequence.",
            beginnerExample: '<!-- Screen reader friendly HTML -->\n<header>\n  <h1>My Website</h1>\n  <nav aria-label="Main">\n    <ul>\n      <li><a href="/">Home</a></li>\n      <li><a href="/products">Products</a></li>\n    </ul>\n  </nav>\n</header>\n<main>\n  <h2>Welcome</h2>\n  <p>Content with <a href="/more">descriptive link text</a>.</p>\n  <button aria-label="Search">🔍</button>\n</main>',
            commonMistakes: "Using CSS display:none or visibility:hidden to hide content from screen readers (use the visually-hidden pattern instead), relying on visual order that differs from DOM order, using ambiguous link text (click here, read more), and not testing with actual screen readers.",
            bestPractices: "Test with actual screen readers (NVDA, VoiceOver, JAWS), use semantic HTML, provide descriptive link text, use proper heading hierarchy, add skip-to-content links, ensure keyboard accessibility, and use aria-live for dynamic content updates."
          },
          quiz: [
            {
              id: "html-sr-1",
              question: "How do screen reader users typically navigate headings on a page?",
              options: ["By pressing the H key to jump between headings", "By reading every word", "By using the mouse", "By viewing the source code"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "easy",
            },
            {
              id: "html-sr-2",
              question: "What determines the order in which screen readers read content?",
              options: ["The DOM order", "The CSS visual order", "The order of appearance in source code", "The z-index property"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "medium",
            },
            {
              id: "html-sr-3",
              question: "Why is click here bad for screen readers?",
              options: ["Because the link text does not describe the destination", "Because it is too short", "Because screen readers cannot read click", "Because it contains a verb"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "medium",
            }
          ],
          faangQuestions: [
            {
              question: "How does the browser build the accessibility tree? How does it differ from the DOM tree?",
              answer: "The accessibility tree is a subset of the DOM tree that exposes only semantically meaningful information to assistive technologies. The browser computes it by: (1) starting with the DOM tree, (2) filtering out invisible elements (display:none, hidden), (3) computing accessible names and roles, (4) adding ARIA attributes, (5) computing states and properties. Elements like <div> and <span> without ARIA roles are not exposed (unless they have text content). The accessibility tree has a flat structure compared to the DOM - nested elements may be collapsed if they do not add semantic value. Understanding this helps developers ensure their content is accessible.",
              difficulty: "hard",
              company: "Mozilla"
            },
            {
              question: "What are the differences between NVDA, JAWS, and VoiceOver in terms of HTML support and feature sets?",
              answer: "NVDA (Windows, free): excellent HTML5 support, good for testing, supports ARIA well, used by many developers. JAWS (Windows, paid): most widely used professionally, has extensive script support, older codebase means some HTML5 features may lag. VoiceOver (macOS/iOS, built-in): excellent with Safari, supports most ARIA, gesture-based navigation on iOS. Differences: (1) how they handle dynamic content updates, (2) announcements of ARIA roles and states, (3) navigation shortcuts vary, (4) support for new HTML features. Best practice: test with at least NVDA (Windows) and VoiceOver (macOS) to cover the majority of screen reader users.",
              difficulty: "hard",
              company: "Apple"
            }
          ],
          codingChallenges: [
            {
              title: "Make a Page Screen Reader Friendly",
              description: "Take a simple page with an icon-only button, a decorative image, a chart image, a form with labels, and a navigation menu. Add proper ARIA attributes, alt text, labels, and semantic HTML to make it fully accessible for screen readers.",
              difficulty: "medium",
              solutionHint: "Use aria-label for icon buttons, alt= for decorative images, alt with description for charts, labels with for attributes for form inputs, and nav with aria-label for navigation. Test with NVDA or VoiceOver."
            }
          ]
        }
      ]
    },
    {
      slug: "advanced",
      title: "Advanced",
      description:
        "Explore advanced HTML features including canvas, SVG, web storage APIs, and web workers for building powerful web applications",
      order: 10,
      subtopics: [
        {
          slug: "canvas",
          title: "Canvas",
          order: 1,
          content: {
            overview: "The <canvas> element provides a drawable region in the browser that can be manipulated with JavaScript. It is used for rendering graphics, game graphics, data visualization, photo manipulation, and real-time video processing.",
            problemStatement: "Static images are limited - they cannot be dynamically modified or animated without re-downloading. Web applications needed a way to programmatically draw and update graphics in real-time for charts, games, and interactive visualizations.",
            intuitionFirst: "Canvas is like a blank whiteboard that you can draw on with JavaScript code. You can draw shapes, text, images, and animations. Everything on the canvas is controlled programmatically.",
            realLifeAnalogy: "Think of canvas like an Etch A Sketch - you have a blank screen and you use commands to draw lines, shapes, and patterns. Unlike HTML elements, canvas drawings are immediate pixel-based graphics that cannot be inspected or styled with CSS.",
            howItWorks: "The <canvas> element creates a fixed-size drawing surface. JavaScript accesses it via the Canvas API (getContext(2d) for 2D, getContext(webgl) or getContext(webgl2) for 3D). Drawing commands are immediate - they affect pixels right away. The canvas does not retain a representation of drawn objects - once drawn, they are just pixels. To animate, you repeatedly clear and redraw the canvas.",
            beginnerExample: '<canvas id=\"myCanvas\" width=\"400\" height=\"300\">\n  Your browser does not support the canvas element.\n</canvas>\n\n<script>\n  const canvas = document.getElementById(\"myCanvas\");\n  const ctx = canvas.getContext(\"2d\");\n\n  // Draw a red rectangle\n  ctx.fillStyle = \"red\";\n  ctx.fillRect(50, 50, 100, 80);\n\n  // Draw a blue circle\n  ctx.beginPath();\n  ctx.arc(250, 150, 50, 0, Math.PI * 2);\n  ctx.fillStyle = \"blue\";\n  ctx.fill();\n\n  // Draw text\n  ctx.font = \"20px Arial\";\n  ctx.fillStyle = \"black\";\n  ctx.fillText(\"Hello Canvas!\", 100, 250);\n</script>',
            commonMistakes: "Not specifying width/height attributes (canvas defaults to 300x150), using CSS width/height instead of attributes (distorts the drawing), forgetting to handle high-DPI displays (use devicePixelRatio), and not providing fallback content for unsupported browsers.",
            bestPractices: "Always set width and height attributes on <canvas>, use JavaScript for all drawing, handle retina displays by adjusting canvas size, provide fallback content between tags, and consider using libraries like Three.js for 3D or Chart.js for charts.",
            performanceNotes: "Canvas rendering is GPU-accelerated in modern browsers. For animations: use requestAnimationFrame (not setInterval), minimize state changes (fillStyle, strokeStyle changes), batch draw calls, and avoid unnecessary clears. For large datasets, consider offscreenCanvas for Web Workers."
          },
          quiz: [
            {
              id: "html-canvas-1",
              question: "What method gets the drawing context on a canvas?",
              options: ["getContext(2d)", "getCanvas()", "getDrawingContext()", "createContext()"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "easy",
            },
            {
              id: "html-canvas-2",
              question: "What is the default canvas size if not specified?",
              options: ["300x150 pixels", "800x600 pixels", "100x100 pixels", "There is no default"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "medium",
            },
            {
              id: "html-canvas-3",
              question: "Why should requestAnimationFrame be used instead of setInterval for canvas animations?",
              options: ["For smoother animations and better performance", "They are equivalent", "setInterval is better for canvas", "requestAnimationFrame only works for video"],
              correctIndex: 0,
              explanation: "requestAnimationFrame synchronizes with the browser refresh rate, provides smoother animations, pauses when tab is inactive (saving battery), and has better performance than setInterval.",
              difficulty: "hard"
            }
          ],
          faangQuestions: [
            {
              question: "How does canvas rendering differ from SVG? When would you choose canvas over SVG for data visualization?",
              answer: "Canvas: pixel-based, renders faster for many elements, no DOM nodes per element, no event handling per element without hit detection, resolution-dependent (can look blurry on retina). SVG: vector-based, DOM nodes per element, built-in event handling, resolution-independent, supports CSS styling. Choose canvas for: thousands of data points (scatter plots), real-time updates (video games, live charts), pixel manipulation (photo editing). Choose SVG for: interactive charts with tooltips/hover, small to medium datasets, responsive graphics that need to scale, accessibility (text in SVG can be read by screen readers). For very large datasets, canvas outperforms SVG significantly.",
              difficulty: "hard",
              company: "Google"
            }
          ],
          codingChallenges: []
        },
        {
          slug: "svg",
          title: "SVG",
          order: 2,
          content: {
            overview: "SVG (Scalable Vector Graphics) is an XML-based format for describing vector graphics. Unlike canvas, SVG elements are part of the DOM and can be styled with CSS, scripted with JavaScript, and are resolution-independent.",
            problemStatement: "Raster images (PNG, JPEG) lose quality when scaled and cannot be easily manipulated programmatically. Web applications needed a way to display graphics that scale perfectly, support interactivity, and can be styled dynamically.",
            intuitionFirst: "SVG is like a set of instructions for drawing shapes rather than a fixed picture. It describes lines, curves, colors, and positions mathematically, so it looks perfect at any size.",
            realLifeAnalogy: "Think of SVG like a blueprint compared to a photograph. A blueprint (SVG) contains instructions for how to build something and can be scaled to any size. A photograph (raster image) is just pixels - enlarge it too much and it gets blurry.",
            howItWorks: "SVG elements (<circle>, <rect>, <path>, <text>, etc.) are XML nodes in the DOM. They can be styled with CSS (fill, stroke, opacity), manipulated with JavaScript (add/remove elements, change attributes), and respond to events (click, hover). SVG supports filters, gradients, animations (SMIL or CSS), and patterns.",
            beginnerExample: '<svg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\">\n  <circle cx=\"100\" cy=\"100\" r=\"80\" fill=\"blue\" stroke=\"black\" stroke-width=\"2\"/>\n  <rect x=\"50\" y=\"50\" width=\"100\" height=\"100\" fill=\"red\" opacity=\"0.5\"/>\n  <text x=\"100\" y=\"180\" text-anchor=\"middle\" font-family=\"Arial\">SVG Text</text>\n</svg>',
            commonMistakes: "Forgetting the viewBox attribute (scaling breaks), using fixed width/height without viewBox (non-responsive), embedding raster images in SVG (defeats the purpose), and creating overly complex paths that could be optimized.",
            bestPractices: "Always include viewBox for proper scaling, keep SVGs optimized (use tools like SVGO), use inline SVG for icons (avoids HTTP requests), use <use> for reusing elements, add role=img and aria-label for accessibility, and style with CSS external stylesheets.",
            performanceNotes: "SVG performance degrades with thousands of elements. For very complex graphics, canvas is better. Key optimizations: reduce path complexity, reuse elements with <defs> and <use>, use CSS animations instead of SMIL (better performance), and avoid extensive DOM manipulation."
          },
          quiz: [
            {
              id: "html-svg-1",
              question: "What does SVG stand for?",
              options: ["Scalable Vector Graphics", "Standard Visual Graphics", "System Vector Graphic", "Scalable Visual Grid"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "easy",
            },
            {
              id: "html-svg-2",
              question: "Why does SVG maintain quality when scaled?",
              options: ["Because it uses mathematical descriptions, not pixels", "Because it automatically increases resolution", "Because it is always rendered at 96 DPI", "Because the browser re-rasterizes it"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "easy",
            },
            {
              id: "html-svg-3",
              question: "What attribute defines the coordinate system and scaling behavior in SVG?",
              options: ["viewBox", "scale", "coordSystem", "transform"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "medium",
            }
          ],
          faangQuestions: [
            {
              question: "Compare inline SVG, <img> with SVG source, and CSS background-image with SVG for icons. What are the trade-offs?",
              answer: "Inline SVG: (1) Full DOM access for styling and scripting, (2) can be styled with CSS (fill: currentColor for theme support), (3) adds HTTP requests if not bundled, (4) increases HTML size. <img src=icon.svg>: (1) Cached separately, (2) clean HTML, (3) cannot style from parent page CSS, (4) limited interactivity. CSS background-image: (1) Good for decorative images, (2) not in accessibility tree, (3) no interactivity, (4) easy sprite sheets. Best practice: use inline SVG for interactive icons and logos (allows theme color support), use CSS background for decorative patterns, use <img> for complex SVGs that do not need styling.",
              difficulty: "hard",
              company: "Google"
            }
          ],
          codingChallenges: []
        },
        {
          slug: "local-storage",
          title: "Local Storage",
          order: 3,
          content: {
            overview: "Local Storage is a web storage API that allows websites to store key-value data persistently in the users browser. Data stored in localStorage persists even after the browser is closed and has no expiration time.",
            problemStatement: "Websites often need to store data on the client side - user preferences, shopping cart contents, game progress, or cached data. Cookies have size limits (4KB) and are sent with every request. A larger, client-only storage solution is needed.",
            intuitionFirst: "Local Storage is like a small digital locker attached to a website. Whatever you put in the locker stays there until you remove it. Your browser remembers the locker contents even after restarting the computer.",
            realLifeAnalogy: "Think of localStorage like a notebooks for each website. When you visit a site, it can write notes in its notebook and read them later. Other sites cannot read each others notebooks. The notes stay there even if you close the book and open it again.",
            howItWorks: "localStorage is a property of the window object. Data is stored as strings in key-value pairs. The API provides: setItem(key, value), getItem(key), removeItem(key), clear(), and key(index). The storage limit is typically 5-10MB per origin. Data is not sent to the server automatically. localStorage is synchronous and blocks the main thread.",
            beginnerExample: '// Store data\nlocalStorage.setItem(\"username\", \"JohnDoe\");\nlocalStorage.setItem(\"theme\", \"dark\");\nlocalStorage.setItem(\"cart\", JSON.stringify({items: [\"item1\", \"item2\"]}));\n\n// Retrieve data\nconst username = localStorage.getItem(\"username\");\nconst cart = JSON.parse(localStorage.getItem(\"cart\"));\n\n// Remove data\nlocalStorage.removeItem(\"theme\");\n\n// Clear all\nlocalStorage.clear();\n\n// Check storage count\nconsole.log(localStorage.length);',
            commonMistakes: "Storing sensitive data (passwords, tokens) in localStorage (XSS vulnerability), not handling JSON parse errors, exceeding storage quota (can throw QuotaExceededError), and using localStorage for large data sets (synchronous, blocks the main thread).",
            bestPractices: "Only store non-sensitive data in localStorage, always wrap getItem in try-catch for JSON parsing, use sessionStorage for temporary data, check for storage availability (users can disable it), set size limits appropriate for the 5-10MB quota, and clear unused data.",
            securityNotes: "localStorage is accessible to any JavaScript running on the same origin, making it vulnerable to XSS attacks. Never store: authentication tokens, passwords, credit card numbers, or personal identifiable information. Use HTTP-only cookies for sensitive data (they are not accessible to JavaScript)."
          },
          quiz: [
            {
              id: "html-ls-1",
              question: "What is the typical storage limit for localStorage?",
              options: ["5-10 MB per origin", "4 KB per origin", "Unlimited", "1 MB per origin"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "easy",
            },
            {
              id: "html-ls-2",
              question: "Does localStorage data persist after closing the browser?",
              options: ["Yes, until explicitly cleared", "No, it is session-only", "Only for 24 hours", "Only in private browsing mode"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "easy",
            },
            {
              id: "html-ls-3",
              question: "Why should sensitive data not be stored in localStorage?",
              options: ["Because it is vulnerable to XSS attacks", "Because it is encrypted", "Because it expires too quickly", "Because it has size limits"],
              correctIndex: 0,
              explanation: "localStorage is accessible to any JavaScript on the same origin. If an XSS attack occurs, the attacker can read all localStorage data. Use HTTP-only cookies for sensitive data.",
              difficulty: "hard"
            }
          ],
          faangQuestions: [
            {
              question: "How does localStorage differ from cookies in terms of security, capacity, and use cases? When would you use each?",
              answer: "Cookies: 4KB limit, sent with every HTTP request, can be HttpOnly (inaccessible to JS), can have expiration, support SameSite attribute. localStorage: 5-10MB limit, not sent to server, accessible to JS only (same origin), persists until cleared, synchronous API. Use cases: Cookies for authentication tokens (httpOnly, secure, SameSite), session IDs, user tracking, and server-read data. localStorage for client-only data: user preferences, themes, cached API responses, shopping cart contents, game progress. For large amounts of data that need to be available offline, consider IndexedDB (async, structured data, much larger limits).",
              difficulty: "hard",
              company: "Google"
            }
          ],
          codingChallenges: []
        },
        {
          slug: "session-storage",
          title: "Session Storage",
          order: 4,
          content: {
            overview: "Session Storage is similar to localStorage but with a key difference: data persists only for the duration of the page session. Once the browser tab is closed, the data is cleared.",
            problemStatement: "Sometimes websites need temporary data that should not persist between sessions - form progress in a multi-step workflow, temporary state during a single visit, or sensitive data that should be automatically cleared when the user closes the tab.",
            intuitionFirst: "Session Storage is like a temporary sticky note that you throw away when you leave. It is useful for remembering things during a single visit but ensures nothing is left behind after you close the tab.",
            realLifeAnalogy: "Think of sessionStorage like a hotel key card. It works for the duration of your stay (session), but is deactivated when you check out (close the tab). The information on the card is specific to your current visit.",
            howItWorks: "sessionStorage has the same API as localStorage (setItem, getItem, removeItem, clear). The data is scoped to the current tab or window. Opening the same page in a new tab creates a new session. Refreshing the page preserves the session. sessionStorage is not shared between tabs (unlike localStorage).",
            beginnerExample: '// Store temporary data\nsessionStorage.setItem(\"formStep\", \"2\");\nsessionStorage.setItem(\"tempData\", JSON.stringify({draft: \"user input\"}));\n\n// Retrieve\nconst step = sessionStorage.getItem(\"formStep\");\n\n// Clean up when done\nsessionStorage.removeItem(\"formStep\");\n\n// Or clear all temporary data\nsessionStorage.clear();',
            commonMistakes: "Confusing sessionStorage with localStorage (using sessionStorage for persistent data), assuming sessionStorage persists across tabs, not clearing sessionStorage when the task is complete, and expecting sessionStorage to work in server-side rendering (SSR) contexts.",
            bestPractices: "Use sessionStorage for temporary, session-specific data, clear it when the task is complete, handle the case where sessionStorage is disabled, and use proper error handling for storage operations."
          },
          quiz: [
            {
              id: "html-ss-1",
              question: "When is sessionStorage data cleared?",
              options: ["When the browser tab is closed", "When the browser is restarted", "After 24 hours", "After 1 hour of inactivity"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "easy",
            },
            {
              id: "html-ss-2",
              question: "Is sessionStorage shared between browser tabs?",
              options: ["No, each tab has its own session", "Yes, all tabs share the same session", "Only if the tabs are in the same window", "Only private tabs"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "medium",
            },
            {
              id: "html-ss-3",
              question: "What is the main use case for sessionStorage over localStorage?",
              options: ["Temporary data that should auto-clear when the session ends", "Permanent data storage", "Data that needs to be sent to the server", "Large file storage"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "easy",
            }
          ],
          faangQuestions: [
            {
              question: "How does sessionStorage handle tab duplication and browser crashes? What happens to the data in each case?",
              answer: "Tab duplication (Ctrl+Drag or duplicate command): in most browsers (Chrome, Firefox), duplicating a tab creates a new session with the original session data copied. Changes in the new tab do not affect the original. Browser crash: modern browsers (Chrome, Firefox) use Session Restore which saves sessionStorage after crash and restores it, but this is a browser implementation detail, not guaranteed by the spec. Private browsing: sessionStorage works normally but data is never persisted to disk. Best practice: do not rely on sessionStorage surviving browser crashes - use it for non-critical temporary data only.",
              difficulty: "hard",
              company: "Mozilla"
            }
          ],
          codingChallenges: []
        },
        {
          slug: "web-workers",
          title: "Web Workers",
          order: 5,
          content: {
            overview: "Web Workers enable JavaScript to run in background threads, separate from the main execution thread of a web application. They allow computationally intensive tasks to run without blocking the user interface.",
            problemStatement: "JavaScript is single-threaded - heavy computation (image processing, data parsing, complex calculations) blocks the main thread, freezing the UI and creating a poor user experience. A way to run code in the background without blocking the UI is needed.",
            intuitionFirst: "A Web Worker is like hiring a personal assistant to do complex calculations for you while you continue your main work. The assistant works in a separate room, communicates via notes, and does not interrupt your workflow.",
            realLifeAnalogy: "Think of a Web Worker like a separate check-out line at a grocery store. The main line (main thread) handles regular customers (UI interactions). When a customer with a large cart (heavy computation) comes, they are directed to a separate line (worker) so they do not hold up everyone else.",
            howItWorks: "Workers run scripts in a separate global context with no access to: DOM, window, document, or parent elements. Communication happens via postMessage() and the message event. Data passed between main thread and worker is copied (structured clone), not shared. Workers can use XMLHttpRequest, Fetch, IndexedDB, and WebSockets. Workers are terminated when the parent page is closed.",
            beginnerExample: '// main.js\nconst worker = new Worker(\"worker.js\");\n\nworker.postMessage({numbers: [1, 2, 3, 4, 5]});\n\nworker.onmessage = function(e) {\n  console.log(\"Result:\", e.data.result);\n};\n\nworker.onerror = function(e) {\n  console.error(\"Worker error:\", e.message);\n};\n\n// worker.js\nself.onmessage = function(e) {\n  const numbers = e.data.numbers;\n  const sum = numbers.reduce((a, b) => a + b, 0);\n  self.postMessage({result: sum});\n};',
            commonMistakes: "Trying to access DOM or window from a worker, passing functions (cannot be cloned), not handling errors in workers (uncaught errors silently fail), and creating too many workers (each has its own memory overhead).",
            bestPractices: "Use workers for CPU-intensive tasks (image processing, large data parsing, encryption, compression), keep worker communication minimal (frequent message passing has overhead), terminate workers when done, handle errors with onerror, and consider using transferable objects for large data (ArrayBuffer) to avoid copying.",
            performanceNotes: "Workers have overhead: creating a worker involves loading and parsing the script. For short tasks, the overhead may exceed the benefit. Use workers for tasks taking more than 100ms. Shared Workers allow multiple tabs to share one worker. Service Workers (different from Web Workers) act as network proxies for offline support and push notifications."
          },
          quiz: [
            {
              id: "html-worker-1",
              question: "Can a Web Worker access the DOM?",
              options: ["No, workers have no DOM access", "Yes, workers can access the DOM", "Only through postMessage", "Only read-only access"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "medium",
            },
            {
              id: "html-worker-2",
              question: "How do workers communicate with the main thread?",
              options: ["Through postMessage and message events", "By accessing shared variables", "Through the DOM", "Through XMLHttpRequest"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "easy",
            },
            {
              id: "html-worker-3",
              question: "What happens to a worker when the parent page is closed?",
              options: ["The worker is terminated", "The worker continues running", "The worker goes to sleep", "The worker becomes a SharedWorker"],
              correctIndex: 0,
              explanation: "Based on HTML specification.",
              difficulty: "medium",
            }
          ],
          faangQuestions: [
            {
              question: "What is the difference between Web Workers, Service Workers, and Shared Workers? When would you use each?",
              answer: "Web Workers: background threads for computation, no DOM access, one per page, cannot intercept network requests. Use for: heavy computations, data processing, image manipulation. Service Workers: proxy between browser and network, can intercept and cache requests, enables offline support and push notifications, lifecycle managed by browser, runs even when page is closed. Use for: offline support, background sync, push notifications, caching strategies. Shared Workers: can be accessed by multiple pages/tabs from the same origin, useful for shared state. Use for: shared resources, cross-tab communication, shared data caching. Each has distinct use cases and capabilities.",
              difficulty: "hard",
              company: "Google"
            },
            {
              question: "How does the structured clone algorithm work for data transfer between main thread and workers? What are its limitations?",
              answer: "The structured clone algorithm recursively copies complex objects for transfer between contexts. It supports: all primitive types, arrays, plain objects, Map, Set, Date, RegExp, Blob, File, ImageData, ArrayBuffer. Limitations: (1) Cannot clone functions, (2) Cannot clone DOM nodes, (3) Cannot clone Error objects (Firefox only), (4) Cannot clone Symbols, (5) Circular references cause errors. Transferable objects (ArrayBuffer, MessagePort) can be transferred instead of copied using postMessage with a second parameter, avoiding the performance cost of cloning. For large data, use transferable objects to achieve near-zero-cost data transfer.",
              difficulty: "hard",
              company: "Mozilla"
            }
          ],
          codingChallenges: [
            {
              title: "Build a Prime Number Calculator with Web Workers",
              description: "Create an HTML page that calculates prime numbers up to a user-specified limit using a Web Worker. The page should have an input field and a button. When the user clicks calculate, spawn a worker that computes all primes up to the limit. The page should remain responsive (not freeze) during calculation. Display progress updates from the worker.",
              difficulty: "hard",
              solutionHint: "Create a worker script that receives the limit via postMessage, iterates to find primes, and periodically posts progress updates. The main page listens for messages and updates a progress bar and result list. Use cancel to terminate the worker if needed."
            }
          ]
        }
      ]
    }
  ]
};
