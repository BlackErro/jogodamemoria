// ⏱️ Tempo e tentativas
let time = 0;
let moves = 0;
let timerInterval = null;

const timeEl = document.getElementById("time");
const movesEl = document.getElementById("moves");

// Emojis
const emojis = ['😀', '😂', '😍', '😎', '😭', '🔥', '🤖', '👻'];
const cards = [...emojis, ...emojis];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

const board = document.getElementById("gameBoard");
const resetBtn = document.getElementById("resetBtn");

// ▶️ Inicialização
initGame();

// ---------------- FUNÇÕES ----------------

function initGame() {
  board.innerHTML = "";
  cards.sort(() => Math.random() - 0.5);

  cards.forEach(emoji => {
    const card = document.createElement("div");
    card.classList.add("card");

    const span = document.createElement("span");
    span.textContent = emoji;

    card.appendChild(span);
    board.appendChild(card);

    card.addEventListener("click", () => flipCard(card));
  });
}

function flipCard(card) {
  if (lockBoard) return;
  if (card === firstCard) return;

  startTimer();
  card.classList.add("flipped");

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  checkMatch();
}

function checkMatch() {
  moves++;
  movesEl.textContent = moves;

  const isMatch = firstCard.innerText === secondCard.innerText;

  if (isMatch) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    resetTurn();
    checkWin();
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetTurn();
    }, 800);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function checkWin() {
  const matchedCards = document.querySelectorAll(".matched");
  if (matchedCards.length === cards.length) {
    clearInterval(timerInterval);
    setTimeout(() => {
      alert(`🎉 Você venceu em ${time}s com ${moves} tentativas!`);
    }, 300);
  }
}

// 🔄 Reset do jogo
function resetGame() {
  time = 0;
  moves = 0;
  timeEl.textContent = 0;
  movesEl.textContent = 0;

  clearInterval(timerInterval);
  timerInterval = null;

  firstCard = null;
  secondCard = null;
  lockBoard = false;

  initGame();
}

resetBtn.addEventListener("click", resetGame);

// ⏱️ Timer
function startTimer() {
  if (timerInterval) return;

  timerInterval = setInterval(() => {
    time++;
    timeEl.textContent = time;
  }, 1000);
}

