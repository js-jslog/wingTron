import React, { Component } from "react";

// provide another component for the scoreboard & control panel rendering and api call to the start game function
class WingTron extends Component {
  sizeCanvas = () => {
    // set the canvas to fill the component it is placed inside
    // this should probably be done using css for the first 2 lines
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  constructor(props) {
    this.sizeCanvas();
    // set a load of presets incase no control panel is provided
    // also render a "click here to start" text on the canvas if there is no control panel
    // a lot of what will be done here is contained in the startWingTronGame function
  }
  render() {
    const { color, children } = this.props;
    return (
      <canvas>
      </canvas>
    );
  }
}

export default WingTron;
