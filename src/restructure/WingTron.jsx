import React, { Component } from 'react'
import setKeyBindings from './setKeyBindings.js'
import GameLoop from './GameLoop.js'
import OptionsStore from './OptionsStore.js'
import { updateOptionsAction } from './OptionsActions'
import { startGameAction } from './GameActions'

class WingTron extends Component {

  componentDidMount() {
    var canvas = this.refs.canvas
    canvas.width = OptionsStore.options.fieldWidth
    canvas.height = OptionsStore.options.fieldHeight
    canvas.style.width = '100%'

    setKeyBindings(document)
    GameLoop.addCanvas(canvas)
  }

  render() {
    return (
      <canvas ref="canvas" />
    )
  }
}

export default WingTron

export function getOptions() {
  return JSON.stringify(OptionsStore.options)
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
