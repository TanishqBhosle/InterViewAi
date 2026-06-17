#!/usr/bin/env python3
"""
DSA Mastery Hub - Problem Generator
Generates complete 23-section analysis for each problem
"""

import os
from pathlib import Path

# Problem database organized by Pattern → Topic → Difficulty
PROBLEMS = {
    "01-arrays": {
        "name": "Arrays",
        "easy": [
            {"id": 1, "title": "Two Sum", "slug": "two-sum", "companies": ["Amazon", "Google", "Meta", "Microsoft"], "pattern": "Hashing"},
            {"id": 121, "title": "Best Time to Buy and Sell Stock", "slug": "best-time-to-buy-and-sell-stock", "companies": ["Amazon", "Google", "Meta"], "pattern": "Greedy"},
            {"id": 217, "title": "Contains Duplicate", "slug": "contains-duplicate", "companies": ["Amazon", "Apple", "Uber"], "pattern": "Hashing"},
            {"id": 53, "title": "Maximum Subarray", "slug": "maximum-subarray", "companies": ["Google", "Amazon", "Meta"], "pattern": "Kadane's Algorithm"},
            {"id": 26, "title": "Remove Duplicates from Sorted Array", "slug": "remove-duplicates-from-sorted-array", "companies": ["Amazon", "Microsoft"], "pattern": "Two Pointers"},
        ],
        "medium": [
            {"id": 238, "title": "Product of Array Except Self", "slug": "product-of-array-except-self", "companies": ["Amazon", "Microsoft", "Meta"], "pattern": "Prefix Sum"},
            {"id": 56, "title": "Merge Intervals", "slug": "merge-intervals", "companies": ["Google", "Meta", "Amazon"], "pattern": "Intervals"},
            {"id": 57, "title": "Insert Interval", "slug": "insert-interval", "companies": ["Google", "Meta"], "pattern": "Intervals"},
            {"id": 169, "title": "Majority Element", "slug": "majority-element", "companies": ["Amazon", "Microsoft"], "pattern": "Boyer-Moore Voting"},
            {"id": 31, "title": "Next Permutation", "slug": "next-permutation", "companies": ["Amazon", "Microsoft"], "pattern": "Array"},
        ],
        "hard": [
            {"id": 41, "title": "First Missing Positive", "slug": "first-missing-positive", "companies": ["Google", "Microsoft"], "pattern": "Array"},
            {"id": 42, "title": "Trapping Rain Water", "slug": "trapping-rain-water", "companies": ["Google", "Amazon", "Goldman Sachs"], "pattern": "Two Pointers/Stack"},
            {"id": 4, "title": "Median of Two Sorted Arrays", "slug": "median-of-two-sorted-arrays", "companies": ["Google", "Amazon", "Meta"], "pattern": "Binary Search"},
        ],
    },
    "02-hashing": {
        "name": "Hashing",
        "easy": [
            {"id": 1, "title": "Two Sum", "slug": "two-sum", "companies": ["Amazon", "Google", "Meta"], "pattern": "Hashing"},
            {"id": 219, "title": "Contains Duplicate II", "slug": "contains-duplicate-ii", "companies": ["Amazon"], "pattern": "Hashing"},
            {"id": 242, "title": "Valid Anagram", "slug": "valid-anagram", "companies": ["Amazon", "Google"], "pattern": "Frequency Counting"},
            {"id": 349, "title": "Intersection of Two Arrays", "slug": "intersection-of-two-arrays", "companies": ["Amazon", "Facebook"], "pattern": "HashSet"},
        ],
        "medium": [
            {"id": 49, "title": "Group Anagrams", "slug": "group-anagrams", "companies": ["Amazon", "Google"], "pattern": "Signature Hashing"},
            {"id": 128, "title": "Longest Consecutive Sequence", "slug": "longest-consecutive-sequence", "companies": ["Google", "Amazon"], "pattern": "HashSet"},
            {"id": 560, "title": "Subarray Sum Equals K", "slug": "subarray-sum-equals-k", "companies": ["Amazon", "Google"], "pattern": "Prefix Sum + Hashing"},
            {"id": 525, "title": "Contiguous Array", "slug": "contiguous-array", "companies": ["Amazon"], "pattern": "Prefix Sum + Hashing"},
        ],
        "hard": [
            {"id": 30, "title": "Substring with Concatenation of All Words", "slug": "substring-with-concatenation-of-all-words", "companies": ["Amazon", "Google"], "pattern": "Sliding Window"},
        ],
    },
    "03-two-pointers": {
        "name": "Two Pointers",
        "easy": [
            {"id": 125, "title": "Valid Palindrome", "slug": "valid-palindrome", "companies": ["Meta", "Amazon"], "pattern": "Two Pointers"},
            {"id": 344, "title": "Reverse String", "slug": "reverse-string", "companies": ["Amazon"], "pattern": "Two Pointers"},
            {"id": 167, "title": "Two Sum II - Input Array Is Sorted", "slug": "two-sum-ii-input-array-is-sorted", "companies": ["Amazon"], "pattern": "Two Pointers"},
        ],
        "medium": [
            {"id": 15, "title": "3Sum", "slug": "3sum", "companies": ["Amazon", "Meta", "Microsoft"], "pattern": "Two Pointers"},
            {"id": 11, "title": "Container With Most Water", "slug": "container-with-most-water", "companies": ["Amazon", "Google"], "pattern": "Two Pointers"},
            {"id": 75, "title": "Sort Colors", "slug": "sort-colors", "companies": ["Amazon", "Microsoft"], "pattern": "Three Pointers"},
        ],
        "hard": [
            {"id": 42, "title": "Trapping Rain Water", "slug": "trapping-rain-water", "companies": ["Google", "Amazon"], "pattern": "Two Pointers"},
        ],
    },
    "04-sliding-window": {
        "name": "Sliding Window",
        "easy": [
            {"id": 643, "title": "Maximum Average Subarray I", "slug": "maximum-average-subarray-i", "companies": ["Amazon"], "pattern": "Sliding Window"},
        ],
        "medium": [
            {"id": 3, "title": "Longest Substring Without Repeating Characters", "slug": "longest-substring-without-repeating-characters", "companies": ["Amazon", "Google", "Meta"], "pattern": "Sliding Window"},
            {"id": 424, "title": "Longest Repeating Character Replacement", "slug": "longest-repeating-character-replacement", "companies": ["Google"], "pattern": "Sliding Window"},
            {"id": 567, "title": "Permutation in String", "slug": "permutation-in-string", "companies": ["Microsoft"], "pattern": "Sliding Window"},
            {"id": 438, "title": "Find All Anagrams in a String", "slug": "find-all-anagrams-in-a-string", "companies": ["Amazon", "Meta"], "pattern": "Sliding Window"},
            {"id": 1004, "title": "Max Consecutive Ones III", "slug": "max-consecutive-ones-iii", "companies": ["Amazon"], "pattern": "Sliding Window"},
        ],
        "hard": [
            {"id": 76, "title": "Minimum Window Substring", "slug": "minimum-window-substring", "companies": ["Meta", "Amazon", "Microsoft"], "pattern": "Sliding Window"},
            {"id": 239, "title": "Sliding Window Maximum", "slug": "sliding-window-maximum", "companies": ["Amazon", "Google", "Meta"], "pattern": "Sliding Window + Deque"},
        ],
    },
    "05-prefix-sum": {
        "name": "Prefix Sum",
        "easy": [
            {"id": 303, "title": "Range Sum Query - Immutable", "slug": "range-sum-query-immutable", "companies": ["Amazon"], "pattern": "Prefix Sum"},
        ],
        "medium": [
            {"id": 560, "title": "Subarray Sum Equals K", "slug": "subarray-sum-equals-k", "companies": ["Amazon", "Google"], "pattern": "Prefix Sum + Hashing"},
            {"id": 523, "title": "Continuous Subarray Sum", "slug": "continuous-subarray-sum", "companies": ["Amazon"], "pattern": "Prefix Sum + Mod"},
            {"id": 974, "title": "Subarray Sums Divisible by K", "slug": "subarray-sums-divisible-by-k", "companies": ["Amazon"], "pattern": "Prefix Sum + Hashing"},
        ],
        "hard": [
            {"id": 1074, "title": "Number of Submatrices That Sum to Target", "slug": "number-of-submatrices-that-sum-to-target", "companies": ["Google"], "pattern": "2D Prefix Sum"},
        ],
    },
    "06-binary-search": {
        "name": "Binary Search",
        "easy": [
            {"id": 704, "title": "Binary Search", "slug": "binary-search", "companies": ["Amazon"], "pattern": "Binary Search"},
            {"id": 35, "title": "Search Insert Position", "slug": "search-insert-position", "companies": ["Amazon", "Microsoft"], "pattern": "Binary Search"},
        ],
        "medium": [
            {"id": 33, "title": "Search in Rotated Sorted Array", "slug": "search-in-rotated-sorted-array", "companies": ["Amazon", "Microsoft"], "pattern": "Modified Binary Search"},
            {"id": 74, "title": "Search a 2D Matrix", "slug": "search-a-2d-matrix", "companies": ["Amazon"], "pattern": "Binary Search"},
            {"id": 153, "title": "Find Minimum in Rotated Sorted Array", "slug": "find-minimum-in-rotated-sorted-array", "companies": ["Amazon", "Microsoft"], "pattern": "Modified Binary Search"},
        ],
        "hard": [
            {"id": 4, "title": "Median of Two Sorted Arrays", "slug": "median-of-two-sorted-arrays", "companies": ["Google", "Amazon"], "pattern": "Binary Search"},
        ],
    },
    "07-binary-search-on-answer": {
        "name": "Binary Search on Answer",
        "easy": [],
        "medium": [
            {"id": 875, "title": "Koko Eating Bananas", "slug": "koko-eating-bananas", "companies": ["Google", "Amazon"], "pattern": "Binary Search on Answer"},
            {"id": 1011, "title": "Capacity To Ship Packages Within D Days", "slug": "capacity-to-ship-packages-within-d-days", "companies": ["Amazon"], "pattern": "Binary Search on Answer"},
            {"id": 1482, "title": "Minimum Number of Days to Make m Bouquets", "slug": "minimum-number-of-days-to-make-m-bouquets", "companies": ["Amazon"], "pattern": "Binary Search on Answer"},
        ],
        "hard": [
            {"id": 410, "title": "Split Array Largest Sum", "slug": "split-array-largest-sum", "companies": ["Google", "Amazon"], "pattern": "Binary Search on Answer"},
        ],
    },
    "08-linked-list": {
        "name": "Linked List",
        "easy": [
            {"id": 206, "title": "Reverse Linked List", "slug": "reverse-linked-list", "companies": ["Amazon", "Microsoft"], "pattern": "Linked List"},
            {"id": 21, "title": "Merge Two Sorted Lists", "slug": "merge-two-sorted-lists", "companies": ["Amazon", "Microsoft"], "pattern": "Linked List"},
            {"id": 141, "title": "Linked List Cycle", "slug": "linked-list-cycle", "companies": ["Amazon"], "pattern": "Fast-Slow Pointers"},
        ],
        "medium": [
            {"id": 19, "title": "Remove Nth Node From End of List", "slug": "remove-nth-node-from-end-of-list", "companies": ["Amazon", "Meta"], "pattern": "Two Pointers"},
            {"id": 143, "title": "Reorder List", "slug": "reorder-list", "companies": ["Amazon", "Meta"], "pattern": "Linked List"},
            {"id": 2, "title": "Add Two Numbers", "slug": "add-two-numbers", "companies": ["Amazon", "Meta"], "pattern": "Linked List"},
            {"id": 138, "title": "Copy List with Random Pointer", "slug": "copy-list-with-random-pointer", "companies": ["Amazon", "Meta"], "pattern": "Hashing"},
        ],
        "hard": [
            {"id": 23, "title": "Merge k Sorted Lists", "slug": "merge-k-sorted-lists", "companies": ["Amazon", "Google", "Meta"], "pattern": "Heap/Divide and Conquer"},
        ],
    },
    "09-stack": {
        "name": "Stack",
        "easy": [
            {"id": 20, "title": "Valid Parentheses", "slug": "valid-parentheses", "companies": ["Amazon", "Meta"], "pattern": "Stack"},
            {"id": 225, "title": "Implement Stack using Queues", "slug": "implement-stack-using-queues", "companies": ["Amazon"], "pattern": "Design"},
        ],
        "medium": [
            {"id": 150, "title": "Evaluate Reverse Polish Notation", "slug": "evaluate-reverse-polish-notation", "companies": ["Amazon"], "pattern": "Stack"},
            {"id": 394, "title": "Decode String", "slug": "decode-string", "companies": ["Amazon", "Google"], "pattern": "Stack"},
        ],
        "hard": [
            {"id": 84, "title": "Largest Rectangle in Histogram", "slug": "largest-rectangle-in-histogram", "companies": ["Google", "Amazon"], "pattern": "Monotonic Stack"},
        ],
    },
    "10-monotonic-stack": {
        "name": "Monotonic Stack",
        "easy": [],
        "medium": [
            {"id": 739, "title": "Daily Temperatures", "slug": "daily-temperatures", "companies": ["Amazon", "Google"], "pattern": "Monotonic Stack"},
            {"id": 901, "title": "Online Stock Span", "slug": "online-stock-span", "companies": ["Amazon"], "pattern": "Monotonic Stack"},
        ],
        "hard": [
            {"id": 84, "title": "Largest Rectangle in Histogram", "slug": "largest-rectangle-in-histogram", "companies": ["Google", "Amazon"], "pattern": "Monotonic Stack"},
            {"id": 42, "title": "Trapping Rain Water", "slug": "trapping-rain-water", "companies": ["Google", "Amazon"], "pattern": "Monotonic Stack"},
        ],
    },
    "11-queue": {
        "name": "Queue",
        "easy": [
            {"id": 232, "title": "Implement Queue using Stacks", "slug": "implement-queue-using-stacks", "companies": ["Amazon"], "pattern": "Design"},
        ],
        "medium": [
            {"id": 622, "title": "Design Circular Queue", "slug": "design-circular-queue", "companies": ["Amazon"], "pattern": "Design"},
        ],
        "hard": [],
    },
    "12-heap": {
        "name": "Heap / Priority Queue",
        "easy": [
            {"id": 1046, "title": "Last Stone Weight", "slug": "last-stone-weight", "companies": ["Amazon"], "pattern": "Heap"},
        ],
        "medium": [
            {"id": 215, "title": "Kth Largest Element in an Array", "slug": "kth-largest-element-in-an-array", "companies": ["Amazon", "Meta"], "pattern": "Heap"},
            {"id": 973, "title": "K Closest Points to Origin", "slug": "k-closest-points-to-origin", "companies": ["Amazon", "Meta"], "pattern": "Heap"},
            {"id": 347, "title": "Top K Frequent Elements", "slug": "top-k-frequent-elements", "companies": ["Amazon", "Meta"], "pattern": "Heap"},
            {"id": 621, "title": "Task Scheduler", "slug": "task-scheduler", "companies": ["Amazon", "Meta"], "pattern": "Heap/Greedy"},
        ],
        "hard": [
            {"id": 295, "title": "Find Median from Data Stream", "slug": "find-median-from-data-stream", "companies": ["Amazon", "Google", "Meta"], "pattern": "Heap"},
        ],
    },
    "13-tree": {
        "name": "Trees",
        "easy": [
            {"id": 104, "title": "Maximum Depth of Binary Tree", "slug": "maximum-depth-of-binary-tree", "companies": ["Amazon"], "pattern": "DFS"},
            {"id": 100, "title": "Same Tree", "slug": "same-tree", "companies": ["Amazon"], "pattern": "DFS"},
            {"id": 226, "title": "Invert Binary Tree", "slug": "invert-binary-tree", "companies": ["Amazon", "Google"], "pattern": "DFS"},
        ],
        "medium": [
            {"id": 102, "title": "Binary Tree Level Order Traversal", "slug": "binary-tree-level-order-traversal", "companies": ["Amazon", "Meta"], "pattern": "BFS"},
            {"id": 199, "title": "Binary Tree Right Side View", "slug": "binary-tree-right-side-view", "companies": ["Amazon", "Meta"], "pattern": "BFS/DFS"},
            {"id": 236, "title": "Lowest Common Ancestor of a Binary Tree", "slug": "lowest-common-ancestor-of-a-binary-tree", "companies": ["Amazon", "Google", "Meta"], "pattern": "DFS"},
            {"id": 230, "title": "Kth Smallest Element in a BST", "slug": "kth-smallest-element-in-a-bst", "companies": ["Amazon"], "pattern": "DFS/Inorder"},
        ],
        "hard": [
            {"id": 124, "title": "Binary Tree Maximum Path Sum", "slug": "binary-tree-maximum-path-sum", "companies": ["Google", "Meta"], "pattern": "DFS"},
        ],
    },
    "14-bst": {
        "name": "Binary Search Tree",
        "easy": [
            {"id": 700, "title": "Search in a Binary Search Tree", "slug": "search-in-a-binary-search-tree", "companies": ["Amazon"], "pattern": "BST"},
        ],
        "medium": [
            {"id": 98, "title": "Validate Binary Search Tree", "slug": "validate-binary-search-tree", "companies": ["Amazon", "Google"], "pattern": "DFS"},
            {"id": 230, "title": "Kth Smallest Element in a BST", "slug": "kth-smallest-element-in-a-bst", "companies": ["Amazon"], "pattern": "DFS/Inorder"},
        ],
        "hard": [
            {"id": 99, "title": "Recover Binary Search Tree", "slug": "recover-binary-search-tree", "companies": ["Google"], "pattern": "DFS"},
        ],
    },
    "15-dfs": {
        "name": "DFS (Depth-First Search)",
        "easy": [],
        "medium": [
            {"id": 200, "title": "Number of Islands", "slug": "number-of-islands", "companies": ["Amazon", "Google", "Meta"], "pattern": "DFS/BFS"},
            {"id": 695, "title": "Max Area of Island", "slug": "max-area-of-island", "companies": ["Amazon"], "pattern": "DFS"},
            {"id": 130, "title": "Surrounded Regions", "slug": "surrounded-regions", "companies": ["Amazon"], "pattern": "DFS/BFS"},
        ],
        "hard": [
            {"id": 329, "title": "Longest Increasing Path in a Matrix", "slug": "longest-increasing-path-in-a-matrix", "companies": ["Google", "Amazon"], "pattern": "DFS + Memoization"},
        ],
    },
    "16-bfs": {
        "name": "BFS (Breadth-First Search)",
        "easy": [],
        "medium": [
            {"id": 102, "title": "Binary Tree Level Order Traversal", "slug": "binary-tree-level-order-traversal", "companies": ["Amazon", "Meta"], "pattern": "BFS"},
            {"id": 994, "title": "Rotting Oranges", "slug": "rotting-oranges", "companies": ["Amazon", "Google"], "pattern": "BFS"},
            {"id": 286, "title": "Walls and Gates", "slug": "walls-and-gates", "companies": ["Meta", "Amazon"], "pattern": "BFS"},
        ],
        "hard": [
            {"id": 127, "title": "Word Ladder", "slug": "word-ladder", "companies": ["Amazon", "Google", "Meta"], "pattern": "BFS"},
        ],
    },
    "17-backtracking": {
        "name": "Backtracking",
        "easy": [],
        "medium": [
            {"id": 78, "title": "Subsets", "slug": "subsets", "companies": ["Amazon", "Google"], "pattern": "Backtracking"},
            {"id": 46, "title": "Permutations", "slug": "permutations", "companies": ["Amazon", "Meta"], "pattern": "Backtracking"},
            {"id": 39, "title": "Combination Sum", "slug": "combination-sum", "companies": ["Amazon", "Google"], "pattern": "Backtracking"},
            {"id": 131, "title": "Palindrome Partitioning", "slug": "palindrome-partitioning", "companies": ["Amazon"], "pattern": "Backtracking"},
        ],
        "hard": [
            {"id": 51, "title": "N-Queens", "slug": "n-queens", "companies": ["Amazon", "Google", "Meta"], "pattern": "Backtracking"},
            {"id": 37, "title": "Sudoku Solver", "slug": "sudoku-solver", "companies": ["Amazon"], "pattern": "Backtracking"},
        ],
    },
    "18-graph": {
        "name": "Graphs",
        "easy": [],
        "medium": [
            {"id": 207, "title": "Course Schedule", "slug": "course-schedule", "companies": ["Amazon", "Google", "Meta"], "pattern": "Topological Sort"},
            {"id": 210, "title": "Course Schedule II", "slug": "course-schedule-ii", "companies": ["Amazon", "Google"], "pattern": "Topological Sort"},
            {"id": 133, "title": "Clone Graph", "slug": "clone-graph", "companies": ["Amazon", "Meta"], "pattern": "DFS/BFS"},
            {"id": 684, "title": "Redundant Connection", "slug": "redundant-connection", "companies": ["Amazon"], "pattern": "Union Find"},
        ],
        "hard": [
            {"id": 269, "title": "Alien Dictionary", "slug": "alien-dictionary", "companies": ["Amazon", "Google", "Meta"], "pattern": "Topological Sort"},
        ],
    },
    "19-dijkstra": {
        "name": "Dijkstra's Algorithm",
        "easy": [],
        "medium": [
            {"id": 743, "title": "Network Delay Time", "slug": "network-delay-time", "companies": ["Amazon", "Google"], "pattern": "Dijkstra"},
        ],
        "hard": [
            {"id": 778, "title": "Swim in Rising Water", "slug": "swim-in-rising-water", "companies": ["Google"], "pattern": "Dijkstra/Binary Search"},
            {"id": 1631, "title": "Path With Minimum Effort", "slug": "path-with-minimum-effort", "companies": ["Amazon"], "pattern": "Dijkstra/Binary Search"},
        ],
    },
    "20-union-find": {
        "name": "Union Find (DSU)",
        "easy": [],
        "medium": [
            {"id": 547, "title": "Number of Provinces", "slug": "number-of-provinces", "companies": ["Amazon", "Google"], "pattern": "Union Find"},
            {"id": 684, "title": "Redundant Connection", "slug": "redundant-connection", "companies": ["Amazon"], "pattern": "Union Find"},
        ],
        "hard": [
            {"id": 305, "title": "Number of Islands II", "slug": "number-of-islands-ii", "companies": ["Google", "Amazon"], "pattern": "Union Find"},
        ],
    },
    "21-topological-sort": {
        "name": "Topological Sort",
        "easy": [],
        "medium": [
            {"id": 207, "title": "Course Schedule", "slug": "course-schedule", "companies": ["Amazon", "Google"], "pattern": "Topological Sort"},
            {"id": 210, "title": "Course Schedule II", "slug": "course-schedule-ii", "companies": ["Amazon", "Google"], "pattern": "Topological Sort"},
        ],
        "hard": [
            {"id": 269, "title": "Alien Dictionary", "slug": "alien-dictionary", "companies": ["Amazon", "Google"], "pattern": "Topological Sort"},
        ],
    },
    "22-greedy": {
        "name": "Greedy Algorithms",
        "easy": [
            {"id": 121, "title": "Best Time to Buy and Sell Stock", "slug": "best-time-to-buy-and-sell-stock", "companies": ["Amazon", "Google"], "pattern": "Greedy"},
        ],
        "medium": [
            {"id": 55, "title": "Jump Game", "slug": "jump-game", "companies": ["Amazon", "Google"], "pattern": "Greedy"},
            {"id": 45, "title": "Jump Game II", "slug": "jump-game-ii", "companies": ["Amazon", "Google"], "pattern": "Greedy"},
            {"id": 134, "title": "Gas Station", "slug": "gas-station", "companies": ["Amazon"], "pattern": "Greedy"},
        ],
        "hard": [
            {"id": 135, "title": "Candy", "slug": "candy", "companies": ["Amazon"], "pattern": "Greedy"},
        ],
    },
    "23-dp-1d": {
        "name": "Dynamic Programming (1D)",
        "easy": [
            {"id": 70, "title": "Climbing Stairs", "slug": "climbing-stairs", "companies": ["Amazon"], "pattern": "DP"},
        ],
        "medium": [
            {"id": 198, "title": "House Robber", "slug": "house-robber", "companies": ["Amazon", "Google"], "pattern": "DP"},
            {"id": 322, "title": "Coin Change", "slug": "coin-change", "companies": ["Amazon", "Google", "Meta"], "pattern": "DP"},
            {"id": 300, "title": "Longest Increasing Subsequence", "slug": "longest-increasing-subsequence", "companies": ["Amazon", "Google", "Meta"], "pattern": "DP"},
        ],
        "hard": [
            {"id": 72, "title": "Edit Distance", "slug": "edit-distance", "companies": ["Amazon", "Google"], "pattern": "DP"},
        ],
    },
    "24-dp-2d": {
        "name": "Dynamic Programming (2D)",
        "easy": [],
        "medium": [
            {"id": 62, "title": "Unique Paths", "slug": "unique-paths", "companies": ["Amazon"], "pattern": "DP"},
            {"id": 1143, "title": "Longest Common Subsequence", "slug": "longest-common-subsequence", "companies": ["Amazon", "Google"], "pattern": "DP"},
        ],
        "hard": [
            {"id": 312, "title": "Burst Balloons", "slug": "burst-balloons", "companies": ["Google", "Amazon"], "pattern": "DP"},
            {"id": 10, "title": "Regular Expression Matching", "slug": "regular-expression-matching", "companies": ["Amazon", "Google"], "pattern": "DP"},
        ],
    },
    "25-bit-manipulation": {
        "name": "Bit Manipulation",
        "easy": [
            {"id": 136, "title": "Single Number", "slug": "single-number", "companies": ["Amazon"], "pattern": "XOR"},
            {"id": 191, "title": "Number of 1 Bits", "slug": "number-of-1-bits", "companies": ["Amazon"], "pattern": "Bit Manipulation"},
        ],
        "medium": [
            {"id": 371, "title": "Sum of Two Integers", "slug": "sum-of-two-integers", "companies": ["Amazon"], "pattern": "Bit Manipulation"},
        ],
        "hard": [
            {"id": 137, "title": "Single Number II", "slug": "single-number-ii", "companies": ["Amazon"], "pattern": "Bit Manipulation"},
        ],
    },
    "26-trie": {
        "name": "Trie",
        "easy": [],
        "medium": [
            {"id": 208, "title": "Implement Trie (Prefix Tree)", "slug": "implement-trie-prefix-tree", "companies": ["Amazon", "Google"], "pattern": "Trie"},
            {"id": 211, "title": "Design Add and Search Words Data Structure", "slug": "design-add-and-search-words-data-structure", "companies": ["Amazon", "Meta"], "pattern": "Trie/DFS"},
        ],
        "hard": [
            {"id": 212, "title": "Word Search II", "slug": "word-search-ii", "companies": ["Amazon"], "pattern": "Trie/Backtracking"},
        ],
    },
    "27-segment-tree": {
        "name": "Segment Tree",
        "easy": [],
        "medium": [
            {"id": 307, "title": "Range Sum Query - Mutable", "slug": "range-sum-query-mutable", "companies": ["Amazon"], "pattern": "Segment Tree/Fenwick Tree"},
        ],
        "hard": [
            {"id": 315, "title": "Count of Smaller Numbers After Self", "slug": "count-of-smaller-numbers-after-self", "companies": ["Amazon"], "pattern": "Segment Tree"},
        ],
    },
    "28-intervals": {
        "name": "Intervals",
        "easy": [],
        "medium": [
            {"id": 56, "title": "Merge Intervals", "slug": "merge-intervals", "companies": ["Google", "Meta"], "pattern": "Intervals"},
            {"id": 57, "title": "Insert Interval", "slug": "insert-interval", "companies": ["Google", "Meta"], "pattern": "Intervals"},
            {"id": 435, "title": "Non-overlapping Intervals", "slug": "non-overlapping-intervals", "companies": ["Amazon"], "pattern": "Greedy/Intervals"},
        ],
        "hard": [
            {"id": 759, "title": "Employee Free Time", "slug": "employee-free-time", "companies": ["Google", "Amazon"], "pattern": "Intervals"},
        ],
    },
    "29-matrix": {
        "name": "Matrix",
        "easy": [
            {"id": 733, "title": "Flood Fill", "slug": "flood-fill", "companies": ["Amazon"], "pattern": "DFS/BFS"},
        ],
        "medium": [
            {"id": 54, "title": "Spiral Matrix", "slug": "spiral-matrix", "companies": ["Amazon", "Microsoft"], "pattern": "Matrix"},
            {"id": 48, "title": "Rotate Image", "slug": "rotate-image", "companies": ["Amazon", "Microsoft"], "pattern": "Matrix"},
            {"id": 73, "title": "Set Matrix Zeroes", "slug": "set-matrix-zeroes", "companies": ["Amazon", "Microsoft"], "pattern": "Matrix"},
        ],
        "hard": [
            {"id": 37, "title": "Sudoku Solver", "slug": "sudoku-solver", "companies": ["Amazon"], "pattern": "Backtracking"},
        ],
    },
}

