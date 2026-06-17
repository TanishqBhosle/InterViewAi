#!/usr/bin/env python3
"""
Enhance LLD seed file with quiz questions and FAANG questions.
Reads the existing file and replaces empty quiz/faang arrays with real content.
Only replaces if data exists for that subtopic slug.
"""
import re
import json

path = r'E:\InterView Ai\packages\database\prisma\seed\lld.ts'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Quiz questions per subtopic
quiz_data = {
    "encapsulation": [
        {"id": "lld-encap-1", "question": "What is encapsulation in OOP?", "options": ["Bundling data and methods together, hiding internal state", "Inheriting properties from a parent class", "Having many forms of a method", "Abstracting implementation details"], "correctIndex": 0, "explanation": "Encapsulation bundles data and methods into a single unit and restricts direct access to internal state.", "difficulty": "easy"},
        {"id": "lld-encap-2", "question": "Which access modifier provides the strongest encapsulation?", "options": ["private", "public", "protected", "internal"], "correctIndex": 0, "explanation": "Private members are only accessible within the class itself, providing the strongest encapsulation.", "difficulty": "easy"},
        {"id": "lld-encap-3", "question": "What is the Tell-Don't-Ask principle?", "options": ["Tell an object what to do rather than asking for its data", "Ask objects for data before making decisions", "Only tell objects about errors", "Ask permission before calling methods"], "correctIndex": 0, "explanation": "Tell-Don't-Ask means you should tell an object to perform an action rather than query its state and make decisions externally.", "difficulty": "medium"},
        {"id": "lld-encap-4", "question": "How does encapsulation improve maintainability?", "options": ["Internal implementation can change without affecting external code", "It makes code run faster", "It reduces the number of classes needed", "It automatically documents the code"], "correctIndex": 0, "explanation": "Encapsulation hides internal implementation behind a public interface, so changes to internals don't break external code.", "difficulty": "medium"},
        {"id": "lld-encap-5", "question": "Which of the following violates encapsulation?", "options": ["Returning a reference to a mutable internal list", "Using private fields with public getters", "Validating input in setter methods", "Making fields private by default"], "correctIndex": 0, "explanation": "Returning a reference to a mutable internal list allows callers to modify internal state, breaking encapsulation.", "difficulty": "hard"},
    ],
    "inheritance": [
        {"id": "lld-inherit-1", "question": "What problem does inheritance solve?", "options": ["Code reuse by sharing common behavior in a base class", "Making all methods public", "Replacing composition", "Eliminating the need for interfaces"], "correctIndex": 0, "explanation": "Inheritance centralizes common logic in a base class, eliminating code duplication across related classes.", "difficulty": "easy"},
        {"id": "lld-inherit-2", "question": "What is the fragile base class problem?", "options": ["Changes to a base class can break derived classes unexpectedly", "Base classes are hard to create", "Base classes use too much memory", "Derived classes cannot override base methods"], "correctIndex": 0, "explanation": "The fragile base class problem occurs when seemingly safe changes to a base class break derived classes.", "difficulty": "medium"},
        {"id": "lld-inherit-3", "question": "Which principle suggests preferring composition over inheritance?", "options": ["Favor composition over inheritance (Gang of Four)", "Single Responsibility Principle", "Interface Segregation Principle", "Liskov Substitution Principle"], "correctIndex": 0, "explanation": "The GoF design patterns book recommends preferring composition over inheritance because it's more flexible.", "difficulty": "medium"},
        {"id": "lld-inherit-4", "question": "In the Liskov Substitution Principle, a subclass should:", "options": ["Be substitutable for its parent without altering correctness", "Override all parent methods", "Have more restrictive access than parent", "Throw additional exceptions not in parent"], "correctIndex": 0, "explanation": "LSP states that objects of a subclass should be replaceable for objects of the parent class without affecting program correctness.", "difficulty": "hard"},
        {"id": "lld-inherit-5", "question": "What is the diamond problem in inheritance?", "options": ["Ambiguity when a class inherits from two classes with a common ancestor", "Circular dependency in inheritance", "A class that inherits from itself", "Too many levels of inheritance"], "correctIndex": 0, "explanation": "The diamond problem occurs when a class inherits from two classes that share a common ancestor, causing ambiguity.", "difficulty": "hard"},
    ],
    "polymorphism": [
        {"id": "lld-poly-1", "question": "What is polymorphism in OOP?", "options": ["Objects of different types responding to the same method call differently", "A class having only one form", "Variables changing type at runtime", "Methods with the same name but different parameters"], "correctIndex": 0, "explanation": "Polymorphism allows objects of different types to respond to the same method call in their own way.", "difficulty": "easy"},
        {"id": "lld-poly-2", "question": "Which pattern uses polymorphism to select algorithms at runtime?", "options": ["Strategy Pattern", "Singleton Pattern", "Factory Pattern", "Observer Pattern"], "correctIndex": 0, "explanation": "The Strategy Pattern uses polymorphism to encapsulate interchangeable algorithms and select them at runtime.", "difficulty": "medium"},
        {"id": "lld-poly-3", "question": "Runtime polymorphism is achieved through:", "options": ["Method overriding via inheritance", "Method overloading", "Operator overloading", "Template specialization"], "correctIndex": 0, "explanation": "Runtime polymorphism uses method overriding where subclasses provide specific implementations of base class methods.", "difficulty": "easy"},
        {"id": "lld-poly-4", "question": "What coding practice does polymorphism eliminate?", "options": ["If-else chains checking object types", "All switch statements", "Constructor overloading", "Variable declarations"], "correctIndex": 0, "explanation": "Polymorphism eliminates conditional logic checking object types by letting each object handle calls appropriately.", "difficulty": "medium"},
        {"id": "lld-poly-5", "question": "A payment processing system where CreditCard, PayPal, and Crypto all implement a pay() method is an example of:", "options": ["Polymorphism", "Encapsulation", "Inheritance", "Abstraction"], "correctIndex": 0, "explanation": "Multiple payment types implementing the same interface with different pay() behavior is classic polymorphism.", "difficulty": "medium"},
    ],
    "abstraction": [
        {"id": "lld-abst-1", "question": "What is abstraction in OOP?", "options": ["Hiding complex implementation details and showing only essential features", "Making all methods private", "Creating many small classes", "Using only interfaces"], "correctIndex": 0, "explanation": "Abstraction means hiding complex implementation details and exposing only what's necessary.", "difficulty": "easy"},
        {"id": "lld-abst-2", "question": "How is abstraction different from encapsulation?", "options": ["Abstraction hides complexity, encapsulation hides data", "They are the same thing", "Abstraction is about data hiding", "Encapsulation is about simplifying interfaces"], "correctIndex": 0, "explanation": "Abstraction focuses on hiding complexity (what it does), while encapsulation focuses on hiding data (how it does it).", "difficulty": "medium"},
        {"id": "lld-abst-3", "question": "Abstract classes vs Interfaces: which can have implemented methods?", "options": ["Abstract classes can have both abstract and concrete methods", "Only interfaces can have implemented methods", "Neither can have implemented methods", "Both can have implemented methods equally"], "correctIndex": 0, "explanation": "Abstract classes can have both abstract methods (no body) and concrete methods (with implementation). Interfaces traditionally only have declarations, though modern languages add default methods.", "difficulty": "hard"},
        {"id": "lld-abst-4", "question": "Which is a good example of abstraction?", "options": ["A remote control with buttons to control a TV", "Directly accessing TV circuit boards", "A class with all public fields", "A method that requires 10 parameters"], "correctIndex": 0, "explanation": "A remote control abstracts away the complex electronics behind simple buttons - the essence of abstraction.", "difficulty": "easy"},
        {"id": "lld-abst-5", "question": "What happens when an abstraction leaks implementation details?", "options": ["It violates the abstraction barrier and couples users to internals", "It becomes more useful", "Performance improves", "Security automatically improves"], "correctIndex": 0, "explanation": "Leaky abstractions expose implementation details that couple users to internals that should remain hidden.", "difficulty": "hard"},
    ],
}

