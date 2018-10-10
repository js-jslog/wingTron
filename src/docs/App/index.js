
// @flow

import React, { Component } from 'react';
import { render } from 'react-dom';

import { WingTron } from '~/WingTron/index.jsx'
import { ControlPanelRedux } from './ControlPanelRedux'

export class App extends Component<null, null> {

  constructor() {
    super()
    this.state = {
      startGame: undefined
    }
  }

  render() {

    return (
      <div>
        <WingTron
          callback={ this.functionFromWingTron.bind(this) }
          update_interval='2000'
        />
        <ControlPanelRedux
          test={ this.state.startGame }
        />
      </div>
    )
  }

  functionFromWingTron(params) {
    this.setState({
      startGame: params
    })
  }
}
