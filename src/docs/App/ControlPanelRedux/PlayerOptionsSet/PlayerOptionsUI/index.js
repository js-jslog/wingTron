// @flow

import React, { Component } from 'react'

// TODO: provide a type interface which is provided via the WingTron component
import type { PlayerOptions } from '~/common/flow-types'

type Props = {
  index: number,
  player: PlayerOptions
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
          <input ref={ 'p' + index + '_start_coord_x' } value={ player.start_coord_x } onChange={window.alert} />
          <span> (&amp; y)</span>
          <input ref={ 'p' + index + '_start_coord_y' } value={ player.start_coord_y } onChange={window.alert} />
        </div>
        <div>
          <span>Direction</span>
          <input ref={ 'p' + index + '_direction' } value={ player.direction } onChange={window.alert} />
        </div>
        <div>
          <span>Left key</span>
          <input ref={ 'p' + index + '_turn_left_keycode' } value={ player.turn_left_keycode } onChange={window.alert} onKeyDown={ window.alert } />
          <span>Right key</span>
          <input ref={ 'p' + index + '_turn_right_keycode' } value={ player.turn_right_keycode } onChange={window.alert} onKeyDown={ window.alert } />
        </div>
        <div>
          <span>Colour</span>
          <input ref={ 'p' + index + '_colour' } value={ player.colour } onChange={window.alert} />
        </div>
        <div>
          <button onClick={window.alert}>Remove this player</button>
        </div>
      </div>
    )
  }
}

