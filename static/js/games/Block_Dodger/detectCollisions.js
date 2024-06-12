const score = document.querySelector("#points");

export const detectCollisions = (playerData, THREE, scene, gameState) => {
  // Update player's box
  playerData.playerBox.setFromObject(playerData.player);

  // Check collisions with enemies
  for (let i = 0; i < gameState.enemies.length; i++) {
    const enemyBox = new THREE.Box3().setFromObject(gameState.enemies[i]);
    // An object was hit
    if (enemyBox.intersectsBox(playerData.playerBox)) {
      gameState.gameOver = true;
      return;
    }
  }

  // Check collisions with powerups
  for (let i = 0; i < gameState.powerups.length; i++) {
    const powerupBox = new THREE.Box3().setFromObject(gameState.powerups[i]);
    if (powerupBox.intersectsBox(playerData.playerBox)) {
      // Remove the powerup from the scene
      scene.remove(gameState.powerups[i]);
      // Remove it from the array
      gameState.powerups.splice(i, 1);
      // Update points
      gameState.points += 1;
      score.textContent = gameState.points.toString();
    }
  }
};
