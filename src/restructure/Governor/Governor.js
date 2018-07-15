import OptionsStore from '../OptionsStore.js'
import GameStore from '../GameStore.js'
import { validateOptions } from './validateOptions.js'
import CanvasDrawer from '../CanvasDrawer.js'

class Governor {

  ctx = undefined // TODO: implement how the canvas is passed in and this context retrieved

  reset() {
    GameStore.state = {
      status: GameStore.NOT_STARTED && GameStore.NOT_STARTED,
    }
    OptionsStore.options = OptionsStore.DEFAULT_OPTIONS
  }

  startGame() {
    const options = OptionsStore.options
    if (validateOptions(options)) {
      GameStore.setStateFromOptions(options)
      GameStore.state.status = GameStore.RUNNING
    }
  }

  render() {
    CanvasDrawer.drawField(this.ctx)
    CanvasDrawer.drawPaths(this.ctx)
    CanvasDrawer.drawPlayers(this.ctx)
  }
}

const GovernorInstance = new Governor

export default GovernorInstance
