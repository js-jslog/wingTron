import OptionsStore from '../OptionsStore.js'
import GameStore from '../GameStore.js'
import { validateOptions } from './validateOptions.js'
import CanvasDrawer from '../CanvasDrawer.js'

class Governor {

  ctx = undefined // TODO: implement how the canvas is passed in and this context retrieved

  startGame() {
    const options = OptionsStore.options
    if (!validateOptions(options)) {
      return false
    }
    GameStore.setStateFromOptions(options)
    return true
  }

  render() {
    CanvasDrawer.drawField(this.ctx)
    CanvasDrawer.drawPaths(this.ctx)
    CanvasDrawer.drawPlayers(this.ctx)
  }
}

const GovernorInstance = new Governor

export default GovernorInstance
