const canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext("2d");

const mouse = {
  x: null,
  y: null,
};

window.addEventListener("mousemove", (event) => {
  mouse.x = event.screenX;
  mouse.y = event.screenY;
});

window.addEventListener("keydown", (event) => {
  if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(event.key)){
    console.log('arrow key');
  }
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // init();
});

function createTileObject(tileX, tileY, tileSize, tileType, tileColor) {
  let fillColor = tileColor;
  const draw = () => {
    c.fillStyle = fillColor;
    c.fillRect(tileX, tileY, tileSize, tileSize);
  };

  const getTileType = () => {
    return tileType;
  };
  const changeColor = (color) => {
    fillColor = color;
  };
  const update = () => {};

  return { draw, getTileType, update };
}
const PlayerHead = ((startX, startY,)=>{
  const playerHeadColor = 'red';
  let x = startX;
  let y = startY;

  const update = () => {

  }
  return {
    playerHeadColor,
    x,
    y

  }

})(4,4);
const Grid = ((gridDimension, gridPixelSize) => {
  const grid = [];
  function genGrid() {
    const emptyGridColors = ["#8ECC39", "#A8D948"];
    const borderColor = "#4a4a4a";
    const blockSize = gridPixelSize / gridDimension;
    const blockPixelSize = blockSize - 1;
    for (let row = 0; row < gridDimension; row++) {
      const rowArr = [];
      for (let col = 0; col < gridDimension; col++) {
        if (row === 0 || row === gridDimension - 1) {
          rowArr.push(
            createTileObject(
              blockSize / 2 +
                blockSize * col +
                (innerWidth / 2 - gridPixelSize / 2) -
                blockPixelSize / 2,
              blockSize / 2 +
                blockSize * row +
                (innerHeight / 2 - gridPixelSize / 2) -
                blockPixelSize / 2,
              blockPixelSize + 2,
              "border",
              borderColor
            )
          );
        } else if (col === 0 || col === gridDimension - 1) {
          rowArr.push(
            createTileObject(
              blockSize / 2 +
                blockSize * col +
                (innerWidth / 2 - gridPixelSize / 2) -
                blockPixelSize / 2,
              blockSize / 2 +
                blockSize * row +
                (innerHeight / 2 - gridPixelSize / 2) -
                blockPixelSize / 2,
              blockPixelSize + 2,
              "border",
              borderColor
            )
          );
        } else {
          let colorIndex = (col + row) % emptyGridColors.length;
          let color = emptyGridColors[colorIndex];
          rowArr.push(
            createTileObject(
              blockSize / 2 +
                blockSize * col +
                (innerWidth / 2 - gridPixelSize / 2) -
                blockPixelSize / 2,
              blockSize / 2 +
                blockSize * row +
                (innerHeight / 2 - gridPixelSize / 2) -
                blockPixelSize / 2,
              blockPixelSize + 2,
              "empty",
              color
            )
          );
        }
      }
      grid.push(rowArr);
    }
  }

  function updateTiles() {
    grid.forEach((row) => row.forEach((cell) => cell.update()));
  }
  function drawTiles() {
    grid.forEach((row) => row.forEach((cell) => cell.draw()));
  }

  return {
    grid,
    genGrid,
    drawTiles,
    updateTiles,
  };
})(14, 700);

Grid.genGrid();
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  Grid.updateTiles();
  Grid.drawTiles();
}

animate();
