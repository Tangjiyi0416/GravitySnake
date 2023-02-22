// Set up canvas and context
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Define snake properties
let snake = {
  size: 10,
  color: "green",
  dx: 0,
  dy: -1,
  segments: [{ x: canvas.width / 2 - 5, y: canvas.height / 2 - 5 }],
};

// Define food properties
let food = {
  x: canvas.width / 2 - 5,
  y: canvas.height / 2 - 20,
  size: 10,
  color: "red",
};

// Define game properties
let score = 0;
let gameOver = false;

// Set up event listeners
if (window.DeviceOrientationEvent)
  window.addEventListener("deviceorientation", handleOrientation);
if (window.KeyboardEvent) window.addEventListener("keypress", handleKeydown);

let newDx = 0,
  newDy = -1;
function handleKeydown(event) {
  let inDx, inDy;
  if (event.code === "KeyA") (inDx = -1), (inDy = 0);
  else if (event.code === "KeyD") (inDx = 1), (inDy = 0);
  else if (event.code === "KeyW") (inDy = -1), (inDx = 0);
  else if (event.code === "KeyS") (inDy = 1), (inDx = 0);
  if (inDx * snake.dx + inDy * snake.dy !== 0) return;
  newDx = inDx;
  newDy = inDy;
}

// Function to handle orientation change
function handleOrientation(event) {
  // Set snake velocity
  let inDx = event.gamma,
    inDy = event.beta;
  if (inDy > inDx) {
    //down
    if (inDy > -inDx) (inDy = 1), (inDx = 0);
    //left
    else (inDx = -1), (inDy = 0);
  } else {
    //right
    if (inDy > -inDx) (inDx = 1), (inDy = 0);
    //top
    else (inDy = -1), (inDx = 0);
  }
  // Ignore input if reversing orientation
  if (inDx * snake.dx + inDy * snake.dy !== 0) return;

  newDx = inDx;
  newDy = inDy;
}

let velocity = 10;

function moveSnake() {
  snake.dx = newDx;
  snake.dy = newDy;
  snake.segments.unshift({
    x: snake.segments[0].x + snake.dx * velocity,
    y: snake.segments[0].y + snake.dy * velocity,
  });
  snake.segments.pop();
}

function updateSnake() {
  moveSnake();
  // Check for collision with self
  checkCollision();

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
    let newSegment = {
      x: snake.segments[0].x,
      y: snake.segments[0].y,
    };
    snake.segments.unshift(newSegment);

    // Move food to a random location
    food.x = Math.floor(Math.random() * (canvas.width / food.size)) * food.size;
    food.y =
      Math.floor(Math.random() * (canvas.height / food.size)) * food.size;
  }
}

// Function to draw the snake
function drawSnake() {
  ctx.fillStyle = snake.color;
  for (let i = 0; i < snake.segments.length; i++) {
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

function checkCollision() {
  // Check for collision with walls
  if (
    snake.segments[0].x < 0 ||
    snake.segments[0].x + snake.size > canvas.width ||
    snake.segments[0].y < 0 ||
    snake.segments[0].y + snake.size > canvas.height
  ) {
    gameOver = true;
    return;
  }
  for (let i = 1; i < snake.segments.length; i++) {
    if (
      snake.segments[i].x === snake.segments[0].x &&
      snake.segments[i].y === snake.segments[0].y
    ) {
      gameOver = true;
      return;
    }
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
    ctx.fillText("Game Over!", 15, 150);
  }
}

// Function to clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Function to update the canvas
function updateCanvas() {
  clearCanvas();
  updateSnake();
  drawSnake();
  drawFood();
  drawScore();
  checkGameOver();
}

// Set up the game loop
let intervalId = setInterval(updateCanvas, 1000 / 10);
