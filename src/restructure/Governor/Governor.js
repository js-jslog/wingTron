import OptionsStore from '../OptionsStore.js'
import { startNewGame } from '../GameActions'
import GameStore from '../GameStore.js'

class Governor {

  startGame() {
    startNewGame()
  }
}

const GovernorInstance = new Governor

export default GovernorInstance
