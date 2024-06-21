//Add lights
export const createLights = (THREE, scene) => {
  let hemiLight = new THREE.HemisphereLight(0xebf7fd, 0xebf7fd, 0.2);
  //hemiLight.color.setRGB(0.75,0.8,0.95);
  hemiLight.position.set(0, 20, 20);
  scene.add(hemiLight);
  console.log("Added lights");
};
