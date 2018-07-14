import GameStore from './GameStore.js'

class CanvasDrawer {

  drawField(ctx) {
    ctx.fillStyle = "#444";
    ctx.strokeStyle = "#444";
    ctx.fillRect(0, 0, GameStore.state.field_width, GameStore.state.field_height);
  }
}

const CanvasDrawerInstance = new CanvasDrawer

export default CanvasDrawerInstance
