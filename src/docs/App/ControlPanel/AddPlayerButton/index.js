// @flow

import React, { Component } from 'react'

type Props = {
  addPlayer: Function | null
}

export class AddPlayerButton extends Component<Props, null> {

  render() {

    return (
      <button onClick={this.props.addPlayer}>
        Add player
      </button>
    )
  }
}

