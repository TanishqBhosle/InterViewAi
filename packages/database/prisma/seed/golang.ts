import type { SubjectData } from "./types";

export const golangSubject: SubjectData = {
  slug: "golang",
  title: "Golang",
  description: "Go (Golang) is a statically typed, compiled programming language designed at Google for building scalable, concurrent systems.",
  icon: "Terminal",
  color: "text-sky-500",
  order: 5,
  topics: [
    {
      slug: "basics",
      title: "Basics",
      description: "Fundamental building blocks of the Go programming language.",
      order: 1,
      subtopics: [
        {
          slug: "variables",
          title: "Variables",
          order: 1,
          content: {
            overview: "Variables in Go are statically typed and can be declared using var or := syntax. Go initializes all variables to their zero value if not explicitly assigned.",
            problemStatement: "Developers transitioning from dynamically typed languages often struggle with Go's strict typing, zero values, and the compiler error for unused variables.",
            intuitionFirst: "Think of variables as labeled boxes: each box has a fixed size (type), and you can only put items that fit. Go prevents mismatches at compile time.",
            realLifeAnalogy: "Parking spots with size labels (compact, SUV). Each spot expects a specific vehicle size. Empty spots still exist (zero value) until you park.",
            howItWorks: "var x int declares x with zero value 0. var x = 5 infers type. := is shorthand inside functions. Package-level vars use var. Underscore _ discards values.",
            beginnerExample: `package main

import "fmt"

func main() {
    var name string = "Alice"
    fmt.Println(name)

    var age = 30
    fmt.Println(age)

    city := "New York"
    fmt.Println(city)

    var count int
    var active bool
    var msg string
    fmt.Println(count, active, msg)

    var x, y int = 10, 20
    a, b := "hello", true
    fmt.Println(x, y, a, b)
}`,
            commonMistakes: "Using := outside function bodies (compile error). Declaring variables without using them (compile error). Variable shadowing in nested scopes.",
            bestPractices: "Short names for local vars (i, j, err). var for zero values and package level. := for initialization inside functions. Avoid shadowing with unique names.",
            performanceNotes: "Go compiler optimizes local variable allocation; non-escaping values stay on stack.",
            interviewPerspective: "Zero values, short declaration rules, variable shadowing, new() vs make().",
            industryScenario: "Package-level var blocks for configuration constants. Quick := inside HTTP handlers.",
          },
          quiz: [
            { id: "gv1", question: "What is the zero value of int in Go?", options: ["nil", "0", "undefined", "null"], correctIndex: 1, explanation: "Numeric types have zero value 0. nil is for pointers, slices, maps, channels, and interfaces.", difficulty: "easy" },
            { id: "gv2", question: "Which declaration is INVALID in Go?", options: ["var x = 5", "x := 5", "x := 5 at package level", "var x int = 5"], correctIndex: 2, explanation: "Short declaration := only works inside function bodies, not at package level.", difficulty: "easy" },
            { id: "gv3", question: "What happens if you declare a variable and never use it?", options: ["Warning", "Compile error", "Zero value assigned", "Ignored"], correctIndex: 1, explanation: "Go requires every declared variable to be read at least once. Unused variables cause a compile error.", difficulty: "easy" },
          ],
          codingChallenges: [
            {
              title: "Variable Swap",
              description: "Write a function that swaps two integers using Go's multiple return values.",
              difficulty: "easy",
              starterCode: `package main

import "fmt"

func Swap(a, b int) (int, int) {
    return a, b
}

func main() {
    x, y := 10, 20
    x, y = Swap(x, y)
    fmt.Println(x, y)
}`,
              solutionHint: "Go supports multiple return values: return b, a",
            },
          ],
          faangQuestions: [
            { question: "Why does Go have zero values instead of leaving variables uninitialized?", answer: "Zero values prevent undefined behavior by ensuring every variable has a predictable initial state. This eliminates an entire class of memory safety bugs common in C/C++.", difficulty: "medium", company: "Google" },
            { question: "Explain variable shadowing in Go and how to avoid bugs.", answer: "Shadowing occurs when an inner scope declares a variable with the same name as an outer one. The inner declaration hides the outer variable. Use tools like go vet to detect shadowing and use unique names to avoid confusion.", difficulty: "medium", company: "Uber" },
          ],
        },
        {
          slug: "data-types",
          title: "Data Types",
          order: 2,
          content: {
            overview: "Go is a statically typed language with built-in types: numeric (int, float64, byte, rune), string, bool, and composite types (array, slice, struct, map).",
            problemStatement: "Choosing the wrong type leads to overflow, memory waste, or precision loss. Understanding type sizes and conversion rules is critical.",
            intuitionFirst: "Types are like measurement units: int8 is a teaspoon, int64 is a gallon. The compiler prevents mixing units without explicit conversion.",
            realLifeAnalogy: "Containers: shot glass (int8, 8 bits), coffee mug (int32), water bucket (int64). You cannot pour a bucket into a shot glass without spilling (overflow).",
            howItWorks: "Go has explicit type conversion (no implicit conversions). int and int32 are distinct types. byte = uint8, rune = int32. String is immutable sequence of bytes.",
            beginnerExample: `package main

import (
    "fmt"
    "math"
)

func main() {
    var i int = 42
    var f float64 = 3.14
    var b byte = 255
    var r rune = 'A'

    var converted = float64(i)
    fmt.Println(converted)

    var small int8 = 127
    small++
    fmt.Println(small)

    var s string = "Hello, 世界"
    fmt.Println(len(s))

    fmt.Println(math.MaxInt64)
}`,
            commonMistakes: "Assuming implicit conversion (must use type()). Mixing int and int32 in arithmetic. Confusing byte length vs rune count in strings.",
            bestPractices: "Use int for general purpose. Use specific sizes for protocol compatibility. Use float64 for floats. Use rune for Unicode code points.",
            performanceNotes: "int is platform-dependent (32 or 64 bit). Smaller types may not improve performance due to alignment.",
            interviewPerspective: "Type sizes, overflow behavior, rune vs byte, no implicit conversion rationale.",
            industryScenario: "Protocol parsing uses exact-size types (int32/int64). Character processing uses rune. DB IDs use int64.",
          },
          quiz: [
            { id: "gdt1", question: "What is the result of int8(127) + 1 in Go?", options: ["128", "Compile error", "-128", "Panic"], correctIndex: 2, explanation: "int8 max is 127. Overflow wraps to -128 in signed integers.", difficulty: "medium" },
            { id: "gdt2", question: "What is byte an alias for in Go?", options: ["int8", "uint8", "int32", "uint16"], correctIndex: 1, explanation: "byte is an alias for uint8, representing a single byte.", difficulty: "easy" },
            { id: "gdt3", question: "How to convert int to float64 in Go?", options: ["auto conversion", "float64(i)", "i.(float64)", "float64 i"], correctIndex: 1, explanation: "Go requires explicit type conversion using type(value).", difficulty: "easy" },
          ],
          codingChallenges: [
            {
              title: "Safe Type Conversion",
              description: "Write a function that safely converts int64 to int32, returning an error on overflow.",
              difficulty: "medium",
              starterCode: `package main

import (
    "errors"
    "fmt"
    "math"
)

func SafeToInt32(n int64) (int32, error) {
    if n > math.MaxInt32 || n < math.MinInt32 {
        return 0, errors.New("overflow")
    }
    return int32(n), nil
}

func main() {
    val, err := SafeToInt32(2147483648)
    fmt.Println(val, err)
}`,
              solutionHint: "Check against math.MaxInt32 and math.MinInt32 before converting.",
            },
          ],
          faangQuestions: [
            { question: "Why does Go lack implicit type conversion?", answer: "Go prioritizes readability and correctness. Implicit conversions hide bugs (precision loss, overflow) and make code harder to reason about. Explicit conversions make developer intent clear.", difficulty: "medium", company: "Google" },
            { question: "Explain rune vs byte in Go.", answer: "byte = uint8 (a single byte, ASCII). rune = int32 (a Unicode code point). A rune can be multiple bytes (emoji = 4 bytes). Use rune for Unicode text, byte for raw data.", difficulty: "medium", company: "Uber" },
          ],
        },
        {
          slug: "control-flow",
          title: "Control Flow",
          order: 3,
          content: {
            overview: "Go control flow includes if-else, for loops (no while), switch with automatic break, and defer for cleanup. No parentheses around conditions, braces required.",
            problemStatement: "Developers from C-family languages expect parentheses and while. Go omits ceremony and forces explicit braces.",
            intuitionFirst: "Go strips ceremony: no parens around conditions, no while (for is enough), switch auto-breaks. Minimal and explicit.",
            realLifeAnalogy: "Recipe: if-else checks ingredients, for loop repeats steps, defer is cleanup after cooking (close oven, wash dishes).",
            howItWorks: "if condition { } (no parens, braces required). for init; cond; post { }. for cond { } acts like while. for { } infinite. switch auto-breaks. defer pushes to stack, runs at return.",
            beginnerExample: `package main

import (
    "fmt"
    "time"
)

func main() {
    if score := 85; score >= 90 {
        fmt.Println("A")
    } else if score >= 80 {
        fmt.Println("B")
    } else {
        fmt.Println("C")
    }

    count := 0
    for count < 3 {
        fmt.Println(count)
        count++
    }

    for {
        count++
        if count > 5 {
            break
        }
    }

    t := time.Now()
    switch {
    case t.Hour() < 12:
        fmt.Println("Morning")
    case t.Hour() < 18:
        fmt.Println("Afternoon")
    default:
        fmt.Println("Evening")
    }

    defer fmt.Println("World")
    fmt.Println("Hello")
}`,
            commonMistakes: "Parentheses around conditions (unnecessary). Forgetting fallthrough (use fallthrough keyword). Misunderstanding defer argument evaluation (arguments evaluated immediately).",
            bestPractices: "Use init statement in if for scoped vars. Prefer for range. Use switch with no expression for complex conditions. Defer in pairs (open/close).",
            performanceNotes: "Defer has small overhead. Avoid defer in hot paths. Switch on constants compiled to jump table.",
            interviewPerspective: "Defer LIFO behavior, argument evaluation timing. For-range loop variable reuse pre-1.22. Switch fallthrough.",
            industryScenario: "HTTP handlers use if-err pattern. Defer ubiquitous for closing files, unlocking mutexes, closing connections.",
          },
          quiz: [
            { id: "gcf1", question: "Output of: defer fmt.Print(1); defer fmt.Print(2); fmt.Print(3)?", options: ["123", "321", "132", "231"], correctIndex: 1, explanation: "Defer uses LIFO stack. 3 prints immediately, then 2, then 1.", difficulty: "medium" },
            { id: "gcf2", question: "Does Go require parentheses around if conditions?", options: ["Yes", "No", "Only complex expressions", "Depends on version"], correctIndex: 1, explanation: "No parentheses needed around conditions. Braces are required.", difficulty: "easy" },
            { id: "gcf3", question: "How to write a while loop in Go?", options: ["while condition {}", "for condition {}", "loop condition {}", "repeat {} until"], correctIndex: 1, explanation: "Go has no while keyword. Use for with a single condition.", difficulty: "easy" },
          ],
          codingChallenges: [
            {
              title: "FizzBuzz",
              description: "Print numbers 1-100, replacing multiples of 3 with Fizz, 5 with Buzz, both with FizzBuzz.",
              difficulty: "easy",
              starterCode: `package main

import "fmt"

func main() {
    for i := 1; i <= 100; i++ {
        switch {
        case i%15 == 0:
            fmt.Println("FizzBuzz")
        case i%3 == 0:
            fmt.Println("Fizz")
        case i%5 == 0:
            fmt.Println("Buzz")
        default:
            fmt.Println(i)
        }
    }
}`,
              solutionHint: "Check i%15 first for FizzBuzz, then i%3, then i%5.",
            },
          ],
          faangQuestions: [
            { question: "Explain defer execution order and argument evaluation timing.", answer: "Deferred functions execute in LIFO order when the surrounding function returns. Arguments are evaluated immediately at the defer statement, not when the deferred function runs. This is critical for loop variables and resource management.", difficulty: "hard", company: "Google" },
            { question: "How does Go switch differ from C switch?", answer: "Go switch auto-breaks after each case (no fallthrough by default). Switch can have no expression (clean if-else chain). Cases can have multiple values. Switch value can be any comparable type, not just integers.", difficulty: "medium", company: "Uber" },
          ],
        },
        {
          slug: "functions",
          title: "Functions",
          order: 4,
          content: {
            overview: "Go functions support multiple return values, named returns, variadic params, first-class functions, closures, and generics (Go 1.18+).",
            problemStatement: "Understanding Go's unique function semantics: multiple returns for errors, named returns, closure capture, and generics.",
            intuitionFirst: "Functions are recipes: inputs (parameters), outputs (returns). Closures are workers with memory of their tools (captured variables).",
            realLifeAnalogy: "Math function f(x,y) = (a,b) takes inputs, produces multiple outputs. Closure is a chef who remembers their secret recipe (captured variable).",
            howItWorks: "func add(a, b int) int { }. Multiple returns: func div(a, b int) (int, error). Named returns: func sum(nums ...int) (total int). Variadic: nums ...int becomes slice. Functions are values: var fn func(int) int.",
            beginnerExample: `package main

import "fmt"

func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("division by zero")
    }
    return a / b, nil
}

func split(sum int) (x, y int) {
    x = sum * 4 / 9
    y = sum - x
    return
}

func sum(nums ...int) int {
    total := 0
    for _, n := range nums {
        total += n
    }
    return total
}

func counter() func() int {
    count := 0
    return func() int {
        count++
        return count
    }
}

func main() {
    result, err := divide(10, 3)
    if err != nil {
        fmt.Println(err)
    }
    fmt.Println(result)

    a, b := split(100)
    fmt.Println(a, b)

    fmt.Println(sum(1, 2, 3, 4, 5))

    c := counter()
    fmt.Println(c())
    fmt.Println(c())
    fmt.Println(c())
}`,
            commonMistakes: "Named returns with naked return incorrectly. Forgetting to handle error returns. Passing nil function (panic). Variadic not placed last.",
            bestPractices: "Use (result, error) pattern. Named returns for docs. Defer for paired resource ops. Prefer explicit return in complex functions.",
            performanceNotes: "Function calls inlined when profitable. Closure capture may cause heap allocation.",
            interviewPerspective: "Named vs unnamed returns, closure capture semantics, variadic expansion, function type compatibility.",
            industryScenario: "Error handling with (result, error) pattern. HTTP handlers, DB operations, file I/O follow this pattern.",
          },
          quiz: [
            { id: "gfn1", question: "What is a naked return in Go?", options: ["return with no value", "return without function name", "return without args for named returns", "return that panics"], correctIndex: 2, explanation: "Naked return returns the current values of named return variables without specifying them.", difficulty: "medium" },
            { id: "gfn2", question: "Can you call a nil function in Go?", options: ["Yes, returns zero", "No, panics", "Yes, does nothing", "Compile error"], correctIndex: 1, explanation: "Calling a nil function causes runtime panic. Always check before calling.", difficulty: "medium" },
            { id: "gfn3", question: "Where must variadic parameters be placed?", options: ["First parameter", "Last parameter", "Anywhere", "Cannot be mixed"], correctIndex: 1, explanation: "Variadic parameters must be the last parameter. They become a slice inside the function.", difficulty: "easy" },
          ],
          codingChallenges: [
            {
              title: "Generic Map",
              description: "Write a generic Map function that applies a function to each element of a slice (Go 1.18+).",
              difficulty: "medium",
              starterCode: `package main

import "fmt"

func Map[T any](items []T, fn func(T) T) []T {
    result := make([]T, len(items))
    for i, item := range items {
        result[i] = fn(item)
    }
    return result
}

func main() {
    nums := []int{1, 2, 3, 4, 5}
    doubled := Map(nums, func(n int) int { return n * 2 })
    fmt.Println(doubled)
}`,
              solutionHint: "Use generics (Go 1.18+): func Map[T any](items []T, fn func(T) T) []T",
            },
          ],
          faangQuestions: [
            { question: "How do closures work in Go and what are the memory implications?", answer: "Closures capture outer variables by reference, not value. If the closure outlives the enclosing function, captured variables escape to heap. This caused the famous loop variable capture bug (fixed in Go 1.22). Always be aware of closure lifetimes.", difficulty: "hard", company: "Google" },
            { question: "When to use named return values vs unnamed?", answer: "Named returns document intent and enable naked returns. Good for short functions. Unnamed returns preferred for longer functions or when naked returns reduce readability. Named returns appear in GoDoc, aiding API documentation.", difficulty: "medium", company: "Uber" },
          ],
        },
        {
          slug: "pointers",
          title: "Pointers",
          order: 5,
          content: {
            overview: "Go pointers hold memory addresses. Unlike C, Go forbids pointer arithmetic. & takes address, * dereferences. Zero value is nil. new(T) returns *T.",
            problemStatement: "Developers from Java/Python struggle with value vs pointer semantics. Nil pointer dereference causes panics.",
            intuitionFirst: "Pointer = signpost pointing to a house (value). & gives the address, * lets you enter and change what is inside.",
            realLifeAnalogy: "Home address (pointer) lets you find and modify the house (value). Multiple people with same address all see the same house.",
            howItWorks: "var p *int declares integer pointer. p = &x gets x address. *p = 42 changes x. Zero value nil. new(T) allocates and returns *T. No pointer arithmetic.",
            beginnerExample: `package main

import "fmt"

func zeroValue(val int) {
    val = 0
}

func zeroPointer(ptr *int) {
    *ptr = 0
}

func main() {
    x := 42
    zeroValue(x)
    fmt.Println(x)

    zeroPointer(&x)
    fmt.Println(x)

    y := 10
    p := &y
    pp := &p
    fmt.Println(**pp)
    **pp = 20
    fmt.Println(y)

    var ptr *int
    if ptr != nil {
        fmt.Println(*ptr)
    }
}`,
            commonMistakes: "Nil pointer dereference (panic). Returning pointer to local var (Go escapes to heap automatically, which is OK). Confusing *int (type) vs *ptr (dereference).",
            bestPractices: "Use pointers for mutation and large structs. Avoid deep pointer chains. Check nil before dereference. Value receivers for small types.",
            performanceNotes: "Pointers cause escape analysis to allocate on heap. Passing large structs by pointer avoids copy.",
            interviewPerspective: "Escape analysis, nil safety, value vs pointer receivers. Compare with C pointers.",
            industryScenario: "Method receivers use pointers for mutation. Large config structs passed as pointers. DB models use pointer fields for nullable values.",
          },
          quiz: [
            { id: "gpt1", question: "What is the zero value of a pointer in Go?", options: ["0", "nil", "undefined", "empty address"], correctIndex: 1, explanation: "The zero value of any pointer type is nil.", difficulty: "easy" },
            { id: "gpt2", question: "Can you perform arithmetic on Go pointers?", options: ["Yes, like C", "No, Go forbids it", "Only with unsafe.Pointer", "Only for arrays"], correctIndex: 1, explanation: "Go does not support pointer arithmetic for safety reasons.", difficulty: "easy" },
            { id: "gpt3", question: "What does new(int) return?", options: ["int", "*int", "int with value 0", "nil"], correctIndex: 1, explanation: "new(T) allocates zeroed memory and returns *T.", difficulty: "easy" },
          ],
          codingChallenges: [
            {
              title: "Linked List Insert",
              description: "Implement insert at head in a linked list using pointer to pointer (**Node).",
              difficulty: "hard",
              starterCode: `package main

import "fmt"

type Node struct {
    Val  int
    Next *Node
}

func Insert(head **Node, val int) {
    node := &Node{Val: val, Next: *head}
    *head = node
}

func main() {
    var head *Node
    Insert(&head, 3)
    Insert(&head, 2)
    Insert(&head, 1)

    for curr := head; curr != nil; curr = curr.Next {
        fmt.Println(curr.Val)
    }
}`,
              solutionHint: "Use **Node (pointer to pointer) to modify the head from within the function.",
            },
          ],
          faangQuestions: [
            { question: "Explain Go escape analysis and how it decides heap vs stack allocation.", answer: "Escape analysis determines whether a value can be stack-allocated or must escape to heap. If a pointer to a local variable is returned or stored globally, the variable escapes. Use go build -gcflags=-m to see decisions. Stack allocation is faster, heap allocation adds GC pressure.", difficulty: "hard", company: "Google" },
            { question: "Value receiver vs pointer receiver in Go methods?", answer: "Value receiver copies the struct (no mutation of original, safe for concurrent use). Pointer receiver can mutate original and avoids copying. Be consistent: if any method needs pointer receiver, use it for all. Large structs should use pointer receiver for performance.", difficulty: "medium", company: "Uber" },
          ],
        },
        {
          slug: "structs",
          title: "Structs",
          order: 6,
          content: {
            overview: "Structs group related fields. Go supports embedding (composition over inheritance), tags for metadata, and methods via receiver functions.",
            problemStatement: "Understanding embedding vs inheritance, struct tags for serialization, zero-value structs, and method sets.",
            intuitionFirst: "Struct = form with fields. Embedding = stapling one form inside another. Tags = sticky notes (JSON name, validation rules).",
            realLifeAnalogy: "Passport application: personal info struct, address struct embedded. You get all fields of the embedded struct directly.",
            howItWorks: "type Person struct { Name string; Age int }. Fields via dot. Embedding: type Employee struct { Person; Salary float64 }. Tags: json:\"name\" validate:\"required\". Methods defined separately with receiver.",
            beginnerExample: `package main

import (
    "encoding/json"
    "fmt"
)

type Person struct {
    Name string \`json:"name"\`
    Age  int    \`json:"age"\`
}

type Employee struct {
    Person
    Salary float64 \`json:"salary"\`
    Title  string  \`json:"title"\`
}

func (p Person) Greet() string {
    return fmt.Sprintf("Hi, I am %s", p.Name)
}

func (e *Employee) Raise(amount float64) {
    e.Salary += amount
}

func main() {
    e := Employee{
        Person: Person{Name: "Alice", Age: 30},
        Salary: 100000,
        Title:  "Engineer",
    }
    fmt.Println(e.Name)
    fmt.Println(e.Greet())
    e.Raise(15000)
    fmt.Println(e.Salary)
    data, _ := json.Marshal(e)
    fmt.Println(string(data))
}`,
            commonMistakes: "Forgetting commas in multi-line struct literals. Confusing embedding with inheritance (no method override). Tags not compile-time checked.",
            bestPractices: "Use embedding for is-a relationships. Consistent tags. Pointer receivers for mutation. Focused structs (single responsibility).",
            performanceNotes: "Large structs passed by pointer to avoid copy. Struct size = fields + padding for alignment.",
            interviewPerspective: "Embedding vs inheritance, method promotion, struct tags, zero-value struct, memory layout.",
            industryScenario: "JSON API models use tagged structs. DB models use tags for column mapping. Domain models embed shared fields (timestamps, IDs).",
          },
          quiz: [
            { id: "gst1", question: "Does Go support classical inheritance?", options: ["Yes, via extends", "No, only composition via embedding", "Yes, via interface inheritance", "Via generics"], correctIndex: 1, explanation: "Go uses composition over inheritance. Embedding promotes fields/methods but is not inheritance.", difficulty: "easy" },
            { id: "gst2", question: "When are struct tags evaluated?", options: ["Compile time", "Runtime via reflection", "By the parser", "During linking"], correctIndex: 1, explanation: "Tags are string literals stored in the type, accessed at runtime via the reflect package.", difficulty: "medium" },
            { id: "gst3", question: "Can an embedded struct's methods be called on the outer struct?", options: ["Yes, they are promoted", "No, must use embedded field", "Only if explicitly delegated", "Depends on visibility"], correctIndex: 0, explanation: "Methods of an embedded struct are promoted to the outer struct's method set.", difficulty: "medium" },
          ],
          codingChallenges: [
            {
              title: "JSON Transformer",
              description: "Write a function that unmarshals JSON into a struct, modifies a field, and re-marshals it.",
              difficulty: "medium",
              starterCode: `package main

import (
    "encoding/json"
    "fmt"
)

type Config struct {
    Host string \`json:"host"\`
    Port int    \`json:"port"\`
}

func UpdatePort(data []byte, newPort int) ([]byte, error) {
    var cfg Config
    if err := json.Unmarshal(data, &cfg); err != nil {
        return nil, err
    }
    cfg.Port = newPort
    return json.Marshal(cfg)
}

func main() {
    data := []byte(\`{"host":"localhost","port":8080}\`)
    result, _ := UpdatePort(data, 9090)
    fmt.Println(string(result))
}`,
              solutionHint: "Unmarshal into struct, modify field, marshal back.",
            },
          ],
          faangQuestions: [
            { question: "How does Go achieve composition over inheritance via struct embedding?", answer: "Go embeds structs anonymously, promoting their fields and methods to the outer struct. This enables code reuse without deep inheritance hierarchies. The outer struct cannot override methods like OOP - resolution is at compile time based on receiver type.", difficulty: "hard", company: "Google" },
            { question: "How would you implement polymorphic behavior in Go?", answer: "Use interfaces for polymorphism. Types satisfy interfaces implicitly. For different behaviors, implement the same interface on multiple types. This is structural/duck typing - if it implements the methods, it satisfies the interface.", difficulty: "hard", company: "Uber" },
          ],
        },
        {
          slug: "maps-and-slices",
          title: "Maps and Slices",
          order: 7,
          content: {
            overview: "Slices are dynamically-sized arrays with pointer, length, and capacity. Maps are hash tables mapping keys to values. Both are reference types.",
            problemStatement: "Developers confuse slices with arrays, forget maps return zero values for missing keys, and misuse append causing unexpected sharing.",
            intuitionFirst: "Slice = window into an array (ptr, len, cap). Map = phonebook: look up name, get number, or zero if not there.",
            realLifeAnalogy: "Conveyor belt with sections (slice). Dictionary (map): look up word, get definition; missing word returns empty string.",
            howItWorks: "make([]int, len, cap) creates slice. append grows it. slice[low:high] for sub-slice (shares backing array). Map: make(map[string]int). m[key] returns (value, ok). delete(m, key). Maps not safe for concurrent writes.",
            beginnerExample: `package main

import "fmt"

func main() {
    nums := []int{1, 2, 3, 4, 5}
    fmt.Println(len(nums), cap(nums))

    nums = append(nums, 6)
    fmt.Println(nums)

    sub := nums[1:4]
    sub[0] = 99
    fmt.Println(nums)

    ages := make(map[string]int)
    ages["Alice"] = 30
    ages["Bob"] = 25
    fmt.Println(ages["Alice"])

    age, ok := ages["Charlie"]
    fmt.Println(age, ok)

    delete(ages, "Bob")

    for name, age := range ages {
        fmt.Println(name, age)
    }
}`,
            commonMistakes: "Append ignoring return value. Slice aliasing causes unintended mutations. Nil vs empty slice confusion. Map concurrent read/write panic. Reading nil map (returns zero, no panic).",
            bestPractices: "Always use append result. Pre-allocate with make. Use comma-ok for map access. sync.Map for concurrent access. Copy slices when sharing is unwanted.",
            performanceNotes: "Append may reallocate (doubles capacity). Map access O(1) amortized. Map iteration order randomized.",
            interviewPerspective: "Slice internals (ptr, len, cap). Map hash collisions. Nil vs empty slice. Slice expression bounds.",
            industryScenario: "Slices everywhere for lists. Maps for lookups, caches, counters. JSON unmarshal uses slices and maps.",
          },
          quiz: [
            { id: "gms1", question: "What happens accessing a missing map key?", options: ["Panic", "Returns zero value", "Returns nil", "Compile error"], correctIndex: 1, explanation: "Returns the zero value for the value type. Use comma-ok to check presence.", difficulty: "easy" },
            { id: "gms2", question: "What is the zero value of a slice?", options: ["Empty slice", "nil", "make([]int, 0)", "Panic"], correctIndex: 1, explanation: "The zero value of a slice type is nil. nil slice has len/cap 0.", difficulty: "easy" },
            { id: "gms3", question: "Can you append to a nil slice?", options: ["No, panics", "Yes, works fine", "Compile error", "No, returns nil"], correctIndex: 1, explanation: "append works on nil slices, allocating a new backing array on first append.", difficulty: "medium" },
          ],
          codingChallenges: [
            {
              title: "Word Count",
              description: "Write a function counting word frequencies in a string using a map.",
              difficulty: "easy",
              starterCode: `package main

import (
    "fmt"
    "strings"
)

func WordCount(s string) map[string]int {
    counts := make(map[string]int)
    for _, word := range strings.Fields(s) {
        counts[word]++
    }
    return counts
}

func main() {
    s := "the quick brown fox jumps over the lazy dog"
    for word, count := range WordCount(s) {
        fmt.Printf("%s: %d\n", word, count)
    }
}`,
              solutionHint: "Use strings.Fields to split. Increment map value directly.",
            },
          ],
          faangQuestions: [
            { question: "Explain Go slice internal representation and how append works.", answer: "Slice is a struct of {ptr to array, length, capacity}. Append checks if len < cap: writes at index len, increments len. If full, allocates new array (usually 2x capacity), copies elements, then appends. append returns a new slice because backing array may change. Sharing the backing array between slices causes subtle bugs.", difficulty: "hard", company: "Google" },
            { question: "How to implement a concurrent-safe map in Go?", answer: "Options: 1) sync.RWMutex + regular map (common). 2) sync.Map (optimized for write-once/read-many). 3) Sharded map (multiple mutexes, reduces contention). 4) Channel-based manager goroutine. sync.Map is best when keys written once and read many times, or disjoint key sets.", difficulty: "hard", company: "Uber" },
          ],
        },
      ],
    },
    {
      slug: "advanced",
      title: "Advanced",
      description: "Intermediate to advanced Go concepts including interfaces, error handling, testing, packaging, and JSON handling.",
      order: 2,
      subtopics: [
        {
          slug: "interfaces",
          title: "Interfaces",
          order: 1,
          content: {
            overview: "Go interfaces define behavior via method sets. Satisfaction is implicit (structural/duck typing). Interfaces enable polymorphism, testing with mocks, and decoupling.",
            problemStatement: "Developers from Java/C# expect explicit implements. Understanding empty interface (any), type assertions, and nil interface trap is critical.",
            intuitionFirst: "Interface = contract: \"if you can do this, you are this.\" A bird that quacks like a duck is a Duck. No need to declare it explicitly.",
            realLifeAnalogy: "USB port is an interface. Any device following the USB protocol (keyboard, mouse, drive) connects. The port only cares about the protocol, not the device internals.",
            howItWorks: "type Writer interface { Write(p []byte) (n int, err error) }. Any type with Write method satisfies it. Interface values store (type, value). Type assertion: val.(ConcreteType) or val.(InterfaceType). any = interface{}.",
            beginnerExample: `package main

import "fmt"

type Shape interface {
    Area() float64
    Perimeter() float64
}

type Circle struct{ Radius float64 }

func (c Circle) Area() float64      { return 3.14 * c.Radius * c.Radius }
func (c Circle) Perimeter() float64 { return 2 * 3.14 * c.Radius }

type Rectangle struct{ Width, Height float64 }

func (r Rectangle) Area() float64      { return r.Width * r.Height }
func (r Rectangle) Perimeter() float64 { return 2 * (r.Width + r.Height) }

func PrintShape(s Shape) {
    fmt.Printf("Area: %.2f, Perim: %.2f\n", s.Area(), s.Perimeter())
}

func main() {
    c := Circle{Radius: 5}
    r := Rectangle{Width: 3, Height: 4}
    PrintShape(c)
    PrintShape(r)

    circle, ok := c.(Circle)
    fmt.Println(circle, ok)

    var anything any = "hello"
    str, ok := anything.(string)
    fmt.Println(str, ok)
}`,
            commonMistakes: "Nil interface vs nil pointer inside interface. Type assertion without comma-ok (panics). Interface pollution (defining before needed).",
            bestPractices: "Accept interfaces, return concrete types. Define interfaces on consumer side. Keep interfaces small (1-2 methods). Use any (Go 1.18+).",
            performanceNotes: "Interface method call has dynamic dispatch overhead (cannot inline). Large interface values cause allocation.",
            interviewPerspective: "Implicit satisfaction, nil interface trap, type assertions, empty interface, dynamic dispatch.",
            industryScenario: "io.Reader/Writer everywhere. net/http Handler. Database drivers implement driver interfaces.",
          },
          quiz: [
            { id: "gint1", question: "Can a type satisfy multiple interfaces?", options: ["No", "Yes, if it implements all methods", "Only with explicit declaration", "Only for empty interfaces"], correctIndex: 1, explanation: "A type implicitly satisfies every interface whose methods it implements.", difficulty: "easy" },
            { id: "gint2", question: "What does a nil interface value contain?", options: ["Nil type and nil value", "Some type and nil value", "Nil type and some value", "Panic on comparison"], correctIndex: 0, explanation: "A nil interface has both type and value nil. Different from interface holding a nil pointer.", difficulty: "hard" },
            { id: "gint3", question: "How to safely extract concrete value from interface?", options: ["val.(Type)", "val, ok := val.(Type)", "val.(type)", "interface{val}"], correctIndex: 1, explanation: "Use comma-ok type assertion to avoid panic on type mismatch.", difficulty: "easy" },
          ],
          codingChallenges: [
            {
              title: "Sort Interface",
              description: "Implement sort.Interface for a custom Person type and sort by age.",
              difficulty: "medium",
              starterCode: `package main

import (
    "fmt"
    "sort"
)

type Person struct {
    Name string
    Age  int
}

type ByAge []Person

func (a ByAge) Len() int           { return len(a) }
func (a ByAge) Less(i, j int) bool { return a[i].Age < a[j].Age }
func (a ByAge) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }

func main() {
    people := []Person{
        {"Alice", 30},
        {"Bob", 25},
        {"Charlie", 35},
    }
    sort.Sort(ByAge(people))
    fmt.Println(people)
}`,
              solutionHint: "Define ByAge type and implement Len, Less, Swap methods.",
            },
          ],
          faangQuestions: [
            { question: "Explain 'nil interface' vs 'interface containing nil pointer' distinction.", answer: "Nil interface: both type and value nil (var w io.Writer -> w == nil is true). Interface with nil pointer: type non-nil, value nil (var buf *bytes.Buffer; var w io.Writer = buf -> w == nil is false!). Returning nil *MyError as error produces non-nil error interface, a common bug.", difficulty: "hard", company: "Google" },
            { question: "Why does Go use implicit interface satisfaction?", answer: "Implicit satisfaction (structural typing) enables duck typing at compile time with static safety. It allows packages to define interfaces satisfied by types in other packages without import cycles, enabling the io.Reader/Writer pattern without coupling.", difficulty: "medium", company: "Uber" },
          ],
        },
        {
          slug: "error-handling",
          title: "Error Handling",
          order: 2,
          content: {
            overview: "Go treats errors as values returned from functions, not thrown. Error interface has Error() string. Go 1.13+ added errors.Is, errors.As, and %w wrapping.",
            problemStatement: "Developers from try-catch find explicit handling verbose. Ignoring errors leads to silent failures. Distinguishing error types needs special care.",
            intuitionFirst: "Errors are just return values. Check them immediately. The err != nil pattern forces you to consider failure at every step.",
            realLifeAnalogy: "Vending machine: insert money, either get drink (success) or get money back with error message (failure). You always check the result.",
            howItWorks: "Functions return (result, error). Check err != nil. Sentinel errors = package-level vars (io.EOF). Custom errors implement Error(). Wrap: fmt.Errorf(%w, err). errors.Is checks sentinel chain. errors.As checks type chain.",
            beginnerExample: `package main

import (
    "errors"
    "fmt"
)

var ErrNotFound = errors.New("not found")

type ValidationError struct {
    Field string
    Value any
    Msg   string
}

func (e ValidationError) Error() string {
    return fmt.Sprintf("%s=%v: %s", e.Field, e.Value, e.Msg)
}

func findUser(id int) (string, error) {
    if id <= 0 {
        return "", ValidationError{"id", id, "must be positive"}
    }
    if id == 1 {
        return "Alice", nil
    }
    return "", ErrNotFound
}

func main() {
    result, err := findUser(1)
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Println("User:", result)
    }

    _, err = findUser(99)
    if errors.Is(err, ErrNotFound) {
        fmt.Println("Creating user...")
    }

    _, err = findUser(-5)
    var valErr ValidationError
    if errors.As(err, &valErr) {
        fmt.Printf("Field %s: %s\n", valErr.Field, valErr.Msg)
    }
}`,
            commonMistakes: "Ignoring errors with _. Returning nil error interface with non-nil pointer (non-nil error despite no failure). Not wrapping errors with context.",
            bestPractices: "Always check errors. Use fmt.Errorf(%w) for context. Sentinel errors for package checks. Custom error types for extra context. Panic only for truly exceptional conditions.",
            performanceNotes: "Error values are values. Custom error types with pointer receiver avoid copying.",
            interviewPerspective: "Error vs exception philosophy, error wrapping, errors.Is vs errors.As, panic/recover usage.",
            industryScenario: "database/sql returns errors. HTTP handlers write error responses. API clients wrap errors with operation context.",
          },
          quiz: [
            { id: "gerr1", question: "What does the error interface require?", options: ["Error() string", "String() string", "Error() error", "Err() string"], correctIndex: 0, explanation: "error interface has a single method: Error() string.", difficulty: "easy" },
            { id: "gerr2", question: "How to check if error is a specific sentinel?", options: ["err == sentinel", "errors.Is(err, sentinel)", "errors.As(err, &sentinel)", "sentinel.Is(err)"], correctIndex: 1, explanation: "errors.Is walks the error chain checking for a match.", difficulty: "medium" },
            { id: "gerr3", question: "Should you panic or return error for invalid input?", options: ["Panic", "Return error", "Both are fine", "Ignore"], correctIndex: 1, explanation: "Panic is for exceptional conditions. Invalid input should return an error.", difficulty: "easy" },
          ],
          codingChallenges: [
            {
              title: "Retry with Backoff",
              description: "Implement retry with exponential backoff for temporary errors.",
              difficulty: "hard",
              starterCode: `package main

import (
    "errors"
    "fmt"
    "time"
)

var ErrTemporary = errors.New("temporary error")

func Retry(attempts int, sleep time.Duration, fn func() error) error {
    var err error
    for i := 0; i < attempts; i++ {
        err = fn()
        if err == nil {
            return nil
        }
        if !errors.Is(err, ErrTemporary) {
            return err
        }
        time.Sleep(sleep)
        sleep *= 2
    }
    return fmt.Errorf("after %d attempts: %w", attempts, err)
}

func main() {
    attempt := 0
    err := Retry(3, 100*time.Millisecond, func() error {
        attempt++
        if attempt < 3 {
            return ErrTemporary
        }
        return nil
    })
    fmt.Println(err)
}`,
              solutionHint: "Double sleep duration each retry. Only retry on temporary errors.",
            },
          ],
          faangQuestions: [
            { question: "Explain Go's philosophy of errors as values vs exceptions.", answer: "Go treats errors as ordinary return values, forcing explicit handling. This makes control flow transparent and errors visible in the code. Critics say it is verbose, proponents argue it improves reliability and code reviewability by eliminating hidden exception paths.", difficulty: "hard", company: "Google" },
            { question: "How does error wrapping work with errors.Is and errors.As?", answer: "fmt.Errorf(%w, err) wraps errors. errors.Is walks the Unwrap chain calling Is then == comparisons. errors.As walks the chain calling As then type assertion. Custom types can implement Unwrap(). errors.Join (Go 1.20) wraps multiple errors.", difficulty: "medium", company: "Uber" },
          ],
        },
        {
          slug: "packages-and-modules",
          title: "Packages and Modules",
          order: 3,
          content: {
            overview: "Go code organized into packages and modules. Module = project with go.mod. Package = directory of related .go files. Exported names start with capital letter.",
            problemStatement: "Organizing code with correct import paths, avoiding circular dependencies, managing module versions.",
            intuitionFirst: "Module = project, Package = directory of files. Import = path from module root. Capital letter = public, lowercase = private.",
            realLifeAnalogy: "Library building (module) with rooms (packages). Public signs (exported names) visible from other rooms. Private docs (unexported) only for room occupants.",
            howItWorks: "go mod init creates go.mod. package declaration at file top. Import: import \"module/package\". Exported = capital letter. internal/ packages restricted to parent module. init funcs run on import.",
            beginnerExample: `package main

import (
    "fmt"
    "math/rand"
)

func init() {
    fmt.Println("main package initialized")
}

func main() {
    fmt.Println("Random:", rand.Intn(100))
}`,
            commonMistakes: "Circular imports (compile error). Package name != directory name. Unused imports (compile error). Relative imports not allowed.",
            bestPractices: "Short lowercase package names. Avoid util/common. Single purpose packages. internal/ for private code. Import aliases when needed.",
            performanceNotes: "Import cycles prevented at compile time. Unused imports are compile errors.",
            interviewPerspective: "Circular imports, internal restriction, init order, package naming.",
            industryScenario: "Microservices each are modules. Shared libs separate modules with version tags. DB drivers use blank import.",
          },
          quiz: [
            { id: "gpkg1", question: "What makes a Go name exported?", options: ["Lowercase first letter", "Uppercase first letter", "export keyword", "public keyword"], correctIndex: 1, explanation: "Capital first letter = exported. Lowercase = package-private.", difficulty: "easy" },
            { id: "gpkg2", question: "What happens with circular imports?", options: ["Runtime panic", "Compile error", "Warning", "Works fine"], correctIndex: 1, explanation: "Go compiler detects and rejects circular imports at compile time.", difficulty: "easy" },
            { id: "gpkg3", question: "What does internal/ package restriction do?", options: ["Cannot be imported", "Only importable by root module", "Only for stdlib", "Deprecated"], correctIndex: 1, explanation: "internal/ packages only importable by the module root and its subdirectories.", difficulty: "medium" },
          ],
          codingChallenges: [
            {
              title: "Multi-Package Module",
              description: "Create a module with two packages where one registers something via init.",
              difficulty: "medium",
              starterCode: `package main

import (
    "fmt"
    "yourmodule/formatter"
)

func main() {
    fmt.Println(formatter.Format("hello"))
}`,
              solutionHint: "Create a formatter package with exported Format function.",
            },
          ],
          faangQuestions: [
            { question: "How does Go modules' Minimal Version Selection (MVS) work?", answer: "MVS uses the minimum version of each dependency that satisfies all requirements. If A requires v1.0 and B requires v1.2, Go uses v1.2. This is deterministic and solves the diamond dependency problem without complex conflict resolution.", difficulty: "hard", company: "Google" },
            { question: "Explain init function order in Go package initialization.", answer: "Init runs after variable declarations and imported package initialization. Order: imported packages depth-first, then current package. Multiple inits in a file run source-order. Inits run once per package. They execute before main.main().", difficulty: "medium", company: "Uber" },
          ],
        },
        {
          slug: "testing",
          title: "Testing",
          order: 4,
          content: {
            overview: "Go has built-in testing with testing package: unit tests, benchmarks, fuzzing, table-driven tests. Files end with _test.go. Funcs start with Test/Benchmark/Fuzz.",
            problemStatement: "Writing effective tests: table-driven pattern, subtests, test helpers, mocking with interfaces, benchmarking.",
            intuitionFirst: "Tests are first-class: built-in toolchain. Table-driven tests are the Go idiom - slice of test cases iterated in a loop.",
            realLifeAnalogy: "Quality inspection line: each product (function) goes through stations (test cases). Report shows passes/fails.",
            howItWorks: "go test runs *_test.go files. t *testing.T has Error/Fail/Log/Fatal. go test -bench for benchmarks. go test -fuzz for fuzzing. TestMain for setup/teardown.",
            beginnerExample: "// calculator.go\npackage calculator\n\nfunc Add(a, b int) int { return a + b }\n\n// calculator_test.go\npackage calculator\n\nimport \"testing\"\n\nfunc TestAdd(t *testing.T) {\n    result := Add(2, 3)\n    if result != 5 {\n        t.Errorf(\"Add(2,3) = %d; want 5\", result)\n    }\n}\n\ntype divTest struct {\n    name string\n    a, b int\n    want int\n    err  bool\n}\n\nfunc TestDivide(t *testing.T) {\n    tests := []divTest{\n        {\"positive\", 10, 2, 5, false},\n        {\"by zero\", 5, 0, 0, true},\n    }\n    for _, tt := range tests {\n        t.Run(tt.name, func(t *testing.T) {\n            got, err := Divide(tt.a, tt.b)\n            if (err != nil) != tt.err || got != tt.want {\n                t.Errorf(\"got %d, err %v\", got, err)\n            }\n        })\n    }\n}\n\nfunc BenchmarkAdd(b *testing.B) {\n    for i := 0; i < b.N; i++ {\n        Add(1, 2)\n    }\n}",
            commonMistakes: "Not using t.Run subtests. Using t.Fatal in goroutines (use t.Error). Not resetting bench timer. Ignoring -race flag.",
            bestPractices: "Table-driven tests. t.Cleanup for teardown. Run go test -race in CI. t.Helper() for test helpers. Golden files for complex output.",
            performanceNotes: "go test -bench enables profiling. Test caching skips unchanged tests. Build tags for integration tests.",
            interviewPerspective: "Table-driven tests, subtests, mocking with interfaces, Race Detector, test coverage.",
            industryScenario: "CI runs go test -race ./.... Integration tests with build tags. Mocks via mockgen/counterfeiter.",
          },
          quiz: [
            { id: "gtst1", question: "How to run only specific tests?", options: ["go test TestName", "go test -run TestName", "go test -test TestName", "go run test"], correctIndex: 1, explanation: "go test -run accepts a regex to match test function names.", difficulty: "medium" },
            { id: "gtst2", question: "Benchmark function signature?", options: ["func BenchmarkXxx()", "func BenchmarkXxx(t *testing.T)", "func BenchmarkXxx(b *testing.B)", "func BenchmarkXxx(b *testing.T)"], correctIndex: 2, explanation: "Benchmarks take *testing.B. Use b.N for the loop count.", difficulty: "easy" },
            { id: "gtst3", question: "What does t.Helper() do?", options: ["Marks test helper for better stack traces", "Provides helper library", "Creates helper process", "Logs helper info"], correctIndex: 0, explanation: "t.Helper() marks the calling function as a helper, showing caller line on failure.", difficulty: "medium" },
          ],
          codingChallenges: [
            {
              title: "Test HTTP Handler",
              description: "Write a table-driven test for an HTTP handler using httptest.",
              difficulty: "hard",
              starterCode: `package main

import (
    "net/http"
    "net/http/httptest"
    "testing"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
    w.Write([]byte("hello"))
}

func TestHelloHandler(t *testing.T) {
    tests := []struct {
        name string
        path string
        want string
    }{
        {"root", "/", "hello"},
    }
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            req := httptest.NewRequest("GET", tt.path, nil)
            rec := httptest.NewRecorder()
            helloHandler(rec, req)
            if rec.Body.String() != tt.want {
                t.Errorf("got %q, want %q", rec.Body.String(), tt.want)
            }
        })
    }
}`,
              solutionHint: "Use httptest.NewRecorder and httptest.NewRequest with table-driven pattern.",
            },
          ],
          faangQuestions: [
            { question: "How does the Go Race Detector work?", answer: "Uses ThreadSanitizer to instrument memory accesses at runtime. When -race flag is set, compiler adds instrumentation recording every memory access. If two goroutines access the same memory without synchronization (at least one write), it reports the race. Has ~5-10x overhead so used in testing.", difficulty: "hard", company: "Google" },
            { question: "How to mock external dependencies in Go tests?", answer: "Define interfaces for dependencies, implement mock types in tests. Use gomock/testify for generation. For HTTP: httptest.NewServer. For DB: in-memory SQLite or repository interfaces. Go's implicit interface satisfaction makes it easy to define narrow interfaces for testing.", difficulty: "medium", company: "Uber" },
          ],
        },
        {
          slug: "json",
          title: "JSON",
          order: 5,
          content: {
            overview: "Go has built-in encoding/json for JSON serialization. Marshal/Unmarshal use struct tags. Supports streaming with Decoder/Encoder and deferred decoding with RawMessage.",
            problemStatement: "Handling optional fields, custom formats, large streams, nested structures. Need for custom MarshalJSON/UnmarshalJSON.",
            intuitionFirst: "Struct tags are translation notes for the JSON parser: rename fields, skip empty, omit when zero.",
            realLifeAnalogy: "Translator: JSON is a foreign language. Tags are translation notes - \"this field is called name in JSON, this one is optional.\"",
            howItWorks: "json.Marshal(v) returns []byte. json.Unmarshal(data, &v). Tags: json:\",omitempty\", json:\"-\", json:\"name,string\". Custom via MarshalJSON/UnmarshalJSON. json.RawMessage for deferred decode. json.Decoder/Encoder for streams.",
            beginnerExample: `package main

import (
    "encoding/json"
    "fmt"
)

type User struct {
    ID   int     \`json:"id"\`
    Name string  \`json:"name"\`
    Age  int     \`json:"age,omitempty"\`
}

func main() {
    u := User{ID: 1, Name: "Alice"}
    data, _ := json.MarshalIndent(u, "", "  ")
    fmt.Println(string(data))

    input := \`{"id":2,"name":"Bob"}\`
    var user User
    json.Unmarshal([]byte(input), &user)
    fmt.Printf("%+v\n", user)

    var raw map[string]any
    json.Unmarshal([]byte(input), &raw)
    fmt.Println(raw)
}`,
            commonMistakes: "Exported fields needed (reflect requires). Forgetting omitempty for optional fields. Using int for large numbers (overflow). Unmarshal into nil map.",
            bestPractices: "Explicit struct tags. Pre-allocate maps. Use RawMessage for dynamic fields. Use Decoder for large streams. Validate with json.Valid.",
            performanceNotes: "Marshal/Unmarshal use reflection. For hot paths: easyjson, ffjson. Decoder is streaming (low memory).",
            interviewPerspective: "JSON tags, custom marshal/unmarshal, streaming vs buffered, RawMessage, omitempty behavior.",
            industryScenario: "REST APIs, config files, Kafka messages all use JSON. WebSocket messages use JSON.",
          },
          quiz: [
            { id: "gjs1", question: "Default JSON field name without tag?", options: ["lowercase", "Go field name", "snake_case", "UPPERCASE"], correctIndex: 1, explanation: "Without json tag, the exported Go field name is used as-is.", difficulty: "easy" },
            { id: "gjs2", question: "What does json:\",omitempty\" do?", options: ["Omits zero values", "Omits empty fields only", "Omits field entirely", "Panics on empty"], correctIndex: 0, explanation: "omitempty omits the field if it is the zero value (empty string, 0, nil, false).", difficulty: "medium" },
            { id: "gjs3", question: "How to skip a field during JSON?", options: ["json:\"skip\"", "json:\"-\"", "json:\"ignore\"", "json:\"private\""], correctIndex: 1, explanation: "Tag json:\"-\" tells encoder/decoder to skip the field entirely.", difficulty: "easy" },
          ],
          codingChallenges: [
            {
              title: "Custom JSON Marshal",
              description: "Implement MarshalJSON that formats time as Unix timestamp.",
              difficulty: "medium",
              starterCode: `package main

import (
    "encoding/json"
    "fmt"
    "time"
)

type Event struct {
    Name string
    Time time.Time
}

func (e Event) MarshalJSON() ([]byte, error) {
    return json.Marshal(map[string]any{
        "name": e.Name,
        "time": e.Time.Unix(),
    })
}

func main() {
    e := Event{Name: "meeting", Time: time.Now()}
    data, _ := json.Marshal(e)
    fmt.Println(string(data))
}`,
              solutionHint: "Implement MarshalJSON on your type returning a custom map.",
            },
          ],
          faangQuestions: [
            { question: "How to handle dynamic JSON with unknown fields?", answer: "Use map[string]any for fully dynamic. Use json.RawMessage for deferred decode. For partially known: struct with map for extras. Use json.Decoder Token API for streaming unknown structures. Go 1.24+ json:\",any\" for struct fields accepting any type.", difficulty: "hard", company: "Google" },
            { question: "Performance characteristics of encoding/json and optimizations?", answer: "encoding/json uses reflection (slower than generated code). Optimizations: easyjson/ffjson (code gen, no reflection), manual Marshal with bytes.Buffer, streaming with Decoder (avoids large allocs), Pooling structs reduces GC pressure.", difficulty: "hard", company: "Uber" },
          ],
        },
      ],
    },
    {
      slug: "concurrency",
      title: "Concurrency",
      description: "Go concurrency primitives: goroutines, channels, select, and synchronization primitives including WaitGroup, Mutex, and atomic operations.",
      order: 3,
      subtopics: [
        {
          slug: "goroutines",
          title: "Goroutines",
          order: 1,
          content: {
            overview: "Goroutines are lightweight threads managed by Go runtime. Created with go keyword. Dynamic stack (~4KB initial). M:N scheduling onto OS threads.",
            problemStatement: "Understanding goroutine lifecycle, scheduling model, avoiding leaks and race conditions in production systems.",
            intuitionFirst: "Workers in a factory. Go scheduler = foreman assigning workers to machines (OS threads). Thousands of workers share few machines.",
            realLifeAnalogy: "Restaurant kitchen: each chef (goroutine) works independently. Head chef (scheduler) assigns to stoves (OS threads), switches when waiting for ingredients (I/O).",
            howItWorks: "go fn() starts goroutine. Scheduler uses M:N threading (M goroutines on N OS threads). Goroutines block on channel ops, mutexes, syscalls. go statement returns immediately.",
            beginnerExample: `package main

import (
    "fmt"
    "time"
)

func say(s string) {
    for i := 0; i < 3; i++ {
        time.Sleep(100 * time.Millisecond)
        fmt.Println(s)
    }
}

func main() {
    go say("world")
    say("hello")

    go func() {
        fmt.Println("anonymous")
    }()

    time.Sleep(1 * time.Second)
}`,
            commonMistakes: "Goroutine leaks (started but never completes). Assuming goroutines finish before main exits (use WaitGroup). Shared mutable state without sync. Unhandled panics in goroutines.",
            bestPractices: "Always know when goroutines exit. Use errgroup for error propagation. Limit creation with worker pools. Use go vet.",
            performanceNotes: "Goroutines cheap but not free. ~4KB initial stack. Context switch overhead low. GOMAXPROCS controls OS threads.",
            interviewPerspective: "M:N scheduler, stack growth, goroutine vs OS thread, preemption, goroutine leaks.",
            industryScenario: "HTTP servers: goroutine per connection. Background workers. Stream processing pipelines.",
          },
          quiz: [
            { id: "ggor1", question: "Initial stack size of a goroutine?", options: ["1 MB", "4 KB", "64 KB", "8 KB"], correctIndex: 1, explanation: "Goroutines start with ~4KB stack (dynamic). OS threads ~1MB fixed.", difficulty: "medium" },
            { id: "ggor2", question: "How does Go scheduler map goroutines to threads?", options: ["1:1", "M:N", "N:1", "1:N"], correctIndex: 1, explanation: "Go uses M:N scheduling - M goroutines multiplexed onto N OS threads.", difficulty: "hard" },
            { id: "ggor3", question: "What happens when main() returns with running goroutines?", options: ["They continue", "Program exits", "Panic", "Paused"], correctIndex: 1, explanation: "When main() returns, the program exits immediately. Running goroutines terminate.", difficulty: "easy" },
          ],
          codingChallenges: [
            {
              title: "Graceful Shutdown",
              description: "Write a worker goroutine that stops cleanly via context cancellation.",
              difficulty: "hard",
              starterCode: `package main

import (
    "context"
    "fmt"
    "time"
)

func worker(ctx context.Context) {
    for {
        select {
        case <-ctx.Done():
            fmt.Println("Worker stopped")
            return
        default:
            fmt.Println("Working...")
            time.Sleep(100 * time.Millisecond)
        }
    }
}

func main() {
    ctx, cancel := context.WithCancel(context.Background())
    go worker(ctx)
    time.Sleep(300 * time.Millisecond)
    cancel()
    time.Sleep(100 * time.Millisecond)
}`,
              solutionHint: "Use ctx.Done() channel in select to detect cancellation.",
            },
          ],
          faangQuestions: [
            { question: "Explain Go M:N scheduler model (G, P, M).", answer: "Three entities: goroutines (G), logical processors (P = GOMAXPROCS), OS threads (M). Each P has run queue of Gs. Blocking syscall: P detaches from M, acquires new M. Go 1.14+ has async preemption via signal. Network I/O uses netpoller (epoll/kqueue).", difficulty: "hard", company: "Google" },
            { question: "How to prevent goroutine leaks in long-running servers?", answer: "1) Always have cancellation (context.Done(), close channel). 2) errgroup/WaitGroup to track completion. 3) Timeouts on operations. 4) Bounded goroutine pools. 5) Monitor via runtime.NumGoroutine(). 6) goleak in tests. 7) Every go statement needs termination path.", difficulty: "hard", company: "Uber" },
          ],
        },
        {
          slug: "channels",
          title: "Channels",
          order: 2,
          content: {
            overview: "Channels are typed conduits for goroutine communication. make(chan T) for unbuffered, make(chan T, N) for buffered. Send: ch <- v. Receive: v := <-ch. Close: close(ch).",
            problemStatement: "Channel blocking semantics, deadlocks, nil channel behavior, close protocol, and proper ownership patterns.",
            intuitionFirst: "Pipes connecting goroutines. Unbuffered = synchronous handoff. Buffered = mailbox. Closed = CLOSED sign, no new mail, drain remaining.",
            realLifeAnalogy: "Unbuffered: relay runner handoff - baton passes directly hand to hand. Buffered: mailbox - drop mail, pick up later. Closed: CLOSED sign.",
            howItWorks: "ch := make(chan int) (unbuffered). make(chan int, 5) (buffered). close(ch) marks closed. v, ok := <-ch (ok=false if closed empty). Range until closed. Send to closed = panic. Nil channel blocks forever.",
            beginnerExample: `package main

import "fmt"

func main() {
    ch := make(chan string)
    go func() { ch <- "ping" }()
    msg := <-ch
    fmt.Println(msg)

    buffered := make(chan int, 3)
    buffered <- 1; buffered <- 2; buffered <- 3
    fmt.Println(<-buffered)
    fmt.Println(<-buffered)
    fmt.Println(<-buffered)

    jobs := make(chan int, 5)
    go func() {
        for i := 1; i <= 3; i++ { jobs <- i }
        close(jobs)
    }()
    for job := range jobs {
        fmt.Println("Job:", job)
    }
}`,
            commonMistakes: "Send on closed channel (panic). Close channel that receives already read from. Goroutine blocked on full buffer. Deadlock from circular dependency.",
            bestPractices: "Sender closes, not receiver. Use range for iteration. Use select for non-blocking. Close to signal completion. Prefer buffered for pipelines.",
            performanceNotes: "Channels have lock overhead. Batch for high throughput. Unbuffered = more context switches.",
            interviewPerspective: "Blocking semantics, nil channel, close protocol, buffered vs unbuffered, fan-out/fan-in.",
            industryScenario: "Worker pools use job channels. Pipeline stages connected by channels. Event buses use channels.",
          },
          quiz: [
            { id: "gch1", question: "Receive from closed channel returns?", options: ["Panic", "Zero value, ok=false", "Blocks forever", "nil"], correctIndex: 1, explanation: "Returns zero value with ok=false after draining remaining values.", difficulty: "medium" },
            { id: "gch2", question: "Send on nil channel does what?", options: ["Panic", "Blocks forever", "Returns immediately", "Sends zero"], correctIndex: 1, explanation: "Nil channel blocks forever. Used in select to disable cases.", difficulty: "hard" },
            { id: "gch3", question: "Who should close a channel?", options: ["Receiver", "Sender", "Both", "Neither"], correctIndex: 1, explanation: "Sender closes. Receiver should not close. Multiple senders need coordination.", difficulty: "easy" },
          ],
          codingChallenges: [
            {
              title: "Pipeline",
              description: "Build a three-stage pipeline: generate numbers, square them, print results.",
              difficulty: "medium",
              starterCode: `package main

import "fmt"

func gen(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        for _, n := range nums { out <- n }
        close(out)
    }()
    return out
}

func sq(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        for n := range in { out <- n * n }
        close(out)
    }()
    return out
}

func main() {
    for n := range sq(gen(1, 2, 3, 4, 5)) {
        fmt.Println(n)
    }
}`,
              solutionHint: "Each stage runs in its own goroutine, returns channel.",
            },
          ],
          faangQuestions: [
            { question: "Difference between buffered and unbuffered channels? When to use each?", answer: "Unbuffered: synchronizes sender and receiver (both must be ready). Used for handoff patterns and synchronization. Buffered: async until buffer full, decouples sender/receiver. Used for pipelines, worker pools, burst handling. Cap 1 = semaphore or rate limiter.", difficulty: "medium", company: "Google" },
            { question: "Explain the 'done channel' pattern for cancellation.", answer: "Done channel = struct{} channel signaling goroutines to stop. Parent closes it, children select on it. Closing broadcasts to all goroutines simultaneously. Foundation of context.Done(). Ensures clean shutdown without leaks.", difficulty: "hard", company: "Uber" },
          ],
        },
        {
          slug: "select",
          title: "Select",
          order: 3,
          content: {
            overview: "Select waits on multiple channel operations. Blocks until a case is ready. Random choice if multiple ready. Default makes it non-blocking.",
            problemStatement: "Handling multiple channels, timeouts, non-blocking operations, priority among channels.",
            intuitionFirst: "Switch for channels: which channel is ready? Listens to many, responds to the first ready one.",
            realLifeAnalogy: "Switchboard operator: multiple phone lines ring. Picks whichever rings first. Can ignore (default) if busy.",
            howItWorks: "select { case v := <-ch1: ... case ch2 <- v: ... default: ... }. No ready + no default = block. Multiple ready = pseudo-random. Nil channel never chosen.",
            beginnerExample: `package main

import (
    "fmt"
    "time"
)

func main() {
    ch1 := make(chan string)
    ch2 := make(chan string)

    go func() {
        time.Sleep(100 * time.Millisecond)
        ch1 <- "one"
    }()
    go func() {
        time.Sleep(200 * time.Millisecond)
        ch2 <- "two"
    }()

    select {
    case msg := <-ch1:
        fmt.Println("ch1:", msg)
    case msg := <-ch2:
        fmt.Println("ch2:", msg)
    case <-time.After(50 * time.Millisecond):
        fmt.Println("Timeout!")
    }

    select {
    case msg := <-ch1:
        fmt.Println(msg)
    default:
        fmt.Println("No message")
    }
}`,
            commonMistakes: "All nil channels = blocks forever. Forgetting default = blocking. time.After leak (timer not GCed until fired). Random selection confuses debug.",
            bestPractices: "Default for non-blocking. Nil channels to toggle cases. time.After for timeouts. for-select loop for continuous processing.",
            performanceNotes: "O(n) for n cases. Default avoids blocking. Nil case evaluated each iteration.",
            interviewPerspective: "Random selection, blocking vs non-blocking, timeouts, for-select patterns.",
            industryScenario: "Server handlers select on ctx.Done vs work channel. Rate limiters use select with tick.",
          },
          quiz: [
            { id: "gsel1", question: "Multiple ready cases in select - which runs?", options: ["First case", "Random choice", "Compiler error", "All execute"], correctIndex: 1, explanation: "When multiple cases are ready, Go selects one pseudo-randomly.", difficulty: "medium" },
            { id: "gsel2", question: "Nil channel in select does what?", options: ["Panics", "Never selected", "Always selected", "Compile error"], correctIndex: 1, explanation: "Nil channel case is never chosen. If all nil, select blocks forever.", difficulty: "hard" },
            { id: "gsel3", question: "How to make select non-blocking?", options: ["Use timeout", "Add default case", "Buffered channels", "Use context"], correctIndex: 1, explanation: "Default case makes select non-blocking - runs if no other ready.", difficulty: "easy" },
          ],
          codingChallenges: [
            {
              title: "Fan-in Multiplexer",
              description: "Merge multiple input channels into one output using select.",
              difficulty: "medium",
              starterCode: `package main

import "fmt"

func fanIn(ch1, ch2 <-chan string) <-chan string {
    out := make(chan string)
    go func() {
        for {
            select {
            case v := <-ch1:
                out <- v
            case v := <-ch2:
                out <- v
            }
        }
    }()
    return out
}

func main() {
    a := make(chan string)
    b := make(chan string)
    go func() { a <- "from a" }()
    go func() { b <- "from b" }()
    c := fanIn(a, b)
    fmt.Println(<-c)
    fmt.Println(<-c)
}`,
              solutionHint: "Use select in infinite goroutine reading from both inputs.",
            },
          ],
          faangQuestions: [
            { question: "How does select help implement or-done pattern for cancellation?", answer: "or-done merges a done channel into any readable channel. func orDone(done, c <-chan any) <-chan any { out := make(chan any); go func() { defer close(out); for { select { case <-done: return; case v, ok := <-c: if !ok { return; } ... } } }(); return out }. Enables cancellation of any channel-reading goroutine.", difficulty: "hard", company: "Google" },
            { question: "Explain time.After leak and how to avoid it.", answer: "time.After(d) creates a timer. In for-select loops, the timer is not GCed until it fires, causing memory accumulation. Fix: create time.Timer once with defer timer.Stop(), reuse with timer.Reset(d). This prevents leaks in long-running goroutines.", difficulty: "hard", company: "Uber" },
          ],
        },
        {
          slug: "waitgroups",
          title: "WaitGroups",
          order: 4,
          content: {
            overview: "sync.WaitGroup waits for goroutine completion. Add(delta) increments, Done() decrements, Wait() blocks until counter zero.",
            problemStatement: "Coordinating goroutines: ensuring all complete before proceeding, avoiding negative counter panics.",
            intuitionFirst: "Tally counter: Add workers, Done when finished, Wait until all are done.",
            realLifeAnalogy: "Teacher waiting for test completion: counts students (Add), each raises hand (Done), teacher waits until all hands up (Wait).",
            howItWorks: "var wg sync.WaitGroup. wg.Add(n) before goroutines. defer wg.Done() inside. wg.Wait() blocks until zero. Negative counter panics.",
            beginnerExample: `package main

import (
    "fmt"
    "sync"
    "time"
)

func worker(id int, wg *sync.WaitGroup) {
    defer wg.Done()
    fmt.Printf("Worker %d starting\n", id)
    time.Sleep(time.Second)
    fmt.Printf("Worker %d done\n", id)
}

func main() {
    var wg sync.WaitGroup
    for i := 1; i <= 3; i++ {
        wg.Add(1)
        go worker(i, &wg)
    }
    wg.Wait()
    fmt.Println("All done")
}`,
            commonMistakes: "Add inside goroutine (race with Wait). Done too many times (panic). Passing wg by value (copy). Forgetting Done (deadlock).",
            bestPractices: "Add before goroutine. defer Done(). Pass wg as pointer. Use errgroup for error propagation.",
            performanceNotes: "WaitGroup uses atomic operations. Low overhead.",
            interviewPerspective: "WaitGroup vs channels for coordination. errgroup for errors.",
            industryScenario: "Batch processing, server startup init, integration tests parallel setup.",
          },
          quiz: [
            { id: "gwg1", question: "What if Add is called inside goroutine?", options: ["Works fine", "Race with Wait", "Compile error", "Panic"], correctIndex: 1, explanation: "Wait may run before Add increments. Call Add before starting goroutines.", difficulty: "medium" },
            { id: "gwg2", question: "What if Done called more than Add?", options: ["Wait returns early", "Panic", "No effect", "Deadlock"], correctIndex: 1, explanation: "Negative counter panics.", difficulty: "easy" },
            { id: "gwg3", question: "Pass WaitGroup by value or pointer?", options: ["Value", "Pointer", "Both work", "Depends"], correctIndex: 1, explanation: "Pass by pointer. Value copies the WaitGroup, Done affects copy not original.", difficulty: "easy" },
          ],
          codingChallenges: [
            {
              title: "Parallel HTTP Fetcher",
              description: "Fetch multiple URLs concurrently with WaitGroup.",
              difficulty: "medium",
              starterCode: `package main

import (
    "fmt"
    "net/http"
    "sync"
)

func fetch(url string, wg *sync.WaitGroup, results chan<- string) {
    defer wg.Done()
    resp, err := http.Get(url)
    if err != nil {
        results <- fmt.Sprintf("%s: %v", url, err)
        return
    }
    resp.Body.Close()
    results <- fmt.Sprintf("%s: %d", url, resp.StatusCode)
}

func main() {
    urls := []string{"https://go.dev", "https://golang.org"}
    var wg sync.WaitGroup
    results := make(chan string, len(urls))
    for _, url := range urls {
        wg.Add(1)
        go fetch(url, &wg, results)
    }
    wg.Wait()
    close(results)
    for res := range results {
        fmt.Println(res)
    }
}`,
              solutionHint: "Buffered channel for results. Close after Wait.",
            },
          ],
          faangQuestions: [
            { question: "Compare WaitGroup vs errgroup for goroutine coordination.", answer: "WaitGroup: basic wait-for-all, no error propagation/cancellation. errgroup: extends WaitGroup with first-error propagation, context cancellation via child context, bounded goroutines via SetLimit. errgroup preferred for production where goroutines may fail and others should cancel.", difficulty: "hard", company: "Google" },
            { question: "How to implement semaphore with channels?", answer: "Use buffered channel: sem := make(chan struct{}, 5). Acquire: sem <- struct{}{}. Release: <-sem. This limits concurrency to 5. WaitGroup does not limit concurrency, it only waits for completion. errgroup.SetLimit provides similar functionality.", difficulty: "medium", company: "Uber" },
          ],
        },
        {
          slug: "mutex",
          title: "Mutex",
          order: 5,
          content: {
            overview: "sync.Mutex provides mutual exclusion. Lock/Unlock. sync.RWMutex allows multiple readers or exclusive writer. Must not be copied after first use.",
            problemStatement: "Data races, contention causing bottlenecks, deadlocks from incorrect lock ordering.",
            intuitionFirst: "Key to a locked room. Only one enters at a time. RWMutex: many can read, but write needs exclusive access.",
            realLifeAnalogy: "Public restroom: one person enters, locks (Lock), uses, unlocks (Unlock). Museum (RWMutex): many visitors read, one cleaner writes, visitors leave during cleaning.",
            howItWorks: "var mu sync.Mutex. mu.Lock(); defer mu.Unlock(). RWMutex: mu.RLock()/RUnlock() for readers. mu.Lock()/Unlock() for writers. Multiple concurrent RLock allowed. Lock blocks if any reader holds RLock or writer holds Lock.",
            beginnerExample: `package main

import (
    "fmt"
    "sync"
)

type Counter struct {
    mu    sync.Mutex
    value int
}

func (c *Counter) Increment() {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.value++
}

func main() {
    var wg sync.WaitGroup
    counter := Counter{}

    for i := 0; i < 1000; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            counter.Increment()
        }()
    }

    wg.Wait()
    fmt.Println("Count:", counter.value)
}`,
            commonMistakes: "Forgetting Unlock (deadlock). Copying mutex (copies state). Not using RWMutex for read-heavy. Lock ordering deadlocks.",
            bestPractices: "defer Unlock immediately after Lock. RWMutex for read-heavy. Keep critical sections small. Never copy mutex.",
            performanceNotes: "Contention is main perf issue. RWMutex slower than Mutex for writes. Profile to detect contention.",
            interviewPerspective: "Mutex vs channel sync, RWMutex trade-offs, deadlock prevention, lock-free alternatives.",
            industryScenario: "Cache uses RWMutex. Config uses Mutex. Connection pools use mutex.",
          },
          quiz: [
            { id: "gmut1", question: "Why not copy sync.Mutex?", options: ["Compile error", "Copied mutex shares original state", "Too slow", "Memory leak"], correctIndex: 1, explanation: "Copying a (possibly locked) mutex copies its state, causing unpredictable behavior.", difficulty: "medium" },
            { id: "gmut2", question: "How many goroutines can hold RLock simultaneously?", options: ["One", "Unlimited", "Unlimited if no Lock held", "None"], correctIndex: 2, explanation: "Multiple readers can hold RLock as long as no exclusive Lock is held.", difficulty: "easy" },
            { id: "gmut3", question: "Best practice to ensure Unlock is called?", options: ["Call at end", "defer Unlock after Lock", "Use recover", "Use channel"], correctIndex: 1, explanation: "defer Unlock right after Lock ensures it runs even on panic.", difficulty: "easy" },
          ],
          codingChallenges: [
            {
              title: "Thread-Safe Cache",
              description: "Implement a thread-safe in-memory cache with TTL using RWMutex.",
              difficulty: "hard",
              starterCode: `package main

import (
    "fmt"
    "sync"
    "time"
)

type Cache struct {
    mu    sync.RWMutex
    items map[string]item
}

type item struct {
    value     any
    expiresAt time.Time
}

func NewCache() *Cache {
    return &Cache{items: make(map[string]item)}
}

func (c *Cache) Get(key string) (any, bool) {
    c.mu.RLock()
    defer c.mu.RUnlock()
    it, ok := c.items[key]
    if !ok || time.Now().After(it.expiresAt) {
        return nil, false
    }
    return it.value, true
}

func (c *Cache) Set(key string, value any, ttl time.Duration) {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.items[key] = item{value, time.Now().Add(ttl)}
}

func main() {
    cache := NewCache()
    cache.Set("key1", "value1", time.Second)
    v, ok := cache.Get("key1")
    fmt.Println(v, ok)
}`,
              solutionHint: "RWMutex for concurrent reads. Store expiry. Check on Get.",
            },
          ],
          faangQuestions: [
            { question: "When to use sync.Mutex vs channels in Go?", answer: "Channels for passing ownership of data between goroutines (communication). Mutexes for protecting shared state accessed by goroutines. Proverb: \"Do not communicate by sharing memory; share memory by communicating.\" Channels for pipelines/fan-out, mutexes for caches/config/counters. Use simplest tool for the problem.", difficulty: "hard", company: "Google" },
            { question: "How to detect and debug mutex deadlocks in Go?", answer: "1) go vet detects some lock ordering. 2) -race for data races. 3) GOTRACEBACK=crash for goroutine stacks. 4) pprof: /debug/pprof/goroutine. 5) go-deadlock, goleak tools. 6) Consistent lock ordering. 7) defer to prevent unlock-skipping.", difficulty: "hard", company: "Uber" },
          ],
        },
        {
          slug: "atomic-operations",
          title: "Atomic Operations",
          order: 6,
          content: {
            overview: "sync/atomic provides low-level atomic memory ops: Add, CompareAndSwap, Load, Store, Swap. Go 1.19+ has ergonomic atomic types like atomic.Int64.",
            problemStatement: "Mutex overhead for simple counters or flags. Need for lock-free synchronization in hot paths.",
            intuitionFirst: "Hardware-level read-modify-write without interruption. Cash register: only one person adds money at a time, at hardware level.",
            realLifeAnalogy: "Vending machine coin counter: each coin atomically increments. Two people cannot insert coins simultaneously.",
            howItWorks: "atomic.AddInt64(&counter, 1) increments atomically. atomic.Load/Store for reads/writes. atomic.CompareAndSwap for conditional swap. Go 1.19+: var c atomic.Int64; c.Add(1).",
            beginnerExample: `package main

import (
    "fmt"
    "sync"
    "sync/atomic"
)

func main() {
    var counter int64
    var wg sync.WaitGroup

    for i := 0; i < 1000; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            atomic.AddInt64(&counter, 1)
        }()
    }
    wg.Wait()
    fmt.Println("Counter:", atomic.LoadInt64(&counter))

    var count atomic.Int64
    var wg2 sync.WaitGroup
    for i := 0; i < 1000; i++ {
        wg2.Add(1)
        go func() {
            defer wg2.Done()
            count.Add(1)
        }()
    }
    wg2.Wait()
    fmt.Println("Count:", count.Load())
}`,
            commonMistakes: "Using non-atomic ops for shared counters (data race). Forgetting memory ordering with Load/Store. Wrong integer size for the platform.",
            bestPractices: "Use atomic types for counters, flags, stats. Use CompareAndSwap for lock-free updates. Prefer atomic types (Go 1.19+) over functions.",
            performanceNotes: "Much faster than mutex for simple ops. Hardware-level CAS instructions. Avoid in tight loops with contention.",
            interviewPerspective: "Atomic vs mutex, CAS operations, ABA problem, memory ordering, lock-free data structures.",
            industryScenario: "Metrics/stats counters. Simple flags (shutdown, ready). Sequence generators. Lock-free data structures.",
          },
          quiz: [
            { id: "gat1", question: "Atomic operations are implemented at what level?", options: ["Go runtime", "Hardware instruction", "OS syscall", "Compiler built-in"], correctIndex: 1, explanation: "Atomic ops use hardware CPU instructions like CAS (Compare-and-Swap).", difficulty: "medium" },
            { id: "gat2", question: "What does atomic.CompareAndSwap do?", options: ["Compare and add", "Swap if current matches expected", "Atomic increment", "Load and store"], correctIndex: 1, explanation: "CAS atomically compares current value to expected, and swaps if they match.", difficulty: "medium" },
            { id: "gat3", question: "When to prefer atomic over Mutex?", options: ["Always", "Simple counters/flags", "Complex state", "Never"], correctIndex: 1, explanation: "Atomic for simple counters and flags. Mutex for complex state with multiple fields.", difficulty: "easy" },
          ],
          codingChallenges: [
            {
              title: "Lock-Free Counter",
              description: "Implement a thread-safe counter using only atomic operations.",
              difficulty: "medium",
              starterCode: `package main

import (
    "fmt"
    "sync"
    "sync/atomic"
)

type AtomicCounter struct {
    value atomic.Int64
}

func (c *AtomicCounter) Add(n int64) {
    c.value.Add(n)
}

func (c *AtomicCounter) Value() int64 {
    return c.value.Load()
}

func main() {
    var c AtomicCounter
    var wg sync.WaitGroup
    for i := 0; i < 100; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            c.Add(1)
        }()
    }
    wg.Wait()
    fmt.Println(c.Value())
}`,
              solutionHint: "Use atomic.Int64 or atomic.AddInt64 for lock-free counting.",
            },
          ],
          faangQuestions: [
            { question: "Compare atomic ops vs mutex for concurrent counters.", answer: "Atomic ops use CPU-level CAS instruction, much faster than mutex which involves OS scheduler. Atomic ~10-50ns, mutex ~50-500ns (contended). Atomic for single-word ops. Mutex for multi-field state or complex logic. Atomics avoid goroutine blocking (no context switch).", difficulty: "hard", company: "Google" },
            { question: "Explain the ABA problem in CAS operations.", answer: "ABA: thread reads value A, other threads change it to B then back to A. CAS sees A matches and swaps, but state changed in between. Mitigations: 1) Use version tags (pointer+stamp). 2) Use double-word CAS. 3) Use garbage collection (Go's GC prevents ABA on pointers as memory not reused same address).", difficulty: "hard", company: "Uber" },
          ],
        },
        {
          slug: "worker-pools",
          title: "Worker Pools",
          order: 7,
          content: {
            overview: "Worker pool pattern limits concurrent goroutines by sending jobs through a channel to a fixed number of worker goroutines. Controls resource usage and throughput.",
            problemStatement: "Unlimited goroutine creation exhausts memory and causes CPU thrashing. Need to bound concurrency for predictable performance.",
            intuitionFirst: "A team of N workers at a call center. Calls (jobs) come in, any available worker picks up. No worker available = call queues.",
            realLifeAnalogy: "Supermarket checkout: N cashiers (workers), queue of customers (jobs). Each cashier serves one customer at a time.",
            howItWorks: "Create job channel. Start N worker goroutines. Each worker loops receiving jobs from channel. Close channel to signal no more jobs. Use WatiGroup to track completion.",
            beginnerExample: `package main

import (
    "fmt"
    "sync"
    "time"
)

func worker(id int, jobs <-chan int, wg *sync.WaitGroup) {
    defer wg.Done()
    for job := range jobs {
        fmt.Printf("Worker %d processing job %d\n", id, job)
        time.Sleep(100 * time.Millisecond)
    }
}

func main() {
    const numWorkers = 3
    jobs := make(chan int, 10)
    var wg sync.WaitGroup

    for w := 1; w <= numWorkers; w++ {
        wg.Add(1)
        go worker(w, jobs, &wg)
    }

    for j := 1; j <= 9; j++ {
        jobs <- j
    }
    close(jobs)

    wg.Wait()
    fmt.Println("All jobs done")
}`,
            commonMistakes: "Not closing job channel (workers range forever, leak). Job channel too small causing backpressure. Workers not handling panics (crash whole pool).",
            bestPractices: "Buffered job channel for decoupling. Use WatiGroup to track workers. Graceful shutdown via context. Error collection via error channel or errgroup.",
            performanceNotes: "Worker count typically GOMAXPROCS or higher for I/O-bound. Channel backpressure provides natural back-pressure. Tune worker count via experimentation.",
            interviewPerspective: "Worker pool pattern, fan-out/fan-in, bounded concurrency, backpressure, graceful shutdown.",
            industryScenario: "HTTP request processing, file processing, image resizing, email sending all use worker pools for concurrency control.",
          },
          quiz: [
            { id: "gwp1", question: "How to signal workers no more jobs?", options: ["Send nil", "Close channel", "Use sentinel value", "Cancel context"], correctIndex: 1, explanation: "Closing the job channel causes range loop in workers to exit.", difficulty: "easy" },
            { id: "gwp2", question: "Worker pool ideal size for CPU-bound work?", options: ["1", "GOMAXPROCS", "100", "As many as possible"], correctIndex: 1, explanation: "For CPU-bound, GOMAXPROCS workers. For I/O-bound, higher count.", difficulty: "medium" },
            { id: "gwp3", question: "What is natural backpressure in channel-based worker pool?", options: ["Full channel blocks sender", "Dropping jobs", "Returning errors", "Pool panic"], correctIndex: 0, explanation: "When job channel is full, sending blocks, applying backpressure to producers.", difficulty: "medium" },
          ],
          codingChallenges: [
            {
              title: "Worker Pool with Results",
              description: "Create a worker pool that processes jobs and collects results through a results channel.",
              difficulty: "medium",
              starterCode: `package main

import (
    "fmt"
    "sync"
)

func worker(id int, jobs <-chan int, results chan<- int, wg *sync.WaitGroup) {
    defer wg.Done()
    for job := range jobs {
        results <- job * 2
    }
}

func main() {
    const numJobs = 10
    const numWorkers = 3
    jobs := make(chan int, numJobs)
    results := make(chan int, numJobs)
    var wg sync.WaitGroup

    for w := 1; w <= numWorkers; w++ {
        wg.Add(1)
        go worker(w, jobs, results, &wg)
    }

    for j := 1; j <= numJobs; j++ {
        jobs <- j
    }
    close(jobs)

    wg.Wait()
    close(results)

    for r := range results {
        fmt.Println(r)
    }
}`,
              solutionHint: "Use separate results channel collected after Wait.",
            },
          ],
          faangQuestions: [
            { question: "How to implement graceful shutdown of a worker pool?", answer: "1) Use context cancellation: workers select on ctx.Done() and jobs channel. 2) On shutdown signal, stop sending jobs and close channel. 3) Workers drain remaining jobs or exit. 4) WaitGroup waits for all workers. 5) errgroup for error propagation during shutdown. 6) For HTTP servers: Shutdown() drains connections.", difficulty: "hard", company: "Google" },
            { question: "Compare worker pool with unlimited goroutine spawning.", answer: "Unlimited spawning: simpler to write but risks OOM and CPU thrashing (goroutines still have overhead). Worker pool: predictable resource usage, backpressure, controlled parallelism. Use worker pool for sustained load, unlimited for bursty/sporadic tasks with low concurrency.", difficulty: "medium", company: "Uber" },
          ],
        },
        {
          slug: "context",
          title: "Context",
          order: 8,
          content: {
            overview: "context.Context carries deadlines, cancellation signals, and request-scoped values across API boundaries. Used in servers, databases, HTTP clients. context.Background() is root, context.TODO() is placeholder.",
            problemStatement: "Propagating cancellation across goroutines, setting timeouts on operations, passing request-scoped data without global state.",
            intuitionFirst: "Context is a control leash for goroutines: you can yank it (cancel), set a time limit (deadline), or attach notes (values).",
            realLifeAnalogy: "Walkie-talkie with a kill switch. You give each worker a walkie-talkie (context). You can broadcast \"stop\" (cancel) to all at once, so they know when to quit.",
            howItWorks: "context.WithCancel(parent) returns ctx, cancel. context.WithTimeout(parent, duration). context.WithDeadline(parent, time). context.WithValue(parent, key, val). ctx.Done() returns channel closed on cancel. ctx.Err() returns Canceled or DeadlineExceeded.",
            beginnerExample: `package main

import (
    "context"
    "fmt"
    "time"
)

func operation(ctx context.Context, dur time.Duration) {
    select {
    case <-time.After(dur):
        fmt.Println("Operation done")
    case <-ctx.Done():
        fmt.Println("Cancelled:", ctx.Err())
    }
}

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 50*time.Millisecond)
    defer cancel()

    go operation(ctx, 100*time.Millisecond)
    time.Sleep(200 * time.Millisecond)

    ctx2 := context.WithValue(context.Background(), "key", "value")
    fmt.Println(ctx2.Value("key"))
}`,
            commonMistakes: "Not calling cancel() (leaks goroutine until parent done). Storing context in struct. Passing nil context (use context.TODO()). Using context.Value for optional parameters (meant for request-scoped data only).",
            bestPractices: "Pass ctx as first parameter. Never store in struct. Always call cancel() in all paths. Use WithTimeout for operations. Keep value keys in unexported types.",
            performanceNotes: "Context propagation has low overhead. WithValue lookup is O(log n) in the tree depth.",
            interviewPerspective: "Context tree, cancellation propagation, deadline/timeout, WithValue design, HTTP middleware chains.",
            industryScenario: "HTTP server passes context through middleware chain. Database queries use context for cancellation. gRPC handlers receive context for deadlines.",
          },
          quiz: [
            { id: "gctx1", question: "What happens when you don't call cancel() on WithCancel?", options: ["Context auto-cancels", "Parent context leaks resources", "GC collects it", "Panic"], correctIndex: 1, explanation: "Not calling cancel() leaks the context's goroutine until the parent context is cancelled.", difficulty: "medium" },
            { id: "gctx2", question: "How to set a maximum duration on an operation?", options: ["WithTimeout", "WithDeadline", "Both A and B", "WithCancel"], correctIndex: 2, explanation: "WithTimeout is convenience for WithDeadline with relative duration.", difficulty: "easy" },
            { id: "gctx3", question: "Should context be stored in structs?", options: ["Yes", "No, pass as first argument", "Only for long-lived", "Depends"], correctIndex: 1, explanation: "Context should be passed as a function parameter, not stored in structs.", difficulty: "medium" },
          ],
          codingChallenges: [
            {
              title: "Context-Based Timeout",
              description: "Write an HTTP client that respects context cancellation/timeout.",
              difficulty: "medium",
              starterCode: `package main

import (
    "context"
    "fmt"
    "net/http"
    "time"
)

func fetchWithTimeout(ctx context.Context, url string) error {
    req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
    if err != nil {
        return err
    }
    resp, err := http.DefaultClient.Do(req)
    if err != nil {
        return err
    }
    defer resp.Body.Close()
    fmt.Println("Status:", resp.Status)
    return nil
}

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
    defer cancel()

    err := fetchWithTimeout(ctx, "https://go.dev")
    fmt.Println(err)
}`,
              solutionHint: "Use http.NewRequestWithContext to pass context to HTTP request.",
            },
          ],
          faangQuestions: [
            { question: "How does context cancellation propagate through a tree of goroutines?", answer: "When parent context cancels, all derived contexts (children) also cancel via the Done() channel. Each derived context shares a channel with parent. When cancel() is called, channel closes, propagating to all children via select statements. This enables cascading cancellation across API boundaries.", difficulty: "hard", company: "Google" },
            { question: "Design of context.Value vs thread-local storage for request-scoped data.", answer: "context.Value is explicit (visible in function signatures), type-safe (if using unexported key types), and scoped to request lifecycle. Thread-local storage is implicit (hidden dependency), breaks with goroutines (goroutines may migrate threads), and causes testing difficulties. Go chose explicit context passing for clarity and correctness.", difficulty: "hard", company: "Uber" },
          ],
        },
        {
          slug: "race-conditions",
          title: "Race Conditions",
          order: 9,
          content: {
            overview: "A data race occurs when two goroutines access the same variable concurrently and at least one is a write. Go detects races with -race flag. Fixed with mutexes, channels, or atomic ops.",
            problemStatement: "Data races are notoriously hard to debug (nondeterministic). Understanding race detection tools and prevention strategies is critical for production Go.",
            intuitionFirst: "Two chefs reaching for the same knife at the same time. One pulls, the other gets cut (corrupted data). Race detector = video replay to catch the collision.",
            realLifeAnalogy: "Bank account: two people withdraw $100 simultaneously. Without sync, both read $200, both write $100. Account has $100 instead of $0. The race detector spots the simultaneous access.",
            howItWorks: "go run -race, go test -race instrument memory accesses. ThreadSanitizer detects concurrent unsynchronized access. Reports exact stack traces for both goroutines. Recommended for all tests. Production binary = no -race for performance.",
            beginnerExample: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var counter int
    var wg sync.WaitGroup

    for i := 0; i < 1000; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            counter++ // DATA RACE!
        }()
    }

    wg.Wait()
    fmt.Println(counter) // nondeterministic
}`,
            commonMistakes: "Assuming simple ops like counter++ are atomic (they are 3 ops: load, increment, store). Forgetting to use -race in tests. Ignoring race reports during CI.",
            bestPractices: "Always run go test -race in CI. Use proper synchronization (mutex, channel, atomic). Keep critical sections small. Use -race in development. Enable race on integration tests.",
            performanceNotes: "-race flag adds ~5-10x overhead and memory increase. Used for testing only. Production builds without -race.",
            interviewPerspective: "Data race definition, race detector internals, prevention strategies, Go memory model.",
            industryScenario: "CI pipelines run -race tests. Code review checks for proper sync. Incident postmortems often involve race conditions.",
          },
          quiz: [
            { id: "grc1", question: "Counter++ is how many memory operations?", options: ["1", "3 (load, increment, store)", "2", "4"], correctIndex: 1, explanation: "counter++ is non-atomic: load, increment, store. Concurrent execution causes races.", difficulty: "medium" },
            { id: "grc2", question: "What tool detects data races in Go?", options: ["go vet", "go test -race", "golangci-lint", "pprof"], correctIndex: 1, explanation: "go test -race uses ThreadSanitizer to detect races at runtime.", difficulty: "easy" },
            { id: "grc3", question: "Should production binaries be built with -race?", options: ["Yes always", "No, too slow", "Only for servers", "Depends on Go version"], correctIndex: 1, explanation: "-race has ~5-10x overhead. Use only for testing.", difficulty: "easy" },
          ],
          codingChallenges: [
            {
              title: "Race Fix",
              description: "Fix the race condition in the example counter using proper synchronization.",
              difficulty: "easy",
              starterCode: `package main

import (
    "fmt"
    "sync"
    "sync/atomic"
)

func main() {
    var counter atomic.Int64
    var wg sync.WaitGroup

    for i := 0; i < 1000; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            counter.Add(1)
        }()
    }

    wg.Wait()
    fmt.Println(counter.Load())
}`,
              solutionHint: "Use atomic.Int64 or sync.Mutex to protect the counter.",
            },
          ],
          faangQuestions: [
            { question: "How does Go race detector work under the hood?", answer: "Go race detector uses ThreadSanitizer (TSan). It rewrites memory accesses at compile time to add instrumentation. TSan tracks happens-before relations. When two goroutines access the same memory without synchronization and at least one is a write, TSan reports the race with both stack traces. The detector has ~5-10x CPU overhead and ~2-5x memory overhead.", difficulty: "hard", company: "Google" },
            { question: "Explain Go memory model regarding happens-before.", answer: "Go memory model defines when a read must observe a write. Happens-before is established by: sync primitives (Mutex.Unlock happens-before next Lock), channel sends (send happens-before corresponding receive), goroutine creation (go statement happens-before goroutine execution), goroutine exit (goroutine exit not guaranteed to happen-before anything). sync/atomic also establishes happens-before.", difficulty: "hard", company: "Google" },
          ],
        },
        {
          slug: "sync-map",
          title: "sync.Map",
          order: 10,
          content: {
            overview: "sync.Map is a concurrent map optimized for append-only (write once, read many) or disjoint key sets. Has Load, Store, LoadOrStore, Delete, and Range methods. Not a drop-in replacement for map+Mutex.",
            problemStatement: "Regular map with sync.RWMutex works for most cases, but can be slow for read-heavy with contention. sync.Map provides optimized concurrent access.",
            intuitionFirst: "A map designed for concurrent access: optimized for scenarios where keys are written once and read many times, or multiple goroutines access disjoint keys.",
            realLifeAnalogy: "Shared whiteboard (map) in an office. People add sticky notes (Store) and read them (Load). If people write on different sections (disjoint keys), no collisions. sync.Map optimizes for this.",
            howItWorks: "var m sync.Map. m.Store(key, val). val, ok := m.Load(key). val, loaded := m.LoadOrStore(key, val) (return existing or store new). m.Delete(key). m.Range(func(k, v any) bool { return true }). Uses two-level structure: read-only map (atomic load), dirty map (with mutex) for writes. Promotes on cache misses.",
            beginnerExample: `package main

import (
    "fmt"
    "sync"
)

func main() {
    var m sync.Map

    m.Store("alice", 30)
    m.Store("bob", 25)

    if val, ok := m.Load("alice"); ok {
        fmt.Println("Alice:", val)
    }

    val, loaded := m.LoadOrStore("charlie", 35)
    fmt.Println("Charlie:", val, "was loaded:", loaded)

    m.Range(func(key, value any) bool {
        fmt.Println(key, value)
        return true
    })
}`,
            commonMistakes: "Using sync.Map when regular map+Mutex is simpler and faster (typical access patterns). Using sync.Map without understanding its optimization cases. Range inside another Range (deadlock).",
            bestPractices: "Use sync.Map only for: write once/read many keys, or disjoint key sets from different goroutines. For typical access, prefer map+Mutex or map+RWMutex.",
            performanceNotes: "Optimized via two-level access: read path is atomic load (no lock). Write path uses dirty map with mutex. Promotes on cache miss. Slower than regular map for single-goroutine.",
            interviewPerspective: "When to use sync.Map vs regular map+mutex, internal two-level design, Range semantics.",
            industryScenario: "DNS cache (write once, read many). App configuration (write rarely, read often). Connection pools (disjoint keys per goroutine).",
          },
          quiz: [
            { id: "gsm1", question: "When is sync.Map better than map+Mutex?", options: ["Always", "Write once / read many, or disjoint keys", "Never", "For small maps"], correctIndex: 1, explanation: "sync.Map shines for write-once/read-many patterns and disjoint key set access.", difficulty: "medium" },
            { id: "gsm2", question: "What does LoadOrStore do?", options: ["Load and delete", "Load existing or store new", "Store and load", "Load then store"], correctIndex: 1, explanation: "LoadOrStore returns existing value if key exists, otherwise stores and returns new.", difficulty: "easy" },
            { id: "gsm3", question: "Can you Range inside another Range of sync.Map?", options: ["Yes", "No, deadlock", "Only for read-only", "Depends"], correctIndex: 1, explanation: "Range holds internal locks. Calling Range inside another Range causes deadlock.", difficulty: "hard" },
          ],
          codingChallenges: [
            {
              title: "Concurrent Cache with sync.Map",
              description: "Implement a simple concurrent cache using sync.Map with LoadOrStore.",
              difficulty: "medium",
              starterCode: `package main

import (
    "fmt"
    "sync"
)

type Cache struct {
    m sync.Map
}

func (c *Cache) GetOrCompute(key string, fn func() any) any {
    val, loaded := c.m.LoadOrStore(key, fn())
    if !loaded {
        // Race: fn() called even if LoadOrStore found existing
    }
    return val
}

func main() {
    var c Cache
    var wg sync.WaitGroup

    for i := 0; i < 10; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            c.GetOrCompute("key", func() any { return "value" })
        }()
    }
    wg.Wait()
    fmt.Println("done")
}`,
              solutionHint: "LoadOrStore returns the existing value if already present, avoiding duplicate computation.",
            },
          ],
          faangQuestions: [
            { question: "Explain sync.Map internal two-level design.", answer: "sync.Map has a read map (atomic.Value, lock-free reads) and a dirty map (protected by mutex). Reads from read map first (atomic load). On miss, acquire mutex, check dirty, and optionally promote from dirty. Writes go to dirty map. After enough promotions (amortized), dirty map becomes new read map. This optimizes for read-heavy with write-once patterns.", difficulty: "hard", company: "Google" },
            { question: "When would you NOT use sync.Map?", answer: "sync.Map is not a drop-in replacement. For typical mixed read/write access with key sharing, regular map+Mutex is simpler and often faster. For single-goroutine access, regular map is 10x faster. sync.Map Range is not safe with concurrent modifications. Use map+Mutex for general purpose, sync.Map only for specific access patterns.", difficulty: "medium", company: "Uber" },
          ],
        },
      ],
    },
    {
      slug: "backend",
      title: "Backend",
      description: "Building backend services in Go: HTTP servers, middleware patterns, routing, and REST API design.",
      order: 4,
      subtopics: [
        {
          slug: "http-server",
          title: "HTTP Server",
          order: 1,
          content: {
            overview: "Go net/http package provides HTTP server functionality. http.Handler interface, http.HandleFunc for routing. http.ListenAndServe to start. Built-in support for TLS, timeouts, graceful shutdown.",
            problemStatement: "Writing production HTTP servers: routing, middleware, graceful shutdown, request/response handling, error responses.",
            intuitionFirst: "HTTP server = restaurant: http.HandlerFunc is the chef, request is the order, response writer is the serving plate. Multiplexer (ServeMux) is the host seating customers.",
            realLifeAnalogy: "Restaurant: host (router) seats customers (requests), chef (handler) prepares food (response), waiter (response writer) serves. Kitchen closes (shutdown) after last customer leaves.",
            howItWorks: "http.HandleFunc(pattern, handler) registers handler. Handler has func(w http.ResponseWriter, r *http.Request). http.ListenAndServe(addr, handler). http.Server with ReadTimeout, WriteTimeout. Graceful shutdown via Shutdown(ctx).",
            beginnerExample: `package main

