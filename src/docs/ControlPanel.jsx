import React, { Component } from "react";
import * as OptionsActions from "../../lib/optionsActions.js";

class ControlPanel extends Component {
  constructor(props) {
    super(props)
  }

  updateOptions() {
    var options = {
      fieldWidth: this.refs.optionWidth.value,
      fieldHeight: this.refs.optionHeight.value,
      matches: this.refs.optionMatches.value,
    }
    OptionsActions.updateOptions(options);
  }

  render() {
    const { color, children } = this.props;
    return (
      <div>
        <div>
          <input ref='optionWidth' defaultValue='300' />
          <span>Field width</span>
        </div>
        <div>
          <input ref='optionHeight' defaultValue='300' />
          <span>Field height</span>
        </div>
        <div>
          <input ref='optionMatches' defaultValue='10' />
          <span>Matches</span>
        </div>
        <button onClick={this.updateOptions.bind(this)}>Start Game!</button>
      </div>
    );
  }
}

export default ControlPanel;
