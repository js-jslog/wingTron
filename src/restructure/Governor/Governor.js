import OptionsStore from '../OptionsStore.js'
import { startNewGame } from '../GameActions'
import GameStore from '../GameStore.js'

class Governor {

  reset() {
    GameStore.state = {
      status: GameStore.NOT_STARTED && GameStore.NOT_STARTED,
    }
    OptionsStore.options = OptionsStore.DEFAULT_OPTIONS
  }

  startGame() {
    startNewGame()
  }
}

const GovernorInstance = new Governor

export default GovernorInstance