# FAANG questions per subtopic
faang_data = {
    "encapsulation": [
        {"question": "Design a bank account system using encapsulation. How do you prevent overdrafts and ensure thread safety?", "answer": "Use private balance field with controlled access through deposit/withdraw methods. Validate all operations internally. For thread safety, use locks or atomic operations on the balance field. Never expose the balance reference directly - only return copies or computed values. Follow Tell-Don't-Ask: account.withdraw(amount) instead of if(account.getBalance() >= amount) account.withdraw(amount).", "difficulty": "medium", "company": "Amazon"},
        {"question": "What is a leaky abstraction? Give a real-world example from distributed systems.", "answer": "A leaky abstraction exposes implementation details that should be hidden. Example: RPC (Remote Procedure Call) aims to abstract network calls as local function calls, but network issues (latency, timeouts, partial failures) leak through. Another example: an ORM that abstracts SQL but leaks when you need to optimize queries (N+1 problem). The Law of Leaky Abstractions states that all nontrivial abstractions are leaky to some degree.", "difficulty": "hard", "company": "Google"},
    ],
    "inheritance": [
        {"question": "Compare inheritance vs composition for building a UI component library. When would you use each?", "answer": "Inheritance: Use for is-a relationships like Button extends Component when components share base behavior (render lifecycle, state management). Good for frameworks where the base class provides hooks. Composition: Use for has-a relationships like Dialog has-a Header, Body, Footer. Better for flexible UIs where components can be combined arbitrarily. In practice, composition is preferred because it avoids the fragile base class problem and allows more flexible reuse. React shifted from mixins (inheritance) to hooks (composition) for this reason.", "difficulty": "hard", "company": "Meta"},
        {"question": "What is the Liskov Substitution Principle and how does it relate to inheritance?", "answer": "LSP states that objects of a subclass should be substitutable for objects of the superclass without altering program correctness. Violations include: overriding a method to throw new exceptions, strengthening preconditions, weakening postconditions, or changing the expected behavior. Example: Rectangle-Square problem - Square extending Rectangle violates LSP because setting width on a Square also changes height, breaking the Rectangle contract. Fix: make both immutable or use a common Shape interface.", "difficulty": "medium", "company": "Microsoft"},
    ],
    "polymorphism": [
        {"question": "Design a notification system that supports Email, SMS, and Push notifications using polymorphism.", "answer": "Define a NotificationSender interface with send(message) method. Implement EmailSender, SMSSender, PushSender classes. The notification service takes a list of NotificationSender instances and calls send() on each. New notification channels can be added without modifying existing code (Open/Closed Principle). Use a factory or dependency injection to configure which senders to use. For enterprise use, add retry logic, templating, and delivery tracking within each sender.", "difficulty": "medium", "company": "Uber"},
        {"question": "How does the Strategy Pattern use polymorphism? Provide a sorting example.", "answer": "The Strategy Pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. Strategy interface defines sort(data) method. Concrete strategies: BubbleSort, QuickSort, MergeSort, TimSort. The context class takes a SortingStrategy and delegates to it. At runtime, the strategy can be swapped based on data size or characteristics. This is pure polymorphism - the context doesn't know which sorting algorithm is being used.", "difficulty": "hard", "company": "Google"},
    ],
    "abstraction": [
        {"question": "Design a file storage abstraction that supports local, S3, and GCS backends.", "answer": "Create a FileStorage interface with get(filePath), put(filePath, data), delete(filePath), list(directory) methods. Implement LocalStorage (reads from disk), S3Storage (uses AWS SDK), GCSStorage (uses GCP SDK). Each implementation handles its own authentication and error handling. The abstract interface hides storage backend details. Use dependency injection to select backend based on environment. For production, add CORS support, signed URLs, and multi-part uploads.", "difficulty": "hard", "company": "Amazon"},
        {"question": "Explain the concept of an abstract class vs interface in the context of database connection abstraction.", "answer": "Abstract class DatabaseConnection can define common functionality like connection pooling, retry logic, and query logging with both abstract methods (connect, disconnect, query) and concrete methods (logQuery, retryOnFailure). This is appropriate when all connections share state/behavior. Interface DataStore defines only the contract: get, set, delete, query. This is appropriate when implementations vary wildly. In practice, start with an interface and extract an abstract base class when common behavior emerges.", "difficulty": "medium", "company": "Microsoft"},
    ],
}

