const canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext("2d");

let dXY = [0, 0];

window.addEventListener("keypress", (event) => {
  if (event.key === "d") {
    dXY[1] = 1;
    dXY = [0, 1];
  } else if (event.key === "a") {
    dXY = [0, -1];
  } else if (event.key === "w") {
    dXY = [-1, 0];
  } else if (event.key === "s") {
    dXY = [1, 0];
  }
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // init();
});

const emptyColors = [
  "#A8D948",
  "#8ECC39",
  "#a1cc4b",
  "#A8D948",
  "#8ECC39",
  "#a1cc4b",
];
let emptyIndex = 0;
function createTileObject(tileX, tileY, tileSize, tileType) {
  const originalTileType = tileType;
  const colors = {
    border: "#4a4a4a",
    playerHead: "red",
    empty: emptyColors[++emptyIndex % emptyColors.length],
    banana: "yellow",
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
    // if (newTileType === "playerHead") {
    //   tileType = newTileType;
    //   fillColor = colors.playerHead;
    // } else if (newTileType === "empty") {
    //   tileType = newTileType;
    //   fillColor = colors.empty;
    // }

    tileType = newTileType;
    fillColor = colors[tileType];
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
function createGridObject(gridDimension, gridPixelSize) {
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
              "empty"
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
  function getTile(row, col) {
    return grid[row][col];
  }

  return {
    genGrid,
    drawTiles,
    updateTiles,
    updateTile,
    getTile,
  };
}

const GameController = (() => {
  const gridDimension = 20;
  const gridPixelSize = 700;
  const Grid = createGridObject(gridDimension, gridPixelSize);
  let playerHead = createPlayerHead(4, 4);
  const startGame = () => {
    Grid.genGrid();
    Grid.updateTile(playerHead.getX(), playerHead.getY(), "playerHead");
    placeBanana();
  };

  const paintGame = () => {
    Grid.updateTiles();
    Grid.drawTiles();
  };

  const placeBanana = () => {
    let row = 0;
    let col = 0;
    while (true) {
      row = Math.floor(Math.random() * gridDimension);
      col = Math.floor(Math.random() * gridDimension);
      const targetTile = Grid.getTile(row, col);
      console.log('running while loop');
      console.log('');
      if (targetTile.getTileType() === "empty") {
        Grid.updateTile(row, col, 'banana');
        console.log('placed banana');
        break;
      }
    }
  };

  const movePlayerOnGrid = () => {
    if (playerHead) {
      const targetTile = Grid.getTile(
        playerHead.getX() + dXY[0],
        playerHead.getY() + dXY[1]
      );
      // collision
      if (targetTile.getTileType() === "border") {
        Grid.updateTile(playerHead.getX(), playerHead.getY(), "empty");
        playerHead = null;
        console.log("player is dead lmao");
      }
      else {
        if (targetTile.getTileType() === 'banana'){
          placeBanana();
        }
        Grid.updateTile(playerHead.getX(), playerHead.getY(), "empty");
        playerHead.move(dXY[0], dXY[1]);
        Grid.updateTile(playerHead.getX(), playerHead.getY(), "playerHead");
      }
    }
  };

  return {
    startGame,
    paintGame,
    movePlayerOnGrid,
  };
})();

let frames = 0;
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  if (frames === 7) {
    GameController.movePlayerOnGrid();
    frames = 0;
  }

  frames++;
  // console.log(frames);
  GameController.paintGame();
}

GameController.startGame();
animate();
