// Add Ground
export const createGround = (THREE, scene) => {
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
};
