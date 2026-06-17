# Two Sum - Complete DSA Mastery Guide

---

## 1. PROBLEM OVERVIEW

| Field | Value |
|-------|-------|
| **Problem Name** | Two Sum |
| **LeetCode Number** | #1 |
| **Difficulty** | Easy |
| **Pattern** | Hashing |
| **Tags** | Array, Hash Table |
| **Companies** | Amazon, Google, Meta, Microsoft, Apple, Uber |
| **Frequency** | Very High (Asked 500+ times) |
| **Estimated Interview Time** | 10-15 minutes |

---

## 2. SIMPLE ENGLISH EXPLANATION

**What is the interviewer asking?**

You are given a list of numbers and a target number. You need to find TWO numbers in the list that add up to the target. Return the positions (indices) of those two numbers.

**What is the actual task?**

- Input: An array of numbers and a target sum
- Output: Indices of the two numbers that add up to the target

**Real-world example:**

Think of it like this:
- You have ₹100 to spend
- You want to buy exactly 2 items
- Find which 2 items cost exactly ₹100 total
- Tell me their shelf positions

---

## 3. REAL LIFE ANALOGY

**Scenario: Finding a pair in a crowd**

Imagine you are at a party. Someone tells you:
> "Find two people whose ages add up to exactly 30."

**Bad approach:** Check every pair of people (slow)

**Good approach:** 
- As you meet each person, remember their age
- When you meet someone, check if you already met someone whose age + their age = 30
- If yes, you found the pair!

**That's exactly what HashMap does** - it remembers what you've seen before.

---

## 4. PATTERN RECOGNITION SIGNALS

### Pattern: Hashing

**When to identify this pattern:**

| Signal | Keyword |
|--------|---------|
| Find pairs | "Two numbers", "pair" |
| Sum/Target | "sum equals", "target" |
| Lookup needed | "Find complement", "check existence" |
| O(1) access needed | "Quick lookup", "instant check" |

**Decision Tree:**

```
Is the array sorted?
├── YES → Use Two Pointers
└── NO → Is order important?
    ├── YES → Use HashMap
    └── NO → Use Two Pointers (after sorting)
```

**Keywords that trigger Hashing:**
- "Two Sum"
- "Pair with given sum"
- "Find complement"
- "Frequency counting"
- "Duplicate detection"

---

## 5. VISUALIZATION

**Input:**
```
Array:  [2, 7, 11, 15]
Target: 9
```

**Step-by-step:**

```
Iteration 1: i = 0
├── Current = 2
├── Need = 9 - 2 = 7
├── Map = {} → 7 not found
├── Store: Map = {2: 0}
└── Continue...

Iteration 2: i = 1
├── Current = 7
├── Need = 9 - 7 = 2
├── Map = {2: 0} → 2 FOUND at index 0!
├── Return [0, 1]
└── DONE!
```

**Visual:**
```
Index:    0   1   2   3
Array:  [ 2,  7, 11, 15]
         ↑
         │ (store 2)
         │
         └──→ Need = 7
         
         7 is at index 1 ✓
         
Answer: [0, 1]
```

---

## 6. BRUTE FORCE THINKING

### Thought Process
Try every possible pair and check if their sum equals the target.

### Pseudocode
```
for i = 0 to n-1:
    for j = i+1 to n-1:
        if arr[i] + arr[j] == target:
            return [i, j]
return []
```

### Java Pseudocode
```java
for (int i = 0; i < nums.length; i++) {
    for (int j = i + 1; j < nums.length; j++) {
        if (nums[i] + nums[j] == target) {
            return new int[]{i, j};
        }
    }
}
```

### Complexity
| Metric | Value |
|--------|-------|
| **Time** | O(N²) |
| **Space** | O(1) |

---

## 7. WHY BRUTE FORCE FAILS

### Performance Issues

| Input Size | Time | Result |
|------------|------|--------|
| 10 elements | 100 operations | Fast |
| 100 elements | 10,000 operations | OK |
| 10,000 elements | 100,000,000 operations | Slow |
| 100,000 elements | 10,000,000,000 operations | **Time Limit Exceeded** |

### Why Interviewer Rejects It

