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

    let options = {
      match: {},
      players: []
    }
    if (this.props.getOptions) {
      options = this.props.getOptions()
    }
    const { match } = options
    const { players } = options

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

