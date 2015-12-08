define(["./matchFactory"], function (matchFactory) {
	var getGame = function getGame (options) {
		var match, complete, matchesToComplete, matchesCompleted, scores,
		getScores = function getScores () {
			return scores;
		},
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
		draw = function draw (ctx) {
			if (isComplete() === false) {
				match.draw(ctx);
			} else {
				ctx.fillStyle = "#444";
				ctx.strokeStyle = "#444";
				ctx.fillRect(0, 0, options.gameOptions.fieldDimensions[0], options.gameOptions.fieldDimensions[1]);
			}
		},
		initialise = function initialise () {
			scores = Array.apply(null, Array(options.playerOptions.length)).map(Number.prototype.valueOf,0);
			options.gameOptions.scores = scores;
			complete = false;
			matchesToComplete = options.gameOptions.matches || 0;
			matchesCompleted = 0;
			match = matchFactory.getMatch(options);
		};
		initialise();
		return {getScores: getScores,
				isComplete: isComplete,
				stepTime: stepTime,
				draw: draw};
	};
	return {getGame: getGame};
});