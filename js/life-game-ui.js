$(document).ready( function () {

  var createDot = appLifeGame.createDot;

  function rand_10(min, max){
    return Math.round((Math.random()*(max-min)+min)/4)*4;
  }

  for ( var x=1; x <= 400; x=x+4 ) {
    for (var y=1; y <= 400; y=y+4 ) {
      var xCoord = x;
      var yCoord = y;
      var newDot = createDot( xCoord, yCoord );
      newDot.jQueryObj = $(".dot").clone();
      newDot.jQueryObj.removeClass("dot");
      newDot.jQueryObj.attr("id", "dot" + newDot.identity );
      newDot.jQueryObj.css("top", newDot.yCoord + "px");
      newDot.jQueryObj.css("left", newDot.xCoord + "px");
      newDot.jQueryObj.css("background-color","white");
      $(".world").append(newDot.jQueryObj);
    };
  };

})
