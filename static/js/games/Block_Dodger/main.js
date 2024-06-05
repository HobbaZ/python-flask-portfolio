// main.js
import * as THREE from "https://cdn.skypack.dev/three@0.133.1";
import * as menuButtons from "../../baseGameComponents/menuButtons.js";
import { windowResize } from "../../baseGameComponents/windowResize.js";
import {
  initUI,
  showStartScreen,
  showGameOverScreen,
} from "../../baseGameComponents/gameUI.js";
import { resetGameState } from "../../baseGameComponents/resetGame.js";
import { endGame, startGame } from "../../baseGameComponents/gameLogic.js";

//import { startGame, endGame } from "../../baseGameComponents/gameLogic.js";

//import { OrbitControls } from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/controls/OrbitControls";

document.body.style.overflow = "hidden";
document.getElementById("gameTitle").innerText = "Block Dodger";

const clock = new THREE.Clock();
let points = 0;
let enemies = [];
let powerups = [];
let speed = 0.05;
let totalObjects = 7;
const pointsUI = document.querySelector("#ui");
const score = document.querySelector("#points");
let camera, scene, renderer, player, playerBox;

// Initialize UI elements and base scene
initUI();
//initScene();

// Initial game state
let gameStart = true;
let gameOver = false;

//Show start menu first
if (gameStart) {
  showStartScreen();
}

export const initScene = () => {
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

  createGround();

  createPlayer();

  createLights();

  createPowerups();

  createEnemies();

  //Renderer creation
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    canvas: document.getElementById("gameCanvas"),
  });

  //Function to resize window automatically
  windowResize(renderer, camera, scene);

  //render initial scene
  render();

  return;
};

// Generate a random whole number
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// create player
function createPlayer() {
  player = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({
      color: "yellow",
      shininess: 100,
    })
  );
  playerBox = new THREE.Box3().setFromObject(player);
  scene.add(player);
  console.log("Added player");
}

//Add lights
function createLights() {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight.position.set(10, 20, 0);
  scene.add(ambientLight, directionalLight);
  console.log("Added lights");
}

// Add Ground
function createGround() {
  const ground = new THREE.Mesh(
    new THREE.BoxGeometry(30, 1, 30),
    new THREE.MeshPhongMaterial({
      color: "brown",
      shininess: 100,
    })
  );
  ground.position.y = -1;
  scene.add(ground);
  console.log("Added ground");
}

//create powerups
function createPowerups() {
  for (let i = 0; i < totalObjects; i++) {
    const powerup = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.5, 0.5),
      //new THREE.MeshBasicMaterial({ color: "blue" })
      new THREE.MeshPhongMaterial({
        color: "blue",
        shininess: 100,
      })
    );
    powerup.name = "powerup" + i + 1;
    const posX = randomNumber(-5, 5);
    const posZ = randomNumber(-35, -10);
    powerup.position.set(posX, 0, posZ);
    scene.add(powerup);
    powerups.push(powerup);
  }
  console.log("Added powerups");
}

// create enemies
function createEnemies() {
  for (let i = 0; i < totalObjects; i++) {
    const enemy = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshPhongMaterial({
        color: "red",
        shininess: 100,
      })
    );
    enemy.name = "enemy" + i + 1;
    const posX = randomNumber(-85, 5);
    const posZ = randomNumber(-35, -20);
    enemy.position.set(posX, 0, posZ);
    scene.add(enemy);
    enemies.push(enemy);
  }
  console.log("Added enemies");
}

function detectCollisions() {
  // Update player's box
  playerBox.setFromObject(player);

  // Check collisions with enemies
  for (let i = 0; i < enemies.length; i++) {
    const enemyBox = new THREE.Box3().setFromObject(enemies[i]);
    // An object was hit
    if (enemyBox.intersectsBox(playerBox)) {
      endGame(gameOver, enemies, player, powerups, camera, scene);
      console.log("Object hit, game over");
      return;
    }
  }

  // Check collisions with powerups
  for (let i = 0; i < powerups.length; i++) {
    const powerupBox = new THREE.Box3().setFromObject(powerups[i]);
    if (powerupBox.intersectsBox(playerBox)) {
      // Remove the powerup from the scene
      scene.remove(powerups[i]);
      // Remove it from the array
      powerups.splice(i, 1);
      // Update points
      points += 1;
      score.textContent = points.toString();
    }
  }
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

function updatePlayerPos(deltaTime) {
  window.addEventListener("keydown", (e) => {
    if (e.key === "d" || e.key === "ArrowRight") {
      if (player.position.x < 5) {
        //if (player.position.x < window.innerWidth / 2) {
        player.position.x += deltaTime * speed;
      }
    }
    if (e.key === "a" || e.key === "ArrowLeft") {
      if (player.position.x > -5) {
        //if (player.position.x > -(window.innerWidth / 2)) {
        player.position.x -= deltaTime * speed;
      }
    }
    if (e.key === "r") {
      player.position.set(0, 0, 0); // Reset player position
    }
  });
}

if (gameOver) {
  enemies.forEach((el) => {
    scene.remove(el);
  });

  powerups.forEach((el) => {
    scene.remove(el);
  });

  if (player.position.z > camera.position.z) {
    scene.remove(player);
  }
}

export const animate = () => {
  const deltaTime = clock.getDelta();
  updatePlayerPos(deltaTime);
  moveObstacles(powerups, 2, -8, 8, -30, -25, deltaTime);
  moveObstacles(enemies, 4, -8, 8, -30, -25, deltaTime);
  detectCollisions();
  requestAnimationFrame(animate);
  render();
};

function render() {
  renderer.render(scene, camera);
}

menuButtons.handlePlayButton(resetGameState, startGame, gameOver);
menuButtons.handlePlayAgainButton(resetGameState, startGame, gameOver);
menuButtons.handleMainMenuButton(showStartScreen);
