define(["./gameFactory", "./jquery"], function (gameFactory, jquery) {
	
	var canvas, ctx, game, requestId;

	var startGame = function startGame (options) {
		stopAnimation();
		registerKeystateListener(options);
		canvas = options.environmentOptions.canvas;
		ctx = canvas.getContext("2d");
		game = gameFactory.getGame(options);
		startAnimation();
	};

	var stopAnimation = function stopAnimation () {
		if (requestId !== undefined) {
			window.cancelAnimationFrame(requestId);
			requestId = undefined;
		}
	};

	var startAnimation = function startAnimation () {
		if (requestId === undefined) {
			loop();
		}
	};

	var loop = function loop () {
		game.stepTime();
		game.draw(ctx);
		if (game.isComplete() === false) {
			requestId = window.requestAnimationFrame(loop, canvas);
		}
	};

	var registerKeystateListener = function registerKeystateListener (options) {
  
	  keystateMap = {};
	  document.addEventListener("keydown", function (evt) {
	    keystateMap[evt.keyCode] = true;
	  });
	  document.addEventListener("keyup", function (evt) {
	    keystateMap[evt.keyCode] = false;
	  });

	  options.environmentOptions.keystateMap = keystateMap;
	}

	return {startGame: startGame};

});