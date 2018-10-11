// @flow

import React, { Component } from 'react'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';

import { rootReducer } from '~/duck/reducers'
import GameLoop from './GameLoop'
import GameCanvas from './GameCanvas'
import KeyHandler from './KeyHandler'

import { startGameFromOptions } from '~/duck/actions'

import type { Store } from 'redux'

type PropsStoreProvided = {
}
type PropsStoreRequired = {
  startGame_callback: Function
}
type PropsDefault = {
  auto_start_game: boolean,
  update_interval: number,
  include_store: boolean
}
type Props = {
  ...PropsDefault,
  ...PropsStoreProvided | PropsStoreRequired
}

export class WingTron extends Component<Props, null> {

  store: Store

  constructor(props: Props) {
    super(props)

    if (props.startGame_callback) {
      props.startGame_callback(this.startGame.bind(this))
    }

    const logger = createLogger();

    const enhancer = compose(
      applyMiddleware(logger)
      //DevTools.instrument()
    )
    this.store = props.store || createStore(rootReducer, undefined, enhancer);
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
      </div>
    </Provider>
    )
  }

  startGame() {
    this.store.dispatch(startGameFromOptions(this.store.getState().options))
  }
}

