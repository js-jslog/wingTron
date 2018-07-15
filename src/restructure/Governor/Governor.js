import OptionsStore from '../OptionsStore.js'
import { startNewGame } from '../GameActions'
import GameStore from '../GameStore.js'
import { validateOptions } from './validateOptions.js'
import CanvasDrawer from '../CanvasDrawer.js'

class Governor {

  reset() {
    GameStore.state = {
      status: GameStore.NOT_STARTED && GameStore.NOT_STARTED,
    }
    OptionsStore.options = OptionsStore.DEFAULT_OPTIONS
  }

  startGame() {
    const options = OptionsStore.options
    if (validateOptions(options)) {
      startNewGame()
    }
  }
}

const GovernorInstance = new Governor

export default GovernorInstance