def generate_quiz_block(slug):
    """Generate quiz array as TypeScript string (indent level: 10 for array, 12 for objects, 14 for keys, 16 for nested arrays)."""
    questions = quiz_data.get(slug, [])
    if not questions:
        return None
    lines = ['          "quiz": [']
    for i, q in enumerate(questions):
        obj_json = json.dumps(q, indent=2, ensure_ascii=False)
        obj_lines = obj_json.strip().split('\n')
        for j, line in enumerate(obj_lines):
            # Replace json.dumps indent (2 per level) with our indent (2 per level from base of 12)
            stripped = line.rstrip(',')
            indent_count = len(line) - len(line.lstrip())
            our_indent = 12 + indent_count
            comma = ',' if line.rstrip().endswith(',') else ''
            lines.append(' ' * our_indent + stripped.lstrip() + comma)
        if i < len(questions) - 1:
            # ensure comma on last line of this object
            lines[-1] = lines[-1].rstrip() + ','
    lines.append("          ],")
    return "\n".join(lines)

def generate_faang_block(slug):
    """Generate faangQuestions array as TypeScript string."""
    questions = faang_data.get(slug, [])
    if not questions:
        return None
    lines = ['          "faangQuestions": [']
    for i, q in enumerate(questions):
        obj_json = json.dumps(q, indent=2, ensure_ascii=False)
        obj_lines = obj_json.strip().split('\n')
        for j, line in enumerate(obj_lines):
            stripped = line.rstrip(',')
            indent_count = len(line) - len(line.lstrip())
            our_indent = 12 + indent_count
            comma = ',' if line.rstrip().endswith(',') else ''
            lines.append(' ' * our_indent + stripped.lstrip() + comma)
        if i < len(questions) - 1:
            lines[-1] = lines[-1].rstrip() + ','
    lines.append("          ],")
    return "\n".join(lines)

