'use strict';

const dice = document.querySelector('.dice');
const btnNewGame = document.querySelector('.new-game');
const btnHowToPlay = document.querySelector('.btn-how-to-play');
const btnLetsPlay = document.querySelector('.lets-play');
const btnRollDice = document.querySelector('.roll-dice');
const btnHold = document.querySelector('.hold');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const player0 = document.querySelector('.player-0');
const player1 = document.querySelector('.player-1');
const currentScore0El = document.getElementById('current-score-0');
const currentScore1El = document.getElementById('current-score-1');
const totalScore0El = document.getElementById('total-score0');
const totalScore1El = document.getElementById('total-score1');
let roll;

let activePlayer;
let currentScore;
let totalScores;
let playing = true;

// -----Starting conditions-----
const resetGame = function () {
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  totalScore0El.textContent = 0;
  totalScore1El.textContent = 0;
  activePlayer = 0;
  currentScore = 0;
  totalScores = [0, 0];
  playing = true;
  player0.classList.remove('winner');
  player1.classList.remove('winner');
  player0.classList.add('active-player');
  player1.classList.remove('active-player');
  dice.src = 'assets/dice-6.png';
};
// Making sure resetGame states are called right when page is loaded
resetGame();

const updateTotalScore = function () {
  // Apply current score to total score depending on active player
  activePlayer === 0
    ? (totalScores[0] += currentScore)
    : (totalScores[1] += currentScore);
  // Display total score
  totalScore0El.textContent = totalScores[0];
  totalScore1El.textContent = totalScores[1];
};

const switchPlayer = function () {
  // Remove active player class if a player has it
  // Apply active player class if a player does not have it
  player0.classList.toggle('active-player');
  player1.classList.toggle('active-player');
  // If activePlayer = 0, change it to 1, else, change it to 0
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  //   Reset currentScore to 0
  currentScore = 0;
  //   Reset current score element to 0
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
};

// ---WHEN "HOW TO PLAY" BUTTON IS CLICKED---
btnHowToPlay.addEventListener('click', function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
});

// ---WHEN "LET'S PLAY" BUTTON IS CLICKED WITHIN THE MODAL---
btnLetsPlay.addEventListener('click', function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
});

// ---WHEN ROLL DICE IS CLICKED---
btnRollDice.addEventListener('click', function () {
  if (playing === true) {
    // Generate random number between 1-6
    roll = Math.trunc(Math.random() * 6) + 1;
    // Display random number using dice image dynamically
    dice.src = `assets/dice-${roll}.png`;
    // Store dice roll value into currentScore
    currentScore += roll;
    // Display current score to correct player
    activePlayer === 0
      ? (currentScore0El.textContent = currentScore)
      : (currentScore1El.textContent = currentScore);

    if (currentScore > 21) switchPlayer();
  }
});

// ---IF HOLD IS CLICKED---
btnHold.addEventListener('click', function () {
  if (playing === true) {
    // First update total score
    updateTotalScore();
    // Check if total score is greater than 100
    if (totalScores[`${activePlayer}`] >= 100) {
      playing = false;
      // Apply winner class to the active player dynamically
      player0.classList.contains('active-player')
        ? player0.classList.add('winner')
        : player1.classList.add('winner');
    } else {
      switchPlayer();
    }
  }
});

// ---IF NEW GAME IS CLICKED---
btnNewGame.addEventListener('click', resetGame);
