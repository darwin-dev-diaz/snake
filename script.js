const canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext("2d");

let dXY = [0, 0];

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    dXY[1] = 1;
  } else if (event.key === "ArrowDown") {
    dXY[1] = -1;
  } else if (event.key === "ArrowRight") {
    dXY[0] = 1;
  } else if (event.key === "ArrowLeft") {
    dXY[0] = -1;
  }
  GameController.movePlayerOnGrid();

  dXY = [0,0];
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // init();
});

function createTileObject(tileX, tileY, tileSize, tileType) {
  const colors = {
    border: "#4a4a4a",
    playerHead: "red",
    emptyOne: "#8ECC39",
    emptyTwo: "#A8D948",
  };
  let fillColor = colors[tileType];
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
  const updateTileType = (newTileType) => {
    if (newTileType === "playerHead") {
      tileType = newTileType;
      fillColor = colors.playerHead;
    } else if (newTileType === "emptyOne" || newTileType === "emptyTwo") {
      tileType = newTileType;
      fillColor = colors[newTileType];
    }
  };

  const update = () => {};

  return { draw, getTileType, updateTileType, update };
}

function createPlayerHead(x, y) {
  const playerHeadColor = "red";

  const move = (dx, dy) => {
    x += dx;
    y += dy;
  };

  const getHeadColor = () => playerHeadColor;
  const getX = () => x;
  const getY = () => y;

  return {
    getHeadColor,
    getX,
    getY,
    move,
  };
}

const Grid = ((gridDimension, gridPixelSize) => {
  const grid = [];
  function genGrid() {
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
              "border"
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
              "border"
            )
          );
        } else {
          let colorIndex = (col + row) % 2;
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
              ["emptyOne", "emptyTwo"][colorIndex]
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
  function updateTile(row, col, tileType) {
    grid[row][col].updateTileType(tileType);
  }
  function drawTiles() {
    grid.forEach((row) => row.forEach((cell) => cell.draw()));
  }

  return {
    genGrid,
    drawTiles,
    updateTiles,
    updateTile,
  };
})(14, 700);

const GameController = (() => {
  const playerHead = createPlayerHead(4, 4);
  const startGame = () => {
    Grid.genGrid();
    Grid.updateTile(playerHead.getX(), playerHead.getY(), "playerHead");
  };

  const paintGame = () => {
    Grid.updateTiles();
    Grid.drawTiles();
  };
  const movePlayerOnGrid = () => {
    Grid.updateTile(playerHead.getX(), playerHead.getY(), "emptyOne");
    playerHead.move(dXY[0],dXY[1]);
    Grid.updateTile(playerHead.getX(), playerHead.getY(), "playerHead");

  };

  return {
    startGame,
    paintGame,
    movePlayerOnGrid,
  };
})();

GameController.startGame();
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  GameController.paintGame();
}

animate();
