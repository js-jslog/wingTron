// @flow

import React, { Component } from 'react'
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { rootReducer } from '~/duck/reducers'
import GameLoop from './GameLoop'
import GameCanvas from './GameCanvas'
import KeyHandler from './KeyHandler'

import { startGameFromOptions } from '~/duck/actions'
import { updateOptions } from '~/duck/actions'

import type { Options } from '~/common/flow-types'
import type { Store } from 'redux'
import type { Node } from 'react'

type CallbackFunctionProps= {
  startGame_callback?: Function,
  updateOptions_callback?: Function,
  updatePlayerOption_callback?: Function,
  optionsListener?: Function,
}

type DevelopmentProps = {
  update_interval?: number,
  enhancer?: Object,
}

type Props = {
  children: Node,
  auto_start_game?: boolean,
  store?: Store,
  ...CallbackFunctionProps,
  ...DevelopmentProps
}

export class WingTron extends Component<Props, null> {

  store: Store

  constructor(props: Props) {
    super(props)

    // $FlowFixMe
    if (props.startGame_callback) props.startGame_callback(this.startGame.bind(this))
    // $FlowFixMe
    if (props.updateOptions_callback) props.updateOptions_callback(this.updateOptions.bind(this))
    // $FlowFixMe
    if (props.updatePlayerOption_callback) props.updatePlayerOption_callback(this.updatePlayerOption.bind(this))

    this.store = props.store || createStore(rootReducer, undefined, this.props.enhancer);
    if (props.auto_start_game !== false) {
      this.startGame()
    }

    this.store.subscribe(this.apiCallbackInterface.bind(this))
    this.apiCallbackInterface()
  }

  render() {

    return (
      <Provider store={this.store}>
        <div>
          <GameLoop { ...this.props } />
          <GameCanvas />
          <KeyHandler />
          { this.props.children }
        </div>
      </Provider>
    )
  }

  startGame() {
    this.store.dispatch(startGameFromOptions(this.store.getState().options))
  }

  updateOptions(options: Options) {
    this.store.dispatch(updateOptions(options))
  }

  updatePlayerOption(player: number, property: string, value: string) {
    const options = this.store.getState().options
    options.players[player][property] = value
    this.updateOptions(options)
  }

  apiCallbackInterface() {
    if (this.props.optionsListener) {
      // $FlowFixMe
      this.props.optionsListener(this.store.getState().options)
    }
  } 
}

