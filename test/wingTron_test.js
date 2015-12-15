requirejs(['../src/fieldFactory'], function(fieldFactory) {
  var options;
  module('fieldFactory', {
    setup: function setup () {
        var gameOptions = {"scores": [0], "fieldDimensions": [100,100]};
        options = {"gameOptions": gameOptions};
    }
  });
  test('check set field settings are ok', function (assert) {
    var field = fieldFactory.getField(options),
    bounds = field.getBoundaries(),
    width = bounds[0],
    height = bounds[1];
    assert.equal(width, 100, "The default width is 100");
    assert.equal(height, 100, "The default height is 100");
  });

  test('check out of bounds functionality', function (assert) {
    var field = fieldFactory.getField(options),
    safePoints = [[0,0],[0,100],[100,0],[100,100],[50,50]],
    deadPoints = [[-1,0],[0,-1],[-1,-1], [0,101],[101,0],[101,101], [-1,101],[101,-1]];
    safePoints.forEach(function (item, index, array) {
      var outOfBounds = field.isPointOutOfBounds(item);
      assert.equal(outOfBounds, false);
    });
    deadPoints.forEach(function (item, index, array) {
      var outOfBounds = field.isPointOutOfBounds(item);
      assert.equal(outOfBounds, true);
    });
  });
});


