import GameStore from './GameStore.js'

class GameLoop {

  run() {
    if (GameStore.state.running) {
      GameStore.update()
    }
  }
}

const GameLoopInstance = new GameLoop

export default GameLoopInstance


