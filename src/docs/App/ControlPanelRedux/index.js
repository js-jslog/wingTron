// @flow

import React, { Component } from 'react'
import { PlayerOptionsSetUI } from './PlayerOptionsSet'
import { StartGameButton } from './StartGameButton'

import type { Options } from '~/common/flow-types'

type Props = {|
  startGame: Function | null,
  options: Options | null
|}

export class ControlPanelRedux extends Component<Props, null> {

  render() {

    const { startGame, options } = this.props

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

