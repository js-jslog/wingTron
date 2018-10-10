// @flow

import React, { Component } from 'react'

export class ControlPanelRedux extends Component<any, null> {

  test = function () {
    alert('test')
  }

  render() {

    if (typeof this.props.test == 'function') {
      this.test = this.props.test
    }

    return (
      <div>
        <button onClick={this.test}>
          Start Game
        </button>
      </div>
    )
  }
}