import (
    "fmt"
    "net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodGet {
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
        return
    }
    fmt.Fprintf(w, "Hello, %s!", r.URL.Query().Get("name"))
}

func main() {
    http.HandleFunc("/hello", helloHandler)

    http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
        w.WriteHeader(http.StatusOK)
        w.Write([]byte("ok"))
    })

    fmt.Println("Server starting on :8080")
    http.ListenAndServe(":8080", nil)
}`,
            commonMistakes: "Not setting timeouts (slow loris attack). Writing to response after headers sent (panic). Not closing request body. Panics crash the server (use recover middleware). Not implementing graceful shutdown.",
            bestPractices: "Set ReadTimeout, WriteTimeout, IdleTimeout. Use http.TimeoutHandler for per-handler timeouts. Implement Shutdown for graceful stop. Health check endpoints. Structured error responses.",
            performanceNotes: "Default ServeMux is sufficient for most. For high throughput, use fast routers (chi, gin) or http.Server with custom config. Connection pooling via keep-alive.",
            interviewPerspective: "Handler interface, ServeMux, graceful shutdown, HTTP timeouts, response streaming.",
            industryScenario: "REST APIs, health checks, webhook receivers, microservices all use net/http. Gorilla mux/chi for advanced routing.",
          },
          quiz: [
            { id: "ght1", question: "Handler function signature in Go?", options: ["func(w http.ResponseWriter, r *http.Request)", "func(w http.Response, r *http.Request)", "func(http.ResponseWriter, *http.Request)", "func(w ResponseWriter, r Request)"], correctIndex: 0, explanation: "http.HandlerFunc: func(w http.ResponseWriter, r *http.Request).", difficulty: "easy" },
            { id: "ght2", question: "What attack does missing ReadTimeout prevent?", options: ["XSS", "Slow loris", "SQL injection", "CSRF"], correctIndex: 1, explanation: "Missing ReadTimeout allows slow loris attack (slowly sending headers).", difficulty: "medium" },
            { id: "ght3", question: "How to gracefully shutdown an HTTP server?", options: ["Kill process", "http.Shutdown(ctx)", "Close listener", "Stop goroutine"], correctIndex: 1, explanation: "Server.Shutdown(ctx) gracefully stops accepting new connections and drains existing ones.", difficulty: "medium" },
          ],
          codingChallenges: [
            {
              title: "Graceful HTTP Server",
              description: "Create an HTTP server with graceful shutdown handling SIGINT/SIGTERM.",
              difficulty: "hard",
              starterCode: `package main

