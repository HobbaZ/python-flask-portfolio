import * as THREE from "https://cdn.skypack.dev/three@0.133.1";
//import { OrbitControls } from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/controls/OrbitControls";
import { windowResize } from "../../baseGameComponents/windowResize.js";
import { createLights } from "./createLights.js";
import { createGround } from "./createGround.js";
import { createPowerups } from "./createPowerups.js";
import { createEnemies } from "./createEnemies.js";
import { createPlayer } from "./createPlayer.js";
import { detectCollisions } from "./detectCollisions.js";
import { controls } from "./controls.js";
import {
  initialGameStart,
  showGameOver,
  showGameUI,
  showMainMenu,
  hidePauseMenu,
  pause,
  resetGameState,
} from "../../baseGameComponents/gameMenus.js";

document.body.style.overflow = "hidden";
const resumeBtn = pauseScreenContainer.querySelector("#resumeBtn");
const playBtn = startScreenContainer.querySelector("#playBtn");
const playAgainBtn = gameOverScreenContainer.querySelector("#playAgainBtn");
const mainMenuBtn = gameOverScreenContainer.querySelector(".mainMenuBtn2");
const mainMenuBtn2 = pauseScreenContainer.querySelector(".mainMenuBtn2");
const clock = new THREE.Clock();
let speed = 5;
let totalObjects = 10;
let playerData;
let gameName = "Block Dodger";

//Initialise controls
const keys = controls();

let camera, scene, renderer;

let gameState = {
  points: 0,
  gameOver: false,
  gameOverShown: false,
  gameRunning: false,
  gameStart: true,
  enemies: [],
  powerups: [],
  paused: false,
};

//initial start menu
if (gameState.gameStart) {
  initialGameStart(gameName);
}

// Generate a random whole number
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

pause(gameState);

function init() {
  console.log("initialising scene");
  scene = new THREE.Scene();

  while (scene.children.length > 0) {
    scene.remove(scene.children[0]);
  }

  scene.fog = new THREE.FogExp2("black", 0.1);
  camera = new THREE.PerspectiveCamera(
    75, //field of view
    window.innerWidth / window.innerHeight, //aspect ratio
    0.1, //near plane
    1000 //far plane
  );

  //set camera position
  camera.position.set(0, 1, 4);

  //Renderer creation
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    canvas: document.getElementById("gameCanvas"),
  });

  windowResize(renderer, camera, scene);

  createGround(THREE, scene);

  playerData = createPlayer(THREE, scene);

  createLights(THREE, scene);

  createPowerups(THREE, scene, gameState.powerups, totalObjects, randomNumber);

  createEnemies(THREE, scene, gameState.enemies, totalObjects, randomNumber);

  renderer.render(scene, camera);
}

// Move obstacles toward player
function moveObstacles(arr, power, maxX, minX, maxZ, minZ, deltaTime) {
  arr.forEach((el) => {
    el.position.z += deltaTime * power;
    if (el.position.z > camera.position.z) {
      el.position.x = randomNumber(minX, maxX);
      el.position.z = randomNumber(minZ, maxZ);
    }
  });
}

function animate() {
  const deltaTime = clock.getDelta();
  if (gameState.gameOver) {
    if (!gameState.gameOverShown) {
      showGameOver(gameState); // Call this only once
      console.log("game ended");
    }
    return;
  } else if (gameState.paused) {
    // If the game is paused, do not update the game state
    gameState.gameRunning = false;
    moveObstacles(gameState.powerups, 0, -8, 8, -30, -25, deltaTime);
    moveObstacles(gameState.enemies, 0, -8, 8, -30, -25, deltaTime);
  } else {
    gameState.gameRunning = true;

    if (
      keys.right &&
      playerData.player.position.x < (window.innerWidth * 0.005) / 2
    ) {
      playerData.player.position.x += deltaTime * speed;
    }
    if (
      keys.left &&
      playerData.player.position.x > -((window.innerWidth * 0.005) / 2)
    ) {
      playerData.player.position.x -= deltaTime * speed;
    }
    if (keys.reset) {
      playerData.player.position.set(0, 0, 0); // Reset player pos
      keys.reset = false;
    }

    showGameUI(gameState);
    moveObstacles(gameState.powerups, 2, -8, 8, -30, -25, deltaTime);
    moveObstacles(gameState.enemies, 4, -8, 8, -30, -25, deltaTime);

    detectCollisions(playerData, THREE, scene, gameState);
    renderer.render(scene, camera);
  }
  requestAnimationFrame(animate);
}

if (gameState.gameOverShown) {
  gameOver();
}

console.log((window.innerWidth * 0.005) / 2);

playAgainBtn.addEventListener("click", () => {
  resetGameState(gameState, init, animate);
});

resumeBtn.addEventListener("click", () => {
  gameState.paused = false;
  gameState.gameRunning = true;
  hidePauseMenu();
});

mainMenuBtn.addEventListener("click", () => {
  gameState.gameRunning = false;
  gameState.gameStart = true;
  showMainMenu();
});

mainMenuBtn2.addEventListener("click", () => {
  gameState.gameRunning = false;
  gameState.gameStart = true;
  showMainMenu();
});

playBtn.addEventListener("click", () => {
  resetGameState(gameState, init, animate);
});

function gameOver() {
  gameState.gameRunning = false;
  showGameOver(gameState);

  if (gameState.enemies.length > 0) {
    gameState.enemies.forEach((el) => {
      scene.remove(el);
    });
  }

  if (gameState.powerups.length > 0) {
    gameState.powerups.forEach((el) => {
      scene.remove(el);
    });
  }

  if (playerData.player.position.z > camera.position.z) {
    scene.remove(playerData.player);
  }
}
