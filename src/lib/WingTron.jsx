import React, { Component } from "react";
import OptionsStore from "./optionsStore.js";
import ApplicationInterface from "./applicationInterface.js";

// provide another component for the scoreboard & control panel rendering and api call to the start game function
class WingTron extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options: OptionsStore.getAll(),
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
    canvas.width = this.state.options.gameOptions.fieldWidth;
    canvas.height = this.state.options.gameOptions.fieldHeight;
    canvas.style.width = '100%';

    ApplicationInterface.startGame(this.state.options, canvas);
  }
  render() {
    const { color, children } = this.props;
    return (
      <canvas ref="canvas" />
    );
  }
}

export default WingTron;
