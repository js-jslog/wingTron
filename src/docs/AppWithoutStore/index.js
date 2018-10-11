// @flow

import React, { Component } from 'react';
import { render } from 'react-dom';

import { WingTron } from '~/WingTron/index.jsx'
import { ControlPanelRedux } from './ControlPanelRedux'

type State = {
  startGame: Function | null
}

export class AppWithoutStore extends Component<Object, State> {

  constructor(props: Object) {
    super(props)
    this.state = {
      startGame: null
    }
  }

  render() {

    return (
      <div>
        <WingTron
          auto_start_game={ false }
          startGame_callback={ this.functionFromWingTron.bind(this) }
          update_interval={ 2000 }
        />
        <ControlPanelRedux
          startGame={ this.state.startGame }
        />
      </div>
    )
  }

  functionFromWingTron(params: Function) {
    this.setState({
      startGame: params
    })
  }
}
