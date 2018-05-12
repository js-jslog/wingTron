import OptionsStore from '../OptionsStore.js'
import { validateOptions } from './validateOptions.js'

class Governor {

  constructor() {
    this.state = {
      options: {},
    }
  }

  startGame() {
    const options = OptionsStore.getOptions()
    return validateOptions(options)
  }
}

const GovernorInstance = new Governor

export default GovernorInstance