requirejs(['../src/playerFactory'], function(playerFactory) {
  var options;
  module('playerFactory', {
    setup: function setup () {
        var playerOptions = {"startCoord": [10,10], "direction": 0, "keyCodes": {"leftCode": 37, "rightCode": 39}},
        envOptions = {"keystateMap": {}},
        gameOptions = {"scores": [0], "fieldDimensions": [100,100]};
        options = {"environmentOptions": envOptions, "gameOptions": gameOptions, "playerOptions": playerOptions};
    }
  });
  test('check that initial coords are set', function (assert) {
    var player = playerFactory.getPlayer(options),
    playerCoords = player.getCoords(),
    playerx = playerCoords[0],
    playery = playerCoords[1],
    playerAlive = player.isAlive();
    assert.equal(playerx, 10, "Players x coord is set to 10");
    assert.equal(playery, 10, "Players y coord is set to 10");
    assert.equal(playerAlive, true, "Players are alive by default");
  });

  test('check that the updated properties are set', function (assert) {
    var player = playerFactory.getPlayer(options),
    playerCoords, playerx, playery, playerAlive;
    player.setCoords([100,100]);
    playerCoords = player.getCoords();
    playerx = playerCoords[0];
    playery = playerCoords[1];
    player.die();
    playerAlive = player.isAlive();
    assert.equal(playerx, 100, "Players updated x coord is 100");
    assert.equal(playery, 100, "Players updated y coord is 100");
    assert.equal(playerAlive, false, "Players are not alive after they are dead");
  });

  test('check that the player can change direction & when moved the coordinates are updated correctly', function (assert) {
    var player = playerFactory.getPlayer(options),
    playerCoords;
    player.move();
    playerCoords = player.getCoords();
    assert.equal(Math.round(playerCoords[0]), 11, 'Moving east - Player x position moved to 11');
    assert.equal(Math.round(playerCoords[1]), 10, 'Moving east - Player y position stayed the same');
    
    player.turnRight();
    player.move();
    playerCoords = player.getCoords();
    assert.equal(Math.round(playerCoords[0]), 11, 'Moving south - Player x position stayed the same');
    assert.equal(Math.round(playerCoords[1]), 11, 'Moving south - Player y position moved to 11');

    player.turnRight();
    player.move();
    playerCoords = player.getCoords();
    assert.equal(Math.round(playerCoords[0]), 10, 'Moving west - Player x position moved to 10');
    assert.equal(Math.round(playerCoords[1]), 11, 'Moving west - Player y position stayed the same');

    player.turnLeft();
    player.move();
    playerCoords = player.getCoords();
    assert.equal(Math.round(playerCoords[0]), 10, 'Moving south - Player x position stayed the same');
    assert.equal(Math.round(playerCoords[1]), 12, 'Moving south - Player y position moved to 12');

    player.turnLeft();
    player.move();
    playerCoords = player.getCoords();
    assert.equal(Math.round(playerCoords[0]), 11, 'Moving east - Player x position moved to 11');
    assert.equal(Math.round(playerCoords[1]), 12, 'Moving east - Player y position stayed the same');

    player.turnLeft();
    player.move();
    playerCoords = player.getCoords();
    assert.equal(Math.round(playerCoords[0]), 11, 'Moving north - Player x position has stayed the same');
    assert.equal(Math.round(playerCoords[1]), 11, 'Moving north - Player y position moved to 11');

    player.turnLeft();
    player.move();
    playerCoords = player.getCoords();
    assert.equal(Math.round(playerCoords[0]), 10, 'Moving west - Player x position has moved to 10');
    assert.equal(Math.round(playerCoords[1]), 11, 'Moving west - Player y position stayed the same');

    player.turnRight();
    player.move();
    playerCoords = player.getCoords();
    assert.equal(Math.round(playerCoords[0]), 10, 'Moving north - Player x position has stayed the same');
    assert.equal(Math.round(playerCoords[1]), 10, 'Moving north - Player y position moved to 10');
  });

  test('check that players stop moving when they are dead', function (assert) {
    var player = playerFactory.getPlayer(options),
    playerCoords;
    player.die();
    player.move();
    playerCoords = player.getCoords();
    assert.equal(playerCoords[0], 10, 'A dead player cannot move');
    assert.equal(playerCoords[1], 10, 'A dead player cannot move');
  });

  var testPathAgainstExpected = function testPathAgainstExpected (assert, player, expectedPath, expectedCoords) {
    var playerPath = player.getPath(),
    playerCoords = player.getCoords();
    assert.equal(playerPath.length, expectedPath.length, 'Player has recorded the correct number of points on the path');
    expectedPath.forEach(function (point, index) {
      assert.equal(Math.round(playerPath[index][0]), point[0], 'x path point at ' + playerPath[index][0] + ' should be at ' + point[0] + '.');
      assert.equal(Math.round(playerPath[index][1]), point[1], 'y path point at ' + playerPath[index][1] + ' should be at ' + point[1] + '.');
    });
    assert.equal(Math.round(playerCoords[0]), expectedCoords[0], 'x coord at ' + playerCoords[0] + ' should be at ' + expectedCoords[0] + '.');
    assert.equal(Math.round(playerCoords[1]), expectedCoords[1], 'y coord at ' + playerCoords[1] + ' should be at ' + expectedCoords[1] + '.');
  };

  test('check that a player records their path and coords properly', function (assert) {
    var player = playerFactory.getPlayer(options),
    expectedPath = [[10,10],[10,10]],
    expectedCoords = [10,10];
    testPathAgainstExpected(assert, player, expectedPath, expectedCoords);

    player.move();
    expectedPath = [[10,10],[10,10]];
    expectedCoords = [11,10];
    testPathAgainstExpected(assert, player, expectedPath, expectedCoords);

    player.move();
    expectedPath = [[11,10],[10,10]];
    expectedCoords = [12,10];
    testPathAgainstExpected(assert, player, expectedPath, expectedCoords);

    player.turnRight();
    player.move();
    expectedPath = [[12,10],[12,10],[10,10]];
    expectedCoords = [12,11];
    testPathAgainstExpected(assert, player, expectedPath, expectedCoords);

    player.turnRight();
    player.move();
    expectedPath = [[12,11],[12,11],[12,10],[10,10]];
    expectedCoords = [11,11];
    testPathAgainstExpected(assert, player, expectedPath, expectedCoords);

    player.move();
    player.move();
    expectedPath = [[10,11],[12,11],[12,10],[10,10]];
    expectedCoords = [9,11];

    player.turnRight();
    player.move();
    expectedPath = [[9,11],[9,11],[12,11],[12,10],[10,10]];
    expectedCoords = [9,10];
  });

  test('check that a player begins a new path when there position is set', function (assert) {
    var player = playerFactory.getPlayer(options),
    expectedPath = [[10,10],[10,10]],
    expectedCoords = [10,10];
    testPathAgainstExpected(assert, player, expectedPath, expectedCoords);
    player.setCoords([20,15]);
    expectedPath = [[20,15],[20,15]];
    expectedCoords = [20,15];
    testPathAgainstExpected(assert, player, expectedPath, expectedCoords);
  });

  test('check the keystate to left & right turn mapping', function (assert) {
    var player = playerFactory.getPlayer(options),
    playerCoords,
    expectedCoords,
    keystateMap = options.environmentOptions.keystateMap;
    playerCoords = player.getCoords();
    expectedCoords = [10,10];
    assert.ok(Math.round(playerCoords[0]) === expectedCoords[0] && Math.round(playerCoords[0]) === expectedCoords[0], 'Player starts at 0,0');
    keystateMap["39"] = true;
    player.move();
    playerCoords = player.getCoords();
    expectedCoords = [10,11];
    assert.ok(Math.round(playerCoords[0]) === expectedCoords[0] && Math.round(playerCoords[0]) === expectedCoords[0], 'Player starts at 0,0');
  });
  
});

