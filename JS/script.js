let low = 1;
let high = 10;

//random int btween 1 to 10
let correct_ans = parseInt((Math.random() * high) + low);

// Define UI element
const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.chances');
const startOver = document.querySelector('.result');
const messg = document.querySelector('.msg');
const p = document.createElement('p');
let previousGuesses = [];
let numGuesses = 0;
let playGame = true;

if (playGame) {
    // Event listener
    submit.addEventListener('click', function (e) {
        e.preventDefault();
        //guess
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    });
}

function validateGuess(guess) {
    // NaN = Not a Number
    if (isNaN(guess)) {
        alert('Please enter a valid number');
    } else if (guess < 1) {
        alert('Please enter a number greater than 1!');
    } else if (guess > 10) {
        alert('Please enter a number less than or equal to 10!')
    } else {
        numGuesses++;
        //Keep record of number of attempted guesses
        previousGuesses.push(guess);
        //Display previous guessed numbers
        displayGuesses(guess);
        //Check guess and display if wrong
        checkGuess(guess);
    }
}

function checkGuess(guess) {
    if (numGuesses === 3) {
        //if last guess is correct
        if (guess === correct_ans) {
            displayMessage(`You guessed correctly!`);
            endGame();
        } else {
            displayMessage(`You have used all the guesses! Sorry You lose! The correct answer is ${correct_ans}`);
            endGame();
        }
    } else {
        //Display clue if guess is greater or smaller
        if (guess === correct_ans) {
            displayMessage(`You guessed correctly!`);
            endGame();
        } else if (guess < correct_ans) {
            displayMessage(`Correct answer is greater!`);
        } else if (guess > correct_ans) {
            displayMessage(`Correct answer is smaller!`);
        }
    }
}

function displayGuesses(guess) {
    userInput.value = '';
    guessSlot.innerHTML += `${guess}  `;
    remaining.innerHTML = `${3 - numGuesses}  `;
}

function displayMessage(message) {
    messg.innerHTML = `<h2>${message}</h2>`
}
function endGame() {
    //Clear user input
    userInput.value = '';
    //Disable user input button
    userInput.setAttribute('disabled', '');
    //Display Start new Game Button
    p.classList.add('button');
    p.innerHTML = `<h2 id="newGame">New Game</h2>`
    startOver.appendChild(p);
    playGame = false;
    newGame();
}

function newGame() {
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', function () {
        //Pick a new random number
        correct_ans = parseInt((Math.random() * 10) + 1);
        previousGuesses = [];
        numGuesses = 0;
        guessSlot.innerHTML = '';
        messg.innerHTML = '';
        remaining.innerHTML = `${3 - numGuesses}  `;
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        playGame = true;
    })
}