// ============================================================
// AI Tic-Tac-Toe — Minimax & Alpha-Beta Pruning
// ============================================================

const WINS = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let board = Array(9).fill(null);
let player = 'X', ai = 'O', method = 'minimax', over = false;
let scores = {p:0, a:0, d:0};
let lastStats = {mm: null, ab: null};

// ---- Helpers ----
function checkWin(b) {
  for (let [a,c,e] of WINS)
    if (b[a] && b[a] === b[c] && b[a] === b[e]) return b[a];
  if (b.every(v => v)) return 'draw';
  return null;
}
function empty(b) { return b.map((v,i) => v === null ? i : null).filter(v => v !== null); }

// ---- Minimax (no pruning) ----
let mmN = 0;
function minimax(b, isMax) {
  mmN++;
  const w = checkWin(b);
  if (w === ai) return 10;
  if (w === player) return -10;
  if (w === 'draw') return 0;
  const e = empty(b);
  if (isMax) {
    let s = -99;
    for (let i of e) { b[i] = ai;     s = Math.max(s, minimax(b, false)); b[i] = null; }
    return s;
  } else {
    let s = 99;
    for (let i of e) { b[i] = player; s = Math.min(s, minimax(b, true));  b[i] = null; }
    return s;
  }
}
function bestMM(b) {
  mmN = 0; let bv = -99, bm = -1;
  const t0 = performance.now();
  for (let i of empty(b)) {
    b[i] = ai;
    const v = minimax(b, false);
    b[i] = null;
    if (v > bv) { bv = v; bm = i; }
  }
  return { move: bm, nodes: mmN, time: (performance.now() - t0).toFixed(2) };
}

// ---- Alpha-Beta Pruning ----
let abN = 0;
function alphaBeta(b, isMax, alpha, beta) {
  abN++;
  const w = checkWin(b);
  if (w === ai) return 10;
  if (w === player) return -10;
  if (w === 'draw') return 0;
  const e = empty(b);
  if (isMax) {
    let s = -99;
    for (let i of e) {
      b[i] = ai;
      s = Math.max(s, alphaBeta(b, false, alpha, beta));
      b[i] = null;
      alpha = Math.max(alpha, s);
      if (beta <= alpha) break; // prune!
    }
    return s;
  } else {
    let s = 99;
    for (let i of e) {
      b[i] = player;
      s = Math.min(s, alphaBeta(b, true, alpha, beta));
      b[i] = null;
      beta = Math.min(beta, s);
      if (beta <= alpha) break; // prune!
    }
    return s;
  }
}
function bestAB(b) {
  abN = 0; let bv = -99, bm = -1;
  const t0 = performance.now();
  for (let i of empty(b)) {
    b[i] = ai;
    const v = alphaBeta(b, false, -99, 99);
    b[i] = null;
    if (v > bv) { bv = v; bm = i; }
  }
  return { move: bm, nodes: abN, time: (performance.now() - t0).toFixed(2) };
}

// ---- Settings ----
function setMethod(m) {
  method = m;
  document.getElementById('b-mm').className = 'tb' + (m === 'minimax' ? ' on' : '');
  document.getElementById('b-ab').className = 'tb' + (m === 'alphabeta' ? ' on' : '');
  newGame();
}
function setSide(s) {
  player = s; ai = s === 'X' ? 'O' : 'X';
  document.getElementById('b-x').className = 'tb alt' + (s === 'X' ? ' on' : '');
  document.getElementById('b-o').className = 'tb' + (s === 'O' ? ' on' : '');
  newGame();
}

