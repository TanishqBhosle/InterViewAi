import type { SubjectData } from "./types";

export const pythonSubject: SubjectData = {
  "slug": "python",
  "title": "Python",
  "description": "Master Python from fundamentals to advanced libraries - syntax, data structures, file handling, NumPy, Pandas, Matplotlib, Seaborn, and backend",
  "icon": "Python",
  "color": "text-yellow-500",
  "order": 6,
  "topics": [
    {
      "slug": "basics",
      "title": "Basics",
      "description": "Core Python concepts including variables, loops, functions, and OOP",
      "order": 1,
      "subtopics": [
        {
          "slug": "variables",
          "title": "Variables",
          "order": 1,
          "content": {
            "overview": "Variables in Python are dynamically-typed references to objects stored in memory. Unlike statically-typed languages, Python variables can hold values of any type without explicit declaration, and the type is inferred at runtime from the assigned value.",
            "problemStatement": "New programmers struggle with Python's dynamic typing, mutable vs immutable assignment semantics, and variable scoping rules. These foundational concepts affect everything from debugging to performance optimization in larger codebases.",
            "intuitionFirst": "Think of variables as sticky notes with names that point to values. The sticky note itself has no type - it just points to whatever value you stick on it. Python figures out the type by looking at the value, not the note.",
            "realLifeAnalogy": "A variable is like a name tag on a storage locker. You can put anything in the locker - books, clothes, tools - and the name tag just tells you which locker to look in. The tag doesn't care what's inside. You can also move the tag to a different locker whenever you want.",
            "howItWorks": "Python manages variables through namespaces and reference counting. When you write x = 10, Python creates an integer object 10 in memory, and the name 'x' is bound to it in the current namespace. Variables are just entries in a dictionary (locals(), globals()) mapping names to object references.",
            "beginnerExample": "# Python variables - dynamic typing in action\nname = \"Alice\"          # str\nage = 25                 # int\nheight = 5.6             # float\nis_student = True        # bool\nskills = [\"Python\", \"SQL\"]  # list\n\n# Reassignment changes type freely\nvalue = 42\nprint(type(value))       # <class 'int'>\nvalue = \"now a string\"\nprint(type(value))       # <class 'str'>\n\n# Multiple assignment\na = b = c = 0\nx, y, z = 1, 2, 3\n\n# Swapping without temp variable\na, b = b, a",
            "commonMistakes": "Using mutable objects as default function arguments (the default is evaluated once at definition time). Confusing assignment (x = y) with mutation (x.append(y)). Thinking Python passes objects by value - it always passes references by value. Using is for value comparison instead of == (is checks identity, == checks equality).",
            "bestPractices": "Use descriptive variable names following snake_case. Use type hints for better code clarity and IDE support. Prefer immutable types by default. Avoid bare except clauses. Use _ for throwaway variables. Follow PEP 8 naming conventions.",
            "performanceNotes": "Python's dynamic typing adds overhead compared to C/Java. Local variable access is fastest, followed by closure scopes, then global scope. Using __slots__ in classes reduces memory for many instances.",
            "interviewPerspective": "FAANG interviews often test variable fundamentals through trick questions about mutable defaults, reference semantics, and scoping. Be ready to explain LEGB (Local, Enclosing, Global, Built-in) scope resolution and the difference between del and garbage collection."
          },
          "quiz": [
            {
              "id": "py-vars-1",
              "question": "What is the output of: x = 10; y = x; x = 20; print(y)?",
              "options": [
                "10",
                "20",
                "None",
                "Error"
              ],
              "correctIndex": 0,
              "explanation": "Integers are immutable in Python. y = x makes y reference the same object (10). When x is reassigned to 20, a new integer object is created. y still points to 10.",
              "difficulty": "easy"
            },
            {
              "id": "py-vars-2",
              "question": "What happens when you use a mutable object as a default argument?",
              "options": [
                "The default is shared across all calls",
                "Each call gets a new copy",
                "Python raises a SyntaxError",
                "The function cannot be defined"
              ],
              "correctIndex": 0,
              "explanation": "Default arguments are evaluated once at function definition time. A mutable default like [] or {} is shared across all calls, accumulating mutations.",
              "difficulty": "medium"
            },
            {
              "id": "py-vars-3",
              "question": "Which of the following correctly describes Python's variable scoping order (LEGB)?",
              "options": [
                "Local, Enclosing, Global, Built-in",
                "Local, Global, Enclosing, Built-in",
                "Built-in, Global, Enclosing, Local",
                "Enclosing, Local, Global, Built-in"
              ],
              "correctIndex": 0,
              "explanation": "Python resolves variable names in LEGB order: Local scope first, then Enclosing functions, then Global (module) scope, and finally Built-in names.",
              "difficulty": "easy"
            }
          ],
          "faangQuestions": [
            {
              "question": "Explain Python's variable passing semantics. Is it pass-by-value or pass-by-reference?",
              "answer": "Python uses pass-by-assignment (pass-by-object-reference). The function receives a reference to the same object. For immutable objects (int, str, tuple), this behaves like pass-by-value. For mutable objects (list, dict, set), modifications affect the original. Reassigning the parameter inside the function does NOT affect the caller's variable.",
              "difficulty": "hard",
              "company": "Google"
            },
            {
              "question": "What is the difference between 'is' and '==' in Python?",
              "answer": "'==' checks value equality (calls __eq__), while 'is' checks object identity (same memory address). Example: a = [1, 2, 3]; b = [1, 2, 3]; a == b is True but a is b is False. Python caches small integers (-5 to 256), so x = 100; y = 100; x is y is True. Use '==' for value comparison and 'is' only for None, True, False, or singleton checks.",
              "difficulty": "medium",
              "company": "Amazon"
            }
          ],
          "codingChallenges": [
            {
              "title": "Swap Two Numbers Without Temp",
              "description": "Write a function that swaps two numbers without using a temporary variable or tuple unpacking. Use arithmetic or bitwise XOR operations.",
              "difficulty": "easy",
              "starterCode": "def swap(a: int, b: int) -> tuple:\n    pass",
              "solutionHint": "Use XOR: a ^= b; b ^= a; a ^= b. Or arithmetic: a, b = a + b, a - b; then a = a - b."
            }
          ]
        },
        {
          "slug": "loops",
          "title": "Loops",
          "order": 2,
          "content": {
            "overview": "Python provides two primary loop constructs: for loops for iterating over iterables, and while loops for condition-based repetition. The for-each style eliminates index management common in other languages, while list comprehensions offer a concise functional alternative.",
            "problemStatement": "Inefficient loop patterns are a common source of slow Python code. Python's interpreted nature means each iteration carries overhead - understanding when to use comprehensions, generators, and built-in functions like map/filter is critical for performance.",
            "intuitionFirst": "A for loop is like a conveyor belt - each item passes by and you get to work with it one at a time. A while loop is like waiting at a traffic light - you keep checking the condition until it turns green.",
            "realLifeAnalogy": "Imagine checking out items at a grocery store. A for loop is scanning each item in sequence until your cart is empty. A while loop is 'keep scanning as long as there are items on the belt'. A list comprehension is like having a machine that scans, bags, and prints the receipt all at once.",
            "howItWorks": "Python's for loop calls iter() on the iterable to get an iterator, then repeatedly calls next() on it until StopIteration is raised. This iterator protocol is what makes Python loops memory-efficient - generators produce items lazily.",
            "beginnerExample": "# For loop with range\nfor i in range(5):\n    print(i)              # 0 1 2 3 4\n\n# Iterating over a list\nfruits = [\"apple\", \"banana\", \"cherry\"]\nfor fruit in fruits:\n    print(fruit.upper())\n\n# While loop\ncount = 0\nwhile count < 3:\n    print(f\"Count: {count}\")\n    count += 1\n\n# Enumerate for index + value\nfor idx, val in enumerate([\"a\", \"b\", \"c\"]):\n    print(f\"{idx}: {val}\")",
            "commonMistakes": "Modifying a list while iterating over it (use list copy or iterate backwards). Forgetting that range(start, stop) excludes stop. Using a loop when a comprehension or built-in would be faster. Infinite while loops from forgetting to update the condition variable.",
            "bestPractices": "Prefer for loops over while when iterating over known sequences. Use enumerate instead of manual index tracking. Use zip for parallel iteration. Use comprehensions for simple transformations. Use generators for large datasets. Use itertools for advanced iteration patterns.",
            "performanceNotes": "List comprehensions are ~2x faster than manual for loops with .append(). Generator expressions use O(1) memory vs O(n) for lists. map/filter can be faster than comprehensions when using built-in functions.",
            "interviewPerspective": "Loop questions often test understanding of iterators vs iterables, generator memory efficiency, and comprehension syntax. Be ready to implement custom iterators with __iter__ and __next__, explain how for loops work under the hood, and discuss when to use itertools."
          },
          "quiz": [
            {
              "id": "py-loops-1",
              "question": "What does a for loop do when iterating over an empty list?",
              "options": [
                "The loop body never executes",
                "It raises StopIteration",
                "It runs once with None",
                "It raises IndexError"
              ],
              "correctIndex": 0,
              "explanation": "When the iterable is empty, iter() returns an iterator whose first next() call raises StopIteration, which the for loop catches and exits.",
              "difficulty": "easy"
            },
            {
              "id": "py-loops-2",
              "question": "What is the output of: for i in range(5): if i == 3: break; else: print('done')?",
              "options": [
                "Nothing is printed",
                "'done' is printed",
                "0 1 2 are printed and 'done' is not printed",
                "Error"
              ],
              "correctIndex": 0,
              "explanation": "The loop else clause only executes if the loop completes without break. Since break executes at i == 3, the else block is skipped.",
              "difficulty": "medium"
            },
            {
              "id": "py-loops-3",
              "question": "What is the key difference between a list comprehension and a generator expression?",
              "options": [
                "List comprehension creates all elements in memory at once; generator expression yields lazily",
                "Generator expression is faster for small datasets",
                "List comprehension cannot have conditions",
                "There is no difference"
              ],
              "correctIndex": 0,
              "explanation": "List comprehension builds the entire list in memory. Generator expression returns an iterator that yields items one at a time, using O(1) memory.",
              "difficulty": "easy"
            }
          ],
          "faangQuestions": [
            {
              "question": "Implement a generator that yields Fibonacci numbers indefinitely. What are the memory implications?",
              "answer": "def fibonacci(): a, b = 0, 1; while True: yield a; a, b = b, a + b. This generator uses O(1) memory regardless of how many terms are generated because it only stores the last two values.",
              "difficulty": "medium",
              "company": "Google"
            },
            {
              "question": "Compare map(), filter(), and list comprehensions. When would you choose one over the other?",
              "answer": "Comprehensions are most readable for simple transformations. map applies a function to every item and is faster when using built-in functions. filter selects items where function returns truthy. Use comprehensions for readability, map/filter for performance with existing functions.",
              "difficulty": "medium",
              "company": "Amazon"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "functions",
          "title": "Functions",
          "order": 3,
          "content": {
            "overview": "Functions in Python are first-class objects that can be assigned, passed as arguments, returned from other functions, and have attributes. Python supports positional arguments, keyword arguments, default values, variable-length args (*args and **kwargs), lambda expressions, decorators, and type hints.",
            "problemStatement": "Developers new to Python often struggle with argument passing nuances, mutable defaults, args/kwargs differences, and closure variable capture in nested functions and lambdas.",
            "intuitionFirst": "A function is like a recipe - it takes ingredients (parameters), follows steps (body), and produces a dish (return value). Python functions are also like tools you can hand to someone (first-class), modify (decorators), and create on the spot (lambdas).",
            "realLifeAnalogy": "Think of a function like a vending machine. You put in coins (arguments), press a button (call the function), and get a snack (return value). A decorator is like putting a custom wrapper on the machine that adds extra steps before or after.",
            "howItWorks": "Python functions are objects created by the def statement at runtime. The function body is compiled to bytecode but not executed until called. Arguments are bound to parameters using a sophisticated algorithm: positional arguments matched left-to-right, keyword arguments by name, *args collects extra positional args as a tuple, **kwargs collects extra keyword args as a dict.",
            "beginnerExample": "# Basic function definition\ndef greet(name: str) -> str:\n    return f\"Hello, {name}!\"\n\nprint(greet(\"Alice\"))        # Hello, Alice!\n\n# Default and keyword arguments\ndef power(base, exp=2):\n    return base ** exp\n\nprint(power(3))               # 9\nprint(power(3, 3))            # 27\nprint(power(exp=4, base=2))  # 16\n\n# Variable-length arguments\ndef summarize(*args, **kwargs):\n    print(f\"Positional: {args}\")\n    print(f\"Keyword: {kwargs}\")\n\nsummarize(1, 2, 3, name=\"Alice\", age=25)",
            "commonMistakes": "Mutable default arguments (fixed by using None as default and creating a new mutable inside the function). Forgetting to return a value (function returns None). Confusing local and global scope. Late binding in closures created in loops - all closures reference the final loop variable value.",
            "bestPractices": "Use type hints for all function signatures. Keep functions small and single-purpose (< 20 lines). Use descriptive names (verbs for actions). Prefer keyword arguments for boolean flags. Use functools.wraps when writing decorators to preserve metadata.",
            "performanceNotes": "Function call overhead in Python is significant (about 50-100ns for a no-op). Built-in functions (map, filter, sum) are implemented in C and faster than Python loops. functools.lru_cache can memoize expensive pure functions. Avoid deep recursion due to recursion limit (~1000).",
            "interviewPerspective": "Expect questions on closures (variable capture in loops), decorators (how they work, writing your own), args/kwargs unpacking, and the difference between def and lambda. Be prepared to implement a retry decorator or cache decorator."
          },
          "quiz": [
            {
              "id": "py-func-1",
              "question": "What does this function return: def foo(): pass",
              "options": [
                "None",
                "True",
                "False",
                "An empty string"
              ],
              "correctIndex": 0,
              "explanation": "If a function doesn't have an explicit return statement, Python implicitly returns None.",
              "difficulty": "easy"
            },
            {
              "id": "py-func-2",
              "question": "Output: def f(x, lst=[]): lst.append(x); return lst; print(f(1)); print(f(2))",
              "options": [
                "[1] then [1, 2]",
                "[1] then [2]",
                "[1] then [1] then error",
                "Error: default argument is mutable"
              ],
              "correctIndex": 0,
              "explanation": "The default list [] is created once at function definition. Both calls share the same list. First call appends 1 -> [1]. Second call appends 2 to the same list -> [1, 2].",
              "difficulty": "medium"
            },
            {
              "id": "py-func-3",
              "question": "What does a decorator do?",
              "options": [
                "It modifies or enhances a function without changing its source code",
                "It deletes the function after use",
                "It checks the function's type at runtime",
                "It automatically parallelizes the function"
              ],
              "correctIndex": 0,
              "explanation": "A decorator is a function that takes another function as argument, wraps its behavior, and returns a modified function.",
              "difficulty": "easy"
            }
          ],
          "faangQuestions": [
            {
              "question": "Write a decorator that retries a function up to 3 times with exponential backoff on failure.",
              "answer": "import time; from functools import wraps; def retry(max_retries=3): def decorator(func): @wraps(func) def wrapper(*args, **kwargs): for attempt in range(max_retries): try: return func(*args, **kwargs) except Exception: if attempt == max_retries - 1: raise; time.sleep(2 ** attempt); return wrapper; return decorator",
              "difficulty": "medium",
              "company": "Google"
            },
            {
              "question": "Explain behavior of closures created in a loop. Why do all capture same value?",
              "answer": "funcs = [lambda: i for i in range(5)] prints 5,5,5,5,5 not 0,1,2,3,4. Closures capture variables by reference, not by value. Fix: funcs = [lambda i=i: i for i in range(5)] - captures current value as default argument.",
              "difficulty": "hard",
              "company": "Amazon"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "oop",
          "title": "OOP (Classes, Inheritance, Encapsulation, Polymorphism)",
          "order": 4,
          "content": {
            "overview": "Python supports full object-oriented programming with classes, inheritance (including multiple inheritance), encapsulation through naming conventions, and duck-typing polymorphism. Everything in Python is an object, including classes themselves.",
            "problemStatement": "Python's OOP implementation differs significantly from Java/C++. New developers struggle with self, MRO (Method Resolution Order) in multiple inheritance, property decorators vs getters/setters, and understanding when @classmethod vs @staticmethod vs regular methods are appropriate.",
            "intuitionFirst": "A class is like a blueprint for building houses. Each house (object/instance) built from the same blueprint can have its own paint color (attributes) and plumbing (methods). Inheritance extends a basic design with additional features. Polymorphism means different types of houses all respond to the same 'open_door()' command.",
            "realLifeAnalogy": "Think of a restaurant kitchen. The class Chef is the blueprint - every chef can chop, cook, and plate. A specific chef (instance) has their own station (state). A SousChef inherits from Chef but adds expediting skills. All respond to 'prepare_dish()' differently (polymorphism).",
            "howItWorks": "Python classes are defined with the class keyword, which creates a new namespace and returns a class object. When you call ClassName(), Python calls __new__ to create the instance and __init__ to initialize it. Methods receive the instance as the first argument (self by convention).",
            "beginnerExample": "# Basic class definition\nclass Dog:\n    species = \"Canis familiaris\"  # class attribute\n\n    def __init__(self, name: str, age: int):\n        self.name = name\n        self.age = age\n\n    def bark(self) -> str:\n        return f\"{self.name} says Woof!\"\n\n    @classmethod\n    def create_puppy(cls, name: str):\n        return cls(name, age=0)\n\n    @staticmethod\n    def species_info():\n        return \"Dogs are domesticated mammals\"\n\nbuddy = Dog(\"Buddy\", 3)\nprint(buddy.bark())",
            "commonMistakes": "Forgetting self as first parameter in instance methods. Confusing classmethod with staticmethod. Not calling super().__init__() in child classes. Mutable class attributes shared across instances. Overusing inheritance when composition would be cleaner.",
            "bestPractices": "Favor composition over inheritance (has-a vs is-a). Use @property for computed attributes. Use @dataclass for data containers. Use ABC for defining interfaces. Follow single responsibility principle. Use __slots__ for memory optimization.",
            "performanceNotes": "Attribute access via __getattribute__ has overhead. Using __slots__ reduces memory per instance (no __dict__) and speeds attribute access. @property calls have overhead vs direct attribute access.",
            "interviewPerspective": "OOP questions test design thinking: explain when to use inheritance vs composition, how Python's MRO works (C3 linearization), the difference between @classmethod and @staticmethod, and how @property works at the descriptor protocol level."
          },
          "quiz": [
            {
              "id": "py-oop-1",
              "question": "What is the purpose of self in Python instance methods?",
              "options": [
                "It refers to the current instance of the class",
                "It refers to the class itself",
                "It is the constructor method",
                "It defines a static method"
              ],
              "correctIndex": 0,
              "explanation": "self is a convention for the first parameter of instance methods. Python passes the instance automatically as the first argument.",
              "difficulty": "easy"
            },
            {
              "id": "py-oop-2",
              "question": "What is MRO (Method Resolution Order) used for?",
              "options": [
                "Determining the order base classes are searched for methods",
                "Ordering methods by execution time",
                "Sorting class methods alphabetically",
                "Resolving circular imports"
              ],
              "correctIndex": 0,
              "explanation": "MRO determines which class's method is called with multiple inheritance. Python uses C3 linearization.",
              "difficulty": "medium"
            },
            {
              "id": "py-oop-3",
              "question": "What is the difference between @classmethod and @staticmethod?",
              "options": [
                "@classmethod receives the class as first argument (cls); @staticmethod receives nothing special",
                "@staticmethod receives the class; @classmethod receives nothing",
                "They are identical",
                "@classmethod is used for private methods"
              ],
              "correctIndex": 0,
              "explanation": "@classmethod takes cls as first parameter and can access/modify class state. @staticmethod is just a function defined inside the class namespace.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Explain Python's descriptor protocol and how @property uses it under the hood.",
              "answer": "Descriptors define __get__, __set__, or __delete__ methods, controlling attribute access. @property creates a descriptor: property(fget, fset, fdel, doc). When you access obj.attr, Python checks the class descriptor chain first. @property's fget is called on attribute access, fset on assignment.",
              "difficulty": "expert",
              "company": "Google"
            },
            {
              "question": "Design a parking lot system using OOP in Python.",
              "answer": "Use abstract Vehicle with plate and size. Car extends Vehicle. ParkingSpot has id, size, vehicle ref. ParkingLot manages spots. Use enums for VehicleSize.",
              "difficulty": "hard",
              "company": "Amazon"
            }
          ],
          "codingChallenges": []
        }
      ]
    },
    {
      "slug": "file-handling",
      "title": "File Handling",
      "description": "Python file I/O - reading, writing, appending, CSV, JSON, Pickle",
      "order": 2,
      "subtopics": [
        {
          "slug": "reading-files",
          "title": "Reading Files",
          "order": 1,
          "content": {
            "overview": "Python provides powerful file reading capabilities through built-in open() function and context managers. Files can be read entirely, line-by-line, or in chunks for memory efficiency.",
            "problemStatement": "Reading large files inefficiently - using .read() on a 10GB file consumes all memory. Understanding buffered vs unbuffered reads, text vs binary modes, and encoding handling is essential.",
            "intuitionFirst": "Think of reading a file like drinking a milkshake. You can gulp it all at once (.read()), sip it line by line (iteration), or use a straw of a certain diameter (buffer size).",
            "realLifeAnalogy": "Reading a file is like reading a book. You can read the whole book at once (read()), read one page at a time (readline()), or read specific chapters (seeking).",
            "howItWorks": "open() returns a file object wrapping a low-level file descriptor. Python maintains an internal buffer (default 8KB). The iterator protocol reads lines lazily.",
            "beginnerExample": "# Reading entire file at once\nwith open(\"example.txt\", \"r\", encoding=\"utf-8\") as file:\n    content = file.read()\n\n# Reading line by line\nwith open(\"large_file.txt\", \"r\") as file:\n    for line in file:\n        print(line.strip())",
            "commonMistakes": "Not using context managers (with), leading to file descriptor leaks. Loading entire large files into memory. Forgetting to specify encoding.",
            "bestPractices": "Always use context managers. Specify encoding='utf-8' explicitly. Use 'rb' mode for binary files and 'r' for text. Process files line-by-line when possible.",
            "performanceNotes": "Default buffer size is 8KB. Larger buffers (64KB-1MB) improve sequential read throughput. Binary mode is faster than text mode.",
            "interviewPerspective": "File handling questions test resource management understanding. Be ready to implement a tail -f equivalent, log file parser, or large CSV processor."
          },
          "quiz": [
            {
              "id": "py-fr-1",
              "question": "What does the with statement guarantee when working with files?",
              "options": [
                "The file is closed automatically even if an exception occurs",
                "The file is opened in read-only mode",
                "The file content is cached in memory",
                "The file cannot be read by other processes"
              ],
              "correctIndex": 0,
              "explanation": "The context manager calls __exit__ when the block ends, which closes the file even if an exception is raised.",
              "difficulty": "easy"
            },
            {
              "id": "py-fr-2",
              "question": "What happens if you try to read a file that doesn't exist?",
              "options": [
                "FileNotFoundError is raised",
                "The file is created automatically",
                "None is returned",
                "An empty string is returned"
              ],
              "correctIndex": 0,
              "explanation": "Python raises FileNotFoundError when attempting to open a non-existent file in read mode.",
              "difficulty": "easy"
            },
            {
              "id": "py-fr-3",
              "question": "What is the difference between 'r' and 'rb' modes?",
              "options": [
                "'r' reads text with encoding decoding; 'rb' reads raw bytes without decoding",
                "'r' is read-only; 'rb' is read-binary mode",
                "'r' opens file at the end; 'rb' opens at beginning",
                "There is no difference"
              ],
              "correctIndex": 0,
              "explanation": "'r' (text mode) decodes bytes to str. 'rb' (binary mode) returns raw bytes without any decoding.",
              "difficulty": "easy"
            }
          ],
          "faangQuestions": [
            {
              "question": "How would you efficiently read the last N lines of a very large file without reading the entire file?",
              "answer": "Use file.seek() to jump near the end and read backwards. Seek to end (seek(0, 2)), then read chunks going backwards. For each chunk, split on newlines and collect lines until you have N. This approach uses O(N) memory.",
              "difficulty": "hard",
              "company": "Google"
            },
            {
              "question": "Stream-process a 100GB CSV file computing hourly averages without loading into memory.",
              "answer": "Use chunked iteration with pandas.read_csv(chunksize=10000) or manually iterate lines. Aggregate in a dictionary keyed by hour. For each chunk, groupby hour and accumulate sums/counts. O(unique_hours) memory.",
              "difficulty": "hard",
              "company": "Amazon"
            }
          ],
          "codingChallenges": [
            {
              "title": "Implement tail -n",
              "description": "Write a function that reads the last N lines of a file efficiently without reading the entire file into memory.",
              "difficulty": "medium",
              "starterCode": "def tail(filepath: str, n: int = 10) -> list[str]:\n    pass",
              "solutionHint": "Use os.stat to get file size, then seek backwards in chunks, reading and counting newlines until you have n+1 lines."
            }
          ]
        },
        {
          "slug": "writing-files",
          "title": "Writing Files",
          "order": 2,
          "content": {
            "overview": "Writing files in Python uses open() with 'w' mode, creating a new file or truncating existing. Python supports strings (text mode) or bytes (binary mode) with buffered writes.",
            "problemStatement": "Common issues include partial writes (buffered data not flushed), accidentally overwriting files, encoding errors, and not closing files properly.",
            "intuitionFirst": "Writing to a file is like taking notes in a notebook. 'w' mode tears out old pages and starts fresh. Buffer is like short-term memory before permanent writing.",
            "realLifeAnalogy": "Writing a file is like recording a video. Hit record (open), speak (write), stop (close). Buffer is camera memory - lose last few seconds if not closed.",
            "howItWorks": "write() buffers data in user-space memory (default 8KB). When buffer fills or file flushed/closed, data goes to OS kernel buffer then disk.",
            "beginnerExample": "# Basic file writing\nwith open(\"output.txt\", \"w\", encoding=\"utf-8\") as file:\n    file.write(\"Hello, World!\\n\")\n    file.write(\"This is a new line.\\n\")",
            "commonMistakes": "Using 'w' instead of 'a' and overwriting data. Not specifying encoding. Assuming data is immediately written to disk.",
            "bestPractices": "Always use context managers. Specify encoding='utf-8'. Use temp files with atomic rename for safety. Flush and fsync for critical data.",
            "performanceNotes": "Buffered writes are 10-100x faster than unbuffered. Larger buffer sizes improve throughput. Disk I/O is the bottleneck.",
            "interviewPerspective": "Expect questions about atomic writes, file locking for concurrent access, and understanding buffering levels."
          },
          "quiz": [
            {
              "id": "py-fw-1",
              "question": "What does mode 'w' do if the file already exists?",
              "options": [
                "Truncates the file and overwrites it",
                "Appends to the end of the file",
                "Raises FileExistsError",
                "Creates a backup and then writes"
              ],
              "correctIndex": 0,
              "explanation": "Mode 'w' opens for writing, truncating to zero length. Use 'a' to append or 'x' to exclusively create.",
              "difficulty": "easy"
            },
            {
              "id": "py-fw-2",
              "question": "What does flush() do on a file object?",
              "options": [
                "Writes buffered data to the OS kernel buffer",
                "Writes data directly to physical disk",
                "Closes the file permanently",
                "Empties the file content"
              ],
              "correctIndex": 0,
              "explanation": "flush() forces buffered user-space data to the OS kernel buffer. Use os.fsync() for physical disk.",
              "difficulty": "medium"
            },
            {
              "id": "py-fw-3",
              "question": "What encoding is used by default on most systems?",
              "options": [
                "Platform-dependent (usually UTF-8)",
                "Always ASCII",
                "Always UTF-16",
                "Latin-1"
              ],
              "correctIndex": 0,
              "explanation": "Python uses locale.getpreferredencoding(). Always specify encoding='utf-8' for portability.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "How would you implement an atomic file write in Python?",
              "answer": "Write content to a temp file in the same directory, flush/fsync, then use os.replace(temp_path, target_path). os.replace is atomic on same filesystem.",
              "difficulty": "medium",
              "company": "Google"
            },
            {
              "question": "Design a write-ahead logging (WAL) system for a simple key-value store.",
              "answer": "WAL class: init opens append-only log. append serializes and writes with flush+fsync. Recovery: replay operations, truncate. Checkpoint: periodic snapshot + new segment.",
              "difficulty": "hard",
              "company": "Amazon"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "appending-files",
          "title": "Appending Files",
          "order": 3,
          "content": {
            "overview": "Append mode ('a') adds data to the end of an existing file without overwriting. Creates new file if not exists. Essential for logging.",
            "problemStatement": "Concurrent appends from multiple processes can interleave. Understanding O_APPEND atomicity is critical for multiple writers.",
            "intuitionFirst": "Appending is like adding sticky notes to the end of a scroll. Each new note goes after the last, never disturbing earlier content.",
            "realLifeAnalogy": "A ship's logbook - each day new entry at end. Earlier entries never modified. Multiple officers writing simultaneously can overlap.",
            "howItWorks": "In 'a' mode, write pointer always at end (O_APPEND). Each write atomically appended for writes smaller than PIPE_BUF.",
            "beginnerExample": "# Basic appending\nwith open(\"log.txt\", \"a\", encoding=\"utf-8\") as file:\n    file.write(\"New log entry\\n\")",
            "commonMistakes": "Assuming seeks work for writing (writes forced to end). Not adding newlines. Concurrent append interleaving.",
            "bestPractices": "Use 'a' for logs and audit trails. Flush for real-time readers. Use JSONL for structured data. Log rotation for production.",
            "performanceNotes": "Append mode avoids seek overhead. O_APPEND atomic up to 4KB. Large concurrent appends may cause inode lock contention.",
            "interviewPerspective": "O_APPEND semantics, write atomicity, append vs write+seek patterns."
          },
          "quiz": [
            {
              "id": "py-fa-1",
              "question": "What happens when opening non-existent file in append mode?",
              "options": [
                "A new file is created",
                "FileNotFoundError is raised",
                "Nothing happens",
                "None is returned"
              ],
              "correctIndex": 0,
              "explanation": "Like 'w' mode, 'a' creates the file if it doesn't exist, preserving existing content.",
              "difficulty": "easy"
            },
            {
              "id": "py-fa-2",
              "question": "What does O_APPEND flag guarantee at OS level?",
              "options": [
                "Every write goes to current end of file atomically",
                "File cannot be deleted",
                "File is encrypted",
                "Multiple can read simultaneously"
              ],
              "correctIndex": 0,
              "explanation": "O_APPEND ensures file offset is set to end before each write, atomic at kernel level.",
              "difficulty": "hard"
            },
            {
              "id": "py-fa-3",
              "question": "Can you seek to a position and write in append mode?",
              "options": [
                "No - all writes go to end regardless of seek",
                "Yes - seek works as in write mode",
                "Only with 'a+'",
                "Only on Linux"
              ],
              "correctIndex": 0,
              "explanation": "In append mode, O_APPEND overrides seek positioning for write operations.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design an append-only event log system supporting concurrent producers and a single consumer.",
              "answer": "Single file with O_APPEND for atomic writes. JSONL format. Consumer tracks offset in checkpoint file. Crash recovery truncates incomplete last lines.",
              "difficulty": "hard",
              "company": "Google"
            },
            {
              "question": "Compare append-only logging vs DB table for audit events.",
              "answer": "Append-only: simple, fast writes, easy rotation. DB: ACID, indexing, queryable. Hybrid: write to file for durability, batch insert to DB for querying.",
              "difficulty": "medium",
              "company": "Amazon"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "csv",
          "title": "CSV Handling",
          "order": 4,
          "content": {
            "overview": "Python handles CSV files via csv module (reader/writer) and pandas.read_csv. CSV stores tabular data as comma-separated values.",
            "problemStatement": "Raw CSV parsing is error-prone: embedded commas/quoting, different delimiters, encoding issues, header handling. csv module handles edge cases.",
            "intuitionFirst": "CSV is like spreadsheet exported as text - each row on new line, columns separated by commas. Quotes protect cells with commas inside.",
            "realLifeAnalogy": "Phonebook in CSV format: name,phone,email. Programs export data as CSV because any spreadsheet tool can open it.",
            "howItWorks": "csv.reader returns iterator of lists. csv.DictReader maps rows to dicts using header. csv.writer handles quoting automatically.",
            "beginnerExample": "import csv\n# Reading\nwith open(\"data.csv\", \"r\", newline=\"\", encoding=\"utf-8\") as f:\n    reader = csv.DictReader(f)\n    for row in reader:\n        print(row[\"name\"], row[\"age\"])\n\n# Writing\nwith open(\"output.csv\", \"w\", newline=\"\", encoding=\"utf-8\") as f:\n    writer = csv.DictWriter(f, fieldnames=[\"name\", \"age\"])\n    writer.writeheader()\n    writer.writerow({\"name\": \"Alice\", \"age\": 30})",
            "commonMistakes": "Forgetting newline='' in open() (causes extra blank rows). Not specifying encoding. Assuming all CSV uses comma delimiter.",
            "bestPractices": "Always use newline=''. Use DictReader/DictWriter for readability. Specify encoding='utf-8-sig' for Excel compat. Use quoting=csv.QUOTE_NONNUMERIC when needed.",
            "performanceNotes": "csv module is pure Python - slower than pandas for large files. For 1M+ rows, use pandas.read_csv with chunksize or use pyarrow.",
            "interviewPerspective": "Expect questions about CSV parsing edge cases, handling malformed data, and performance comparison with pandas."
          },
          "quiz": [
            {
              "id": "py-csv-1",
              "question": "Why use newline='' when opening CSV for writing?",
              "options": [
                "Prevents extra blank rows on Windows",
                "Makes file read-only",
                "Enables binary mode",
                "Required for DictWriter"
              ],
              "correctIndex": 0,
              "explanation": "On Windows, newline='' prevents double-spacing from \\r\\n translation.",
              "difficulty": "medium"
            },
            {
              "id": "py-csv-2",
              "question": "What does csv.DictReader return per iteration?",
              "options": [
                "OrderedDict mapping headers to values",
                "List of strings",
                "Tuple of values",
                "Plain dict"
              ],
              "correctIndex": 0,
              "explanation": "DictReader returns row as OrderedDict with header columns as keys.",
              "difficulty": "easy"
            },
            {
              "id": "py-csv-3",
              "question": "How to handle tab-delimited files with csv module?",
              "options": [
                "Pass delimiter='\\t' to reader",
                "Use tsv module",
                "Can't - must convert first",
                "Use readlines() and split"
              ],
              "correctIndex": 0,
              "explanation": "csv.reader(file, delimiter='\\t') handles tab-separated files.",
              "difficulty": "easy"
            }
          ],
          "faangQuestions": [
            {
              "question": "Stream-process a 5GB CSV computing per-category averages without loading entirely.",
              "answer": "Use csv.DictReader or pandas.read_csv(chunksize=10000). Maintain dict of {category: (sum, count)}. For each chunk, iterate rows, update accumulators. Compute final averages = sums/counts.",
              "difficulty": "hard",
              "company": "Google"
            },
            {
              "question": "How would you detect and handle malformed CSV rows?",
              "answer": "Use try/except around csv.reader. Catch exceptions, log row number and content, skip or fix. Use csv.Error for dialect issues. Can also use pandas with error_bad_lines=False.",
              "difficulty": "medium",
              "company": "Amazon"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "json",
          "title": "JSON Handling",
          "order": 5,
          "content": {
            "overview": "Python's json module parses and serializes JSON with load/loads and dump/dumps. Supports custom encoders for non-serializable types.",
            "problemStatement": "JSON is the standard API data format. Python types (datetime, Decimal, custom objects) aren't natively serializable. Encoding/decoding nuances.",
            "intuitionFirst": "JSON.stringify (JS) = json.dumps (Python). JSON.parse (JS) = json.loads (Python). JSON structure mirrors Python dicts/lists.",
            "realLifeAnalogy": "JSON is like a standardized shipping container for data - any language can pack (serialize) and unpack (deserialize) using the same format.",
            "howItWorks": "json.loads converts JSON string to Python object. json.dumps converts Python object to JSON string. Uses mapping: dict->object, list->array, str->string, int/float->number, bool->boolean, None->null.",
            "beginnerExample": "import json\n# Serialize Python dict to JSON string\ndata = {\"name\": \"Alice\", \"scores\": [85, 92], \"active\": True}\njson_str = json.dumps(data, indent=2)\nprint(json_str)\n\n# Parse JSON string back to Python\nparsed = json.loads(json_str)\nprint(parsed[\"name\"])\n\n# Write to file\nwith open(\"data.json\", \"w\") as f:\n    json.dump(data, f, indent=2)\n\n# Read from file\nwith open(\"data.json\", \"r\") as f:\n    loaded = json.load(f)",
            "commonMistakes": "Trying to serialize datetime (use default=str or custom encoder). Using single quotes. Trailing commas. Using loads on file object instead of load.",
            "bestPractices": "Use indent=2 for human readability. Use sort_keys=True for consistent output. Write custom JSONEncoder for complex types. Use orjson/ujson for performance.",
            "performanceNotes": "stdlib json is pure Python O(n). orjson/ujson are 5-10x faster. json.dumps with large floats may lose precision.",
            "interviewPerspective": "JSON serialization of custom types, handling circular references, streaming large JSON with ijson."
          },
          "quiz": [
            {
              "id": "py-json-1",
              "question": "What does json.load() expect?",
              "options": [
                "A file object",
                "A JSON string",
                "A URL",
                "A bytes object"
              ],
              "correctIndex": 0,
              "explanation": "json.load() reads from a file object. json.loads() reads from a string.",
              "difficulty": "easy"
            },
            {
              "id": "py-json-2",
              "question": "What happens serializing a Python datetime with json.dumps?",
              "options": [
                "TypeError by default",
                "Automatically converts to ISO string",
                "Converts to timestamp",
                "Raises warning"
              ],
              "correctIndex": 0,
              "explanation": "datetime is not JSON serializable by default. Use default=str or custom encoder.",
              "difficulty": "medium"
            },
            {
              "id": "py-json-3",
              "question": "How to ensure non-ASCII characters are escaped in JSON output?",
              "options": [
                "Set ensure_ascii=True",
                "Set escape_unicode=True",
                "Use strict=True",
                "Not possible"
              ],
              "correctIndex": 0,
              "explanation": "ensure_ascii=True (default) escapes non-ASCII characters. Set False to preserve them.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design a streaming JSON parser for a 10GB array of objects.",
              "answer": "Use ijson library for incremental parsing. Iterate over top-level array items, process one at a time. Uses O(1) memory. Alternative: line-delimited JSON (JSONL) where each line is one object.",
              "difficulty": "hard",
              "company": "Google"
            },
            {
              "question": "Serialize a custom class with nested objects to JSON.",
              "answer": "Two approaches: 1) Define to_dict() method, call in encoder. 2) Subclass JSONEncoder with default() that checks isinstance and returns dict. Use cls=CustomEncoder in json.dumps.",
              "difficulty": "medium",
              "company": "Amazon"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "pickle",
          "title": "Pickle Serialization",
          "order": 6,
          "content": {
            "overview": "Pickle serializes arbitrary Python objects to bytes. Supports custom classes, circular references, and all built-in types. Protocol versions 0-5.",
            "problemStatement": "JSON only handles primitive types. Pickle handles any Python object including functions, classes, and instances. Not human-readable, Python-only.",
            "intuitionFirst": "Pickle = Python object freeze-dryer. Any object -> bytes -> back to same object in another session. Preserves type, structure, state.",
            "realLifeAnalogy": "Saving game state - freeze entire game world to disk, reload later exactly where you left off. Pickle does this for Python objects.",
            "howItWorks": "Pickle recursively traverses object graph, writing type, data, and references. Protocol 4+ handles large objects efficiently. __reduce__ controls serialization for custom classes.",
            "beginnerExample": "import pickle\n# Serialize\ndata = {\"users\": [{\"name\": \"Alice\", \"scores\": [85, 92]}], \"version\": 2}\nwith open(\"data.pkl\", \"wb\") as f:\n    pickle.dump(data, f, protocol=pickle.HIGHEST_PROTOCOL)\n\n# Deserialize\nwith open(\"data.pkl\", \"rb\") as f:\n    loaded = pickle.load(f)\nprint(loaded)",
            "commonMistakes": "Loading pickles from untrusted sources (RCE risk). Using different Python versions between dump/load. Not specifying protocol (default protocol 3 is portable).",
            "bestPractices": "Never unpickle untrusted data. Use protocol=pickle.HIGHEST_PROTOCOL for performance. Prefer JSON/shelve for simple data. Document __reduce__ for custom classes.",
            "performanceNotes": "Protocol 5 (3.8+) with out-of-band data is fastest. Pickle is generally faster than JSON for complex objects. Binary format: compact.",
            "interviewPerspective": "Security implications of pickle, protocol versions, alternatives (JSON, msgpack, protobuf), __reduce__ for custom serialization."
          },
          "quiz": [
            {
              "id": "py-pkl-1",
              "question": "Why is pickle dangerous with untrusted data?",
              "options": [
                "Arbitrary code execution via __reduce__",
                "Data corruption",
                "Memory leak",
                "File system access"
              ],
              "correctIndex": 0,
              "explanation": "Pickle can execute arbitrary code during unpickling through __reduce__ or __reduce_ex__.",
              "difficulty": "medium"
            },
            {
              "id": "py-pkl-2",
              "question": "What file extension is conventional for pickle files?",
              "options": [
                ".pkl",
                ".pickle",
                ".bin",
                ".serial"
              ],
              "correctIndex": 0,
              "explanation": ".pkl is the conventional extension for pickle files.",
              "difficulty": "easy"
            },
            {
              "id": "py-pkl-3",
              "question": "Which Python type CANNOT be pickled?",
              "options": [
                "Lambda functions",
                "Lists",
                "Dicts",
                "Integers"
              ],
              "correctIndex": 0,
              "explanation": "Lambda functions cannot be pickled because they can't be named/reconstructed by name.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Compare pickle vs JSON for ML model serialization.",
              "answer": "Pickle: preserves Python objects, sklearn/pytorch models, faster, Python-only. JSON: language-agnostic, human-readable, limited types. For ML models, joblib (based on pickle) or ONNX (portable format) are preferred.",
              "difficulty": "medium",
              "company": "Google"
            },
            {
              "question": "Design a secure alternative to pickle for inter-process communication.",
              "answer": "Use schematized serialization: Protocol Buffers, MessagePack, or JSON with schema validation. For simple use, JSON with type registry. Trade-off: flexibility vs security.",
              "difficulty": "hard",
              "company": "Amazon"
            }
          ],
          "codingChallenges": []
        }
      ]
    },
    {
      "slug": "numpy",
      "title": "Libraries - NumPy",
      "description": "NumPy for scientific computing - arrays, matrix ops, broadcasting, vectorization",
      "order": 3,
      "subtopics": [
        {
          "slug": "arrays",
          "title": "Arrays",
          "order": 1,
          "content": {
            "overview": "NumPy arrays (ndarray) are homogeneous n-dimensional arrays providing fast vectorized operations, broadcasting, and sophisticated indexing.",
            "problemStatement": "Python lists are slow for numerical operations. NumPy provides fixed-type contiguous C arrays for vectorized operations at C speed.",
            "intuitionFirst": "Python list = different-sized boxes tied with string. NumPy array = identical compartments in solid block - CPU knows where each element is.",
            "realLifeAnalogy": "List = toolbox with mixed tools. Array = factory assembly line with identical slots processing 1000 parts per minute.",
            "howItWorks": "Arrays store data in contiguous memory with dtype and shape. Operations use compiled C code. Data accessed through strides.",
            "beginnerExample": "import numpy as np\narr1 = np.array([1, 2, 3, 4, 5])\narr2 = np.zeros((3, 4))\narr3 = np.ones((2, 3))\narr4 = np.arange(0, 10, 2)\narr5 = np.linspace(0, 1, 5)\nprint(arr1.shape, arr1.dtype, arr1.size)",
            "comparisonTable": "| Feature | Python List | NumPy Array |\n|---------|------------|-------------|\n| Element type | Any (heterogeneous) | Single dtype (homogeneous) |\n| Memory layout | Non-contiguous (pointers) | Contiguous C array |\n| Speed (1M ops) | ~0.5 sec (loop) | ~0.001 sec (vectorized) |\n| Memory per float | ~28 bytes | 8 bytes |\n| Broadcasting | Not supported | Full support |\n| Slicing semantics | Creates copy | Creates view (no copy) |\n| Multi-dimensional | Nested lists | Native ndarray |",
            "commonMistakes": "Confusing views vs copies. Using Python loops instead of vectorized ops. Not specifying dtype leading to overflow.",
            "bestPractices": "Use vectorized ops. Pre-allocate with np.zeros/np.empty. Use appropriate dtypes. Use axis parameter. Use np.where for conditionals.",
            "performanceNotes": "10-100x faster than pure Python. Contiguous memory enables CPU cache. BLAS libraries accelerate linear algebra.",
            "interviewPerspective": "Broadcasting rules, view vs copy, vectorization. Implement operations without loops."
          },
          "quiz": [
            {
              "id": "py-np-arr-1",
              "question": "What does np.array([1,2,3]) * np.array([4,5,6]) produce?",
              "options": [
                "[4, 10, 18]",
                "[[4,5,6],[8,10,12],[12,15,18]]",
                "32",
                "Error"
              ],
              "correctIndex": 0,
              "explanation": "* performs element-wise multiplication, not matrix multiplication.",
              "difficulty": "easy"
            },
            {
              "id": "py-np-arr-2",
              "question": "Shape after np.arange(12).reshape(3,4)?",
              "options": [
                "(3, 4)",
                "(4, 3)",
                "(12,)",
                "Error"
              ],
              "correctIndex": 0,
              "explanation": "reshape(3,4) creates 3 rows, 4 columns. Total 12 elements.",
              "difficulty": "easy"
            },
            {
              "id": "py-np-arr-3",
              "question": "Does slicing create copy or view?",
              "options": [
                "View for basic slice, copy for advanced indexing",
                "Always copy",
                "Always view",
                "Depends on dtype"
              ],
              "correctIndex": 2,
              "explanation": "Basic slicing returns view. Advanced indexing (boolean, integer arrays) returns copy.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Explain NumPy broadcasting rules. What happens adding (3,1) + (1,4)?",
              "answer": "Broadcasting aligns from right. For (3,1) and (1,4): 1->3, 1->4. Result (3,4). Rules: prepend 1s, compatible if equal or one is 1, result takes max dimensions.",
              "difficulty": "medium",
              "company": "Google"
            },
            {
              "question": "Compute pairwise Euclidean distance for (N,D) without Python loops.",
              "answer": "diff = points[:,np.newaxis,:] - points[np.newaxis,:,:]; dists = np.sqrt(np.sum(diff**2,axis=-1)). O(N^2*D) time, O(N^2) memory.",
              "difficulty": "hard",
              "company": "Amazon"
            }
          ],
          "codingChallenges": [
            {
              "title": "Normalize Matrix Columns",
              "description": "Z-score normalize each column of 2D array without sklearn.",
              "difficulty": "easy",
              "starterCode": "import numpy as np\ndef normalize_columns(X: np.ndarray) -> np.ndarray:\n    pass",
              "solutionHint": "Use X.mean(axis=0) and X.std(axis=0). (X - mean) / std."
            }
          ]
        },
        {
          "slug": "matrix-operations",
          "title": "Matrix Operations",
          "order": 2,
          "content": {
            "overview": "NumPy provides comprehensive linear algebra via np.linalg: matrix multiplication, decomposition (LU, QR, SVD), eigenvalues, solving systems, norms.",
            "problemStatement": "Pure Python matrix ops are slow. NumPy delegates to optimized BLAS/LAPACK for Fortran-level performance.",
            "intuitionFirst": "Matrix operations are like factory machinery. @ operator is the conveyor belt connecting stations.",
            "realLifeAnalogy": "Matrix = recipe book. Columns = ingredients, rows = steps. Multiplication = combining books. Inversion = reverse instructions.",
            "howItWorks": "@ calls BLAS GEMM routines - hand-optimized assembly with SIMD and cache-blocking.",
            "beginnerExample": "A = np.array([[1,2],[3,4]])\nB = np.array([[5,6],[7,8]])\nC = A @ B\nprint(np.linalg.det(A))\nprint(np.linalg.inv(A))",
            "commonMistakes": "Using * instead of @. Computing inverse instead of solve. Forgetting A@B != B@A.",
            "bestPractices": "Use @ instead of dot. Use solve instead of inv. Check condition number. Use SVD for pseudoinverse.",
            "performanceNotes": "BLAS-limited. MKL/OpenBLAS multi-threaded. O(n^3) complexity. GPU provides 10-100x speedup.",
            "interviewPerspective": "SVD applications, eigenvalues, matrix properties. Different decompositions use cases."
          },
          "quiz": [
            {
              "id": "py-np-mat-1",
              "question": "What operator performs matrix multiplication?",
              "options": [
                "@",
                "*",
                "matmul()",
                "Both @ and *"
              ],
              "correctIndex": 0,
              "explanation": "@ operator does matrix multiplication. * is element-wise.",
              "difficulty": "easy"
            },
            {
              "id": "py-np-mat-2",
              "question": "Time complexity of n x n matrix multiplication?",
              "options": [
                "O(n^3)",
                "O(n^2)",
                "O(n log n)",
                "O(2^n)"
              ],
              "correctIndex": 0,
              "explanation": "Standard matrix multiplication is O(n^3). Each of n^2 outputs needs O(n) operations.",
              "difficulty": "medium"
            },
            {
              "id": "py-np-mat-3",
              "question": "Which solves Ax = b without computing inverse?",
              "options": [
                "np.linalg.solve(A,b)",
                "np.linalg.inv(A) @ b",
                "np.linalg.lstsq(A,b)",
                "np.dot(b,A)"
              ],
              "correctIndex": 0,
              "explanation": "solve() uses LU decomposition - faster and more numerically stable.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Explain SVD and its ML/data science applications.",
              "answer": "SVD decomposes A into U@S@V^T. Applications: PCA, collaborative filtering, image compression, pseudoinverse, LSA in NLP.",
              "difficulty": "hard",
              "company": "Google"
            },
            {
              "question": "Compute dot product of billion-element vectors not fitting in memory.",
              "answer": "Use memmap or chunked computation. np.memmap, iterate in chunks: sum(np.dot(mm[i:i+chunk], mm2[i:i+chunk])).",
              "difficulty": "hard",
              "company": "Amazon"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "broadcasting",
          "title": "Broadcasting",
          "order": 3,
          "content": {
            "overview": "Broadcasting automatically expands array dimensions for compatible operations without copying data.",
            "problemStatement": "Without broadcasting, operations between different-shaped arrays need manual dimension expansion or looping.",
            "intuitionFirst": "Like resizing a photo to fit a frame. Stretch the smaller image along each dimension to match the larger virtually.",
            "realLifeAnalogy": "Two rulers - 10cm and 1cm. Broadcasting extends 1cm ruler to 10cm repeating the same measurement.",
            "howItWorks": "Rules: prepend 1s, compatible if equal or one is 1. Result takes max dimensions. No memory copies - uses stride tricks.",
            "beginnerExample": "np.array([1,2,3,4]) + 10\nnp.ones((3,4)) + np.array([1,2,3,4])\nnp.ones((3,1)) + np.ones((1,4))",
            "commonMistakes": "Shape mismatch. Broadcasting from right. Using np.tile when broadcast works. Not using keepdims=True.",
            "bestPractices": "Use keepdims=True. Use np.newaxis for singleton dims. Prefer broadcasting over loops/tiling.",
            "performanceNotes": "Zero memory overhead. np.newaxis is free. GPU handles broadcasting natively.",
            "interviewPerspective": "Predict result shapes. Implement operations requiring intelligent broadcasting."
          },
          "quiz": [
            {
              "id": "py-np-bc-1",
              "question": "Shape of ones((3,1)) + ones((1,4))?",
              "options": [
                "(3, 4)",
                "(3, 1)",
                "(1, 4)",
                "Error"
              ],
              "correctIndex": 0,
              "explanation": "Both broadcast: 3 with 1 -> 3, 1 with 4 -> 4.",
              "difficulty": "easy"
            },
            {
              "id": "py-np-bc-2",
              "question": "Why does ones((3,4)) + array([1,2,3]) error?",
              "options": [
                "(3,) can't broadcast with (3,4) - trailing 3!=4",
                "Broadcasting not with 1D",
                "Must have same ndim",
                "+ doesnt broadcast"
              ],
              "correctIndex": 0,
              "explanation": "Broadcasting aligns from right. (3,) with (3,4): 3 vs 4 mismatch.",
              "difficulty": "medium"
            },
            {
              "id": "py-np-bc-3",
              "question": "What does broadcasting mean?",
              "options": [
                "Implicitly expanding array dimensions for compatible ops without copying",
                "Transmitting over network",
                "Splitting array",
                "Converting dtypes"
              ],
              "correctIndex": 0,
              "explanation": "Broadcasting virtually stretches arrays along singleton dimensions without physical copies.",
              "difficulty": "easy"
            }
          ],
          "faangQuestions": [
            {
              "question": "Apply per-channel brightness to image batch using broadcasting.",
              "answer": "images + np.array([r,g,b]).reshape(1,1,1,3) broadcasts across N,H,W.",
              "difficulty": "medium",
              "company": "Google"
            },
            {
              "question": "Pairwise Euclidean distance for X(N,D) and Y(M,D) with broadcasting.",
              "answer": "dists = sqrt(sum((X[:,np.newaxis] - Y[np.newaxis,:])**2, axis=-1)). O(N*M*D) intermediate memory. Alternative: -2*X@Y.T + norms.",
              "difficulty": "hard",
              "company": "Amazon"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "vectorization",
          "title": "Vectorization",
          "order": 4,
          "content": {
            "overview": "Vectorization replaces explicit Python loops with NumPy array operations executed in C. Key to NumPy's performance advantage.",
            "problemStatement": "Python loops are slow for numerical work - each iteration has interpreter overhead. Vectorized operations run compiled C code on entire arrays.",
            "intuitionFirst": "Instead of cooking one egg at a time (Python loop), vectorization fries all 12 eggs simultaneously (C-level array operation). Same result, drastically faster.",
            "realLifeAnalogy": "Mail sorting: manual (Python loop) sorts each letter individually. Automated sorter (vectorized) processes 1000 letters per second. Same outcome, different speed.",
            "howItWorks": "Vectorized ops call ufuncs (universal functions) that operate element-wise on ndarrays. ufuncs are C functions operating on contiguous memory with SIMD instructions.",
            "beginnerExample": "import numpy as np\nimport time\n# Python loop approach\nn = 10_000_000\npy_list = list(range(n))\nstart = time.time()\nresult = [x**2 for x in py_list]\nprint(f\"Python loop: {time.time()-start:.3f}s\")\n\n# NumPy vectorized approach\nnp_arr = np.arange(n)\nstart = time.time()\nresult = np_arr**2\nprint(f\"NumPy vectorized: {time.time()-start:.3f}s\")",
            "commonMistakes": "Writing explicit for loops over arrays. Not using axis parameter. Using np.vectorize (still Python-level loop). Creating temporary large arrays unnecessarily.",
            "bestPractices": "Use ufuncs (add, multiply, sqrt, etc.). Use axis parameter for reductions. Chain operations using np.where for conditionals. Use np.einsum for complex tensor ops.",
            "performanceNotes": "Vectorized ops are 10-100x faster than Python loops. ufuncs are limited to element-wise ops (not all algorithms vectorizable). Memory bandwidth becomes bottleneck for very large arrays.",
            "interviewPerspective": "Recognizing vectorizable patterns, understanding when vectorization isn't possible, implementing custom ufuncs with numpy.frompyfunc."
          },
          "quiz": [
            {
              "id": "py-np-vz-1",
              "question": "What speedup is typical for vectorized vs loop?",
              "options": [
                "10-100x",
                "2x",
                "1000x",
                "Same speed"
              ],
              "correctIndex": 0,
              "explanation": "Vectorization typically provides 10-100x speedup by moving loops from Python to C.",
              "difficulty": "easy"
            },
            {
              "id": "py-np-vz-2",
              "question": "What are NumPy ufuncs?",
              "options": [
                "Element-wise array operations in C",
                "User-defined functions",
                "Universal formatting tools",
                "Unique function identifiers"
              ],
              "correctIndex": 0,
              "explanation": "ufuncs (universal functions) perform element-wise operations on ndarrays in compiled C.",
              "difficulty": "medium"
            },
            {
              "id": "py-np-vz-3",
              "question": "What is a limitation of vectorization?",
              "options": [
                "Not all algorithms are vectorizable",
                "Slower than loops",
                "Uses more memory always",
                "Only works on 1D arrays"
              ],
              "correctIndex": 0,
              "explanation": "Some algorithms (e.g., recursive, state-dependent) cannot be expressed as element-wise operations.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Implement pairwise Manhattan distance matrix without loops.",
              "answer": "def manhattan(X): return np.sum(np.abs(X[:, np.newaxis] - X[np.newaxis, :]), axis=-1). Vectorized with broadcasting, O(N^2*D) time.",
              "difficulty": "medium",
              "company": "Google"
            },
            {
              "question": "Explain when vectorization fails - give an algorithm that requires loops.",
              "answer": "Stateful algorithms like cumulative sum with custom reset, moving average with dynamic window, or any algorithm where output[i] depends on output[i-1] in a non-linear way. These need numba/njit or Cython.",
              "difficulty": "hard",
              "company": "Amazon"
            }
          ],
          "codingChallenges": [
            {
              "title": "Vectorized Softmax",
              "description": "Compute softmax across rows of 2D array in fully vectorized manner.",
              "difficulty": "medium",
              "starterCode": "import numpy as np\ndef softmax(X: np.ndarray) -> np.ndarray:\n    pass",
              "solutionHint": "Subtract max for numerical stability: e_x = np.exp(X - X.max(axis=1, keepdims=True)); return e_x / e_x.sum(axis=1, keepdims=True)."
            }
          ]
        },
        {
          "slug": "random-statistics",
          "title": "Random & Statistics",
          "order": 5,
          "content": {
            "overview": "NumPy provides comprehensive random number generation (numpy.random) and statistical functions for arrays: mean, median, std, var, percentile, corrcoef.",
            "problemStatement": "Python's random module lacks array-level operations, efficient sampling, and reproducibility controls. NumPy random fills these gaps with vectorized generation.",
            "intuitionFirst": "NumPy random = casino with fast dice-rolling machine for thousands at once. Statistics = calculator analyzing all results simultaneously.",
            "realLifeAnalogy": "Survey analysis: generate 10,000 simulated responses (random), then compute average age, income spread (std), correlation between variables.",
            "howItWorks": "PCG64 (default) or Mersenne Twister generates pseudo-random numbers. RandomState/BitGenerators for reproducible sequences. Statistics computed via compiled ufuncs on arrays.",
            "beginnerExample": "import numpy as np\n# Random generation\nnp.random.seed(42)\nnorm = np.random.normal(loc=0, scale=1, size=1000)\nuniform = np.random.uniform(0, 1, (3, 4))\nintegers = np.random.randint(0, 100, 20)\nchoice = np.random.choice([\"a\",\"b\",\"c\"], size=10, p=[0.5,0.3,0.2])\n\n# Statistics\narr = np.random.randn(1000)\nprint(f\"Mean: {arr.mean():.3f}, Std: {arr.std():.3f}\")\nprint(f\"Median: {np.median(arr):.3f}\")\nprint(f\"Percentiles: {np.percentile(arr, [25, 50, 75])}\")\nprint(f\"Correlation: {np.corrcoef(arr, arr**2)[0,1]:.3f}\")",
            "commonMistakes": "Seeding after generating numbers (seed before). Using random module for arrays (slower). Not specifying dtype for random generation.",
            "bestPractices": "Use np.random.default_rng() (new way) for better statistical properties. Set seed for reproducibility. Use random.Generator for modern API. Pre-allocate arrays.",
            "performanceNotes": "Random generation uses contiguous memory writes - fast. Statistics are O(n). Use float32 for speed at cost of precision.",
            "interviewPerspective": "Monte Carlo simulation design, reproducibility strategies, statistical significance testing with NumPy."
          },
          "quiz": [
            {
              "id": "py-np-rs-1",
              "question": "What is the default PRNG in modern NumPy?",
              "options": [
                "PCG64",
                "Mersenne Twister",
                "Xoshiro256",
                "MT19937"
              ],
              "correctIndex": 0,
              "explanation": "Modern NumPy (1.17+) defaults to PCG64 for better statistical properties.",
              "difficulty": "hard"
            },
            {
              "id": "py-np-rs-2",
              "question": "How to ensure reproducible random numbers?",
              "options": [
                "Set np.random.seed(42) or use Generator with SeedSequence",
                "Set np.random.RANDOM = 42",
                "Use seed=True",
                "Reproducibility not possible"
              ],
              "correctIndex": 0,
              "explanation": "Set seed via np.random.seed() or create Generator with explicit SeedSequence.",
              "difficulty": "easy"
            },
            {
              "id": "py-np-rs-3",
              "question": "Which function computes sample standard deviation?",
              "options": [
                ".std() with ddof=1",
                ".std() with ddof=0",
                ".std() default",
                ".samplestd()"
              ],
              "correctIndex": 0,
              "explanation": "ddof=1 gives sample std (divide by n-1). Default ddof=0 gives population std.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design a Monte Carlo simulation to estimate pi using NumPy.",
              "answer": "Generate N random (x,y) points in [0,1]^2. Count points inside unit circle. pi_est = 4 * inside / N. Use np.random.uniform(0,1,(N,2)), compute sqrt(x^2+y^2), count <= 1.",
              "difficulty": "medium",
              "company": "Google"
            },
            {
              "question": "Generate 1 billion random samples efficiently. Memory constraints?",
              "answer": "Generate in chunks: for _ in range(batches): chunk = rng.random(chunk_size). Process each chunk. Use numpy.memmap for out-of-core. Consider streaming to disk.",
              "difficulty": "hard",
              "company": "Amazon"
            }
          ],
          "codingChallenges": []
        }
      ]
    },
    {
      "slug": "pandas",
      "title": "Libraries - Pandas",
      "description": "Pandas for data manipulation - Series, DataFrames, cleaning, transformation, GroupBy",
      "order": 4,
      "subtopics": [
        {
          "slug": "series",
          "title": "Series",
          "order": 1,
          "content": {
            "overview": "Pandas Series is a one-dimensional labeled array holding any data type. Similar to column in spreadsheet with ordered keys.",
            "problemStatement": "Python lists/dicts lack efficient label-based access and NaN handling. Series provides labeled indexing and alignment.",
            "intuitionFirst": "Series = hybrid of list and dictionary. Like list maintains order. Like dictionary has labeled keys.",
            "realLifeAnalogy": "Numbered exam answer key. Question numbers (index) map to answers (values). Lookup by number or position.",
            "howItWorks": "Series stores data in NumPy array with Index object. Operations align on index labels. Dict-like access and boolean indexing.",
            "beginnerExample": "import pandas as pd\ns = pd.Series([85, 92, 78], index=[\"Alice\",\"Bob\",\"Charlie\"], name=\"Scores\")\nprint(s[\"Alice\"])\nprint(s.iloc[0])\nprint(s[s > 80])",
            "comparisonTable": "| Feature | NumPy Array | Pandas Series |\n|---------|-------------|---------------|\n| Dimensionality | n-d (0-d to 32-d) | 1-d only |\n| Labeled index | No (integer only) | Yes (any hashable) |\n| Missing data | NaN (float only) | NaN, NaT, None, pd.NA |\n| Heterogeneous | No (single dtype) | Yes (object dtype) |\n| Alignment | Broadcasting (shape) | Index-based auto-alignment |\n| Operation results | New array | New series with labels |\n| Time series aware | No | Yes (DatetimeIndex) |\n| Memory efficiency | Most efficient | Slightly more overhead |",
            "commonMistakes": "Confusing loc vs iloc. Forgetting label slices inclusive vs position slices exclusive. Assuming alignment without NaN.",
            "bestPractices": "Use meaningful index. Use .loc for label, .iloc for position. Use .at/.iat for scalar access.",
            "performanceNotes": "Series ops built on NumPy - vectorized. String Series use object dtype (slower).",
            "interviewPerspective": "Labeled vs positional indexing, auto-alignment, NaN propagation."
          },
          "quiz": [
            {
              "id": "py-sr-1",
              "question": "Difference between .loc and .iloc?",
              "options": [
                ".loc uses labels, .iloc uses positions",
                ".loc uses positions, .iloc uses labels",
                "Identical",
                ".loc for columns, .iloc for rows"
              ],
              "correctIndex": 0,
              "explanation": ".loc accesses by label. .iloc accesses by integer position.",
              "difficulty": "easy"
            },
            {
              "id": "py-sr-2",
              "question": "What happens adding two Series with different indices?",
              "options": [
                "Align on labels; missing become NaN",
                "Error: indices must match",
                "Only overlapping kept",
                "First index used"
              ],
              "correctIndex": 0,
              "explanation": "Pandas auto-aligns on index. Mismatched indices produce NaN.",
              "difficulty": "medium"
            },
            {
              "id": "py-sr-3",
              "question": "How to access underlying NumPy array?",
              "options": [
                ".values",
                ".array",
                ".numpy()",
                ".data"
              ],
              "correctIndex": 0,
              "explanation": ".values returns underlying NumPy array.",
              "difficulty": "easy"
            }
          ],
          "faangQuestions": [
            {
              "question": "Explain Pandas index alignment during arithmetic.",
              "answer": "Pandas aligns on index labels. Labels in only one Series produce NaN. Use .align() with join parameter or .fillna() to handle.",
              "difficulty": "medium",
              "company": "Google"
            },
            {
              "question": "Compare Series with Python dict and NumPy array.",
              "answer": "Series combines dict label access with NumPy vectorization. Dict: O(1) lookup, no vectorization. NumPy: fast ops, no labels. Series: both + NaN handling.",
              "difficulty": "medium",
              "company": "Amazon"
            }
          ],
          "codingChallenges": [
            {
              "title": "Series Alignment",
              "description": "Compute element-wise sum of two series with different indices, filling NaN with 0.",
              "difficulty": "easy",
              "starterCode": "import pandas as pd\ndef aligned_sum(s1: pd.Series, s2: pd.Series) -> pd.Series:\n    pass",
              "solutionHint": "Use .add(s2, fill_value=0)."
            }
          ]
        },
        {
          "slug": "dataframes",
          "title": "DataFrames",
          "order": 2,
          "content": {
            "overview": "DataFrame is a 2D labeled data structure with columns of different types, like a spreadsheet or SQL table.",
            "problemStatement": "Tabular data manipulation needs intuitive row/column access, powerful I/O, and integrated data manipulation.",
            "intuitionFirst": "DataFrame = spreadsheet in Python with labels, vectorized operations, and built-in functions.",
            "realLifeAnalogy": "Class gradebook. Each row = student, each column = assignment. Compute averages, sort, filter.",
            "howItWorks": "DataFrame stores each column as Series sharing common index. ColumnStore layout for efficient column access.",
            "beginnerExample": "df = pd.DataFrame({\"Name\": [\"Alice\",\"Bob\"], \"Age\": [25,30], \"City\": [\"NYC\",\"SF\"]})\nprint(df.head())\nprint(df[\"Name\"])\nprint(df[df[\"Age\"] > 28])",
            "commonMistakes": "Chained indexing causing SettingWithCopyWarning. df[\"col\"] returns Series, df[[\"col\"]] returns DataFrame.",
            "bestPractices": "Use .loc/.iloc explicitly. Avoid chained indexing. Use .copy() for modifications. Use .query() for filtering.",
            "performanceNotes": "Column access O(1), row access requires scanning. Use .at/.iat for scalar. Categorical dtype for memory savings.",
            "interviewPerspective": "View vs copy, boolean indexing, chained indexing pitfalls."
          },
          "quiz": [
            {
              "id": "py-df-1",
              "question": "df[\"col\"] vs df[[\"col\"]]?",
              "options": [
                "Series vs DataFrame",
                "Both Series",
                "Both DataFrame",
                "DataFrame vs Series"
              ],
              "correctIndex": 0,
              "explanation": "Single bracket with single key returns Series. Double brackets return DataFrame.",
              "difficulty": "easy"
            },
            {
              "id": "py-df-2",
              "question": "What is SettingWithCopyWarning?",
              "options": [
                "Warning about modifying copy instead of original",
                "Warning about overwriting data",
                "Warning about type conversion",
                "Warning about missing values"
              ],
              "correctIndex": 0,
              "explanation": "Pandas warns when chained indexing may modify a copy instead of original.",
              "difficulty": "medium"
            },
            {
              "id": "py-df-3",
              "question": "Which method gives summary statistics?",
              "options": [
                ".describe()",
                ".summary()",
                ".info()",
                ".stats()"
              ],
              "correctIndex": 0,
              "explanation": ".describe() computes count, mean, std, min, quartiles, max.",
              "difficulty": "easy"
            }
          ],
          "faangQuestions": [
            {
              "question": "Explain copy vs view semantics. How to ensure modifying original?",
              "answer": "Pandas uses copy-on-write. df[\"col\"] returns view when possible. Use df.loc[condition, \"col\"] = value. Use .copy() for explicit copy.",
              "difficulty": "hard",
              "company": "Google"
            },
            {
              "question": "Efficiently update specific cell in large DataFrame?",
              "answer": "Use .at or .iat for scalar access: df.at[row, col] = value. Much faster than .loc for single cells.",
              "difficulty": "medium",
              "company": "Amazon"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "data-cleaning",
          "title": "Data Cleaning",
          "order": 3,
          "content": {
            "overview": "Data cleaning addresses missing values, duplicates, outliers, formatting, and incorrect types. 60-80% of data science work.",
            "problemStatement": "Real-world data is messy. Pandas provides tools for each challenge: NaN handling, duplicates, type conversion.",
            "intuitionFirst": "Like preparing ingredients before cooking. Wash (remove dupes), peel (fix types), chop (reshape), sort (handle missing).",
            "realLifeAnalogy": "Organizing warehouse. Missing labels (NaN), duplicates (remove), wrong boxes (wrong dtype), damaged items (outliers).",
            "howItWorks": "NaN via NumPy or pd.NA. isna()/dropna() identify/remove. fillna() imputes. duplicated()/drop_duplicates(). astype() converts.",
            "beginnerExample": "df = pd.DataFrame({\"Name\": [\"Alice\", None], \"Age\": [25, None]})\nprint(df.isnull().sum())\ndf_clean = df.dropna()\ndf_filled = df.fillna({\"Name\": \"Unknown\", \"Age\": df[\"Age\"].median()})",
            "commonMistakes": "dropna() without checking data loss. Filling time series with mean instead of interpolation.",
            "bestPractices": "Inspect missing patterns. Use pd.NA for nullable integers. Use interpolate() for time series. Use clip() for outliers.",
            "performanceNotes": "fillna(method='ffill') memory efficient. astype('category') saves memory. drop_duplicates() O(n).",
            "interviewPerspective": "Missing data mechanisms. Imputation strategies (mean, median, regression, KNN)."
          },
          "quiz": [
            {
              "id": "py-dc-1",
              "question": "What does isnull().sum() return?",
              "options": [
                "Missing count per column",
                "Total missing",
                "Boolean mask",
                "Percentage missing"
              ],
              "correctIndex": 0,
              "explanation": "isnull() returns boolean mask, sum() counts True per column.",
              "difficulty": "easy"
            },
            {
              "id": "py-dc-2",
              "question": "What does errors='coerce' in to_datetime() do?",
              "options": [
                "Invalid dates become NaT",
                "Errors raised",
                "Invalid become empty strings",
                "Conversion skipped"
              ],
              "correctIndex": 0,
              "explanation": "errors='coerce' sets invalid date strings to NaT.",
              "difficulty": "medium"
            },
            {
              "id": "py-dc-3",
              "question": "Which method removes duplicate rows?",
              "options": [
                ".drop_duplicates()",
                ".unique()",
                ".distinct()",
                ".dedup()"
              ],
              "correctIndex": 0,
              "explanation": "drop_duplicates() removes rows duplicate across all columns.",
              "difficulty": "easy"
            }
          ],
          "faangQuestions": [
            {
              "question": "30% missing values across columns. Describe imputation strategy.",
              "answer": "Analyze pattern. MCAR: drop if <5%, impute if more. Numeric: median (robust) or mean. Categorical: mode or 'Missing' category. Time series: ffill/bfill/interpolation. Add is_missing indicators.",
              "difficulty": "hard",
              "company": "Google"
            },
            {
              "question": "Handle inconsistent date formats?",
              "answer": "pd.to_datetime(series, infer_datetime_format=True). For complex, try multiple formats in try/except. Collect failed for manual inspection.",
              "difficulty": "medium",
              "company": "Amazon"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "transformation",
          "title": "Data Transformation (map, apply, applymap)",
          "order": 4,
          "content": {
            "overview": "Pandas provides .map(), .apply(), and .applymap() for transforming data. map works on Series, apply on DataFrame/Series, applymap on DataFrame element-wise.",
            "problemStatement": "Column/row transformations need flexible function application. Loops are slow and verbose. Pandas apply methods balance flexibility and performance.",
            "intuitionFirst": "map = replace each value per lookup. apply = function running down column like assembly line. applymap = filter across every cell.",
            "realLifeAnalogy": "Factory line: map swaps box labels (value mapping), apply stamps each box (row function), applymap polishes every surface (element-wise).",
            "howItWorks": "map uses dict/function on Series and replaces NaN for missing keys. apply passes rows/columns to function (axis=1 for row-wise, axis=0 for column-wise). applymap calls function on every element.",
            "beginnerExample": "import pandas as pd\ndf = pd.DataFrame({\"name\": [\"alice\", \"bob\"], \"score\": [85, 92]})\n# map on Series\ndf[\"name_upper\"] = df[\"name\"].map(str.upper)\ndf[\"grade\"] = df[\"score\"].map({85: \"B\", 92: \"A\"})\n\n# apply on DataFrame\ndf[\"score_bonus\"] = df[\"score\"].apply(lambda x: x + 5)\n\n# apply on axis\ndf[\"total\"] = df[[\"score\"]].apply(lambda row: row.sum(), axis=1)\n\n# applymap element-wise\ndf_str = df[[\"name\"]].applymap(lambda s: s.upper())",
            "commonMistakes": "Using apply when vectorized operation exists. apply on entire DataFrame when column operation suffices. Forgetting axis=1 for row-wise apply. apply on string column (use .str accessor for speed).",
            "bestPractices": "Prefer vectorized ops over apply when possible. Use agg for multiple statistics. Use pipe for chaining transformations. Use swifter for parallel apply on large data.",
            "performanceNotes": "apply is ~10x slower than vectorized. applymap is slow (element-wise). map is faster than apply for Series. Use np.vectorize or numba for custom functions on large data.",
            "interviewPerspective": "Vectorized vs map vs apply performance hierarchy, when user-defined functions necessitate apply, optimizing slow apply calls."
          },
          "quiz": [
            {
              "id": "py-pd-tf-1",
              "question": "What is the difference between map and apply on Series?",
              "options": [
                "map for element-wise mapping (dict/function); apply for function with additional args",
                "map is faster",
                "apply is for DataFrames only",
                "No difference"
              ],
              "correctIndex": 0,
              "explanation": "map is specifically for value substitution. apply can pass additional args/kwargs.",
              "difficulty": "medium"
            },
            {
              "id": "py-pd-tf-2",
              "question": "What does apply(axis=1) do?",
              "options": [
                "Applies function row-wise",
                "Applies function column-wise",
                "Applies to every element",
                "Applies to index"
              ],
              "correctIndex": 0,
              "explanation": "axis=1 applies function to each row. axis=0 (default) applies to each column.",
              "difficulty": "easy"
            },
            {
              "id": "py-pd-tf-3",
              "question": "What is applymap used for?",
              "options": [
                "Element-wise operation on entire DataFrame",
                "Mapping dictionary to column",
                "Group-wise aggregation",
                "Joining DataFrames"
              ],
              "correctIndex": 0,
              "explanation": "applymap applies function to every cell in DataFrame.",
              "difficulty": "easy"
            }
          ],
          "faangQuestions": [
            {
              "question": "Standardize numeric columns (z-score) without sklearn using apply or vectorized.",
              "answer": "Vectorized: (df - df.mean()) / df.std() is fastest. Using apply: df.apply(lambda x: (x - x.mean()) / x.std()) but 10x slower.",
              "difficulty": "medium",
              "company": "Google"
            },
            {
              "question": "Apply complex custom function to each row efficiently for 10M rows.",
              "answer": "Option 1: Vectorize logic if possible. Option 2: Use df.to_records() and np.apply_along_axis. Option 3: Use numba/njit on underlying arrays. Option 4: Multiprocessing with df.groupby(np.arange(len(df)) % n_cores).",
              "difficulty": "hard",
              "company": "Amazon"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "groupby",
          "title": "GroupBy & Aggregation",
          "order": 5,
          "content": {
            "overview": "GroupBy implements split-apply-combine: split data into groups, apply function to each, combine into result. SQL GROUP BY equivalent in Pandas.",
            "problemStatement": "Summarizing data by categories is fundamental in data analysis. Manual grouping with loops is tedious and error-prone.",
            "intuitionFirst": "Like sorting M&Ms by color, then counting or averaging each pile. GroupBy: split by color, apply count/average, combine results.",
            "realLifeAnalogy": "Gradebook analysis: group students by grade, compute average score per group, find highest scorer in each group.",
            "howItWorks": "df.groupby('col') returns DataFrameGroupBy. Groups via hash-based mapping. Aggregation functions (sum, mean, count) applied per group. transform broadcasts result back to original shape.",
            "beginnerExample": "import pandas as pd\ndf = pd.DataFrame({\"dept\": [\"Eng\", \"Sales\", \"Eng\", \"Sales\"],\n                   \"salary\": [100, 80, 120, 90],\n                   \"bonus\": [10, 5, 15, 8]})\n\n# Simple aggregation\nresult = df.groupby(\"dept\")[\"salary\"].mean()\n\n# Multiple aggregations\nresult = df.groupby(\"dept\").agg({\"salary\": [\"mean\", \"max\"], \"bonus\": \"sum\"})\n\n# Named aggregation\nresult = df.groupby(\"dept\").agg(avg_salary=(\"salary\", \"mean\"), total_bonus=(\"bonus\", \"sum\"))\n\n# Transform (keep original shape)\ndf[\"dept_avg\"] = df.groupby(\"dept\")[\"salary\"].transform(\"mean\")",
            "commonMistakes": "Forgetting to reset_index() after groupby. Chaining aggregation incorrectly. Using apply instead of agg. Not handling multi-level columns from agg.",
            "bestPractices": "Use agg with dict for column-specific functions. Use named aggregation for clarity. Use transform for broadcasting. Use filter for group filtering. Use pipe for complex chains.",
            "performanceNotes": "groupby is optimized C code. agg is faster than apply. transform is O(n) per group. For many groups, sort=False helps performance.",
            "interviewPerspective": "SQL GROUP BY translation to Pandas. Split-apply-combine pattern comprehension. Aggregation vs transform difference. Complex grouped operations."
          },
          "quiz": [
            {
              "id": "py-pd-gb-1",
              "question": "What does df.groupby('col') return?",
              "options": [
                "DataFrameGroupBy object",
                "DataFrame",
                "Series",
                "Dict of DataFrames"
              ],
              "correctIndex": 0,
              "explanation": "groupby returns a GroupBy object that is lazily evaluated until aggregation.",
              "difficulty": "easy"
            },
            {
              "id": "py-pd-gb-2",
              "question": "What is the difference between agg and transform?",
              "options": [
                "agg returns reduced DataFrame per group; transform returns same shape as original",
                "agg is for columns; transform for rows",
                "No difference",
                "agg is faster"
              ],
              "correctIndex": 0,
              "explanation": "agg reduces group to single value; transform broadcasts result back to original DataFrame shape.",
              "difficulty": "medium"
            },
            {
              "id": "py-pd-gb-3",
              "question": "How to compute multiple aggregation functions on same column?",
              "options": [
                "Pass list of functions to agg: .agg(['sum', 'mean'])",
                "Call groupby twice",
                "Use apply with tuple",
                "Not possible"
              ],
              "correctIndex": 0,
              "explanation": "Pass list ['sum', 'mean'] to agg for multiple aggregations on same column.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Find top 3 highest earners per department.",
              "answer": "df.groupby('dept')['salary'].nlargest(3). Alternative: df.sort_values('salary', ascending=False).groupby('dept').head(3).",
              "difficulty": "medium",
              "company": "Google"
            },
            {
              "question": "Compute percentage of total per group and rank within group.",
              "answer": "df['pct'] = df['value'] / df.groupby('group')['value'].transform('sum'); df['rank'] = df.groupby('group')['value'].rank(ascending=False).",
              "difficulty": "hard",
              "company": "Amazon"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "merge-join",
          "title": "Merge, Join & Concatenate",
          "order": 6,
          "content": {
            "overview": "Pandas provides pd.merge() for SQL-like joins (inner, outer, left, right), df.join() for index-based joining, and pd.concat() for stacking DataFrames.",
            "problemStatement": "Real data is scattered across multiple tables. Combining datasets requires careful join logic, handling overlapping columns, aligning indices.",
            "intuitionFirst": "Merge = SQL JOIN - connect tables by common column. Concat = stacking blocks vertically (more rows) or horizontally (more columns).",
            "realLifeAnalogy": "Two address books: one with emails, one with phones. Merge on name to combine both. Concat: append Jan-Mar sales to Apr-Jun sales.",
            "howItWorks": "pd.merge uses hash-based join on key column(s). how='inner' keeps only matches, 'outer' keeps all, 'left' keeps left table rows. concat either stacks (axis=0) or side-by-side (axis=1) aligning on index.",
            "beginnerExample": "import pandas as pd\nemployees = pd.DataFrame({\"id\": [1,2,3], \"name\": [\"Alice\",\"Bob\",\"Charlie\"]})\nsalaries = pd.DataFrame({\"id\": [1,2,4], \"salary\": [70000, 80000, 90000]})\n\n# Inner join\nmerged = pd.merge(employees, salaries, on=\"id\", how=\"inner\")\n\n# Left join\nmerged_left = pd.merge(employees, salaries, on=\"id\", how=\"left\")\n\n# Outer join\nmerged_outer = pd.merge(employees, salaries, on=\"id\", how=\"outer\")\n\n# Concatenation\ndf1 = pd.DataFrame({\"A\": [1,2]})\ndf2 = pd.DataFrame({\"A\": [3,4]})\nstacked = pd.concat([df1, df2], axis=0)\n# Side by side\nside = pd.concat([df1, df2], axis=1)",
            "commonMistakes": "Forgetting to specify how (default inner - data loss). Merge on non-unique keys (cartesian product). Index misalignment in concat. Duplicate column names after merge.",
            "bestPractices": "Always specify how explicitly. Use indicator=True to debug merge. Use validate parameter to check relationship. Use keys for concat to track origin.",
            "performanceNotes": "Merge O(n log n) with sort=True (default). sort=False is faster. Concat axis=0 is O(n). Large merges may need Dask or SQL for performance.",
            "interviewPerspective": "SQL to Pandas translation, merge vs join vs concat, handling many-to-many joins, merge performance optimization."
          },
          "quiz": [
            {
              "id": "py-pd-mj-1",
              "question": "Default merge type if how not specified?",
              "options": [
                "Inner",
                "Left",
                "Outer",
                "Right"
              ],
              "correctIndex": 0,
              "explanation": "pd.merge defaults to inner join, keeping only keys that appear in both.",
              "difficulty": "easy"
            },
            {
              "id": "py-pd-mj-2",
              "question": "What does indicator=True in merge do?",
              "options": [
                "Adds _merge column showing source of each row",
                "Shows progress bar",
                "Validates key uniqueness",
                "Shows merge time"
              ],
              "correctIndex": 0,
              "explanation": "indicator=True adds _merge column with values: left_only, right_only, both.",
              "difficulty": "medium"
            },
            {
              "id": "py-pd-mj-3",
              "question": "When to use concat vs merge?",
              "options": [
                "concat for stacking rows/columns; merge for key-based joining",
                "concat is faster always",
                "merge only for SQL users",
                "No difference"
              ],
              "correctIndex": 0,
              "explanation": "concat stacks DataFrames along axis; merge joins based on column/key relationships.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Detect records in one table not present in another (anti-join).",
              "answer": "Use merge with indicator=True, then filter for ['left_only']. Alternatively: df1[~df1['key'].isin(df2['key'])].",
              "difficulty": "medium",
              "company": "Google"
            },
            {
              "question": "Merge 10 large DataFrames on a shared key efficiently.",
              "answer": "Reduce merge tree: use reduce from functools to merge iteratively. Use left joins sequentially. Ensure all have same key dtype. Consider Dask for out-of-core.",
              "difficulty": "hard",
              "company": "Amazon"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "time-series",
          "title": "Time Series",
          "order": 7,
          "content": {
            "overview": "Pandas excels at time series with DatetimeIndex, resampling, rolling windows, shifting, timezone handling, and date ranges.",
            "problemStatement": "Time series data (stock prices, sensor readings, logs) needs date-based indexing, frequency conversion, sliding windows, and lagged operations.",
            "intuitionFirst": "Time series = data where time is the index, not a column. Resample = change time frequency. Rolling = moving window calculations.",
            "realLifeAnalogy": "Weather data: hourly readings for a year. Resample to daily average. Rolling 7-day average smooths daily fluctuations to show trend.",
            "howItWorks": "pd.to_datetime converts strings. set_index('date'). resample(freq) changes frequency with aggregation. rolling(window).mean() computes moving average. shift() creates lagged columns.",
            "beginnerExample": "import pandas as pd\nimport numpy as np\n# Create time series\ndates = pd.date_range(\"2024-01-01\", periods=100, freq=\"D\")\ndf = pd.DataFrame({\"value\": np.random.randn(100)}, index=dates)\n\n# Resample to weekly\ndf_weekly = df.resample(\"W\").mean()\n\n# Rolling window\ndf[\"ma_7\"] = df[\"value\"].rolling(window=7).mean()\n\n# Lag features\ndf[\"lag_1\"] = df[\"value\"].shift(1)\ndf[\"diff\"] = df[\"value\"].diff()\n\n# Date range filtering\ndf_q1 = df[\"2024-01\":\"2024-03\"]",
            "commonMistakes": "Not setting datetime as index before resample. Forgetting timezone handling. Wrong resample label convention. Look-ahead bias from shift before sorting.",
            "bestPractices": "Set date as index for time series. Use freq string (D, W, M, Q, Y, H). Use origin parameter for anchor. Use tz_localize/tz_convert for timezone. Sort index before shift.",
            "performanceNotes": "Resample with C-backed operations is fast. Rolling uses O(n*w) naive, O(n) for built-in. DateTimeIndex enables efficient slicing.",
            "interviewPerspective": "Resampling techniques, rolling window computation, creating lag/lead features for ML, time series cross-validation, datetime feature engineering."
          },
          "quiz": [
            {
              "id": "py-pd-ts-1",
              "question": "What is required before using resample?",
              "options": [
                "DatetimeIndex",
                "Column named date",
                "Sorted data",
                "No missing values"
              ],
              "correctIndex": 0,
              "explanation": "The DataFrame must have a DatetimeIndex (or use on parameter in newer Pandas).",
              "difficulty": "easy"
            },
            {
              "id": "py-pd-ts-2",
              "question": "What does rolling(7).mean() compute?",
              "options": [
                "Moving average of last 7 rows",
                "Average of first 7 rows",
                "Resampled weekly average",
                "Expanding average"
              ],
              "correctIndex": 0,
              "explanation": "rolling(7).mean() takes window of last 7 observations, computes mean for each position.",
              "difficulty": "medium"
            },
            {
              "id": "py-pd-ts-3",
              "question": "What does shift(1) do?",
              "options": [
                "Creates column with previous row's values",
                "Moves column by 1 position",
                "Calculates difference from previous",
                "Aligns to next frequency"
              ],
              "correctIndex": 0,
              "explanation": "shift(1) moves all values down by 1, creating a lag feature. First row becomes NaN.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Compute 30-day rolling volatility from daily returns.",
              "answer": "df['returns'] = df['price'].pct_change(); df['volatility'] = df['returns'].rolling(30).std() * sqrt(252) for annualized volatility.",
              "difficulty": "medium",
              "company": "Google"
            },
            {
              "question": "Detect anomalies in time series using rolling statistics.",
              "answer": "df['ma'] = df['value'].rolling(24).mean(); df['std'] = df['value'].rolling(24).std(); df['zscore'] = (df['value'] - df['ma']) / df['std']; anomalies = df[df['zscore'].abs() > 3].",
              "difficulty": "hard",
              "company": "Amazon"
            }
          ],
          "codingChallenges": []
        }
      ]
    },
    {
      "slug": "matplotlib",
      "title": "Libraries - Matplotlib",
      "description": "Matplotlib for data visualization - basic plots, figure management, customization",
      "order": 5,
      "subtopics": [
        {
          "slug": "basic-plotting",
          "title": "Basic Plotting (Line, Scatter, Bar, Histogram, Pie)",
          "order": 1,
          "content": {
            "overview": "Matplotlib is Python's foundational plotting library. Basic plots: line (trends), scatter (correlations), bar (comparisons), histogram (distributions), pie (proportions).",
            "problemStatement": "Raw data is hard to interpret. Visualizations reveal patterns, outliers, and relationships. Choosing the right plot type is crucial.",
            "intuitionFirst": "Each plot tells a different story: lines show change over time, scatter shows relationships, bars compare, histograms show distribution.",
            "realLifeAnalogy": "Line plot = timeline. Scatter = map of relationships. Bar chart = ranking. Histogram = profile silhouette of data.",
            "howItWorks": "Matplotlib uses pyplot state machine or OOP (Figure/Axes). plt.plot() = line, plt.scatter() = scatter, plt.bar() = bar, plt.hist() = histogram.",
            "beginnerExample": "import matplotlib.pyplot as plt\nimport numpy as np\nx = np.linspace(0, 10, 100)\nplt.plot(x, np.sin(x), label=\"sin(x)\")\nplt.plot(x, np.cos(x), label=\"cos(x)\")\nplt.xlabel(\"X\")\nplt.ylabel(\"Y\")\nplt.legend()\nplt.show()",
            "commonMistakes": "Not calling plt.show() in scripts. Using pyplot for everything instead of OOP API. Forgetting labels and titles.",
            "bestPractices": "Use OOP API (fig, ax = plt.subplots()) for complex plots. Always add labels, title, legend. Use sensible colors.",
            "performanceNotes": "Rendering millions of points slow - use line collections or rasterization. Vector formats (SVG) for publications.",
            "interviewPerspective": "Which plot for which data type. Subplots and figure customization."
          },
          "quiz": [
            {
              "id": "py-mpl-1",
              "question": "Best plot for distribution of single numeric variable?",
              "options": [
                "Histogram",
                "Line plot",
                "Scatter plot",
                "Pie chart"
              ],
              "correctIndex": 0,
              "explanation": "Histograms show frequency distribution by binning values.",
              "difficulty": "easy"
            },
            {
              "id": "py-mpl-2",
              "question": "What happens calling savefig after show?",
              "options": [
                "Saved figure will be empty (show clears figure)",
                "Both work",
                "Only show works",
                "Only savefig works"
              ],
              "correctIndex": 0,
              "explanation": "plt.show() clears current figure. Call savefig before show.",
              "difficulty": "medium"
            },
            {
              "id": "py-mpl-3",
              "question": "Purpose of alpha parameter in scatter?",
              "options": [
                "Controls transparency for overlapping data",
                "Controls point size",
                "Controls color intensity",
                "Controls edge width"
              ],
              "correctIndex": 0,
              "explanation": "alpha sets transparency (0-1), useful when points overlap heavily.",
              "difficulty": "easy"
            }
          ],
          "faangQuestions": [
            {
              "question": "Visualize 10 million data points - approach?",
              "answer": "1) Downsample to 10k. 2) Hexbin plots for 2D density. 3) Rasterization. 4) Datashader for GPU rendering.",
              "difficulty": "hard",
              "company": "Google"
            },
            {
              "question": "Publication-quality figure with 4 subplots and shared legend?",
              "answer": "fig, axes = plt.subplots(2,2). Collect handles/labels. fig.legend(handles, labels, loc='lower center'). Adjust layout with tight_layout().",
              "difficulty": "medium",
              "company": "Amazon"
            }
          ],
          "codingChallenges": [
            {
              "title": "Multi-plot Dashboard",
              "description": "Create 2x2 subplot grid with sine, scatter, bar, histogram. Add titles and common figure title.",
              "difficulty": "easy",
              "starterCode": "import matplotlib.pyplot as plt\nimport numpy as np\ndef create_dashboard():\n    pass",
              "solutionHint": "Use plt.subplots(2,2). Plot on each axis. Use fig.suptitle()."
            }
          ]
        },
        {
          "slug": "figure-management",
          "title": "Figure & Subplots Management",
          "order": 2,
          "content": {
            "overview": "Matplotlib's OOP API uses figures (top-level container) and axes (individual plot areas). subplots() creates grid layouts. Tight layout prevents overlap.",
            "problemStatement": "Single plots are insufficient for multi-faceted data. Organizing multiple related plots in grid requires understanding figure/axes hierarchy.",
            "intuitionFirst": "Figure = canvas. Axes = individual paintings on that canvas. Subplots = dividing canvas into equal sections for related paintings.",
            "realLifeAnalogy": "Museum wall (figure) with multiple paintings (axes). Each painting has its own frame. You can arrange them in rows and columns.",
            "howItWorks": "plt.subplots(nrows, ncols) returns Figure and array of Axes. fig, axes = plt.subplots(2, 2). Index axes[row, col]. fig.tight_layout() auto-adjusts spacing.",
            "beginnerExample": "import matplotlib.pyplot as plt\nimport numpy as np\n\nfig, axes = plt.subplots(2, 2, figsize=(10, 8))\nx = np.linspace(0, 10, 100)\n\naxes[0, 0].plot(x, np.sin(x))\naxes[0, 0].set_title(\"Sine\")\n\naxes[0, 1].scatter(np.random.randn(100), np.random.randn(100))\naxes[0, 1].set_title(\"Scatter\")\n\naxes[1, 0].bar([\"A\",\"B\",\"C\"], [3, 7, 2])\naxes[1, 0].set_title(\"Bar\")\n\naxes[1, 1].hist(np.random.randn(1000), bins=30)\naxes[1, 1].set_title(\"Histogram\")\n\nfig.suptitle(\"Dashboard\", fontsize=16)\nfig.tight_layout()\nplt.show()",
            "commonMistakes": "Using pyplot (plt.plot) after creating subplots. Not indexing axes correctly for grid. Forgetting tight_layout(). Mismatched figsize to content.",
            "bestPractices": "Always use OOP API for subplots. Use fig, ax = plt.subplots() even for single plot. Use GridSpec for irregular layouts. Use constrained_layout=True.",
            "performanceNotes": "Subplots share figure canvas, memory efficient. Many subplots (>20) slow rendering. Use blit for animation optimization.",
            "interviewPerspective": "Pyplot vs OOP API, subplot layouts, sharex/sharey for aligned scales, inset axes."
          },
          "quiz": [
            {
              "id": "py-mpl-fm-1",
              "question": "What does plt.subplots(2, 3) return?",
              "options": [
                "(Figure, array of 6 Axes)",
                "(array of 6 Axes)",
                "Figure only",
                "List of figures"
              ],
              "correctIndex": 0,
              "explanation": "subplots returns (fig, axes) where axes is 2x3 array of Axes objects.",
              "difficulty": "easy"
            },
            {
              "id": "py-mpl-fm-2",
              "question": "What does tight_layout() do?",
              "options": [
                "Adjusts spacing to prevent overlap",
                "Makes plot full screen",
                "Locks figure size",
                "Compresses image"
              ],
              "correctIndex": 0,
              "explanation": "tight_layout() auto-adjusts subplot parameters to fit within figure area.",
              "difficulty": "medium"
            },
            {
              "id": "py-mpl-fm-3",
              "question": "How to create subplots with shared x-axis?",
              "options": [
                "Use sharex=True in subplots()",
                "Set xlim same on both",
                "Use linkaxes()",
                "Not possible"
              ],
              "correctIndex": 0,
              "explanation": "sharex=True makes subplots share x-axis, useful for time series comparisons.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Create publication-quality figure with 4 subplots sharing a common legend.",
              "answer": "fig, axes = plt.subplots(2,2). Collect handles/labels from each plot. fig.legend(handles, labels, loc='lower center', ncol=4). Adjust layout with plt.subplots_adjust(bottom=0.15).",
              "difficulty": "medium",
              "company": "Google"
            },
            {
              "question": "Design a multi-panel dashboard updating in real-time with matplotlib animation.",
              "answer": "Use FuncAnimation with update function that clears and redraws axes each frame. Use blit=True for performance. For complex dashboards, consider Plotly Dash instead.",
              "difficulty": "hard",
              "company": "Amazon"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "customization",
          "title": "Customization (Colors, Styles, Annotations)",
          "order": 3,
          "content": {
            "overview": "Matplotlib offers extensive customization: color maps, line styles, marker types, annotations, text, arrows, style sheets, and rcParams.",
            "problemStatement": "Default matplotlib plots look dated. Effective data communication requires intentional design choices: colors, highlights, annotations for key insights.",
            "intuitionFirst": "Default plot = black and white sketch. Customized plot = color illustration with callouts, labels, and professional finishing.",
            "realLifeAnalogy": "Presentation slide: default is text-only. Customization adds company colors, callout boxes, annotations, and logo for professional finish.",
            "howItWorks": "plt.style.use('seaborn-v0_8') sets style. Colors from colormaps (viridis, plasma). Annotations via ax.annotate(). Custom ticks, spines, grids via ax.tick_params(), ax.spines, ax.grid().",
            "beginnerExample": "import matplotlib.pyplot as plt\nimport numpy as np\n\nplt.style.use('seaborn-v0_8')\n\nx = np.linspace(0, 10, 100)\ny = np.sin(x)\n\nfig, ax = plt.subplots(figsize=(10, 6))\nax.plot(x, y, color='crimson', linewidth=2.5, linestyle='--', marker='o', markersize=4)\nax.axhline(0, color='gray', linestyle=':', alpha=0.7)\nax.axvline(np.pi, color='green', linestyle='--', alpha=0.5, label='π')\n\nax.annotate('Peak', xy=(np.pi/2, 1), xytext=(2, 1.3),\n            arrowprops=dict(arrowstyle='->', color='black'))\n\nax.set_xlabel('X axis', fontsize=12)\nax.set_ylabel('Y axis', fontsize=12)\nax.set_title('Customized Sine Wave', fontsize=14, fontweight='bold')\nax.grid(True, alpha=0.3)\nax.legend()\nplt.show()",
            "commonMistakes": "Using too many colors (keep <6). Not colorblind-friendly palettes. Over-annotating (cluttered). Ignoring style consistency across figures.",
            "bestPractices": "Use style sheets for consistency. Use colorblind-friendly palettes (viridis, cividis). Use axivine/axhline for reference lines. Annotate only key insights.",
            "performanceNotes": "Style sheets have minimal overhead. Complex customizations may slow rendering. Use rcParams for global defaults.",
            "interviewPerspective": "Design choices for different audiences. Color theory basics. Accessibility considerations for visualizations."
          },
          "quiz": [
            {
              "id": "py-mpl-cz-1",
              "question": "How to apply seaborn style to matplotlib?",
              "options": [
                "plt.style.use('seaborn-v0_8')",
                "import seaborn as sns",
                "plt.seaborn()",
                "No compatibility"
              ],
              "correctIndex": 0,
              "explanation": "plt.style.use('seaborn-v0_8') applies seaborn-like styling to matplotlib plots.",
              "difficulty": "easy"
            },
            {
              "id": "py-mpl-cz-2",
              "question": "Which colormap is recommended for colorblind accessibility?",
              "options": [
                "Viridis",
                "Jet",
                "Rainbow",
                "Hot"
              ],
              "correctIndex": 0,
              "explanation": "Viridis is perceptually uniform and colorblind-friendly. Jet and Rainbow are not recommended.",
              "difficulty": "medium"
            },
            {
              "id": "py-mpl-cz-3",
              "question": "What does ax.annotate() add?",
              "options": [
                "Text with optional arrow pointing to data point",
                "Axis labels",
                "Legend",
                "Grid lines"
              ],
              "correctIndex": 0,
              "explanation": "annotate() adds text annotation with optional arrow pointing at a specific data coordinate.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Create accessible visualization for colorblind audience showing 3 categories.",
              "answer": "Use marker shapes (circle, square, triangle) in addition to colors. Use dashed/dotted line styles. Label directly instead of relying on legend. Use viridis colormap.",
              "difficulty": "medium",
              "company": "Google"
            },
            {
              "question": "Design a style guide for company-wide data visualization consistency.",
              "answer": "Create custom style sheet with plt.style.core.USE_STYLE. Define consistent font family/size, color palette (primary, secondary, accent), figure sizes, spine visibility, grid style.",
              "difficulty": "hard",
              "company": "Amazon"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "saving-exporting",
          "title": "Saving & Exporting Figures",
          "order": 4,
          "content": {
            "overview": "Matplotlib saves figures to files via savefig() with extensive format support: PNG (raster), PDF/SVG (vector), JPEG (compressed). DPI control for resolution.",
            "problemStatement": "Figures need platform-appropriate exports: web (PNG), print (PDF), editable (SVG). Choosing correct format, DPI, and bounding box is critical.",
            "intuitionFirst": "Print vs web resolution is like photo printing: 300 DPI for brochure (print), 72 DPI for website, vector (SVG/PDF) for infinite zoom.",
            "realLifeAnalogy": "Saving photo: high-res JPEG for printing, low-res for email, RAW for editing. Matplotlib: high DPI PNG for publication, SVG for presentations, PDF for papers.",
            "howItWorks": "plt.savefig('path.png', dpi=300, bbox_inches='tight'). Format inferred from extension. transparent=True for transparent background. pad_inches controls margin.",
            "beginnerExample": "import matplotlib.pyplot as plt\nimport numpy as np\n\nfig, ax = plt.subplots(figsize=(8, 6))\nx = np.linspace(0, 10, 100)\nax.plot(x, np.sin(x))\nax.set_title(\"Export Example\")\n\n# Various export formats\nfig.savefig(\"plot.png\", dpi=300, bbox_inches=\"tight\")\nfig.savefig(\"plot.pdf\", bbox_inches=\"tight\")\nfig.savefig(\"plot.svg\", format=\"svg\")\nfig.savefig(\"plot.jpg\", dpi=150, quality=95)\n\n# Transparent background for presentations\nfig.savefig(\"plot_transparent.png\", transparent=True, dpi=200)\n\nplt.close(fig)  # Free memory",
            "commonMistakes": "Calling savefig after show() (figure resets). Using default DPI for print. Not using bbox_inches='tight' (whitespace cut off). Forgetting to close figures (memory leak in scripts).",
            "bestPractices": "Use savefig before show. Use bbox_inches='tight' always. Set dpi=300 for print, 72-150 for web. Use PDF for LaTeX papers. Use plt.close('all') in loops.",
            "performanceNotes": "PNG fastest. PDF/SVG larger but scalable. 600+ DPI very slow. Use rasterized=True for dense scatter points within vector files.",
            "interviewPerspective": "Raster vs vector formats, resolution requirements for different media, embedding fonts for publication."
          },
          "quiz": [
            {
              "id": "py-mpl-se-1",
              "question": "What does bbox_inches='tight' do?",
              "options": [
                "Removes excess whitespace around plot",
                "Makes plot fit in small box",
                "Sets border style to tight",
                "Changes aspect ratio"
              ],
              "correctIndex": 0,
              "explanation": "bbox_inches='tight' calculates tight bounding box, removing unnecessary whitespace.",
              "difficulty": "easy"
            },
            {
              "id": "py-mpl-se-2",
              "question": "Best format for LaTeX publication figures?",
              "options": [
                "PDF (vector)",
                "PNG (raster)",
                "JPG (compressed)",
                "GIF (animated)"
              ],
              "correctIndex": 0,
              "explanation": "PDF vector format is preferred for LaTeX - infinite resolution, small file, compiles well.",
              "difficulty": "medium"
            },
            {
              "id": "py-mpl-se-3",
              "question": "What happens to savefig if called after plt.show()?",
              "options": [
                "Saved figure may be blank or incomplete",
                "Works normally",
                "Overwrites existing file",
                "Throws error"
              ],
              "correctIndex": 0,
              "explanation": "plt.show() clears the current figure. Always call savefig before show.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Generate 1000 plots automatically for a batch report - memory management?",
              "answer": "Use loop with plt.close(fig) after each savefig. Or use plt.clf()/plt.cla(). For memory efficiency: del fig; gc.collect(). Consider using non-interactive backend: plt.switch_backend('Agg').",
              "difficulty": "medium",
              "company": "Google"
            },
            {
              "question": "Design a system to produce publication-quality figures at scale.",
              "answer": "Use plt.style.use, consistent rcParams. Parameterized plotting functions with figsize, dpi, colormap args. Save in multiple formats. Logging for failed renders. Parallel processing with multiprocessing.",
              "difficulty": "hard",
              "company": "Amazon"
            }
          ],
          "codingChallenges": []
        }
      ]
    },
    {
      "slug": "seaborn",
      "title": "Libraries - Seaborn",
      "description": "Seaborn for statistical visualization - distribution, relational, categorical, matrix, regression plots",
      "order": 6,
      "subtopics": [
        {
          "slug": "distribution-plots",
          "title": "Distribution Plots (Histplot, KDE, Displot)",
          "order": 1,
          "content": {
            "overview": "Seaborn distribution plots visualize univariate/bivariate distributions. histplot (histogram), kdeplot (density), displot (combined with faceting).",
            "problemStatement": "Matplotlib histograms lack automatic bin selection, density estimation, and by-group comparisons. Seaborn provides better defaults.",
            "intuitionFirst": "Histogram = stacking blocks by value. KDE = smooth curve through histogram outline. Together give complete picture.",
            "realLifeAnalogy": "Height chart of population. Histogram: count in brackets. KDE: smooth probability curve. Peak = most common height.",
            "howItWorks": "histplot bins via NumPy hist, optionally fits KDE. kdeplot uses Gaussian KDE. displot is figure-level with FacetGrid.",
            "beginnerExample": "import seaborn as sns\nimport numpy as np\ndata = np.random.randn(1000)\nsns.histplot(data, bins=30, kde=True)\nsns.kdeplot(data, fill=True)",
            "commonMistakes": "Using default bins for unusual data. Over-interpreting KDE bandwidth. Forgetting common_bins when comparing.",
            "bestPractices": "Use histplot for single distributions. kdeplot for multiple comparisons. displot for faceted distributions.",
            "performanceNotes": "KDE O(n * grid_size) - slow for >100k. Histplot O(n). Downsample for exploratory plots.",
            "interviewPerspective": "Distribution shape, central tendency, skewness, modality. Bin width and bandwidth effects."
          },
          "quiz": [
            {
              "id": "py-sns-d1",
              "question": "What does KDE stand for?",
              "options": [
                "Kernel Density Estimate",
                "Key Data Element",
                "Kurtosis Distribution Estimate",
                "Known Distribution Error"
              ],
              "correctIndex": 0,
              "explanation": "KDE creates smooth curve estimating probability density function.",
              "difficulty": "easy"
            },
            {
              "id": "py-sns-d2",
              "question": "What parameter controls KDE smoothness?",
              "options": [
                "bw_adjust",
                "smoothness",
                "sigma",
                "kernel_width"
              ],
              "correctIndex": 0,
              "explanation": "bw_adjust controls bandwidth. Smaller = more detail, larger = smoother.",
              "difficulty": "medium"
            },
            {
              "id": "py-sns-d3",
              "question": "What does rug parameter add?",
              "options": [
                "Small lines at each data point along axis",
                "Textured background",
                "Error bars",
                "Confidence intervals"
              ],
              "correctIndex": 0,
              "explanation": "Rug plot draws ticks at each data point position.",
              "difficulty": "easy"
            }
          ],
          "faangQuestions": [
            {
              "question": "Feature with bimodal distribution - how to handle?",
              "answer": "Visualize with histplot+KDE. Use GMM to identify components. Options: keep as-is (tree models handle it), create binary feature for mode, understand WHY bimodal.",
              "difficulty": "hard",
              "company": "Google"
            },
            {
              "question": "Compare seaborn displot vs matplotlib hist?",
              "answer": "Seaborn: better defaults, KDE, automatic bins, faceting, rug plots. Matplotlib: faster for large data, more bin control. Use Seaborn for exploration, matplotlib for performance.",
              "difficulty": "medium",
              "company": "Amazon"
            }
          ],
          "codingChallenges": [
            {
              "title": "Multi-group Distribution",
              "description": "Compare petal length distribution across three iris species using histograms with KDE.",
              "difficulty": "easy",
              "starterCode": "import seaborn as sns\ndef plot_iris():\n    df = sns.load_dataset('iris')",
              "solutionHint": "Use sns.histplot with hue='species', kde=True, alpha=0.5."
            }
          ]
        },
        {
          "slug": "relational-plots",
          "title": "Relational Plots (Scatter, Line, Relplot)",
          "order": 2,
          "content": {
            "overview": "Seaborn relational plots visualize relationships between numeric variables. scatterplot (individual points), lineplot (trends), relplot (figure-level with faceting).",
            "problemStatement": "Basic scatter/line plots don't show third variable relationships. Seaborn adds hue, size, style semantics to encode extra dimensions.",
            "intuitionFirst": "scatterplot = x vs y dots. Add hue = color each dot by category. Add size = dot size represents third variable. Facets = multiple panels by categories.",
            "realLifeAnalogy": "Car comparison chart: x=horsepower, y=mpg, color=brand (hue), size=price (size). Multiple=2000vs2020 (col). Each subplot=segment (row).",
            "howItWorks": "scatterplot creates scatter with optional hue/size/style. lineplot aggregates with confidence intervals. relplot wraps both with FacetGrid for row/col faceting.",
            "beginnerExample": "import seaborn as sns\nimport matplotlib.pyplot as plt\n\n# Load dataset\ndf = sns.load_dataset(\"penguins\")\n\n# Scatter with hue\nsns.scatterplot(data=df, x=\"bill_length_mm\", y=\"bill_depth_mm\", hue=\"species\", size=\"body_mass_g\", alpha=0.7)\nplt.title(\"Penguin Bill Dimensions\")\n\n# Relplot with faceting\nsns.relplot(data=df, x=\"bill_length_mm\", y=\"bill_depth_mm\", hue=\"species\", col=\"island\", height=4)\nplt.show()",
            "commonMistakes": "Overplotting with many points (use alpha or kind='scatter' with s=). Not handling missing data. Using hue for continuous colormap with too many categories.",
            "bestPractices": "Use alpha for overlapping points. Use style parameter for additional dimension. Use col/row for faceting. Use kind='line' for temporal data.",
            "performanceNotes": "scatterplot is O(n). For >100k points, use alpha, downsampling, or rasterization. relplot creates separate axes - grid overhead.",
            "interviewPerspective": "Encoding up to 5 dimensions in single plot, faceting alternatives, handling large datasets in scatter plots."
          },
          "quiz": [
            {
              "id": "py-sns-rl-1",
              "question": "What does hue parameter do in scatterplot?",
              "options": [
                "Colors points by third variable",
                "Sets transparency",
                "Changes point shape",
                "Adjusts size"
              ],
              "correctIndex": 0,
              "explanation": "hue maps a third variable to color, adding a dimension to the visualization.",
              "difficulty": "easy"
            },
            {
              "id": "py-sns-rl-2",
              "question": "What is the purpose of col/row parameters in relplot?",
              "options": [
                "Creates faceted subplots for each category",
                "Sets column/row index",
                "Changes layout orientation",
                "Adjusts aspect ratio"
              ],
              "correctIndex": 0,
              "explanation": "col/row create separate subplots for each category value, enabling comparison.",
              "difficulty": "medium"
            },
            {
              "id": "py-sns-rl-3",
              "question": "What does lineplot show by default besides trend line?",
              "options": [
                "Confidence interval shading",
                "Individual data points",
                "Error bars",
                "Box plots"
              ],
              "correctIndex": 0,
              "explanation": "lineplot shows mean trend with shaded 95% confidence interval by default.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Visualize 5 dimensions in a single seaborn plot.",
              "answer": "x, y, hue, size, style = 5 dimensions. sns.scatterplot(data, x, y, hue, size, style). Add col/row faceting up to 7 dimensions. Risk: cognitive overload beyond 4-5.",
              "difficulty": "medium",
              "company": "Google"
            },
            {
              "question": "Create publication-ready correlation scatter matrix for 8 variables.",
              "answer": "Use sns.pairplot(data, vars=selected_cols, hue='target', diag_kind='kde'). For large data, sample or use hexbin. For >15 variables, use correlation heatmap instead.",
              "difficulty": "hard",
              "company": "Amazon"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "categorical-plots",
          "title": "Categorical Plots (Box, Violin, Bar, Count, Boxen)",
          "order": 3,
          "content": {
            "overview": "Seaborn categorical plots visualize distributions or comparisons across categories: boxplot (quartiles), violinplot (density+box), barplot (aggregate), countplot (frequency), boxenplot (extended box).",
            "problemStatement": "Comparing distributions across categories needs more than mean bars. Box/violin show full distribution, outliers, and group differences.",
            "intuitionFirst": "boxplot = five-number summary in compact box. violinplot = sideways KDE mirrored. barplot = group averages with error bars. countplot = frequency bars.",
            "realLifeAnalogy": "Test scores by class: boxplot = min, Q1, median, Q3, max. Violin = shape of score distribution. Bar = average with error range. Count = number of students.",
            "howItWorks": "catplot is figure-level for all categorical plots. boxplot uses IQR for box and whiskers. violinplot combines boxplot with KDE. barplot shows aggregate with error bars.",
            "beginnerExample": "import seaborn as sns\nimport matplotlib.pyplot as plt\n\ndf = sns.load_dataset(\"tips\")\n\n# Box plot\nsns.boxplot(data=df, x=\"day\", y=\"total_bill\", hue=\"sex\")\nplt.title(\"Bill Distribution by Day\")\n\n# Violin plot with split\nsns.violinplot(data=df, x=\"day\", y=\"total_bill\", hue=\"sex\", split=True)\n\n# Bar plot with confidence intervals\nsns.barplot(data=df, x=\"day\", y=\"total_bill\", hue=\"sex\")\n\n# Count plot\nsns.countplot(data=df, x=\"day\")\nplt.show()",
            "commonMistakes": "Using barplot when boxplot shows more information. Violin plot with small sample size. Not setting order for categorical axes. Hue with too many colors.",
            "bestPractices": "Use violinplot for distribution shape. Use boxplot for outlier detection. Use boxenplot for large datasets. Use catplot for faceted categorical plots.",
            "performanceNotes": "boxplot O(n log n). violinplot O(n * grid). For >100k points, use boxplot. catplot figure-level overhead.",
            "interviewPerspective": "Choosing right categorical plot for data size and question. Boxplot vs violin tradeoffs. Barplot vs pointplot."
          },
          "quiz": [
            {
              "id": "py-sns-cp-1",
              "question": "What does a boxplot whisker extend to?",
              "options": [
                "1.5 * IQR beyond Q1/Q3",
                "Min and max values",
                "2 standard deviations",
                "95th percentile"
              ],
              "correctIndex": 0,
              "explanation": "Whiskers extend to furthest point within 1.5*IQR from Q1/Q3. Beyond are outliers.",
              "difficulty": "easy"
            },
            {
              "id": "py-sns-cp-2",
              "question": "What additional information does violinplot show over boxplot?",
              "options": [
                "Full probability density shape",
                "Exact values",
                "Correlation",
                "Time series trend"
              ],
              "correctIndex": 0,
              "explanation": "Violinplot shows the full KDE distribution shape, revealing multimodality boxplot hides.",
              "difficulty": "medium"
            },
            {
              "id": "py-sns-cp-3",
              "question": "What does countplot show?",
              "options": [
                "Frequency of each category",
                "Sum of values per category",
                "Percentage of each category",
                "Mean per category"
              ],
              "correctIndex": 0,
              "explanation": "countplot simply counts occurrences of each category value.",
              "difficulty": "easy"
            }
          ],
          "faangQuestions": [
            {
              "question": "Compare two groups' distributions - which plot and why?",
              "answer": "Use violinplot with split=True for direct visual comparison of shapes. Add boxplot inside for quartiles. Use swarmplot for small N. For A/B test results: use barplot with confidence intervals or boxenplot.",
              "difficulty": "medium",
              "company": "Google"
            },
            {
              "question": "A/B test results with 10M users per variant - best visualization approach?",
              "answer": "Use boxenplot (efficient for large data) or violinplot with sampling. For conversion rates: barplot with exact confidence intervals. Consider downsampling to 10k for violinplot.",
              "difficulty": "hard",
              "company": "Amazon"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "matrix-plots",
          "title": "Matrix & Heatmap Plots",
          "order": 4,
          "content": {
            "overview": "Seaborn heatmap visualizes matrix data as color-coded grid. clustermap adds hierarchical clustering dendrograms. Ideal for correlation matrices and confusion matrices.",
            "problemStatement": "Raw numeric matrices (correlation, confusion, distance) are hard to read. Heatmaps encode values as color for pattern recognition.",
            "intuitionFirst": "Heatmap = spreadsheet where cells are colored by value. Red = high, blue = low. Pattern emerges instantly - dark diagonal = strong correlation.",
            "realLifeAnalogy": "Weather map: colors show temperature gradients. Hot regions red, cold blue. Same principle for any matrix data.",
            "howItWorks": "sns.heatmap(matrix, annot=True, cmap='coolwarm'). annot displays values. mask hides upper triangle. fmt controls annotation format. clustermap reorders rows/cols by similarity.",
            "beginnerExample": "import seaborn as sns\nimport matplotlib.pyplot as plt\nimport numpy as np\n\n# Correlation matrix\ncorr = np.corrcoef(np.random.randn(100, 5).T)\n\nsns.heatmap(corr, annot=True, cmap='coolwarm', center=0,\n            square=True, xticklabels=[f\"F{i}\" for i in range(5)],\n            yticklabels=[f\"F{i}\" for i in range(5)])\nplt.title(\"Feature Correlation Matrix\")\nplt.show()\n\n# Clustermap\nsns.clustermap(corr, annot=True, cmap='coolwarm', center=0, figsize=(8, 8))",
            "commonMistakes": "Not setting center=0 for diverging data. Using too many colors. Hiding annotation values. Not masking upper triangle of correlation matrix.",
            "bestPractices": "Use center=0 for diverging colormaps. Use square=True for balanced cells. Use mask for triangular matrices. Use annot=True for small matrices. Use fmt='.2f' for precision.",
            "performanceNotes": "heatmap O(n*m). clustermap adds O(n^3) clustering - slow for >100 rows. For large matrices, use heatmap without clustering.",
            "interviewPerspective": "Heatmap for EDA, correlation display, confusion matrix visualization. Clustering interpretation."
          },
          "quiz": [
            {
              "id": "py-sns-mp-1",
              "question": "What does center=0 in heatmap do?",
              "options": [
                "Centers colormap at 0 (white), diverges to both sides",
                "Centers text annotations",
                "Aligns plot to center",
                "Creates centered labels"
              ],
              "correctIndex": 0,
              "explanation": "center=0 ensures 0 maps to middle of colormap, positive one color, negative another.",
              "difficulty": "easy"
            },
            {
              "id": "py-sns-mp-2",
              "question": "What does clustermap add beyond heatmap?",
              "options": [
                "Hierarchical clustering dendrograms reordering rows/cols",
                "3D visualization",
                "Animation",
                "Trend lines"
              ],
              "correctIndex": 0,
              "explanation": "clustermap adds dendrograms that reorder rows/columns by similarity.",
              "difficulty": "medium"
            },
            {
              "id": "py-sns-mp-3",
              "question": "What is mask parameter used for in heatmap?",
              "options": [
                "Hides specified cells (e.g., upper triangle)",
                "Covers outliers",
                "Blurs values",
                "Adds pattern overlay"
              ],
              "correctIndex": 0,
              "explanation": "mask=True hides cells where mask is True, commonly used for triangular matrices.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Visualize confusion matrix for 20-class classifier.",
              "answer": "sns.heatmap(cm, annot=True, fmt='d', cmap='Blues'). For 20 classes, normalize to show percentages, increase figure size. Add annotations only for values above threshold to avoid clutter.",
              "difficulty": "medium",
              "company": "Google"
            },
            {
              "question": "Create publication-ready correlation matrix for 50 features.",
              "answer": "Use mask for upper triangle. Cluster only if features have natural grouping. Use smaller font. For >50 features, use pairplot sampling or dimensionality reduction first.",
              "difficulty": "hard",
              "company": "Amazon"
            }
          ],
          "codingChallenges": [
            {
              "title": "Correlation Heatmap Dashboard",
              "description": "Generate correlation heatmap for iris dataset with masking upper triangle and cluster analysis.",
              "difficulty": "easy",
              "starterCode": "import seaborn as sns\ndef corr_heatmap():\n    df = sns.load_dataset('iris')",
              "solutionHint": "Compute df.corr(), use sns.heatmap with mask=np.triu(np.ones_like(corr)), cmap='coolwarm', center=0."
            }
          ]
        },
        {
          "slug": "regression-plots",
          "title": "Regression & Model Plots",
          "order": 5,
          "content": {
            "overview": "Seaborn regression plots visualize relationships with fitted models: regplot (scatter+regression), lmplot (regplot+facet), residplot (residuals).",
            "problemStatement": "Raw scatter shows relationship but not strength/equation. Regression lines add model fit, confidence intervals, and residual analysis.",
            "intuitionFirst": "regplot = scatter + best-fit line with shaded confidence band. Line shows direction (positive/negative), slope (strength), band shows uncertainty.",
            "realLifeAnalogy": "Height vs weight scatter: line shows average weight for each height. Band shows where 95% of people fall. Steeper line = stronger height-weight relationship.",
            "howItWorks": "regplot fits OLS regression, plots data points, regression line, and 95% CI (bootstrap or theoretical). lmplot wraps regplot with FacetGrid. residplot plots residuals vs fitted.",
            "beginnerExample": "import seaborn as sns\nimport matplotlib.pyplot as plt\n\n# Tips dataset\ndf = sns.load_dataset(\"tips\")\n\n# Basic regression\nsns.regplot(data=df, x=\"total_bill\", y=\"tip\", ci=95)\nplt.title(\"Tip vs Total Bill\")\nplt.show()\n\n# Faceted regression\nsns.lmplot(data=df, x=\"total_bill\", y=\"tip\", hue=\"sex\", col=\"time\", ci=95)\nplt.show()\n\n# Residual plot\nsns.residplot(data=df, x=\"total_bill\", y=\"tip\")\nplt.title(\"Residuals Plot\")\nplt.show()\n\n# Logistic regression\nsns.regplot(data=df, x=\"total_bill\", y=\"tip\", logistic=True, ci=None)",
            "commonMistakes": "Forcing linear fit on nonlinear data. Ignoring heteroscedasticity in residuals. Misinterpreting confidence vs prediction intervals. Extrapolation beyond data range.",
            "bestPractices": "Always check residual plot for linearity assumption. Use order=2+ for polynomial fits. Use lowess for nonparametric smoothing. Use logistic=True for binary outcomes.",
            "performanceNotes": "regplot O(n) for linear, O(n * p) for polynomial. Bootstrap CI (default) is O(n * n_boot). For large N, use ci=None for speed.",
            "interviewPerspective": "Regression diagnostics, linear model assumptions, polynomial regression visualization, logistic regression plotting."
          },
          "quiz": [
            {
              "id": "py-sns-rp-1",
              "question": "What does the shaded band in regplot represent?",
              "options": [
                "95% confidence interval of regression line",
                "Standard deviation of data",
                "Range of data",
                "Prediction interval"
              ],
              "correctIndex": 0,
              "explanation": "The shaded band is the 95% confidence interval for the regression line estimate.",
              "difficulty": "medium"
            },
            {
              "id": "py-sns-rp-2",
              "question": "What parameter fits polynomial regression in regplot?",
              "options": [
                "order",
                "poly",
                "degree",
                "power"
              ],
              "correctIndex": 0,
              "explanation": "order=2 fits quadratic, order=3 cubic, etc.",
              "difficulty": "medium"
            },
            {
              "id": "py-sns-rp-3",
              "question": "What is residplot used for?",
              "options": [
                "Checking regression assumptions via residual analysis",
                "Plotting residential data",
                "Residual resampling",
                "Residual network"
              ],
              "correctIndex": 0,
              "explanation": "residplot shows residuals vs fitted values to check homoscedasticity and linearity.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Diagnose linear regression assumptions using seaborn.",
              "answer": "Use residplot for homoscedasticity. Use regplot with lowess for linearity. Use distplot/histplot of residuals for normality. Q-Q plot for normality check.",
              "difficulty": "hard",
              "company": "Google"
            },
            {
              "question": "Compare linear and polynomial fit for non-linear data visually.",
              "answer": "Use regplot with ci=None for speed. Overlay multiple fits: linear (default), quadratic (order=2), cubic (order=3). Add legend distinguishing each. Use lowess as nonparametric reference.",
              "difficulty": "medium",
              "company": "Amazon"
            }
          ],
          "codingChallenges": []
        }
      ]
    },
    {
      "slug": "backend",
      "title": "Backend Development",
      "description": "Python web frameworks - FastAPI and Django for building backend services and APIs",
      "order": 7,
      "subtopics": [
        {
          "slug": "fastapi",
          "title": "FastAPI",
          "order": 1,
          "content": {
            "overview": "FastAPI is a modern async Python web framework with automatic OpenAPI/Swagger docs, type-based validation via Pydantic, and async support.",
            "problemStatement": "Flask requires manual validation, serialization, and docs. FastAPI auto-generates API docs from type hints and validates requests via Pydantic schemas.",
            "intuitionFirst": "FastAPI = type hints become API docs. Define schemas as Python classes with types, get automatic request validation and OpenAPI specs.",
            "realLifeAnalogy": "Building a hotel: Flask = manual construction with individual permits. FastAPI = prefabricated modules with automatic permits, blueprints, and inspection ready.",
            "howItWorks": "FastAPI uses Starlette for async ASGI, Pydantic for validation, and data classes for OpenAPI generation. Type hints define request/response models automatically.",
            "beginnerExample": "from fastapi import FastAPI\nfrom pydantic import BaseModel\n\napp = FastAPI(title=\"My API\")\n\nclass Item(BaseModel):\n    name: str\n    price: float\n    in_stock: bool = True\n\n@app.get(\"/\")\ndef root():\n    return {\"message\": \"Hello World\"}\n\n@app.get(\"/items/{item_id}\")\ndef read_item(item_id: int, q: str = None):\n    return {\"item_id\": item_id, \"q\": q}\n\n@app.post(\"/items\")\ndef create_item(item: Item):\n    return {\"item\": item, \"message\": \"Created\"}",
            "comparisonTable": "| Feature | FastAPI | Django |\n|---------|---------|--------|\n| Paradigm | ASGI async | WSGI sync (ASGI in v3) |\n| Speed | Very fast (Starlette) | Moderate |\n| ORM | SQLAlchemy/Tortoise | Django ORM (built-in) |\n| Admin panel | Third-party | Built-in admin |\n| API docs | Auto (Swagger/ReDoc) | DRF with manual config |\n| Validation | Pydantic (auto) | Serializers (manual) |\n| Learning curve | Low | Moderate |\n| Best for | APIs, microservices | Full-stack, monolithic |",
            "commonMistakes": "Not using async endpoints for I/O. Missing Pydantic validation (relying on raw dicts). Not setting CORS middleware. Blocking the event loop with sync calls.",
            "bestPractices": "Use async endpoints for DB/HTTP calls. Define Pydantic schemas for all I/O. Use dependency injection for shared logic. Enable CORS for frontend access. Use BackgroundTasks for side-effects.",
            "performanceNotes": "FastAPI rivals Node.js/Go in throughput. Async endpoints handle 10k+ concurrent connections. Use uvicorn with multiple workers. Pydantic validation overhead is minimal (< 1ms).",
            "interviewPerspective": "FastAPI vs Flask vs Django comparison, ASGI vs WSGI, dependency injection pattern, Pydantic model design, async endpoint patterns."
          },
          "quiz": [
            {
              "id": "py-be-fa-1",
              "question": "What does FastAPI use for request validation?",
              "options": [
                "Pydantic models with type hints",
                "Marshmallow schemas",
                "Manual validation",
                "XML schemas"
              ],
              "correctIndex": 0,
              "explanation": "FastAPI uses Pydantic models defined with Python type hints for automatic validation.",
              "difficulty": "easy"
            },
            {
              "id": "py-be-fa-2",
              "question": "What is the underlying ASGI framework FastAPI builds upon?",
              "options": [
                "Starlette",
                "Flask",
                "Django",
                "Tornado"
              ],
              "correctIndex": 0,
              "explanation": "FastAPI is built on top of Starlette for ASGI web capabilities.",
              "difficulty": "medium"
            },
            {
              "id": "py-be-fa-3",
              "question": "How does FastAPI generate OpenAPI documentation?",
              "options": [
                "Automatically from type hints and Pydantic models",
                "Manually written YAML files",
                "From docstrings",
                "Requires external tool"
              ],
              "correctIndex": 0,
              "explanation": "FastAPI auto-generates OpenAPI spec and Swagger UI from route decorators, type hints, and Pydantic models.",
              "difficulty": "easy"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design a high-throughput API endpoint processing 1000 requests/sec with FastAPI.",
              "answer": "Use async def with database connection pool. Use Redis caching. Pydantic for validation. BackgroundTasks for logging. Uvicorn with multiple workers. Database query optimization with indexes.",
              "difficulty": "hard",
              "company": "Google"
            },
            {
              "question": "Compare FastAPI dependency injection vs Flask blueprints for large applications.",
              "answer": "FastAPI dependencies: function-based, reusable, support async, with yield for cleanup. Flask blueprints: module-based, no built-in DI. FastAPI scales better for large teams with clear separation of concerns.",
              "difficulty": "medium",
              "company": "Amazon"
            }
          ],
          "codingChallenges": [
            {
              "title": "FastAPI CRUD API",
              "description": "Create a FastAPI app with GET, POST, PUT, DELETE for a 'Book' resource with title, author, year fields using in-memory storage.",
              "difficulty": "medium",
              "starterCode": "from fastapi import FastAPI\nfrom pydantic import BaseModel\napp = FastAPI()\n\nclass Book(BaseModel):\n    title: str\n    author: str\n    year: int",
              "solutionHint": "Store books in dict[int, Book]. Use Path/Query for params. Return 404 for missing books. Add proper HTTP status codes."
            }
          ]
        },
        {
          "slug": "django",
          "title": "Django",
          "order": 2,
          "content": {
            "overview": "Django is a high-level full-stack Python web framework with batteries included: ORM, admin interface, authentication, routing, templates, and migrations.",
            "problemStatement": "Building web apps from scratch requires many decisions and boilerplate. Django provides a structured, opinionated framework for rapid development.",
            "intuitionFirst": "Django = IKEA furniture kit for web apps. Everything included: instructions (docs), tools (manage.py), and pieces ready to assemble.",
            "realLifeAnalogy": "Restaurant chain: Django provides standard kitchen layout (project structure), recipes (apps), inventory system (ORM), staff management (auth), and menu templates.",
            "howItWorks": "Django follows MVT (Model-View-Template). Models define DB schema via ORM. Views handle HTTP logic. Templates render HTML. URL dispatcher routes requests. DRF (Django REST Framework) for APIs.",
            "beginnerExample": "# models.py\nfrom django.db import models\n\nclass BlogPost(models.Model):\n    title = models.CharField(max_length=200)\n    content = models.TextField()\n    created_at = models.DateTimeField(auto_now_add=True)\n    \n    def __str__(self):\n        return self.title\n\n# views.py\nfrom django.shortcuts import render\nfrom .models import BlogPost\n\ndef blog_list(request):\n    posts = BlogPost.objects.all().order_by('-created_at')\n    return render(request, 'blog/list.html', {'posts': posts})\n\n# urls.py\nfrom django.urls import path\nfrom . import views\n\nurlpatterns = [\n    path('', views.blog_list, name='blog_list'),\n]",
            "commonMistakes": "N+1 queries from ORM (use select_related/prefetch_related). Not using migrations after model changes. Putting business logic in views instead of models/services. Overusing signals.",
            "bestPractices": "Use Django REST Framework for APIs. Use class-based views for reusable logic. Use select_related for FK, prefetch_related for M2M. Keep business logic in models/services. Write tests for models and views.",
            "performanceNotes": "Django WSGI handles ~1000 req/s per process (single-threaded). Use gunicorn/celery for async tasks. Django ORM overhead ~2-5ms per query. Use Redis caching. Database indexing critical.",
            "interviewPerspective": "Django ORM query optimization, MVT architecture, DRF vs FastAPI comparison, middleware processing, signals usage, migration system."
          },
          "quiz": [
            {
              "id": "py-be-dj-1",
              "question": "What is Django's built-in ORM used for?",
              "options": [
                "Database abstraction interacting with Python objects",
                "Generating HTML templates",
                "Routing URLs",
                "Managing static files"
              ],
              "correctIndex": 0,
              "explanation": "Django ORM lets you interact with databases using Python objects instead of SQL.",
              "difficulty": "easy"
            },
            {
              "id": "py-be-dj-2",
              "question": "What is the purpose of Django migrations?",
              "options": [
                "Track and apply database schema changes",
                "Migrate data between environments",
                "Move files between servers",
                "Update Python version"
              ],
              "correctIndex": 0,
              "explanation": "Migrations track model changes and apply corresponding database schema changes.",
              "difficulty": "medium"
            },
            {
              "id": "py-be-dj-3",
              "question": "What pattern does Django follow?",
              "options": [
                "Model-View-Template (MVT)",
                "Model-View-Controller (MVC)",
                "Observer pattern",
                "Singleton pattern"
              ],
              "correctIndex": 0,
              "explanation": "Django follows MVT: Model (data), View (logic), Template (presentation).",
              "difficulty": "easy"
            }
          ],
          "faangQuestions": [
            {
              "question": "Design a scalable Django architecture serving 1M daily active users.",
              "answer": "Use gunicorn with nginx reverse proxy. Database read replicas + write master. Redis caching for frequent queries. Celery for async tasks. CDN for static/media files. Django silk for profiling.",
              "difficulty": "hard",
              "company": "Google"
            },
            {
              "question": "Optimize Django ORM queries causing N+1 problem on listing page.",
              "answer": "Use select_related for FK/O2O relations and prefetch_related for M2M/reverse relations. Use .only() to limit columns. Use values()/values_list() for read-only data. Add database indexes on filter/sort columns.",
              "difficulty": "medium",
              "company": "Amazon"
            }
          ],
          "codingChallenges": []
        }
      ]
    },
    {
      "slug": "data-structures",
      "title": "Data Structures",
      "description": "Python built-in data structures - List, Tuple, Set, Dictionary with comparisons",
      "order": 8,
      "subtopics": [
        {
          "slug": "list",
          "title": "List",
          "order": 1,
          "content": {
            "overview": "Python lists are ordered, mutable, heterogeneous sequences. Implemented as dynamic arrays with amortized O(1) append.",
            "problemStatement": "Choosing between list, tuple, set, dict depends on order, mutability, uniqueness needs. Lists are default for ordered sequences.",
            "intuitionFirst": "A list like a shopping list on whiteboard - ordered, add/remove items, items can be anything, duplicates allowed.",
            "realLifeAnalogy": "Playlist of songs. Order matters, add/remove songs, have same song twice. Access by position (track number).",
            "howItWorks": "Dynamic array in contiguous memory (PyObject* pointers). Overallocates (~1.125x) on resize. Index O(1), insert/remove at beginning O(n).",
            "beginnerExample": "# Creating lists\nfruits = [\"apple\", \"banana\", \"cherry\"]\nfruits.append(\"date\")\nfruits.insert(1, \"blueberry\")\npopped = fruits.pop()\n\n# List comprehension\nsquares = [x**2 for x in range(10)]\nevens = [x for x in range(20) if x % 2 == 0]\n\n# Sorting\nfruits.sort()",
            "commonMistakes": "Using == on floats. Modifying list while iterating. Using + in loop (O(n^2) - use extend()).",
            "bestPractices": "Use list comprehensions instead of for+append. Use extend() for multiple elements. Use deque for O(1) pops from both ends.",
            "performanceNotes": "Append: amortized O(1). Insert at beginning: O(n). Index: O(1). Contains (in): O(n). Sort: O(n log n) Timsort.",
            "interviewPerspective": "Time complexities, list comprehension internals, slicing, shallow vs deep copy. Common: flatten, two-sum, sliding window."
          },
          "quiz": [
            {
              "id": "py-ds-l-1",
              "question": "Time complexity of list.append()?",
              "options": [
                "Amortized O(1)",
                "O(n)",
                "O(log n)",
                "O(n^2)"
              ],
              "correctIndex": 0,
              "explanation": "list.append() is amortized O(1). Most appends O(1), occasional resize O(n), averaged O(1).",
              "difficulty": "easy"
            },
            {
              "id": "py-ds-l-2",
              "question": "What does fruits[10:20] return if list has 15 elements?",
              "options": [
                "Elements from 10 to end (10-14)",
                "Error: index out of range",
                "Empty list",
                "None"
              ],
              "correctIndex": 0,
              "explanation": "Python slicing is forgiving - end beyond length returns elements up to end.",
              "difficulty": "medium"
            },
            {
              "id": "py-ds-l-3",
              "question": "Difference between copy() and deepcopy()?",
              "options": [
                "copy() is shallow; deepcopy() recursively copies nested objects",
                "copy() deep; deepcopy() shallow",
                "Identical",
                "deepcopy() only for numbers"
              ],
              "correctIndex": 0,
              "explanation": "list.copy() (or [:]) makes shallow copy. deepcopy() recursively clones everything.",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Flatten nested list of arbitrary depth: [1, [2, [3,4]], 5] -> [1,2,3,4,5]",
              "answer": "def flatten(nested): result=[]; for item in nested: if isinstance(item,list): result.extend(flatten(item)); else: result.append(item); return result. Iterative with stack avoids recursion limit.",
              "difficulty": "medium",
              "company": "Google"
            },
            {
              "question": "Two-sum: find all pairs summing to target.",
              "answer": "def two_sum(nums, target): seen={}; for i,num in enumerate(nums): comp=target-num; if comp in seen: return [seen[comp],i]; seen[num]=i. O(n) time, O(n) space.",
              "difficulty": "medium",
              "company": "Amazon"
            }
          ],
          "codingChallenges": [
            {
              "title": "Flatten Nested List",
              "description": "Write function flattening a nested list of integers to single flat list.",
              "difficulty": "medium",
              "starterCode": "def flatten(nested: list) -> list:\n    pass",
              "solutionHint": "Recursive: iterate, if item is list recurse, else append. Iterative: use stack."
            }
          ]
        },
        {
          "slug": "tuple",
          "title": "Tuple",
          "order": 2,
          "content": {
            "overview": "Tuples are ordered, immutable, heterogeneous sequences. Hashable if all elements hashable - usable as dict keys.",
            "problemStatement": "Lists for homogeneous sequences that change, tuples for heterogeneous fixed-structure data. Tuples memory-efficient and hashable.",
            "intuitionFirst": "Tuple = sealed envelope with items inside - you can look but can't change. Fixed contract.",
            "realLifeAnalogy": "Coordinates (latitude, longitude) - fixed pair. Read both values, don't change latitude without creating new coordinate.",
            "howItWorks": "Stored similarly to lists in contiguous memory, but flagged immutable. Single-element tuples optimized (singletons).",
            "beginnerExample": "# Creating tuples\ncoords = (40.7128, -74.0060)\nlat, lon = coords  # unpacking\n\n# Named tuple\nfrom collections import namedtuple\nPoint = namedtuple(\"Point\", [\"x\", \"y\"])\np = Point(10, 20)\nprint(p.x, p.y)",
            "commonMistakes": "Forgetting trailing comma for single element. Trying to modify (TypeError). Nested mutable objects still mutable.",
            "bestPractices": "Use tuples for fixed data records. Use namedtuple for self-documenting records. Tuple unpacking for multiple returns.",
            "performanceNotes": "Tuple creation slightly faster than list. Less memory (no overallocation). Can be cached by Python.",
            "interviewPerspective": "Immutability, hashability. When tuples preferred. Why dict keys must be hashable."
          },
          "quiz": [
            {
              "id": "py-ds-t-1",
              "question": "Single-element tuple syntax?",
              "options": [
                "(x,)",
                "(x)",
                "[x]",
                "{x}"
              ],
              "correctIndex": 0,
              "explanation": "Single-element tuple requires trailing comma: (x,). Without comma it's just x in parens.",
              "difficulty": "easy"
            },
            {
              "id": "py-ds-t-2",
              "question": "Can tuple be used as dict key?",
              "options": [
                "Yes if all elements hashable",
                "No, never hashable",
                "Only if contains strings",
                "Yes, always"
              ],
              "correctIndex": 0,
              "explanation": "Tuples hashable if all elements hashable. Lists unhashable.",
              "difficulty": "medium"
            },
            {
              "id": "py-ds-t-3",
              "question": "Main difference between list and tuple?",
              "options": [
                "List mutable, tuple immutable",
                "List ordered, tuple unordered",
                "List allows duplicates, tuple doesnt",
                "List is faster"
              ],
              "correctIndex": 0,
              "explanation": "Primary: list mutable (add/remove/change), tuple immutable (fixed after creation).",
              "difficulty": "easy"
            }
          ],
          "faangQuestions": [
            {
              "question": "Why are tuples hashable but lists not? Effect on dict keys?",
              "answer": "Hash requires immutable value. Lists mutable -> hash would change, breaking dict invariants. Tuples immutable (if elements hashable) -> stable hash. Use cases: composite keys, lru_cache.",
              "difficulty": "hard",
              "company": "Google"
            },
            {
              "question": "Compare namedtuple vs dataclass vs plain tuple?",
              "answer": "Plain tuple: fast, no field names. namedtuple: named fields, hashable, memory-efficient. dataclass: flexible, mutable by default, methods, type hints. Use tuple for simple returns, namedtuple for immutable records, dataclass for complex data.",
              "difficulty": "medium",
              "company": "Amazon"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "set",
          "title": "Set",
          "order": 3,
          "content": {
            "overview": "Sets are unordered collections of unique, hashable elements. O(1) membership, union, intersection, difference operations.",
            "problemStatement": "Finding unique elements, membership testing (lists O(n)). Sets provide O(1) with hash tables.",
            "intuitionFirst": "Bag of unique items where order doesn't matter. Quickly check if item in bag, combine bags, find common items.",
            "realLifeAnalogy": "VIP guest list at venue. Quickly check if someone on list (O(1)). No duplicates. No particular order.",
            "howItWorks": "Hash tables with open addressing and quadratic probing. Element hashed -> bucket based on hash % table_size.",
            "beginnerExample": "# Creating sets\nfruits = {\"apple\", \"banana\", \"cherry\"}\nfruits.add(\"date\")\nfruits.remove(\"banana\")\n\n# Set operations\na = {1, 2, 3, 4}\nb = {3, 4, 5, 6}\nprint(a | b)  # union\nprint(a & b)  # intersection\nprint(a - b)  # difference\n\n# Frozen set\nfrozen = frozenset([1, 2, 3])",
            "commonMistakes": "Using {} for empty set (makes dict). Assuming order preservation. Adding unhashable types.",
            "bestPractices": "Use sets for uniqueness and fast membership. Use frozenset as dict keys. Set comprehension for concise creation.",
            "performanceNotes": "Membership: O(1) average, O(n) worst. Union/intersection: O(len(smaller)). Memory: ~6-8x overhead vs list.",
            "interviewPerspective": "Hash-based data structures. Time complexities, set vs frozenset, collision handling."
          },
          "quiz": [
            {
              "id": "py-ds-s-1",
              "question": "What does a | b do for sets?",
              "options": [
                "Union: elements in either set",
                "Intersection: elements in both",
                "Difference: in a not b",
                "Symmetric diff: either but not both"
              ],
              "correctIndex": 0,
              "explanation": "| is union operator, returns elements in either set.",
              "difficulty": "easy"
            },
            {
              "id": "py-ds-s-2",
              "question": "Can set contain another set?",
              "options": [
                "No - sets unhashable",
                "Yes, any type",
                "Only if frozenset",
                "Yes with special flag"
              ],
              "correctIndex": 2,
              "explanation": "Regular sets mutable and unhashable. Use frozenset as set elements.",
              "difficulty": "medium"
            },
            {
              "id": "py-ds-s-3",
              "question": "Time complexity of x in s for a set?",
              "options": [
                "O(1) average",
                "O(n)",
                "O(log n)",
                "O(n^2)"
              ],
              "correctIndex": 0,
              "explanation": "Sets use hash tables for O(1) average membership testing.",
              "difficulty": "easy"
            }
          ],
          "faangQuestions": [
            {
              "question": "Find common elements between two lists without set intersection?",
              "answer": "Convert smaller to set for O(1) lookup, iterate larger: set_b = set(b); return [x for x in a if x in set_b]. O(n+m) time.",
              "difficulty": "medium",
              "company": "Google"
            },
            {
              "question": "How does Python set handle hash collisions? Worst-case performance?",
              "answer": "Open addressing with quadratic probing. When load factor > 2/3, resize. Worst case: all collide -> O(n). Python uses randomized hash seed (PYTHONHASHSEED) to prevent DoS.",
              "difficulty": "hard",
              "company": "Amazon"
            }
          ],
          "codingChallenges": []
        },
        {
          "slug": "dictionary",
          "title": "Dictionary",
          "order": 4,
          "content": {
            "overview": "Dictionaries are collections of key-value pairs with O(1) average lookup. Python 3.7+ maintains insertion order.",
            "problemStatement": "Fast key->value lookup required. Lists O(n) search. Dicts provide O(1) via hash tables.",
            "intuitionFirst": "Like real dictionary: lookup word (key) get definition (value). Fast because organized alphabetically (hash table).",
            "realLifeAnalogy": "Library catalog: book title (key) -> shelf location (value). Fast lookup. Can't have two books with same title.",
            "howItWorks": "Hash tables with key-value pairs. __hash__() determines bucket. Open addressing with quadratic probing. Python 3.7+ maintains insertion order with compact array.",
            "beginnerExample": "# Creating dicts\nperson = {\"name\": \"Alice\", \"age\": 30}\nprint(person[\"name\"])\nprint(person.get(\"salary\", 0))\n\n# Modify\nperson[\"email\"] = \"alice@example.com\"\n\n# Iteration\nfor key, value in person.items():\n    print(f\"{key}: {value}\")\n\n# Dict comprehension\nsquares = {x: x**2 for x in range(5)}\n\n# Merge (3.9+)\nmerged = dict1 | dict2\n\n# Default dict\nfrom collections import defaultdict\ncounts = defaultdict(int)\ncounts[\"apple\"] += 1",
            "comparisonTable": "| Property | List | Tuple | Set | Dict |\n|----------|------|-------|-----|------|\n| Ordered | Yes | Yes | No (3.7+ insertion) | Yes (3.7+) |\n| Mutable | Yes | No | Yes | Yes |\n| Duplicates | Yes | Yes | No | Keys: No, Values: Yes |\n| Indexed by | Position | Position | N/A | Key (hashable) |\n| Lookup speed | O(n) | O(n) | O(1) avg | O(1) avg |\n| Memory | Moderate | Low | High | High |\n| Hashable | No | If elements | No | No |\n| Use case | Sequences | Fixed records | Uniqueness | Key-value |\n| Empty creation | [] | () | set() | {} |",
            "commonMistakes": "Accessing missing key without .get(). Using mutable default. Assuming iteration order pre-3.7. Mutable objects as keys.",
            "bestPractices": "Use .get() with default. Use defaultdict for counting. Use Counter for hashable counts. Use dict comprehension.",
            "performanceNotes": "Lookup/insert/delete: O(1) average, O(n) worst. Items/keys/values views: O(1) and dynamic. Memory: ~50% overhead.",
            "interviewPerspective": "Hash table implementation, dict vs defaultdict vs Counter vs OrderedDict. Two-sum, group anagrams, LRU cache."
          },
          "quiz": [
            {
              "id": "py-ds-d-1",
              "question": "What happens accessing missing key without .get()?",
              "options": [
                "KeyError raised",
                "None returned",
                "Empty string",
                "Key added automatically"
              ],
              "correctIndex": 0,
              "explanation": "Accessing missing key (d[\"missing\"]) raises KeyError. Use .get() for safe access.",
              "difficulty": "easy"
            },
            {
              "id": "py-ds-d-2",
              "question": "Does Python 3.7+ maintain dict insertion order?",
              "options": [
                "Yes",
                "No",
                "Only with OrderedDict",
                "Only for string keys"
              ],
              "correctIndex": 0,
              "explanation": "Python 3.7+ maintains insertion order as language guarantee.",
              "difficulty": "medium"
            },
            {
              "id": "py-ds-d-3",
              "question": "What does collections.Counter do?",
              "options": [
                "Counts hashable objects",
                "Creates counter variable",
                "Counts loop iterations",
                "Timer utility"
              ],
              "correctIndex": 0,
              "explanation": "Counter is dict subclass for counting hashable objects (e.g., character frequency).",
              "difficulty": "medium"
            }
          ],
          "faangQuestions": [
            {
              "question": "Implement an LRU Cache using Python dict and doubly linked list.",
              "answer": "Use OrderedDict: from collections import OrderedDict. On get: move_to_end(key). On put: if key exists, update; elif full, popitem(last=False); else add. O(1) operations.",
              "difficulty": "hard",
              "company": "Google"
            },
            {
              "question": "Group anagrams from a list of strings.",
              "answer": "def group_anagrams(strs): from collections import defaultdict; groups=defaultdict(list); for s in strs: key=tuple(sorted(s)); groups[key].append(s); return list(groups.values()). O(n * k log k) where k is max string length.",
              "difficulty": "medium",
              "company": "Amazon"
            }
          ],
          "codingChallenges": []
        }
      ]
    }
  ]
};
