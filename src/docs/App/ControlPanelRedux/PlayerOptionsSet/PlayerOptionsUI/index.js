// @flow

import React, { Component } from 'react'

// TODO: provide a type interface which is provided via the WingTron component
import type { PlayerOptions } from '~/common/flow-types'

type Props = {
  index: number,
  player: PlayerOptions,
  updatePlayerOption: Function,
  removePlayer: Function
}

export class PlayerOptionsUI extends Component<Props, null> {

  render() {

    const { index } = this.props
    const { player } = this.props

    return (
      <div>
        <h3>Player{ index }</h3>
        <div>
          <span>Start coords: (x)</span>
          <input
            className='start_coord_x'
            value={ player.start_coord_x }
            onChange={ this.updatePlayerOption.bind(this) } />
          <span> (&amp; y)</span>
          <input
            className='start_coord_y'
            value={ player.start_coord_y }
            onChange={this.updatePlayerOption.bind(this)} />
        </div>
        <div>
          <span>Direction</span>
          <input
            className='direction'
            value={ player.direction }
            onChange={this.updatePlayerOption.bind(this)} />
        </div>
        <div>
          <span>Left key</span>
          <input
            className='turn_left_keycode'
            value={ player.turn_left_keycode }
            onChange={this.updatePlayerOption.bind(this)}
            onKeyDown={ translateKeyCode }
          />
          <span>Right key</span>
          <input
            className='turn_right_keycode'
            value={ player.turn_right_keycode }
            onChange={ this.updatePlayerOption.bind(this) }
            onKeyDown={ translateKeyCode }
          />
        </div>
        <div>
          <span>Colour</span>
          <input
            className='colour'
            value={ player.colour }
            onChange={this.updatePlayerOption.bind(this)} />
        </div>
        <div>
          <button onClick={this.removePlayer.bind(this)}>Remove this player</button>
        </div>
      </div>
    )
  }

  updatePlayerOption(event: SyntheticEvent) {
    const { index } = this.props
    const { className } = event.target
    const { value } = event.target
    this.props.updatePlayerOption(index, className, value)
  }

  removePlayer(event: SyntheticEvent) {
    const { index } = this.props
    this.props.removePlayer(index)
  }
}

// TODO: this is preventing the onChange handler from being called
const translateKeyCode = (event: SyntheticEvent) => {
  event.preventDefault()
  event.target.value = event.keyCode
  return false;
}

