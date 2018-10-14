// @flow

import React, { Component } from 'react';
import { render } from 'react-dom';

import { WingTron } from '~/WingTron/index.js'
import { ControlPanelRedux } from './ControlPanelRedux'

import type { Options } from '~/common/flow-types'

type Props = Object

type State = {|
  options: Options | null,
  startGame: Function | null,
  updatePlayerOption: Function | null
|}

export class App extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      startGame: null,
      updatePlayerOption: this.adviseUnconnected,
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
          updatePlayerOption_callback={ this.wingTron_updatePlayerOption.bind(this) }
          optionsListener={ this.setOptions.bind(this) }
          update_interval={ 500 }
        >
          { this.props.children }
        </WingTron>
        <ControlPanelRedux
          startGame={ this.state.startGame }
          updatePlayerOption={ this.state.updatePlayerOption }
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
  wingTron_updatePlayerOption(func: Function) {
    this.setState({
      updatePlayerOption: func
    })
  }
  setOptions(options: Options) {
    this.setState({
      options: options
    })
  }
  adviseUnconnected() {
    const warning = ''
    + 'It looks like you have a component trying to call a function which has not been'
    + ' successfully connected to the app inside the WingTron component'
    window.alert(warning)
  }
}

