import { updatePlayerPathsAction, updateCollisionMatrixAction, updatePlayerDeathsAction } from './GameActions'
import GameStore from './GameStore.js'
import CanvasDrawer from './CanvasDrawer.js'

class GameLoop {

  ctx = undefined

  run(canvas) {
    this.ctx = canvas.getContext('2d')

    while (GameStore.state.status === GameStore.RUNNING) {
      updatePlayerPathsAction()
      updateCollisionMatrixAction(updatePlayerDeathsAction)
      CanvasDrawer.drawField(this.ctx)
      CanvasDrawer.drawPaths(this.ctx)
      CanvasDrawer.drawPlayers(this.ctx)
    }
  }
}

const GameLoopInstance = new GameLoop

export default GameLoopInstance
