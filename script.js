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
    return this.tileType;
  };

  const update = () => {
    if (
      Math.abs(tileX + tileSize / 2 - mouse.x) < 10 &&
      Math.abs(tileY + tileSize / 2 - mouse.y + 100) < 10
    ) {
      fillColor = "red";
    }
  };

  return { draw, getTileType, update };
}

const Grid = ((gridDimension, gridPixelSize) => {
  const tileArray = [];
  function genGrid() {
    const emptyGridColors = ["#8ECC39", "#A8D948"];
    const borderColor = "#4a4a4a";
    const blockSize = gridPixelSize / gridDimension;
    const blockPixelSize = blockSize - 1;
    for (let i = 0; i < gridDimension; i++) {
      tileArray.push(
        createTileObject(
          blockSize / 2 +
            blockSize * i +
            (innerWidth / 2 - gridPixelSize / 2) -
            blockPixelSize / 2,
          blockSize / 2 +
            (innerHeight / 2 - gridPixelSize / 2) -
            blockPixelSize / 2,
          blockPixelSize + 2,
          "empty",
          borderColor
        )
      );
    }
    for (let i = 0; i < gridDimension; i++) {
      for (let j = 1; j < gridDimension - 1; j++) {
        if (!(i === 0 || i === gridDimension - 1)) {
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
              blockPixelSize + 2,
              "empty",
              color
            )
          );
        } else {
          color = "grey";
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
              blockPixelSize + 2,
              "border",
              borderColor
            )
          );
        }
      }
    }
    for (let i = 0; i < gridDimension; i++) {
      tileArray.push(
        createTileObject(
          blockSize / 2 +
            blockSize * i +
            (innerWidth / 2 - gridPixelSize / 2) -
            blockPixelSize / 2,
          blockSize / 2 +
            blockSize * (gridDimension - 1) +
            (innerHeight / 2 - gridPixelSize / 2) -
            blockPixelSize / 2,
          blockPixelSize + 2,
          "empty",
          borderColor
        )
      );
    }
  }

  function updateTiles() {
    tileArray.forEach((tile) => tile.update());
  }
  function drawTiles() {
    tileArray.forEach((tile) => tile.draw());
  }

  return {
    genGrid,
    drawTiles,
    updateTiles,
  };
})(20, 800);

Grid.genGrid();
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  Grid.updateTiles();
  Grid.drawTiles();
}

animate();
