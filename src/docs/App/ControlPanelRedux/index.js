// @flow

import React, { Component } from 'react'
import { MatchOptionsUI } from './MatchOptionsUI'
import { PlayerOptionsSetUI } from './PlayerOptionsSet'
import { StartGameButton } from './StartGameButton'

import type { Options } from '~/common/flow-types'

type Props = {|
  options: Options | null,
  startGame: Function,
  updateMatchOption: Function,
  updatePlayerOption: Function
|}

export class ControlPanelRedux extends Component<Props, null> {

  render() {

    const { options, startGame, updateMatchOption, updatePlayerOption} = this.props

    const match = options && options.match || {}
    const players = options && options.players || []

    return (
      <div>
        <StartGameButton startGame={ startGame } />
        <h2>Match Options</h2>
        <MatchOptionsUI
          updateMatchOption={ updateMatchOption }
          match={ match }
        />
        <h2>Players:</h2>
        <PlayerOptionsSetUI
          updatePlayerOption={ updatePlayerOption }
          players={ players }
        />
      </div>
    )
  }
}

