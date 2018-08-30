import React, { Component } from 'react'
import setKeyBindings from '~/setKeyBindings.js'
import GameLoop from '~/GameLoop.js'
import OptionsStore from '~/OptionsStore.js'
import GameStore from '~/GameStore.js'
import { updateOptionsAction, addPlayerAction, removePlayerAction } from '~/OptionsActions'
import { startGameAction } from '~/GameActions'

class WingTron extends Component {

  constructor(props) {
    super(props)
    this.state = {
      field_width: undefined,
      field_height: undefined,
    }
  }

  componentDidMount() {
    const canvas = this.refs.canvas
    canvas.style.width = '100%'

    setKeyBindings(document)

    const gameLoop = new GameLoop
    gameLoop.addCanvas(canvas)
    // TODO: this is a hacky way of avoiding sending a dispatch during a dispatch
    // Apparently I can use a flux `waitFor` on the dispatch in order to prevent this
    GameStore.on('new_game_started', () => setTimeout(() => {
      this.setState({
        field_width: GameStore.state.field_width,
        field_height: GameStore.state.field_height,
      })
      gameLoop.run()
    }, 0))
  }

  render() {

    return (
      <canvas 
        width={ this.state.field_width } 
        height={ this.state.field_height }
        ref="canvas" />
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
