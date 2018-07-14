import GameStore from './GameStore.js'

class CanvasDrawer {

  drawField(ctx) {
    ctx.fillStyle = "#444";
    ctx.strokeStyle = "#444";
    ctx.fillRect(0, 0, GameStore.state.field_width, GameStore.state.field_height);
  }

  drawPlayers(ctx) {
    GameStore.state.player_state.forEach(player_state => {
      const player_size = 3
      const offset = (player_size -1) /2
      const colour = player_state.colour
      const coords = player_state.path[0]

      ctx.fillStyle = colour
      ctx.strokeStyle = colour
      ctx.fillRect(coords[0]-offset, coords[1]-offset, player_size, player_size);
    })
  }
}

const CanvasDrawerInstance = new CanvasDrawer

export default CanvasDrawerInstance
