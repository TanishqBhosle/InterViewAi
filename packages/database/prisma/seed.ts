import { PrismaClient } from "@prisma/client";
import { seedLearningHub } from "./seed/index";

const prisma = new PrismaClient();

const patterns = [
  { slug: "arrays", name: "Arrays", description: "Master array manipulation, traversal, and operations. Foundation for all DSA.", phase: "FOUNDATIONS" as const, order: 1, icon: "LayoutGrid", color: "#3b82f6", recognitionSignals: JSON.stringify(["contiguous memory", "indexed access", "iteration needed", "subarray"]), whenToUse: "When you need O(1) access by index, contiguous memory, or iteration over elements", whenNotToUse: "When you need frequent insertions/deletions in the middle", realLifeAnalogy: "Like a row of mailboxes - each has a number and you can access any directly", commonMistakes: JSON.stringify(["Off-by-one errors", "Not handling empty arrays", "Modifying array while iterating"]) },
  { slug: "strings", name: "Strings", description: "String manipulation, pattern matching, and character operations.", phase: "FOUNDATIONS" as const, order: 2, icon: "Type", color: "#8b5cf6", recognitionSignals: JSON.stringify(["character manipulation", "palindrome", "anagram", "substring"]), whenToUse: "When working with text, characters, or string patterns", whenNotToUse: "When you need numeric operations on characters without conversion", realLifeAnalogy: "Like a sentence made of letter blocks you can rearrange", commonMistakes: JSON.stringify(["Forgetting string immutability", "Case sensitivity", "Unicode handling"]) },
  { slug: "hashing", name: "Hashing", description: "Hash maps, hash sets, and frequency counting for O(1) lookups.", phase: "LINEAR_PATTERNS" as const, order: 3, icon: "Hash", color: "#f59e0b", recognitionSignals: JSON.stringify(["frequency", "count", "lookup", "duplicate", "two sum"]), whenToUse: "When you need O(1) average lookup, frequency counting, or grouping", whenNotToUse: "When memory is very limited or you need ordered data", realLifeAnalogy: "Like a phone book - look up name, get number instantly", commonMistakes: JSON.stringify(["Hash collision handling", "Not handling null keys", "Using wrong hash function"]) },
  { slug: "two-pointers", name: "Two Pointers", description: "Use two pointers to traverse arrays efficiently from different positions.", phase: "LINEAR_PATTERNS" as const, order: 4, icon: "MoveHorizontal", color: "#14b8a6", recognitionSignals: JSON.stringify(["sorted array", "pair", "opposite ends", "merge", "compare"]), whenToUse: "When dealing with sorted arrays, pairs, or needing to compare elements from two ends", whenNotToUse: "When the data is not sorted and cannot be sorted", realLifeAnalogy: "Like two people walking towards each other from opposite ends of a hallway", commonMistakes: JSON.stringify(["Not moving both pointers correctly", "Infinite loops", "Missing edge cases"]) },
  { slug: "sliding-window", name: "Sliding Window", description: "Maintain a window over data for subarray/substring problems.", phase: "LINEAR_PATTERNS" as const, order: 5, icon: "Frame", color: "#6366f1", recognitionSignals: JSON.stringify(["subarray", "substring", "contiguous", "window size", "max/min in window"]), whenToUse: "When you need to find contiguous subarray/substring with specific properties", whenNotToUse: "When elements can be non-contiguous (use other patterns)", realLifeAnalogy: "Like sliding a magnifying glass across a line of text to find a word", commonMistakes: JSON.stringify(["Incorrect window expansion/contraction", "Not resetting window", "Off-by-one errors"]) },
  { slug: "binary-search", name: "Binary Search", description: "Efficient O(log n) search on sorted data or answer spaces.", phase: "SEARCHING" as const, order: 6, icon: "Search", color: "#ef4444", recognitionSignals: JSON.stringify(["sorted", "search", "O(log n)", "minimize max", "maximize min"]), whenToUse: "When data is sorted or you can define a monotonic search space", whenNotToUse: "When data is unsorted and cannot be sorted efficiently", realLifeAnalogy: "Like guessing a number by always halving the range", commonMistakes: JSON.stringify(["Infinite loops from incorrect mid calculation", "Wrong boundary updates", "Not handling single element"]) },
  { slug: "stack", name: "Stack", description: "LIFO data structure for balancing, nesting, and undo operations.", phase: "HIERARCHICAL" as const, order: 7, icon: "Layers", color: "#d946ef", recognitionSignals: JSON.stringify(["balanced", "nested", "undo", "monotonic", "next greater"]), whenToUse: "When you need LIFO behavior, balanced parentheses, or monotonic operations", whenNotToUse: "When you need FIFO behavior (use queue)", realLifeAnalogy: "Like a stack of plates - you can only add or remove from the top", commonMistakes: JSON.stringify(["Stack overflow", "Not popping correctly", "Missing empty stack check"]) },
  { slug: "queue", name: "Queue and Deque", description: "FIFO data structure and double-ended queue operations.", phase: "HIERARCHICAL" as const, order: 8, icon: "AlignJustify", color: "#84cc16", recognitionSignals: JSON.stringify(["FIFO", "BFS", "sliding window max", "first in first out"]), whenToUse: "When you need FIFO processing or sliding window maximum", whenNotToUse: "When you need LIFO behavior (use stack)", realLifeAnalogy: "Like a line at a coffee shop - first person in line gets served first", commonMistakes: JSON.stringify(["Queue vs deque confusion", "Not handling empty queue", "Incorrect dequeue"]) },
  { slug: "linked-list", name: "Linked List", description: "Singly/doubly linked lists, cycle detection, and pointer manipulation.", phase: "HIERARCHICAL" as const, order: 9, icon: "Link", color: "#0ea5e9", recognitionSignals: JSON.stringify(["pointer", "node", "cycle", "reverse", "merge lists"]), whenToUse: "When you need frequent insertions/deletions or cycle detection", whenNotToUse: "When you need random access by index", realLifeAnalogy: "Like a treasure hunt where each clue points to the next location", commonMistakes: JSON.stringify(["Losing reference to nodes", "Cycle creation", "Null pointer dereference"]) },
  { slug: "tree", name: "Binary Tree", description: "Tree traversals, construction, and path problems.", phase: "HIERARCHICAL" as const, order: 10, icon: "GitBranch", color: "#22c55e", recognitionSignals: JSON.stringify(["tree", "binary", "traversal", "path", "depth", "height"]), whenToUse: "When dealing with hierarchical data or recursive structures", whenNotToUse: "When data is linear (use arrays/lists)", realLifeAnalogy: "Like a family tree - each person has at most two children", commonMistakes: JSON.stringify(["Missing base case in recursion", "Not handling null nodes", "Infinite recursion"]) },
  { slug: "bst", name: "Binary Search Tree", description: "BST properties, operations, and balanced trees.", phase: "HIERARCHICAL" as const, order: 11, icon: "TreePine", color: "#16a34a", recognitionSignals: JSON.stringify(["sorted", "BST", "inorder", "balanced", "range query"]), whenToUse: "When you need sorted data with O(log n) operations", whenNotToUse: "When the tree becomes unbalanced (use AVL/Red-Black)", realLifeAnalogy: "Like a library organized by ISBN - you can quickly find any book", commonMistakes: JSON.stringify(["Not maintaining BST property", "Incorrect deletion logic", "Not handling duplicates"]) },
  { slug: "dfs", name: "DFS (Depth-First Search)", description: "Recursive/iterative depth-first traversal for trees and graphs.", phase: "HIERARCHICAL" as const, order: 12, icon: "ArrowDown", color: "#0891b2", recognitionSignals: JSON.stringify(["path", "connected", "explore all", "backtrack", "recursion"]), whenToUse: "When you need to explore all paths, detect cycles, or solve maze-like problems", whenNotToUse: "When you need shortest path (use BFS)", realLifeAnalogy: "Like exploring a maze by always going as deep as possible before backtracking", commonMistakes: JSON.stringify(["Stack overflow in deep recursion", "Not marking visited nodes", "Missing backtracking step"]) },
  { slug: "bfs", name: "BFS (Breadth-First Search)", description: "Level-order traversal for shortest path in unweighted graphs.", phase: "HIERARCHICAL" as const, order: 13, icon: "ArrowRight", color: "#0d9488", recognitionSignals: JSON.stringify(["shortest path", "level order", "unweighted", "minimum steps"]), whenToUse: "When you need shortest path in unweighted graphs or level-order processing", whenNotToUse: "When you need to explore all paths (use DFS)", realLifeAnalogy: "Like ripples in a pond - you explore outward one layer at a time", commonMistakes: JSON.stringify(["Using DFS instead", "Not tracking visited nodes", "Incorrect level counting"]) },
  { slug: "graph", name: "Graph Algorithms", description: "Graph representation, traversal, and fundamental algorithms.", phase: "ADVANCED" as const, order: 14, icon: "Network", color: "#7c3aed", recognitionSignals: JSON.stringify(["graph", "node", "edge", "connected", "cycle", "component"]), whenToUse: "When the problem involves relationships between entities", whenNotToUse: "When data is hierarchical (use tree algorithms)", realLifeAnalogy: "Like a social network - people are nodes, friendships are edges", commonMistakes: JSON.stringify(["Directed vs undirected confusion", "Not handling disconnected components", "Cycle detection errors"]) },
  { slug: "backtracking", name: "Backtracking", description: "Systematic exploration with pruning for combinatorial problems.", phase: "ADVANCED" as const, order: 15, icon: "RotateCcw", color: "#dc2626", recognitionSignals: JSON.stringify(["permutation", "combination", "N-Queen", "all solutions", "generate"]), whenToUse: "When you need to generate all valid configurations or find one valid configuration", whenNotToUse: "When greedy or DP provides a more efficient solution", realLifeAnalogy: "Like solving a Sudoku puzzle - try a number, if it does not work, undo and try another", commonMistakes: JSON.stringify(["Missing backtrack step", "Not pruning invalid paths", "Incorrect base case"]) },
  { slug: "trie", name: "Trie", description: "Prefix tree for efficient string operations and autocomplete.", phase: "ADVANCED" as const, order: 16, icon: "Network", color: "#4f46e5", recognitionSignals: JSON.stringify(["prefix", "autocomplete", "dictionary", "word search"]), whenToUse: "When you need prefix-based operations or word-level processing", whenNotToUse: "When simple hash map suffices for exact matching", realLifeAnalogy: "Like a dictionary where you flip pages by first letter, then second, etc.", commonMistakes: JSON.stringify(["Not handling word endings correctly", "Memory inefficiency", "Incorrect prefix matching"]) },
  { slug: "union-find", name: "Union Find", description: "Disjoint set data structure for connected components.", phase: "ADVANCED" as const, order: 17, icon: "Merge", color: "#be185d", recognitionSignals: JSON.stringify(["connected components", "merge", "union", "group", "disconnect"]), whenToUse: "When you need to efficiently merge sets and check connectivity", whenNotToUse: "When you need ordered operations on sets", realLifeAnalogy: "Like tracking which friend groups are connected at a party", commonMistakes: JSON.stringify(["Not using path compression", "Incorrect union by rank", "Not initializing properly"]) },
  { slug: "topological-sort", name: "Topological Sort", description: "Linear ordering of vertices in DAGs for dependency resolution.", phase: "ADVANCED" as const, order: 18, icon: "ArrowDownUp", color: "#9333ea", recognitionSignals: JSON.stringify(["dependency", "ordering", "DAG", "course schedule", "prerequisite"]), whenToUse: "When you need to order tasks with dependencies or detect cycles", whenNotToUse: "When the graph has cycles (not a DAG)", realLifeAnalogy: "Like planning courses - you must take prerequisites before advanced classes", commonMistakes: JSON.stringify(["Not detecting cycles", "Incorrect DFS/BFS ordering", "Missing nodes with no dependencies"]) },
  { slug: "greedy", name: "Greedy Algorithms", description: "Local optimal choices for global optimization.", phase: "OPTIMIZATION" as const, order: 19, icon: "Zap", color: "#eab308", recognitionSignals: JSON.stringify(["maximum", "minimum", "optimal", "interval", "scheduling"]), whenToUse: "When local optimal choices lead to global optimum (exchange argument provable)", whenNotToUse: "When greedy fails (use DP instead)", realLifeAnalogy: "Like always picking the highest paying job from available options", commonMistakes: JSON.stringify(["Incorrect greedy choice", "Not proving correctness", "Missing edge cases"]) },
  { slug: "dp", name: "Dynamic Programming", description: "Optimal substructure and overlapping subproblems for optimization.", phase: "OPTIMIZATION" as const, order: 20, icon: "Database", color: "#2563eb", recognitionSignals: JSON.stringify(["optimize", "minimum/maximum", "count ways", "subsequence", "knapsack"]), whenToUse: "When problem has optimal substructure and overlapping subproblems", whenNotToUse: "When greedy works or when there are no overlapping subproblems", realLifeAnalogy: "Like breaking a big problem into smaller pieces and remembering solutions", commonMistakes: JSON.stringify(["Incorrect state definition", "Wrong transition", "Memory limit exceeded"]) },
  { slug: "bit-manipulation", name: "Bit Manipulation", description: "Bitwise operations for efficient low-level computations.", phase: "OPTIMIZATION" as const, order: 21, icon: "Binary", color: "#64748b", recognitionSignals: JSON.stringify(["bit", "XOR", "mask", "power of 2", "single number"]), whenToUse: "When you need efficient bitwise operations or subset enumeration", whenNotToUse: "When standard operations are clearer and equally efficient", realLifeAnalogy: "Like light switches - each bit is on or off, and operations combine them", commonMistakes: JSON.stringify(["Operator precedence", "Signed vs unsigned", "Off-by-one in bit shifts"]) },
];