1. **Time Limit Exceeded** on large inputs
2. **Doesn't scale** - O(N²) is unacceptable for N > 10^4
3. **Not optimal** - Better solution exists with O(N)
4. **Shows lack of pattern knowledge** - Hashing is the standard approach

---

## 8. OPTIMIZATION THINKING

### Key Observation
Instead of checking every pair, we can **remember** numbers we've seen.

### The Insight
- For each number `x`, we need `target - x`
- If we've seen `target - x` before, we have our answer
- HashMap gives O(1) lookup

### Optimization Steps
1. Create empty HashMap
2. For each number:
   - Calculate complement = target - current
   - Check if complement exists in HashMap
   - If yes → return indices
   - If no → store current number with its index
3. Return empty if no solution

---

## 9. OPTIMAL APPROACH

### Algorithm
1. Initialize empty HashMap
2. Iterate through array once
3. For each element:
   - Calculate complement = target - nums[i]
   - If complement exists in map, return [map[complement], i]
   - Otherwise, store nums[i] → i in map
4. Return empty array (no solution found)

### Pseudocode
```
function twoSum(nums, target):
    map = {}
    for i = 0 to n-1:
        complement = target - nums[i]
        if complement in map:
            return [map[complement], i]
        map[nums[i]] = i
    return []
```

### Complexity
| Metric | Value |
|--------|-------|
| **Time** | O(N) |
| **Space** | O(N) |

---

## 10. DRY RUN

**Input:** nums = [2, 7, 11, 15], target = 9

### Iteration 1
```
i = 0
nums[i] = 2
complement = 9 - 2 = 7
map = {}

Check: Is 7 in map? NO
Store: map[2] = 0

State: map = {2: 0}
```

### Iteration 2
```
i = 1
nums[i] = 7
complement = 9 - 7 = 2
map = {2: 0}

Check: Is 2 in map? YES! At index 0
Return: [0, 1]
```

### Final State
```
map = {2: 0}
Answer = [0, 1]
```

---

## 11. JAVA SOLUTION

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        // HashMap to store number -> index
        HashMap<Integer, Integer> map = new HashMap<>();
        
        // Iterate through array
        for (int i = 0; i < nums.length; i++) {
            // Calculate complement
            int complement = target - nums[i];
            
            // Check if complement exists
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            
            // Store current number with index
            map.put(nums[i], i);
        }
        
        // No solution found
        return new int[]{};
    }
}
```

### Line-by-line Explanation
| Line | Purpose |
|------|---------|
| `HashMap<Integer, Integer> map = new HashMap<>();` | Create HashMap for O(1) lookup |
| `for (int i = 0; i < nums.length; i++)` | Iterate through each element |
| `int complement = target - nums[i];` | What number do we need? |
| `if (map.containsKey(complement))` | Check if we've seen it before |
| `return new int[]{map.get(complement), i};` | Found! Return both indices |
| `map.put(nums[i], i);` | Store current number for future |

### Complexity
| Metric | Value |
|--------|-------|
| **Time** | O(N) - Single pass |
| **Space** | O(N) - HashMap storage |

---

## 12. PYTHON SOLUTION

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Dictionary to store number -> index
        num_map = {}
        
        # Iterate through array with index
        for i, num in enumerate(nums):
            # Calculate complement
            complement = target - num
            
            # Check if complement exists
            if complement in num_map:
                return [num_map[complement], i]
            
            # Store current number with index
            num_map[num] = i
        
        # No solution found
        return []
```

### Line-by-line Explanation
| Line | Purpose |
|------|---------|
| `num_map = {}` | Create dictionary for O(1) lookup |
| `for i, num in enumerate(nums):` | Get index and value together |
| `complement = target - num` | What number do we need? |
| `if complement in num_map:` | Check if we've seen it |
| `return [num_map[complement], i]` | Found! Return both indices |
| `num_map[num] = i` | Store current for future |

### Complexity
| Metric | Value |
|--------|-------|
| **Time** | O(N) |
| **Space** | O(N) |

---

