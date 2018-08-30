import PolygonIntersect from '~/polygonIntersect.js';

var boundaryHit = function boundaryHit (playerCoords, fieldBounds) {
  var px = playerCoords[0];
  var py = playerCoords[1];
  
  var fx = fieldBounds[0];
  var fy = fieldBounds[1];
  
  if (px < 0 || py < 0 || px > fx || py > fy) {
    return true;
  }
  return false;
};

var isPointWithinPath = function isPointWithinPath (point, path) {
  if (isSimpleIntersect(point, path) === true && isDetailedIntersect(point, path) === true) {
    return true;
  }
  return false;
};

var isSimpleIntersect = function isSimpleIntersect (point, path) {
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
};

var isDetailedIntersect = function isDetailedIntersect (point, path) {
  return PolygonIntersect.inPolygon(point, path);
};

module.exports = {
  boundaryHit: boundaryHit,
  isPointWithinPath: isPointWithinPath,
};
