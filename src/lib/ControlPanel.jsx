import React, { Component } from "react";
import * as OptionsActions from "./optionsActions.js";

class ControlPanel extends Component {
  constructor(props) {
    super(props)
  }
  updateOptions() {
    OptionsActions.updateOptions();
  }
  render() {
    const { color, children } = this.props;
    return (
      <button onClick={this.updateOptions.bind(this)}>Update!</button>
    );
  }
}

export default ControlPanel;
