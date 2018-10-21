// @flow

import React, { Component } from 'react'
import { MatchOptionsUI } from './MatchOptionsUI'
import { PlayerOptionsSetUI } from './PlayerOptionsSet'
import { StartGameButton } from './StartGameButton'
import { AddPlayerButton } from './AddPlayerButton'

import type { Options } from '~/common/flow-types'

type Props = {|
  options: Options | null,
  startGame: Function,
  updateMatchOption: Function,
  updatePlayerOption: Function,
  addPlayer: Function
|}

export class ControlPanelRedux extends Component<Props, null> {

  render() {

    const { options, startGame, addPlayer, updateMatchOption, updatePlayerOption} = this.props

    const match = options && options.match || { field_width: '0', field_height: '0', matches: '0' }
    const players = options && options.players || []

    return (
      <div>
        <StartGameButton startGame={ startGame } />
        <AddPlayerButton addPlayer={ addPlayer } />
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

