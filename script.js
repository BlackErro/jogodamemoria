const emojis = ['😀', '😂', '😍', '😎', '😭', '🔥', '🤖', '👻'];
const cards = [...emojis, ...emojis]; // pares

let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Embaralhar cartas
cards.sort(() => Math.random() - 0.5);

const board = document.getElementById("gameBoard");

// Criar cartas
cards.forEach(emoji => {
  const card = document.createElement("div");
  card.classList.add("card");

  const span = document.createElement("span");
  span.textContent = emoji;

  card.appendChild(span);
  board.appendChild(card);

  card.addEventListener("click", () => flipCard(card));
});

function flipCard(card) {
  if (lockBoard) return;
  if (card === firstCard) return;

  card.classList.add("flipped");

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  checkMatch();
}

function checkMatch() {
  const isMatch =
    firstCard.innerText === secondCard.innerText;

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
    setTimeout(() => {
      alert("🎉 Parabéns! Você venceu!");
    }, 300);
  }
}

const resetBtn = document.getElementById("resetBtn");

function resetGame() {
  board.innerHTML = "";
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  // Embaralhar novamente
  cards.sort(() => Math.random() - 0.5);

  // Recriar as cartas
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

resetBtn.addEventListener("click", resetGame);
