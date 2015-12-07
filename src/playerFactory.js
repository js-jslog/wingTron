define(function () {
	var pi = Math.PI,
	radianLookup = {E : pi*0,	SE : pi*0.25,
					S : pi*0.5,	SW : pi*0.75,
					W : pi*1,	NW : pi*1.25,
					N : pi*1.5,	NE : pi*1.75
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
	},
	attachSetterToKeystateMap = function attachSetterToKeystateMap (keystateMap, code, func) {
		Object.defineProperty(keystateMap, code, {
		    set: function (value) {
		      if (value === true) {
		      	func();
		      }
		    },
		    configurable: true
		});
	},
	getPlayer = function getPlayer (options) {
		var coords, speed, direction, alive, path, keystateMap, leftCode, rightCode,
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
		initialise = function initialise () {
			coords = options.playerOptions.startCoord.slice();
			speed = options.playerOptions.speed || 1;
			direction = options.playerOptions.direction || 0;
			keystateMap = options.environmentOptions.keystateMap;
			leftCode = options.playerOptions.keyCodes.leftCode;
			rightCode = options.playerOptions.keyCodes.rightCode;
			attachSetterToKeystateMap(keystateMap, leftCode, turnLeft);
			attachSetterToKeystateMap(keystateMap, rightCode, turnRight);
			alive = true;
			path = [];
			beginPath(path, coords);
		};
		initialise();
		return playerObj;
	};
	return {getPlayer: getPlayer};
});