requirejs(['../src/fieldFactory', '../src/playerFactory', '../src/refereeFactory'], function(fieldFactory, playerFactory, refereeFactory) {
  var options;
  module('refereeFactory', {
    setup: function setup () {
        var playerOptions = {"startCoord": [0,0], "direction": 0, "keyCodes": {"leftCode": 37, "rightCode": 39}},
        gameOptions = {"scores": [0,0], "fieldDimensions": [100,100]},
        envOptions = {"keystateMap": {}, "scoreboardFunction": function scoreboardFunction () {}};
        options = {"environmentOptions": envOptions, "gameOptions": gameOptions, "playerOptions": playerOptions};
    }
  });
  test('check if players & field are successfully stored together within the object, adding one player at a time', function (assert) {
    var player1 = playerFactory.getPlayer(options),
    player2 = playerFactory.getPlayer(options),
    field = fieldFactory.getField(options),
    referee = refereeFactory.getReferee(options),
    playerArray;
    referee.addPlayer(player1);
    referee.addPlayer(player2);
    referee.setField(field);
    playerArray = referee.getPlayers();
    assert.equal(playerArray[0], player1, 'The player1 is successfully added to the player list');
    assert.equal(playerArray[1], player2, 'The player2 is successfully added to the player list');
    assert.notEqual(playerArray[1], player1, 'Confirmed that the two players are not being mistaken for one another');
    assert.notEqual(playerArray[0], player2, 'Confirmed that the two players are not being mistaken for one another');
    assert.equal(referee.getField(), field, 'The field is successfully set within the referee object');
  });

  test('check that players positions are updated properly when instructed to move by the referee', function (assert) {
    var player1 = playerFactory.getPlayer(options),
    player2 = playerFactory.getPlayer(options),
    field = fieldFactory.getField(options),
    player1Coords,
    player2Coords;
    referee = refereeFactory.getReferee(options);
    referee.addPlayer(player1);
    referee.addPlayer(player2);
    referee.setField(field);

    referee.stepTime();
    player1Coords = player1.getCoords();
    player2Coords = player2.getCoords();
    assert.equal(player1Coords[0], 1, 'Player1 x position updated correctly');
    assert.equal(player1Coords[1], 0, 'Player1 y position remained the same as expected');
    assert.equal(player2Coords[0], 1, 'Player2 x position updated correctly');
    assert.equal(player2Coords[1], 0, 'Player2 y position remained the same as expected');

    player1.turnRight();
    referee.stepTime();
    player1Coords = player1.getCoords();
    player2Coords = player2.getCoords();
    assert.equal(player1Coords[0], 1, 'Player1 x position remained the same as expected');
    assert.equal(player1Coords[1], 1, 'Player1 y position updated correctly');
    assert.equal(player2Coords[0], 2, 'Player2 x position updated correctly');
    assert.equal(player2Coords[1], 0, 'Player2 y position remained the same as expected');
  });


  test('check that players die when they are moved outside of the field boundaries', function (assert) {
    var player1 = playerFactory.getPlayer(options),
    player2 = playerFactory.getPlayer(options),
    player3 = playerFactory.getPlayer(options),
    player4 = playerFactory.getPlayer(options),
    field = fieldFactory.getField(options),
    referee = refereeFactory.getReferee(options),
    player1Alive,
    player2Alive,
    player3Alive,
    player4Alive;

    field.setBoundaries(3,3);
    referee.setField(field);
    referee.addPlayer(player1);
    referee.addPlayer(player2);
    referee.addPlayer(player3);
    referee.addPlayer(player4);

    player1Alive = player1.isAlive();
    player2Alive = player2.isAlive();
    player3Alive = player3.isAlive();
    player4Alive = player4.isAlive();
    assert.ok(player1Alive && player2Alive && player3Alive && player4Alive, 'Players inside boundaries are alive');

    player2.turnRight();
    player3.turnLeft();
    player4.turnLeft();
    player4.turnLeft();

    referee.stepTime();
    player1Alive = player1.isAlive();
    player2Alive = player2.isAlive();
    player3Alive = player3.isAlive();
    player4Alive = player4.isAlive();
    assert.ok(player1Alive && player2Alive, 'Players inside boundaries are alive');
    assert.ok(!player3Alive && !player4Alive, 'Players outside boundaries are dead');

    referee.stepTime();
    referee.stepTime();
    player1Alive = player1.isAlive();
    player2Alive = player2.isAlive();
    player3Alive = player3.isAlive();
    player4Alive = player4.isAlive();
    assert.ok(player1Alive && player2Alive, 'Players inside boundaries are alive');
    assert.ok(!player3Alive && !player4Alive, 'Players outside boundaries are dead');

    referee.stepTime();
    player1Alive = player1.isAlive();
    player2Alive = player2.isAlive();
    player3Alive = player3.isAlive();
    player4Alive = player4.isAlive();
    player1Alive = player1.isAlive();
    assert.ok(!player1Alive && !player2Alive && !player3Alive && !player4Alive, 'Players outside boundaries are dead');
  });

  test('check a player is inside its own path and if so die', function (assert) {
    var player1 = playerFactory.getPlayer(options),
    field = fieldFactory.getField(options),
    referee,
    loopIndex;
    options.gameOptions.scores = [0];
    referee = refereeFactory.getReferee(options);
    referee.setField(field);
    referee.addPlayer(player1);
    for (loopIndex=0; loopIndex<20; loopIndex++) {
      referee.stepTime();
    }
    assert.equal(player1.isAlive(), true, 'Players outside their own path should not be dead');

    player1.turnRight();
    for (loopIndex=0; loopIndex<20; loopIndex++) {
      referee.stepTime();
    }
    assert.equal(player1.isAlive(), true, 'Players outside their own path should not be dead');

    player1.turnRight();
    referee.stepTime();
    assert.equal(player1.isAlive(), true, 'Players outside their own path should not be dead');
    
    player1.turnRight();
    referee.stepTime();
    assert.equal(player1.isAlive(), false, 'Players inside their own path should be dead');
  });


  test('check the referee updates the scores properly', function (assert) {
    var p1playerOpts = {"playerOptions": {"startCoord": [0,0], "direction": 0, "keyCodes": {"leftCode": 37, "rightCode": 39}}},
    p2playerOpts = {"playerOptions": {"startCoord": [1,0], "direction": 0, "keyCodes": {"leftCode": 37, "rightCode": 39}}},
    p3playerOpts = {"playerOptions": {"startCoord": [2,0], "direction": 0, "keyCodes": {"leftCode": 37, "rightCode": 39}}},
    field,
    referee,
    p1opts = {},
    p2opts = {},
    p3opts = {},
    player1,
    player2,
    player3;
    Object.assign(p1opts, options, p1playerOpts);
    Object.assign(p2opts, options, p2playerOpts);
    Object.assign(p3opts, options, p3playerOpts);
    player1 = playerFactory.getPlayer(p1opts);
    player2 = playerFactory.getPlayer(p2opts);
    player3 = playerFactory.getPlayer(p3opts);
    options.gameOptions.scores = [0,0,0];
    options.gameOptions.fieldDimensions = [2,2];
    referee = refereeFactory.getReferee(options);
    expectedScores = [0,0,0];
    field = fieldFactory.getField(options);
    referee.setField(field);
    referee.addPlayer(player1);
    referee.addPlayer(player2);
    referee.addPlayer(player3);
    assert.ok(options.gameOptions.scores[0] === expectedScores[0] && options.gameOptions.scores[1] === expectedScores[1] && options.gameOptions.scores[2] === expectedScores[2]);
    referee.stepTime();
    expectedScores = [1,1,0];
    assert.ok(options.gameOptions.scores[0] === expectedScores[0] && options.gameOptions.scores[1] === expectedScores[1] && options.gameOptions.scores[2] === expectedScores[2]);
  });
});


