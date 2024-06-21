//create powerups
export const createPowerups = (
  THREE,
  scene,
  powerups,
  totalObjects,
  randomNumber
) => {
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
};
