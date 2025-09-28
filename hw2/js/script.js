let balance = 100;
let wins = 0;
let losses = 0;
let gamesPlayed = 0;
let biggestWin = 0;
let isSpinning = false;

const symbols = ["cherry.png", "strawberry.png", "seven.png"];

const spinBtn = document.getElementById("spinBtn");
const resetBtn = document.getElementById("resetBtn");
const betInput = document.getElementById("betInput");
const betAmount = document.getElementById("betAmount");
const feedback = document.getElementById("feedback");
const balanceSpan = document.getElementById("balance");
const winsSpan = document.getElementById("wins");
const lossesSpan = document.getElementById("losses");
const gamesPlayedSpan = document.getElementById("gamesPlayed");
const biggestWinSpan = document.getElementById("biggestWin");
const slots = [
  document.getElementById("slot1"),
  document.getElementById("slot2"),
  document.getElementById("slot3"),
];

spinBtn.addEventListener("click", spinSlots);
resetBtn.addEventListener("click", resetGame);
betInput.addEventListener("input", updateBetAmount);

initializeGame();

function initializeGame() {
  updateDisplay();
  feedback.textContent = "Place your bet and spin to win!";
  feedback.style.color = "#FFD700";
}

function updateBetAmount() {
  let bet = parseInt(betInput.value);
  if (bet < 1) bet = 1;
  if (bet > balance) bet = balance;
  if (bet > 100) bet = 100;
  betInput.value = bet;
  betAmount.textContent = bet;
}

function spinSlots() {
  if (isSpinning) return;

  let bet = parseInt(betInput.value);
  if (!bet || bet < 1) {
    feedback.textContent = "Make sure your input is valid!";
    feedback.style.color = "red";
    return;
  }

  if (bet > balance) {
    feedback.textContent = "Sorry, not enough money...";
    feedback.style.color = "red";
    return;
  }

  isSpinning = true;
  spinBtn.disabled = true;
  balance = balance - bet;
  gamesPlayed = gamesPlayed + 1;

  feedback.textContent = "THINKING...";
  feedback.style.color = "red";

  slots[0].innerHTML = '<img alt="Spinning" class="slot-image">';
  slots[1].innerHTML = '<img alt="Spinning" class="slot-image">';
  slots[2].innerHTML = '<img alt="Spinning" class="slot-image">';

  setTimeout(function () {
    const results = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * symbols.length);
      const randomSymbol = symbols[randomIndex];
      results.push(randomSymbol);
      slots[i].innerHTML = '<img src="imgs/' + randomSymbol + '" alt="Symbol" class="slot-image">';
    }

    checkWin(results, bet);

    isSpinning = false;
    spinBtn.disabled = false;

    if (balance <= 0) {
      gameOver();
    }

    updateDisplay();
  }, 1000);
}

function checkWin(results, bet) {
  if (results[0] === results[1] && results[1] === results[2]) {
    let multiplier;
    let symbolName;

    if (results[0] === "cherry.png") {
      multiplier = 10;
      symbolName = "Cherries";
    } else if (results[0] === "strawberry.png") {
      multiplier = 8;
      symbolName = "Strawberries";
    } else if (results[0] === "seven.png") {
      multiplier = 15;
      symbolName = "Lucky Sevens";
    }

    const winAmount = bet * multiplier;
    balance = balance + winAmount;
    wins = wins + 1;

    if (winAmount > biggestWin) {
      biggestWin = winAmount;
    }

    feedback.textContent =
      "JACKPOT! " + symbolName + "! You won $" + winAmount + "!";
    feedback.style.color = "#4CAF50";
  } else {
    losses = losses + 1;
    feedback.textContent =
      "Sorry, you lost $" + bet + ". Better luck next time!";
    feedback.style.color = "#f44336";
  }
}

function updateDisplay() {
  balanceSpan.textContent = balance;
  winsSpan.textContent = wins;
  lossesSpan.textContent = losses;
  gamesPlayedSpan.textContent = gamesPlayed;
  biggestWinSpan.textContent = biggestWin;

  // Update bet input max value
  betInput.max = Math.min(balance, 100);
  if (parseInt(betInput.value) > balance) {
    betInput.value = balance;
    updateBetAmount();
  }
}

function gameOver() {
  feedback.textContent = "Game Over! You're out of money!";
  feedback.style.color = "#f44336";
  spinBtn.disabled = true;
  betInput.disabled = true;
}

function resetGame() {
  balance = 100;
  wins = 0;
  losses = 0;
  gamesPlayed = 0;
  biggestWin = 0;
  isSpinning = false;

  betInput.value = 10;
  betInput.disabled = false;
  spinBtn.disabled = false;
  updateBetAmount();

  slots[0].innerHTML = '<img src="imgs/cherry.png" alt="Cherry" class="slot-image">';
  slots[1].innerHTML = '<img src="imgs/strawberry.png" alt="Strawberry" class="slot-image">';
  slots[2].innerHTML = '<img src="imgs/seven.png" alt="Seven" class="slot-image">';

  feedback.textContent = "Game reset! Place your bet and spin to win!";
  feedback.style.color = "#FFD700";

  updateDisplay();
}
