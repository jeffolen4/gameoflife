$(document).ready( function () {

var matrix = appLifeGame.matrix;

var Life = {};

Life.CELL_SIZE = 4;
Life.X = 400;
Life.Y = 400;
Life.WIDTH = Life.X / Life.CELL_SIZE;
Life.HEIGHT = Life.Y / Life.CELL_SIZE;
Life.DELAY = 500;
Life.STOPPED = 0;
Life.RUNNING = 1;


var lifeCanvas = $("#life-canvas");
lifeCanvas.css("height",Life.Y);
lifeCanvas.css("width", Life.X);

var ctx = document.getElementById("life-canvas").getContext("2d");

Life.minimum = 2;
Life.maximum = 3;
Life.spawn = 3;

Life.state = Life.STOPPED;
Life.interval = null;

// build initial matrix ( all dead )
Life.grid = matrix(Life.HEIGHT, Life.WIDTH, false);

Life.counter = 0;

// set initial state
Life.grid[15][15] = true;
Life.grid[16][18] = true;
Life.grid[17][14] = true;
Life.grid[17][15] = true;
Life.grid[17][18] = true;
Life.grid[17][19] = true;
Life.grid[17][20] = true;

function evaluateNeighbors ( x, y ) {
  // subtract out current position before evaluating grid
  var total = ( Life.grid[x][y] ) ? 0 : -1;

  for ( var h=-1; h <= 1; h++ ) {
    for ( v=-1;  v <= 1; v++ ) {
      if ( !(Life.grid[ x + h ][ y + v ]) ) {
        total++;
      };
    };
  };
}

function nextGeneration () {
  Life.nextGrid = matrix(Life.HEIGHT, Life.WIDTH, false);
  for ( var h=0; h < Life.WIDTH; h++ ) {
    for ( var v=0; v < Life.HEIGHT; v++ ) {
      var deadCount = evaluateNeighbors( h, v )
      var aliveCount = 8 - deadCount;
      switch (true) {
        case ( Life.grid[h][v] && aliveCount <=2 ) :
          Life.nextGrid[h][v] = false;
          break;
        case ( Life.grid[h][v] && aliveCount > 3) :
          Life.nextGrid[h][v] = false;
          break;
        case ( Life.grid[h][v] && ( aliveCount === 2 || aliveCount === 3 ) ) :
          Life.nextGrid[h][v] = true;
          break;
        case ( !(Life.grid[h][v]) && aliveCount === 3 ) :
          Life.nextGrid[h][v] = true;
          break;
      }
    }
  }
  return Life.nextGrid;
}


function renderGrid( currentGrid ) {
  for ( var h=0; h < Life.WIDTH; h++ ) {
    for ( var v=0; v < Life.HEIGHT; v++ ) {
      ctx.rect( (h*Life.CELL_SIZE), (v*Life.CELL_SIZE), 4, 4 );
      if ( currentGrid[h][v] ) {
        ctx.fillStyle = "white";
      } else {
        ctx.fillStyle = "black";
      }
      ctx.fill();
    };
  };

}

function next () {
  Life.grid = nextGeneration( Life.grid );
  renderGrid( Life.grid );
}

// initialize display;
ctx.rect( 0, 0, Life.X, Life.Y );
ctx.fillStyle = "black";
ctx.fill();

// render the initial grid
renderGrid( Life.grid );

})
