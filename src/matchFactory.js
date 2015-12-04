define(["./fieldFactory", "./playerFactory", './refereeFactory'], function (fieldFactory, playerFactory, refereeFactory) {
	var getMatch = function getMatch (options) {
		var inPlay = true,
		matchResults,
		players = [],
		field = fieldFactory.getField(options.gameOptions.fieldDims),
		referee = refereeFactory.getReferee(),
		isInPlay = function isInPlay () {
			return inPlay;
		},
		stepTime = function stepTime () {
			referee.stepTime();
			evaluateGameStatus();
		},
		getResults = function getResults () {
			return matchResults;
		},
		matchObject = {
			isInPlay: isInPlay,
			stepTime: stepTime,
			getResults: getResults
		},
		initialise = function initialise () {
			options.playerOptions.forEach(function () {
				players.push(playerFactory.getPlayer());
			});
			referee.setField(field);
			players.forEach(function (p) {
				referee.addPlayer(p);
			});
		},
		evaluateGameStatus = function evaluateGameStatus () {
			var deadNum = 0;
			players.forEach(function (p) {
				if (!p.isAlive()) {
					deadNum += 1;
				}
			});
			if (deadNum >= players.length) {
				inPlay = false;
			}
		};
		initialise();
		return matchObject;
	};
	return {getMatch: getMatch};
});