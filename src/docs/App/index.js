// @flow

import React, { Component } from 'react';
import { render } from 'react-dom';

import { WingTron } from '~/WingTron/index.js'
import { ControlPanelRedux } from './ControlPanelRedux'

import type { Options } from '~/common/flow-types'

type Props = Object

type State = {|
  options: Options | null,
  startGame: Function,
  updateMatchOption: Function,
  updatePlayerOption: Function,
|}

export class App extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      startGame: this.adviseUnconnected,
      updateMatchOption: this.adviseUnconnected,
      updatePlayerOption: this.adviseUnconnected,
      options: null
    }
  }

  render() {

    return (
      <div>
        <WingTron
          setApiFunction_startGame={ this.setStartGame.bind(this) }
          setApiFunction_updateMatchOption={ this.setUpdateMatchOption.bind(this) }
          setApiFunction_updatePlayerOption={ this.setUpdatePlayerOption.bind(this) }
          handleStoreChange_options={ this.setOptions.bind(this) }
          auto_start_game={ false }
          update_interval={ 500 }
          { ...this.props }
        >
          { this.props.children }
        </WingTron>
        <ControlPanelRedux
          startGame={ this.state.startGame }
          updateMatchOption={ this.state.updateMatchOption }
          updatePlayerOption={ this.state.updatePlayerOption }
          options={ this.state.options }
        />
      </div>
    )
  }

  setStartGame(func: Function) {
    this.setState({
      startGame: func
    })
  }
  setUpdateMatchOption(func: Function) {
    this.setState({
      updateMatchOption: func
    })
  }
  setUpdatePlayerOption(func: Function) {
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

