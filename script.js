const canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext("2d");

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // init();
});

function TileObject(tileX, tileY, tileSize, tileType) {
  this.tileX = tileX;
  this.tileY = tileY;
  this.tileSize = tileSize;
  this.tileType = tileType;

  this.draw = () => {
    c.fillStyle = "black";
    c.fillRect(this.tileX, this.tileY, this.tileSize, this.tileSize);
  };

  this.getTileType = () => {
    return this.tileType;
  };
}

const tileArray = [];
function genGrid(gridDimension, gridPixelSize) {
  c.fillStyle = "pink";
  c.fillRect(
    innerWidth / 2 - gridPixelSize / 2,
    innerHeight / 2 - gridPixelSize / 2,
    gridPixelSize,
    gridPixelSize
  );

  const blockSize = gridPixelSize / gridDimension;
  const blockPixelSize = blockSize-1;
  for (let i = 0; i < gridDimension; i++) {
    for (let j = 0; j < gridDimension; j++) {
      tileArray.push(
        new TileObject(
          blockSize / 2 +
            blockSize * i +
            (innerWidth / 2 - gridPixelSize / 2) -
            blockPixelSize / 2
        ,
        blockSize / 2 +
          blockSize * j +
          (innerHeight / 2 - gridPixelSize / 2) -
          blockPixelSize / 2,
        blockPixelSize,
        blockPixelSize
      ));
      console.log('test');
    }
  }
}

function drawTiles(tileArray){
  tileArray.forEach(tile => tile.draw());
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  // genGrid();
}

// init();
// animate();
genGrid(14, 800);
drawTiles(tileArray);
