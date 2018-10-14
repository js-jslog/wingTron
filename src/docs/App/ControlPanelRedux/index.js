// @flow

import React, { Component } from 'react'
import { PlayerOptionsSetUI } from './PlayerOptionsSet'
import { StartGameButton } from './StartGameButton'

import type { Options } from '~/common/flow-types'

type Props = {|
  startGame: Function | null,
  updatePlayerOption: Function
|}

export class ControlPanelRedux extends Component<Props, null> {

  render() {

    const { options, startGame, updateOptions} = this.props

    const match = options && options.players || {}
    const players = options && options.players || []

    return (
      <div>
        <StartGameButton startGame={ startGame } />
        <h2>Players:</h2>
        <PlayerOptionsSetUI
          updatePlayerOption={ this.props.updatePlayerOption }
          players={ players }
        />
      </div>
    )
  }
}