import (
    "context"
    "fmt"
    "net/http"
    "os"
    "os/signal"
    "syscall"
    "time"
)

func main() {
    srv := &http.Server{Addr: ":8080"}
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        w.Write([]byte("Hello"))
    })

    go func() {
        if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
            fmt.Println(err)
        }
    }()

    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
    <-quit

    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
    defer cancel()
    srv.Shutdown(ctx)
}`,
              solutionHint: "signal.Notify for OS signals, Server.Shutdown(ctx) for graceful stop.",
            },
          ],
          faangQuestions: [
            { question: "How does Go HTTP server handle concurrent requests?", answer: "Each HTTP request runs in its own goroutine via net/http server. The server accepts connections in a loop and spawns goroutines to handle each connection. GOMAXPROCS controls parallelism but goroutines handle concurrency. Default max request body size is 1GB (controlled via http.MaxBytesReader).", difficulty: "medium", company: "Google" },
            { question: "Implement a rate limiting HTTP middleware in Go.", answer: "type rateLimiter struct { mu sync.Mutex; tokens int; max int; ticker *time.Ticker }. Each request: try to acquire token, or return 429 Too Many Requests. Use sync.Mutex or atomic ops for token bucket. Alternatively use golang.org/x/time/rate.Limiter. Provide configuration for rate and burst.", difficulty: "hard", company: "Uber" },
          ],
        },
        {
          slug: "middleware",
          title: "Middleware",
          order: 2,
          content: {
            overview: "Middleware wraps http.Handler to add cross-cutting concerns: logging, auth, rate limiting, recovery, tracing. Pattern: type Middleware func(http.Handler) http.Handler. Middleware are composed via function chaining.",
            problemStatement: "Adding request logging, authentication, rate limiting, panic recovery without duplicating code across all handlers.",
            intuitionFirst: "Middleware = security checkpoint at airport entrance. Every passenger (request) goes through: check ID (auth), scan bags (logging), pat down (rate limit). Then they board their specific flight (handler).",
            realLifeAnalogy: "Assembly line: each station (middleware) adds something. Quality check (validation), label (logging), package (response wrapping). Product (request) moves through all stations before reaching final assembly (handler).",
            howItWorks: "type Middleware func(next http.Handler) http.Handler. Wraps handler: m1(m2(handler)). Common middlewares: logging, recovery, CORS, auth, compression, request ID. Third-party: chi middleware, alice, negroni.",
            beginnerExample: `package main