// ---- UI Helpers ----
function setStatus(msg, cls) {
  const el = document.getElementById('status');
  el.textContent = msg;
  el.className = 'status ' + (cls || '');
}
function renderCell(i, s) {
  const c = document.querySelector(`.cell[data-i="${i}"]`);
  c.querySelector('.cell-inner').textContent = s;
  c.classList.add('taken', s === 'X' ? 'xc' : 'oc');
  c.classList.remove('pop');
  void c.offsetWidth;
  c.classList.add('pop');
}
function updateStats(m, n, t) {
  const em = empty(board).length;
  document.getElementById('pm').textContent = m === 'minimax' ? 'Minimax' : 'Alpha-Beta';
  document.getElementById('pn').textContent = n.toLocaleString();
  document.getElementById('pt').textContent = t + 'ms';
  document.getElementById('pc').textContent = em;
  const bar = document.getElementById('nbar');
  bar.style.display = 'block';
  document.getElementById('nbar-fill').style.width = Math.min(100, Math.round((n / 260) * 100)) + '%';
  if (m === 'minimax') lastStats.mm = { nodes: n, time: parseFloat(t) };
  else lastStats.ab = { nodes: n, time: parseFloat(t) };
  showCompare();
}
function showCompare() {
  const mm = lastStats.mm, ab = lastStats.ab;
  if (!mm || !ab) return;
  const el = document.getElementById('compare');
  const diff = mm.nodes - ab.nodes;
  const pct = Math.round((diff / mm.nodes) * 100);
  const faster = mm.time > ab.time ? 'Alpha-Beta' : 'Minimax';
  el.innerHTML = `<strong>Comparison ready:</strong><br>
    Minimax: ${mm.nodes} nodes in ${mm.time}ms<br>
    Alpha-Beta: ${ab.nodes} nodes in ${ab.time}ms<br>
    Alpha-Beta pruned <strong>${pct}%</strong> fewer states.
    <strong>${faster}</strong> was faster overall.`;
  el.classList.add('show');
}
function addHistory(result, cls) {
  const el = document.getElementById('history');
  const dummy = el.querySelector('.hist-empty');
  if (dummy) dummy.remove();
  const labels = { win: 'You won', lose: 'AI won', draw: 'Draw' };
  const meth = method === 'minimax' ? 'MM' : 'AB';
  const item = document.createElement('div');
  item.className = 'hist-item';
  item.innerHTML = `<span class="hist-badge ${cls}">${labels[result]}</span><span>${meth} · ${empty(board).length} cells left</span>`;
  el.prepend(item);
}

// ---- Game Flow ----
function aiMove() {
  if (over) return;
  document.getElementById('thinking').classList.add('show');
  document.querySelectorAll('.cell:not(.taken)').forEach(c => c.style.pointerEvents = 'none');
  setTimeout(() => {
    const res = method === 'minimax' ? bestMM([...board]) : bestAB([...board]);
    document.getElementById('thinking').classList.remove('show');
    board[res.move] = ai;
    renderCell(res.move, ai);
    updateStats(method, res.nodes, res.time);
    const w = checkWin(board);
    if (w) { handleEnd(w); return; }
    document.querySelectorAll('.cell:not(.taken)').forEach(c => c.style.pointerEvents = '');
    setStatus('Your turn — click any cell', '');
  }, 180);
}

function move(i) {
  if (over || board[i]) return;
  board[i] = player;
  renderCell(i, player);
  const w = checkWin(board);
  if (w) { handleEnd(w); return; }
  aiMove();
}

function handleEnd(w) {
  over = true;
  document.querySelectorAll('.cell:not(.taken)').forEach(c => c.style.pointerEvents = 'none');
  if (w === 'draw') {
    scores.d++; setStatus("It's a draw!", 'draw'); addHistory('draw', 'draw');
  } else if (w === player) {
    scores.p++; setStatus('You win! Incredible!', 'win'); highlightWin(); addHistory('win', 'win');
  } else {
    scores.a++; setStatus('AI wins this round', 'lose'); highlightWin(); addHistory('lose', 'lose');
  }
  document.getElementById('s-p').textContent = scores.p;
  document.getElementById('s-a').textContent = scores.a;
  document.getElementById('s-d').textContent = scores.d;
}

function highlightWin() {
  for (let [a, c, e] of WINS) {
    if (board[a] && board[a] === board[c] && board[a] === board[e]) {
      [a, c, e].forEach(i => document.querySelector(`.cell[data-i="${i}"]`).classList.add('winning'));
      break;
    }
  }
}

function newGame() {
  board = Array(9).fill(null); over = false;
  document.querySelectorAll('.cell').forEach(c => {
    c.className = 'cell';
    c.querySelector('.cell-inner').textContent = '';
    c.style.pointerEvents = '';
  });
  ['pm','pn','pt','pc'].forEach(id => document.getElementById(id).textContent = '—');
  document.getElementById('nbar').style.display = 'none';
  if (player === 'O') { setStatus('AI goes first…', ''); aiMove(); }
  else setStatus('Your turn — click any cell', '');
}

newGame();