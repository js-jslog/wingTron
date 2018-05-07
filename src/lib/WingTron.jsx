import React, { Component } from "react";
import ApplicationInterface from "./applicationInterface.js";

// provide another component for the scoreboard & control panel rendering and api call to the start game function
class WingTron extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gameOptions: {
        fieldWidth: "300", fieldHeight: "300", matches: "10",
      },
      playerOptions: [
        {"startCoord": [150,150], "direction": 0, "keyCodes": {"leftCode": 37, "rightCode": 39}, "colour": "rgba(255,0,0,0.5)",},
        {"startCoord": [150,150], "direction": Math.PI, "keyCodes": {"leftCode": 65, "rightCode": 68}, "colour": "rgba(0,0,255,0.5)",},
      ],
      environmentOptions: {
        scoreboardFunction: function (a) {
          console.log(a);
        }
      },
    };
    // set a load of presets incase no control panel is provided
    // also render a "click here to start" text on the canvas if there is no control panel
    // a lot of what will be done here is contained in the startWingTronGame function
  }
  componentDidMount() {
    this.updateCanvas();
  }
  updateCanvas() {
    var canvas = this.refs.canvas;
    var environmentOptions = {};
    var options = {"environmentOptions": this.state.environmentOptions, "gameOptions": this.state.gameOptions, "playerOptions": this.state.playerOptions};

    options.environmentOptions.canvas = canvas;
    canvas.width = options.gameOptions.fieldWidth;
    canvas.height = options.gameOptions.fieldHeight;
    canvas.style.width = '100%';

    ApplicationInterface.startGame(options);
  }
  render() {
    const { color, children } = this.props;
    return (
      <canvas ref="canvas" />
    );
  }
}

export default WingTron;
