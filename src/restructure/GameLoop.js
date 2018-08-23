import { updatePlayerPathsAction, updateCollisionMatrixAction, updatePlayerDeathsAction } from './GameActions'
import GameStore from './GameStore.js'
import CanvasDrawer from './CanvasDrawer.js'

class GameLoop {

  ctx = undefined

  addCanvas(canvas) {
    this.ctx = canvas.getContext('2d')
  }

  run() {

    if (GameStore.state.status === GameStore.RUNNING) {
      updatePlayerPathsAction()
      updateCollisionMatrixAction(updatePlayerDeathsAction)
      CanvasDrawer.drawField(this.ctx)
      CanvasDrawer.drawPaths(this.ctx)
      CanvasDrawer.drawPlayers(this.ctx)

      setTimeout(this.run.bind(this), 20)
    }
  }
}

export default GameLoop