## 13. C++ SOLUTION

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // unordered_map for O(1) average lookup
        unordered_map<int, int> numMap;
        
        for (int i = 0; i < nums.size(); i++) {
            // Calculate complement
            int complement = target - nums[i];
            
            // Check if complement exists
            if (numMap.find(complement) != numMap.end()) {
                return {numMap[complement], i};
            }
            
            // Store current number with index
            numMap[nums[i]] = i;
        }
        
        // No solution found
        return {};
    }
};
```

### Line-by-line Explanation
| Line | Purpose |
|------|---------|
| `unordered_map<int, int> numMap;` | Hash map for O(1) lookup |
| `int complement = target - nums[i];` | Calculate needed value |
| `numMap.find(complement) != numMap.end()` | Check existence |
| `return {numMap[complement], i};` | Return result |
| `numMap[nums[i]] = i;` | Store for future |

### Complexity
| Metric | Value |
|--------|-------|
| **Time** | O(N) |
| **Space** | O(N) |

---

## 14. ALTERNATIVE SOLUTIONS

### Approach 1: Brute Force
```java
for (int i = 0; i < nums.length; i++) {
    for (int j = i + 1; j < nums.length; j++) {
        if (nums[i] + nums[j] == target) {
            return new int[]{i, j};
        }
    }
}
```

### Approach 2: Two Pass HashMap
```java
// First pass: store all
for (int i = 0; i < nums.length; i++) {
    map.put(nums[i], i);
}