import (
    "fmt"
    "log"
    "net/http"
    "time"
)

func loggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        next.ServeHTTP(w, r)
        log.Printf("%s %s %v", r.Method, r.URL.Path, time.Since(start))
    })
}

func recoverMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        defer func() {
            if err := recover(); err != nil {
                http.Error(w, "Internal Server Error", 500)
                log.Println("Panic:", err)
            }
        }()
        next.ServeHTTP(w, r)
    })
}

func hello(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello")
}

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/", hello)
    wrapped := recoverMiddleware(loggingMiddleware(mux))
    http.ListenAndServe(":8080", wrapped)
}`,
            commonMistakes: "Not calling next.ServeHTTP (breaks chain). Writing response in middleware before next handler (prevents handler from writing). Middleware state races. Forgetting to call next when auth fails.",
            bestPractices: "Keep middleware focused (single concern). Use request-scoped context for passing data. Handle errors with appropriate HTTP status codes. Order matters: recover first, then logging, then auth, then handler.",
            performanceNotes: "Middleware adds overhead proportional to chain length. Use http.Handler wrapper to avoid reflection. Pre-allocate response wrappers.",
            interviewPerspective: "Middleware pattern, composition, context propagation, error handling in middleware chain, order dependency.",
            industryScenario: "Auth middleware (JWT/OAuth), logging (structured), rate limiting, CORS, request tracing, metrics, request ID injection.",
          },
          quiz: [
            { id: "gmw1", question: "Middleware type signature in Go?", options: ["func(http.Handler) http.Handler", "func(http.HandlerFunc) http.Handler", "func(http.ResponseWriter, *http.Request)", "func(http.Handler, http.Handler) http.Handler"], correctIndex: 0, explanation: "Middleware is func(next http.Handler) http.Handler.", difficulty: "easy" },
            { id: "gmw2", question: "What is the correct middleware order for recovery and logging?", options: ["Logging then recovery", "Recovery then logging", "Order does not matter", "Both before auth"], correctIndex: 1, explanation: "Recovery should be outermost to catch panics from logging and handler.", difficulty: "medium" },
            { id: "gmw3", question: "How to pass data from middleware to handler?", options: ["Global variable", "Context", "Channel", "Response header"], correctIndex: 1, explanation: "Use request context to pass request-scoped data from middleware to handlers.", difficulty: "medium" },
          ],
          codingChallenges: [
            {
              title: "Auth Middleware",
              description: "Implement JWT authentication middleware that sets user ID in context.",
              difficulty: "hard",
              starterCode: `package main

