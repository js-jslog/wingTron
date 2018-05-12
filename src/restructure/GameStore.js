class GameStore {

  state = {}

  setState(state) {
    this.state = state
  }

  getState() {
    return this.state
  }
}

const GameStoreInstance = new GameStore

export default GameStoreInstance

