// Set up canvas and context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Define snake properties
var snake = {
  x: 10,
  y: 10,
  size: 10,
  color: "green",
  dx: 0,
  dy: 0,
};

// Define food properties
var food = {
  x: 0,
  y: 0,
  size: 10,
  color: "red",
};

// Define game properties
var score = 0;
var gameOver = false;

// Define gravity properties
var gravity = 0.1;

// Set up event listeners
window.addEventListener("deviceorientation", handleOrientation);

// Function to handle orientation change
function handleOrientation(event) {
  // Set snake velocity based on gravity
  snake.dx = event.gamma * gravity;
  snake.dy = event.beta * gravity;
}

// Function to draw the snake
function drawSnake() {
  ctx.fillStyle = snake.color;
  ctx.fillRect(snake.x, snake.y, snake.size, snake.size);
}

// Function to draw the food
function drawFood() {
  ctx.fillStyle = food.color;
  ctx.fillRect(food.x, food.y, food.size, food.size);
}

// Function to update the snake's position
function updateSnake() {
  // Move snake
  snake.x += snake.dx;
  snake.y += snake.dy;

  // Check for collision with walls
  if (
    snake.x < 0 ||
    snake.x + snake.size > canvas.width ||
    snake.y < 0 ||
    snake.y + snake.size > canvas.height
  ) {
    gameOver = true;
  }

  // Check for collision with food
  if (
    snake.x < food.x + food.size &&
    snake.x + snake.size > food.x &&
    snake.y < food.y + food.size &&
    snake.y + snake.size > food.y
  ) {
    // Increase score
    score++;

    // Move food to a random location
    food.x = Math.floor(Math.random() * (canvas.width / food.size)) * food.size;
    food.y = Math.floor(Math.random() * (canvas.height / food.size)) * food.size;
  }
}

// Function to draw the score
function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Score: " + score, 10, 25);
}

// Function to check if the game is over
function checkGameOver() {
  if (gameOver) {
    clearInterval(intervalId);
    ctx.font = "50px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Game Over!", 100, 250);
  }
}

// Function to clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Function to update the canvas
function updateCanvas() {
  clearCanvas();
  drawSnake();
  drawFood();
  updateSnake();
  drawScore();
  checkGameOver();
}

// Set up the game loop
var intervalId = setInterval(updateCanvas, 1000 / 60);
