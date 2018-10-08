// @flow

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

//import setKeyBindings from '~/setKeyBindings.js'
import GameLoop from './GameLoop'
import GameCanvas from './GameCanvas'
import KeyHandler from './KeyHandler'

type Props = {
  update_interval?: number
}

export class WingTron extends Component<Props, null> {

  render() {

    return (
      <div>
        <GameLoop { ...this.props } />
        <GameCanvas />
        <KeyHandler />
      </div>
    )
  }
}

/**
  // functions to be consumed by the control panel
  // TODO: this needs to be promisafied so that we can actually return the options current value, rather than just the value we have set it to
export function getOptions() {
  if (OptionsStore.options === undefined) {
    updateOptionsAction(OptionsStore.DEFAULT_OPTIONS)
    return JSON.stringify(OptionsStore.DEFAULT_OPTIONS)
  }

  return JSON.stringify(OptionsStore.options)
}

export function addPlayer() {
  addPlayerAction()
}

export function removePlayer(index) {
  removePlayerAction(index)
}

export function registerOptionsChangeCallback(callback) {
  OptionsStore.on('options_updated', callback)
}

export function updateGameOptions(options) {
  updateOptionsAction(JSON.parse(options))
}

export function startGame() {
  startGameAction()
}

export function registerDeathChangeCallback(callback) {
  GameStore.on('player_deaths_updated', callback) 
}
 **/
