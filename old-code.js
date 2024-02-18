const canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext("2d");

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // init();
});

function createTileObject(tileX, tileY, tileSize, tileType, tileEmptyColor) {

  const draw = () => {
    c.fillStyle = tileEmptyColor;
    c.fillRect(tileX, tileY, tileSize, tileSize);
  };

  const getTileType = () => {
    return this.tileType;
  };

  return {draw, getTileType}
}

const Grid = ((gridDimension, gridPixelSize)=>{
  const tileArray = [];
  function genGrid() {
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
          createTileObject(
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

  function drawTiles() {
    tileArray.forEach((tile) => tile.draw());
  }

  return {
    genGrid,
    drawTiles
  }

})(12, 800);



function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  
  Grid.genGrid();
  Grid.drawTiles();
}


animate();