requirejs(['../src/matchFactory'], function(matchFactory) {
  var matchOptions;
  module('matchFactory', {
    setup: function(){
        var environmentOptions = {"keystateMap": {}, "scoreboardFunction": function scoreboardFunction () {}},
        gameOptions = {"scores": [0,0], "matches": 5, "fieldDimensions": [20, 20]},
        playerOptions = [{"startCoord": [0,0], "direction": 0, "keyCodes": {"leftCode": 37, "rightCode": 39}},{"startCoord": [0,0], "direction": 0, "keyCodes": {"leftCode": 37, "rightCode": 39}}];
        matchOptions = {"environmentOptions": environmentOptions, "gameOptions": gameOptions, "playerOptions": playerOptions};
    }
  });
  test('check that the default values are set as expected', function (assert) {
    var match = matchFactory.getMatch(matchOptions);
    assert.equal(match.isInPlay(), true, 'Match starts inPlay');
  });
  test('check that a match will be over after some time - players will inevitably die after a long game', function (assert) {
    var match = matchFactory.getMatch(matchOptions),
    loopIndex;
    for (loopIndex=0; loopIndex < 5000; loopIndex++) {
      match.stepTime();
    }
    assert.equal(match.isInPlay(), false, 'The game will end eventually without any intervention');
  });
});


