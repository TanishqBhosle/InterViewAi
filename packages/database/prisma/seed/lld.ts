import type { SubjectData } from "./types";

export const lldSubject: SubjectData = {
  "slug": "lld",
  "title": "Low Level Design",
  "description": "Master low-level design - OOP principles, SOLID, design patterns, UML, and classic LLD interview problems like Parking Lot, Elevator, and Chess",
  "icon": "Code",
  "color": "text-rose-500",
  "order": 11,
  "topics": [
    {
      "slug": "oop-principles",
      "title": "OOP Principles",
      "description": "Master the four pillars of Object-Oriented Programming - Encapsulation, Inheritance, Polymorphism, and Abstraction",
      "order": 1,
      "subtopics": [
        {
          "slug": "encapsulation",
          "title": "Encapsulation",
          "order": 1,
          "content": {
            "overview": "Encapsulation bundles data (fields) and methods (functions) that operate on the data into a single unit (class), and restricts direct access to some of an object's components. This is the fundamental mechanism for achieving data hiding and modularity in object-oriented programming.",
            "problemStatement": "Without encapsulation, any code can directly modify an object's internal state, leading to inconsistent data, tight coupling, and code that is hard to maintain or debug. Changes to internal implementation ripple everywhere.",
            "intuitionFirst": "Encapsulation is like a vending machine. You interact through the interface (buttons, coin slot, display). You don't need to know how the internal mechanism works. The machine protects its internal state (inventory, money). You can't reach in and grab a drink without paying.",
            "realLifeAnalogy": "A bank account: you interact through the ATM interface (deposit, withdraw, check balance). You cannot directly modify the bank's internal database. The account object encapsulates the balance and provides controlled access through methods.",
            "howItWorks": "Class fields marked private (or protected) cannot be accessed from outside the class. Public methods provide controlled access to the data. Getters and setters allow validation before reading or writing. The internal implementation can change without affecting external code as long as the public interface stays the same.",
            "beginnerExample": "class BankAccount {\n  private balance: number;\n  private accountNumber: string;\n\n  constructor(accountNumber: string, initialBalance: number = 0) {\n    this.accountNumber = accountNumber;\n    this.balance = initialBalance;\n  }\n\n  deposit(amount: number): void {\n    if (amount <= 0) throw new Error('Amount must be positive');\n    this.balance += amount;\n  }\n\n  withdraw(amount: number): boolean {\n    if (amount <= 0) throw new Error('Amount must be positive');\n    if (amount > this.balance) return false;\n    this.balance -= amount;\n    return true;\n  }\n\n  getBalance(): number { return this.balance; }\n  getAccountNumber(): string { return this.accountNumber; }\n}",
            "commonMistakes": "Making all fields public for convenience (breaks encapsulation). Creating getters/setters for every field (just exposes internal structure - only expose what's needed). Returning references to mutable internal objects (caller can modify internal state).",
            "bestPractices": "Keep fields private by default. Expose only what external code needs. Use getters/setters only when validation or computation is needed. Return immutable copies of internal collections. Program to interfaces, not implementations.",
            "interviewPerspective": "Encapsulation is a basic but important OOP concept. In LLD interviews, demonstrate it through class design. Show how you hide internal state and provide controlled access. Discuss: (1) Why private fields matter - prevents inconsistent state. (2) Immutable objects vs mutable state. (3) Tell-Don't-Ask principle (don't ask for data to make decisions, ask object to do something). Example: instead of `if (account.getBalance() >= amount) account.withdraw(amount)`, just `account.withdraw(amount)` which handles validation internally.",
            "performanceNotes": "Encapsulation has zero runtime cost in TypeScript (only compile-time enforcement). In other languages, virtual method dispatch adds small overhead, but modern JIT compilers optimize it well.",
            "securityNotes": "Encapsulation is a security tool: it prevents external code from bypassing validation, accessing sensitive internal state, or putting objects into invalid states."
          },
          "quiz": [
            {
              "id": "lld-encap-1",
              "question": "What is encapsulation in OOP?",
              "options": [
                "Bundling data and methods together, hiding internal state",
                "Inheriting properties from a parent class",
                "Having many forms of a method",
                "Abstracting implementation details"
              ],
              "correctIndex": 0,
              "explanation": "Encapsulation bundles data and methods into a single unit and restricts direct access to internal state.",
              "difficulty": "easy"
            },
            {
              "id": "lld-encap-2",
              "question": "Which access modifier provides the strongest encapsulation?",
              "options": [
                "private",
                "public",
                "protected",
                "internal"
              ],
              "correctIndex": 0,
              "explanation": "Private members are only accessible within the class itself, providing the strongest encapsulation.",
              "difficulty": "easy"
            },
            {
              "id": "lld-encap-3",
              "question": "What is the Tell-Don't-Ask principle?",
              "options": [
                "Tell an object what to do rather than asking for its data",
                "Ask objects for data before making decisions",
                "Only tell objects about errors",
                "Ask permission before calling methods"
              ],
              "correctIndex": 0,
              "explanation": "Tell-Don't-Ask means you should tell an object to perform an action rather than query its state and make decisions externally.",
              "difficulty": "medium"
            },
            {
              "id": "lld-encap-4",
              "question": "How does encapsulation improve maintainability?",
              "options": [
                "Internal implementation can change without affecting external code",
                "It makes code run faster",
                "It reduces the number of classes needed",
                "It automatically documents the code"
              ],
              "correctIndex": 0,
              "explanation": "Encapsulation hides internal implementation behind a public interface, so changes to internals don't break external code.",
              "difficulty": "medium"
            },
            {
              "id": "lld-encap-5",
              "question": "Which of the following violates encapsulation?",
              "options": [
                "Returning a reference to a mutable internal list",
                "Using private fields with public getters",
                "Validating input in setter methods",
                "Making fields private by default"
              ],
              "correctIndex": 0,
              "explanation": "Returning a reference to a mutable internal list allows callers to modify internal state, breaking encapsulation.",
              "difficulty": "hard"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design a bank account system using encapsulation. How do you prevent overdrafts and ensure thread safety?",
              "answer": "Use private balance field with controlled access through deposit/withdraw methods. Validate all operations internally. For thread safety, use locks or atomic operations on the balance field. Never expose the balance reference directly - only return copies or computed values. Follow Tell-Don't-Ask: account.withdraw(amount) instead of if(account.getBalance() >= amount) account.withdraw(amount).",
              "difficulty": "medium",
              "company": "Amazon"
            },
            {
              "question": "What is a leaky abstraction? Give a real-world example from distributed systems.",
              "answer": "A leaky abstraction exposes implementation details that should be hidden. Example: RPC (Remote Procedure Call) aims to abstract network calls as local function calls, but network issues (latency, timeouts, partial failures) leak through. Another example: an ORM that abstracts SQL but leaks when you need to optimize queries (N+1 problem). The Law of Leaky Abstractions states that all nontrivial abstractions are leaky to some degree.",
              "difficulty": "hard",
              "company": "Google"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "inheritance",
          "title": "Inheritance",
          "order": 2,
          "content": {
            "overview": "Inheritance allows a class to inherit properties and methods from another class, promoting code reuse and establishing a natural hierarchy. The subclass (child) extends the superclass (parent), optionally overriding behavior. While powerful, inheritance should be used carefully - 'favor composition over inheritance'.",
            "problemStatement": "Without inheritance, code duplication is rampant. Multiple classes that share behavior must duplicate the same code. Changes to shared behavior require updating every class individually. Inheritance solves this by centralizing common logic in a base class.",
            "intuitionFirst": "Inheritance is like a family tree. Children inherit traits from parents (eye color, height) but can also have their own unique traits. In programming, Dog inherits from Animal - Dog has all Animal properties plus dog-specific behaviors like bark().",
            "realLifeAnalogy": "Vehicle types: all vehicles have speed, fuel, and move(). Car adds doors and honk(). Bike adds pedals and ringBell(). The common vehicle logic is defined once in Vehicle base class.",
            "howItWorks": "A subclass uses the extends keyword to inherit from a superclass. The subclass automatically has all public and protected members. It can override methods to change behavior, or add new members. Super keyword calls parent's version. In TypeScript, a class can only extend one class (single inheritance), but implement multiple interfaces.",
            "beginnerExample": "abstract class Animal {\n  constructor(protected name: string) {}\n  abstract makeSound(): void;\n  move(): void { console.log(`${this.name} moves`); }\n}\n\nclass Dog extends Animal {\n  constructor(name: string) { super(name); }\n  makeSound(): void { console.log(`${this.name} barks`); }\n  fetch(): void { console.log(`${this.name} fetches`); }\n}\n\nclass Cat extends Animal {\n  constructor(name: string) { super(name); }\n  makeSound(): void { console.log(`${this.name} meows`); }\n}\n\nconst dog = new Dog('Buddy');\ndog.makeSound(); // Buddy barks\ndog.move(); // Buddy moves\ndog.fetch(); // Buddy fetches",
            "commonMistakes": "Deep inheritance hierarchies (more than 2-3 levels become fragile). Using inheritance for code reuse instead of composition ('is-a' vs 'has-a'). Violating Liskov Substitution Principle (subclass that breaks parent contract). Overriding methods and calling super in unexpected ways.",
            "bestPractices": "Prefer composition over inheritance. Use inheritance only for true 'is-a' relationships. Keep hierarchies shallow (max 3 levels). Make base classes abstract (forcing subclasses to implement specific methods). Favor interfaces for defining contracts.",
            "interviewPerspective": "Inheritance is a fundamental OOP concept for LLD interviews. Discuss: (1) When to use inheritance: clear hierarchy with shared behavior. (2) When NOT to use: just to share code (use composition/DI instead). (3) The fragile base class problem: changes to parent can break child classes. (4) Diamond problem: multiple inheritance conflicts (TypeScript avoids this with single inheritance + interfaces). The best answers show judgment: 'I could use inheritance here because User and Admin share common behavior, but I'd use composition for the notification system since different notification types are not a hierarchy.'",
            "performanceNotes": "Method dispatch through inheritance involves virtual table lookup (vtable) in most OOP languages. Cost is negligible (a few nanoseconds). TypeScript compiles inheritance to JavaScript prototype chain.",
            "securityNotes": "Overridable methods can be exploited if not careful. Use sealed/final methods for security-critical operations. Protected members are accessible to subclasses but not external code."
          },
          "quiz": [
            {
              "id": "lld-inherit-1",
              "question": "What problem does inheritance solve?",
              "options": [
                "Code reuse by sharing common behavior in a base class",
                "Making all methods public",
                "Replacing composition",
                "Eliminating the need for interfaces"
              ],
              "correctIndex": 0,
              "explanation": "Inheritance centralizes common logic in a base class, eliminating code duplication across related classes.",
              "difficulty": "easy"
            },
            {
              "id": "lld-inherit-2",
              "question": "What is the fragile base class problem?",
              "options": [
                "Changes to a base class can break derived classes unexpectedly",
                "Base classes are hard to create",
                "Base classes use too much memory",
                "Derived classes cannot override base methods"
              ],
              "correctIndex": 0,
              "explanation": "The fragile base class problem occurs when seemingly safe changes to a base class break derived classes.",
              "difficulty": "medium"
            },
            {
              "id": "lld-inherit-3",
              "question": "Which principle suggests preferring composition over inheritance?",
              "options": [
                "Favor composition over inheritance (Gang of Four)",
                "Single Responsibility Principle",
                "Interface Segregation Principle",
                "Liskov Substitution Principle"
              ],
              "correctIndex": 0,
              "explanation": "The GoF design patterns book recommends preferring composition over inheritance because it's more flexible.",
              "difficulty": "medium"
            },
            {
              "id": "lld-inherit-4",
              "question": "In the Liskov Substitution Principle, a subclass should:",
              "options": [
                "Be substitutable for its parent without altering correctness",
                "Override all parent methods",
                "Have more restrictive access than parent",
                "Throw additional exceptions not in parent"
              ],
              "correctIndex": 0,
              "explanation": "LSP states that objects of a subclass should be replaceable for objects of the parent class without affecting program correctness.",
              "difficulty": "hard"
            },
            {
              "id": "lld-inherit-5",
              "question": "What is the diamond problem in inheritance?",
              "options": [
                "Ambiguity when a class inherits from two classes with a common ancestor",
                "Circular dependency in inheritance",
                "A class that inherits from itself",
                "Too many levels of inheritance"
              ],
              "correctIndex": 0,
              "explanation": "The diamond problem occurs when a class inherits from two classes that share a common ancestor, causing ambiguity.",
              "difficulty": "hard"
            }
          ],
          "faangQuestions": [
            {
              "question": "Compare inheritance vs composition for building a UI component library. When would you use each?",
              "answer": "Inheritance: Use for is-a relationships like Button extends Component when components share base behavior (render lifecycle, state management). Good for frameworks where the base class provides hooks. Composition: Use for has-a relationships like Dialog has-a Header, Body, Footer. Better for flexible UIs where components can be combined arbitrarily. In practice, composition is preferred because it avoids the fragile base class problem and allows more flexible reuse. React shifted from mixins (inheritance) to hooks (composition) for this reason.",
              "difficulty": "hard",
              "company": "Meta"
            },
            {
              "question": "What is the Liskov Substitution Principle and how does it relate to inheritance?",
              "answer": "LSP states that objects of a subclass should be substitutable for objects of the superclass without altering program correctness. Violations include: overriding a method to throw new exceptions, strengthening preconditions, weakening postconditions, or changing the expected behavior. Example: Rectangle-Square problem - Square extending Rectangle violates LSP because setting width on a Square also changes height, breaking the Rectangle contract. Fix: make both immutable or use a common Shape interface.",
              "difficulty": "medium",
              "company": "Microsoft"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "polymorphism",
          "title": "Polymorphism",
          "order": 3,
          "content": {
            "overview": "Polymorphism (many forms) allows objects of different types to respond to the same method call in their own way. It's the ability to present the same interface for different data types. The two types are compile-time (method overloading) and runtime (method overriding via inheritance).",
            "problemStatement": "Without polymorphism, code is full of if-else chains checking object types: `if (obj instanceof Dog) makeSound(); else if (obj instanceof Cat) makeSound()`. Adding a new animal requires modifying all these chains. Polymorphism eliminates this by letting each object handle the call appropriately.",
            "intuitionFirst": "A universal remote control has a 'Play' button. Pressing Play on a DVD player starts the movie, on a music player starts the song, on a game console starts the game. Same interface, different implementations.",
            "realLifeAnalogy": "A restaurant kitchen: the 'Cook' method is called on different chefs. The pizza chef makes pizza, the sushi chef makes sushi, the pastry chef makes dessert. The calling code (waiter) doesn't care which chef - just calls cook().",
            "howItWorks": "Runtime polymorphism: a base class defines a method as abstract/virtual. Subclasses override with specific behavior. Code that uses the base type can call the method without knowing the concrete type. The correct implementation is dispatched at runtime based on the actual object type. Compile-time polymorphism: multiple methods with same name but different parameters (overloading).",
            "beginnerExample": "// Runtime polymorphism via interface\ninterface PaymentMethod {\n  pay(amount: number): void;\n}\n\nclass CreditCard implements PaymentMethod {\n  pay(amount: number): void {\n    console.log(`Paid $${amount} via Credit Card`);\n  }\n}\n\nclass PayPal implements PaymentMethod {\n  pay(amount: number): void {\n    console.log(`Paid $${amount} via PayPal`);\n  }\n}\n\nclass Cash implements PaymentMethod {\n  pay(amount: number): void {\n    console.log(`Paid $${amount} in Cash`);\n  }\n}\n\n// Client code doesn't need to know payment type\nfunction checkout(cart: Cart, payment: PaymentMethod): void {\n  const total = cart.getTotal();\n  payment.pay(total);\n  // payment could be CreditCard, PayPal, or Cash\n}",
            "commonMistakes": "Using type-checking (instanceof) instead of polymorphism - this defeats the purpose. Forgetting to declare methods as virtual/overridable in languages that require it. Creating interfaces that are too specific (defeats polymorphism).",
            "bestPractices": "Design interfaces for the common behavior. Use polymorphic method dispatch instead of conditional logic. Follow the Open/Closed Principle: classes open for extension (new subclasses) but closed for modification. Use Strategy or State patterns for runtime behavior selection.",
            "interviewPerspective": "Polymorphism is the most powerful OOP concept. In LLD interviews, demonstrate it through clean design. Discuss: (1) Polymorphism eliminates switch/if-else chains checking types. (2) Strategy Pattern: selecting algorithms at runtime (payment methods, sorting strategies). (3) Template Method Pattern: defining skeleton algorithm with overridable steps. Interviewers look for: 'When a new type needs to be added, I just create a new class implementing the interface - no existing code changes.'",
            "performanceNotes": "Virtual method dispatch adds a tiny overhead (one indirect jump). Modern CPUs predict this well. In performance-critical code, consider final methods or manual dispatch. In TypeScript, JavaScript prototype chain dispatch is well-optimized.",
            "securityNotes": "Polymorphism can be used for security: different user roles can implement the same interface with different permission checks."
          },
          "quiz": [
            {
              "id": "lld-poly-1",
              "question": "What is polymorphism in OOP?",
              "options": [
                "Objects of different types responding to the same method call differently",
                "A class having only one form",
                "Variables changing type at runtime",
                "Methods with the same name but different parameters"
              ],
              "correctIndex": 0,
              "explanation": "Polymorphism allows objects of different types to respond to the same method call in their own way.",
              "difficulty": "easy"
            },
            {
              "id": "lld-poly-2",
              "question": "Which pattern uses polymorphism to select algorithms at runtime?",
              "options": [
                "Strategy Pattern",
                "Singleton Pattern",
                "Factory Pattern",
                "Observer Pattern"
              ],
              "correctIndex": 0,
              "explanation": "The Strategy Pattern uses polymorphism to encapsulate interchangeable algorithms and select them at runtime.",
              "difficulty": "medium"
            },
            {
              "id": "lld-poly-3",
              "question": "Runtime polymorphism is achieved through:",
              "options": [
                "Method overriding via inheritance",
                "Method overloading",
                "Operator overloading",
                "Template specialization"
              ],
              "correctIndex": 0,
              "explanation": "Runtime polymorphism uses method overriding where subclasses provide specific implementations of base class methods.",
              "difficulty": "easy"
            },
            {
              "id": "lld-poly-4",
              "question": "What coding practice does polymorphism eliminate?",
              "options": [
                "If-else chains checking object types",
                "All switch statements",
                "Constructor overloading",
                "Variable declarations"
              ],
              "correctIndex": 0,
              "explanation": "Polymorphism eliminates conditional logic checking object types by letting each object handle calls appropriately.",
              "difficulty": "medium"
            },
            {
              "id": "lld-poly-5",
              "question": "A payment processing system where CreditCard, PayPal, and Crypto all implement a pay() method is an example of:",
              "options": [
                "Polymorphism",
                "Encapsulation",
                "Inheritance",
                "Abstraction"
              ],
              "correctIndex": 0,
              "explanation": "Multiple payment types implementing the same interface with different pay() behavior is classic polymorphism.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design a notification system that supports Email, SMS, and Push notifications using polymorphism.",
              "answer": "Define a NotificationSender interface with send(message) method. Implement EmailSender, SMSSender, PushSender classes. The notification service takes a list of NotificationSender instances and calls send() on each. New notification channels can be added without modifying existing code (Open/Closed Principle). Use a factory or dependency injection to configure which senders to use. For enterprise use, add retry logic, templating, and delivery tracking within each sender.",
              "difficulty": "medium",
              "company": "Uber"
            },
            {
              "question": "How does the Strategy Pattern use polymorphism? Provide a sorting example.",
              "answer": "The Strategy Pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. Strategy interface defines sort(data) method. Concrete strategies: BubbleSort, QuickSort, MergeSort, TimSort. The context class takes a SortingStrategy and delegates to it. At runtime, the strategy can be swapped based on data size or characteristics. This is pure polymorphism - the context doesn't know which sorting algorithm is being used.",
              "difficulty": "hard",
              "company": "Google"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "abstraction",
          "title": "Abstraction",
          "order": 4,
          "content": {
            "overview": "Abstraction hides complex implementation details and exposes only essential features. It reduces complexity by letting programmers think at a higher level. In OOP, abstraction is achieved through abstract classes and interfaces that define contracts without implementation details.",
            "problemStatement": "A modern car has thousands of parts. A driver doesn't need to understand the engine, transmission, or electronics to drive. Abstraction hides this complexity behind a simple interface: steering wheel, pedals, and gear shift. The same principle applies to software.",
            "intuitionFirst": "A coffee machine: you press a button, you get coffee. You don't need to understand the water pump, grinder, heating element, or the control board. The button is the abstraction - hiding enormous complexity behind a simple interface.",
            "realLifeAnalogy": "A smartphone: you use the touchscreen interface without understanding the CPU, OS, memory management, or radio frequencies. The screen interface abstracts away the billions of transistors and lines of OS code.",
            "howItWorks": "In TypeScript, abstraction is achieved through: (1) Interfaces: define method signatures without implementation. (2) Abstract classes: can have both abstract (no body) and concrete methods. Concrete subclasses provide implementation for abstract methods. The client code depends on the abstraction (interface/abstract class), not the concrete implementation. This enables swapping implementations without changing client code.",
            "beginnerExample": "// Abstraction via interface\ninterface NotificationService {\n  send(message: string, recipient: string): Promise<boolean>;\n}\n\n// Multiple implementations\nclass EmailService implements NotificationService {\n  async send(message: string, recipient: string): Promise<boolean> {\n    // Complex SMTP logic hidden here\n    await smtpClient.send({ to: recipient, body: message });\n    return true;\n  }\n}\n\nclass SMSService implements NotificationService {\n  async send(message: string, recipient: string): Promise<boolean> {\n    // Complex SMS gateway logic hidden here\n    await twilioClient.messages.create({ body: message, to: recipient });\n    return true;\n  }\n}\n\n// Usage - depends on abstraction, not concrete type\nclass OrderProcessor {\n  constructor(private notifier: NotificationService) {}\n\n  async processOrder(order: Order): Promise<void> {\n    // Process order...\n    await this.notifier.send('Order confirmed', order.userEmail);\n  }\n}",
            "commonMistakes": "Leaky abstractions (implementation details visible through the interface). Over-abstraction (interfaces for everything, even simple one-use classes). Under-abstraction (not hiding complex logic). Creating interfaces that don't make sense for all implementors (fat interfaces).",
            "bestPractices": "Design interfaces from the client's perspective, not the implementer's. Keep interfaces focused (Interface Segregation Principle). Use dependency injection to swap implementations. Hide internal complexity behind well-defined boundaries. Abstract at the right level: not too high (losing power) or too low (exposing details).",
            "interviewPerspective": "Abstraction is key to clean architecture. In LLD discussions, show how you layer abstractions: 'The controller depends on the OrderService interface, not the concrete implementation. The OrderService depends on the PaymentGateway interface, not Stripe directly.' This enables: unit testing with mocks, swapping providers, and parallel development. Discuss the Dependency Inversion Principle: high-level modules should not depend on low-level modules - both should depend on abstractions.",
            "performanceNotes": "Abstraction adds no runtime cost in TypeScript (interfaces are compile-time only). In languages with dynamic dispatch, virtual method calls add minimal overhead. Inline caching and JIT compilation eliminate most costs in hot paths.",
            "securityNotes": "Abstraction can improve security: expose only what's necessary through the interface. Internal security logic (encryption, validation) stays hidden behind the abstraction boundary."
          },
          "quiz": [
            {
              "id": "lld-abst-1",
              "question": "What is abstraction in OOP?",
              "options": [
                "Hiding complex implementation details and showing only essential features",
                "Making all methods private",
                "Creating many small classes",
                "Using only interfaces"
              ],
              "correctIndex": 0,
              "explanation": "Abstraction means hiding complex implementation details and exposing only what's necessary.",
              "difficulty": "easy"
            },
            {
              "id": "lld-abst-2",
              "question": "How is abstraction different from encapsulation?",
              "options": [
                "Abstraction hides complexity, encapsulation hides data",
                "They are the same thing",
                "Abstraction is about data hiding",
                "Encapsulation is about simplifying interfaces"
              ],
              "correctIndex": 0,
              "explanation": "Abstraction focuses on hiding complexity (what it does), while encapsulation focuses on hiding data (how it does it).",
              "difficulty": "medium"
            },
            {
              "id": "lld-abst-3",
              "question": "Abstract classes vs Interfaces: which can have implemented methods?",
              "options": [
                "Abstract classes can have both abstract and concrete methods",
                "Only interfaces can have implemented methods",
                "Neither can have implemented methods",
                "Both can have implemented methods equally"
              ],
              "correctIndex": 0,
              "explanation": "Abstract classes can have both abstract methods (no body) and concrete methods (with implementation). Interfaces traditionally only have declarations, though modern languages add default methods.",
              "difficulty": "hard"
            },
            {
              "id": "lld-abst-4",
              "question": "Which is a good example of abstraction?",
              "options": [
                "A remote control with buttons to control a TV",
                "Directly accessing TV circuit boards",
                "A class with all public fields",
                "A method that requires 10 parameters"
              ],
              "correctIndex": 0,
              "explanation": "A remote control abstracts away the complex electronics behind simple buttons - the essence of abstraction.",
              "difficulty": "easy"
            },
            {
              "id": "lld-abst-5",
              "question": "What happens when an abstraction leaks implementation details?",
              "options": [
                "It violates the abstraction barrier and couples users to internals",
                "It becomes more useful",
                "Performance improves",
                "Security automatically improves"
              ],
              "correctIndex": 0,
              "explanation": "Leaky abstractions expose implementation details that couple users to internals that should remain hidden.",
              "difficulty": "hard"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design a file storage abstraction that supports local, S3, and GCS backends.",
              "answer": "Create a FileStorage interface with get(filePath), put(filePath, data), delete(filePath), list(directory) methods. Implement LocalStorage (reads from disk), S3Storage (uses AWS SDK), GCSStorage (uses GCP SDK). Each implementation handles its own authentication and error handling. The abstract interface hides storage backend details. Use dependency injection to select backend based on environment. For production, add CORS support, signed URLs, and multi-part uploads.",
              "difficulty": "hard",
              "company": "Amazon"
            },
            {
              "question": "Explain the concept of an abstract class vs interface in the context of database connection abstraction.",
              "answer": "Abstract class DatabaseConnection can define common functionality like connection pooling, retry logic, and query logging with both abstract methods (connect, disconnect, query) and concrete methods (logQuery, retryOnFailure). This is appropriate when all connections share state/behavior. Interface DataStore defines only the contract: get, set, delete, query. This is appropriate when implementations vary wildly. In practice, start with an interface and extract an abstract base class when common behavior emerges.",
              "difficulty": "medium",
              "company": "Microsoft"
            }
          ],
          "codingChallenges": []
        }
      ]
    },
    {
      "slug": "solid-principles",
      "title": "SOLID Principles",
      "description": "Master SOLID principles - SRP, OCP, LSP, ISP, DIP - the foundation of maintainable, scalable object-oriented design",
      "order": 2,
      "subtopics": [
        {
          "slug": "srp-ocp",
          "title": "SRP & OCP",
          "order": 1,
          "content": {
            "overview": "Single Responsibility Principle (SRP): A class should have one, and only one, reason to change. Open/Closed Principle (OCP): Software entities should be open for extension but closed for modification. These are the first two SOLID principles, fundamental for maintainable, scalable design.",
            "problemStatement": "Classes that do too much (God classes) are hard to understand, test, and maintain. A change to one responsibility breaks other responsibilities. Similarly, modifying existing tested code to add features introduces bugs. SOLID principles solve these problems.",
            "intuitionFirst": "SRP is like a chef in a kitchen. If the chef also has to wash dishes, manage inventory, and greet customers, every change (new menu, new detergent, new host system) forces changes to the chef. One person, one job.",
            "realLifeAnalogy": "SRP: A restaurant has specialized roles - chef (cooking), waiter (serving), cashier (payment), host (seating). Each has one responsibility. OCP: A restaurant can add new menu items (extend) without remodeling the kitchen (modify). The kitchen infrastructure stays the same.",
            "howItWorks": "SRP: Each class should have a single well-defined purpose. If a class has multiple responsibilities, split it. Identify responsibilities by asking 'who might want changes?' Different stakeholders = different responsibilities. OCP: Use abstraction (interfaces, abstract classes) to define stable contracts. New functionality is added by creating new implementations, not modifying existing ones. The Strategy pattern is a classic OCP example.",
            "beginnerExample": "// Violates SRP - one class does everything\nclass InvoiceService {\n  calculateTotal(items: Item[]): number { /* ... */ }\n  saveToDatabase(invoice: Invoice): void { /* ... */ }\n  sendEmail(invoice: Invoice): void { /* ... */ }\n  printInvoice(invoice: Invoice): void { /* ... */ }\n}\n\n// Follows SRP - each class has one responsibility\nclass InvoiceCalculator {\n  calculateTotal(items: Item[]): number { /* ... */ }\n}\n\nclass InvoiceRepository {\n  save(invoice: Invoice): void { /* ... */ }\n  getById(id: string): Invoice { /* ... */ }\n}\n\nclass EmailService {\n  sendInvoice(invoice: Invoice, to: string): void { /* ... */ }\n}\n\nclass InvoicePrinter {\n  print(invoice: Invoice): string { /* ... */ }\n}\n\n// OCP example - open for extension, closed for modification\ninterface DiscountStrategy {\n  calculate(amount: number): number;\n}\n\nclass NoDiscount implements DiscountStrategy {\n  calculate(amount: number): number { return 0; }\n}\n\nclass PercentageDiscount implements DiscountStrategy {\n  constructor(private percent: number) {}\n  calculate(amount: number): number { return amount * this.percent / 100; }\n}\n\nclass BogoDiscount implements DiscountStrategy {\n  calculate(amount: number): number { return amount > 100 ? 50 : 0; }\n}\n\n// Adding new discount type = new class (extend), not modifying existing code (closed)",
            "commonMistakes": "SRP: Taking it to extremes (one method per class). It's about cohesion - related behaviors can be in same class. OCP: Making everything extensible (unnecessary complexity). Over-engineering for features that may never come.",
            "bestPractices": "SRP: If you can't describe what a class does in one sentence without 'and', it probably violates SRP. OCP: Use polymorphism instead of conditionals. Add new behavior through new classes implementing interfaces, not by adding if-else to existing code.",
            "interviewPerspective": "SOLID principles are essential for LLD interviews. Discuss SRP: 'This class handles both calculation and persistence - let me split it.' Discuss OCP: 'If we need a new report format, we add a new ReportFormatter implementation instead of modifying the report generator.' These demonstrate clean code thinking.",
            "performanceNotes": "Following SRP and OCP can increase number of classes/files. Impact on performance is negligible (good compilers inline and optimize). The maintainability benefits far outweigh the minimal overhead."
          },
          "quiz": [],
          "faangQuestions": [],
          "codingChallenges": []
        },
        {
          "slug": "lsp-isp-dip",
          "title": "LSP, ISP & DIP",
          "order": 2,
          "content": {
            "overview": "Liskov Substitution Principle (LSP): Subtypes must be substitutable for their base types. Interface Segregation Principle (ISP): Clients should not be forced to depend on interfaces they don't use. Dependency Inversion Principle (DIP): High-level modules should not depend on low-level modules; both should depend on abstractions.",
            "problemStatement": "Subclasses that break parent contracts cause subtle bugs. Interfaces that force implementing useless methods violate ISP. Direct dependency on concrete implementations makes code rigid and untestable. These three principles prevent these issues.",
            "intuitionFirst": "LSP: If a function works with a Bird, it should also work with a Duck (subtype). But if you pass a Penguin, and the function calls fly(), it breaks - Penguin is not a proper subtype if Bird implies flying. ISP: Don't force a printer to implement fax if it doesn't fax. DIP: Your coffee maker shouldn't be wired directly to the power plant - it should depend on the wall socket (abstraction).",
            "realLifeAnalogy": "LSP: A square is a rectangle mathematically, but in code, setting width independently from height changes a square's invariant (all sides equal). Square cannot properly substitute Rectangle. ISP: A multi-function printer should have separate interfaces for Print, Scan, and Fax - a simple printer only implements Print. DIP: A TV remote (high-level) depends on the IR signal interface, not on the specific TV model (low-level). Any TV with IR receiver works.",
            "howItWorks": "LSP: Preconditions cannot be strengthened in subclass. Postconditions cannot be weakened. Invariants must be preserved. If a subclass violates any of these, it should not inherit from that base. ISP: Split large interfaces into smaller, focused ones. Clients implement only what they need. DIP: Inject dependencies through constructor parameters. Depend on interfaces/abstract classes, not concrete implementations.",
            "beginnerExample": "// LSP violation - Square extends Rectangle\nclass Rectangle {\n  constructor(protected width: number, protected height: number) {}\n  setWidth(w: number): void { this.width = w; }\n  setHeight(h: number): void { this.height = h; }\n  getArea(): number { return this.width * this.height; }\n}\n\nclass Square extends Rectangle {\n  setWidth(w: number): void { this.width = w; this.height = w; } // Violates LSP!\n  setHeight(h: number): void { this.width = h; this.height = h; } // client expecting independent dims breaks\n}\n\n// Better: separate interface\ninterface Shape {\n  getArea(): number;\n}\nclass RectOK implements Shape { /* width & height independent */ }\nclass SquareOK implements Shape { /* single side */ }\n\n// ISP - segregated interfaces\ninterface Printer { print(doc: Document): void; }\ninterface Scanner { scan(): Document; }\ninterface Fax { send(doc: Document, number: string): void; }\n\nclass SimplePrinter implements Printer { /* only print */ }\nclass MultiFunctionPrinter implements Printer, Scanner, Fax { /* all three */ }\n\n// DIP - depends on abstraction\ninterface Database {\n  save(order: Order): Promise<void>;\n  getById(id: string): Promise<Order | null>;\n}\n\nclass OrderService {\n  constructor(private db: Database) {} // Depends on abstraction!\n  async createOrder(items: Item[]): Promise<Order> {\n    const order = new Order(items);\n    await this.db.save(order);\n    return order;\n  }\n}",
            "commonMistakes": "LSP: Using inheritance just because classes share some behavior. ISP: Creating interfaces that are too granular (too many tiny interfaces). DIP: Depending on concrete classes 'because it's simpler' (makes code rigid and untestable).",
            "bestPractices": "LSP: Prefer composition over inheritance. If a subclass violates LSP, refactor to use interfaces. ISP: Design interfaces from client perspective - what does the client need? DIP: Use dependency injection containers. Constructor injection is preferred. Avoid service locator pattern.",
            "interviewPerspective": "These three principles show deep design understanding. For LSP: 'I need to be careful that my Square class can properly substitute for Rectangle - it can't, so I'll use a Shape interface instead.' For ISP: 'The ReportGenerator only needs read access to data, not write - I'll split the interface.' For DIP: 'The OrderService doesn't care if we're using PostgreSQL or MongoDB - it just needs something that implements the OrderRepository interface.'",
            "performanceNotes": "These principles add indirection (interfaces, dependency injection). Overhead is negligible and often optimized away. The benefits for testability and maintainability are enormous."
          },
          "quiz": [],
          "faangQuestions": [],
          "codingChallenges": []
        }
      ]
    },
    {
      "slug": "creational-patterns",
      "title": "Creational Patterns",
      "description": "Master creational design patterns - Singleton, Factory, and Builder for flexible object creation",
      "order": 3,
      "subtopics": [
        {
          "slug": "singleton",
          "title": "Singleton Pattern",
          "order": 1,
          "content": {
            "overview": "Singleton ensures a class has only one instance and provides a global point of access to it. Common use cases: database connection pools, configuration managers, logging, and caching services. While useful, it's also criticized for hiding dependencies and making testing harder.",
            "problemStatement": "Some resources should only have one instance: a database connection pool should not create unlimited connections, a configuration file should be loaded once, and a logger should write to a single file. Uncontrolled instantiation wastes resources and causes conflicts.",
            "intuitionFirst": "A country has only one president at a time. There can only be one person who is 'the president'. If anyone needs to contact the government, they go through the president's office. Same with Singleton - one instance, global access point.",
            "realLifeAnalogy": "The CEO of a company: there's only one CEO at any time. All departments communicate through the CEO's office. If two people were acting as CEO simultaneously, there would be chaos. Singleton ensures single instance + controlled access.",
            "howItWorks": "The class has a private constructor (prevents external instantiation), a private static instance variable, and a public static getInstance() method. The first call creates the instance, subsequent calls return the existing one. Thread-safe implementation uses double-checked locking or an init-on-demand holder pattern.",
            "beginnerExample": "class Logger {\n  private static instance: Logger;\n  private logFile: string[] = [];\n\n  private constructor() {} // Private constructor prevents instantiation\n\n  static getInstance(): Logger {\n    if (!Logger.instance) {\n      Logger.instance = new Logger();\n    }\n    return Logger.instance;\n  }\n\n  log(message: string): void {\n    const timestamp = new Date().toISOString();\n    this.logFile.push(`[${timestamp}] ${message}`);\n    console.log(`[${timestamp}] ${message}`);\n  }\n\n  getLogs(): string[] { return [...this.logFile]; }\n}\n\n// Usage\nconst logger = Logger.getInstance();\nlogger.log('Application started');\nlogger.log('User logged in');\n\n// Anywhere in codebase, same instance\nconst sameLogger = Logger.getInstance();\nsameLogger.log('Another action');\n// Both logger and sameLogger are the same object",
            "commonMistakes": "Using Singleton for everything (creates hidden global state). Not making it thread-safe in multi-threaded environments (multiple instances created). Singleton becoming a God object (does too much). Testing difficulties (hard to mock Singleton).",
            "bestPractices": "Use dependency injection instead when possible (DI container naturally creates singletons). Use Singleton only for truly single-instance resources (hardware interfaces, unique system resources). Make Singleton thread-safe. Consider lazy initialization for performance.",
            "interviewPerspective": "Singleton is the most commonly discussed creational pattern. Discuss: (1) When it's appropriate: configuration, logging, connection pools. (2) When it's NOT: most cases - prefer DI. (3) Implementation variants: eager, lazy, thread-safe, enum-based. (4) Criticism: Singleton makes code hard to test because of hidden global state. Modern alternative: DI containers (the container creates a single instance but code doesn't know it's a Singleton).",
            "performanceNotes": "Lazy initialization: instance created on first use (saves resources if never used). Double-checked locking: minimal synchronization overhead. In TypeScript/JavaScript, modules are singletons by default (module exports are cached).",
            "securityNotes": "Singleton can be a security risk if it holds sensitive data (the single instance is a single target). Ensure the Singleton properly validates access to sensitive methods."
          },
          "quiz": [],
          "faangQuestions": [],
          "codingChallenges": []
        },
        {
          "slug": "factory",
          "title": "Factory Pattern",
          "order": 2,
          "content": {
            "overview": "Factory pattern provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created. It encapsulates object creation logic, making code more flexible and reducing duplication. The Factory Method and Abstract Factory are the two main variants.",
            "problemStatement": "Direct object construction (new keyword) tightly couples code to concrete classes. If object creation is complex (requires configuration, dependencies, or decision logic), it's duplicated everywhere the object is needed. Changes to construction ripple through the codebase.",
            "intuitionFirst": "A car factory doesn't custom-build every car from scratch when you order. You choose a model, and the factory assembles the right components. You don't need to know how the engine, transmission, and chassis are made.",
            "realLifeAnalogy": "A pizza restaurant: you order 'pepperoni pizza'. The kitchen (factory) handles the complex process of making the dough, adding sauce, cheese, and pepperoni, and baking it. You just specify the type and receive the finished product.",
            "howItWorks": "Factory Method: defines an interface for creating an object, but lets subclasses decide which class to instantiate. A single create method returns different subtypes based on input. Abstract Factory: provides an interface for creating families of related objects without specifying concrete classes. Think of it as a factory of factories.",
            "beginnerExample": "// Factory Method\ninterface PaymentGateway {\n  process(amount: number): Promise<boolean>;\n}\n\nclass StripeGateway implements PaymentGateway {\n  async process(amount: number): Promise<boolean> {\n    console.log(`Processing $${amount} via Stripe`);\n    return true;\n  }\n}\n\nclass PayPalGateway implements PaymentGateway {\n  async process(amount: number): Promise<boolean> {\n    console.log(`Processing $${amount} via PayPal`);\n    return true;\n  }\n}\n\nclass PaymentGatewayFactory {\n  static create(type: 'stripe' | 'paypal'): PaymentGateway {\n    switch (type) {\n      case 'stripe': return new StripeGateway();\n      case 'paypal': return new PayPalGateway();\n      default: throw new Error(`Unknown gateway: ${type}`);\n    }\n  }\n}\n\n// Abstract Factory\ninterface UIFactory {\n  createButton(): Button;\n  createTextField(): TextField;\n  createCheckbox(): Checkbox;\n}\n\nclass MaterialUIFactory implements UIFactory {\n  createButton(): Button { return new MaterialButton(); }\n  createTextField(): TextField { return new MaterialTextField(); }\n  createCheckbox(): Checkbox { return new MaterialCheckbox(); }\n}\n\nclass iOSUIFactory implements UIFactory {\n  createButton(): Button { return new iOSButton(); }\n  createTextField(): TextField { return new iOSTextField(); }\n  createCheckbox(): Checkbox { return new iOSCheckbox(); }\n}",
            "commonMistakes": "Creating a Factory for every class (over-engineering). Adding complexity when simple constructors suffice. Not using Factory when construction logic is duplicated. Factory creating too many responsibilities.",
            "bestPractices": "Use Factory when object creation is complex, depends on configuration, or should be centralized. Use DI containers for most dependency creation (they are factories). Keep factories focused on creation only. Use Factory Method for simple creation, Abstract Factory for families of related objects.",
            "interviewPerspective": "Factory pattern shows design maturity. Discuss: (1) Factory Method vs Abstract Factory. (2) When to use: creating objects with complex setup, cross-platform UI, different database drivers. (3) Relationship with DI containers (Spring, NestJS injectors are factories). (4) Simple Factory vs Factory Method vs Abstract Factory hierarchy of complexity.",
            "performanceNotes": "Factory adds minimal overhead (one method call for construction). The main cost is in object construction itself, which would happen anyway. Factories can implement object pooling for expensive objects.",
            "securityNotes": "Factory can centralize security checks: validation of construction parameters, permission checks for object creation, and auditing."
          },
          "quiz": [],
          "faangQuestions": [],
          "codingChallenges": []
        },
        {
          "slug": "builder",
          "title": "Builder Pattern",
          "order": 3,
          "content": {
            "overview": "Builder pattern separates the construction of a complex object from its representation, allowing the same construction process to create different representations. It's particularly useful when an object has many optional parameters or requires a multi-step construction process.",
            "problemStatement": "Objects with many optional parameters lead to telescoping constructors (constructor(1 param), constructor(2 params), constructor(3 params)...) which are hard to read and error-prone. Passing null for optional parameters is ugly and fragile.",
            "intuitionFirst": "Building a custom PC: you don't call a constructor with 20 parameters. You go through a configuration process step by step: choose CPU, choose RAM, choose GPU, choose storage, choose case. At the end, you get the assembled PC.",
            "realLifeAnalogy": "Ordering a Subway sandwich: you don't order with one big request. You go step by step: choose bread, choose meat, choose cheese, add veggies, add sauce, toast it. The sandwich maker (builder) handles all the complexity.",
            "howItWorks": "A Builder class has methods for each configurable part. Each method returns the builder (for chaining). A build() method returns the fully constructed object. The Director pattern adds an additional layer that orchestrates the building steps for common configurations.",
            "beginnerExample": "class HttpRequest {\n  constructor(\n    readonly method: string,\n    readonly url: string,\n    readonly headers: Record<string, string>,\n    readonly body?: any,\n    readonly timeout?: number,\n    readonly retries?: number,\n    readonly followRedirects?: boolean\n  ) {}\n}\n\nclass HttpRequestBuilder {\n  private method = 'GET';\n  private url = '';\n  private headers: Record<string, string> = {};\n  private body?: any;\n  private timeout = 30000;\n  private retries = 0;\n  private followRedirects = true;\n\n  setMethod(method: string): this {\n    this.method = method;\n    return this;\n  }\n\n  setUrl(url: string): this {\n    this.url = url;\n    return this;\n  }\n\n  setHeader(key: string, value: string): this {\n    this.headers[key] = value;\n    return this;\n  }\n\n  setBody(body: any): this {\n    this.body = body;\n    return this;\n  }\n\n  setTimeout(timeout: number): this {\n    this.timeout = timeout;\n    return this;\n  }\n\n  setRetries(retries: number): this {\n    this.retries = retries;\n    return this;\n  }\n\n  build(): HttpRequest {\n    if (!this.url) throw new Error('URL is required');\n    return new HttpRequest(\n      this.method,\n      this.url,\n      this.headers,\n      this.body,\n      this.timeout,\n      this.retries,\n      this.followRedirects\n    );\n  }\n}\n\n// Usage with method chaining\nconst request = new HttpRequestBuilder()\n  .setMethod('POST')\n  .setUrl('https://api.example.com/users')\n  .setHeader('Content-Type', 'application/json')\n  .setBody({ name: 'John', email: 'john@example.com' })\n  .setTimeout(5000)\n  .setRetries(3)\n  .build();",
            "commonMistakes": "Creating a Builder for objects with few parameters (over-engineering). Not validating required fields in build(). Making builder mutable after build() (caller can change already-built object). Forgetting to reset builder state for reuse.",
            "bestPractices": "Use Builder when: 4+ optional parameters, multi-step construction, or need different representations. Validate all required fields in build(). Make built objects immutable. Consider supporting a Director for common configurations.",
            "interviewPerspective": "Builder is popular in LLD interviews. Discuss: (1) Telescoping constructor anti-pattern and how Builder solves it. (2) Fluent interface (method chaining). (3) Immutability: Builder constructs immutable objects. (4) Step Builder pattern for enforcing construction order. (5) Director: reusable configurations. Show the improvement from constructor explosion to clean fluent API.",
            "performanceNotes": "Builder creates an extra object (the builder itself). In most cases this overhead is negligible. For high-frequency creation, consider reusing builder instances and resetting state."
          },
          "quiz": [],
          "faangQuestions": [],
          "codingChallenges": []
        }
      ]
    },
    {
      "slug": "structural-patterns",
      "title": "Structural Patterns",
      "description": "Master structural design patterns - Adapter, Facade, and Decorator for flexible class and object composition",
      "order": 4,
      "subtopics": [
        {
          "slug": "adapter",
          "title": "Adapter Pattern",
          "order": 1,
          "content": {
            "overview": "Adapter allows incompatible interfaces to work together. It acts as a wrapper that converts one interface into another that clients expect. This is particularly useful when integrating third-party libraries or legacy code into a system with established interfaces.",
            "problemStatement": "A new payment gateway has a completely different API than the one your system uses. Rewriting your system isn't feasible. The gateway's API can't change (it's external). An Adapter bridges the gap without modifying either side.",
            "intuitionFirst": "A power plug adapter: your device has a US plug (two flat pins), but you're traveling to Europe (round sockets). The adapter converts between the two without changing either the device or the wall socket.",
            "realLifeAnalogy": "A translator between two people speaking different languages. Each person speaks their native language. The translator (adapter) converts messages between them without either person changing how they communicate.",
            "howItWorks": "The Adapter implements the target interface (what the client expects). It holds a reference to the adaptee (the incompatible class). Each method in the adapter delegates to the adaptee, performing any necessary conversion. There are two forms: class adapter (inheritance, not possible in TypeScript) and object adapter (composition).",
            "beginnerExample": "// Target interface - what our system expects\ninterface PaymentProcessor {\n  pay(amount: number, currency: string): Promise<{ success: boolean; transactionId: string }>;\n  refund(transactionId: string): Promise<boolean>;\n}\n\n// Adaptee - third-party payment gateway with different interface\nclass StripeAPI {\n  async charge(amountCents: number, currencyCode: string): Promise<{ id: string; status: string }> {\n    // Stripe-specific API\n    return { id: 'ch_' + Math.random(), status: 'succeeded' };\n  }\n\n  async refundCharge(chargeId: string): Promise<{ status: string }> {\n    return { status: 'succeeded' };\n  }\n}\n\n// Adapter - makes StripeAPI compatible with PaymentProcessor\nclass StripeAdapter implements PaymentProcessor {\n  constructor(private stripe: StripeAPI) {}\n\n  async pay(amount: number, currency: string): Promise<{ success: boolean; transactionId: string }> {\n    const result = await this.stripe.charge(Math.round(amount * 100), currency.toLowerCase());\n    return { success: result.status === 'succeeded', transactionId: result.id };\n  }\n\n  async refund(transactionId: string): Promise<boolean> {\n    const result = await this.stripe.refundCharge(transactionId);\n    return result.status === 'succeeded';\n  }\n}\n\n// Usage - client depends on PaymentProcessor interface\nclass CheckoutService {\n  constructor(private paymentProcessor: PaymentProcessor) {}\n\n  async processPayment(order: Order): Promise<void> {\n    const result = await this.paymentProcessor.pay(order.total, 'USD');\n    if (!result.success) throw new Error('Payment failed');\n    console.log(`Payment processed: ${result.transactionId}`);\n  }\n}\n\n// Switching to PayPal is just a new adapter\nclass PayPalAdapter implements PaymentProcessor {\n  // ... different mapping\n}",
            "commonMistakes": "Over-engineering: creating adapters when interfaces are already compatible. Adapter doing too much (should only convert interface, not add features). Not separating conversion logic (mixing adapter with business logic).",
            "bestPractices": "Use Adapter when integrating external/legacy code with incompatible interfaces. Keep adapter thin - just interface conversion. Consider Facade pattern if you need to simplify complex subsystem, not just convert interfaces.",
            "interviewPerspective": "Adapter is a common interview pattern. Discuss: (1) Integration scenarios: payment gateways, social media logins, external APIs. (2) Object Adapter (composition) vs Class Adapter (inheritance). (3) Two-way adapters (both interfaces need to be adapted). Example: 'I'd create a PayPalAdapter and a SquareAdapter, both implementing our PaymentProcessor interface, so the checkout service never changes.'",
            "performanceNotes": "Adapter adds minimal overhead (one extra method call per operation). The conversion logic is usually trivial. In hot paths, consider caching the adapter instance."
          },
          "quiz": [],
          "faangQuestions": [],
          "codingChallenges": []
        },
        {
          "slug": "facade",
          "title": "Facade Pattern",
          "order": 2,
          "content": {
            "overview": "Facade provides a simplified, unified interface to a complex subsystem. It doesn't hide the subsystem (clients can still access it directly) but offers a convenient higher-level interface. It reduces dependencies on subsystem details and promotes loose coupling.",
            "problemStatement": "A video conversion library has 50 classes: CodecFactory, AudioMixer, VideoSplitter, SubtitlesParser, ContainerMuxer, etc. Users don't want to understand all these to convert a video. They want one simple method: convert(inputFile, outputFormat).",
            "intuitionFirst": "A hotel front desk: behind the front desk, there's housekeeping, maintenance, room service, concierge, and accounting. The guest just calls the front desk for anything. The front desk (facade) handles the complexity.",
            "realLifeAnalogy": "A car's dashboard: starting the car involves the battery, starter motor, fuel pump, ignition system, ECU, and transmission. The driver just turns the key (or pushes a button). The dashboard and ignition system are the facade.",
            "howItWorks": "The Facade class knows which subsystem classes are responsible for a request. It delegates client requests to appropriate subsystem objects. The facade is optional - clients that need finer control can still access subsystem classes directly.",
            "beginnerExample": "// Complex subsystem - many interconnected classes\nclass CPU {\n  freeze(): void { /* ... */ }\n  jump(position: number): void { /* ... */ }\n  execute(): void { /* ... */ }\n}\n\nclass Memory {\n  load(position: number, data: Buffer): void { /* ... */ }\n}\n\nclass HardDrive {\n  read(lba: number, size: number): Buffer { return Buffer.alloc(0); }\n}\n\n// Facade - simplifies booting the computer\nclass ComputerFacade {\n  private cpu = new CPU();\n  private memory = new Memory();\n  private hardDrive = new HardDrive();\n\n  start(): void {\n    this.cpu.freeze();\n    this.memory.load(0, this.hardDrive.read(0, 1024));\n    this.cpu.jump(0);\n    this.cpu.execute();\n  }\n}\n\n// Usage\nconst computer = new ComputerFacade();\ncomputer.start(); // Simple call hides complex boot sequence\n\n// Another example: Order processing\nclass OrderFacade {\n  constructor(\n    private inventory: InventoryService,\n    private payment: PaymentService,\n    private shipping: ShippingService,\n    private notification: NotificationService\n  ) {}\n\n  async placeOrder(cart: Cart, user: User): Promise<OrderResult> {\n    // Complex orchestration simplified into one method\n    if (!this.inventory.checkAvailability(cart.items)) throw new Error('Out of stock');\n    this.inventory.reserve(cart.items);\n    const payment = await this.payment.charge(cart.total, user.paymentMethod);\n    const shipment = await this.shipping.createShipment(cart.items, user.address);\n    this.notification.sendOrderConfirmation(user.email, payment.id, shipment.tracking);\n    return { paymentId: payment.id, trackingNumber: shipment.tracking };\n  }\n}",
            "commonMistakes": "Creating a Facade that knows too much (becomes God object). Facade that is too restrictive (blocks access to needed subsystem features). Multiple facades for the same subsystem becoming inconsistent.",
            "bestPractices": "Use Facade to simplify commonly used operations. Keep Facade focused on a specific use case. Consider multiple facades for different client types. Facade is NOT a replacement for proper encapsulation - subsystem classes remain accessible.",
            "interviewPerspective": "Facade shows you think about API design and developer experience. Discuss: (1) Simplifying complex libraries. (2) Creating a clean public API while keeping internal complexity. (3) Difference from Adapter: Adapter converts interfaces, Facade simplifies/abstracts. (4) Anti-corruption layer in DDD: Facade prevents external system complexity from leaking into domain.",
            "performanceNotes": "Facade adds one extra method call. No significant overhead. In fact, Facade can improve performance by optimizing multi-step operations (e.g., batching database calls)."
          },
          "quiz": [],
          "faangQuestions": [],
          "codingChallenges": []
        },
        {
          "slug": "decorator",
          "title": "Decorator Pattern",
          "order": 3,
          "content": {
            "overview": "Decorator lets you attach new behaviors to objects by placing these objects inside special wrapper objects that contain the behaviors. It provides a flexible alternative to subclassing for extending functionality. Each decorator adds its own behavior before or after delegating to the wrapped object.",
            "problemStatement": "Adding features (logging, caching, compression, encryption) to an object by subclassing leads to a combinatorial explosion of classes. Notifier with SMS, Email, Slack, Facebook - each combination requires a separate class. Decorator solves this by stacking wrappers.",
            "intuitionFirst": "Building a sandwich: you start with bread (base object). You can add cheese (decorator), then meat (decorator), then lettuce (decorator). Each addition wraps the previous one. The final object has all behaviors. You can mix and match decorators freely.",
            "realLifeAnalogy": "Customizing a pizza: base pizza + extra cheese + pepperoni + mushrooms. Each topping is a decorator adding cost and flavor. You can order any combination without the restaurant creating a pre-defined class for each combination.",
            "howItWorks": "The Decorator implements the same interface as the component it wraps. It holds a reference to a wrapped component. It can add behavior before and/or after delegating to the wrapped component. Multiple decorators can be stacked - each wraps the previous one.",
            "beginnerExample": "// Component interface\ninterface Notifier {\n  send(message: string): void;\n}\n\n// Concrete component\nclass BaseNotifier implements Notifier {\n  send(message: string): void {\n    console.log(`Default: ${message}`);\n  }\n}\n\n// Base Decorator\nabstract class NotifierDecorator implements Notifier {\n  constructor(protected wrappee: Notifier) {}\n  abstract send(message: string): void;\n}\n\n// Concrete decorators\nclass SMSNotifier extends NotifierDecorator {\n  send(message: string): void {\n    console.log(`SMS: ${message}`);\n    this.wrappee.send(message);\n  }\n}\n\nclass EmailNotifier extends NotifierDecorator {\n  send(message: string): void {\n    console.log(`Email: ${message}`);\n    this.wrappee.send(message);\n  }\n}\n\nclass SlackNotifier extends NotifierDecorator {\n  send(message: string): void {\n    console.log(`Slack: ${message}`);\n    this.wrappee.send(message);\n  }\n}\n\n// Usage - stack decorators\nlet notifier: Notifier = new BaseNotifier();\nnotifier = new SMSNotifier(notifier);\nnotifier = new EmailNotifier(notifier);\nnotifier = new SlackNotifier(notifier);\n\nnotifier.send('Hello!');\n// Output:\n// Slack: Hello!\n// Email: Hello!\n// SMS: Hello!\n// Default: Hello!",
            "commonMistakes": "Decorator order dependency (decorators that must be applied in specific order). Creating decorators that change the interface (they should add behavior, not change API). Too many small decorators making stack unwieldy.",
            "bestPractices": "Use Decorator when you need to add behaviors dynamically and transparently. Ensure decorators are truly composable. Keep each decorator focused on one concern. Consider using the same pattern for middleware (Express.js middleware is a form of decorator).",
            "interviewPerspective": "Decorator demonstrates understanding of flexible design. Discuss: (1) Open/Closed Principle in action. (2) Stacking behaviors without inheritance explosion. (3) Real-world: Express middleware, Java I/O streams (BufferedInputStream wraps FileInputStream). (4) Comparison with Proxy pattern: Proxy controls access, Decorator adds behavior. Example: 'I'd use decorators to add logging, caching, and rate limiting to API handlers - each as a separate, composable decorator.'",
            "performanceNotes": "Each decorator adds one method call overhead. Deep stacks (10+ decorators) can add up. Inline caching in JS engines minimizes overhead for shallow stacks. Consider performance-critical paths and limit decorator depth."
          },
          "quiz": [],
          "faangQuestions": [],
          "codingChallenges": []
        }
      ]
    },
    {
      "slug": "behavioral-patterns",
      "title": "Behavioral Patterns",
      "description": "Master behavioral design patterns - Observer, Strategy, and Command for flexible object interaction and algorithm encapsulation",
      "order": 5,
      "subtopics": [
        {
          "slug": "observer",
          "title": "Observer Pattern",
          "order": 1,
          "content": {
            "overview": "Observer defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified automatically. It's the foundation of event-driven programming and is widely used in GUI frameworks, event handling systems, and reactive programming.",
            "problemStatement": "Multiple parts of a system need to know when something changes. Polling is inefficient (constant checking). Direct coupling (manually calling each dependent) is brittle - adding a new dependent requires modifying the source. Observer solves this with publish-subscribe.",
            "intuitionFirst": "A YouTube channel: you subscribe to a channel (observer). When the channel uploads a new video (subject changes state), you get notified (notification). The channel doesn't need to know who subscribed. You can subscribe/unsubscribe anytime.",
            "realLifeAnalogy": "A newspaper subscription: you subscribe to the newspaper. The publisher prints new editions and delivers to all subscribers. You don't need to check the newsstand every day. You can cancel your subscription anytime without affecting other subscribers.",
            "howItWorks": "Subject (Observable) maintains a list of observers. Observers implement an update() interface. When the subject's state changes, it iterates through observers and calls update(). Observers can subscribe/unsubscribe dynamically. Push model: subject pushes data to observers. Pull model: observers pull data from subject after notification.",
            "beginnerExample": "// Observer interface\ninterface Observer {\n  update(event: string, data: any): void;\n}\n\n// Subject (Observable)\nclass EventBus {\n  private observers: Map<string, Observer[]> = new Map();\n\n  subscribe(event: string, observer: Observer): void {\n    if (!this.observers.has(event)) {\n      this.observers.set(event, []);\n    }\n    this.observers.get(event)!.push(observer);\n  }\n\n  unsubscribe(event: string, observer: Observer): void {\n    const obs = this.observers.get(event);\n    if (obs) {\n      this.observers.set(event, obs.filter(o => o !== observer));\n    }\n  }\n\n  notify(event: string, data: any): void {\n    const observers = this.observers.get(event);\n    if (observers) {\n      for (const observer of observers) {\n        observer.update(event, data);\n      }\n    }\n  }\n}\n\n// Concrete observers\nclass EmailService implements Observer {\n  update(event: string, data: any): void {\n    if (event === 'user.registered') {\n      console.log(`Sending welcome email to ${data.email}`);\n    }\n  }\n}\n\nclass AnalyticsService implements Observer {\n  update(event: string, data: any): void {\n    console.log(`Tracking event: ${event}`);\n  }\n}\n\n// Usage\nconst bus = new EventBus();\nconst emailService = new EmailService();\nconst analytics = new AnalyticsService();\n\nbus.subscribe('user.registered', emailService);\nbus.subscribe('user.registered', analytics);\n\n// When user registers, both observers are notified\nbus.notify('user.registered', { email: 'user@example.com', name: 'John' });",
            "commonMistakes": "Memory leaks from not unsubscribing (observers holding references to subjects prevent GC). Notification ordering assumptions. Observer blocking the subject (sync notification blocks subject). Too many notifications (high-frequency state changes overwhelm observers).",
            "bestPractices": "Use weak references for observers to prevent memory leaks. Consider async notification for slow observers. Batch notifications for high-frequency events. Implement error handling so one failing observer doesn't break others. For complex systems, use message queues instead of in-process observer.",
            "interviewPerspective": "Observer is a fundamental pattern. Discuss: (1) Push vs Pull models. (2) Event emitters (Node.js EventEmitter). (3) ReactiveX (RxJS) - Observer + Iterator patterns. (4) Memory management: weak references. (5) Difference from Mediator: Mediator centralizes communication, Observer distributes. Example: 'For the stock trading system, I'd use Observer pattern - when a stock price changes, all interested parties (display boards, trading algorithms, alert services) are notified.'",
            "performanceNotes": "Synchronous notification: O(N) where N is observer count. Consider async for slow observers. Batching: coalesce multiple updates into one notification for rapid state changes. Event queue: decouple notification from processing using message queue."
          },
          "quiz": [],
          "faangQuestions": [],
          "codingChallenges": []
        },
        {
          "slug": "strategy",
          "title": "Strategy Pattern",
          "order": 2,
          "content": {
            "overview": "Strategy defines a family of algorithms, encapsulates each one, and makes them interchangeable. It lets the algorithm vary independently from the clients that use it. This is a clean implementation of the Open/Closed Principle - adding a new strategy doesn't require modifying existing code.",
            "problemStatement": "A class that needs to support multiple algorithms (e.g., sorting, compression, payment, routing) often ends up with complex conditional logic or a long switch statement. Adding a new algorithm requires modifying the class, risking bugs in existing functionality.",
            "intuitionFirst": "A GPS navigation app: you can choose different route strategies - fastest, shortest, avoid highways, scenic route. The app doesn't care which strategy you choose; it just calls 'calculateRoute()' and gets the result. The strategy is pluggable.",
            "realLifeAnalogy": "Payment at a store: you can pay with cash, credit card, mobile payment, or store credit. The store (context) accepts any payment method (strategy). The payment processing varies, but the checkout process is the same. Adding Apple Pay doesn't change the cash register.",
            "howItWorks": "Strategy interface defines the algorithm's contract. Concrete strategies implement different versions of the algorithm. The Context class holds a reference to a Strategy and delegates algorithm execution to it. The client selects and sets the appropriate strategy.",
            "beginnerExample": "// Strategy interface\ninterface CompressionStrategy {\n  compress(data: Buffer): Buffer;\n  decompress(data: Buffer): Buffer;\n}\n\n// Concrete strategies\nclass ZipCompression implements CompressionStrategy {\n  compress(data: Buffer): Buffer {\n    console.log('Compressing with ZIP');\n    return data; // simplified\n  }\n  decompress(data: Buffer): Buffer {\n    console.log('Decompressing ZIP');\n    return data;\n  }\n}\n\nclass GzipCompression implements CompressionStrategy {\n  compress(data: Buffer): Buffer {\n    console.log('Compressing with GZIP');\n    return data;\n  }\n  decompress(data: Buffer): Buffer {\n    console.log('Decompressing GZIP');\n    return data;\n  }\n}\n\n// Context\nclass FileCompressor {\n  constructor(private strategy: CompressionStrategy) {}\n\n  setStrategy(strategy: CompressionStrategy): void {\n    this.strategy = strategy;\n  }\n\n  compressFile(file: File): Buffer {\n    console.log(`Compressing ${file.name}...`);\n    return this.strategy.compress(file.data);\n  }\n\n  decompressFile(data: Buffer): Buffer {\n    return this.strategy.decompress(data);\n  }\n}\n\n// Usage\nconst compressor = new FileCompressor(new ZipCompression());\ncompressor.compressFile(myFile);\n\n// Switch strategy at runtime\ncompressor.setStrategy(new GzipCompression());\ncompressor.compressFile(myFile);\n\n// Another example: Sorting strategies\ninterface SortStrategy {\n  sort<T>(items: T[], compare: (a: T, b: T) => number): T[];\n}\n\nclass QuickSort implements SortStrategy { /* ... */ }\nclass MergeSort implements SortStrategy { /* ... */ }\nclass BubbleSort implements SortStrategy { /* ... */ }",
            "commonMistakes": "Over-engineering: creating strategies when a simple function parameter suffices. Strategies that share too much state with context (tighter coupling than needed). Strategy interface that is too specific (limits reusability).",
            "bestPractices": "Use Strategy when you have multiple algorithms that differ only in behavior. Keep strategy interfaces focused and general. Consider strategy as first-class functions where languages support them. Strategies should be stateless (or state should be external).",
            "interviewPerspective": "Strategy demonstrates clean OO design. Discuss: (1) Open/Closed Principle in action. (2) Replacing conditional logic with polymorphism. (3) Runtime algorithm switching. (4) Common use cases: payment processing, data compression, file format conversion, tax calculation, shipping cost calculation. Example: 'The ShippingCostCalculator uses a ShippingStrategy interface. We have FedExStrategy, UPSStrategy, and USPSStrategy. Adding DHL means adding one class, not modifying the calculator.'",
            "performanceNotes": "Strategy adds one virtual method call (negligible). Inline caching in JIT compilers eliminates overhead for repeatedly called strategies. Strategies can be cached if creation is expensive."
          },
          "quiz": [],
          "faangQuestions": [],
          "codingChallenges": []
        },
        {
          "slug": "command",
          "title": "Command Pattern",
          "order": 3,
          "content": {
            "overview": "Command turns a request into a standalone object that contains all information about the request. This transformation lets you parameterize methods with different requests, delay or queue a request's execution, and support undoable operations. It's the foundation for transactional behavior and task scheduling.",
            "problemStatement": "An application needs to support undo/redo, task queuing, logging operations, or macro recording. Direct method calls can't be stored, serialized, or reversed. Command pattern encapsulates an operation as an object, enabling these capabilities.",
            "intuitionFirst": "A TV remote control: each button (command) encapsulates an action (power on, volume up, change channel). The remote stores which buttons were pressed (history). You can press 'last' (undo) or record macros (sequence of commands).",
            "realLifeAnalogy": "A restaurant order: you tell the waiter your order. The waiter writes it on a ticket (command object). The ticket can be queued with other orders, prioritized (expedite), and if there's a mistake, the order can be sent back (undo).",
            "howItWorks": "Command interface declares execute() and optionally undo(). Concrete commands implement the action by calling methods on the Receiver. The Invoker (client code) creates commands and can store them for undo/redo, queue them, or log them. The client is decoupled from the receiver.",
            "beginnerExample": "// Command interface\ninterface Command {\n  execute(): void;\n  undo(): void;\n}\n\n// Receiver\nclass TextEditor {\n  private content = '';\n\n  write(text: string): void {\n    this.content += text;\n  }\n\n  delete(count: number): void {\n    this.content = this.content.slice(0, -count);\n  }\n\n  getContent(): string { return this.content; }\n}\n\n// Concrete commands\nclass WriteCommand implements Command {\n  constructor(private editor: TextEditor, private text: string) {}\n\n  execute(): void {\n    this.editor.write(this.text);\n  }\n\n  undo(): void {\n    this.editor.delete(this.text.length);\n  }\n}\n\nclass DeleteCommand implements Command {\n  private deletedText = '';\n\n  constructor(private editor: TextEditor, private count: number) {}\n\n  execute(): void {\n    const content = this.editor.getContent();\n    this.deletedText = content.slice(-this.count);\n    this.editor.delete(this.count);\n  }\n\n  undo(): void {\n    this.editor.write(this.deletedText);\n  }\n}\n\n// Invoker with undo/redo\nclass CommandHistory {\n  private undoStack: Command[] = [];\n  private redoStack: Command[] = [];\n\n  executeCommand(cmd: Command): void {\n    cmd.execute();\n    this.undoStack.push(cmd);\n    this.redoStack = []; // Clear redo on new command\n  }\n\n  undo(): void {\n    const cmd = this.undoStack.pop();\n    if (cmd) {\n      cmd.undo();\n      this.redoStack.push(cmd);\n    }\n  }\n\n  redo(): void {\n    const cmd = this.redoStack.pop();\n    if (cmd) {\n      cmd.execute();\n      this.undoStack.push(cmd);\n    }\n  }\n}",
            "commonMistakes": "Commands that are too large (should be one focused operation). Not implementing undo properly (undo must exactly reverse execute). Storing too much state in command (memory issues for long undo history).",
            "bestPractices": "Keep commands small and focused. Implement undo carefully - it must be the exact inverse of execute. Limit undo stack depth (memory bound). Consider Memento pattern for complex undo states. Use Command for: queuing, logging, transactional behavior, and macro recording.",
            "interviewPerspective": "Command is less commonly used but shows advanced design thinking. Discuss: (1) Undo/Redo: text editors, image editors, games. (2) Task queuing: background job processing. (3) Transactional behavior: all-or-nothing execution of command groups. (4) Macro recording: recording user actions for replay. Example: 'In the text editor, every user action (typing, deleting, formatting) is a Command object stored in the history. Ctrl+Z pops the last command and calls undo().'",
            "performanceNotes": "Each Command is an object allocation. For high-frequency operations, consider pooling or flyweight. Undo history can be memory-intensive - limit stack size or use Memento for compact state representation."
          },
          "quiz": [],
          "faangQuestions": [],
          "codingChallenges": []
        }
      ]
    },
    {
      "slug": "uml",
      "title": "UML",
      "description": "Master UML diagrams - Class Diagrams for static structure and Sequence Diagrams for dynamic behavior in object-oriented design",
      "order": 6,
      "subtopics": [
        {
          "slug": "class-diagrams",
          "title": "Class Diagrams",
          "order": 1,
          "content": {
            "overview": "Class diagrams are the most common UML diagram, showing the structure of a system: classes, their attributes, methods, and relationships. They provide a static view of the system and are essential for communicating and documenting object-oriented designs. Used heavily in LLD interviews to express design.",
            "problemStatement": "Describing object-oriented design verbally is imprecise and confusing. Different people have different mental models. Class diagrams provide a standard visual language for expressing class structures, relationships, and design patterns clearly and unambiguously.",
            "intuitionFirst": "A class diagram is like a blueprint for a building. The blueprint shows rooms (classes), doors (relationships), and dimensions (attributes). Everyone - architect, builder, electrician - uses the same blueprint to build the same building.",
            "realLifeAnalogy": "An organizational chart: boxes show roles (classes), lines show reporting relationships (associations/inheritance), labels show role names. Everyone understands the org chart the same way.",
            "howItWorks": "Class diagram notation: Box with three sections (class name, attributes, methods). Relationships: Association (solid line, simple link), Inheritance (empty triangle arrow, points to parent), Composition (filled diamond, part-of strong), Aggregation (empty diamond, has-a weak), Dependency (dashed arrow, uses). Multiplicity: 1, *, 0..1, 1..*. Access modifiers: + public, - private, # protected.",
            "beginnerExample": "// Corresponding TypeScript for this class diagram:\n// ┌──────────────────────┐\n// │       Vehicle        │  (abstract)\n// │──────────────────────│\n// │ # brand: string      │\n// │ # model: string      │\n// │ # year: number       │\n// │──────────────────────│\n// │ + start(): void      │\n// │ + stop(): void       │\n// │ # abstract drive():  │\n// └──────────┬───────────┘\n//            │ extends\n//      ┌─────┴─────┐\n// ┌────▼───┐ ┌────▼───┐\n// │  Car   │ │  Bike  │\n// │────────│ │────────│\n// │-doors  │ │-hasBask│\n// │────────│ │────────│\n// │+honk() │ │+ring() │\n// └───┬────┘ └────────┘\n//     │ owns\n// ┌───▼────┐\n// │ Engine │  (composition - filled diamond)\n// │────────│\n// │ type   │\n// │ hp     │\n// └────────┘\n\nabstract class Vehicle {\n  constructor(protected brand: string, protected model: string, protected year: number) {}\n  start(): void { console.log('Starting...'); }\n  stop(): void { console.log('Stopping...'); }\n  protected abstract drive(): void;\n}\n\nclass Car extends Vehicle {\n  private engine: Engine;\n  constructor(brand: string, model: string, year: number, public doors: number) {\n    super(brand, model, year);\n    this.engine = new Engine('V6', 300); // Composition\n  }\n  honk(): void { console.log('Honk!'); }\n  protected drive(): void { console.log('Driving car...'); }\n}",
            "commonMistakes": "Drawing too many relationships (diagram becomes unreadable). Confusing composition vs aggregation. Forgetting multiplicities. Mixing different levels of abstraction. Not showing access modifiers. Putting implementation details (like algorithm steps) in a static diagram.",
            "bestPractices": "Show only essential classes and relationships. Use composition (filled diamond) for strong ownership. Use aggregation (empty diamond) for weaker references. Keep diagrams focused on one aspect of the design. Use packages to group related classes. Add notes for important design decisions.",
            "interviewPerspective": "Class diagrams are essential for LLD interviews. When asked 'Design a Parking Lot', start with a class diagram. Discuss: (1) Identifying classes (nouns in requirements). (2) Relationships between classes. (3) Applying design patterns. (4) Multiplicity and cardinality. The interviewer evaluates your ability to translate requirements into a clear class structure. Practice: express your design as both a diagram and code.",
            "performanceNotes": "UML diagrams are documentation, not code. They don't affect performance. However, the relationships they express (composition vs aggregation) can impact memory management and object lifecycle."
          },
          "quiz": [],
          "faangQuestions": [],
          "codingChallenges": []
        },
        {
          "slug": "sequence-diagrams",
          "title": "Sequence Diagrams",
          "order": 2,
          "content": {
            "overview": "Sequence diagrams show how objects interact in a particular scenario over time. They illustrate the order of messages exchanged between objects. While class diagrams show static structure, sequence diagrams show dynamic behavior - making them essential for understanding complex interactions.",
            "problemStatement": "A checkout process involves multiple objects (Cart, Order, Payment, Inventory, Shipping) interacting in a specific sequence. Describing this verbally is complex. Sequence diagrams show exactly who calls what, in what order, and how data flows.",
            "intuitionFirst": "A sequence diagram is like a play script showing the dialogue between actors over time. Each actor (object) has a lifeline (vertical line). Messages (arrows) go between them in time order (top to bottom).",
            "realLifeAnalogy": "A call center transcript: Customer (actor 1) calls Agent (actor 2). Agent checks Database (actor 3). Agent responds to Customer. The sequence of interactions is captured chronologically, showing who talks to whom and when.",
            "howItWorks": "Notation: Lifelines (vertical dashed lines for each object), Activation bars (rectangles showing when an object is active), Messages (arrows between lifelines: solid for request, dashed for return), Self-calls (loop back to same lifeline), Combined fragments (alt for alternatives, opt for optional, loop for repetition).",
            "beginnerExample": "// Sequence diagram for order placement:\n// User     Checkout     Payment     Inventory    Shipping\n//  |          |            |            |            |\n//  |--place-->|            |            |            |\n//  |          |--charge-->|            |            |\n//  |          |<--success--|            |            |\n//  |          |--reserve------------->|            |\n//  |          |<--confirmed------------|            |\n//  |          |--ship----------------------------->|\n//  |          |<--tracking----------------------------|\n//  |<--done---|            |            |            |\n\nclass CheckoutService {\n  async placeOrder(cart: Cart, userId: string): Promise<Order> {\n    // 1. Create order\n    const order = new Order(userId, cart.items);\n\n    // 2. Process payment\n    const paymentResult = await this.paymentService.charge(order.total, userId);\n    order.setPayment(paymentResult.transactionId);\n\n    // 3. Reserve inventory\n    await this.inventoryService.reserve(cart.items);\n\n    // 4. Arrange shipping\n    const shipment = await this.shippingService.createShipment(order);\n    order.setTracking(shipment.trackingNumber);\n\n    // 5. Save order\n    return this.orderRepository.save(order);\n  }\n}",
            "commonMistakes": "Making sequence diagrams too detailed (showing every loop iteration). Not showing return arrows (forgetting responses). Overlapping lifelines (too many objects on one diagram). Mixing synchronous and asynchronous calls without distinction.",
            "bestPractices": "Focus on one use case per diagram. Show synchronous calls with solid arrow heads, async with open arrows. Include return messages for important responses. Use combined fragments for alternatives (alt), options (opt), and loops (loop). Keep lifeline count manageable (3-8 objects).",
            "interviewPerspective": "Sequence diagrams show you think about runtime behavior. In LLD interviews, combine class diagram (static structure) + sequence diagram (dynamic behavior) for a complete design. Discuss: (1) How objects collaborate at runtime. (2) Synchronous vs async calls. (3) Error paths and alternatives. The best answers show: 'Here's the class diagram for the Parking Lot, and here's the sequence diagram showing how a car enters and parks.'",
            "performanceNotes": "Sequence diagrams document behavior, not performance. However, they can reveal performance issues: too many sync calls in sequence (adds latency), missing caching, or chatty communication between objects."
          },
          "quiz": [],
          "faangQuestions": [],
          "codingChallenges": []
        }
      ]
    },
    {
      "slug": "lld-questions",
      "title": "LLD Questions",
      "description": "Practice classic low-level design problems - Parking Lot, Elevator, ATM, BookMyShow, Splitwise, Cricbuzz, Chess, and Hotel Management",
      "order": 7,
      "subtopics": [
        {
          "slug": "parking-lot",
          "title": "Parking Lot",
          "order": 1,
          "content": {
            "overview": "Design a parking lot system - one of the most classic LLD interview problems. Must handle multiple floors, different vehicle types (bike, car, bus), spot allocation, pricing, payment, and entry/exit management. Tests OOP design, relationships, and design pattern application.",
            "problemStatement": "Design a parking lot with: multiple levels, different spot sizes (compact, large, handicapped), vehicle registration, ticket-based pricing, payment processing, and real-time availability tracking. Support finding the nearest available spot.",
            "intuitionFirst": "A parking lot is like a hotel with rooms (spots) of different sizes on different floors. When you arrive (enter), you're assigned a room. When you leave (exit), you pay based on how long you stayed.",
            "realLifeAnalogy": "An airport parking garage: you enter, get a ticket, park in any available spot. Pay at the machine before leaving. The system knows which spots are free (green lights) and occupied (red lights).",
            "howItWorks": "Core classes: ParkingLot (singleton), ParkingFloor (has spots), ParkingSpot (has size, status, number), Vehicle (abstract, subtypes: Car, Bike, Bus), Ticket (entry time, spot, vehicle), Payment (amount, method, time). Flow: Entry gate -> find available spot -> assign to vehicle -> issue ticket. Exit gate -> calculate fee -> process payment -> free spot.",
            "beginnerExample": "enum VehicleType { BIKE, CAR, BUS }\nenum SpotStatus { AVAILABLE, OCCUPIED, RESERVED }\n\nabstract class Vehicle {\n  constructor(public licensePlate: string, public type: VehicleType) {}\n}\n\nclass Car extends Vehicle {\n  constructor(licensePlate: string) {\n    super(licensePlate, VehicleType.CAR);\n  }\n}\n\nclass ParkingSpot {\n  constructor(\n    public id: string,\n    public floor: number,\n    public type: VehicleType,\n    public status: SpotStatus = SpotStatus.AVAILABLE\n  ) {}\n}\n\nclass Ticket {\n  constructor(\n    public id: string,\n    public spotId: string,\n    public vehicleLicense: string,\n    public entryTime: Date = new Date()\n  ) {}\n}\n\nclass ParkingLot {\n  private static instance: ParkingLot;\n  private floors: ParkingFloor[] = [];\n  private tickets: Map<string, Ticket> = new Map();\n\n  static getInstance(): ParkingLot { /* singleton */ }\n\n  findSpot(type: VehicleType): ParkingSpot | null {\n    for (const floor of this.floors) {\n      const spot = floor.findAvailableSpot(type);\n      if (spot) return spot;\n    }\n    return null;\n  }\n\n  park(vehicle: Vehicle): Ticket | null {\n    const spot = this.findSpot(vehicle.type);\n    if (!spot) return null;\n    spot.status = SpotStatus.OCCUPIED;\n    const ticket = new Ticket(generateId(), spot.id, vehicle.licensePlate);\n    this.tickets.set(ticket.id, ticket);\n    return ticket;\n  }\n\n  exit(ticketId: string, payment: Payment): boolean {\n    const ticket = this.tickets.get(ticketId);\n    if (!ticket) return false;\n    const spot = this.findSpotById(ticket.spotId);\n    if (spot) spot.status = SpotStatus.AVAILABLE;\n    this.tickets.delete(ticketId);\n    return payment.process();\n  }\n}\n\nclass PaymentProcessor {\n  calculateFee(entryTime: Date, exitTime: Date, vehicleType: VehicleType): number {\n    const hours = Math.ceil((exitTime.getTime() - entryTime.getTime()) / 3600000);\n    const rates = { [VehicleType.BIKE]: 10, [VehicleType.CAR]: 20, [VehicleType.BUS]: 50 };\n    return hours * rates[vehicleType];\n  }\n}",
            "commonMistakes": "Not handling edge cases: parking lot full, vehicle already in lot, invalid ticket, expired payment. Tight coupling between spot allocation and pricing. Not considering handicapped and EV charging spots. Concurrency issues (two cars assigned same spot).",
            "bestPractices": "Singleton for ParkingLot. Strategy pattern for pricing (hourly, daily, event rates). Observer pattern for spot availability display. Separate concerns: spot allocation vs payment vs ticket management. Thread-safe spot allocation (synchronized blocks). Enum for vehicle types and spot sizes.",
            "interviewPerspective": "Parking Lot is the quintessential LLD interview question. Interviewers evaluate: (1) Requirements gathering - ask clarifying questions first. (2) Identifying core entities (Vehicle, Spot, Ticket, Payment). (3) Relationships and design patterns. (4) Code structure and cleanliness. (5) Handling edge cases. A strong solution shows: clean separation of concerns, strategy pattern for pricing, singleton for the lot, and thread safety discussion.",
            "performanceNotes": "Spot finding: O(floors * spots) naive, can optimize with per-floor maps. Pricing: O(1) calculation. Ticket lookup: O(1) with Map. For large lots (>10K spots), consider maintaining available spots index per vehicle type."
          },
          "quiz": [],
          "faangQuestions": [],
          "codingChallenges": []
        },
        {
          "slug": "elevator",
          "title": "Elevator System",
          "order": 2,
          "content": {
            "overview": "Design an elevator control system - another classic LLD problem. Must handle multiple elevators, floor requests, direction management, door operations, and optimized scheduling. Tests state management, algorithm design, and system design.",
            "problemStatement": "Design an elevator system for a building with N floors and M elevators. Elevators receive external requests (floor button pressed) and internal requests (destination selected inside car). Must minimize wait time, energy consumption, and prevent conflicting directions.",
            "intuitionFirst": "Elevator is like a taxi that travels vertically. It picks up passengers (external requests) and drops them off (internal requests). It must decide: should it keep going up to pick up a person ahead, or stop to let someone off?",
            "realLifeAnalogy": "A bus system: buses (elevators) travel on a fixed route (elevator shaft). People wait at stops (floors) and press buttons to signal desired direction (external request). Inside, they press stop buttons (internal requests). The driver decides which bus goes where.",
            "howItWorks": "Core classes: ElevatorSystem (controller), Elevator (car), Floor, Request (internal/external). States: IDLE, MOVING_UP, MOVING_DOWN, DOOR_OPEN. Scheduling algorithm: SCAN (elevator algorithm), FCFS, or SSTF. Each elevator processes floor requests in its direction before reversing.",
            "beginnerExample": "enum Direction { UP, DOWN, IDLE }\nenum DoorState { OPEN, CLOSED }\n\nclass Request {\n  constructor(public floor: number, public direction?: Direction) {}\n}\n\nclass Elevator {\n  public currentFloor = 0;\n  public direction: Direction = Direction.IDLE;\n  public doorState: DoorState = DoorState.CLOSED;\n  private stops: Set<number> = new Set();\n\n  addStop(floor: number): void {\n    this.stops.add(floor);\n  }\n\n  move(): void {\n    if (this.stops.size === 0) {\n      this.direction = Direction.IDLE;\n      return;\n    }\n    if (this.direction === Direction.UP) {\n      this.currentFloor++;\n    } else if (this.direction === Direction.DOWN) {\n      this.currentFloor--;\n    }\n    if (this.stops.has(this.currentFloor)) {\n      this.stops.delete(this.currentFloor);\n      this.doorState = DoorState.OPEN;\n      // Simulate door open/close delay\n      this.doorState = DoorState.CLOSED;\n    }\n  }\n}\n\nclass ElevatorController {\n  constructor(private elevators: Elevator[]) {}\n\n  requestElevator(floor: number, direction: Direction): void {\n    const best = this.findBestElevator(floor, direction);\n    best.addStop(floor);\n  }\n\n  private findBestElevator(floor: number, direction: Direction): Elevator {\n    // SCAN algorithm: find closest elevator going in same direction\n    let best: Elevator | null = null;\n    let minDistance = Infinity;\n\n    for (const elevator of this.elevators) {\n      if (elevator.direction === Direction.IDLE) {\n        const dist = Math.abs(elevator.currentFloor - floor);\n        if (dist < minDistance) {\n          minDistance = dist;\n          best = elevator;\n        }\n      } else if (elevator.direction === direction) {\n        // Going same direction, check if request is ahead\n        if (direction === Direction.UP && elevator.currentFloor <= floor) {\n          const dist = floor - elevator.currentFloor;\n          if (dist < minDistance) {\n            minDistance = dist;\n            best = elevator;\n          }\n        } else if (direction === Direction.DOWN && elevator.currentFloor >= floor) {\n          const dist = elevator.currentFloor - floor;\n          if (dist < minDistance) {\n            minDistance = dist;\n            best = elevator;\n          }\n        }\n      }\n    }\n\n    return best || this.elevators[0];\n  }\n}",
            "commonMistakes": "Not handling all states (doors opening/closing while moving). Concurrency: multiple requests processed simultaneously. Starvation: far away floors never getting service. Not optimizing for direction: reversing direction unnecessarily. Emergency handling (fire, power outage).",
            "bestPractices": "Use State pattern for elevator states (IDLE, MOVING_UP, MOVING_DOWN, DOOR_OPEN, EMERGENCY, MAINTENANCE). SCAN algorithm for scheduling (elevator continues in same direction processing requests, then reverses). Observer pattern for buttons and displays. Separate internal from external request handling.",
            "interviewPerspective": "Elevator system tests state management and algorithm design. Discuss: (1) State machine: every state transition must be defined. (2) Scheduling algorithms: SCAN (elevator algorithm) vs LOOK vs SSTF. (3) External vs internal request handling. (4) Peak hour optimization (all elevators to ground floor). (5) Emergency handling. Strong answers include discussion of edge cases: what happens when all floors are requested simultaneously?",
            "performanceNotes": "SCAN algorithm: O(N log N) for sorting requests per direction. Lookup: O(M) where M is elevator count. For 100+ floor buildings, consider zoning (specific elevators serve floor ranges)."
          },
          "quiz": [],
          "faangQuestions": [],
          "codingChallenges": []
        },
        {
          "slug": "atm",
          "title": "ATM System",
          "order": 3,
          "content": {
            "overview": "Design an Automated Teller Machine system handling card authentication, PIN verification, account selection, cash withdrawal, deposit, balance inquiry, and fund transfer. Must handle security, transaction rollback, and hardware interaction. A comprehensive OOP design problem.",
            "problemStatement": "Design an ATM system: user inserts card, enters PIN, selects account and transaction type. For withdrawal, validate sufficient balance and cash availability, dispense cash, update account. Handle failed transactions, insufficient funds, card retention, and network outages.",
            "intuitionFirst": "ATM is like a bank teller in a machine. It must verify identity (card + PIN), check account balance, dispense cash, and record transactions. If any step fails, it must roll back properly and return the card.",
            "realLifeAnalogy": "A vending machine for money: you insert your ID (card), prove it's you (PIN), select what you want (withdraw), it checks if you have enough (balance), delivers (dispenses cash), and updates your account.",
            "howItWorks": "State machine: IDLE -> CARD_INSERTED -> PIN_VERIFIED -> ACCOUNT_SELECTED -> TRANSACTION_SELECTED -> PROCESSING -> COMPLETE. Core classes: ATM (state machine), CardReader, CashDispenser, Screen, Keypad, Printer, BankService (remote). Each transaction type (Withdrawal, Deposit, BalanceInquiry, Transfer) is a separate class (Command pattern).",
            "beginnerExample": "enum ATMState { IDLE, CARD_INSERTED, PIN_ENTERED, ACCOUNT_SELECTED, TRANSACTION_SELECTED, PROCESSING, COMPLETE, ERROR }\n\nclass ATM {\n  private state: ATMState = ATMState.IDLE;\n  private currentCard: Card | null = null;\n  private currentAccount: Account | null = null;\n\n  constructor(\n    private cardReader: CardReader,\n    private cashDispenser: CashDispenser,\n    private screen: Screen,\n    private keypad: Keypad,\n    private bankService: BankService,\n    private printer: Printer\n  ) {}\n\n  async insertCard(card: Card): Promise<void> {\n    if (this.state !== ATMState.IDLE) throw new Error('ATM busy');\n    this.currentCard = card;\n    this.state = ATMState.CARD_INSERTED;\n    this.screen.show('Enter PIN:');\n  }\n\n  async enterPin(pin: string): Promise<void> {\n    if (this.state !== ATMState.CARD_INSERTED) throw new Error('Insert card first');\n    const valid = await this.bankService.verifyPin(this.currentCard!.number, pin);\n    if (!valid) {\n      this.currentCard!.failedAttempts++;\n      if (this.currentCard!.failedAttempts >= 3) {\n        this.cardReader.retainCard();\n        this.state = ATMState.ERROR;\n        this.screen.show('Card retained. Contact bank.');\n        return;\n      }\n      this.screen.show('Invalid PIN. Try again.');\n      return;\n    }\n    this.state = ATMState.PIN_ENTERED;\n    this.screen.show('Select account:');\n  }\n\n  async withdraw(accountNumber: string, amount: number): Promise<TransactionResult> {\n    if (this.state !== ATMState.PIN_ENTERED) throw new Error('Authenticate first');\n    this.state = ATMState.PROCESSING;\n\n    try {\n      const account = await this.bankService.getAccount(this.currentCard!.number, accountNumber);\n      if (account.balance < amount) {\n        this.screen.show('Insufficient funds');\n        this.state = ATMState.TRANSACTION_SELECTED;\n        return { success: false, reason: 'Insufficient funds' };\n      }\n\n      if (!this.cashDispenser.hasCash(amount)) {\n        this.screen.show('ATM out of cash');\n        this.state = ATMState.TRANSACTION_SELECTED;\n        return { success: false, reason: 'No cash available' };\n      }\n\n      await this.bankService.debit(accountNumber, amount);\n      this.cashDispenser.dispense(amount);\n      this.printer.printReceipt({ transaction: 'WITHDRAWAL', amount, account: accountNumber });\n      this.state = ATMState.COMPLETE;\n      return { success: true };\n    } catch (err) {\n      await this.bankService.rollback(accountNumber, amount); // Rollback if cash not dispensed\n      this.state = ATMState.ERROR;\n      this.screen.show('Transaction failed. Please try again.');\n      return { success: false, reason: 'System error' };\n    }\n  }\n\n  ejectCard(): void {\n    this.currentCard = null;\n    this.state = ATMState.IDLE;\n  }\n}",
            "commonMistakes": "Not handling network failures (transaction succeeds locally but bank doesn't update). Not retaining card after 3 failed PIN attempts. Insufficient cash check after debiting account (user debited but no cash). Not printing transaction receipt. Concurrency: two ATMs accessing same account simultaneously.",
            "bestPractices": "State pattern for ATM states. Strategy/Command pattern for transaction types (withdrawal, deposit, transfer, balance inquiry). Always debit account BEFORE dispensing cash (don't risk giving cash without charging). Handle rollback for failed transactions. Log all transactions for audit. Secure PIN entry (never log or display PIN).",
            "interviewPerspective": "ATM tests state machine design and security awareness. Discuss: (1) State machine: each state has defined transitions and valid actions. (2) Security: PIN verification, card retention, encryption. (3) Transaction flow: authentication -> authorization -> processing -> confirmation. (4) Error handling: network failure, insufficient funds, daily limits. (5) Concurrency: database transaction isolation for account balance. Strong answers include: 'I'd use the State pattern for ATM states and Command pattern for transaction types.'",
            "performanceNotes": "Transaction processing: 100-500ms (bank API call). Cash dispensing: 2-5 seconds. PIN verification: <100ms local, 200-500ms remote. ATM typically handles 1 transaction at a time (no concurrency needed).",
            "securityNotes": "PIN must be encrypted end-to-end (never in plaintext). Card reader must be tamper-resistant. Maximum 3 PIN attempts before card retention (fraud prevention). Transaction limits per day. Encryption of card data. Audit logging of all actions. Physical security (cash cassette tamper detection)."
          },
          "quiz": [],
          "faangQuestions": [],
          "codingChallenges": []
        },
        {
          "slug": "bookmyshow",
          "title": "BookMyShow",
          "order": 4,
          "content": {
            "overview": "Design a movie ticket booking system (like BookMyShow). Must handle movie listings, theater seating, real-time seat selection, payment, and concurrent booking prevention. Tests understanding of concurrency, transaction management, and object-oriented design.",
            "problemStatement": "Multiple users trying to book the same seats simultaneously. Must prevent double booking (two users buying the same seat). Support seat selection, pricing (different rates for different seats), payment, and cancellation. Handle show timing, theater layouts, and city-specific content.",
            "intuitionFirst": "Booking movie tickets is like a reservation system for a concert. Seats have different prices (front row costs more). Two people can't sit in the same seat. You have 5 minutes to pay before your hold expires.",
            "realLifeAnalogy": "Airline booking: you search flights (movies), select seats (seat selection), hold them temporarily (lock), pay (purchase), get confirmation (ticket). If you don't pay in time, seats are released.",
            "howItWorks": "Core classes: Movie, Theater, Screen, Show, Seat, Booking, Payment, User. Flow: Search movies -> Select theater/show -> Select seats -> Create booking (hold seats, 5 min lock) -> Process payment -> Confirm booking (permanent). Concurrency: Use database transactions with SELECT FOR UPDATE to lock selected seats during booking. Seat status: AVAILABLE, LOCKED, BOOKED.",
            "beginnerExample": "enum SeatStatus { AVAILABLE, LOCKED, BOOKED }\n\nclass Seat {\n  constructor(public id: string, public row: string, public number: number, public price: number) {}\n  public status: SeatStatus = SeatStatus.AVAILABLE;\n}\n\nclass Show {\n  constructor(\n    public id: string,\n    public movie: Movie,\n    public screen: Screen,\n    public startTime: Date,\n    public seats: Seat[]\n  ) {}\n}\n\nclass BookingService {\n  constructor(private db: Database, private paymentService: PaymentService) {}\n\n  async holdSeats(showId: string, seatIds: string[], userId: string): Promise<Booking | null> {\n    const transaction = await this.db.beginTransaction();\n    try {\n      // Lock selected seats (prevents concurrent bookings)\n      const seats = await this.db.query(\n        'SELECT * FROM seats WHERE show_id = $1 AND id = ANY($2) FOR UPDATE',\n        [showId, seatIds]\n      );\n\n      // Check all seats are available\n      for (const seat of seats) {\n        if (seat.status !== SeatStatus.AVAILABLE) {\n          await transaction.rollback();\n          return null; // Some seats already booked/locked\n        }\n      }\n\n      // Create booking (hold seats for 5 minutes)\n      const booking = new Booking(generateId(), showId, userId, seatIds, new Date());\n      await this.db.query(\n        'UPDATE seats SET status = $1, locked_by = $2, lock_expires = $3 WHERE show_id = $4 AND id = ANY($5)',\n        [SeatStatus.LOCKED, userId, new Date(Date.now() + 300000), showId, seatIds]\n      );\n      await this.db.query(\n        'INSERT INTO bookings (id, show_id, user_id, seat_ids, created_at, status) VALUES ($1, $2, $3, $4, $5, $6)',\n        [booking.id, showId, userId, seatIds, new Date(), 'PENDING']\n      );\n\n      await transaction.commit();\n      return booking;\n    } catch (err) {\n      await transaction.rollback();\n      return null;\n    }\n  }\n\n  async confirmBooking(bookingId: string, paymentInfo: PaymentInfo): Promise<boolean> {\n    const booking = await this.getBooking(bookingId);\n    if (!booking || booking.status !== 'PENDING') return false;\n    if (new Date() > booking.lockExpires) {\n      await this.releaseSeats(bookingId);\n      return false; // Hold expired\n    }\n\n    try {\n      await this.paymentService.process(paymentInfo);\n      await this.db.query('UPDATE bookings SET status = $1 WHERE id = $2', ['CONFIRMED', bookingId]);\n      await this.db.query(\n        'UPDATE seats SET status = $1, locked_by = NULL, lock_expires = NULL WHERE show_id = $2 AND id = ANY($3)',\n        [SeatStatus.BOOKED, booking.showId, booking.seatIds]\n      );\n      return true;\n    } catch (err) {\n      // Payment failed, release seats\n      await this.releaseSeats(bookingId);\n      return false;\n    }\n  }\n\n  private async releaseSeats(bookingId: string): Promise<void> {\n    const booking = await this.getBooking(bookingId);\n    if (!booking) return;\n    await this.db.query('UPDATE seats SET status = $1, locked_by = NULL, lock_expires = NULL WHERE show_id = $2 AND id = ANY($3)',\n      [SeatStatus.AVAILABLE, booking.showId, booking.seatIds]);\n    await this.db.query('UPDATE bookings SET status = $1 WHERE id = $2', ['CANCELLED', bookingId]);\n  }\n}",
            "commonMistakes": "Race conditions: two users selecting the same seat simultaneously without locking. Not handling expired locks (seats locked forever if user abandons booking). No seat release on payment failure. Not considering different screen layouts (IMAX, 3D, standard).",
            "bestPractices": "SELECT FOR UPDATE for seat locking (database-level pessimistic locking). 5-minute lock timeout with background job to release expired locks. Optimistic locking with version numbers for lower contention scenarios. CQRS: separate seat map query (fast reads) from booking (write). Different booking flows for different payment methods.",
            "interviewPerspective": "BookMyShow tests concurrency and transaction management. Discuss: (1) Pessimistic vs optimistic locking. (2) Two-phase booking: hold seats -> pay -> confirm. (3) Lock timeout and release. (4) Preventing overselling. (5) Different screen layouts and seat types. (6) Caching: show seat availability in Redis. Strong answers include: 'I'd use PostgreSQL SELECT FOR UPDATE within a transaction to lock seats during the booking window, with a 5-minute TTL and a background job to clean up expired locks.'",
            "performanceNotes": "Concurrent booking: ~100-500 TPS for popular shows. Seat map cache: Redis, refresh on booking. Lock cleanup: cron job every minute. Search: Elasticsearch for movie/theater search. Read vs write: 90% searches, 10% bookings."
          },
          "quiz": [],
          "faangQuestions": [],
          "codingChallenges": []
        },
        {
          "slug": "splitwise",
          "title": "Splitwise",
          "order": 5,
          "content": {
            "overview": "Design an expense sharing app like Splitwise. Users can create groups, add expenses, split them equally or custom, and track who owes whom. The core challenge is simplifying debts: finding the minimum number of transactions to settle all balances. Tests graph algorithms, OOP design, and data modeling.",
            "problemStatement": "After a group trip, multiple people have paid for different things. A paid for dinner ($100), B paid for taxi ($50), C paid for hotel ($300). How do we figure out who owes whom with minimal transactions? The goal is to simplify debts so everyone settles up with minimal transfers.",
            "intuitionFirst": "Splitwise is about tracking IOUs. If Alice paid $30 for Bob's dinner, and Bob paid $20 for Alice's taxi, instead of exchanging money twice, net it out: Bob owes Alice $10.",
            "realLifeAnalogy": "Friends splitting a restaurant bill: one person pays the full bill, others pay them back. The system tracks who paid what and calculates who owes whom. Just like Venmo but with group expense tracking.",
            "howItWorks": "Core classes: User, Group, Expense, Split (equal, exact, percentage, shares), Transaction. Each expense has a paidBy (who paid), amount, and splits (how it's divided). Net balances per user in a group = total paid - total owed. Simplify debts: find net balance, use min-transaction algorithm (greedy: settle largest debtor with largest creditor).",
            "beginnerExample": "class User {\n  constructor(public id: string, public name: string, public email: string) {}\n}\n\nabstract class Split {\n  constructor(public user: User, public amount: number) {}\n}\n\nclass EqualSplit extends Split {\n  constructor(user: User, totalAmount: number, userCount: number) {\n    super(user, totalAmount / userCount);\n  }\n}\n\nclass ExactSplit extends Split {\n  constructor(user: User, amount: number) {\n    super(user, amount);\n  }\n}\n\nclass PercentSplit extends Split {\n  constructor(user: User, totalAmount: number, percent: number) {\n    super(user, totalAmount * percent / 100);\n  }\n}\n\nclass Expense {\n  constructor(\n    public id: string,\n    public title: string,\n    public amount: number,\n    public paidBy: User,\n    public splits: Split[],\n    public groupId: string\n  ) {}\n}\n\nclass ExpenseManager {\n  private expenses: Expense[] = [];\n  private balances: Map<string, Map<string, number>> = new Map(); // user -> (other user -> amount)\n\n  addExpense(expense: Expense): void {\n    this.expenses.push(expense);\n    this.updateBalances(expense);\n  }\n\n  private updateBalances(expense: Expense): void {\n    for (const split of expense.splits) {\n      // Payer gets money from each participant\n      const payer = expense.paidBy.id;\n      const receiver = split.user.id;\n      const amount = split.amount;\n\n      if (!this.balances.has(payer)) this.balances.set(payer, new Map());\n      if (!this.balances.has(receiver)) this.balances.set(receiver, new Map());\n\n      // Payer is owed money by receiver\n      const payerBalance = this.balances.get(payer)!;\n      payerBalance.set(receiver, (payerBalance.get(receiver) || 0) + amount);\n\n      // Receiver owes money to payer\n      const receiverBalance = this.balances.get(receiver)!;\n      receiverBalance.set(payer, (receiverBalance.get(payer) || 0) - amount);\n    }\n  }\n\n  simplifyDebts(): Transaction[] {\n    // Calculate net balance for each user\n    const netBalances = new Map<string, number>();\n    for (const [user, owes] of this.balances) {\n      let net = 0;\n      for (const [other, amount] of owes) {\n        net += amount;\n      }\n      netBalances.set(user, net);\n    }\n\n    // Greedy simplification: settle largest creditor with largest debtor\n    const transactions: Transaction[] = [];\n    const sorted = [...netBalances.entries()].sort((a, b) => b[1] - a[1]);\n    let i = 0, j = sorted.length - 1;\n\n    while (i < j) {\n      const [creditor, credit] = sorted[i];\n      const [debtor, debit] = sorted[j];\n      const amount = Math.min(credit, -debit);\n\n      if (amount > 0) {\n        transactions.push(new Transaction(debtor, creditor, amount));\n        sorted[i][1] -= amount;\n        sorted[j][1] += amount;\n      }\n\n      if (sorted[i][1] === 0) i++;\n      if (sorted[j][1] === 0) j--;\n    }\n\n    return transactions;\n  }\n}\n\nclass Transaction {\n  constructor(public from: string, public to: string, public amount: number) {}\n}",
            "commonMistakes": "Not handling rounding errors (floating point precision in splits). Net balance calculation bugs (double counting). Simplify algorithm not minimizing transactions correctly (greedy may not be optimal but is O(N log N) vs NP-hard optimal). Not handling edge cases: expense with no splits, user not in group.",
            "bestPractices": "Use integer cents (avoid floating point). Different split strategies (Equal, Exact, Percentage, Shares). Simplify debts using min-transaction algorithm. Maintain balance history for undo. Group expenses with individual expense views (IOUs between any two users).",
            "interviewPerspective": "Splitwise tests OOP modeling and algorithm design. Discuss: (1) Entity design: User, Group, Expense, Split strategies. (2) Balance calculation: net vs per-person balances. (3) Debt simplification: graph algorithm to minimize transactions. (4) Rounding: use integer arithmetic. (5) Different split types: Strategy pattern. Strong answers discuss: 'The debt simplification is a graph problem - we can use a max-flow min-cut approach, but greedy-by-largest-balance gives near-optimal results in O(N log N).'",
            "performanceNotes": "Balance calculation: O(E) where E is expenses per group. Simplify: O(N log N) with greedy. For groups with 1000+ expenses, maintain running balance instead of recalculating history. Use integer cents to avoid floating point errors."
          },
          "quiz": [],
          "faangQuestions": [],
          "codingChallenges": []
        },
        {
          "slug": "cricbuzz",
          "title": "Cricbuzz",
          "order": 6,
          "content": {
            "overview": "Design a cricket live scoring system like Cricbuzz. Must handle match setup (teams, players, overs), ball-by-ball commentary, score tracking, wickets, overs, run rate calculations, and multiple match formats (T20, ODI, Test). Tests real-time data modeling, state management, and complex domain logic.",
            "problemStatement": "A cricket match generates data every ball: runs scored, wickets, extras, bowling changes, over completion. The system must update scores in real-time, calculate statistics (economy rate, strike rate, partnership), and support different match formats with different rules.",
            "intuitionFirst": "Cricbuzz is like a real-time scoreboard operator. Every ball, they record: what happened (run, wicket, extra), update the score, and update player statistics. The scoreboard (display) is updated after every ball.",
            "realLifeAnalogy": "A baseball scorecard: every pitch is recorded - ball, strike, hit, out. The scoreboard updates runs, hits, errors, and inning totals. Cumulatively, batting averages and ERA are computed.",
            "howItWorks": "Core classes: Match (T20/ODI/Test), Team (11 players), Inning, Over, Ball (runs, wickets, extras, commentary), Player (stats: runs, wickets, catches). State machine: Match -> Innings (1 or 2) -> Overs -> Balls. Each ball updates running totals: team score, player stats, bowler figures, partnership, run rate.",
            "beginnerExample": "enum BallType { NORMAL, WIDE, NO_BALL, BYE, LEG_BYE }\nenum WicketType { BOWLED, CAUGHT, LBW, RUN_OUT, STUMPED, HIT_WICKET }\n\nclass Ball {\n  constructor(\n    public overNumber: number,\n    public ballNumber: number,\n    public runs: number,\n    public isWicket: boolean,\n    public ballType: BallType,\n    public wicketType?: WicketType,\n    public batsmanId?: string,\n    public bowlerId?: string\n  ) {}\n}\n\nclass Over {\n  public balls: Ball[] = [];\n  constructor(public overNumber: number, public bowlerId: string) {}\n  get runs(): number { return this.balls.reduce((sum, b) => sum + b.runs, 0); }\n  get wickets(): number { return this.balls.filter(b => b.isWicket).length; }\n  get isComplete(): boolean { return this.balls.length === 6; }\n}\n\nclass Inning {\n  public overs: Over[] = [];\n  private wickets = 0;\n  private totalRuns = 0;\n  private currentOver: Over;\n\n  constructor(public battingTeamId: string, public bowlingTeamId: string, public maxOvers: number) {\n    this.currentOver = new Over(1, '');\n  }\n\n  addBall(ball: Ball): void {\n    this.currentOver.balls.push(ball);\n    this.totalRuns += ball.runs;\n    if (ball.isWicket) this.wickets++;\n\n    if (this.currentOver.isComplete || ball.wicketType === WicketType.BOWLED) {\n      this.overs.push(this.currentOver);\n      if (this.currentOver.overNumber < this.maxOvers) {\n        this.currentOver = new Over(this.currentOver.overNumber + 1, '');\n      }\n    }\n  }\n\n  get score(): string { return `${this.totalRuns}/${this.wickets}`; }\n  get oversBowled(): number {\n    const completed = this.overs.length;\n    const currentBalls = this.currentOver.balls.length;\n    return completed + (currentBalls / 10); // e.g., 12.3 overs\n  }\n  get runRate(): number {\n    const totalOvers = this.oversBowled;\n    return totalOvers > 0 ? this.totalRuns / totalOvers : 0;\n  }\n}\n\nclass Match {\n  private innings: Inning[] = [];\n  constructor(\n    public id: string,\n    public team1: Team,\n    public team2: Team,\n    public format: 'T20' | 'ODI' | 'TEST',\n    public date: Date\n  ) {}\n\n  startInning(battingTeam: string, bowlingTeam: string): void {\n    const maxOvers = this.format === 'T20' ? 20 : this.format === 'ODI' ? 50 : Infinity;\n    this.innings.push(new Inning(battingTeam, bowlingTeam, maxOvers));\n  }\n\n  get currentInning(): Inning | undefined {\n    return this.innings[this.innings.length - 1];\n  }\n}",
            "commonMistakes": "Not handling extras (wides, no-balls don't count as legal deliveries). Over counting: 6 legal deliveries per over. Wicket types and caught behind scenarios (multiple fielders involved). Run out: multiple batsmen can be involved. Duckworth-Lewis (rain rule) complexity.",
            "bestPractices": "Separate ball type from runs scored (wide + 2 runs = 2 extra runs + 1 extra ball). Treat each delivery as a domain event. Strategy pattern for different match formats (different over limits, follow-on rules). Observer pattern for live score updates (push to subscribers). Command pattern for undo (wrong entry correction).",
            "interviewPerspective": "Cricbuzz tests complex domain modeling. Discuss: (1) Domain entities: Match, Inning, Over, Ball, Player, Team. (2) State management: ball -> over -> inning -> match hierarchy. (3) Real-time updates: WebSocket push for live scoring. (4) Statistics calculation: batting average, economy rate, strike rate as computed properties. (5) Different formats: Strategy pattern for T20/ODI/Test rules. Strong answers discuss edge cases: 'A wide ball doesn't count as a legal delivery but adds to runs and extra count. The batsman doesn't face a legal ball for strike rate.'",
            "performanceNotes": "Match data: ~600 balls per T20, ~1800 per Test innings. Real-time: WebSocket push on every ball. Statistics: pre-compute during idle time, cache results. Historical data: store in database, not memory."
          },
          "quiz": [],
          "faangQuestions": [],
          "codingChallenges": []
        },
        {
          "slug": "chess",
          "title": "Chess Game",
          "order": 7,
          "content": {
            "overview": "Design a chess game system handling board setup, piece movement rules, turn management, check/checkmate detection, and game state tracking. Tests deep domain modeling, state machines, and complex rule validation. A classic OOD problem.",
            "problemStatement": "Design a two-player chess game. Each piece has specific movement rules. Must validate moves, detect checks and checkmates, handle castling, en passant, pawn promotion, and draw conditions (stalemate, threefold repetition, 50-move rule).",
            "intuitionFirst": "Chess is a complex state machine. Each piece type has different movement rules. A move is valid only if: piece can move that way, path is clear, move doesn't leave own king in check.",
            "realLifeAnalogy": "Chess is like traffic laws for pieces. Pawns move forward but capture diagonally (like a one-way street with turns). Knights jump over other pieces (like an ambulance). The king must never enter danger.",
            "howItWorks": "Core classes: Game (state machine), Board (8x8 grid of spots), Piece (abstract: King, Queen, Bishop, Knight, Rook, Pawn), Player (white/black), Move (from, to, piece, capturedPiece, special move flag). Validation: isMoveValid() checks piece rules + path + doesn't leave king in check. Check detection: can any opponent piece reach the king? Checkmate: in check AND no valid move to escape.",
            "beginnerExample": "enum PieceType { KING, QUEEN, BISHOP, KNIGHT, ROOK, PAWN }\nenum Color { WHITE, BLACK }\n\nabstract class Piece {\n  constructor(public type: PieceType, public color: Color, public hasMoved = false) {}\n  abstract getValidMoves(board: Board, row: number, col: number): { row: number; col: number }[];\n}\n\nclass Pawn extends Piece {\n  constructor(color: Color) { super(PieceType.PAWN, color); }\n\n  getValidMoves(board: Board, row: number, col: number): { row: number; col: number }[] {\n    const moves: { row: number; col: number }[] = [];\n    const direction = this.color === Color.WHITE ? -1 : 1;\n    const startRow = this.color === Color.WHITE ? 6 : 1;\n\n    // Move forward one\n    if (board.isValidPosition(row + direction, col) && board.isEmpty(row + direction, col)) {\n      moves.push({ row: row + direction, col });\n      // Move forward two from start\n      if (row === startRow && board.isEmpty(row + 2 * direction, col)) {\n        moves.push({ row: row + 2 * direction, col });\n      }\n    }\n\n    // Capture diagonally\n    for (const dc of [-1, 1]) {\n      if (board.isValidPosition(row + direction, col + dc)) {\n        const target = board.getPiece(row + direction, col + dc);\n        if (target && target.color !== this.color) {\n          moves.push({ row: row + direction, col: col + dc });\n        }\n      }\n    }\n\n    return moves;\n  }\n}\n\nclass Board {\n  private grid: (Piece | null)[][] = Array(8).fill(null).map(() => Array(8).fill(null));\n\n  constructor() {\n    this.initialize();\n  }\n\n  private initialize(): void {\n    // Place pawns\n    for (let col = 0; col < 8; col++) {\n      this.grid[1][col] = new Pawn(Color.BLACK);\n      this.grid[6][col] = new Pawn(Color.WHITE);\n    }\n    // Place other pieces...\n  }\n\n  movePiece(from: { row: number; col: number }, to: { row: number; col: number }): boolean {\n    const piece = this.grid[from.row][from.col];\n    if (!piece) return false;\n\n    const validMoves = piece.getValidMoves(this, from.row, from.col);\n    const isValid = validMoves.some(m => m.row === to.row && m.col === to.col);\n\n    if (!isValid) return false;\n\n    // Check if move leaves king in check\n    const tempGrid = this.grid.map(row => [...row]);\n    this.grid[to.row][to.col] = this.grid[from.row][from.col];\n    this.grid[from.row][from.col] = null;\n\n    if (this.isKingInCheck(piece.color)) {\n      this.grid = tempGrid;\n      return false; // Can't make a move that leaves king in check\n    }\n\n    piece.hasMoved = true;\n    return true;\n  }\n\n  isKingInCheck(color: Color): boolean {\n    const kingPos = this.findKing(color);\n    const opponent = color === Color.WHITE ? Color.BLACK : Color.WHITE;\n\n    for (let row = 0; row < 8; row++) {\n      for (let col = 0; col < 8; col++) {\n        const piece = this.grid[row][col];\n        if (piece && piece.color === opponent) {\n          const moves = piece.getValidMoves(this, row, col);\n          if (moves.some(m => m.row === kingPos.row && m.col === kingPos.col)) {\n            return true;\n          }\n        }\n      }\n    }\n    return false;\n  }\n}",
            "commonMistakes": "Not checking if move leaves king in check (the most common bug). Castling conditions: neither king nor rook has moved, path is clear, king not in check, king doesn't pass through check. En passant: must be immediate response to opponent's double pawn move. Pawn promotion: player must be asked which piece to promote to. Stalemate vs checkmate distinction.",
            "bestPractices": "Validate all conditions for special moves (castling, en passant, promotion). Always check if the resulting position leaves the king in check. Use the State pattern for game phases (PLAYING, CHECK, CHECKMATE, STALEMATE, DRAW). Separate move validation from move execution. Model the game as a list of moves (for undo/redo).",
            "interviewPerspective": "Chess is a complex OOD problem that tests thoroughness. Discuss: (1) Piece hierarchy: abstract Piece with concrete subclasses. (2) Move validation: piece rules + path blocking + check validation. (3) Special moves: Strategy pattern for castling, en passant, promotion. (4) Game state: State pattern for PLAYING, CHECK, CHECKMATE, STALEMATE. (5) Undo: Memento pattern or move history stack. Interviewers look for: Did you consider castling? En passant? Stalemate? Threefold repetition? 50-move rule? The completeness of your design.",
            "performanceNotes": "Move generation: ~30-40 valid moves per position. Move validation: O(P) where P is number of opponent pieces. For engine-level chess, alpha-beta pruning + evaluation heuristics needed, not required for LLD."
          },
          "quiz": [],
          "faangQuestions": [],
          "codingChallenges": []
        },
        {
          "slug": "hotel-management",
          "title": "Hotel Management",
          "order": 8,
          "content": {
            "overview": "Design a hotel management system handling room booking, check-in/check-out, room service, billing, and housekeeping management. Tests understanding of reservation systems, state management, and complex workflows involving multiple actors.",
            "problemStatement": "A hotel has different room types (single, double, suite, penthouse) with different prices. Guests book rooms, check in, use services (mini-bar, room service, laundry), and check out with consolidated billing. Housekeeping must be notified when rooms are vacated. Overbooking must be prevented.",
            "intuitionFirst": "A hotel booking is like a library book reservation: you check availability, reserve, pick up (check in), use (stay), return (check out). There's a cleaning process between checkout and next booking (housekeeping).",
            "realLifeAnalogy": "Airbnb: guests search for available dates, book, get confirmed, arrive (check-in), stay, leave (check-out), cleaning happens, next guest arrives. Plus billing for extras like cleaning fees.",
            "howItWorks": "Core classes: Hotel, Room (type, price, capacity), Guest, Booking (dates, room, status), ReservationService, BillingService, HousekeepingService. Room state: AVAILABLE, RESERVED, OCCUPIED, MAINTENANCE, BEING_CLEANED. Booking flow: search availability -> create booking (payment hold) -> check-in (room becomes OCCUPIED) -> add services -> check-out (calculate total, process payment) -> room cleaning -> AVAILABLE.",
            "beginnerExample": "enum RoomStatus { AVAILABLE, RESERVED, OCCUPIED, MAINTENANCE, CLEANING }\n\nclass Room {\n  constructor(\n    public roomNumber: string,\n    public type: RoomType,\n    public pricePerNight: number,\n    public capacity: number\n  ) {}\n  public status: RoomStatus = RoomStatus.AVAILABLE;\n}\n\nclass Booking {\n  constructor(\n    public id: string,\n    public room: Room,\n    public guest: Guest,\n    public checkIn: Date,\n    public checkOut: Date,\n    public status: 'PENDING' | 'CONFIRMED' | 'CHECKED_IN' | 'CHECKED_OUT' | 'CANCELLED',\n    public totalAmount: number = 0\n  ) {}\n}\n\nclass HotelManagementSystem {\n  private rooms: Room[] = [];\n  private bookings: Booking[] = [];\n\n  searchAvailableRooms(checkIn: Date, checkOut: Date, type?: RoomType): Room[] {\n    return this.rooms.filter(room => {\n      if (type && room.type !== type) return false;\n      if (room.status !== RoomStatus.AVAILABLE) return false;\n      // Check no overlapping booking\n      const hasBooking = this.bookings.some(b =>\n        b.room.roomNumber === room.roomNumber &&\n        b.status !== 'CANCELLED' &&\n        b.status !== 'CHECKED_OUT' &&\n        b.checkIn < checkOut &&\n        b.checkOut > checkIn\n      );\n      return !hasBooking;\n    });\n  }\n\n  createBooking(guest: Guest, room: Room, checkIn: Date, checkOut: Date): Booking | null {\n    const available = this.searchAvailableRooms(checkIn, checkOut, room.type);\n    const isAvailable = available.some(r => r.roomNumber === room.roomNumber);\n    if (!isAvailable) return null;\n\n    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / 86400000);\n    const booking = new Booking(\n      generateId(), room, guest, checkIn, checkOut, 'PENDING',\n      nights * room.pricePerNight\n    );\n    this.bookings.push(booking);\n    room.status = RoomStatus.RESERVED;\n    return booking;\n  }\n\n  checkIn(bookingId: string): boolean {\n    const booking = this.bookings.find(b => b.id === bookingId);\n    if (!booking || booking.status !== 'PENDING') return false;\n\n    booking.status = 'CHECKED_IN';\n    booking.room.status = RoomStatus.OCCUPIED;\n    return true;\n  }\n\n  addService(bookingId: string, service: RoomService): void {\n    const booking = this.bookings.find(b => b.id === bookingId);\n    if (!booking || booking.status !== 'CHECKED_IN') return;\n    booking.totalAmount += service.cost;\n  }\n\n  checkOut(bookingId: string, paymentMethod: PaymentMethod): Invoice {\n    const booking = this.bookings.find(b => b.id === bookingId)!;\n    booking.status = 'CHECKED_OUT';\n    booking.room.status = RoomStatus.CLEANING;\n\n    // Process payment\n    const invoice = new Invoice(booking.id, booking.totalAmount, paymentMethod, new Date());\n\n    // Notify housekeeping\n    this.housekeepingService.scheduleCleaning(booking.room);\n\n    return invoice;\n  }\n}",
            "commonMistakes": "Overlapping bookings: not properly checking date ranges. Status transitions: invalid transitions (RESERVED -> CHECKED_OUT without CHECKED_IN). Not handling cancellations and refunds. Not handling no-shows. Housekeeping not notified on checkout (next guest finds dirty room).",
            "bestPractices": "State pattern for room and booking statuses. Validate status transitions (e.g., cannot check out without checking in). Overlapping booking check: existing_booking.checkIn < new_checkOut AND existing_booking.checkOut > new_checkIn. Separate pricing strategy (weekend surcharge, seasonal pricing). Observer pattern for housekeeping notification.",
            "interviewPerspective": "Hotel management tests state management and workflow design. Discuss: (1) Room lifecycle: AVAILABLE -> RESERVED -> OCCUPIED -> CLEANING -> AVAILABLE. (2) Booking lifecycle: PENDING -> CONFIRMED -> CHECKED_IN -> CHECKED_OUT -> CANCELLED. (3) Concurrency: room double-booking prevention. (4) Pricing: Strategy pattern for different rates. (5) Billing: consolidates room charges + services. Strong answers include: 'I'd use the State pattern for both Room and Booking to prevent invalid state transitions. The Observer pattern notifies housekeeping when a room is vacated.'",
            "performanceNotes": "Room search: O(R) naive, O(log R) with indexed data structures. For 500+ room hotels, use database queries with date range indexing. Availability caching in Redis with TTL."
          },
          "quiz": [],
          "faangQuestions": [],
          "codingChallenges": []
        }
      ]
    }
  ]
};
