document.querySelector("#quizBtn").addEventListener("click", gradeQuiz);
const result1 = document.querySelector("#result1");
const result2 = document.querySelector("#result2");
const result3 = document.querySelector("#result3");
const result4 = document.querySelector("#result4");
const result5 = document.querySelector("#result5");
const finalScoreElement = document.querySelector("#finalScore");
const congratsMessage = document.querySelector("#congratsMessage");
const attemptCountElement = document.querySelector("#attemptCount");

let count = 0;

updateAttemptCount();
displayQ3Options();

function displayQ3Options() {
    let q3Options = ["Jelly Fish", "Twinkies", "Straws", "Tire"];
    q3Options = _.shuffle(q3Options);
    const randomDiv = document.querySelector("#random");
    randomDiv.innerHTML = "";
    
    for (let i of q3Options) {
        let labelElement = document.createElement("label");
        let inputElement = document.createElement("input");
        inputElement.type = "radio";
        inputElement.name = "q3";
        inputElement.value = i;
        
        labelElement.appendChild(inputElement);
        labelElement.appendChild(document.createTextNode(" " + i));
        randomDiv.appendChild(labelElement);
    }
}

function gradeQuiz() {
    count = 0;
    
    const userAnswer1Element = document.querySelector("input[name='q1']:checked");
    if (!userAnswer1Element) {
        alert("Please answer question 1");
        return;
    }
    let userAnswer1 = userAnswer1Element.value;
    
    if (userAnswer1 == "Whale") {
        const questionOne = document.querySelector("#questionOne");
        questionOne.style.backgroundColor = "lime";
        result1.innerHTML = "This was correct";
        count = count + 20;
    } else {
        const questionOne = document.querySelector("#questionOne");
        questionOne.style.backgroundColor = "salmon";
        result1.innerHTML = "This was wrong (Answer: Whale)";
    }

    // Question 2 - Checkboxes (checking for Amphibian specifically)
    const amphibianChecked = document.querySelector("#q2b").checked;
    const reptileChecked = document.querySelector("#q2a").checked;
    const bothChecked = document.querySelector("#q2c").checked;
    
    if (amphibianChecked && !reptileChecked && !bothChecked) {
        const questionTwo = document.querySelector("#questionTwo");
        questionTwo.style.backgroundColor = "lime";
        result2.innerHTML = "This was correct";
        count = count + 20;
    } else {
        const questionTwo = document.querySelector("#questionTwo");
        questionTwo.style.backgroundColor = "salmon";
        result2.innerHTML = "Wrong (Answer: Amphibian only)";
    }

    const userAnswer3Element = document.querySelector("input[name='q3']:checked");
    if (!userAnswer3Element) {
        result3.innerHTML = "Please select an answer";
        document.querySelector("#questionThree").style.backgroundColor = "salmon";
    } else {
        let userAnswer3 = userAnswer3Element.value;
        if (userAnswer3 == "Jelly Fish") {
            const questionThree = document.querySelector("#questionThree");
            questionThree.style.backgroundColor = "lime";
            result3.innerHTML = "This was correct";
            count = count + 20;
        } else {
            const questionThree = document.querySelector("#questionThree");
            questionThree.style.backgroundColor = "salmon";
            result3.innerHTML = "Wrong (Answer: Jelly Fish)";
        }
    }

    // Question 4 - Dropdown select
    const selectElement = document.querySelector("select");
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    let userAnswer4 = selectedOption.value;
    
    if (userAnswer4 == "4") {
        const questionFour = document.querySelector("#questionFour");
        questionFour.style.backgroundColor = "lime";
        result4.innerHTML = "This was correct";
        count = count + 20;
    } else {
        const questionFour = document.querySelector("#questionFour");
        questionFour.style.backgroundColor = "salmon";
        result4.innerHTML = "Wrong (Answer: 4)";
    }

    // Question 5 - Another dropdown select (animal with feathers)
    const bgColorSelect = document.querySelector("#bgColor");
    const selectedAnimal = bgColorSelect.options[bgColorSelect.selectedIndex];
    let userAnswer5 = selectedAnimal.value;
    
    if (userAnswer5 == "Bird") {
        const questionFive = document.querySelector("#questionFive");
        questionFive.style.backgroundColor = "lime";
        result5.innerHTML = "This was correct";
        count = count + 20;
    } else {
        const questionFive = document.querySelector("#questionFive");
        questionFive.style.backgroundColor = "salmon";
        result5.innerHTML = "Wrong (Answer: Bird)";
    }

    // Update attempt count and store in localStorage
    incrementAttemptCount();
    
    // Show final score on webpage instead of alert
    showScore();
}

function showScore() {
    finalScoreElement.textContent = "Your Score: " + count + "/100";
    
    if (count > 80) {
        congratsMessage.textContent = "Congratulations! Excellent work!";
    } else {
        congratsMessage.textContent = "Keep practicing! You can do better!";
    }
}

function updateAttemptCount() {
    const attempts = localStorage.getItem('quizAttempts') || '0';
    attemptCountElement.textContent = attempts;
}

function incrementAttemptCount() {
    let attempts = parseInt(localStorage.getItem('quizAttempts') || '0');
    attempts++;
    localStorage.setItem('quizAttempts', attempts.toString());
    attemptCountElement.textContent = attempts;
}

document.querySelector("#bgColorBtn").addEventListener("click", function(e) {
    e.preventDefault();
    const colors = ["lightblue", "lightpink", "lightyellow", "lightgreen", "lavender"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
});
