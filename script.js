// script.js

let sequence = [];  // Holds the current sequence to be remembered
let userSequence = [];  // Holds the sequence the user inputs
let round = 0;  // Keeps track of the current round
let correctRounds = 0;  // Tracks number of rounds won
let gameInProgress = false;
let level = '';  // To store the selected level
let sequenceDelay = 1000;  // Initial delay between sequence flashes

const buttons = document.querySelectorAll('.game-button');
const resultDisplay = document.getElementById("result");
const levelSelection = document.getElementById("level-selection");
const startOverButton = document.getElementById("start-over-btn");

// Function to start the game based on selected level
function startGame(selectedLevel) {
    level = selectedLevel;
    correctRounds = 0;
    sequence = [];
    userSequence = [];
    round = 0;
    sequenceDelay = 1000;  // Reset delay at the start of the game
    resultDisplay.textContent = '';
    gameInProgress = true;
    levelSelection.style.display = 'none';  // Hide level selection
    startOverButton.style.display = 'none';  // Hide Start Over button initially
    nextRound();
}

// Function to move to the next round
function nextRound() {
    round++;
    userSequence = [];
    resultDisplay.textContent = `Round: ${round}`;

    // Add a random button press to the sequence
    const randomButton = Math.floor(Math.random() * 9);
    sequence.push(randomButton);

    // Show the sequence to the player
    showSequence();
}

// Function to display the sequence to the user
function showSequence() {
    let i = 0;
    const interval = setInterval(() => {
        highlightButton(sequence[i]);
        i++;
        if (i === sequence.length) {
            clearInterval(interval);
            enableButtonsForUserInput();
        }
    }, sequenceDelay);
}

// Function to highlight a button for the sequence
function highlightButton(index) {
    const button = buttons[index];
    button.style.backgroundColor = '#ff0000ff'; // Red for highlight
    setTimeout(() => {
        button.style.backgroundColor = 'gold'; // Green after highlight
    }, 500);
}

// Function to enable buttons for user input
function enableButtonsForUserInput() {
    buttons.forEach(button => {
        button.addEventListener('click', handleUserInput);
    });
}

// Function to handle user input
function handleUserInput(event) {
    const userButtonIndex = [...buttons].indexOf(event.target);
    userSequence.push(userButtonIndex);

    highlightButton(userButtonIndex);

    if (userSequence.length === sequence.length) {
        checkUserSequence();
    }
}

// Function to check if user input matches the sequence
function checkUserSequence() {
    if (userSequence.join('') === sequence.join('')) {
        correctRounds++;
        resultDisplay.textContent = `Correct! You've answered ${correctRounds} correctly so far.`;

        // Increase sequence delay based on the selected level
        if (level === 'intermediate') {
            sequenceDelay += -100;  // Increase speed moderately for intermediate
        } else if (level === 'pro') {
            sequenceDelay += -250;  // Increase speed more for pro
        }

        setTimeout(() => {
            if (gameInProgress) {
                nextRound();
            }
        }, 1000);
    } else {
        resultDisplay.textContent = `Game Over! You answered ${correctRounds} rounds correctly.`;
        gameInProgress = false;
        startOverButton.style.display = 'inline';  // Show Start Over button after losing the game
    }

    // Disable further input after the round
    buttons.forEach(button => {
        button.removeEventListener('click', handleUserInput);
    });
}

// Function to reset the game and show level selection again
function startOver() {
    gameInProgress = false;
    correctRounds = 0;
    sequence = [];
    userSequence = [];
    round = 0;
    sequenceDelay = 1000;  // Reset delay

    levelSelection.style.display = 'block';  // Show level selection again
    startOverButton.style.display = 'none';  // Hide Start Over button again
    resultDisplay.textContent = '';  // Clear the result
}