// Second pass: find complement
for (int i = 0; i < nums.length; i++) {
    int complement = target - nums[i];
    if (map.containsKey(complement) && map.get(complement) != i) {
        return new int[]{i, map.get(complement)};
    }
}
```

### Approach 3: One Pass HashMap (Optimal)
```java
// Same as optimal solution above
```

### Complexity Comparison

| Approach | Time | Space | Notes |
|----------|------|-------|-------|
| Brute Force | O(N²) | O(1) | Simple but slow |
| Two Pass HashMap | O(N) | O(N) | Two iterations |
| One Pass HashMap | O(N) | O(N) | **Optimal** |

---

## 15. INTERVIEWER FOLLOW UPS

### Common Follow-up Questions

**Q1: What if the array is sorted?**
- Use Two Pointers approach
- Time: O(N), Space: O(1)

**Q2: What if there are multiple solutions?**
- Return any one solution
- Or return all solutions (modify to store all)

**Q3: What if the same element cannot be used twice?**
- Current solution already handles this (check index)

**Q4: Can you do it in O(1) space?**
- Yes, if array is sorted (Two Pointers)
- No, if array is unsorted (need HashMap)

**Q5: What if numbers are very large (overflow)?**
- Use long arithmetic for complement calculation

---

## 16. EDGE CASES

| Edge Case | Input | Expected Output |
|-----------|-------|-----------------|
| Empty array | nums=[], target=5 | [] |
| Single element | nums=[5], target=10 | [] |
| No solution | nums=[1,2,3], target=100 | [] |
| Negative numbers | nums=[-1,-2,-3], target=-5 | [1,2] |
| Duplicate values | nums=[3,3], target=6 | [0,1] |
| Zero in array | nums=[0,4,0], target=0 | [0,2] |
| Large numbers | nums=[1000000000,999999999], target=1999999999 | [0,1] |

---

## 17. COMMON MISTAKES

### Mistake 1: Not checking if complement exists
```java
// WRONG
map.put(nums[i], i);
return new int[]{map.get(complement), i}; // Might be null!
```

### Mistake 2: Using same element twice
```java
// WRONG - if complement is same as current
if (map.containsKey(complement)) {
    return new int[]{map.get(complement), i};
}
// This is actually correct! We check BEFORE storing
```

### Mistake 3: Off-by-one error
```java
// WRONG
for (int i = 1; i < nums.length; i++) { // Should start at 0!
```

### Mistake 4: Returning wrong order
```java
// WRONG - order matters for some problems
return new int[]{i, map.get(complement)}; // Should be [map.get(complement), i]
```

---

## 18. TEMPLATE EXTRACTION

### Hashing Pattern Template (Two Sum Family)

```java
// Generic Template for "Find pair with property X"
public int[] findPair(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i]; // Modify this logic
        
        if (map.containsKey(complement)) {
            return new int[]{map.get(complement), i};
        }
        
        map.put(nums[i], i); // Store what you need to remember
    }
    
    return new int[]{-1, -1}; // No solution
}
```

### When to Use This Template
- Finding pairs with specific sum/difference
- Finding complement values
- Frequency counting
- Duplicate detection

---

## 19. RELATED PROBLEMS

### Same Pattern (Hashing)

| Difficulty | Problem | LeetCode # |
|------------|---------|------------|
| Easy | Two Sum | #1 |
| Easy | Contains Duplicate | #217 |
| Easy | Valid Anagram | #242 |
| Medium | Group Anagrams | #49 |
| Medium | Longest Consecutive Sequence | #128 |
| Medium | Subarray Sum Equals K | #560 |

### Progression Path
```
Two Sum (#1)
    ↓
Two Sum II (#167) - Sorted array, use Two Pointers
    ↓
3Sum (#15) - Find triplets
    ↓
4Sum (#18) - Find quadruplets
    ↓
Two Sum III (#653) - Design problem
```

---

## 20. REVISION NOTES

### 30-Second Revision

```
TWO SUM - HASHING PATTERN

1. Calculate complement: target - current
2. Check if complement exists in HashMap
3. If yes → return indices
4. If no → store current number

Time: O(N) | Space: O(N)
```

### Key Keywords
- "Two numbers"
- "Sum equals target"
- "Pair"
- "Indices"

### Pattern Recognition
- Unsorted array + find pair = **HashMap**
- Sorted array + find pair = **Two Pointers**

---

## 21. MOCK INTERVIEW MODE

### Interviewer Questions

**Q1:** "Can you explain the problem in your own words?"

**Expected Answer:** "We need to find two indices in the array such that the elements at those indices add up to the target. We return these two indices."

**Q2:** "What's your initial approach?"

**Expected Answer:** "I'll use a HashMap to store numbers I've seen. For each number, I calculate the complement and check if it exists in the map."

**Q3:** "What's the time complexity?"

**Expected Answer:** "O(N) time since we traverse the array once, and O(N) space for the HashMap."

**Q4:** "Can you walk through an example?"

**Expected Answer:** (Walk through dry run from section 10)

### Evaluation Criteria
- [ ] Correctly identified pattern (Hashing)
- [ ] Chose optimal approach
- [ ] Handled edge cases
- [ ] Explained complexity correctly
- [ ] Code is clean and bug-free

---

## 22. COMPANY FREQUENCY

| Company | Frequency | Difficulty | Notes |
|---------|-----------|------------|-------|
| Amazon | Very High | Easy-Medium | Often as first question |
| Google | High | Medium | May have follow-ups |
| Meta | High | Easy-Medium | Quick solve expected |
| Microsoft | High | Easy | Standard screening |
| Apple | Medium | Easy | Clean code focus |
| Uber | Medium | Easy | May combine with design |
| Netflix | Low | Easy | Usually harder problems |
| Adobe | Medium | Easy | Standard |
| Flipkart | Medium | Easy | Standard |
| Atlassian | Medium | Easy | Standard |

---

## 23. PROGRESSION PATH

### Next Easy Problems
- #217 Contains Duplicate
- #242 Valid Anagram
- #125 Valid Palindrome

### Next Medium Problems
- #167 Two Sum II (Sorted Array)
- #15 3Sum
- #49 Group Anagrams

### Next Hard Problems
- #42 Trapping Rain Water
- #76 Minimum Window Substring

### Pattern Mastery Path
```
Two Sum (#1) - Basic Hashing
    ↓
Group Anagrams (#49) - Advanced Hashing
    ↓
Longest Consecutive Sequence (#128) - Hashing + Logic
    ↓
Subarray Sum Equals K (#560) - Prefix Sum + Hashing
    ↓
LFU Cache (#460) - Design + Hashing
```

---

## SUMMARY

| Metric | Value |
|--------|-------|
| **Pattern** | Hashing |
| **Optimal Time** | O(N) |
| **Optimal Space** | O(N) |
| **Key Insight** | Store complements for O(1) lookup |
| **Template** | Calculate complement → Check map → Store current |

**Remember:** The key to Two Sum is recognizing that for each number, you need a specific complement. HashMap gives you O(1) lookup to find that complement instantly.
