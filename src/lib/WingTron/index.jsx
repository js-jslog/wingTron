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


import type { State } from '~/common/flow-types'

export class WingTron extends Component<Props, State> {

  store = undefined

  constructor(props: Props) {
    super(props)

    if (props.callback) {
      props.callback(this.startGame.bind(this))
    }

    const logger = createLogger();

    const enhancer = compose(
      applyMiddleware(logger)
      //DevTools.instrument()
    )
    this.store = createStore(rootReducer, undefined, enhancer);
    this.startGame()
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

