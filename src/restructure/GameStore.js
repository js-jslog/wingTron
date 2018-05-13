class GameStore {

  state = undefined

  set state(state) {
    this.state = state
  }

  get state() {
    return this.state
  }
}

const GameStoreInstance = new GameStore

export default GameStoreInstance