requirejs(['../src/matchFactory', '../src/gameFactory'], function(matchFactory, gameFactory) {
  var options;
  module('gameFactory', {
    setup: function(){
        var environmentOptions = {"keystateMap": {}, "scoreboardFunction": function scoreboardFunction () {}},
        gameOptions = {"scores": [0,0], "matches": 5, "fieldDimensions": [2, 2]},
        playerOptions = [{"startCoord": [0,0], "direction": 0, "keyCodes": {"leftCode": 37, "rightCode": 39}},{"startCoord": [0,0], "direction": 0, "keyCodes": {"leftCode": 37, "rightCode": 39}}];
        options = {"environmentOptions": environmentOptions, "gameOptions": gameOptions, "playerOptions": playerOptions};
    }
  });
  test('check that a game can be set up without any parameters', function (assert) {
    var game = gameFactory.getGame(options);
    assert.ok(typeof game === 'object', 'A game object is produced');
  });
  test('check that a game will iterate through a number of matches and then end at some point', function (assert) {
    var game = gameFactory.getGame(options),
    loopIndex;
    assert.equal(game.isComplete(), false, 'The game will start in an incomplete state');
    for (loopIndex=0; loopIndex<2000; loopIndex++) {
        game.stepTime();
    }
    assert.equal(game.isComplete(), true, 'The game will end in a complete state');
  });
  test('check that the scores are kept as expected', function (assert) {
    var p1winsOptsAdd = [{"startCoord": [0,0], "direction": 0, "keyCodes": {"leftCode": 37, "rightCode": 39}},{"startCoord": [1,0], "direction": 0, "keyCodes": {"leftCode": 37, "rightCode": 39}}],
    p2winsOptsAdd = [{"startCoord": [3,0], "direction": 0, "keyCodes": {"leftCode": 37, "rightCode": 39}},{"startCoord": [0,0], "direction": 0, "keyCodes": {"leftCode": 37, "rightCode": 39}}],
    drawOptsAdd = [{"startCoord": [0,0], "direction": 0, "keyCodes": {"leftCode": 37, "rightCode": 39}},{"startCoord": [0,0], "direction": 0, "keyCodes": {"leftCode": 37, "rightCode": 39}}],
    gameOptions = {"scores": [0,0], "matches": 5, "fieldDimensions": [4, 2]},
    p1winsOpts = {"environmentOptions": options.environmentOptions, "gameOptions": gameOptions, "playerOptions": p1winsOptsAdd},
    p2winsOpts,
    drawOpts,
    p1winsGame,
    p2winsGame,
    drawGame,
    scores;

    p1winsGame = gameFactory.getGame(p1winsOpts);
    while (!p1winsGame.isComplete()) {
        p1winsGame.stepTime();
    }
    scores = p1winsGame.getScores();
    assert.equal(scores[0], 5);
    assert.equal(scores[1], 0);

    gameOptions = {"scores": [0,0], "matches": 5, "fieldDimensions": [2, 2]};
    p2winsOpts = {"environmentOptions": options.environmentOptions, "gameOptions": gameOptions, "playerOptions": p2winsOptsAdd};
    p2winsGame = gameFactory.getGame(p2winsOpts);
    while (!p2winsGame.isComplete()) {
        p2winsGame.stepTime();
        debugger;
    }
    scores = p2winsGame.getScores();
    assert.equal(scores[0], 0);
    assert.equal(scores[1], 5);

    gameOptions = {"scores": [0,0], "matches": 5, "fieldDimensions": [2, 2]};
    drawOpts = {"environmentOptions": options.environmentOptions, "gameOptions": gameOptions, "playerOptions": drawOptsAdd};
    drawGame = gameFactory.getGame(drawOpts);
    while (!drawGame.isComplete()) {
        drawGame.stepTime();
    }
    scores = drawGame.getScores();
    assert.equal(scores[0], 0);
    assert.equal(scores[1], 0);
  });
});


