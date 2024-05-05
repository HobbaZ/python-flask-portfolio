// main.js
import * as THREE from "https://cdn.skypack.dev/three@0.133.1";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/controls/OrbitControls";

const clock = new THREE.Clock();
let delta;

const world = new CANNON.World();
world.gravity.set(0, -9.82, 0); //Earth's gravity
world.broadphase = new CANNON.NaiveBroadphase();
world.solver.iterations = 10;
world.allowSleep = true;

document.body.style.overflow = "hidden";

const pointsUI = document.querySelector("#points");
let points = 0;
let gameOver = true;
let gameStart = false;
let gameTitleName = "Test Game";

const gameStartScreen = document.querySelector("#gameTitleScreen");
const gameTitle = document.querySelector("#gameTitle");
const playButton = document.querySelector("#playButton");
const controlsButton = document.querySelector("#controlsButton");
const gameOverScreen = document.querySelector("#gameOverScreen");
const playAgain = document.querySelector("#playAgain");

function showGameStartScreen() {
  gameStartScreen.style.display = "block";
  pointsUI.style.display = "hidden";
  gameTitle.textContent = gameTitleName;
  playButton.addEventListener("click", () => {
    gameStartScreen.style.display = "none";
    gameStart = true;
  });
}

showGameStartScreen();

function showGameOver() {
  gameOver = true;
  gameOverScreen.style.display = "block";
  gameOverScreen.textContent = "GAME OVER n you scored " + points;
  if (playAgain) {
    gameStart = true;
  }
}

function showControls() {
  gameScreen.style.display = "none";
}

function startScreen() {
  playButton.addEventListener("click", () => {
    gameScreen.style.display = "none";
    gameStart = true;
  });

  controlsButton.addEventListener("click", () => {
    showControls();
  });
}

// generate a random whole number
const randomRangeNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// move obstacles toward player
const moveObstacles = (arr, speed, maxX, minX, maxZ, minZ) => {
  arr.forEach((el) => {
    el.body.position.z += speed;
    if (el.body.position.z > camera.position.z) {
      el.body.position.x = randomRangeNum(maxX, minX);
      el.body.position.z = randomRangeNum(maxZ, minZ);
    }
    el.mesh.position.copy(el.body.position);
    el.mesh.quaternion.copy(el.body.quaternion);
  });
};

var Colors = {
  red: 0xf25346,
  white: 0xd8d0d1,
  brown: 0x59332e,
  pink: 0xf5986e,
  brownDark: 0x23190f,
  blue: 0x68c3c0,
};

const scene = new THREE.Scene();

scene.fog = new THREE.FogExp2(Colors.pink, 0.1, 50);

const camera = new THREE.PerspectiveCamera(
  75, //field of view
  window.innerWidth / window.innerHeight, //aspect ratio
  0.1, //near plane
  1000 //far plane
);

//set camera position
camera.position.z = 5;

//Renderer creation
const renderer = new THREE.WebGLRenderer({
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

//create player
const player = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshNormalMaterial()
);
scene.add(player);

const playerBody = new CANNON.Body({
  mass: 1,
  shape: new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)),
  fixedRotation: true,
});
world.addBody(playerBody);

//create ground
const ground = new THREE.Mesh(
  new THREE.BoxGeometry(30, 1, 30),
  new THREE.MeshBasicMaterial({ color: Colors.brown })
);
ground.position.y = -1;
scene.add(ground);

const groundBody = new CANNON.Body({
  shape: new CANNON.Box(new CANNON.Vec3(15, 0.5, 15)),
});
world.addBody(groundBody);

//create powerups
const powerups = [];
for (let i = 0; i < 10; i++) {
  const powerup = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial({ color: Colors.red })
  );
  powerup.name = "powerup" + i + 1;
  powerup.scale.set(0.2, 0.2, 0.2);
  const posX = randomRangeNum(8, -8);
  const posZ = randomRangeNum(5, -5);
  scene.add(powerup);

  const powerupBody = new CANNON.Body({
    shape: new CANNON.Sphere(0.2),
  });
  powerupBody.position.set(posX, 0, posZ);
  world.addBody(powerupBody);

  const powerupObject = {
    mesh: powerup,
    body: powerupBody,
  };
  powerups.push(powerupObject);
}

//create enemies
const enemies = [];
for (let i = 0; i < 10; i++) {
  const enemy = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial({ color: Colors.blue })
  );
  enemy.name = "enemy" + i + 1;
  enemy.scale.set(0.5, 0.5, 0.5);
  const enemyPosX = randomRangeNum(8, -8);
  const enemyPosZ = randomRangeNum(5, -5);
  scene.add(enemy);

  const enemyBody = new CANNON.Body({
    shape: new CANNON.Sphere(0.2),
  });
  enemyBody.position.set(enemyPosX, 0, enemyPosZ);
  world.addBody(enemyBody);

  const enemyObject = {
    mesh: enemy,
    body: enemyBody,
  };
  enemies.push(enemyObject);
}

// player collision
playerBody.addEventListener("collide", (e) => {
  powerups.forEach((el) => {
    if (e.body === el.body) {
      el.body.position.x = randomRangeNum(8, -8);
      el.body.position.z = randomRangeNum(-5, -10);
      el.mesh.position.copy(el.body.position);
      el.mesh.quaternion.copy(el.body.quaternion);
      points += 1;
      pointsUI.textContent = points.toString();
    }
  });

  //enemy collision
  enemies.forEach((el) => {
    if (e.body === el.body) {
      gameOver = true;
    }
  });
});

//player movement
window.addEventListener("keydown", (e) => {
  if (e.key === "d" || e.key === "ArrowRight") {
    player.position.x += 0.05;
  }

  if (e.key === "a" || e.key === "ArrowLeft") {
    player.position.x -= 0.05;
  }

  if (e.key === "r") {
    player.position.x = 0;
    player.position.y = 0;
    player.position.z = 0;
  }

  if (e.key === " ") {
    player.position.y = 2;
  }
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.y = 0.5;

controls.update();

function animate() {
  if (!gameOver) {
    delta = clock.getDelta();
    world.step(delta);
    requestAnimationFrame(animate);
    moveObstacles(powerups, 0.1, 8, -8, -5, -10);
    moveObstacles(enemies, 0.2, 8, -8, -5, -10);
  } else {
    showGameOver();
    playerBody.velocity.set(playerBody.position.x, 5, 5);

    enemies.forEach((el) => {
      scene.remove(el.mesh);
      world.removeBody(el.body);
    });

    powerups.forEach((el) => {
      scene.remove(el.mesh);
      world.removeBody(el.body);
    });

    if (playerBody.position.z > camera.position.z) {
      scene.remove(player);
      world.removeBody(playerBody);
    }
  }

  controls.update();
  playerBody.position.copy(player.position);
  playerBody.quaternion.copy(player.quaternion);
  renderer.render(scene, camera);
}

animate();