import (
    "context"
    "net/http"
)

type contextKey string
const userIDKey contextKey = "userID"

func authMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        token := r.Header.Get("Authorization")
        if token == "" {
            http.Error(w, "Unauthorized", http.StatusUnauthorized)
            return
        }
        // Validate JWT and extract user ID
        userID := "user123"
        ctx := context.WithValue(r.Context(), userIDKey, userID)
        next.ServeHTTP(w, r.WithContext(ctx))
    })
}`,
              solutionHint: "Extract token from header, validate, set user ID in request context via WithContext.",
            },
          ],
          faangQuestions: [
            { question: "How does http.Handler middleware composition work in Go?", answer: "Middleware is func(http.Handler) http.Handler. Composition: wrap(handler) = m1(m2(m3(handler))). Each middleware returns a new handler that runs additional logic before/after calling the wrapped handler via next.ServeHTTP. Libraries like alice provide chain(m1, m2, m3)(handler) for cleaner composition.", difficulty: "medium", company: "Google" },
            { question: "Design a middleware that injects request tracing (distributed tracing).", answer: "Extract trace ID from incoming headers (x-request-id, Traceparent) or generate new one. Inject into request context. Log with trace ID. Pass via downstream HTTP/gRPC calls in headers. Use OpenTelemetry SDK for production: propagator extracts/injects context, spans created at middleware boundaries.", difficulty: "hard", company: "Uber" },
          ],
        },
        {
          slug: "routing",
          title: "Routing",
          order: 3,
          content: {
            overview: "Go net/http default ServeMux handles basic routing (Go 1.22+ has method+pattern matching). Third-party routers (chi, gorilla/mux, gin, echo) provide path params, middleware chaining, and sub-routing.",
            problemStatement: "Default ServeMux lacks path parameters, method matching (pre-1.22), and structured middleware composition. Need for RESTful routing.",
            intuitionFirst: "Router = GPS navigation: match URL patterns, extract route parameters (path/query), direct to correct handler.",
            realLifeAnalogy: "Mail sorting facility: packages (requests) arrive with addresses (URLs). Sorter (router) reads address, determines destination (handler), and routes accordingly. Some packages have tracking numbers (path params).",
            howItWorks: "Go 1.22+: http.NewServeMux().HandleFunc(\"GET /users/{id}\", handler). r.PathValue(\"id\") for path params. Third-party: chi.NewRouter(), r.Get(\"/users/{id}\", handler), chi.URLParam(r, \"id\"). Pattern matching with regex support in third-party routers.",
            beginnerExample: `package main

