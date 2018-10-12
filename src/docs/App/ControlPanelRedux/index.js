// @flow

import React, { Component } from 'react'
import { PlayerOptionsSetUI } from './PlayerOptionsSet'
import { StartGameButton } from './StartGameButton'

type Props = {|
  startGame: Function | null,
  getOptions: Function | null
|}

export class ControlPanelRedux extends Component<Props, null> {

  render() {

    const options = this.props.getOptions && this.props.getOptions()

    const match = options && options.players || {}
    const players = options && options.players || []

    return (
      <div>
        <StartGameButton startGame={ this.props.startGame } />
        <h2>Players:</h2>
        <div ref='player_sections'>
          <PlayerOptionsSetUI players={ players } />
        </div>
      </div>
    )
  }
}

