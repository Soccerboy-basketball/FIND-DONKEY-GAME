const correctCoordinates = { x: 0, y: 0 }; // Example correct click coordinates
const correctCoordinatesFlowers = { x: 0, y: 0 }; // 
const clickTolerance = 20; // Tolerance for clicking around the correct spot
let timeRemaining = 3; // Time limit in seconds (5 minutes)
let gameOver = false;

const pointElement1 = document.getElementById("point1"); 
pointElement1.style.backgroundColor = "red"; // Set the desired color
pointElement1.style.width = "10px"; // Adjust size as needed
pointElement1.style.height = "10px"; 
pointElement1.style.borderRadius = "50%"; // Make it a circle
pointElement1.style.position = "absolute";

const pointElement2 = document.getElementById("point2"); 
pointElement2.style.backgroundColor = "blue"; // Set the desired color
pointElement2.style.width = "10px"; // Adjust size as needed
pointElement2.style.height = "10px"; 
pointElement2.style.borderRadius = "50%"; // Make it a circle
pointElement2.style.position = "absolute"; 

const blueChair = document.getElementById('blue-chair');
const donkey = document.getElementById('donkey');
const Flowers = document.getElementById('Flowers');
const sadFace = document.getElementById('sad-face');
const timerElement = document.getElementById('time');
const winnerMessage = document.getElementById('winner');
const loserMessage = document.getElementById('loser');
const gameContainer = document.getElementById('game-container');
const startBtn = document.getElementById('start-btn');
const timerDiv = document.getElementById('timer');

let timerInterval;

document.addEventListener("DOMContentLoaded", () => {
    // Add event listener for start button
    startBtn.addEventListener('click', startGame);
});

function showFlowers() {
    gameImage.src = "images/Flowers.JPG";
    gameImage.style.display = 'block';
    showMessage(winnerMessage); // If winning ends the game.
    endGame(true);
}



// Function to start the game
function startGame() {
gameOver = false;
timerElement.textContent = timeRemaining; // Reset timer display
winnerMessage.style.display = 'none'; // Hide winner message
loserMessage.style.display = 'none';  // Hide loser message
blueChair.style.display = 'block';    // Show the blue chair image
donkey.style.display = 'none';        // Hide donkey image 
Flowers.style.display = 'none';        // Hide Flowers image
sadFace.style.display = 'none';       // Hide sad face image
gameContainer.style.display = 'block'; // Show game container
timerDiv.style.display = 'block';     // Show timer
startBtn.style.display = 'none';      // Hide start button

//Randomize the correct co-ordinates for donkey image
correctCoordinates.x = Math.random() * (gameContainer.clientWidth - 5) + 5;
correctCoordinates.y = Math.random() * (gameContainer.clientHeight - 5) + 5;

//Setting the position for the point1 and displaying it
pointElement1.style.top = correctCoordinates.y; 
pointElement1.style.left = correctCoordinates.x;
pointElement1.style.display = 'block';

// Randomize the correct co-ordinates for Flowers image
correctCoordinatesFlowers.x = Math.random() * (gameContainer.clientWidth - 20) + 5;
correctCoordinatesFlowers.y = Math.random() * (gameContainer.clientHeight - 25) + 5;

//Setting the position for the point2 and displaying it
pointElement2.style.top = correctCoordinatesFlowers.y; 
pointElement2.style.left = correctCoordinatesFlowers.x;
pointElement2.style.display = 'block';


//Setting the timeout for how long the points will be displayed
timerInterval = setTimeout(() => {
    pointElement1.style.display = 'none';
    pointElement2.style.display = 'none';
}, 1000);

// Start countdown timer
timerInterval = setInterval(() => {
if (timeRemaining <= 0 || gameOver) {
  clearInterval(timerInterval); // Stop the timer when time runs out or game is over
  if (!gameOver) {
    // Time ran out, player loses
    showSadFace();
  }
} else {
  timeRemaining--;
  timerElement.textContent = timeRemaining;
}
}, 1000);


// Add click event listener to game area
gameContainer.addEventListener('click', handleImageClick);
}

// Function to handle clicks on the image
function handleImageClick(event) {
  const rect = gameContainer.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  // Log the click coordinates by the user
  console.log("X coordinates:" + x);
  console.log("Y coordinated:" + y);

  // Check if the click is within the correct coordinates for both donkey and flowers
  if (
    Math.abs(x - correctCoordinates.x) <= clickTolerance &&
    Math.abs(y - correctCoordinates.y) <= clickTolerance
  ) {
    // Correct click
    showDonkey();
  }
  else if (
    Math.abs(x - correctCoordinatesFlowers.x) <= clickTolerance &&
    Math.abs(y - correctCoordinatesFlowers.y) <= clickTolerance
  ) {
    // Correct click
    showFlowers();
  }
  else {
    // Wrong click
    showSadFace();
  }
}

// Function to show the donkey image (winner)
function showDonkey() {
// Hide all other possible outcomes first
blueChair.style.display = 'none';
sadFace.style.display = 'none';  // Ensure the sad face disappears
loserMessage.style.display = 'none'; // Ensure loser message disappears

// Show the winning elements
donkey.style.display = 'block';
winnerMessage.style.display = 'block';

// Stop the timer and end the game
clearInterval(timerInterval); // Make sure the timer stops
gameOver = true;
}

// Function to show the flower image (winner)
function showFlowers() {
// Hide all other possible outcomes first
blueChair.style.display = 'none';
sadFace.style.display = 'none';  // Ensure the sad face disappears
loserMessage.style.display = 'none'; // Ensure loser message disappears
donkey.style.display = 'none';

// Show the winning elements
Flowers.style.display = 'block';
winnerMessage.style.display = 'block';

// Stop the timer and end the game
clearInterval(timerInterval); // Make sure the timer stops
gameOver = true;
}

// Function to show the sad face image (loser)
function showSadFace() {
// Hide all other possible outcomes first
blueChair.style.display = 'none';
donkey.style.display = 'none';  // Ensure the donkey disappears
winnerMessage.style.display = 'none'; // Ensure winner message disappears

// Show the losing elements
sadFace.style.display = 'block';
loserMessage.style.display = 'block';

// Stop the timer and end the game
clearInterval(timerInterval); // Stop the timer on losing
gameOver = true;
}