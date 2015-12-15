define(function () {
	var getField  = function getField (options) {
		var width = options.gameOptions.fieldWidth,
		height = options.gameOptions.fieldHeight,
		setBoundaries = function setBoundaries (w, h) {
			width = w;
			height = h;
		},
		getBoundaries = function getBoundaries () {
			return [width, height];
		},
		isPointOutOfBounds = function isPointOutOfBounds (pointArray) {
			var testx = pointArray[0],
			testy = pointArray[1],
			result = false;
			if (testx < 0 || testx > width || testy < 0 || testy > height) {
				result = true;
			}
			return result;
		},
		draw = function draw (ctx) {
			ctx.fillStyle = "#000";
			ctx.strokeStyle = "#000";
			ctx.fillRect(0, 0, width, height);
		},
		fieldObj = {
			setBoundaries: setBoundaries,
			getBoundaries: getBoundaries,
			isPointOutOfBounds: isPointOutOfBounds,
			draw: draw
		};
		return fieldObj;
	};
	return {getField: getField};
});