// @flow

import React, { Component } from 'react'

type Props = {
  startGame: Function | null
}

export class StartGameButton extends Component<Props, null> {

  render() {

    return (
      <button onClick={this.props.startGame}>
        Start Game
      </button>
    )
  }
}

