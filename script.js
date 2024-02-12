const grid = document.querySelector(".grid");
document.addEventListener("keydown", (event) => {
  if (["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"].includes(event.key) &&
    [...grid.classList].includes("overlay")) {
    grid.classList.remove('overlay');
  }
});
console.log([...grid.classList].includes("overlay"));