import (
    "fmt"
    "log"
    "net/http"
)

func main() {
    mux := http.NewServeMux()

    mux.HandleFunc("GET /users/{id}", func(w http.ResponseWriter, r *http.Request) {
        id := r.PathValue("id")
        fmt.Fprintf(w, "User %s", id)
    })

    mux.HandleFunc("POST /users", func(w http.ResponseWriter, r *http.Request) {
        w.WriteHeader(http.StatusCreated)
        fmt.Fprintf(w, "User created")
    })

    mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
        w.Write([]byte("ok"))
    })

    log.Println("Server on :8080")
    http.ListenAndServe(":8080", mux)
}`,
            commonMistakes: "Route specificity conflicts (more specific routes must be registered first pre-1.22). Not handling trailing slashes. Method matching not working (pre-1.22 need manual check). Path traversal attacks.",
            bestPractices: "Use Go 1.22+ method patterns. Group routes by resource. Use path parameters over query params for resource IDs. Always validate path params. Use chi/gin for complex routing needs.",
            performanceNotes: "Default ServeMux uses radix tree (fast). Third-party routers add overhead but provide features. Benchmark before choosing for high-throughput.",
            interviewPerspective: "ServeMux routing, path parameters, method-based routing, sub-routing, trie-based routing.",
            industryScenario: "REST APIs use routers for CRUD endpoints. Microservices use sub-routers for versioning. Chi is popular for stdlib-compatible routing.",
          },
          quiz: [
            { id: "grt1", question: "How to get path parameter in Go 1.22+ ServeMux?", options: ["r.URL.Query()", "r.PathValue(\"id\")", "chi.URLParam(r, \"id\")", "r.FormValue(\"id\")"], correctIndex: 1, explanation: "r.PathValue(\"id\") extracts path parameters in Go 1.22+ ServeMux.", difficulty: "medium" },
            { id: "grt2", question: "What routing feature was added in Go 1.22?", options: ["Regex routing", "Method + path patterns", "Query params", "Middleware"], correctIndex: 1, explanation: "Go 1.22 added method matching: \"GET /path\" and path parameters: \"{id}\".", difficulty: "medium" },
            { id: "grt3", question: "Which is a popular Go third-party router?", options: ["Express", "Chi", "Flask", "Spring"], correctIndex: 1, explanation: "Chi is a popular Go router compatible with net/http.", difficulty: "easy" },
          ],
          codingChallenges: [
            {
              title: "RESTful Router",
              description: "Create a RESTful API router for CRUD operations on a resource.",
              difficulty: "medium",
              starterCode: `package main

