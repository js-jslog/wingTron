// @flow

import React, { Component } from 'react';
import { render } from 'react-dom';

import { WingTron } from '~/WingTron/index.js'
import { ControlPanelRedux } from './ControlPanelRedux'

import type { Options } from '~/common/flow-types'

type Props = Object

type State = {|
  startGame: Function | null,
  options: Options | null
|}

export class App extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      startGame: null,
      options: null
    }
  }

  render() {

    return (
      <div>
        <WingTron
          { ...this.props }
          auto_start_game={ false }
          startGame_callback={ this.wingTron_startGame.bind(this) }
          optionsListener={ this.setOptions.bind(this) }
          update_interval={ 500 }
        >
          { this.props.children }
        </WingTron>
        <ControlPanelRedux
          startGame={ this.state.startGame }
          options={ this.state.options }
        />
      </div>
    )
  }

  wingTron_startGame(func: Function) {
    this.setState({
      startGame: func
    })
  }
  setOptions(options: Options) {
    this.setState({
      options: options
    })
  }
}

