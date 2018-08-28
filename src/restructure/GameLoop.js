import { updatePlayerPathsAction, updateCollisionMatrixAction, updatePlayerDeathsAction } from './GameActions'
import GameStore from './GameStore.js'
import CanvasDrawer from './CanvasDrawer.js'

class GameLoop {

  ctx = undefined
  frame_id = undefined

  last_frame_time = undefined
  update_interval = 20
  loop_delta = 0

  fps_estimate = 60
  frames_this_second = 0
  last_fps_update = 0

  addCanvas(canvas) {

    this.ctx = canvas.getContext('2d')
  }

  run(timestamp) {

    if (GameStore.state.status === GameStore.RUNNING) {
      this.mainLoop(timestamp)
    } else {
      cancelAnimationFrame(this.frame_id)
    }
  }

  mainLoop(timestamp) {

      // TODO: actually make use of the frames estimate to reduce work (possibly in the drawing) before the number of updates check below in employed
      this.calculateFrameRate(timestamp)

      this.loop_delta += this.last_frame_time ? (timestamp - this.last_frame_time) : 0
      this.last_frame_time = timestamp || new Date().getTime()

      let number_of_updates = 0
      while (this.loop_delta >= this.update_interval) {
        this.update(this.loop_delta)
        this.loop_delta -= this.update_interval

        if (++number_of_updates >= 240) {
          this.panic()
          break;
        }
      }

      this.draw()

      this.frame_id = requestAnimationFrame(this.run.bind(this, new Date().getTime()))
  }

  update(loop_delta) {

    updatePlayerPathsAction()
    updateCollisionMatrixAction(updatePlayerDeathsAction)
  }

  draw() {

    CanvasDrawer.drawField(this.ctx)
    CanvasDrawer.drawPaths(this.ctx)
    CanvasDrawer.drawPlayers(this.ctx)
  }

  panic() {

    this.loop_delta = 0
  }

  calculateFrameRate(timestamp) {

    if (timestamp > this.last_fps_update + 1000) {
      this.fps_estimate = 0.25 * this.frames_this_second + (1 - 0.25) * this.fps_estimate

      this.last_fps_update = timestamp
      this.frames_this_second = 0
    }
    this.frames_this_second++
  }
}

export default GameLoop
