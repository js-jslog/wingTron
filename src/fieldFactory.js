define(function () {
	var getField  = function getField (options) {
		var width = options.gameOptions.fieldDimensions[0],
		height = options.gameOptions.fieldDimensions[1],
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
		fieldObj = {
			setBoundaries: setBoundaries,
			getBoundaries: getBoundaries,
			isPointOutOfBounds: isPointOutOfBounds
		};
		return fieldObj;
	};
	return {getField: getField};
});