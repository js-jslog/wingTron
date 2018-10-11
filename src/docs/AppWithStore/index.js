// @flow

import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';

import { rootReducer } from '~/duck/reducers'
import { WingTron } from '~/WingTron/index.jsx'
import ControlPanelRedux from './ControlPanelRedux'

import { DevTools } from '../DevTools'

import type { Store } from 'redux'

export class AppWithStore extends Component<Object, null> {

  store: Store

  constructor(props: Object) {
    super(props)
    const logger = createLogger()
    const enhancer = compose(
      applyMiddleware(logger),
      DevTools.instrument()
    )
    this.store = createStore(rootReducer, undefined, enhancer)
  }

  render() {

    return (
      <Provider store={this.store}>
        <div>
          <WingTron
            auto_start_game={ false }
            update_interval={ 2000 }
            include_store={ false }
          />
          <ControlPanelRedux />
        </div>
      </Provider>
    )
  }
}
