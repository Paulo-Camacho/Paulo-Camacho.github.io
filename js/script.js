//Global variables
let randomNumber;
let attempts = 0;
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

initializeGame();
function initializeGame() {
  randomNumber = Math.floor(Math.random() * 99) + 1;
  console.log("randomNumber: " + randomNumber);

  //hiding the Reset button
  document.querySelector("#resetBtn").style.display = "none";
  //adding focus to textbox
  document.querySelector("#playerGuess").focus();
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

  if (guess == randomNumber) {
    feedBack.textContent = "You guessed it! YOU WON!";
    feedBack.style.color = "lime";
    gameOver();
  } else {
   document.querySelector("#guesses").textContent += guess + " ";
    if (attempts == 7) {
      feedBack.textContent = "Sorry, you lost";
      feedBack.style.color = "salmon";
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

function initializeGame() {
  randomNumber = Math.floor((Math.random() * 99) + 1);
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
}
