const pointsUI = document.querySelector("#ui");
const gameTitle = document.querySelector("#gameTitle");
const pauseScreenContainer = document.querySelector("#pauseScreenContainer");
const startScreenContainer = document.querySelector("#startScreenContainer");
const gameOverScreenContainer = document.querySelector(
  "#gameOverScreenContainer"
);
const gameOverMessage =
  gameOverScreenContainer.querySelector("#gameOverMessage");

export const initialGameStart = (gameName) => {
  gameTitle.textContent = gameName;
  startScreenContainer.style = "display:block; z-index:1;";
  gameOverScreenContainer.style = "display:none; z-index:2;";
  pauseScreenContainer.style = "display:none; z-index:3;";
  pointsUI.style.display = "none";
};

export const showMainMenu = () => {
  startScreenContainer.style = "display:block; z-index:1;";
  gameOverScreenContainer.style = "display:none; z-index:2;";
  pauseScreenContainer.style = "display:none; z-index:3;";
  pointsUI.style.display = "none";
};

export const showPauseMenu = () => {
  pauseScreenContainer.style = "display:block; z-index:1;";
  startScreenContainer.style = "display:none; z-index:2;";
  gameOverScreenContainer.style = "display:none; z-index:3;";
};

export const hidePauseMenu = () => {
  pauseScreenContainer.style = "display:none; z-index:1;";
  startScreenContainer.style = "display:none; z-index:2;";
  gameOverScreenContainer.style = "display:none; z-index:3;";
};

export const pause = (gameState) => {
  //toggle pause menu
  window.addEventListener("keydown", (e) => {
    if (e.key === "p" || e.key === "P") {
      gameState.paused = !gameState.paused;
      if (gameState.paused) {
        showPauseMenu();
      } else {
        hidePauseMenu();
      }
    }
  });
};

export const showGameUI = (gameState) => {
  pointsUI.innerHTML = `<h1>${gameState.points.toString()} ${
    gameState.points === 1 ? " point" : " points"
  }</h1>`;
  pointsUI.style.display = "block";
  gameOverScreenContainer.style = "display:none; z-index:1;";
  startScreenContainer.style = "display:none; z-index:2;";
  pauseScreenContainer.style = "display:none; z-index:3;";
};

export const showGameOver = (gameState) => {
  pointsUI.style.display = "none";
  gameOverScreenContainer.style = "display:block; z-index:1;";
  startScreenContainer.style = "display:none; z-index:2;";
  pauseScreenContainer.style = "display:none; z-index:3;";
  gameOverMessage.innerHTML =
    "<div><h2>GAME OVER</h2><br/><h3>You scored " +
    gameState.points.toString() +
    `${gameState.points === 1 ? " point" : " points"}</h3></div>`;
};

export const resetGameState = (gameState, init, animate) => {
  gameState.points = 0;
  gameState.gameStart = false;
  gameState.gameRunning = true;
  gameState.gameOver = false;
  gameState.enemies = [];
  gameState.powerups = [];
  (gameState.paused = false),
    (startScreenContainer.style = "display:none; z-index:1;");
  gameOverScreenContainer.style = "display:none; z-index:2;";
  pauseScreenContainer.style = "display:none; z-index:3;";
  init();
  animate();
  console.log("game reset");
};
