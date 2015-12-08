define(["./lineIntersects"], function (lineIntersects) {
	var boundaryHit = function boundaryHit (playerCoords, fieldBounds) {
		var px = playerCoords[0],
		py = playerCoords[1],
		
		fx = fieldBounds[0],
		fy = fieldBounds[1];
		
		if (px < 0 || py < 0 || px > fx || py > fy) {
			return true;
		}
		return false;
	},
	isPointWithinPath = function isPointWithinPath (point, path) {
		if (isDetailedIntersect(point, path) === true) {
			return true;
		}
		return false;
	},
	isSimpleIntersect = function isSimpleIntersect (point, path) {
		var x = point[0],
		y = point[1],
		minx, maxx,
		miny, maxy;
		path.forEach(function (pathPoint) {
			if (minx === undefined || minx > pathPoint[0]) {
				minx = pathPoint[0];
			}
			if (maxx === undefined || maxx < pathPoint[0]) {
				maxx = pathPoint[0];
			}
			if (miny === undefined || miny > pathPoint[1]) {
				miny = pathPoint[1];
			}
			if (maxy === undefined || maxy < pathPoint[1]) {
				maxy = pathPoint[1];
			}
		});
		if (point[0] <= minx || point[0] >= maxx || point[1] <= miny || point[1] >= maxy) {
			return false;
		}
		return true;
	},
	isDetailedIntersect = function isDetailedIntersect (point, path) {
		// Make faster??
		// create a ray from our point out to the right
		// get all the lines forom the polygon which cross the y coord of our ray
		// check how many times our ray intersects those
		var extraPath,
		intCount = 0,
		ray = [point, [9999, point[1]]];
		path.forEach(function (pathPoint, index, array) {
			if (pathPoint[1] !== point[1]) { // ignore instances where the line hits a point twice by ignoring one of the lines for which this is true
				if (index === path.length-1) {
					extraPath = array[0];
				} else {
					extraPath = array[index+1];
				}
				if (lineIntersects.isIntersection(ray, [pathPoint,extraPath]) === true) {
					intCount +=1;
				}
			}
		});
		if (intCount%2 === 1) {
			return true;
		}
		return false;
	};
	return {boundaryHit: boundaryHit,
			isPointWithinPath: isPointWithinPath
			};
});