import OptionsStore from '../OptionsStore.js'
import GameStore from '../GameStore.js'
import { validateOptions } from './validateOptions.js'

class Governor {

  startGame() {
    const options = OptionsStore.options
    if (!validateOptions(options)) {
      return false
    }
    GameStore.setStateFromOptions(options)
    return true
  }
}

const GovernorInstance = new Governor

export default GovernorInstance
