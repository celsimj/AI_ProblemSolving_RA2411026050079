# 🎮 Interactive Game AI — Tic-Tac-Toe System

> AI Problem Solving Assignment | Topic 1

An interactive web-based Tic-Tac-Toe game where you play against an AI opponent that uses two search algorithms: **Minimax** and **Alpha-Beta Pruning**. The game compares both methods in real-time showing nodes explored and execution time.

---

## 🚀 Live Demo

Open `index.html` in any browser — no installation needed!

---

## 📌 Problem Description

A gaming company wants a web-based Tic-Tac-Toe AI opponent that:
- Always makes the **best possible move**
- Allows users to **compare two AI methods**
- Provides real-time **performance statistics**

---

## 🧠 Algorithms Used

### 1. Minimax Algorithm
- Explores **all possible game states** recursively
- Guarantees the best move for the AI
- Can be slow due to exploring every node

### 2. Alpha-Beta Pruning
- An **optimized version** of Minimax
- Prunes branches that cannot affect the final decision
- Much **faster** — explores fewer nodes
- Produces the **same result** as Minimax but more efficiently

### Comparison Formula
- **Nodes Explored**: Minimax > Alpha-Beta (Alpha-Beta skips irrelevant branches)
- **Execution Time**: Alpha-Beta is consistently faster
- **Move Quality**: Both always make the optimal move (same output)

---

## 📁 Folder Structure

```
AI_ProblemSolving_<RegisterNumber>/
│
├── index.html      ← Main game page (open this in browser)
├── style.css       ← All visual styling
├── game.js         ← AI logic (Minimax + Alpha-Beta)
└── README.md       ← This file
```

---

## ▶️ How to Run

1. Download or clone this repository
2. Open the folder
3. Double-click `index.html` — it opens in your browser
4. Play!

No Python, no server, no installation needed.

---

## 🎮 How to Play

| Action | Description |
|--------|-------------|
| Click a cell | Make your move |
| Switch AI Method | Toggle between Minimax / Alpha-Beta |
| Switch Side | Play as X (first) or O (second) |
| New Game | Reset the board |

---

## 📊 Sample Output

After each AI move, the **Performance Stats** panel shows:

```
Method Used   : Alpha-Beta
Nodes Explored: 34
Time Taken    : 0.021ms
AI Move       : Cell #5
```

And when both methods have been tested:
```
📌 Comparison: Minimax explored 255 nodes vs Alpha-Beta's 34 nodes.
Alpha-Beta pruned 221 extra nodes (86.7% fewer).
```

---

## 🧪 Algorithm Analysis

| Metric | Minimax | Alpha-Beta |
|--------|---------|------------|
| Nodes (empty board) | ~255 | ~34–60 |
| Time (first move) | ~0.1–0.5ms | ~0.02–0.1ms |
| Optimal Move | ✅ Always | ✅ Always |
| Pruning | ❌ None | ✅ Yes |

---

## 👥 Team Members

| Name | Register Number |
|------|----------------|
| Member 1 | XXXX |
| Member 2 | XXXX |

---

## 📚 References

- Russell, S. & Norvig, P. — *Artificial Intelligence: A Modern Approach*
- Minimax Algorithm — [Wikipedia](https://en.wikipedia.org/wiki/Minimax)
- Alpha–beta pruning — [Wikipedia](https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning)