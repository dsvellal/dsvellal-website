/* ===========================
   DSVellal.com — Game Engine
   Classic Snake Game
   =========================== */

document.addEventListener('DOMContentLoaded', () => {
  const triggerBtn = document.getElementById('game-trigger');
  const modal = document.getElementById('game-modal');
  const closeBtn = document.getElementById('game-close');
  const overlay = document.getElementById('game-overlay');
  const canvas = document.getElementById('game-canvas');
  const scoreSpan = document.getElementById('snake-score');
  const gameOverDiv = document.getElementById('game-gameover');
  const restartBtn = document.getElementById('game-restart');

  if (!triggerBtn || !canvas) return;

  const ctx = canvas.getContext('2d');
  const gridSize = 20;
  let snake = [];
  let food = {};
  let dx = gridSize;
  let dy = 0;
  let score = 0;
  let gameLoop;
  let gameIsRunning = false;
  let speed = 100;

  function initGame() {
    snake = [
      { x: 160, y: 160 },
      { x: 140, y: 160 },
      { x: 120, y: 160 }
    ];
    dx = gridSize;
    dy = 0;
    score = 0;
    scoreSpan.textContent = score;
    gameOverDiv.classList.remove('is-active');
    gameIsRunning = true;
    spawnFood();
    if (gameLoop) clearInterval(gameLoop);
    gameLoop = setInterval(update, speed);
  }

  function spawnFood() {
    food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
    // Ensure food doesn't spawn on snake
    snake.forEach(part => {
      if (part.x === food.x && part.y === food.y) spawnFood();
    });
  }

  function update() {
    if (!gameIsRunning) return;

    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Wall collision
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
      return gameOver();
    }

    // Self collision
    for (let i = 0; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) return gameOver();
    }

    snake.unshift(head);

    // Food collision
    if (head.x === food.x && head.y === food.y) {
      score += 10;
      scoreSpan.textContent = score;
      spawnFood();
    } else {
      snake.pop(); // remove tail
    }

    draw();
  }

  function draw() {
    // Clear canvas
    ctx.fillStyle = '#161B22'; // Dark code background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines (optional, for aesthetics)
    ctx.strokeStyle = '#21262D';
    for(let i=0; i<canvas.width; i+=gridSize) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // Draw food
    ctx.fillStyle = '#E8C872'; // Accent food
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#E8C872';
    ctx.fillRect(food.x, food.y, gridSize - 2, gridSize - 2);

    // Draw snake
    ctx.shadowBlur = 0;
    snake.forEach((part, index) => {
      ctx.fillStyle = index === 0 ? '#58A6FF' : '#4A7460'; // Head vs Body
      ctx.fillRect(part.x, part.y, gridSize - 2, gridSize - 2);
    });
  }

  function gameOver() {
    gameIsRunning = false;
    clearInterval(gameLoop);
    gameOverDiv.classList.add('is-active');
  }

  // Controls
  document.addEventListener('keydown', (e) => {
    if (!gameIsRunning) return;
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault(); // Prevent scrolling
    }
    
    if (e.key === 'ArrowUp' && dy === 0) { dx = 0; dy = -gridSize; }
    else if (e.key === 'ArrowDown' && dy === 0) { dx = 0; dy = gridSize; }
    else if (e.key === 'ArrowLeft' && dx === 0) { dx = -gridSize; dy = 0; }
    else if (e.key === 'ArrowRight' && dx === 0) { dx = gridSize; dy = 0; }
  });

  // Modal logic
  function openModal() {
    modal.classList.add('is-active');
    initGame();
  }

  function closeModal() {
    modal.classList.remove('is-active');
    gameIsRunning = false;
    if (gameLoop) clearInterval(gameLoop);
  }

  triggerBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  restartBtn.addEventListener('click', initGame);
});
