// create player
export const createPlayer = (THREE, scene) => {
  let player = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({
      color: "yellow",
      shininess: 100,
    })
  );
  let playerBox = new THREE.Box3().setFromObject(player);
  scene.add(player);
  console.log("Added player");

  return { player, playerBox };
};