def generate_problem_section(problem, difficulty, category_name):
    """Generate the 23-section analysis for a problem"""
    
    leetcode_id = problem["id"]
    title = problem["title"]
    companies = ", ".join(problem["companies"])
    pattern = problem["pattern"]
    
    return f"""# {title} - Complete DSA Mastery Guide

---

## 1. PROBLEM OVERVIEW

| Field | Value |
|-------|-------|
| **Problem Name** | {title} |
| **LeetCode Number** | #{leetcode_id} |
| **Difficulty** | {difficulty.title()} |
| **Pattern** | {pattern} |
| **Tags** | {category_name}, {pattern} |
| **Companies** | {companies} |
| **Estimated Interview Time** | {"10-15" if difficulty == "easy" else "15-20" if difficulty == "medium" else "25-35"} minutes |

---

## 2. SIMPLE ENGLISH EXPLANATION

**What is the interviewer asking?**

[Explain the problem in simple, beginner-friendly language]

**What is the actual task?**

- Input: [Describe input]
- Output: [Describe output]

**Real-world example:**

[Provide a relatable real-world analogy]

---

## 3. REAL LIFE ANALOGY

[Provide a practical, everyday analogy that makes the concept click]

---

## 4. PATTERN RECOGNITION SIGNALS

### Pattern: {pattern}

**When to identify this pattern:**

| Signal | Keyword |
|--------|---------|
| [Signal 1] | [Keyword 1] |
| [Signal 2] | [Keyword 2] |
| [Signal 3] | [Keyword 3] |

**Decision Tree:**

```
[Decision tree for identifying when to use this pattern]
```

---

## 5. VISUALIZATION

**Input:**
```
[Show example input]
```

**Step-by-step:**
```
[Show step-by-step visualization]
```

---

## 6. BRUTE FORCE THINKING

### Thought Process
[Explain the brute force approach]

### Pseudocode
```
[Pseudocode for brute force]
```

### Complexity
| Metric | Value |
|--------|-------|
| **Time** | O(N²) |
| **Space** | O(1) |

---

## 7. WHY BRUTE FORCE FAILS

### Performance Issues

| Input Size | Operations | Result |
|------------|------------|--------|
| [Size] | [Ops] | [Result] |

### Why Interviewer Rejects It
1. [Reason 1]
2. [Reason 2]
3. [Reason 3]

---

## 8. OPTIMIZATION THINKING

### Key Observation
[What observation leads to optimization]

### The Insight
[The key insight for the optimal solution]

### Optimization Steps
1. [Step 1]
2. [Step 2]
3. [Step 3]

---

## 9. OPTIMAL APPROACH

### Algorithm
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Pseudocode
```
[Optimal pseudocode]
```

### Complexity
| Metric | Value |
|--------|-------|
| **Time** | O(N) |
| **Space** | O(1) |

---

## 10. DRY RUN

**Input:** [Example input]

### Iteration 1
```
[State after iteration 1]
```

### Iteration 2
```
[State after iteration 2]
```

[Continue for all iterations]

### Final Result
```
[Final result]
```

---

## 11. JAVA SOLUTION

```java
[Complete Java solution]
```

### Line-by-line Explanation
| Line | Purpose |
|------|---------|
| [Line] | [Purpose] |

### Complexity
| Metric | Value |
|--------|-------|
| **Time** | [Time] |
| **Space** | [Space] |

---

## 12. PYTHON SOLUTION

```python
[Complete Python solution]
```

### Line-by-line Explanation
| Line | Purpose |
|------|---------|
| [Line] | [Purpose] |

### Complexity
| Metric | Value |
|--------|-------|
| **Time** | [Time] |
| **Space** | [Space] |

---

## 13. C++ SOLUTION

```cpp
[Complete C++ solution]
```

### Line-by-line Explanation
| Line | Purpose |
|------|---------|
| [Line] | [Purpose] |

### Complexity
| Metric | Value |
|--------|-------|
| **Time** | [Time] |
| **Space** | [Space] |

---

## 14. ALTERNATIVE SOLUTIONS

### Approach 1: [Name]
```java
[Code]
```

### Approach 2: [Name]
```java
[Code]
```

### Complexity Comparison

| Approach | Time | Space | Notes |
|----------|------|-------|-------|
| Brute Force | O(N²) | O(1) | Simple but slow |
| [Optimal] | O(N) | O(1) | **Optimal** |

---

## 15. INTERVIEWER FOLLOW UPS

### Common Follow-up Questions

**Q1:** [Question]
**A:** [Answer]

**Q2:** [Question]
**A:** [Answer]

**Q3:** [Question]
**A:** [Answer]

---

## 16. EDGE CASES

| Edge Case | Input | Expected Output |
|-----------|-------|-----------------|
| [Case 1] | [Input] | [Output] |
| [Case 2] | [Input] | [Output] |
| [Case 3] | [Input] | [Output] |

---

## 17. COMMON MISTAKES

### Mistake 1: [Name]
```java
// WRONG
[Wrong code]

// CORRECT
[Correct code]
```

### Mistake 2: [Name]
[Explanation]

---

## 18. TEMPLATE EXTRACTION

### {pattern} Template

```java
// Generic Template for [Pattern Name]
public [ReturnType] template([Params]) {{
    [Template code]
}}
```

### When to Use This Template
- [Use case 1]
- [Use case 2]
- [Use case 3]

---

## 19. RELATED PROBLEMS

### Same Pattern ({pattern})

| Difficulty | Problem | LeetCode # |
|------------|---------|------------|
| [Diff] | [Problem] | #[Number] |

### Progression Path
```
[Problem 1] → [Problem 2] → [Problem 3]
```

---

## 20. REVISION NOTES

### 30-Second Revision

```
{title.upper()}

1. [Key point 1]
2. [Key point 2]
3. [Key point 3]

Time: [Time] | Space: [Space]
```

### Key Keywords
- [Keyword 1]
- [Keyword 2]
- [Keyword 3]

### Pattern Recognition
- [Pattern 1] = **[Solution 1]**
- [Pattern 2] = **[Solution 2]**

---

## 21. MOCK INTERVIEW MODE

### Interviewer Questions

**Q1:** "Can you explain the problem?"

**Expected Answer:** [Answer]

**Q2:** "What's your approach?"

**Expected Answer:** [Answer]

**Q3:** "Time and space complexity?"

**Expected Answer:** [Answer]

### Evaluation Criteria
- [ ] Correctly identified pattern
- [ ] Chose optimal approach
- [ ] Handled edge cases
- [ ] Code is clean

---

## 22. COMPANY FREQUENCY

| Company | Frequency | Difficulty | Notes |
|---------|-----------|------------|-------|
| Amazon | [Freq] | [Diff] | [Notes] |
| Google | [Freq] | [Diff] | [Notes] |
| Meta | [Freq] | [Diff] | [Notes] |

---

## 23. PROGRESSION PATH

### Next Easy Problems
- [Problem 1]
- [Problem 2]

### Next Medium Problems
- [Problem 1]
- [Problem 2]

### Next Hard Problems
- [Problem 1]
- [Problem 2]

### Pattern Mastery Path
```
[Problem 1] → [Problem 2] → [Problem 3]
```

---

## SUMMARY

| Metric | Value |
|--------|-------|
| **Pattern** | {pattern} |
| **Optimal Time** | [Time] |
| **Optimal Space** | [Space] |
| **Key Insight** | [Key insight] |
| **Template** | [Template name] |

**Remember:** [Key takeaway for this problem]
"""

