import type { SubjectData } from "./types";

export const reactSubject: SubjectData = {
  slug: "react",
  title: "React",
  description: "Master React from fundamentals to advanced patterns - components, hooks, state management, performance, and the Next.js ecosystem",
  icon: "Atom",
  color: "text-cyan-500",
  order: 3,
  topics: [
    {
      slug: "core-react",
      title: "Core React",
      description: "Learn the foundational building blocks of React - JSX, components, props, and state",
      order: 1,
      subtopics: [
          {
            slug: "jsx",
            title: "JSX",
            order: 1,
            content: {
              overview: "JSX (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like markup directly inside your JavaScript code. It is the primary way to define UI structures in React and makes component code more readable and intuitive.",
              problemStatement: "Before JSX, React developers used React.createElement() calls to build the UI tree, resulting in deeply nested hard-to-read function calls. Building complex UIs required verbose JavaScript that obscured the visual structure.",
              intuitionFirst: "JSX is like writing HTML directly inside JavaScript. Instead of calling React.createElement(\"div\", { className: \"container\" }, \"Hello\"), you write <div className=\"container\">Hello</div>.",
              realLifeAnalogy: "Think of JSX as a blueprint that looks like the final product. An architect draws floor plans that resemble the actual building, not writes a list of construction instructions.",
              howItWorks: "JSX is not valid JavaScript - a compiler transforms JSX into React.createElement() calls at build time. Each JSX element becomes a function call returning a React element object.",
              beginnerExample: "const element = <h1>Hello, world!</h1>;\n\nfunction Greeting() {\n  const name = \"Alice\";\n  return <h1>Hello, {name}!</h1>;\n}",
              commonMistakes: "Using class instead of className, using for instead of htmlFor, forgetting single parent element (use Fragment <>...</>), using if/else directly in JSX, not closing self-closing tags.",
              bestPractices: "Use fragments to avoid unnecessary divs, keep JSX readable, use self-closing tags, use curly braces for expressions, maintain consistent formatting with Prettier.",
              performanceNotes: "JSX has negligible runtime cost as it is compiled away. Avoid creating new objects/arrays in JSX props on every render as this breaks referential equality checks.",
              comparisonTable: "| Feature | JSX | HTML |\n|---------|-----|------|\n| Attribute naming | camelCase (className) | lowercase (class) |\n| Self-closing tags | Required (<br />) | Optional (<br>) |\n| JavaScript expressions | Use {} syntax | Not supported |\n| Comments | {/* comment */} | <!-- comment --> |"
            },
            quiz: [
              {
                id: "react-jsx-1",
                question: "What does JSX compile down to?",
                options: [
                    "React.createElement() calls",
                    "Native HTML strings",
                    "WebAssembly modules",
                    "Direct DOM manipulation",
                ],
                correctIndex: 0,
                explanation: "JSX is syntactic sugar for React.createElement() calls.",
                difficulty: "easy",
              },
              {
                id: "react-jsx-2",
                question: "Why can't you use if-else directly in JSX?",
                options: [
                    "JSX only supports expressions",
                    "Not supported in functions",
                    "React forbids conditionals",
                    "if-else is invalid JS",
                ],
                correctIndex: 0,
                explanation: "Inside {} only expressions are allowed. if-else is a statement.",
                difficulty: "medium",
              },
              {
                id: "react-jsx-3",
                question: "How do you add a CSS class in JSX?",
                options: [
                    "className=\"my-class\"",
                    "class=\"my-class\"",
                    "cssClass=\"my-class\"",
                    "htmlClass=\"my-class\"",
                ],
                correctIndex: 0,
                explanation: "Use className because class is a reserved word in JavaScript.",
                difficulty: "easy",
              }
          ],
          faangQuestions: [
            {
              question: "Explain how JSX prevents XSS attacks in React applications.",
              answer: "JSX automatically escapes all values embedded with {} before rendering. Characters like < > & \" become HTML entities. dangerouslySetInnerHTML bypasses this protection.",
              difficulty: "hard",
              company: "Meta",
            },
            {
              question: "How does the JSX compiler distinguish custom components from native HTML elements?",
              answer: "Lowercase names are HTML elements passed as strings to React.createElement(\"div\"). Uppercase names are custom components passed as identifiers: React.createElement(MyComponent). Component names must start with a capital letter.",
              difficulty: "medium",
              company: "Google",
            }
        ],
        codingChallenges: [
          {
            title: "Build a Profile Card with JSX",
            description: "Create a React component rendering a user profile card with avatar name role bio and skills. Conditionally show a verified badge. Use className and self-closing tags.",
            difficulty: "easy",
            starterCode: "interface Profile { name: string; role: string; bio: string; skills: string[]; verified: boolean; }\n\nfunction ProfileCard({ profile }: { profile: Profile }) {\n  // Your code here\n}",
            solutionHint: "Use <div> with className, <img> with self-closing tag, && for verified badge, .map() for skills list.",
          }
      ],
    },
    {
      slug: "components",
      title: "Components",
      order: 2,
      content: {
        overview: "Components are the fundamental building blocks of any React application. A component is a reusable self-contained piece of UI that encapsulates its own structure style and behavior.",
        problemStatement: "Building complex UIs with vanilla JavaScript results in tightly coupled hard-to-maintain code. Developers needed to break UIs into independent reusable pieces that compose together.",
        intuitionFirst: "Think of components as Lego bricks. Each brick has a specific shape and purpose. You combine them to build complex structures. Changes only affect the relevant brick.",
        realLifeAnalogy: "A car dashboard has individual components: speedometer fuel gauge navigation screen. Each is independently designed and manufactured then assembled. If the speedometer needs updating engineers replace just that component.",
        howItWorks: "React components are JavaScript functions that return JSX. When a component renders React calls the function gets the JSX tree and reconciles it with the previous virtual DOM to determine what changed.",
        beginnerExample: "function Welcome() { return <h1>Hello, React!</h1>; }\n\nfunction App() {\n  return (<div><Welcome /><Welcome /></div>);\n}",
        intermediateExample: "interface CounterProps { initialValue?: number }\n\nfunction Counter({ initialValue = 0 }: CounterProps) {\n  const [count, setCount] = useState(initialValue);\n  return (<div><h2>Count: {count}</h2><button onClick={() => setCount(c => c + 1)}>+</button></div>);\n}",
        commonMistakes: "Making components too large, not breaking UI into reusable pieces, mutating props directly, creating unnecessary wrapper components.",
        bestPractices: "Follow single responsibility principle. Keep components small. Use composition over inheritance. Name with PascalCase.",
        industryScenario: "At companies like Shopify UI component libraries contain hundreds of individually versioned components used across applications tested in Storybook.",
        interviewPerspective: "In interviews demonstrate understanding of composition controlled vs uncontrolled components and when to split or consolidate components."
      },
      quiz: [
        {
          id: "react-comp-1",
          question: "What is the primary purpose of React components?",
          options: [
              "To create reusable self-contained UI pieces",
              "To manage server-side data fetching",
              "To handle HTTP routing",
              "To write CSS styles",
          ],
          correctIndex: 0,
          explanation: "Components are reusable building blocks that encapsulate UI structure behavior and state.",
          difficulty: "easy",
        },
        {
          id: "react-comp-2",
          question: "What naming convention must React component names follow?",
          options: [
              "PascalCase",
              "camelCase",
              "kebab-case",
              "ALL_CAPS",
          ],
          correctIndex: 0,
          explanation: "Component names must start with a capital letter so JSX distinguishes them from HTML elements.",
          difficulty: "easy",
        },
        {
          id: "react-comp-3",
          question: "What happens when a component's state or props change?",
          options: [
              "React re-renders the component and its children",
              "React unmounts and remounts the component",
              "The component's CSS is reloaded",
              "The entire page is refreshed",
          ],
          correctIndex: 0,
          explanation: "React triggers a re-render then efficiently updates only the changed DOM parts.",
          difficulty: "medium",
        }
    ],
    faangQuestions: [
      {
        question: "Compare functional components with hooks vs class components. Why did React shift?",
        answer: "Hooks eliminate complex lifecycle methods enable logic reuse via custom hooks reduce boilerplate and allow better compiler optimization. The ecosystem has shifted to functional components.",
        difficulty: "medium",
        company: "Meta",
      },
      {
        question: "Explain component composition vs inheritance. Why does React favor composition?",
        answer: "Composition builds UIs by combining smaller components via children/slot props. React favors composition for flexibility avoiding the fragile base class problem and aligning with React's declarative nature.",
        difficulty: "hard",
        company: "Amazon",
      }
  ],
  codingChallenges: [
],
},
{
slug: "props",
title: "Props",
order: 3,
content: {
  overview: "Props (short for properties) pass data from a parent component to a child in React. Props are read-only and flow unidirectionally enabling components to be customizable and reusable.",
  problemStatement: "Without standardized data passing every component would need to fetch its own data. Developers needed a predictable one-way data passing mechanism.",
  intuitionFirst: "Props are like function arguments for components. Just as a function takes parameters a component takes props to render different UIs.",
  realLifeAnalogy: "Props are like a restaurant order slip. The waiter (parent) gives the order slip (props) to the chef (child). The chef reads it and prepares the dish. The chef never modifies the order slip.",
  howItWorks: "React collects JSX attributes into a props object and passes it as the first argument to the component function. React re-renders the child when the parent passes different props.",
  beginnerExample: "interface GreetingProps { name: string; age?: number }\n\nfunction Greeting({ name, age }: GreetingProps) {\n  return (<div><h1>Hello, {name}!</h1>{age && <p>Age: {age}</p>}</div>);\n}",
  intermediateExample: "interface CardProps { title: string; children: React.ReactNode; variant?: \"elevated\" | \"outlined\"; onClick?: () => void }\n\nfunction Card({ title, children, variant = \"elevated\", onClick }: CardProps) {\n  return <div className={`card ${variant}`} onClick={onClick}><h2>{title}</h2><div>{children}</div></div>;\n}",
  commonMistakes: "Mutating props directly prop drilling not using TypeScript interfaces not providing defaults for optional props using too many props on a single component.",
  bestPractices: "Define TypeScript interfaces for all props use destructuring provide sensible defaults keep props minimal use children for nested content.",
  performanceNotes: "Creating new object/function references in props on every render breaks referential equality and can cause unnecessary re-renders with React.memo.",
  comparisonTable: "| Feature | Props | State |\n|---------|-------|-------|\n| Mutability | Immutable (read-only) | Mutable via setter |\n| Ownership | Parent component | Current component |\n| Flow | Unidirectional (down) | Internal |\n| Purpose | Configure child | Manage dynamic data |"
},
quiz: [
  {
    id: "react-props-1",
    question: "Are props in React mutable or immutable?",
    options: [
        "Immutable - cannot be changed by child",
        "Mutable - child can modify them",
        "Mutable only in class components",
        "Immutable only in functional components",
    ],
    correctIndex: 0,
    explanation: "Props are immutable (read-only). A child must never modify its props.",
    difficulty: "easy",
  },
  {
    id: "react-props-2",
    question: "What pattern describes passing props through many intermediate components?",
    options: [
        "Prop drilling",
        "State lifting",
        "Props tunneling",
        "Deep propagation",
    ],
    correctIndex: 0,
    explanation: "Prop drilling passes props through intermediary components that only forward them deeper.",
    difficulty: "medium",
  },
  {
    id: "react-props-3",
    question: "How does TypeScript help with React props?",
    options: [
        "Compile-time type checking for prop values",
        "Makes props mutable",
        "Generates documentation",
        "Validates types at runtime",
    ],
    correctIndex: 0,
    explanation: "TypeScript enables compile-time type checking through interfaces catching errors before code runs.",
    difficulty: "easy",
  }
],
faangQuestions: [
{
  question: "How do you handle prop drilling in large React applications?",
  answer: "Solutions: 1) Component Composition 2) Context API 3) State Management Libraries (Redux Zustand) 4) Custom Hooks. Choose by scale: composition for small apps Context for medium libraries for large.",
  difficulty: "hard",
  company: "Meta",
},
{
  question: "What is the children prop and how does it enable composition?",
  answer: "The children prop receives content placed between component tags enabling wrapping: <Card><p>Content</p></Card>. It can be elements strings or functions fundamental for layout components and containers.",
  difficulty: "medium",
  company: "Google",
}
],
codingChallenges: [
],
},
{
slug: "state",
title: "State",
order: 4,
content: {
overview: "State represents dynamic data in a React component that changes over time. Unlike props state is internal managed using the useState hook.",
problemStatement: "Web applications are dynamic - user interactions and API responses produce changing data. Without structured state management developers resort to direct DOM manipulation.",
intuitionFirst: "State is a component's memory. Just as you remember if a light switch is on or off a component remembers its current state.",
realLifeAnalogy: "State is like a light switch. The switch has positions (on/off) - that is its state. When you flip it the state changes and the light responds.",
howItWorks: "useState returns [currentValue setterFunction]. When setter is called React schedules a re-render. On re-render useState returns the latest value.",
beginnerExample: "function Toggle() {\n  const [isOn, setIsOn] = useState(false);\n  return (<div><p>The light is {isOn ? \"ON\" : \"OFF\"}</p><button onClick={() => setIsOn(!isOn)}>Toggle</button></div>);\n}",
intermediateExample: "function TodoList() {\n  const [todos, setTodos] = useState<Todo[]>([]);\n  return (<div><input /><button onClick={() => setTodos(prev => [...prev, { id: crypto.randomUUID(), text: input, completed: false }])}>Add</button></div>);\n}",
commonMistakes: "Mutating state directly not using functional updater when depending on previous state storing derived data in state.",
bestPractices: "Treat state as immutable. Use functional updater when new value depends on previous. Keep state minimal compute derived values during render.",
performanceNotes: "Large state updates can cause performance issues. Split state into multiple useState calls so components only re-render when their relevant slice changes.",
comparisonTable: "| Aspect | useState | useReducer |\n|--------|----------|------------|\n| Complexity | Simple values | Complex state logic |\n| State shape | Primitive/simple object | Complex object with fields |\n| Updates | Direct value/function | Action-based dispatch |\n| Use case | Toggles counters | Forms state machines |"
},
quiz: [
{
id: "react-state-1",
question: "What does the useState hook return?",
options: [
  "Array with current state and setter",
  "Object with getState/setState",
  "Current state only",
  "A promise",
],
correctIndex: 0,
explanation: "useState returns [currentValue setterFunction].",
difficulty: "easy",
},
{
id: "react-state-2",
question: "What happens if you mutate state directly?",
options: [
  "React won't detect the change",
  "React re-renders correctly",
  "JavaScript throws error",
  "State becomes immutable",
],
correctIndex: 0,
explanation: "React relies on the setter to detect changes. Direct mutation bypasses detection.",
difficulty: "medium",
},
{
id: "react-state-3",
question: "When should you use the functional updater form?",
options: [
  "When new state depends on previous",
  "When updating objects",
  "When state is boolean",
  "Only with TypeScript",
],
correctIndex: 0,
explanation: "The functional updater is essential when new state depends on previous because React batches updates.",
difficulty: "hard",
}
],
faangQuestions: [
{
question: "Explain React's batching of state updates. How did it change from React 17 to 18?",
answer: "React 17 batched only inside event handlers. React 18 introduced automatic batching for all contexts (setTimeout Promises). Use flushSync to opt out.",
difficulty: "hard",
company: "Meta",
},
{
question: "What is state colocation and why is it important?",
answer: "State colocation means placing state as close as possible to where it is used. Benefits: less prop drilling better reusability improved performance easier reasoning.",
difficulty: "medium",
company: "Google",
}
],
codingChallenges: [
],
},
],
},
{
slug: "hooks",
title: "Hooks",
description: "Master React Hooks - the foundation for state side effects refs memoization context and complex state logic",
order: 2,
subtopics: [
{
slug: "usestate",
title: "useState",
order: 1,
content: {
overview: "useState is the most fundamental React hook allowing functional components to manage local state with a reactive variable and setter.",
problemStatement: "Before hooks functional components were stateless. Developers had to rewrite components as classes introducing complexity.",
intuitionFirst: "useState gives a function component a memory box. You put a value in React remembers it between renders.",
realLifeAnalogy: "useState is like a scoreboard. The scoreboard displays the current score. The operator presses a button to update the score.",
howItWorks: "useState call initializes state on first render. React stores state in a linked list of hooks. On re-render useState returns the persisted value.",
beginnerExample: "function Counter() {\n  const [count, setCount] = useState(0);\n  return (<div><p>Clicked {count} times</p><button onClick={() => setCount(c => c + 1)}>Click</button></div>);\n}",
intermediateExample: "function Preferences() {\n  const [prefs, setPrefs] = useState({ theme: \"light\", fontSize: 14 });\n  return <select value={prefs.theme} onChange={e => setPrefs(prev => ({ ...prev, theme: e.target.value }))}><option value=\"light\">Light</option></select>;\n}",
commonMistakes: "Calling setter in render body (infinite loop), not using functional updater when depending on previous state, mutating arrays/objects.",
bestPractices: "Use lazy initializer for expensive computations: useState(() => compute()). Use functional updater when dependent on previous. Split independent values into separate useState calls.",
performanceNotes: "State updates are batched in React 18. useState uses Object.is comparison to bail out of re-renders when value unchanged."
},
quiz: [
{
id: "react-useState-1",
question: "What is the initial value parameter to useState used for?",
options: [
"Sets value on first render only",
"Resets value on every render",
"Validates state type",
"Defines max value",
],
correctIndex: 0,
explanation: "The initial value is only used during the initial render.",
difficulty: "easy",
},
{
id: "react-useState-2",
question: "Which correctly updates an object property without losing other properties?",
options: [
"setState(prev => ({ ...prev, key: newValue }))",
"setState({ key: newValue })",
"Object.assign(prev, { key: newValue })",
"state.key = newValue; setState(state)",
],
correctIndex: 0,
explanation: "Spread operator copies previous state then overrides specific key.",
difficulty: "medium",
},
{
id: "react-useState-3",
question: "What does lazy initializer useState(() => expensive()) achieve?",
options: [
"Runs only on initial render",
"Delays until setter called",
"Runs async",
"Memoizes indefinitely",
],
correctIndex: 1,
explanation: "The lazy initializer runs once on initial render only. Subsequent renders skip it.",
difficulty: "hard",
}
],
faangQuestions: [
{
question: "How does React match useState calls to state variables on re-render?",
answer: "React maintains a linked list of hooks per fiber node. Each call is assigned an index based on order. On re-render React reads in the same order. Hooks must be called unconditionally at the top level.",
difficulty: "hard",
company: "Meta",
},
{
question: "How does state batching work in React 18 vs 17?",
answer: "React 18 batches all updates automatically regardless of context. React 17 batched only in event handlers. Use flushSync for synchronous updates.",
difficulty: "hard",
company: "Google",
}
],
codingChallenges: [
{
title: "Build a Multi-Step Form with useState",
description: "Create a 3-step registration form tracking step and data with useState. Implement next/previous navigation and field validation.",
difficulty: "medium",
starterCode: "interface FormData { name: string; email: string; username: string; password: string }\n\nfunction MultiStepForm() {\n  const [step, setStep] = useState(1);\n  const [formData, setFormData] = useState<FormData>({ name: \"\", email: \"\", username: \"\", password: \"\" });\n}",
solutionHint: "Use step-based conditional rendering, spread for partial updates, validate before advancing.",
}
],
},
{
slug: "useeffect",
title: "useEffect",
order: 2,
content: {
overview: "useEffect lets you perform side effects in functional components - data fetching subscriptions DOM manipulation timers and logging.",
problemStatement: "Class components scattered related logic across lifecycle methods. Developers needed a unified way to handle side effects co-locating setup and cleanup.",
intuitionFirst: "useEffect synchronizes your component with external systems. It is the bridge between your component and the outside world.",
realLifeAnalogy: "useEffect is like hotel room service. Check in (mount) request towels (setup). Preferences change (update) request different pillows. Check out (unmount) cancel requests (cleanup).",
howItWorks: "useEffect takes a callback and dependency array. After every render React checks if any dependency changed. Runs cleanup then the new effect.",
beginnerExample: "function PageTitle() {\n  const [count, setCount] = useState(0);\n  useEffect(() => { document.title = `Count: ${count}`; }, [count]);\n  return <button onClick={() => setCount(c => c + 1)}>Click</button>;\n}",
intermediateExample: "function UserProfile({ userId }: { userId: string }) {\n  const [user, setUser] = useState<User | null>(null);\n  useEffect(() => {\n    let cancelled = false;\n    fetch(`/api/users/${userId}`).then(r => r.json()).then(d => { if (!cancelled) setUser(d); });\n    return () => { cancelled = true; };\n  }, [userId]);\n  return user ? <Profile user={user} /> : <Loading />;\n}",
commonMistakes: "Forgetting dependency array (infinite loops), missing dependencies (stale closures), not providing cleanup (memory leaks), using for derived state.",
bestPractices: "Specify all reactive values as dependencies. Return cleanup for subscriptions/timers. Separate unrelated concerns into multiple useEffect calls.",
performanceNotes: "Effects run after paint so they should not block visual updates. For heavy computations use useMemo or Web Workers.",
comparisonTable: "| Aspect | useEffect | useLayoutEffect |\n|--------|-----------|----------------|\n| Timing | After paint (async) | Before paint (sync) |\n| Use case | Data fetching subscriptions | DOM measurements |\n| Recommendation | Default choice | Only when useEffect causes flicker |"
},
quiz: [
{
id: "react-useEffect-1",
question: "What does the dependency array in useEffect control?",
options: [
"When the effect re-runs",
"What data the effect accesses",
"The return value",
"Execution order",
],
correctIndex: 0,
explanation: "Dependency array tells React when to re-run the effect.",
difficulty: "easy",
},
{
id: "react-useEffect-2",
question: "When does the cleanup function from useEffect run?",
options: [
"Before unmount and before re-running effect",
"Only on unmount",
"Only before re-running",
"After every render",
],
correctIndex: 0,
explanation: "Cleanup runs when unmounting and before re-running the effect.",
difficulty: "medium",
},
{
id: "react-useEffect-3",
question: "What is a stale closure in useEffect?",
options: [
"Effect captures outdated variable from previous render",
"Effect runs too slowly",
"Too many dependencies",
"Component unmounts before completion",
],
correctIndex: 0,
explanation: "A stale closure occurs when an effect captures a variable from a specific render that is not in the dependency array.",
difficulty: "hard",
}
],
faangQuestions: [
{
question: "How does useEffect replace componentDidMount componentDidUpdate and componentWillUnmount?",
answer: "useEffect with [] acts like componentDidMount. With dependencies [dep] acts like componentDidMount + componentDidUpdate. Cleanup acts like componentWillUnmount. Multiple useEffect calls separate concerns.",
difficulty: "hard",
company: "Meta",
},
{
question: "How do you handle race conditions in useEffect data fetching?",
answer: "Use cancelled flag: let cancelled = false; fetch().then(data => { if (!cancelled) setData(data); }); return () => cancelled = true. Or use AbortController.",
difficulty: "hard",
company: "Google",
}
],
codingChallenges: [
],
},
{
slug: "useref",
title: "useRef",
order: 3,
content: {
overview: "useRef provides a mutable container persisting across renders without causing re-renders. Used for DOM access storing mutable values and holding references.",
problemStatement: "Some scenarios require imperative DOM access or persisting values without triggering re-renders. useState causes re-renders on update which is undesirable for interval IDs.",
intuitionFirst: "useRef is like a drawer. You put anything in it change contents without alerting anyone (no re-render). Unlike useState which announces changes.",
realLifeAnalogy: "useRef is like a bookmark. Place it at a specific page (DOM element) and return to that spot. The bookmark does not change the book (no re-render).",
howItWorks: "useRef returns { current: initialValue }. Same reference on every render. Changing .current does not trigger re-render. React sets .current on mount and clears on unmount.",
beginnerExample: "function AutoFocusInput() {\n  const inputRef = useRef<HTMLInputElement>(null);\n  useEffect(() => { inputRef.current?.focus(); }, []);\n  return <input ref={inputRef} type=\"text\" />;\n}",
intermediateExample: "function Stopwatch() {\n  const [time, setTime] = useState(0);\n  const intervalRef = useRef<number | null>(null);\n  function start() { intervalRef.current = window.setInterval(() => setTime(t => t + 1), 1000); }\n  function stop() { if (intervalRef.current !== null) { clearInterval(intervalRef.current); intervalRef.current = null; } }\n  return <div><p>{time}s</p><button onClick={start}>Start</button><button onClick={stop}>Stop</button></div>;\n}",
commonMistakes: "Using refs for values that should trigger UI updates (use useState), reading/writing refs during render, overusing refs for DOM manipulation.",
bestPractices: "Use refs for DOM access storing interval IDs library instances. Do not read/write refs during rendering - do it in event handlers or effects.",
performanceNotes: "useRef is efficient because updating .current does not trigger re-renders. Use for frequently changing values without performance issues."
},
quiz: [
{
id: "react-useRef-1",
question: "Does updating useRef.current trigger a re-render?",
options: [
"No ref updates are silent",
"Yes every update causes re-render",
"Only if attached to DOM element",
"Only in development",
],
correctIndex: 0,
explanation: "Changing useRef.current does not trigger re-renders. Key difference from useState.",
difficulty: "easy",
},
{
id: "react-useRef-2",
question: "What is the primary DOM use case for useRef?",
options: [
"Imperative access to DOM nodes",
"Binding event listeners",
"Styling elements",
"Fetching data",
],
correctIndex: 0,
explanation: "Primary use is imperative DOM access - focusing measuring and integrating with animation libraries.",
difficulty: "easy",
},
{
id: "react-useRef-3",
question: "What is forwardRef used for?",
options: [
"Pass ref from parent to child functional component",
"Create ref across renders",
"Forward state to parent",
"Optimize ref performance",
],
correctIndex: 0,
explanation: "forwardRef allows functional components to receive a ref from parent and forward to internal DOM element.",
difficulty: "medium",
}
],
faangQuestions: [
{
question: "Compare useRef and useState for persisting values across renders.",
answer: "useRef changes do NOT trigger re-renders; useState changes DO. Choose useState for UI-affecting values. Choose useRef for values needing persistence without UI updates.",
difficulty: "medium",
company: "Meta",
},
{
question: "How does ref forwarding (forwardRef) work?",
answer: "forwardRef creates components receiving a ref from parents and forwarding to a DOM child. Applications: reusable form inputs needing parent-controlled focus component libraries needing internal DOM access.",
difficulty: "hard",
company: "Google",
}
],
codingChallenges: [
],
},
{
slug: "usememo",
title: "useMemo",
order: 4,
content: {
overview: "useMemo memoizes the result of an expensive computation recalculating only when dependencies change. It prevents unnecessary recalculations on every render.",
problemStatement: "React re-renders when state/props change. Expensive computations (sorting filtering math) run on every re-render even if inputs unchanged causing sluggish performance.",
intuitionFirst: "useMemo is like a cache. Call a slow function with same inputs it returns cached result instead of recalculating.",
realLifeAnalogy: "useMemo is like meal prepping. Cook once (expensive) store meals in fridge (cache). Reheat (use cached) instead of cooking from scratch every time.",
howItWorks: "useMemo takes a function and dependency array. On initial render calls function and caches result. On subsequent renders if dependencies unchanged returns cached value.",
beginnerExample: "function ExpensiveList({ numbers, filter }: { numbers: number[]; filter: string }) {\n  const filtered = useMemo(() => numbers.filter(n => n.toString().includes(filter)), [numbers, filter]);\n  return <ul>{filtered.map(n => <li key={n}>{n}</li>)}</ul>;\n}",
intermediateExample: "function TransactionSummary({ transactions }: { transactions: Transaction[] }) {\n  const summary = useMemo(() => ({\n    total: transactions.reduce((s, t) => s + t.amount, 0),\n    count: transactions.length,\n  }), [transactions]);\n  return <p>Total: ${summary.total} ({summary.count} items)</p>;\n}",
commonMistakes: "Using useMemo for trivial computations (overhead > benefit), not including all dependencies, using as semantic guarantee (React may clear cache).",
bestPractices: "Only use for expensive computations that impact performance. Profile first. Include all dependencies. Never rely on useMemo for correctness.",
performanceNotes: "useMemo has overhead. For cheap computations recomputing is faster. React may clear cache under memory pressure."
},
quiz: [
{
id: "react-useMemo-1",
question: "What does useMemo return?",
options: [
"A memoized value",
"A memoized callback",
"A memoized component",
"A memoized effect",
],
correctIndex: 0,
explanation: "useMemo returns the memoized result of calling the function passed to it.",
difficulty: "easy",
},
{
id: "react-useMemo-2",
question: "When should you avoid useMemo?",
options: [
"For cheap computations where overhead exceeds recompute cost",
"For expensive array sorting",
"For filtering large datasets",
"For complex transformations",
],
correctIndex: 0,
explanation: "useMemo adds overhead. For simple computations recomputing is faster.",
difficulty: "medium",
},
{
id: "react-useMemo-3",
question: "Is useMemo a semantic guarantee?",
options: [
"No React may clear cache under memory pressure",
"Yes guarantees no recomputation",
"Only in production",
"Only for primitives",
],
correctIndex: 0,
explanation: "React may discard memoized values to free memory. Optimization not guarantee.",
difficulty: "hard",
}
],
faangQuestions: [
{
question: "Compare useMemo and useCallback. When would you use each?",
answer: "useMemo memoizes a value; useCallback memoizes a function. useCallback(fn deps) is equivalent to useMemo(() => fn deps). useCallback prevents function reference changes for React.memo and useEffect deps.",
difficulty: "medium",
company: "Meta",
},
{
question: "How do React.memo useMemo and useCallback work together?",
answer: "React.memo prevents re-render if props unchanged via shallow comparison. useCallback/useMemo provide stable references for function/object props that React.memo compares. Without them inline functions break memoization.",
difficulty: "hard",
company: "Google",
}
],
codingChallenges: [
],
},
{
slug: "usecallback",
title: "useCallback",
order: 5,
content: {
overview: "useCallback returns a memoized callback that only changes if dependencies changed. It prevents unnecessary child re-renders by maintaining stable function references.",
problemStatement: "When parent re-renders inline functions are recreated as new references. Passed to memoized children the child always sees a new prop and cannot skip re-rendering.",
intuitionFirst: "useCallback is like assigning a permanent phone number to a callback. No matter how many re-renders the callback keeps the same identity.",
realLifeAnalogy: "useCallback is like a dedicated parking spot. The spot stays in the same location after you drive around (re-render). Without it you park randomly (new reference).",
howItWorks: "useCallback(fn deps) stores the function. If dependencies unchanged returns previously stored reference. If changed stores and returns new function.",
beginnerExample: "function Parent() {\n  const [count, setCount] = useState(0);\n  const increment = useCallback(() => setCount(c => c + 1), []);\n  return <ExpensiveChild onAction={increment} />;\n}\nconst ExpensiveChild = React.memo(function Child({ onAction }: { onAction: () => void }) {\n  return <button onClick={onAction}>Increment</button>;\n});",
commonMistakes: "Wrapping every function unnecessarily (dependency comparison has cost), using without React.memo on child (optimization wasted), missing dependencies causing stale closures.",
bestPractices: "Only use when passing functions to memoized children or when function is an effect dependency. Include all referenced values in dependency array.",
performanceNotes: "useCallback has cost: dependency comparison on every render. For simple structures without React.memo inline functions are fine."
},
quiz: [
{
id: "react-useCallback-1",
question: "What does useCallback return?",
options: [
"A memoized function reference",
"A memoized value",
"A new function every render",
"The function result",
],
correctIndex: 0,
explanation: "useCallback returns the same function object as long as dependencies have not changed.",
difficulty: "easy",
},
{
id: "react-useCallback-2",
question: "When is useCallback useless as optimization?",
options: [
"When child is not wrapped in React.memo",
"When callback has no dependencies",
"With TypeScript",
"When parent re-renders frequently",
],
correctIndex: 0,
explanation: "useCallback only benefits when function is passed to React.memo child.",
difficulty: "medium",
},
{
id: "react-useCallback-3",
question: "What is useCallback(fn deps) equivalent to?",
options: [
"useMemo(() => fn deps)",
"useMemo(() => fn() deps)",
"useMemo(fn deps)",
"useMemo(fn() deps)",
],
correctIndex: 0,
explanation: "useCallback is syntactic sugar for useMemo(() => fn deps).",
difficulty: "hard",
}
],
faangQuestions: [
{
question: "Explain referential equality and why it matters for React performance.",
answer: "React.memo uses shallow prop comparison checking if each prop is referentially equal. Inline functions create new references every render so React.memo always sees changes. useCallback/useMemo preserve references across renders.",
difficulty: "medium",
company: "Meta",
},
{
question: "How does the React Compiler aim to eliminate manual memoization?",
answer: "The React Compiler automates memoization via static analysis automatically inserting useMemo useCallback and React.memo where appropriate eliminating manual optimization and reducing stale closure risks.",
difficulty: "hard",
company: "Meta",
}
],
codingChallenges: [
],
},
{
slug: "usecontext",
title: "useContext",
order: 6,
content: {
overview: "useContext reads and subscribes to context in your components. Context passes data through the tree without prop drilling using Provider and Consumer pattern.",
problemStatement: "Deeply nested components need shared data (auth theme locale). Passing via props through every level creates verbose hard-to-maintain code.",
intuitionFirst: "Context is like a community bulletin board. Post information on a central board (Provider) and anyone interested reads it (useContext) without involving intermediaries.",
realLifeAnalogy: "Context is like a radio broadcast. Station (Provider) broadcasts a signal. Anyone with a radio (consumer) tuned in receives it regardless of walls (intermediate components).",
howItWorks: "createContext returns Context with Provider. Provider wraps subtree with value prop. useContext reads value. When value changes all consumers re-render bypassing intermediate components.",
beginnerExample: "const Theme = createContext(\"light\");\n\nfunction App() {\n  const [theme, setTheme] = useState(\"light\");\n  return (<Theme.Provider value={theme}><ThemedButton /></Theme.Provider>);\n}\nfunction ThemedButton() {\n  const theme = useContext(Theme);\n  return <div style={{ background: theme === \"dark\" ? \"#333\" : \"#fff\" }}>Themed</div>;\n}",
intermediateExample: "const AuthContext = createContext<AuthContextType | null>(null);\n\nfunction AuthProvider({ children }: { children: ReactNode }) {\n  const [user, setUser] = useState<User | null>(null);\n  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;\n}\nfunction useAuth() {\n  const ctx = useContext(AuthContext);\n  if (!ctx) throw new Error(\"useAuth must be used within AuthProvider\");\n  return ctx;\n}",
commonMistakes: "Overusing context for everything not memoizing value objects nesting too many providers using context for frequently updating data.",
bestPractices: "Use for truly global data (theme auth locale). Custom wrapper hooks for TypeScript safety. UseMemo for context value. Split into separate contexts.",
performanceNotes: "All consumers re-render on value change. Mitigate by splitting contexts memoizing value and memoizing consumers.",
comparisonTable: "| Feature | Context API | Prop Drilling | Redux |\n|---------|-------------|---------------|-------|\n| Setup | Minimal | None | Significant |\n| All consumers re-render | Yes | No | Selective |\n| Best for | Medium apps global data | Small apps | Large apps |"
},
quiz: [
{
id: "react-useContext-1",
question: "What problem does React Context solve?",
options: [
"Prop drilling",
"State management",
"Component styling",
"API integration",
],
correctIndex: 0,
explanation: "Context solves prop drilling - passing props through many intermediate components.",
difficulty: "easy",
},
{
id: "react-useContext-2",
question: "What happens to consumers when Provider value changes?",
options: [
"All consumers re-render",
"Only closest consumer re-renders",
"Only Provider re-renders",
"Nothing re-renders",
],
correctIndex: 0,
explanation: "Every component using useContext re-renders when Provider value changes.",
difficulty: "medium",
},
{
id: "react-useContext-3",
question: "Recommended pattern for useContext with TypeScript?",
options: [
"Custom hook that throws if context null",
"Always provide default value",
"Use global variable",
"Check in every component",
],
correctIndex: 0,
explanation: "Custom hook wrapping useContext with null check provides best developer experience.",
difficulty: "hard",
}
],
faangQuestions: [
{
question: "Performance implications of Context API and mitigations?",
answer: "All consumers re-render on change. Mitigations: 1) Split contexts 2) Memoize value with useMemo 3) Memoize consumers with React.memo 4) Use Zustand for high-frequency updates.",
difficulty: "hard",
company: "Meta",
},
{
question: "Compare Context API with component composition.",
answer: "Composition passes components as children avoiding re-render issues with explicit data flow. Context is convenient for truly global data. Use composition for specific descendants context for global concerns.",
difficulty: "hard",
company: "Google",
}
],
codingChallenges: [
],
},
{
slug: "usereducer",
title: "useReducer",
order: 7,
content: {
overview: "useReducer manages complex state through a reducer function and actions. Centralizes state transitions in a pure function making updates predictable and testable.",
problemStatement: "As components grow state logic becomes complex with multiple related variables. Scattered useState calls make logic hard to maintain. Need to centralize transitions.",
intuitionFirst: "useReducer is like a bank transaction. Every change goes through a teller (reducer) with a transaction type (action). Balance (state) changes predictably.",
realLifeAnalogy: "useReducer is like a vending machine. Insert money and press buttons (dispatch actions). Internal logic (reducer) decides what to dispense. You send actions not directly access inventory.",
howItWorks: "useReducer takes (reducer initial) returns [state dispatch]. Dispatch sends action to reducer which returns new state. Reducer must be pure - no side effects.",
beginnerExample: "type Action = { type: \"INCREMENT\" } | { type: \"DECREMENT\" };\nfunction reducer(state: number, action: Action): number {\n  switch (action.type) {\n    case \"INCREMENT\": return state + 1;\n    case \"DECREMENT\": return state - 1;\n  }\n}\nfunction Counter() {\n  const [count, dispatch] = useReducer(reducer, 0);\n  return <button onClick={() => dispatch({ type: \"INCREMENT\" })}>{count}</button>;\n}",
commonMistakes: "Mutating state in reducer (must return new objects), putting side effects (must be pure), not using TypeScript discriminated unions for actions.",
bestPractices: "Use TypeScript discriminated unions for action types. Keep reducers pure. Extract to separate file for testing. Use useReducer + Context for complex shared state.",
comparisonTable: "| Aspect | useState | useReducer |\n|--------|----------|------------|\n| Best for | Simple values | Complex state objects |\n| Updates | Direct/functional | Action dispatches |\n| Testability | Harder | Easy (pure reducer) |\n| Boilerplate | Minimal | More verbose but explicit |"
},
quiz: [
{
id: "react-useReducer-1",
question: "What must a reducer function always be?",
options: [
"Pure function with no side effects",
"Async function",
"Mutates state directly",
"Returns JSX",
],
correctIndex: 0,
explanation: "A reducer must be pure - same inputs always same output. No API calls or random values.",
difficulty: "easy",
},
{
id: "react-useReducer-2",
question: "How does useReducer differ from useState for complex state?",
options: [
"Centralizes transitions in one function",
"Always faster than useState",
"Supports async natively",
"Persists to localStorage",
],
correctIndex: 0,
explanation: "useReducer centralizes all state transitions in one function making logic explicit and testable.",
difficulty: "medium",
},
{
id: "react-useReducer-3",
question: "Recommended TypeScript typing for actions?",
options: [
"Discriminated unions with type property",
"String literal types",
"Generic action interface",
"Enum-based types",
],
correctIndex: 0,
explanation: "Discriminated unions provide type safety by narrowing action type in each switch case.",
difficulty: "hard",
}
],
faangQuestions: [
{
question: "Explain useReducer + Context pattern (Redux-lite). How does it compare to actual Redux?",
answer: "Combines useReducer for state logic and Context for sharing. Pros: zero dependencies simple setup. Cons: no DevTools no middleware all consumers re-render on any change. Good for medium apps.",
difficulty: "hard",
company: "Meta",
},
{
question: "How do you handle async operations with useReducer?",
answer: "Dispatch multiple actions at stages: FETCH_START before async FETCH_SUCCESS/FAILURE after. Reducer stays pure. Async logic in custom hook or component.",
difficulty: "hard",
company: "Google",
}
],
codingChallenges: [
],
},
],
},
{
slug: "routing",
title: "Routing",
description: "Learn client-side routing with React Router - setup dynamic routes and nested routing patterns",
order: 3,
subtopics: [
{
slug: "react-router",
title: "React Router",
order: 1,
content: {
overview: "React Router is the standard library for client-side routing in React enabling navigation between views without full page reloads.",
problemStatement: "Traditional multi-page websites reload the entire page on every navigation. SPAs need routing that updates URL manages history and renders components without server requests.",
intuitionFirst: "React Router is like a GPS for your app. The URL is your address. When navigating the GPS guides you smoothly (renders new components) without restarting the car (reloading).",
realLifeAnalogy: "Think of React Router like a hotel key card system. Your room number (URL) determines which room you access. The front desk (router) directs you to the correct room (component).",
howItWorks: "React Router uses the History API (pushState popstate) for URL changes without reloads. Router listens for URL changes and renders matching Route components. Link provides navigation.",
beginnerExample: "import { BrowserRouter, Routes, Route, Link } from \"react-router-dom\";\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <nav><Link to=\"/\">Home</Link><Link to=\"/about\">About</Link></nav>\n      <Routes>\n        <Route path=\"/\" element={<Home />} />\n        <Route path=\"/about\" element={<About />} />\n        <Route path=\"*\" element={<NotFound />} />\n      </Routes>\n    </BrowserRouter>\n  );\n}",
commonMistakes: "Forgetting BrowserRouter using <a href> instead of <Link> not handling 404 routes placing routes outside Router context.",
bestPractices: "Use Link and NavLink for navigation. Organize routes centrally. Use layouts with Outlet. Lazy load with React.lazy. Handle 404s with catch-all.",
performanceNotes: "Bundle splitting at route level: const Dashboard = React.lazy(() => import(\"./Dashboard\")). Combined with Suspense users only download visited page code."
},
quiz: [
{
id: "react-router-1",
question: "Which component replaces <a href> for client-side navigation?",
options: [
"<Link>",
"<Nav>",
"<Redirect>",
"<Anchor>",
],
correctIndex: 0,
explanation: "<Link> prevents full page reloads using the History API.",
difficulty: "easy",
},
{
id: "react-router-2",
question: "Purpose of <Outlet> in React Router?",
options: [
"Renders matched child route in layouts",
"Redirects to home",
"Handles 404 errors",
"Shows loading spinners",
],
correctIndex: 0,
explanation: "<Outlet> is placeholder where child route content appears in layout routes.",
difficulty: "medium",
},
{
id: "react-router-3",
question: "How does React Router prevent full page reloads?",
options: [
"Uses History API",
"Intercepts all clicks",
"Uses iframes",
"AJAX body replacement",
],
correctIndex: 0,
explanation: "React Router uses the History API to update URLs without page reloads.",
difficulty: "medium",
}
],
faangQuestions: [
{
question: "Compare BrowserRouter and HashRouter.",
answer: "BrowserRouter uses History API for clean URLs needs server config. HashRouter uses #/path needs no server config. Use BrowserRouter when you control the server HashRouter for static hosting.",
difficulty: "hard",
company: "Google",
},
{
question: "How does React Router handle lazy loading with code splitting?",
answer: "Use React.lazy with Suspense: const Dashboard = React.lazy(() => import(\"./pages/Dashboard\")); then <Route path=\"dashboard\" element={<Suspense><Dashboard /></Suspense>} />. Each page becomes separate chunk.",
difficulty: "hard",
company: "Meta",
}
],
codingChallenges: [
{
title: "Build a Multi-Page App with React Router",
description: "Create a React app with 4 pages: Home Products ProductDetail (dynamic :id) About. Include NavLink navigation layout with Outlet 404 catch-all and React.lazy code-splitting.",
difficulty: "medium",
starterCode: "function Layout() {\n  return (\n    <div>\n      <header>Navigation</header>\n      <main>{/* Outlet */}</main>\n      <footer>Footer</footer>\n    </div>\n  );\n}",
solutionHint: "Use BrowserRouter Routes with layout route containing Outlet. Add index dynamic :id and catch-all *. Use NavLink className callback for active styling.",
}
],
},
{
slug: "dynamic-routes",
title: "Dynamic Routes",
order: 2,
content: {
overview: "Dynamic routes use URL parameters (:param) to match variable patterns enabling pages like /users/123 from a single route definition.",
problemStatement: "Real apps have variable content - profiles products posts. Creating separate routes per item is impossible. Need route patterns with variable segments.",
intuitionFirst: "Dynamic routes are like mailboxes with name slots. The mailbox pattern (/users/:id) is the same but the name card changes for each recipient.",
howItWorks: "Route paths include :param segments extracted via useParams. Parameters are strings used for data fetching. Optional params use ? suffix.",
beginnerExample: "function UserProfile() {\n  const { userId } = useParams<{ userId: string }>();\n  useEffect(() => { fetch(`/api/users/${userId}`).then(r => r.json()).then(setUser); }, [userId]);\n  return user ? <h1>{user.name}</h1> : <Loading />;\n}\n// Route: <Route path=\"users/:userId\" element={<UserProfile />} />",
commonMistakes: "Not handling loading state forgetting useParams returns strings not handling undefined parameters.",
bestPractices: "Handle loading/error states. Validate params exist before use. Use useSearchParams for query parameters alongside dynamic params."
},
quiz: [
{
id: "react-dyn-1",
question: "Which hook extracts URL parameters?",
options: [
"useParams",
"useRouteMatch",
"useLocation",
"useSearchParams",
],
correctIndex: 0,
explanation: "useParams returns key-value pairs from URL dynamic segments.",
difficulty: "easy",
},
{
id: "react-dyn-2",
question: "What type do URL parameters always return?",
options: [
"Strings",
"Numbers",
"Strings or numbers",
"Any",
],
correctIndex: 0,
explanation: "URL parameters are always strings from the URL. Convert with Number() if needed.",
difficulty: "medium",
},
{
id: "react-dyn-3",
question: "How to make a route segment optional in React Router v6?",
options: [
"Add ? suffix (:param?)",
"Define two routes",
"Use default value",
"Not supported",
],
correctIndex: 0,
explanation: "React Router v6 supports optional segments with ? suffix. Use sparingly.",
difficulty: "hard",
}
],
faangQuestions: [
{
question: "How to implement nested dynamic routes without refetching parent data?",
answer: "Use separate query keys for parent and child data. Parent key excludes child params so navigating children keeps parent data cached. Layout routes keep parent mounted.",
difficulty: "hard",
company: "Meta",
},
{
question: "Explain handling search parameters alongside dynamic route parameters.",
answer: "Dynamic params define resource identity (/users/123). Search params define view state (sort filter). useParams for route params useSearchParams for query strings.",
difficulty: "medium",
company: "Google",
}
],
codingChallenges: [
],
},
{
slug: "nested-routes",
title: "Nested Routes",
order: 3,
content: {
overview: "Nested routes compose routes within routes creating persistent layouts that stay mounted across child route changes. Parent renders shared UI while Outlet renders matched child.",
problemStatement: "Many apps have persistent UI (sidebars tabs navigation) that should stay visible while content changes. Without nested routes each page re-renders the entire layout.",
intuitionFirst: "Nested routes are like matryoshka dolls. Outer layer (parent) is shell - header sidebar. Inner doll (child) is specific content. Swap inner doll without changing shell.",
howItWorks: "Parent routes include Outlet where child routes render. React Router matches URL hierarchy. When child matches parent renders layout with Outlet replaced by child element.",
beginnerExample: "function DashboardLayout() {\n  return (\n    <div>\n      <aside><NavLink to=\"overview\">Overview</NavLink></aside>\n      <main><Outlet /></main>\n    </div>\n  );\n}\n// <Route path=\"dashboard\" element={<DashboardLayout />}>\n//   <Route index element={<Overview />} />\n//   <Route path=\"analytics\" element={<Analytics />} />\n// </Route>",
commonMistakes: "Forgetting Outlet in parent (nothing renders) placing Routes inside children not using index routes deeply nesting unnecessarily.",
bestPractices: "Use index routes for default content. Keep nesting 2-3 levels. Use layout routes for persistent UI. Extract route config into centralized file.",
performanceNotes: "Nested routes keep parents mounted when children change preserving state and avoiding layout re-renders."
},
quiz: [
{
id: "react-nest-1",
question: "What component renders matched child route in parent layout?",
options: [
"<Outlet />",
"<Children />",
"<Content />",
"<Render />",
],
correctIndex: 0,
explanation: "<Outlet /> is the placeholder where child route content appears in parent layout.",
difficulty: "easy",
},
{
id: "react-nest-2",
question: "What does an index route represent?",
options: [
"Default child when parent path matches exactly",
"Catch-all for 404s",
"First route defined",
"Any child path",
],
correctIndex: 0,
explanation: "Index route provides default content for parent path without extra path segment.",
difficulty: "medium",
},
{
id: "react-nest-3",
question: "What happens to parent state when navigating between child routes?",
options: [
"Parent stays mounted with preserved state",
"Parent unmounts and remounts",
"Parent loses state",
"Depends on browser",
],
correctIndex: 0,
explanation: "Parent components stay mounted preserving state when navigating between child routes.",
difficulty: "medium",
}
],
faangQuestions: [
{
question: "How would you implement breadcrumbs from nested route hierarchy?",
answer: "Use useLocation to get pathname. React Router v6.4+ supports route handle properties for breadcrumb labels. useMatches() reads route handles and renders the trail.",
difficulty: "hard",
company: "Shopify",
},
{
question: "Compare React Router nested routes with manual layout composition.",
answer: "Router-level nesting provides: 1) Layouts persist preserving state 2) URL maps to component hierarchy 3) Adding pages only requires route config changes 4) Error boundaries at each route level.",
difficulty: "hard",
company: "Meta",
}
],
codingChallenges: [
],
},
],
},
{
slug: "state-management",
title: "State Management",
description: "Explore state management solutions - Context API Redux Toolkit and Zustand for different application scales",
order: 4,
subtopics: [
{
slug: "context-api",
title: "Context API",
order: 1,
content: {
overview: "Context API is React's built-in state management for sharing data across the tree without prop drilling using createContext Provider and useContext.",
problemStatement: "Data (auth theme locale) needs access by many components at different depths. Pass via props creates deeply nested prop chains with intermediary components carrying unused data.",
intuitionFirst: "Context is like a radio station broadcasting a signal. Station (Provider) transmits over frequency. Radio (consumer) tuned in receives broadcast regardless of walls.",
realLifeAnalogy: "Context is like electrical wiring. Instead of plugging each appliance directly into the power plant (prop drilling) power goes through grid (Provider) and any outlet (useContext) accesses it.",
howItWorks: "createContext returns { Provider Consumer }. Provider wraps subtree with value prop. When value changes all useContext consumers re-render. Bypasses intermediate components.",
beginnerExample: "const Theme = createContext(\"light\");\n\nfunction App() {\n  const [theme, setTheme] = useState(\"light\");\n  return (<Theme.Provider value={{ theme, toggle: () => setTheme(t => t === \"light\" ? \"dark\" : \"light\") }}><ThemedButton /></Theme.Provider>);\n}\nfunction ThemedButton() {\n  const { theme, toggle } = useContext(Theme);\n  return <button onClick={toggle} style={{ background: theme === \"dark\" ? \"#333\" : \"#fff\" }}>Toggle</button>;\n}",
commonMistakes: "Overusing context not memoizing value objects nesting too many providers using for frequently updating data.",
bestPractices: "Use for truly global data. Custom hooks for TypeScript safety. UseMemo for value. Split into separate contexts.",
performanceNotes: "All consumers re-render on value change. Mitigate by splitting contexts memoizing value and memoizing consumers."
},
quiz: [
{
id: "react-ctx-1",
question: "What are the two main parts of React Context?",
options: [
"Provider and Consumer/useContext",
"Store and Reducer",
"State and Dispatch",
"Create and Destroy",
],
correctIndex: 0,
explanation: "Context consists of Provider (supplies value) and Consumer/useContext (reads value).",
difficulty: "easy",
},
{
id: "react-ctx-2",
question: "Why use useMemo for Provider value?",
options: [
"Prevents unnecessary consumer re-renders",
"Makes value immutable",
"Improves TypeScript inference",
"Enables async updates",
],
correctIndex: 0,
explanation: "Without useMemo every Provider re-render creates new value object causing all consumers to re-render.",
difficulty: "medium",
},
{
id: "react-ctx-3",
question: "Impact of frequent context updates?",
options: [
"All consumers re-render on each update",
"React debounces updates",
"Only first consumer re-renders",
"Batched per frame",
],
correctIndex: 0,
explanation: "All useContext consumers re-render on every context update. Use refs or selective subscriptions for high-frequency data.",
difficulty: "hard",
}
],
faangQuestions: [
{
question: "Design feature-flag system with Context avoiding performance issues.",
answer: "Create FeatureFlagsContext with Map. Use useMemo for value. Create useFeatureFlag(key) hook returning boolean. Memoize consumers. Split by domain. For frequently changing flags use Zustand.",
difficulty: "hard",
company: "Meta",
},
{
question: "Compare Context API with Redux at scale. When does Context become insufficient?",
answer: "Context insufficient when: 1) Frequent updates 2) Complex state needs middleware 3) Hundreds of consumers 4) Fine-grained subscriptions needed. Redux addresses these with selectors middleware DevTools.",
difficulty: "hard",
company: "Google",
}
],
codingChallenges: [
{
title: "Build a Notification System with Context API",
description: "Create toast notification system: provider state useNotifications hook multiple types auto-dismiss (5s) manual close max 5 visible. TypeScript interfaces.",
difficulty: "medium",
starterCode: "interface Notification { id: string; message: string; type: \"success\" | \"error\" | \"info\" | \"warning\" }",
solutionHint: "Create context provider with useState addNotification with crypto.randomUUID setTimeout auto-dismiss useMemo for value custom hook with null check.",
}
],
},
{
slug: "redux-toolkit",
title: "Redux Toolkit",
order: 2,
content: {
overview: "Redux Toolkit (RTK) is the official way to write Redux logic simplifying setup with configureStore createSlice createAsyncThunk and RTK Query.",
problemStatement: "Traditional Redux required verbose boilerplate: action types action creators reducers store config middleware. This made Redux intimidating and time-consuming.",
intuitionFirst: "RTK is like a modern kitchen appliance vs cooking from scratch. Both make the same meal but RTK does prep work and automates common tasks.",
howItWorks: "createSlice generates action creators and reducers from name initialState reducers. configureStore sets up store with middleware and DevTools. createAsyncThunk handles async lifecycle.",
beginnerExample: "import { createSlice, configureStore } from \"@reduxjs/toolkit\";\n\nconst counterSlice = createSlice({\n  name: \"counter\",\n  initialState: { value: 0 },\n  reducers: {\n    increment: state => { state.value += 1; },\n    decrement: state => { state.value -= 1; },\n  },\n});\nexport const { increment, decrement } = counterSlice.actions;\nexport const store = configureStore({ reducer: { counter: counterSlice.reducer } });",
commonMistakes: "Mutating state in reducers without Immer awareness not using createAsyncThunk putting too much in global state.",
bestPractices: "Use createSlice for all Redux logic. Normalize nested data. Use RTK Query for API calls. Use TypeScript. Keep state serializable.",
comparisonTable: "| Feature | Context API | Redux Toolkit | Zustand |\n|---------|-------------|---------------|--------|\n| Boilerplate | Minimal | Medium | Minimal |\n| DevTools | None | Excellent | Basic |\n| Bundle size | 0 KB | ~12 KB | ~1 KB |"
},
quiz: [
{
id: "react-rtk-1",
question: "What does createSlice generate?",
options: [
"Action creators and reducers",
"Only reducers",
"Only action creators",
"Store configuration",
],
correctIndex: 0,
explanation: "createSlice generates both action creators and reducers from single configuration.",
difficulty: "easy",
},
{
id: "react-rtk-2",
question: "Purpose of createAsyncThunk?",
options: [
"Handle async lifecycle states",
"Create async actions manually",
"Replace useEffect",
"Handle routing",
],
correctIndex: 0,
explanation: "createAsyncThunk generates pending/fulfilled/rejected action types.",
difficulty: "medium",
},
{
id: "react-rtk-3",
question: "How does configureStore simplify setup?",
options: [
"Auto-configures middleware and DevTools",
"Removes need for reducers",
"Replaces combineReducers",
"Handles routing",
],
correctIndex: 0,
explanation: "configureStore automatically sets up redux-thunk middleware and DevTools.",
difficulty: "medium",
}
],
faangQuestions: [
{
question: "How does RTK Immer allow mutable syntax while maintaining immutability?",
answer: "Immer wraps reducer state in Proxy tracking mutations as patches. When you write state.value += 1 Immer produces a new immutable state. Cannot mix Immer drafts with manual returns.",
difficulty: "hard",
company: "Meta",
},
{
question: "Compare RTK Query with React Query/SWR.",
answer: "RTK Query tightly integrated with Redux provides cache management refetching optimistic updates. React Query is framework-agnostic and lighter. Choose RTK Query for Redux apps React Query for lighter setups.",
difficulty: "hard",
company: "Google",
}
],
codingChallenges: [
],
},
{
slug: "zustand",
title: "Zustand",
order: 3,
content: {
overview: "Zustand is a lightweight fast state management library with minimal API for creating global stores with built-in selectors and subscriptions.",
problemStatement: "Context API causes re-render issues at scale. Redux has significant boilerplate. Needed middle ground - simple performant state management without ceremony.",
intuitionFirst: "Zustand is like a shared notebook. Anyone reads specific pages (selectors) and only people reading changed pages get notified (re-render).",
howItWorks: "create((set get) => ({ ... })) creates store. useStore(selector) subscribes to specific slices. set updates state. Only re-renders when selected slice changes.",
beginnerExample: "import { create } from \"zustand\";\n\ninterface BearStore { bears: number; increase: () => void }\nconst useBearStore = create<BearStore>(set => ({\n  bears: 0,\n  increase: () => set(state => ({ bears: state.bears + 1 })),\n}));\nfunction BearCounter() {\n  const bears = useBearStore(s => s.bears);\n  return <h1>{bears} bears</h1>;\n}",
commonMistakes: "Not using selectors causing unnecessary re-renders mutating store outside set creating too many small stores.",
bestPractices: "Use selectors for specific slices. Create stores by domain. Use TypeScript. Avoid derived state in store - compute in selectors.",
performanceNotes: "Only re-renders components subscribed to changed slices via selectors. More efficient than Context API where all consumers re-render."
},
quiz: [
{
id: "react-zustand-1",
question: "What does Zustand create function return?",
options: [
"A custom hook to access store state",
"A React component",
"A reducer function",
"A context provider",
],
correctIndex: 0,
explanation: "create returns a custom hook for accessing store with selective subscriptions.",
difficulty: "easy",
},
{
id: "react-zustand-2",
question: "How does Zustand prevent unnecessary re-renders?",
options: [
"Selectors subscribe to specific slices",
"Uses shouldComponentUpdate",
"Batches all updates",
"Uses immutable data",
],
correctIndex: 0,
explanation: "Components subscribe via selectors only re-rendering when their selected slice changes.",
difficulty: "medium",
},
{
id: "react-zustand-3",
question: "How does Zustand compare to Context API for performance?",
options: [
"More efficient with selective subscriptions",
"Context API always faster",
"Same performance",
"Zustand slower for small apps",
],
correctIndex: 0,
explanation: "Zustand selectively re-renders subscribers of changed slices. Context re-renders all consumers.",
difficulty: "medium",
}
],
faangQuestions: [
{
question: "Compare Zustand Context API and Redux Toolkit. When to choose each?",
answer: "Zustand: lightweight (~1KB) minimal API good for medium apps. Context API: built-in zero deps for simple global data (theme locale). Redux Toolkit: full-featured with DevTools middleware best for large apps.",
difficulty: "hard",
company: "Meta",
},
{
question: "How does Zustand selector pattern work internally?",
answer: "Uses subscription model. useStore(selector) subscribes checking if selector result changed (Object.is) after state update. Uses useSyncExternalStore. More efficient than Context which cannot provide per-consumer granularity.",
difficulty: "hard",
company: "Google",
}
],
codingChallenges: [
],
},
],
},
{
slug: "forms",
title: "Forms",
description: "Learn form handling in React - controlled components React Hook Form and validation patterns",
order: 5,
subtopics: [
{
slug: "controlled-components",
title: "Controlled Components",
order: 1,
content: {
overview: "Controlled components are form elements whose value is controlled by React state via value/onChange making React the single source of truth for form data.",
problemStatement: "HTML form elements maintain their own internal state. React needs to manage form state for validation conditional rendering and submission requiring bridge between DOM and React state.",
intuitionFirst: "Controlled components make React the boss of form inputs. Input shows what React says user types reports back via onChange. React decides what to show.",
realLifeAnalogy: "A controlled component is like a game show buzzer. Contestant presses it (user input) but host (React) controls when to acknowledge it.",
howItWorks: "Input value bound to state. onChange updates state. React re-renders setting input value to updated state. Creates feedback loop: user input -> state change -> re-render -> updated input.",
beginnerExample: "function ControlledInput() {\n  const [name, setName] = useState(\"\");\n  return (<div><input value={name} onChange={e => setName(e.target.value)} /><p>Hello, {name}!</p></div>);\n}",
commonMistakes: "Forgetting onChange (read-only input) not using name attribute using defaultValue instead of value updating state with wrong event type.",
bestPractices: "Pair value with onChange. Use name attribute with computed property names. Validate on change and submit. Extract into reusable Field components.",
performanceNotes: "For large forms onChange on every keystroke can cause performance issues. Consider debouncing or onBlur. Use React Hook Form for complex forms."
},
quiz: [
{
id: "react-cc-1",
question: "What makes a form element controlled?",
options: [
"Value controlled by React state via value/onChange",
"Uses defaultValue",
"Wrapped in <form> tag",
"Has name attribute",
],
correctIndex: 0,
explanation: "Controlled component has value bound to state and updates through onChange.",
difficulty: "easy",
},
{
id: "react-cc-2",
question: "What happens if you set value without onChange?",
options: [
"Input becomes read-only",
"Input works normally",
"React throws error",
"Input resets on re-render",
],
correctIndex: 0,
explanation: "Without onChange the input value never updates because React controls it.",
difficulty: "medium",
},
{
id: "react-cc-3",
question: "Which correctly updates a field in form state object?",
options: [
"setForm(prev => ({ ...prev, [name]: value }))",
"setForm({ [name]: value })",
"form[name] = value; setForm(form)",
"Object.assign(prev, { [name]: value })",
],
correctIndex: 0,
explanation: "Spread operator copies previous state then dynamic key overrides specific field.",
difficulty: "medium",
}
],
faangQuestions: [
{
question: "Compare controlled vs uncontrolled components.",
answer: "Controlled: React manages value via state. Uncontrolled: DOM manages own state via refs. Use controlled for real-time validation conditional UI. Use uncontrolled for simple forms or file inputs. React recommends controlled.",
difficulty: "medium",
company: "Meta",
},
{
question: "How would you implement a reusable generic Field component with TypeScript?",
answer: "Generic Field<T extends string> with name value onChange error label. TypeScript generics for type-safe field names. Combine with custom useForm hook.",
difficulty: "hard",
company: "Google",
}
],
codingChallenges: [
{
title: "Build a Controlled Registration Form",
description: "Create registration form with controlled inputs for name email password confirm password. Real-time validation: email format password min 8 chars passwords match. Show inline errors. Disable submit until valid.",
difficulty: "medium",
starterCode: "interface FormData { name: string; email: string; password: string; confirmPassword: string }",
solutionHint: "Single form state object with useState validate on every change show errors conditionally disable submit if errors or empty.",
}
],
},
{
slug: "react-hook-form",
title: "React Hook Form",
order: 2,
content: {
overview: "React Hook Form is a performant form library minimizing re-renders by using uncontrolled components with refs. Provides hooks for registration validation error handling and submission.",
problemStatement: "Controlled components re-render on every keystroke causing performance issues in complex forms. Boilerplate grows exponentially with form size.",
intuitionFirst: "React Hook Form is like a smart form assistant. Instead of React controlling every input it uses refs to read values from DOM when needed.",
howItWorks: "useForm returns register handleSubmit formState. register connects inputs via refs. handleSubmit validates and provides values on submit. Validation rules in register.",
beginnerExample: "import { useForm } from \"react-hook-form\";\n\nfunction LoginForm() {\n  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();\n  return (\n    <form onSubmit={handleSubmit(d => console.log(d))}>\n      <input {...register(\"email\", { required: \"Required\", pattern: /^\\S+@\\S+$/i })} />\n      {errors.email && <span>{errors.email.message}</span>}\n      <button type=\"submit\">Login</button>\n    </form>\n  );\n}",
commonMistakes: "Not spreading register props not using TypeScript generics mixing controlled and uncontrolled not resetting after submit.",
bestPractices: "Use TypeScript generics. Use Zod/Yup resolver for validation. Use watch for dependent fields. Use Controller for custom components.",
performanceNotes: "Isolates re-renders to individual fields unlike controlled components which re-render entire form on every keystroke."
},
quiz: [
{
id: "react-rhf-1",
question: "How does React Hook Form connect to inputs?",
options: [
"Via refs using register()",
"Via controlled value/onChange",
"Via direct DOM queries",
"Via context providers",
],
correctIndex: 0,
explanation: "React Hook Form uses register() to connect inputs via refs.",
difficulty: "easy",
},
{
id: "react-rhf-2",
question: "Benefit over controlled components?",
options: [
"Fewer re-renders better performance",
"Built-in CSS styling",
"Automatic API integration",
"No TypeScript needed",
],
correctIndex: 0,
explanation: "Uses uncontrolled inputs with refs avoiding re-renders on every keystroke.",
difficulty: "medium",
},
{
id: "react-rhf-3",
question: "How to integrate Zod validation with React Hook Form?",
options: [
"Use zodResolver from @hookform/resolvers",
"Zod works automatically",
"Write custom validation",
"Zod cannot be used",
],
correctIndex: 0,
explanation: "@hookform/resolvers provides resolvers for Zod Yup and other validators.",
difficulty: "medium",
}
],
faangQuestions: [
{
question: "Compare React Hook Form with controlled components for performance.",
answer: "React Hook Form uses uncontrolled inputs via refs minimizing re-renders. Controlled components re-render entire form on every keystroke. For 50+ fields controlled causes 50+ re-renders per keystroke React Hook Form causes zero.",
difficulty: "hard",
company: "Meta",
},
{
question: "How to implement multi-step form with React Hook Form?",
answer: "Use useForm with defaultValues persisting across steps. Use watch() to track values. Call trigger() to validate current step. getValues() on final submit.",
difficulty: "hard",
company: "Amazon",
}
],
codingChallenges: [
],
},
{
slug: "form-validation",
title: "Form Validation",
order: 3,
content: {
overview: "Form validation ensures user input meets requirements before submission using manual logic or schema validators like Zod Yup or Joi.",
problemStatement: "Invalid form data causes errors security vulnerabilities and poor UX. Manual validation is repetitive and error-prone. Need standardized approach for rules errors and submission control.",
intuitionFirst: "Form validation is like a quality inspector. Each input must pass inspection before product ships. Bad inputs flagged with specific rejection reasons.",
howItWorks: "Validation runs on change blur or submit. Rules define constraints (required minLength pattern). Invalid fields show error messages. Submit blocked until all validations pass.",
beginnerExample: "const schema = z.object({\n  email: z.string().email(\"Invalid email\"),\n  password: z.string().min(8, \"Min 8 chars\"),\n});\ntype Data = z.infer<typeof schema>;\n\nfunction LoginForm() {\n  const { register, handleSubmit, formState: { errors } } = useForm<Data>({\n    resolver: zodResolver(schema),\n  });\n  return <form onSubmit={handleSubmit(d => console.log(d))}>\n    <input {...register(\"email\")} />\n    {errors.email && <p>{errors.email.message}</p>}\n    <button type=\"submit\">Submit</button>\n  </form>;\n}",
commonMistakes: "Only validating on submit not showing errors inline clearing form on validation error not handling server-side errors.",
bestPractices: "Validate on blur and change. Use Zod/Yup schemas. Show errors inline near fields. Handle both client and server errors.",
performanceNotes: "Schema validators are optimized. Debounce async validations. React Hook Form only validates field being edited."
},
quiz: [
{
id: "react-val-1",
question: "When should form validation run for best UX?",
options: [
"On blur and on change",
"Only on submit",
"Only on blur",
"Every keystroke",
],
correctIndex: 0,
explanation: "Validate on blur (leaving field) and on change (real-time feedback).",
difficulty: "easy",
},
{
id: "react-val-2",
question: "What is Zod primarily used for?",
options: [
"Schema declaration and validation",
"State management",
"Routing",
"CSS-in-JS",
],
correctIndex: 0,
explanation: "Zod is a TypeScript-first schema declaration and validation library.",
difficulty: "easy",
},
{
id: "react-val-3",
question: "How to do cross-field validation with Zod?",
options: [
"Use .refine() or .superRefine()",
"Write separate function",
"Use two schemas",
"Not supported",
],
correctIndex: 0,
explanation: "Zod .refine() allows custom validation accessing entire data object for cross-field checks.",
difficulty: "medium",
}
],
faangQuestions: [
{
question: "Design validation system handling client and server errors.",
answer: "Client-side: Zod/Yup for format validation. Server-side: structured error responses. Client integration: setError from React Hook Form. UX: inline errors near fields dont clear on server error distinguish error types with icons.",
difficulty: "hard",
company: "Meta",
},
{
question: "How to implement async validation (username availability)?",
answer: "Use Zod .refine with async or React Hook Form validate returning promise. Debounce 300-500ms. Show loading indicator. Cache results. Use AbortController for race conditions.",
difficulty: "hard",
company: "Google",
}
],
codingChallenges: [
],
},
],
},
{
slug: "api-integration",
title: "API Integration",
description: "Learn API communication patterns in React - Fetch API Axios and error handling strategies",
order: 6,
subtopics: [
{
slug: "fetch",
title: "Fetch",
order: 1,
content: {
overview: "The Fetch API is a built-in browser API for making HTTP requests with a promise-based interface. It is the standard way to call APIs in React without extra dependencies.",
problemStatement: "React applications need to communicate with servers. Before Fetch XMLHttpRequest was standard but had cumbersome API. Cleaner promise-based approach was needed.",
intuitionFirst: "Fetch is like ordering food delivery. You call the restaurant (request) they prepare your order (server processes) and deliver it (response).",
howItWorks: "fetch(url options) returns Promise resolving to Response. response methods (.json() .text()) parse body. Does not reject on HTTP errors - check response.ok. AbortController cancels.",
beginnerExample: "function UserList() {\n  const [users, setUsers] = useState<User[]>([]);\n  const [loading, setLoading] = useState(true);\n  useEffect(() => {\n    fetch(\"/api/users\")\n      .then(r => { if (!r.ok) throw new Error(\"HTTP \" + r.status); return r.json(); })\n      .then(d => { setUsers(d); setLoading(false); })\n      .catch(() => setLoading(false));\n  }, []);\n  return loading ? <p>Loading...</p> : <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;\n}",
commonMistakes: "Not checking response.ok forgetting loading/error states not using AbortController not parsing body correctly.",
bestPractices: "Check response.ok. Handle loading error empty states. Use AbortController with useEffect cleanup. Create reusable fetch wrappers.",
performanceNotes: "Fetch is natively implemented. For concurrent requests use Promise.all. Consider deduplication with React Query."
},
quiz: [
{
id: "react-fetch-1",
question: "Does Fetch reject on HTTP errors?",
options: [
"No check response.ok",
"Yes rejects automatically",
"Only 5xx",
"Only CORS errors",
],
correctIndex: 0,
explanation: "Fetch only rejects on network failures. HTTP errors resolve normally - check response.ok.",
difficulty: "medium",
},
{
id: "react-fetch-2",
question: "How to cancel an in-flight fetch?",
options: [
"Using AbortController",
"Calling request.abort()",
"Setting timeout",
"Not supported",
],
correctIndex: 0,
explanation: "AbortController provides abort signal. Call controller.abort() to cancel.",
difficulty: "medium",
},
{
id: "react-fetch-3",
question: "How to parse JSON response from fetch?",
options: [
"response.json()",
"response.text() then JSON.parse",
"response.parse()",
"JSON.parse(response)",
],
correctIndex: 0,
explanation: "response.json() reads body stream and parses as JSON.",
difficulty: "easy",
}
],
faangQuestions: [
{
question: "Design a custom useFetch hook with loading error caching and cancellation.",
answer: "Should: track loading/data/error states use AbortController cache responses support deduplication handle race conditions provide refetch/mutate. Return { data loading error refetch mutate }.",
difficulty: "hard",
company: "Meta",
},
{
question: "How to implement request deduplication?",
answer: "Maintain Map<string Promise> of in-flight requests. Before making request check if same-key request is in-flight. If so return existing promise. Remove from map when complete.",
difficulty: "hard",
company: "Google",
}
],
codingChallenges: [
{
title: "Build GitHub User Search with Fetch",
description: "Search component using Fetch API. Loading state results (avatar name bio) error handling debounced search with AbortController.",
difficulty: "hard",
starterCode: "function GitHubSearch() {\n  const [query, setQuery] = useState(\"\");\n  const [user, setUser] = useState(null);\n  // Your code here\n}",
solutionHint: "Use useEffect with query deps debounce with setTimeout AbortController check response.ok handle rate limits.",
}
],
},
{
slug: "axios",
title: "Axios",
order: 2,
content: {
overview: "Axios is a popular HTTP client for React with automatic JSON parsing interceptors timeout handling and better error objects.",
problemStatement: "Fetch requires manual JSON parsing and error handling lacks interceptors and timeouts. Axios provides these with developer-friendly API.",
intuitionFirst: "Axios is like Fetch with superpowers. Handles boring parts automatically lets you add middlewares (interceptors) provides sensible defaults.",
howItWorks: "axios.create({ baseURL timeout headers }) creates instance. Interceptors process requests/responses. axios.get/post returns parsed response. Errors include status data headers.",
beginnerExample: "const api = axios.create({ baseURL: \"https://api.example.com\", timeout: 5000 });\nfunction UserProfile({ userId }: { userId: string }) {\n  const [user, setUser] = useState<User | null>(null);\n  useEffect(() => {\n    api.get(`/users/${userId}`)\n      .then(res => setUser(res.data))\n      .catch(err => setError(err.response?.data?.message ?? err.message));\n  }, [userId]);\n  return user ? <h1>{user.name}</h1> : <Loading />;\n}",
commonMistakes: "Not creating instance with baseURL forgetting error handling not setting timeouts abusing interceptors.",
bestPractices: "Create configured instance per API. Use interceptors for auth headers logging error normalization. Set timeouts. Cancel requests on unmount.",
performanceNotes: "Axios adds ~14KB gzipped. Fetch sufficient for simple apps. Axios shines in larger apps needing interceptors and consistent error handling."
},
quiz: [
{
id: "react-axios-1",
question: "Main advantage of Axios over Fetch?",
options: [
"Automatic JSON parsing and error handling",
"Smaller bundle",
"Better browser support",
"Built-in state management",
],
correctIndex: 0,
explanation: "Axios automatically parses JSON and treats non-2xx as errors.",
difficulty: "easy",
},
{
id: "react-axios-2",
question: "Purpose of Axios interceptors?",
options: [
"Process requests or responses globally",
"Block routes",
"Handle component state",
"Manage form data",
],
correctIndex: 0,
explanation: "Interceptors run code before request sent or before response handled.",
difficulty: "medium",
},
{
id: "react-axios-3",
question: "How to set base URL for all requests?",
options: [
"axios.create({ baseURL: \"...\" })",
"axios.defaults.base = \"...\"",
"axios.setBase(\"...\")",
"Not supported",
],
correctIndex: 0,
explanation: "Create instance with axios.create({ baseURL: \"...\" }) for consistent base URL.",
difficulty: "easy",
}
],
faangQuestions: [
{
question: "Design Axios instance for production with auth retries and error normalization.",
answer: "Create instance with baseURL timeout (10s). Request interceptor: attach auth token add request ID. Response interceptor: normalize success/errors. Retry interceptor: retry 5xx max 3 exponential backoff dont retry 4xx. Handle 401 globally.",
difficulty: "hard",
company: "Meta",
},
{
question: "Compare Axios with Fetch for large-scale React apps.",
answer: "Axios: interceptors auto JSON parsing cancellation timeout progress events. Fetch: native no dependency smaller bundle. For large apps Axios reduces boilerplate for auth/error handling across hundreds of APIs.",
difficulty: "medium",
company: "Google",
}
],
codingChallenges: [
],
},
{
slug: "error-handling-api",
title: "Error Handling",
order: 3,
content: {
overview: "API error handling involves catching errors from HTTP requests displaying user-friendly messages and implementing recovery strategies crucial for reliability and UX.",
problemStatement: "Network requests fail for many reasons: server errors network issues timeouts rate limiting. Without proper handling users see broken UIs white screens or confusing messages.",
intuitionFirst: "Error handling is like a car safety system. When something goes wrong the car alerts you clearly and suggests what to do. Not handling errors is like disabling all warning lights.",
howItWorks: "Try/catch wraps API calls. Errors categorized (network auth validation server). User-friendly messages shown based on type. Recovery includes retry fallback data or graceful degradation.",
beginnerExample: "class AppError extends Error {\n  constructor(message: string, public statusCode?: number, public code?: string) {\n    super(message);\n    this.name = \"AppError\";\n  }\n  get isRetryable(): boolean {\n    return [429, 500, 502, 503, 504].includes(this.statusCode ?? 0);\n  }\n}\n\nfunction handleError(err: unknown): AppError {\n  if (err instanceof TypeError) return new AppError(\"Network error\", undefined, \"NETWORK\");\n  return new AppError(\"Something went wrong\", undefined, \"UNKNOWN\");\n}",
commonMistakes: "Showing technical errors not distinguishing error types not providing retry swallowing errors silently.",
bestPractices: "Categorize errors. Show user-friendly messages with icons. Provide retry buttons. Log to monitoring (Sentry). Use error boundaries.",
performanceNotes: "Error boundaries catch render errors. API error handling should not block main thread. Debounce retry attempts."
},
quiz: [
{
id: "react-err-1",
question: "Best practice for displaying API errors?",
options: [
"User-friendly messages with recovery options",
"Raw error message",
"Hide all errors",
"Generic error occurred",
],
correctIndex: 0,
explanation: "User-friendly messages with recovery options provide best UX.",
difficulty: "easy",
},
{
id: "react-err-2",
question: "Which status codes are retryable?",
options: [
"429 500 502 503 504",
"400 401 403 404",
"200 201 204",
"301 302 307",
],
correctIndex: 0,
explanation: "5xx and 429 are retryable. 4xx client errors should not be blindly retried.",
difficulty: "medium",
},
{
id: "react-err-3",
question: "Purpose of React Error Boundary?",
options: [
"Catch rendering errors show fallback UI",
"Catch API errors",
"Handle form validation",
"Manage routing errors",
],
correctIndex: 0,
explanation: "Error boundaries catch JavaScript errors during rendering in lifecycle methods.",
difficulty: "medium",
}
],
faangQuestions: [
{
question: "Design comprehensive error handling strategy for production React app.",
answer: "Three layers: 1) API layer - normalize errors into AppError class with status code retryable flag. 2) Component layer - ErrorBoundary for render errors useQuery states for API errors. 3) Global layer - unhandled rejection handler error logging (Sentry) global error boundary with reload option.",
difficulty: "hard",
company: "Meta",
},
{
question: "How to implement graceful degradation when API is unavailable?",
answer: "Circuit breaker pattern - pause requests after N failures. Fallback data - serve cached stale data. Offline indicators - show banner. Queued mutations - store writes locally sync when recover. Feature degradation - hide features requiring unavailable API.",
difficulty: "hard",
company: "Google",
}
],
codingChallenges: [
],
},
],
},
{
slug: "performance",
title: "Performance",
description: "Learn React performance optimization - memoization lazy loading Suspense and code splitting",
order: 7,
subtopics: [
{
slug: "memoization",
title: "Memoization",
order: 1,
content: {
overview: "Memoization in React optimizes performance by caching expensive computations and preventing unnecessary re-renders using React.memo useMemo and useCallback.",
problemStatement: "React re-renders when parent state changes even if child props unchanged. Expensive computations run on every render causing sluggish UI in deeply nested trees.",
intuitionFirst: "Memoization is like a notepad. Instead of recalculating every time write the result and check the notepad first. Same inputs? Read cached answer.",
howItWorks: "React.memo wraps component skipping re-render if props unchanged (shallow compare). useMemo caches computed values. useCallback caches function references. All use dependency arrays for cache invalidation.",
beginnerExample: "const ExpensiveList = React.memo(function ExpensiveList({ items }: { items: string[] }) {\n  return <ul>{items.map(i => <li key={i}>{i}</li>)}</ul>;\n});\n\nfunction Parent() {\n  const [count, setCount] = useState(0);\n  const items = useMemo(() => [\"a\", \"b\", \"c\"], []);\n  return (\n    <div>\n      <ExpensiveList items={items} />\n      <button onClick={() => setCount(c => c + 1)}>Re-render: {count}</button>\n    </div>\n  );\n}",
commonMistakes: "Premature optimization not including all dependencies using useMemo for primitives overusing React.memo with always-changing props.",
bestPractices: "Profile before optimizing. Include all dependencies. Use React.memo for pure components rendering often with same props.",
performanceNotes: "Memoization has overhead. For simple computations recomputing is cheaper. React may clear caches under memory pressure."
},
quiz: [
{
id: "react-memo-1",
question: "What does React.memo do?",
options: [
"Skip re-render if props unchanged",
"Memoize component state",
"Cache API responses",
"Optimize bundle size",
],
correctIndex: 0,
explanation: "React.memo skips re-rendering if props unchanged via shallow comparison.",
difficulty: "easy",
},
{
id: "react-memo-2",
question: "When NOT to use useMemo?",
options: [
"Cheap computations overhead exceeds benefit",
"Expensive array sorting",
"Filtering large datasets",
"Complex math",
],
correctIndex: 0,
explanation: "useMemo overhead can exceed recomputation cost for simple operations.",
difficulty: "medium",
},
{
id: "react-memo-3",
question: "Does React guarantee memoized values not recomputed?",
options: [
"No may clear cache under memory pressure",
"Yes guaranteed",
"Only in production",
"Only for primitives",
],
correctIndex: 0,
explanation: "React may discard cached values to free memory. Optimization not guarantee.",
difficulty: "hard",
}
],
faangQuestions: [
{
question: "Explain relationship between referential equality memoization and re-renders.",
answer: "React.memo uses shallow comparison (===). If function/object props recreated every render (inline) React.memo sees !== and re-renders anyway. useCallback/useMemo stabilize references making React.memo effective.",
difficulty: "hard",
company: "Meta",
},
{
question: "How does React 18 automatic batching interact with memoization?",
answer: "Batching groups state updates into single re-renders reducing total renders. This means fewer opportunities for memoization. However memoization still helps prevent cascading re-renders in deep trees.",
difficulty: "hard",
company: "Google",
}
],
codingChallenges: [
{
title: "Optimize Component Tree with Memoization",
description: "Add React.memo useMemo for filtering and useCallback for handlers to a product list. Verify with React DevTools profiler.",
difficulty: "medium",
starterCode: "function ProductList({ products }: { products: Product[] }) {\n  const [search, setSearch] = useState(\"\");\n  // Optimize this\n  return <div>{/* products */}</div>;\n}",
solutionHint: "Wrap ProductList with React.memo. Use useMemo to filter products. useCallback for handlers. Extract ProductCard as separate React.memo component.",
}
],
},
{
slug: "lazy-loading",
title: "Lazy Loading",
order: 2,
content: {
overview: "Lazy loading defers loading non-critical resources until needed. React.lazy enables dynamic imports reducing initial bundle size and improving load time.",
problemStatement: "SPAs bundle all JavaScript into one large file. Users download code for every feature even if only visiting homepage increasing load time and wasting bandwidth.",
intuitionFirst: "Lazy loading is like a library that fetches books only when you ask for them instead of bringing every book to your desk when you walk in.",
howItWorks: "React.lazy(() => import(\"./Component\")) wraps dynamic import returning Promise resolving to component. Suspense wraps lazy components showing fallback while loading.",
beginnerExample: "const Dashboard = lazy(() => import(\"./Dashboard\"));\n\nfunction App() {\n  return (\n    <Suspense fallback={<Skeleton />}>\n      <Routes>\n        <Route path=\"/dashboard\" element={<Dashboard />} />\n      </Routes>\n    </Suspense>\n  );\n}",
commonMistakes: "Wrapping every component in lazy (adds overhead) not providing good fallback lazy loading above-the-fold content not handling loading errors.",
bestPractices: "Lazy load route-level components not individual UI elements. Use skeleton screens as fallback. Preload on hover. Split by user roles.",
performanceNotes: "React.lazy splits code at build time via dynamic import. Each lazy component becomes separate chunk. Reduces initial bundle but adds network round trips."
},
quiz: [
{
id: "react-lazy-1",
question: "What does React.lazy enable?",
options: [
"Dynamic imports with code splitting",
"Lazy state initialization",
"Deferred event handling",
"Lazy rendering of lists",
],
correctIndex: 0,
explanation: "React.lazy enables dynamic imports loading components on demand splitting code into chunks.",
difficulty: "easy",
},
{
id: "react-lazy-2",
question: "What wraps lazy components for fallback?",
options: [
"<Suspense>",
"<ErrorBoundary>",
"<Loading>",
"<Fallback>",
],
correctIndex: 0,
explanation: "<Suspense> shows fallback UI while lazy component module loads.",
difficulty: "easy",
},
{
id: "react-lazy-3",
question: "Trade-offs of lazy loading every component?",
options: [
"Too many chunks causing waterfall requests",
"Always improves performance",
"Increases bundle size",
"Causes memory leaks",
],
correctIndex: 0,
explanation: "Excessive lazy loading creates too many chunks causing waterfall network requests.",
difficulty: "medium",
}
],
faangQuestions: [
{
question: "Design lazy loading strategy for large React app with role-based access.",
answer: "Split by: 1) Routes - each page lazily loaded 2) Feature modules - admin features only for admins 3) Third-party libraries (charts editors) when their feature used. Preload on hover. Keep critical path under 100KB.",
difficulty: "hard",
company: "Meta",
},
{
question: "How does React.lazy work with Next.js SSR?",
answer: "Next.js has built-in dynamic import via next/dynamic extending React.lazy for SSR. Configurable ssr: false for client-only components. Supports loading states on server.",
difficulty: "hard",
company: "Vercel",
}
],
codingChallenges: [
],
},
{
slug: "suspense",
title: "Suspense",
order: 3,
content: {
overview: "Suspense lets components wait for something (code data images) before rendering coordinating loading states across the component tree for cohesive UX.",
problemStatement: "Managing loading states manually requires complex conditional logic scattered across components leading to inconsistent UX and difficult coordination.",
intuitionFirst: "Suspense is like a traffic controller telling components to wait (show loading) until everything is ready then letting them render together smoothly.",
howItWorks: "Suspense wraps components that might suspend. When child suspends nearest Suspense boundary shows fallback. When ready renders child. Multiple boundaries can be nested.",
beginnerExample: "<Suspense fallback={<Skeleton />}>\n  <Dashboard />\n</Suspense>\n\n<Suspense fallback={<PageSkeleton />}>\n  <Layout>\n    <Suspense fallback={<SidebarSkeleton />}><Sidebar /></Suspense>\n    <Suspense fallback={<MainSkeleton />}><MainContent /></Suspense>\n  </Layout>\n</Suspense>",
commonMistakes: "Using single Suspense for entire page (slow) not providing meaningful fallbacks nesting Suspense unnecessarily.",
bestPractices: "Use multiple Suspense boundaries for granular loading. Provide skeleton screens not spinners. Place boundaries where you want loading states to appear.",
performanceNotes: "Suspense coordinates loading states preventing layout shift and providing consistent UX during data fetching."
},
quiz: [
{
id: "react-suspense-1",
question: "What does Suspense show while waiting?",
options: [
"Fallback UI (spinner skeleton)",
"Nothing",
"Error message",
"Previous content",
],
correctIndex: 0,
explanation: "Suspense shows the fallback prop while children are loading.",
difficulty: "easy",
},
{
id: "react-suspense-2",
question: "What triggers Suspense to show fallback?",
options: [
"Child component suspends (lazy or data fetch)",
"Component errors",
"Network offline",
"User navigation",
],
correctIndex: 0,
explanation: "Suspense activates when a child component suspends during render.",
difficulty: "medium",
},
{
id: "react-suspense-3",
question: "Best practice for Suspense fallbacks?",
options: [
"Skeleton screens matching layout dimensions",
"Generic spinners",
"Empty divs",
"Text saying loading",
],
correctIndex: 0,
explanation: "Skeleton screens that match expected layout prevent layout shift and provide better UX.",
difficulty: "medium",
}
],
faangQuestions: [
{
question: "Compare Suspense with manual loading states. Advantages?",
answer: "Suspense provides: 1) Automatic coordination - no manual loading flags 2) Declarative - loading states in JSX not logic 3) Granular control - nested boundaries for partial loading 4) Prevents layout shift with skeleton fallbacks 5) Integrates with React.lazy and data libraries.",
difficulty: "hard",
company: "Meta",
},
{
question: "How does Suspense integrate with data fetching in React 18+?",
answer: "React 18 Suspense works with React.lazy for code splitting and can work with Suspense-enabled data frameworks (Relay React Query with experimental flag). Traditional useEffect fetching does not trigger Suspense - requires Suspense-enabled data libraries.",
difficulty: "hard",
company: "Google",
}
],
codingChallenges: [
],
},
{
slug: "code-splitting",
title: "Code Splitting",
order: 4,
content: {
overview: "Code splitting divides your bundle into smaller chunks loaded on demand reducing initial load time. React supports this via dynamic import React.lazy and Suspense.",
problemStatement: "Single JavaScript bundle grows as app grows leading to slow initial page loads. Users download code for features they may never use. Need to split code at logical boundaries.",
intuitionFirst: "Code splitting is like reading a book chapter by chapter instead of carrying the entire encyclopedia. You only download what you need when you need it.",
howItWorks: "Dynamic import() creates a separate chunk at build time. React.lazy wraps dynamic import for component splitting. Webpack/Vite automatically generate separate chunks. Route-based splitting is the most common pattern.",
beginnerExample: "// Route-based code splitting\nconst Home = lazy(() => import(\"./pages/Home\"));\nconst About = lazy(() => import(\"./pages/About\"));\nconst Dashboard = lazy(() => import(\"./pages/Dashboard\"));\n\nfunction App() {\n  return (\n    <Suspense fallback={<Loading />}>\n      <Routes>\n        <Route path=\"/\" element={<Home />} />\n        <Route path=\"/about\" element={<About />} />\n        <Route path=\"/dashboard\" element={<Dashboard />} />\n      </Routes>\n    </Suspense>\n  );\n}",
commonMistakes: "Splitting too granularly (many tiny chunks) splitting components used immediately splitting libraries that are always needed.",
bestPractices: "Split at route level. Split heavy third-party libraries (chart editors PDF viewers). Split feature modules (admin panel only for admins). Use bundle analyzer to identify large chunks.",
performanceNotes: "Webpack/Vite code splitting produces separate files with content hashing for caching. Dynamic imports use async loading. Preload critical chunks on idle."
},
quiz: [
{
id: "react-cs-1",
question: "What is code splitting?",
options: [
"Dividing bundle into smaller loaded chunks",
"Optimizing images",
"Minifying CSS",
"Caching responses",
],
correctIndex: 0,
explanation: "Code splitting divides bundle into smaller chunks loaded on demand reducing initial load.",
difficulty: "easy",
},
{
id: "react-cs-2",
question: "Most common code splitting pattern in React?",
options: [
"Route-based splitting",
"Component-based splitting",
"Library-based splitting",
"Function-based splitting",
],
correctIndex: 0,
explanation: "Route-based splitting is most common - each page becomes separate chunk loaded when navigated to.",
difficulty: "medium",
},
{
id: "react-cs-3",
question: "How does Webpack create split chunks?",
options: [
"Automatically from dynamic import()",
"Manual configuration required",
"Only with specific plugins",
"Not supported by default",
],
correctIndex: 0,
explanation: "Webpack/Vite automatically detect dynamic import() and create separate chunks at build time.",
difficulty: "medium",
}
],
faangQuestions: [
{
question: "Design a code splitting strategy for enterprise React app.",
answer: "1) Route-level: each page split. 2) Feature-level: admin/enterprise features only for authorized users. 3) Library-level: heavy libs (chart animation PDF) loaded when feature used. 4) Vendor splitting: React framework in separate long-cached chunk. 5) Preloading: predict user navigation prefetch likely chunks. Monitor with Lighthouse and bundle analyzer.",
difficulty: "hard",
company: "Meta",
},
{
question: "How does content hashing in chunk filenames help with caching?",
answer: "Content hash (e.g., dashboard.a3b2c1.js) changes only when file content changes. Browsers cache chunks with same hash indefinitely. When code changes new hash forces re-download. This enables aggressive caching: unchanged chunks served from cache changed chunks re-fetched. Combined with route-based splitting users only re-download changed page chunks.",
difficulty: "hard",
company: "Google",
}
],
codingChallenges: [
],
},
],
},
{
slug: "authentication",
title: "Authentication",
description: "Learn authentication patterns in React - JWT OAuth and protected routes",
order: 8,
subtopics: [
{
slug: "jwt",
title: "JWT",
order: 1,
content: {
overview: "JWT (JSON Web Token) authentication involves storing a signed token on the client after login and sending it with requests to authenticate users. React manages token storage and attaches it to API calls.",
problemStatement: "HTTP is stateless - servers need a way to identify authenticated users across requests. JWT provides a compact self-contained mechanism for securely transmitting identity information.",
intuitionFirst: "JWT is like a concert wristband. Once you show your ticket (login) you get a wristband (token) that proves you belong. Present the wristband (token in header) at entry points (API routes) without re-showing your ticket.",
howItWorks: "Server signs a token containing user claims with a secret. Client stores token (localStorage/httpOnly cookie). Client sends token in Authorization header. Server verifies signature and extracts claims. Token expires requiring refresh.",
beginnerExample: "// Auth service\nconst TOKEN_KEY = \"auth_token\";\n\nexport const auth = {\n  login: async (email: string, password: string) => {\n    const res = await fetch(\"/api/auth/login\", {\n      method: \"POST\",\n      headers: { \"Content-Type\": \"application/json\" },\n      body: JSON.stringify({ email, password }),\n    });\n    const { token } = await res.json();\n    localStorage.setItem(TOKEN_KEY, token);\n    return token;\n  },\n  logout: () => localStorage.removeItem(TOKEN_KEY),\n  getToken: () => localStorage.getItem(TOKEN_KEY),\n  isAuthenticated: () => !!localStorage.getItem(TOKEN_KEY),\n};\n\n// API client with token\nasync function apiFetch(url: string, options: RequestInit = {}) {\n  const token = auth.getToken();\n  const headers = { ...options.headers, Authorization: `Bearer ${token}` };\n  const res = await fetch(url, { ...options, headers });\n  if (res.status === 401) { auth.logout(); window.location.href = \"/login\"; }\n  return res;\n}",
commonMistakes: "Storing sensitive data in JWT payload (it is only base64 encoded not encrypted) not handling token expiration storing token in localStorage vulnerable to XSS not implementing refresh tokens.",
bestPractices: "Store tokens in httpOnly cookies for XSS protection. Use refresh tokens for long-lived sessions. Validate token expiration on client. Implement interceptors to attach tokens automatically.",
securityNotes: "JWT payload is base64 encoded not encrypted - never store sensitive data. Use HTTPS always. Implement token rotation. Consider httpOnly cookies over localStorage for XSS mitigation."
},
quiz: [
{
id: "react-jwt-1",
question: "What does JWT stand for?",
options: [
"JSON Web Token",
"JavaScript Web Token",
"Java Web Token",
"JSON With Tokens",
],
correctIndex: 0,
explanation: "JWT stands for JSON Web Token - a compact URL-safe token format.",
difficulty: "easy",
},
{
id: "react-jwt-2",
question: "Where is JWT typically stored in browser apps?",
options: [
"localStorage or httpOnly cookie",
"Session storage",
"Global variable",
"URL parameter",
],
correctIndex: 0,
explanation: "JWT is typically stored in localStorage or preferably httpOnly cookie for XSS protection.",
difficulty: "medium",
},
{
id: "react-jwt-3",
question: "What does the Authorization header look like for JWT?",
options: [
"Bearer <token>",
"Token <token>",
"JWT <token>",
"Auth <token>",
],
correctIndex: 0,
explanation: "Standard format is \"Authorization: Bearer <token>\".",
difficulty: "easy",
}
],
faangQuestions: [
{
question: "Explain the difference between access tokens and refresh tokens in JWT authentication.",
answer: "Access token (short-lived 15min) used for API requests. Refresh token (long-lived 7-30 days) used to obtain new access tokens without re-login. Storage: access token in memory/httpOnly cookie refresh token in httpOnly cookie. Refresh flow: when access expires client sends refresh token to /refresh endpoint gets new access token. If refresh expires user must re-login.",
difficulty: "hard",
company: "Meta",
},
{
question: "How would you implement automatic token refresh in React?",
answer: "Create axios interceptor that intercepts 401 responses. If response is 401 and original request is not /refresh attempt to refresh token. If refresh succeeds retry original request with new token. If refresh fails redirect to login. Use a queue to hold pending requests during refresh so multiple concurrent 401s trigger only one refresh.",
difficulty: "hard",
company: "Google",
}
],
codingChallenges: [
{
title: "Implement JWT Authentication Flow",
description: "Build a login component that authenticates with JWT stores token attaches to API requests handles token expiration implements protected routes. Use context to provide auth state globally.",
difficulty: "hard",
starterCode: "interface AuthContext { user: User | null; login: (email: string password: string) => Promise<void>; logout: () => void; isAuthenticated: boolean }",
solutionHint: "Create AuthContext with user login logout. Login calls API stores token. Create api client that attaches Bearer token. Intercept 401 for auto-redirect. Protected route redirects to login if not authenticated.",
}
],
},
{
slug: "oauth",
title: "OAuth",
order: 2,
content: {
overview: "OAuth is an open standard for delegated access allowing users to grant third-party apps access to their resources without sharing passwords. React apps use OAuth for social login (Google GitHub Facebook).",
problemStatement: "Users don't want to create new accounts for every app. Managing passwords securely is hard. OAuth lets users authenticate via trusted providers (Google GitHub) without sharing credentials with your app.",
intuitionFirst: "OAuth is like a hotel valet key. Instead of giving your house keys (password) to a valet you give them a special key (OAuth token) that only opens the car door (specific permissions).",
howItWorks: "App redirects user to OAuth provider. User authenticates on provider site. Provider redirects back with authorization code. App exchanges code for tokens. Tokens used for API calls on behalf of user.",
beginnerExample: "// React OAuth login with redirect\nfunction Login() {\n  const loginWithGoogle = () => {\n    const params = new URLSearchParams({\n      client_id: process.env.GOOGLE_CLIENT_ID!,\n      redirect_uri: `${window.location.origin}/auth/callback`,\n      response_type: \"code\",\n      scope: \"openid profile email\",\n    });\n    window.location.href = `https://accounts.google.com/o/oauth2/auth?${params}`;\n  };\n\n  return <button onClick={loginWithGoogle}>Sign in with Google</button>;\n}\n\n// Callback handler (on /auth/callback)\nuseEffect(() => {\n  const code = new URLSearchParams(window.location.search).get(\"code\");\n  if (code) {\n    fetch(\"/api/auth/google/callback\", {\n      method: \"POST\",\n      body: JSON.stringify({ code }),\n    }).then(r => r.json()).then(data => {\n      // Store tokens redirect to app\n    });\n  }\n}, []);",
commonMistakes: "Not validating state parameter (CSRF) storing access tokens improperly not handling token expiry not implementing proper redirect URIs.",
bestPractices: "Use PKCE (Proof Key for Code Exchange) for mobile/SPA apps. Validate state parameter to prevent CSRF. Use httpOnly cookies for tokens. Implement proper redirect URI validation on server.",
securityNotes: "Always use PKCE flow for SPAs. Never expose client secret in browser. Validate state parameter. Use https for redirect URIs. Implement CORS properly."
},
quiz: [
{
id: "react-oauth-1",
question: "What is OAuth used for in React apps?",
options: [
"Social login (Google GitHub etc.)",
"Database management",
"CSS styling",
"Routing",
],
correctIndex: 0,
explanation: "OAuth enables users to log in using trusted providers like Google GitHub without sharing passwords.",
difficulty: "easy",
},
{
id: "react-oauth-2",
question: "What is PKCE in OAuth?",
options: [
"Proof Key for Code Exchange - security extension for public clients",
"Primary Key for Client Exchange",
"Private Key Certificate Extension",
"Public Key Cryptographic Exchange",
],
correctIndex: 0,
explanation: "PKCE is a security extension preventing authorization code interception in public clients like SPAs.",
difficulty: "medium",
},
{
id: "react-oauth-3",
question: "Why should the state parameter be used in OAuth?",
options: [
"Prevent CSRF attacks",
"Encrypt the request",
"Cache user data",
"Improve performance",
],
correctIndex: 0,
explanation: "The state parameter prevents CSRF by ensuring the authorization response matches the request.",
difficulty: "medium",
}
],
faangQuestions: [
{
question: "Compare OAuth 2.0 Authorization Code flow with Implicit flow. Which is appropriate for SPAs?",
answer: "Authorization Code flow (recommended) uses a server-side code exchange keeping the client secret secure. Implicit flow (deprecated) returned access token directly in URL fragment vulnerable to interception. For SPAs use Authorization Code flow with PKCE which provides the security of code exchange without needing a client secret.",
difficulty: "hard",
company: "Google",
},
{
question: "How would you implement OAuth social login with a React SPA and backend API?",
answer: "Frontend redirects user to OAuth provider with client_id redirect_uri scope state and code_challenge (PKCE). Backend receives authorization code via callback exchanges it for tokens using client_secret and code_verifier. Backend returns JWT to frontend. Frontend stores JWT and uses for API calls. Backend uses OAuth access token to call provider APIs on behalf of user.",
difficulty: "hard",
company: "Meta",
}
],
codingChallenges: [
],
},
{
slug: "protected-routes",
title: "Protected Routes",
order: 3,
content: {
overview: "Protected routes restrict access to authenticated users. React Router components check authentication state and redirect unauthorized users to login while preserving the intended destination.",
problemStatement: "Applications have pages that should only be accessible to authenticated users (dashboard settings profile). Without protection users can access these pages directly by URL. Need a way to gate routes based on auth state.",
intuitionFirst: "Protected routes are like a bouncer at a club. The bouncer checks your ID (authentication) before letting you in. If you don't have ID you get sent to the registration desk (login page).",
howItWorks: "ProtectedRoute component wraps children. Checks auth context (user token). If not authenticated redirects to /login preserving current location in state. After login user is redirected back to original destination.",
beginnerExample: "function ProtectedRoute({ children }: { children: React.ReactNode }) {\n  const { user, isLoading } = useAuth();\n  const location = useLocation();\n\n  if (isLoading) return <PageSkeleton />;\n  if (!user) return <Navigate to=\"/login\" state={{ from: location }} replace />;\n  return <>{children}</>;\n}\n\nfunction App() {\n  return (\n    <Routes>\n      <Route path=\"/login\" element={<Login />} />\n      <Route path=\"/dashboard\" element={\n        <ProtectedRoute>\n          <Dashboard />\n        </ProtectedRoute>\n      } />\n      <Route path=\"/settings\" element={\n        <ProtectedRoute>\n          <Settings />\n        </ProtectedRoute>\n      } />\n    </Routes>\n  );\n}",
commonMistakes: "Checking auth state synchronously (needs loading state) not preserving redirect location checking token existence without validation not handling auth loading state showing flash of protected content before redirect.",
bestPractices: "Always handle loading state before checking auth. Preserve intended destination for post-login redirect. Use centralized route configuration. Implement role-based access for admin routes.",
performanceNotes: "Auth context should be lightweight and memoized. Protected routes work with React.lazy for code splitting. Auth check runs on route change."
},
quiz: [
{
id: "react-pr-1",
question: "What does a Protected Route component do?",
options: [
"Checks auth and redirects unauthorized users",
"Encrypts route data",
"Optimizes page loading",
"Handles form submissions",
],
correctIndex: 0,
explanation: "Protected routes check authentication and redirect unauthorized users to login.",
difficulty: "easy",
},
{
id: "react-pr-2",
question: "Why preserve location state when redirecting to login?",
options: [
"Redirect back to original page after login",
"Cache the redirected URL",
"Improve browser history",
"Prevent infinite loops",
],
correctIndex: 0,
explanation: "Preserving location.state.from allows redirecting user back to intended page after successful login.",
difficulty: "medium",
},
{
id: "react-pr-3",
question: "What should a Protected Route render while checking auth?",
options: [
"Loading skeleton or spinner",
"Nothing",
"The protected content",
"Error message",
],
correctIndex: 0,
explanation: "Show loading state while checking authentication to prevent flash of unauthorized content.",
difficulty: "medium",
}
],
faangQuestions: [
{
question: "How would you implement role-based access control with protected routes?",
answer: "Create ProtectedRoute component that accepts required role(s). Check user role from auth context. If user lacks permission redirect to unauthorized page. Support multiple roles and hierarchy (admin > editor > viewer). Integrate with route config: { path: \"admin\", element: <ProtectedRoute roles={[\"admin\"]}><AdminPanel /></ProtectedRoute> }.",
difficulty: "hard",
company: "Meta",
},
{
question: "How to prevent flash of protected content before auth check completes?",
answer: "1) Initialize auth state as \"loading\" not \"unauthenticated\". 2) ProtectedRoute shows skeleton while loading. 3) Only after auth check completes show content or redirect. 4) Consider server-side auth check with Next.js middleware. 5) Use consistent loading state in auth context starting as null/undefined for initial value.",
difficulty: "hard",
company: "Google",
}
],
codingChallenges: [
],
},
],
},
{
slug: "nextjs",
title: "Next.js",
description: "Learn Next.js framework - SSR SSG ISR API Routes and Middleware for production React applications",
order: 9,
subtopics: [
{
slug: "ssr",
title: "SSR",
order: 1,
content: {
overview: "Server-Side Rendering (SSR) renders React components on the server for each request sending fully rendered HTML to the client. This improves SEO and initial load performance.",
problemStatement: "Client-side rendering (CSR) sends empty HTML with JavaScript. Users see blank screen until JS loads. Search engines struggle to index content. Initial page load is slow especially on slow devices.",
intuitionFirst: "SSR is like a restaurant that pre-cooks your meal when you order instead of giving you raw ingredients and a recipe to cook yourself. You get a fully prepared page ready to display.",
howItWorks: "Server receives request. Next.js fetches data runs React rendering server-side producing HTML. HTML sent to client with JavaScript for hydration. Hydration makes page interactive. Client-side code takes over for subsequent navigations.",
beginnerExample: "// pages/products/[id].tsx (Pages Router)\nexport async function getServerSideProps(context) {\n  const { params } = context;\n  const res = await fetch(`https://api.example.com/products/${params.id}`);\n  const product = await res.json();\n  return { props: { product } };\n}\n\nexport default function ProductPage({ product }: { product: Product }) {\n  return (\n    <div>\n      <h1>{product.name}</h1>\n      <p>{product.description}</p>\n      <Price amount={product.price} />\n    </div>\n  );\n}\n\n// App Router equivalent\n// app/products/[id]/page.tsx\nexport default async function ProductPage({ params }: { params: { id: string } }) {\n  const product = await fetch(`https://api.example.com/products/${params.id}`).then(r => r.json());\n  return <div><h1>{product.name}</h1><p>{product.description}</p></div>;\n}",
commonMistakes: "Fetching data on both server and client using SSR for static content (use SSG) not handling errors in getServerSideProps putting heavy computations in SSR that block response.",
bestPractices: "Use SSR for dynamic personalized content. Cache API responses on server. Handle loading/error states. Use Streaming SSR (React 18) for faster TTFB. Consider ISR for content that changes less frequently.",
performanceNotes: "SSR improves LCP (Largest Contentful Paint) but TTFB (Time to First Byte) increases due to server rendering time. Streaming SSR sends HTML progressively improving perceived performance."
},
quiz: [
{
id: "react-ssr-1",
question: "What does SSR do?",
options: [
"Renders React on server sending HTML to client",
"Renders on client only",
"Splits code into chunks",
"Compiles TypeScript",
],
correctIndex: 0,
explanation: "SSR renders React components on the server producing HTML sent to the client.",
difficulty: "easy",
},
{
id: "react-ssr-2",
question: "What is hydration in SSR?",
options: [
"Making server-rendered HTML interactive",
"Adding CSS to HTML",
"Compressing HTML",
"Encrypting the page",
],
correctIndex: 0,
explanation: "Hydration attaches JavaScript event handlers to server-rendered HTML making it interactive.",
difficulty: "medium",
},
{
id: "react-ssr-3",
question: "Trade-off of SSR vs CSR?",
options: [
"Better SEO/initial load but slower TTFB",
"Faster TTFB but worse SEO",
"Slower both ways",
"Same performance both ways",
],
correctIndex: 0,
explanation: "SSR improves SEO and initial load but increases server response time (TTFB).",
difficulty: "hard",
}
],
faangQuestions: [
{
question: "Compare SSR with Streaming SSR (React 18). How does streaming improve UX?",
answer: "Traditional SSR sends full HTML after complete render. Streaming SSR sends HTML progressively as it renders enabling browser to start painting sooner. Improves TTFB (Time to First Byte) and allows Suspense boundaries to stream independently reducing perceived latency. Next.js App Router uses Streaming SSR by default with loading.tsx and Suspense boundaries.",
difficulty: "hard",
company: "Vercel",
},
{
question: "How does Next.js SSR handle data fetching compared to client-side data fetching?",
answer: "Server-side data fetching (getServerSideProps or async server components) happens during SSR - data is fetched on server HTML contains data. Client-side fetching (useEffect React Query) shows loading state then fetches after hydration. SSR eliminates loading states for initial page load and provides data to search engines. Subsequent navigations use client-side fetching for responsiveness.",
difficulty: "hard",
company: "Meta",
}
],
codingChallenges: [
{
title: "Build an SSR Product Page with Next.js",
description: "Create a product detail page using SSR. Fetch product data from API on each request. Show loading skeleton handle errors (product not found API failure) implement SEO meta tags. Use both Pages Router and App Router approaches.",
difficulty: "hard",
starterCode: "export async function getServerSideProps(context) {\n  // Your code here\n}",
solutionHint: "Fetch product by ID. Handle 404 by returning notFound: true. Include SEO metadata in return. Use try/catch for error handling. Stream response back.",
}
],
},
{
slug: "ssg",
title: "SSG",
order: 2,
content: {
overview: "Static Site Generation (SSG) pre-renders pages at build time producing static HTML files. Pages are served instantly from CDN without server processing delivering the fastest possible load times.",
problemStatement: "SSR handles every request on the server which is slow for high-traffic content that rarely changes. Building static HTML once at deploy time eliminates server rendering overhead.",
intuitionFirst: "SSG is like publishing a book. You write and print (build) once then distribute copies. Readers get instant access without waiting for custom printing (SSR) every time.",
howItWorks: "At build time Next.js runs getStaticProps for each page. Fetches data generates static HTML and JSON. Client downloads pre-built HTML instantly. For client-side navigation Next.js fetches JSON data for fast page transitions.",
beginnerExample: "// pages/blog/[slug].tsx\nexport async function getStaticPaths() {\n  const posts = await fetch(\"https://api.example.com/posts\").then(r => r.json());\n  const paths = posts.map(post => ({ params: { slug: post.slug } }));\n  return { paths, fallback: false };\n}\n\nexport async function getStaticProps({ params }) {\n  const post = await fetch(`https://api.example.com/posts/${params.slug}`).then(r => r.json());\n  return { props: { post }, revalidate: 3600 };\n}\n\nexport default function BlogPost({ post }: { post: Post }) {\n  return <article><h1>{post.title}</h1><div>{post.content}</div></article>;\n}",
commonMistakes: "Using SSG for frequently changing data (use ISR or SSR) generating too many static pages (long build times) not using fallback for large sites missing error handling for failed data fetches.",
bestPractices: "Use SSG for marketing pages blogs documentation. Use fallback: true for large sites generating pages on demand. Combine with ISR for fresh content. Set revalidate for content updates without full rebuild.",
performanceNotes: "SSG delivers the fastest possible performance - HTML served from CDN edge. No server rendering cost. Pre-built pages scale infinitely. Build time increases with page count. Use incremental builds for large sites."
},
quiz: [
{
id: "react-ssg-1",
question: "When does SSG render pages?",
options: [
"At build time",
"On each request",
"On first visit",
"Never pre-renders",
],
correctIndex: 0,
explanation: "SSG generates static HTML at build time. Pages are pre-built before deployment.",
difficulty: "easy",
},
{
id: "react-ssg-2",
question: "What is getStaticPaths used for?",
options: [
"Define dynamic routes to pre-render",
"Fetch data for single page",
"Configure middleware",
"Set up API routes",
],
correctIndex: 0,
explanation: "getStaticPaths defines which dynamic paths should be pre-rendered at build time.",
difficulty: "medium",
},
{
id: "react-ssg-3",
question: "Trade-off of SSG vs SSR?",
options: [
"SSG faster to deliver but potentially stale content",
"SSR faster than SSG",
"SSG always better than SSR",
"SSR prevents SEO indexing",
],
correctIndex: 0,
explanation: "SSG is faster (static CDN) but content can become stale. SSR serves fresh content on every request.",
difficulty: "medium",
}
],
faangQuestions: [
{
question: "How does Incremental Static Regeneration (ISR) improve SSG?",
answer: "ISR combines SSG benefits with periodic updates. After initial build pages are served statically. When revalidate time expires next request triggers background regeneration while serving stale page. New visitors get fresh page without rebuild. ISR provides the speed of static with freshness of SSR.",
difficulty: "hard",
company: "Vercel",
},
{
question: "Compare SSG with SSR and CSR for an e-commerce product listing page.",
answer: "SSG: best for marketing pages and blog posts pre-built at deploy fast CDN delivery. SSR: best for product detail pages with real-time pricing/availability serves fresh data per request. CSR: best for dashboard and user-specific content where initial SEO not critical. Hybrid approach: SSG for product shell SSR for pricing component CSR for user reviews.",
difficulty: "hard",
company: "Meta",
}
],
codingChallenges: [
],
},
{
slug: "isr",
title: "ISR",
order: 3,
content: {
overview: "Incremental Static Regeneration (ISR) combines the speed of static with the freshness of dynamic. Pages are served statically but Next.js regenerates them in the background when traffic arrives after the revalidation period.",
problemStatement: "SSG is fast but content goes stale. SSR is fresh but slow. Developers needed a middle ground - serve cached static pages instantly but update them automatically when content changes.",
intuitionFirst: "ISR is like a bakery that bakes fresh bread every hour. When you buy bread at 10:30 you get the 10:00 batch (stale is fine). The baker starts the 11:00 batch (revalidation) for the next customer. You don't wait for fresh baking.",
howItWorks: "getStaticProps returns { revalidate: seconds }. On first request after revalidate time Next.js serves stale cached page and triggers background regeneration. When regenerated cache updates for subsequent requests. Regeneration does not block the response.",
beginnerExample: "export async function getStaticProps({ params }) {\n  const data = await fetch(`https://api.example.com/posts/${params.slug}`).then(r => r.json());\n  return {\n    props: { post: data },\n    revalidate: 60, // Regenerate at most once per 60 seconds\n  };\n}\n\n// On-demand revalidation (Next.js 12.1+)\n// POST /api/revalidate?secret=TOKEN\nexport default async function handler(req, res) {\n  if (req.query.secret !== process.env.REVALIDATION_TOKEN) return res.status(401).json({ message: \"Invalid token\" });\n  try {\n    await res.revalidate(\"/blog/\" + req.query.slug);\n    return res.json({ revalidated: true });\n  } catch (err) {\n    return res.status(500).send(\"Error revalidating\");\n  }\n}",
commonMistakes: "Setting revalidate too low (defeats caching 1 second means every request regenerates) too high (content stale too long) not implementing on-demand revalidation for immediate updates.",
bestPractices: "Set revalidate based on content freshness needs. Use on-demand revalidation for CMS content updates. Start with higher revalidate (300-3600s) and decrease if needed. Monitor regeneration times.",
performanceNotes: "Stale pages are served instantly from edge cache. Regeneration runs as background function. Frequent regeneration increases server load. On-demand revalidation is instant avoids waiting for time-based expiry."
},
quiz: [
{
id: "react-isr-1",
question: "What does revalidate in getStaticProps do?",
options: [
"Seconds until background regeneration",
"Minutes between builds",
"Cache duration for CDN",
"Time before page deletion",
],
correctIndex: 0,
explanation: "revalidate sets the number of seconds after which a page can be regenerated in the background.",
difficulty: "easy",
},
{
id: "react-isr-2",
question: "Does ISR block the response while regenerating?",
options: [
"No serves stale page then regenerates",
"Yes blocks until regenerated",
"Only on first request",
"Depends on configuration",
],
correctIndex: 0,
explanation: "ISR serves the stale cached page immediately and triggers background regeneration.",
difficulty: "medium",
},
{
id: "react-isr-3",
question: "When would you use on-demand revalidation?",
options: [
"When content updated via CMS",
"Every fixed interval",
"On every page visit",
"Never needed",
],
correctIndex: 0,
explanation: "On-demand revalidation triggers immediate regeneration when content changes (e.g., webhook from CMS).",
difficulty: "medium",
}
],
faangQuestions: [
{
question: "Compare ISR with SSG and SSR for a news website.",
answer: "ISR ideal: news articles change periodically. SSG too stale SSR too slow. With ISR set revalidate: 60 for breaking news feeds higher (300+) for evergreen content. Use on-demand revalidation via CMS webhook for instant updates on major stories. Landing page ISR with sections having different revalidate times: headlines (30s) features (3600s) sports (300s).",
difficulty: "hard",
company: "Vercel",
},
{
question: "How does ISR interact with CDN caching and what headers does Next.js set?",
answer: "Next.js sets Cache-Control: s-maxage=REVALIDATE_VALUE stale-while-revalidate on CDN. CDN caches HTML for revalidate seconds. After expiry CDN serves stale content while requesting regeneration. Next.js assigns unique cache keys per page. On successful regeneration purge cache key. On-demand revalidation sends purge request to CDN for specific paths.",
difficulty: "hard",
company: "Google",
}
],
codingChallenges: [
],
},
{
slug: "api-routes",
title: "API Routes",
order: 4,
content: {
overview: "Next.js API Routes let you build your backend API within the same project. Files in pages/api (Pages Router) or route handlers in app/api (App Router) become serverless functions handling requests.",
problemStatement: "Full-stack apps need a backend API. Managing a separate backend server adds complexity. API Routes provide serverless endpoints co-located with frontend code reducing setup and deployment overhead.",
intuitionFirst: "API Routes are like having a kitchen in your restaurant instead of ordering from a separate catering service. You cook (process requests) in the same building (project) serving meals (API responses) to your tables (frontend).",
howItWorks: "Files in pages/api/*.ts export a handler function (req res). Next.js maps file path to API endpoint. Handlers run as serverless functions. Support all HTTP methods. Built-in middleware for parsing body CORS rate limiting.",
beginnerExample: "// pages/api/users.ts (Pages Router)\nimport type { NextApiRequest, NextApiResponse } from \"next\";\n\nexport default async function handler(req: NextApiRequest, res: NextApiResponse) {\n  if (req.method === \"GET\") {\n    const users = await db.users.findMany();\n    return res.status(200).json(users);\n  }\n  if (req.method === \"POST\") {\n    const user = await db.users.create({ data: req.body });\n    return res.status(201).json(user);\n  }\n  return res.status(405).json({ message: \"Method not allowed\" });\n}\n\n// App Router equivalent\n// app/api/users/route.ts\nexport async function GET() {\n  const users = await db.users.findMany();\n  return Response.json(users);\n}\n\nexport async function POST(request: Request) {\n  const body = await request.json();\n  const user = await db.users.create({ data: body });\n  return Response.json(user, { status: 201 });\n}",
commonMistakes: "Putting heavy computation in API Routes (serverless timeouts) not handling CORS for external requests not validating input not returning proper status codes.",
bestPractices: "Validate request body with Zod. Return appropriate HTTP status codes. Handle CORS for external clients. Use middleware for auth logging. Keep functions lightweight for serverless limits.",
performanceNotes: "API Routes run as serverless functions may have cold starts. Minimize dependencies. Use edge runtime for lower latency. Consider connection pooling for database connections."
},
quiz: [
{
id: "react-api-1",
question: "Where are API Routes defined in Next.js Pages Router?",
options: [
"pages/api directory",
"api directory in root",
"routes directory",
"server directory",
],
correctIndex: 0,
explanation: "API Route files are placed in pages/api/ directory.",
difficulty: "easy",
},
{
id: "react-api-2",
question: "What does an API Route handler function receive?",
options: [
"req (NextApiRequest) and res (NextApiResponse)",
"Only request body",
"Express app instance",
"Socket connection",
],
correctIndex: 0,
explanation: "Handler receives NextApiRequest and NextApiResponse objects.",
difficulty: "easy",
},
{
id: "react-api-3",
question: "How do App Router API routes differ from Pages Router?",
options: [
"Use Web Request/Response API",
"Use Express-style req/res",
"Same as Pages Router",
"Only support GET",
],
correctIndex: 0,
explanation: "App Router uses standard Web API Request/Response instead of Next.js specific req/res.",
difficulty: "medium",
}
],
faangQuestions: [
{
question: "How would you implement middleware for authentication across multiple API Routes?",
answer: "Create higher-order function: withAuth(handler) that checks JWT from Authorization header before calling handler. Apply to routes: export default withAuth(myHandler). Or use Next.js Middleware (middleware.ts) for path-based auth. For App Router use route.ts export config with middleware pattern. Store auth logic in shared lib/auth.ts.",
difficulty: "hard",
company: "Meta",
},
{
question: "Compare Next.js API Routes with a separate Express/Fastify backend.",
answer: "API Routes: co-located with frontend same deployment simpler setup serverless by default automatic API route splitting. Separate backend: more control over middleware more scalable for complex APIs easier to test independently can use different tech stacks. Choose API Routes for simple CRUD proxying webhooks and small APIs. Choose separate backend for complex business logic heavy computation or microservices architecture.",
difficulty: "hard",
company: "Google",
}
],
codingChallenges: [
],
},
{
slug: "middleware",
title: "Middleware",
order: 5,
content: {
overview: "Next.js Middleware runs code before a request completes. It executes on every request allowing you to modify the response based on conditions like authentication redirect geolocation or A/B testing.",
problemStatement: "Before Middleware authentication redirects and request modifications required per-route code duplication or complex server configuration. Needed centralized request-time logic that runs before route handlers.",
intuitionFirst: "Middleware is like airport security before boarding gates. Everyone passes through security (middleware) before reaching their specific gate (route). You can redirect people without boarding passes (unauthenticated) or add stamps (headers).",
howItWorks: "middleware.ts file at project root exports a config with matcher and a default function receiving NextRequest. Executes for every matching route. Can redirect rewrite add headers or continue to next handler.",
beginnerExample: "// middleware.ts\nexport function middleware(request: NextRequest) {\n  const token = request.cookies.get(\"token\")?.value;\n  const isAuthPage = request.nextUrl.pathname.startsWith(\"/login\");\n\n  if (!token && !isAuthPage) {\n    return NextResponse.redirect(new URL(\"/login\", request.url));\n  }\n\n  if (token && isAuthPage) {\n    return NextResponse.redirect(new URL(\"/dashboard\", request.url));\n  }\n\n  return NextResponse.next();\n}\n\nexport const config = {\n  matcher: [\"/((?!api|_next/static|favicon.ico).*)\"],\n};\n\n// Add custom headers\nfunction middleware(request: NextRequest) {\n  const requestHeaders = new Headers(request.headers);\n  requestHeaders.set(\"x-custom-header\", \"value\");\n\n  const response = NextResponse.next({ request: { headers: requestHeaders } });\n  response.headers.set(\"x-response-header\", \"value\");\n  return response;\n}",
commonMistakes: "Putting heavy computation in middleware (runs on every request) not using matcher (affects all routes) accessing response body (stream already consumed) making external API calls in middleware (adds latency to every route).",
bestPractices: "Use matcher to limit middleware to specific paths. Keep logic lightweight. Use for auth checks redirects header manipulation A/B testing geolocation. Avoid heavy computation and external API calls.",
performanceNotes: "Middleware runs on every request for matched paths. Edge Runtime is fast but has limitations (no Node.js APIs). Keep middleware logic minimal to avoid adding latency to all routes."
},
quiz: [
{
id: "react-mw-1",
question: "Where is Next.js Middleware defined?",
options: [
"middleware.ts at project root",
"middleware directory",
"app/middleware.ts",
"pages/middleware.ts",
],
correctIndex: 0,
explanation: "Middleware is defined in a single middleware.ts file at the root of your Next.js project.",
difficulty: "easy",
},
{
id: "react-mw-2",
question: "When does middleware execute?",
options: [
"Before every matching route request",
"After route handler",
"Only on page load",
"Only on API calls",
],
correctIndex: 0,
explanation: "Middleware executes before the request reaches the matched route handler.",
difficulty: "medium",
},
{
id: "react-mw-3",
question: "What is the purpose of the matcher config?",
options: [
"Limit which paths middleware runs on",
"Match URL patterns for data fetching",
"Configure CORS origins",
"Set up rate limiting",
],
correctIndex: 0,
explanation: "Matcher config limits middleware execution to specific paths improving performance by skipping irrelevant routes.",
difficulty: "medium",
}
],
faangQuestions: [
{
question: "Design a middleware-based authentication system for Next.js with role-based redirects.",
answer: "Middleware: 1) Extract JWT from cookie/header 2) Verify token and extract user claims 3) Check path against required roles 4) If no token redirect to /login 5) If wrong role redirect to /unauthorized 6) Set user header for downstream handlers. Use matcher to exclude public paths (login API static files). Edge runtime for speed but verify JWT with Edge-compatible library.",
difficulty: "hard",
company: "Vercel",
},
{
question: "Compare Next.js Middleware with traditional Express middleware. What are the key differences?",
answer: "Next.js Middleware: Edge runtime only limited Node.js APIs runs before routing cannot modify response body designed for redirect rewrite headers. Express middleware: full Node.js access runs during request handling can modify body/response rich ecosystem. Next.js Middleware is for edge cases (auth redirect A/B testing) not for business logic. Express middleware can handle full request/response lifecycle.",
difficulty: "hard",
company: "Meta",
}
],
codingChallenges: [
],
},
],
},
]
}