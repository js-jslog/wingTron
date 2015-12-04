define(["./matchFactory"], function (matchFactory) {
	var getGame = function getGame (options) {
		var match,
		complete = false,
		matchesToComplete = 0,
		matchesCompleted = 0,
		scores,
		isComplete = function isComplete () {
			return (matchesCompleted >= matchesToComplete);
		},
		stepTime = function stepTime () {
			match.stepTime();
			if (!match.isInPlay()) {
				matchesCompleted +=1;
				match = matchFactory.getMatch(options);
			}
		},
		initialise = function initialise () {
			scores = Array.apply(null, Array(options.playerOptions.length)).map(Number.prototype.valueOf,0);
			options.gameOptions.scores = scores;
			matchesToComplete = options.gameOptions.matches;
			match = matchFactory.getMatch(options);
		};
		initialise();
		return {isComplete: isComplete,
				stepTime: stepTime};
	};
	return {getGame: getGame};
});