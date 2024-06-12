//Add lights
export const createLights = (THREE, scene) => {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight.position.set(10, 20, 0);
  scene.add(ambientLight, directionalLight);
  console.log("Added lights");
};
