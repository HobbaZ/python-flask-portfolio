export const handlePlayButton = (
  resetGameState,
  startGame,
  gameOver,
  enemies,
  player,
  powerups,
  camera,
  scene
) => {
  const playBtn = document.querySelector("#playBtn");
  playBtn.addEventListener("click", () => {
    console.log("Started new game");
    resetGameState();
    startGame(gameOver, enemies, player, powerups, camera, scene);
  });
};

export const handlePlayAgainButton = (
  resetGameState,
  startGame,
  gameOver,
  enemies,
  player,
  powerups,
  camera,
  scene
) => {
  const playAgainBtn = document.querySelector("#playAgainBtn");
  playAgainBtn.addEventListener("click", () => {
    console.log("Restarted game");
    resetGameState();
    startGame(gameOver, enemies, player, powerups, camera, scene);
  });
};

export const handleMainMenuButton = (showStartScreen) => {
  const mainMenuBtn = document.querySelector(".mainMenuBtn");
  mainMenuBtn.addEventListener("click", () => {
    console.log("Back to main menu");
    showStartScreen();
  });
};
