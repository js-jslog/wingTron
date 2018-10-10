// @flow

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { App } from './App'
import { DevTools } from './DevTools'

import './styles.css';


const rootElement = document.getElementById('app');

render(
  <AppContainer>
      <div>
        <App />
        {/*      <DevTools />*/}
      </div>
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