const problems = [
  { leetcodeId: 1, title: "Two Sum", slug: "two-sum", difficulty: "EASY" as const, patternSlug: "arrays", tier: 1, companies: ["Google", "Amazon", "Meta", "Microsoft"], tags: ["hashing"], expectedTime: 15, revisionFrequency: 7, description: "Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.", bruteForce: "Check every pair using nested loops O(n²)", optimalSolution: "Use hash map to store complements while iterating O(n)", timeComplexity: "O(n)", spaceComplexity: "O(n)", hints: JSON.stringify(["What if you store the complement?", "Can you do it in one pass?"]), commonMistakes: JSON.stringify(["Using same element twice", "Not handling duplicates"]), followUps: JSON.stringify(["What if array is sorted?", "What if there are multiple solutions?"]), dryRun: JSON.stringify({
    "Example": "nums=[2,7,11,15], target=9 → Output [0,1] because nums[0]+nums[1]=9",
    "Step 1: Initialize HashMap": "Create empty hash map to store {value: index} pairs",
    "Step 2: Iterate (i=0, num=2)": "Complement=9-2=7. 7 not in map. Store {2:0} in map",
    "Step 3: Iterate (i=1, num=7)": "Complement=9-7=2. 2 is in map at index 0! Return [0,1]",
    "Python Solution": "def twoSum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []",
    "Java Solution": "public int[] twoSum(int[] nums, int target) {\n    Map<Integer,Integer> map = new HashMap<>();\n    for(int i=0;i<nums.length;i++) {\n        int complement = target - nums[i];\n        if(map.containsKey(complement))\n            return new int[]{map.get(complement), i};\n        map.put(nums[i], i);\n    }\n    return new int[]{};\n}",
    "C++ Solution": "vector<int> twoSum(vector<int>& nums, int target) {\n    unordered_map<int,int> map;\n    for(int i=0;i<nums.size();i++) {\n        int complement = target - nums[i];\n        if(map.count(complement))\n            return {map[complement], i};\n        map[nums[i]] = i;\n    }\n    return {};\n}",
    "Complexity": "Time O(n), Space O(n) - Single pass with hash map"
  }) },
  { leetcodeId: 53, title: "Maximum Subarray", slug: "maximum-subarray", difficulty: "MEDIUM" as const, patternSlug: "arrays", tier: 1, companies: ["Google", "Amazon", "Meta"], tags: ["dp", "divide-conquer"], expectedTime: 20, revisionFrequency: 7, description: "Find the contiguous subarray with the largest sum.", bruteForce: "Check all subarrays O(n²)", optimalSolution: "Kadane's algorithm: keep local max and global max O(n)", timeComplexity: "O(n)", spaceComplexity: "O(1)", hints: JSON.stringify(["What if you track current sum?", "When would you reset?"]), commonMistakes: JSON.stringify(["Not handling all negative numbers", "Resetting incorrectly"]), followUps: JSON.stringify(["Return the subarray indices", "What if circular array?"]), dryRun: JSON.stringify({
    "Example": "nums=[-2,1,-3,4,-1,2,1,-5,4] → Output 6 (subarray [4,-1,2,1])",
    "Step 1: Initialize": "maxSoFar = nums[0] = -2, maxEndingHere = nums[0] = -2",
    "Step 2: i=1, num=1": "maxEndingHere = max(1, -2+1) = 1. maxSoFar = max(-2, 1) = 1",
    "Step 3: i=2, num=-3": "maxEndingHere = max(-3, 1-3) = -2. maxSoFar = max(1, -2) = 1",
    "Step 4: i=3, num=4": "maxEndingHere = max(4, -2+4) = 4. maxSoFar = max(1, 4) = 4",
    "Step 5: i=4, num=-1": "maxEndingHere = max(-1, 4-1) = 3. maxSoFar = max(4, 3) = 4",
    "Step 6: i=5, num=2": "maxEndingHere = max(2, 3+2) = 5. maxSoFar = max(4, 5) = 5",
    "Step 7: i=6, num=1": "maxEndingHere = max(1, 5+1) = 6. maxSoFar = max(5, 6) = 6",
    "Step 8: i=7, num=-5": "maxEndingHere = max(-5, 6-5) = 1. maxSoFar = max(6, 1) = 6",
    "Step 9: i=8, num=4": "maxEndingHere = max(4, 1+4) = 5. maxSoFar = max(6, 5) = 6",
    "Python": "def maxSubArray(nums):\n    maxSoFar = maxEndingHere = nums[0]\n    for num in nums[1:]:\n        maxEndingHere = max(num, maxEndingHere + num)\n        maxSoFar = max(maxSoFar, maxEndingHere)\n    return maxSoFar",
    "Java": "public int maxSubArray(int[] nums) {\n    int maxSoFar = nums[0], maxEndingHere = nums[0];\n    for(int i=1;i<nums.length;i++){\n        maxEndingHere = Math.max(nums[i], maxEndingHere+nums[i]);\n        maxSoFar = Math.max(maxSoFar, maxEndingHere);\n    }\n    return maxSoFar;\n}",
    "C++": "int maxSubArray(vector<int>& nums) {\n    int maxSoFar = nums[0], maxEndingHere = nums[0];\n    for(int i=1;i<nums.size();i++){\n        maxEndingHere = max(nums[i], maxEndingHere+nums[i]);\n        maxSoFar = max(maxSoFar, maxEndingHere);\n    }\n    return maxSoFar;\n}"
  }) },
  { leetcodeId: 206, title: "Reverse Linked List", slug: "reverse-linked-list", difficulty: "EASY" as const, patternSlug: "linked-list", tier: 1, companies: ["Amazon", "Microsoft"], tags: ["linked-list"], expectedTime: 10, revisionFrequency: 7, description: "Reverse a singly linked list.", bruteForce: "Use stack to reverse O(n) space", optimalSolution: "Iterative three-pointer reversal O(1) space", timeComplexity: "O(n)", spaceComplexity: "O(1)", hints: JSON.stringify(["Can you reverse links in place?", "Track prev, curr, next"]), commonMistakes: JSON.stringify(["Losing reference to next node", "Not handling empty list"]), followUps: JSON.stringify(["Reverse recursively", "Reverse between two positions"]), dryRun: JSON.stringify({
    "Example": "1→2→3→4→5 becomes 5→4→3→2→1",
    "Initialize pointers": "prev=null, curr=head (1), next=null",
    "Step 1: Save next": "next = curr.next = 2. Save reference before breaking link",
    "Step 1: Reverse": "curr.next = prev → 1→null (now points to null)",
    "Step 1: Move": "prev = curr (1), curr = next (2). prev=1, curr=2",
    "Step 2: Save next": "next = curr.next = 3. curr=2, next=3",
    "Step 2: Reverse": "curr.next = prev → 2→1 (now points to 1)",
    "Step 2: Move": "prev = 2, curr = 3",
    "Step 3-5: Repeat": "Continue until curr=null. prev ends at 5 (new head)",
    "Return new head": "return prev (node 5)",
    "Python": "def reverseList(head):\n    prev, curr = None, head\n    while curr:\n        nxt = curr.next\n        curr.next = prev\n        prev, curr = curr, nxt\n    return prev",
    "Java": "public ListNode reverseList(ListNode head) {\n    ListNode prev = null, curr = head;\n    while(curr != null){\n        ListNode nxt = curr.next;\n        curr.next = prev;\n        prev = curr;\n        curr = nxt;\n    }\n    return prev;\n}",
    "C++": "ListNode* reverseList(ListNode* head) {\n    ListNode *prev=nullptr, *curr=head, *nxt;\n    while(curr){\n        nxt = curr->next;\n        curr->next = prev;\n        prev = curr;\n        curr = nxt;\n    }\n    return prev;\n}"
  }) },
  { leetcodeId: 20, title: "Valid Parentheses", slug: "valid-parentheses", difficulty: "EASY" as const, patternSlug: "stack", tier: 1, companies: ["Amazon", "Meta"], tags: ["stack"], expectedTime: 10, revisionFrequency: 7, description: "Determine if string of brackets is valid.", bruteForce: "Repeatedly remove pairs O(n²)", optimalSolution: "Use stack to match closing brackets O(n)", timeComplexity: "O(n)", spaceComplexity: "O(n)", hints: JSON.stringify(["Push opening brackets to stack", "Match closing with top"]), commonMistakes: JSON.stringify(["Unmatched closing bracket", "Stack not empty at end"]), followUps: JSON.stringify(["Multiple bracket types", "Minimum add to make valid"]), dryRun: JSON.stringify({
    "Example 1": "s='()[]{}' → true (all brackets match in order)",
    "Example 2": "s='([)]' → false (wrong order: ] before closing ))",
    "Step 1: char='('": "Push '(' to stack. Stack: ['(']",
    "Step 2: char=')'": "Top is '(' which matches ')'. Pop. Stack: []",
    "Step 3: char='['": "Push '[' to stack. Stack: ['[']",
    "Step 4: char=']'": "Top is '[' which matches ']'. Pop. Stack: []",
    "Step 5: char='{'": "Push '{' to stack. Stack: ['{']",
    "Step 6: char='}'": "Top is '{' which matches '}'. Pop. Stack: []",
    "End": "Stack is empty → valid! Return true",
    "Python": "def isValid(s):\n    stack = []\n    pairs = {')':'(', ']':'[', '}':'{'}\n    for c in s:\n        if c in pairs:\n            if not stack or stack.pop() != pairs[c]:\n                return False\n        else:\n            stack.append(c)\n    return not stack",
    "Java": "public boolean isValid(String s) {\n    Stack<Character> stack = new Stack<>();\n    Map<Character,Character> m = Map.of(')','(',']','[','}','{');\n    for(char c : s.toCharArray()){\n        if(m.containsKey(c)){\n            if(stack.isEmpty() || stack.pop() != m.get(c))\n                return false;\n        } else { stack.push(c); }\n    }\n    return stack.isEmpty();\n}",
    "C++": "bool isValid(string s) {\n    stack<char> st;\n    for(char c : s){\n        if(c==')'||c==']'||c=='}'){\n            if(st.empty()) return false;\n            if((c==')'&&st.top()!='(')||(c==']'&&st.top()!='[')||(c=='}'&&st.top()!='{'))\n                return false;\n            st.pop();\n        } else { st.push(c); }\n    }\n    return st.empty();\n}"
  }) },
  { leetcodeId: 21, title: "Merge Two Sorted Lists", slug: "merge-two-sorted-lists", difficulty: "EASY" as const, patternSlug: "linked-list", tier: 1, companies: ["Amazon", "Microsoft"], tags: ["linked-list"], expectedTime: 15, revisionFrequency: 7, description: "Merge two sorted linked lists into one sorted list.", bruteForce: "Append all to array, sort, rebuild O(n log n)", optimalSolution: "Two-pointer merge with dummy head O(n)", timeComplexity: "O(n + m)", spaceComplexity: "O(1)", hints: JSON.stringify(["Use dummy node", "Compare and advance"]), commonMistakes: JSON.stringify(["Not handling one empty list", "Losing tail"]), followUps: JSON.stringify(["Merge k sorted lists", "Merge with recursion"]) },
  { leetcodeId: 70, title: "Climbing Stairs", slug: "climbing-stairs", difficulty: "EASY" as const, patternSlug: "dp", tier: 1, companies: ["Amazon"], tags: ["dp"], expectedTime: 10, revisionFrequency: 7, description: "Count ways to climb n stairs taking 1 or 2 steps.", bruteForce: "Recursion with all combinations O(2ⁿ)", optimalSolution: "DP: dp[i] = dp[i-1] + dp[i-2] O(n)", timeComplexity: "O(n)", spaceComplexity: "O(1)", hints: JSON.stringify(["This is Fibonacci in disguise", "Try bottom-up"]), commonMistakes: JSON.stringify(["Starting from wrong base", "Integer overflow"]), followUps: JSON.stringify(["3-step climb", "Minimum cost to climb"]), dryRun: JSON.stringify({
    "Example": "n=5 → Output 8 (Fibonacci: 1,1,2,3,5,8)",
    "Plain English": "You can reach step i from step i-1 (1 step) or step i-2 (2 steps). Total ways = sum of ways to reach previous two steps.",
    "Base cases": "dp[1]=1 (only 1-step), dp[2]=2 (1+1 or 2)",
    "Step 3": "dp[3] = dp[2] + dp[1] = 2 + 1 = 3 ways: (1+1+1, 1+2, 2+1)",
    "Step 4": "dp[4] = dp[3] + dp[2] = 3 + 2 = 5 ways",
    "Step 5": "dp[5] = dp[4] + dp[3] = 5 + 3 = 8 ways ← answer",
    "Optimization": "Only keep last two values (O(1) space)",
    "Python": "def climbStairs(n):\n    if n <= 2: return n\n    a, b = 1, 2\n    for _ in range(3, n+1):\n        a, b = b, a + b\n    return b",
    "Java": "public int climbStairs(int n) {\n    if(n<=2) return n;\n    int a=1, b=2;\n    for(int i=3;i<=n;i++){ int t=a+b; a=b; b=t; }\n    return b;\n}",
    "C++": "int climbStairs(int n) {\n    if(n<=2) return n;\n    int a=1, b=2;\n    for(int i=3;i<=n;i++){ int t=a+b; a=b; b=t; }\n    return b;\n}"
  }) },
  { leetcodeId: 121, title: "Best Time to Buy and Sell Stock", slug: "best-time-to-buy-and-sell-stock", difficulty: "EASY" as const, patternSlug: "arrays", tier: 1, companies: ["Amazon", "Meta", "Google"], tags: ["arrays"], expectedTime: 15, revisionFrequency: 7, description: "Find max profit from one buy and one sell.", bruteForce: "Check every buy-sell pair O(n²)", optimalSolution: "Track min price so far, calc profit O(n)", timeComplexity: "O(n)", spaceComplexity: "O(1)", hints: JSON.stringify(["Track minimum price", "Calculate profit after each day"]), commonMistakes: JSON.stringify(["Buying after selling", "Not handling decreasing prices"]), followUps: JSON.stringify(["Multiple transactions", "With cooldown"]), dryRun: JSON.stringify({
    "Example": "prices=[7,1,5,3,6,4] → Output 5 (buy at 1, sell at 6)",
    "Plain English": "Track the lowest price seen so far. For each day, calculate profit if sold today. Keep max profit.",
    "Step 1: day 0 price=7": "minPrice=7, maxProfit=0 (cannot buy & sell same day)",
    "Step 2: day 1 price=1": "minPrice=min(7,1)=1, maxProfit=max(0,1-1)=0",
    "Step 3: day 2 price=5": "minPrice=1, maxProfit=max(0,5-1)=4",
    "Step 4: day 3 price=3": "minPrice=1, maxProfit=max(4,3-1)=4",
    "Step 5: day 4 price=6": "minPrice=1, maxProfit=max(4,6-1)=5",
    "Step 6: day 5 price=4": "minPrice=1, maxProfit=max(5,4-1)=5 ← answer",
    "Python": "def maxProfit(prices):\n    min_price = float('inf')\n    max_profit = 0\n    for p in prices:\n        min_price = min(min_price, p)\n        max_profit = max(max_profit, p - min_price)\n    return max_profit",
    "Java": "public int maxProfit(int[] prices) {\n    int minPrice = Integer.MAX_VALUE, maxProfit = 0;\n    for(int p : prices){\n        minPrice = Math.min(minPrice, p);\n        maxProfit = Math.max(maxProfit, p - minPrice);\n    }\n    return maxProfit;\n}",
    "C++": "int maxProfit(vector<int>& prices) {\n    int minPrice = INT_MAX, maxProfit = 0;\n    for(int p : prices){\n        minPrice = min(minPrice, p);\n        maxProfit = max(maxProfit, p - minPrice);\n    }\n    return maxProfit;\n}"
  }) },
  { leetcodeId: 217, title: "Contains Duplicate", slug: "contains-duplicate", difficulty: "EASY" as const, patternSlug: "hashing", tier: 1, companies: ["Amazon", "Google"], tags: ["hashing"], expectedTime: 10, revisionFrequency: 14, description: "Check if array contains any duplicate.", bruteForce: "Check every pair O(n²)", optimalSolution: "Use hash set O(n)", timeComplexity: "O(n)", spaceComplexity: "O(n)", hints: JSON.stringify(["How can you track seen numbers?"]), commonMistakes: JSON.stringify(["Confusing with frequency count"]), followUps: JSON.stringify(["Return all duplicates", "Without extra space"]) },
  { leetcodeId: 200, title: "Number of Islands", slug: "number-of-islands", difficulty: "MEDIUM" as const, patternSlug: "graph", tier: 2, companies: ["Amazon", "Google", "Meta"], tags: ["graph", "dfs"], expectedTime: 25, revisionFrequency: 7, description: "Count islands in a 2D grid ('1' = land, '0' = water).", bruteForce: "Check each cell with BFS/DFS", optimalSolution: "DFS flood fill, mark visited O(m×n)", timeComplexity: "O(m × n)", spaceComplexity: "O(m × n)", hints: JSON.stringify(["DFS when you find '1'", "Sink connected land"]), commonMistakes: JSON.stringify(["Out of bounds", "Infinite loop without marking"]), followUps: JSON.stringify(["Max area island", "Number of distinct islands"]), dryRun: JSON.stringify({
    "Example": "grid = [['1','1','0'],['1','1','0'],['0','0','1']] → Output 2 (two islands)",
    "Step 1: (0,0)='1'": "Start DFS. Count+=1 (island 1). Mark visited, explore neighbors",
    "Step 1 DFS (0,1)": "grid[0][1]='1' → mark visited, recurse. Grid row0 becomes [0,0,0]",
    "Step 1 DFS (1,0)": "grid[1][0]='1' → mark visited, recurse. (1,1) also '1', mark all",
    "Step 2: After island 1": "grid[0]=[0,0,0], grid[1]=[0,0,0]. Skip all visited cells",
    "Step 3: (2,2)='1'": "Start DFS. Count+=1 (island 2). Mark grid[2][2]=0. No more '1' neighbors",
    "End": "Return total count = 2 islands",
    "Python": "def numIslands(grid):\n    def dfs(i,j):\n        if i<0 or i>=len(grid) or j<0 or j>=len(grid[0]) or grid[i][j]!='1':\n            return\n        grid[i][j]='0'\n        for di,dj in [(1,0),(-1,0),(0,1),(0,-1)]: dfs(i+di,j+dj)\n    count = 0\n    for i in range(len(grid)):\n        for j in range(len(grid[0])):\n            if grid[i][j]=='1':\n                dfs(i,j)\n                count += 1\n    return count",
    "Java": "public int numIslands(char[][] grid) {\n    int count=0;\n    for(int i=0;i<grid.length;i++)\n        for(int j=0;j<grid[0].length;j++)\n            if(grid[i][j]=='1'){ dfs(grid,i,j); count++; }\n    return count;\n}\nvoid dfs(char[][] g, int i, int j){\n    if(i<0||i>=g.length||j<0||j>=g[0].length||g[i][j]!='1') return;\n    g[i][j]='0';\n    dfs(g,i+1,j); dfs(g,i-1,j); dfs(g,i,j+1); dfs(g,i,j-1);\n}",
    "C++": "int numIslands(vector<vector<char>>& grid) {\n    int count=0;\n    for(int i=0;i<grid.size();i++)\n        for(int j=0;j<grid[0].size();j++)\n            if(grid[i][j]=='1'){ dfs(grid,i,j); count++; }\n    return count;\n}\nvoid dfs(vector<vector<char>>& g, int i, int j){\n    if(i<0||i>=g.size()||j<0||j>=g[0].size()||g[i][j]!='1') return;\n    g[i][j]='0';\n    dfs(g,i+1,j); dfs(g,i-1,j); dfs(g,i,j+1); dfs(g,i,j-1);\n}"
  }) },
  { leetcodeId: 15, title: "3Sum", slug: "3sum", difficulty: "MEDIUM" as const, patternSlug: "two-pointers", tier: 2, companies: ["Amazon", "Meta", "Microsoft"], tags: ["two-pointers"], expectedTime: 25, revisionFrequency: 7, description: "Find all triplets that sum to zero.", bruteForce: "Three nested loops O(n³)", optimalSolution: "Sort + two pointers O(n²)", timeComplexity: "O(n²)", spaceComplexity: "O(1)", hints: JSON.stringify(["Sort array first", "Fix one, two-pointer for other two"]), commonMistakes: JSON.stringify(["Duplicate triplets", "Skipping wrong indices"]), followUps: JSON.stringify(["4Sum", "kSum"]) },
  { leetcodeId: 33, title: "Search in Rotated Sorted Array", slug: "search-in-rotated-sorted-array", difficulty: "MEDIUM" as const, patternSlug: "binary-search", tier: 2, companies: ["Amazon", "Microsoft"], tags: ["binary-search"], expectedTime: 20, revisionFrequency: 7, description: "Search for target in rotated sorted array.", bruteForce: "Linear search O(n)", optimalSolution: "Modified binary search - find sorted half O(log n)", timeComplexity: "O(log n)", spaceComplexity: "O(1)", hints: JSON.stringify(["One half is always sorted", "Check if target is in sorted half"]), commonMistakes: JSON.stringify(["Wrong boundary conditions", "Not handling duplicates"]), followUps: JSON.stringify(["With duplicates", "Find rotation point"]) },
  { leetcodeId: 46, title: "Permutations", slug: "permutations", difficulty: "MEDIUM" as const, patternSlug: "backtracking", tier: 2, companies: ["Amazon", "Meta"], tags: ["backtracking"], expectedTime: 20, revisionFrequency: 7, description: "Return all permutations of an array.", bruteForce: "Nested loops for each position", optimalSolution: "Backtracking with swap technique O(n!)", timeComplexity: "O(n × n!)", spaceComplexity: "O(n)", hints: JSON.stringify(["Swap each element to current position", "Backtrack after recursion"]), commonMistakes: JSON.stringify(["Not generating all permutations", "Duplicate permutations"]), followUps: JSON.stringify(["Next permutation", "Permutations with duplicates"]) },
  { leetcodeId: 102, title: "Binary Tree Level Order Traversal", slug: "binary-tree-level-order-traversal", difficulty: "MEDIUM" as const, patternSlug: "tree", tier: 2, companies: ["Amazon", "Meta"], tags: ["tree", "bfs"], expectedTime: 20, revisionFrequency: 7, description: "Return level-by-level traversal of binary tree.", bruteForce: "Recursively track depth", optimalSolution: "BFS with queue O(n)", timeComplexity: "O(n)", spaceComplexity: "O(n)", hints: JSON.stringify(["Use queue for BFS", "Track level size"]), commonMistakes: JSON.stringify(["Not separating levels correctly", "Null node handling"]), followUps: JSON.stringify(["Zigzag order", "Right side view"]) },
  { leetcodeId: 98, title: "Validate Binary Search Tree", slug: "validate-binary-search-tree", difficulty: "MEDIUM" as const, patternSlug: "bst", tier: 2, companies: ["Amazon", "Google"], tags: ["bst", "dfs"], expectedTime: 20, revisionFrequency: 7, description: "Check if binary tree is a valid BST.", bruteForce: "Extract inorder, check if sorted O(n)", optimalSolution: "DFS with min/max range O(n)", timeComplexity: "O(n)", spaceComplexity: "O(h)", hints: JSON.stringify(["Pass min/max range to children", "Inorder must be sorted"]), commonMistakes: JSON.stringify(["Only checking immediate children", "Integer overflow with min/max"]), followUps: JSON.stringify(["Recover BST", "BST iterator"]) },
  { leetcodeId: 322, title: "Coin Change", slug: "coin-change", difficulty: "MEDIUM" as const, patternSlug: "dp", tier: 2, companies: ["Amazon", "Google", "Meta"], tags: ["dp"], expectedTime: 20, revisionFrequency: 7, description: "Fewest coins needed to make amount.", bruteForce: "Recursion with all combinations O(amountⁿ)", optimalSolution: "DP bottom-up: dp[i] = min(dp[i-coin] + 1) O(amount × n)", timeComplexity: "O(amount × n)", spaceComplexity: "O(amount)", hints: JSON.stringify(["Build solution from 0 to amount", "For each amount, try each coin"]), commonMistakes: JSON.stringify(["Integer overflow", "Not handling impossible amounts"]), followUps: JSON.stringify(["Ways to make change", "Minimum coins infinite supply"]), dryRun: JSON.stringify({
    "Example": "coins=[1,2,5], amount=11 → Output 3 (5+5+1=11)",
    "Plain English": "Build bottom-up DP: dp[i]=fewest coins to make amount i. Initialize all to amount+1 (sentinel for impossible). dp[0]=0.",
    "Init dp array": "dp[0]=0, dp[1..11]=12 (amount+1 sentinel)",
    "Compute dp[1]": "Try coin 1: dp[1]=min(12, dp[0]+1)=1. Try 2: too big. Try 5: too big. dp[1]=1",
    "Compute dp[2]": "Coin 1: dp[2]=min(12, dp[1]+1)=2. Coin 2: min(2, dp[0]+1)=1. dp[2]=1",
    "Compute dp[3]": "Coin 1: dp[3]=min(12, dp[2]+1)=2. Coin 2: min(2, dp[1]+1)=2. dp[3]=2 (2+1)",
    "Compute dp[4]": "Coin 1: min(12, dp[3]+1)=3. Coin 2: min(3, dp[2]+1)=2. dp[4]=2 (2+2)",
    "Compute dp[5]": "Coin 1: min(12, dp[4]+1)=3. Coin 2: min(3, dp[3]+1)=3. Coin 5: min(3, dp[0]+1)=1. dp[5]=1",
    "... up to dp[11]": "Coin 1: dp[10]+1=3. Coin 2: dp[9]+1=3. Coin 5: dp[6]+1=3. dp[11]=3 (5+5+1)",
    "Answer": "dp[11]=3 < sentinel → return 3",
    "Python": "def coinChange(coins, amount):\n    dp = [amount+1]*(amount+1)\n    dp[0] = 0\n    for i in range(1, amount+1):\n        for c in coins:\n            if c <= i:\n                dp[i] = min(dp[i], dp[i-c]+1)\n    return dp[amount] if dp[amount] != amount+1 else -1",
    "Java": "public int coinChange(int[] coins, int amount) {\n    int[] dp = new int[amount+1];\n    Arrays.fill(dp, amount+1);\n    dp[0]=0;\n    for(int i=1;i<=amount;i++)\n        for(int c: coins)\n            if(c<=i) dp[i]=Math.min(dp[i], dp[i-c]+1);\n    return dp[amount]>amount ? -1 : dp[amount];\n}",
    "C++": "int coinChange(vector<int>& coins, int amount) {\n    vector<int> dp(amount+1, amount+1);\n    dp[0]=0;\n    for(int i=1;i<=amount;i++)\n        for(int c: coins)\n            if(c<=i) dp[i]=min(dp[i], dp[i-c]+1);\n    return dp[amount]>amount ? -1 : dp[amount];\n}"
  }) },
  { leetcodeId: 42, title: "Trapping Rain Water", slug: "trapping-rain-water", difficulty: "HARD" as const, patternSlug: "arrays", tier: 4, companies: ["Google", "Amazon", "Goldman Sachs"], tags: ["two-pointers"], expectedTime: 35, revisionFrequency: 3, description: "Calculate trapped water between bars.", bruteForce: "For each bar, find left/right max O(n²)", optimalSolution: "Two pointers with left/right max O(n)", timeComplexity: "O(n)", spaceComplexity: "O(1)", hints: JSON.stringify(["Water = min(leftMax, rightMax) - height", "Move the smaller pointer"]), commonMistakes: JSON.stringify(["Wrong direction", "Not updating max correctly"]), followUps: JSON.stringify(["3D water trapping", "Pour water between bars"]), dryRun: JSON.stringify({
    "Example": "height=[0,1,0,2,1,0,1,3,2,1,2,1] → Output 6 units of water",
    "Plain English": "Water trapped at any position = min(max_left, max_right) - height[pos]. Move pointers inward from both ends.",
    "Init": "left=0, right=11, leftMax=0, rightMax=0, total=0",
    "Step 1: h[left]=0 < h[right]=1": "leftMax=max(0,0)=0. Water=0-0=0. left=1",
    "Step 2: h[1]=1 < h[11]=1": "leftMax=max(0,1)=1. Water=1-1=0. left=2",
    "Step 3: h[2]=0 < h[11]=1": "leftMax=1. Water=1-0=1. total=1. left=3",
    "Step 4: h[3]=2 > h[11]=1": "rightMax=max(0,1)=1. Water=1-1=0. right=10",
    "Step 5: h[3]=2 > h[10]=2": "rightMax=max(1,2)=2. Water=2-2=0. right=9",
    "Step 6: h[3]=2 > h[9]=1": "rightMax=2. Water=2-1=1. total=2. right=8",
    "Step 7: h[3]=2 == h[8]=2": "rightMax=2. Water=2-2=0. right=7",
    "Step 8: h[3]=2 < h[7]=3": "leftMax=max(1,2)=2. Water=2-2=0. left=4",
    "Step 9: h[4]=1 < h[7]=3": "leftMax=2. Water=2-1=1. total=3. left=5",
    "Step 10: h[5]=0 < h[7]=3": "leftMax=2. Water=2-0=2. total=5. left=6",
    "Step 11: h[6]=1 < h[7]=3": "leftMax=2. Water=2-1=1. total=6. left=7",
    "End": "left=7, right=7 → pointers crossed. Return 6",
    "Python": "def trap(height):\n    l, r = 0, len(height)-1\n    leftMax = rightMax = total = 0\n    while l < r:\n        if height[l] < height[r]:\n            leftMax = max(leftMax, height[l])\n            total += leftMax - height[l]\n            l += 1\n        else:\n            rightMax = max(rightMax, height[r])\n            total += rightMax - height[r]\n            r -= 1\n    return total",
    "Java": "public int trap(int[] height) {\n    int l=0, r=height.length-1, leftMax=0, rightMax=0, total=0;\n    while(l<r){\n        if(height[l]<height[r]){\n            leftMax = Math.max(leftMax, height[l]);\n            total += leftMax - height[l++];\n        } else {\n            rightMax = Math.max(rightMax, height[r]);\n            total += rightMax - height[r--];\n        }\n    }\n    return total;\n}",
    "C++": "int trap(vector<int>& height) {\n    int l=0, r=height.size()-1, leftMax=0, rightMax=0, total=0;\n    while(l<r){\n        if(height[l]<height[r]){\n            leftMax = max(leftMax, height[l]);\n            total += leftMax - height[l++];\n        } else {\n            rightMax = max(rightMax, height[r]);\n            total += rightMax - height[r--];\n        }\n    }\n    return total;\n}"
  }) },
];

