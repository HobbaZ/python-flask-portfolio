import { showGameUI, showGameOverScreen } from "./gameUI.js";
import { animate, initScene } from "../games/Block_Dodger/main.js";

let enemies = [];
let powerups = [];

export const startGame = (
  gameOver,
  enemies,
  player,
  powerups,
  camera,
  scene
) => {
  // Initialize game variables and start the game
  enemies = [];
  powerups = [];
  gameOver = false;
  removeObjects(enemies, player, powerups, camera, scene);
  console.log("Game started");
  showGameUI();
  // Additional game start logic
  initScene();
  animate();
};

export const endGame = (gameOver, enemies, player, powerups, camera, scene) => {
  // Handle end of game
  gameOver = true;
  console.log("Game ended");
  showGameOverScreen();
  removeObjects(enemies, player, powerups, camera, scene);
  // Additional game end logic
};

function removeObjects(enemies, player, powerups, camera, scene) {
  if (enemies.length > 0) {
    enemies.forEach((el) => {
      scene.remove(el);
    });
  }

  if (powerups.length > 0) {
    powerups.forEach((el) => {
      scene.remove(el);
    });
  }

  if (player != null) {
    if (player.position.z > camera.position.z) {
      scene.remove(player);
    }
  }
}
