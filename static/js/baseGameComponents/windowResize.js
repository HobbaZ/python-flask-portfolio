export const windowResize = (renderer, camera, scene) => {
  //Set renderer size to full screen
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Auto resize window
  window.addEventListener("resize", onWindowResize, false);
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }
};
