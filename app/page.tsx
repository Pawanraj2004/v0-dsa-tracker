"use client"

import { useState, useEffect } from "react"
import { Check, RotateCcw, ChevronDown, ChevronUp, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Define types
type Question = {
  id: string
  name: string
  url: string
  difficulty: "Easy" | "Medium" | "Hard"
}

type Category = {
  name: string
  questions: Question[]
}

type DifficultyFilter = {
  Easy: boolean
  Medium: boolean
  Hard: boolean
}

// Sample DSA questions organized by category
const dsaQuestions: Category[] = [
  {
    name: "Arrays & Strings",
    questions: [
      { id: "two-sum", name: "Two Sum", url: "https://leetcode.com/problems/two-sum/", difficulty: "Easy" },
      {
        id: "container-with-most-water",
        name: "Container With Most Water",
        url: "https://leetcode.com/problems/container-with-most-water/",
        difficulty: "Medium",
      },
      { id: "3sum", name: "3Sum", url: "https://leetcode.com/problems/3sum/", difficulty: "Medium" },
      {
        id: "product-of-array-except-self",
        name: "Product of Array Except Self",
        url: "https://leetcode.com/problems/product-of-array-except-self/",
        difficulty: "Medium",
      },
      {
        id: "maximum-subarray",
        name: "Maximum Subarray",
        url: "https://leetcode.com/problems/maximum-subarray/",
        difficulty: "Medium",
      },
      {
        id: "merge-intervals",
        name: "Merge Intervals",
        url: "https://leetcode.com/problems/merge-intervals/",
        difficulty: "Medium",
      },
      {
        id: "longest-substring-without-repeating-characters",
        name: "Longest Substring Without Repeating Characters",
        url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
        difficulty: "Medium",
      },
      {
        id: "longest-palindromic-substring",
        name: "Longest Palindromic Substring",
        url: "https://leetcode.com/problems/longest-palindromic-substring/",
        difficulty: "Medium",
      },
      {
        id: "minimum-window-substring",
        name: "Minimum Window Substring",
        url: "https://leetcode.com/problems/minimum-window-substring/",
        difficulty: "Hard",
      },
      {
        id: "valid-anagram",
        name: "Valid Anagram",
        url: "https://leetcode.com/problems/valid-anagram/",
        difficulty: "Easy",
      },
      {
        id: "group-anagrams",
        name: "Group Anagrams",
        url: "https://leetcode.com/problems/group-anagrams/",
        difficulty: "Medium",
      },
      {
        id: "valid-parentheses",
        name: "Valid Parentheses",
        url: "https://leetcode.com/problems/valid-parentheses/",
        difficulty: "Easy",
      },
      {
        id: "remove-duplicates-from-sorted-array",
        name: "Remove Duplicates from Sorted Array",
        url: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
        difficulty: "Easy",
      },
      {
        id: "best-time-to-buy-and-sell-stock",
        name: "Best Time to Buy and Sell Stock",
        url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
        difficulty: "Easy",
      },
      {
        id: "rotate-array",
        name: "Rotate Array",
        url: "https://leetcode.com/problems/rotate-array/",
        difficulty: "Medium",
      },
      {
        id: "find-first-and-last-position",
        name: "Find First and Last Position of Element in Sorted Array",
        url: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
        difficulty: "Medium",
      },
      {
        id: "search-in-rotated-sorted-array",
        name: "Search in Rotated Sorted Array",
        url: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
        difficulty: "Medium",
      },
      {
        id: "move-zeroes",
        name: "Move Zeroes",
        url: "https://leetcode.com/problems/move-zeroes/",
        difficulty: "Easy",
      },
      {
        id: "longest-common-prefix",
        name: "Longest Common Prefix",
        url: "https://leetcode.com/problems/longest-common-prefix/",
        difficulty: "Easy",
      },
      {
        id: "string-to-integer-atoi",
        name: "String to Integer (atoi)",
        url: "https://leetcode.com/problems/string-to-integer-atoi/",
        difficulty: "Medium",
      },
    ],
  },
  {
    name: "Linked Lists",
    questions: [
      {
        id: "reverse-linked-list",
        name: "Reverse Linked List",
        url: "https://leetcode.com/problems/reverse-linked-list/",
        difficulty: "Easy",
      },
      {
        id: "linked-list-cycle",
        name: "Linked List Cycle",
        url: "https://leetcode.com/problems/linked-list-cycle/",
        difficulty: "Easy",
      },
      {
        id: "merge-two-sorted-lists",
        name: "Merge Two Sorted Lists",
        url: "https://leetcode.com/problems/merge-two-sorted-lists/",
        difficulty: "Easy",
      },
      {
        id: "remove-nth-node-from-end-of-list",
        name: "Remove Nth Node From End of List",
        url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
        difficulty: "Medium",
      },
      {
        id: "reorder-list",
        name: "Reorder List",
        url: "https://leetcode.com/problems/reorder-list/",
        difficulty: "Medium",
      },
      {
        id: "intersection-of-two-linked-lists",
        name: "Intersection of Two Linked Lists",
        url: "https://leetcode.com/problems/intersection-of-two-linked-lists/",
        difficulty: "Easy",
      },
      {
        id: "palindrome-linked-list",
        name: "Palindrome Linked List",
        url: "https://leetcode.com/problems/palindrome-linked-list/",
        difficulty: "Easy",
      },
      { id: "lru-cache", name: "LRU Cache", url: "https://leetcode.com/problems/lru-cache/", difficulty: "Medium" },
      {
        id: "copy-list-with-random-pointer",
        name: "Copy List with Random Pointer",
        url: "https://leetcode.com/problems/copy-list-with-random-pointer/",
        difficulty: "Medium",
      },
      {
        id: "add-two-numbers",
        name: "Add Two Numbers",
        url: "https://leetcode.com/problems/add-two-numbers/",
        difficulty: "Medium",
      },
      {
        id: "remove-duplicates-from-sorted-list",
        name: "Remove Duplicates from Sorted List",
        url: "https://leetcode.com/problems/remove-duplicates-from-sorted-list/",
        difficulty: "Easy",
      },
      {
        id: "swap-nodes-in-pairs",
        name: "Swap Nodes in Pairs",
        url: "https://leetcode.com/problems/swap-nodes-in-pairs/",
        difficulty: "Medium",
      },
      {
        id: "odd-even-linked-list",
        name: "Odd Even Linked List",
        url: "https://leetcode.com/problems/odd-even-linked-list/",
        difficulty: "Medium",
      },
      {
        id: "sort-list",
        name: "Sort List",
        url: "https://leetcode.com/problems/sort-list/",
        difficulty: "Medium",
      },
    ],
  },
  {
    name: "Trees & Graphs",
    questions: [
      {
        id: "maximum-depth-of-binary-tree",
        name: "Maximum Depth of Binary Tree",
        url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
        difficulty: "Easy",
      },
      { id: "same-tree", name: "Same Tree", url: "https://leetcode.com/problems/same-tree/", difficulty: "Easy" },
      {
        id: "invert-binary-tree",
        name: "Invert Binary Tree",
        url: "https://leetcode.com/problems/invert-binary-tree/",
        difficulty: "Easy",
      },
      {
        id: "binary-tree-level-order-traversal",
        name: "Binary Tree Level Order Traversal",
        url: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
        difficulty: "Medium",
      },
      {
        id: "validate-binary-search-tree",
        name: "Validate Binary Search Tree",
        url: "https://leetcode.com/problems/validate-binary-search-tree/",
        difficulty: "Medium",
      },
      {
        id: "construct-binary-tree-from-preorder-and-inorder-traversal",
        name: "Construct Binary Tree from Preorder and Inorder Traversal",
        url: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
        difficulty: "Medium",
      },
      {
        id: "binary-tree-maximum-path-sum",
        name: "Binary Tree Maximum Path Sum",
        url: "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
        difficulty: "Hard",
      },
      {
        id: "serialize-and-deserialize-binary-tree",
        name: "Serialize and Deserialize Binary Tree",
        url: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
        difficulty: "Hard",
      },
      {
        id: "word-search-ii",
        name: "Word Search II",
        url: "https://leetcode.com/problems/word-search-ii/",
        difficulty: "Hard",
      },
      {
        id: "number-of-islands",
        name: "Number of Islands",
        url: "https://leetcode.com/problems/number-of-islands/",
        difficulty: "Medium",
      },
      {
        id: "course-schedule",
        name: "Course Schedule",
        url: "https://leetcode.com/problems/course-schedule/",
        difficulty: "Medium",
      },
      {
        id: "pacific-atlantic-water-flow",
        name: "Pacific Atlantic Water Flow",
        url: "https://leetcode.com/problems/pacific-atlantic-water-flow/",
        difficulty: "Medium",
      },
      {
        id: "symmetric-tree",
        name: "Symmetric Tree",
        url: "https://leetcode.com/problems/symmetric-tree/",
        difficulty: "Easy",
      },
      {
        id: "binary-tree-inorder-traversal",
        name: "Binary Tree Inorder Traversal",
        url: "https://leetcode.com/problems/binary-tree-inorder-traversal/",
        difficulty: "Easy",
      },
      {
        id: "binary-tree-preorder-traversal",
        name: "Binary Tree Preorder Traversal",
        url: "https://leetcode.com/problems/binary-tree-preorder-traversal/",
        difficulty: "Easy",
      },
      {
        id: "binary-tree-postorder-traversal",
        name: "Binary Tree Postorder Traversal",
        url: "https://leetcode.com/problems/binary-tree-postorder-traversal/",
        difficulty: "Easy",
      },
      {
        id: "path-sum",
        name: "Path Sum",
        url: "https://leetcode.com/problems/path-sum/",
        difficulty: "Easy",
      },
      {
        id: "lowest-common-ancestor-of-a-binary-tree",
        name: "Lowest Common Ancestor of a Binary Tree",
        url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
        difficulty: "Medium",
      },
      {
        id: "binary-tree-zigzag-level-order-traversal",
        name: "Binary Tree Zigzag Level Order Traversal",
        url: "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/",
        difficulty: "Medium",
      },
      {
        id: "clone-graph",
        name: "Clone Graph",
        url: "https://leetcode.com/problems/clone-graph/",
        difficulty: "Medium",
      },
    ],
  },
  {
    name: "Hashmaps & Sets",
    questions: [
      {
        id: "contains-duplicate",
        name: "Contains Duplicate",
        url: "https://leetcode.com/problems/contains-duplicate/",
        difficulty: "Easy",
      },
      {
        id: "top-k-frequent-elements",
        name: "Top K Frequent Elements",
        url: "https://leetcode.com/problems/top-k-frequent-elements/",
        difficulty: "Medium",
      },
      {
        id: "longest-consecutive-sequence",
        name: "Longest Consecutive Sequence",
        url: "https://leetcode.com/problems/longest-consecutive-sequence/",
        difficulty: "Medium",
      },
      {
        id: "find-all-anagrams-in-a-string",
        name: "Find All Anagrams in a String",
        url: "https://leetcode.com/problems/find-all-anagrams-in-a-string/",
        difficulty: "Medium",
      },
      {
        id: "subarray-sum-equals-k",
        name: "Subarray Sum Equals K",
        url: "https://leetcode.com/problems/subarray-sum-equals-k/",
        difficulty: "Medium",
      },
      {
        id: "design-hashmap",
        name: "Design HashMap",
        url: "https://leetcode.com/problems/design-hashmap/",
        difficulty: "Easy",
      },
      {
        id: "design-hashset",
        name: "Design HashSet",
        url: "https://leetcode.com/problems/design-hashset/",
        difficulty: "Easy",
      },
      {
        id: "first-unique-character-in-a-string",
        name: "First Unique Character in a String",
        url: "https://leetcode.com/problems/first-unique-character-in-a-string/",
        difficulty: "Easy",
      },
      { id: "lru-cache", name: "LRU Cache", url: "https://leetcode.com/problems/lru-cache/", difficulty: "Medium" },
      {
        id: "insert-delete-getrandom-o1",
        name: "Insert Delete GetRandom O(1)",
        url: "https://leetcode.com/problems/insert-delete-getrandom-o1/",
        difficulty: "Medium",
      },
      {
        id: "two-sum-ii-input-array-is-sorted",
        name: "Two Sum II - Input Array Is Sorted",
        url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
        difficulty: "Medium",
      },
      {
        id: "4sum",
        name: "4Sum",
        url: "https://leetcode.com/problems/4sum/",
        difficulty: "Medium",
      },
      {
        id: "contains-duplicate-ii",
        name: "Contains Duplicate II",
        url: "https://leetcode.com/problems/contains-duplicate-ii/",
        difficulty: "Easy",
      },
      {
        id: "happy-number",
        name: "Happy Number",
        url: "https://leetcode.com/problems/happy-number/",
        difficulty: "Easy",
      },
      {
        id: "isomorphic-strings",
        name: "Isomorphic Strings",
        url: "https://leetcode.com/problems/isomorphic-strings/",
        difficulty: "Easy",
      },
    ],
  },
  {
    name: "Stacks & Queues",
    questions: [
      {
        id: "implement-stack-using-queues",
        name: "Implement Stack using Queues",
        url: "https://leetcode.com/problems/implement-stack-using-queues/",
        difficulty: "Easy",
      },
      {
        id: "implement-queue-using-stacks",
        name: "Implement Queue using Stacks",
        url: "https://leetcode.com/problems/implement-queue-using-stacks/",
        difficulty: "Easy",
      },
      { id: "min-stack", name: "Min Stack", url: "https://leetcode.com/problems/min-stack/", difficulty: "Easy" },
      {
        id: "evaluate-reverse-polish-notation",
        name: "Evaluate Reverse Polish Notation",
        url: "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
        difficulty: "Medium",
      },
      {
        id: "daily-temperatures",
        name: "Daily Temperatures",
        url: "https://leetcode.com/problems/daily-temperatures/",
        difficulty: "Medium",
      },
      {
        id: "largest-rectangle-in-histogram",
        name: "Largest Rectangle in Histogram",
        url: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
        difficulty: "Hard",
      },
      {
        id: "sliding-window-maximum",
        name: "Sliding Window Maximum",
        url: "https://leetcode.com/problems/sliding-window-maximum/",
        difficulty: "Hard",
      },
      {
        id: "design-circular-queue",
        name: "Design Circular Queue",
        url: "https://leetcode.com/problems/design-circular-queue/",
        difficulty: "Medium",
      },
      {
        id: "basic-calculator",
        name: "Basic Calculator",
        url: "https://leetcode.com/problems/basic-calculator/",
        difficulty: "Hard",
      },
      {
        id: "next-greater-element-i",
        name: "Next Greater Element I",
        url: "https://leetcode.com/problems/next-greater-element-i/",
        difficulty: "Easy",
      },
      {
        id: "backspace-string-compare",
        name: "Backspace String Compare",
        url: "https://leetcode.com/problems/backspace-string-compare/",
        difficulty: "Easy",
      },
      {
        id: "remove-all-adjacent-duplicates-in-string",
        name: "Remove All Adjacent Duplicates In String",
        url: "https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/",
        difficulty: "Easy",
      },
      {
        id: "basic-calculator-ii",
        name: "Basic Calculator II",
        url: "https://leetcode.com/problems/basic-calculator-ii/",
        difficulty: "Medium",
      },
    ],
  },
  {
    name: "Heaps & Priority Queues",
    questions: [
      {
        id: "kth-largest-element-in-an-array",
        name: "Kth Largest Element in an Array",
        url: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
        difficulty: "Medium",
      },
      {
        id: "merge-k-sorted-lists",
        name: "Merge k Sorted Lists",
        url: "https://leetcode.com/problems/merge-k-sorted-lists/",
        difficulty: "Hard",
      },
      {
        id: "find-median-from-data-stream",
        name: "Find Median from Data Stream",
        url: "https://leetcode.com/problems/find-median-from-data-stream/",
        difficulty: "Hard",
      },
      {
        id: "k-closest-points-to-origin",
        name: "K Closest Points to Origin",
        url: "https://leetcode.com/problems/k-closest-points-to-origin/",
        difficulty: "Medium",
      },
      {
        id: "top-k-frequent-elements",
        name: "Top K Frequent Elements",
        url: "https://leetcode.com/problems/top-k-frequent-elements/",
        difficulty: "Medium",
      },
      {
        id: "task-scheduler",
        name: "Task Scheduler",
        url: "https://leetcode.com/problems/task-scheduler/",
        difficulty: "Medium",
      },
      {
        id: "last-stone-weight",
        name: "Last Stone Weight",
        url: "https://leetcode.com/problems/last-stone-weight/",
        difficulty: "Easy",
      },
      {
        id: "kth-smallest-element-in-a-sorted-matrix",
        name: "Kth Smallest Element in a Sorted Matrix",
        url: "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/",
        difficulty: "Medium",
      },
      {
        id: "sliding-window-median",
        name: "Sliding Window Median",
        url: "https://leetcode.com/problems/sliding-window-median/",
        difficulty: "Hard",
      },
      {
        id: "furthest-building-you-can-reach",
        name: "Furthest Building You Can Reach",
        url: "https://leetcode.com/problems/furthest-building-you-can-reach/",
        difficulty: "Medium",
      },
      {
        id: "ugly-number-ii",
        name: "Ugly Number II",
        url: "https://leetcode.com/problems/ugly-number-ii/",
        difficulty: "Medium",
      },
      {
        id: "top-k-frequent-words",
        name: "Top K Frequent Words",
        url: "https://leetcode.com/problems/top-k-frequent-words/",
        difficulty: "Medium",
      },
    ],
  },
  {
    name: "Dynamic Programming",
    questions: [
      {
        id: "climbing-stairs",
        name: "Climbing Stairs",
        url: "https://leetcode.com/problems/climbing-stairs/",
        difficulty: "Easy",
      },
      {
        id: "coin-change",
        name: "Coin Change",
        url: "https://leetcode.com/problems/coin-change/",
        difficulty: "Medium",
      },
      {
        id: "longest-increasing-subsequence",
        name: "Longest Increasing Subsequence",
        url: "https://leetcode.com/problems/longest-increasing-subsequence/",
        difficulty: "Medium",
      },
      {
        id: "longest-common-subsequence",
        name: "Longest Common Subsequence",
        url: "https://leetcode.com/problems/longest-common-subsequence/",
        difficulty: "Medium",
      },
      { id: "word-break", name: "Word Break", url: "https://leetcode.com/problems/word-break/", difficulty: "Medium" },
      {
        id: "combination-sum-iv",
        name: "Combination Sum IV",
        url: "https://leetcode.com/problems/combination-sum-iv/",
        difficulty: "Medium",
      },
      {
        id: "house-robber",
        name: "House Robber",
        url: "https://leetcode.com/problems/house-robber/",
        difficulty: "Medium",
      },
      {
        id: "house-robber-ii",
        name: "House Robber II",
        url: "https://leetcode.com/problems/house-robber-ii/",
        difficulty: "Medium",
      },
      {
        id: "decode-ways",
        name: "Decode Ways",
        url: "https://leetcode.com/problems/decode-ways/",
        difficulty: "Medium",
      },
      {
        id: "unique-paths",
        name: "Unique Paths",
        url: "https://leetcode.com/problems/unique-paths/",
        difficulty: "Medium",
      },
      { id: "jump-game", name: "Jump Game", url: "https://leetcode.com/problems/jump-game/", difficulty: "Medium" },
      {
        id: "palindromic-substrings",
        name: "Palindromic Substrings",
        url: "https://leetcode.com/problems/palindromic-substrings/",
        difficulty: "Medium",
      },
      {
        id: "min-cost-climbing-stairs",
        name: "Min Cost Climbing Stairs",
        url: "https://leetcode.com/problems/min-cost-climbing-stairs/",
        difficulty: "Easy",
      },
      {
        id: "maximum-product-subarray",
        name: "Maximum Product Subarray",
        url: "https://leetcode.com/problems/maximum-product-subarray/",
        difficulty: "Medium",
      },
      {
        id: "coin-change-2",
        name: "Coin Change 2",
        url: "https://leetcode.com/problems/coin-change-2/",
        difficulty: "Medium",
      },
      {
        id: "partition-equal-subset-sum",
        name: "Partition Equal Subset Sum",
        url: "https://leetcode.com/problems/partition-equal-subset-sum/",
        difficulty: "Medium",
      },
      {
        id: "target-sum",
        name: "Target Sum",
        url: "https://leetcode.com/problems/target-sum/",
        difficulty: "Medium",
      },
      {
        id: "unique-paths-ii",
        name: "Unique Paths II",
        url: "https://leetcode.com/problems/unique-paths-ii/",
        difficulty: "Medium",
      },
    ],
  },
  {
    name: "Greedy Algorithms",
    questions: [
      {
        id: "maximum-subarray",
        name: "Maximum Subarray",
        url: "https://leetcode.com/problems/maximum-subarray/",
        difficulty: "Medium",
      },
      { id: "jump-game", name: "Jump Game", url: "https://leetcode.com/problems/jump-game/", difficulty: "Medium" },
      {
        id: "jump-game-ii",
        name: "Jump Game II",
        url: "https://leetcode.com/problems/jump-game-ii/",
        difficulty: "Medium",
      },
      {
        id: "gas-station",
        name: "Gas Station",
        url: "https://leetcode.com/problems/gas-station/",
        difficulty: "Medium",
      },
      {
        id: "hand-of-straights",
        name: "Hand of Straights",
        url: "https://leetcode.com/problems/hand-of-straights/",
        difficulty: "Medium",
      },
      {
        id: "merge-triplets-to-form-target-triplet",
        name: "Merge Triplets to Form Target Triplet",
        url: "https://leetcode.com/problems/merge-triplets-to-form-target-triplet/",
        difficulty: "Medium",
      },
      {
        id: "partition-labels",
        name: "Partition Labels",
        url: "https://leetcode.com/problems/partition-labels/",
        difficulty: "Medium",
      },
      {
        id: "valid-parenthesis-string",
        name: "Valid Parenthesis String",
        url: "https://leetcode.com/problems/valid-parenthesis-string/",
        difficulty: "Medium",
      },
      {
        id: "best-time-to-buy-and-sell-stock-ii",
        name: "Best Time to Buy and Sell Stock II",
        url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/",
        difficulty: "Medium",
      },
      {
        id: "lemonade-change",
        name: "Lemonade Change",
        url: "https://leetcode.com/problems/lemonade-change/",
        difficulty: "Easy",
      },
      {
        id: "assign-cookies",
        name: "Assign Cookies",
        url: "https://leetcode.com/problems/assign-cookies/",
        difficulty: "Easy",
      },
      {
        id: "is-subsequence",
        name: "Is Subsequence",
        url: "https://leetcode.com/problems/is-subsequence/",
        difficulty: "Easy",
      },
    ],
  },
  {
    name: "Backtracking",
    questions: [
      { id: "subsets", name: "Subsets", url: "https://leetcode.com/problems/subsets/", difficulty: "Medium" },
      {
        id: "combination-sum",
        name: "Combination Sum",
        url: "https://leetcode.com/problems/combination-sum/",
        difficulty: "Medium",
      },
      {
        id: "permutations",
        name: "Permutations",
        url: "https://leetcode.com/problems/permutations/",
        difficulty: "Medium",
      },
      { id: "subsets-ii", name: "Subsets II", url: "https://leetcode.com/problems/subsets-ii/", difficulty: "Medium" },
      {
        id: 'combination  difficulty: "Medium',
      },
      {
        id: "combination-sum-ii",
        name: "Combination Sum II",
        url: "https://leetcode.com/problems/combination-sum-ii/",
        difficulty: "Medium",
      },
      {
        id: "word-search",
        name: "Word Search",
        url: "https://leetcode.com/problems/word-search/",
        difficulty: "Medium",
      },
      {
        id: "palindrome-partitioning",
        name: "Palindrome Partitioning",
        url: "https://leetcode.com/problems/palindrome-partitioning/",
        difficulty: "Medium",
      },
      {
        id: "letter-combinations-of-a-phone-number",
        name: "Letter Combinations of a Phone Number",
        url: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
        difficulty: "Medium",
      },
      { id: "n-queens", name: "N-Queens", url: "https://leetcode.com/problems/n-queens/", difficulty: "Hard" },
      {
        id: "sudoku-solver",
        name: "Sudoku Solver",
        url: "https://leetcode.com/problems/sudoku-solver/",
        difficulty: "Hard",
      },
      {
        id: "generate-parentheses",
        name: "Generate Parentheses",
        url: "https://leetcode.com/problems/generate-parentheses/",
        difficulty: "Medium",
      },
      {
        id: "permutations-ii",
        name: "Permutations II",
        url: "https://leetcode.com/problems/permutations-ii/",
        difficulty: "Medium",
      },
      {
        id: "combinations",
        name: "Combinations",
        url: "https://leetcode.com/problems/combinations/",
        difficulty: "Medium",
      },
    ],
  },
  {
    name: "Bit Manipulation",
    questions: [
      {
        id: "single-number",
        name: "Single Number",
        url: "https://leetcode.com/problems/single-number/",
        difficulty: "Easy",
      },
      {
        id: "number-of-1-bits",
        name: "Number of 1 Bits",
        url: "https://leetcode.com/problems/number-of-1-bits/",
        difficulty: "Easy",
      },
      {
        id: "counting-bits",
        name: "Counting Bits",
        url: "https://leetcode.com/problems/counting-bits/",
        difficulty: "Easy",
      },
      {
        id: "reverse-bits",
        name: "Reverse Bits",
        url: "https://leetcode.com/problems/reverse-bits/",
        difficulty: "Easy",
      },
      {
        id: "missing-number",
        name: "Missing Number",
        url: "https://leetcode.com/problems/missing-number/",
        difficulty: "Easy",
      },
      {
        id: "sum-of-two-integers",
        name: "Sum of Two Integers",
        url: "https://leetcode.com/problems/sum-of-two-integers/",
        difficulty: "Medium",
      },
      {
        id: "reverse-integer",
        name: "Reverse Integer",
        url: "https://leetcode.com/problems/reverse-integer/",
        difficulty: "Medium",
      },
      {
        id: "hamming-distance",
        name: "Hamming Distance",
        url: "https://leetcode.com/problems/hamming-distance/",
        difficulty: "Easy",
      },
      {
        id: "bitwise-and-of-numbers-range",
        name: "Bitwise AND of Numbers Range",
        url: "https://leetcode.com/problems/bitwise-and-of-numbers-range/",
        difficulty: "Medium",
      },
      {
        id: "power-of-two",
        name: "Power of Two",
        url: "https://leetcode.com/problems/power-of-two/",
        difficulty: "Easy",
      },
      {
        id: "power-of-four",
        name: "Power of Four",
        url: "https://leetcode.com/problems/power-of-four/",
        difficulty: "Easy",
      },
      {
        id: "single-number-ii",
        name: "Single Number II",
        url: "https://leetcode.com/problems/single-number-ii/",
        difficulty: "Medium",
      },
    ],
  },
  {
    name: "Two Pointers",
    questions: [
      {
        id: "valid-palindrome",
        name: "Valid Palindrome",
        url: "https://leetcode.com/problems/valid-palindrome/",
        difficulty: "Easy",
      },
      {
        id: "3sum",
        name: "3Sum",
        url: "https://leetcode.com/problems/3sum/",
        difficulty: "Medium",
      },
      {
        id: "container-with-most-water",
        name: "Container With Most Water",
        url: "https://leetcode.com/problems/container-with-most-water/",
        difficulty: "Medium",
      },
      {
        id: "trapping-rain-water",
        name: "Trapping Rain Water",
        url: "https://leetcode.com/problems/trapping-rain-water/",
        difficulty: "Hard",
      },
      {
        id: "remove-duplicates-from-sorted-array",
        name: "Remove Duplicates from Sorted Array",
        url: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
        difficulty: "Easy",
      },
      {
        id: "move-zeroes",
        name: "Move Zeroes",
        url: "https://leetcode.com/problems/move-zeroes/",
        difficulty: "Easy",
      },
      {
        id: "squares-of-a-sorted-array",
        name: "Squares of a Sorted Array",
        url: "https://leetcode.com/problems/squares-of-a-sorted-array/",
        difficulty: "Easy",
      },
      {
        id: "sort-colors",
        name: "Sort Colors",
        url: "https://leetcode.com/problems/sort-colors/",
        difficulty: "Medium",
      },
    ],
  },
  {
    name: "Sliding Window",
    questions: [
      {
        id: "longest-substring-without-repeating-characters",
        name: "Longest Substring Without Repeating Characters",
        url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
        difficulty: "Medium",
      },
      {
        id: "minimum-window-substring",
        name: "Minimum Window Substring",
        url: "https://leetcode.com/problems/minimum-window-substring/",
        difficulty: "Hard",
      },
      {
        id: "sliding-window-maximum",
        name: "Sliding Window Maximum",
        url: "https://leetcode.com/problems/sliding-window-maximum/",
        difficulty: "Hard",
      },
      {
        id: "find-all-anagrams-in-a-string",
        name: "Find All Anagrams in a String",
        url: "https://leetcode.com/problems/find-all-anagrams-in-a-string/",
        difficulty: "Medium",
      },
      {
        id: "permutation-in-string",
        name: "Permutation in String",
        url: "https://leetcode.com/problems/permutation-in-string/",
        difficulty: "Medium",
      },
      {
        id: "max-consecutive-ones-iii",
        name: "Max Consecutive Ones III",
        url: "https://leetcode.com/problems/max-consecutive-ones-iii/",
        difficulty: "Medium",
      },
      {
        id: "longest-repeating-character-replacement",
        name: "Longest Repeating Character Replacement",
        url: "https://leetcode.com/problems/longest-repeating-character-replacement/",
        difficulty: "Medium",
      },
    ],
  },
]

// Calculate total number of questions
const totalQuestions = dsaQuestions.reduce((acc, category) => acc + category.questions.length, 0)

export default function Home() {
  // State for tracking which categories are expanded
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})

  // State for tracking solved and revision questions
  const [solvedQuestions, setSolvedQuestions] = useState<Record<string, boolean>>({})
  const [revisionQuestions, setRevisionQuestions] = useState<Record<string, boolean>>({})

  // State for difficulty filters
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>({
    Easy: true,
    Medium: true,
    Hard: true,
  })

  // Load progress from localStorage on component mount
  useEffect(() => {
    const savedSolved = localStorage.getItem("solvedQuestions")
    const savedRevision = localStorage.getItem("revisionQuestions")
    const savedFilters = localStorage.getItem("difficultyFilters")

    if (savedSolved) {
      setSolvedQuestions(JSON.parse(savedSolved))
    }

    if (savedRevision) {
      setRevisionQuestions(JSON.parse(savedRevision))
    }

    if (savedFilters) {
      setDifficultyFilter(JSON.parse(savedFilters))
    }

    // Initialize all categories as expanded
    const initialExpanded: Record<string, boolean> = {}
    dsaQuestions.forEach((category) => {
      initialExpanded[category.name] = true
    })
    setExpandedCategories(initialExpanded)
  }, [])

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("solvedQuestions", JSON.stringify(solvedQuestions))
  }, [solvedQuestions])

  useEffect(() => {
    localStorage.setItem("revisionQuestions", JSON.stringify(revisionQuestions))
  }, [revisionQuestions])

  useEffect(() => {
    localStorage.setItem("difficultyFilters", JSON.stringify(difficultyFilter))
  }, [difficultyFilter])

  // Toggle category expansion
  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }))
  }

  // Mark question as solved
  const markAsSolved = (questionId: string) => {
    setSolvedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }))

    // If marking as solved, remove from revision if it's there
    if (!solvedQuestions[questionId]) {
      setRevisionQuestions((prev) => ({
        ...prev,
        [questionId]: false,
      }))
    }
  }

  // Mark question for revision
  const markForRevision = (questionId: string) => {
    setRevisionQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }))
  }

  // Toggle difficulty filter
  const toggleDifficultyFilter = (difficulty: keyof DifficultyFilter) => {
    setDifficultyFilter((prev) => ({
      ...prev,
      [difficulty]: !prev[difficulty],
    }))
  }

  // Check if at least one filter is selected
  const isAnyFilterSelected = Object.values(difficultyFilter).some(Boolean)

  // Filter questions by difficulty
  const filterQuestionsByDifficulty = (questions: Question[]) => {
    // If no filters are selected, show all questions to avoid empty state
    if (!isAnyFilterSelected) {
      return questions
    }

    return questions.filter((question) => difficultyFilter[question.difficulty])
  }

  // Calculate progress for filtered questions
  const getFilteredQuestions = () => {
    let filteredCount = 0
    let solvedFilteredCount = 0

    dsaQuestions.forEach((category) => {
      const filteredQuestions = filterQuestionsByDifficulty(category.questions)
      filteredCount += filteredQuestions.length
      solvedFilteredCount += filteredQuestions.filter((q) => solvedQuestions[q.id]).length
    })

    return { filteredCount, solvedFilteredCount }
  }

  const { filteredCount, solvedFilteredCount } = getFilteredQuestions()
  const progressPercentage = filteredCount > 0 ? (solvedFilteredCount / filteredCount) * 100 : 0

  // Calculate category progress
  const getCategoryProgress = (categoryName: string) => {
    const category = dsaQuestions.find((c) => c.name === categoryName)
    if (!category) return { solved: 0, total: 0, percentage: 0, filteredTotal: 0 }

    const filteredQuestions = filterQuestionsByDifficulty(category.questions)
    const solved = filteredQuestions.filter((q) => solvedQuestions[q.id]).length
    const total = category.questions.length
    const filteredTotal = filteredQuestions.length
    const percentage = filteredTotal > 0 ? (solved / filteredTotal) * 100 : 0

    return { solved, total, percentage, filteredTotal }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-2">DSA Question Tracker</h1>
        <p className="text-center text-muted-foreground mb-6">
          Track your progress on {totalQuestions} curated DSA problems
        </p>

        {/* Difficulty filters */}
        <div className="mb-6 flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter by Difficulty
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Difficulty Levels</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={difficultyFilter.Easy}
                onCheckedChange={() => toggleDifficultyFilter("Easy")}
              >
                <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200 mr-2">
                  Easy
                </Badge>
                Easy
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={difficultyFilter.Medium}
                onCheckedChange={() => toggleDifficultyFilter("Medium")}
              >
                <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-200 mr-2">
                  Medium
                </Badge>
                Medium
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={difficultyFilter.Hard}
                onCheckedChange={() => toggleDifficultyFilter("Hard")}
              >
                <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-200 mr-2">
                  Hard
                </Badge>
                Hard
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Overall progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Overall Progress (Filtered)</span>
            <span className="text-sm font-medium">
              {solvedFilteredCount} / {filteredCount}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Categories */}
        <div className="space-y-4">
          {dsaQuestions.map((category) => {
            const { solved, percentage, filteredTotal } = getCategoryProgress(category.name)

            // Skip rendering categories with no questions matching the filter
            if (filteredTotal === 0) return null

            return (
              <div key={category.name} className="border rounded-lg overflow-hidden">
                {/* Category header */}
                <div
                  className="flex items-center justify-between p-4 cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors"
                  onClick={() => toggleCategory(category.name)}
                >
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold">{category.name}</h2>
                    <Badge variant="outline" className="ml-2">
                      {solved} / {filteredTotal}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 hidden sm:block">
                      <Progress value={percentage} className="h-2" />
                    </div>
                    {expandedCategories[category.name] ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </div>

                {/* Questions table */}
                {expandedCategories[category.name] && (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/20">
                          <th className="text-left p-3 font-medium">Problem</th>
                          <th className="text-center p-3 font-medium">Difficulty</th>
                          <th className="text-center p-3 font-medium">Status</th>
                          <th className="text-center p-3 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filterQuestionsByDifficulty(category.questions).map((question) => (
                          <tr key={question.id} className="border-b hover:bg-muted/10">
                            <td className="p-3">
                              <a
                                href={question.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline font-medium"
                              >
                                {question.name}
                              </a>
                            </td>
                            <td className="p-3 text-center">
                              <Badge
                                variant="outline"
                                className={
                                  question.difficulty === "Easy"
                                    ? "bg-green-500/10 text-green-600 border-green-200"
                                    : question.difficulty === "Medium"
                                      ? "bg-yellow-500/10 text-yellow-600 border-yellow-200"
                                      : "bg-red-500/10 text-red-600 border-red-200"
                                }
                              >
                                {question.difficulty}
                              </Badge>
                            </td>
                            <td className="p-3 text-center">
                              {solvedQuestions[question.id] ? (
                                <Badge className="bg-green-500/10 text-green-600 border-green-200">Solved</Badge>
                              ) : revisionQuestions[question.id] ? (
                                <Badge className="bg-blue-500/10 text-blue-600 border-blue-200">To Revise</Badge>
                              ) : (
                                <Badge variant="outline" className="text-muted-foreground">
                                  Unsolved
                                </Badge>
                              )}
                            </td>
                            <td className="p-3">
                              <div className="flex justify-center gap-2">
                                <Button
                                  size="sm"
                                  variant={solvedQuestions[question.id] ? "default" : "outline"}
                                  className={solvedQuestions[question.id] ? "bg-green-600 hover:bg-green-700" : ""}
                                  onClick={() => markAsSolved(question.id)}
                                >
                                  <Check className="h-4 w-4 mr-1" />
                                  {solvedQuestions[question.id] ? "Solved" : "Mark Solved"}
                                </Button>
                                <Button
                                  size="sm"
                                  variant={revisionQuestions[question.id] ? "default" : "outline"}
                                  className={revisionQuestions[question.id] ? "bg-blue-600 hover:bg-blue-700" : ""}
                                  onClick={() => markForRevision(question.id)}
                                  disabled={solvedQuestions[question.id]}
                                >
                                  <RotateCcw className="h-4 w-4 mr-1" />
                                  {revisionQuestions[question.id] ? "Revising" : "Revise"}
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <footer className="mt-8 text-center text-sm text-muted-foreground">
          <Separator className="my-4" />
          <p>DSA Question Tracker</p>
        </footer>
      </div>
    </div>
  )
}
