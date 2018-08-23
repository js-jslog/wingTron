import React, { Component } from 'react'
import setKeyBindings from './setKeyBindings.js'
import GameLoop from './GameLoop.js'
import OptionsStore from './OptionsStore.js'
import GameStore from './GameStore.js'
import { updateOptionsAction, addPlayerAction, removePlayerAction } from './OptionsActions'
import { startGameAction } from './GameActions'

class WingTron extends Component {

  componentDidMount() {
    var canvas = this.refs.canvas
    canvas.width = OptionsStore.options.fieldWidth
    canvas.height = OptionsStore.options.fieldHeight
    canvas.style.width = '100%'

    setKeyBindings(document)
  }

  render() {
    return (
      <canvas ref="canvas" />
    )
  }
}

export default WingTron

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
