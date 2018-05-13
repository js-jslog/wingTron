class OptionsStore {

  options = {}

  setOptions(options) {
    this.options = options
  }

  get options() {
    return this.options
  }
}

const OptionsStoreInstance = new OptionsStore

export default OptionsStoreInstance
