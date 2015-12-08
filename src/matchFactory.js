define(["./fieldFactory", "./playerFactory", './refereeFactory'], function (fieldFactory, playerFactory, refereeFactory) {
	var getMatch = function getMatch (options) {
		var inPlay, field, players, referee,
		isInPlay = function isInPlay () {
			return inPlay;
		},
		stepTime = function stepTime () {
			referee.stepTime();
			evaluateMatchStatus();
		},
		draw = function draw (ctx) {
			field.draw(ctx);
			players.forEach(function (p) {
				p.draw(ctx);
			});
		},
		matchObject = {
			isInPlay: isInPlay,
			stepTime: stepTime,
			draw: draw
		},
		initialise = function initialise () {
			inPlay = true;
			field = fieldFactory.getField(options);
			players = [];
			options.playerOptions.forEach(function (playerN_opt) {
				var nthPlayerOptions = {"environmentOptions": options.environmentOptions,
										"gameOptions": options.gameOptions,
										"playerOptions": playerN_opt};
				players.push(playerFactory.getPlayer(nthPlayerOptions));
			});
			referee = refereeFactory.getReferee(options);
			referee.setField(field);
			players.forEach(function (p) {
				referee.addPlayer(p);
			});
		},
		evaluateMatchStatus = function evaluateMatchStatus () {
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