class GameStore {

  state = undefined

  setState(state) {
    this.state = state
  }

  get state() {
    return this.state
  }
}

const GameStoreInstance = new GameStore

export default GameStoreInstance

