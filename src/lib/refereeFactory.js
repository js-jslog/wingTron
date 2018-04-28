define(["./collisionDetection"], function (collisionDetection) {
	var getReferee = function getReferee (options) {
		var players,
		field,
		scores,
		scoreboardFunction,
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
				scoreboardFunction(scores);
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
			scoreboardFunction = options.environmentOptions.scoreboardFunction;
			scoreboardFunction(scores);
		},
		isPlayerSafe = function isPlayerSafe (p, allPlayers, f) {
			var playerCoords = p.getCoords(),
			fieldBounds = f.getBoundaries(),
			pathHit;
			if (collisionDetection.boundaryHit(playerCoords, fieldBounds) === true) {
				return false;
			}
			pathHit = allPlayers.some(function (player) {
				if (p === player) {
					//return false;
				}
				return collisionDetection.isPointWithinPath(p.getCoords(), player.getPath());
			});
			return !pathHit;
		};
		initialise();
		return refereeObject;
	};
	return {getReferee: getReferee};
});