// @flow

import React from 'react';
import { render } from 'react-dom';
import { createLogger } from 'redux-logger';
import { compose, applyMiddleware } from 'redux';

import { App } from './App'
import { DevTools } from './DevTools'

import './styles.css';


const rootElement = document.getElementById('app');
const logger = createLogger();
const enhancer = compose(
  applyMiddleware(logger),
  DevTools.instrument()
)

render(
  <div>
    <App enhancer={ enhancer }>
      <DevTools />
    </App>
  </div>,
  // $FlowFixMe
  rootElement
)

