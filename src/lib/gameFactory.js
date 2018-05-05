import MatchFactory from './matchFactory';

var getGame = function getGame (options) {
  var match;
  var complete;
  var matchesToComplete;
  var matchesCompleted;
  var scores;

  var getScores = function getScores () {
    return scores;
  };

  var isComplete = function isComplete () {
    return (matchesCompleted >= matchesToComplete);
  };

  var stepTime = function stepTime () {
    match.stepTime();
    if (!match.isInPlay()) {
      matchesCompleted +=1;
      match = MatchFactory.getMatch(options);
    }
  };

  var draw = function draw (ctx) {
    if (isComplete() === false) {
      match.draw(ctx);
    } else {
      ctx.fillStyle = "#444";
      ctx.strokeStyle = "#444";
      ctx.fillRect(0, 0, options.gameOptions.fieldWidth, options.gameOptions.fieldHeight);
    }
  };

  var initialise = function initialise () {
    scores = Array.apply(null, Array(options.playerOptions.length)).map(Number.prototype.valueOf,0);
    options.gameOptions.scores = scores;
    complete = false;
    matchesToComplete = options.gameOptions.matches || 0;
    matchesCompleted = 0;
    match = MatchFactory.getMatch(options);
  };

  initialise();

  return {
    getScores: getScores,
    isComplete: isComplete,
    stepTime: stepTime,
    draw: draw,
  };
};

module.exports = {
  getGame: getGame
};
