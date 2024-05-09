// main.js
import * as THREE from "https://cdn.skypack.dev/three@0.133.1";
//import { OrbitControls } from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/controls/OrbitControls";

document.body.style.overflow = "hidden";
const pointsUI = document.querySelector("#ui");
const score = document.querySelector("#points");
const menuScreen = document.querySelector("#menuScreen");
const startScreenContainer = menuScreen.querySelector("#startScreenContainer");
const playBtn = startScreenContainer.querySelector("#playBtn");
const gameOverScreenContainer = menuScreen.querySelector(
  "#gameOverScreenContainer"
);
const gameOverMessage =
  gameOverScreenContainer.querySelector("#gameOverMessage");
const playAgainBtn = gameOverScreenContainer.querySelector("#playAgainBtn");
const mainMenuBtn = gameOverScreenContainer.querySelector(".mainMenuBtn");
const clock = new THREE.Clock();

let points = 0;
let gameOver = true;
let gameStart = true;
let gameTitleName = "Test Game";
let enemies = [];
let powerups = [];
let speed = 0.05;
let totalObjects = 7;

let camera, scene, renderer, player, playerBox;

// Generate a random whole number
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//initial start menu
if (gameStart) {
  menuScreen.style.display = "block";
  startScreenContainer.style = "display:block; z-index:2;";
  gameOverScreenContainer.style = "display:none; z-index:1;";
  pointsUI.style.display = "none";
}

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
  //Set renderer size to full screen
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Auto resize window
  window.addEventListener("resize", onWindowResize, false);
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  return;
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
      gameOver = true;
      console.log("game over");
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
    console.log("enemy speed " + power);
    if (el.position.z > camera.position.z) {
      el.position.x = randomNumber(minX, maxX);
      el.position.z = randomNumber(minZ, maxZ);
    }
  });
}

function updatePlayerPos(deltaTime) {
  const playerWidth = 1;

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

function animate() {
  if (gameOver) {
    menuScreen.style.display = "block";
    gameOverScreenContainer.style = "display:block; z-index:1;";
    pointsUI.style.display = "none";
    gameOverMessage.innerHTML =
      "<div><h1>GAME OVER</h1><br/><h3>You scored " +
      points.toString() +
      `${points === 1 ? " point" : " points"}</h3></div>`;
    enemies.forEach((el) => {
      scene.remove(el);
    });

    powerups.forEach((el) => {
      scene.remove(el);
    });

    if (player.position.z > camera.position.z) {
      scene.remove(player);
    }
    console.log("game ended");
    return;
  } else {
    const deltaTime = clock.getDelta();
    updatePlayerPos(deltaTime);
    pointsUI.style.display = "block";
    menuScreen.style.display = "none";
    gameOverScreenContainer.style = "display:none; z-index:1;";
    startScreenContainer.style.display = "none";
    moveObstacles(powerups, 2, -8, 8, -30, -25, deltaTime);
    moveObstacles(enemies, 4, -8, 8, -30, -25, deltaTime);

    detectCollisions();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
}

// Add an event listener for the play button
playAgainBtn.addEventListener("click", () => {
  resetGameState();
});

// Add an event listener for the play button
mainMenuBtn.addEventListener("click", () => {
  menuScreen.style.display = "block";
  startScreenContainer.style = "display:block; z-index:2;";
  gameOverScreenContainer.style = "display:none; z-index:1;";
});

playBtn.addEventListener("click", () => {
  resetGameState();
});

// Function to reset game state
function resetGameState() {
  points = 0;
  gameStart = false;
  gameOver = false;
  enemies = [];
  powerups = [];
  init();
  animate();
}
