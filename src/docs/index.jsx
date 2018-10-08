// @flow

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { AppContainer } from 'react-hot-loader';

import { WingTron } from '~/WingTron/index.jsx'
import { DevTools } from './DevTools'

import { rootReducer } from '~/duck/reducers'
import { startGameFromOptions } from '~/duck/actions'

import './styles.css';

const logger = createLogger();

const enhancer = compose(
  applyMiddleware(logger),
  DevTools.instrument()
)

const store = createStore(rootReducer, undefined, enhancer);
store.dispatch(startGameFromOptions(store.getState().options))

const rootElement = document.getElementById('app');

render(
  <AppContainer>
    <Provider store={store}>
      <div>
        <WingTron update_interval='2000' />
        <DevTools />
      </div>
    </Provider>
  </AppContainer>,
  // $FlowFixMe
  rootElement
)
/**
render(
  <AppContainer>
    <Provider store={store}>
      <div>
        <h1>Wing-Tron:</h1>
        <div id='gameContainer' style={{width: '25%'}}>
          <WingTron />
        </div>
        <div id='controlPanel'>
          <ControlPanel />
        </div>
        <DevTools />
      </div>
    </Provider>
  </AppContainer>,
  // $FlowFixMe
  rootElement
)

// $FlowFixMe
if (module.hot) {
  // $FlowFixMe
  module.hot.accept('~/WingTron', () => {
    const NextApp = require('~/WingTron').default
    render(
      <AppContainer>
        <Provider store={store}>
          <div>
            <h1>Wing-Tron:</h1>
            <div id='gameContainer' style={{width: '25%'}}>
              <NextApp />
            </div>
            <div id='controlPanel'>
              <ControlPanel />
            </div>
            <DevTools />
          </div>
        </Provider>
      </AppContainer>,
  // $FlowFixMe
      rootElement
    )
  })
}
 **/

