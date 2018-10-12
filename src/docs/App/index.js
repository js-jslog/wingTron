// @flow

import React, { Component } from 'react';
import { render } from 'react-dom';

import { WingTron } from '~/WingTron/index.jsx'
import { ControlPanelRedux } from './ControlPanelRedux'

type Props = Object

type State = {|
  startGame: Function | null
|}

export class App extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      startGame: null
    }
  }

  render() {

    return (
      <div>
        <WingTron
          { ...this.props }
          auto_start_game={ false }
          startGame_callback={ this.functionFromWingTron.bind(this) }
          update_interval={ 500 }
        >
          { this.props.children }
        </WingTron>
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
