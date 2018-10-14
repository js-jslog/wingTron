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
  setApiFunction_startGame?: Function,
  setApiFunction_updateOptions?: Function,
  setApiFunction_updateMatchOption?: Function,
  setApiFunction_updatePlayerOption?: Function,
  handleStoreChange_options?: Function,
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

    this.setApiFunctionCallbacks(props)

    this.store = props.store || createStore(rootReducer, undefined, this.props.enhancer);
    this.store.subscribe(this.callStoreChangeHanders.bind(this))
    this.callStoreChangeHanders()

    if (props.auto_start_game !== false) {
      this.startGame()
    }
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

  updateMatchOption(property: string, value: string) {
    const options = this.store.getState().options
    options.match[property] = value
    this.updateOptions(options)
  }

  updatePlayerOption(player: number, property: string, value: string) {
    const options = this.store.getState().options
    options.players[player][property] = value
    this.updateOptions(options)
  }

  setApiFunctionCallbacks(props: Props) {

    const { setApiFunction_startGame } = props
    const { setApiFunction_updateOptions } = props
    const { setApiFunction_updateMatchOption } = props
    const { setApiFunction_updatePlayerOption } = props

    // $FlowFixMe
    if (setApiFunction_startGame) setApiFunction_startGame(this.startGame.bind(this))
    // $FlowFixMe
    if (setApiFunction_updateOptions) setApiFunction_updateOptions(this.updateOptions.bind(this))
    // $FlowFixMe
    if (setApiFunction_updateMatchOption) setApiFunction_updateMatchOption(this.updateMatchOption.bind(this))
    // $FlowFixMe
    if (setApiFunction_updatePlayerOption) setApiFunction_updatePlayerOption(this.updatePlayerOption.bind(this))
  }

  callStoreChangeHanders() {
    if (this.props.handleStoreChange_options) {
      // $FlowFixMe
      this.props.handleStoreChange_options(this.store.getState().options)
    }
  } 
}

