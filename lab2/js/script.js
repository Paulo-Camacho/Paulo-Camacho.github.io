// Global variables
let target = Math.floor(Math.random() * 99) + 1;
let win = 0;
let loss = 0;
let clickCount = 0;

// THIS JUST TAKES VALUE FROM BOX AND PLUGS IT INTO H3 ELEMENT NAMED
// USER ANSWERS

document.querySelector("#guessButton").addEventListener("click", guess)

function guess() {
    let userGuess = document.querySelector("#guessBox").value;
    document.querySelector("#rightOrWrong").style.color = "yellow";
    if (userGuess == target) {
        document.querySelector("#rightOrWrong").textContent = `Guess was right! `;
    }
    else {
        document.querySelector("#rightOrWrong").textContent = `Guess was wrong! `;
        if (userGuess < target) {
            document.querySelector("#rightOrWrong").textContent = `Guess was too low `;
        }
        else {
            document.querySelector("#rightOrWrong").textContent = `Guess was too high `;
        }
    }
    errorCheck(userGuess);
    document.querySelector("#userAnswers").textContent += `${userGuess} `;
    // clickCount++;
    document.querySelector("#at").textContent = `Number of valid guesses ${clickCount} `;

    // errorCheck(userGuess);

//  Compare the user's guess with the target number:
//    a. If the guess is equal to the target number:
//       i. Display a congratulatory message to the user along with the number of attempts taken.
//      ii. Increase variable that keeps track of number of wins and display its value
//     iii. Disable/Hide Guess button,  display "Play Again" button
//    b. If the guess is less than the target number:
//       i. Display a message asking the user to guess a higher number.
//      ii.  Increment the attempts variable by 1.

//    c. If the guess is greater than the target number:
//       i. Display a message asking the user to guess a lower number.
//      ii. Increment the attempts variable by 1.
}

function errorCheck(guess) {
    if (guess < 1 || guess > 100) {
        document.querySelector("#er").textContent = ` Make sure to choose a number between 1 and 100`;
    }
    else {
        clickCount++;
    }
}





