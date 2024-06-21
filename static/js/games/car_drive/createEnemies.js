// create enemies
export const createEnemies = (
  THREE,
  scene,
  enemies,
  totalObjects,
  randomNumber
) => {
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
};