# Process the file by finding each subtopic section and replacing within its scope
# Use a regex that matches a full subtopic block
subtopic_pattern = re.compile(
    r'(\s*\{\s*\n\s*"slug":\s*"([^"]+)"[^}]*?content:\s*\{[^}]*?\}\s*,\s*)("quiz":\s*\[\])'
)

# Alternative approach: process slug by slug, finding the right occurrence
# Find all subtopic sections
sections = re.split(r'(?=\s*\{\s*\n\s*"slug":\s*")', content)
output_parts = []
modified_slugs = []

for section in sections:
    slug_match = re.search(r'"slug":\s*"([^"]+)"', section)
    if slug_match:
        slug = slug_match.group(1)
        # Check if we need to replace quiz for this slug
        if slug in quiz_data:
            old_quiz = '          "quiz": [],'
            new_quiz = generate_quiz_block(slug)
            if new_quiz and old_quiz in section:
                section = section.replace(old_quiz, new_quiz)
                modified_slugs.append(slug + " (quiz)")
        if slug in faang_data:
            old_faang = '          "faangQuestions": [],'
            new_faang = generate_faang_block(slug)
            if new_faang and old_faang in section:
                section = section.replace(old_faang, new_faang)
                modified_slugs.append(slug + " (faang)")
    output_parts.append(section)

content = "".join(output_parts)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Modified slugs: {list(set(modified_slugs))}")
print("Done! Enhanced LLD seed file with quizzes and FAANG questions.")
