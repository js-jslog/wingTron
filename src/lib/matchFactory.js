import FieldFactory from './fieldFactory.js';
import PlayerFactory from './playerFactory.js';
import RefereeFactory from './refereeFactory.js';

var getMatch = function getMatch (options) {
  var inPlay;
  var field;
  var players;
  var referee;

  var isInPlay = function isInPlay () {
    return inPlay;
  };

  var stepTime = function stepTime () {
    referee.stepTime();
    evaluateMatchStatus();
  };

  var draw = function draw (ctx) {
    field.draw(ctx);
    players.forEach(function (p) {
      p.draw(ctx);
    });
  };

  var matchObject = {
    isInPlay: isInPlay,
    stepTime: stepTime,
    draw: draw,
  };

  var initialise = function initialise () {
    inPlay = true;
    field = FieldFactory.getField(options);
    players = [];
    console.log(JSON.stringify(options.playerOptions));
    options.playerOptions.forEach(function (playerN_opt) {
      var nthPlayerOptions = {"environmentOptions": options.environmentOptions,
        "gameOptions": options.gameOptions,
        "playerOptions": playerN_opt};
      players.push(PlayerFactory.getPlayer(nthPlayerOptions));
    });

    referee = RefereeFactory.getReferee(options);
    referee.setField(field);
    players.forEach(function (p) {
      referee.addPlayer(p);
    });
  };

  var evaluateMatchStatus = function evaluateMatchStatus () {
    var deadNum = 0;

    players.forEach(function (p) {
      if (!p.isAlive()) {
        deadNum += 1;
      }
    });

    if (deadNum >= players.length-1) {
      inPlay = false;
    }
  };

  initialise();

  return matchObject;
};

module.exports = {
  getMatch: getMatch,
};
