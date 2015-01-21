var appLifeGame = appLifeGame || {};

appLifeGame.matrix = function ( rows, columns ) {
  var x, y, col
  var mat = [];

  for ( x=0; x < rows; x++ ) {
    // add columns
    col = [];
    for ( y=0; y < columns; y++ ) {
      col[y] = false;
    };
    mat[x] = col;
  };
  return mat;
};
