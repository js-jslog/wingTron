import React, { Component } from "react";
import ApplicationInterface from "./applicationInterface.js";

// provide another component for the scoreboard & control panel rendering and api call to the start game function
class WingTron extends Component {
  constructor(props) {
    super(props)
    // set a load of presets incase no control panel is provided
    // also render a "click here to start" text on the canvas if there is no control panel
    // a lot of what will be done here is contained in the startWingTronGame function
  }
  componentDidMount() {
    this.updateCanvas();
  }
  updateCanvas() {
    // set the canvas to fill the component it is placed inside
    // this should probably be done using css for the first 2 lines
    var canvas = this.refs.canvas;
    var environmentOptions = {};
    var gameOptions = {fieldWidth: "300", fieldHeight: "300", matches: "10"};
    var p1Options = {"startCoord": [150,150], "direction": 0, "keyCodes": {"leftCode": 37, "rightCode": 39}, "colour": "rgba(255,0,0,0.5)"};
    var p2Options = {"startCoord": [150,150], "direction": Math.PI, "keyCodes": {"leftCode": 65, "rightCode": 68}, "colour": "rgba(0,0,255,0.5)"};
    var playerOptions = [p1Options, p2Options];
    var options = {"environmentOptions": environmentOptions, "gameOptions": gameOptions, "playerOptions": playerOptions};

    options.environmentOptions.canvas = canvas;
    options.environmentOptions.scoreboardFunction = function (a) {
      console.log(a);
    }

    canvas.style.height = '100%';
    canvas.style.width = '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
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
