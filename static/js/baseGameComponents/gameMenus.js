const pointsUI = document.querySelector("#ui");
const gameTitle = document.querySelector("#gameTitle");
const menuScreen = document.querySelector("#menuScreen");
const pauseScreen = document.querySelector("#pauseScreen");
const pauseScreenContainer = menuScreen.querySelector("#pauseScreenContainer");
const startScreenContainer = menuScreen.querySelector("#startScreenContainer");
const gameOverScreenContainer = menuScreen.querySelector(
  "#gameOverScreenContainer"
);
const gameOverMessage =
  gameOverScreenContainer.querySelector("#gameOverMessage");

export const initialGameStart = (gameName) => {
  gameTitle.textContent = gameName;
  menuScreen.style.display = "block";
  startScreenContainer.style = "display:block; z-index:2;";
  gameOverScreenContainer.style = "display:none; z-index:1;";
  pauseScreenContainer.style = "display:none; z-index:3;";
  pointsUI.style.display = "none";
};

export const showMainMenu = () => {
  menuScreen.style.display = "block";
  startScreenContainer.style = "display:block; z-index:2;";
  gameOverScreenContainer.style = "display:none; z-index:1;";
};

export const showPauseMenu = () => {
  pauseScreenContainer.style = "display:block; z-index:3;";
  menuScreen.style.display = "block";
};

export const hidePauseMenu = () => {
  pauseScreenContainer.style = "display:none";
  menuScreen.style.display = "none";
};

export const showGameUI = (gameState) => {
  pointsUI.innerHTML = `<h1>${gameState.points.toString()} ${
    gameState.points === 1 ? " point" : " points"
  }</h1>`;

  pointsUI.style.display = "block";
  menuScreen.style.display = "none";
  gameOverScreenContainer.style = "display:none; z-index:1;";
  startScreenContainer.style.display = "none";
};

export const showGameOver = (gameState) => {
  menuScreen.style.display = "block";
  gameOverScreenContainer.style = "display:block; z-index:1;";
  pauseScreenContainer.style = "display:none";
  pointsUI.style.display = "none";
  gameOverMessage.innerHTML =
    "<div><h2>GAME OVER</h2><br/><h3>You scored " +
    gameState.points.toString() +
    `${gameState.points === 1 ? " point" : " points"}</h3></div>`;
};