requirejs(['../src/collisionDetection'], function(collisionDetection) {
  module('isPointWithinPath');
  test('check that points outsdie / inside paths are evaluated as such', function (assert) {
    var points, path, outsidePoints, insidePoints;
    path = [[10,10],[20,10],[20,20],[10,20]];
    outsidePoints = [[ 0, 0],[15, 0],[30, 0],[30,15],[30,30],[15,30],[0 ,30],[0 ,15],
                     [10, 0],[20, 0],[30,10],[30,20],[20,30],[10,30],[0 ,20],[0 ,10]];
    insidePoints  = [[10,10],[15,10],[20,10],[20,15],[20,20],[15,20],[10,20],[10,15]];
    outsidePoints.forEach(function (point, index) {
        assert.equal(collisionDetection.isPointWithinPath(point, path), false, '[' + point[0] + '][' + point[1] + '] should not be inside the path');
    });
    insidePoints.forEach(function (point, index) {
        assert.equal(collisionDetection.isPointWithinPath(point, path), true, '[' + point[0] + '][' + point[1] + '] should be inside the path');
    });
  });
  test('check a few specific path & point combos which have caused problems in the past', function (assert) {
    var points, path;
    // path = [[10,12],[10,10],[20,10],[20,15],[15,15]];
    // point = [10,13];
    // assert.equal(collisionDetection.isPointWithinPath(point, path), false, '[' + point[0] + '][' + point[1] + '] should be outside the path');
    // path = [[19,20],[20,20],[20,0],[0,0]];
    // point = [19,19];
    // assert.equal(collisionDetection.isPointWithinPath(point, path), true, '[' + point[0] + '][' + point[1] + '] should be inside the path');
    path = [[5,11],[5,15],[20,15],[20,5],[15,5],[15,10],[10,10]];
    point = [5,10];
    assert.equal(collisionDetection.isPointWithinPath(point, path), false, '[' + point[0] + '][' + point[1] + '] should be outside the path');
  });
});

