var appLifeGame = appLifeGame || {};

appLifeGame.dotIdentity = function () {
  this.count = 0;
  this.getNextIdentity = function () {
    this.count++;
    return this.count;
  };
};

var currentIdentity = new appLifeGame.dotIdentity();

appLifeGame.createDot = function( x, y ) {

  var dot = function ( x, y ) {
    this.identity = currentIdentity.getNextIdentity()
    this.xCoord = x;
    this.yCoord = y;
    this.jQueryObj = "";
  };

  return new dot( x, y );
};
