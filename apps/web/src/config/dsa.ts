export const dsaPhases = [
  {
    slug: "FOUNDATIONS",
    name: "Phase 1: Foundations",
    description: "Build a solid foundation with arrays, strings, complexity analysis, and math",
    color: "#3b82f6",
    patterns: ["arrays", "strings", "complexity-analysis", "math"],
  },
  {
    slug: "LINEAR_PATTERNS",
    name: "Phase 2: Linear Patterns",
    description: "Master linear data structure patterns for efficient traversal",
    color: "#8b5cf6",
    patterns: ["hashing", "prefix-sum", "two-pointers", "sliding-window"],
  },
  {
    slug: "SEARCHING",
    name: "Phase 3: Searching",
    description: "Efficient search and sorting techniques",
    color: "#ef4444",
    patterns: ["binary-search", "sorting", "heap"],
  },
  {
    slug: "HIERARCHICAL",
    name: "Phase 4: Hierarchical Structures",
    description: "Trees, linked lists, stacks, queues, and traversals",
    color: "#22c55e",
    patterns: ["linked-list", "stack", "queue", "tree", "bst", "dfs", "bfs"],
  },
  {
    slug: "ADVANCED",
    name: "Phase 5: Advanced",
    description: "Graphs, backtracking, trie, union find, and advanced algorithms",
    color: "#f59e0b",
    patterns: ["graph", "backtracking", "trie", "union-find", "topological-sort", "shortest-path", "mst"],
  },
  {
    slug: "OPTIMIZATION",
    name: "Phase 6: Optimization",
    description: "Greedy, dynamic programming, bit manipulation, and advanced trees",
    color: "#06b6d4",
    patterns: ["greedy", "dp", "bit-manipulation", "segment-tree", "fenwick-tree"],
  },
] as const;

export const dsaPatternColors: Record<string, string> = {
  arrays: "#3b82f6",
  strings: "#8b5cf6",
  "complexity-analysis": "#06b6d4",
  math: "#10b981",
  hashing: "#f59e0b",
  "prefix-sum": "#ec4899",
  "two-pointers": "#14b8a6",
  "sliding-window": "#6366f1",
  "binary-search": "#ef4444",
  sorting: "#f97316",
  heap: "#a855f7",
  "linked-list": "#0ea5e9",
  stack: "#d946ef",
  queue: "#84cc16",
  tree: "#22c55e",
  bst: "#16a34a",
  dfs: "#0891b2",
  bfs: "#0d9488",
  graph: "#7c3aed",
  backtracking: "#dc2626",
  trie: "#4f46e5",
  "union-find": "#be185d",
  "topological-sort": "#9333ea",
  "shortest-path": "#059669",
  mst: "#b45309",
  greedy: "#eab308",
  dp: "#2563eb",
  "bit-manipulation": "#64748b",
  "segment-tree": "#0d9488",
  "fenwick-tree": "#7c3aed",
};

export const difficultyConfig = {
  EASY: { label: "Easy", color: "bg-green-500/10 text-green-500 border-green-500/20" },
  MEDIUM: { label: "Medium", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
  HARD: { label: "Hard", color: "bg-red-500/10 text-red-500 border-red-500/20" },
};

export const tierConfig = {
  1: { label: "Must Solve", color: "bg-green-500/10 text-green-500" },
  2: { label: "Pattern Building", color: "bg-blue-500/10 text-blue-500" },
  3: { label: "Company Favorite", color: "bg-amber-500/10 text-amber-500" },
  4: { label: "FAANG Level", color: "bg-red-500/10 text-red-500" },
};

export const codeTemplates: Record<string, string> = {
  "two-pointers": `def two_pointers(arr):
    left, right = 0, len(arr) - 1
    
    while left < right:
        current = arr[left] + arr[right]
        
        if current == target:
            return [left, right]
        elif current < target:
            left += 1
        else:
            right -= 1
    
    return [-1, -1]`,
  
  "sliding-window": `def sliding_window(arr, k):
    window_sum = sum(arr[:k])
    max_sum = window_sum
    
    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i - k]
        max_sum = max(max_sum, window_sum)
    
    return max_sum`,
  
  "binary-search": `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1`,
  
  dfs: `def dfs(node, visited):
    if node in visited:
        return
    
    visited.add(node)
    
    for neighbor in node.neighbors:
        dfs(neighbor, visited)`,
  
  bfs: `from collections import deque

def bfs(start):
    queue = deque([start])
    visited = {start}
    
    while queue:
        node = queue.popleft()
        
        for neighbor in node.neighbors:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)`,
  
  backtracking: `def backtrack(path, choices):
    if满足条件:
        result.append(path[:])
        return
    
    for choice in choices:
        path.append(choice)
        backtrack(path, remaining_choices)
        path.pop()  # backtrack`,
  
  "union-find": `class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
    
    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]
    
    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py:
            return False
        if self.rank[px] < self.rank[py]:
            px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1
        return True`,
  
  dp: `def dp(n):
    memo = {}
    
    def solve(state):
        if state in memo:
            return memo[state]
        
        if base_case:
            return base_value
        
        memo[state] = transition
        return memo[state]
    
    return solve(initial_state)`,
};
