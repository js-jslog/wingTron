var getReferee = function getReferee (options) {
  var players;
  var field;
  var scores;
  var scoreboardFunction;

  var addPlayer = function addPlayer (p) {
    players.push(p);
  };

  var getPlayers = function getPlayers () {
    return players;
  };

  var setField = function setField (f) {
    field = f;
  };

  var getField = function getField () {
    return field;
  };

  var stepTime = function stepTime () {
    var deathRound = false;

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
  };

  var refereeObject = {
    addPlayer: addPlayer,
    getPlayers: getPlayers,
    setField: setField,
    getField: getField,
    stepTime: stepTime,
  };

  var initialise = function initialise () {
    players = [];
    scores = options.gameOptions.scores;
    scoreboardFunction = options.environmentOptions.scoreboardFunction;
    scoreboardFunction(scores);
  };

  var isPlayerSafe = function isPlayerSafe (p, allPlayers, f) {
    var playerCoords = p.getCoords(),
    var fieldBounds = f.getBoundaries(),
    var pathHit;

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

module.exports = {
  getReferee: getReferee,
};
