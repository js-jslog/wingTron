// @flow

import React from 'react'
import { render } from 'react-dom'
// TODO: delete this npm module
// import { AppContainer } from 'react-hot-loader'

import { AppWithoutStore } from './AppWithoutStore'
import { AppWithStore } from './AppWithStore'

import './styles.css';


const rootElement = document.getElementById('app')

render(
  <div>
  <AppWithoutStore />
  <AppWithStore />
  </div>,
  // $FlowFixMe
  rootElement
)
