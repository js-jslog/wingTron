define(function () {
	// needs improving for more complex shapes
	var isPointWithinPath = function isPointWithinPath (point, path) {
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
	var getReferee = function getReferee (options) {
		var players,
		field,
		scores,
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
			deathRound = false;
			players.forEach(function (player, index, array) {
				if (player.isAlive()) {
					player.move();
					if (isPlayerSafe(player, array, field) === false) {
						player.die();
						deathRound = true;
					}
				}
			});
			if (deathRound === true) {
				scores.forEach(function (score, index) {
					if (players[index].isAlive() === true) {
						scores[index] +=1;		
					}
				});
			}
		},
		refereeObject = {
			addPlayer: addPlayer,
			getPlayers: getPlayers,
			setField: setField,
			getField: getField,
			stepTime: stepTime
		},
		initialise = function initialise () {
			players = [];
			scores = options.gameOptions.scores;
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
		initialise();
		return refereeObject;
	};
	return {getReferee: getReferee};
});