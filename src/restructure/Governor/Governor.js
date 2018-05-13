import OptionsStore from '../OptionsStore.js'
import { validateOptions } from './validateOptions.js'

class Governor {

  state = {
    options: {},
  }

  startGame() {
    const options = OptionsStore.options
    return validateOptions(options)
  }
}

const GovernorInstance = new Governor

export default GovernorInstance
