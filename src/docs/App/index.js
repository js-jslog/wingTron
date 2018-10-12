// @flow

import React, { Component } from 'react';
import { render } from 'react-dom';

import { WingTron } from '~/WingTron/index.js'
import { ControlPanelRedux } from './ControlPanelRedux'

type Props = Object

type State = {|
  startGame: Function | null,
  getOptions: Function | null
|}

export class App extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      startGame: null,
      getOptions: null
    }
  }

  render() {

    return (
      <div>
        <WingTron
          { ...this.props }
          auto_start_game={ false }
          startGame_callback={ this.wingTron_startGame.bind(this) }
          getOptions_callback={ this.wingTron_getOptions.bind(this) }
          update_interval={ 500 }
        >
          { this.props.children }
        </WingTron>
        <ControlPanelRedux
          startGame={ this.state.startGame }
          getOptions={ this.state.getOptions }
        />
      </div>
    )
  }

  wingTron_startGame(params: Function) {
    this.setState({
      startGame: params
    })
  }
  wingTron_getOptions(params: Function) {
    this.setState({
      getOptions: params
    })
  }
}

