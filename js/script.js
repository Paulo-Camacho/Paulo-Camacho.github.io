let randomNumber;
let attempts = 0;
let wins = 0;
let losses = 0;

document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);
initializeGame();

function initializeGame() {
  randomNumber = Math.floor(Math.random() * 99) + 1;
  console.log("Random number:" + randomNumber);
  attempts = 0;
  document.querySelector("#resetBtn").style.display = "none";
  document.querySelector("#guessBtn").style.display = "inline";
  let playerGuess = document.querySelector("#playerGuess");
  playerGuess.focus();
  playerGuess.value = "";
  let feedBack = document.querySelector("#feedBack");
  feedBack.textContent = "";
  document.querySelector("#guesses").textContent = "";
  document.querySelector("#attemptsLeft").textContent = "Attempts left: 7";
}

function checkGuess() {
  let feedBack = document.querySelector("#feedBack");
  feedBack.textContent = "";
  let guess = document.querySelector("#playerGuess").value;
  console.log("Player guess: " + guess);

  if (guess < 1 || guess > 99) {
    feedBack.textContent = "Enter a random number between 1 and 99";
    feedBack.style.color = "red";
    return;
  }

  attempts++;
  console.log("Attempts: " + attempts);
  feedBack.style.color = "orange";

  let attemptsLeft = 7 - attempts;
  document.querySelector("#attemptsLeft").textContent =
    "Attempts left: " + attemptsLeft;

  if (guess == randomNumber) {
    feedBack.textContent = "You guessed it! YOU WON!";
    feedBack.style.color = "lime";
    wins++;
    document.querySelector("#wins").textContent = wins;
    gameOver();
  } else {
    document.querySelector("#guesses").textContent += guess + " ";
    if (attempts == 7) {
      feedBack.textContent = "Sorry, you lost";
      feedBack.style.color = "salmon";
      losses++;
      document.querySelector("#losses").textContent = losses;
      gameOver();
    } else if (guess > randomNumber) {
      feedBack.textContent = "Guess was high";
    } else {
      feedBack.textContent = "Guess was low";
    }
  }
}

function gameOver() {
  let guessBtn = document.querySelector("#guessBtn");
  let resetBtn = document.querySelector("#resetBtn");
  guessBtn.style.display = "none";
  resetBtn.style.display = "inline";
}
