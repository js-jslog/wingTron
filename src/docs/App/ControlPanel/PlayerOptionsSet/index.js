// @flow

// TODO: rename this component folder to PlayerOptionsSetUI when the os will let me
import React, { Component } from 'react'
import { PlayerOptionsUI } from './PlayerOptionsUI'

// TODO: provide a type interface which is provided via the WingTron component
import type { PlayerOptionsSet } from '~/common/flow-types'

type Props = {
  players: PlayerOptionsSet,
  updatePlayerOption: Function,
  removePlayer: Function
}

export class PlayerOptionsSetUI extends Component<Props, null> {

  render() {

    const player_sections = this.props.players.map((player, index) => (
      <PlayerOptionsUI
        key={ index }
        index={ index }
        player={ player }
        updatePlayerOption={ this.props.updatePlayerOption }
        removePlayer={ this.props.removePlayer }
      />
    ))

    return (
      <div>
        { player_sections }
      </div>
    )
  }
}

