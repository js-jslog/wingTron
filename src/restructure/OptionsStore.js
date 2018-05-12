class OptionsStore {

  constructor() {
    this.options = {}
  }

  setOptions(options) {
    this.options = options
  }

  getOptions() {
    return this.options
  }
}

const OptionsStoreInstance = new OptionsStore

export default OptionsStoreInstance
