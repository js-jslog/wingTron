// @flow

import React, { Component } from 'react'

type Props = {|
  startGame: Function | null
|}

export class ControlPanelRedux extends Component<Props, null> {

  startGame: Function | null

  render() {

    if (typeof this.props.startGame == 'function') {
      this.startGame = this.props.startGame
    }

    return (
      <div>
        <button onClick={this.startGame}>
          Start Game
        </button>
      </div>
    )
  }
}

