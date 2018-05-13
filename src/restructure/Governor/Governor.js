import OptionsStore from '../OptionsStore.js'
import GameStore from '../GameStore.js'
import { validateOptions } from './validateOptions.js'

class Governor {

  state = {
    options: {},
  }

  startGame() {
    const options = OptionsStore.options
    if (!validateOptions(options)) {
      return false
    }
    GameStore.setState(options)
    return true
  }
}

const GovernorInstance = new Governor

export default GovernorInstance