const companyTracks = [
  { slug: "google", name: "Google", description: "Top DSA problems asked at Google interviews", problemCount: 45, avgDifficulty: "Medium-Hard", strategy: "Focus on graphs, trees, DP, and system design. Google values clean code and optimal solutions." },
  { slug: "amazon", name: "Amazon", description: "Most frequently asked DSA problems at Amazon", problemCount: 50, avgDifficulty: "Medium", strategy: "Heavy on arrays, strings, trees, and graphs. Leadership principles integration in technical questions." },
  { slug: "microsoft", name: "Microsoft", description: "Microsoft interview DSA problem collection", problemCount: 40, avgDifficulty: "Medium", strategy: "Strong focus on linked lists, trees, BST, and DP. Clean code matters." },
  { slug: "meta", name: "Meta", description: "Meta (Facebook) DSA interview preparation", problemCount: 42, avgDifficulty: "Medium-Hard", strategy: "Graph algorithms, trees, arrays, and system design. Speed and accuracy both matter." },
];



async function main() {
  console.log("Seeding database...");

  await prisma.college.upsert({ where: { code: "IITB" }, update: {}, create: { name: "Indian Institute of Technology Bombay", code: "IITB", location: "Mumbai" } });
  await prisma.college.upsert({ where: { code: "NITK" }, update: {}, create: { name: "National Institute of Technology Karnataka", code: "NITK", location: "Surathkal" } });
  await prisma.user.upsert({ where: { email: "admin@interviewai.in" }, update: {}, create: { name: "Super Admin", email: "admin@interviewai.in", role: "SUPER_ADMIN" } });

  // Seed Learning Hub (full content with quizzes, FAANG questions, coding challenges)
  await seedLearningHub(prisma);

  // Seed DSA patterns
  for (const p of patterns) {
    const { slug, ...data } = p;
    await prisma.dSAPattern.upsert({ where: { slug }, update: data, create: { slug, ...data } });
  }
  console.log(`Seeded ${patterns.length} DSA patterns`);

  // Seed DSA problems
  for (const prob of problems) {
    const pattern = await prisma.dSAPattern.findUnique({ where: { slug: prob.patternSlug } });
    const { patternSlug, ...problemData } = prob;
    await prisma.dSAProblem.upsert({
      where: { leetcodeId: prob.leetcodeId },
      update: { ...problemData, patternId: pattern?.id || null },
      create: { ...problemData, patternId: pattern?.id || null, leetcodeId: prob.leetcodeId },
    });
  }
  console.log(`Seeded ${problems.length} DSA problems`);

  // Seed company tracks
  for (const track of companyTracks) {
    await prisma.dSACompanyTrack.upsert({ where: { slug: track.slug }, update: track, create: track });
  }
  console.log(`Seeded ${companyTracks.length} company tracks`);

  console.log("Seeding complete!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
