var getField  = function getField (options) {
  var width = options.gameOptions.fieldWidth;
  var height = options.gameOptions.fieldHeight;

  var setBoundaries = function setBoundaries (w, h) {
    width = w;
    height = h;
  };

  var getBoundaries = function getBoundaries () {
    return [width, height];
  };
  
  var isPointOutOfBounds = function isPointOutOfBounds (pointArray) {
    var testx = pointArray[0];
    var testy = pointArray[1];
    var result = false;
    if (testx < 0 || testx > width || testy < 0 || testy > height) {
      result = true;
    }
    return result;
  };

  var draw = function draw (ctx) {
    ctx.fillStyle = "#000";
    ctx.strokeStyle = "#000";
    ctx.fillRect(0, 0, width, height);
  };
  
  var fieldObj = {
    setBoundaries: setBoundaries,
    getBoundaries: getBoundaries,
    isPointOutOfBounds: isPointOutOfBounds,
    draw: draw,
  };

  return fieldObj;
};

module.exports = {
  getField: getField,
};
