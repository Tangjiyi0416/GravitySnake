// Set up canvas and context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Define snake properties
var snake = {
  x: canvas.width / 2 - 5,
  y: canvas.height / 2 - 5,
  size: 10,
  color: "green",
  dx: 0,
  dy: 0,
  segments: [{ x: canvas.width / 2 - 5, y: canvas.height / 2 - 5 }],
};

// Define food properties
var food = {
  x: canvas.width/2-5,
  y: canvas height /2- 10,
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
  for (var i = 0; i < snake.segments.length; i++) {
    ctx.fillRect(
      snake.segments[i].x,
      snake.segments[i].y,
      snake.size,
      snake.size
    );
  }
}

// Function to draw the food
function drawFood() {
  ctx.fillStyle = food.color;
  ctx.fillRect(food.x, food.y, food.size, food.size);
}

// Function to update the snake's position
function updateSnake() {
  // Move snake
  var newSegment = {
    x: snake.segments[0].x + snake.dx,
    y: snake.segments[0].y + snake.dy,
  };
  snake.segments.unshift(newSegment);
  snake.segments.pop();

  // Check for collision with walls
  if (
    snake.segments[0].x < 0 ||
    snake.segments[0].x + snake.size > canvas.width ||
    snake.segments[0].y < 0 ||
    snake.segments[0].y + snake.size > canvas.height
  ) {
    gameOver = true;
  }

  // Check for collision with food
  if (
    snake.segments[0].x < food.x + food.size &&
    snake.segments[0].x + snake.size > food.x &&
    snake.segments[0].y < food.y + food.size &&
    snake.segments[0].y + snake.size > food.y
  ) {
    // Increase score
    score++;

    // Add new segment to snake
    var newSegment = {
      x: snake.segments[0].x,
      y: snake.segments[0].y,
    };
    snake.segments.unshift(newSegment);

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
