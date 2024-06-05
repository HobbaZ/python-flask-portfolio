// Function to reset game state
export const resetGameState = (
  points,
  gameStart,
  gameOver,
  gameRunning,
  enemies,
  powerups
) => {
  points = 0;
  gameStart = false;
  gameOver = false;
  enemies = [];
  powerups = [];
  gameRunning = true;
};