import (
    "encoding/json"
    "net/http"
    "sync"
)

type Item struct {
    ID   string \`json:"id"\`
    Name string \`json:"name"\`
}

type Store struct {
    mu    sync.RWMutex
    items map[string]Item
}

func NewStore() *Store {
    return &Store{items: make(map[string]Item)}
}

func main() {
    store := NewStore()
    mux := http.NewServeMux()

    mux.HandleFunc("GET /items/{id}", func(w http.ResponseWriter, r *http.Request) {
        id := r.PathValue("id")
        store.mu.RLock()
        item, ok := store.items[id]
        store.mu.RUnlock()
        if !ok {
            http.Error(w, "Not found", 404)
            return
        }
        json.NewEncoder(w).Encode(item)
    })

    http.ListenAndServe(":8080", mux)
}`,
              solutionHint: "Use Go 1.22+ method+path patterns. RWMutex for concurrent access.",
            },
          ],
          faangQuestions: [
            { question: "How does Go ServeMux routing work internally (pre-1.22 vs 1.22+)?", answer: "Pre-1.22: ServeMux uses path prefix matching, longest match wins. /users/ matches /users/123. Method matching manual. 1.22+: Uses radix tree with method+pattern support. Patterns: \"GET /resource/{id}\". Path values extracted via PathValue. Patterns can conflict: registration order matters. Trailing slash redirects handled automatically.", difficulty: "hard", company: "Google" },
            { question: "Compare Chi vs gin vs default ServeMux for routing.", answer: "Chi: stdlib-compatible (http.Handler), lightweight, good for microservices, no reflection, explicit middleware. Gin: faster (radix tree), uses custom context (not stdlib), reflection for binding. Default ServeMux: no dependencies, simpler, Go 1.22+ has methods/params. Chi for stdlib compatibility, Gin for performance + ecosystem, ServeMux for simplicity.", difficulty: "hard", company: "Uber" },
          ],
        },
      ],
    },
    {
      slug: "database",
      title: "Database",
      description: "Database interaction in Go: standard database/sql package, ORM with GORM, connection pooling, migrations, and query patterns.",
      order: 5,
      subtopics: [
        {
          slug: "sql-database",
          title: "SQL with database/sql",
          order: 1,
          content: {
            overview: "Go database/sql is a standard interface for SQL databases. Used with drivers (pgx, go-sqlite3, go-mysql). Provides connection pooling, prepared statements, transactions.",
            problemStatement: "Production database access: connection pooling configuration, prepared statements, transaction handling, NULL values, migration management.",
            intuitionFirst: "database/sql = universal remote control for databases. Drivers are batteries. You press buttons (Query, Exec) and get results (Rows, Result).",
            realLifeAnalogy: "Car rental agency: database/sql is the counter, driver is the specific car brand (Ford, Toyota). You rent a car (connection), drive (query), return (close). Pool = fleet of available cars.",
            howItWorks: "sql.Open(\"driver\", dsn) returns *sql.DB (connection pool). db.Query(\"SELECT ...\") returns *sql.Rows. db.QueryRow returns single row. db.Exec for INSERT/UPDATE. Named parameters. Prepared statements via db.Prepare. Transactions via db.Begin.",
            beginnerExample: `package main

import (
    "database/sql"
    "fmt"
    "log"
    _ "github.com/lib/pq"
)

type User struct {
    ID   int
    Name string
    Age  sql.NullInt64
}

func main() {
    db, err := sql.Open("postgres", "host=localhost port=5432 user=postgres dbname=test sslmode=disable")
    if err != nil {
        log.Fatal(err)
    }
    defer db.Close()

    db.SetMaxOpenConns(25)
    db.SetMaxIdleConns(5)

    if err := db.Ping(); err != nil {
        log.Fatal(err)
    }
    fmt.Println("Connected!")

    var user User
    err = db.QueryRow("SELECT id, name, age FROM users WHERE id = $1", 1).Scan(&user.ID, &user.Name, &user.Age)
    if err == sql.ErrNoRows {
        fmt.Println("Not found")
    } else if err != nil {
        log.Fatal(err)
    } else {
        fmt.Printf("User: %+v\n", user)
    }
}`,
            commonMistakes: "Not checking sql.ErrNoRows (returns zero values silently). Forgetting to close Rows (resource leak). Ignoring ping errors. Not configuring pool limits (default unlimited). Raw SQL injection (use parameterized queries).",
            bestPractices: "Always use parameterized queries ($1, ?). Close rows with defer. Configure pool: SetMaxOpenConns, SetMaxIdleConns, SetConnMaxLifetime. Use sql.Null* types for nullable columns. Transactions for atomic operations.",
            performanceNotes: "sql.DB is safe for concurrent use. Connection pool is reused across goroutines. Prepared statements are cached per DB. Keep transactions short (hold connection).",
            interviewPerspective: "Connection pooling, prepared statements, null handling, transaction isolation, driver architecture.",
            industryScenario: "Web apps query database per request. Batch jobs use transactions. Migrations run on startup or via tools (golang-migrate, goose).",
          },
          quiz: [
            { id: "gsql1", question: "How to check if QueryRow found no rows?", options: ["Check nil result", "Compare error to sql.ErrNoRows", "Check zero values", "Use IsNotFound method"], correctIndex: 1, explanation: "QueryRow returns sql.ErrNoRows when no rows found. Always compare to this sentinel.", difficulty: "medium" },
            { id: "gsql2", question: "What does sql.Open actually do?", options: ["Opens connection", "Creates connection pool, no connection yet", "Connects immediately", "Creates driver"], correctIndex: 1, explanation: "sql.Open creates a pool. Actual connection happens on first Query/Ping.", difficulty: "medium" },
            { id: "gsql3", question: "How to prevent SQL injection in Go?", options: ["Escape inputs", "Parameterized queries ($1, ?)", "Use ORM", "Validate input"], correctIndex: 1, explanation: "Use parameterized queries (placeholder $1 or ?) to prevent SQL injection.", difficulty: "easy" },
          ],
          codingChallenges: [
            {
              title: "Transaction With Rollback",
              description: "Write a function that transfers money between accounts using a database transaction with proper rollback on error.",
              difficulty: "hard",
              starterCode: `package main

import (
    "database/sql"
    "fmt"
    "log"
)

func Transfer(db *sql.DB, fromID, toID int, amount float64) error {
    tx, err := db.Begin()
    if err != nil {
        return err
    }
    defer tx.Rollback() // no-op if committed

    _, err = tx.Exec("UPDATE accounts SET balance = balance - $1 WHERE id = $2", amount, fromID)
    if err != nil {
        return err
    }
    _, err = tx.Exec("UPDATE accounts SET balance = balance + $1 WHERE id = $2", amount, toID)
    if err != nil {
        return err
    }
    return tx.Commit()
}

func main() {
    // db setup omitted
    fmt.Println("Transfer function ready")
}`,
              solutionHint: "Use Begin/Rollback/Commit pattern. defer tx.Rollback() ensures cleanup.",
            },
          ],
          faangQuestions: [
            { question: "Explain Go database/sql connection pooling internals.", answer: "sql.DB maintains a pool of connections. SetMaxOpenConns limits total open connections. SetMaxIdleConns keeps idle connections ready (0 = close after use). SetConnMaxLifetime recycles connections (prevents stale connections). When query requested: get from idle pool or open new (up to MaxOpenConns). If no connection available, request blocks until one is free or timeout. Concurrent-safe via mutexes.", difficulty: "hard", company: "Google" },
            { question: "How to handle NULL database values in Go?", answer: "Use sql.NullString, sql.NullInt64, sql.NullFloat64, sql.NullBool, sql.NullTime for nullable columns. Each has Valid bool and value fields. Or use pointer types (*string, *int). The sql.Null* approach is more idiomatic and efficient. Custom types can implement sql.Scanner for complex null handling.", difficulty: "medium", company: "Uber" },
          ],
        },
        {
          slug: "gorm",
          title: "GORM",
          order: 2,
          content: {
            overview: "GORM is a popular Go ORM with automatic CRUD, associations (HasMany, BelongsTo), hooks, preloading, and migrations. Uses tag-based struct mapping.",
            problemStatement: "Writing repetitive SQL queries, managing model relationships, automatic migrations, complex query building with conditions and joins.",
            intuitionFirst: "GORM translates Go structs to database tables. Create = INSERT, Find = SELECT, Save = UPDATE, Delete = DELETE. Relationships defined via tags.",
            realLifeAnalogy: "Auto-translator: you speak Go (structs), GORM translates to SQL (database language). You say \"give me users over 18\" and GORM writes \"SELECT * FROM users WHERE age > 18\".",
            howItWorks: "type User struct { gorm.Model; Name string; Email string `gorm:\"uniqueIndex\"` }. db.AutoMigrate(&User{}). db.Create(&user). db.First(&user, id). db.Where(\"age > ?\", 18).Find(&users). db.Preload(\"Orders\").Find(&users). Associations through foreign keys.",
            beginnerExample: `package main

import (
    "fmt"
    "gorm.io/driver/postgres"
    "gorm.io/gorm"
)

type Product struct {
    gorm.Model
    Code  string  \`gorm:"uniqueIndex;not null"\`
    Price float64
}

func main() {
    dsn := "host=localhost user=postgres dbname=test port=5432 sslmode=disable"
    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        panic(err)
    }

    db.AutoMigrate(&Product{})

    db.Create(&Product{Code: "P001", Price: 100})

    var product Product
    db.First(&product, "code = ?", "P001")
    fmt.Println(product)

    db.Model(&product).Update("Price", 120)

    db.Delete(&product)
}`,
            commonMistakes: "Not handling gorm.ErrRecordNotFound (use First with error check). N+1 query problem (use Preload for eager loading). Over-reliance on AutoMigrate in production. Ignoring db.Error after chain calls.",
            bestPractices: "Use AutoMigrate for dev/test, versioned migrations for prod. Preload for relationships to avoid N+1. Use Scopes for reusable query conditions. Transactions for atomic operations. Logger for query debugging.",
            performanceNotes: "GORM adds overhead vs raw SQL. Use raw SQL for complex queries. Preload generates multiple queries (but avoids N+1). Batch inserts with CreateInBatches. Connection reuse via underlying sql.DB.",
            interviewPerspective: "ORM vs raw SQL, N+1 problem, AutoMigrate, hooks, scopes, soft delete.",
            industryScenario: "CRUD-heavy apps use GORM for productivity. Reporting apps use raw SQL for complex queries. Admin panels benefit from GORM associations.",
          },
          quiz: [
            { id: "ggrm1", question: "What does gorm.Model include?", options: ["ID, CreatedAt, UpdatedAt, DeletedAt", "ID only", "Timestamps only", "Name and ID"], correctIndex: 0, explanation: "gorm.Model embeds ID (uint), CreatedAt, UpdatedAt, DeletedAt (soft delete).", difficulty: "easy" },
            { id: "ggrm2", question: "How to avoid N+1 queries in GORM?", options: ["Join", "Preload", "Raw SQL", "Limit"], correctIndex: 1, explanation: "Preload eagerly loads associations, avoiding N+1 query problem.", difficulty: "medium" },
            { id: "ggrm3", question: "What does AutoMigrate do?", options: ["Backup database", "Sync schema to match structs", "Move database", "Optimize queries"], correctIndex: 1, explanation: "AutoMigrate creates/alters tables to match struct definitions.", difficulty: "easy" },
          ],
          codingChallenges: [
            {
              title: "CRUD with GORM",
              description: "Implement a complete CRUD for User model using GORM with proper error handling.",
              difficulty: "medium",
              starterCode: `package main

import (
    "fmt"
    "gorm.io/driver/sqlite"
    "gorm.io/gorm"
)

type User struct {
    gorm.Model
    Name  string
    Email string \`gorm:"uniqueIndex"\`
    Age   int
}

func main() {
    db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
    if err != nil {
        panic(err)
    }
    db.AutoMigrate(&User{})

    db.Create(&User{Name: "Alice", Email: "alice@example.com", Age: 30})

    var user User
    db.First(&user, "email = ?", "alice@example.com")
    fmt.Println(user)

    db.Model(&user).Update("Age", 31)

    db.Delete(&user)
}`,
              solutionHint: "Use gorm.Model for ID/timestamps. Use uniqueness constraints via tags.",
            },
          ],
          faangQuestions: [
            { question: "GORM vs raw SQL: when to use which in production?", answer: "GORM: rapid prototyping, CRUD-heavy apps, simple relationships, admin panels. Reduces boilerplate. Raw SQL: complex queries, reporting, performance-critical paths, joins across many tables, database-specific features. Many projects use both: GORM for 80% common operations, raw SQL for 20% complex queries. GORM can execute raw SQL via db.Raw().", difficulty: "medium", company: "Uber" },
            { question: "How does GORM handle soft delete?", answer: "gorm.Model includes DeletedAt gorm.DeletedAt. When calling db.Delete, GORM sets DeletedAt instead of hard-deleting. Queries automatically filter WHERE deleted_at IS NULL. Unscoped() method includes soft-deleted records. Unscoped().Delete() performs hard delete. This enables data recovery and audit trails.", difficulty: "medium", company: "Uber" },
          ],
        },
      ],
    },
  ],
};
