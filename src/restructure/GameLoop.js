import GameStore from './GameStore.js'
import Governor from './Governor/Governor.js'

class GameLoop {

  run() {
    if (GameStore.state.running) {
      GameStore.movePlayers()
      GameStore.calculateCollisionMatrix()
      Governor.render()
    }
  }
}

const GameLoopInstance = new GameLoop

export default GameLoopInstance


