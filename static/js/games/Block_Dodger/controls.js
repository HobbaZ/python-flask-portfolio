export const controls = () => {
  let keys = {
    right: false,
    left: false,
    reset: false,
  };

  window.addEventListener("keydown", (e) => {
    if (e.key === "d" || e.key === "ArrowRight") {
      keys.right = true;
    }
    if (e.key === "a" || e.key === "ArrowLeft") {
      keys.left = true;
    }
    if (e.key === "r") {
      keys.reset = true;
    }
  });

  window.addEventListener("keyup", (e) => {
    if (e.key === "d" || e.key === "ArrowRight") {
      keys.right = false;
    }
    if (e.key === "a" || e.key === "ArrowLeft") {
      keys.left = false;
    }
    if (e.key === "r") {
      keys.reset = false;
    }
  });

  return keys;
};
