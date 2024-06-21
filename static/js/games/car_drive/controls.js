export const controls = () => {
  let keys = {
    forward: false,
    backward: false,
    right: false,
    left: false,
    reset: false,
  };

  window.addEventListener("keydown", (e) => {
    if (e.key === "w" || e.key === "W" || e.key === "ArrowUp") {
      keys.forward = true;
    }

    if (e.key === "s" || e.key === "S" || e.key === "ArrowDown") {
      keys.backward = true;
    }

    if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") {
      keys.right = true;
    }
    if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") {
      keys.left = true;
    }
    if (e.key === "r" || e.key === "R") {
      keys.reset = true;
    }
  });

  window.addEventListener("keyup", (e) => {
    if (e.key === "w" || e.key === "W" || e.key === "ArrowUp") {
      keys.forward = false;
    }

    if (e.key === "s" || e.key === "S" || e.key === "ArrowDown") {
      keys.backward = false;
    }

    if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") {
      keys.right = false;
    }
    if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") {
      keys.left = false;
    }
    if (e.key === "r" || e.key === "R") {
      keys.reset = false;
    }
    if (e.key === "Escape") {
      window.location.href = "/games";
    }
  });

  return keys;
};
