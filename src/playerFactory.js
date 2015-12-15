define(function () {
	var pi = Math.PI,
	radianLookup = {E : pi*0,	SE : pi*0.25,
					S : pi*0.5,	SW : pi*0.75,
					W : pi*1,	NW : pi*1.25,
					N : pi*1.5,	NE : pi*1.75
				   },
	beginPath = function beginPath (path, coords) {
		path.length = 0;
		path.push([].slice.call(coords, 0));
		path.push([].slice.call(coords, 0));
		path.push([].slice.call(coords, 0));
	},
	updatePathPoint = function updatePathPoint (path, coords) {
		path[1][0] = path[0][0];
		path[1][1] = path[0][1];
		path[0][0] = coords[0];
		path[0][1] = coords[1];
	},
	addPathTurn = function addPathTurn (path) {
		path[1][0] = path[0][0];
		path[1][1] = path[0][1];
		path.unshift([].slice.call(path[0], 0));
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
	drawPath = function drawPath (ctx, path) {
		var path2d = new Path2D(),
		pathRecord = [].slice.call(path, 0).reverse();

		path2d.moveTo(pathRecord[0][0], pathRecord[0][1]);
		pathRecord.forEach(function (coord) {
			path2d.lineTo(coord[0], coord[1]);
		});
		ctx.fillStyle = "rgba(255, 60, 52, 0.5)";
		ctx.strokeStyle = "rgba(255, 60, 52, 0.5)";
		ctx.fill(path2d);
	},
	drawSelf = function drawSelf (ctx, coords) {
		var selfSize = 3,
		offset = 1;
		ctx.fillStyle = "rgba(255, 60, 52, 0.5)";
		ctx.strokeStyle = "rgba(255, 60, 52, 0.5)";
		ctx.fillRect(coords[0]-offset, coords[1]-offset, selfSize, selfSize);
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
			return path.slice(1);
		},
		draw = function draw (ctx) {
			drawPath(ctx, path);
			drawSelf(ctx, coords);
		},
		playerObj = {
			setCoords: setCoords,
			getCoords: getCoords,
			turnLeft: turnLeft,
			turnRight: turnRight,
			move: move,
			die: die,
			isAlive: isAlive,
			getPath: getPath,
			draw: draw
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