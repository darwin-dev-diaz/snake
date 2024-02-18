const canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext("2d");

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // init();
});

function TileObject(tileX, tileY, tileSize, tileType, tileEmptyColor) {
  this.tileX = tileX;
  this.tileY = tileY;
  this.tileSize = tileSize;
  this.tileType = tileType;

  this.draw = () => {
    c.fillStyle = tileEmptyColor;
    c.fillRect(this.tileX, this.tileY, this.tileSize, this.tileSize);
  };

  this.getTileType = () => {
    return this.tileType;
  };
}

const tileArray = [];
function genGrid(gridDimension, gridPixelSize) {
  c.fillRect(
    innerWidth / 2 - gridPixelSize / 2,
    innerHeight / 2 - gridPixelSize / 2,
    gridPixelSize,
    gridPixelSize
  );

  const emptyGridColors = ['#8ECC39','#A8D948'];
  const blockSize = gridPixelSize / gridDimension;
  const blockPixelSize = blockSize - 1;
  for (let i = 0; i < gridDimension; i++) {
    for (let j = 0; j < gridDimension; j++) {
      let colorIndex = (i + j) % emptyGridColors.length;
      let color = emptyGridColors[colorIndex];
      tileArray.push(
        new TileObject(
          blockSize / 2 +
            blockSize * i +
            (innerWidth / 2 - gridPixelSize / 2) -
            blockPixelSize / 2,
          blockSize / 2 +
            blockSize * j +
            (innerHeight / 2 - gridPixelSize / 2) -
            blockPixelSize / 2,
          blockPixelSize,
          blockPixelSize,
          color
        )
      );
    }
  }
}

function drawTiles(tileArray) {
  tileArray.forEach((tile) => tile.draw());
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  // genGrid();
}

// init();
// animate();
genGrid(12, 800);
drawTiles(tileArray);