def main():
    """Generate all problem files"""
    
    base_path = Path("E:/InterView Ai/dsa-mastery-hub")
    
    total_problems = 0
    generated_problems = []
    
    for category_key, category_data in PROBLEMS.items():
        category_name = category_data["name"]
        
        # Create category directory if it doesn't exist
        category_path = base_path / category_key
        category_path.mkdir(parents=True, exist_ok=True)
        
        # Process each difficulty level
        for difficulty in ["easy", "medium", "hard"]:
            problems = category_data.get(difficulty, [])
            
            for problem in problems:
                total_problems += 1
                
                # Generate filename
                filename = f"{problem['id']:04d}-{problem['slug']}.md"
                filepath = category_path / filename
                
                # Generate problem content
                content = generate_problem_section(problem, difficulty, category_name)
                
                # Write file
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                generated_problems.append({
                    "id": problem['id'],
                    "title": problem['title'],
                    "category": category_name,
                    "difficulty": difficulty,
                    "file": str(filepath.relative_to(base_path))
                })
                
                print(f"Generated: {filename}")
    
    # Generate summary
    print(f"\n{'='*60}")
    print(f"Total problems generated: {total_problems}")
    print(f"{'='*60}\n")
    
    # Generate master summary file
    summary_path = base_path / "GENERATED-PROBLEMS.md"
    with open(summary_path, 'w', encoding='utf-8') as f:
        f.write("# Generated Problems Summary\n\n")
        f.write(f"Total Problems: {total_problems}\n\n")
        
        current_category = ""
        for prob in generated_problems:
            if prob["category"] != current_category:
                current_category = prob["category"]
                f.write(f"\n## {current_category}\n\n")
                f.write("| # | Problem | Difficulty | File |\n")
                f.write("|---|---------|------------|------|\n")
            
            f.write(f"| {prob['id']} | {prob['title']} | {prob['difficulty'].title()} | `{prob['file']}` |\n")
    
    print(f"Summary written to: {summary_path}")

if __name__ == "__main__":
    main()
