requirejs(['./applicationInterface', "./jquery"], function(applicationInterface, jquery) {

	var startWingTronGame = function startGame () {

		var environmentOptions, gameOptions, p1Options, p2Options, playerOptions, options, canvas,
		createCanvas = function createCanvas() {
		  canvas = document.createElement("canvas");
		  canvas.width = options.gameOptions.fieldDimensions[0];
		  canvas.height = options.gameOptions.fieldDimensions[1];
		  jQuery(".canvasBlock").empty();
		  jQuery(".canvasBlock").append(canvas);
		},
		buildScoreboard = function buildScoreboard (scoreArray) {
			jQuery(".scoreboard ol").empty();
			scoreArray.forEach(function (score, index) {
		    	jQuery(".scoreboard ol").append('<li class="player' + index + '">Player ' + (index+1) + ': ' + score + '</li>');
	  		});
		};

		environmentOptions = {};
		gameOptions = {"matches": 5, "fieldDimensions": [300, 300]};
		p1Options = {"startCoord": [150,150], "direction": 0, "keyCodes": {"leftCode": 37, "rightCode": 39}};
		p2Options = {"startCoord": [150,150], "direction": Math.PI, "keyCodes": {"leftCode": 65, "rightCode": 68}};
		playerOptions = [p1Options, p2Options];
		options = {"environmentOptions": environmentOptions, "gameOptions": gameOptions, "playerOptions": playerOptions};

		createCanvas();
		options.environmentOptions.canvas = canvas;
		options.environmentOptions.scoreboardFunction = buildScoreboard;
	
		applicationInterface.startGame(options);
	};

	jQuery("#gameStartButton").on("click", function(e) {
		startWingTronGame();
		e.preventDefault();
	});
	
});