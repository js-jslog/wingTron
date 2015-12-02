var pi = Math.PI,
	radianLookup = {E : pi*0,	SE : pi*0.25,
					S : pi*0.5,	SW : pi*0.75,
					W : pi*1,	NW : pi*1.25,
					N : pi*1.5,	NE : pi*1.75
				   };


var getField = function getField () {
	var width = 100,
	height = 100,
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


var getPlayer = function getPLayer () {
	var coords = [0,0],
	speed = 1,
	direction = 0,
	alive = true,
	path = [],
	setCoords = function setCoords (arrayPoint) {
		coords = arrayPoint;
		beginPath(path, coords);
	},
	getCoords = function getCoords () {
		return coords;
	},
	turnLeft = function turnLeft () {
		direction -= pi*0.5;
		addPathTurn(path);
	},
	turnRight = function turnRight () {
		direction += pi*0.5;
		addPathTurn(path);
	},
	move = function move () {
		if (alive) {
			coords[0] += speed * Math.cos(direction);
			coords[1] += speed * Math.sin(direction);
			updatePathPoint(path, coords);
		}
	},
	die = function die () {
		alive = false;
	},
	isAlive = function isAlive () {
		return alive;
	},
	getPath = function getPath () {
		return path;
	},
	playerObj = {
		setCoords: setCoords,
		getCoords: getCoords,
		turnLeft: turnLeft,
		turnRight: turnRight,
		move: move,
		die: die,
		isAlive: isAlive,
		getPath: getPath
	},
	beginPath = function beginPath (path, coords) {
		path.length = 0;
		path.push([]);
		updatePathPoint(path, coords);
		addPathTurn(path);
	},
	updatePathPoint = function updatePathPoint (path, coords) {
		path[0][0] = coords[0];
		path[0][1] = coords[1];
	},
	addPathTurn = function addPathTurn (path) {
		var turnCood = [];
		turnCood[0] = path[0][0];
		turnCood[1] = path[0][1];
		path.unshift(turnCood);
	};
	beginPath(path, coords);
	return playerObj;
};

var getArena = function getIntegration () {
	var players = [],
	field,
	addPlayer = function addPlayer (p) {
		players.push(p);
	},
	getPlayers = function getPlayers () {
		return players;
	},
	setField = function setField (f) {
		field = f;
	},
	getField = function getField () {
		return field;
	},
	stepTime = function stepTime () {
		players.forEach(function (player, index, array) {
			if (player.isAlive()) {
				player.move();
				if (!isPlayerSafe(player, array, field)) {
					player.die();
				}
			}
		});
	},
	arenaObject = {
		addPlayer: addPlayer,
		getPlayers: getPlayers,
		setField: setField,
		getField: getField,
		stepTime: stepTime
	},
	isPlayerSafe = function isPlayerSafe (p, allPlayers, f) {
		var playerCoords = p.getCoords(),
		px = playerCoords[0],
		py = playerCoords[1],
		fieldBounds = f.getBoundaries(),
		fx = fieldBounds[0],
		fy = fieldBounds[1],
		pathHit;
		if (px < 0 || py < 0 || px > fx || py > fy) {
			return false;
		}
		pathHit = allPlayers.some(function (player) {
			return isPointWithinPath(p.getCoords(), player.getPath());
		});
		return !pathHit;
	};
	return arenaObject;
};

// needs improving for more complex shapes
var isPointWithinPath = function (point, path) {
	var simpleCheck = (function () {
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
	}());
	if (simpleCheck === false) {
		return false;
	}
	// Going to need to improve this check for more complex shapes
	return true;
};