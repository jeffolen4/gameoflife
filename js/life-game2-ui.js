$(document).ready( function () {


var matrix = appLifeGame.matrix;
var canvas = $("#life-canvas");
var start = $("#start");

var Life = {};

Life.CELL_SIZE = 4;
Life.X = 400;
Life.Y = 400;
Life.WIDTH = Life.X / Life.CELL_SIZE;
Life.HEIGHT = Life.Y / Life.CELL_SIZE;
Life.DELAY = 200;
Life.STOPPED = 0;
Life.RUNNING = 1;

Life.minimum = 2;
Life.maximum = 3;
Life.spawn = 3;

Life.state = Life.STOPPED;
Life.generations = 200;
Life.currentGeneration = 0;

var lifeCanvas = $("#life-canvas");
lifeCanvas.css("height",Life.Y);
lifeCanvas.css("width", Life.X);

var ctx = document.getElementById("life-canvas").getContext("2d");

// build initial matrix ( all dead )
Life.grid = matrix(Life.HEIGHT, Life.WIDTH, false);
Life.initialState = Life.grid;

Life.counter = 0;

// set initial state
function setDefaultInitialState() {
  Life.grid[25][15] = true;
  Life.grid[26][18] = true;
  Life.grid[27][14] = true;
  Life.grid[27][15] = true;
  Life.grid[27][16] = true;
  Life.grid[27][17] = true;
  Life.grid[27][18] = true;
}

function evaluateNeighbors ( x, y ) {
  // subtract out current position before evaluating grid
  var total = ( Life.grid[x][y] ) ? -1 : 0;

  // evaluate all neighbors to find count of living
  for ( var h=-1; h <= 1; h++ ) {
    for ( v=-1;  v <= 1; v++ ) {
      if ( x + h >= 0
          && y + v >= 0
          && x + h < Life.WIDTH
          && x + v < Life.HEIGHT ) {
        if ( (Life.grid[ x + h ][ y + v ]) ) {
          total++;
        };
      };
    };
  };
  return total;
}

// evaluate all cells and build new matrix for next generation
function nextGeneration () {

  var changes = false;

  Life.nextGrid = matrix(Life.HEIGHT, Life.WIDTH, false);

  for ( var h=0; h < Life.WIDTH; h++ ) {
    for ( var v=0; v < Life.HEIGHT; v++ ) {

      // get the number of living neighbors
      var aliveCount = evaluateNeighbors( h, v )

      switch (true) {
        // Live cell dies if less than 2 live neighbors
        case ( Life.grid[h][v] && aliveCount < Life.minimum ) :
          Life.nextGrid[h][v] = false;
          changes = true;
          break;
        // Live cell dies if more than 3 live neighbors
        case ( Life.grid[h][v] && aliveCount > Life.maximum ) :
          Life.nextGrid[h][v] = false;
          changes = true;
          break;
        // Live cell continues to next generation if
        //   exactly 2 or 3 living neighbors
        case ( Life.grid[h][v] &&
                ( aliveCount === Life.minimum || aliveCount === Life.maximum ) ) :
          Life.nextGrid[h][v] = true;
          break;
        // Dead cell regenerates if exactly 3 living neighbors
        case ( !(Life.grid[h][v]) && aliveCount === Life.maximum ) :
          Life.nextGrid[h][v] = true;
          changes = true;
          break;
      }
    }
  }
  // return the updated
  if ( changes ) {
    return Life.nextGrid;
  } else {
    return false;
  }
}

function renderCell( currentState, x, y ) {
  if ( currentState ) {
    ctx.fillStyle = "white";
  } else {
    ctx.fillStyle = "black";
  }
  ctx.fillRect( (x*Life.CELL_SIZE), (y*Life.CELL_SIZE), 4, 4 );

}

function renderGrid( currentGrid ) {

  for ( var h=0; h < Life.WIDTH; h++ ) {
    for ( var v=0; v < Life.HEIGHT; v++ ) {
      renderCell( currentGrid[h][v], h, v);
    };
  };

}

function next () {
  // increment the generation
  Life.currentGeneration++;
  // if we have reached the set number of generations
  //   then clear the interval
  if ( Life.currentGeneration >= Life.generations ) {
    clearInterval( Life.interval );
  } else {
    Life.grid = nextGeneration( Life.grid );
    // nextGeneration will return false if nothing changed
    //  if that occurs then clear the interval.
    if ( !(Life.grid) ) {
      clearInterval( Life.interval );
    } else {
      // otherwise re-render the grid
      renderGrid( Life.grid );
    }
  }
}

// click on the canvas to set the initial state
canvas.click( function (event) {

  var x = Math.floor(event.offsetX / Life.CELL_SIZE);
  var y = Math.floor(event.offsetY / Life.CELL_SIZE);

  // toggle current state of selected cell
  Life.grid[x][y] = !(Life.grid[x][y]);

  // render only that cell
  renderCell( Life.grid[x][y], x, y );

  return false;
})

start.click( function (e) {
  // save the current initial state to allow for reset
  Life.initialState = Life.grid;
  // reset the current generation to zero
  Life.currentGeneration = 0;
  // render the initial grid
  renderGrid( Life.grid );
  // set the interval for subsequent generations
  Life.interval = setInterval( next, Life.DELAY );
})

$("#default").click( function (e) {
  // reset to blank grid
  Life.grid = matrix(Life.HEIGHT, Life.WIDTH, false);
  // set the default initial state
  setDefaultInitialState();
  // render the grid
  renderGrid( Life.grid );
})

$("#reset").click( function (e) {
  // reset to blank grid
  Life.grid = Life.initialState;
  renderGrid( Life.grid );
})

$("#clear").click( function (e) {
  // reset to blank grid
  Life.grid = matrix(Life.HEIGHT, Life.WIDTH, false);
  renderGrid( Life.grid );
})

$("#stop").click( function () {
  Life.currentGeneration = Life.generations;
})


// initialize display;
ctx.rect( 0, 0, Life.X, Life.Y );
ctx.fillStyle = "black";
ctx.fill();

})
