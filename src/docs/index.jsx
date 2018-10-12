// @flow

import React from 'react';
import { render } from 'react-dom';
// import { AppContainer } from 'react-hot-loader'; // TODO: remove this package

import { App } from './App'
import { DevTools } from './DevTools'

import './styles.css';


const rootElement = document.getElementById('app');

render(
  <div>
    <App>
      <DevTools />
    </App>
  </div>,
  // $FlowFixMe
  rootElement
)

