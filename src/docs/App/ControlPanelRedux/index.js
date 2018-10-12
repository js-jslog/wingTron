// @flow

import React, { Component } from 'react'
import { PlayerOptionsSetUI } from './PlayerOptionsSet'

type Props = {|
  startGame: Function | null,
  getOptions: Function | null
|}

export class ControlPanelRedux extends Component<Props, null> {

  startGame: Function | null
  getOptions: Function | null

  render() {

    if (typeof this.props.startGame == 'function') {
      this.startGame = this.props.startGame
    }
    if (typeof this.props.getOptions == 'function') {
      this.getOptions = this.props.getOptions
    }

    let options = {
      match: {},
      players: []
    }
    if (this.getOptions) {
      options = this.getOptions()
    }
    const { match } = options
    const { players } = options

    return (
      <div>
        <button onClick={this.startGame}>
          Start Game
        </button>
        <h2>Players:</h2>
        <div ref='player_sections'>
          <PlayerOptionsSetUI players={ players } />
        </div>
      </div>
    )
  }
}

