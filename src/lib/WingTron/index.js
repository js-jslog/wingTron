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

import { generateRandomPlayerColour } from './generateRandomPlayerColour'

import type { Options } from '~/common/flow-types'
import type { Store } from 'redux'
import type { ChildrenArray } from 'react'

type CallbackFunctionProps= {
  setApiFunction_startGame: Function,
  setApiFunction_addPlayer: Function,
  setApiFunction_removePlayer?: Function,
  setApiFunction_updateOptions?: Function,
  setApiFunction_updateMatchOption?: Function,
  setApiFunction_updatePlayerOption?: Function,
  handleStoreChange_options?: Function
}

type DevelopmentProps = {
  update_interval?: number,
  enhancer?: Object
}

type Props = {
  children: ChildrenArray<any>,
  auto_start_game?: boolean,
  store?: Store,
  ...CallbackFunctionProps,
  ...DevelopmentProps
}


export class WingTron extends Component<Props, null> {

  store: Store

  constructor(props: Props) {
    super(props)

    // BUG: this shouldn't be necessary given that I've defined the store type above, but it is
    const store_pointer: Store = this.store

    this.setApiFunctionCallbacks(props)

    this.store = props.store || createStore(rootReducer, undefined, this.props.enhancer);
    store_pointer.subscribe(this.callStoreChangeHanders.bind(this))
    this.callStoreChangeHanders()

    if (props.auto_start_game !== false) {
      this.startGame()
    }
  }

  render() {

    // BUG: this shouldn't be necessary given that children is typed in the Props type above, but it is
    const children: ChildrenArray<any> = this.props.children

    return (
      <Provider store={this.store}>
        <div>
          <GameLoop { ...this.props } />
          <GameCanvas />
          <KeyHandler />
          { children }
        </div>
      </Provider>
    )
  }

  startGame() {
    this.store.dispatch(startGameFromOptions(this.store.getState().options))
  }

  addPlayer() {
    const options = this.store.getState().options
    const player0_clone = { ...options.players[0] }
    const new_player_id = options.players.length
    const direction = Math.random() * Math.PI * 2
    const colour = generateRandomPlayerColour()
    player0_clone.direction = direction
    player0_clone.colour = colour
    options.players[new_player_id] = player0_clone
    this.updateOptions(options)
  }

  removePlayer(index: number) {
    const options = this.store.getState().options
    options.players.splice(index, 1)
    this.updateOptions(options)
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

  setApiFunctionCallbacks(props: Props2) {

    const setApiFunction_startGamei: ?Function = props.setApiFunction_startGame
    const { setApiFunction_addPlayer } = props
    const { setApiFunction_removePlayer } = props
    const { setApiFunction_updateOptions } = props
    const { setApiFunction_updateMatchOption } = props
    const { setApiFunction_updatePlayerOption } = props

    if (props.setApiFunction_startGame) props.setApiFunction_startGame(this.startGame.bind(this))
    if (props.setApiFunction_addPlayer !== undefined) props.setApiFunction_addPlayer(this.addPlayer.bind(this))
    // $FlowFixMe
    if (setApiFunction_removePlayer) setApiFunction_removePlayer(this.removePlayer.bind(this))
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

type Props2 =
  & CallbackFunctionProps

