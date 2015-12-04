requirejs(['../src/fieldFactory'], function(fieldFactory) {
  module('fieldFactory');
  test('check default field settings are ok', function (assert) {
    var field = fieldFactory.getField(),
    bounds = field.getBoundaries(),
    width = bounds[0],
    height = bounds[1];
    assert.equal(width, 100, "The default width is 100");
    assert.equal(height, 100, "The default height is 100");
  });

  test('check default field settings are ok', function (assert) {
    var field = fieldFactory.getField(),
    bounds, width, height;
    field.setBoundaries(150, 150);
    bounds = field.getBoundaries();
    width = bounds[0];
    height = bounds[1];
    assert.equal(width, 150, "The updated width is 150");
    assert.equal(height, 150, "The updated height is 150");
  });

  test('check out of bounds functionality', function (assert) {
    var field = fieldFactory.getField(),
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
  module('playerFactory');
  test('check that the default coords are set', function (assert) {
    var player = playerFactory.getPlayer(),
    playerCoords = player.getCoords(),
    playerx = playerCoords[0],
    playery = playerCoords[1],
    playerAlive = player.isAlive();
    assert.equal(playerx, 0, "Players default x coord is 0");
    assert.equal(playery, 0, "Players default y coord is 0");
    assert.equal(playerAlive, true, "Players are alive by default");
  });

  test('check that the updated properties are set', function (assert) {
    var player = playerFactory.getPlayer(),
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
    var player = playerFactory.getPlayer(),
    playerCoords;
    player.move();
    playerCoords = player.getCoords();
    assert.equal(Math.round(playerCoords[0]), 1, 'Moving east - Player x position moved to 1');
    assert.equal(Math.round(playerCoords[1]), 0, 'Moving east - Player y position stayed the same');
    
    player.turnRight();
    player.move();
    playerCoords = player.getCoords();
    assert.equal(Math.round(playerCoords[0]), 1, 'Moving south - Player x position stayed the same');
    assert.equal(Math.round(playerCoords[1]), 1, 'Moving south - Player y position moved to 1');

    player.turnRight();
    player.move();
    playerCoords = player.getCoords();
    assert.equal(Math.round(playerCoords[0]), 0, 'Moving west - Player x position moved to 0');
    assert.equal(Math.round(playerCoords[1]), 1, 'Moving west - Player y position stayed the same');

    player.turnLeft();
    player.move();
    playerCoords = player.getCoords();
    assert.equal(Math.round(playerCoords[0]), 0, 'Moving south - Player x position stayed the same');
    assert.equal(Math.round(playerCoords[1]), 2, 'Moving south - Player y position moved to 2');

    player.turnLeft();
    player.move();
    playerCoords = player.getCoords();
    assert.equal(Math.round(playerCoords[0]), 1, 'Moving east - Player x position moved to 1');
    assert.equal(Math.round(playerCoords[1]), 2, 'Moving east - Player y position stayed the same');

    player.turnLeft();
    player.move();
    playerCoords = player.getCoords();
    assert.equal(Math.round(playerCoords[0]), 1, 'Moving north - Player x position has stayed the same');
    assert.equal(Math.round(playerCoords[1]), 1, 'Moving north - Player y position moved to 1');

    player.turnLeft();
    player.move();
    playerCoords = player.getCoords();
    assert.equal(Math.round(playerCoords[0]), 0, 'Moving west - Player x position has moved to 0');
    assert.equal(Math.round(playerCoords[1]), 1, 'Moving west - Player y position stayed the same');

    player.turnRight();
    player.move();
    playerCoords = player.getCoords();
    assert.equal(Math.round(playerCoords[0]), 0, 'Moving north - Player x position has stayed the same');
    assert.equal(Math.round(playerCoords[1]), 0, 'Moving north - Player y position moved to 0');
  });

  test('check that players stop moving when they are dead', function (assert) {
    var player = playerFactory.getPlayer(),
    playerCoords;
    player.die();
    player.move();
    playerCoords = player.getCoords();
    assert.equal(playerCoords[0], 0, 'A dead player cannot move');
    assert.equal(playerCoords[1], 0, 'A dead player cannot move');
  });

  test('check that a player has a record of all the points he has travelled', function (assert) {
    var player = playerFactory.getPlayer(),
    expectedPath = [[0,0],[0,0]];
    testPathAgainstExpected(assert, player, expectedPath);

    player.move();
    expectedPath = [[1,0],[0,0]];
    testPathAgainstExpected(assert, player, expectedPath);

    player.move();
    expectedPath = [[2,0],[0,0]];
    testPathAgainstExpected(assert, player, expectedPath);

    player.turnRight();
    player.move();
    expectedPath = [[2,1],[2,0],[0,0]];
    testPathAgainstExpected(assert, player, expectedPath);

    player.turnRight();
    player.move();
    expectedPath = [[1,1],[2,1],[2,0],[0,0]];
    testPathAgainstExpected(assert, player, expectedPath);

    player.turnLeft();
    player.move();
    expectedPath = [[1,2],[1,1],[2,1],[2,0],[0,0]];
    testPathAgainstExpected(assert, player, expectedPath);

    player.turnLeft();
    player.move();
    expectedPath = [[2,2],[1,2],[1,1],[2,1],[2,0],[0,0]];
    testPathAgainstExpected(assert, player, expectedPath);


    player.move();
    expectedPath = [[3,2],[1,2],[1,1],[2,1],[2,0],[0,0]];
    testPathAgainstExpected(assert, player, expectedPath);

    player.move();
    expectedPath = [[4,2],[1,2],[1,1],[2,1],[2,0],[0,0]];
    testPathAgainstExpected(assert, player, expectedPath);

    player.turnLeft();
    player.move();
    expectedPath = [[4,1],[4,2],[1,2],[1,1],[2,1],[2,0],[0,0]];
    testPathAgainstExpected(assert, player, expectedPath);
  });

  function testPathAgainstExpected (assert, player, expectedPath) {
    var playerPath = player.getPath();
    assert.equal(playerPath.length, expectedPath.length, 'Player has recorded the correct number of points on the path');
    expectedPath.forEach(function (point, index) {
      assert.equal(Math.round(playerPath[index][0]), point[0], 'x point is recorded in the correct location');
      assert.equal(Math.round(playerPath[index][1]), point[1], 'y point is recorded in the correct location');
    });
  }

  test('check that a player begins a new path when there position is set', function (assert) {
    var player = playerFactory.getPlayer(),
    expectedPath = [[0,0],[0,0]];
    testPathAgainstExpected(assert, player, expectedPath);
    player.setCoords([20,15]);
    expectedPath = [[20,15],[20,15]];
    testPathAgainstExpected(assert, player, expectedPath);
  });
});

requirejs(['../src/fieldFactory', '../src/playerFactory', '../src/refereeFactory'], function(fieldFactory, playerFactory, refereeFactory) {
  module('refereeFactory');
  test('check if players & field are successfully stored together within the object, adding one player at a time', function (assert) {
    var player1 = playerFactory.getPlayer(),
    player2 = playerFactory.getPlayer(),
    field = fieldFactory.getField(),
    referee = refereeFactory.getReferee(),
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
    var player1 = playerFactory.getPlayer(),
    player2 = playerFactory.getPlayer(),
    field = fieldFactory.getField(),
    player1Coords,
    player2Coords;
    referee = refereeFactory.getReferee();
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
    var player1 = playerFactory.getPlayer(),
    player2 = playerFactory.getPlayer(),
    player3 = playerFactory.getPlayer(),
    player4 = playerFactory.getPlayer(),
    field = fieldFactory.getField(),
    referee = refereeFactory.getReferee(),
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
    var player1 = playerFactory.getPlayer(),
    field = fieldFactory.getField(),
    referee = refereeFactory.getReferee(),
    loopIndex;
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
});

// test that players become dead when they hit a polygon wall http://stackoverflow.com/questions/217578/how-can-i-determine-whether-a-2d-point-is-within-a-polygon



requirejs(['../src/matchFactory'], function(matchFactory) {
  var matchOptions;
  module('matchFactory', {
    setup: function(){
        matchOptions = {"gameOptions": {}, "playerOptions": [{},{}]};
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


// game needs to be able to tell the app when the game is complete, what the winning criteria are and what the current status is
// game needs to tell the 
// check that a game can be set up with no parameters
// check that a game will generate a certain number of matches and then complete
// check that a score is kept for each player

requirejs(['../src/matchFactory', '../src/gameFactory'], function(matchFactory, gameFactory) {
  var gameOptions;
  module('gameFactory', {
    setup: function(){
        gameOptions = {"gameOptions": {"matches": 5, "fieldDims": [20, 20]}, "playerOptions": [{},{}]};
    }
  });
  test('check that a game can be set up without any parameters', function (assert) {
    var game = gameFactory.getGame(gameOptions);
    assert.ok(typeof game === 'object', 'A game object is produced');
  });
  test('check that a game will iterate through a number of matches and then end at some point', function (assert) {
    var game = gameFactory.getGame(gameOptions),
    loopIndex;
    assert.equal(game.isComplete(), false, 'The game will start in an incomplete state');
    for (loopIndex=0; loopIndex<2000; loopIndex++) {
        game.stepTime();
    }
    assert.equal(game.isComplete(), true, 'The game will end in a complete state');
  });
  // test('check that the scores are kept as expected', function (assert) {
  //   var game = gameFactory.getGame(gameOptions);
  //   assert.equal(game.isComplete(), false, 'The game will start in an incomplete state');
  //   for (loopIndex=0; loopIndex<2000; loopIndex++) {
  //       game.stepTime();
  //   }
  //   assert.equal(game.isComplete(), true, 'The game will end in a complete state');
  // });
});
