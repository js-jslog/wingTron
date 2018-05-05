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
    var playerOptions = {"startCoord": [10,10], "direction": 0, "keyCodes": {"leftCode": 37, "rightCode": 39}};
    var envOptions = {"keystateMap": {}, "canvas": canvas, "scoreboardFunction": function(a) {console.log(a)}};
    var gameOptions = {"scores": [0], "fieldWidth": 100, "fieldHeight": 100};
    var options = {"environmentOptions": envOptions, "gameOptions": gameOptions, "playerOptions": [playerOptions]};
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
