export const initUI = () => {
  window.menuScreen = document.querySelector("#menuScreen");
  window.startScreenContainer = menuScreen.querySelector(
    "#startScreenContainer"
  );
  window.gameOverScreenContainer = menuScreen.querySelector(
    "#gameOverScreenContainer"
  );
  window.gameOverMessage =
    gameOverScreenContainer.querySelector("#gameOverMessage");
  window.pointsUI = document.querySelector("#ui");
  window.points = 0;
};

export const showStartScreen = () => {
  menuScreen.style.display = "block";
  startScreenContainer.style.display = "block";
  gameOverScreenContainer.style.display = "none";
  pointsUI.style.display = "none";
};

export const showGameOverScreen = () => {
  menuScreen.style.display = "block";
  gameOverScreenContainer.style.display = "block";
  pointsUI.style.display = "none";
  gameOverMessage.innerHTML = `<div><h1>GAME OVER</h1><br/><h3>You scored ${points.toString()}${
    points === 1 ? " point" : " points"
  }</h3></div>`;
  console.log("game ended");
};

export const showGameUI = () => {
  pointsUI.style.display = "block";
  menuScreen.style.display = "none";
  gameOverScreenContainer.style.display = "none";
  startScreenContainer.style.display = "none";
};
