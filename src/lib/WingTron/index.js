// @flow

import React, { Component } from 'react'
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { rootReducer } from '~/duck/reducers'
import GameLoop from './GameLoop'
import GameCanvas from './GameCanvas'
import KeyHandler from './KeyHandler'

import { startGameFromOptions } from '~/duck/actions'

import type { Store } from 'redux'

type Props = {
  auto_start_game?: boolean,
  startGame_callback?: Function,
  update_interval?: number,
  children?: Object,
  enhancer?: Object,
  store?: Store
}

export class WingTron extends Component<Props, null> {

  store: Store

  constructor(props: Props) {
    super(props)

    if (props.startGame_callback) {
      // $FlowFixMe
      props.startGame_callback(this.startGame.bind(this))
    }

    this.store = props.store || createStore(rootReducer, undefined, this.props.enhancer);
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
}

