class OptionsStore {

  options = {}

  set options(options) {
    this.options = options
  }

  get options() {
    return this.options
  }
}

const OptionsStoreInstance = new OptionsStore

export default OptionsStoreInstance
